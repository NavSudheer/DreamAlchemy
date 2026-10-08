import {
  getBodyGlossaryEntry,
  getSignGlossaryEntry,
} from '../astrologyPlacementGlossary';
import {
  getAspectGlossaryEntry,
  isValidMajorAspectType,
} from '../astrologyAspectGlossary';
import { getHouseGlossaryEntry, isValidHouseNumber } from '../astrologyHouseGlossary';
import { getCanonicalBodyName, hasBodyAlias } from '../astrologyBodyAliases';
import { getMinorBodyGlossaryEntry } from '../astrologyMinorBodyGlossary';
import { getAngleGlossaryEntry } from '../astrologyAngleGlossary';

describe('optional astrology glossaries', () => {
  it('looks up chart bodies without case sensitivity', () => {
    expect(getBodyGlossaryEntry('  mOoN  ')?.name).toBe('Moon');
    expect(getBodyGlossaryEntry('SOL')?.name).toBe('Sun');
  });

  it('normalizes provider node and minor-body labels without conflating node models', () => {
    expect(getCanonicalBodyName(' true_node ')).toBe('True Node');
    expect(getCanonicalBodyName('Pallas-Athena')).toBe('Pallas');
    expect(hasBodyAlias('mean node')).toBe(false);
    expect(hasBodyAlias('node')).toBe(false);
  });

  it('resolves provider minor-body aliases to non-predictive glossary entries', () => {
    expect(getMinorBodyGlossaryEntry('true_node')?.name).toBe('True Node');
    expect(getMinorBodyGlossaryEntry('Pallas-Athena')?.name).toBe('Pallas');
    expect(getMinorBodyGlossaryEntry('mean node')).toBeUndefined();
  });

  it('resolves chart-angle aliases without accepting unrelated suffixes', () => {
    expect(getAngleGlossaryEntry('ASC')?.name).toBe('Ascendant');
    expect(getAngleGlossaryEntry('medium coeli')?.name).toBe('Midheaven');
    expect(getAngleGlossaryEntry('ascendant-untrusted-suffix')).toBeUndefined();
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
