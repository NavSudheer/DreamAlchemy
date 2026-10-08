/**
 * Astrology Provider Error & Recovery Copy
 *
 * A typed, content-only dataset of user-facing error messages, recovery guidance,
 * and local data preservation guarantees across all failure states of the optional Astrology flow:
 * 1. disabled: Feature flag is disabled or unconfigured in this build/environment.
 * 2. offline: Device network is disconnected or unreachable during calculation.
 * 3. invalid-provider-response: External calculation returned malformed, incomplete, or unparseable data.
 * 4. rate-limited: Session request threshold or calculation cap reached.
 * 5. reflection-unavailable: AI symbolic reflection service is offline, though chart calculation may have succeeded.
 *
 * Guidelines:
 * - Strictly non-predictive, non-diagnostic, and non-authoritative framing.
 * - Explicit about local data preservation: birth profiles, local charts, and dream journal
 *   entries remain safely preserved on this device across all error scenarios.
 */

export type AstrologyProviderErrorState =
  | 'disabled'
  | 'offline'
  | 'invalid-provider-response'
  | 'rate-limited'
  | 'reflection-unavailable';

export interface AstrologyProviderErrorEntry {
  /** The error state key */
  state: AstrologyProviderErrorState;
  /** Dialog or card header title */
  title: string;
  /** Detailed, user-friendly explanation of the issue */
  message: string;
  /** Actionable next step or remedy for the user */
  recoveryAction: string;
  /** Whether the user can immediately or shortly retry the operation */
  retryable: boolean;
  /** Explicit reassurance that local birth profile and chart data remain preserved on device */
  localDataPreservation: string;
  /** Recommended action button label */
  actionButtonLabel: string;
}

export interface AstrologyProviderErrorBundle {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Global guarantee that local data is never deleted or exposed by network failures */
  localDataGuarantee: string;
  /** Non-predictive disclaimer reminder */
  nonPredictiveReminder: string;
  /** Map of error copy entries keyed by state */
  errors: Record<AstrologyProviderErrorState, AstrologyProviderErrorEntry>;
}

export const ASTROLOGY_PROVIDER_ERROR_COPY: Record<
  AstrologyProviderErrorState,
  AstrologyProviderErrorEntry
> = {
  disabled: {
    state: 'disabled',
    title: 'Astrology Not Enabled',
    message:
      'The optional astrology reflection feature is currently not enabled or configured for this build.',
    recoveryAction:
      'You can continue exploring your dream journal and techniques. Any previously saved astrology data remains unchanged.',
    retryable: false,
    localDataPreservation:
      'Previously saved profile and chart data remain unchanged. Current form entries stay on screen but are not saved until a calculation succeeds.',
    actionButtonLabel: 'Return to Explore',
  },
  offline: {
    state: 'offline',
    title: 'No Network Connection',
    message:
      'Calculating an astrological chart requires an active network connection to reach the calculation service.',
    recoveryAction:
      'Check your Wi-Fi or mobile data connection and try calculating again.',
    retryable: true,
    localDataPreservation:
      'Your dream journal remains local and separate. Previously saved astrology data remains unchanged.',
    actionButtonLabel: 'Try Again',
  },
  'invalid-provider-response': {
    state: 'invalid-provider-response',
    title: 'Calculation Service Error',
    message:
      'The external calculation service responded with incomplete or unrecognized astronomical data for this birth profile.',
    recoveryAction:
      'Verify that your birth date, time, and coordinates are accurate, then try calculating again.',
    retryable: true,
    localDataPreservation:
      'Your current entries remain in the form so you can correct them and retry. They are not saved until a calculation succeeds.',
    actionButtonLabel: 'Retry Calculation',
  },
  'rate-limited': {
    state: 'rate-limited',
    title: 'Request Limit Reached',
    message:
      'The maximum number of calculation or reflection requests for this session has been reached.',
    recoveryAction:
      'Please wait a few moments before requesting another chart calculation or reflection.',
    retryable: false,
    localDataPreservation:
      'Any previously saved profile and chart results remain available on this device.',
    actionButtonLabel: 'Dismiss',
  },
  'reflection-unavailable': {
    state: 'reflection-unavailable',
    title: 'Symbolic Reflection Unavailable',
    message:
      'The optional AI-generated symbolic reflection service is temporarily unavailable or unconfigured.',
    recoveryAction:
      'You can still explore your calculated chart placements, zodiac signs, and symbolic aspects locally.',
    retryable: false,
    localDataPreservation:
      'The calculated chart and profile saved before this reflection request remain available on your device.',
    actionButtonLabel: 'View Placements',
  },
};

export const ASTROLOGY_PROVIDER_ERROR_BUNDLE: AstrologyProviderErrorBundle = {
  title: 'Astrology Service Status',
  subtitle: 'Information regarding chart calculation and reflection availability',
  localDataGuarantee:
    'Previously saved birth profiles and chart placements remain stored locally. Dream journal records stay separate and are not included in astrology requests.',
  nonPredictiveReminder:
    'Astrology placements and reflections are offered solely for symbolic exploration and self-reflection, not for predictive, psychological, or medical evaluation.',
  errors: ASTROLOGY_PROVIDER_ERROR_COPY,
};

export const ASTROLOGY_PROVIDER_ERROR_STATES: readonly AstrologyProviderErrorState[] = [
  'disabled',
  'offline',
  'invalid-provider-response',
  'rate-limited',
  'reflection-unavailable',
] as const;

/**
 * Retrieve error copy for a given astrology provider error state.
 */
export function getAstrologyProviderErrorCopy(
  state: AstrologyProviderErrorState,
): AstrologyProviderErrorEntry {
  return ASTROLOGY_PROVIDER_ERROR_COPY[state];
}

/**
 * Retrieve all recognized astrology provider error states.
 */
export function getAllAstrologyProviderErrorStates(): AstrologyProviderErrorState[] {
  return [...ASTROLOGY_PROVIDER_ERROR_STATES];
}

/**
 * Retrieve all error copy entries as an array.
 */
export function getAllAstrologyProviderErrorEntries(): AstrologyProviderErrorEntry[] {
  return ASTROLOGY_PROVIDER_ERROR_STATES.map(
    (state) => ASTROLOGY_PROVIDER_ERROR_COPY[state],
  );
}

/**
 * Check whether a given error state is retryable.
 */
export function isRetryableProviderError(
  state: AstrologyProviderErrorState,
): boolean {
  return ASTROLOGY_PROVIDER_ERROR_COPY[state]?.retryable ?? false;
}

/**
 * Type guard verifying whether a value is a valid AstrologyProviderErrorState.
 */
export function isRecognizedProviderErrorState(
  value: unknown,
): value is AstrologyProviderErrorState {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PROVIDER_ERROR_STATES.includes(value as AstrologyProviderErrorState)
  );
}

/**
 * Resolves an error object, status phrase, or message to a typed AstrologyProviderErrorEntry.
 */
export function resolveAstrologyProviderError(
  error: unknown,
): AstrologyProviderErrorEntry {
  if (isRecognizedProviderErrorState(error)) {
    return ASTROLOGY_PROVIDER_ERROR_COPY[error];
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'state' in error &&
    isRecognizedProviderErrorState((error as { state: unknown }).state)
  ) {
    return ASTROLOGY_PROVIDER_ERROR_COPY[(error as { state: AstrologyProviderErrorState }).state];
  }

  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message)
      : '';

  const normalized = rawMessage.toLowerCase();

  if (
    normalized.includes('not enabled') ||
    normalized.includes('not configured') ||
    normalized.includes('not_available') ||
    normalized.includes('disabled')
  ) {
    return ASTROLOGY_PROVIDER_ERROR_COPY['disabled'];
  }

  if (
    normalized.includes('offline') ||
    normalized.includes('network') ||
    normalized.includes('failed to fetch') ||
    normalized.includes('abort') ||
    normalized.includes('timeout') ||
    normalized.includes('connection')
  ) {
    return ASTROLOGY_PROVIDER_ERROR_COPY['offline'];
  }

  if (
    normalized.includes('rate') ||
    normalized.includes('429') ||
    normalized.includes('limit') ||
    normalized.includes('too many requests')
  ) {
    return ASTROLOGY_PROVIDER_ERROR_COPY['rate-limited'];
  }

  if (
    normalized.includes('reflection') ||
    normalized.includes('openai')
  ) {
    return ASTROLOGY_PROVIDER_ERROR_COPY['reflection-unavailable'];
  }

  return ASTROLOGY_PROVIDER_ERROR_COPY['invalid-provider-response'];
}
