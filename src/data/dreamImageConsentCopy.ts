/**
 * Dream Image Consent & Status Copy
 *
 * A typed, content-only collection of user-facing copy for optional Dream Image
 * privacy consent, provider-unavailable, generation-pending, and local-deletion states.
 *
 * All copy is concise, non-interpretive, and explicit that only curated scene
 * prompts—never raw journal or dream text—may leave the device.
 */

export interface DreamImageConsentCopy {
  /** Screen or modal header */
  title: string;
  /** High-level feature explanation */
  summary: string;
  /** Explicit checkbox agreement statement */
  consentCheckboxLabel: string;
  /** Detailed network and privacy disclosure */
  externalProcessingNotice: string;
  /** Core disclaimer stating imagery is artistic rather than factual/predictive */
  nonInterpretiveDisclaimer: string;
  /** Primary submission action label */
  confirmButtonLabel: string;
  /** Secondary dismiss action label */
  cancelButtonLabel: string;
}

export interface DreamImageUnavailableCopy {
  /** Short pill or badge tag */
  badgeLabel: string;
  /** Card or banner title */
  title: string;
  /** Detailed availability status explanation */
  description: string;
  /** Reassurance that browsing templates remains offline and safe */
  safeBrowsingNotice: string;
}

export interface DreamImagePendingCopy {
  /** Activity title */
  title: string;
  /** Progress status description */
  description: string;
  /** Reassurance that private dream narrative stays local */
  privacyReassurance: string;
  /** Timing guidance for long-running generation requests */
  estimatedDurationNotice: string;
}

export interface DreamImageDeletionCopy {
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

export interface DreamImageCopyBundle {
  consent: DreamImageConsentCopy;
  unavailable: DreamImageUnavailableCopy;
  pending: DreamImagePendingCopy;
  deletion: DreamImageDeletionCopy;
}

export const DREAM_IMAGE_CONSENT_COPY: DreamImageConsentCopy = {
  title: 'Optional Visual Reflection',
  summary:
    'Transform your selected abstract scene into an interpretation-inspired visual reflection.',
  consentCheckboxLabel:
    'I understand that only this curated scene description and chosen art style—never my personal journal text—will leave my device.',
  externalProcessingNotice:
    'Image generation requires contacting an external rendering service. Your personal dream narrative, timestamps, and interpretations remain strictly offline on this device.',
  nonInterpretiveDisclaimer:
    'Generated images are artistic reflections inspired by symbolic motifs. They do not claim to depict objective dream meanings or factual outcomes.',
  confirmButtonLabel: 'Generate Visual Reflection',
  cancelButtonLabel: 'Not Now',
};

export const DREAM_IMAGE_UNAVAILABLE_COPY: DreamImageUnavailableCopy = {
  badgeLabel: 'Preview Mode',
  title: 'Image Service Not Configured',
  description:
    'The visual reflection generation service is currently offline or not configured for this device.',
  safeBrowsingNotice:
    'You can safely explore and preview scene templates and artistic styles. No data leaves your device.',
};

export const DREAM_IMAGE_PENDING_COPY: DreamImagePendingCopy = {
  title: 'Composing Visual Reflection',
  description:
    'Rendering your chosen abstract scene into artwork. This may take up to a minute.',
  privacyReassurance:
    'Only the curated scene prompt and style are in transit. Your dream text remains strictly private.',
  estimatedDurationNotice:
    'Please keep the app open while your reflection is being created.',
};

export const DREAM_IMAGE_DELETION_COPY: DreamImageDeletionCopy = {
  dialogTitle: 'Delete Dream Artwork?',
  dialogMessage:
    'This permanently deletes the generated visual reflection from this device. Your written dream entry and analysis will remain intact.',
  confirmButtonLabel: 'Delete Artwork',
  cancelButtonLabel: 'Keep Artwork',
  successMessage: 'Visual reflection deleted from local storage.',
};

export const DREAM_IMAGE_COPY_BUNDLE: DreamImageCopyBundle = {
  consent: DREAM_IMAGE_CONSENT_COPY,
  unavailable: DREAM_IMAGE_UNAVAILABLE_COPY,
  pending: DREAM_IMAGE_PENDING_COPY,
  deletion: DREAM_IMAGE_DELETION_COPY,
};

/**
 * Retrieve the privacy consent copy bundle.
 */
export function getDreamImageConsentCopy(): DreamImageConsentCopy {
  return DREAM_IMAGE_CONSENT_COPY;
}

/**
 * Retrieve the provider-unavailable status copy.
 */
export function getDreamImageUnavailableCopy(): DreamImageUnavailableCopy {
  return DREAM_IMAGE_UNAVAILABLE_COPY;
}

/**
 * Retrieve the generation-pending status copy.
 */
export function getDreamImagePendingCopy(): DreamImagePendingCopy {
  return DREAM_IMAGE_PENDING_COPY;
}

/**
 * Retrieve the local deletion confirmation copy.
 */
export function getDreamImageDeletionCopy(): DreamImageDeletionCopy {
  return DREAM_IMAGE_DELETION_COPY;
}

/**
 * Retrieve all dream image copy bundles combined.
 */
export function getDreamImageCopyBundle(): DreamImageCopyBundle {
  return DREAM_IMAGE_COPY_BUNDLE;
}
