/* global jest, describe, beforeEach, afterAll, it, expect */

jest.mock('../../../api/dream-image-google', () => ({
  generateGoogleDreamImage: jest.fn().mockResolvedValue({
    imageUrl: 'data:image/png;base64,aGVsbG8=',
  }),
}));
jest.mock('../../../api/dream-image-rate-limit', () => ({
  checkDreamImageRateLimit: jest.fn().mockResolvedValue({ allowed: true }),
}));
jest.mock('../../../api/dream-image-moderation', () => ({
  checkDreamImageModeration: jest.fn().mockResolvedValue({ allowed: true }),
}));

const { POST: handler } = require('../../../api/dream-image');
const { generateGoogleDreamImage } = require('../../../api/dream-image-google');
const { checkDreamImageRateLimit } = require('../../../api/dream-image-rate-limit');
const { checkDreamImageModeration } = require('../../../api/dream-image-moderation');

const body = {
  visualReflectionPrompt: 'An ancient stone doorway standing open in a quiet field of tall grass, glowing softly with warm amber twilight beneath violet clouds and distant constellations.',
  style: 'ethereal',
  consent: { artisticUseAcknowledged: true, externalProcessingAllowed: true },
};

const request = () => ({
  method: 'POST',
  headers: { get: () => null },
  json: jest.fn().mockResolvedValue(body),
});

describe('Google Vertex Dream Image route integration', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnvironment,
      DREAM_IMAGE_FEATURE_ENABLED: 'true',
      DREAM_IMAGE_PROVIDER_ENABLED: 'true',
    };
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('runs server safety boundaries before generation and returns a non-cached accessible result', async () => {
    const routeRequest = request();
    const response = await handler(routeRequest);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toContain('private, no-store');
    expect(result).toMatchObject({
      imageUrl: 'data:image/png;base64,aGVsbG8=',
      altText: expect.stringContaining('stone doorway'),
    });
    expect(result.id).toBeTruthy();
    expect(Number.isNaN(Date.parse(result.generatedAt))).toBe(false);
    expect(checkDreamImageRateLimit).toHaveBeenCalledTimes(1);
    expect(checkDreamImageModeration).toHaveBeenCalledWith(body.visualReflectionPrompt, body.style);
    expect(generateGoogleDreamImage).toHaveBeenCalledWith(body.visualReflectionPrompt, body.style, routeRequest);
  });

  it('maps a provider safety-filter response to the public moderation error without exposing provider detail', async () => {
    generateGoogleDreamImage.mockRejectedValueOnce(Object.assign(
      new Error('private upstream detail'),
      { code: 'moderation_rejected' },
    ));

    const response = await handler(request());
    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toEqual({
      error: 'The generated image did not pass the provider safety checks.',
      code: 'moderation_rejected',
    });
  });
});
