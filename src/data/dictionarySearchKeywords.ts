/**
 * Dictionary Search Keywords
 *
 * A typed, content-only dictionary keyword index providing concise, neutral
 * search terms for each existing dream symbol ID in Dream Alchemy.
 *
 * Grounded directly in symbol descriptions, categories, and meanings from
 * dreamSymbols.ts to support local search and content discovery.
 */

export interface SymbolSearchKeywords {
  symbolId: string;
  symbolName: string;
  category: string;
  keywords: string[];
}

export const DICTIONARY_SEARCH_KEYWORDS: Record<string, SymbolSearchKeywords> = {
  // Animals
  wolf: {
    symbolId: 'wolf',
    symbolName: 'Wolf',
    category: 'animals',
    keywords: [
      'wolf',
      'wolves',
      'canine',
      'pack',
      'wild',
      'predator',
      'instinct',
      'wilderness',
      'howling',
      'loyalty',
    ],
  },
  bird: {
    symbolId: 'bird',
    symbolName: 'Bird',
    category: 'animals',
    keywords: [
      'bird',
      'birds',
      'avian',
      'feather',
      'wings',
      'flight',
      'flying',
      'flock',
      'songbird',
      'sky',
      'freedom',
    ],
  },
  snake: {
    symbolId: 'snake',
    symbolName: 'Snake',
    category: 'animals',
    keywords: [
      'snake',
      'snakes',
      'serpent',
      'reptile',
      'viper',
      'cobra',
      'shedding',
      'coiled',
      'healing',
      'transformation',
    ],
  },
  cat: {
    symbolId: 'cat',
    symbolName: 'Cat',
    category: 'animals',
    keywords: [
      'cat',
      'cats',
      'feline',
      'kitten',
      'claws',
      'purr',
      'independence',
      'intuition',
      'mystery',
      'observation',
    ],
  },
  horse: {
    symbolId: 'horse',
    symbolName: 'Horse',
    category: 'animals',
    keywords: [
      'horse',
      'horses',
      'equine',
      'stallion',
      'mare',
      'riding',
      'gallop',
      'vitality',
      'mobility',
      'power',
    ],
  },

  // People
  child: {
    symbolId: 'child',
    symbolName: 'Child',
    category: 'people',
    keywords: [
      'child',
      'children',
      'kid',
      'kids',
      'baby',
      'toddler',
      'youth',
      'innocence',
      'vulnerability',
      'potential',
    ],
  },
  stranger: {
    symbolId: 'stranger',
    symbolName: 'Stranger',
    category: 'people',
    keywords: [
      'stranger',
      'strangers',
      'unknown person',
      'unfamiliar',
      'passerby',
      'visitor',
      'shadow figure',
      'newcomer',
      'encounter',
    ],
  },
  teacher: {
    symbolId: 'teacher',
    symbolName: 'Teacher',
    category: 'people',
    keywords: [
      'teacher',
      'mentor',
      'instructor',
      'professor',
      'guide',
      'tutor',
      'classroom',
      'guidance',
      'wisdom',
      'advice',
    ],
  },

  // Places
  house: {
    symbolId: 'house',
    symbolName: 'House',
    category: 'places',
    keywords: [
      'house',
      'home',
      'building',
      'room',
      'rooms',
      'attic',
      'basement',
      'cellar',
      'shelter',
      'residence',
    ],
  },
  water: {
    symbolId: 'water',
    symbolName: 'Water',
    category: 'nature',
    keywords: [
      'water',
      'ocean',
      'sea',
      'river',
      'lake',
      'stream',
      'rain',
      'waves',
      'flood',
      'swimming',
      'cleansing',
    ],
  },
  forest: {
    symbolId: 'forest',
    symbolName: 'Forest',
    category: 'places',
    keywords: [
      'forest',
      'woods',
      'trees',
      'woodland',
      'grove',
      'jungle',
      'canopy',
      'path',
      'trail',
      'wilderness',
    ],
  },

  // Objects
  key: {
    symbolId: 'key',
    symbolName: 'Key',
    category: 'objects',
    keywords: [
      'key',
      'keys',
      'lock',
      'unlock',
      'door',
      'lockbox',
      'access',
      'solution',
      'entry',
      'threshold',
    ],
  },
  mirror: {
    symbolId: 'mirror',
    symbolName: 'Mirror',
    category: 'objects',
    keywords: [
      'mirror',
      'mirrors',
      'reflection',
      'reflective',
      'glass',
      'surface',
      'self-image',
      'looking glass',
      'identity',
    ],
  },

  // Actions
  flying: {
    symbolId: 'flying',
    symbolName: 'Flying',
    category: 'actions',
    keywords: [
      'flying',
      'flight',
      'fly',
      'soaring',
      'floating',
      'airborne',
      'levitation',
      'gliding',
      'wings',
      'transcendence',
    ],
  },
  falling: {
    symbolId: 'falling',
    symbolName: 'Falling',
    category: 'actions',
    keywords: [
      'falling',
      'fall',
      'drop',
      'dropping',
      'plunge',
      'stumble',
      'descent',
      'freefall',
      'slipping',
      'loss of control',
    ],
  },

  // Emotions
  love: {
    symbolId: 'love',
    symbolName: 'Love',
    category: 'emotions',
    keywords: [
      'love',
      'affection',
      'romance',
      'warmth',
      'connection',
      'embrace',
      'intimacy',
      'care',
      'passion',
      'wholeness',
    ],
  },
  fear: {
    symbolId: 'fear',
    symbolName: 'Fear',
    category: 'emotions',
    keywords: [
      'fear',
      'anxiety',
      'scared',
      'terror',
      'panic',
      'dread',
      'fright',
      'threat',
      'alarm',
      'apprehension',
    ],
  },
};

/**
 * Get all search keywords for a specific dictionary symbol ID.
 */
export function getKeywordsForSymbol(symbolId: string): string[] {
  const entry = DICTIONARY_SEARCH_KEYWORDS[symbolId.toLowerCase().trim()];
  return entry ? entry.keywords : [];
}

/**
 * Get the full keyword entry for a specific symbol ID.
 */
export function getSymbolKeywordsEntry(symbolId: string): SymbolSearchKeywords | undefined {
  return DICTIONARY_SEARCH_KEYWORDS[symbolId.toLowerCase().trim()];
}

/**
 * Return all symbol keyword entries.
 */
export function getAllSymbolKeywords(): SymbolSearchKeywords[] {
  return Object.values(DICTIONARY_SEARCH_KEYWORDS);
}

/**
 * Check whether a symbol has keyword mapping.
 */
export function hasKeywordsForSymbol(symbolId: string): boolean {
  return Boolean(DICTIONARY_SEARCH_KEYWORDS[symbolId.toLowerCase().trim()]);
}

/**
 * Find all symbol IDs matching a given single keyword.
 */
export function findSymbolsByKeyword(keyword: string): string[] {
  const normalized = keyword.toLowerCase().trim();
  if (!normalized) return [];
  return Object.values(DICTIONARY_SEARCH_KEYWORDS)
    .filter(entry => entry.keywords.some(k => k.toLowerCase() === normalized))
    .map(entry => entry.symbolId);
}

/**
 * Match symbol entries against a search query string.
 */
export function matchSymbolsByQuery(query: string): SymbolSearchKeywords[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];
  return Object.values(DICTIONARY_SEARCH_KEYWORDS).filter(entry =>
    entry.symbolName.toLowerCase().includes(normalized) ||
    entry.symbolId.toLowerCase().includes(normalized) ||
    entry.keywords.some(k => k.toLowerCase().includes(normalized))
  );
}

/**
 * Return a deduplicated array of all keywords across all symbols.
 */
export function getAllUniqueKeywords(): string[] {
  const set = new Set<string>();
  Object.values(DICTIONARY_SEARCH_KEYWORDS).forEach(entry => {
    entry.keywords.forEach(k => set.add(k.toLowerCase()));
  });
  return Array.from(set).sort();
}
