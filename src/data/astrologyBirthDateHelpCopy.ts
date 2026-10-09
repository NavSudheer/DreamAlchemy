/**
 * Astrology Birth Date Guidance & Help Copy
 *
 * A typed, content-only dataset of user-facing educational guidance explaining:
 * 1. Required YYYY-MM-DD birth-date format and ISO representation.
 * 2. Valid calendar dates, month length constraints, leap years, and historical ephemeris bounds (1800+).
 * 3. Future-date rejection and non-predictive design boundaries.
 * 4. Why full names and personal identifiers are unnecessary for astronomical calculation (privacy first).
 *
 * Framing is non-predictive, non-diagnostic, and privacy-preserving.
 */

export type BirthDateHelpSectionId =
  | 'required-format'
  | 'calendar-leap-dates'
  | 'future-date-rejection'
  | 'no-names-privacy';

export interface BirthDateFormatExample {
  /** Stable identifier */
  id: string;
  /** Natural-language date description */
  formatDescription: string;
  /** Canonical YYYY-MM-DD representation */
  exampleValue: string;
  /** Numeric year */
  year: number;
  /** Numeric month (1-12) */
  month: number;
  /** Numeric day (1-31) */
  day: number;
  /** Guidance notes */
  notes: string;
}

export interface BirthDateHelpSection {
  /** Unique section identifier */
  id: BirthDateHelpSectionId;
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

export interface AstrologyBirthDateHelpBundle {
  /** Panel title */
  title: string;
  /** Panel subtitle */
  subtitle: string;
  /** High-level guidance note */
  guidanceNote: string;
  /** Ordered list of guidance sections */
  sections: BirthDateHelpSection[];
  /** Representative format examples */
  formatExamples: BirthDateFormatExample[];
}

export const BIRTH_DATE_FORMAT_EXAMPLES: readonly BirthDateFormatExample[] = [
  {
    id: 'spring',
    formatDescription: 'April 12, 1995',
    exampleValue: '1995-04-12',
    year: 1995,
    month: 4,
    day: 12,
    notes: 'Standard four-digit year, two-digit month, and two-digit day.',
  },
  {
    id: 'single-digit-month',
    formatDescription: 'March 5, 1988',
    exampleValue: '1988-03-05',
    year: 1988,
    month: 3,
    day: 5,
    notes: 'Single-digit month and day padded with leading zeroes (03 and 05).',
  },
  {
    id: 'leap-year',
    formatDescription: 'February 29, 2000 (Leap Year)',
    exampleValue: '2000-02-29',
    year: 2000,
    month: 2,
    day: 29,
    notes: 'Valid leap day accepted in leap years.',
  },
  {
    id: 'end-of-year',
    formatDescription: 'December 31, 2003',
    exampleValue: '2003-12-31',
    year: 2003,
    month: 12,
    day: 31,
    notes: 'Months with 31 days accept days up to 31.',
  },
] as const;

export const BIRTH_DATE_HELP_SECTIONS: Record<
  BirthDateHelpSectionId,
  BirthDateHelpSection
> = {
  'required-format': {
    id: 'required-format',
    title: 'Required Date Format (YYYY-MM-DD)',
    summary:
      'Birth date is required in four-digit year, two-digit month, and two-digit day format.',
    content:
      'A birth date is the fundamental input required for astronomical chart calculations. Enter your date using the standard ISO format YYYY-MM-DD (such as 1995-04-12). The year must be four digits, the month must be two digits from 01 to 12, and the day must be two digits from 01 to 31. Single-digit months and days must include a leading zero (for example, March 5th is entered as 1998-03-05, not 1998-3-5).',
    bulletPoints: [
      'Format: YYYY-MM-DD (e.g. 1995-04-12).',
      'Requires four-digit year, two-digit month, and two-digit day.',
      'Pad single-digit months and days with leading zeroes (e.g. 03 for March, 05 for the 5th).',
      'Birth date is the only mandatory input required for chart calculation.',
    ],
    accessibilityLabel: 'Instructions for required YYYY-MM-DD birth-date format',
  },
  'calendar-leap-dates': {
    id: 'calendar-leap-dates',
    title: 'Valid Calendar & Leap Dates',
    summary:
      'Dates must exist on the Gregorian calendar, including correct month lengths and leap years.',
    content:
      'Entered dates must represent real days on the calendar. Months with 30 days (April, June, September, November) cannot accept day 31, and February accepts up to 28 days in common years or 29 days in leap years (such as 2000, 2004, 2020, or 2024). The current calculation route accepts dates from 1800 through today; earlier dates are outside this feature’s supported range.',
    bulletPoints: [
      'Must be a genuine date on the calendar (e.g. April 31 is invalid).',
      'February 29 is accepted only in valid leap years.',
      'The current chart route supports birth years from 1800 onward.',
      'Prevents calculation errors by rejecting impossible calendar combinations.',
    ],
    accessibilityLabel: 'Calendar validity, leap year rules, and supported year boundaries',
  },
  'future-date-rejection': {
    id: 'future-date-rejection',
    title: 'Future Date Rejection',
    summary:
      'Birth dates cannot be in the future relative to today\'s date.',
    content:
      'A birth chart calculates the positions of celestial bodies at the moment a person was born. Future dates are rejected because they represent events that have not occurred. DreamAlchemy is designed for personal self-reflection on past and present experiences, not for predicting future outcomes or charting hypothetical dates.',
    bulletPoints: [
      'Birth date cannot be set after today\'s date.',
      'Ensures charts reflect existing astronomical events rather than hypothetical projections.',
      'Reinforces non-predictive design: DreamAlchemy does not make future forecasts.',
      'Check that the year was entered correctly if you encounter a future-date notice.',
    ],
    accessibilityLabel: 'Explanation of why future dates are rejected',
  },
  'no-names-privacy': {
    id: 'no-names-privacy',
    title: 'Why Full Names Are Unnecessary',
    summary:
      'No names or identifiers are needed; calculations depend strictly on celestial mechanics.',
    content:
      'DreamAlchemy does not request a legal name or identity documents for astrology. Chart calculations use the entered date, optional time and timezone, and coordinates; a person’s name is not needed for that calculation. Omitting name fields reduces the identifying information associated with astrology requests. Dream journal text and personal reflection notes remain separate and are not included in those requests.',
    bulletPoints: [
      'Full names and identity documents are not requested for astrology.',
      'Planetary calculations depend purely on celestial positions, not personal names.',
      'Protects your identity by keeping personal profile data to the absolute minimum.',
      'Dream journal entries and personal reflections are not included in astrology requests.',
    ],
    accessibilityLabel: 'Privacy policy explaining why names are never requested',
  },
};

export const BIRTH_DATE_HELP_SECTION_IDS: readonly BirthDateHelpSectionId[] = [
  'required-format',
  'calendar-leap-dates',
  'future-date-rejection',
  'no-names-privacy',
] as const;

export const ASTROLOGY_BIRTH_DATE_HELP: AstrologyBirthDateHelpBundle = {
  title: 'Birth Date Guidance',
  subtitle: 'Understanding required YYYY-MM-DD format, calendar validity, and privacy',
  guidanceNote:
    'Birth date is the only mandatory input. No names or personal identifiers are needed or collected.',
  sections: BIRTH_DATE_HELP_SECTION_IDS.map((id) => BIRTH_DATE_HELP_SECTIONS[id]),
  formatExamples: [...BIRTH_DATE_FORMAT_EXAMPLES],
};

/**
 * Retrieve help copy for a specific birth-date guidance section.
 */
export function getBirthDateHelpSection(
  id: BirthDateHelpSectionId,
): BirthDateHelpSection {
  return BIRTH_DATE_HELP_SECTIONS[id];
}

/**
 * Retrieve all birth-date guidance sections in recommended display order.
 */
export function getAllBirthDateHelpSections(): BirthDateHelpSection[] {
  return BIRTH_DATE_HELP_SECTION_IDS.map((id) => BIRTH_DATE_HELP_SECTIONS[id]);
}

/**
 * Determine whether a year is a leap year on the Gregorian calendar.
 */
export function isLeapYear(year: number): boolean {
  if (!Number.isInteger(year) || year < 1) return false;
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the maximum number of days in a given month for a given year.
 */
export function getDaysInMonth(year: number, month: number): number {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return 0;
  }
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/**
 * Validate whether a string strictly matches the YYYY-MM-DD notation.
 */
export function isValidBirthDateFormat(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

/**
 * Parse a YYYY-MM-DD string into numeric components, or null if malformed.
 */
export function parseDateString(
  dateStr: string,
): { year: number; month: number; day: number } | null {
  if (!isValidBirthDateFormat(dateStr)) {
    return null;
  }
  const [yearStr, monthStr, dayStr] = dateStr.trim().split('-');
  return {
    year: parseInt(yearStr, 10),
    month: parseInt(monthStr, 10),
    day: parseInt(dayStr, 10),
  };
}

/**
 * Format numeric year, month, and day into YYYY-MM-DD notation.
 */
export function formatBirthDate(
  year: number,
  month: number,
  day: number,
): string | null {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getDaysInMonth(year, month)
  ) {
    return null;
  }
  return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

/**
 * Comprehensive validation of birth date components against calendar rules and future-date restrictions.
 */
export function validateBirthDateValues(
  year: number,
  month: number,
  day: number,
  referenceDate: Date = new Date(),
): { isValid: boolean; errorIssue?: 'invalid_date' | 'future_date'; errorMessage?: string } {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return {
      isValid: false,
      errorIssue: 'invalid_date',
      errorMessage: 'Birth date must consist of valid integer numbers.',
    };
  }

  if (year < 1800 || year > 9999 || month < 1 || month > 12 || day < 1) {
    return {
      isValid: false,
      errorIssue: 'invalid_date',
      errorMessage: 'Enter a valid birth date with a four-digit year (1800 or later).',
    };
  }

  const maxDays = getDaysInMonth(year, month);
  if (day > maxDays) {
    if (month === 2 && day === 29) {
      return {
        isValid: false,
        errorIssue: 'invalid_date',
        errorMessage: `${year} is not a leap year. February has only 28 days in ${year}.`,
      };
    }
    return {
      isValid: false,
      errorIssue: 'invalid_date',
      errorMessage: `Month ${month} has only ${maxDays} days. Day ${day} is not a valid date.`,
    };
  }

  const birthDateValue = new Date(Date.UTC(year, month - 1, day));
  const todayValue = new Date(
    Date.UTC(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      referenceDate.getUTCDate(),
    ),
  );

  if (birthDateValue > todayValue) {
    return {
      isValid: false,
      errorIssue: 'future_date',
      errorMessage: 'Birth date cannot be in the future.',
    };
  }

  return { isValid: true };
}

/**
 * Explains any birth-date issue in clear, user-facing language.
 */
export function explainBirthDateIssue(
  dateInput?: unknown,
  referenceDate: Date = new Date(),
): string | null {
  if (dateInput == null || dateInput === '') {
    return 'Birth date is required. Enter your birth date in YYYY-MM-DD format.';
  }

  if (typeof dateInput === 'string') {
    const parsed = parseDateString(dateInput);
    if (!parsed) {
      return 'Enter your birth date using the YYYY-MM-DD format (for example: 1995-04-12).';
    }
    const result = validateBirthDateValues(
      parsed.year,
      parsed.month,
      parsed.day,
      referenceDate,
    );
    return result.errorMessage ?? null;
  }

  if (typeof dateInput === 'object' && dateInput !== null) {
    const { year, month, day } = dateInput as {
      year?: unknown;
      month?: unknown;
      day?: unknown;
    };
    if (year == null || month == null || day == null) {
      return 'Enter a complete birth date with year, month, and day.';
    }
    const result = validateBirthDateValues(
      Number(year),
      Number(month),
      Number(day),
      referenceDate,
    );
    return result.errorMessage ?? null;
  }

  return 'Enter a valid birth date.';
}

/**
 * Type guard verifying whether a value is a recognized BirthDateHelpSectionId.
 */
export function isRecognizedBirthDateHelpSectionId(
  value: unknown,
): value is BirthDateHelpSectionId {
  return (
    typeof value === 'string' &&
    BIRTH_DATE_HELP_SECTION_IDS.includes(value as BirthDateHelpSectionId)
  );
}
