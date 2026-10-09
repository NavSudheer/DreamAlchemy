/**
 * Dream Image Availability User Copy
 *
 * A typed, content-only dataset of user-facing copy for feature availability states:
 * 1. Feature Disabled (`feature-disabled`): Server feature flag is disabled/unconfigured.
 * 2. Sandbox Only (`sandbox-only`): Generation is isolated to staging/test environments.
 * 3. Provider Paused (`provider-paused`): Upstream rendering service temporarily paused.
 * 4. Budget Protection (`budget-protection`): Usage safeguards active to prevent overages.
 * 5. Limited Production (`limited-production`): Controlled live release under active safeguards.
 *
 * Strictly provider-neutral, non-predictive, privacy-preserving, and free of
 * timing, pricing, uptime, or retention promises.
 */

export type DreamImageAvailabilityState =
  | 'feature-disabled'
  | 'sandbox-only'
  | 'provider-paused'
  | 'budget-protection'
  | 'limited-production';

export interface DreamImageAvailabilityCopy {
  /** Unique availability state key */
  state: DreamImageAvailabilityState;
  /** Primary screen or card title */
  title: string;
  /** Short badge label for chips, headers, or status tags */
  badgeLabel: string;
  /** Concise one-sentence status summary */
  summary: string;
  /** User-friendly explanatory narrative */
  description: string;
  /** Reassurance message explaining local privacy and offline browsing availability */
  localAvailabilityNotice: string;
  /** Screen reader accessible description */
  accessibilityLabel: string;
  /** Whether this availability state permits image generation requests */
  isGenerationPermitted: boolean;
}

export interface DreamImageAvailabilityBundle {
  /** Section title */
  title: string;
  /** Subtitle or introductory note */
  subtitle: string;
  /** Master privacy reassurance statement */
  privacyReassurance: string;
  /** Map of availability copy entries indexed by state */
  states: Record<DreamImageAvailabilityState, DreamImageAvailabilityCopy>;
  /** Ordered array of state keys for consistent enumeration */
  orderedStates: readonly DreamImageAvailabilityState[];
}

export const DREAM_IMAGE_AVAILABILITY_STATES: readonly DreamImageAvailabilityState[] = [
  'feature-disabled',
  'sandbox-only',
  'provider-paused',
  'budget-protection',
  'limited-production',
] as const;

export const DREAM_IMAGE_AVAILABILITY_COPY: Record<
  DreamImageAvailabilityState,
  DreamImageAvailabilityCopy
> = {
  'feature-disabled': {
    state: 'feature-disabled',
    title: 'Image Generation Unavailable',
    badgeLabel: 'Feature Disabled',
    summary: 'Visual reflection generation is currently disabled in this version.',
    description:
      'The image generation feature is not active for this build. You can freely explore abstract scene templates and artistic styles offline without sending any data from your device.',
    localAvailabilityNotice:
      'All scene exploration and dream journaling remain fully functional offline.',
    accessibilityLabel:
      'Availability status: Visual reflection generation is currently disabled.',
    isGenerationPermitted: false,
  },

  'sandbox-only': {
    state: 'sandbox-only',
    title: 'Testing Environment Active',
    badgeLabel: 'Sandbox Only',
    summary: 'Image generation is currently restricted to isolated test environments.',
    description:
      'This feature is undergoing validation in a dedicated testing sandbox. Live production generation is not enabled, and no external provider requests are accepted from standard builds.',
    localAvailabilityNotice:
      'Catalog scene templates and style previews remain accessible on this device.',
    accessibilityLabel:
      'Availability status: Image generation is restricted to test environments.',
    isGenerationPermitted: false,
  },

  'provider-paused': {
    state: 'provider-paused',
    title: 'Generation Service Paused',
    badgeLabel: 'Service Paused',
    summary: 'Visual reflection generation is temporarily paused.',
    description:
      'The external image rendering service is temporarily paused while service checks or updates are underway. Saved dream and journal content is not included in image-generation requests.',
    localAvailabilityNotice:
      'You can continue browsing scene templates locally while the service is paused.',
    accessibilityLabel:
      'Availability status: Visual reflection service is temporarily paused.',
    isGenerationPermitted: false,
  },

  'budget-protection': {
    state: 'budget-protection',
    title: 'Usage Safeguard Active',
    badgeLabel: 'Usage Safeguard',
    summary: 'Generation requests are temporarily resting under usage safeguards.',
    description:
      'To ensure sustainable and safe service operation, generation is temporarily resting under automated usage safeguards. Local scene exploration and private journal entries remain fully accessible.',
    localAvailabilityNotice:
      'Your private dream journal and written interpretations remain available locally.',
    accessibilityLabel:
      'Availability status: Image generation is resting under usage safeguards.',
    isGenerationPermitted: false,
  },

  'limited-production': {
    state: 'limited-production',
    title: 'Visual Reflection Studio Active',
    badgeLabel: 'Limited Release',
    summary: 'Image generation is active in a controlled limited release with privacy safeguards.',
    description:
      'Visual reflection generation is available with strict rate safeguards. Requests transmit only curated catalog prompts and chosen styles; personal journal text never leaves your device.',
    localAvailabilityNotice:
      'Written dream entries and personal reflections remain strictly on-device.',
    accessibilityLabel:
      'Availability status: Image generation is active in a controlled release.',
    isGenerationPermitted: true,
  },
};

export const DREAM_IMAGE_AVAILABILITY_BUNDLE: DreamImageAvailabilityBundle = {
  title: 'Dream Image Availability',
  subtitle: 'Clear status indicators for visual reflection generation availability.',
  privacyReassurance:
    'Regardless of service availability, image-generation requests do not include written dream entries, reflections, tags, or timestamps.',
  states: DREAM_IMAGE_AVAILABILITY_COPY,
  orderedStates: DREAM_IMAGE_AVAILABILITY_STATES,
};

/**
 * Retrieve the availability copy for a specific state.
 */
export function getDreamImageAvailabilityCopy(
  state: DreamImageAvailabilityState,
): DreamImageAvailabilityCopy {
  return DREAM_IMAGE_AVAILABILITY_COPY[state];
}

/**
 * Retrieve all availability copy entries in standard order.
 */
export function getAllDreamImageAvailabilityCopies(): DreamImageAvailabilityCopy[] {
  return DREAM_IMAGE_AVAILABILITY_STATES.map((state) => DREAM_IMAGE_AVAILABILITY_COPY[state]);
}

/**
 * Retrieve all valid availability states as a readonly array.
 */
export function getAllDreamImageAvailabilityStates(): readonly DreamImageAvailabilityState[] {
  return DREAM_IMAGE_AVAILABILITY_STATES;
}

/**
 * Retrieve the compact badge label for a given availability state.
 */
export function getAvailabilityBadgeLabel(state: DreamImageAvailabilityState): string {
  return DREAM_IMAGE_AVAILABILITY_COPY[state].badgeLabel;
}

/**
 * Check whether a specific availability state permits generation requests.
 */
export function isGenerationAllowedForAvailabilityState(
  state: DreamImageAvailabilityState,
): boolean {
  return DREAM_IMAGE_AVAILABILITY_COPY[state].isGenerationPermitted;
}

/**
 * Retrieve the full availability copy bundle.
 */
export function getDreamImageAvailabilityBundle(): DreamImageAvailabilityBundle {
  return DREAM_IMAGE_AVAILABILITY_BUNDLE;
}

/**
 * Type guard verifying whether a value is a recognized DreamImageAvailabilityState.
 */
export function isValidDreamImageAvailabilityState(
  value: unknown,
): value is DreamImageAvailabilityState {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_AVAILABILITY_STATES.includes(value as DreamImageAvailabilityState)
  );
}
