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
  },
  '6': {
    title: 'SSILD (Senses Initiated Lucid Dream)',
    description: 'Cycle gentle awareness through sight, sound, and physical sensations during a nighttime awakening.',
    difficulty: 2,
    duration: '10-15 min',
    icon: 'sync',
    steps: [
      'Wake after 4–5 hours of sleep, stay relaxed in bed, and get comfortable',
      'Sight: Close your eyes and passively observe the darkness or faint patterns behind your eyelids without straining',
      'Sound: Shift attention to nearby ambient sounds, room hum, or your breathing for several seconds',
      'Touch: Shift attention to physical sensations, such as blanket weight, air temperature, or skin contact',
      'Repeat this cycle faster once or twice, then slow down each sensory stage to about twenty to thirty seconds',
      'Complete 3–4 slow cycles, then release all technique focus and drift off into natural sleep',
    ],
    tips: [
      'When to use: Best practiced during a natural nighttime awakening or morning nap, rather than initial bedtime',
      'Keep attention light and passive; do not strain to see or hear anything that is not there',
      'If your mind wanders, gently guide attention back to the current sensory stage',
      'Do not try to force lucidity while falling asleep; allow ordinary rest to take over',
    ],
    expectedResults: 'A gentle attention exercise to cultivate sensory focus. It may encourage spontaneous dream awareness for some practitioners, but results vary and sleep quality comes first.',
  },
  '7': {
    title: 'Dream Incubation',
    description: 'Focus your bedtime attention on a chosen theme, question, or creative idea to invite related dream imagery.',
    difficulty: 1,
    duration: '10-15 min',
    icon: 'target',
    steps: [
      'Choose one clear, meaningful theme, question, or image you would like to explore',
      'Write down your topic in your journal in one or two simple, neutral sentences before lying down',
      'Get comfortable in bed and spend several minutes gently visualizing or contemplating the scene',
      'Form a calm intention as you settle: "Tonight, my mind may reflect on this topic"',
      'Release active problem-solving and let yourself drift off into ordinary sleep without expectations',
      'Upon waking, capture any impressions, feelings, or dream fragments in your journal, even if seemingly unrelated',
    ],
    tips: [
      'When to use: Practice at bedtime when you feel relaxed, or before a calm daytime nap',
      'Choose simple, curiosity-driven topics rather than urgent or stressful problems',
      'Do not demand immediate answers or specific plots; treat whatever surfaces with open curiosity',
      'Review your notes over several days to observe subtle associations or repeating imagery',
    ],
    expectedResults: 'Dreams naturally incorporate waking thoughts and concerns, but sleep mentation is spontaneous. This practice can encourage creative reflection, though specific dream content is never guaranteed.',
  },
  '8': {
    title: 'Morning Recall Routine',
    description: 'A calm waking practice to capture fragile dream memories before movement and daily thoughts displace them.',
    difficulty: 1,
    duration: '5-10 min',
    icon: 'weather-sunny',
    steps: [
      'Upon waking, stay still in your current sleeping position with eyes closed for a moment',
      'Ask yourself gently: "What was just passing through my mind?"',
      'Notice any lingering mood, emotional tone, visual snapshot, or fragment of dialogue',
      'Trace backward from any initial clue to uncover preceding scenes or context',
      'If memory feels blank, slowly shift into other typical sleep positions to trigger associated recall',
      'Write down or voice-record whatever you remember immediately, even if it is only a single fragment or feeling',
    ],
    tips: [
      'When to use: Practice immediately upon waking each morning, before checking a phone or getting out of bed',
      'Keep a notebook or phone recorder within easy arm reach to avoid sudden movement',
      'Record emotional tone and vague impressions; every fragment helps build recall habit',
      'Be patient on low-recall mornings; dream memory naturally fluctuates with sleep cycles and waking speed',
    ],
    expectedResults: 'Consistent recall practice helps capture fleeting dream memories over time. Recall varies naturally from day to day, and mornings with zero remembered dreams are completely normal.',
  },
  '9': {
    title: 'Nightmare Aftercare',
    description: 'Ground your body and mind after a distressing dream, re-establish safety, and gently settle back into the present.',
    difficulty: 1,
    duration: '10-15 min',
    icon: 'hand-heart-outline',
    steps: [
      'Orient to your room: Open your eyes, turn on a soft light if helpful, and name three physical objects you can see',
      'Anchor in your body: Place a hand on your chest or feel the bed beneath you; remind yourself: "The dream is over. I am safe in my bed"',
      'Soothe your breathing: Take several slow, unhurried breaths, allowing your exhales to be longer and softer than your inhales',
      'Reset the space: Sip water, adjust your pillows, or step out of bed for a few minutes if physical tension remains high',
      'Optional daytime rescripting: Later during daylight hours, you may write down the dream and imagine a calm, safe alternative ending',
      'Rest without pressure: Return to bed only when ready; quiet, relaxed rest is beneficial even if sleep takes time to return',
    ],
    tips: [
      'When to use: Practice immediately upon waking from a distressing dream, or during daylight hours for safe rescripting',
      'Do not force yourself back to sleep while your heart is racing; prioritize physical comfort and grounding first',
      'Avoid analyzing frightening details in the dark; save any creative reflection for daylight hours',
      'If distressing nightmares are frequent, persistent, or connected to trauma, seek support from a qualified healthcare or mental health professional',
    ],
    expectedResults: 'Grounding and soothing practices help downregulate acute nervous system arousal and restore physical comfort. This guide is a self-care aid, not a clinical treatment for nightmare disorder or trauma.',
  },
};
