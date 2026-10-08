/**
 * Astrology Progress & Loading State Copy
 *
 * A typed, content-only dataset of user-facing status labels, accessible announcements,
 * step indicators, and privacy reassurances for the optional Astrology workflow:
 * 1. validating-inputs: Checking birth date, optional time, and coordinates.
 * 2. calculating-placements: Requesting astronomical positions and aspects from the calculation service.
 * 3. saving-locally: Securely storing calculated placements and birth profile in local device storage.
 * 4. generating-reflection: Composing an optional symbolic AI reflection from calculated placements.
 *
 * Guidelines:
 * - Avoids timing promises (no speed guarantees or estimated durations).
 * - Avoids accuracy or predictive claims (framed strictly as symbolic and astronomical data reflection).
 * - Clearly distinguishes chart calculation (astronomical placements) from AI reflection (symbolic prose).
 * - Explicitly guarantees that personal dream journal entries remain local and separate.
 */

export type AstrologyProgressState =
  | 'validating-inputs'
  | 'calculating-placements'
  | 'saving-locally'
  | 'generating-reflection';

export type AstrologyProgressPhase = 'calculation' | 'reflection';

export interface AstrologyProgressEntry {
  /** The progress state identifier */
  state: AstrologyProgressState;
  /** Phase distinguishing astronomical calculation from optional AI reflection */
  phase: AstrologyProgressPhase;
  /** Primary user-facing status title/label */
  label: string;
  /** Compact label for badges, chips, or minimal headers */
  shortLabel: string;
  /** User-friendly description explaining what is currently happening */
  description: string;
  /** Screen reader accessible label for the current state */
  accessibilityLabel: string;
  /** Screen reader hint contextualizing the step in the workflow */
  accessibilityHint: string;
  /** Live region announcement text for screen readers */
  liveRegionAnnouncement: string;
  /** Explicit reassurance on local storage and dream journal isolation */
  privacyReassurance: string;
  /** 1-based sequential step number within the full pipeline */
  stepNumber: number;
  /** Total number of steps in the full pipeline */
  totalSteps: number;
}

export interface AstrologyProgressBundle {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Universal privacy guarantee applicable throughout all progress phases */
  privacyGuarantee: string;
  /** Non-predictive disclosure reminder */
  nonPredictiveReminder: string;
  /** Map of progress copy entries keyed by state */
  states: Record<AstrologyProgressState, AstrologyProgressEntry>;
}

export const ASTROLOGY_PROGRESS_COPY: Record<
  AstrologyProgressState,
  AstrologyProgressEntry
> = {
  'validating-inputs': {
    state: 'validating-inputs',
    phase: 'calculation',
    label: 'Validating Birth Details',
    shortLabel: 'Validating',
    description:
      'Checking birth date, optional time, and geographic coordinates for chart calculation.',
    accessibilityLabel: 'Validating birth details',
    accessibilityHint:
      'Step 1 of 4: Checking birth date, optional time, and coordinate inputs.',
    liveRegionAnnouncement:
      'Validating birth inputs for chart calculation.',
    privacyReassurance:
      'Input validation occurs locally on this device. Form entries remain on screen and are not saved until calculation succeeds.',
    stepNumber: 1,
    totalSteps: 4,
  },
  'calculating-placements': {
    state: 'calculating-placements',
    phase: 'calculation',
    label: 'Calculating Chart Placements',
    shortLabel: 'Calculating',
    description:
      'Requesting planetary placements and aspect angles from the calculation service.',
    accessibilityLabel: 'Calculating chart placements',
    accessibilityHint:
      'Step 2 of 4: Requesting chart placements and aspect angles from the calculation service.',
    liveRegionAnnouncement:
      'Calculating astrological chart placements from birth data.',
    privacyReassurance:
      'Only birth parameters and coordinates are processed. Your personal dream journal entries and reflection notes are never included.',
    stepNumber: 2,
    totalSteps: 4,
  },
  'saving-locally': {
    state: 'saving-locally',
    phase: 'calculation',
    label: 'Saving Chart Locally',
    shortLabel: 'Saving',
    description:
      'Storing calculated chart placements and your birth profile in local device storage.',
    accessibilityLabel: 'Saving chart data locally',
    accessibilityHint:
      'Step 3 of 4: Storing calculated placements and birth profile in local device storage.',
    liveRegionAnnouncement:
      'Saving calculated chart and profile to local device storage.',
    privacyReassurance:
      'The returned chart and birth profile are saved only in local device storage and remain separate from the dream journal.',
    stepNumber: 3,
    totalSteps: 4,
  },
  'generating-reflection': {
    state: 'generating-reflection',
    phase: 'reflection',
    label: 'Generating Symbolic Reflection',
    shortLabel: 'Reflecting',
    description:
      'Composing an optional symbolic reflection from calculated chart placements and aspect relationships.',
    accessibilityLabel: 'Generating symbolic AI reflection',
    accessibilityHint:
      'Step 4 of 4: Creating an optional symbolic reflection from calculated chart placements.',
    liveRegionAnnouncement:
      'Composing symbolic reflection from chart placements. Dream journal entries are not included.',
    privacyReassurance:
      'Reflection generation uses only compact chart placement summaries. Raw dream journal text, personal notes, and birth identifiers are never sent to the reflection service.',
    stepNumber: 4,
    totalSteps: 4,
  },
};

export const ASTROLOGY_PROGRESS_BUNDLE: AstrologyProgressBundle = {
  title: 'Astrology Preparation & Reflection',
  subtitle: 'Calculating placements and generating optional symbolic reflections',
  privacyGuarantee:
    'Birth profiles and calculated charts are stored locally on your device. Dream journal records remain separate and are never transmitted.',
  nonPredictiveReminder:
    'Astrology placements and reflections are offered solely for symbolic exploration and personal self-reflection, not for predictive or diagnostic evaluation.',
  states: ASTROLOGY_PROGRESS_COPY,
};

export const ASTROLOGY_PROGRESS_STATES: readonly AstrologyProgressState[] = [
  'validating-inputs',
  'calculating-placements',
  'saving-locally',
  'generating-reflection',
] as const;

/**
 * Retrieve progress entry copy for a given astrology progress state.
 */
export function getAstrologyProgressCopy(
  state: AstrologyProgressState,
): AstrologyProgressEntry {
  return ASTROLOGY_PROGRESS_COPY[state];
}

/**
 * Retrieve all recognized astrology progress states in sequential order.
 */
export function getAllAstrologyProgressStates(): AstrologyProgressState[] {
  return [...ASTROLOGY_PROGRESS_STATES];
}

/**
 * Retrieve all progress entries in sequential order.
 */
export function getAllAstrologyProgressEntries(): AstrologyProgressEntry[] {
  return ASTROLOGY_PROGRESS_STATES.map((state) => ASTROLOGY_PROGRESS_COPY[state]);
}

/**
 * Filter progress entries by phase (calculation vs reflection).
 */
export function getAstrologyProgressEntriesByPhase(
  phase: AstrologyProgressPhase,
): AstrologyProgressEntry[] {
  return getAllAstrologyProgressEntries().filter((entry) => entry.phase === phase);
}

/**
 * Retrieve the operational phase for a given progress state.
 */
export function getProgressPhase(
  state: AstrologyProgressState,
): AstrologyProgressPhase {
  return ASTROLOGY_PROGRESS_COPY[state]?.phase ?? 'calculation';
}

/**
 * Determine whether the given progress state is part of astronomical chart calculation.
 */
export function isCalculationPhase(state: AstrologyProgressState): boolean {
  return getProgressPhase(state) === 'calculation';
}

/**
 * Determine whether the given progress state is part of optional AI reflection generation.
 */
export function isReflectionPhase(state: AstrologyProgressState): boolean {
  return getProgressPhase(state) === 'reflection';
}

/**
 * Retrieve the screen reader accessible label for an astrology progress state.
 */
export function getAstrologyProgressAccessibilityLabel(
  state: AstrologyProgressState,
): string {
  return (
    ASTROLOGY_PROGRESS_COPY[state]?.accessibilityLabel ??
    'Processing astrology request'
  );
}

/**
 * Retrieve the screen reader hint for an astrology progress state.
 */
export function getAstrologyProgressAccessibilityHint(
  state: AstrologyProgressState,
): string {
  return (
    ASTROLOGY_PROGRESS_COPY[state]?.accessibilityHint ??
    'Processing astrology operation.'
  );
}

/**
 * Retrieve live region announcement text for screen readers upon state transition.
 */
export function getAstrologyProgressAnnouncement(
  state: AstrologyProgressState,
): string {
  return (
    ASTROLOGY_PROGRESS_COPY[state]?.liveRegionAnnouncement ??
    'Processing astrology request.'
  );
}

/**
 * Retrieve the privacy reassurance statement for an astrology progress state.
 */
export function getAstrologyProgressPrivacyReassurance(
  state: AstrologyProgressState,
): string {
  return (
    ASTROLOGY_PROGRESS_COPY[state]?.privacyReassurance ??
    ASTROLOGY_PROGRESS_BUNDLE.privacyGuarantee
  );
}

/**
 * Retrieve step position metadata for a given progress state.
 */
export function getAstrologyProgressStep(
  state: AstrologyProgressState,
): { step: number; total: number } {
  const entry = ASTROLOGY_PROGRESS_COPY[state];
  return {
    step: entry?.stepNumber ?? 1,
    total: entry?.totalSteps ?? ASTROLOGY_PROGRESS_STATES.length,
  };
}

/**
 * Type guard verifying whether a value is a valid AstrologyProgressState.
 */
export function isRecognizedAstrologyProgressState(
  value: unknown,
): value is AstrologyProgressState {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PROGRESS_STATES.includes(value as AstrologyProgressState)
  );
}

/**
 * Resolves full or shorthand state names to a canonical AstrologyProgressState.
 */
export function resolveAstrologyProgressState(
  value: unknown,
): AstrologyProgressState | null {
  if (isRecognizedAstrologyProgressState(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim();
    if (normalized === 'validating' || normalized === 'validate') {
      return 'validating-inputs';
    }
    if (normalized === 'calculating' || normalized === 'calculate') {
      return 'calculating-placements';
    }
    if (normalized === 'saving' || normalized === 'save') {
      return 'saving-locally';
    }
    if (normalized === 'reflecting' || normalized === 'reflection') {
      return 'generating-reflection';
    }
  }
  return null;
}

/**
 * Retrieve the next sequential progress state within the full flow, or null if in the final state.
 */
export function getNextAstrologyProgressState(
  current: AstrologyProgressState,
): AstrologyProgressState | null {
  const index = ASTROLOGY_PROGRESS_STATES.indexOf(current);
  if (index === -1 || index >= ASTROLOGY_PROGRESS_STATES.length - 1) {
    return null;
  }
  return ASTROLOGY_PROGRESS_STATES[index + 1];
}

/**
 * Retrieve the preceding sequential progress state, or null if in the initial state.
 */
export function getPreviousAstrologyProgressState(
  current: AstrologyProgressState,
): AstrologyProgressState | null {
  const index = ASTROLOGY_PROGRESS_STATES.indexOf(current);
  if (index <= 0) {
    return null;
  }
  return ASTROLOGY_PROGRESS_STATES[index - 1];
}
