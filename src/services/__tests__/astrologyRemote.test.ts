import { AstrologyRemoteError, calculateAstrologyChart, generateAstrologyReflection } from '../astrologyRemote';
import { AstrologyChart, AstrologyConsent, LocalBirthProfile } from '../../types/astrology';

const consent: AstrologyConsent = {
  acknowledgedAt: 123,
  reflectiveUseAcknowledged: true,
  externalProcessingAllowed: true,
};

const profile: LocalBirthProfile = {
  version: 1,
  birthDate: { year: 1990, month: 4, day: 7 },
  birthTime: { hour: 8, minute: 5 },
  timezone: 'America/Toronto',
  locationLabel: 'Private local label',
  createdAt: 123,
  updatedAt: 123,
};

const chart: AstrologyChart = {
  providerId: 'test-provider',
  calculatedAt: 123,
  precision: 'date-time-timezone',
  placements: [{ body: 'Sun', sign: 'Aries' }],
  aspects: [],
  uncertaintyNotes: [],
  reflectiveDisclosure: 'For reflection only.',
};

const mockJsonResponse = (value: unknown) => ({ ok: true, json: jest.fn().mockResolvedValue(value) });

describe('remote astrology privacy boundary', () => {
  afterEach(() => jest.restoreAllMocks());

  it('sends coordinates for calculation without the local location label', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(mockJsonResponse(chart) as never);

    await expect(calculateAstrologyChart(profile, { latitude: 43.65, longitude: -79.38 }, consent)).resolves.toEqual(chart);

    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(requestBody.birth).toEqual({
      date: '1990-04-07',
      time: '08:05',
      timezone: 'America/Toronto',
      latitude: 43.65,
      longitude: -79.38,
    });
    expect(JSON.stringify(requestBody)).not.toContain('Private local label');
  });

  it('sends only chart data and consent for AI reflection', async () => {
    const response = { reflection: 'A reflective note.', generatedAt: '2026-10-08', disclosure: 'Reflection only.' };
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(mockJsonResponse(response) as never);

    await expect(generateAstrologyReflection(chart, consent)).resolves.toEqual(response);

    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(requestBody).toEqual({ chart, consent });
    expect(requestBody).not.toHaveProperty('dreamText');
    expect(requestBody).not.toHaveProperty('profile');
  });

  it('turns a disabled server route into a clear non-retryable release state', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      json: jest.fn().mockResolvedValue({ error: 'Astrology is not enabled.' }),
    } as never);

    const error = await calculateAstrologyChart(profile, { latitude: 43.65, longitude: -79.38 }, consent)
      .catch(value => value);

    expect(error).toBeInstanceOf(AstrologyRemoteError);
    expect(error).toMatchObject({
      code: 'not_available',
      retryable: false,
      message: 'Optional Astrology is not available on this build yet.',
    });
  });

  it('uses stable server codes for rate limits without relying on message text', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
      json: jest.fn().mockResolvedValue({ error: 'Please pause.', code: 'provider_rate_limited' }),
    } as never);

    const error = await calculateAstrologyChart(profile, { latitude: 43.65, longitude: -79.38 }, consent)
      .catch(value => value);

    expect(error).toMatchObject({
      code: 'rate_limited',
      serverCode: 'provider_rate_limited',
      retryable: false,
      message: 'Please pause.',
    });
  });

  it('maps stable invalid-response and timeout codes to typed client errors', async () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: jest.fn().mockResolvedValue({ error: 'Bad chart.', code: 'provider_invalid_response' }),
    } as never);
    await expect(calculateAstrologyChart(profile, { latitude: 43.65, longitude: -79.38 }, consent)).rejects.toMatchObject({
      code: 'invalid_response',
      serverCode: 'provider_invalid_response',
    });

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 504,
      json: jest.fn().mockResolvedValue({ error: 'Timed out.', code: 'provider_timeout' }),
    } as never);
    await expect(generateAstrologyReflection(chart, consent)).rejects.toMatchObject({
      code: 'timeout',
      serverCode: 'provider_timeout',
      retryable: true,
    });
  });
});
