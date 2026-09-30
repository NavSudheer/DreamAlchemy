import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Technique {
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  duration: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  steps: string[];
  tips: string[];
  expectedResults: string;
}

export const TECHNIQUE_DATA: Record<string, Technique> = {
  '1': {
    title: 'Reality Testing',
    description: 'Train your mind to recognize dream states by questioning reality throughout the day.',
    difficulty: 1,
    duration: '5-10 min',
    icon: 'hand-pointing-up',
    steps: [
      'Set regular reminders throughout the day',
      'When reminded, ask yourself "Am I dreaming?"',
      'Look for dream signs or inconsistencies',
      'Read a short piece of text, look away, and read it again',
      'Recall how you arrived here, then return your attention to your surroundings',
    ],
    tips: [
      'Be consistent with your reality checks',
      'Combine multiple reality checks for better results',
      'Practice with genuine curiosity',
      'Don\'t rush through the checks',
    ],
    expectedResults: 'Use this as a brief attention exercise. Recognizing a dream is possible, but no technique guarantees lucidity.',
  },
  '2': {
    title: 'Wake Back to Bed (WBTB)',
    description: 'An optional nighttime practice that interrupts sleep; prioritize a full night of rest.',
    difficulty: 2,
    duration: '30 min',
    icon: 'alarm',
    steps: [
      'Set an alarm for 5-6 hours after bedtime',
      'When alarm sounds, get out of bed',
      'Stay awake for 15-30 minutes',
      'Return to bed with lucid dream intention',
      'Use visualization while falling asleep',
    ],
    tips: [
      'Don\'t use bright lights during wake period',
      'Keep a dream journal by your bed',
      'Focus on lucid dreaming during wake period',
      'Maintain a regular sleep schedule',
    ],
    expectedResults: 'Results vary. Skip this practice if it leaves you tired or makes it difficult to return to sleep.',
  },
  '3': {
    title: 'Dream Journaling',
    description: 'Maintain a detailed record of your dreams to improve dream recall and identify dream signs.',
    difficulty: 1,
    duration: '10-15 min',
    icon: 'book-open-page-variant',
    steps: [
      'Keep a journal and pen by your bed',
      'Write down dreams immediately upon waking',
      'Record as many details as possible',
      'Note emotions and sensations',
      'Review your journal regularly to identify patterns'
    ],
    tips: [
      'Use voice recording if writing is difficult',
      'Draw sketches to capture visual elements',
      'Tag recurring themes and symbols',
      'Write in present tense for better recall'
    ],
    expectedResults: 'A journal gives you a record to revisit. A single image, feeling, or fragment is enough; recall varies from morning to morning.',
  },
  '4': {
    title: 'MILD (Mnemonic Induction of Lucid Dreams)',
    description: 'Program your mind to recognize dream states by setting a strong intention before sleep.',
    difficulty: 2,
    duration: '15-20 min',
    icon: 'brain',
    steps: [
      'Recall a recent dream in detail',
      'Identify a dream sign from that dream',
      'Visualize yourself becoming lucid',
      'Set a clear intention to recognize dreams',
      'Repeat intention while falling asleep'
    ],
    tips: [
      'Practice during your natural wake periods',
      'Combine with WBTB for better results',
      'Keep your intention clear and simple',
      'Maintain a consistent sleep schedule'
    ],
    expectedResults: 'Practice remembering your intention without striving for a result. There is no required timeline or frequency of lucid dreams.',
  },
  '5': {
    title: 'WILD (Wake-Initiated Lucid Dreams)',
    description: 'Enter a dream state directly from wakefulness while maintaining consciousness.',
    difficulty: 3,
    duration: '20-30 min',
    icon: 'meditation',
    steps: [
      'Lie still in a comfortable position',
      'Relax your body completely',
      'Maintain gentle awareness as you drift off',
      'Observe hypnagogic imagery',
      'Allow dream scenes to form around you'
    ],
    tips: [
      'Practice during natural periods of sleepiness',
      'Stay relaxed but mentally alert',
      'Don\'t force the process',
      'Stop if the experience feels uncomfortable and return to ordinary rest'
    ],
    expectedResults: 'This is an optional advanced exercise, not a sleep goal. Let yourself sleep normally if maintaining awareness keeps you awake.',
  }
};
