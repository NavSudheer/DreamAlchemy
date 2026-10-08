/**
 * Astrology Birth Time Guidance & Help Copy
 *
 * A typed, content-only dataset of user-facing educational guidance explaining:
 * 1. Why birth time is completely optional in DreamAlchemy.
 * 2. Accepted 24-hour HH:mm time format and conversion from 12-hour AM/PM clocks.
 * 3. Unknown-time / date-only mode: what remains stable vs. what is withheld or approximate.
 * 4. Recorded-time rounding, clock drift on official records, and boundary effects.
 * 5. Why dreamers should avoid guessing an unrecorded birth time.
 *
 * Framing is non-predictive, non-diagnostic, and privacy-first.
 */

export type BirthTimeHelpSectionId =
  | 'optional-birth-time'
  | 'format-24-hour'
  | 'date-only-mode'
  | 'recorded-rounding'
  | 'avoid-guessing';

export interface BirthTimeFormatExample {
  /** Stable identifier */
  id: string;
  /** Conventional 12-hour clock label */
  twelveHourTime: string;
  /** Canonical 24-hour HH:mm string */
  twentyFourHourTime: string;
  /** Explanatory notes */
  notes: string;
}

export interface BirthTimeHelpSection {
  /** Unique section identifier */
  id: BirthTimeHelpSectionId;
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

export interface AstrologyBirthTimeHelpBundle {
  /** Panel title */
  title: string;
  /** Panel subtitle */
  subtitle: string;
  /** High-level guidance note */
  guidanceNote: string;
  /** Ordered list of guidance sections */
  sections: BirthTimeHelpSection[];
  /** Representative format examples */
  formatExamples: BirthTimeFormatExample[];
}

export const BIRTH_TIME_FORMAT_EXAMPLES: readonly BirthTimeFormatExample[] = [
  {
    id: 'midnight',
    twelveHourTime: '12:00 AM (midnight)',
    twentyFourHourTime: '00:00',
    notes: 'The start of the calendar day uses 00 for the hour.',
  },
  {
    id: 'morning',
    twelveHourTime: '07:15 AM (morning)',
    twentyFourHourTime: '07:15',
    notes: 'Single-digit morning hours require a leading zero.',
  },
  {
    id: 'noon',
    twelveHourTime: '12:00 PM (noon)',
    twentyFourHourTime: '12:00',
    notes: 'Midday 12 PM uses 12:00.',
  },
  {
    id: 'afternoon',
    twelveHourTime: '02:30 PM (afternoon)',
    twentyFourHourTime: '14:30',
    notes: 'Add 12 hours for afternoon and evening times.',
  },
  {
    id: 'evening',
    twelveHourTime: '08:45 PM (evening)',
    twentyFourHourTime: '20:45',
    notes: '8 PM + 12 = 20:45.',
  },
  {
    id: 'night',
    twelveHourTime: '11:59 PM (night)',
    twentyFourHourTime: '23:59',
    notes: 'The final minute of the calendar day.',
  },
] as const;

export const BIRTH_TIME_HELP_SECTIONS: Record<
  BirthTimeHelpSectionId,
  BirthTimeHelpSection
> = {
  'optional-birth-time': {
    id: 'optional-birth-time',
    title: 'Why Birth Time Is Optional',
    summary:
      'Entering a birth time is optional; a birth date alone supports a lower-precision chart.',
    content:
      'Many people do not know their exact birth time or lack access to an official birth record. In DreamAlchemy, entering a birth time is never mandatory. A birth date alone lets the calculation provider return a date-only chart for reflective exploration, with time-sensitive fields omitted or marked approximate according to the provider.',
    bulletPoints: [
      'Birth time is completely optional in DreamAlchemy.',
      'A birth date alone supports date-only chart precision.',
      'No medical or birth certificate documents are required.',
      'You can calculate and reflect on your chart without entering a time.',
    ],
    accessibilityLabel: 'Why birth time is optional in chart calculation',
  },
  'format-24-hour': {
    id: 'format-24-hour',
    title: '24-Hour Time Format (HH:mm)',
    summary:
      'Use 24-hour military format (00:00 to 23:59) with two digits for hour and two digits for minute.',
    content:
      'When supplying a birth time, enter it using the 24-hour clock in HH:mm notation. Hours run from 00 (midnight) to 23 (11 PM), and minutes run from 00 to 59. Include a leading zero for single-digit hours (e.g. 09:15 rather than 9:15). If converting from a 12-hour clock, add 12 to PM hours from 1:00 PM through 11:59 PM (e.g. 2:30 PM becomes 14:30), while 12:00 PM remains 12:00 and 12:30 AM becomes 00:30.',
    bulletPoints: [
      'Format: HH:mm (e.g. 07:30 or 19:45).',
      'Hours range from 00 to 23; minutes range from 00 to 59.',
      'Pad single-digit hours with a leading zero (e.g. 04:15).',
      'Convert PM times by adding 12 (except 12 PM noon, which is 12:00).',
    ],
    accessibilityLabel: '24-hour time format instructions and conversion guidelines',
  },
  'date-only-mode': {
    id: 'date-only-mode',
    title: 'Date-Only Mode & Unknown Times',
    summary:
      'When birth time is omitted, the chart uses date-only precision and withholds time-dependent angles.',
    content:
      'If you leave the birth time blank, the calculation request uses date-only precision. Because local chart angles and house boundaries depend on time of day, the provider may omit them or mark them approximate. Planetary degrees—and signs near a boundary—can also vary across a calendar day, especially for the Moon. Review the precision note returned with the chart instead of assuming an exact time.',
    bulletPoints: [
      'Omitted birth time triggers date-only precision.',
      'Time-dependent angles and houses may be omitted or approximate.',
      'Degrees and placements near sign boundaries can vary during the date.',
      'The chart displays a precision note describing the calculation limits.',
    ],
    accessibilityLabel: 'Explanation of date-only precision when birth time is omitted',
  },
  'recorded-rounding': {
    id: 'recorded-rounding',
    title: 'Recorded-Time Rounding & Clock Drift',
    summary:
      'Recorded birth times may be rounded, which can shift time-sensitive chart boundaries.',
    content:
      'Even when an official record exists, its birth time may have been rounded to a nearby hour, half-hour, or 15-minute mark. A difference of several minutes can shift the calculated degree of the Ascendant or a house cusp. If a time-dependent placement sits near a boundary, treat the displayed result as sensitive to the recorded-time precision.',
    bulletPoints: [
      'Official or family records may contain rounded times.',
      'A difference of several minutes can alter a rising degree or house cusp position.',
      'Placements near sign or house borders may reflect minor clock drift.',
      'Treat chart angles as symbolic reflective thresholds rather than exact certainties.',
    ],
    accessibilityLabel: 'Recorded time rounding and clock drift guidance',
  },
  'avoid-guessing': {
    id: 'avoid-guessing',
    title: 'Why You Should Avoid Guessed Times',
    summary:
      'Leaving time blank is better than guessing, which introduces inaccurate rising signs and houses.',
    content:
      'If your birth time is unknown, leave the field blank rather than entering a placeholder such as noon or midnight. A guessed time can cause the calculation engine to return specific rising signs, chart angles, and house divisions based on that guess. Date-only mode communicates that the time is unknown and lets the provider mark time-sensitive results accordingly.',
    bulletPoints: [
      'Do not guess a time if your birth time is unrecorded or unknown.',
      'Guessing produces false precision for rising signs, Midheaven, and houses.',
      'Leaving time blank communicates date-only precision without inventing a time.',
      'Review the chart precision note when birth time is unavailable.',
    ],
    accessibilityLabel: 'Why guessing an unrecorded birth time should be avoided',
  },
};

export const BIRTH_TIME_HELP_SECTION_IDS: readonly BirthTimeHelpSectionId[] = [
  'optional-birth-time',
  'format-24-hour',
  'date-only-mode',
  'recorded-rounding',
  'avoid-guessing',
] as const;

export const ASTROLOGY_BIRTH_TIME_HELP: AstrologyBirthTimeHelpBundle = {
  title: 'Birth Time Guidance',
  subtitle: 'Understanding 24-hour format, optional times, and date-only charts',
  guidanceNote:
    'Birth time is completely optional. If unknown, leave it blank for an honest date-only chart rather than guessing.',
  sections: BIRTH_TIME_HELP_SECTION_IDS.map((id) => BIRTH_TIME_HELP_SECTIONS[id]),
  formatExamples: [...BIRTH_TIME_FORMAT_EXAMPLES],
};

/**
 * Retrieve help copy for a specific birth time guidance section.
 */
export function getBirthTimeHelpSection(
  id: BirthTimeHelpSectionId,
): BirthTimeHelpSection {
  return BIRTH_TIME_HELP_SECTIONS[id];
}

/**
 * Retrieve all birth time guidance sections in recommended display order.
 */
export function getAllBirthTimeHelpSections(): BirthTimeHelpSection[] {
  return BIRTH_TIME_HELP_SECTION_IDS.map((id) => BIRTH_TIME_HELP_SECTIONS[id]);
}

/**
 * Validates whether a given value matches the strict 24-hour HH:mm notation.
 */
export function isValidBirthTimeFormat(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value.trim());
}

/**
 * Parses an HH:mm string into numeric hour and minute components, or null if invalid.
 */
export function parseTimeString(
  timeStr: string,
): { hour: number; minute: number } | null {
  if (!isValidBirthTimeFormat(timeStr)) {
    return null;
  }
  const [hourStr, minuteStr] = timeStr.trim().split(':');
  return {
    hour: parseInt(hourStr, 10),
    minute: parseInt(minuteStr, 10),
  };
}

/**
 * Formats numeric hour and minute components into standard HH:mm notation.
 */
export function formatBirthTime(hour: number, minute: number): string | null {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23 || !Number.isInteger(minute) || minute < 0 || minute > 59) {
    return null;
  }
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * Converts 12-hour clock inputs to a 24-hour time object.
 */
export function convertTo24Hour(
  hour12: number,
  minute: number,
  isPm: boolean,
): { hour: number; minute: number } | null {
  if (
    typeof hour12 !== 'number' ||
    typeof minute !== 'number' ||
    !Number.isInteger(hour12) ||
    !Number.isInteger(minute) ||
    hour12 < 1 ||
    hour12 > 12 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  let hour24 = hour12;
  if (isPm) {
    hour24 = hour12 === 12 ? 12 : hour12 + 12;
  } else {
    hour24 = hour12 === 12 ? 0 : hour12;
  }

  return { hour: hour24, minute };
}

/**
 * Explains any partial or invalid birth-time input in accessible user-facing language.
 */
export function explainBirthTimeIssue(
  hour?: unknown,
  minute?: unknown,
): string | null {
  const hasHour = hour !== undefined && hour !== null && hour !== '';
  const hasMinute = minute !== undefined && minute !== null && minute !== '';

  if (!hasHour && !hasMinute) {
    return null; // Omitted is completely valid
  }

  if (hasHour !== hasMinute) {
    return 'Enter both an hour and minute, or leave birth time blank for a date-only chart.';
  }

  const numHour = Number(hour);
  const numMinute = Number(minute);

  if (
    !Number.isInteger(numHour) ||
    numHour < 0 ||
    numHour > 23 ||
    !Number.isInteger(numMinute) ||
    numMinute < 0 ||
    numMinute > 59
  ) {
    return 'Enter a valid 24-hour time (hours 00–23, minutes 00–59), or leave time blank.';
  }

  return null;
}

/**
 * Type guard verifying whether a value is a recognized BirthTimeHelpSectionId.
 */
export function isRecognizedBirthTimeHelpSectionId(
  value: unknown,
): value is BirthTimeHelpSectionId {
  return (
    typeof value === 'string' &&
    BIRTH_TIME_HELP_SECTION_IDS.includes(value as BirthTimeHelpSectionId)
  );
}
