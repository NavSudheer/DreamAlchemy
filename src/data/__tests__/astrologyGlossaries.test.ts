import {
  getBodyGlossaryEntry,
  getSignGlossaryEntry,
} from '../astrologyPlacementGlossary';
import {
  getAspectGlossaryEntry,
  isValidMajorAspectType,
} from '../astrologyAspectGlossary';
import { getHouseGlossaryEntry, isValidHouseNumber } from '../astrologyHouseGlossary';

describe('optional astrology glossaries', () => {
  it('looks up chart bodies without case sensitivity', () => {
    expect(getBodyGlossaryEntry('  mOoN  ')?.name).toBe('Moon');
  });

  it('looks up zodiac signs without case sensitivity', () => {
    expect(getSignGlossaryEntry('  aQuArIuS ')?.name).toBe('Aquarius');
  });

  it('looks up provider aspect names without case sensitivity', () => {
    expect(getAspectGlossaryEntry('  TRINE  ')?.angleDegrees).toBe(120);
  });

  it('validates normalized aspect values and rejects unknown ones', () => {
    expect(isValidMajorAspectType('  Opposition ')).toBe(true);
    expect(isValidMajorAspectType('quincunx')).toBe(false);
    expect(isValidMajorAspectType(null)).toBe(false);
  });

  it('resolves supported house identifiers without accepting numeric prefixes', () => {
    expect(getHouseGlossaryEntry(6)?.traditionalName).toBe('House of Daily Craft & Routine');
    expect(getHouseGlossaryEntry('  Twelfth House ')?.house).toBe(12);
    expect(getHouseGlossaryEntry('1-untrusted-suffix')).toBeUndefined();
    expect(isValidHouseNumber(12)).toBe(true);
    expect(isValidHouseNumber(13)).toBe(false);
  });
});
