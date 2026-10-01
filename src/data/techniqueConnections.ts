/**
 * Technique Connections Map
 *
 * A typed, content-only cross-section index linking each written dream technique guide
 * to purposeful existing dream dictionary symbols and Psychology hub categories.
 *
 * All references map strictly to current IDs in dreamSymbols.ts, techniques.ts,
 * and psychologyArticleConnections.ts.
 *
 * Educational and exploratory mapping only; contains no diagnostic, medical, or guaranteed claims.
 */

export type PsychologyCategory = 'scientific' | 'theories' | 'types' | 'cultural';

export interface TechniqueConnectionItem {
  id: string;
  rationale: string;
}

export interface TechniqueConnections {
  techniqueId: string;
  techniqueTitle: string;
  relatedSymbolIds: string[];
  relatedCategoryIds: PsychologyCategory[];
  symbolConnections: TechniqueConnectionItem[];
  categoryConnections: TechniqueConnectionItem[];
}

export const TECHNIQUE_CONNECTIONS: Record<string, TechniqueConnections> = {
  // 1: Reality Testing
  '1': {
    techniqueId: '1',
    techniqueTitle: 'Reality Testing',
    relatedSymbolIds: ['mirror', 'flying', 'key'],
    relatedCategoryIds: ['theories', 'types'],
    symbolConnections: [
      {
        id: 'mirror',
        rationale: 'Checking physical reflections is a classic reality testing check; mirrors frequently behave inconsistently in the dream state.',
      },
      {
        id: 'flying',
        rationale: 'Defying gravity is a primary spontaneous catalyst that prompts critical questions about waking versus dream physics.',
      },
      {
        id: 'key',
        rationale: 'Testing whether everyday mechanisms and doors function normally serves as a tangible anchor for critical awareness.',
      },
    ],
    categoryConnections: [
      {
        id: 'theories',
        rationale: 'Trains daytime metacognitive self-monitoring, sharpening the observing ego that distinguishes internal mentation from waking reality.',
      },
      {
        id: 'types',
        rationale: 'A primary daytime catalyst for recognizing dream incongruities and sparking spontaneous lucid awareness.',
      },
    ],
  },

  // 2: Wake Back to Bed (WBTB)
  '2': {
    techniqueId: '2',
    techniqueTitle: 'Wake Back to Bed (WBTB)',
    relatedSymbolIds: ['falling', 'flying', 'water'],
    relatedCategoryIds: ['scientific', 'types'],
    symbolConnections: [
      {
        id: 'falling',
        rationale: 'Relates closely to hypnic sensations, motor relaxation, and the liminal threshold during the return to sleep.',
      },
      {
        id: 'flying',
        rationale: 'Frequently experienced during the elongated, highly active late-morning REM periods targeted by WBTB.',
      },
      {
        id: 'water',
        rationale: 'Mirrors the fluid mental state transitions and deep emotional immersion characteristic of late-cycle REM sleep.',
      },
    ],
    categoryConnections: [
      {
        id: 'scientific',
        rationale: 'Directly leverages ultradian 90-minute sleep cycles and peak late-night circadian REM density.',
      },
      {
        id: 'types',
        rationale: 'Acts as an effective baseline amplifier for both vivid dream mentation and lucid dream induction.',
      },
    ],
  },

  // 3: Dream Journaling
  '3': {
    techniqueId: '3',
    techniqueTitle: 'Dream Journaling',
    relatedSymbolIds: ['house', 'stranger', 'mirror'],
    relatedCategoryIds: ['theories', 'types', 'cultural'],
    symbolConnections: [
      {
        id: 'house',
        rationale: 'The archetypal symbol for the psyche\'s multi-room architecture; recurring rooms often emerge when journaling over time.',
      },
      {
        id: 'stranger',
        rationale: 'Frequent journaled figures who represent shadow aspects, novel perspectives, or unintegrated personality facets.',
      },
      {
        id: 'mirror',
        rationale: 'Embodies the reflective act of recording and observing one\'s inner life across weeks and months.',
      },
    ],
    categoryConnections: [
      {
        id: 'theories',
        rationale: 'The empirical bedrock of psychoanalytic dream interpretation, documenting manifest narrative to illuminate deeper psychological motifs.',
      },
      {
        id: 'types',
        rationale: 'Essential for discovering recurring dream signs, tracking dream themes, and improving narrative recall.',
      },
      {
        id: 'cultural',
        rationale: 'Continues a rich anthropological history of dream recording, from ancient papyri to indigenous communal dream circles.',
      },
    ],
  },

  // 4: Mnemonic Induction of Lucid Dreams (MILD)
  '4': {
    techniqueId: '4',
    techniqueTitle: 'Mnemonic Induction of Lucid Dreams (MILD)',
    relatedSymbolIds: ['flying', 'teacher', 'key'],
    relatedCategoryIds: ['scientific', 'theories', 'types'],
    symbolConnections: [
      {
        id: 'flying',
        rationale: 'A favored target scenario used during MILD pre-sleep prospective memory visualization and rehearsal.',
      },
      {
        id: 'teacher',
        rationale: 'Symbolizes deliberate mental discipline, remembering intentions, and carrying guidance across conscious states.',
      },
      {
        id: 'key',
        rationale: 'Represents unlocking prospective memory cues when a specific dream sign or setting presents itself.',
      },
    ],
    categoryConnections: [
      {
        id: 'scientific',
        rationale: 'Applies cognitive prospective memory mechanisms and hippocampal rehearsals to preserve waking intentions through sleep onset.',
      },
      {
        id: 'theories',
        rationale: 'Demonstrates cognitive continuity by bridging conscious bedtime auto-suggestions directly into subsequent dream content.',
      },
      {
        id: 'types',
        rationale: 'The classic laboratory-validated protocol developed by Stephen LaBerge to cultivate conscious dream recognition.',
      },
    ],
  },

  // 5: Wake Initiated Lucid Dream (WILD)
  '5': {
    techniqueId: '5',
    techniqueTitle: 'Wake Initiated Lucid Dream (WILD)',
    relatedSymbolIds: ['water', 'falling', 'forest'],
    relatedCategoryIds: ['scientific', 'types'],
    symbolConnections: [
      {
        id: 'water',
        rationale: 'Evokes the wave-like somatic and auditory dissolution that accompanies conscious entry into hypnagogia.',
      },
      {
        id: 'falling',
        rationale: 'Parallels the rapid physical sinking sensation often reported as the body enters deep motor atonia.',
      },
      {
        id: 'forest',
        rationale: 'Archetype for crossing a threshold into the untamed unconscious while maintaining clear mental alertness.',
      },
    ],
    categoryConnections: [
      {
        id: 'scientific',
        rationale: 'Directly traverses the hypnagogic threshold, sensory gating downregulation, and transition into sleep onset REM.',
      },
      {
        id: 'types',
        rationale: 'The hallmark direct-entry technique preserving unbroken conscious continuity from wakefulness into the dream scape.',
      },
    ],
  },

  // 6: Senses Initiated Lucid Dream (SSILD)
  '6': {
    techniqueId: '6',
    techniqueTitle: 'Senses Initiated Lucid Dream (SSILD)',
    relatedSymbolIds: ['water', 'bird', 'mirror'],
    relatedCategoryIds: ['scientific', 'cultural'],
    symbolConnections: [
      {
        id: 'water',
        rationale: 'Corresponds to auditory cycling and the gentle, rhythmic auditory focus that quiets restless thinking.',
      },
      {
        id: 'bird',
        rationale: 'Relates to tuned auditory attention—listening for subtle ambient acoustic vibrations in the quiet bedroom.',
      },
      {
        id: 'mirror',
        rationale: 'Mirrors internal visual cycling behind closed eyelids, resting awareness on hypnagogic phosphenes without strain.',
      },
    ],
    categoryConnections: [
      {
        id: 'scientific',
        rationale: 'Rotates attention across vision, hearing, and somatosensory touch to maintain optimal central nervous system vigilance without anxiety.',
      },
      {
        id: 'cultural',
        rationale: 'Parallels ancient contemplative traditions, somatic body-scanning, and non-attached sensory presence.',
      },
    ],
  },

  // 7: Dream Incubation
  '7': {
    techniqueId: '7',
    techniqueTitle: 'Dream Incubation',
    relatedSymbolIds: ['child', 'snake', 'key'],
    relatedCategoryIds: ['cultural', 'theories'],
    symbolConnections: [
      {
        id: 'child',
        rationale: 'Represents creative potential, playful inspiration, and fresh perspectives for incubated questions.',
      },
      {
        id: 'snake',
        rationale: 'Traditional emblem of healing guidance and transformative problem-solving sought during restorative sleep.',
      },
      {
        id: 'key',
        rationale: 'Symbolizes opening locked dilemmas and inviting novel insights through unconscious cognitive recombination.',
      },
    ],
    categoryConnections: [
      {
        id: 'cultural',
        rationale: 'Direct descendant of ancient temple sleep (enkoimesis) practiced in Egyptian and Greek Asclepieia healing sanctuaries.',
      },
      {
        id: 'theories',
        rationale: 'Draws upon cognitive continuity and the subconscious mind\'s capacity to reorganize daytime dilemmas away from rigid logical filters.',
      },
    ],
  },

  // 8: Morning Recall Routine
  '8': {
    techniqueId: '8',
    techniqueTitle: 'Morning Recall Routine',
    relatedSymbolIds: ['water', 'house', 'bird'],
    relatedCategoryIds: ['scientific', 'cultural'],
    symbolConnections: [
      {
        id: 'water',
        rationale: 'Captures the fragile, evaporating quality of dream imagery upon waking and the gentle stillness required to preserve it.',
      },
      {
        id: 'house',
        rationale: 'Reverse backtracking through remembered rooms and settings to trace narrative steps backwards from the waking moment.',
      },
      {
        id: 'bird',
        rationale: 'Metaphor for fleeing dream fragments taking flight if bodily movement or sensory distraction happens too quickly.',
      },
    ],
    categoryConnections: [
      {
        id: 'scientific',
        rationale: 'Protects delicate short-term memory traces in the hippocampus by avoiding sensory overload and motor activation upon waking.',
      },
      {
        id: 'cultural',
        rationale: 'Honors traditional morning stillness and contemplative practices that grant space for dream insights before entering worldly activity.',
      },
    ],
  },

  // 9: Nightmare Aftercare
  '9': {
    techniqueId: '9',
    techniqueTitle: 'Nightmare Aftercare',
    relatedSymbolIds: ['fear', 'wolf', 'house'],
    relatedCategoryIds: ['types', 'scientific'],
    symbolConnections: [
      {
        id: 'fear',
        rationale: 'The primary emotional distress signal addressed by grounding, breath downregulation, and compassionate aftercare.',
      },
      {
        id: 'wolf',
        rationale: 'Frequent antagonist in pursuit or threat dreams, representing primal activation that requires safe physical grounding.',
      },
      {
        id: 'house',
        rationale: 'Grounding attention back into the safe physical room, bed, and sheltering environment immediately upon awakening.',
      },
    ],
    categoryConnections: [
      {
        id: 'types',
        rationale: 'Tailored specifically for navigating nightmare distress, hypnopompic confusion, and emotionally intense dream narratives.',
      },
      {
        id: 'scientific',
        rationale: 'Utilizes parasympathetic downregulating breath and somatic sensory anchoring (5-4-3-2-1) to reduce acute autonomic arousal.',
      },
    ],
  },
};

/**
 * Get connection mappings for a specific technique ID.
 */
export function getTechniqueConnections(techniqueId: string): TechniqueConnections | undefined {
  return TECHNIQUE_CONNECTIONS[techniqueId.trim()];
}

/**
 * Get related dictionary symbol IDs for a specific technique ID.
 */
export function getRelatedSymbolIdsForTechnique(techniqueId: string): string[] {
  const conn = TECHNIQUE_CONNECTIONS[techniqueId.trim()];
  return conn ? conn.relatedSymbolIds : [];
}

/**
 * Get related Psychology category IDs for a specific technique ID.
 */
export function getRelatedCategoryIdsForTechnique(techniqueId: string): PsychologyCategory[] {
  const conn = TECHNIQUE_CONNECTIONS[techniqueId.trim()];
  return conn ? conn.relatedCategoryIds : [];
}

/**
 * Return all technique connection records.
 */
export function getAllTechniqueConnections(): TechniqueConnections[] {
  return Object.values(TECHNIQUE_CONNECTIONS);
}

/**
 * Find all technique IDs associated with a given dictionary symbol ID.
 */
export function getTechniquesForSymbol(symbolId: string): string[] {
  const normalized = symbolId.toLowerCase().trim();
  return Object.values(TECHNIQUE_CONNECTIONS)
    .filter(conn => conn.relatedSymbolIds.includes(normalized))
    .map(conn => conn.techniqueId);
}

/**
 * Find all technique IDs associated with a given Psychology category ID.
 */
export function getTechniquesForCategory(categoryId: PsychologyCategory): string[] {
  return Object.values(TECHNIQUE_CONNECTIONS)
    .filter(conn => conn.relatedCategoryIds.includes(categoryId))
    .map(conn => conn.techniqueId);
}

/**
 * Check whether a technique has defined connections.
 */
export function hasTechniqueConnections(techniqueId: string): boolean {
  return Boolean(TECHNIQUE_CONNECTIONS[techniqueId.trim()]);
}
