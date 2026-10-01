/**
 * Psychology Reflection Prompts
 *
 * A typed, content-only collection of optional reflection prompts designed to support
 * open-ended contemplation across scientific perspectives, psychological theories,
 * dream types, and cultural traditions.
 *
 * Educational and exploratory only; not diagnostic, predictive, or medical advice.
 */

export type PsychologyPromptSection = 'scientific' | 'theories' | 'types' | 'cultural';

export interface PsychologyReflectionPrompt {
  id: string;
  section: PsychologyPromptSection;
  title: string;
  question: string;
  considerThis: string;
}

export interface PsychologyPromptSectionMeta {
  section: PsychologyPromptSection;
  title: string;
  description: string;
}

export const PSYCHOLOGY_PROMPT_SECTIONS: Record<PsychologyPromptSection, PsychologyPromptSectionMeta> = {
  scientific: {
    section: 'scientific',
    title: 'Scientific Perspectives',
    description: 'Reflections exploring memory consolidation, neurobiology, and sleep rhythm connections.',
  },
  theories: {
    section: 'theories',
    title: 'Psychological Theories',
    description: 'Reflections inspired by psychoanalytic, analytical, cognitive, and biological models.',
  },
  types: {
    section: 'types',
    title: 'Dream Types & Phenomena',
    description: 'Reflections examining lucidity, recurring imagery, emotional regulation, and daily processing.',
  },
  cultural: {
    section: 'cultural',
    title: 'Cultural Perspectives',
    description: 'Reflections drawing on historical sanctuaries, indigenous traditions, and philosophical systems.',
  },
};

export const PSYCHOLOGY_REFLECTION_PROMPTS: PsychologyReflectionPrompt[] = [
  // --- Scientific Perspectives (4 prompts) ---
  {
    id: 'sci-refl-1',
    section: 'scientific',
    title: 'Waking Echoes & Hippocampal Replay',
    question: 'When you wake up, do you notice any subtle fragments from your previous 24 to 48 hours woven into your dream imagery?',
    considerThis: 'Notice how recent conversations, media, or tasks often appear in dreams not as direct replays, but as transformed symbols or emotional atmospheres.',
  },
  {
    id: 'sci-refl-2',
    section: 'scientific',
    title: 'Emotional Salience & The Amygdala',
    question: 'What emotional tone stood out most prominently in your dream, and did the intensity feel heightened compared to your waking baseline?',
    considerThis: 'During REM sleep, heightened amygdala activation can amplify emotions like awe, urgency, or curiosity while downplaying logical scrutiny.',
  },
  {
    id: 'sci-refl-3',
    section: 'scientific',
    title: 'Executive Function & Dream Logic',
    question: 'Were there elements in your dream that seemed completely plausible while dreaming, but feel surprising or impossible now that you are awake?',
    considerThis: 'Reduced prefrontal cortex activity during dreaming temporarily quiets our waking inner critic, allowing spontaneous connections to unfold without friction.',
  },
  {
    id: 'sci-refl-4',
    section: 'scientific',
    title: 'Sleep Rhythm & Recall Clarity',
    question: 'Did this dream emerge during a deep, uninterrupted night of rest or during a lighter early-morning awakening?',
    considerThis: 'REM periods grow progressively longer toward the morning, which is why dreams remembered right before waking often feel richer and more narrative.',
  },

  // --- Psychological Theories (4 prompts) ---
  {
    id: 'theo-refl-1',
    section: 'theories',
    title: 'Manifest Story vs. Underlying Feelings',
    question: 'Looking past the literal storyline of your dream, what underlying emotional desire, worry, or unsaid thought might it mirror?',
    considerThis: 'In psychoanalytic theory, dream narratives often use creative metaphor and condensation to explore desires or feelings we rarely voice out loud.',
  },
  {
    id: 'theo-refl-2',
    section: 'theories',
    title: 'Encountering the Archetypal',
    question: 'Did your dream feature any memorable figures—such as an unfamiliar guide, a shadowy pursuer, or a child—that evoke a universal human theme?',
    considerThis: 'Jung suggested that recurring figures often represent universal aspects of the human experience that invite us to reflect on balance within ourselves.',
  },
  {
    id: 'theo-refl-3',
    section: 'theories',
    title: 'Compensatory Balance',
    question: 'If your dream presented an atmosphere opposite to your recent waking mood or behavior, what complementary perspective might it be offering?',
    considerThis: 'Dream compensation theory views dreams as a self-regulating balance, offering boldness when we feel timid, or stillness when we are overextended.',
  },
  {
    id: 'theo-refl-4',
    section: 'theories',
    title: 'Narrative Synthesis',
    question: 'How did your conscious mind weave separate images, settings, and feelings together into a single storyline?',
    considerThis: 'The brain has a natural creative drive to find coherence and meaning even when prompted by spontaneous, non-linear nighttime impressions.',
  },

  // --- Dream Types & Phenomena (4 prompts) ---
  {
    id: 'type-refl-1',
    section: 'types',
    title: 'Moments of Awareness',
    question: 'Did you experience any moment of curiosity, questioning, or awareness that you were inside a dream state?',
    considerThis: 'Even a fleeting flash of "this feels like a dream" reflects the gentle emergence of reflective awareness within sleep.',
  },
  {
    id: 'type-refl-2',
    section: 'types',
    title: 'Echoing Patterns',
    question: 'Have you encountered this setting, obstacle, or emotional feeling in previous dreams, even if the characters or details were different?',
    considerThis: 'Recurring dream motifs often highlight ongoing themes or life transitions that your mind continues to revisit and process over time.',
  },
  {
    id: 'type-refl-3',
    section: 'types',
    title: 'Gentle Grounding After Distress',
    question: 'If the dream carried tension or distress, what reassuring truth about your present safety can you gently remind yourself of right now?',
    considerThis: 'Distressing dreams reflect temporary stress processing rather than waking reality; acknowledging physical safety in the present helps ground the nervous system.',
  },
  {
    id: 'type-refl-4',
    section: 'types',
    title: 'Emotional Digestion',
    question: 'In what ways might this dream be helping your mind gently digest or make peace with a recent waking experience?',
    considerThis: 'Everyday processing dreams act like nighttime emotional digestion, quietly organizing memories and diffusing waking tensions.',
  },

  // --- Cultural Perspectives (4 prompts) ---
  {
    id: 'cult-refl-1',
    section: 'cultural',
    title: 'Incubation & Seeking Direction',
    question: 'If you were to treat this dream as a reflective counsel from your own inner wisdom, what constructive insight might it offer for your day?',
    considerThis: 'Ancient incubation sanctuaries treated dreams as reflective spaces where seekers paused to listen for creative guidance on their journey.',
  },
  {
    id: 'cult-refl-2',
    section: 'cultural',
    title: 'Natural Kinship & Guides',
    question: 'Did an animal, landscape, or force of nature appear in your dream, and what qualities does that element embody to you?',
    considerThis: 'Many Indigenous cultures view encounters with natural elements in dreams as invitations to connect with resilience, patience, or instinct.',
  },
  {
    id: 'cult-refl-3',
    section: 'cultural',
    title: 'Harmony & Dynamic Balance',
    question: 'Where in this dream do you observe the interplay between action and rest, light and shadow, or tension and ease?',
    considerThis: 'Traditional philosophies view dreams through the lens of dynamic balance, inviting reflection on how energy and calm coexist in waking life.',
  },
  {
    id: 'cult-refl-4',
    section: 'cultural',
    title: 'Quiet Contemplation & Morning Reflection',
    question: 'Taking a quiet moment before daily activity begins, what feeling of clarity, humility, or gratitude does this dream leave you with?',
    considerThis: 'Classical morning contemplation traditions encourage pausing before the day begins to acknowledge uplifting or thought-provoking dreams with gratitude.',
  },
];

/**
 * Retrieve all reflection prompts belonging to a specific psychology section
 */
export function getPromptsBySection(section: PsychologyPromptSection): PsychologyReflectionPrompt[] {
  return PSYCHOLOGY_REFLECTION_PROMPTS.filter(p => p.section === section);
}

/**
 * Retrieve a specific reflection prompt by its stable identifier
 */
export function getPromptById(id: string): PsychologyReflectionPrompt | undefined {
  return PSYCHOLOGY_REFLECTION_PROMPTS.find(p => p.id === id);
}

/**
 * Retrieve all available psychology reflection prompts
 */
export function getAllPrompts(): PsychologyReflectionPrompt[] {
  return PSYCHOLOGY_REFLECTION_PROMPTS;
}

/**
 * Retrieve all valid psychology prompt sections
 */
export function getPromptSections(): PsychologyPromptSection[] {
  return ['scientific', 'theories', 'types', 'cultural'];
}
