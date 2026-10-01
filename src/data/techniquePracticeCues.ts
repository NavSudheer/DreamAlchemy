/**
 * Technique Practice Cues
 *
 * A typed, content-only collection of optional practice cue lines for each
 * existing written dream technique guide.
 *
 * Each cue provides brief, gentle, non-demanding guidance during practice.
 * Strictly educational and self-care aids; no claims of guaranteed lucidity,
 * sleep outcomes, or clinical cures.
 */

export interface TechniquePracticeCue {
  id: string;
  techniqueId: string;
  stepIndex: number;
  focus: string;
  cue: string;
}

export interface TechniqueCuesGroup {
  techniqueId: string;
  techniqueTitle: string;
  cues: TechniquePracticeCue[];
}

export const TECHNIQUE_PRACTICE_CUES: Record<string, TechniqueCuesGroup> = {
  // 1: Reality Testing
  '1': {
    techniqueId: '1',
    techniqueTitle: 'Reality Testing',
    cues: [
      {
        id: 'cue-1-1',
        techniqueId: '1',
        stepIndex: 0,
        focus: 'Grounding Pause',
        cue: 'Pause where you are and take a single unhurried breath before checking your surroundings.',
      },
      {
        id: 'cue-1-2',
        techniqueId: '1',
        stepIndex: 1,
        focus: 'Genuine Curiosity',
        cue: 'Ask with genuine interest rather than routine habit: "Am I awake, or could I be dreaming right now?"',
      },
      {
        id: 'cue-1-3',
        techniqueId: '1',
        stepIndex: 2,
        focus: 'Physical Consistency',
        cue: 'Check a clock, read nearby text twice, or examine the detail of your hands for stability.',
      },
      {
        id: 'cue-1-4',
        techniqueId: '1',
        stepIndex: 3,
        focus: 'Calm Release',
        cue: 'Release the check easily; simply carry this quiet, attentive awareness into your day.',
      },
    ],
  },

  // 2: Wake Back to Bed (WBTB)
  '2': {
    techniqueId: '2',
    techniqueTitle: 'Wake Back to Bed (WBTB)',
    cues: [
      {
        id: 'cue-2-1',
        techniqueId: '2',
        stepIndex: 0,
        focus: 'Dim Environment',
        cue: 'Keep lighting low and gentle, avoiding harsh overhead lamps and stimulating screens.',
      },
      {
        id: 'cue-2-2',
        techniqueId: '2',
        stepIndex: 1,
        focus: 'Quiet Wakefulness',
        cue: 'Spend 15 to 30 minutes in peaceful activity, such as soft reading or sipping room-temperature water.',
      },
      {
        id: 'cue-2-3',
        techniqueId: '2',
        stepIndex: 2,
        focus: 'Effortless Return',
        cue: 'Return to bed without pressure; let your body sink into comfortable resting alignment.',
      },
      {
        id: 'cue-2-4',
        techniqueId: '2',
        stepIndex: 3,
        focus: 'Rest Priority',
        cue: 'Prioritize restorative sleep above all; whatever happens, resting comfortably is your success.',
      },
    ],
  },

  // 3: Dream Journaling
  '3': {
    techniqueId: '3',
    techniqueTitle: 'Dream Journaling',
    cues: [
      {
        id: 'cue-3-1',
        techniqueId: '3',
        stepIndex: 0,
        focus: 'Initial Stillness',
        cue: 'Remain physically still for thirty seconds upon opening your eyes before reaching for your journal.',
      },
      {
        id: 'cue-3-2',
        techniqueId: '3',
        stepIndex: 1,
        focus: 'Core Keywords',
        cue: 'Note down single keywords, an emotional tone, or an image fragment, even if the storyline is incomplete.',
      },
      {
        id: 'cue-3-3',
        techniqueId: '3',
        stepIndex: 2,
        focus: 'Present Tense',
        cue: 'Write in the present tense ("I am walking...") to reconnect with the experiential feeling of the dream.',
      },
      {
        id: 'cue-3-4',
        techniqueId: '3',
        stepIndex: 3,
        focus: 'No Self-Judgement',
        cue: 'Honor mornings with little or no recall; journaling is a gentle habit built on patience.',
      },
    ],
  },

  // 4: Mnemonic Induction of Lucid Dreams (MILD)
  '4': {
    techniqueId: '4',
    techniqueTitle: 'Mnemonic Induction of Lucid Dreams (MILD)',
    cues: [
      {
        id: 'cue-4-1',
        techniqueId: '4',
        stepIndex: 0,
        focus: 'Scene Recall',
        cue: 'Bring to mind a vivid scene from a recent dream and visualize yourself back inside it.',
      },
      {
        id: 'cue-4-2',
        techniqueId: '4',
        stepIndex: 1,
        focus: 'Clear Intention',
        cue: 'Formulate a simple, positive intention: "The next time I am dreaming, I will remember that I am dreaming."',
      },
      {
        id: 'cue-4-3',
        techniqueId: '4',
        stepIndex: 2,
        focus: 'Mental Rehearsal',
        cue: 'Picture yourself spotting a dream anomaly in that scene and feeling the spark of conscious awareness.',
      },
      {
        id: 'cue-4-4',
        techniqueId: '4',
        stepIndex: 3,
        focus: 'Peaceful Letting Go',
        cue: 'Let the visualization soften into the background as you drift off into natural rest.',
      },
    ],
  },

  // 5: Wake Initiated Lucid Dream (WILD)
  '5': {
    techniqueId: '5',
    techniqueTitle: 'Wake Initiated Lucid Dream (WILD)',
    cues: [
      {
        id: 'cue-5-1',
        techniqueId: '5',
        stepIndex: 0,
        focus: 'Deep Physical Rest',
        cue: 'Lie comfortably on your back or favored side, letting gravity fully support your limbs and jaw.',
      },
      {
        id: 'cue-5-2',
        techniqueId: '5',
        stepIndex: 1,
        focus: 'Passive Observation',
        cue: 'Adopt the stance of a calm onlooker, observing thoughts and sensations without trying to steer them.',
      },
      {
        id: 'cue-5-3',
        techniqueId: '5',
        stepIndex: 2,
        focus: 'Threshold Welcoming',
        cue: 'Notice hypnagogic colors, sounds, or body lightness with relaxed curiosity rather than alarm.',
      },
      {
        id: 'cue-5-4',
        techniqueId: '5',
        stepIndex: 3,
        focus: 'Surrender to Sleep',
        cue: 'If restlessness or active thinking intrudes, surrender all effort and embrace natural restorative sleep.',
      },
    ],
  },

  // 6: Senses Initiated Lucid Dream (SSILD)
  '6': {
    techniqueId: '6',
    techniqueTitle: 'Senses Initiated Lucid Dream (SSILD)',
    cues: [
      {
        id: 'cue-6-1',
        techniqueId: '6',
        stepIndex: 0,
        focus: 'Sight Window',
        cue: 'Rest awareness behind closed eyelids for a few gentle breaths, observing whatever soft darkness or light appears.',
      },
      {
        id: 'cue-6-2',
        techniqueId: '6',
        stepIndex: 1,
        focus: 'Sound Window',
        cue: 'Shift attention to subtle ambient sounds in your bedroom—breath, wind, or quiet room acoustics.',
      },
      {
        id: 'cue-6-3',
        techniqueId: '6',
        stepIndex: 2,
        focus: 'Touch Window',
        cue: 'Notice tactile points: the weight of the blanket, the softness of the pillow, and bodily warmth.',
      },
      {
        id: 'cue-6-4',
        techniqueId: '6',
        stepIndex: 3,
        focus: 'Sleep Shift',
        cue: 'After several relaxed cycles, turn into your usual comfortable sleep posture and let go completely.',
      },
    ],
  },

  // 7: Dream Incubation
  '7': {
    techniqueId: '7',
    techniqueTitle: 'Dream Incubation',
    cues: [
      {
        id: 'cue-7-1',
        techniqueId: '7',
        stepIndex: 0,
        focus: 'Theme Selection',
        cue: 'Choose one gentle question, artistic inquiry, or peaceful memory to invite into your sleep.',
      },
      {
        id: 'cue-7-2',
        techniqueId: '7',
        stepIndex: 1,
        focus: 'Succinct Framing',
        cue: 'Summarize your inquiry in a single open-minded phrase, welcoming whatever unexpected perspectives arise.',
      },
      {
        id: 'cue-7-3',
        techniqueId: '7',
        stepIndex: 2,
        focus: 'Sensory Immersion',
        cue: 'Envision a setting or symbol connected to your theme, soaking in its emotional atmosphere.',
      },
      {
        id: 'cue-7-4',
        techniqueId: '7',
        stepIndex: 3,
        focus: 'Trust and Drift',
        cue: 'Release expectations of guaranteed outcomes; trust sleep to naturally synthesize your daytime reflections.',
      },
    ],
  },

  // 8: Morning Recall Routine
  '8': {
    techniqueId: '8',
    techniqueTitle: 'Morning Recall Routine',
    cues: [
      {
        id: 'cue-8-1',
        techniqueId: '8',
        stepIndex: 0,
        focus: 'Gentle Stillness',
        cue: 'Keep eyes softly closed upon waking and pause before making any physical movement.',
      },
      {
        id: 'cue-8-2',
        techniqueId: '8',
        stepIndex: 1,
        focus: 'Reverse Tracing',
        cue: 'Track backwards from your final waking thought: where were you, who was there, and how did it feel?',
      },
      {
        id: 'cue-8-3',
        techniqueId: '8',
        stepIndex: 2,
        focus: 'Posture Reconnection',
        cue: 'If memory is elusive, gently roll back into the position you slept in to invite sensory recall cues.',
      },
      {
        id: 'cue-8-4',
        techniqueId: '8',
        stepIndex: 3,
        focus: 'Gratitude for Process',
        cue: 'Welcome whatever impressions remain, recognizing that dream recall ebbs and flows naturally.',
      },
    ],
  },

  // 9: Nightmare Aftercare
  '9': {
    techniqueId: '9',
    techniqueTitle: 'Nightmare Aftercare',
    cues: [
      {
        id: 'cue-9-1',
        techniqueId: '9',
        stepIndex: 0,
        focus: 'Reality Grounding',
        cue: 'Open your eyes, look at familiar physical objects, and softly remind yourself: "The dream has ended; I am awake and safe in my room."',
      },
      {
        id: 'cue-9-2',
        techniqueId: '9',
        stepIndex: 1,
        focus: 'Somatic Touch',
        cue: 'Place a warm hand over your chest or press your feet against the mattress to physically ground your body.',
      },
      {
        id: 'cue-9-3',
        techniqueId: '9',
        stepIndex: 2,
        focus: 'Extended Exhale',
        cue: 'Breathe in gently through the nose, then allow a longer, slow sigh through the mouth to settle your heart rate.',
      },
      {
        id: 'cue-9-4',
        techniqueId: '9',
        stepIndex: 3,
        focus: 'Compassionate Care',
        cue: 'Adjust your blankets or sip water. Remember this is self-care, and professional medical or psychological support is recommended if nightmares remain persistent or distressing.',
      },
    ],
  },
};

/**
 * Get all practice cues for a specific technique ID.
 */
export function getCuesForTechnique(techniqueId: string): TechniquePracticeCue[] {
  const group = TECHNIQUE_PRACTICE_CUES[techniqueId.trim()];
  return group ? group.cues : [];
}

/**
 * Get the full cues group for a specific technique ID.
 */
export function getCueGroupForTechnique(techniqueId: string): TechniqueCuesGroup | undefined {
  return TECHNIQUE_PRACTICE_CUES[techniqueId.trim()];
}

/**
 * Return a flat list of all practice cues across all techniques.
 */
export function getAllTechniqueCues(): TechniquePracticeCue[] {
  return Object.values(TECHNIQUE_PRACTICE_CUES).flatMap(group => group.cues);
}

/**
 * Return all technique cue groups.
 */
export function getAllTechniqueCueGroups(): TechniqueCuesGroup[] {
  return Object.values(TECHNIQUE_PRACTICE_CUES);
}

/**
 * Check whether a technique has defined practice cues.
 */
export function hasCuesForTechnique(techniqueId: string): boolean {
  return Boolean(TECHNIQUE_PRACTICE_CUES[techniqueId.trim()]);
}

/**
 * Get a single practice cue by its unique cue ID.
 */
export function getCueById(id: string): TechniquePracticeCue | undefined {
  const all = getAllTechniqueCues();
  return all.find(c => c.id === id.trim());
}
