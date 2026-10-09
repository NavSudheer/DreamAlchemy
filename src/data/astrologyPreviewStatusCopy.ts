/**
 * Astrology Preview Status Copy
 *
 * A typed, content-only dataset of user-facing status copy for optional
 * Astrology Preview and deployment states:
 * 1. Disabled (`disabled`): Feature is currently inactive for this build.
 * 2. Configuration Pending (`configuration-pending`): Server or environment setup in progress.
 * 3. Provider Unavailable (`provider-unavailable`): External calculation service unreachable.
 * 4. Rate Limited (`rate-limited`): Request safety threshold reached; cooldown required.
 * 5. Private Preview Active (`private-preview-active`): Private test preview active with privacy boundaries.
 * 6. Production Blocked (`production-blocked`): Public release restricted pending verification gates.
 *
 * All wording is strictly concise, provider-neutral, non-predictive, and free of
 * uptime or launch-date promises.
 */

export type AstrologyPreviewStatus =
  | 'disabled'
  | 'configuration-pending'
  | 'provider-unavailable'
  | 'rate-limited'
  | 'private-preview-active'
  | 'production-blocked';

export interface AstrologyPreviewStatusCopy {
  /** Unique status key */
  status: AstrologyPreviewStatus;
  /** Primary screen or card header title */
  title: string;
  /** Compact label for tabs, pills, or table cells */
  shortTitle: string;
  /** Badge label for status chips */
  badgeLabel: string;
  /** Concise one-sentence summary */
  summary: string;
  /** User-facing explanatory narrative */
  description: string;
  /** Key bullet points highlighting boundaries, scope, or recovery */
  keyTakeaways: readonly string[];
  /** Screen reader accessible description */
  accessibilityLabel: string;
  /** Whether chart calculation requests are permitted in this status */
  isCalculationPermitted: boolean;
}

export interface AstrologyPreviewStatusBundle {
  /** Section title */
  title: string;
  /** Subtitle or introductory note */
  subtitle: string;
  /** Master privacy reassurance statement */
  masterNote: string;
  /** Map of status copy entries indexed by status key */
  statuses: Record<AstrologyPreviewStatus, AstrologyPreviewStatusCopy>;
  /** Ordered array of status keys for consistent presentation */
  orderedStatuses: readonly AstrologyPreviewStatus[];
}

export const ASTROLOGY_PREVIEW_STATUSES: readonly AstrologyPreviewStatus[] = [
  'disabled',
  'configuration-pending',
  'provider-unavailable',
  'rate-limited',
  'private-preview-active',
  'production-blocked',
] as const;

export const ASTROLOGY_PREVIEW_STATUS_COPY: Record<
  AstrologyPreviewStatus,
  AstrologyPreviewStatusCopy
> = {
  disabled: {
    status: 'disabled',
    title: 'Astrology Calculations Disabled',
    shortTitle: 'Disabled',
    badgeLabel: 'Disabled',
    summary:
      'Optional astrology calculation features are currently turned off for this build.',
    description:
      'The optional astrology preview is not enabled in this environment. Existing local astrology information and the Jungian dream journal remain available without sending an astrology calculation request.',
    keyTakeaways: [
      'Chart calculation requests are inactive.',
      'Existing local astrology information remains on this device.',
      'No astrology calculation request is sent while this feature is disabled.',
    ],
    accessibilityLabel:
      'Status notification indicating astrology calculations are disabled in this build.',
    isCalculationPermitted: false,
  },

  'configuration-pending': {
    status: 'configuration-pending',
    title: 'Server Configuration Pending',
    shortTitle: 'Pending Setup',
    badgeLabel: 'Setup Pending',
    summary:
      'Backend server setup is being finalized before preview requests can be processed.',
    description:
      'The calculation proxy or required server variables are currently being configured for this deployment. Once backend setup is verified, calculation requests can be safely processed.',
    keyTakeaways: [
      'Backend routes are being configured or verified.',
      'Local drafts and dream entries remain unaffected on-device.',
      'Calculation requests remain disabled until setup is verified and explicitly enabled.',
    ],
    accessibilityLabel:
      'Status notification indicating server configuration is pending.',
    isCalculationPermitted: false,
  },

  'provider-unavailable': {
    status: 'provider-unavailable',
    title: 'Calculation Service Unavailable',
    shortTitle: 'Unavailable',
    badgeLabel: 'Service Unavailable',
    summary:
      'The external astronomical calculation service could not complete this request.',
    description:
      'The external ephemeris calculation provider did not complete the request. You can try again later; the failure does not modify locally saved astrology information or dream entries.',
    keyTakeaways: [
      'The external ephemeris calculation request did not complete.',
      'The request may be retried later without a promised recovery time.',
      'The failed request does not modify locally saved records.',
    ],
    accessibilityLabel:
      'Status notification indicating the external calculation provider is temporarily unavailable.',
    isCalculationPermitted: false,
  },

  'rate-limited': {
    status: 'rate-limited',
    title: 'Request Limit Reached',
    shortTitle: 'Rate Limited',
    badgeLabel: 'Rate Limited',
    summary:
      'The request rate limit has been reached; please pause briefly before trying again.',
    description:
      'To ensure fair usage and prevent system overages, astrology calculation requests are temporarily rate-limited. Please wait a short cooldown period before submitting a new calculation.',
    keyTakeaways: [
      'Request frequency threshold reached.',
      'A temporary cooldown pause is required before retrying.',
      'Protects external services and prevents unintended request bursts.',
    ],
    accessibilityLabel:
      'Status notification indicating request rate limits have been reached.',
    isCalculationPermitted: false,
  },

  'private-preview-active': {
    status: 'private-preview-active',
    title: 'Private Preview Active',
    shortTitle: 'Preview Active',
    badgeLabel: 'Preview Active',
    summary:
      'Private test preview is active for controlled evaluation with the documented request boundaries.',
    description:
      'The optional astrology preview is active in this test build. Calculation requests contain the disclosed birth parameters and exclude the friendly location label and dream records. External services process requests under their own privacy and retention terms.',
    keyTakeaways: [
      'Active for private validation and evaluation testing.',
      'Astrology requests exclude friendly location labels and dream records.',
      'Results are provided for symbolic reflection and personal contemplation only.',
    ],
    accessibilityLabel:
      'Status notification indicating private astrology preview is active for testing.',
    isCalculationPermitted: true,
  },

  'production-blocked': {
    status: 'production-blocked',
    title: 'Production Deployment Blocked',
    shortTitle: 'Production Blocked',
    badgeLabel: 'Production Blocked',
    summary:
      'General production rollout is restricted pending completion of verification gates.',
    description:
      'Public production release remains intentionally blocked until durable request limits, budget safeguards, and testing checklists are fully verified. Calculations are restricted to designated private preview environments.',
    keyTakeaways: [
      'Public release restricted until all architectural safety gates are satisfied.',
      'Requires verified rate limiters, spend caps, and test matrix sign-offs.',
      'Restricted to private preview testing environments.',
    ],
    accessibilityLabel:
      'Status notification indicating public production deployment is blocked pending verification gates.',
    isCalculationPermitted: false,
  },
};

export const ASTROLOGY_PREVIEW_STATUS_BUNDLE: AstrologyPreviewStatusBundle = {
  title: 'Astrology Preview Status',
  subtitle:
    'Operational states and deployment boundaries for the optional Astrology Preview.',
  masterNote:
    'Astrology request contracts exclude friendly location labels, personal identity fields, and Jungian dream entries; external services still process the disclosed calculation fields under their own terms.',
  statuses: ASTROLOGY_PREVIEW_STATUS_COPY,
  orderedStatuses: ASTROLOGY_PREVIEW_STATUSES,
};

/**
 * Retrieve user-facing status copy for a specific Astrology Preview status.
 */
export function getAstrologyPreviewStatusCopy(
  status: AstrologyPreviewStatus,
): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY[status];
}

/**
 * Retrieve all Astrology Preview status copy entries in recommended display order.
 */
export function getAllAstrologyPreviewStatusCopies(): AstrologyPreviewStatusCopy[] {
  return ASTROLOGY_PREVIEW_STATUSES.map(
    (status) => ASTROLOGY_PREVIEW_STATUS_COPY[status],
  );
}

/**
 * Retrieve all supported Astrology Preview status keys.
 */
export function getAllAstrologyPreviewStatuses(): readonly AstrologyPreviewStatus[] {
  return ASTROLOGY_PREVIEW_STATUSES;
}

/**
 * Retrieve the status chip badge label for a specific preview status.
 */
export function getAstrologyPreviewStatusBadgeLabel(
  status: AstrologyPreviewStatus,
): string {
  return ASTROLOGY_PREVIEW_STATUS_COPY[status].badgeLabel;
}

/**
 * Check whether chart calculation requests are permitted for a given status.
 */
export function isCalculationPermittedForStatus(
  status: AstrologyPreviewStatus,
): boolean {
  return ASTROLOGY_PREVIEW_STATUS_COPY[status].isCalculationPermitted;
}

/**
 * Retrieve the complete Astrology Preview status bundle.
 */
export function getAstrologyPreviewStatusBundle(): AstrologyPreviewStatusBundle {
  return ASTROLOGY_PREVIEW_STATUS_BUNDLE;
}

/**
 * Type guard verifying whether a value is a recognized AstrologyPreviewStatus.
 */
export function isValidAstrologyPreviewStatus(
  value: unknown,
): value is AstrologyPreviewStatus {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_STATUSES.includes(value as AstrologyPreviewStatus)
  );
}

/**
 * Helper to retrieve copy for the disabled status.
 */
export function getDisabledPreviewStatusCopy(): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY.disabled;
}

/**
 * Helper to retrieve copy for the configuration pending status.
 */
export function getConfigurationPendingStatusCopy(): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY['configuration-pending'];
}

/**
 * Helper to retrieve copy for the provider unavailable status.
 */
export function getProviderUnavailableStatusCopy(): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY['provider-unavailable'];
}

/**
 * Helper to retrieve copy for the rate limited status.
 */
export function getRateLimitedStatusCopy(): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY['rate-limited'];
}

/**
 * Helper to retrieve copy for the private preview active status.
 */
export function getPrivatePreviewActiveStatusCopy(): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY['private-preview-active'];
}

/**
 * Helper to retrieve copy for the production blocked status.
 */
export function getProductionBlockedStatusCopy(): AstrologyPreviewStatusCopy {
  return ASTROLOGY_PREVIEW_STATUS_COPY['production-blocked'];
}
