/**
 * Astrology Calculation Disclosure Copy
 *
 * A typed, content-only collection of user-facing disclosures and technical
 * boundaries for external chart calculation:
 * 1. Fields Sent: Birth date, optional time, geographic coordinates, and optional timezone.
 * 2. Local-Only Location Label: City/place name is stored locally and never sent to the calculation provider.
 * 3. Unknown-Time Uncertainty: Date-only calculation, omitted Ascendant/houses, and lunar degree variance.
 * 4. Calculation vs. AI Distinction: Ephemeris math is separate from optional generative AI reflection.
 * 5. Provider-Side Processing Limitation: Stateless app requests, no cloud user accounts, and possible provider logs.
 * 6. Dream-Journal Exclusion: Personal dream entries and notes are strictly local and never transmitted.
 *
 * All copy is strictly non-predictive, non-diagnostic, privacy-preserving, and provider-neutral.
 */

export type AstrologyCalculationDisclosureTopic =
  | 'fields-sent'
  | 'local-location-label'
  | 'unknown-time-uncertainty'
  | 'calculation-vs-ai'
  | 'provider-processing-limitations'
  | 'dream-journal-exclusion';

export interface AstrologyCalculationDisclosureItem {
  /** Unique topic identifier */
  id: string;
  /** Categorical topic tag */
  topic: AstrologyCalculationDisclosureTopic;
  /** Display title for cards or modal headers */
  title: string;
  /** Compact title for tabs, chips, or table rows */
  shortTitle: string;
  /** Badge label for status pills */
  badgeLabel: string;
  /** Concise one-sentence summary */
  summary: string;
  /** Comprehensive explanatory narrative */
  description: string;
  /** Structured key takeaways for scannable review */
  keyTakeaways: readonly string[];
  /** Screen reader accessible label */
  accessibilityLabel: string;
}

export interface AstrologyCalculationDisclosureBundle {
  /** Main modal or review panel title */
  title: string;
  /** Subtitle or introductory note */
  subtitle: string;
  /** Actionable review prompt before calculation submission */
  reviewPrompt: string;
  /** Master privacy guarantee summary */
  corePrivacyGuarantee: string;
  /** Map of disclosure items indexed by topic */
  topics: Record<AstrologyCalculationDisclosureTopic, AstrologyCalculationDisclosureItem>;
  /** Ordered list of topic IDs for consistent presentation */
  orderedTopicIds: readonly AstrologyCalculationDisclosureTopic[];
}

export const ASTROLOGY_CALCULATION_DISCLOSURE_ORDERED_TOPICS: readonly AstrologyCalculationDisclosureTopic[] = [
  'fields-sent',
  'local-location-label',
  'unknown-time-uncertainty',
  'calculation-vs-ai',
  'provider-processing-limitations',
  'dream-journal-exclusion',
] as const;

export const ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS: Record<
  AstrologyCalculationDisclosureTopic,
  AstrologyCalculationDisclosureItem
> = {
  'fields-sent': {
    id: 'fields-sent',
    topic: 'fields-sent',
    title: 'Fields Sent for Calculation',
    shortTitle: 'Transmitted Fields',
    badgeLabel: 'Sent to Server',
    summary:
      'Transmits birth date, optional birth time, coordinates, and optional timezone to compute celestial positions.',
    description:
      'Calculating an astrological chart requires mathematical ephemeris formulas based on observer location and time. The application transmits your birth date, optional birth time, numeric latitude and longitude coordinates, and optional IANA timezone identifier to an external calculation service. Personal names, account credentials, and email addresses are never requested or included.',
    keyTakeaways: [
      'Transmits birth date (YYYY-MM-DD) and numeric latitude/longitude coordinates.',
      'Transmits birth time and timezone identifier only if provided.',
      'Excludes personal identity, contact details, and account credentials.',
    ],
    accessibilityLabel:
      'Disclosure describing the birth parameters transmitted to the external calculation service.',
  },

  'local-location-label': {
    id: 'local-location-label',
    topic: 'local-location-label',
    title: 'Local-Only Location Label',
    shortTitle: 'Location Label',
    badgeLabel: 'Kept on Device',
    summary:
      'Your friendly city or place name is saved only on this device and is never sent to the calculation service.',
    description:
      'The friendly location label you enter (such as "Chicago, IL" or "Kyoto, Japan") is intended solely for your personal recognition within the app. It is saved in local device storage and is stripped from network payloads before transmission. The calculation provider receives only numeric geographical coordinates, keeping place names strictly private.',
    keyTakeaways: [
      'Friendly city and region names are saved exclusively in local device storage.',
      'Location labels are stripped from calculation request payloads before transmission.',
      'The external calculation service receives only numeric coordinates, never place names.',
    ],
    accessibilityLabel:
      'Disclosure confirming that friendly city labels remain strictly on device and are never sent over the network.',
  },

  'unknown-time-uncertainty': {
    id: 'unknown-time-uncertainty',
    topic: 'unknown-time-uncertainty',
    title: 'Unknown-Time Astronomical Uncertainty',
    shortTitle: 'Time Uncertainty',
    badgeLabel: 'Precision Note',
    summary:
      'Without an exact birth time, the chart is calculated in date-only mode and omits the Ascendant and houses.',
    description:
      'If you omit your birth time or mark it unknown, the calculation service receives the date with no time value. The local horizon (Ascendant), houses 1 through 12, and exact Moon degree cannot be determined with the same precision, so time-dependent placements are withheld and other positions should be read with the displayed uncertainty notes.',
    keyTakeaways: [
      'Date-only calculations send no birth-time value to the calculation service.',
      'Ascendant (rising sign) and houses 1–12 are omitted because they depend on exact clock time.',
      'Read lunar and degree placements alongside the chart’s date-only uncertainty notes.',
    ],
    accessibilityLabel:
      'Disclosure explaining astronomical limitations and omitted houses when birth time is unknown.',
  },

  'calculation-vs-ai': {
    id: 'calculation-vs-ai',
    topic: 'calculation-vs-ai',
    title: 'Calculation vs. Generative AI Distinction',
    shortTitle: 'Calculation vs. AI',
    badgeLabel: 'Ephemeris Math',
    summary:
      'Chart calculation uses mathematical astronomical algorithms, completely separate from optional AI reflection.',
    description:
      'Chart calculation is a purely deterministic astronomical calculation based on planetary ephemeris models. It does not use generative language models or artificial intelligence. Optional AI reflection is a separate, secondary opt-in feature: if requested, only a compact summary of calculated placement symbols (e.g. "Sun in Aries") is sent to an AI service; birth coordinates, dates, and times are never sent to the AI model.',
    keyTakeaways: [
      'Chart calculation is deterministic mathematical ephemeris modeling, not generative AI.',
      'No Large Language Model (LLM) or conversational AI participates in chart calculation.',
      'Optional AI reflection is a distinct, separate opt-in step that uses capped placements, aspects, and uncertainty notes without birth coordinates.',
    ],
    accessibilityLabel:
      'Disclosure distinguishing deterministic astronomical calculation from optional generative AI reflection.',
  },

  'provider-processing-limitations': {
    id: 'provider-processing-limitations',
    topic: 'provider-processing-limitations',
    title: 'Provider-Side Processing Limitations',
    shortTitle: 'Provider Scope',
    badgeLabel: 'Stateless Proxy',
    summary:
      'Requests are processed statelessly; local deletion clears your device but cannot scrub external transit logs.',
    description:
      'Calculation requests are transmitted over encrypted HTTPS through DreamAlchemy’s serverless proxy. DreamAlchemy does not maintain remote user accounts, centralized birth profiles, or a cloud astrology database. External calculation providers and network infrastructure may retain operational records under their independent privacy policies. Deleting astrology data locally clears the app’s copy on your device but cannot retract information already processed externally.',
    keyTakeaways: [
      'Calculation is performed statelessly without central user accounts or cloud profile storage.',
      'External providers may retain operational records under their independent privacy terms.',
      'Local app deletion purges on-device storage, but cannot retract data already processed externally.',
    ],
    accessibilityLabel:
      'Disclosure explaining stateless processing and external provider logging boundaries.',
  },

  'dream-journal-exclusion': {
    id: 'dream-journal-exclusion',
    topic: 'dream-journal-exclusion',
    title: 'Strict Dream Journal Exclusion',
    shortTitle: 'Journal Isolated',
    badgeLabel: 'Never Shared',
    summary:
      'Personal dream journal narratives, reflections, and audio logs are never included in astrology calculations.',
    description:
      'DreamAlchemy enforces a strict privacy boundary between introspective tools: astrology is an optional reflective lens that operates completely isolated from your dream journal. Your written dream stories, personal reflections, tags, voice recordings, and pattern histories are never read, bundled, or transmitted to any astrology calculation service.',
    keyTakeaways: [
      'Dream journal entries, tags, and audio transcripts are excluded from astrology requests.',
      'Astrology calculation requests contain zero dream journal narrative or subconscious reflections.',
      'Personal dream records and astrology features are architecturally isolated.',
    ],
    accessibilityLabel:
      'Disclosure guaranteeing that personal dream journal entries are never shared with astrology services.',
  },
};

export const ASTROLOGY_CALCULATION_DISCLOSURE_BUNDLE: AstrologyCalculationDisclosureBundle = {
  title: 'Astrology Calculation Transparency',
  subtitle:
    'Clear disclosure of data transmitted, local protections, and external boundaries before calculating your chart.',
  reviewPrompt:
    'Review what astronomical parameters are processed before calculating your chart.',
  corePrivacyGuarantee:
    'Astrology calculation processes only astronomical birth parameters. Location labels, dream journal records, and personal identities are never sent to the calculation provider.',
  topics: ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS,
  orderedTopicIds: ASTROLOGY_CALCULATION_DISCLOSURE_ORDERED_TOPICS,
};

/**
 * Retrieve the full calculation disclosure bundle.
 */
export function getCalculationDisclosureBundle(): AstrologyCalculationDisclosureBundle {
  return ASTROLOGY_CALCULATION_DISCLOSURE_BUNDLE;
}

/**
 * Retrieve a specific calculation disclosure item by its topic key.
 */
export function getCalculationDisclosureTopic(
  topic: AstrologyCalculationDisclosureTopic,
): AstrologyCalculationDisclosureItem {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS[topic];
}

/**
 * Retrieve all calculation disclosure items in recommended presentation order.
 */
export function getAllCalculationDisclosureTopics(): AstrologyCalculationDisclosureItem[] {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ORDERED_TOPICS.map(
    (topic) => ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS[topic],
  );
}

/**
 * Retrieve a concise summary of fields transmitted for calculation.
 */
export function getFieldsSentDisclosureSummary(): string {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS['fields-sent'].summary;
}

/**
 * Retrieve the privacy guarantee confirming that friendly location labels stay local.
 */
export function getLocationLabelPrivacyNotice(): string {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS['local-location-label'].summary;
}

/**
 * Retrieve the notice explaining astronomical uncertainty when birth time is unknown.
 */
export function getUnknownTimeUncertaintyNotice(): string {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS['unknown-time-uncertainty'].summary;
}

/**
 * Retrieve the notice clarifying that calculation is ephemeris math, not generative AI.
 */
export function getCalculationVsAiDistinctionNotice(): string {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS['calculation-vs-ai'].summary;
}

/**
 * Retrieve the disclosure regarding external provider logging and local deletion boundaries.
 */
export function getProviderProcessingLimitationNotice(): string {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS['provider-processing-limitations'].summary;
}

/**
 * Retrieve the explicit statement verifying that dream journal data is never included.
 */
export function getDreamJournalExclusionGuarantee(): string {
  return ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS['dream-journal-exclusion'].summary;
}

/**
 * Type guard verifying whether a value is a recognized AstrologyCalculationDisclosureTopic.
 */
export function isRecognizedCalculationDisclosureTopic(
  value: unknown,
): value is AstrologyCalculationDisclosureTopic {
  return (
    typeof value === 'string' &&
    ASTROLOGY_CALCULATION_DISCLOSURE_ORDERED_TOPICS.includes(
      value as AstrologyCalculationDisclosureTopic,
    )
  );
}
