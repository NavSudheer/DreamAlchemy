/**
 * Astrology Precision & Uncertainty Copy
 *
 * A typed, content-only collection of educational explanations regarding
 * astronomical and interpretive uncertainty across the three supported
 * chart precision tiers:
 * 1. date-only: Broad daily planetary overview; time-dependent fields are withheld.
 * 2. date-and-time: The provider resolves timezone history from the supplied coordinates.
 * 3. date-time-timezone: Uses the explicitly supplied IANA timezone identifier.
 *
 * All framing is non-predictive, non-diagnostic, and non-fatalistic. Explanations
 * intentionally avoid claims of factual accuracy, destiny, or deterministic influence.
 */

import { AstrologyPrecision } from '../types/astrology';

export interface AstrologyPrecisionUncertainty {
  /** The precision level key */
  precision: AstrologyPrecision;
  /** Human-readable display label */
  label: string;
  /** Concise one-sentence summary of the precision tier */
  summary: string;
  /** Detailed educational explanation of astronomical uncertainty factors */
  explanation: string;
  /** Aspects of the chart that remain stable at this precision */
  stableFactors: string[];
  /** Aspects of the chart subject to variation or uncertainty */
  uncertainFactors: string[];
  /** Standalone bullet notes suitable for chart uncertaintyNotes collections */
  uncertaintyNotes: string[];
  /** Contemplative, non-predictive guidance on interpreting this precision tier */
  contemplativePerspective: string;
  /** Concise screen-reader accessible description */
  accessibilityDescription: string;
}

export interface AstrologyUncertaintyCopyBundle {
  /** Section header */
  title: string;
  /** High-level introduction explaining why uncertainty exists in astrological calculation */
  introduction: string;
  /** Universal non-predictive disclosure reminder */
  generalDisclaimer: string;
  /** Detailed entries indexed by precision */
  precisions: Record<AstrologyPrecision, AstrologyPrecisionUncertainty>;
}

export const ASTROLOGY_PRECISION_UNCERTAINTY: Record<
  AstrologyPrecision,
  AstrologyPrecisionUncertainty
> = {
  'date-only': {
    precision: 'date-only',
    label: 'Date Only (Broad Overview)',
    summary:
      'Calculated using your birth date alone without a recorded birth time or timezone.',
    explanation:
      'Without a birth time, the calculation provider uses a midday local-time reference and withholds time-dependent angles, house cusps, and house placements rather than guessing them. The Moon moves noticeably during a day, so its displayed degree—and occasionally its sign near a boundary—may differ from the position at the unknown birth time.',
    stableFactors: [
      'The date supplied for the calculation.',
      'Slower-moving planetary sign positions returned by the provider.',
      'The provider’s stated calculation model.',
    ],
    uncertainFactors: [
      'Moon degree and a boundary-adjacent Moon sign.',
      'Ascendant (Rising sign) and Midheaven (MC).',
      'Specific astrological house placements (Houses 1 through 12).',
      'Aspects involving bodies whose position changes meaningfully during the day.',
    ],
    uncertaintyNotes: [
      'Birth time was not provided; house divisions and the Rising sign cannot be calculated.',
      'Planetary coordinates reflect a midday local-time reference; the Moon and time-sensitive aspects may differ from the unknown birth moment.',
      'Placements should be contemplated as a broad day-level symbolic atmosphere rather than exact personal coordinates.',
    ],
    contemplativePerspective:
      'Consider date-only charts as a broad atmospheric canvas. Reflect on the larger generational and seasonal archetypes without attaching weight to specific house boundaries or fast-changing degrees.',
    accessibilityDescription:
      'Date-only precision: the chart uses a midday local-time reference; houses and Rising sign are omitted, and the Moon position is time-sensitive.',
  },
  'date-and-time': {
    precision: 'date-and-time',
    label: 'Date & Time (Timezone Resolved)',
    summary:
      'Calculated with a birth date and clock time while the provider resolves the timezone from the supplied coordinates.',
    explanation:
      'When no timezone identifier is supplied, the calculation provider resolves one from the coordinates and applies its historical daylight-saving rules for the date. This supports time-dependent calculations, but the resolved zone may not match the intended civil jurisdiction near borders or where historical records are ambiguous. Recorded birth-time rounding and the provider’s fixed house model remain separate sources of uncertainty.',
    stableFactors: [
      'The submitted date, local clock time, and coordinates.',
      'Planetary positions returned under the provider’s resolved timezone.',
      'A consistent house calculation under the provider’s stated model.',
    ],
    uncertainFactors: [
      'The timezone selected automatically from the coordinates.',
      'Angles or house cusps when the recorded birth time was rounded or uncertain.',
      'Planets positioned near house boundaries that may fall into adjacent houses.',
    ],
    uncertaintyNotes: [
      'Birth time is recorded, but an explicit IANA timezone identifier was omitted.',
      'The provider resolves timezone history from the supplied coordinates; verify the intended birthplace zone if it matters to you.',
      'Recorded-time uncertainty can affect angles, cusps, and placements near house boundaries.',
    ],
    contemplativePerspective:
      'Use this chart as an approximate orientation. If a planet or sign rests near a cusp, explore both surrounding archetypal energies with curious, non-dogmatic openness.',
    accessibilityDescription:
      'Date and time precision: the provider resolves timezone history from coordinates; recorded-time rounding and boundary locations can still affect time-dependent fields.',
  },
  'date-time-timezone': {
    precision: 'date-time-timezone',
    label: 'Date, Time & Explicit Timezone',
    summary:
      'Calculated using a complete birth date, local clock time, and explicit IANA timezone identifier.',
    explanation:
      'An explicit IANA timezone removes the need for coordinate-based timezone selection. The result still depends on the accuracy of the recorded birth time, the provider’s historical timezone data, and its fixed calculation choices, including the house system. Different house systems can place boundaries differently, so this remains a model-based symbolic chart rather than a personal fact.',
    stableFactors: [
      'The submitted date, time, timezone identifier, and coordinates.',
      'Planetary positions and aspect orbs returned under one calculation model.',
      'Consistent angles and house divisions under the provider’s stated model.',
    ],
    uncertainFactors: [
      'Potential rounding or uncertainty in the recorded birth time.',
      'Differences inherent to mathematical house division models (e.g., Placidus vs. Whole Sign).',
      'Differences or gaps in historical civil-time records.',
    ],
    uncertaintyNotes: [
      'Complete date, time, and timezone were provided to the calculation model.',
      'If the recorded birth time was rounded or estimated, time-dependent angles and cusps may shift.',
      'Placements remain symbolic metaphors for reflective introspection and carry no deterministic or predictive certainty.',
    ],
    contemplativePerspective:
      'While high mathematical precision brings clarity to house divisions and aspects, remember that no chart constitutes a rigid blueprint of destiny. Engage with these symbols as rich metaphors for personal inquiry.',
    accessibilityDescription:
      'Date, time, and timezone precision: calculated from the supplied timezone and coordinates, subject to recorded-time uncertainty and the provider’s chosen house model.',
  },
};

export const ASTROLOGY_UNCERTAINTY_COPY: AstrologyUncertaintyCopyBundle = {
  title: 'Chart Precision & Calculation Boundaries',
  introduction:
    'Astrological charts translate historical astronomical coordinates into symbolic archetypes. The level of detail and certainty depends directly on the completeness of your provided birth details.',
  generalDisclaimer:
    'All astrological calculations are symbolic frameworks for self-reflection. They do not predict future events, determine character, or provide medical or psychological diagnoses, regardless of calculation precision.',
  precisions: ASTROLOGY_PRECISION_UNCERTAINTY,
};

export const SUPPORTED_ASTROLOGY_PRECISIONS: AstrologyPrecision[] = [
  'date-only',
  'date-and-time',
  'date-time-timezone',
];

/**
 * Retrieve the uncertainty explanation for a specific precision tier.
 */
export function getUncertaintyCopyByPrecision(
  precision: AstrologyPrecision,
): AstrologyPrecisionUncertainty {
  return ASTROLOGY_PRECISION_UNCERTAINTY[precision];
}

/**
 * Retrieve the standalone uncertainty notes array for a precision tier.
 * Suitable for populating or augmenting AstrologyChart.uncertaintyNotes.
 */
export function getUncertaintyNotesForPrecision(
  precision: AstrologyPrecision,
): string[] {
  return ASTROLOGY_PRECISION_UNCERTAINTY[precision]?.uncertaintyNotes ?? [];
}

/**
 * Retrieve all precision uncertainty entries as an array.
 */
export function getAllPrecisionUncertainties(): AstrologyPrecisionUncertainty[] {
  return SUPPORTED_ASTROLOGY_PRECISIONS.map(
    precision => ASTROLOGY_PRECISION_UNCERTAINTY[precision],
  );
}

/**
 * Type guard verifying whether a value is a valid AstrologyPrecision.
 */
export function isSupportedAstrologyPrecision(
  value: unknown,
): value is AstrologyPrecision {
  return (
    typeof value === 'string' &&
    SUPPORTED_ASTROLOGY_PRECISIONS.includes(value as AstrologyPrecision)
  );
}

/**
 * Retrieve the screen-reader accessibility description for a precision tier.
 */
export function getPrecisionAccessibilityLabel(
  precision: AstrologyPrecision,
): string {
  const entry = ASTROLOGY_PRECISION_UNCERTAINTY[precision];
  return entry ? entry.accessibilityDescription : `${precision} precision`;
}

/**
 * Retrieve the contemplative reflection perspective for a precision tier.
 */
export function getPrecisionContemplativeNote(
  precision: AstrologyPrecision,
): string {
  const entry = ASTROLOGY_PRECISION_UNCERTAINTY[precision];
  return (
    entry?.contemplativePerspective ??
    'Explore chart placements as open-ended symbolic metaphors.'
  );
}
