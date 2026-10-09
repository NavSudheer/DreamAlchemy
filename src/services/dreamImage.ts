import {
  DreamImageAvailability,
  DreamImageRequest,
  GeneratedDreamImage,
} from '../types/dreamImage';
import { isDescriptiveAltText } from '../data/dreamImageSafetyGuidelines';

const DREAM_IMAGE_API_URL = process.env.EXPO_PUBLIC_DREAM_IMAGE_API_URL;
const REQUEST_TIMEOUT_MS = 60_000;

export type DreamImageErrorCode =
  | 'not_available'
  | 'invalid_request'
  | 'offline'
  | 'timeout'
  | 'moderation_rejected'
  | 'rate_limited'
  | 'provider_error'
  | 'invalid_response';

export class DreamImageError extends Error {
  constructor(
    message: string,
    public readonly code: DreamImageErrorCode,
    public readonly retryable: boolean,
    public readonly serverCode?: string,
  ) {
    super(message);
    this.name = 'DreamImageError';
  }
}

export const getDreamImageAvailability = (): DreamImageAvailability =>
  DREAM_IMAGE_API_URL
    ? { available: true }
    : { available: false, reason: 'not-configured' };

/**
 * Builds the only payload permitted to leave the device. The local dream id is
 * deliberately excluded; association with a saved dream remains app-local.
 */
export const createDreamImageProviderPayload = (
  request: DreamImageRequest,
  consented: boolean,
) => ({
  visualReflectionPrompt: request.visualReflectionPrompt.trim(),
  style: request.style,
  consent: {
    artisticUseAcknowledged: consented,
    externalProcessingAllowed: consented,
  },
});

/**
 * Requests a generated visual reflection from an application-owned server
 * proxy. Provider selection, moderation, authentication, and rate limiting
 * belong on that server; no provider credential is included in the app.
 */
export async function generateDreamImage(
  request: DreamImageRequest,
  consented: boolean,
): Promise<GeneratedDreamImage> {
  if (!DREAM_IMAGE_API_URL) {
    throw new DreamImageError('Dream images are not available yet.', 'not_available', false);
  }

  const prompt = request.visualReflectionPrompt.trim();
  if (!request.dreamId.trim() || !prompt || !consented) {
    throw new DreamImageError(
      'Choose a saved dream and visual reflection before generating an image.',
      'invalid_request',
      false,
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(DREAM_IMAGE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createDreamImageProviderPayload({
        ...request,
        visualReflectionPrompt: prompt,
      }, consented)),
      signal: controller.signal,
    });

    if (!response.ok) {
      const failure = await response.json().catch(() => ({}));
      const serverCode = typeof failure?.code === 'string' ? failure.code : undefined;
      if (response.status === 422 || serverCode === 'moderation_rejected') {
        throw new DreamImageError(
          failure?.error || 'The curated scene was not accepted by the image service.',
          'moderation_rejected',
          false,
          serverCode,
        );
      }
      if (response.status === 429 || serverCode === 'rate_limited') {
        throw new DreamImageError(
          failure?.error || 'The image generation request limit has been reached.',
          'rate_limited',
          false,
          serverCode,
        );
      }
      if (response.status === 503 || serverCode === 'provider_unavailable') {
        throw new DreamImageError(
          failure?.error || 'The dream image service is not available.',
          'not_available',
          false,
          serverCode,
        );
      }
      throw new DreamImageError(
        failure?.error || 'Could not create a dream image right now. Please try again later.',
        'provider_error',
        response.status >= 500,
        serverCode,
      );
    }

    const image = await response.json() as Partial<GeneratedDreamImage>;
    if (!image.id || !image.imageUrl || !image.altText || !image.generatedAt) {
      throw new DreamImageError('The dream image response was incomplete. Please try again.', 'invalid_response', true);
    }
    if (!isDescriptiveAltText(image.altText)) {
      throw new DreamImageError(
        'The dream image response did not include descriptive alternative text.',
        'invalid_response',
        true,
      );
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
      throw new DreamImageError(
        'Dream image generation is taking longer than expected. Please try again.',
        'timeout',
        true,
      );
    }
    throw new DreamImageError(
      'Could not reach the dream image service. Check your connection and try again.',
      'offline',
      true,
    );
  } finally {
    clearTimeout(timeout);
  }
}
