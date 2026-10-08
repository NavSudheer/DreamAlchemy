/**
 * Astrology Placement Glossary
 *
 * A typed, content-only collection of non-predictive, archetypal glossary entries
 * for celestial chart bodies and zodiac signs surfaced in optional astrology results.
 *
 * All entries are strictly educational, symbolic, non-predictive, and non-diagnostic.
 * They describe cultural-historical archetypes and contemplative metaphors,
 * making zero claims regarding fortune, determinism, or psychological assessment.
 */

import { getCanonicalBodyName } from './astrologyBodyAliases';

export type AstrologyGlossaryEntryType = 'body' | 'sign';
export type AstrologyElement = 'Fire' | 'Earth' | 'Air' | 'Water';
export type AstrologyModality = 'Cardinal' | 'Fixed' | 'Mutable';

export interface AstrologyBodyGlossaryEntry {
  id: string;
  type: 'body';
  name: string;
  archetypalTheme: string;
  contemplativePerspective: string;
  keywords: string[];
}

export interface AstrologySignGlossaryEntry {
  id: string;
  type: 'sign';
  name: string;
  element: AstrologyElement;
  modality: AstrologyModality;
  archetypalTheme: string;
  contemplativePerspective: string;
  keywords: string[];
}

export type AstrologyPlacementGlossaryEntry =
  | AstrologyBodyGlossaryEntry
  | AstrologySignGlossaryEntry;

export const ASTROLOGY_BODY_GLOSSARY: AstrologyBodyGlossaryEntry[] = [
  {
    id: 'body-sun',
    type: 'body',
    name: 'Sun',
    archetypalTheme: 'Conscious Vitality & Core Purpose',
    contemplativePerspective:
      'Symbolically represents conscious vitality, creative energy, and core values. Serves as a reflective prompt to notice what feels authentic and life-giving in your waking focus.',
    keywords: ['vitality', 'conscious intent', 'creative warmth', 'core identity', 'illumination'],
  },
  {
    id: 'body-moon',
    type: 'body',
    name: 'Moon',
    archetypalTheme: 'Nocturnal Awareness & Emotional Rhythms',
    contemplativePerspective:
      'Symbolizes inner moods, intuitive rhythms, and emotional sanctuary. Invites gentle attention to what feelings or needs arise when external noise quietens.',
    keywords: ['emotional tides', 'intuition', 'nocturnal reflection', 'sanctuary', 'receptivity'],
  },
  {
    id: 'body-mercury',
    type: 'body',
    name: 'Mercury',
    archetypalTheme: 'Curiosity, Perception & Mental Synthesis',
    contemplativePerspective:
      'Associated with communication, observation, and how the mind connects ideas. Prompts curiosity about how thoughts, symbols, and language shape your waking perspective.',
    keywords: ['perception', 'communication', 'mental inquiry', 'synthesis', 'adaptability'],
  },
  {
    id: 'body-venus',
    type: 'body',
    name: 'Venus',
    archetypalTheme: 'Harmony, Aesthetic Resonance & Values',
    contemplativePerspective:
      'Reflects what brings beauty, relational warmth, and deep appreciation into life. Encourages contemplation of the values and connections you cherish most.',
    keywords: ['harmony', 'aesthetic appreciation', 'relational connection', 'peace', 'core values'],
  },
  {
    id: 'body-mars',
    type: 'body',
    name: 'Mars',
    archetypalTheme: 'Courage, Boundaries & Active Initiative',
    contemplativePerspective:
      'Symbolizes inner drive, boundary-setting, and decisive momentum. Prompts reflection on how you direct passion and assert healthy boundaries with integrity.',
    keywords: ['initiative', 'healthy boundaries', 'courage', 'focused drive', 'vital momentum'],
  },
  {
    id: 'body-jupiter',
    type: 'body',
    name: 'Jupiter',
    archetypalTheme: 'Expansiveness, Wisdom & Generosity',
    contemplativePerspective:
      'Associated with philosophical outlook, growth, and spacious optimism. Invites reflection on where you might widen your perspective and cultivate generous trust in life.',
    keywords: ['expansion', 'wisdom', 'optimism', 'broader perspective', 'generosity'],
  },
  {
    id: 'body-saturn',
    type: 'body',
    name: 'Saturn',
    archetypalTheme: 'Structure, Patience & Mature Responsibility',
    contemplativePerspective:
      'Symbolizes boundaries, grounding discipline, and gradual development over time. Invites patient acceptance of limits and steady commitment to long-term growth.',
    keywords: ['grounding structure', 'patience', 'mature accountability', 'boundaries', 'steady perseverance'],
  },
  {
    id: 'body-uranus',
    type: 'body',
    name: 'Uranus',
    archetypalTheme: 'Innovation, Insight & Authentic Awakening',
    contemplativePerspective:
      'Associated with sudden perspective shifts, originality, and breaking free of stale assumptions. Prompts curiosity about unexpected insights and personal freedom.',
    keywords: ['fresh perspective', 'breakthrough', 'originality', 'awakening', 'liberation'],
  },
  {
    id: 'body-neptune',
    type: 'body',
    name: 'Neptune',
    archetypalTheme: 'Imagination, Dreams & Transcendent Wonder',
    contemplativePerspective:
      'Mirrors the oceanic unconscious, poetic inspiration, and spiritual empathy. Invites gentle contemplation of mystery, creative dreams, and compassionate interconnectedness.',
    keywords: ['imagination', 'dreamscape', 'empathy', 'subtle mystery', 'poetic wonder'],
  },
  {
    id: 'body-pluto',
    type: 'body',
    name: 'Pluto',
    archetypalTheme: 'Transformation, Depth & Renewal',
    contemplativePerspective:
      'Symbolizes deep psychological transitions, shedding old layers, and uncovering hidden resilience. Prompts reflective honesty about what is ready to be released for renewal.',
    keywords: ['transformation', 'inner depth', 'renewal', 'shedding the past', 'core resilience'],
  },
  {
    id: 'body-ascendant',
    type: 'body',
    name: 'Ascendant',
    archetypalTheme: 'The Threshold of Encounter & Orientation',
    contemplativePerspective:
      'Represents the eastern horizon at birth—the stylistic threshold through which you meet the waking world and approach new experiences.',
    keywords: ['threshold', 'outward presence', 'first approach', 'horizon', 'orientation'],
  },
];

export const ASTROLOGY_SIGN_GLOSSARY: AstrologySignGlossaryEntry[] = [
  {
    id: 'sign-aries',
    type: 'sign',
    name: 'Aries',
    element: 'Fire',
    modality: 'Cardinal',
    archetypalTheme: 'Pioneering Spark & Immediate Action',
    contemplativePerspective:
      'Represents the initial spark of courage and the impulse to begin anew without overthinking.',
    keywords: ['pioneering courage', 'fresh start', 'instinctive clarity', 'direct action'],
  },
  {
    id: 'sign-taurus',
    type: 'sign',
    name: 'Taurus',
    element: 'Earth',
    modality: 'Fixed',
    archetypalTheme: 'Grounded Steadfastness & Sensory Presence',
    contemplativePerspective:
      'Celebrates embodied comfort, patience, and deliberate care for tangible foundations.',
    keywords: ['steadfast presence', 'sensory appreciation', 'patience', 'enduring stability'],
  },
  {
    id: 'sign-gemini',
    type: 'sign',
    name: 'Gemini',
    element: 'Air',
    modality: 'Mutable',
    archetypalTheme: 'Playful Inquiry & Connecting Perspectives',
    contemplativePerspective:
      'Embodies mental agility, curiosity about multifaceted ideas, and delight in learning.',
    keywords: ['curiosity', 'versatility', 'dialogue', 'open-mindedness'],
  },
  {
    id: 'sign-cancer',
    type: 'sign',
    name: 'Cancer',
    element: 'Water',
    modality: 'Cardinal',
    archetypalTheme: 'Nurturing Shelter & Emotional Depth',
    contemplativePerspective:
      'Reflects deep memory, protective care, and creating safe emotional harbors for self and others.',
    keywords: ['protective care', 'emotional memory', 'sanctuary', 'tender intuition'],
  },
  {
    id: 'sign-leo',
    type: 'sign',
    name: 'Leo',
    element: 'Fire',
    modality: 'Fixed',
    archetypalTheme: 'Heart-Centered Warmth & Creative Expression',
    contemplativePerspective:
      'Radiates generous vitality, playful creativity, and genuine confidence shared freely with others.',
    keywords: ['generous warmth', 'creative heart', 'radiance', 'joyful expression'],
  },
  {
    id: 'sign-virgo',
    type: 'sign',
    name: 'Virgo',
    element: 'Earth',
    modality: 'Mutable',
    archetypalTheme: 'Mindful Discernment & Devoted Craft',
    contemplativePerspective:
      'Focuses on quiet refinement, humble helpfulness, and finding beauty in practical, thoughtful details.',
    keywords: ['mindful care', 'thoughtful refinement', 'wholeness', 'practical service'],
  },
  {
    id: 'sign-libra',
    type: 'sign',
    name: 'Libra',
    element: 'Air',
    modality: 'Cardinal',
    archetypalTheme: 'Balanced Harmony & Relational Bridge',
    contemplativePerspective:
      'Strives for mutual understanding, graceful equilibrium, and honoring multiple points of view.',
    keywords: ['graceful balance', 'reciprocity', 'fairness', 'harmonious connection'],
  },
  {
    id: 'sign-scorpio',
    type: 'sign',
    name: 'Scorpio',
    element: 'Water',
    modality: 'Fixed',
    archetypalTheme: 'Profound Honesty & Introspective Depth',
    contemplativePerspective:
      'Welcomes deep emotional authenticity, psychological depth, and the courage to look beneath surfaces.',
    keywords: ['emotional depth', 'inner truth', 'quiet discernment', 'courageous renewal'],
  },
  {
    id: 'sign-sagittarius',
    type: 'sign',
    name: 'Sagittarius',
    element: 'Fire',
    modality: 'Mutable',
    archetypalTheme: 'Spacious Exploration & Philosophical Quest',
    contemplativePerspective:
      'Seeks meaning on open horizons, embracing humor, expansive ideas, and life as an ongoing learning journey.',
    keywords: ['expansive seeking', 'philosophical wonder', 'generous humor', 'quest for truth'],
  },
  {
    id: 'sign-capricorn',
    type: 'sign',
    name: 'Capricorn',
    element: 'Earth',
    modality: 'Cardinal',
    archetypalTheme: 'Integrity, Dedicated Mastery & Long Horizons',
    contemplativePerspective:
      'Honors perseverance, quiet self-respect, and building lasting value through steady, mindful steps.',
    keywords: ['steadfast mastery', 'integrity', 'grounded ambition', 'enduring commitment'],
  },
  {
    id: 'sign-aquarius',
    type: 'sign',
    name: 'Aquarius',
    element: 'Air',
    modality: 'Fixed',
    archetypalTheme: 'Visionary Community & Independent Insight',
    contemplativePerspective:
      'Values original perspectives, humanitarian kinship, and the freedom to think beyond convention.',
    keywords: ['original insight', 'broad kinship', 'future vision', 'authentic individuality'],
  },
  {
    id: 'sign-pisces',
    type: 'sign',
    name: 'Pisces',
    element: 'Water',
    modality: 'Mutable',
    archetypalTheme: 'Oceanic Empathy & Poetic Imagination',
    contemplativePerspective:
      'Dissolves rigid boundaries through universal kindness, deep imagination, and spiritual surrender to life’s flow.',
    keywords: ['boundless empathy', 'poetic imagination', 'gentle surrender', 'mystic harmony'],
  },
];

/**
 * Retrieve a body glossary entry by its name (case-insensitive).
 */
export function getBodyGlossaryEntry(
  bodyName: string,
): AstrologyBodyGlossaryEntry | undefined {
  const normalized = (getCanonicalBodyName(bodyName) ?? bodyName).trim().toLowerCase();
  return ASTROLOGY_BODY_GLOSSARY.find(
    entry => entry.name.toLowerCase() === normalized,
  );
}

/**
 * Retrieve a sign glossary entry by its name (case-insensitive).
 */
export function getSignGlossaryEntry(
  signName: string,
): AstrologySignGlossaryEntry | undefined {
  const normalized = signName.trim().toLowerCase();
  return ASTROLOGY_SIGN_GLOSSARY.find(
    entry => entry.name.toLowerCase() === normalized,
  );
}

/**
 * Retrieve any glossary entry (body or sign) matching a given name.
 */
export function getGlossaryEntryByName(
  name: string,
): AstrologyPlacementGlossaryEntry | undefined {
  return getBodyGlossaryEntry(name) || getSignGlossaryEntry(name);
}

/**
 * Retrieve all celestial body glossary entries.
 */
export function getAllBodyGlossaryEntries(): AstrologyBodyGlossaryEntry[] {
  return ASTROLOGY_BODY_GLOSSARY;
}

/**
 * Retrieve all zodiac sign glossary entries.
 */
export function getAllSignGlossaryEntries(): AstrologySignGlossaryEntry[] {
  return ASTROLOGY_SIGN_GLOSSARY;
}

/**
 * Retrieve all placement glossary entries combined.
 */
export function getAllPlacementGlossaryEntries(): AstrologyPlacementGlossaryEntry[] {
  return [...ASTROLOGY_BODY_GLOSSARY, ...ASTROLOGY_SIGN_GLOSSARY];
}

/**
 * Filter zodiac sign entries by their element.
 */
export function getSignsByElement(
  element: AstrologyElement,
): AstrologySignGlossaryEntry[] {
  return ASTROLOGY_SIGN_GLOSSARY.filter(entry => entry.element === element);
}

/**
 * Filter zodiac sign entries by their modality.
 */
export function getSignsByModality(
  modality: AstrologyModality,
): AstrologySignGlossaryEntry[] {
  return ASTROLOGY_SIGN_GLOSSARY.filter(entry => entry.modality === modality);
}

/**
 * Check whether a body glossary entry exists for a given name.
 */
export function hasBodyGlossaryEntry(bodyName: string): boolean {
  return getBodyGlossaryEntry(bodyName) !== undefined;
}

/**
 * Check whether a sign glossary entry exists for a given name.
 */
export function hasSignGlossaryEntry(signName: string): boolean {
  return getSignGlossaryEntry(signName) !== undefined;
}
