/**
 * Dream Image Failure & Recovery Copy
 *
 * A typed, content-only dataset of user-facing error messages, recovery guidance,
 * and privacy reassurances across all failure states of the optional Dream Image flow:
 * 1. offline: Device network is disconnected or unreachable.
 * 2. provider-unavailable: External image service proxy is unconfigured or offline.
 * 3. moderation-rejected: Prompt description triggered safety filters.
 * 4. rate-limited: Request cap or cooldown window reached.
 * 5. retryable-failure: Transient timeout, transport interruption, or server glitch.
 *
 * All copy is concise, privacy-preserving, non-interpretive, and free of provider promises.
 * Consistently reassures dreamers that personal dream journal narratives remain safely offline.
 */

export type DreamImageFailureState =
  | 'offline'
  | 'provider-unavailable'
  | 'moderation-rejected'
  | 'rate-limited'
  | 'retryable-failure';

export interface DreamImageFailureEntry {
  /** The failure state key */
  state: DreamImageFailureState;
  /** Dialog or card header */
  title: string;
  /** Detailed, user-friendly explanation of the issue */
  message: string;
  /** Actionable next step or remedy for the user */
  recoveryAction: string;
  /** Whether the user can immediately or shortly retry the operation */
  retryable: boolean;
  /** Privacy reassurance that local dream journal text remains safe */
  privacyReassurance: string;
  /** Recommended action button label */
  actionButtonLabel: string;
}

export const DREAM_IMAGE_FAILURE_COPY: Record<
  DreamImageFailureState,
  DreamImageFailureEntry
> = {
  offline: {
    state: 'offline',
    title: 'No Internet Connection',
    message:
      'Dream image generation requires a network connection to reach the rendering service. Your device appears to be offline.',
    recoveryAction: 'Check your Wi-Fi or mobile data connection and try again.',
    retryable: true,
    privacyReassurance:
      'Your dream journal entries and reflection notes remain stored locally and are not included in this request.',
    actionButtonLabel: 'Try Again',
  },
  'provider-unavailable': {
    state: 'provider-unavailable',
    title: 'Image Service Unavailable',
    message:
      'The visual reflection service is currently offline or not configured for this build.',
    recoveryAction:
      'You can continue exploring and previewing curated scene templates and art styles offline.',
    retryable: false,
    privacyReassurance:
      'No personal dream data or prompt descriptions left your device.',
    actionButtonLabel: 'Continue Browsing',
  },
  'moderation-rejected': {
    state: 'moderation-rejected',
    title: 'Scene Description Not Allowed',
    message:
      'The requested visual reflection could not be generated because the scene description did not meet safety guidelines.',
    recoveryAction:
      'Choose another curated catalog scene and do not add names or personal details.',
    retryable: false,
    privacyReassurance:
      'Your raw dream journal entry remains stored locally and is not included in the generation request.',
    actionButtonLabel: 'Choose Another Scene',
  },
  'rate-limited': {
    state: 'rate-limited',
    title: 'Generation Limit Reached',
    message:
      'You have reached the visual reflection request limit for this session.',
    recoveryAction:
      'Please wait a little while before requesting another visual reflection.',
    retryable: false,
    privacyReassurance:
      'Your previously saved dream reflections and journal entries remain stored locally.',
    actionButtonLabel: 'Dismiss',
  },
  'retryable-failure': {
    state: 'retryable-failure',
    title: 'Generation Interrupted',
    message:
      'A temporary network or server interruption prevented your dream reflection from completing.',
    recoveryAction:
      'Please wait a moment and try generating your visual reflection again.',
    retryable: true,
    privacyReassurance:
      'Your dream journal narrative was not included in the request and remains stored locally.',
    actionButtonLabel: 'Try Again',
  },
};

export const DREAM_IMAGE_FAILURE_STATES: readonly DreamImageFailureState[] = [
  'offline',
  'provider-unavailable',
  'moderation-rejected',
  'rate-limited',
  'retryable-failure',
];

/**
 * Retrieve failure copy for a specific failure state.
 */
export function getDreamImageFailureCopy(
  state: DreamImageFailureState,
): DreamImageFailureEntry {
  return DREAM_IMAGE_FAILURE_COPY[state];
}

/**
 * Retrieve all supported failure state keys.
 */
export function getAllDreamImageFailureStates(): DreamImageFailureState[] {
  return [...DREAM_IMAGE_FAILURE_STATES];
}

/**
 * Retrieve all failure copy entries as an array.
 */
export function getAllDreamImageFailureEntries(): DreamImageFailureEntry[] {
  return DREAM_IMAGE_FAILURE_STATES.map(state => DREAM_IMAGE_FAILURE_COPY[state]);
}

/**
 * Check whether a failure state is marked retryable.
 */
export function isRetryableFailure(state: DreamImageFailureState): boolean {
  return DREAM_IMAGE_FAILURE_COPY[state]?.retryable ?? false;
}

/**
 * Type guard verifying whether a value is a valid DreamImageFailureState.
 */
export function isRecognizedFailureState(
  value: unknown,
): value is DreamImageFailureState {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_FAILURE_STATES.includes(value as DreamImageFailureState)
  );
}

/**
 * Maps an error object or error message string to the most appropriate failure entry.
 */
export function resolveDreamImageFailure(
  error: unknown,
): DreamImageFailureEntry {
  if (!error) {
    return DREAM_IMAGE_FAILURE_COPY['retryable-failure'];
  }

  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  if (
    message.includes('offline') ||
    message.includes('internet') ||
    message.includes('check your connection') ||
    message.includes('network')
  ) {
    return DREAM_IMAGE_FAILURE_COPY.offline;
  }

  if (
    message.includes('not configured') ||
    message.includes('not available yet') ||
    message.includes('unavailable') ||
    message.includes('503')
  ) {
    return DREAM_IMAGE_FAILURE_COPY['provider-unavailable'];
  }

  if (
    message.includes('safety') ||
    message.includes('moderation') ||
    message.includes('flagged') ||
    message.includes('disallowed') ||
    message.includes('rejected')
  ) {
    return DREAM_IMAGE_FAILURE_COPY['moderation-rejected'];
  }

  if (
    message.includes('rate limit') ||
    message.includes('too many requests') ||
    message.includes('limit reached') ||
    message.includes('429')
  ) {
    return DREAM_IMAGE_FAILURE_COPY['rate-limited'];
  }

  return DREAM_IMAGE_FAILURE_COPY['retryable-failure'];
}
