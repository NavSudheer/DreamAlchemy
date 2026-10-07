/**
 * Contracts for optional, interpretation-inspired dream art.
 *
 * These deliberately carry a curated visual prompt rather than the journal's
 * raw dream text, so future UI can give people control over what leaves their
 * device.
 */
export type DreamImageStyle = 'ethereal' | 'surreal' | 'watercolor' | 'cinematic';

export interface DreamImageRequest {
  /** A local reference used only to associate a result with a saved dream. */
  dreamId: string;
  /** A non-sensitive scene description chosen or confirmed by the dreamer. */
  visualReflectionPrompt: string;
  style: DreamImageStyle;
}

export interface GeneratedDreamImage {
  id: string;
  /** A provider response URL. Persisting/caching it is a separate concern. */
  imageUrl: string;
  altText: string;
  generatedAt: string;
  style: DreamImageStyle;
}

export type DreamImageAvailability =
  | { available: true }
  | { available: false; reason: 'not-configured' };

