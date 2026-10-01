/**
 * Psychology Glossary
 *
 * A typed, content-only glossary defining core terminology used across the
 * Psychology screens (scientific perspectives, psychological theories, dream types,
 * and cultural traditions) and their supporting educational materials.
 *
 * Educational and exploratory content only; not diagnostic, predictive, or medical advice.
 */

export type PsychologyCategory = 'scientific' | 'theories' | 'types' | 'cultural';

export interface PsychologyGlossaryTerm {
  id: string;
  term: string;
  category: PsychologyCategory;
  categoryLabel: string;
  definition: string;
  context: string;
  relatedTermIds?: string[];
}

export const PSYCHOLOGY_GLOSSARY_TERMS: PsychologyGlossaryTerm[] = [
  // --- Scientific Perspectives (5 terms) ---
  {
    id: 'rem-sleep',
    term: 'REM Sleep',
    category: 'scientific',
    categoryLabel: 'Scientific Perspectives',
    definition: 'Rapid Eye Movement sleep, an active neurobiological state characterized by rapid ocular saccades, desynchronized cortical EEG, and vivid narrative dreaming.',
    context: 'Occurs in repeating cycles every 90 to 120 minutes across the night, with longer and denser periods concentrated in the early morning hours.',
    relatedTermIds: ['rem-atonia', 'memory-consolidation'],
  },
  {
    id: 'rem-atonia',
    term: 'REM Atonia',
    category: 'scientific',
    categoryLabel: 'Scientific Perspectives',
    definition: 'The temporary, normal paralysis of somatic skeletal muscles during REM sleep, mediated by pontine brainstem inhibition of alpha motor neurons.',
    context: 'Protects the sleeping body by preventing the physical enactment of motor actions experienced within dream narratives.',
    relatedTermIds: ['rem-sleep'],
  },
  {
    id: 'memory-consolidation',
    term: 'Memory Consolidation',
    category: 'scientific',
    categoryLabel: 'Scientific Perspectives',
    definition: 'The neurobiological reactivation process through which transient hippocampal experiences are re-encoded and integrated into neocortical long-term networks during sleep.',
    context: 'Explains why recent waking memories, emotions, and learned skills frequently reappear in transformed dream scenarios.',
    relatedTermIds: ['rem-sleep', 'amygdala'],
  },
  {
    id: 'amygdala',
    term: 'Amygdala',
    category: 'scientific',
    categoryLabel: 'Scientific Perspectives',
    definition: 'An almond-shaped limbic nucleus responsible for emotional processing, fear conditioning, and evaluating threat salience.',
    context: 'Exhibits heightened metabolic activity during REM dreaming, contributing to the vivid emotional intensity often felt in dreams.',
    relatedTermIds: ['memory-consolidation', 'nightmare'],
  },
  {
    id: 'frontal-cortex-deactivation',
    term: 'Frontal Cortex Deactivation',
    category: 'scientific',
    categoryLabel: 'Scientific Perspectives',
    definition: 'The relative attenuation of activity in the dorsolateral prefrontal cortex during REM dreaming compared to waking consciousness.',
    context: 'Accounts for the frequent absence of metacognitive reality checks in ordinary dreams and our routine acceptance of illogical dream events.',
    relatedTermIds: ['rem-sleep', 'lucid-dreaming'],
  },

  // --- Psychological Theories (6 terms) ---
  {
    id: 'manifest-content',
    term: 'Manifest Content',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    definition: 'In psychoanalytic theory, the conscious, literal narrative, storyline, and sensory images as recalled and reported by the dreamer.',
    context: 'Freud distinguished the manifest surface story from the deeper latent content hidden beneath dream distortions.',
    relatedTermIds: ['latent-content'],
  },
  {
    id: 'latent-content',
    term: 'Latent Content',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    definition: 'The underlying psychological meaning, unexpressed emotions, or unconscious motives concealed beneath the manifest dream imagery.',
    context: 'Revealed through open-ended reflection, associative dialogue, and examining emotional undertones rather than rigid codebooks.',
    relatedTermIds: ['manifest-content'],
  },
  {
    id: 'collective-unconscious',
    term: 'Collective Unconscious',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    definition: 'Carl Jung\'s conceptual layer of the unconscious shared universally across humanity, composed of evolutionary instincts and archaic motifs.',
    context: 'Underlies why common symbolic themes, myths, and emotional figures recur independently across geographically isolated cultures.',
    relatedTermIds: ['archetype', 'dream-compensation'],
  },
  {
    id: 'archetype',
    term: 'Archetype',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    definition: 'Universal, primordial symbolic patterns, personifications, and instinctual templates inhabiting the collective unconscious.',
    context: 'Common archetypal figures appearing in dreams include the Shadow (unacknowledged self), Anima/Animus (inner contra-sexual balance), and the Wise Guide.',
    relatedTermIds: ['collective-unconscious'],
  },
  {
    id: 'dream-compensation',
    term: 'Dream Compensation',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    definition: 'The Jungian principle that the unconscious produces dream material to counterbalance one-sided conscious attitudes or ignored daytime feelings.',
    context: 'Suggests dreams serve a self-regulating psychological function, restoring balance between conscious ego positions and broader emotional realities.',
    relatedTermIds: ['collective-unconscious'],
  },
  {
    id: 'activation-synthesis',
    term: 'Activation-Synthesis',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    definition: 'A biological model proposed by J. Allan Hobson and Robert McCarley stating dreams result from the forebrain interpreting spontaneous pontine brainstem signals.',
    context: 'Emphasizes that while initial neural firing during REM may be spontaneous, the conscious narrative constructed from it reflects personal psychology.',
    relatedTermIds: ['rem-sleep'],
  },

  // --- Dream Types & Phenomena (4 terms) ---
  {
    id: 'lucid-dreaming',
    term: 'Lucid Dreaming',
    category: 'types',
    categoryLabel: 'Dream Types & Phenomena',
    definition: 'A hybrid state of consciousness wherein the dreamer attains explicit awareness that they are dreaming while remaining asleep within the dream.',
    context: 'Validated scientifically through voluntary eye-movement signaling in sleep laboratories; can range from passive awareness to active narrative participation.',
    relatedTermIds: ['frontal-cortex-deactivation'],
  },
  {
    id: 'recurring-dreams',
    term: 'Recurring Dreams',
    category: 'types',
    categoryLabel: 'Dream Types & Phenomena',
    definition: 'Dreams that repeat identical or closely related themes, storylines, or emotional scenarios across multiple sleep cycles over weeks, months, or years.',
    context: 'Often highlight persistent life dilemmas, recurring interpersonal stress, or foundational psychological themes awaiting resolution.',
    relatedTermIds: ['nightmare', 'processing-dreams'],
  },
  {
    id: 'nightmare',
    term: 'Nightmare',
    category: 'types',
    categoryLabel: 'Dream Types & Phenomena',
    definition: 'A vivid, emotionally distressing dream that evokes strong autonomic nervous system arousal—such as fear, grief, or panic—often awakening the dreamer.',
    context: 'Distinguished from non-REM sleep terrors by its narrative complexity, full waking orientation, and vivid post-awakening memory recall.',
    relatedTermIds: ['amygdala', 'recurring-dreams'],
  },
  {
    id: 'processing-dreams',
    term: 'Processing Dreams',
    category: 'types',
    categoryLabel: 'Dream Types & Phenomena',
    definition: 'Everyday dreams that digest, reorganize, and integrate ordinary waking activities, conversational residues, and emotional experiences.',
    context: 'Represent the most common nightly dream mentation, supporting daytime emotional regulation and cognitive maintenance.',
    relatedTermIds: ['memory-consolidation'],
  },

  // --- Cultural Perspectives (3 terms) ---
  {
    id: 'dream-incubation',
    term: 'Dream Incubation',
    category: 'cultural',
    categoryLabel: 'Cultural Perspectives',
    definition: 'The ancient practice of sleeping in a designated sacred sanctuary or cultivating a focused intention before sleep to solicit guidance or therapeutic insight.',
    context: 'Central to ancient Egyptian serapeums and Greek Asclepieia healing temples (known as enkoimesis), and adapted into modern bedtime reflective rituals.',
    relatedTermIds: ['latent-content'],
  },
  {
    id: 'ru-ya',
    term: 'Ru\'ya',
    category: 'cultural',
    categoryLabel: 'Cultural Perspectives',
    definition: 'In Islamic dream hermeneutics, a truthful, clear dream perceived as spiritually authentic and distinct from ordinary mental wandering (hulm).',
    context: 'Traditionally recounted quietly upon morning waking and contemplated with discerning elders, emphasizing moral insight and mindfulness.',
    relatedTermIds: ['dream-incubation'],
  },
  {
    id: 'vision-quest',
    term: 'Vision Quest',
    category: 'cultural',
    categoryLabel: 'Cultural Perspectives',
    definition: 'A sacred rite of passage practiced in many Indigenous North American traditions, involving fasting, solitude in nature, and intentional openness to dream revelation.',
    context: 'Viewed as a communal and spiritual communion where animal mentors or natural spirits provide life direction and purpose.',
    relatedTermIds: ['archetype'],
  },
];

/**
 * Category metadata definitions.
 */
export const PSYCHOLOGY_GLOSSARY_CATEGORIES: { id: PsychologyCategory; label: string }[] = [
  { id: 'scientific', label: 'Scientific Perspectives' },
  { id: 'theories', label: 'Psychological Theories' },
  { id: 'types', label: 'Dream Types & Phenomena' },
  { id: 'cultural', label: 'Cultural Perspectives' },
];

/**
 * Get a specific glossary term by ID.
 */
export function getGlossaryTermById(id: string): PsychologyGlossaryTerm | undefined {
  return PSYCHOLOGY_GLOSSARY_TERMS.find(term => term.id === id.toLowerCase().trim());
}

/**
 * Get all glossary terms belonging to a specific Psychology category.
 */
export function getGlossaryTermsByCategory(category: PsychologyCategory): PsychologyGlossaryTerm[] {
  return PSYCHOLOGY_GLOSSARY_TERMS.filter(term => term.category === category);
}

/**
 * Return all glossary terms.
 */
export function getAllGlossaryTerms(): PsychologyGlossaryTerm[] {
  return PSYCHOLOGY_GLOSSARY_TERMS;
}

/**
 * Return all glossary categories.
 */
export function getAllGlossaryCategories(): { id: PsychologyCategory; label: string }[] {
  return PSYCHOLOGY_GLOSSARY_CATEGORIES;
}

/**
 * Search glossary terms by term name, definition, or context.
 */
export function searchGlossaryTerms(query: string): PsychologyGlossaryTerm[] {
  const q = query.toLowerCase().trim();
  if (!q) return PSYCHOLOGY_GLOSSARY_TERMS;
  return PSYCHOLOGY_GLOSSARY_TERMS.filter(term =>
    term.term.toLowerCase().includes(q) ||
    term.definition.toLowerCase().includes(q) ||
    term.context.toLowerCase().includes(q) ||
    term.categoryLabel.toLowerCase().includes(q)
  );
}

/**
 * Retrieve related glossary term objects for a given term ID.
 */
export function getRelatedGlossaryTerms(termId: string): PsychologyGlossaryTerm[] {
  const term = getGlossaryTermById(termId);
  if (!term || !term.relatedTermIds) return [];
  return term.relatedTermIds
    .map(relId => getGlossaryTermById(relId))
    .filter((relTerm): relTerm is PsychologyGlossaryTerm => Boolean(relTerm));
}
