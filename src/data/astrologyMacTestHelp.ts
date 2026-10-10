/**
 * Astrology Mac Test Guidance & Redaction Helper Copy
 *
 * A typed, content-only dataset of tester instructions and privacy safeguards
 * for manual macOS and iOS Simulator testing of the optional Astrology Preview:
 * 1. Synthetic Test Data (`synthetic-test-data`): Predefined fictitious profiles for testing.
 * 2. Secret Redaction (`secret-redaction`): Preventing API key or token exposure in reports.
 * 3. Birth-Data Redaction (`birth-data-redaction`): Protecting personal identities in test artifacts.
 * 4. Expected Date-Only vs. Timed Results (`expected-results-comparison`): Outcome expectations.
 * 5. Safe Error Screenshots (`safe-screenshots`): Guidelines for capturing evidence safely.
 * 6. Defect-Report Evidence (`defect-evidence`): Standardized privacy-safe bug reports.
 *
 * All guidance is concise, provider-neutral, non-predictive, and privacy-preserving.
 */

export type AstrologyMacTestHelpTopic =
  | 'synthetic-test-data'
  | 'secret-redaction'
  | 'birth-data-redaction'
  | 'expected-results-comparison'
  | 'safe-screenshots'
  | 'defect-evidence';

export interface SyntheticTestProfile {
  /** Stable profile identifier */
  id: string;
  /** Scenario title */
  label: string;
  /** Purpose of the synthetic profile */
  description: string;
  /** Synthetic birth date (YYYY-MM-DD) */
  birthDate: string;
  /** Synthetic birth time (HH:mm) if applicable */
  birthTime?: string;
  /** Synthetic IANA timezone if applicable */
  timezone?: string;
  /** Synthetic latitude */
  latitude: number;
  /** Synthetic longitude */
  longitude: number;
  /** Synthetic display label kept local */
  locationLabel: string;
  /** Expected chart precision outcome */
  expectedPrecision: 'date-only' | 'date-time-timezone';
}

export interface AstrologyMacTestHelpItem {
  /** Unique topic identifier */
  id: AstrologyMacTestHelpTopic;
  /** Primary display title */
  title: string;
  /** Compact title for tabs or chips */
  shortTitle: string;
  /** Badge label for status pills */
  badgeLabel: string;
  /** Single-sentence summary for quick reference */
  summary: string;
  /** Detailed tester guidance */
  guidance: string;
  /** Actionable checklist items for test verification */
  checklist: readonly string[];
  /** Screen reader accessibility description */
  accessibilityLabel: string;
}

export interface AstrologyMacTestHelpBundle {
  /** Master title */
  title: string;
  /** Subtitle or introductory note */
  subtitle: string;
  /** Master privacy reminder */
  privacyReminder: string;
  /** Map of test guidance items indexed by topic */
  items: Record<AstrologyMacTestHelpTopic, AstrologyMacTestHelpItem>;
  /** Ordered topic keys for consistent display */
  orderedTopics: readonly AstrologyMacTestHelpTopic[];
  /** Standardized synthetic test profiles */
  sampleProfiles: readonly SyntheticTestProfile[];
}

export const SYNTHETIC_TEST_PROFILES: readonly SyntheticTestProfile[] = [
  {
    id: 'synthetic-date-only',
    label: 'Standard Date-Only Profile',
    description: 'Verifies midday snapshot, omitted houses, and lunar variance notice.',
    birthDate: '1995-04-12',
    latitude: 40.7128,
    longitude: -74.006,
    locationLabel: 'Demo Metropolis',
    expectedPrecision: 'date-only',
  },
  {
    id: 'synthetic-timed-standard',
    label: 'Standard Timed Profile',
    description: 'Verifies Ascendant, Midheaven, and provider-returned timed placements.',
    birthDate: '1992-08-20',
    birthTime: '14:30',
    timezone: 'America/New_York',
    latitude: 40.7128,
    longitude: -74.006,
    locationLabel: 'Test Staging City',
    expectedPrecision: 'date-time-timezone',
  },
  {
    id: 'synthetic-leap-year',
    label: 'Leap-Year UTC Profile',
    description: 'Verifies leap day calendar handling and UTC reference computation.',
    birthDate: '2024-02-29',
    birthTime: '12:00',
    timezone: 'UTC',
    latitude: 51.5074,
    longitude: -0.1278,
    locationLabel: 'Greenwich Meridian',
    expectedPrecision: 'date-time-timezone',
  },
] as const;

export const ASTROLOGY_MAC_TEST_HELP_ORDERED_TOPICS: readonly AstrologyMacTestHelpTopic[] = [
  'synthetic-test-data',
  'secret-redaction',
  'birth-data-redaction',
  'expected-results-comparison',
  'safe-screenshots',
  'defect-evidence',
] as const;

export const ASTROLOGY_MAC_TEST_HELP_ITEMS: Record<
  AstrologyMacTestHelpTopic,
  AstrologyMacTestHelpItem
> = {
  'synthetic-test-data': {
    id: 'synthetic-test-data',
    title: 'Synthetic Test Data Usage',
    shortTitle: 'Synthetic Data',
    badgeLabel: 'Test Data',
    summary:
      'Always use fictitious test profiles; never enter real tester or personal birth details.',
    guidance:
      'To prevent accidental privacy leakage in test logs or defect reports, all manual test passes must strictly use fictitious synthetic profiles. Use standard coordinate pairs (e.g. 40.7128, -74.0060) and generalized fictional city labels (e.g. "Demo Metropolis"). Never enter actual birth certificates, living persons’ names, or home addresses.',
    checklist: [
      'Select a designated synthetic profile before starting test scenarios.',
      'Do not use your own birth date, clock time, or place of birth.',
      'Ensure location labels use generic fictional terms without street names or postal codes.',
    ],
    accessibilityLabel:
      'Guidance requiring testers to use synthetic test data instead of real birth details.',
  },

  'secret-redaction': {
    id: 'secret-redaction',
    title: 'Server Secret & Credential Redaction',
    shortTitle: 'Secret Redaction',
    badgeLabel: 'Redact Secrets',
    summary:
      'Never capture, print, or attach API keys, server tokens, or Authorization headers.',
    guidance:
      'Server-side credentials (such as ASTROLOGY_API_KEY, OPENAI_API_KEY, and Vercel access tokens) must remain strictly server-bound. When inspecting network requests or terminal logs, verify that secret tokens are never exposed to the client. If reviewing server proxy logs, ensure Authorization and api-key headers are scrubbed or masked with [REDACTED].',
    checklist: [
      'Never include ASTROLOGY_API_KEY or OPENAI_API_KEY in test reports or tickets.',
      'Mask all Authorization and API key headers in request payloads with [REDACTED].',
      'Confirm browser network requests do not include upstream vendor credentials.',
    ],
    accessibilityLabel:
      'Guidance on redacting API keys and server credentials from all testing evidence.',
  },

  'birth-data-redaction': {
    id: 'birth-data-redaction',
    title: 'Birth Data & Identifier Redaction',
    shortTitle: 'Birth Data Redaction',
    badgeLabel: 'Mask Personal Data',
    summary:
      'Scrub or mask any accidental personal data, street addresses, or names before reporting.',
    guidance:
      'If real or identifiable data was inadvertently entered during an ad-hoc test, immediately purge it using local deletion and scrub the text before saving defect artifacts. Defect summaries and reproduction steps should replace specific coordinates with synthetic placeholders and redact any living person identifiers.',
    checklist: [
      'Verify no personal names or real email addresses appear in test artifacts.',
      'Replace accidental private coordinates with synthetic sample coordinates.',
      'Confirm Jungian dream titles, journal text, and tags are completely absent.',
    ],
    accessibilityLabel:
      'Guidance on scrubbing and masking accidental personal data from defect reports.',
  },

  'expected-results-comparison': {
    id: 'expected-results-comparison',
    title: 'Expected Date-Only vs. Timed Results',
    shortTitle: 'Expected Results',
    badgeLabel: 'Result Verification',
    summary:
      'Verify date-only omits time-dependent details, while timed results include available angles and house placements.',
    guidance:
      'When testing date-only calculations (TC-TIME-01), verify that the response has precision "date-only", omits the Ascendant, Midheaven, and house numbers, and displays an explicit uncertainty notice. When testing timed calculations with a timezone (TC-TIME-02), verify that precision is "date-time-timezone", the provider returns Ascendant and Midheaven placements, and any available planet house numbers are preserved.',
    checklist: [
      'Date-only mode must omit Ascendant and house cusps, not guess or default them to 0.',
      'Date-only mode must display an explicit missing-time uncertainty note.',
      'Timed mode must include provider-returned Ascendant and Midheaven placements and preserve available planet house numbers.',
      'Both modes must display prominent non-predictive, reflective disclaimers.',
    ],
    accessibilityLabel:
      'Guidance distinguishing expected outcomes between date-only snapshots and timed chart calculations.',
  },

  'safe-screenshots': {
    id: 'safe-screenshots',
    title: 'Safe Error & Screen Capture Practices',
    shortTitle: 'Safe Screenshots',
    badgeLabel: 'Clean Captures',
    summary:
      'Crop screenshots to the application modal; do not expose DevTools headers or system paths.',
    guidance:
      'When attaching visual evidence of bugs or errors, crop the capture strictly to the active application modal or error banner. Avoid full-screen captures that expose browser bookmarks, personal tabs, system username file paths (e.g. /Users/name/...), or the browser DevTools Network headers pane. Inspect images before attaching to ensure zero private context is visible.',
    checklist: [
      'Crop captures tightly to the application dialog or component under test.',
      'Exclude browser navigation bars, bookmarks, extensions, and other open tabs.',
      'Do not include DevTools Network request headers containing authorization or cookies.',
      'Verify operating system usernames and file paths are not visible.',
    ],
    accessibilityLabel:
      'Instructions for capturing cropped, sanitized screenshots without exposing personal context.',
  },

  'defect-evidence': {
    id: 'defect-evidence',
    title: 'Standardized Defect-Report Evidence',
    shortTitle: 'Defect Evidence',
    badgeLabel: 'Report Template',
    summary:
      'Provide structured, reproducible bug reports with test IDs, environment details, and clean logs.',
    guidance:
      'Defect reports must follow a standardized format to enable rapid debugging without compromising security. Include the relevant Test Matrix ID (e.g. TC-ERR-03), client environment (macOS version, browser engine, build hash), exact synthetic reproduction steps, expected versus actual behavior, and sanitized error codes without sensitive payload details.',
    checklist: [
      'Reference the Test Matrix Case ID (e.g. TC-DATE-03, TC-ERR-01).',
      'Document macOS version, browser/simulator platform, and Git commit hash.',
      'List synthetic step-by-step reproduction sequence.',
      'Include machine-readable error codes (e.g. feature_disabled, provider_rate_limited).',
      'Attach sanitized, cropped visual evidence.',
    ],
    accessibilityLabel:
      'Checklist for submitting privacy-safe, reproducible defect reports.',
  },
};

export const ASTROLOGY_MAC_TEST_HELP_BUNDLE: AstrologyMacTestHelpBundle = {
  title: 'Astrology Mac Test Guidance',
  subtitle:
    'Standard operating procedures for privacy-safe manual testing and defect reporting on macOS.',
  privacyReminder:
    'All testing activities must preserve privacy boundaries: use only synthetic test data, never expose API keys or server tokens, and ensure dream journal records remain strictly isolated.',
  items: ASTROLOGY_MAC_TEST_HELP_ITEMS,
  orderedTopics: ASTROLOGY_MAC_TEST_HELP_ORDERED_TOPICS,
  sampleProfiles: SYNTHETIC_TEST_PROFILES,
};

/**
 * Retrieve a specific Mac test guidance item by topic identifier.
 */
export function getAstrologyMacTestHelpItem(
  topic: AstrologyMacTestHelpTopic,
): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS[topic];
}

/**
 * Retrieve all Mac test guidance items in recommended display order.
 */
export function getAllAstrologyMacTestHelpItems(): AstrologyMacTestHelpItem[] {
  return ASTROLOGY_MAC_TEST_HELP_ORDERED_TOPICS.map(
    (topic) => ASTROLOGY_MAC_TEST_HELP_ITEMS[topic],
  );
}

/**
 * Retrieve the complete Mac test guidance bundle including synthetic profiles.
 */
export function getAstrologyMacTestHelpBundle(): AstrologyMacTestHelpBundle {
  return ASTROLOGY_MAC_TEST_HELP_BUNDLE;
}

/**
 * Retrieve all standardized synthetic test profiles.
 */
export function getSyntheticTestProfiles(): readonly SyntheticTestProfile[] {
  return SYNTHETIC_TEST_PROFILES;
}

/**
 * Find a synthetic test profile by its unique ID.
 */
export function getSyntheticProfileById(
  id: string,
): SyntheticTestProfile | undefined {
  return SYNTHETIC_TEST_PROFILES.find((profile) => profile.id === id);
}

/**
 * Type guard verifying whether a value is a recognized AstrologyMacTestHelpTopic.
 */
export function isRecognizedMacTestHelpTopic(
  value: unknown,
): value is AstrologyMacTestHelpTopic {
  return (
    typeof value === 'string' &&
    ASTROLOGY_MAC_TEST_HELP_ORDERED_TOPICS.includes(
      value as AstrologyMacTestHelpTopic,
    )
  );
}

/**
 * Helper to retrieve synthetic test data guidance.
 */
export function getSyntheticTestDataHelp(): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS['synthetic-test-data'];
}

/**
 * Helper to retrieve server secret redaction guidance.
 */
export function getSecretRedactionHelp(): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS['secret-redaction'];
}

/**
 * Helper to retrieve birth data redaction guidance.
 */
export function getBirthDataRedactionHelp(): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS['birth-data-redaction'];
}

/**
 * Helper to retrieve expected results comparison guidance.
 */
export function getExpectedResultsComparisonHelp(): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS['expected-results-comparison'];
}

/**
 * Helper to retrieve safe screenshot capture guidance.
 */
export function getSafeScreenshotsHelp(): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS['safe-screenshots'];
}

/**
 * Helper to retrieve defect-report evidence guidance.
 */
export function getDefectEvidenceHelp(): AstrologyMacTestHelpItem {
  return ASTROLOGY_MAC_TEST_HELP_ITEMS['defect-evidence'];
}
