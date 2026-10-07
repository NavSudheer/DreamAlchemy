import {
  createLocalBirthProfile,
  deleteLocalBirthProfile,
  MAX_LOCATION_LABEL_LENGTH,
  validateBirthProfileDraft,
} from '../astrology';
import { LocalBirthProfileStore } from '../../types/astrology';

const referenceDate = new Date('2026-10-07T12:00:00.000Z');

describe('astrology profile validation', () => {
  it('accepts a minimal, date-only profile and normalizes it locally', () => {
    const draft = { birthDate: { year: 1995, month: 4, day: 12 } };

    expect(validateBirthProfileDraft(draft, referenceDate)).toEqual({ isValid: true, issues: [] });
    expect(createLocalBirthProfile(draft, 123)).toEqual({
      version: 1,
      birthDate: { year: 1995, month: 4, day: 12 },
      createdAt: 123,
      updatedAt: 123,
    });
  });

  it('accepts a valid leap-day birth date', () => {
    expect(validateBirthProfileDraft({
      birthDate: { year: 2024, month: 2, day: 29 },
    }, referenceDate)).toEqual({ isValid: true, issues: [] });
  });

  it('rejects a future birth date', () => {
    const result = validateBirthProfileDraft({
      birthDate: { year: 2026, month: 10, day: 8 },
    }, referenceDate);

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: 'birthDate', code: 'future_date' }),
    ]));
  });

  it('rejects a partial birth time', () => {
    const result = validateBirthProfileDraft({
      birthDate: { year: 1995, month: 4, day: 12 },
      birthTime: { hour: 8 },
    }, referenceDate);

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: 'birthTime', code: 'incomplete_time' }),
    ]));
  });

  it('requires a time when a timezone is supplied', () => {
    const result = validateBirthProfileDraft({
      birthDate: { year: 1995, month: 4, day: 12 },
      timezone: 'America/Toronto',
    }, referenceDate);

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: 'timezone', code: 'timezone_requires_time' }),
    ]));
  });

  it('rejects an invalid timezone when a complete time is supplied', () => {
    const result = validateBirthProfileDraft({
      birthDate: { year: 1995, month: 4, day: 12 },
      birthTime: { hour: 8, minute: 15 },
      timezone: 'Mars/Olympus_Mons',
    }, referenceDate);

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: 'timezone', code: 'invalid_timezone' }),
    ]));
  });

  it('rejects location labels above the privacy-friendly boundary', () => {
    const result = validateBirthProfileDraft({
      birthDate: { year: 1995, month: 4, day: 12 },
      locationLabel: 'x'.repeat(MAX_LOCATION_LABEL_LENGTH + 1),
    }, referenceDate);

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: 'locationLabel', code: 'location_too_long' }),
    ]));
  });
});

describe('local astrology profile deletion', () => {
  const createStore = (deleteProfile: jest.Mock): LocalBirthProfileStore => ({
    read: jest.fn(),
    write: jest.fn(),
    delete: deleteProfile,
  });

  it('reports deletion success after the store removes the profile', async () => {
    const deleteProfile = jest.fn().mockResolvedValue(undefined);

    await expect(deleteLocalBirthProfile(createStore(deleteProfile))).resolves.toEqual({ ok: true, deleted: true });
    expect(deleteProfile).toHaveBeenCalledTimes(1);
  });

  it('reports a storage error when deletion fails', async () => {
    const deleteProfile = jest.fn().mockRejectedValue(new Error('unavailable'));

    await expect(deleteLocalBirthProfile(createStore(deleteProfile))).resolves.toEqual({ ok: false, error: 'storage_error' });
  });
});
