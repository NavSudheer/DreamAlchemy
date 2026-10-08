/**
 * Astrology Chart Angle Glossary
 *
 * A typed, content-only collection of non-predictive, archetypal glossary entries
 * for the principal astronomical chart angles: the Ascendant and the Midheaven.
 *
 * All entries are strictly educational, symbolic, non-predictive, and non-diagnostic.
 * They frame each angle as a traditional topological sky intersection and contemplative
 * metaphor for self-reflection, making zero claims regarding fatalism, fortune-telling,
 * or character diagnosis.
 */

import { getCanonicalBodyName } from './astrologyBodyAliases';

export type ChartAngle = 'ascendant' | 'midheaven';

export interface AstrologyAngleGlossaryEntry {
  /** Stable unique identifier (e.g., 'angle-ascendant') */
  id: string;
  /** Normalized lowercase angle key */
  angle: ChartAngle;
  /** Canonical display name */
  name: string;
  /** Traditional astronomical abbreviation ('ASC', 'MC') */
  abbreviation: string;
  /** Classical Greek or Latin astronomical designation */
  classicalTerm: string;
  /** Astronomical sky orientation and horizon/meridian definition */
  astronomicalDefinition: string;
  /** Primary associated house cusp in standard quadrant house systems */
  associatedHouse: number;
  /** High-level archetypal theme */
  archetypalTheme: string;
  /** Historical symbolic metaphor describing the sky intersection */
  traditionalMetaphor: string;
  /** Contemplative, non-predictive lens for personal reflection */
  contemplativePerspective: string;
  /** Distinctive symbolic keywords */
  keywords: string[];
  /** Screen-reader accessible summary */
  accessibilityDescription: string;
}

export const ASTROLOGY_ANGLE_GLOSSARY: AstrologyAngleGlossaryEntry[] = [
  {
    id: 'angle-ascendant',
    angle: 'ascendant',
    name: 'Ascendant',
    abbreviation: 'ASC',
    classicalTerm: 'Horoskopos / Ascendens',
    astronomicalDefinition:
      'The intersection of the eastern horizon with the ecliptic at the exact time and geographic location of birth.',
    associatedHouse: 1,
    archetypalTheme: 'Threshold of Emergence, Presence & Orientation',
    traditionalMetaphor:
      'The eastern horizon; a portal where celestial bodies rise into visibility, traditionally used as a metaphor for how a person approaches immediate beginnings.',
    contemplativePerspective:
      'Serves as an invitation to reflect on the stylistic lens or presence through which you meet new environments, orient yourself to fresh situations, and take initial initiative.',
    keywords: [
      'threshold',
      'outward presence',
      'first approach',
      'eastern horizon',
      'orientation',
      'emergence',
      'beginnings',
    ],
    accessibilityDescription:
      'Ascendant: Eastern horizon chart angle symbolizing the threshold of emergence, personal orientation, and immediate outward approach to the world.',
  },
  {
    id: 'angle-midheaven',
    angle: 'midheaven',
    name: 'Midheaven',
    abbreviation: 'MC',
    classicalTerm: 'Medium Coeli',
    astronomicalDefinition:
      'The upper intersection of the local meridian with the ecliptic, marking the ecliptic point that is culminating at that time and location.',
    associatedHouse: 10,
    archetypalTheme: 'Purposeful Calling, Vocation & Visible Contribution',
    traditionalMetaphor:
      'The upper meridian; a point of culmination and public visibility traditionally associated with overarching aspirations, purposeful craft, and contribution to a wider community.',
    contemplativePerspective:
      'Encourages contemplation of the guiding principles, vocational mastery, and meaningful contributions you feel drawn to bring into public view and share with the broader world.',
    keywords: [
      'vocation',
      'calling',
      'public contribution',
      'meridian culmination',
      'guiding aim',
      'visible mastery',
      'aspiration',
    ],
    accessibilityDescription:
      'Midheaven: Upper-meridian chart angle traditionally symbolizing purposeful vocation, public contribution, guiding aspirations, and visible mastery.',
  },
];

export const CHART_ANGLE_KEYS: readonly ChartAngle[] = ['ascendant', 'midheaven'];

/**
 * Normalizes input to find a matching angle glossary entry.
 * Supports canonical names ('Ascendant', 'Midheaven'), abbreviations ('ASC', 'MC'),
 * classical terms ('Medium Coeli'), and alias variants via `astrologyBodyAliases`.
 */
export function getAngleGlossaryEntry(
  angleName: string,
): AstrologyAngleGlossaryEntry | undefined {
  if (!angleName || typeof angleName !== 'string') {
    return undefined;
  }

  const trimmed = angleName.trim().toLowerCase();

  // 1. Direct ID, angle key, abbreviation, or name match
  const direct = ASTROLOGY_ANGLE_GLOSSARY.find(
    entry =>
      entry.id.toLowerCase() === trimmed ||
      entry.angle.toLowerCase() === trimmed ||
      entry.name.toLowerCase() === trimmed ||
      entry.abbreviation.toLowerCase() === trimmed,
  );
  if (direct) {
    return direct;
  }

  // 2. Resolve via body alias normalization (e.g., 'rising', 'rising sign', 'medium coeli')
  const canonical = getCanonicalBodyName(angleName);
  if (canonical) {
    const fromCanonical = ASTROLOGY_ANGLE_GLOSSARY.find(
      entry => entry.name.toLowerCase() === canonical.toLowerCase(),
    );
    if (fromCanonical) {
      return fromCanonical;
    }
  }

  return undefined;
}

/**
 * Retrieve all angle glossary entries.
 */
export function getAllAngleGlossaryEntries(): AstrologyAngleGlossaryEntry[] {
  return ASTROLOGY_ANGLE_GLOSSARY;
}

/**
 * Retrieve all supported angle keys ('ascendant', 'midheaven').
 */
export function getAllAngleKeys(): ChartAngle[] {
  return [...CHART_ANGLE_KEYS];
}

/**
 * Check whether an angle glossary entry exists for the given name or alias.
 */
export function hasAngleGlossaryEntry(angleName: string): boolean {
  return getAngleGlossaryEntry(angleName) !== undefined;
}

/**
 * Type guard verifying whether a value is a valid ChartAngle key.
 */
export function isValidChartAngle(value: unknown): value is ChartAngle {
  return (
    typeof value === 'string' &&
    CHART_ANGLE_KEYS.includes(value.trim().toLowerCase() as ChartAngle)
  );
}

/**
 * Retrieve the screen-reader accessible description for a chart angle.
 */
export function getAngleAccessibilityDescription(angleName: string): string {
  const entry = getAngleGlossaryEntry(angleName);
  return entry?.accessibilityDescription ?? `${angleName} angle`;
}
