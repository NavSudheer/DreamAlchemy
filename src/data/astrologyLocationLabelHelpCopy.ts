/**
 * Astrology Location Label Guidance & Help Copy
 *
 * A typed, content-only dataset of user-facing educational guidance explaining:
 * 1. The location label is display-only and has no effect on chart calculations.
 * 2. Recommended broad city/region descriptions and 100-character limit.
 * 3. Why street addresses, house numbers, and postal codes should be avoided (privacy first).
 * 4. Stored strictly locally on the device with the local birth profile.
 * 5. Strictly excluded from chart calculation and AI reflection network request payloads.
 *
 * Framing is non-predictive, non-diagnostic, and privacy-preserving.
 */

export const MAX_LOCATION_LABEL_LENGTH = 120;

export type LocationLabelHelpSectionId =
  | 'display-only'
  | 'broad-city-region'
  | 'avoid-street-addresses'
  | 'local-storage-only'
  | 'excluded-from-requests';

export interface LocationLabelExample {
  /** Stable identifier */
  id: string;
  /** Recommended user-facing label */
  label: string;
  /** Geographic scale */
  category: 'city' | 'metro' | 'region';
  /** Context notes */
  notes: string;
}

export interface LocationLabelDiscouragedExample {
  /** Stable identifier */
  id: string;
  /** Discouraged overly-specific input */
  discouragedInput: string;
  /** Reason why this input is discouraged */
  reason: string;
  /** Privacy-preserving recommended alternative */
  recommendedAlternative: string;
}

export interface LocationLabelHelpSection {
  /** Unique section identifier */
  id: LocationLabelHelpSectionId;
  /** User-facing section title */
  title: string;
  /** Concise summary statement */
  summary: string;
  /** Detailed educational explanation */
  content: string;
  /** Key bullet points for quick scanning */
  bulletPoints: string[];
  /** Screen reader accessible label */
  accessibilityLabel: string;
}

export interface AstrologyLocationLabelHelpBundle {
  /** Panel title */
  title: string;
  /** Panel subtitle */
  subtitle: string;
  /** Universal privacy guarantee */
  privacyGuarantee: string;
  /** Maximum character length limit */
  maxLength: number;
  /** Ordered list of guidance sections */
  sections: LocationLabelHelpSection[];
  /** Recommended examples */
  recommendedExamples: LocationLabelExample[];
  /** Discouraged examples */
  discouragedExamples: LocationLabelDiscouragedExample[];
}

export const LOCATION_LABEL_RECOMMENDED_EXAMPLES: readonly LocationLabelExample[] = [
  {
    id: 'city-state',
    label: 'Chicago, IL',
    category: 'city',
    notes: 'Standard city and state/province abbreviation.',
  },
  {
    id: 'metro-area',
    label: 'Greater London',
    category: 'metro',
    notes: 'Metropolitan area description.',
  },
  {
    id: 'city-country',
    label: 'Kyoto, Japan',
    category: 'city',
    notes: 'City and country for international birthplaces.',
  },
  {
    id: 'region',
    label: 'Bavaria, Germany',
    category: 'region',
    notes: 'Broader state or regional description.',
  },
] as const;

export const LOCATION_LABEL_DISCOURAGED_EXAMPLES: readonly LocationLabelDiscouragedExample[] = [
  {
    id: 'street-address',
    discouragedInput: '123 Elm Street, Apt 4B',
    reason: 'Contains specific residential house and apartment details.',
    recommendedAlternative: 'Springfield, IL',
  },
  {
    id: 'hospital-building',
    discouragedInput: 'Memorial Hospital, Room 302',
    reason: 'Contains specific institutional facility and room details.',
    recommendedAlternative: 'Seattle, WA',
  },
  {
    id: 'postal-code-residence',
    discouragedInput: '742 Evergreen Terr, 90210',
    reason: 'Contains private street address and exact postal code.',
    recommendedAlternative: 'Beverly Hills, CA',
  },
] as const;

export const LOCATION_LABEL_HELP_SECTIONS: Record<
  LocationLabelHelpSectionId,
  LocationLabelHelpSection
> = {
  'display-only': {
    id: 'display-only',
    title: 'Display-Only Context',
    summary:
      'The location label is purely a friendly personal note shown on your profile screen.',
    content:
      'The location label is completely optional and exists solely as a friendly display name for your own reference on your screen (for example: "Portland, Oregon"). It is not parsed by astronomical engines, does not affect chart calculations, and is never used for geocoding. Astronomical chart positions are calculated from the separate numeric coordinates you provide, meaning this text label is purely cosmetic and for your personal convenience.',
    bulletPoints: [
      'Optional display name for your personal reference.',
      'Has no effect on astronomical chart calculations.',
      'Coordinates—not this text label—are used to calculate sky positions.',
      'Can be left completely blank if you prefer.',
    ],
    accessibilityLabel: 'Explanation of the display-only nature of the location label',
  },
  'broad-city-region': {
    id: 'broad-city-region',
    title: 'Use a Broad City or Region',
    summary:
      'A general city, town, metropolitan area, or region name is ideal.',
    content:
      'When choosing a label, a general city, town, or metropolitan area is best (for example: "Denver, Colorado", "South London", or "Kyoto"). You can also use broad regional or country descriptions. Keeping the description general provides clear personal context when viewing your chart while avoiding unnecessary personal specificity.',
    bulletPoints: [
      'General city or metropolitan names are recommended (e.g. "Seattle, WA").',
      'Broad geographic regions or provinces work well.',
      'Keeps your profile concise and easy to recognize.',
      'Maximum length is 120 characters.',
    ],
    accessibilityLabel: 'Guidance on choosing a broad city or regional label',
  },
  'avoid-street-addresses': {
    id: 'avoid-street-addresses',
    title: 'Avoid Street Addresses & Residences',
    summary:
      'Do not enter street names, building numbers, apartment numbers, or postal codes.',
    content:
      'To protect your personal physical privacy, never enter specific residential or institutional address details into the location label field. Avoid street names, house numbers, apartment or unit numbers, hospital building names, or postal codes. Astrological calculations operate on regional celestial geometry; exact street addresses provide no astronomical benefit and expose unnecessary private information.',
    bulletPoints: [
      'Do not enter street names, house numbers, or apartment numbers.',
      'Avoid specific hospital names, clinics, or private residences.',
      'Omit zip codes or postal codes.',
      'Astrological calculations never require street-level precision.',
    ],
    accessibilityLabel: 'Privacy guidance to avoid street addresses and exact residences',
  },
  'local-storage-only': {
    id: 'local-storage-only',
    title: 'Stored Locally on Your Device',
    summary:
      'After a successful calculation, the location label is saved with the local profile on this device.',
    content:
      'If you enter a location label and successfully calculate a chart, the label is stored with the local birth profile on this device. The label is excluded from the chart and reflection request payloads. Deleting local astrology data removes the saved label together with the profile and chart bundle.',
    bulletPoints: [
      'Saved locally only after a chart calculation succeeds.',
      'Excluded from chart and reflection request payloads.',
      'Removed when you delete local astrology data.',
      'Current unsaved form text remains on screen until you leave or calculate.',
    ],
    accessibilityLabel: 'Local device storage policy for the location label',
  },
  'excluded-from-requests': {
    id: 'excluded-from-requests',
    title: 'Excluded From Network Requests',
    summary:
      'The location label is never sent in network requests to calculation or reflection services.',
    content:
      'When you request a chart calculation or an optional symbolic AI reflection, the location label is excluded from the request payload sent to server endpoints. Numeric coordinates, birth date, optional time, and timezone are transmitted for chart calculation, while the calculated chart summary is sent for reflection generation. The location label remains in local app storage.',
    bulletPoints: [
      'Never transmitted in chart calculation request payloads.',
      'Never included in AI reflection generation requests.',
      'Only numeric coordinates and birth parameters leave your device.',
      'Raw dream journal text and reflections remain completely separate.',
    ],
    accessibilityLabel: 'Explanation that the location label is excluded from network requests',
  },
};

export const LOCATION_LABEL_HELP_SECTION_IDS: readonly LocationLabelHelpSectionId[] = [
  'display-only',
  'broad-city-region',
  'avoid-street-addresses',
  'local-storage-only',
  'excluded-from-requests',
] as const;

export const ASTROLOGY_LOCATION_LABEL_HELP: AstrologyLocationLabelHelpBundle = {
  title: 'Location Label Guidance',
  subtitle: 'Understanding the optional, display-only birth location label',
  privacyGuarantee:
    'The location label is for your display only, stored locally, and never included in chart or reflection requests.',
  maxLength: MAX_LOCATION_LABEL_LENGTH,
  sections: LOCATION_LABEL_HELP_SECTION_IDS.map((id) => LOCATION_LABEL_HELP_SECTIONS[id]),
  recommendedExamples: [...LOCATION_LABEL_RECOMMENDED_EXAMPLES],
  discouragedExamples: [...LOCATION_LABEL_DISCOURAGED_EXAMPLES],
};

/**
 * Retrieve help copy for a specific location label guidance section.
 */
export function getLocationLabelHelpSection(
  id: LocationLabelHelpSectionId,
): LocationLabelHelpSection {
  return LOCATION_LABEL_HELP_SECTIONS[id];
}

/**
 * Retrieve all location label guidance sections in recommended display order.
 */
export function getAllLocationLabelHelpSections(): LocationLabelHelpSection[] {
  return LOCATION_LABEL_HELP_SECTION_IDS.map((id) => LOCATION_LABEL_HELP_SECTIONS[id]);
}

/**
 * Heuristic detector for overly specific residential or street address indicators.
 */
export function containsDetailedAddressIndicators(label: string): boolean {
  if (!label || typeof label !== 'string') return false;
  const normalized = label.toLowerCase();

  // Street address keywords
  const addressKeywords = [
    /\b(street|st\.|st\b|avenue|ave\.|ave\b|boulevard|blvd\.|blvd\b|road|rd\.|rd\b)\b/,
    /\b(drive|dr\.|dr\b|lane|ln\.|ln\b|way|court|ct\.|ct\b|circle|cir\.)\b/,
    /\b(apartment|apt\.|apt\b|suite|ste\.|ste\b|unit|room|rm\.)\b/,
    /\b(hospital|clinic|ward|center|ctr\.)\b/,
    /#\s*\d+/,
    /^\d+\s+[a-z]+/i, // E.g. "123 Elm"
  ];

  return addressKeywords.some((pattern) => pattern.test(normalized));
}

/**
 * Validate a proposed location label string against length and structure guidelines.
 */
export function validateLocationLabel(
  label?: unknown,
): { isValid: boolean; errorMessage?: string; warningMessage?: string } {
  if (label == null || label === '') {
    return { isValid: true }; // Omission is completely valid
  }

  if (typeof label !== 'string') {
    return { isValid: false, errorMessage: 'Location label must be a text string.' };
  }

  const trimmed = label.trim();

  if (trimmed.length > MAX_LOCATION_LABEL_LENGTH) {
    return {
      isValid: false,
      errorMessage: `Location label must be ${MAX_LOCATION_LABEL_LENGTH} characters or fewer.`,
    };
  }

  if (containsDetailedAddressIndicators(trimmed)) {
    return {
      isValid: true,
      warningMessage:
        'To protect your privacy, avoid entering street names, house numbers, or specific addresses.',
    };
  }

  return { isValid: true };
}

/**
 * Explains any location label validation issue or privacy recommendation in user-facing language.
 */
export function explainLocationLabelIssue(label?: unknown): string | null {
  if (label == null || label === '') {
    return null;
  }

  const result = validateLocationLabel(label);
  if (!result.isValid) {
    return result.errorMessage ?? null;
  }
  if (result.warningMessage) {
    return result.warningMessage;
  }
  return null;
}

/**
 * Retrieve the summary privacy statement for the location label.
 */
export function getLocationLabelPrivacyStatement(): string {
  return (
    LOCATION_LABEL_HELP_SECTIONS['excluded-from-requests']?.summary ??
    ASTROLOGY_LOCATION_LABEL_HELP.privacyGuarantee
  );
}

/**
 * Type guard verifying whether a value is a recognized LocationLabelHelpSectionId.
 */
export function isRecognizedLocationLabelHelpSectionId(
  value: unknown,
): value is LocationLabelHelpSectionId {
  return (
    typeof value === 'string' &&
    LOCATION_LABEL_HELP_SECTION_IDS.includes(value as LocationLabelHelpSectionId)
  );
}
