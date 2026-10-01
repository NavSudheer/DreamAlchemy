/**
 * Dictionary Related Searches
 *
 * A typed, content-only collection of neutral related-search suggestions for each
 * existing dream dictionary symbol ID.
 *
 * All suggestions reference strictly existing symbol IDs in Dream Alchemy.
 * Educational and exploratory mapping only; no diagnostic or outcome claims.
 */

export interface RelatedSearchSuggestion {
  targetSymbolId: string;
  targetSymbolName: string;
  query: string;
  context: string;
}

export interface SymbolRelatedSearches {
  symbolId: string;
  symbolName: string;
  suggestions: RelatedSearchSuggestion[];
}

export const DICTIONARY_RELATED_SEARCHES: Record<string, SymbolRelatedSearches> = {
  // Animals
  wolf: {
    symbolId: 'wolf',
    symbolName: 'Wolf',
    suggestions: [
      {
        targetSymbolId: 'forest',
        targetSymbolName: 'Forest',
        query: 'Forest',
        context: 'Often explored together when considering natural wilderness and untamed environments.',
      },
      {
        targetSymbolId: 'fear',
        targetSymbolName: 'Fear',
        query: 'Fear',
        context: 'Commonly searched alongside predator or pursuit dream narratives.',
      },
      {
        targetSymbolId: 'cat',
        targetSymbolName: 'Cat',
        query: 'Cat',
        context: 'Contrasts canine pack instincts with solitary feline autonomy.',
      },
    ],
  },

  bird: {
    symbolId: 'bird',
    symbolName: 'Bird',
    suggestions: [
      {
        targetSymbolId: 'flying',
        targetSymbolName: 'Flying',
        query: 'Flying',
        context: 'Shares themes of aerial perspective, elevation, and defying gravity.',
      },
      {
        targetSymbolId: 'forest',
        targetSymbolName: 'Forest',
        query: 'Forest',
        context: 'Frequently paired as creatures nesting in or navigating dense tree canopies.',
      },
    ],
  },

  snake: {
    symbolId: 'snake',
    symbolName: 'Snake',
    suggestions: [
      {
        targetSymbolId: 'water',
        targetSymbolName: 'Water',
        query: 'Water',
        context: 'Often coupled in dreams featuring fluid, underground, or aquatic settings.',
      },
      {
        targetSymbolId: 'fear',
        targetSymbolName: 'Fear',
        query: 'Fear',
        context: 'Commonly explored together in dreams triggering sudden caution or alarm.',
      },
      {
        targetSymbolId: 'forest',
        targetSymbolName: 'Forest',
        query: 'Forest',
        context: 'Frequently searched as hidden elements encountered along secluded woodland trails.',
      },
    ],
  },

  cat: {
    symbolId: 'cat',
    symbolName: 'Cat',
    suggestions: [
      {
        targetSymbolId: 'house',
        targetSymbolName: 'House',
        query: 'House',
        context: 'Often encountered together in domestic or indoor room settings.',
      },
      {
        targetSymbolId: 'wolf',
        targetSymbolName: 'Wolf',
        query: 'Wolf',
        context: 'Contrasts independent, quiet observation with pack dynamics and raw instinct.',
      },
      {
        targetSymbolId: 'mirror',
        targetSymbolName: 'Mirror',
        query: 'Mirror',
        context: 'Frequently paired when exploring themes of intuition and quiet self-observation.',
      },
    ],
  },

  horse: {
    symbolId: 'horse',
    symbolName: 'Horse',
    suggestions: [
      {
        targetSymbolId: 'forest',
        targetSymbolName: 'Forest',
        query: 'Forest',
        context: 'Frequently searched together when journeying through uncharted outdoor terrain.',
      },
      {
        targetSymbolId: 'flying',
        targetSymbolName: 'Flying',
        query: 'Flying',
        context: 'Shares symbolic connections with rapid motion, momentum, and unbounded freedom.',
      },
      {
        targetSymbolId: 'wolf',
        targetSymbolName: 'Wolf',
        query: 'Wolf',
        context: 'Contrasts disciplined, travel-oriented vitality with wild, predatory nature.',
      },
    ],
  },

  // People
  child: {
    symbolId: 'child',
    symbolName: 'Child',
    suggestions: [
      {
        targetSymbolId: 'teacher',
        targetSymbolName: 'Teacher',
        query: 'Teacher',
        context: 'Pairs the student/child role with guidance, learning, and mentorship.',
      },
      {
        targetSymbolId: 'house',
        targetSymbolName: 'House',
        query: 'House',
        context: 'Commonly searched when reflecting on childhood memories or family home settings.',
      },
      {
        targetSymbolId: 'love',
        targetSymbolName: 'Love',
        query: 'Love',
        context: 'Shares themes of unconditional care, vulnerability, and nurturing.',
      },
    ],
  },

  stranger: {
    symbolId: 'stranger',
    symbolName: 'Stranger',
    suggestions: [
      {
        targetSymbolId: 'mirror',
        targetSymbolName: 'Mirror',
        query: 'Mirror',
        context: 'Frequently explored together when examining unfamiliar or unexpected aspects of self-identity.',
      },
      {
        targetSymbolId: 'fear',
        targetSymbolName: 'Fear',
        query: 'Fear',
        context: 'Commonly searched when stranger figures introduce apprehension or tension.',
      },
      {
        targetSymbolId: 'teacher',
        targetSymbolName: 'Teacher',
        query: 'Teacher',
        context: 'Connects unknown figures who offer unexpected advice or direction.',
      },
    ],
  },

  teacher: {
    symbolId: 'teacher',
    symbolName: 'Teacher',
    suggestions: [
      {
        targetSymbolId: 'child',
        targetSymbolName: 'Child',
        query: 'Child',
        context: 'Explores the reciprocal relationship between student curiosity and instructional guidance.',
      },
      {
        targetSymbolId: 'key',
        targetSymbolName: 'Key',
        query: 'Key',
        context: 'Pairs the concept of receiving instruction with unlocking new opportunities or knowledge.',
      },
      {
        targetSymbolId: 'stranger',
        targetSymbolName: 'Stranger',
        query: 'Stranger',
        context: 'Examines mentors who appear as unfamiliar or anonymous guides.',
      },
    ],
  },

  // Places
  house: {
    symbolId: 'house',
    symbolName: 'House',
    suggestions: [
      {
        targetSymbolId: 'key',
        targetSymbolName: 'Key',
        query: 'Key',
        context: 'Connects physical or psychic chambers with mechanisms of access and boundaries.',
      },
      {
        targetSymbolId: 'mirror',
        targetSymbolName: 'Mirror',
        query: 'Mirror',
        context: 'Frequently paired when exploring self-reflection within private indoor sanctuaries.',
      },
      {
        targetSymbolId: 'child',
        targetSymbolName: 'Child',
        query: 'Child',
        context: 'Commonly searched when examining family residences and past living spaces.',
      },
    ],
  },

  water: {
    symbolId: 'water',
    symbolName: 'Water',
    suggestions: [
      {
        targetSymbolId: 'falling',
        targetSymbolName: 'Falling',
        query: 'Falling',
        context: 'Frequently paired in dreams involving descending into deep pools or ocean depths.',
      },
      {
        targetSymbolId: 'snake',
        targetSymbolName: 'Snake',
        query: 'Snake',
        context: 'Commonly searched together in aquatic, river, or marsh dream imagery.',
      },
      {
        targetSymbolId: 'fear',
        targetSymbolName: 'Fear',
        query: 'Fear',
        context: 'Explored together when navigating turbulent currents or overwhelming waves.',
      },
    ],
  },

  forest: {
    symbolId: 'forest',
    symbolName: 'Forest',
    suggestions: [
      {
        targetSymbolId: 'wolf',
        targetSymbolName: 'Wolf',
        query: 'Wolf',
        context: 'Pairs the woodland landscape with wilderness creatures and instinctual encounters.',
      },
      {
        targetSymbolId: 'bird',
        targetSymbolName: 'Bird',
        query: 'Bird',
        context: 'Frequently searched alongside canopy wildlife and treetop vantage points.',
      },
      {
        targetSymbolId: 'house',
        targetSymbolName: 'House',
        query: 'House',
        context: 'Contrasts the wild outdoor thicket with the structured safety of shelter.',
      },
    ],
  },

  // Objects
  key: {
    symbolId: 'key',
    symbolName: 'Key',
    suggestions: [
      {
        targetSymbolId: 'house',
        targetSymbolName: 'House',
        query: 'House',
        context: 'Relates access mechanisms to opening specific doors, rooms, or residences.',
      },
      {
        targetSymbolId: 'mirror',
        targetSymbolName: 'Mirror',
        query: 'Mirror',
        context: 'Connects finding an answer with confronting personal truth and self-image.',
      },
      {
        targetSymbolId: 'teacher',
        targetSymbolName: 'Teacher',
        query: 'Teacher',
        context: 'Frequently paired when searching for insights gained through lessons or mentors.',
      },
    ],
  },

  mirror: {
    symbolId: 'mirror',
    symbolName: 'Mirror',
    suggestions: [
      {
        targetSymbolId: 'stranger',
        targetSymbolName: 'Stranger',
        query: 'Stranger',
        context: 'Explored together when reflections appear altered, unfamiliar, or unexpected.',
      },
      {
        targetSymbolId: 'house',
        targetSymbolName: 'House',
        query: 'House',
        context: 'Frequently searched when exploring personal identity within interior rooms.',
      },
      {
        targetSymbolId: 'key',
        targetSymbolName: 'Key',
        query: 'Key',
        context: 'Connects honest self-examination with unlocking personal understanding.',
      },
    ],
  },

  // Actions
  flying: {
    symbolId: 'flying',
    symbolName: 'Flying',
    suggestions: [
      {
        targetSymbolId: 'bird',
        targetSymbolName: 'Bird',
        query: 'Bird',
        context: 'Shares motifs of flight mechanics, wings, and aerial perspectives.',
      },
      {
        targetSymbolId: 'falling',
        targetSymbolName: 'Falling',
        query: 'Falling',
        context: 'Contrasts effortless aerial suspension with sudden loss of altitude or descent.',
      },
    ],
  },

  falling: {
    symbolId: 'falling',
    symbolName: 'Falling',
    suggestions: [
      {
        targetSymbolId: 'flying',
        targetSymbolName: 'Flying',
        query: 'Flying',
        context: 'Contrasts uncontrolled downward momentum with voluntary soaring.',
      },
      {
        targetSymbolId: 'fear',
        targetSymbolName: 'Fear',
        query: 'Fear',
        context: 'Frequently paired when descending triggers physical anxiety or surprise.',
      },
      {
        targetSymbolId: 'water',
        targetSymbolName: 'Water',
        query: 'Water',
        context: 'Commonly searched when falls culminate in plunging into oceans or rivers.',
      },
    ],
  },

  // Emotions
  love: {
    symbolId: 'love',
    symbolName: 'Love',
    suggestions: [
      {
        targetSymbolId: 'child',
        targetSymbolName: 'Child',
        query: 'Child',
        context: 'Shares themes of gentle affection, vulnerability, and caring.',
      },
      {
        targetSymbolId: 'fear',
        targetSymbolName: 'Fear',
        query: 'Fear',
        context: 'Explored together when contemplating vulnerability, intimacy, and apprehension.',
      },
      {
        targetSymbolId: 'mirror',
        targetSymbolName: 'Mirror',
        query: 'Mirror',
        context: 'Connects external interpersonal affection with self-acceptance and self-image.',
      },
    ],
  },

  fear: {
    symbolId: 'fear',
    symbolName: 'Fear',
    suggestions: [
      {
        targetSymbolId: 'falling',
        targetSymbolName: 'Falling',
        query: 'Falling',
        context: 'Frequently searched together in sudden awakening dreams and loss-of-control motifs.',
      },
      {
        targetSymbolId: 'wolf',
        targetSymbolName: 'Wolf',
        query: 'Wolf',
        context: 'Commonly paired when dreams involve pursuit, alarm, or confrontation.',
      },
      {
        targetSymbolId: 'water',
        targetSymbolName: 'Water',
        query: 'Water',
        context: 'Explored together when navigating stormy seas or turbulent floods.',
      },
    ],
  },
};

/**
 * Get related search suggestions for a given dictionary symbol ID.
 */
export function getRelatedSearchesForSymbol(symbolId: string): RelatedSearchSuggestion[] {
  const entry = DICTIONARY_RELATED_SEARCHES[symbolId.toLowerCase().trim()];
  return entry ? entry.suggestions : [];
}

/**
 * Get just the target symbol IDs suggested for a given symbol ID.
 */
export function getRelatedSearchIdsForSymbol(symbolId: string): string[] {
  const suggestions = getRelatedSearchesForSymbol(symbolId);
  return suggestions.map(s => s.targetSymbolId);
}

/**
 * Return all related searches entries across all symbols.
 */
export function getAllRelatedSearches(): SymbolRelatedSearches[] {
  return Object.values(DICTIONARY_RELATED_SEARCHES);
}

/**
 * Check whether a symbol ID has related searches defined.
 */
export function hasRelatedSearchesForSymbol(symbolId: string): boolean {
  return Boolean(DICTIONARY_RELATED_SEARCHES[symbolId.toLowerCase().trim()]);
}

/**
 * Find all symbols that include a particular target symbol in their related searches.
 */
export function getSymbolsReferencingTarget(targetSymbolId: string): string[] {
  const normalized = targetSymbolId.toLowerCase().trim();
  return Object.values(DICTIONARY_RELATED_SEARCHES)
    .filter(entry => entry.suggestions.some(s => s.targetSymbolId === normalized))
    .map(entry => entry.symbolId);
}
