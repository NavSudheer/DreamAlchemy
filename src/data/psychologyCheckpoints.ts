/**
 * Psychology Checkpoints Question Bank
 *
 * Content-only question bank for future Psychology knowledge checks and self-quizzes
 * across scientific foundations, psychological theories, dream types, and cultural traditions.
 */

export type PsychologyCategory = 'science' | 'theories' | 'dream-types' | 'culture';

export interface CheckpointOption {
  id: string;
  text: string;
}

export interface CheckpointQuestion {
  id: string;
  category: PsychologyCategory;
  question: string;
  options: CheckpointOption[];
  correctOptionId: string;
  explanation: string;
}

export interface PsychologyCheckpointSection {
  id: PsychologyCategory;
  title: string;
  description: string;
  questions: CheckpointQuestion[];
}

export const PSYCHOLOGY_CHECKPOINTS: CheckpointQuestion[] = [
  // --- Science & Neuroscience ---
  {
    id: 'sci-1',
    category: 'science',
    question: 'During which stage of sleep do the most vivid, emotionally intense, and narrative dreams primarily occur?',
    options: [
      { id: 'a', text: 'Deep slow-wave sleep (NREM Stage 3)' },
      { id: 'b', text: 'REM (Rapid Eye Movement) sleep' },
      { id: 'c', text: 'Light transitional sleep (NREM Stage 1)' },
      { id: 'd', text: 'Transitional hypnagogia only' },
    ],
    correctOptionId: 'b',
    explanation: 'Most vivid, narrative, and emotionally charged dreams occur during REM sleep, when cerebral glucose metabolism and neural activity closely resemble waking states, though quieter thought-like mentation can also happen during NREM.',
  },
  {
    id: 'sci-2',
    category: 'science',
    question: 'What is the primary role of the amygdala during dream formation in REM sleep?',
    options: [
      { id: 'a', text: 'Controlling voluntary muscle movements in the arms and legs' },
      { id: 'b', text: 'Processing emotional intensity, emotional salience, and fear responses' },
      { id: 'c', text: 'Directly regulating circadian body temperature and sweating' },
      { id: 'd', text: 'Blocking all auditory sensory input from the physical environment' },
    ],
    correctOptionId: 'b',
    explanation: 'The amygdala is especially active during REM sleep, driving the vivid emotional tone, fear, novelty, and excitement characteristic of dreams.',
  },
  {
    id: 'sci-3',
    category: 'science',
    question: 'Why do dreams often feature logical inconsistencies, sudden scene shifts, or impossible physics without causing immediate surprise?',
    options: [
      { id: 'a', text: 'The auditory cortex completely ceases activity during sleep' },
      { id: 'b', text: 'Decreased activity in the prefrontal cortex reduces reflective self-monitoring and critical evaluation' },
      { id: 'c', text: 'The hippocampus is physically disconnected from the brainstem during REM' },
      { id: 'd', text: 'Neurotransmitter transmission is temporarily suspended throughout the cortex' },
    ],
    correctOptionId: 'b',
    explanation: 'During REM sleep, relative deactivation in the dorsolateral prefrontal cortex diminishes reality testing and executive oversight, allowing unusual or impossible narratives to be accepted as real while dreaming.',
  },
  {
    id: 'sci-4',
    category: 'science',
    question: 'What physiological mechanism normally prevents a person from physically acting out dream movements during REM sleep?',
    options: [
      { id: 'a', text: 'REM atonia, a brainstem-mediated inhibition of voluntary skeletal motor neurons' },
      { id: 'b', text: 'A rapid acceleration of spinal reflex loops' },
      { id: 'c', text: 'A marked slowing of systemic circulation and blood pressure' },
      { id: 'd', text: 'Temporary sensory nerve desensitization in the peripheral skin' },
    ],
    correctOptionId: 'a',
    explanation: 'During REM sleep, brainstem circuits release glycine and GABA to inhibit somatic motor neurons, creating REM atonia (postural muscle paralysis) that keeps the physical body safely still.',
  },
  {
    id: 'sci-5',
    category: 'science',
    question: 'Which brain region collaborates closely with the neocortex during sleep to consolidate daytime experiences into memory networks?',
    options: [
      { id: 'a', text: 'Hippocampus' },
      { id: 'b', text: 'Cerebellum' },
      { id: 'c', text: 'Occipital pole' },
      { id: 'd', text: 'Medulla oblongata' },
    ],
    correctOptionId: 'a',
    explanation: 'The hippocampus replays daytime memory traces and works with the neocortex during sleep to consolidate memories and weave experiential fragments into dream scenarios.',
  },

  // --- Psychological Theories ---
  {
    id: 'theo-1',
    category: 'theories',
    question: 'In Sigmund Freud\'s psychoanalytic framework, what distinguishes manifest content from latent content?',
    options: [
      { id: 'a', text: 'Manifest content is waking thought, while latent content is deep NREM imagery' },
      { id: 'b', text: 'Manifest content is the remembered storyline, while latent content represents disguised psychological wishes or conflicts' },
      { id: 'c', text: 'Manifest content refers to disturbing nightmares, while latent content refers to pleasant wishes' },
      { id: 'd', text: 'Manifest content is universal, while latent content is purely cultural' },
    ],
    correctOptionId: 'b',
    explanation: 'Freud proposed that manifest content is the literal narrative the dreamer remembers, while latent content is the underlying unconscious desire or psychological tension disguised by dream-work mechanisms.',
  },
  {
    id: 'theo-2',
    category: 'theories',
    question: 'According to Carl Jung, what are archetypes in the context of dream analysis?',
    options: [
      { id: 'a', text: 'Universal, inherited symbolic motifs originating from the collective unconscious' },
      { id: 'b', text: 'Random biological noise generated by the nervous system' },
      { id: 'c', text: 'Memories of movies or books viewed within the past forty-eight hours' },
      { id: 'd', text: 'Rigid behavioral commands programmed during early infancy' },
    ],
    correctOptionId: 'a',
    explanation: 'Jung postulated that archetypes (such as the Shadow, Anima/Animus, Persona, and Wise Old Figure) are primordial, universal symbolic themes shared across cultures that naturally populate dreams.',
  },
  {
    id: 'theo-3',
    category: 'theories',
    question: 'What is the primary role of dream compensation in Carl Jung\'s psychological model?',
    options: [
      { id: 'a', text: 'Providing restorative physiological sleep after physical exertion' },
      { id: 'b', text: 'Balancing and correcting one-sided conscious attitudes to foster psychological wholeness' },
      { id: 'c', text: 'Erasing painful emotional memories permanently from consciousness' },
      { id: 'd', text: 'Rewarding the waking ego with sensory gratification' },
    ],
    correctOptionId: 'b',
    explanation: 'Jung viewed the human psyche as a self-regulating system; dreams offer compensatory images and perspectives to counterbalance extreme or unbalanced waking conscious attitudes.',
  },
  {
    id: 'theo-4',
    category: 'theories',
    question: 'How does the Activation-Synthesis hypothesis developed by Hobson and McCarley explain dreaming?',
    options: [
      { id: 'a', text: 'Dreams are literal, precognitive messages about the external future' },
      { id: 'b', text: 'The forebrain synthesizes narrative meaning to make sense of spontaneous neural firing originating in the brainstem' },
      { id: 'c', text: 'Dreams are conscious daydreams deliberately continued into deep sleep' },
      { id: 'd', text: 'Dreams are designed by the mind solely to protect the sleeper from external noises' },
    ],
    correctOptionId: 'b',
    explanation: 'Activation-Synthesis proposes that periodic neurochemical bursts from the brainstem activate sensory and emotional circuits, and the higher cortex synthesizes this spontaneous activity into the best story it can assemble.',
  },
  {
    id: 'theo-5',
    category: 'theories',
    question: 'What is a core perspective of modern cognitive dream theories (such as Foulkes or Domhoff)?',
    options: [
      { id: 'a', text: 'Dreaming reflects normal waking cognitive processes and assists in schema integration and problem-solving' },
      { id: 'b', text: 'Dreaming only happens when cognitive processing completely shuts down' },
      { id: 'c', text: 'Every symbol in a dream holds an identical dictionary meaning for all individuals' },
      { id: 'd', text: 'Dreams are unrelated to personal memories, interests, or relationships' },
    ],
    correctOptionId: 'a',
    explanation: 'Cognitive models view dream formation as continuous with waking thinking, drawing upon autobiographical schemas, personal concerns, and emotional regulation processes.',
  },

  // --- Dream Types & Phenomena ---
  {
    id: 'type-1',
    category: 'dream-types',
    question: 'What is the hallmark definition of a lucid dream?',
    options: [
      { id: 'a', text: 'The dream visual imagery is exceptionally bright or colored' },
      { id: 'b', text: 'The dreamer becomes consciously aware that they are dreaming while the dream is still happening' },
      { id: 'c', text: 'The dream occurs strictly in the late morning after sunrise' },
      { id: 'd', text: 'The dream is remembered with photographic clarity upon waking' },
    ],
    correctOptionId: 'b',
    explanation: 'A lucid dream is defined by meta-cognitive awareness: the sleeper realizes "I am dreaming" while remaining asleep within the dream environment.',
  },
  {
    id: 'type-2',
    category: 'dream-types',
    question: 'What do recurring dreams most commonly reflect according to contemporary sleep psychology?',
    options: [
      { id: 'a', text: 'A neurological glitch in circadian timing' },
      { id: 'b', text: 'Unresolved waking conflicts, ongoing stress, or persistent emotional challenges' },
      { id: 'c', text: 'A guaranteed prediction of an upcoming external event' },
      { id: 'd', text: 'Accidental replays of television shows watched in early childhood' },
    ],
    correctOptionId: 'b',
    explanation: 'Recurring dreams typically recur when underlying emotional concerns, personal conflicts, or acute stressors remain active and unaddressed in waking life.',
  },
  {
    id: 'type-3',
    category: 'dream-types',
    question: 'How do nightmares differ from night terrors in terms of sleep stage and recall?',
    options: [
      { id: 'a', text: 'Nightmares occur in REM sleep with vivid narrative recall, while night terrors occur in deep NREM sleep with intense physiological arousal and little to no recall' },
      { id: 'b', text: 'Nightmares only occur in childhood, whereas night terrors only occur in adulthood' },
      { id: 'c', text: 'Nightmares involve sleepwalking, while night terrors never involve movement' },
      { id: 'd', text: 'Nightmares always occur during NREM sleep Stage 1, while night terrors occur during waking transitions' },
    ],
    correctOptionId: 'a',
    explanation: 'Nightmares are vivid, frightening dreams occurring during REM sleep that awaken the individual with clear memory. Night terrors (sleep terrors) are deep NREM arousal parasomnias marked by screaming or agitation with amnesia for the episode.',
  },
  {
    id: 'type-4',
    category: 'dream-types',
    question: 'What is the primary function of memory-processing or integrative dreams?',
    options: [
      { id: 'a', text: 'Permanently erasing all memories from the previous day' },
      { id: 'b', text: 'Connecting recent emotional experiences with existing long-term memory schemas' },
      { id: 'c', text: 'Preventing the nervous system from entering restorative rest' },
      { id: 'd', text: 'Supplying precise statistical predictions about waking life' },
    ],
    correctOptionId: 'b',
    explanation: 'Integrative dreams support emotional regulation and memory consolidation by weaving recent emotional impressions into broader long-term autobiographical networks.',
  },

  // --- Cultural Perspectives ---
  {
    id: 'cult-1',
    category: 'culture',
    question: 'In Ancient Egyptian civilization, how were dream temples and the practice of incubation primarily used?',
    options: [
      { id: 'a', text: 'As civic voting chambers during legislative elections' },
      { id: 'b', text: 'As sacred sanctuaries where petitioners slept to seek divine guidance, healing remedies, and prophetic counsel' },
      { id: 'c', text: 'As penal facilities where lawbreakers were required to recount nightmares' },
      { id: 'd', text: 'Exclusively for astronomical calendar calculations without spiritual connection' },
    ],
    correctOptionId: 'b',
    explanation: 'Ancient Egyptians considered dreams conduits between gods and humans; individuals slept in dedicated incubation sanctuaries seeking therapeutic advice, spiritual insight, or practical solutions.',
  },
  {
    id: 'cult-2',
    category: 'culture',
    question: 'What role do dreams traditionally play across diverse Native American tribal cultures?',
    options: [
      { id: 'a', text: 'They are treated as dangerous illusions that must be immediately hidden' },
      { id: 'b', text: 'They are respected as spiritual communications, sources of guidance, and central components of vision quests' },
      { id: 'c', text: 'They are analyzed strictly through literal market-trading manuals' },
      { id: 'd', text: 'They are considered irrelevant to personal identity or community well-being' },
    ],
    correctOptionId: 'b',
    explanation: 'In many Indigenous North American traditions, dreams hold sacred significance as communications with ancestors and the natural world, offering vital insight during rites of passage such as vision quests.',
  },
  {
    id: 'cult-3',
    category: 'culture',
    question: 'In traditional Chinese philosophy and medicine (such as the Huangdi Neijing), how were dreams historically interpreted?',
    options: [
      { id: 'a', text: 'As reflections of the dynamic balance between Yin and Yang and internal vital energy (Qi) among organ systems' },
      { id: 'b', text: 'As entirely random hallucinations caused solely by dietary indigestion' },
      { id: 'c', text: 'As unalterable curses that human lifestyle choices could not affect' },
      { id: 'd', text: 'As theatrical narratives without any relation to bodily health or spiritual harmony' },
    ],
    correctOptionId: 'a',
    explanation: 'Classical Chinese texts viewed dreams as mirrors of internal physiological and emotional harmony, linking specific dream themes to the balance of Yin, Yang, and energy flow through major meridian pathways.',
  },
  {
    id: 'cult-4',
    category: 'culture',
    question: 'In classical Islamic dream tradition, what distinguishes a true dream (ru\'ya)?',
    options: [
      { id: 'a', text: 'It is considered an inspired spiritual vision or moral insight, distinct from ordinary daily worries or distressing illusions' },
      { id: 'b', text: 'It is a dream that only occurs on the first day of every lunar month' },
      { id: 'c', text: 'It is any dream during which the physical body remains fully awake' },
      { id: 'd', text: 'It is an exclusively lucid dream that can be repeated at will' },
    ],
    correctOptionId: 'a',
    explanation: 'Islamic scholarship traditionally differentiates true spiritual dreams (ru\'ya) from psychological thoughts stemming from personal daytime concerns (nafs) or distressing nightmares, emphasizing ethical reflection.',
  },
  {
    id: 'cult-5',
    category: 'culture',
    question: 'In Ancient Greece, why did seekers travel to the Asclepieia (sanctuaries of Asclepius)?',
    options: [
      { id: 'a', text: 'To practice temple sleep (enkoimesis) in hopes of receiving diagnostic dreams or healing treatments from the god of medicine' },
      { id: 'b', text: 'To compete in philosophical debate tournaments without sleeping' },
      { id: 'c', text: 'To record private monetary debts on municipal stone tablets' },
      { id: 'd', text: 'To train military officers for naval campaigns' },
    ],
    correctOptionId: 'a',
    explanation: 'The sanctuaries of Asclepius were renowned healing centers where pilgrims slept in holy dormitories (the abaton), believing that dreams would reveal remedies or bring restorative health.',
  },
];

export const PSYCHOLOGY_CHECKPOINT_SECTIONS: Record<PsychologyCategory, PsychologyCheckpointSection> = {
  science: {
    id: 'science',
    title: 'Scientific Perspectives',
    description: 'Knowledge checks on sleep architecture, REM vs. NREM mechanisms, and neuroanatomical structures involved in dreaming.',
    questions: PSYCHOLOGY_CHECKPOINTS.filter(q => q.category === 'science'),
  },
  theories: {
    id: 'theories',
    title: 'Psychological Theories',
    description: 'Knowledge checks on Freudian psychoanalysis, Jungian archetypes, Cognitive models, and Activation-Synthesis theory.',
    questions: PSYCHOLOGY_CHECKPOINTS.filter(q => q.category === 'theories'),
  },
  'dream-types': {
    id: 'dream-types',
    title: 'Dream Types & Phenomena',
    description: 'Knowledge checks on lucid awareness, recurring patterns, nightmares, parasomnias, and memory integration.',
    questions: PSYCHOLOGY_CHECKPOINTS.filter(q => q.category === 'dream-types'),
  },
  culture: {
    id: 'culture',
    title: 'Cultural Perspectives',
    description: 'Knowledge checks on historical dream sanctuaries, indigenous traditions, classical philosophies, and spiritual frameworks.',
    questions: PSYCHOLOGY_CHECKPOINTS.filter(q => q.category === 'culture'),
  },
};

/**
 * Retrieve all questions belonging to a specific psychology category
 */
export function getCheckpointsByCategory(category: PsychologyCategory): CheckpointQuestion[] {
  return PSYCHOLOGY_CHECKPOINTS.filter(q => q.category === category);
}

/**
 * Retrieve a single checkpoint question by its unique identifier
 */
export function getCheckpointById(id: string): CheckpointQuestion | undefined {
  return PSYCHOLOGY_CHECKPOINTS.find(q => q.id === id);
}

/**
 * Retrieve section metadata and questions for a specific psychology category
 */
export function getCheckpointSection(category: PsychologyCategory): PsychologyCheckpointSection | undefined {
  return PSYCHOLOGY_CHECKPOINT_SECTIONS[category];
}

/**
 * Retrieve all available checkpoint categories
 */
export function getAllCheckpointCategories(): PsychologyCategory[] {
  return ['science', 'theories', 'dream-types', 'culture'];
}
