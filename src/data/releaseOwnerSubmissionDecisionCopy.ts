import {
  isReleaseSubmissionReviewCloseoutRecordValid,
  type ReleaseSubmissionReviewCloseoutRecord,
} from './releaseSubmissionReviewCloseoutCopy';
import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';

export type ReleaseOwnerSubmissionDecision =
  | 'resolve-review-items'
  | 'hold'
  | 'decline'
  | 'authorize-separate-submission-action';

export interface ReleaseOwnerSubmissionDecisionRecord {
  closeout: ReleaseSubmissionReviewCloseoutRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  decision: ReleaseOwnerSubmissionDecision;
  decidedBy: 'owner';
  selectionMethod: 'explicit-owner-selection';
  recordedTimestamp: string;
  submissionActionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseOwnerSubmissionDecisionEntry {
  decision: ReleaseOwnerSubmissionDecision;
  title: string;
  prompt: string;
  availability: string;
  nextStep: string;
  isAutoSelected: false;
  performsSubmission: false;
  grantsApproval: false;
}

export interface ReleaseOwnerSubmissionDecisionCopy {
  title: string;
  subtitle: string;
  prerequisiteReminder: string;
  candidateReminder: string;
  explicitSelectionReminder: string;
  authorizationBoundary: string;
  nonApprovalBoundary: string;
  orderedDecisions: readonly ReleaseOwnerSubmissionDecision[];
  decisions: Readonly<
    Record<ReleaseOwnerSubmissionDecision, ReleaseOwnerSubmissionDecisionEntry>
  >;
  allowedRecordFields: readonly string[];
  prohibitedDecisionContent: readonly string[];
}

export const RELEASE_OWNER_SUBMISSION_DECISION_ORDER = [
  'resolve-review-items',
  'hold',
  'decline',
  'authorize-separate-submission-action',
] as const satisfies readonly ReleaseOwnerSubmissionDecision[];

export const RELEASE_OWNER_SUBMISSION_DECISIONS = {
  'resolve-review-items': {
    decision: 'resolve-review-items',
    title: 'Resolve review items',
    prompt:
      'Should the unresolved pending, change-required, or externally blocked review items return to their assigned review paths?',
    availability:
      'Use when the valid closeout preserves one or more unresolved review item ids.',
    nextStep:
      'Return only the preserved exact item ids to their existing evidence, change, or blocker workflow.',
    isAutoSelected: false,
    performsSubmission: false,
    grantsApproval: false,
  },
  hold: {
    decision: 'hold',
    title: 'Hold this candidate',
    prompt:
      'Should this candidate remain paused without starting another review or submission action?',
    availability:
      'Available as an explicit owner choice after a valid closeout, regardless of unresolved-item count.',
    nextStep:
      'Keep the candidate and closeout unchanged until the owner makes another explicit decision.',
    isAutoSelected: false,
    performsSubmission: false,
    grantsApproval: false,
  },
  decline: {
    decision: 'decline',
    title: 'Decline this candidate',
    prompt:
      'Should this candidate stop in the current review cycle?',
    availability:
      'Available as an explicit owner choice after a valid closeout, regardless of unresolved-item count.',
    nextStep:
      'Record the exact decision marker only; do not imply a replacement candidate or action.',
    isAutoSelected: false,
    performsSubmission: false,
    grantsApproval: false,
  },
  'authorize-separate-submission-action': {
    decision: 'authorize-separate-submission-action',
    title: 'Authorize a separate submission action',
    prompt:
      'Does the owner explicitly authorize making a separately confirmed submission action available for this same candidate?',
    availability:
      'Available only when a valid closeout is fully reviewed and routes to an explicit owner submission decision.',
    nextStep:
      'Expose a separate confirmation step for the same candidate. This decision does not perform a submission.',
    isAutoSelected: false,
    performsSubmission: false,
    grantsApproval: false,
  },
} as const satisfies Readonly<
  Record<ReleaseOwnerSubmissionDecision, ReleaseOwnerSubmissionDecisionEntry>
>;

export const releaseOwnerSubmissionDecisionCopy: ReleaseOwnerSubmissionDecisionCopy = {
  title: 'Owner submission decision',
  subtitle:
    'Record one explicit owner decision after a valid submission-review closeout without performing any submission action.',
  prerequisiteReminder:
    'Use the existing valid closeout. Preserve its unresolved item ids and fully reviewed or unresolved state exactly.',
  candidateReminder:
    'The configured and installed candidate identity must exactly match the closeout candidate. A different candidate requires its own testing and review sequence.',
  explicitSelectionReminder:
    'The owner must select one decision directly. No summary, count, validation result, default, or automated process may select it.',
  authorizationBoundary:
    'Authorize-separate-submission-action may enable only a new, separately confirmed action for the same candidate. It never submits a build or metadata itself.',
  nonApprovalBoundary:
    'No decision implies legal correctness, App Store acceptance, release, launch, provider approval, signing approval, or Production activation.',
  orderedDecisions: RELEASE_OWNER_SUBMISSION_DECISION_ORDER,
  decisions: RELEASE_OWNER_SUBMISSION_DECISIONS,
  allowedRecordFields: [
    'Existing valid submission-review closeout',
    'Matching candidate build identity',
    'One exact explicit owner decision marker',
    'Owner and explicit-selection markers',
    'Recorded timestamp',
    'Not-performed submission-action marker',
    'Not-inferred acceptance and approval markers',
  ],
  prohibitedDecisionContent: [
    'Credentials, passwords, tokens, headers, cookies, secret keys, private configuration, signing certificates, profiles, identities, or keys',
    'Apple, developer, store, provider, subscription, team, membership, account, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostic archives, request or response payloads, screenshots, recordings, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or descriptions of sensitive media',
    'Legal-correctness, App Store-acceptance, release, launch, provider, signing, or Production-approval claims',
    'Any approval or authorization claim beyond the exact explicit owner decision marker',
  ],
};

function isSameCandidateIdentity(
  first: ReleaseCandidateBuildIdentityRecord,
  second: ReleaseCandidateBuildIdentityRecord,
): boolean {
  return (
    first.configured.publicVersion === second.configured.publicVersion &&
    first.configured.iosBuildNumber === second.configured.iosBuildNumber &&
    first.configured.shortGitCommit === second.configured.shortGitCommit &&
    first.configured.branchName === second.configured.branchName &&
    first.installed.publicVersion === second.installed.publicVersion &&
    first.installed.iosBuildNumber === second.installed.iosBuildNumber &&
    first.installed.observedTimestamp === second.installed.observedTimestamp &&
    first.comparison === second.comparison &&
    first.approvalState === second.approvalState
  );
}

export function getReleaseOwnerSubmissionDecisionCopy(): ReleaseOwnerSubmissionDecisionCopy {
  return releaseOwnerSubmissionDecisionCopy;
}

export function isReleaseOwnerSubmissionDecisionRecordValid(
  record: ReleaseOwnerSubmissionDecisionRecord,
): boolean {
  if (
    !isReleaseSubmissionReviewCloseoutRecordValid(record.closeout) ||
    !isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.closeout.selectedCandidateIdentity,
    ) ||
    record.decidedBy !== 'owner' ||
    record.selectionMethod !== 'explicit-owner-selection' ||
    !record.recordedTimestamp.trim() ||
    record.submissionActionState !== 'not-performed' ||
    record.appStoreAcceptanceState !== 'not-inferred' ||
    record.providerApprovalState !== 'not-inferred' ||
    record.signingApprovalState !== 'not-inferred' ||
    record.productionApprovalState !== 'not-inferred'
  ) {
    return false;
  }

  const hasUnresolvedItems =
    record.closeout.closeoutState === 'unresolved-items-remain';

  switch (record.decision) {
    case 'resolve-review-items':
      return hasUnresolvedItems;

    case 'authorize-separate-submission-action':
      return (
        !hasUnresolvedItems &&
        record.closeout.nextProcessAvailable ===
          'explicit-owner-submission-decision'
      );

    case 'hold':
    case 'decline':
      return true;

    default:
      return false;
  }
}
