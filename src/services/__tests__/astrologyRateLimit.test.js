/* global jest, describe, beforeEach, afterAll, it, expect */

const { checkAstrologyRateLimit } = require('../../../api/astrology-rate-limit');

const request = (address = '203.0.113.42') => ({
  headers: { get: jest.fn((name) => name === 'x-forwarded-for' ? address : null) },
});

describe('astrology anonymous rate-limit boundary', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.restoreAllMocks();
    process.env = { ...originalEnvironment };
    delete process.env.ASTROLOGY_RATE_LIMIT_URL;
    delete process.env.ASTROLOGY_RATE_LIMIT_TOKEN;
    delete process.env.ASTROLOGY_RATE_LIMIT_HASH_SECRET;
    delete process.env.ASTROLOGY_RATE_LIMIT_REQUIRED;
    delete process.env.VERCEL_ENV;
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('allows local and preview work when no limiter is configured', async () => {
    await expect(checkAstrologyRateLimit(request(), 'chart')).resolves.toEqual({
      allowed: true,
      mode: 'not-configured',
    });
  });

  it('fails closed in production when durable limiter settings are absent', async () => {
    process.env.VERCEL_ENV = 'production';

    await expect(checkAstrologyRateLimit(request(), 'chart')).resolves.toMatchObject({
      allowed: false,
      status: 503,
      code: 'rate_limit_not_configured',
    });
  });

  it('sends only a keyed client hash and bounded quota metadata', async () => {
    process.env.ASTROLOGY_RATE_LIMIT_URL = 'https://limiter.example/check';
    process.env.ASTROLOGY_RATE_LIMIT_TOKEN = 'server-token';
    process.env.ASTROLOGY_RATE_LIMIT_HASH_SECRET = 'hash-secret';
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ allowed: true }),
    });

    await expect(checkAstrologyRateLimit(request(), 'reflection')).resolves.toEqual({
      allowed: true,
      mode: 'enforced',
    });

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload).toMatchObject({ scope: 'astrology-reflection', limit: 10, windowSeconds: 3600 });
    expect(payload.identifierHash).toMatch(/^[a-f0-9]{64}$/);
    expect(JSON.stringify(payload)).not.toContain('203.0.113.42');
  });

  it('returns a bounded retry interval when the durable limiter denies a request', async () => {
    process.env.ASTROLOGY_RATE_LIMIT_URL = 'https://limiter.example/check';
    process.env.ASTROLOGY_RATE_LIMIT_TOKEN = 'server-token';
    process.env.ASTROLOGY_RATE_LIMIT_HASH_SECRET = 'hash-secret';
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
      json: jest.fn().mockResolvedValue({ allowed: false, retryAfterSeconds: 120 }),
    });

    await expect(checkAstrologyRateLimit(request(), 'chart')).resolves.toMatchObject({
      allowed: false,
      status: 429,
      code: 'rate_limit_exceeded',
      retryAfterSeconds: 120,
    });
  });
});
