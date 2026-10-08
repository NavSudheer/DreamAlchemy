/**
 * Dream Image Progress & Loading State Copy
 *
 * A typed, content-only dataset of user-facing status labels, accessible announcements,
 * step indicators, and privacy reassurances across all active phases of the optional
 * Dream Image generation workflow:
 * 1. queued: Request is in the service queue awaiting rendering capacity.
 * 2. moderating: Curated scene description is verified against safety guidelines.
 * 3. rendering: Visual reflection is being artistically composed.
 * 4. finalizing: Output image and accessible alternative text are prepared for local display.
 *
 * Guidelines:
 * - Avoids timing promises (no specific duration or speed guarantees).
 * - Avoids interpretation claims (framed strictly as artistic visual reflections of curated scenes).
 * - Reassures user privacy at every step: only curated scene prompts and styles are processed,
 *   never raw personal dream journal text, dates, or reflections.
 */

export type DreamImageProgressState =
  | 'queued'
  | 'moderating'
  | 'rendering'
  | 'finalizing';

export interface DreamImageProgressEntry {
  /** The progress state key */
  state: DreamImageProgressState;
  /** Full user-facing title or status label */
  label: string;
  /** Compact label for badges, chips, or minimal UI headers */
  shortLabel: string;
  /** User-friendly description explaining what is currently happening */
  description: string;
  /** Screen reader accessible label for the current state */
  accessibilityLabel: string;
  /** Screen reader hint contextualizing the step in the overall workflow */
  accessibilityHint: string;
  /** Live region announcement text for screen reader status updates */
  liveRegionAnnouncement: string;
  /** Explicit reassurance that only curated scene/style inputs are processed and raw dream text stays local */
  privacyReassurance: string;
  /** 1-based sequential step order in the generation lifecycle */
  stepNumber: number;
  /** Total number of lifecycle progress steps */
  totalSteps: number;
}

export interface DreamImageProgressBundle {
  /** Header title for the generation progress view or overlay */
  title: string;
  /** Subtitle or general guidance */
  subtitle: string;
  /** Universal privacy guarantee applicable throughout all progress phases */
  privacyGuarantee: string;
  /** Map of progress copy entries keyed by state */
  states: Record<DreamImageProgressState, DreamImageProgressEntry>;
}

export const DREAM_IMAGE_PROGRESS_COPY: Record<
  DreamImageProgressState,
  DreamImageProgressEntry
> = {
  queued: {
    state: 'queued',
    label: 'Queued for Rendering',
    shortLabel: 'Queued',
    description:
      'Your request is waiting in the processing queue for the image service.',
    accessibilityLabel: 'Image generation queued',
    accessibilityHint:
      'Step 1 of 4: Waiting in queue for image generation processing to begin.',
    liveRegionAnnouncement:
      'Image request queued. Preparing curated scene prompt and chosen art style.',
    privacyReassurance:
      'Only the curated scene template and selected visual style are processed. Your raw dream journal text and personal notes remain stored locally and are not included in the request.',
    stepNumber: 1,
    totalSteps: 4,
  },
  moderating: {
    state: 'moderating',
    label: 'Reviewing Prompt Safety',
    shortLabel: 'Safety Check',
    description:
      'Verifying that the curated scene description meets the project safety guidelines before rendering.',
    accessibilityLabel: 'Reviewing prompt safety guidelines',
    accessibilityHint:
      'Step 2 of 4: Checking curated scene description against safety guidelines.',
    liveRegionAnnouncement:
      'Reviewing prompt safety. Raw journal text is never sent or reviewed.',
    privacyReassurance:
      'Safety review evaluates only the abstract catalog prompt. Personal journal reflections and dream narratives are not included in the request.',
    stepNumber: 2,
    totalSteps: 4,
  },
  rendering: {
    state: 'rendering',
    label: 'Rendering Visual Reflection',
    shortLabel: 'Rendering',
    description:
      'Creating an artistic visual interpretation from your selected scene template and art style.',
    accessibilityLabel: 'Rendering visual reflection',
    accessibilityHint:
      'Step 3 of 4: Generating artwork based on curated scene and chosen style.',
    liveRegionAnnouncement:
      'Rendering artwork from curated scene and style.',
    privacyReassurance:
      'Artwork is generated solely from the abstract scene prompt and selected aesthetic style. No personal dream narratives or dates are included in rendering.',
    stepNumber: 3,
    totalSteps: 4,
  },
  finalizing: {
    state: 'finalizing',
    label: 'Finalizing Artwork',
    shortLabel: 'Finalizing',
    description:
      'Preparing the rendered reflection image and accessible alternative text for display on your device.',
    accessibilityLabel: 'Finalizing artwork for display',
    accessibilityHint:
      'Step 4 of 4: Preparing the reflection image and descriptive alternative text.',
    liveRegionAnnouncement:
      'Finalizing artwork and descriptive alt text for local display.',
    privacyReassurance:
      'The visual reflection is prepared for display without modifying your saved dream journal entries.',
    stepNumber: 4,
    totalSteps: 4,
  },
};

export const DREAM_IMAGE_PROGRESS_BUNDLE: DreamImageProgressBundle = {
  title: 'Creating Visual Reflection',
  subtitle: 'Composing artwork from your chosen scene and style',
  privacyGuarantee:
    'Only the curated scene prompt and selected art style leave your device. Your personal dream text, interpretations, and notes remain stored locally and are not included in the request.',
  states: DREAM_IMAGE_PROGRESS_COPY,
};

export const DREAM_IMAGE_PROGRESS_STATES: readonly DreamImageProgressState[] = [
  'queued',
  'moderating',
  'rendering',
  'finalizing',
] as const;

/**
 * Retrieve progress entry copy for a given generation state.
 */
export function getDreamImageProgressCopy(
  state: DreamImageProgressState,
): DreamImageProgressEntry {
  return DREAM_IMAGE_PROGRESS_COPY[state];
}

/**
 * Retrieve all valid generation progress states in sequential order.
 */
export function getAllDreamImageProgressStates(): DreamImageProgressState[] {
  return [...DREAM_IMAGE_PROGRESS_STATES];
}

/**
 * Retrieve all progress entries in sequential order.
 */
export function getAllDreamImageProgressEntries(): DreamImageProgressEntry[] {
  return DREAM_IMAGE_PROGRESS_STATES.map(
    (state) => DREAM_IMAGE_PROGRESS_COPY[state],
  );
}

/**
 * Retrieve the screen reader accessible label for a progress state.
 */
export function getProgressAccessibilityLabel(
  state: DreamImageProgressState,
): string {
  return (
    DREAM_IMAGE_PROGRESS_COPY[state]?.accessibilityLabel ??
    'Creating visual reflection'
  );
}

/**
 * Retrieve the screen reader hint for a progress state.
 */
export function getProgressAccessibilityHint(
  state: DreamImageProgressState,
): string {
  return (
    DREAM_IMAGE_PROGRESS_COPY[state]?.accessibilityHint ??
    'Processing image generation request.'
  );
}

/**
 * Retrieve live region announcement text for screen readers upon state transition.
 */
export function getProgressAnnouncement(
  state: DreamImageProgressState,
): string {
  return (
    DREAM_IMAGE_PROGRESS_COPY[state]?.liveRegionAnnouncement ??
    'Creating visual reflection.'
  );
}

/**
 * Retrieve the privacy reassurance statement for a progress state.
 */
export function getProgressPrivacyReassurance(
  state: DreamImageProgressState,
): string {
  return (
    DREAM_IMAGE_PROGRESS_COPY[state]?.privacyReassurance ??
    DREAM_IMAGE_PROGRESS_BUNDLE.privacyGuarantee
  );
}

/**
 * Retrieve step position metadata for a given progress state.
 */
export function getProgressStep(
  state: DreamImageProgressState,
): { step: number; total: number } {
  const entry = DREAM_IMAGE_PROGRESS_COPY[state];
  return {
    step: entry?.stepNumber ?? 1,
    total: entry?.totalSteps ?? DREAM_IMAGE_PROGRESS_STATES.length,
  };
}

/**
 * Type guard verifying whether a value is a valid DreamImageProgressState.
 */
export function isRecognizedProgressState(
  value: unknown,
): value is DreamImageProgressState {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_PROGRESS_STATES.includes(value as DreamImageProgressState)
  );
}

/**
 * Retrieve the next sequential progress state, or null if already in the final state.
 */
export function getNextProgressState(
  current: DreamImageProgressState,
): DreamImageProgressState | null {
  const index = DREAM_IMAGE_PROGRESS_STATES.indexOf(current);
  if (index === -1 || index >= DREAM_IMAGE_PROGRESS_STATES.length - 1) {
    return null;
  }
  return DREAM_IMAGE_PROGRESS_STATES[index + 1];
}

/**
 * Retrieve the preceding sequential progress state, or null if already in the initial state.
 */
export function getPreviousProgressState(
  current: DreamImageProgressState,
): DreamImageProgressState | null {
  const index = DREAM_IMAGE_PROGRESS_STATES.indexOf(current);
  if (index <= 0) {
    return null;
  }
  return DREAM_IMAGE_PROGRESS_STATES[index - 1];
}
