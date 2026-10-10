/**
 * Astrology Preview Troubleshooting
 *
 * Typed, content-only recovery guidance for the private Astrology Preview.
 * Copy stays user-facing and refers only to public error codes; server secrets,
 * credentials, and internal provider details are deliberately excluded.
 */

export type AstrologyPreviewTroubleshootingTopic =
  | 'protected-preview-access'
  | 'feature-disabled'
  | 'invalid-field'
  | 'provider-unavailable'
  | 'rate-limited'
  | 'timeout'
  | 'reflection-unavailable'
  | 'safe-retry';

export type AstrologyPreviewPublicErrorCode =
  | 'feature_disabled'
  | 'provider_not_configured'
  | 'invalid_birth_date'
  | 'invalid_coordinates'
  | 'invalid_birth_time'
  | 'consent_required'
  | 'provider_unavailable'
  | 'provider_invalid_response'
  | 'provider_rate_limited'
  | 'rate_limit_exceeded'
  | 'rate_limit_not_configured'
  | 'rate_limit_unavailable'
  | 'provider_timeout'
  | 'reflection_not_configured'
  | 'reflection_empty'
  | 'internal_error';

export type AstrologyPreviewRetryTiming =
  | 'after-access'
  | 'after-correction'
  | 'after-preview-enabled'
  | 'after-waiting'
  | 'after-service-recovers'
  | 'immediate-once'
  | 'not-applicable';

export interface AstrologyPreviewTroubleshootingEntry {
  /** Stable troubleshooting topic. */
  id: AstrologyPreviewTroubleshootingTopic;
  /** User-facing card or section title. */
  title: string;
  /** Compact label for tabs, chips, or lists. */
  shortTitle: string;
  /** One-sentence description of the observed state. */
  summary: string;
  /** Public route codes that resolve to this guidance. */
  publicErrorCodes: readonly AstrologyPreviewPublicErrorCode[];
  /** Plain-language next step. */
  recoveryAction: string;
  /** When another request is appropriate. */
  retryTiming: AstrologyPreviewRetryTiming;
  /** Whether the current draft or saved local result should remain available. */
  localDataNote: string;
  /** Short action label suitable for a button or link. */
  actionLabel: string;
  /** Screen-reader description of the troubleshooting entry. */
  accessibilityLabel: string;
}

export interface AstrologyPreviewTroubleshootingBundle {
  title: string;
  subtitle: string;
  privacyReminder: string;
  retryReminder: string;
  items: Record<
    AstrologyPreviewTroubleshootingTopic,
    AstrologyPreviewTroubleshootingEntry
  >;
  orderedTopics: readonly AstrologyPreviewTroubleshootingTopic[];
}

export const ASTROLOGY_PREVIEW_TROUBLESHOOTING_ORDERED_TOPICS: readonly AstrologyPreviewTroubleshootingTopic[] = [
  'protected-preview-access',
  'feature-disabled',
  'invalid-field',
  'provider-unavailable',
  'rate-limited',
  'timeout',
  'reflection-unavailable',
  'safe-retry',
] as const;

export const ASTROLOGY_PREVIEW_TROUBLESHOOTING_ITEMS: Record<
  AstrologyPreviewTroubleshootingTopic,
  AstrologyPreviewTroubleshootingEntry
> = {
  'protected-preview-access': {
    id: 'protected-preview-access',
    title: 'Preview Access Required',
    shortTitle: 'Preview Access',
    summary:
      'The private Preview access screen appeared before DreamAlchemy could load.',
    publicErrorCodes: [],
    recoveryAction:
      'Open the Preview link shared by the test coordinator and complete its access screen. If the invitation or link no longer works, ask the coordinator for refreshed access. Do not enter an API key, provider credential, or server secret.',
    retryTiming: 'after-access',
    localDataNote:
      'Because the app did not load, no Astrology request was sent and your existing local records were not changed.',
    actionLabel: 'Try Preview Again',
    accessibilityLabel:
      'Private Preview access is required before the DreamAlchemy app can load.',
  },

  'feature-disabled': {
    id: 'feature-disabled',
    title: 'Astrology Preview Is Off',
    shortTitle: 'Preview Off',
    summary:
      'This Preview build is available, but optional Astrology processing is currently disabled.',
    publicErrorCodes: ['feature_disabled', 'provider_not_configured'],
    recoveryAction:
      'Continue using the local form or return to DreamAlchemy. If you are part of the private test, let the test coordinator know which Preview link and public error code you saw.',
    retryTiming: 'after-preview-enabled',
    localDataNote:
      'Your current form entries stay on screen, previously saved Astrology results remain local, and dream journals are unaffected.',
    actionLabel: 'Return to App',
    accessibilityLabel:
      'Optional Astrology processing is disabled for this private Preview build.',
  },

  'invalid-field': {
    id: 'invalid-field',
    title: 'Check the Highlighted Details',
    shortTitle: 'Check Details',
    summary:
      'One or more submitted fields or acknowledgements need attention before calculation can continue.',
    publicErrorCodes: [
      'invalid_birth_date',
      'invalid_coordinates',
      'invalid_birth_time',
      'consent_required',
    ],
    recoveryAction:
      'Review the highlighted field, follow its on-screen format guidance, and confirm the processing acknowledgement if you choose to continue. Use synthetic details during Preview testing.',
    retryTiming: 'after-correction',
    localDataNote:
      'The rejected request does not replace a previously saved profile, chart, or reflection.',
    actionLabel: 'Review Details',
    accessibilityLabel:
      'Submitted Astrology details need correction before the request can continue.',
  },

  'provider-unavailable': {
    id: 'provider-unavailable',
    title: 'Calculation Service Unavailable',
    shortTitle: 'Service Unavailable',
    summary:
      'The chart calculation service could not complete this request.',
    publicErrorCodes: [
      'provider_unavailable',
      'provider_invalid_response',
      'rate_limit_not_configured',
      'rate_limit_unavailable',
      'internal_error',
    ],
    recoveryAction:
      'Keep your entries on screen and try again later. During private testing, report the public error code and the time it occurred to the test coordinator; do not include birth details or request contents.',
    retryTiming: 'after-service-recovers',
    localDataNote:
      'Previously saved local Astrology data remains available, and your dream journal is not part of the calculation request.',
    actionLabel: 'Try Later',
    accessibilityLabel:
      'The Astrology calculation service is temporarily unavailable; local data remains unchanged.',
  },

  'rate-limited': {
    id: 'rate-limited',
    title: 'Request Limit Reached',
    shortTitle: 'Request Limit',
    summary:
      'The private Preview has temporarily paused additional calculation or reflection requests.',
    publicErrorCodes: ['provider_rate_limited', 'rate_limit_exceeded'],
    recoveryAction:
      'Wait before trying again. Avoid repeated taps or rapid retries; the Preview will accept another request after its request window allows it.',
    retryTiming: 'after-waiting',
    localDataNote:
      'The paused request does not remove your saved chart, reflection, or local form entries.',
    actionLabel: 'Dismiss',
    accessibilityLabel:
      'The private Preview request limit was reached; wait before trying again.',
  },

  timeout: {
    id: 'timeout',
    title: 'Request Took Too Long',
    shortTitle: 'Timed Out',
    summary:
      'The calculation or reflection did not finish within the Preview request window.',
    publicErrorCodes: ['provider_timeout'],
    recoveryAction:
      'Check that your connection is stable, then retry once. If the same timeout returns, stop retrying and share the public error code with the test coordinator.',
    retryTiming: 'immediate-once',
    localDataNote:
      'Your current entries and previously saved local results remain unchanged.',
    actionLabel: 'Try Once More',
    accessibilityLabel:
      'The Astrology request timed out and may be retried once on a stable connection.',
  },

  'reflection-unavailable': {
    id: 'reflection-unavailable',
    title: 'Reflection Unavailable',
    shortTitle: 'Reflection Unavailable',
    summary:
      'Your calculated chart may still be available even though the optional written reflection could not be created.',
    publicErrorCodes: ['reflection_not_configured', 'reflection_empty'],
    recoveryAction:
      'Continue exploring the calculated placements and aspects. You may request a reflection later when the Preview service is available; a new chart calculation is not required if your saved chart remains visible.',
    retryTiming: 'after-service-recovers',
    localDataNote:
      'The saved chart and profile remain on this device. No dream journal text is sent for an Astrology reflection.',
    actionLabel: 'View Chart',
    accessibilityLabel:
      'The optional written reflection is unavailable, but the calculated chart may still be viewed.',
  },

  'safe-retry': {
    id: 'safe-retry',
    title: 'Retry Safely',
    shortTitle: 'Safe Retry',
    summary:
      'Retry only after correcting the stated issue, waiting when asked, or confirming that a temporary interruption has cleared.',
    publicErrorCodes: [],
    recoveryAction:
      'Use the existing button once; do not refresh repeatedly or resubmit several times. Keep the same synthetic test details, note any public error code, and stop if the same failure repeats.',
    retryTiming: 'not-applicable',
    localDataNote:
      'Retrying never requires sharing credentials, copying private logs, or adding dream text to the Astrology request.',
    actionLabel: 'Review Retry Guidance',
    accessibilityLabel:
      'Guidance for retrying an Astrology Preview request without repeated submissions or private data sharing.',
  },
};

export const ASTROLOGY_PREVIEW_TROUBLESHOOTING_BUNDLE: AstrologyPreviewTroubleshootingBundle = {
  title: 'Astrology Preview Troubleshooting',
  subtitle:
    'Plain-language recovery guidance for access, validation, service, and retry states.',
  privacyReminder:
    'Share only the public error code and synthetic test context. Never share API keys, access tokens, authorization headers, real birth details, coordinates, or dream journal content.',
  retryReminder:
    'Retry once only when the guidance allows it; wait or contact the test coordinator when a disabled, limited, or repeated service state persists.',
  items: ASTROLOGY_PREVIEW_TROUBLESHOOTING_ITEMS,
  orderedTopics: ASTROLOGY_PREVIEW_TROUBLESHOOTING_ORDERED_TOPICS,
};

export function getAstrologyPreviewTroubleshootingItem(
  topic: AstrologyPreviewTroubleshootingTopic,
): AstrologyPreviewTroubleshootingEntry {
  return ASTROLOGY_PREVIEW_TROUBLESHOOTING_ITEMS[topic];
}

export function getAllAstrologyPreviewTroubleshootingItems(): AstrologyPreviewTroubleshootingEntry[] {
  return ASTROLOGY_PREVIEW_TROUBLESHOOTING_ORDERED_TOPICS.map(
    topic => ASTROLOGY_PREVIEW_TROUBLESHOOTING_ITEMS[topic],
  );
}

export function getAstrologyPreviewTroubleshootingBundle(): AstrologyPreviewTroubleshootingBundle {
  return ASTROLOGY_PREVIEW_TROUBLESHOOTING_BUNDLE;
}

export function getAstrologyPreviewTroubleshootingByErrorCode(
  code: AstrologyPreviewPublicErrorCode,
): AstrologyPreviewTroubleshootingEntry | undefined {
  return getAllAstrologyPreviewTroubleshootingItems().find(item =>
    item.publicErrorCodes.includes(code),
  );
}

export function isRecognizedAstrologyPreviewTroubleshootingTopic(
  value: unknown,
): value is AstrologyPreviewTroubleshootingTopic {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_TROUBLESHOOTING_ORDERED_TOPICS.includes(
      value as AstrologyPreviewTroubleshootingTopic,
    )
  );
}

export function isRecognizedAstrologyPreviewPublicErrorCode(
  value: unknown,
): value is AstrologyPreviewPublicErrorCode {
  return (
    typeof value === 'string' &&
    getAllAstrologyPreviewTroubleshootingItems().some(item =>
      item.publicErrorCodes.includes(value as AstrologyPreviewPublicErrorCode),
    )
  );
}

export function canRetryAstrologyPreviewTopicImmediately(
  topic: AstrologyPreviewTroubleshootingTopic,
): boolean {
  return ASTROLOGY_PREVIEW_TROUBLESHOOTING_ITEMS[topic].retryTiming === 'immediate-once';
}
