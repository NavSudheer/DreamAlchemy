/**
 * Dream Image Style Metadata
 *
 * A typed, content-only collection of display labels, artistic descriptions,
 * visual characteristics, and accessibility properties for supported dream art styles.
 *
 * All descriptions are artistic, optional, and strictly non-interpretive.
 * They describe aesthetic rendering mediums and lighting qualities without making
 * psychological, predictive, or factual claims about dream meanings.
 */

import { DreamImageStyle } from '../types/dreamImage';

export interface DreamImageStyleMetadata {
  /** The stable style identifier */
  style: DreamImageStyle;
  /** Human-readable display label */
  label: string;
  /** Brief summary of the artistic aesthetic */
  shortDescription: string;
  /** Key visual and textural characteristics of the medium */
  visualCharacteristics: string;
  /** Screen reader accessible label */
  accessibilityLabel: string;
  /** Screen reader hint explaining the aesthetic rendering */
  accessibilityHint: string;
}

export const DREAM_IMAGE_STYLES_METADATA: Record<
  DreamImageStyle,
  DreamImageStyleMetadata
> = {
  ethereal: {
    style: 'ethereal',
    label: 'Ethereal',
    shortDescription:
      'Luminous, soft-focus atmosphere with gentle glowing highlights and twilight mist.',
    visualCharacteristics:
      'Diffused ambient light, softened edges, subtle glowing halos, and delicate gradient transitions.',
    accessibilityLabel: 'Ethereal artistic style',
    accessibilityHint:
      'Generates an artistic visual reflection featuring luminous soft-focus light, delicate mist, and glowing ambient highlights.',
  },
  surreal: {
    style: 'surreal',
    label: 'Surreal',
    shortDescription:
      'Dreamlike juxtapositions, poetic symbolic geometry, and heightened imaginative perspectives.',
    visualCharacteristics:
      'Floating symbolic motifs, impossible perspectives, architectural paradoxes, and deep contrasting shadows.',
    accessibilityLabel: 'Surreal artistic style',
    accessibilityHint:
      'Generates an artistic visual reflection featuring dreamlike symbolic juxtapositions, architectural motifs, and imaginative perspectives.',
  },
  watercolor: {
    style: 'watercolor',
    label: 'Watercolor',
    shortDescription:
      'Fluid pigment washes, natural paper texture, organic bleeds, and translucent layering.',
    visualCharacteristics:
      'Soft pigment bloom, visible cotton grain, flowing wet-on-wet edges, and layered translucent tints.',
    accessibilityLabel: 'Watercolor artistic style',
    accessibilityHint:
      'Generates an artistic visual reflection inspired by traditional watercolor washes, textured paper, and flowing pigments.',
  },
  cinematic: {
    style: 'cinematic',
    label: 'Cinematic',
    shortDescription:
      'Atmospheric widescreen lighting, volumetric depth, rich dynamic shadows, and evocative staging.',
    visualCharacteristics:
      'Wide focal compositions, dramatic directional key light, atmospheric haze, and deep tonal range.',
    accessibilityLabel: 'Cinematic artistic style',
    accessibilityHint:
      'Generates an artistic visual reflection featuring widescreen compositions, dramatic atmospheric lighting, and volumetric depth.',
  },
};

export const DREAM_IMAGE_STYLE_LIST: DreamImageStyleMetadata[] = [
  DREAM_IMAGE_STYLES_METADATA.ethereal,
  DREAM_IMAGE_STYLES_METADATA.surreal,
  DREAM_IMAGE_STYLES_METADATA.watercolor,
  DREAM_IMAGE_STYLES_METADATA.cinematic,
];

export const SUPPORTED_DREAM_IMAGE_STYLES: DreamImageStyle[] = [
  'ethereal',
  'surreal',
  'watercolor',
  'cinematic',
];

/**
 * Retrieve metadata for a specific dream image style.
 */
export function getDreamImageStyleMetadata(
  style: DreamImageStyle,
): DreamImageStyleMetadata {
  return DREAM_IMAGE_STYLES_METADATA[style];
}

/**
 * Retrieve the full list of all dream image style metadata entries.
 */
export function getAllDreamImageStyleMetadata(): DreamImageStyleMetadata[] {
  return DREAM_IMAGE_STYLE_LIST;
}

/**
 * Retrieve all supported dream image style identifiers.
 */
export function getAllDreamImageStyles(): DreamImageStyle[] {
  return [...SUPPORTED_DREAM_IMAGE_STYLES];
}

/**
 * Type guard verifying whether a value is a valid DreamImageStyle.
 */
export function isValidDreamImageStyle(value: unknown): value is DreamImageStyle {
  return (
    typeof value === 'string' &&
    SUPPORTED_DREAM_IMAGE_STYLES.includes(value as DreamImageStyle)
  );
}

/**
 * Retrieve the accessible label for a style.
 */
export function getStyleAccessibilityLabel(style: DreamImageStyle): string {
  return DREAM_IMAGE_STYLES_METADATA[style]?.accessibilityLabel ?? `${style} style`;
}

/**
 * Retrieve the accessible hint for a style.
 */
export function getStyleAccessibilityHint(style: DreamImageStyle): string {
  return DREAM_IMAGE_STYLES_METADATA[style]?.accessibilityHint ?? '';
}
