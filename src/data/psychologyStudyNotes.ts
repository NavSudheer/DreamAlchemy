/**
 * Psychology Study Notes
 *
 * A typed, content-only collection of concise, evidence-conscious study notes
 * for each core Psychology category (scientific perspectives, psychological theories,
 * dream types, and cultural traditions).
 *
 * Observational and educational resource only; not diagnostic, predictive, or medical advice.
 */

export type PsychologyCategory = 'scientific' | 'theories' | 'types' | 'cultural';

export interface PsychologyStudyNote {
  id: string;
  category: PsychologyCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  keyTakeaways: string[];
  evidencePerspective: string;
  suggestedReflectionAngle: string;
}

export const PSYCHOLOGY_STUDY_NOTES: Record<PsychologyCategory, PsychologyStudyNote> = {
  scientific: {
    id: 'study-scientific',
    category: 'scientific',
    categoryLabel: 'Scientific Perspectives',
    title: 'Neurobiology & Sleep Architecture',
    subtitle: 'Observational insights into brain activity, sleep stages, and memory research',
    summary: 'Sleep science studies dreaming as a biological phenomenon observed across alternating sleep cycles. Researchers examine non-REM stages (characterized by slower brainwave oscillations) and REM sleep (marked by rapid eye movements, altered cortical activation, and muscle atonia) to observe how sleep architecture correlates with reported dream experiences.',
    keyTakeaways: [
      'Sleep architecture consists of repeating ultradian cycles (typically 90 to 120 minutes), with REM intervals generally lengthening in later cycles.',
      'REM atonia is a documented physiological state where somatic muscle tone is reduced while central neural activity remains active.',
      'Neuroimaging shows distinct regional activity patterns during REM sleep, including relative attenuation in parts of the prefrontal cortex alongside limbic activation.',
      'Cognitive neuroscience studies how sleep states correlate with the replay and organization of memory traces observed across waking life.',
    ],
    evidencePerspective: 'Polysomnography and neuroimaging offer descriptive measurements of physiological markers and brainwave patterns that occur alongside subjective dream reports.',
    suggestedReflectionAngle: 'Observe your own sleep patterns and notice any descriptive differences in how you recall dreams across different parts of the night.',
  },

  theories: {
    id: 'study-theories',
    category: 'theories',
    categoryLabel: 'Psychological Theories',
    title: 'Theoretical Frameworks & Perspectives',
    subtitle: 'Historical models exploring psychoanalytic, cognitive, and biological viewpoints',
    summary: 'Psychological models provide diverse theoretical frameworks for discussing dream content. Early psychoanalytic approaches explored manifest narratives alongside latent themes, Jungian models proposed archetypal symbolism, cognitive theories observe continuity between waking and sleeping thought, and biological hypotheses describe how cognitive processes interpret spontaneous neural signals.',
    keyTakeaways: [
      'Freud introduced the conceptual distinction between manifest storyline (surface imagery) and latent content (underlying thoughts and feelings).',
      'Jung proposed that dream symbols can be viewed as expressions of broader psychological motifs and complementary perspectives to daytime attitudes.',
      'Cognitive continuity models observe that themes in dream journals frequently correspond to waking interests, social relationships, and daily concerns.',
      'Activation-synthesis models propose that narrative structure represents the cognitive system\'s interpretation of spontaneous brainstem signals during REM sleep.',
    ],
    evidencePerspective: 'These frameworks represent conceptual models and interpretive traditions developed to study subjective experience rather than proven universal formulas.',
    suggestedReflectionAngle: 'Consider how different theoretical lenses—such as focusing on literal daily events versus metaphorical imagery—offer distinct ways to reflect on dream themes.',
  },

  types: {
    id: 'study-types',
    category: 'types',
    categoryLabel: 'Dream Types & Phenomena',
    title: 'Descriptive Categories of Dream Phenomena',
    subtitle: 'Exploring reported characteristics of common dream experiences and phenomena',
    summary: 'Dream research describes a variety of reported phenomena, ranging from routine narratives reflecting daytime events to lucid awareness and distressing nightmares. Observing these categories helps individuals describe their subjective experiences using clear, non-clinical terminology.',
    keyTakeaways: [
      'Lucid dreams are defined in research literature as sleep episodes where individuals report recognizing that they are dreaming while the dream continues.',
      'Processing dreams are common experiences that feature familiar people, settings, and daily activities from recent waking life.',
      'Recurring dreams involve repeated themes, settings, or scenarios reported across multiple nights.',
      'Nightmares are distressing dreams accompanied by physical arousal; self-care focuses on calm physical re-orientation, with professional support recommended for persistent distress.',
    ],
    evidencePerspective: 'Phenomenological surveys and sleep studies document wide natural variation in dream frequency, recall clarity, and emotional tone across individuals.',
    suggestedReflectionAngle: 'Notice the variety of themes that appear in your dreams over time without evaluating them as successful or unsuccessful.',
  },

  cultural: {
    id: 'study-cultural',
    category: 'cultural',
    categoryLabel: 'Cultural Perspectives',
    title: 'Historical & Cross-Cultural Traditions',
    subtitle: 'Documented customs, sanctuary practices, and contemplative perspectives across cultures',
    summary: 'Historical and anthropological records document diverse cultural approaches to dreaming. Traditions worldwide have included sanctuary sleep practices, communal reflection, and morning contemplation customs that treated dreams as meaningful subjects of personal inquiry and philosophical study.',
    keyTakeaways: [
      'Historical incubation practices, such as those in ancient Mediterranean sanctuaries, involved intentional preparation and restful temple settings.',
      'Many Indigenous traditions view dreaming within relational frameworks, emphasizing connections to natural environments and community traditions.',
      'Philosophical and spiritual traditions, such as Islamic ru\'ya discernment, developed guidelines for thoughtful reflection and patience upon waking.',
      'Anthropological studies show that customs of morning stillness and storytelling have served social and contemplative roles across diverse societies.',
    ],
    evidencePerspective: 'Anthropological literature illustrates how cultural context, mythologies, and social practices shape the ways individuals discuss and interpret their dreams.',
    suggestedReflectionAngle: 'Reflect on how your cultural background or family traditions influence the way you view and discuss dreams.',
  },
};

/**
 * Get the study note for a specific Psychology category.
 */
export function getStudyNoteByCategory(category: PsychologyCategory): PsychologyStudyNote | undefined {
  return PSYCHOLOGY_STUDY_NOTES[category];
}

/**
 * Get a study note by its stable ID.
 */
export function getStudyNoteById(id: string): PsychologyStudyNote | undefined {
  return Object.values(PSYCHOLOGY_STUDY_NOTES).find(note => note.id === id.trim());
}

/**
 * Return all Psychology study notes.
 */
export function getAllStudyNotes(): PsychologyStudyNote[] {
  return Object.values(PSYCHOLOGY_STUDY_NOTES);
}

/**
 * Check whether a category has an associated study note.
 */
export function hasStudyNoteForCategory(category: PsychologyCategory): boolean {
  return Boolean(PSYCHOLOGY_STUDY_NOTES[category]);
}

/**
 * Return all supported Psychology category IDs.
 */
export function getAllStudyCategories(): PsychologyCategory[] {
  return Object.keys(PSYCHOLOGY_STUDY_NOTES) as PsychologyCategory[];
}
