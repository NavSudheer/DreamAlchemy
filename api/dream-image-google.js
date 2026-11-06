const GOOGLE_STS_URL = 'https://sts.googleapis.com/v1/token';
const GOOGLE_IAM_CREDENTIALS_URL = 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/cloud-platform';
const TOKEN_TIMEOUT_MS = 6_000;
// Imagen rendering can exceed the default interactive API window on a cold
// Preview function. Keep the provider call bounded below Vercel's 300s route
// ceiling so the server can return a typed error instead of being terminated.
const GENERATION_TIMEOUT_MS = 120_000;
const MAX_BASE64_IMAGE_LENGTH = 4_000_000;

const STYLE_GUIDANCE = {
  ethereal: 'Render as luminous, soft-focus artwork with gentle glowing highlights and twilight mist.',
  surreal: 'Render as poetic surreal artwork with imaginative perspective and symbolic geometry.',
  watercolor: 'Render as watercolor artwork with fluid pigment washes, organic edges, and textured paper.',
  cinematic: 'Render as cinematic artwork with atmospheric depth, soft volumetric light, and rich shadows.',
};

let cachedAccessToken;
let cachedAccessTokenExpiresAt = 0;

function loadWorkloadIdentityConfig(request) {
  const requiredSettings = [
    'GOOGLE_VERTEX_PROJECT_ID',
    'GOOGLE_VERTEX_PROJECT_NUMBER',
    'GOOGLE_VERTEX_LOCATION',
    'GOOGLE_VERTEX_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_VERTEX_WORKLOAD_IDENTITY_POOL_ID',
    'GOOGLE_VERTEX_WORKLOAD_IDENTITY_PROVIDER_ID',
    'GOOGLE_VERTEX_OIDC_ISSUER',
    'GOOGLE_VERTEX_OIDC_AUDIENCE',
    'GOOGLE_VERTEX_OIDC_SUBJECT',
  ];
  if (requiredSettings.some(name => !process.env[name])) {
    throw new Error('Google Vertex Workload Identity Federation settings are incomplete.');
  }

  const subjectToken = request?.headers?.get?.('x-vercel-oidc-token');
  if (typeof subjectToken !== 'string' || subjectToken.length === 0) {
    throw new Error('Google Vertex Vercel OIDC token is unavailable.');
  }

  // These checks fail fast on a token from the wrong Vercel project or environment.
  // Google STS still performs the signature and provider validation.
  let claims;
  try {
    const payload = subjectToken.split('.')[1];
    if (!payload) throw new Error('Malformed OIDC token.');
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    throw new Error('Google Vertex Vercel OIDC token is invalid.');
  }
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (
    claims.iss !== process.env.GOOGLE_VERTEX_OIDC_ISSUER
    || !audiences.includes(process.env.GOOGLE_VERTEX_OIDC_AUDIENCE)
    || claims.sub !== process.env.GOOGLE_VERTEX_OIDC_SUBJECT
  ) {
    throw new Error('Google Vertex Vercel OIDC token claims do not match this Preview project.');
  }

  const providerAudience = `//iam.googleapis.com/projects/${process.env.GOOGLE_VERTEX_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${process.env.GOOGLE_VERTEX_WORKLOAD_IDENTITY_POOL_ID}/providers/${process.env.GOOGLE_VERTEX_WORKLOAD_IDENTITY_PROVIDER_ID}`;
  const serviceAccountEmail = process.env.GOOGLE_VERTEX_SERVICE_ACCOUNT_EMAIL;
  if (!/^[^\s@]+@[^\s@]+\.iam\.gserviceaccount\.com$/.test(serviceAccountEmail)) {
    throw new Error('Google Vertex service account configuration is invalid.');
  }

  return { providerAudience, serviceAccountEmail, subjectToken };
}

async function getAccessToken(identity) {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TOKEN_TIMEOUT_MS);
  try {
    const federationResponse = await fetch(GOOGLE_STS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        audience: identity.providerAudience,
        requested_token_type: 'urn:ietf:params:oauth:token-type:access_token',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        subject_token: identity.subjectToken,
        scope: GOOGLE_SCOPE,
      }).toString(),
      signal: controller.signal,
    });
    const federation = await federationResponse.json().catch(() => ({}));
    if (!federationResponse.ok || typeof federation.access_token !== 'string') {
      throw new Error('Google Vertex authentication failed.');
    }

    const impersonationResponse = await fetch(
      `${GOOGLE_IAM_CREDENTIALS_URL}/${encodeURIComponent(identity.serviceAccountEmail)}:generateAccessToken`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${federation.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scope: [GOOGLE_SCOPE], lifetime: '3600s' }),
        signal: controller.signal,
      },
    );
    const impersonated = await impersonationResponse.json().catch(() => ({}));
    if (!impersonationResponse.ok || typeof impersonated.accessToken !== 'string') {
      throw new Error('Google Vertex service-account impersonation failed.');
    }
    cachedAccessToken = impersonated.accessToken;
    const expiresAt = Date.parse(impersonated.expireTime);
    cachedAccessTokenExpiresAt = Number.isFinite(expiresAt) ? expiresAt : Date.now() + 3_600_000;
    return cachedAccessToken;
  } finally {
    clearTimeout(timeout);
  }
}

export async function generateGoogleDreamImage(visualReflectionPrompt, style, request) {
  const identity = loadWorkloadIdentityConfig(request);
  const projectId = process.env.GOOGLE_VERTEX_PROJECT_ID;
  const location = process.env.GOOGLE_VERTEX_LOCATION;
  const configuredModel = process.env.GOOGLE_VERTEX_IMAGE_MODEL;
  // Imagen's generation endpoints were discontinued in June 2026. Keep older
  // Preview environment values working by moving them to Google's supported
  // Gemini image-generation API until the variable is updated.
  const model = !configuredModel || configuredModel.startsWith('imagen-')
    ? 'gemini-2.5-flash-image'
    : configuredModel;
  if (!projectId || !location || !STYLE_GUIDANCE[style]) {
    throw new Error('Google Vertex generation settings are incomplete.');
  }

  const token = await getAccessToken(identity);
  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/locations/${encodeURIComponent(location)}/publishers/google/models/${encodeURIComponent(model)}:generateContent`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: `${visualReflectionPrompt} ${STYLE_GUIDANCE[style]}` }],
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
          candidateCount: 1,
          imageConfig: { aspectRatio: '1:1' },
        },
      }),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error('Google Vertex image generation failed.');
      error.providerStatus = response.status;
      throw error;
    }

    const candidate = result?.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(part => part?.inlineData?.data);
    if (
      !imagePart
      && (result?.promptFeedback?.blockReason || candidate?.finishReason === 'SAFETY')
    ) {
      const error = new Error('Google Vertex safety filters rejected the image.');
      error.code = 'moderation_rejected';
      throw error;
    }
    const imageBase64 = imagePart?.inlineData?.data;
    const mimeType = imagePart?.inlineData?.mimeType;
    if (
      typeof imageBase64 !== 'string'
      || imageBase64.length === 0
      || imageBase64.length > MAX_BASE64_IMAGE_LENGTH
      || !/^[A-Za-z0-9+/]+={0,2}$/.test(imageBase64)
      || !['image/png', 'image/jpeg'].includes(mimeType)
    ) {
      throw new Error('Google Vertex returned an invalid or oversized image.');
    }

    return { imageUrl: `data:${mimeType};base64,${imageBase64}` };
  } finally {
    clearTimeout(timeout);
  }
}
