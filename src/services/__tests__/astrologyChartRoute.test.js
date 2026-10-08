const handler = require('../../../api/astrology-chart').default;

const validBody = {
  birth: {
    date: '1990-05-12',
    time: '08:30',
    timezone: 'America/Toronto',
    latitude: 43.65,
    longitude: -79.38,
  },
  consent: {
    reflectiveUseAcknowledged: true,
    externalProcessingAllowed: true,
  },
};

const request = (body = validBody) => ({
  method: 'POST',
  json: jest.fn().mockResolvedValue(body),
});

describe('astrology chart route', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.restoreAllMocks();
    process.env = {
      ...originalEnvironment,
      ASTROLOGY_FEATURE_ENABLED: 'true',
      ASTROLOGY_API_KEY: 'server-only-test-key',
    };
    global.fetch = jest.fn();
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('stays unavailable until explicitly enabled', async () => {
    process.env.ASTROLOGY_FEATURE_ENABLED = 'false';

    const response = await handler(request());

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: 'Astrology is not enabled.' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects a request without both consent choices', async () => {
    const response = await handler(request({
      ...validBody,
      consent: { reflectiveUseAcknowledged: true, externalProcessingAllowed: false },
    }));

    expect(response.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects impossible, future, and provider-unsupported dates', async () => {
    for (const date of ['1990-02-30', '1799-12-31', '2999-01-01']) {
      const response = await handler(request({
        ...validBody,
        birth: { ...validBody.birth, date },
      }));
      expect(response.status).toBe(400);
    }
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('sends only calculation fields and returns a provider-neutral chart', async () => {
    global.fetch.mockResolvedValue(new Response(JSON.stringify({
      planets: [
        { name: 'Sun', sign: 'Taurus', longitude: 21.4, house: 11, retrograde: false },
        { name: '', sign: 'Gemini' },
      ],
      aspects: [
        { aspect: 'trine', planet1: 'Sun', planet2: 'Moon', orb: 2.3 },
      ],
      warnings: ['House placements depend on the supplied birth time.'],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

    const response = await handler(request({
      ...validBody,
      localOnlyLabel: 'Must not leave the device',
    }));
    const result = await response.json();

    expect(response.status).toBe(200);
    const [, providerRequest] = global.fetch.mock.calls[0];
    expect(JSON.parse(providerRequest.body)).toEqual({ birth: validBody.birth });
    expect(providerRequest.body).not.toContain('localOnlyLabel');
    expect(result).toMatchObject({
      providerId: 'natalchart-ai',
      precision: 'date-time-timezone',
      placements: [{ body: 'Sun', sign: 'Taurus', longitude: 21.4, house: 11, retrograde: false }],
      aspects: [{ type: 'trine', fromBody: 'Sun', toBody: 'Moon', orbDegrees: 2.3 }],
      uncertaintyNotes: ['House placements depend on the supplied birth time.'],
    });
    expect(result.reflectiveDisclosure).toContain('not factual or predictive');
  });

  it('does not return a successful chart for an invalid provider payload', async () => {
    global.fetch.mockResolvedValue(new Response(JSON.stringify({ planets: [], aspects: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await handler(request());

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: 'The astrology calculation service returned an invalid chart.',
    });
  });
});
