/**
 * Astrology Body Aliases & Normalization
 *
 * A typed, content-only dictionary and helper utilities that map diverse
 * calculation provider body labels—including spacing, punctuation, and case
 * variants for traditional planets, angles, lunar nodes, and minor celestial bodies—to
 * their canonical glossary names.
 *
 * All mapping is non-predictive, structural, and educational.
 */

export interface AstrologyBodyAliasEntry {
  /** Canonical display name used across glossaries and UI */
  canonicalName: string;
  /** Primary category of the celestial body or point */
  category: 'luminary' | 'planet' | 'angle' | 'node' | 'centaur' | 'asteroid' | 'point';
  /** Recognized alias variants returned by external calculation engines */
  aliases: string[];
}

export const ASTROLOGY_BODY_ALIAS_ENTRIES: AstrologyBodyAliasEntry[] = [
  {
    canonicalName: 'Sun',
    category: 'luminary',
    aliases: ['sun', 'sol', 'solar'],
  },
  {
    canonicalName: 'Moon',
    category: 'luminary',
    aliases: ['moon', 'luna', 'lunar'],
  },
  {
    canonicalName: 'Mercury',
    category: 'planet',
    aliases: ['mercury', 'merc', 'hermes'],
  },
  {
    canonicalName: 'Venus',
    category: 'planet',
    aliases: ['venus', 'aphrodite'],
  },
  {
    canonicalName: 'Mars',
    category: 'planet',
    aliases: ['mars', 'ares'],
  },
  {
    canonicalName: 'Jupiter',
    category: 'planet',
    aliases: ['jupiter', 'jup', 'zeus'],
  },
  {
    canonicalName: 'Saturn',
    category: 'planet',
    aliases: ['saturn', 'sat', 'cronus', 'kronos'],
  },
  {
    canonicalName: 'Uranus',
    category: 'planet',
    aliases: ['uranus', 'ura', 'ouranos'],
  },
  {
    canonicalName: 'Neptune',
    category: 'planet',
    aliases: ['neptune', 'nep', 'poseidon'],
  },
  {
    canonicalName: 'Pluto',
    category: 'planet',
    aliases: ['pluto', 'plu', 'hades'],
  },
  {
    canonicalName: 'Ascendant',
    category: 'angle',
    aliases: ['ascendant', 'asc', 'as', 'rising', 'rising sign', 'eastern horizon'],
  },
  {
    canonicalName: 'Midheaven',
    category: 'angle',
    aliases: ['midheaven', 'mc', 'medium coeli', 'mediumcoeli', 'zenith'],
  },
  {
    canonicalName: 'True Node',
    category: 'node',
    aliases: [
      'true node',
      'truenode',
      'true_node',
      'true-node',
      'north node',
      'northnode',
      'north_node',
      'north-node',
      'rahu',
    ],
  },
  {
    canonicalName: 'South Node',
    category: 'node',
    aliases: [
      'south node',
      'southnode',
      'south_node',
      'south-node',
      'ketu',
      'descending node',
      'cauda draconis',
    ],
  },
  {
    canonicalName: 'Chiron',
    category: 'centaur',
    aliases: ['chiron', 'kheiron'],
  },
  {
    canonicalName: 'Lilith',
    category: 'point',
    aliases: [
      'lilith',
      'black moon lilith',
      'blackmoonlilith',
      'black_moon_lilith',
      'black-moon-lilith',
      'bml',
      'true lilith',
      'mean lilith',
    ],
  },
  {
    canonicalName: 'Ceres',
    category: 'asteroid',
    aliases: ['ceres', 'demeter'],
  },
  {
    canonicalName: 'Pallas',
    category: 'asteroid',
    aliases: [
      'pallas',
      'pallas athena',
      'pallasathena',
      'pallas_athena',
      'pallas-athena',
      'athena',
    ],
  },
  {
    canonicalName: 'Juno',
    category: 'asteroid',
    aliases: ['juno', 'hera'],
  },
  {
    canonicalName: 'Vesta',
    category: 'asteroid',
    aliases: ['vesta', 'hestia'],
  },
];

/**
 * Normalizes an arbitrary string label by lowercasing, trimming, and
 * standardizing separators (converting underscores, hyphens, and multiple spaces to a single space).
 */
export function normalizeBodyLabel(rawLabel: string): string {
  if (typeof rawLabel !== 'string') {
    return '';
  }
  return rawLabel
    .trim()
    .toLowerCase()
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Strips all whitespace and non-alphanumeric punctuation for compact matching.
 */
function toCompactKey(rawLabel: string): string {
  return rawLabel.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Internal lookup dictionary mapping both normalized space-separated keys
 * and compact keys to canonical body names.
 */
function buildAliasLookupMap(): Record<string, string> {
  const map: Record<string, string> = {};

  for (const entry of ASTROLOGY_BODY_ALIAS_ENTRIES) {
    const canonical = entry.canonicalName;
    // Map canonical name directly
    map[canonical.toLowerCase()] = canonical;
    map[toCompactKey(canonical)] = canonical;

    for (const alias of entry.aliases) {
      const normalized = normalizeBodyLabel(alias);
      map[normalized] = canonical;
      map[toCompactKey(alias)] = canonical;
    }
  }

  return map;
}

export const ASTROLOGY_BODY_ALIAS_MAP: Readonly<Record<string, string>> =
  buildAliasLookupMap();

/**
 * List of all canonical celestial body names.
 */
export const CANONICAL_BODY_NAMES: readonly string[] =
  ASTROLOGY_BODY_ALIAS_ENTRIES.map(entry => entry.canonicalName);

/**
 * Resolves any provider-returned celestial body label, node, or angle to its
 * canonical glossary name. Handles case variation, extra whitespace, hyphens,
 * underscores, and common astronomical abbreviations (e.g., 'ASC', 'MC', 'TrueNode').
 *
 * Returns undefined if the body label is not recognized.
 */
export function getCanonicalBodyName(rawLabel: string): string | undefined {
  if (!rawLabel || typeof rawLabel !== 'string') {
    return undefined;
  }

  const normalized = normalizeBodyLabel(rawLabel);
  if (ASTROLOGY_BODY_ALIAS_MAP[normalized]) {
    return ASTROLOGY_BODY_ALIAS_MAP[normalized];
  }

  const compact = toCompactKey(rawLabel);
  if (ASTROLOGY_BODY_ALIAS_MAP[compact]) {
    return ASTROLOGY_BODY_ALIAS_MAP[compact];
  }

  return undefined;
}

/**
 * Checks whether an alias or recognized label exists for the given string.
 */
export function hasBodyAlias(rawLabel: string): boolean {
  return getCanonicalBodyName(rawLabel) !== undefined;
}

/**
 * Returns all recognized alias forms for a specific canonical body name.
 */
export function getAliasesForCanonicalBody(canonicalName: string): string[] {
  const entry = ASTROLOGY_BODY_ALIAS_ENTRIES.find(
    e => e.canonicalName.toLowerCase() === canonicalName.trim().toLowerCase(),
  );
  return entry ? [...entry.aliases] : [];
}

/**
 * Returns the list of all canonical body names.
 */
export function getAllCanonicalBodyNames(): string[] {
  return [...CANONICAL_BODY_NAMES];
}

/**
 * Checks whether a string is an exact, case-sensitive canonical body name.
 */
export function isCanonicalBodyName(name: string): boolean {
  return CANONICAL_BODY_NAMES.includes(name.trim());
}
