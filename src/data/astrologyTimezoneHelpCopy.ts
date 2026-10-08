/**
 * Astrology Timezone Guidance & Help Copy
 *
 * A typed, content-only dataset of user-facing educational guidance explaining:
 * 1. What IANA timezone identifiers are (e.g. Area/Location such as Continent/City).
 * 2. Valid examples including Asia/Kolkata, America/New_York, Europe/London.
 * 3. Why country names (such as "India" or "USA") and abbreviations (such as "IST" or "EST") are rejected.
 * 4. Why entering a timezone without a birth time is disallowed (timezone-without-time behavior).
 * 5. Historical Daylight Saving Time (DST) and regional clock transition uncertainty.
 *
 * Framing is non-predictive, non-diagnostic, and privacy-first.
 */

export type TimezoneHelpSectionId =
  | 'what-is-iana'
  | 'valid-examples'
  | 'why-countries-rejected'
  | 'timezone-without-time'
  | 'historical-dst-uncertainty';

export interface TimezoneExample {
  /** Stable identifier */
  id: string;
  /** Canonical IANA timezone identifier */
  identifier: string;
  /** Country or geographic territory */
  region: string;
  /** Representative city */
  city: string;
  /** Representative UTC offsets; historical values may differ */
  offsetExamples: string;
  /** Context notes */
  notes: string;
}

export interface TimezoneRejectedExample {
  /** Common invalid input attempted by users */
  input: string;
  /** Explanation of why this input is rejected */
  reason: string;
  /** Suggested canonical IANA alternative */
  suggestedAlternative: string;
}

export interface TimezoneHelpSection {
  /** Unique section identifier */
  id: TimezoneHelpSectionId;
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

export interface AstrologyTimezoneHelpBundle {
  /** Panel title */
  title: string;
  /** Panel subtitle */
  subtitle: string;
  /** High-level guidance note */
  guidanceNote: string;
  /** Ordered list of guidance sections */
  sections: TimezoneHelpSection[];
  /** Representative valid examples */
  examples: TimezoneExample[];
  /** Common rejected inputs and their alternatives */
  rejectedExamples: TimezoneRejectedExample[];
}

export const TIMEZONE_EXAMPLES: readonly TimezoneExample[] = [
  {
    id: 'kolkata',
    identifier: 'Asia/Kolkata',
    region: 'India',
    city: 'Kolkata (Calcutta)',
    offsetExamples: 'UTC+05:30',
    notes: 'Canonical identifier for all of India Standard Time.',
  },
  {
    id: 'new-york',
    identifier: 'America/New_York',
    region: 'United States',
    city: 'New York City',
    offsetExamples: 'UTC-05:00 (EST) / UTC-04:00 (EDT)',
    notes: 'Covers Eastern Time with historical daylight saving shifts.',
  },
  {
    id: 'chicago',
    identifier: 'America/Chicago',
    region: 'United States',
    city: 'Chicago',
    offsetExamples: 'UTC-06:00 (CST) / UTC-05:00 (CDT)',
    notes: 'Covers Central Time with historical daylight saving shifts.',
  },
  {
    id: 'los-angeles',
    identifier: 'America/Los_Angeles',
    region: 'United States',
    city: 'Los Angeles',
    offsetExamples: 'UTC-08:00 (PST) / UTC-07:00 (PDT)',
    notes: 'Covers Pacific Time with historical daylight saving shifts.',
  },
  {
    id: 'london',
    identifier: 'Europe/London',
    region: 'United Kingdom',
    city: 'London',
    offsetExamples: 'UTC+00:00 (GMT) / UTC+01:00 (BST)',
    notes: 'Covers British Summer Time and Greenwich Mean Time history.',
  },
  {
    id: 'tokyo',
    identifier: 'Asia/Tokyo',
    region: 'Japan',
    city: 'Tokyo',
    offsetExamples: 'UTC+09:00 (JST)',
    notes: 'Canonical identifier for Japan Standard Time.',
  },
  {
    id: 'sydney',
    identifier: 'Australia/Sydney',
    region: 'Australia',
    city: 'Sydney',
    offsetExamples: 'UTC+10:00 (AEST) / UTC+11:00 (AEDT)',
    notes: 'Covers New South Wales and southeastern Australia.',
  },
  {
    id: 'utc',
    identifier: 'UTC',
    region: 'Universal',
    city: 'Coordinated Universal Time',
    offsetExamples: 'UTC+00:00',
    notes: 'Universal reference time with zero daylight saving adjustments.',
  },
] as const;

export const TIMEZONE_REJECTED_EXAMPLES: readonly TimezoneRejectedExample[] = [
  {
    input: 'India',
    reason: 'Country name rather than an IANA location identifier.',
    suggestedAlternative: 'Asia/Kolkata',
  },
  {
    input: 'USA / United States',
    reason: 'Countries spanning multiple time zones cannot be represented by a country name.',
    suggestedAlternative: 'America/New_York, America/Chicago, America/Denver, or America/Los_Angeles',
  },
  {
    input: 'IST',
    reason: 'Ambiguous abbreviation (could refer to India, Ireland, or Israel Standard Time) and lacks historical calendar rules.',
    suggestedAlternative: 'Asia/Kolkata or Europe/Dublin',
  },
  {
    input: 'EST / EDT',
    reason: 'Three-letter daylight abbreviations change seasonally and do not capture regional municipal history.',
    suggestedAlternative: 'America/New_York',
  },
  {
    input: 'PST / PDT',
    reason: 'Seasonal abbreviations do not indicate specific historical local government clock rules.',
    suggestedAlternative: 'America/Los_Angeles',
  },
  {
    input: 'GMT',
    reason: 'While sometimes accepted as an offset, Europe/London captures historical British daylight saving laws.',
    suggestedAlternative: 'Europe/London or UTC',
  },
] as const;

export const TIMEZONE_HELP_SECTIONS: Record<
  TimezoneHelpSectionId,
  TimezoneHelpSection
> = {
  'what-is-iana': {
    id: 'what-is-iana',
    title: 'What Is an IANA Timezone Identifier?',
    summary:
      'IANA identifiers represent geographic regions and the historical clock rules available in the time zone database.',
    content:
      'The Internet Assigned Numbers Authority (IANA) Time Zone Database provides standardized names usually structured as "Area/Location" (for example, Asia/Kolkata or America/New_York). Unlike a static numeric offset (such as +5:30 or -5:00), an IANA identifier lets calculation software apply the regional clock and daylight-saving rules represented in the database for a given date.',
    bulletPoints: [
      'Structured as Area/Location (e.g. Continent/City).',
      'Encapsulates historical daylight saving time (DST) shifts for past years.',
      'Recognized by modern astronomical calculation engines and web standards.',
      'Provides more historical context than a country name or fixed offset.',
    ],
    accessibilityLabel: 'Explanation of what an IANA timezone identifier is',
  },
  'valid-examples': {
    id: 'valid-examples',
    title: 'Valid Timezone Formats & Examples',
    summary:
      'Enter the standard identifier for your birth region, such as Asia/Kolkata or America/New_York.',
    content:
      'Valid identifiers typically begin with a continent name followed by a forward slash and a major regional city (for example: Asia/Kolkata, America/New_York, Europe/London, Australia/Sydney). For locations in the United States, use the major city representing your time zone (such as America/New_York for Eastern, America/Chicago for Central, America/Denver for Mountain, or America/Los_Angeles for Pacific).',
    bulletPoints: [
      'Use the standard Continent/City format (e.g. Asia/Kolkata).',
      'Use an underscore for multi-word city names (e.g. America/New_York, America/Los_Angeles).',
      'Case-sensitive in standard systems; capitalize the continent and city appropriately.',
      'UTC is accepted if your recorded birth time is already in universal time.',
    ],
    accessibilityLabel: 'Valid timezone examples and format instructions',
  },
  'why-countries-rejected': {
    id: 'why-countries-rejected',
    title: 'Why Country Names & Abbreviations Are Rejected',
    summary:
      'Country names like "India" and abbreviations like "EST" or "IST" cannot uniquely determine historical clock rules.',
    content:
      'Country names (such as "India", "USA", "Canada", or "Australia") are rejected because national borders do not map 1:1 to timezone definitions, and many nations span several time zones. Furthermore, three-letter abbreviations (such as "IST" or "CST") are ambiguous—IST can stand for India Standard Time, Irish Standard Time, or Israel Standard Time. Abbreviations also fail to define whether daylight saving time was active on a specific historical date in that locality. The calculation engine therefore strictly requires an IANA identifier.',
    bulletPoints: [
      'Country names like "India" are not recognized timezone identifiers; enter "Asia/Kolkata".',
      'Three-letter abbreviations like "IST" or "EST" are ambiguous across different countries.',
      'Abbreviations do not specify historical daylight saving rules for the birth year.',
      'The calculation provider strictly requires canonical IANA identifiers.',
    ],
    accessibilityLabel: 'Why country names and abbreviations are rejected',
  },
  'timezone-without-time': {
    id: 'timezone-without-time',
    title: 'Timezone Without Birth Time',
    summary:
      'A timezone can only be supplied when a birth hour and minute are also provided.',
    content:
      'A timezone converts a supplied local clock time (such as 14:30) into universal time. If you do not provide a birth time, the chart uses date-only precision and does not use a timezone. Depending on the calculation provider, time-dependent placements may be omitted or marked approximate. Supplying a timezone without a time would create an inconsistent input, so the form requires leaving timezone blank unless a birth time is entered.',
    bulletPoints: [
      'Timezones convert local clock time to universal time (UTC).',
      'Without a birth time, charts operate with date-only precision.',
      'Time-dependent placements may be omitted or approximate when birth time is unavailable.',
      'Leave timezone blank if you do not know or choose not to enter a birth time.',
    ],
    accessibilityLabel: 'Explanation of why timezones require a birth time',
  },
  'historical-dst-uncertainty': {
    id: 'historical-dst-uncertainty',
    title: 'Historical DST & Offset Uncertainty',
    summary:
      'Historical local ordinances, wartime shifts, and boundary adjustments carry natural calculation uncertainty.',
    content:
      'Throughout the 20th century, daylight saving laws, wartime double-summer time, and regional boundary changes were frequently adopted, modified, or repealed by municipal and regional governments with varying levels of official documentation. While the IANA Time Zone Database contains extensive historical research, births occurring near seasonal transition dates or in historical eras before synchronized timekeeping carry inherent offset uncertainty. As with all astrological calculations, results should be approached as symbolic reflective perspectives rather than absolute factual certainties.',
    bulletPoints: [
      'Daylight saving transitions have varied historically by city and county.',
      'Births near clock transition dates carry small potential degree shifts.',
      'When exact historical offset is uncertain, house cusps and angles may vary slightly.',
      'Placements remain symbolic contemplative metaphors for reflection, not predictive facts.',
    ],
    accessibilityLabel: 'Historical daylight saving time and offset uncertainty guidance',
  },
};

export const TIMEZONE_HELP_SECTION_IDS: readonly TimezoneHelpSectionId[] = [
  'what-is-iana',
  'valid-examples',
  'why-countries-rejected',
  'timezone-without-time',
  'historical-dst-uncertainty',
] as const;

export const ASTROLOGY_TIMEZONE_HELP: AstrologyTimezoneHelpBundle = {
  title: 'Birth Timezone Help',
  subtitle: 'Understanding IANA timezone identifiers and historical clock precision',
  guidanceNote:
    'Timezones are optional and only needed when a birth time is provided. Use canonical identifiers like Asia/Kolkata or America/New_York.',
  sections: TIMEZONE_HELP_SECTION_IDS.map((id) => TIMEZONE_HELP_SECTIONS[id]),
  examples: [...TIMEZONE_EXAMPLES],
  rejectedExamples: [...TIMEZONE_REJECTED_EXAMPLES],
};

/**
 * Retrieve help copy for a specific timezone guidance section.
 */
export function getTimezoneHelpSection(
  id: TimezoneHelpSectionId,
): TimezoneHelpSection {
  return TIMEZONE_HELP_SECTIONS[id];
}

/**
 * Retrieve all timezone guidance sections in recommended display order.
 */
export function getAllTimezoneHelpSections(): TimezoneHelpSection[] {
  return TIMEZONE_HELP_SECTION_IDS.map((id) => TIMEZONE_HELP_SECTIONS[id]);
}

/**
 * Validates whether a given value is a syntactically recognized IANA timezone identifier.
 */
export function isValidIanaTimezone(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed || (trimmed !== 'UTC' && !trimmed.includes('/'))) return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: trimmed });
    return true;
  } catch {
    return false;
  }
}

/**
 * Suggests a canonical IANA alternative for commonly mis-entered country names or abbreviations.
 */
export function suggestAlternativeForCommonInput(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const normalized = input.trim().toLowerCase();

  const map: Record<string, string> = {
    india: 'Asia/Kolkata',
    ist: 'Asia/Kolkata, Europe/Dublin, or Asia/Jerusalem',
    usa: 'America/New_York, America/Chicago, America/Denver, or America/Los_Angeles',
    'united states': 'America/New_York, America/Chicago, America/Denver, or America/Los_Angeles',
    est: 'America/New_York',
    edt: 'America/New_York',
    cst: 'America/Chicago',
    cdt: 'America/Chicago',
    mst: 'America/Denver',
    mdt: 'America/Denver',
    pst: 'America/Los_Angeles',
    pdt: 'America/Los_Angeles',
    uk: 'Europe/London',
    england: 'Europe/London',
    london: 'Europe/London',
    gmt: 'Europe/London or UTC',
    bst: 'Europe/London',
    japan: 'Asia/Tokyo',
    tokyo: 'Asia/Tokyo',
    jst: 'Asia/Tokyo',
    australia: 'Australia/Sydney, Australia/Melbourne, or Australia/Perth',
    sydney: 'Australia/Sydney',
    aest: 'Australia/Sydney',
    france: 'Europe/Paris',
    paris: 'Europe/Paris',
    cet: 'Europe/Paris',
    germany: 'Europe/Berlin',
    berlin: 'Europe/Berlin',
    brazil: 'America/Sao_Paulo',
    'sao paulo': 'America/Sao_Paulo',
  };

  return map[normalized] ?? null;
}

/**
 * Produces a clear, accessible explanation of any validation issue with the entered timezone.
 */
export function explainTimezoneIssue(
  timezone: string | undefined,
  hasBirthTime: boolean,
): string | null {
  if (!timezone || !timezone.trim()) {
    return null;
  }

  const trimmed = timezone.trim();

  if (!hasBirthTime) {
    return 'A timezone can only be used when a birth time is provided. Without a birth time, leave timezone blank.';
  }

  if (!isValidIanaTimezone(trimmed)) {
    const suggestion = suggestAlternativeForCommonInput(trimmed);
    if (suggestion) {
      return `"${trimmed}" is not a recognized IANA timezone identifier. Try using "${suggestion}".`;
    }
    return `"${trimmed}" is not a recognized IANA timezone. Enter an Area/Location identifier like "America/New_York" or "Asia/Kolkata".`;
  }

  return null;
}

/**
 * Type guard verifying whether a value is a recognized TimezoneHelpSectionId.
 */
export function isRecognizedTimezoneHelpSectionId(
  value: unknown,
): value is TimezoneHelpSectionId {
  return (
    typeof value === 'string' &&
    TIMEZONE_HELP_SECTION_IDS.includes(value as TimezoneHelpSectionId)
  );
}
