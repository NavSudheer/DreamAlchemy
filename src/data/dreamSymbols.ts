import { DreamSymbol } from "../types/dictionary";

/**
 * Storage key for recently viewed symbols
 */
const RECENTLY_VIEWED_KEY = 'recently_viewed_symbols';

/**
 * Maximum number of recently viewed symbols to store
 */
const MAX_RECENT_SYMBOLS = 10;

/**
 * Complete dataset of dream symbols, categorized
 */
export const DREAM_SYMBOLS: DreamSymbol[] = [
  // Animals
  {
    id: 'wolf',
    name: 'Wolf',
    description: 'Wolves in dreams often symbolize instinct, intelligence, freedom, and social connections.',
    category: 'animals',
    meanings: [
      'Primal instincts and raw emotions',
      'Leadership and guidance',
      'Loyalty to family or social groups',
      'Independence and freedom',
      'Fear of being threatened or pursued'
    ],
    relatedSymbols: ['dog', 'forest', 'moon'],
    examples: [
      'Being chased by a wolf might represent running from your own instincts or fears',
      'Becoming a wolf could symbolize embracing your wild nature',
      'A friendly wolf may represent a helpful guide or protector'
    ],
    history: 'Wolves have featured prominently in mythology across many cultures, often representing both danger and wisdom. In Roman mythology, Romulus and Remus were raised by a wolf, while Norse mythology features Fenrir, a monstrous wolf.',
    popularity: 85
  },
  {
    id: 'bird',
    name: 'Bird',
    description: 'Birds often represent freedom, perspective, and spiritual aspirations in dreams.',
    category: 'animals',
    meanings: [
      'Freedom and liberation',
      'Higher perspective or spiritual insight',
      'Messages from the unconscious',
      'Desire to escape limitations',
      'Soul or spiritual journey'
    ],
    relatedSymbols: ['flying', 'sky', 'feather'],
    examples: [
      'Flying with birds may represent freedom and transcendence',
      'A caged bird might symbolize feeling trapped or restricted',
      'A talking bird could be delivering an important message from your unconscious'
    ],
    popularity: 78
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Snakes in dreams often symbolize transformation, healing, wisdom, or hidden fears.',
    category: 'animals',
    meanings: [
      'Transformation and renewal',
      'Hidden wisdom or knowledge',
      'Healing and medicine',
      'Sexual energy or desire',
      'Deception or hidden threats'
    ],
    relatedSymbols: ['water', 'garden', 'transformation'],
    examples: [
      'A snake shedding its skin might represent personal transformation',
      'Being bitten by a snake could symbolize a sudden insight or awakening',
      'A coiled snake might represent potential energy or kundalini awakening'
    ],
    history: 'Snakes appear in many cultural and religious contexts, from the serpent in the Garden of Eden to the ouroboros (snake eating its tail) symbolizing eternity and the cycle of life and death.',
    popularity: 92
  },
  {
    id: 'cat',
    name: 'Cat',
    description: 'Cats in dreams often symbolize independence, mystery, intuition, and feminine energy.',
    category: 'animals',
    meanings: [
      'Independence and self-sufficiency',
      'Intuition and psychic abilities',
      'Mystery and the unknown',
      'Feminine energy and grace',
      'Patience and careful observation'
    ],
    relatedSymbols: ['night', 'moon', 'shadow'],
    examples: [
      'A friendly cat may represent your intuitive side',
      'Being scratched by a cat might symbolize fears about feminine power',
      'A black cat could represent mystery or perceived bad luck'
    ],
    popularity: 73
  },
  {
    id: 'horse',
    name: 'Horse',
    description: 'Horses in dreams often symbolize personal power, freedom, and the ability to overcome obstacles.',
    category: 'animals',
    meanings: [
      'Personal freedom and mobility',
      'Natural power and vitality',
      'Sexual energy and passion',
      'Nobility and grace',
      'The journey of life'
    ],
    relatedSymbols: ['journey', 'speed', 'strength'],
    examples: [
      'Riding a horse might represent taking control of your own power',
      'A wild horse could symbolize untamed aspects of yourself',
      'A horse race may represent competition or striving towards goals'
    ],
    popularity: 68
  },
  
  // People
  {
    id: 'child',
    name: 'Child',
    description: 'Children in dreams often symbolize innocence, new beginnings, vulnerability, or undeveloped aspects of oneself.',
    category: 'people',
    meanings: [
      'Innocence and purity',
      'New beginnings or potential',
      'Vulnerability and need for protection',
      'Undeveloped aspects of yourself',
      'Past memories or regression'
    ],
    relatedSymbols: ['birth', 'play', 'school'],
    examples: [
      'Finding a child might represent discovering a new part of yourself',
      'A lost child could symbolize neglected aspects of your personality',
      'Playing with children may represent reconnecting with simple joys'
    ],
    popularity: 81
  },
  {
    id: 'stranger',
    name: 'Stranger',
    description: 'Strangers in dreams often represent unknown aspects of yourself or unacknowledged feelings.',
    category: 'people',
    meanings: [
      'Unknown aspects of yourself',
      'Unacknowledged qualities or emotions',
      'External influences in your life',
      'Fear of the unknown',
      'New opportunities or relationships'
    ],
    relatedSymbols: ['mask', 'mirror', 'door'],
    examples: [
      'A threatening stranger might represent a feared aspect of yourself',
      'A helpful stranger could symbolize unexpected resources',
      'Talking to a stranger might represent openness to new experiences'
    ],
    popularity: 65
  },
  {
    id: 'teacher',
    name: 'Teacher or Mentor',
    description: 'Teachers or mentors in dreams often symbolize guidance, wisdom, and personal growth.',
    category: 'people',
    meanings: [
      'Inner wisdom and guidance',
      'Need for direction in life',
      'Authority figures and their influence',
      'Learning and personal development',
      'Spiritual or emotional growth'
    ],
    relatedSymbols: ['book', 'classroom', 'path'],
    examples: [
      'A teacher giving advice might represent your inner wisdom',
      'Being tested by a teacher could symbolize life challenges',
      'Searching for a teacher may represent seeking direction or purpose'
    ],
    popularity: 57
  },
  
  // Places
  {
    id: 'house',
    name: 'House',
    description: 'Houses in dreams often symbolize the self, with different rooms representing different aspects of your personality or life.',
    category: 'places',
    meanings: [
      'Different aspects of yourself and personality',
      'Your mental, emotional, or spiritual state',
      'Comfort, security, and shelter',
      'Family relationships and history',
      'Different phases in your life'
    ],
    relatedSymbols: ['door', 'room', 'basement'],
    examples: [
      'An abandoned house might represent neglected aspects of yourself',
      'A childhood home could relate to past memories or influences',
      'Finding new rooms might symbolize discovering new talents or aspects of your personality'
    ],
    history: 'The house as a symbol of the self dates back to ancient dream interpretation traditions and was elaborated upon by Carl Jung in his work on dream analysis.',
    popularity: 90
  },
  {
    id: 'water',
    name: 'Water',
    description: 'Water in dreams often symbolizes emotions, the unconscious mind, purification, and life force.',
    category: 'nature',
    meanings: [
      'Emotions and the unconscious mind',
      'Purification and cleansing',
      'Life, fertility, and renewal',
      'Intuition and spiritual insight',
      'Transitions and change'
    ],
    relatedSymbols: ['ocean', 'river', 'rain'],
    examples: [
      'Calm water might represent emotional peace',
      'Turbulent or stormy water could symbolize emotional turmoil',
      'Drowning may represent feeling overwhelmed by emotions'
    ],
    history: 'Water has been a powerful symbol across many religions and mythologies, often representing primordial creation (as in Genesis) or purification (as in baptism).',
    popularity: 95
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Forests in dreams often symbolize the unknown, unconscious mind, life transitions, and mystery.',
    category: 'places',
    meanings: [
      'The unknown or unexplored parts of yourself',
      'Life transitions and challenges',
      'Feeling lost or confused',
      'Primitive instincts and intuition',
      'Mystery and wonder'
    ],
    relatedSymbols: ['tree', 'animals', 'path'],
    examples: [
      'Being lost in a forest might represent confusion or uncertainty',
      'Finding a path through a forest could symbolize navigating life challenges',
      'A dark forest may represent fear of the unknown or unexplored emotions'
    ],
    popularity: 82
  },
  
  // Objects
  {
    id: 'key',
    name: 'Key',
    description: 'Keys in dreams often symbolize access, opportunities, answers, and solutions to problems.',
    category: 'objects',
    meanings: [
      'Access to new opportunities or knowledge',
      'Solutions to problems',
      'Unlocking hidden aspects of yourself',
      'Power and authority',
      'Transitions between life phases'
    ],
    relatedSymbols: ['door', 'lock', 'treasure'],
    examples: [
      'Finding a key might represent discovering a solution',
      'Losing a key could symbolize missed opportunities',
      'A golden key may represent especially valuable insight or opportunity'
    ],
    popularity: 71
  },
  {
    id: 'mirror',
    name: 'Mirror',
    description: 'Mirrors in dreams often symbolize self-reflection, truth, and identity.',
    category: 'objects',
    meanings: [
      'Self-reflection and self-awareness',
      'Truth and reality versus illusion',
      'Identity and self-image',
      'Vanity or concern with appearance',
      'Reflection of inner feelings and thoughts'
    ],
    relatedSymbols: ['reflection', 'glass', 'face'],
    examples: [
      'A broken mirror might represent a distorted self-image',
      'Looking into a mirror and seeing someone else could symbolize hidden aspects of yourself',
      'Being unable to see your reflection may represent identity issues'
    ],
    history: 'Mirrors have been viewed as magical or mystical objects throughout history, from the mirror in Snow White to the Mirror of Erised in Harry Potter, often revealing truth or desire.',
    popularity: 76
  },
  
  // Actions
  {
    id: 'flying',
    name: 'Flying',
    description: 'Flying in dreams often symbolizes freedom, transcendence, perspective, and escaping limitations.',
    category: 'actions',
    meanings: [
      'Freedom and liberation',
      'Transcending limitations',
      'Gaining new perspective',
      'Spiritual ascension',
      'Confidence and empowerment'
    ],
    relatedSymbols: ['bird', 'sky', 'falling'],
    examples: [
      'Flying effortlessly might represent success and confidence',
      'Struggling to stay airborne could symbolize obstacles or insecurities',
      'Flying over familiar places may represent gaining perspective on your life'
    ],
    popularity: 88
  },
  {
    id: 'falling',
    name: 'Falling',
    description: 'Falling in dreams often symbolizes insecurity, loss of control, fear of failure, or letting go.',
    category: 'actions',
    meanings: [
      'Fear of failure or loss of control',
      'Insecurity or anxiety',
      'Surrendering to a situation',
      'Major life transitions',
      'Release of tension'
    ],
    relatedSymbols: ['cliff', 'flying', 'height'],
    examples: [
      'Falling without landing may represent ongoing anxiety',
      'Falling and then flying could symbolize overcoming fears',
      'Falling into water might represent plunging into emotions'
    ],
    popularity: 87
  },
  
  // Emotions
  {
    id: 'love',
    name: 'Love',
    description: 'Love in dreams often symbolizes connection, integration of self, fulfillment, and wholeness.',
    category: 'emotions',
    meanings: [
      'Desire for connection and intimacy',
      'Self-acceptance and self-love',
      'Integration of different aspects of yourself',
      'Spiritual fulfillment and divine love',
      'Creative inspiration and passion'
    ],
    relatedSymbols: ['heart', 'wedding', 'embrace'],
    examples: [
      'Falling in love might represent discovering a new aspect of yourself',
      'Being loved unconditionally could symbolize self-acceptance',
      'Losing someone you love may represent fear of abandonment'
    ],
    popularity: 86
  },
  {
    id: 'fear',
    name: 'Fear',
    description: 'Fear in dreams often highlights anxieties, challenges to overcome, or growth opportunities.',
    category: 'emotions',
    meanings: [
      'Warning about real-life dangers',
      'Resistance to change or growth',
      'Unresolved trauma or anxiety',
      'Challenge to face or overcome',
      'Shadow aspects of personality'
    ],
    relatedSymbols: ['darkness', 'monster', 'chase'],
    examples: [
      'Being paralyzed with fear might represent feeling stuck in life',
      'Overcoming a fearful situation could symbolize personal growth',
      'Specific fears may relate directly to waking life concerns'
    ],
    popularity: 84
  }
];

/**
 * Global storage for recently viewed symbols (mimics persistence)
 */
let recentlyViewedSymbols: string[] = [];

/**
 * Get symbols by category
 */
export function getSymbolsByCategory(category: string): DreamSymbol[] {
  return DREAM_SYMBOLS.filter(symbol => symbol.category === category);
}

/**
 * Search symbols by name, description, or meanings
 */
export function searchSymbols(query: string): DreamSymbol[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }
  
  return DREAM_SYMBOLS.filter(symbol => {
    // Search in name
    if (symbol.name.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in description
    if (symbol.description.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in meanings
    if (symbol.meanings.some(meaning => 
      meaning.toLowerCase().includes(searchTerm)
    )) {
      return true;
    }
    
    return false;
  });
}

/**
 * Get a symbol by ID
 */
export function getSymbolById(id: string | null | undefined): DreamSymbol | null {
  if (!id) {
    return null;
  }
  
  const symbol = DREAM_SYMBOLS.find(symbol => symbol.id === id);
  
  // Add to recently viewed if found
  if (symbol) {
    addToRecentlyViewed(symbol.id);
  }
  
  return symbol || null;
}

/**
 * Get related symbols based on a symbol ID
 */
export function getRelatedSymbols(symbolId: string): DreamSymbol[] {
  const symbol = getSymbolById(symbolId);
  
  if (!symbol || !symbol.relatedSymbols || symbol.relatedSymbols.length === 0) {
    // If no related symbols defined, return symbols from the same category
    return DREAM_SYMBOLS.filter(s => 
      s.id !== symbolId && s.category === symbol?.category
    ).slice(0, 3);
  }
  
  return symbol.relatedSymbols
    .map(relatedId => getSymbolById(relatedId))
    .filter((s): s is DreamSymbol => s !== null);
}

/**
 * Add a symbol to recently viewed
 */
function addToRecentlyViewed(symbolId: string): void {
  // Remove if already exists to avoid duplicates
  recentlyViewedSymbols = recentlyViewedSymbols.filter(id => id !== symbolId);
  
  // Add to the beginning of the array
  recentlyViewedSymbols.unshift(symbolId);
  
  // Limit the number of items
  if (recentlyViewedSymbols.length > MAX_RECENT_SYMBOLS) {
    recentlyViewedSymbols = recentlyViewedSymbols.slice(0, MAX_RECENT_SYMBOLS);
  }
  
  // In a real app, this would save to AsyncStorage
  // AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewedSymbols));
}

/**
 * Get recently viewed symbols
 */
export function getRecentlyViewedSymbols(): DreamSymbol[] {
  // In a real app, this would load from AsyncStorage
  // const stored = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
  // recentlyViewedSymbols = stored ? JSON.parse(stored) : [];
  
  return recentlyViewedSymbols
    .map(id => getSymbolById(id))
    .filter((s): s is DreamSymbol => s !== null);
} 