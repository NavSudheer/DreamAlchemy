/**
 * Dream Image Result Actions Copy
 *
 * A typed, content-only dataset of user-facing labels, confirmations,
 * accessibility descriptions, and privacy notices for generated Dream Image result actions:
 * 1. regenerate: Request a new artistic rendering of the current scene and style.
 * 2. saveLocally: Save the generated image directly to device photos.
 * 3. share: Export the generated artwork via system sharing.
 * 4. delete: Remove the generated image from local device storage.
 *
 * All copy explicitly preserves user privacy by assuring dreamers that personal
 * dream journal narratives, reflections, tags, and timestamps are NEVER embedded
 * into image metadata or shared automatically.
 */

export type DreamImageResultActionKey =
  | 'regenerate'
  | 'saveLocally'
  | 'share'
  | 'delete';

export interface DreamImageActionConfirmation {
  /** Confirmation dialog title */
  dialogTitle: string;
  /** Confirmation dialog explanation message */
  dialogMessage: string;
  /** Primary confirmation button label */
  confirmLabel: string;
  /** Dismissal button label */
  cancelLabel: string;
}

export interface DreamImageResultActionCopy {
  /** The action identifier */
  key: DreamImageResultActionKey;
  /** Full action button label */
  label: string;
  /** Compact action label for icon buttons or toolbars */
  shortLabel: string;
  /** Explanatory description of what the action does */
  description: string;
  /** Screen reader accessible label */
  accessibilityLabel: string;
  /** Screen reader accessible action hint */
  accessibilityHint: string;
  /** Privacy reassurance that personal dream text is not exposed */
  privacyNotice: string;
  /** Post-action feedback or success confirmation message */
  successNotice: string;
  /** Optional confirmation dialog copy for high-impact actions */
  confirmation?: DreamImageActionConfirmation;
}

export interface DreamImageResultActionsBundle {
  /** Section header for the result actions menu */
  title: string;
  /** Subtitle or helper text */
  subtitle: string;
  /** Core privacy guarantee for all image export actions */
  privacyGuarantee: string;
  /** Map of action copies keyed by action type */
  actions: Record<DreamImageResultActionKey, DreamImageResultActionCopy>;
}

export const DREAM_IMAGE_RESULT_ACTIONS: Record<
  DreamImageResultActionKey,
  DreamImageResultActionCopy
> = {
  regenerate: {
    key: 'regenerate',
    label: 'Regenerate Visual Reflection',
    shortLabel: 'Regenerate',
    description:
      'Generate a new artistic rendering using the same curated scene description and chosen style.',
    accessibilityLabel: 'Regenerate visual reflection',
    accessibilityHint:
      'Requests a new artistic interpretation of this curated scene without modifying your written dream journal.',
    privacyNotice:
      'Regeneration uses only the abstract scene prompt and selected style. Your personal dream text is never sent or exposed.',
    successNotice: 'New visual reflection generated.',
    confirmation: {
      dialogTitle: 'Regenerate artwork?',
      dialogMessage:
        'This will create a new image reflection for this scene. Your written dream entry and analysis will remain completely unchanged.',
      confirmLabel: 'Regenerate',
      cancelLabel: 'Keep Current',
    },
  },
  saveLocally: {
    key: 'saveLocally',
    label: 'Save Image to Device',
    shortLabel: 'Save',
    description:
      'Save this generated visual reflection directly to your device photo library.',
    accessibilityLabel: 'Save image to device photos',
    accessibilityHint:
      'Saves a copy of this artwork to your device photos. No journal text is attached to the saved file.',
    privacyNotice:
      'Only the visual artwork is saved to your photo library. Personal journal narratives, dream dates, and interpretations are never embedded into image metadata.',
    successNotice: 'Image saved to your device photos.',
  },
  share: {
    key: 'share',
    label: 'Share Reflection Image',
    shortLabel: 'Share',
    description:
      'Share this generated visual reflection with friends or other apps.',
    accessibilityLabel: 'Share reflection image',
    accessibilityHint:
      'Opens the device share sheet with this artwork. Your journal text is not attached automatically.',
    privacyNotice:
      'Sharing prepares only the image file. Its descriptive alternative text remains available in the app; your journal narrative, interpretations, and notes are not attached automatically.',
    successNotice: 'Image ready to share.',
  },
  delete: {
    key: 'delete',
    label: 'Delete Artwork',
    shortLabel: 'Delete',
    description:
      'Permanently remove this generated reflection image from local storage.',
    accessibilityLabel: 'Delete generated artwork',
    accessibilityHint:
      'Removes the image file from this device. Your written dream entry, tags, and analysis remain intact.',
    privacyNotice:
      'Deleting removes only the image file from local storage. Your dream journal entry remains unchanged.',
    successNotice: 'Artwork deleted from local storage.',
    confirmation: {
      dialogTitle: 'Delete generated artwork?',
      dialogMessage:
        'This permanently deletes the generated visual reflection from your device. Your written dream entry, tags, and Jungian analysis will remain intact.',
      confirmLabel: 'Delete Image',
      cancelLabel: 'Keep Image',
    },
  },
};

export const DREAM_IMAGE_RESULT_ACTIONS_BUNDLE: DreamImageResultActionsBundle = {
  title: 'Artwork Actions',
  subtitle: 'Manage or share this visual reflection',
  privacyGuarantee:
    'Your journal entries, personal notes, and dream interpretations remain stored separately on this device and are not embedded into saved or shared images.',
  actions: DREAM_IMAGE_RESULT_ACTIONS,
};

export const DREAM_IMAGE_RESULT_ACTION_KEYS: readonly DreamImageResultActionKey[] =
  ['regenerate', 'saveLocally', 'share', 'delete'];

/**
 * Retrieve result action copy for a specific action key.
 */
export function getResultActionCopy(
  key: DreamImageResultActionKey,
): DreamImageResultActionCopy {
  return DREAM_IMAGE_RESULT_ACTIONS[key];
}

/**
 * Retrieve all supported result action keys.
 */
export function getAllResultActionKeys(): DreamImageResultActionKey[] {
  return [...DREAM_IMAGE_RESULT_ACTION_KEYS];
}

/**
 * Retrieve all result action copy entries as an array.
 */
export function getAllResultActionCopies(): DreamImageResultActionCopy[] {
  return DREAM_IMAGE_RESULT_ACTION_KEYS.map(key => DREAM_IMAGE_RESULT_ACTIONS[key]);
}

/**
 * Retrieve the screen-reader accessible label for a result action.
 */
export function getResultActionAccessibilityLabel(
  key: DreamImageResultActionKey,
): string {
  return DREAM_IMAGE_RESULT_ACTIONS[key]?.accessibilityLabel ?? `${key} artwork`;
}

/**
 * Retrieve the privacy reassurance notice for a result action.
 */
export function getResultActionPrivacyNotice(
  key: DreamImageResultActionKey,
): string {
  return (
    DREAM_IMAGE_RESULT_ACTIONS[key]?.privacyNotice ??
    'Your dream journal text is never embedded or shared automatically.'
  );
}

/**
 * Type guard verifying whether a value is a valid DreamImageResultActionKey.
 */
export function isRecognizedResultActionKey(
  value: unknown,
): value is DreamImageResultActionKey {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_RESULT_ACTION_KEYS.includes(value as DreamImageResultActionKey)
  );
}
