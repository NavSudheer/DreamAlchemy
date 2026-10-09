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

    const error = await generateDreamImage(request, true).catch((value: unknown) => value);

    expect(error).toBeInstanceOf(DreamImageError);
    expect(error).toMatchObject({ code: expectedCode, serverCode, message: 'Stable public failure.' });
  });

  it('maps transport failures without inspecting their message', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('opaque transport failure'));
    const { generateDreamImage } = require('../dreamImage');

    await expect(generateDreamImage(request, true)).rejects.toMatchObject({
      code: 'offline',
      retryable: true,
    });
  });

  it('sends only the curated scene, style, and explicit consent', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      json: jest.fn().mockResolvedValue({ code: 'provider_unavailable' }),
    } as never);
    const { generateDreamImage } = require('../dreamImage');

    await expect(generateDreamImage(request, true)).rejects.toMatchObject({ code: 'not_available' });

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string);
    expect(body).toEqual({
      visualReflectionPrompt: request.visualReflectionPrompt,
      style: request.style,
      consent: {
        artisticUseAcknowledged: true,
        externalProcessingAllowed: true,
      },
    });
    expect(body).not.toHaveProperty('dreamId');
    expect(body).not.toHaveProperty('dreamText');
    expect(body).not.toHaveProperty('analysis');
  });

  it('does not contact the proxy without current explicit consent', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const { generateDreamImage } = require('../dreamImage');

    await expect(generateDreamImage(request, false)).rejects.toMatchObject({
      code: 'invalid_request',
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
