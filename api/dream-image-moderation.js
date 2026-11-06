const DEFAULT_TIMEOUT_MS = 3_000;
const OPENAI_MODERATION_URL = 'https://api.openai.com/v1/moderations';
const OPENAI_MODERATION_MODEL = 'omni-moderation-latest';

const isRequired = () =>
  process.env.VERCEL_ENV === 'production'
  || process.env.DREAM_IMAGE_PROVIDER_ENABLED === 'true'
  || process.env.DREAM_IMAGE_MODERATION_REQUIRED === 'true';

export async function checkDreamImageModeration(visualReflectionPrompt, style) {
  const url = process.env.DREAM_IMAGE_MODERATION_URL;
  const token = process.env.DREAM_IMAGE_MODERATION_TOKEN;
  const openAiKey = process.env.OPENAI_API_KEY;

  if ((!url || !token) && !openAiKey) {
    return isRequired()
      ? { allowed: false, status: 503, code: 'moderation_not_configured' }
      : { allowed: true, mode: 'not-configured' };
  }

  const useOpenAi = !url || !token;
  const endpoint = useOpenAi ? OPENAI_MODERATION_URL : url;
  const authorization = useOpenAi ? openAiKey : token;
  const payload = useOpenAi
    ? { model: OPENAI_MODERATION_MODEL, input: `${visualReflectionPrompt}\nStyle: ${style}` }
    : { visualReflectionPrompt, style };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    const flagged = useOpenAi ? result?.results?.[0]?.flagged : result?.allowed === false;
    if (response.status === 422 || flagged === true) {
      return { allowed: false, status: 422, code: 'moderation_rejected' };
    }
    const explicitlyAllowed = useOpenAi ? typeof flagged === 'boolean' : result?.allowed === true;
    if (!response.ok || !explicitlyAllowed) {
      return { allowed: false, status: 503, code: 'moderation_unavailable' };
    }
    return { allowed: true, mode: 'enforced' };
  } catch {
    return { allowed: false, status: 503, code: 'moderation_unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}
