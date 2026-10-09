import { checkAstrologyRateLimit } from './astrology-rate-limit';

const DEFAULT_ASTROLOGY_API_URL = 'https://api.natalchart.ai/v1/chart/full';
const MAX_REQUEST_BYTES = 16_384;
const DEFAULT_UPSTREAM_TIMEOUT_MS = 15_000;

export const config = { runtime: 'edge' };

const json = (body, status = 200, extraHeaders = {}) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...extraHeaders,
  },
});

const errorJson = (error, code, status) => json({ error, code }, status);

class RequestValidationError extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

const readBoundedJson = async (request) => {
  const contentType = request.headers?.get?.('content-type');
  if (contentType && !contentType.toLowerCase().includes('application/json')) {
    throw new RequestValidationError('Content-Type must be application/json.', 'invalid_content_type', 415);
  }
  const declaredLength = Number(request.headers?.get?.('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    throw new RequestValidationError('Request body is too large.', 'payload_too_large', 413);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    throw new RequestValidationError('Request body must be valid JSON.', 'invalid_json', 400);
  }
  if (new TextEncoder().encode(JSON.stringify(body)).length > MAX_REQUEST_BYTES) {
    throw new RequestValidationError('Request body is too large.', 'payload_too_large', 413);
  }
  return body;
};

const upstreamTimeoutMs = () => {
  const configured = Number(process.env.ASTROLOGY_UPSTREAM_TIMEOUT_MS);
  return Number.isFinite(configured) && configured >= 1_000 && configured <= 30_000
    ? configured
    : DEFAULT_UPSTREAM_TIMEOUT_MS;
};

const isFiniteCoordinate = (value, min, max) =>
  typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;

const isValidBirthDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  return year >= 1800
    && date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day
    && date.getTime() <= Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
};

export default async function handler(request) {
  if (request.method === 'OPTIONS') return json({}, 204);
  if (request.method !== 'POST') return errorJson('Method not allowed', 'method_not_allowed', 405);
  if (process.env.ASTROLOGY_FEATURE_ENABLED !== 'true') {
    return errorJson('Astrology is not enabled.', 'feature_disabled', 503);
  }

  const apiKey = process.env.ASTROLOGY_API_KEY;
  if (!apiKey) return errorJson('Astrology is not configured.', 'provider_not_configured', 503);

  try {
    const body = await readBoundedJson(request);
    if (['dream', 'dreamText', 'journal', 'analysis', 'reflection'].some((field) => field in (body ?? {}))) {
      return errorJson('Dream or reflection data is not accepted by this endpoint.', 'sensitive_data_rejected', 400);
    }
    const { birth, consent } = body ?? {};
    if (consent?.reflectiveUseAcknowledged !== true || consent?.externalProcessingAllowed !== true) {
      return errorJson('Explicit astrology processing consent is required.', 'consent_required', 400);
    }
    if (!isValidBirthDate(birth?.date)) {
      return errorJson('A valid birth date is required.', 'invalid_birth_date', 400);
    }
    if (!isFiniteCoordinate(birth?.latitude, -90, 90) || !isFiniteCoordinate(birth?.longitude, -180, 180)) {
      return errorJson('Valid coordinates are required for chart calculation.', 'invalid_coordinates', 400);
    }
    if (birth?.time != null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(birth.time)) {
      return errorJson('Birth time must use HH:mm or be omitted.', 'invalid_birth_time', 400);
    }

    const rateLimit = await checkAstrologyRateLimit(request, 'chart');
    if (!rateLimit.allowed) {
      return json(
        {
          error: rateLimit.status === 429
            ? 'The astrology request limit has been reached.'
            : 'Astrology request controls are temporarily unavailable.',
          code: rateLimit.code,
        },
        rateLimit.status,
        rateLimit.retryAfterSeconds ? { 'Retry-After': String(rateLimit.retryAfterSeconds) } : {},
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), upstreamTimeoutMs());
    let providerResponse;
    try {
      providerResponse = await fetch(process.env.ASTROLOGY_API_URL || DEFAULT_ASTROLOGY_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birth: {
            date: birth.date,
            time: birth.time ?? null,
            latitude: birth.latitude,
            longitude: birth.longitude,
            ...(birth.timezone ? { timezone: birth.timezone } : {}),
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!providerResponse.ok) {
      if (providerResponse.status === 429) {
        return errorJson('The astrology calculation service is rate limited.', 'provider_rate_limited', 429);
      }
      return errorJson('The astrology calculation service is unavailable.', 'provider_unavailable', 502);
    }

    const providerChart = await providerResponse.json();
    const planets = Array.isArray(providerChart.planets) ? providerChart.planets : [];
    const aspects = Array.isArray(providerChart.aspects) ? providerChart.aspects : [];
    const warnings = Array.isArray(providerChart.warnings) ? providerChart.warnings.map(String) : [];
    const placements = planets.map((planet) => ({
      body: String(planet.name ?? ''),
      sign: String(planet.sign ?? ''),
      ...(Number.isFinite(planet.longitude) ? { longitude: planet.longitude } : {}),
      ...(Number.isFinite(planet.house) ? { house: planet.house } : {}),
      ...(typeof planet.retrograde === 'boolean' ? { retrograde: planet.retrograde } : {}),
    })).filter((placement) => placement.body && placement.sign);
    if (!placements.length) {
      return errorJson('The astrology calculation service returned an invalid chart.', 'provider_invalid_response', 502);
    }

    return json({
      providerId: 'natalchart-ai',
      calculatedAt: Date.now(),
      precision: birth.time ? (birth.timezone ? 'date-time-timezone' : 'date-and-time') : 'date-only',
      placements,
      aspects: aspects.map((aspect) => ({
        type: String(aspect.aspect ?? aspect.type ?? ''),
        fromBody: String(aspect.planet1 ?? aspect.fromBody ?? ''),
        toBody: String(aspect.planet2 ?? aspect.toBody ?? ''),
        ...(Number.isFinite(aspect.orb) ? { orbDegrees: aspect.orb } : {}),
      })).filter((aspect) => aspect.type && aspect.fromBody && aspect.toBody),
      uncertaintyNotes: birth.time ? warnings : ['Birth time was not provided; time-dependent placements are omitted or approximate.'],
      reflectiveDisclosure: 'For personal reflection and entertainment only; this chart is not factual or predictive advice and is not medical, legal, or financial guidance.',
    });
  } catch (error) {
    if (error instanceof RequestValidationError) return errorJson(error.message, error.code, error.status);
    if (error?.name === 'AbortError') {
      return errorJson('The astrology calculation service timed out.', 'provider_timeout', 504);
    }
    return errorJson('Could not calculate the astrology chart.', 'internal_error', 500);
  }
}
