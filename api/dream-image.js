export const config = { runtime: 'edge' };

const MAX_REQUEST_BYTES = 16_000;
const ALLOWED_FIELDS = new Set(['visualReflectionPrompt', 'style', 'consent']);
export const DREAM_IMAGE_ALLOWED_STYLES = ['ethereal', 'surreal', 'watercolor', 'cinematic'];
export const DREAM_IMAGE_ALLOWED_PROMPTS = [
  'An ancient stone doorway standing open in a quiet field of tall grass, glowing softly with warm amber twilight beneath violet clouds and distant constellations.',
  'A glassy alpine lake at dusk perfectly reflecting a slender crescent moon and silver constellations, with subtle ripples catching soft light around smooth river stones.',
  'A peaceful clearing deep within an ancient misty forest where gentle morning rays filter through emerald moss and spiraling tree boughs onto a smooth resting stone.',
  'A panoramic perspective above a sea of rolling white clouds at sunrise, with warm golden light stretching toward deep indigo skies and drifting feather silhouettes.',
  'A concentric labyrinth of low weathered stones set in soft mossy earth, gently winding toward a still central reflecting pool under twilight stars.',
  'Gentle aquatic currents flowing through deep twilight-blue waters, carrying drifting ribbons of soft aquamarine bioluminescence and shimmering silver light particles.',
  'A solitary weathered bronze lantern casting a warm golden glow onto a wooden footbridge that stretches over morning valley mist toward soft rolling hills.',
];
const ALLOWED_STYLES = new Set(DREAM_IMAGE_ALLOWED_STYLES);
const ALLOWED_PROMPTS = new Set(DREAM_IMAGE_ALLOWED_PROMPTS);

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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

export default async function handler(request) {
  if (request.method === 'OPTIONS') return json({}, 204);
  if (request.method !== 'POST') return errorJson('Method not allowed.', 'method_not_allowed', 405);
  if (process.env.DREAM_IMAGE_FEATURE_ENABLED !== 'true') {
    return errorJson('Dream images are not enabled.', 'feature_disabled', 503);
  }

  try {
    const body = await readBoundedJson(request);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return errorJson('Request body must be a JSON object.', 'invalid_request', 400);
    }

    const unexpectedField = Object.keys(body).find(field => !ALLOWED_FIELDS.has(field));
    if (unexpectedField) {
      return errorJson(
        `The field "${unexpectedField}" is not accepted by this endpoint.`,
        'unexpected_field',
        400,
      );
    }

    if (
      body.consent?.artisticUseAcknowledged !== true
      || body.consent?.externalProcessingAllowed !== true
    ) {
      return errorJson('Explicit Dream Image processing consent is required.', 'consent_required', 400);
    }

    if (typeof body.visualReflectionPrompt !== 'string' || !ALLOWED_PROMPTS.has(body.visualReflectionPrompt)) {
      return errorJson('Choose an approved visual reflection template.', 'prompt_not_allowed', 400);
    }
    if (typeof body.style !== 'string' || !ALLOWED_STYLES.has(body.style)) {
      return errorJson('Choose an approved Dream Image style.', 'style_not_allowed', 400);
    }

    // Provider selection and invocation are intentionally outside this contract-only route.
    return errorJson('The Dream Image provider is not configured.', 'provider_unavailable', 503);
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return errorJson(error.message, error.code, error.status);
    }
    return errorJson('Could not validate the Dream Image request.', 'internal_error', 500);
  }
}
