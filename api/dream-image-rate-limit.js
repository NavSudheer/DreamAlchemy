const DEFAULT_TIMEOUT_MS = 2_000;
const localBuckets = new Map();
const localHmacKey = crypto.getRandomValues(new Uint8Array(32));

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

const hashLocalIdentifier = async (value) => {
  const key = await crypto.subtle.importKey(
    'raw',
    localHmacKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
};

const checkLocalLimit = async (request, limit, windowSeconds) => {
  const now = Date.now();
  const windowMs = windowSeconds * 1_000;
  const clientAddress = getClientAddress(request);
  const identifierHash = await hashLocalIdentifier(clientAddress);
  const recentRequests = (localBuckets.get(identifierHash) || []).filter(timestamp => now - timestamp < windowMs);

  if (recentRequests.length >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((recentRequests[0] + windowMs - now) / 1_000));
    localBuckets.set(identifierHash, recentRequests);
    return { allowed: false, status: 429, code: 'rate_limited', retryAfterSeconds };
  }

  recentRequests.push(now);
  localBuckets.set(identifierHash, recentRequests);
  if (localBuckets.size > 5_000) {
    for (const [hash, timestamps] of localBuckets) {
      if (!timestamps.some(timestamp => now - timestamp < windowMs)) localBuckets.delete(hash);
    }
    if (localBuckets.size > 5_000) {
      localBuckets.delete(identifierHash);
      return { allowed: false, status: 503, code: 'rate_limit_capacity' };
    }
  }
  return { allowed: true, mode: 'memory' };
};

const isRequired = () =>
  process.env.VERCEL_ENV === 'production'
  || process.env.DREAM_IMAGE_PROVIDER_ENABLED === 'true'
  || process.env.DREAM_IMAGE_RATE_LIMIT_REQUIRED === 'true';

export async function checkDreamImageRateLimit(request) {
  const url = process.env.DREAM_IMAGE_RATE_LIMIT_URL;
  const token = process.env.DREAM_IMAGE_RATE_LIMIT_TOKEN;
  const hashSecret = process.env.DREAM_IMAGE_RATE_LIMIT_HASH_SECRET;
  const limit = boundedNumber(process.env.DREAM_IMAGE_RATE_LIMIT, 5, 1, 50);
  const windowSeconds = boundedNumber(
    process.env.DREAM_IMAGE_RATE_LIMIT_WINDOW_SECONDS,
    3_600,
    60,
    86_400,
  );

  if (!url || !token || !hashSecret) {
    if (
      process.env.DREAM_IMAGE_RATE_LIMIT_MODE === 'memory'
      && process.env.VERCEL_ENV !== 'production'
    ) {
      return checkLocalLimit(request, limit, windowSeconds);
    }
    return isRequired()
      ? { allowed: false, status: 503, code: 'rate_limit_not_configured' }
      : { allowed: true, mode: 'not-configured' };
  }

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
        scope: 'dream-image-generation',
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
        code: 'rate_limited',
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
