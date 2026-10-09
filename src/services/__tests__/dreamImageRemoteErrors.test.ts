import { DreamImageRequest } from '../../types/dreamImage';

const request: DreamImageRequest = {
  dreamId: 'local-dream',
  visualReflectionPrompt: 'A curated moonlit landscape.',
  style: 'ethereal',
};

describe('Dream Image typed remote errors', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    process.env = {
      ...originalEnvironment,
      EXPO_PUBLIC_DREAM_IMAGE_API_URL: 'https://proxy.example/api/dream-image',
    };
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it.each([
    [422, 'moderation_rejected', 'moderation_rejected'],
    [429, 'rate_limited', 'rate_limited'],
    [503, 'provider_unavailable', 'not_available'],
  ])('maps HTTP %s and %s to a typed client error', async (status, serverCode, expectedCode) => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status,
      json: jest.fn().mockResolvedValue({ error: 'Stable public failure.', code: serverCode }),
    } as never);
    const { DreamImageError, generateDreamImage } = require('../dreamImage');

    const error = await generateDreamImage(request).catch((value: unknown) => value);

    expect(error).toBeInstanceOf(DreamImageError);
    expect(error).toMatchObject({ code: expectedCode, serverCode, message: 'Stable public failure.' });
  });

  it('maps transport failures without inspecting their message', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('opaque transport failure'));
    const { generateDreamImage } = require('../dreamImage');

    await expect(generateDreamImage(request)).rejects.toMatchObject({
      code: 'offline',
      retryable: true,
    });
  });
});
