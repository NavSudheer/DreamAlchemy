/**
 * Dream Image Prompt Templates
 *
 * A typed, content-only collection of abstract, visual-reflection scene templates.
 * Designed for optional, interpretation-inspired dream artwork without collecting,
 * transmitting, or echoing raw personal dream journal narratives.
 *
 * All prompts are abstract, symbolic, non-predictive, and non-diagnostic.
 */

import { DreamImageStyle } from '../types/dreamImage';

export type DreamImagePromptTemplateCategory =
  | 'threshold'
  | 'elemental'
  | 'atmospheric'
  | 'archetypal'
  | 'metaphoric';

export interface DreamImagePromptTemplate {
  /** Unique stable identifier for template lookup */
  id: string;
  /** Human-readable title for UI selection */
  title: string;
  /** High-level symbolic category */
  category: DreamImagePromptTemplateCategory;
  /** Brief contemplative summary explaining the visual motif */
  description: string;
  /**
   * Curated visual reflection scene guidance.
   * Deliberately abstract and symbolic; contains zero raw personal narrative.
   */
  promptText: string;
  /** Recommended visual rendering aesthetic */
  recommendedStyle: DreamImageStyle;
  /** Evocative mood keywords to help dreamers align their reflection */
  suggestedAtmosphere: string;
}

export const DREAM_IMAGE_PROMPT_TEMPLATES: DreamImagePromptTemplate[] = [
  {
    id: 'threshold-passage',
    title: 'Luminous Threshold',
    category: 'threshold',
    description: 'An open portal between familiar grounds and starlit expanses.',
    promptText:
      'An ancient stone doorway standing open in a quiet field of tall grass, glowing softly with warm amber twilight beneath violet clouds and distant constellations.',
    recommendedStyle: 'ethereal',
    suggestedAtmosphere: 'Quiet wonder, transitional pause, spacious calm',
  },
  {
    id: 'reflective-stillness',
    title: 'Mirror of Stillness',
    category: 'elemental',
    description: 'Calm alpine waters mirroring the twilight sky.',
    promptText:
      'A glassy alpine lake at dusk perfectly reflecting a slender crescent moon and silver constellations, with subtle ripples catching soft light around smooth river stones.',
    recommendedStyle: 'watercolor',
    suggestedAtmosphere: 'Clarity, peaceful solitude, reflective stillness',
  },
  {
    id: 'canopy-sanctuary',
    title: 'Forest Sanctuary',
    category: 'atmospheric',
    description: 'A sheltered woodland grove filtered with gentle dawn rays.',
    promptText:
      'A peaceful clearing deep within an ancient misty forest where gentle morning rays filter through emerald moss and spiraling tree boughs onto a smooth resting stone.',
    recommendedStyle: 'cinematic',
    suggestedAtmosphere: 'Grounding, serene refuge, organic harmony',
  },
  {
    id: 'celestial-ascent',
    title: 'Celestial Ascent',
    category: 'metaphoric',
    description: 'An expansive horizon rising above rolling morning cloudbanks.',
    promptText:
      'A panoramic perspective above a sea of rolling white clouds at sunrise, with warm golden light stretching toward deep indigo skies and drifting feather silhouettes.',
    recommendedStyle: 'surreal',
    suggestedAtmosphere: 'Expansive, weightless, uplifting horizon',
  },
  {
    id: 'unfolding-labyrinth',
    title: 'Unfolding Pathway',
    category: 'archetypal',
    description: 'A concentric stone path spiraling toward a calm center.',
    promptText:
      'A concentric labyrinth of low weathered stones set in soft mossy earth, gently winding toward a still central reflecting pool under twilight stars.',
    recommendedStyle: 'ethereal',
    suggestedAtmosphere: 'Contemplative journey, patient seeking, centered presence',
  },
  {
    id: 'submerged-currents',
    title: 'Oceanic Depths',
    category: 'elemental',
    description: 'Deep underwater ribbons drifting with soft bioluminescence.',
    promptText:
      'Gentle aquatic currents flowing through deep twilight-blue waters, carrying drifting ribbons of soft aquamarine bioluminescence and shimmering silver light particles.',
    recommendedStyle: 'watercolor',
    suggestedAtmosphere: 'Deep calm, oceanic mystery, gentle fluid release',
  },
  {
    id: 'solitary-beacon',
    title: 'Guiding Beacon',
    category: 'archetypal',
    description: 'A warm, steadfast light illuminating a gentle crossing.',
    promptText:
      'A solitary weathered bronze lantern casting a warm golden glow onto a wooden footbridge that stretches over morning valley mist toward soft rolling hills.',
    recommendedStyle: 'cinematic',
    suggestedAtmosphere: 'Steady guidance, dawn awakening, gentle reassurance',
  },
];

/** Default template ID for initial selection */
export const DEFAULT_PROMPT_TEMPLATE_ID = 'threshold-passage';

/**
 * Retrieve a prompt template by its unique identifier.
 */
export function getPromptTemplateById(
  id: string,
): DreamImagePromptTemplate | undefined {
  const normalizedId = id.trim().toLowerCase();
  return DREAM_IMAGE_PROMPT_TEMPLATES.find(
    template => template.id.toLowerCase() === normalizedId,
  );
}

/**
 * Retrieve all available visual reflection prompt templates.
 */
export function getAllPromptTemplates(): DreamImagePromptTemplate[] {
  return DREAM_IMAGE_PROMPT_TEMPLATES;
}

/**
 * Filter templates by symbolic category.
 */
export function getPromptTemplatesByCategory(
  category: DreamImagePromptTemplateCategory,
): DreamImagePromptTemplate[] {
  return DREAM_IMAGE_PROMPT_TEMPLATES.filter(
    template => template.category === category,
  );
}

/**
 * Filter templates by recommended visual rendering style.
 */
export function getPromptTemplatesByStyle(
  style: DreamImageStyle,
): DreamImagePromptTemplate[] {
  return DREAM_IMAGE_PROMPT_TEMPLATES.filter(
    template => template.recommendedStyle === style,
  );
}

/**
 * Check whether a template exists for a given ID.
 */
export function hasPromptTemplate(id: string): boolean {
  return getPromptTemplateById(id) !== undefined;
}

/**
 * Get the list of all distinct template categories.
 */
export function getAllPromptTemplateCategories(): DreamImagePromptTemplateCategory[] {
  return Array.from(
    new Set(DREAM_IMAGE_PROMPT_TEMPLATES.map(template => template.category)),
  );
}

/**
 * Retrieve the default prompt template.
 */
export function getDefaultPromptTemplate(): DreamImagePromptTemplate {
  return (
    getPromptTemplateById(DEFAULT_PROMPT_TEMPLATE_ID) ||
    DREAM_IMAGE_PROMPT_TEMPLATES[0]
  );
}
