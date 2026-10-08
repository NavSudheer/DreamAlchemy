/**
 * Astrology Reflection Prompts
 *
 * A typed, content-only collection of optional, non-predictive reflection prompts.
 * Designed to provide an introspective, symbolic lens alongside dream analysis,
 * emphasizing personal curiosity rather than factual claims, fate, or predictions.
 *
 * All prompts are strictly reflective, exploratory, non-predictive, and non-diagnostic.
 */

export type AstrologyPromptCategory =
  | 'vitality-and-intent'
  | 'emotional-rhythms'
  | 'elemental-metaphors'
  | 'cycles-and-transitions'
  | 'inner-dialogue'
  | 'open-inquiry';

export interface AstrologyReflectionPrompt {
  /** Unique stable identifier for the reflection prompt */
  id: string;
  /** Categorical theme for grouping in reflective UI */
  category: AstrologyPromptCategory;
  /** Short evocative title */
  title: string;
  /**
   * The contemplative inquiry question. Formulated openly and introspectively;
   * strictly avoids fortune-telling, determinism, or diagnostic claims.
   */
  question: string;
  /** Gentle guiding perspective encouraging personal exploration */
  considerThis: string;
  /** Optional symbolic motif or celestial metaphor */
  symbolicMotif?: string;
}

export interface AstrologyCategoryMeta {
  category: AstrologyPromptCategory;
  title: string;
  description: string;
}

export const ASTROLOGY_CATEGORY_METADATA: Record<
  AstrologyPromptCategory,
  AstrologyCategoryMeta
> = {
  'vitality-and-intent': {
    category: 'vitality-and-intent',
    title: 'Vitality & Intent',
    description:
      'Reflections on creative energy, personal direction, and waking values.',
  },
  'emotional-rhythms': {
    category: 'emotional-rhythms',
    title: 'Emotional Rhythms',
    description:
      'Inquiries into nocturnal feelings, intuition, and restorative stillness.',
  },
  'elemental-metaphors': {
    category: 'elemental-metaphors',
    title: 'Elemental Metaphors',
    description:
      'Contemplating balance through the symbolic qualities of Fire, Earth, Air, and Water.',
  },
  'cycles-and-transitions': {
    category: 'cycles-and-transitions',
    title: 'Cycles & Transitions',
    description:
      'Perspectives on natural timing, reflective pauses, and personal seasons of growth.',
  },
  'inner-dialogue': {
    category: 'inner-dialogue',
    title: 'Inner Dialogue',
    description:
      'Exploring dynamic tensions and contrasting inner motivations with compassion.',
  },
  'open-inquiry': {
    category: 'open-inquiry',
    title: 'Open Inquiry & Agency',
    description:
      'Honoring personal agency, mystery, and self-understanding over rigid dogma.',
  },
};

export const ASTROLOGY_REFLECTION_PROMPTS: AstrologyReflectionPrompt[] = [
  // --- Vitality & Intent (2 prompts) ---
  {
    id: 'astro-refl-solar-vitality',
    category: 'vitality-and-intent',
    title: 'Creative Spark & Conscious Intent',
    question:
      'In what areas of your waking life or recent dreams do you feel a strong desire to express your authentic energy, vitality, or creative purpose?',
    considerThis:
      'Astrological traditions often associate solar symbolism with daytime conscious intent, purpose, and creative warmth—not as an unalterable fate, but as an invitation to notice what energizes you.',
    symbolicMotif: 'Solar Vitality',
  },
  {
    id: 'astro-refl-personal-direction',
    category: 'vitality-and-intent',
    title: 'Illuminating Purpose',
    question:
      'When you reflect on this dream’s most vivid moments, what personal values or intentions do they seem to bring into clearer focus?',
    considerThis:
      'Viewing a dream through an archetypal lens can help highlight the core values you wish to honor in waking decisions.',
    symbolicMotif: 'Conscious Direction',
  },

  // --- Emotional Rhythms (2 prompts) ---
  {
    id: 'astro-refl-lunar-tides',
    category: 'emotional-rhythms',
    title: 'Nocturnal Feelings & Emotional Currents',
    question:
      'What subtle moods, undercurrents, or vulnerabilities did this dream surface that may be easily overlooked during busy waking hours?',
    considerThis:
      'Lunar symbolism in reflective traditions mirrors nocturnal awareness, fluctuating emotional tides, and the quiet feelings that emerge once daytime distractions fade.',
    symbolicMotif: 'Lunar Rhythm',
  },
  {
    id: 'astro-refl-intuitive-shelter',
    category: 'emotional-rhythms',
    title: 'Emotional Sanctuary & Rest',
    question:
      'How might this dream be inviting you to create more gentleness, safety, or emotional replenishment in your current daily rhythm?',
    considerThis:
      'Reflective frameworks often view receptivity and quiet rest as necessary counterweights to active striving.',
    symbolicMotif: 'Nocturnal Refuge',
  },

  // --- Elemental Metaphors (2 prompts) ---
  {
    id: 'astro-refl-elemental-fire-air',
    category: 'elemental-metaphors',
    title: 'Inspiration & Perspective (Fire & Air)',
    question:
      'Did your dream feel driven by passion, motion, ideas, or spoken words? How might you channel that intellectual curiosity or creative fire constructively?',
    considerThis:
      'Classical elemental archetypes treat fire and air as metaphors for inspiration, curiosity, and conceptual clarity rather than literal physical forces.',
    symbolicMotif: 'Inspiration & Breath',
  },
  {
    id: 'astro-refl-elemental-earth-water',
    category: 'elemental-metaphors',
    title: 'Grounding & Depth (Earth & Water)',
    question:
      'Did the dream center on tangible spaces, natural soil, deep waters, or bodily sensations? What helps you feel grounded and emotionally supported today?',
    considerThis:
      'Earth and water archetypes symbolize tangible grounding, somatic presence, and emotional depth.',
    symbolicMotif: 'Soil & Water',
  },

  // --- Cycles & Transitions (2 prompts) ---
  {
    id: 'astro-refl-cyclical-timing',
    category: 'cycles-and-transitions',
    title: 'Seasons of Change & Natural Timing',
    question:
      'If you view your current life circumstances as a natural season or cycle, does this dream suggest a time for planting seeds, tending growth, harvesting, or resting in winter stillness?',
    considerThis:
      'Planetary and seasonal metaphors encourage patience with personal development, recognizing that growth unfolds in distinct phases rather than continuous acceleration.',
    symbolicMotif: 'Seasonal Cycles',
  },
  {
    id: 'astro-refl-retrograde-pause',
    category: 'cycles-and-transitions',
    title: 'The Reflective Pause',
    question:
      'Is there an old project, lingering conversation, or past feeling that is asking for a second, compassionate review rather than rushing forward?',
    considerThis:
      'Apparent retrograde motions in astronomy and astrology are celebrated metaphorically as invitations to revisit, revise, and reflect before taking new action.',
    symbolicMotif: 'Retrograde Introspection',
  },

  // --- Inner Dialogue (2 prompts) ---
  {
    id: 'astro-refl-aspect-tension',
    category: 'inner-dialogue',
    title: 'Navigating Competing Inner Voices',
    question:
      'Did your dream feature conflict, dilemma, or contrasting figures? Which two differing desires or perspectives inside you might they represent?',
    considerThis:
      'Astrological aspects metaphorically map dynamic tensions between distinct psychological drives—such as the wish for security versus the call for adventure.',
    symbolicMotif: 'Aspect Harmony & Tension',
  },
  {
    id: 'astro-refl-shadow-contrast',
    category: 'inner-dialogue',
    title: 'Integrating Unfamiliar Perspectives',
    question:
      'If an unexpected or challenging dream character held a point of view you normally resist, what hidden insight might they be offering?',
    considerThis:
      'Approaching unfamiliar dream figures with curiosity allows disparate parts of our inner life to dialogue without harsh judgement.',
    symbolicMotif: 'Inner Dialogue',
  },

  // --- Open Inquiry & Agency (2 prompts) ---
  {
    id: 'astro-refl-approximate-horizons',
    category: 'open-inquiry',
    title: 'Embracing Mystery & Incomplete Certainty',
    question:
      'What changes when you allow your self-understanding to remain an open exploration rather than seeking definitive or rigid answers?',
    considerThis:
      'When birth times or exact chart calculations are approximate, astrology functions best not as a predictive tool, but as poetic scaffolding for ongoing self-discovery.',
    symbolicMotif: 'Open Horizon',
  },
  {
    id: 'astro-refl-personal-resonance',
    category: 'open-inquiry',
    title: 'Personal Resonance Over External Dogma',
    question:
      'Which symbolic themes in your dream or chart feel truly resonant to you personally, and which do you choose to gently set aside?',
    considerThis:
      'You remain the ultimate authority on your own lived experience; symbolic frameworks are optional mirrors meant to spark reflection, never dogmatic truth.',
    symbolicMotif: 'Individual Agency',
  },
];

/** Default reflection prompt identifier */
export const DEFAULT_ASTROLOGY_PROMPT_ID = 'astro-refl-solar-vitality';

/**
 * Retrieve a specific astrology reflection prompt by its stable ID.
 */
export function getAstrologyPromptById(
  id: string,
): AstrologyReflectionPrompt | undefined {
  const normalizedId = id.trim().toLowerCase();
  return ASTROLOGY_REFLECTION_PROMPTS.find(
    prompt => prompt.id.toLowerCase() === normalizedId,
  );
}

/**
 * Retrieve all available astrology reflection prompts.
 */
export function getAllAstrologyPrompts(): AstrologyReflectionPrompt[] {
  return ASTROLOGY_REFLECTION_PROMPTS;
}

/**
 * Retrieve all astrology reflection prompts belonging to a specific category.
 */
export function getAstrologyPromptsByCategory(
  category: AstrologyPromptCategory,
): AstrologyReflectionPrompt[] {
  return ASTROLOGY_REFLECTION_PROMPTS.filter(
    prompt => prompt.category === category,
  );
}

/**
 * Retrieve all valid astrology prompt categories.
 */
export function getAllAstrologyPromptCategories(): AstrologyPromptCategory[] {
  return [
    'vitality-and-intent',
    'emotional-rhythms',
    'elemental-metaphors',
    'cycles-and-transitions',
    'inner-dialogue',
    'open-inquiry',
  ];
}

/**
 * Check whether a prompt exists for a given ID.
 */
export function hasAstrologyPrompt(id: string): boolean {
  return getAstrologyPromptById(id) !== undefined;
}

/**
 * Retrieve metadata for a specific category.
 */
export function getAstrologyCategoryMeta(
  category: AstrologyPromptCategory,
): AstrologyCategoryMeta {
  return ASTROLOGY_CATEGORY_METADATA[category];
}

/**
 * Retrieve the default astrology reflection prompt.
 */
export function getDefaultAstrologyPrompt(): AstrologyReflectionPrompt {
  return (
    getAstrologyPromptById(DEFAULT_ASTROLOGY_PROMPT_ID) ||
    ASTROLOGY_REFLECTION_PROMPTS[0]
  );
}
