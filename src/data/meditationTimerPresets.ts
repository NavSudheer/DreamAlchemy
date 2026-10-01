/**
 * Meditation and Visualization Timer Presets
 *
 * A typed, content-only collection of gentle, offline timer presets designed for
 * relaxation, mindfulness, and pre-sleep visualization.
 *
 * All presets are educational and contemplative self-care aids.
 * They contain no medical, sleep-outcome, or lucid-dreaming guarantees.
 */

export interface MeditationTimerPreset {
  id: string;
  title: string;
  durationSeconds: number;
  description: string;
  cueLabels: string[];
  ambienceKey?: 'theta-6hz' | 'silence' | string;
}

export const MEDITATION_TIMER_PRESETS: MeditationTimerPreset[] = [
  {
    id: 'gentle-settle',
    title: 'Gentle Settle',
    durationSeconds: 300, // 5 minutes
    description: 'A brief, quiet pause to release daytime shoulder and jaw tension and step away from active screens.',
    cueLabels: ['Arrive and settle', 'Natural breath observation', 'Soft release'],
    ambienceKey: 'theta-6hz',
  },
  {
    id: 'breath-stillness',
    title: 'Breath & Body Stillness',
    durationSeconds: 600, // 10 minutes
    description: 'An unhurried session focusing attention on comfortable posture, effortless breathing, and sensory presence.',
    cueLabels: ['Grounding posture', 'Steady natural breathing', 'Quiet stillness', 'Gentle return'],
    ambienceKey: 'theta-6hz',
  },
  {
    id: 'pre-sleep-incubation',
    title: 'Pre-Sleep Incubation',
    durationSeconds: 900, // 15 minutes
    description: 'A quiet reflective session to gently contemplate a chosen question, peaceful memory, or creative theme before rest.',
    cueLabels: ['Physical settling', 'Introducing your theme', 'Open curiosity', 'Restful letting go'],
    ambienceKey: 'theta-6hz',
  },
  {
    id: 'deep-relaxation',
    title: 'Deep Quiet Relaxation',
    durationSeconds: 1200, // 20 minutes
    description: 'An extended period of calm, spacious resting without goals, performance expectations, or time pressure.',
    cueLabels: ['Full-body relaxation', 'Passive mental rest', 'Spacious stillness', 'Waking re-orientation'],
    ambienceKey: 'theta-6hz',
  },
  {
    id: 'silent-contemplation',
    title: 'Silent Mindful Space',
    durationSeconds: 600, // 10 minutes
    description: 'A completely silent, self-guided period of calm presence for those who prefer stillness without background audio tones.',
    cueLabels: ['Quiet arrival', 'Breath awareness', 'Open awareness', 'Closing stillness'],
    ambienceKey: undefined,
  },
];

/**
 * Default preset used when opening the timer without prior selection.
 */
export const DEFAULT_PRESET_ID = 'breath-stillness';

/**
 * Get a preset by its unique ID.
 */
export function getPresetById(id: string): MeditationTimerPreset | undefined {
  return MEDITATION_TIMER_PRESETS.find(preset => preset.id === id.trim());
}

/**
 * Retrieve all timer presets.
 */
export function getAllPresets(): MeditationTimerPreset[] {
  return MEDITATION_TIMER_PRESETS;
}

/**
 * Get the default preset.
 */
export function getDefaultPreset(): MeditationTimerPreset {
  return (
    getPresetById(DEFAULT_PRESET_ID) ||
    MEDITATION_TIMER_PRESETS[0]
  );
}

/**
 * Filter presets by ambience key or absence thereof.
 */
export function getPresetsByAmbience(ambienceKey?: string): MeditationTimerPreset[] {
  return MEDITATION_TIMER_PRESETS.filter(preset => preset.ambienceKey === ambienceKey);
}

/**
 * Format duration in seconds into a clean human-readable string (e.g. "10 min").
 */
export function formatPresetDuration(durationSeconds: number): string {
  const minutes = Math.round(durationSeconds / 60);
  return `${minutes} min`;
}
