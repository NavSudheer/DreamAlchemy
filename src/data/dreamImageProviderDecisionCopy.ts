/**
 * Dream Image Provider Decision Copy
 *
 * A typed, content-only dataset of neutral user- and evaluator-facing labels
 * and explanations for provider evaluation states:
 * 1. Not Reviewed (`not-reviewed`)
 * 2. Under Review (`under-review`)
 * 3. Blocked (`blocked`)
 * 4. Approved for Sandbox (`approved-for-sandbox`)
 * 5. Approved for Limited Production (`approved-for-limited-production`)
 *
 * Strictly vendor-neutral, omitting vendor names, pricing claims, SLAs,
 * retention durations, and implementation instructions.
 */

export type DreamImageProviderEvaluationState =
  | 'not-reviewed'
  | 'under-review'
  | 'blocked'
  | 'approved-for-sandbox'
  | 'approved-for-limited-production';

export interface DreamImageProviderDecisionCopy {
  /** Unique evaluation state key */
  state: DreamImageProviderEvaluationState;
  /** Human-readable display label */
  label: string;
  /** Compact badge tag for headers or summary tables */
  badgeLabel: string;
  /** Concise one-sentence summary */
  shortDescription: string;
  /** Detailed neutral explanation of what this evaluation state represents */
  explanation: string;
  /** Screen reader accessible label */
  accessibilityLabel: string;
  /** Indicates whether the state permits non-production test execution */
  isSandboxPermitted: boolean;
  /** Indicates whether the state permits controlled production traffic */
  isProductionPermitted: boolean;
}

export const DREAM_IMAGE_PROVIDER_EVALUATION_STATES: readonly DreamImageProviderEvaluationState[] = [
  'not-reviewed',
  'under-review',
  'blocked',
  'approved-for-sandbox',
  'approved-for-limited-production',
] as const;

export const DREAM_IMAGE_PROVIDER_DECISION_COPY: Record<
  DreamImageProviderEvaluationState,
  DreamImageProviderDecisionCopy
> = {
  'not-reviewed': {
    state: 'not-reviewed',
    label: 'Not Reviewed',
    badgeLabel: 'Unreviewed',
    shortDescription: 'Candidate has not yet been assessed against the evaluation criteria.',
    explanation:
      'The prospective provider has been cataloged or proposed but has not yet undergone formal architectural, privacy, security, or safety evaluation.',
    accessibilityLabel: 'Provider candidate status: Not Reviewed',
    isSandboxPermitted: false,
    isProductionPermitted: false,
  },

  'under-review': {
    state: 'under-review',
    label: 'Under Review',
    badgeLabel: 'In Review',
    shortDescription: 'Candidate is actively being evaluated across architectural and privacy criteria.',
    explanation:
      'The candidate is undergoing active assessment across mandatory privacy terms, moderation controls, data-use terms, execution model, and security posture.',
    accessibilityLabel: 'Provider candidate status: Under Review',
    isSandboxPermitted: false,
    isProductionPermitted: false,
  },

  'blocked': {
    state: 'blocked',
    label: 'Blocked',
    badgeLabel: 'Blocked',
    shortDescription: 'Candidate does not meet one or more mandatory evaluation criteria.',
    explanation:
      'The candidate failed one or more required architectural, privacy, or safety standards, or triggered a disqualification criterion, preventing sandbox or production clearance.',
    accessibilityLabel: 'Provider candidate status: Blocked',
    isSandboxPermitted: false,
    isProductionPermitted: false,
  },

  'approved-for-sandbox': {
    state: 'approved-for-sandbox',
    label: 'Approved for Sandbox',
    badgeLabel: 'Sandbox Only',
    shortDescription: 'Approved strictly for isolated non-production proxy validation.',
    explanation:
      'The candidate satisfies baseline privacy and security standards and is cleared exclusively for isolated staging or test-environment proxy verification without enabling production traffic.',
    accessibilityLabel: 'Provider candidate status: Approved for Sandbox',
    isSandboxPermitted: true,
    isProductionPermitted: false,
  },

  'approved-for-limited-production': {
    state: 'approved-for-limited-production',
    label: 'Approved for Limited Production',
    badgeLabel: 'Limited Production',
    shortDescription: 'Approved for controlled production deployment under strict safeguards.',
    explanation:
      'The candidate has verified all required deployment gates and is cleared for restricted, disabled-by-default production rollout with active safeguards and monitoring.',
    accessibilityLabel: 'Provider candidate status: Approved for Limited Production',
    isSandboxPermitted: true,
    isProductionPermitted: true,
  },
};

/**
 * Retrieve the decision copy bundle for a specific provider evaluation state.
 */
export function getProviderDecisionCopy(
  state: DreamImageProviderEvaluationState,
): DreamImageProviderDecisionCopy {
  return DREAM_IMAGE_PROVIDER_DECISION_COPY[state];
}

/**
 * Retrieve all provider decision copy entries in the standard workflow order.
 */
export function getAllProviderDecisionCopies(): DreamImageProviderDecisionCopy[] {
  return DREAM_IMAGE_PROVIDER_EVALUATION_STATES.map((state) => DREAM_IMAGE_PROVIDER_DECISION_COPY[state]);
}

/**
 * Retrieve all valid provider evaluation states as a readonly array.
 */
export function getAllProviderEvaluationStates(): readonly DreamImageProviderEvaluationState[] {
  return DREAM_IMAGE_PROVIDER_EVALUATION_STATES;
}

/**
 * Retrieve the compact badge label for a given evaluation state.
 */
export function getProviderEvaluationStateBadgeLabel(
  state: DreamImageProviderEvaluationState,
): string {
  return DREAM_IMAGE_PROVIDER_DECISION_COPY[state].badgeLabel;
}

/**
 * Check whether a provider evaluation state permits production traffic.
 */
export function isApprovedForProduction(
  state: DreamImageProviderEvaluationState,
): boolean {
  return DREAM_IMAGE_PROVIDER_DECISION_COPY[state].isProductionPermitted;
}

/**
 * Check whether a provider evaluation state permits non-production sandbox execution.
 */
export function isApprovedForSandbox(
  state: DreamImageProviderEvaluationState,
): boolean {
  return DREAM_IMAGE_PROVIDER_DECISION_COPY[state].isSandboxPermitted;
}

/**
 * Type guard verifying whether a value is a recognized DreamImageProviderEvaluationState.
 */
export function isValidProviderEvaluationState(
  value: unknown,
): value is DreamImageProviderEvaluationState {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_PROVIDER_EVALUATION_STATES.includes(value as DreamImageProviderEvaluationState)
  );
}
