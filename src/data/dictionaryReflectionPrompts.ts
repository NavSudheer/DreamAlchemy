/**
 * Dictionary Reflection Prompts
 *
 * A typed, content-only set of concise, exploratory reflection prompts for every
 * existing dream dictionary symbol ID.
 *
 * Designed to encourage open-ended contemplation, personal metaphor discovery,
 * and mindful curiosity without diagnostic, predictive, or medical claims.
 */

export interface DictionaryReflectionPrompt {
  id: string;
  symbolId: string;
  symbolName: string;
  theme: string;
  question: string;
  considerThis: string;
}

export interface SymbolReflectionEntry {
  symbolId: string;
  symbolName: string;
  prompts: DictionaryReflectionPrompt[];
}

export const DICTIONARY_REFLECTION_PROMPTS: DictionaryReflectionPrompt[] = [
  // --- Animals ---
  {
    id: 'dict-refl-wolf-1',
    symbolId: 'wolf',
    symbolName: 'Wolf',
    theme: 'Instinct & Wildness',
    question: 'How did the wolf interact with you or your surroundings in the dream?',
    considerThis: 'Notice whether the encounter felt adversarial, protective, or quietly observant, and what that might reflect about your relationship with your gut instincts.',
  },
  {
    id: 'dict-refl-wolf-2',
    symbolId: 'wolf',
    symbolName: 'Wolf',
    theme: 'Solitude & Community',
    question: 'Was the wolf solitary or moving within a pack?',
    considerThis: 'Reflect on where you currently feel self-reliant versus where you desire or need the support of a trusted circle.',
  },

  {
    id: 'dict-refl-bird-1',
    symbolId: 'bird',
    symbolName: 'Bird',
    theme: 'Perspective & Elevation',
    question: 'From what vantage point did you observe the bird, or were you the one taking flight?',
    considerThis: 'Consider whether stepping back from immediate details could offer a wider perspective on a current waking dilemma.',
  },
  {
    id: 'dict-refl-bird-2',
    symbolId: 'bird',
    symbolName: 'Bird',
    theme: 'Vocal Expression & Messages',
    question: 'Did the bird sing, call, or act as an emissary in the dream space?',
    considerThis: 'Reflect on any unspoken thoughts or creative ideas seeking an outlet in your daily routine.',
  },

  {
    id: 'dict-refl-snake-1',
    symbolId: 'snake',
    symbolName: 'Snake',
    theme: 'Transformation & Shedding',
    question: 'What state was the snake in—coiled, moving, shedding skin, or dormant?',
    considerThis: 'Think about habits, assumptions, or outdated chapters in your life that may be ready to be shed naturally.',
  },
  {
    id: 'dict-refl-snake-2',
    symbolId: 'snake',
    symbolName: 'Snake',
    theme: 'Caution & Wisdom',
    question: 'Did encountering the snake trigger sudden alarm, or an unexpected stillness and fascination?',
    considerThis: 'Explore whether a situation you initially perceived as risky might actually hold an invitation for deeper discernment.',
  },

  {
    id: 'dict-refl-cat-1',
    symbolId: 'cat',
    symbolName: 'Cat',
    theme: 'Autonomy & Boundaries',
    question: 'How did the cat respond to your presence or attempt to interact?',
    considerThis: 'Notice how comfortable you feel setting firm, calm boundaries in your waking personal interactions.',
  },
  {
    id: 'dict-refl-cat-2',
    symbolId: 'cat',
    symbolName: 'Cat',
    theme: 'Curiosity & Playfulness',
    question: 'Was the cat prowling, sleeping, playing, or observing from hidden shadows?',
    considerThis: 'Consider where bringing relaxed curiosity rather than intense urgency could soften current tensions.',
  },

  {
    id: 'dict-refl-horse-1',
    symbolId: 'horse',
    symbolName: 'Horse',
    theme: 'Vitality & Drive',
    question: 'Was the horse running freely, tethered, or ridden under clear control?',
    considerThis: 'Reflect on how your natural drive and daily energy are currently channeled—whether feeling restrained, runaway, or in healthy cadence.',
  },
  {
    id: 'dict-refl-horse-2',
    symbolId: 'horse',
    symbolName: 'Horse',
    theme: 'Partnership & Trust',
    question: 'What kind of rapport or communication existed between you and the horse?',
    considerThis: 'Consider where trusting your instincts and momentum might serve you better than over-analyzing next steps.',
  },

  // --- People ---
  {
    id: 'dict-refl-child-1',
    symbolId: 'child',
    symbolName: 'Child',
    theme: 'Vulnerability & Wonder',
    question: 'Was the child familiar, a younger version of yourself, or a symbolic stranger?',
    considerThis: 'Reflect on what innocent curiosities, playfulness, or vulnerable emotions might be asking for gentle care.',
  },
  {
    id: 'dict-refl-child-2',
    symbolId: 'child',
    symbolName: 'Child',
    theme: 'Responsibility & Nurturing',
    question: 'Were you protecting, guiding, searching for, or learning from the child?',
    considerThis: 'Notice where in waking life you are being called to offer patience and compassionate stewardship to new beginnings.',
  },

  {
    id: 'dict-refl-stranger-1',
    symbolId: 'stranger',
    symbolName: 'Stranger',
    theme: 'Unfamiliar Qualities',
    question: 'What memorable trait or disposition did the stranger carry—warmth, menace, wisdom, or aloofness?',
    considerThis: 'In analytical psychology, unknown figures often reflect qualities in ourselves that we have not yet fully acknowledged or integrated.',
  },
  {
    id: 'dict-refl-stranger-2',
    symbolId: 'stranger',
    symbolName: 'Stranger',
    theme: 'Encounter & Response',
    question: 'How did you communicate with or react to the stranger\'s unexpected presence?',
    considerThis: 'Explore how you typically meet unexpected changes or novel perspectives when they arrive in your day.',
  },

  {
    id: 'dict-refl-teacher-1',
    symbolId: 'teacher',
    symbolName: 'Teacher',
    theme: 'Guidance & Authority',
    question: 'What kind of lesson, feedback, or unspoken task did the teacher impart?',
    considerThis: 'Consider whose guidance you currently value most—an external mentor, societal norms, or your own inner wisdom.',
  },
  {
    id: 'dict-refl-teacher-2',
    symbolId: 'teacher',
    symbolName: 'Teacher',
    theme: 'Readiness to Learn',
    question: 'Did you feel receptive, challenged, or evaluated during the encounter?',
    considerThis: 'Reflect on an area of your waking life where you might benefit from stepping into the role of a patient student.',
  },

  // --- Places ---
  {
    id: 'dict-refl-house-1',
    symbolId: 'house',
    symbolName: 'House',
    theme: 'Rooms & Psyche',
    question: 'Which room or level of the house were you exploring—an attic, cellar, living space, or undiscovered chamber?',
    considerThis: 'In dream psychology, attics often relate to conscious thoughts and ideals, while basements reflect hidden memories and foundations.',
  },
  {
    id: 'dict-refl-house-2',
    symbolId: 'house',
    symbolName: 'House',
    theme: 'Condition & Shelter',
    question: 'Was the house sturdy and inviting, cluttered and decaying, or under renovation?',
    considerThis: 'Notice what the atmosphere of the house might say about your overall emotional sanctuary and mental living space.',
  },

  {
    id: 'dict-refl-water-1',
    symbolId: 'water',
    symbolName: 'Water',
    theme: 'Clarity & Movement',
    question: 'Was the water calm and glassy, turbulent and rushing, deep and murky, or refreshingly clear?',
    considerThis: 'Water often mirrors the fluid nature of emotional states—notice what current feelings match the water\'s texture.',
  },
  {
    id: 'dict-refl-water-2',
    symbolId: 'water',
    symbolName: 'Water',
    theme: 'Immersion & Relationship',
    question: 'Were you drinking, swimming, observing from shore, or feeling overwhelmed by a tide?',
    considerThis: 'Reflect on whether you feel safely immersed in your current emotional experiences or observing them from a cautious distance.',
  },

  {
    id: 'dict-refl-forest-1',
    symbolId: 'forest',
    symbolName: 'Forest',
    theme: 'Path & Unknown',
    question: 'Were you navigating a clear trail, wandering through dense thickets, or resting under a canopy?',
    considerThis: 'Consider how comfortable you feel when stepping into life seasons where the next steps are not yet fully visible.',
  },
  {
    id: 'dict-refl-forest-2',
    symbolId: 'forest',
    symbolName: 'Forest',
    theme: 'Ecosystem & Atmosphere',
    question: 'Did the forest feel quiet and sanctuary-like, or overgrown and intimidating?',
    considerThis: 'Reflect on what quiet solitude in nature or withdrawal from outer noise provides for your mental clarity.',
  },

  // --- Objects ---
  {
    id: 'dict-refl-key-1',
    symbolId: 'key',
    symbolName: 'Key',
    theme: 'Access & Opportunity',
    question: 'Were you holding the key, seeking it, or attempting to unlock a specific door or box?',
    considerThis: 'Reflect on what new opportunity, insight, or boundary you are hoping to open in your current projects or relationships.',
  },
  {
    id: 'dict-refl-key-2',
    symbolId: 'key',
    symbolName: 'Key',
    theme: 'Responsibility & Readiness',
    question: 'Did the key fit effortlessly, or did it feel heavy, unfamiliar, or misaligned with the lock?',
    considerThis: 'Consider whether you feel genuinely ready to step through a threshold that lies before you.',
  },

  {
    id: 'dict-refl-mirror-1',
    symbolId: 'mirror',
    symbolName: 'Mirror',
    theme: 'Self-Perception & Truth',
    question: 'What did the reflection reveal—your familiar face, an altered appearance, or unexpected surroundings?',
    considerThis: 'Notice any discrepancies between how you wish to be perceived by others and who you authentically feel yourself to be.',
  },
  {
    id: 'dict-refl-mirror-2',
    symbolId: 'mirror',
    symbolName: 'Mirror',
    theme: 'Clarity & Distortion',
    question: 'Was the surface pristine, dusty, cracked, or misty?',
    considerThis: 'Reflect on what beliefs or external feedback might be distorting a clear, compassionate view of yourself.',
  },

  // --- Actions ---
  {
    id: 'dict-refl-flying-1',
    symbolId: 'flying',
    symbolName: 'Flying',
    theme: 'Effort & Propulsion',
    question: 'Did flight require continuous effort (flapping, jumping) or was it effortless soaring and gliding?',
    considerThis: 'Notice where in waking life you are striving with great exertion versus where you can allow natural momentum to carry you.',
  },
  {
    id: 'dict-refl-flying-2',
    symbolId: 'flying',
    symbolName: 'Flying',
    theme: 'Elevation & Grounding',
    question: 'How high did you travel, and what was your feeling when looking down or preparing to land?',
    considerThis: 'Consider whether you are seeking escape from mundane burdens, or enjoying creative elevation while staying healthily connected to the ground.',
  },

  {
    id: 'dict-refl-falling-1',
    symbolId: 'falling',
    symbolName: 'Falling',
    theme: 'Release of Control',
    question: 'What led up to the sensation of falling—a stumble, a deliberate jump, or a sudden loss of footing?',
    considerThis: 'Falling often reflects the physical sleep transition or waking moments where holding on tightly is no longer sustainable.',
  },
  {
    id: 'dict-refl-falling-2',
    symbolId: 'falling',
    symbolName: 'Falling',
    theme: 'Descent & Surrender',
    question: 'Did the descent inspire sheer panic, an unexpected surrender, or a waking jerk before impact?',
    considerThis: 'Reflect on an outcome or uncertainty in your life where letting go of control might open up unexpected relief.',
  },

  // --- Emotions ---
  {
    id: 'dict-refl-love-1',
    symbolId: 'love',
    symbolName: 'Love',
    theme: 'Connection & Warmth',
    question: 'Toward whom or what was the feeling of love directed—a known person, an abstract presence, or yourself?',
    considerThis: 'Notice how deeply you allow yourself to receive warmth, appreciation, and belonging in your waking relationships.',
  },
  {
    id: 'dict-refl-love-2',
    symbolId: 'love',
    symbolName: 'Love',
    theme: 'Fulfillment & Yearning',
    question: 'Did the feeling feel abundant and reciprocated, or marked by quiet longing and distance?',
    considerThis: 'Reflect on what your deepest emotional desires might be communicating about your current relational needs.',
  },

  {
    id: 'dict-refl-fear-1',
    symbolId: 'fear',
    symbolName: 'Fear',
    theme: 'Signal & Source',
    question: 'What specific trigger or presence brought on the feeling of fear in the dream?',
    considerThis: 'In psychology, fear in dreams often serves as an alarm signal directing attention toward unresolved waking stress or unmet safety needs.',
  },
  {
    id: 'dict-refl-fear-2',
    symbolId: 'fear',
    symbolName: 'Fear',
    theme: 'Physical Grounding & Response',
    question: 'Did you fight, flee, freeze, or attempt to confront what frightened you?',
    considerThis: 'Reflect on how your body instinctively handles sudden tension, and what gentle grounding practices help you restore calm.',
  },
];

/**
 * Grouped dictionary reflection prompts indexed by symbol ID.
 */
export const DICTIONARY_REFLECTION_ENTRIES: Record<string, SymbolReflectionEntry> = DICTIONARY_REFLECTION_PROMPTS.reduce(
  (acc, prompt) => {
    if (!acc[prompt.symbolId]) {
      acc[prompt.symbolId] = {
        symbolId: prompt.symbolId,
        symbolName: prompt.symbolName,
        prompts: [],
      };
    }
    acc[prompt.symbolId].prompts.push(prompt);
    return acc;
  },
  {} as Record<string, SymbolReflectionEntry>
);

/**
 * Get all reflection prompts for a specific dictionary symbol ID.
 */
export function getPromptsBySymbolId(symbolId: string): DictionaryReflectionPrompt[] {
  const entry = DICTIONARY_REFLECTION_ENTRIES[symbolId.toLowerCase().trim()];
  return entry ? entry.prompts : [];
}

/**
 * Get a specific reflection prompt by its unique prompt ID.
 */
export function getPromptById(promptId: string): DictionaryReflectionPrompt | undefined {
  return DICTIONARY_REFLECTION_PROMPTS.find(p => p.id === promptId);
}

/**
 * Get the full reflection entry for a specific dictionary symbol ID.
 */
export function getReflectionEntryBySymbolId(symbolId: string): SymbolReflectionEntry | undefined {
  return DICTIONARY_REFLECTION_ENTRIES[symbolId.toLowerCase().trim()];
}

/**
 * Check whether a dictionary symbol has reflection prompts available.
 */
export function hasPromptsForSymbol(symbolId: string): boolean {
  return Boolean(DICTIONARY_REFLECTION_ENTRIES[symbolId.toLowerCase().trim()]);
}

/**
 * Get all symbol IDs that have reflection prompts.
 */
export function getAllPromptSymbolIds(): string[] {
  return Object.keys(DICTIONARY_REFLECTION_ENTRIES);
}

/**
 * Return all reflection prompts across all symbols.
 */
export function getAllDictionaryPrompts(): DictionaryReflectionPrompt[] {
  return DICTIONARY_REFLECTION_PROMPTS;
}

/**
 * Return all symbol reflection entries.
 */
export function getAllSymbolReflectionEntries(): SymbolReflectionEntry[] {
  return Object.values(DICTIONARY_REFLECTION_ENTRIES);
}
