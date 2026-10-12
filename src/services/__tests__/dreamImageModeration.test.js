/* global jest, describe, beforeEach, afterAll, it, expect */

const { checkDreamImageModeration } = require('../../../api/dream-image-moderation');

const prompt = 'An approved curated scene.';
const style = 'ethereal';

describe('Dream Image server moderation boundary', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.restoreAllMocks();
    process.env = { ...originalEnvironment };
    delete process.env.DREAM_IMAGE_MODERATION_URL;
    delete process.env.DREAM_IMAGE_MODERATION_TOKEN;
    delete process.env.DREAM_IMAGE_MODERATION_REQUIRED;
    delete process.env.DREAM_IMAGE_PROVIDER_ENABLED;
    delete process.env.VERCEL_ENV;
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('allows disabled-by-default Preview contract work without a moderation service', async () => {
    await expect(checkDreamImageModeration(prompt, style)).resolves.toEqual({
      allowed: true,
      mode: 'not-configured',
    });
  });

  it('fails closed before provider activation when moderation is not configured', async () => {
    process.env.DREAM_IMAGE_PROVIDER_ENABLED = 'true';

    await expect(checkDreamImageModeration(prompt, style)).resolves.toMatchObject({
      allowed: false,
      status: 503,
      code: 'moderation_not_configured',
    });
  });

  it('sends only the already-curated scene and style to the moderation service', async () => {
    process.env.DREAM_IMAGE_MODERATION_URL = 'https://moderation.example/check';
    process.env.DREAM_IMAGE_MODERATION_TOKEN = 'server-token';
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ allowed: true }),
    });

    await expect(checkDreamImageModeration(prompt, style)).resolves.toEqual({
      allowed: true,
      mode: 'enforced',
    });

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      visualReflectionPrompt: prompt,
      style,
    });
  });

  it('returns a stable rejection without exposing upstream details', async () => {
    process.env.DREAM_IMAGE_MODERATION_URL = 'https://moderation.example/check';
    process.env.DREAM_IMAGE_MODERATION_TOKEN = 'server-token';
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 422,
      json: jest.fn().mockResolvedValue({ allowed: false, privateReason: 'do not expose' }),
    });

    await expect(checkDreamImageModeration(prompt, style)).resolves.toEqual({
      allowed: false,
      status: 422,
      code: 'moderation_rejected',
    });
  });
});
