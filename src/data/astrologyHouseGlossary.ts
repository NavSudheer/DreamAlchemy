/**
 * Astrology House Glossary
 *
 * A typed, content-only collection of non-predictive, archetypal glossary entries
 * for astrological houses 1 through 12.
 *
 * All entries are strictly educational, symbolic, non-predictive, and non-diagnostic.
 * They describe traditional symbolic metaphors, topological sky sectors, and contemplative
 * lenses for inner reflection, making zero claims regarding fatalism, fortune-telling,
 * or psychological assessment.
 */

export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type HouseClassification = 'angular' | 'succedent' | 'cadent';

export interface AstrologyHouseGlossaryEntry {
  /** Stable unique identifier (e.g., 'house-1') */
  id: string;
  /** Numerical house identifier 1 through 12 */
  house: HouseNumber;
  /** Human-readable display title */
  name: string;
  /** Traditional descriptive title */
  traditionalName: string;
  /** Historical Latin archetypal designation */
  latinMotto: string;
  /** Traditional structural classification based on position relative to the angles */
  classification: HouseClassification;
  /** Concise summary of the archetypal theme */
  archetypalTheme: string;
  /** Historical symbolic metaphor describing the sky sector */
  traditionalMetaphor: string;
  /** Reflective, non-predictive lens for personal contemplation */
  contemplativePerspective: string;
  /** Distinctive keywords associated with this symbolic arena */
  keywords: string[];
  /** Screen-reader accessible summary */
  accessibilityDescription: string;
}

export const ASTROLOGY_HOUSE_GLOSSARY: AstrologyHouseGlossaryEntry[] = [
  {
    id: 'house-1',
    house: 1,
    name: 'First House',
    traditionalName: 'House of Self & Emergence',
    latinMotto: 'Vita (Life & Vitality)',
    classification: 'angular',
    archetypalTheme: 'Self-Presentation, Emergence & Personal Vitality',
    traditionalMetaphor:
      'The eastern horizon where the dawn breaks; represents the threshold where consciousness steps into the world.',
    contemplativePerspective:
      'Serves as an invitation to notice how you meet the world, initiate action, and express your spontaneous vitality when stepping into new environments.',
    keywords: [
      'self-presentation',
      'emergence',
      'vitality',
      'initiation',
      'first impressions',
      'threshold',
    ],
    accessibilityDescription:
      'First House: Angular house of self-emergence, spontaneous vitality, and how one initiates contact with the world.',
  },
  {
    id: 'house-2',
    house: 2,
    name: 'Second House',
    traditionalName: 'House of Resources & Sustenance',
    latinMotto: 'Lucrum (Resources & Wealth)',
    classification: 'succedent',
    archetypalTheme: 'Personal Resources, Grounding & Inner Value',
    traditionalMetaphor:
      'The subterranean foundation beneath the rising horizon; represents tangible provisions and inner capacities that sustain living.',
    contemplativePerspective:
      'Invites curiosity about what resources—both innate talents and tangible supports—truly nurture your security, stability, and sense of personal worth.',
    keywords: [
      'resources',
      'inner value',
      'grounding',
      'material sustenance',
      'security',
      'talents',
    ],
    accessibilityDescription:
      'Second House: Succedent house of personal resources, grounding, tangible sustenance, and personal values.',
  },
  {
    id: 'house-3',
    house: 3,
    name: 'Third House',
    traditionalName: 'House of Communication & Immediate World',
    latinMotto: 'Fratres (Siblings & Neighbors)',
    classification: 'cadent',
    archetypalTheme: 'Curiosity, Everyday Exchange & Inquiring Mind',
    traditionalMetaphor:
      'The nearby roads, footpaths, and daily gathering places; the realm where perception and local dialogue weave everyday understanding.',
    contemplativePerspective:
      'Prompts contemplation on how you gather daily information, navigate immediate surroundings, and converse with close peers and neighbors.',
    keywords: [
      'curiosity',
      'everyday exchange',
      'local pathways',
      'communication',
      'inquiring mind',
      'learning',
    ],
    accessibilityDescription:
      'Third House: Cadent house of everyday communication, active curiosity, local environments, and practical learning.',
  },
  {
    id: 'house-4',
    house: 4,
    name: 'Fourth House',
    traditionalName: 'House of Hearth, Roots & Foundation',
    latinMotto: 'Genitor (Ancestors & Roots)',
    classification: 'angular',
    archetypalTheme: 'Roots, Sanctuary & Inner Foundations',
    traditionalMetaphor:
      'The nadir (Imum Coeli), the lowest point of the chart below the horizon; represents the roots of the tree, hearth, and ancestral memory.',
    contemplativePerspective:
      'Encourages reflection on where you feel deeply rooted, what provides genuine emotional sanctuary, and how the foundations of your past nurture present growth.',
    keywords: [
      'roots',
      'sanctuary',
      'inner foundations',
      'hearth',
      'ancestral memory',
      'private retreat',
    ],
    accessibilityDescription:
      'Fourth House: Angular house of ancestral roots, personal sanctuary, private emotional grounding, and home foundations.',
  },
  {
    id: 'house-5',
    house: 5,
    name: 'Fifth House',
    traditionalName: 'House of Creative Expression & Delight',
    latinMotto: 'Nati (Offspring & Creation)',
    classification: 'succedent',
    archetypalTheme: 'Playful Creativity, Joy & Vital Spontaneity',
    traditionalMetaphor:
      'The realm of celebration, spontaneous artistry, and heartfelt joy; traditionally named the house of good fortune where creative spirit plays freely.',
    contemplativePerspective:
      'Prompts inquiry into where you experience genuine joy, creative delight, and playful self-expression without expectation of outcome.',
    keywords: [
      'playful creativity',
      'joy',
      'vital spontaneity',
      'creative passion',
      'delight',
      'play',
    ],
    accessibilityDescription:
      'Fifth House: Succedent house of playful creativity, spontaneous joy, artistic expression, and heartfelt recreation.',
  },
  {
    id: 'house-6',
    house: 6,
    name: 'Sixth House',
    traditionalName: 'House of Daily Craft & Routine',
    latinMotto: 'Valetudo (Traditional Upkeep & Service)',
    classification: 'cadent',
    archetypalTheme: 'Daily Rhythms, Practical Care & Dedicated Craft',
    traditionalMetaphor:
      'The workshop and daily garden; a traditional metaphor for sharpening tools, maintaining routines, and tending ordinary responsibilities.',
    contemplativePerspective:
      'An opportunity to reflect on ordinary routines, acts of quiet dedication, and practical forms of upkeep without treating the symbolism as health guidance.',
    keywords: [
      'daily rhythms',
      'practical care',
      'craft',
      'daily habits',
      'service',
      'well-being',
    ],
    accessibilityDescription:
      'Sixth House: traditional cadent-house themes of daily rhythms, dedicated craft, upkeep, and routine service.',
  },
  {
    id: 'house-7',
    house: 7,
    name: 'Seventh House',
    traditionalName: 'House of Partnership & Relational Mirror',
    latinMotto: 'Uxor (Companions & Partners)',
    classification: 'angular',
    archetypalTheme: 'Relational Mirroring, Mutuality & Partnership',
    traditionalMetaphor:
      'The western horizon where the sun sets; represents the direct encounter with the other as an equal mirror across the horizon.',
    contemplativePerspective:
      'Invites reflection on how you engage in conscious one-on-one relationships, what partners mirror back to you, and how balance is cultivated.',
    keywords: [
      'relational mirror',
      'mutuality',
      'partnership',
      'encounter',
      'interpersonal balance',
      'commitment',
    ],
    accessibilityDescription:
      'Seventh House: Angular house of conscious partnership, relational mirroring, mutuality, and one-on-one engagement.',
  },
  {
    id: 'house-8',
    house: 8,
    name: 'Eighth House',
    traditionalName: 'House of Shared Depths & Transformation',
    latinMotto: 'Mors (Threshold & Release)',
    classification: 'succedent',
    archetypalTheme: 'Shared Depths, Vulnerability & Regeneration',
    traditionalMetaphor:
      'The threshold of dusk descending toward night; represents entering the profound unknown, shared emotional depths, release, and renewal.',
    contemplativePerspective:
      'Prompts gentle curiosity about release, vulnerability in deep bonds, and the traditional motif of transition, without implying a required outcome.',
    keywords: [
      'shared depths',
      'vulnerability',
      'regeneration',
      'release',
      'transformation',
      'renewal',
    ],
    accessibilityDescription:
      'Eighth House: Succedent house of emotional depth, vulnerability, shared bonds, release, and transformational renewal.',
  },
  {
    id: 'house-9',
    house: 9,
    name: 'Ninth House',
    traditionalName: 'House of Expansive Horizons & Wisdom',
    latinMotto: 'Iter (Journeys & Philosophy)',
    classification: 'cadent',
    archetypalTheme: 'Expansive Horizons, Wisdom Seeking & Worldview',
    traditionalMetaphor:
      'The open sea, distant mountain passes, and halls of philosophy; represents expanding consciousness beyond familiar cultural boundaries.',
    contemplativePerspective:
      'Encourages contemplation of the guiding principles, larger worldviews, and journeys of mind or spirit that expand your perspective.',
    keywords: [
      'expansive horizons',
      'wisdom seeking',
      'worldview',
      'philosophical inquiry',
      'exploration',
      'perspective',
    ],
    accessibilityDescription:
      'Ninth House: Cadent house of expansive horizons, philosophical inquiry, long-distance exploration, and wisdom seeking.',
  },
  {
    id: 'house-10',
    house: 10,
    name: 'Tenth House',
    traditionalName: 'House of Vocation & Public Contribution',
    latinMotto: 'Regnum (Mastery & Vocation)',
    classification: 'angular',
    archetypalTheme: 'Public Contribution, Vocation & Purposeful Calling',
    traditionalMetaphor:
      'The midday sun at the highest elevation (Medium Coeli); represents maximum visibility, vocation, mastery, and how one serves the wider community.',
    contemplativePerspective:
      'Reflect on the values and talents you wish to contribute to the wider community, what meaningful vocation looks like, and your sense of purpose.',
    keywords: [
      'public contribution',
      'vocation',
      'calling',
      'visible mastery',
      'community role',
      'legacy',
    ],
    accessibilityDescription:
      'Tenth House: Angular house of purposeful calling, vocational mastery, public contribution, and visible community standing.',
  },
  {
    id: 'house-11',
    house: 11,
    name: 'Eleventh House',
    traditionalName: 'House of Community & Shared Ideals',
    latinMotto: 'Benefacta (Allies & Common Good)',
    classification: 'succedent',
    archetypalTheme: 'Collective Vision, Fellowship & Shared Ideals',
    traditionalMetaphor:
      'The forum of allies, creative circles, and dreamers of tomorrow; traditionally named the house of good spirit where collaborative hopes gather.',
    contemplativePerspective:
      'Invites reflection on the communities, friendships, and shared aspirations that uplift you, and the collective causes that inspire hope.',
    keywords: [
      'collective vision',
      'fellowship',
      'shared ideals',
      'community',
      'collaborative hope',
      'allies',
    ],
    accessibilityDescription:
      'Eleventh House: Succedent house of fellowship, collective vision, community belonging, and shared future ideals.',
  },
  {
    id: 'house-12',
    house: 12,
    name: 'Twelfth House',
    traditionalName: 'House of Solitude & Subconscious Rest',
    latinMotto: 'Carcer (Retreat & Sanctuary)',
    classification: 'cadent',
    archetypalTheme: 'Solitude, Transcendent Quiet & Subconscious Rest',
    traditionalMetaphor:
      'The quiet sky just before dawn; a traditional metaphor for dreams, solitude, retreat from worldly noise, and unseen spaces.',
    contemplativePerspective:
      'A prompt to consider solitude, dream imagery, and quiet moments away from external demands without assigning psychological meaning.',
    keywords: [
      'solitude',
      'subconscious stillness',
      'stillness',
      'quiet retreat',
      'transcendent reflection',
      'dreams',
    ],
    accessibilityDescription:
      'Twelfth House: traditional cadent-house themes of solitude, hidden spaces, dream imagery, and retreat from external demands.',
  },
];

export const ALL_HOUSE_NUMBERS: HouseNumber[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

const ORDINAL_NAMES: Record<number, string> = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
  6: 'sixth',
  7: 'seventh',
  8: 'eighth',
  9: 'ninth',
  10: 'tenth',
  11: 'eleventh',
  12: 'twelfth',
};

/**
 * Retrieve a house glossary entry by house number, ID, or display name.
 * Supports numbers (1-12) or string forms ('1', 'house-1', 'First House', 'first').
 */
export function getHouseGlossaryEntry(
  house: number | string,
): AstrologyHouseGlossaryEntry | undefined {
  if (typeof house === 'number') {
    return ASTROLOGY_HOUSE_GLOSSARY.find(entry => entry.house === house);
  }

  const trimmed = house.trim().toLowerCase();

  // Try direct numeric parse
  const parsedNum = /^\d{1,2}$/.test(trimmed) ? Number(trimmed) : NaN;
  if (!Number.isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= 12) {
    const entry = ASTROLOGY_HOUSE_GLOSSARY.find(item => item.house === parsedNum);
    if (entry) return entry;
  }

  // Try ID, name, or ordinal match
  return ASTROLOGY_HOUSE_GLOSSARY.find(entry => {
    if (entry.id.toLowerCase() === trimmed) return true;
    if (entry.name.toLowerCase() === trimmed) return true;
    const ordinal = ORDINAL_NAMES[entry.house];
    if (ordinal && (trimmed === ordinal || trimmed === `${ordinal} house`)) return true;
    return false;
  });
}

/**
 * Retrieve all 12 house glossary entries.
 */
export function getAllHouseGlossaryEntries(): AstrologyHouseGlossaryEntry[] {
  return ASTROLOGY_HOUSE_GLOSSARY;
}

/**
 * Retrieve all supported house numbers (1 through 12).
 */
export function getAllHouseNumbers(): HouseNumber[] {
  return [...ALL_HOUSE_NUMBERS];
}

/**
 * Check whether a glossary entry exists for a given house identifier.
 */
export function hasHouseGlossaryEntry(house: number | string): boolean {
  return getHouseGlossaryEntry(house) !== undefined;
}

/**
 * Type guard verifying whether a value is a valid HouseNumber (1-12).
 */
export function isValidHouseNumber(value: unknown): value is HouseNumber {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    ALL_HOUSE_NUMBERS.includes(value as HouseNumber)
  );
}

/**
 * Filter house glossary entries by traditional structural classification (angular, succedent, cadent).
 */
export function getHousesByClassification(
  classification: HouseClassification,
): AstrologyHouseGlossaryEntry[] {
  return ASTROLOGY_HOUSE_GLOSSARY.filter(
    entry => entry.classification === classification,
  );
}

/**
 * Retrieve the screen-reader accessible description for a house.
 */
export function getHouseAccessibilityDescription(house: number | string): string {
  const entry = getHouseGlossaryEntry(house);
  return entry?.accessibilityDescription ?? `House ${house}`;
}
