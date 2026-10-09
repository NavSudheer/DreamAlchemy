const DEFAULT_TIMEOUT_MS = 2_000;

const boundedNumber = (value, fallback, min, max) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
};

const getClientAddress = (request) => {
  const forwarded = request.headers?.get?.('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers?.get?.('x-real-ip')?.trim() || 'unknown-client';
};

const hashIdentifier = async (value, secret) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
};

const isRequired = () =>
  process.env.VERCEL_ENV === 'production'
  || process.env.ASTROLOGY_RATE_LIMIT_REQUIRED === 'true';

export async function checkAstrologyRateLimit(request, scope) {
  const url = process.env.ASTROLOGY_RATE_LIMIT_URL;
  const token = process.env.ASTROLOGY_RATE_LIMIT_TOKEN;
  const hashSecret = process.env.ASTROLOGY_RATE_LIMIT_HASH_SECRET;

  if (!url || !token || !hashSecret) {
    return isRequired()
      ? { allowed: false, status: 503, code: 'rate_limit_not_configured' }
      : { allowed: true, mode: 'not-configured' };
  }

  const limit = boundedNumber(
    scope === 'chart' ? process.env.ASTROLOGY_CHART_RATE_LIMIT : process.env.ASTROLOGY_REFLECTION_RATE_LIMIT,
    10,
    1,
    100,
  );
  const windowSeconds = boundedNumber(process.env.ASTROLOGY_RATE_LIMIT_WINDOW_SECONDS, 3_600, 60, 86_400);
  const identifierHash = await hashIdentifier(getClientAddress(request), hashSecret);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scope: `astrology-${scope}`,
        identifierHash,
        limit,
        windowSeconds,
      }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (response.status === 429 || result?.allowed === false) {
      return {
        allowed: false,
        status: 429,
        code: 'rate_limit_exceeded',
        retryAfterSeconds: boundedNumber(result?.retryAfterSeconds, windowSeconds, 1, windowSeconds),
      };
    }
    if (!response.ok || result?.allowed !== true) {
      return { allowed: false, status: 503, code: 'rate_limit_unavailable' };
    }
    return { allowed: true, mode: 'enforced' };
  } catch {
    return { allowed: false, status: 503, code: 'rate_limit_unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}
