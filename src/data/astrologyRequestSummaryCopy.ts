/**
 * Astrology Request Summary & Pre-Submit Disclosure Copy
 *
 * A typed, content-only dataset of user-facing review-before-submit copy that clearly
 * distinguishes:
 * 1. Fields sent for chart calculation (birth date, optional time, coordinates, timezone).
 * 2. Fields stored locally by the app (display location label, saved local profile/chart bundle).
 * 3. Chart data sent for optional AI reflection (the app sends the calculated chart to its
 *    server route, which sends a compact placement/aspect summary to the AI provider).
 * 4. Dream data never included (raw journal narratives, reflections, tags, and personal identity).
 *
 * Framing is non-predictive, non-diagnostic, and privacy-preserving.
 */

export type AstrologyDataDestinationCategory =
  | 'sent-for-calculation'
  | 'kept-local'
  | 'sent-for-reflection'
  | 'never-included';

export interface AstrologyRequestDataFieldItem {
  /** Stable identifier */
  id: string;
  /** Field or data concept name */
  field: string;
  /** Destination classification */
  category: AstrologyDataDestinationCategory;
  /** User-facing display label */
  label: string;
  /** Data destination description */
  destination: string;
  /** Purpose of this data item */
  description: string;
  /** Whether the field is optional for the user */
  isOptional: boolean;
  /** Detailed privacy and storage guarantee */
  privacyNote: string;
}

export interface AstrologyRequestCategorySection {
  /** Unique category identifier */
  id: AstrologyDataDestinationCategory;
  /** User-facing header */
  title: string;
  /** Compact title for chips, tabs, or badges */
  shortTitle: string;
  /** Badge tag label */
  badgeLabel: string;
  /** Concise summary statement */
  summary: string;
  /** Detailed explanatory narrative */
  description: string;
  /** List of data items belonging to this category */
  items: AstrologyRequestDataFieldItem[];
  /** Screen reader accessible label */
  accessibilityLabel: string;
}

export interface AstrologyRequestSummaryBundle {
  /** Panel title */
  title: string;
  /** Panel subtitle */
  subtitle: string;
  /** Review prompt before submission */
  reviewPrompt: string;
  /** Core privacy guarantee */
  privacyGuarantee: string;
  /** Map of sections indexed by category */
  sections: Record<AstrologyDataDestinationCategory, AstrologyRequestCategorySection>;
  /** Ordered list of category IDs for display */
  orderedCategoryIds: readonly AstrologyDataDestinationCategory[];
}

export const ASTROLOGY_REQUEST_FIELDS: readonly AstrologyRequestDataFieldItem[] = [
  // 1. Sent for Chart Calculation
  {
    id: 'calc-birth-date',
    field: 'birthDate',
    category: 'sent-for-calculation',
    label: 'Birth Date (YYYY-MM-DD)',
    destination: 'Calculation Service Endpoint',
    description: 'Determines the positions of planets and celestial bodies on that date.',
    isOptional: false,
    privacyNote: 'Used solely to calculate planetary positions against astronomical ephemeris models.',
  },
  {
    id: 'calc-birth-time',
    field: 'birthTime',
    category: 'sent-for-calculation',
    label: 'Birth Time (HH:mm)',
    destination: 'Calculation Service Endpoint',
    description: 'Determines the local Earth rotation angle, Ascendant (rising sign), and house cusps.',
    isOptional: true,
    privacyNote: 'Omitted if unknown; chart operates in date-only mode when blank.',
  },
  {
    id: 'calc-coordinates',
    field: 'coordinates',
    category: 'sent-for-calculation',
    label: 'Geographic Coordinates (Latitude & Longitude)',
    destination: 'Calculation Service Endpoint',
    description: 'Establishes the observer vantage point on Earth for horizon angles and houses.',
    isOptional: false,
    privacyNote: 'Transmitted in the request payload to compute the chart, but never saved in local device storage.',
  },
  {
    id: 'calc-timezone',
    field: 'timezone',
    category: 'sent-for-calculation',
    label: 'IANA Timezone',
    destination: 'Calculation Service Endpoint',
    description: 'Converts local clock time to universal astronomical time (UTC).',
    isOptional: true,
    privacyNote: 'Supplied only when birth time is provided; resolves historical daylight saving shifts.',
  },
  {
    id: 'calc-consent',
    field: 'consent',
    category: 'sent-for-calculation',
    label: 'Explicit Consent Acknowledgement',
    destination: 'Calculation Service Endpoint',
    description: 'Confirms reflective acknowledgment and explicit permission for calculation processing.',
    isOptional: false,
    privacyNote: 'Required by the server endpoint before processing any birth parameters.',
  },

  // 2. Stored locally by the app
  {
    id: 'local-location-label',
    field: 'locationLabel',
    category: 'kept-local',
    label: 'Location Label (e.g. "Chicago, IL")',
    destination: 'Local Device Storage Only',
    description: 'Friendly display name shown on your profile screen for your personal reference.',
    isOptional: true,
    privacyNote: 'Excluded from all chart calculation and reflection request payloads; saved locally only after calculation succeeds.',
  },
  {
    id: 'local-saved-profile',
    field: 'savedProfile',
    category: 'kept-local',
    label: 'Saved Local Birth Profile',
    destination: 'Local Device Storage Only',
    description: 'Stores your entered birth date, optional time, and timezone locally so you do not need to re-enter them.',
    isOptional: false,
    privacyNote: 'Saved in local device storage only after calculation succeeds. Its birth fields were processed in the chart request described above.',
  },
  {
    id: 'local-calculated-chart',
    field: 'calculatedChart',
    category: 'kept-local',
    label: 'Calculated Placements & Chart Bundle',
    destination: 'Local Device Storage Only',
    description: 'Stores calculated planetary placements, houses, aspects, and uncertainty notes for viewing.',
    isOptional: false,
    privacyNote: 'Persisted locally for later viewing. If you request an AI reflection, the app sends this calculated chart to the DreamAlchemy server route for compaction.',
  },
  {
    id: 'local-form-draft',
    field: 'formDraftState',
    category: 'kept-local',
    label: 'Unsaved Form Edits',
    destination: 'Screen Memory Only',
    description: 'Temporary text currently entered in the form fields.',
    isOptional: true,
    privacyNote: 'Remains on screen while editing and is not persisted until a calculation succeeds.',
  },

  // 3. Sent for Optional AI Reflection
  {
    id: 'refl-calculated-chart',
    field: 'calculatedChart',
    category: 'sent-for-reflection',
    label: 'Calculated Chart',
    destination: 'DreamAlchemy Reflection Server Route (Optional)',
    description: 'The calculated chart is sent only after you explicitly request an AI reflection.',
    isOptional: true,
    privacyNote: 'The server route rejects raw dream text and birth-profile fields, then builds a capped summary for the AI provider.',
  },
  {
    id: 'refl-compact-placements',
    field: 'compactPlacements',
    category: 'sent-for-reflection',
    label: 'Compact Placement Summary',
    destination: 'AI Provider via DreamAlchemy Server Route (Optional)',
    description: 'Up to 12 body, sign, and house placements (e.g. Sun in Aries, Moon in Taurus).',
    isOptional: false,
    privacyNote: 'Contains symbolic astronomical positions only; excludes your birth date, time, and coordinates.',
  },
  {
    id: 'refl-compact-aspects',
    field: 'compactAspects',
    category: 'sent-for-reflection',
    label: 'Compact Aspect Summary',
    destination: 'AI Provider via DreamAlchemy Server Route (Optional)',
    description: 'Up to 10 geometric aspect relationships between chart bodies (e.g. Sun trine Moon).',
    isOptional: false,
    privacyNote: 'Symbolic angle data only; no personal or identifying information.',
  },
  {
    id: 'refl-uncertainty-notes',
    field: 'uncertaintyNotes',
    category: 'sent-for-reflection',
    label: 'Precision & Uncertainty Notes',
    destination: 'AI Provider via DreamAlchemy Server Route (Optional)',
    description: 'Context notes indicating whether the chart uses date-only or time-specific precision.',
    isOptional: false,
    privacyNote: 'Ensures the AI reflection respects date-only limitations without assuming time-dependent details.',
  },

  // 4. Never Included
  {
    id: 'never-dream-text',
    field: 'dreamJournalText',
    category: 'never-included',
    label: 'Personal Dream Journal Narratives & Notes',
    destination: 'Never Transmitted (Strictly Local)',
    description: 'Your written dream stories, personal reflections, interpretations, and voice notes.',
    isOptional: false,
    privacyNote: 'Strictly local to your device; never sent to chart calculation or AI reflection endpoints.',
  },
  {
    id: 'never-dream-patterns',
    field: 'dreamPatterns',
    category: 'never-included',
    label: 'Dream Tags, Themes & Pattern History',
    destination: 'Never Transmitted (Strictly Local)',
    description: 'Recurring symbols, emotional ratings, technique logs, and sleep patterns.',
    isOptional: false,
    privacyNote: 'Kept entirely within local journal storage; zero access by astrology services.',
  },
  {
    id: 'never-personal-identity',
    field: 'personalIdentity',
    category: 'never-included',
    label: 'Names, Email & Account Identifiers',
    destination: 'Not Requested by Astrology',
    description: 'Full legal names, contact information, and account identifiers.',
    isOptional: false,
    privacyNote: 'The Astrology form does not request these identifiers; chart calculation uses birth parameters and coordinates.',
  },
] as const;

export const ASTROLOGY_REQUEST_SECTIONS: Record<
  AstrologyDataDestinationCategory,
  AstrologyRequestCategorySection
> = {
  'sent-for-calculation': {
    id: 'sent-for-calculation',
    title: 'Sent for Chart Calculation',
    shortTitle: 'Chart Calculation',
    badgeLabel: 'Sent to Server',
    summary:
      'Sent to the calculation endpoint to compute astronomical body positions and aspects.',
    description:
      'When you request a chart, only the astronomical parameters necessary to calculate celestial positions are transmitted. These parameters are processed by the calculation provider to compute sign placements, angles, and aspects.',
    items: ASTROLOGY_REQUEST_FIELDS.filter((item) => item.category === 'sent-for-calculation'),
    accessibilityLabel: 'Summary of fields transmitted for chart calculation',
  },
  'kept-local': {
    id: 'kept-local',
    title: 'Stored Locally by the App',
    shortTitle: 'Local Storage',
    badgeLabel: 'Saved on Device',
    summary:
      'Saved on this device after a successful chart calculation.',
    description:
      'These items are saved in local app storage after a successful calculation and can be deleted from the Astrology screen. Birth fields are also used in the chart request, and a calculated chart is sent to the server route only when you separately request an AI reflection.',
    items: ASTROLOGY_REQUEST_FIELDS.filter((item) => item.category === 'kept-local'),
    accessibilityLabel: 'Summary of Astrology data saved in local app storage',
  },
  'sent-for-reflection': {
    id: 'sent-for-reflection',
    title: 'Sent for Optional AI Reflection',
    shortTitle: 'AI Reflection',
    badgeLabel: 'Optional Request',
    summary:
      'Sent only if you explicitly choose to generate an AI reflection after your chart is calculated.',
    description:
      'AI reflection is a separate, opt-in feature. The app sends the calculated chart to the DreamAlchemy reflection route; that route rejects birth-profile and dream fields, creates a capped placement/aspect summary, and sends that summary to the AI provider.',
    items: ASTROLOGY_REQUEST_FIELDS.filter((item) => item.category === 'sent-for-reflection'),
    accessibilityLabel: 'Summary of chart summaries sent for optional AI reflection',
  },
  'never-included': {
    id: 'never-included',
    title: 'Never Included in Astrology Requests',
    shortTitle: 'Never Included',
    badgeLabel: 'Strictly Isolated',
    summary:
      'Personal dream journal entries and identifying details are never sent or mixed with astrology.',
    description:
      'DreamAlchemy enforces a strict privacy boundary: astrology is an optional reflective lens that never accesses, bundles, or transmits your personal dream journal records.',
    items: ASTROLOGY_REQUEST_FIELDS.filter((item) => item.category === 'never-included'),
    accessibilityLabel: 'Summary of private dream data never included in astrology requests',
  },
};

export const ASTROLOGY_REQUEST_ORDERED_CATEGORIES: readonly AstrologyDataDestinationCategory[] = [
  'sent-for-calculation',
  'kept-local',
  'sent-for-reflection',
  'never-included',
] as const;

export const ASTROLOGY_REQUEST_SUMMARY_BUNDLE: AstrologyRequestSummaryBundle = {
  title: 'Astrology Data Sharing Summary',
  subtitle: 'Clear overview of what is transmitted, what stays local, and what is never shared',
  reviewPrompt:
    'Review what data is processed before calculating your chart or requesting an optional reflection.',
  privacyGuarantee:
    'Raw dream journal entries stay in local journal storage and are not included in astrology requests. Chart calculation uses birth parameters and coordinates; optional AI reflection uses calculated chart data through the DreamAlchemy server route.',
  sections: ASTROLOGY_REQUEST_SECTIONS,
  orderedCategoryIds: ASTROLOGY_REQUEST_ORDERED_CATEGORIES,
};

/**
 * Retrieve the summary section for a given data destination category.
 */
export function getRequestSummarySection(
  category: AstrologyDataDestinationCategory,
): AstrologyRequestCategorySection {
  return ASTROLOGY_REQUEST_SECTIONS[category];
}

/**
 * Retrieve all summary sections in recommended display order.
 */
export function getAllRequestSummarySections(): AstrologyRequestCategorySection[] {
  return ASTROLOGY_REQUEST_ORDERED_CATEGORIES.map((id) => ASTROLOGY_REQUEST_SECTIONS[id]);
}

/**
 * Retrieve all data field items belonging to a specific category.
 */
export function getRequestFieldsByCategory(
  category: AstrologyDataDestinationCategory,
): AstrologyRequestDataFieldItem[] {
  return ASTROLOGY_REQUEST_SECTIONS[category]?.items ?? [];
}

/**
 * Retrieve all data field items across all categories.
 */
export function getAllRequestSummaryFields(): AstrologyRequestDataFieldItem[] {
  return [...ASTROLOGY_REQUEST_FIELDS];
}

/**
 * Retrieve the explicit statement verifying dream journal isolation.
 */
export function getDreamJournalIsolationGuarantee(): string {
  return (
    ASTROLOGY_REQUEST_SECTIONS['never-included']?.summary ??
    'Dream journal records remain strictly separate and are never included in astrology requests.'
  );
}

/**
 * Retrieve a concise overview description for reviewing before submission.
 */
export function formatRequestReviewSummary(): string {
  return (
    'Birth date, coordinates, and optional time are sent to compute celestial positions. ' +
    'The location label is excluded from requests, while the successful profile and chart are saved locally. ' +
    'An optional AI reflection sends the calculated chart through the DreamAlchemy server route; dream journal narratives are not included.'
  );
}

/**
 * Type guard verifying whether a value is a recognized AstrologyDataDestinationCategory.
 */
export function isRecognizedDataDestinationCategory(
  value: unknown,
): value is AstrologyDataDestinationCategory {
  return (
    typeof value === 'string' &&
    ASTROLOGY_REQUEST_ORDERED_CATEGORIES.includes(value as AstrologyDataDestinationCategory)
  );
}
