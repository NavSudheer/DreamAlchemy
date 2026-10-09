/* global jest, describe, beforeEach, afterAll, it, expect */

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

const request = (body = validBody, overrides = {}) => ({
  method: 'POST',
  json: jest.fn().mockResolvedValue(body),
  ...overrides,
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
    await expect(response.json()).resolves.toEqual({
      error: 'Astrology is not enabled.',
      code: 'feature_disabled',
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('requires JSON and rejects oversized request bodies before provider work', async () => {
    const invalidType = await handler(request(validBody, {
      headers: { get: jest.fn((name) => name === 'content-type' ? 'text/plain' : null) },
    }));
    expect(invalidType.status).toBe(415);
    await expect(invalidType.json()).resolves.toMatchObject({ code: 'invalid_content_type' });

    const oversized = await handler(request(validBody, {
      headers: { get: jest.fn((name) => name === 'content-length' ? '20000' : 'application/json') },
    }));
    expect(oversized.status).toBe(413);
    await expect(oversized.json()).resolves.toMatchObject({ code: 'payload_too_large' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects dream data at the chart-calculation boundary', async () => {
    const response = await handler(request({ ...validBody, dreamText: 'private journal text' }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ code: 'sensitive_data_rejected' });
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
      angles: {
        ascendant: { sign: 'Cancer', longitude: 12.5 },
        midheaven: { sign: 'Pisces', longitude: 2.1 },
      },
      houses: [
        { house: 1, sign: 'Cancer', longitude: 12.5 },
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
      placements: [
        { body: 'Sun', sign: 'Taurus', longitude: 21.4, house: 11, retrograde: false },
        { body: 'Ascendant', sign: 'Cancer', longitude: 12.5 },
        { body: 'Midheaven', sign: 'Pisces', longitude: 2.1 },
      ],
      aspects: [{ type: 'trine', fromBody: 'Sun', toBody: 'Moon', orbDegrees: 2.3 }],
      uncertaintyNotes: ['House placements depend on the supplied birth time.'],
    });
    expect(result.reflectiveDisclosure).toContain('not factual or predictive');
  });

  it('omits houses and angles when birth time is unknown', async () => {
    global.fetch.mockResolvedValue(new Response(JSON.stringify({
      planets: [{ name: 'Moon', sign: 'Libra', longitude: 5.2, house: 4 }],
      angles: {
        ascendant: { sign: 'Cancer', longitude: 12.5 },
        midheaven: { sign: 'Pisces', longitude: 2.1 },
      },
      warnings: ['The Moon may change sign on this date.'],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

    const response = await handler(request({
      ...validBody,
      birth: { ...validBody.birth, time: null },
    }));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).birth.time).toBeNull();
    expect(result.precision).toBe('date-only');
    expect(result.placements).toEqual([{ body: 'Moon', sign: 'Libra', longitude: 5.2 }]);
    expect(result.uncertaintyNotes).toEqual([
      'Birth time was not provided; time-dependent placements and houses are omitted.',
      'The Moon may change sign on this date.',
    ]);
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
      code: 'provider_invalid_response',
    });
  });

  it('propagates provider rate limiting as a stable public error', async () => {
    global.fetch.mockResolvedValue(new Response(JSON.stringify({
      error: { code: 'daily_limit_reached', message: 'Provider-specific details must stay private.' },
    }), { status: 429, headers: { 'Retry-After': '3600' } }));

    const response = await handler(request());

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('3600');
    await expect(response.json()).resolves.toMatchObject({ code: 'provider_rate_limited' });
  });

  it('does not expose provider authentication details', async () => {
    global.fetch.mockResolvedValue(new Response(JSON.stringify({
      error: { code: 'invalid_api_key', message: 'The provider rejected a private credential.' },
    }), { status: 401 }));

    const response = await handler(request());

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: 'The astrology calculation service is unavailable.',
      code: 'provider_unavailable',
    });
  });

  it('maps an aborted provider request to a timeout error', async () => {
    const timeout = new Error('aborted');
    timeout.name = 'AbortError';
    global.fetch.mockRejectedValue(timeout);

    const response = await handler(request());

    expect(response.status).toBe(504);
    await expect(response.json()).resolves.toMatchObject({ code: 'provider_timeout' });
  });
});
