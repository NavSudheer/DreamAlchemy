import {
  DreamImageAvailability,
  DreamImageRequest,
  GeneratedDreamImage,
} from '../types/dreamImage';

const DREAM_IMAGE_API_URL = process.env.EXPO_PUBLIC_DREAM_IMAGE_API_URL;
const REQUEST_TIMEOUT_MS = 60_000;

export class DreamImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DreamImageError';
  }
}

export const getDreamImageAvailability = (): DreamImageAvailability =>
  DREAM_IMAGE_API_URL
    ? { available: true }
    : { available: false, reason: 'not-configured' };

/**
 * Requests a generated visual reflection from an application-owned server
 * proxy. Provider selection, moderation, authentication, and rate limiting
 * belong on that server; no provider credential is included in the app.
 */
export async function generateDreamImage(
  request: DreamImageRequest,
): Promise<GeneratedDreamImage> {
  if (!DREAM_IMAGE_API_URL) {
    throw new DreamImageError('Dream images are not available yet.');
  }

  const prompt = request.visualReflectionPrompt.trim();
  if (!request.dreamId.trim() || !prompt) {
    throw new DreamImageError('Choose a saved dream and visual reflection before generating an image.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(DREAM_IMAGE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dreamId: request.dreamId,
        visualReflectionPrompt: prompt,
        style: request.style,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new DreamImageError('Could not create a dream image right now. Please try again later.');
    }

    const image = await response.json() as Partial<GeneratedDreamImage>;
    if (!image.id || !image.imageUrl || !image.altText || !image.generatedAt) {
      throw new DreamImageError('The dream image response was incomplete. Please try again.');
    }

    return {
      id: image.id,
      imageUrl: image.imageUrl,
      altText: image.altText,
      generatedAt: image.generatedAt,
      style: request.style,
    };
  } catch (error) {
    if (error instanceof DreamImageError) throw error;
    if ((error as Error)?.name === 'AbortError') {
      throw new DreamImageError('Dream image generation is taking longer than expected. Please try again.');
    }
    throw new DreamImageError('Could not reach the dream image service. Check your connection and try again.');
  } finally {
    clearTimeout(timeout);
  }
}
