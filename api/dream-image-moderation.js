const DEFAULT_TIMEOUT_MS = 3_000;

const isRequired = () =>
  process.env.VERCEL_ENV === 'production'
  || process.env.DREAM_IMAGE_PROVIDER_ENABLED === 'true'
  || process.env.DREAM_IMAGE_MODERATION_REQUIRED === 'true';

export async function checkDreamImageModeration(visualReflectionPrompt, style) {
  const url = process.env.DREAM_IMAGE_MODERATION_URL;
  const token = process.env.DREAM_IMAGE_MODERATION_TOKEN;

  if (!url || !token) {
    return isRequired()
      ? { allowed: false, status: 503, code: 'moderation_not_configured' }
      : { allowed: true, mode: 'not-configured' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visualReflectionPrompt, style }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (response.status === 422 || result?.allowed === false) {
      return { allowed: false, status: 422, code: 'moderation_rejected' };
    }
    if (!response.ok || result?.allowed !== true) {
      return { allowed: false, status: 503, code: 'moderation_unavailable' };
    }
    return { allowed: true, mode: 'enforced' };
  } catch {
    return { allowed: false, status: 503, code: 'moderation_unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}
