/**
 * Astrology Preview FAQ Data
 *
 * A typed, content-only FAQ dataset for the optional private Astrology Preview
 * covering all 7 critical operational and privacy domains:
 * 1. Calculation vs. AI Reflection (`calculation-vs-reflection`)
 * 2. Transmitted Fields (`fields-sent`)
 * 3. Local-Only Location Labels (`local-location-labels`)
 * 4. Missing Birth Time & Date-Only Uncertainty (`missing-birth-time`)
 * 5. Provider-Side Processing Boundaries (`provider-processing`)
 * 6. Local Deletion Scope & Limitations (`local-deletion-limits`)
 * 7. Why Production Remains Blocked (`production-blocked`)
 *
 * All wording is strictly concise, provider-neutral, non-predictive, privacy-preserving,
 * and free of guarantees or launch-date promises.
 */

export type AstrologyPreviewFaqTopic =
  | 'calculation-vs-reflection'
  | 'fields-sent'
  | 'local-location-labels'
  | 'missing-birth-time'
  | 'provider-processing'
  | 'local-deletion-limits'
  | 'production-blocked';

export type AstrologyPreviewFaqCategory =
  | 'methodology'
  | 'privacy'
  | 'precision'
  | 'operations';

export interface AstrologyPreviewFaqItem {
  /** Stable unique topic identifier */
  id: AstrologyPreviewFaqTopic;
  /** Categorical grouping */
  category: AstrologyPreviewFaqCategory;
  /** Concise badge label for status pills or tag chips */
  badgeLabel: string;
  /** Clear, user-facing question text */
  question: string;
  /** Compact one-sentence summary answer */
  shortAnswer: string;
  /** Comprehensive educational answer */
  answer: string;
  /** Key bullet points highlighting boundaries, scope, or recovery */
  keyPoints: readonly string[];
  /** Screen reader accessibility description */
  accessibilityLabel: string;
}

export interface AstrologyPreviewFaqBundle {
  /** Master FAQ section title */
  title: string;
  /** Subtitle or introductory note */
  subtitle: string;
  /** Core non-predictive and privacy disclaimer */
  coreDisclaimer: string;
  /** Map of FAQ items indexed by topic identifier */
  items: Record<AstrologyPreviewFaqTopic, AstrologyPreviewFaqItem>;
  /** Ordered list of topic keys for consistent display */
  orderedTopics: readonly AstrologyPreviewFaqTopic[];
}

export const ASTROLOGY_PREVIEW_FAQ_ORDERED_TOPICS: readonly AstrologyPreviewFaqTopic[] = [
  'calculation-vs-reflection',
  'fields-sent',
  'local-location-labels',
  'missing-birth-time',
  'provider-processing',
  'local-deletion-limits',
  'production-blocked',
] as const;

export const ASTROLOGY_PREVIEW_FAQ_ITEMS: Record<
  AstrologyPreviewFaqTopic,
  AstrologyPreviewFaqItem
> = {
  'calculation-vs-reflection': {
    id: 'calculation-vs-reflection',
    category: 'methodology',
    badgeLabel: 'Ephemeris vs AI',
    question: 'What is the difference between chart calculation and AI reflection?',
    shortAnswer:
      'Chart calculation is deterministic ephemeris math, while AI reflection is an optional, separate text interpretation for journaling.',
    answer:
      'Astronomical chart calculation uses deterministic mathematical ephemeris formulas to determine planetary positions from your birth date, time, and coordinates without artificial intelligence. In contrast, AI reflection is an optional text generation that provides symbolic metaphors for introspective contemplation. The reflection never alters mathematical positions, predicts future events, or provides psychological diagnoses.',
    keyPoints: [
      'Chart calculations derive from deterministic astronomical algorithms, not machine learning.',
      'AI reflection is an optional text summary intended solely for personal journaling.',
      'Neither calculation nor reflection provides fortune-telling, medical advice, or psychiatric diagnosis.',
    ],
    accessibilityLabel:
      'FAQ explaining the distinction between deterministic astronomical calculation and optional generative AI reflection.',
  },

  'fields-sent': {
    id: 'fields-sent',
    category: 'privacy',
    badgeLabel: 'Data Transmitted',
    question: 'What data is sent to external services when calculating a chart?',
    shortAnswer:
      'Only your birth date, optional birth time, numeric coordinates, and optional timezone are transmitted.',
    answer:
      'The chart request contains birth date (YYYY-MM-DD), optional birth time (HH:MM), numeric latitude and longitude coordinates, and optional IANA timezone. Personal names, account credentials, friendly location labels, and Jungian dream entries are excluded from that request.',
    keyPoints: [
      'Transmits birth date and numerical geographic coordinates.',
      'Transmits birth time and timezone identifier only if you provide them.',
      'Excludes personal names, email addresses, accounts, and all dream journal text.',
    ],
    accessibilityLabel:
      'FAQ detailing the exact numerical birth parameters transmitted to external calculation endpoints.',
  },

  'local-location-labels': {
    id: 'local-location-labels',
    category: 'privacy',
    badgeLabel: 'Kept on Device',
    question: 'Is my city or location label sent to calculation services?',
    shortAnswer:
      'No; your friendly city or place name is stored exclusively on this device and is never transmitted.',
    answer:
      'Friendly location labels (such as "Seattle, WA" or "London, UK") are stored only on your local device to personalize your view. Only the numeric latitude and longitude coordinates are transmitted across the network for ephemeris calculation, keeping your place names completely private.',
    keyPoints: [
      'Friendly city and place names remain strictly on your local device.',
      'Only mathematical latitude and longitude coordinates are sent to calculation services.',
      'External endpoints and server logs never receive your typed location labels.',
    ],
    accessibilityLabel:
      'FAQ clarifying that friendly location names stay on-device and only numerical coordinates leave the device.',
  },

  'missing-birth-time': {
    id: 'missing-birth-time',
    category: 'precision',
    badgeLabel: 'Date Only',
    question: 'What happens if I do not know or provide an exact birth time?',
    shortAnswer:
      'The request sends no birth-time value; the Ascendant, Midheaven, and houses are omitted, and other positions include date-only uncertainty notes.',
    answer:
      'When birth time is omitted, the calculation request sends the birth date with no time value. Because the Ascendant, Midheaven, and twelve houses depend on clock time and local horizon geometry, they are omitted rather than guessed. Read lunar and degree positions alongside the uncertainty notes returned with the chart.',
    keyPoints: [
      'No birth-time value is sent in date-only mode.',
      'Ascendant, Midheaven, and houses require exact clock time and are intentionally omitted.',
      'Lunar and degree positions should be read alongside the returned uncertainty notes.',
    ],
    accessibilityLabel:
      'FAQ describing the midday snapshot reference, omitted houses, and lunar uncertainty when birth time is unknown.',
  },

  'provider-processing': {
    id: 'provider-processing',
    category: 'operations',
    badgeLabel: 'Stateless Processing',
    question: 'How do external providers handle my calculation and reflection requests?',
    shortAnswer:
      'Requests use separate server endpoints without app accounts; external services may retain operational records under their own terms.',
    answer:
      'External calculation and reflection requests pass through separate server endpoints. DreamAlchemy does not create a cloud astrology profile or require an app account for these requests. External services may retain operational records and process submitted data under their independent privacy and data-use terms.',
    keyPoints: [
      'DreamAlchemy does not create a cloud astrology profile or app account.',
      'Chart calculation and optional AI reflection use separate request payloads.',
      'External services may retain operational records under their independent terms.',
    ],
    accessibilityLabel:
      'FAQ explaining stateless external request processing, no user accounts, and prohibitions against model training.',
  },

  'local-deletion-limits': {
    id: 'local-deletion-limits',
    category: 'privacy',
    badgeLabel: 'Deletion Limits',
    question: 'What happens when I delete my astrology data, and what are its limits?',
    shortAnswer:
      'Local deletion removes saved astrology profiles, charts, and reflections from this app, but cannot retract information already processed externally.',
    answer:
      'Deleting your astrology data removes saved birth profiles, computed charts, and AI reflections from the app’s local storage while leaving dream journal entries untouched. Local deletion cannot retroactively retract calculation fields or chart summaries that external services already processed, including any operational records retained under their terms.',
    keyPoints: [
      'Removes saved birth profiles, charts, and reflections from the app’s local storage.',
      'Private dream journal entries, audio notes, and tags remain completely untouched.',
      'Local deletion cannot retract information already processed or retained by external services.',
    ],
    accessibilityLabel:
      'FAQ detailing local device deletion scope and technical limitations regarding external server logs.',
  },

  'production-blocked': {
    id: 'production-blocked',
    category: 'operations',
    badgeLabel: 'Production Gates',
    question: 'Why does the Astrology feature remain blocked in Production?',
    shortAnswer:
      'Production remains blocked until durable rate limiters, spending safeguards, and test matrices are fully verified.',
    answer:
      'The optional Astrology feature is currently restricted to private testing preview builds. General production deployment remains intentionally blocked until key architectural safety gates are satisfied: durable request rate limiters, spend protection alerts, redacted observability, source-project alignment, and verification across test matrices.',
    keyPoints: [
      'Restricted to private preview testing environments only.',
      'Requires durable anonymous rate limiting to prevent Denial-of-Wallet vulnerabilities.',
      'Requires verified spend controls, source-project alignment, and matrix test sign-offs.',
    ],
    accessibilityLabel:
      'FAQ explaining architectural safety gates preventing general production release until full verification.',
  },
};

export const ASTROLOGY_PREVIEW_FAQ_BUNDLE: AstrologyPreviewFaqBundle = {
  title: 'Astrology Preview FAQ',
  subtitle:
    'Answers to common questions regarding calculation mechanics, privacy boundaries, and deployment status.',
  coreDisclaimer:
    'The optional Astrology Preview provides symbolic frameworks for personal journaling and self-reflection. It is non-predictive, non-diagnostic, and is not medical, psychological, legal, or financial guidance.',
  items: ASTROLOGY_PREVIEW_FAQ_ITEMS,
  orderedTopics: ASTROLOGY_PREVIEW_FAQ_ORDERED_TOPICS,
};

/**
 * Retrieve a specific FAQ item by its topic identifier.
 */
export function getAstrologyPreviewFaqItem(
  topic: AstrologyPreviewFaqTopic,
): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS[topic];
}

/**
 * Retrieve all FAQ items in recommended presentation order.
 */
export function getAllAstrologyPreviewFaqItems(): AstrologyPreviewFaqItem[] {
  return ASTROLOGY_PREVIEW_FAQ_ORDERED_TOPICS.map(
    (topic) => ASTROLOGY_PREVIEW_FAQ_ITEMS[topic],
  );
}

/**
 * Retrieve all FAQ items filtered by category.
 */
export function getAstrologyPreviewFaqItemsByCategory(
  category: AstrologyPreviewFaqCategory,
): AstrologyPreviewFaqItem[] {
  return ASTROLOGY_PREVIEW_FAQ_ORDERED_TOPICS
    .map((topic) => ASTROLOGY_PREVIEW_FAQ_ITEMS[topic])
    .filter((item) => item.category === category);
}

/**
 * Retrieve the full FAQ bundle.
 */
export function getAstrologyPreviewFaqBundle(): AstrologyPreviewFaqBundle {
  return ASTROLOGY_PREVIEW_FAQ_BUNDLE;
}

/**
 * Type guard verifying whether a value is a recognized AstrologyPreviewFaqTopic.
 */
export function isRecognizedPreviewFaqTopic(
  value: unknown,
): value is AstrologyPreviewFaqTopic {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_FAQ_ORDERED_TOPICS.includes(
      value as AstrologyPreviewFaqTopic,
    )
  );
}

/**
 * Helper to retrieve the Calculation vs. Reflection FAQ.
 */
export function getCalculationVsReflectionFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['calculation-vs-reflection'];
}

/**
 * Helper to retrieve the Transmitted Fields FAQ.
 */
export function getFieldsSentFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['fields-sent'];
}

/**
 * Helper to retrieve the Local Location Labels FAQ.
 */
export function getLocalLocationLabelsFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['local-location-labels'];
}

/**
 * Helper to retrieve the Missing Birth Time FAQ.
 */
export function getMissingBirthTimeFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['missing-birth-time'];
}

/**
 * Helper to retrieve the Provider Processing FAQ.
 */
export function getProviderProcessingFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['provider-processing'];
}

/**
 * Helper to retrieve the Local Deletion Limits FAQ.
 */
export function getLocalDeletionLimitsFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['local-deletion-limits'];
}

/**
 * Helper to retrieve the Production Blocked FAQ.
 */
export function getProductionBlockedFaq(): AstrologyPreviewFaqItem {
  return ASTROLOGY_PREVIEW_FAQ_ITEMS['production-blocked'];
}
