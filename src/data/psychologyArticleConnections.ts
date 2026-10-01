/**
 * Psychology Article Connections Map
 *
 * A typed, content-only cross-section index linking the four Psychology hub categories
 * (scientific perspectives, psychological theories, dream types, and cultural traditions)
 * to relevant existing dictionary symbols and written technique guides.
 *
 * All references map strictly to current IDs in dreamSymbols.ts and techniques.ts.
 * Educational and exploratory mapping only; no diagnostic or outcome claims.
 */

export type PsychologyCategory = 'scientific' | 'theories' | 'types' | 'cultural';

export interface PsychologyConnectionItem {
  id: string;
  rationale: string;
}

export interface PsychologyCategoryConnections {
  category: PsychologyCategory;
  title: string;
  description: string;
  relatedSymbolIds: string[];
  relatedTechniqueIds: string[];
  symbolConnections: PsychologyConnectionItem[];
  techniqueConnections: PsychologyConnectionItem[];
}

export const PSYCHOLOGY_ARTICLE_CONNECTIONS: Record<PsychologyCategory, PsychologyCategoryConnections> = {
  scientific: {
    category: 'scientific',
    title: 'Scientific Perspectives',
    description: 'Neurobiological mechanisms, sleep architecture, memory consolidation, and sensory gating.',
    relatedSymbolIds: ['falling', 'flying', 'fear', 'water'],
    relatedTechniqueIds: ['2', '6', '8', '5'],
    symbolConnections: [
      {
        id: 'falling',
        rationale: 'Connects to motor inhibition during sleep onset, hypnic jerks, and the neurobiological transition between waking and sleep states.',
      },
      {
        id: 'flying',
        rationale: 'Reflects vestibular activation and altered spatial orientation during neurochemically active REM sleep.',
      },
      {
        id: 'fear',
        rationale: 'Directly linked to heightened amygdala activation and autonomic nervous system arousal during vivid REM dreaming.',
      },
      {
        id: 'water',
        rationale: 'Mirrors emotional salience processing and continuous limbic activation during non-linear sleep mentation.',
      },
    ],
    techniqueConnections: [
      {
        id: '2', // Wake Back to Bed (WBTB)
        rationale: 'Harnesses natural ultradian sleep cycles by timing practice during the late-night period of greatest REM density.',
      },
      {
        id: '6', // SSILD
        rationale: 'Leverages structured sensory cycling across sight, sound, and touch to gently cultivate neurocognitive focus upon nighttime waking.',
      },
      {
        id: '8', // Morning Recall Routine
        rationale: 'Protects fragile hippocampal memory traces by minimizing motor movement and waking sensory interference immediately upon waking.',
      },
      {
        id: '5', // WILD
        rationale: 'Explores the hypnagogic threshold and neurobiological transition directly from wakefulness into REM imagery.',
      },
    ],
  },

  theories: {
    category: 'theories',
    title: 'Psychological Theories',
    description: 'Freudian psychoanalysis, Jungian analytical archetypes, cognitive continuity, and activation-synthesis models.',
    relatedSymbolIds: ['stranger', 'mirror', 'house', 'child'],
    relatedTechniqueIds: ['3', '7', '4', '1'],
    symbolConnections: [
      {
        id: 'stranger',
        rationale: 'Archetypal embodiment of the Jungian Shadow or unintegrated personal unconscious self-aspects.',
      },
      {
        id: 'mirror',
        rationale: 'Reflects conscious identity appraisal, confronting the persona, and distinguishing manifest self-image from latent truth.',
      },
      {
        id: 'house',
        rationale: 'Classic psychoanalytic and Jungian architectural metaphor representing the multi-layered layout of the human psyche.',
      },
      {
        id: 'child',
        rationale: 'Embodies the puer aeternus archetype of potential, innocence, and creative renewal.',
      },
    ],
    techniqueConnections: [
      {
        id: '3', // Dream Journaling
        rationale: 'The foundational empirical method for recording manifest dream content to identify underlying psychological themes and personal symbolism.',
      },
      {
        id: '7', // Dream Incubation
        rationale: 'Applies cognitive continuity principles by priming conscious intention before sleep to invite thematic reflection.',
      },
      {
        id: '4', // MILD
        rationale: 'Applies prospective memory theory and cognitive autosuggestion to build mental bridges between waking intentions and dream states.',
      },
      {
        id: '1', // Reality Testing
        rationale: 'Trains daytime metacognitive monitoring and critical awareness, sharpening the observer self across states of consciousness.',
      },
    ],
  },

  types: {
    category: 'types',
    title: 'Dream Types & Phenomena',
    description: 'Lucid dreaming, recurring dreams, nightmares, emotional processing dreams, and parasomnias.',
    relatedSymbolIds: ['flying', 'falling', 'fear', 'wolf'],
    relatedTechniqueIds: ['9', '1', '4', '3'],
    symbolConnections: [
      {
        id: 'flying',
        rationale: 'The quintessential lucid dream experience, representing conscious agency, bodily liberation, and deliberate narrative navigation.',
      },
      {
        id: 'falling',
        rationale: 'A universal motif in recurring stress dreams, reflecting acute vulnerability, loss of control, or emotional surrender.',
      },
      {
        id: 'fear',
        rationale: 'The central emotional tone in nightmare mentation and psychological threat processing.',
      },
      {
        id: 'wolf',
        rationale: 'A frequent motif in chase dreams, symbolizing perceived pursuit, confrontation with primal instincts, or unresolved tension.',
      },
    ],
    techniqueConnections: [
      {
        id: '9', // Nightmare Aftercare
        rationale: 'Evidence-conscious somatic grounding, room re-orientation, and daylight rescripting specifically designed for distressing dreams.',
      },
      {
        id: '1', // Reality Testing
        rationale: 'Direct method for recognizing incongruities and triggering spontaneous lucidity within ordinary dream scenes.',
      },
      {
        id: '4', // MILD
        rationale: 'Structured prospective intention technique specifically developed to induce awareness during dream narratives.',
      },
      {
        id: '3', // Dream Journaling
        rationale: 'Essential practice for identifying recurring motifs, tracking dream types over time, and discovering personal dream signs.',
      },
    ],
  },

  cultural: {
    category: 'cultural',
    title: 'Cultural Perspectives',
    description: 'Historical dream temples, indigenous wisdom traditions, classical philosophies, and sacred contemplation.',
    relatedSymbolIds: ['snake', 'bird', 'horse', 'key'],
    relatedTechniqueIds: ['7', '3', '8', '6'],
    symbolConnections: [
      {
        id: 'snake',
        rationale: 'Universal emblem of healing, regeneration, and ancient wisdom across Asclepian, Mesoamerican, and Vedic sacred traditions.',
      },
      {
        id: 'bird',
        rationale: 'Sacred messenger connecting mortal and spiritual worlds in Egyptian (Ba soul), Celtic Otherworld, and Indigenous folklore.',
      },
      {
        id: 'horse',
        rationale: 'Revered in Central Asian wind horse (lungta) cosmology, Celtic travel protector Epona, and solar chariot mythologies.',
      },
      {
        id: 'key',
        rationale: 'Ancient Greco-Roman emblem of threshold guardians (Hecate and Janus) and mystical symbol of unlocking sacred mysteries.',
      },
    ],
    techniqueConnections: [
      {
        id: '7', // Dream Incubation
        rationale: 'Direct descendant of ancient temple sleep (enkoimesis) practiced in Egyptian and Greek Asclepieia healing sanctuaries.',
      },
      {
        id: '3', // Dream Journaling
        rationale: 'Modern continuation of classical dream recording traditions, from ancient papyri to indigenous communal dream sharing.',
      },
      {
        id: '8', // Morning Recall Routine
        rationale: 'Mirrors traditional contemplative morning practices (such as the ru\'ya tradition) emphasizing quiet stillness and honoring dream impressions before daily activity.',
      },
      {
        id: '6', // SSILD
        rationale: 'Reflects contemplative sensory immersion techniques found across mindful meditation traditions, gently resting awareness without striving.',
      },
    ],
  },
};

/**
 * Retrieve the full connections object for a given psychology category
 */
export function getConnectionsByCategory(category: PsychologyCategory): PsychologyCategoryConnections | undefined {
  return PSYCHOLOGY_ARTICLE_CONNECTIONS[category];
}

/**
 * Retrieve the 3-4 related dictionary symbol IDs for a given psychology category
 */
export function getRelatedSymbolIdsForCategory(category: PsychologyCategory): string[] {
  return PSYCHOLOGY_ARTICLE_CONNECTIONS[category]?.relatedSymbolIds ?? [];
}

/**
 * Retrieve the 3-4 related technique IDs for a given psychology category
 */
export function getRelatedTechniqueIdsForCategory(category: PsychologyCategory): string[] {
  return PSYCHOLOGY_ARTICLE_CONNECTIONS[category]?.relatedTechniqueIds ?? [];
}

/**
 * Retrieve all category connections as an array
 */
export function getAllCategoryConnections(): PsychologyCategoryConnections[] {
  return Object.values(PSYCHOLOGY_ARTICLE_CONNECTIONS);
}

/**
 * Reverse lookup: Find all psychology categories that connect to a specific dictionary symbol ID
 */
export function getCategoriesForSymbol(symbolId: string): PsychologyCategory[] {
  return (Object.keys(PSYCHOLOGY_ARTICLE_CONNECTIONS) as PsychologyCategory[]).filter(category =>
    PSYCHOLOGY_ARTICLE_CONNECTIONS[category].relatedSymbolIds.includes(symbolId)
  );
}

/**
 * Reverse lookup: Find all psychology categories that connect to a specific technique ID
 */
export function getCategoriesForTechnique(techniqueId: string): PsychologyCategory[] {
  return (Object.keys(PSYCHOLOGY_ARTICLE_CONNECTIONS) as PsychologyCategory[]).filter(category =>
    PSYCHOLOGY_ARTICLE_CONNECTIONS[category].relatedTechniqueIds.includes(techniqueId)
  );
}
