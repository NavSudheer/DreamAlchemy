/**
 * Astrology Aspect Glossary
 *
 * A typed, content-only collection of non-predictive, archetypal glossary entries
 * for the five major Ptolemaic aspect types returned by chart calculations:
 * Conjunction, Sextile, Square, Trine, and Opposition.
 *
 * All entries are strictly educational, symbolic, non-predictive, and non-diagnostic.
 * They describe archetypal dynamics and contemplative metaphors, making zero claims
 * regarding fate, destiny, character diagnosis, or predictive outcomes.
 */

export type MajorAspectType =
  | 'conjunction'
  | 'sextile'
  | 'square'
  | 'trine'
  | 'opposition';

export interface AstrologyAspectGlossaryEntry {
  /** Stable unique identifier */
  id: string;
  /** Normalized lowercase aspect type key */
  type: MajorAspectType;
  /** Display name with standard capitalization */
  name: string;
  /** Geometric angle in degrees */
  angleDegrees: number;
  /** Archetypal relationship dynamic */
  relationshipDynamic: 'fusion' | 'opportunity' | 'tension' | 'flow' | 'polarity';
  /** Concise summary of the archetypal theme */
  archetypalTheme: string;
  /** Reflective, non-predictive lens for personal contemplation */
  contemplativePerspective: string;
  /** Distinctive keywords describing the dynamic */
  keywords: string[];
  /** Screen reader accessible description */
  accessibilityDescription: string;
}

export const ASTROLOGY_ASPECT_GLOSSARY: AstrologyAspectGlossaryEntry[] = [
  {
    id: 'aspect-conjunction',
    type: 'conjunction',
    name: 'Conjunction',
    angleDegrees: 0,
    relationshipDynamic: 'fusion',
    archetypalTheme: 'Concentrated Fusion & Unified Emphasis',
    contemplativePerspective:
      'Symbolizes two planetary drives merging into a single concentrated focus. Serves as an invitation to reflect on where diverse impulses unite to form a powerful, singular intention.',
    keywords: ['fusion', 'concentrated focus', 'unified impulse', 'intensity', 'synthesis'],
    accessibilityDescription:
      'Conjunction aspect: a zero-degree alignment traditionally used as a metaphor for combined or concentrated themes.',
  },
  {
    id: 'aspect-sextile',
    type: 'sextile',
    name: 'Sextile',
    angleDegrees: 60,
    relationshipDynamic: 'opportunity',
    archetypalTheme: 'Supportive Opportunity & Open Dialogue',
    contemplativePerspective:
      'Traditionally framed as a cooperative affinity between compatible elements. Invites reflection on receptivity, curiosity, and creative collaboration without implying an outcome.',
    keywords: [
      'supportive opportunity',
      'cooperative dialogue',
      'open affinity',
      'constructive ease',
      'resourcefulness',
    ],
    accessibilityDescription:
      'Sextile aspect: a sixty-degree connection traditionally used as a metaphor for supportive dialogue and creative opportunity.',
  },
  {
    id: 'aspect-square',
    type: 'square',
    name: 'Square',
    angleDegrees: 90,
    relationshipDynamic: 'tension',
    archetypalTheme: 'Dynamic Friction & Catalytic Growth',
    contemplativePerspective:
      'Traditionally used as a metaphor for tension between differing themes. Prompts contemplative curiosity about friction and challenging crossroads without predicting growth or change.',
    keywords: [
      'dynamic friction',
      'catalytic challenge',
      'creative crossroads',
      'resilience',
      'call to action',
    ],
    accessibilityDescription:
      'Square aspect: a ninety-degree angle traditionally used as a metaphor for dynamic friction or competing themes.',
  },
  {
    id: 'aspect-trine',
    type: 'trine',
    name: 'Trine',
    angleDegrees: 120,
    relationshipDynamic: 'flow',
    archetypalTheme: 'Effortless Flow & Natural Resonance',
    contemplativePerspective:
      'Mirrors a harmonious affinity within the same element where energies support one another without strain. Invites gratitude for innate ease while encouraging conscious engagement so gifts are not taken for granted.',
    keywords: ['effortless flow', 'natural resonance', 'harmonic grace', 'mutual support', 'ease'],
    accessibilityDescription:
      'Trine aspect: a one-hundred-twenty-degree connection traditionally used as a metaphor for flow, ease, or mutual support.',
  },
  {
    id: 'aspect-opposition',
    type: 'opposition',
    name: 'Opposition',
    angleDegrees: 180,
    relationshipDynamic: 'polarity',
    archetypalTheme: 'Polar Perspective & Relational Balance',
    contemplativePerspective:
      'Reflects two archetypal drives positioned across from one another like a mirror. Prompts inquiry into how contrasting perspectives can be balanced in healthy dialogue rather than rigid either/or conflict.',
    keywords: [
      'polar perspective',
      'relational mirror',
      'dynamic equilibrium',
      'integration of opposites',
      'awareness',
    ],
    accessibilityDescription:
      'Opposition aspect: a one-hundred-eighty-degree axis traditionally used as a metaphor for contrasting or complementary perspectives.',
  },
];

export const MAJOR_ASPECT_TYPES: MajorAspectType[] = [
  'conjunction',
  'sextile',
  'square',
  'trine',
  'opposition',
];

/**
 * Retrieve an aspect glossary entry by its name or type key (case-insensitive).
 */
export function getAspectGlossaryEntry(
  aspectType: string,
): AstrologyAspectGlossaryEntry | undefined {
  const normalized = aspectType.trim().toLowerCase();
  return ASTROLOGY_ASPECT_GLOSSARY.find(
    entry =>
      entry.type === normalized ||
      entry.name.toLowerCase() === normalized,
  );
}

/**
 * Retrieve all major aspect glossary entries.
 */
export function getAllAspectGlossaryEntries(): AstrologyAspectGlossaryEntry[] {
  return ASTROLOGY_ASPECT_GLOSSARY;
}

/**
 * Retrieve all supported major aspect type keys.
 */
export function getAllMajorAspectTypes(): MajorAspectType[] {
  return [...MAJOR_ASPECT_TYPES];
}

/**
 * Check whether a glossary entry exists for a given aspect type string.
 */
export function hasAspectGlossaryEntry(aspectType: string): boolean {
  return getAspectGlossaryEntry(aspectType) !== undefined;
}

/**
 * Type guard verifying whether a value is a valid MajorAspectType.
 */
export function isValidMajorAspectType(
  value: unknown,
): value is MajorAspectType {
  return (
    typeof value === 'string' &&
    MAJOR_ASPECT_TYPES.includes(value.trim().toLowerCase() as MajorAspectType)
  );
}

/**
 * Retrieve the accessible description for an aspect type.
 */
export function getAspectAccessibilityDescription(aspectType: string): string {
  const entry = getAspectGlossaryEntry(aspectType);
  return entry?.accessibilityDescription ?? `${aspectType} aspect`;
}
