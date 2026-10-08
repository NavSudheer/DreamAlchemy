/**
 * Astrology Consent & Status Copy
 *
 * A typed, content-only collection of user-facing copy for the optional Astrology
 * feature covering privacy consent, provider-unavailable, AI-reflection pending,
 * and local-deletion states.
 *
 * All copy explicitly informs the user that while birth fields and chart summaries
 * may be sent to external processing services for calculation and reflection generation,
 * saved profiles, charts, and reflections remain strictly local on the device and are
 * never mixed with Jungian dream journal entries.
 *
 * Framing is strictly reflective, educational, non-predictive, and non-diagnostic.
 */

export interface AstrologyConsentCopy {
  /** Screen or section header */
  title: string;
  /** High-level feature explanation */
  summary: string;
  /** Explicit agreement statement for the consent switch or checkbox */
  consentCheckboxLabel: string;
  /** Detailed network disclosure explaining external processing */
  externalProcessingNotice: string;
  /** Reassurance explaining that saved results stay strictly on-device */
  localStorageReassurance: string;
  /** Core disclaimer stating astrology is symbolic and non-predictive */
  nonPredictiveDisclaimer: string;
  /** Primary submission action label */
  confirmButtonLabel: string;
  /** Secondary dismiss action label */
  cancelButtonLabel: string;
}

export interface AstrologyUnavailableCopy {
  /** Short pill or badge tag */
  badgeLabel: string;
  /** Card or banner title */
  title: string;
  /** Detailed availability status explanation */
  description: string;
  /** Reassurance that local drafting remains offline and safe */
  safeBrowsingNotice: string;
}

export interface AstrologyPendingCopy {
  /** Calculation activity title */
  calculatingTitle: string;
  /** Calculation status description */
  calculatingDescription: string;
  /** AI reflection activity title */
  reflectionTitle: string;
  /** AI reflection status description */
  reflectionDescription: string;
  /** Reassurance that generated results are saved strictly locally */
  privacyReassurance: string;
  /** Timing guidance for requests in flight */
  estimatedDurationNotice: string;
}

export interface AstrologyDeletionCopy {
  /** Confirmation dialog title */
  dialogTitle: string;
  /** Confirmation dialog warning message */
  dialogMessage: string;
  /** Destructive action button label */
  confirmButtonLabel: string;
  /** Dismiss action button label */
  cancelButtonLabel: string;
  /** Post-deletion success banner message */
  successMessage: string;
}

export interface AstrologyCopyBundle {
  consent: AstrologyConsentCopy;
  unavailable: AstrologyUnavailableCopy;
  pending: AstrologyPendingCopy;
  deletion: AstrologyDeletionCopy;
}

export const ASTROLOGY_CONSENT_COPY: AstrologyConsentCopy = {
  title: 'Optional Astrology Reflection',
  summary:
    'Explore symbolic chart placements and archetypal reflections as an optional, separate companion to your inner work.',
  consentCheckboxLabel:
    'I understand this is reflective, not factual or predictive, and I consent to sending the calculation fields to external services.',
  externalProcessingNotice:
    'Calculating planetary placements and generating archetypal reflections requires sending your birth date, optional time and timezone, and coordinates to external calculation endpoints. Your personal journal entries and dream texts are never shared or sent.',
  localStorageReassurance:
    'Your birth profile, calculated chart, and reflection notes are stored strictly on this device and can be deleted at any time. Astrology data is kept entirely separate from your Jungian dream journal.',
  nonPredictiveDisclaimer:
    'Astrological interpretations are symbolic metaphors for self-reflection. They do not predict future events, determine destiny, or provide psychological or medical diagnoses.',
  confirmButtonLabel: 'Calculate Chart',
  cancelButtonLabel: 'Not Now',
};

export const ASTROLOGY_UNAVAILABLE_COPY: AstrologyUnavailableCopy = {
  badgeLabel: 'Preview Mode',
  title: 'Astrology Service Unavailable',
  description:
    'The external chart calculation and reflection service is currently offline or not configured for this build.',
  safeBrowsingNotice:
    'You can safely explore educational placement and aspect glossaries offline. No birth details leave your device while the service is unavailable.',
};

export const ASTROLOGY_PENDING_COPY: AstrologyPendingCopy = {
  calculatingTitle: 'Calculating Natal Chart',
  calculatingDescription:
    'Determining planetary placements and Ptolemaic aspects based on your provided birth coordinates and time.',
  reflectionTitle: 'Composing Archetypal Reflection',
  reflectionDescription:
    'Synthesizing symbolic placements into a contemplative reflection. This may take up to 30 seconds.',
  privacyReassurance:
    'External calculation is stateless. Your resulting chart and reflection are stored strictly on this device.',
  estimatedDurationNotice:
    'Please keep the app open while the calculation completes.',
};

export const ASTROLOGY_DELETION_COPY: AstrologyDeletionCopy = {
  dialogTitle: 'Delete local astrology data?',
  dialogMessage:
    'This removes the saved birth profile, chart, and reflection from this device.',
  confirmButtonLabel: 'Delete',
  cancelButtonLabel: 'Cancel',
  successMessage: 'Local astrology data deleted.',
};

export const ASTROLOGY_COPY_BUNDLE: AstrologyCopyBundle = {
  consent: ASTROLOGY_CONSENT_COPY,
  unavailable: ASTROLOGY_UNAVAILABLE_COPY,
  pending: ASTROLOGY_PENDING_COPY,
  deletion: ASTROLOGY_DELETION_COPY,
};

/**
 * Retrieve the privacy consent copy bundle.
 */
export function getAstrologyConsentCopy(): AstrologyConsentCopy {
  return ASTROLOGY_CONSENT_COPY;
}

/**
 * Retrieve the provider unavailable status copy.
 */
export function getAstrologyUnavailableCopy(): AstrologyUnavailableCopy {
  return ASTROLOGY_UNAVAILABLE_COPY;
}

/**
 * Retrieve the generation pending status copy.
 */
export function getAstrologyPendingCopy(): AstrologyPendingCopy {
  return ASTROLOGY_PENDING_COPY;
}

/**
 * Retrieve the local deletion confirmation copy.
 */
export function getAstrologyDeletionCopy(): AstrologyDeletionCopy {
  return ASTROLOGY_DELETION_COPY;
}

/**
 * Retrieve the complete astrology copy bundle.
 */
export function getAstrologyCopyBundle(): AstrologyCopyBundle {
  return ASTROLOGY_COPY_BUNDLE;
}
