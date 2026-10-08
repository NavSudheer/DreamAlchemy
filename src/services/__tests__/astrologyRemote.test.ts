import { calculateAstrologyChart, generateAstrologyReflection } from '../astrologyRemote';
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
});
