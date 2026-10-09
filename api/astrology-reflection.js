import { OpenAI } from 'openai';
import { checkAstrologyRateLimit } from './astrology-rate-limit';

export const config = { runtime: 'edge' };

const MAX_SUMMARY_CHARS = 6000;
const MAX_OUTPUT_TOKENS = 350;
const MAX_REQUEST_BYTES = 64_000;
const DEFAULT_UPSTREAM_TIMEOUT_MS = 20_000;

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

export default async function handler(request) {
  if (request.method === 'OPTIONS') return json({}, 204);
  if (request.method !== 'POST') return errorJson('Method not allowed', 'method_not_allowed', 405);
  if (process.env.ASTROLOGY_FEATURE_ENABLED !== 'true') {
    return errorJson('Astrology is not enabled.', 'feature_disabled', 503);
  }
  if (!process.env.OPENAI_API_KEY) return errorJson('Reflection service is not configured.', 'reflection_not_configured', 503);

  try {
    const body = await readBoundedJson(request);
    if (body?.consent?.reflectiveUseAcknowledged !== true || body?.consent?.externalProcessingAllowed !== true) {
      return errorJson('Explicit astrology processing consent is required.', 'consent_required', 400);
    }
    if (['dreamText', 'dream', 'profile', 'birth', 'birthDate', 'birthTime', 'timezone', 'latitude', 'longitude', 'locationLabel', 'coordinates'].some((field) => field in (body ?? {}))) {
      return errorJson('Raw dream or birth-profile data is not accepted by this endpoint.', 'sensitive_data_rejected', 400);
    }

    const chart = body?.chart;
    const compactChart = {
      precision: chart?.precision,
      placements: Array.isArray(chart?.placements) ? chart.placements.slice(0, 12).map((item) => ({
        body: item.body,
        sign: item.sign,
        house: item.house,
        retrograde: item.retrograde,
      })) : [],
      aspects: Array.isArray(chart?.aspects) ? chart.aspects.slice(0, 10).map((item) => ({
        type: item.type,
        fromBody: item.fromBody,
        toBody: item.toBody,
      })) : [],
      uncertaintyNotes: Array.isArray(chart?.uncertaintyNotes) ? chart.uncertaintyNotes.slice(0, 4) : [],
    };
    const serializedChart = JSON.stringify(compactChart);
    if (!compactChart.placements.length || serializedChart.length > MAX_SUMMARY_CHARS) {
      return errorJson('A compact calculated chart is required.', 'chart_required', 400);
    }

    const rateLimit = await checkAstrologyRateLimit(request, 'reflection');
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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), upstreamTimeoutMs());
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: process.env.ASTROLOGY_REFLECTION_MODEL || 'gpt-4o-mini',
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content: 'Write a concise astrology reflection for entertainment and self-inquiry. Never predict events, diagnose, prescribe, claim certainty, or mention dream content. Treat symbols as optional metaphors. Return plain text in 2-3 short paragraphs, under 220 words.',
          },
          {
            role: 'user',
            content: `Offer a balanced, non-predictive reflection on this calculated chart summary:\n${serializedChart}`,
          },
        ],
      }, { signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }

    const reflection = completion.choices[0]?.message?.content?.trim();
    if (!reflection) return errorJson('The reflection response was empty.', 'reflection_empty', 502);

    return json({
      reflection,
      generatedAt: new Date().toISOString(),
      disclosure: 'AI-generated reflection for entertainment and self-inquiry only; not factual or predictive advice.',
    });
  } catch (error) {
    if (error instanceof RequestValidationError) return errorJson(error.message, error.code, error.status);
    if (error?.name === 'AbortError') {
      return errorJson('The astrology reflection service timed out.', 'provider_timeout', 504);
    }
    return errorJson('Could not generate the astrology reflection.', 'internal_error', 500);
  }
}
