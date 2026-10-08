import {
  ASTROLOGY_PROFILE_VERSION,
  BirthProfileDraft,
  BirthProfileValidationIssue,
  BirthProfileValidationResult,
  BirthTime,
  LocalBirthProfile,
  LocalBirthProfileStore,
  BirthProfileDeletionResult,
} from '../types/astrology';

export const MAX_LOCATION_LABEL_LENGTH = 120;

const hasOnlyWhitespace = (value: string | undefined) => !value || value.trim().length === 0;

const isIntegerInRange = (value: unknown, min: number, max: number): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;

const isValidDate = (year: number, month: number, day: number): boolean => {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};

const isValidTimezone = (timezone: string): boolean => {
  const trimmed = timezone.trim();
  if (trimmed !== 'UTC' && !trimmed.includes('/')) return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: trimmed });
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates the minimum optional-profile contract without collecting or storing
 * anything. The reference date makes future-date checks deterministic in tests.
 */
export const validateBirthProfileDraft = (
  draft: BirthProfileDraft,
  referenceDate: Date = new Date(),
): BirthProfileValidationResult => {
  const issues: BirthProfileValidationIssue[] = [];
  const { birthDate, birthTime, timezone, locationLabel } = draft;

  if (!birthDate || !isIntegerInRange(birthDate.year, 1, 9999) || !isIntegerInRange(birthDate.month, 1, 12) || !isIntegerInRange(birthDate.day, 1, 31) || !isValidDate(birthDate.year, birthDate.month, birthDate.day)) {
    issues.push({ field: 'birthDate', code: !birthDate ? 'required' : 'invalid_date', message: 'Enter a valid birth date.' });
  } else {
    const birthDateValue = new Date(Date.UTC(birthDate.year, birthDate.month - 1, birthDate.day));
    const today = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate()));
    if (birthDateValue > today) {
      issues.push({ field: 'birthDate', code: 'future_date', message: 'Birth date cannot be in the future.' });
    }
  }

  const timeHasHour = birthTime?.hour !== undefined;
  const timeHasMinute = birthTime?.minute !== undefined;
  if (timeHasHour !== timeHasMinute) {
    issues.push({ field: 'birthTime', code: 'incomplete_time', message: 'Enter both an hour and minute, or leave time blank.' });
  } else if (timeHasHour && (!isIntegerInRange(birthTime?.hour, 0, 23) || !isIntegerInRange(birthTime?.minute, 0, 59))) {
    issues.push({ field: 'birthTime', code: 'invalid_time', message: 'Enter a valid 24-hour time.' });
  }

  if (!hasOnlyWhitespace(timezone)) {
    if (!timeHasHour || !timeHasMinute) {
      issues.push({ field: 'timezone', code: 'timezone_requires_time', message: 'A timezone can only be used when birth time is provided.' });
    } else if (!isValidTimezone(timezone!.trim())) {
      issues.push({ field: 'timezone', code: 'invalid_timezone', message: 'Enter a valid IANA timezone.' });
    }
  }

  if (locationLabel && locationLabel.trim().length > MAX_LOCATION_LABEL_LENGTH) {
    issues.push({ field: 'locationLabel', code: 'location_too_long', message: `Location must be ${MAX_LOCATION_LABEL_LENGTH} characters or fewer.` });
  }

  return { isValid: issues.length === 0, issues };
};

/** Returns a normalized, local-only profile after validation has succeeded. */
export const createLocalBirthProfile = (
  draft: BirthProfileDraft,
  now: number = Date.now(),
): LocalBirthProfile | null => {
  if (!validateBirthProfileDraft(draft).isValid || !draft.birthDate) return null;

  const { year, month, day } = draft.birthDate;
  if (typeof year !== 'number' || typeof month !== 'number' || typeof day !== 'number') return null;

  const birthTime: BirthTime | undefined = draft.birthTime?.hour !== undefined && draft.birthTime.minute !== undefined
    ? { hour: draft.birthTime.hour, minute: draft.birthTime.minute }
    : undefined;
  const timezone = draft.timezone?.trim() || undefined;
  const locationLabel = draft.locationLabel?.trim() || undefined;

  return {
    version: ASTROLOGY_PROFILE_VERSION,
    birthDate: { year, month, day },
    ...(birthTime ? { birthTime } : {}),
    ...(timezone ? { timezone } : {}),
    ...(locationLabel ? { locationLabel } : {}),
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * A deletion boundary for a future local store. It intentionally does not
 * attempt a partial update: success means this store has removed its profile.
 */
export const deleteLocalBirthProfile = async (
  store: LocalBirthProfileStore,
): Promise<BirthProfileDeletionResult> => {
  try {
    await store.delete();
    return { ok: true, deleted: true };
  } catch {
    return { ok: false, error: 'storage_error' };
  }
};
