import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseOwnerReviewDecisionRecord } from './releaseOwnerReviewDecisionCopy';
import type { ReleaseSubmissionReviewItemId } from './releaseSubmissionReviewStartCopy';
import {
  isReleaseSubmissionReviewSummaryBalanced,
  type ReleaseSubmissionReviewSummary,
} from './releaseSubmissionReviewSummaryCopy';

export type ReleaseSubmissionReviewCloseoutState =
  | 'unresolved-items-remain'
  | 'fully-reviewed-pending-owner-submission-decision';

export type ReleaseSubmissionReviewCloseoutNextProcess =
  | 'resolve-unresolved-review-items'
  | 'explicit-owner-submission-decision';

export interface ReleaseSubmissionReviewCloseoutRecord {
  summary: ReleaseSubmissionReviewSummary;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  ownerDecisionContext: ReleaseOwnerReviewDecisionRecord;
  unresolvedPendingItemIds: readonly ReleaseSubmissionReviewItemId[];
  unresolvedChangeItemIds: readonly ReleaseSubmissionReviewItemId[];
  unresolvedBlockerItemIds: readonly ReleaseSubmissionReviewItemId[];
  closeoutState: ReleaseSubmissionReviewCloseoutState;
  nextProcessAvailable: ReleaseSubmissionReviewCloseoutNextProcess;
  ownerNextStepState: 'pending';
  legalCorrectnessState: 'not-inferred';
  appStoreAcceptanceState: 'not-inferred';
  approvalState: 'not-inferred';
}

export interface ReleaseSubmissionReviewCloseoutStep {
  id: string;
  order: number;
  title: string;
  instruction: string;
  confirmationChecks: readonly string[];
  completionRule: string;
  initialState: 'pending';
  boundary: string;
}

export interface ReleaseSubmissionReviewCloseoutCopy {
  title: string;
  subtitle: string;
  summaryReminder: string;
  contextReminder: string;
  unresolvedReminder: string;
  ownerNextStepReminder: string;
  fullyReviewedBoundary: string;
  correctnessBoundary: string;
  approvalBoundary: string;
  steps: readonly ReleaseSubmissionReviewCloseoutStep[];
  allowedRecordFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const RELEASE_SUBMISSION_REVIEW_CLOSEOUT_STEPS = [
  {
    id: 'confirm-balanced-summary',
    order: 1,
    title: 'Confirm balanced review accounting',
    instruction:
      'Validate the existing submission-review summary before beginning closeout.',
    confirmationChecks: [
      'Every exact existing review item id appears once in one outcome group.',
      'Outcome counts match their item-id groups and the total existing item count.',
      'The summary retains pending owner next step and not-inferred correctness, acceptance, and approval states.',
    ],
    completionRule:
      'Do not close out an unbalanced, duplicate, incomplete, or approval-inconsistent summary.',
    initialState: 'pending',
    boundary:
      'Balanced accounting describes review coverage only and does not establish correctness, acceptance, or approval.',
  },
  {
    id: 'confirm-same-candidate',
    order: 2,
    title: 'Confirm the same candidate identity',
    instruction:
      'Confirm that closeout carries the exact candidate identity already validated by the review start and balanced summary.',
    confirmationChecks: [
      'Configured public version, iOS build number, short commit, and branch match the summary candidate.',
      'Installed public version and iOS build number match the summary candidate.',
      'The candidate identity remains a non-approval record.',
    ],
    completionRule:
      'A changed or mismatched candidate requires its own owner testing, closeout, decision, and submission-review sequence.',
    initialState: 'pending',
    boundary:
      'Candidate identity does not prove upload, signing, App Store selection, release, or approval state.',
  },
  {
    id: 'confirm-owner-decision-context',
    order: 3,
    title: 'Confirm explicit owner-decision context',
    instruction:
      'Carry forward the same valid explicit ready-for-separate-submission-review owner decision that opened this review.',
    confirmationChecks: [
      'Decision, explicit-owner-selection marker, owner marker, recorded timestamp, and non-approval state match the summary context.',
      'The decision remains authorization to review only, not authorization to submit.',
    ],
    completionRule:
      'Do not substitute another decision, infer owner intent, or create a submission action from the review-start decision.',
    initialState: 'pending',
    boundary:
      'The prior owner decision opens a review stage only and grants no release, submission, provider, App Store, signing, or Production approval.',
  },
  {
    id: 'preserve-pending-items',
    order: 4,
    title: 'Preserve pending review items',
    instruction:
      'Copy every exact item id in the summary pending group into the closeout unresolved-pending group.',
    confirmationChecks: [
      'The two pending item-id sets match exactly.',
      'No pending item is omitted, reclassified, or treated as reviewed.',
    ],
    completionRule:
      'Any pending item keeps closeout in unresolved-items-remain and must return to its assigned evidence review.',
    initialState: 'pending',
    boundary:
      'Pending means review work remains; it is not evidence of correctness, acceptance, or approval.',
  },
  {
    id: 'preserve-change-items',
    order: 5,
    title: 'Preserve required changes',
    instruction:
      'Copy every exact item id in the summary change-required group into the closeout unresolved-change group.',
    confirmationChecks: [
      'The unresolved-change list exactly matches the summary change-required list.',
      'No required change is hidden under pending, not applicable, evidence confirmed, or approval language.',
    ],
    completionRule:
      'Any required change keeps closeout in unresolved-items-remain until the approved change and item re-review are complete.',
    initialState: 'pending',
    boundary:
      'The closeout identifies the item only; correction details remain in the separate privacy-safe work record.',
  },
  {
    id: 'preserve-blocked-items',
    order: 6,
    title: 'Preserve external blockers',
    instruction:
      'Copy every exact item id in the summary external-blocker group into the closeout unresolved-blocker group.',
    confirmationChecks: [
      'The unresolved-blocker list exactly matches the summary external-blocker list.',
      'No unavailable external source, secure account process, store system, or provider boundary is described as cleared or approved.',
    ],
    completionRule:
      'Any external blocker keeps closeout in unresolved-items-remain until the approved prerequisite changes and the item is reviewed again.',
    initialState: 'pending',
    boundary:
      'Do not include private system, account, store, provider, link, credential, or technical details.',
  },
  {
    id: 'route-owner-next-step',
    order: 7,
    title: 'Keep the owner next step pending',
    instruction:
      'Derive only which separate process is available, while leaving the owner next-step selection pending.',
    confirmationChecks: [
      'Unresolved items route back to their item-level review work.',
      'A fully reviewed summary exposes only the separate explicit owner submission-decision process.',
      'No owner decision is selected, recommended, defaulted, or inferred by closeout.',
    ],
    completionRule:
      'Closeout records available process and pending owner selection only; it never performs submission.',
    initialState: 'pending',
    boundary:
      'Fully reviewed means no pending, change-required, or external-blocker items. It does not mean legally correct, accepted, released, submitted, signed, or approved.',
  },
] as const satisfies readonly ReleaseSubmissionReviewCloseoutStep[];

export const releaseSubmissionReviewCloseoutCopy: ReleaseSubmissionReviewCloseoutCopy = {
  title: 'Submission-review closeout',
  subtitle:
    'A privacy-safe reconciliation of the balanced review summary before a separate explicit owner next step.',
  summaryReminder:
    'Use only the existing balanced submission-review summary. Closeout does not re-evaluate or replace item outcomes.',
  contextReminder:
    'The exact selected candidate identity and explicit owner-decision context must match the summary that entered submission review.',
  unresolvedReminder:
    'Preserve pending, change-required, and external-blocker item ids exactly. Any unresolved item returns to its assigned review path.',
  ownerNextStepReminder:
    'Owner next step remains pending. This copy never selects, recommends, defaults, or infers what the owner will do.',
  fullyReviewedBoundary:
    'A fully reviewed summary may proceed only to a separate explicit owner submission decision. It does not submit a build or metadata.',
  correctnessBoundary:
    'Closeout never establishes legal correctness, policy compliance, disclosure correctness, or App Store acceptance.',
  approvalBoundary:
    'No closeout state, absence of unresolved items, or available next process grants release, launch, submission, provider, signing, App Store, or Production approval.',
  steps: RELEASE_SUBMISSION_REVIEW_CLOSEOUT_STEPS,
  allowedRecordFields: [
    'Existing balanced submission-review summary',
    'Matching validated candidate identity',
    'Matching explicit owner-decision context',
    'Exact unresolved pending, change, and blocker item ids',
    'Derived closeout state and available separate process',
    'Pending owner next-step marker',
    'Not-inferred correctness, acceptance, and approval markers',
  ],
  prohibitedCloseoutContent: [
    'Credentials, tokens, headers, cookies, secret keys, signing certificates, profiles, keys, or private configuration',
    'Apple account, team, membership, App Store Connect, provider, subscription account, or device data',
    'Receipts, billing tokens, transaction records, payment details, prices, product identifiers, or configured store details',
    'Device names, serial numbers, UDIDs, advertising identifiers, or other device identifiers',
    'Public or private Preview, issue, repository, build, install, invitation, portal, account, support, policy, or access links and details',
    'Console output, build logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, generated media, listing assets, or other attachments',
    'Dream content, journal text, analyses, tags, personal reflections, real birth data, audio recordings, spoken phrases, voice transcripts, or descriptions of media',
    'Legal correctness, App Store acceptance, release, launch, submission, provider, signing, or Production approval claims',
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
    first.comparison === second.comparison &&
    first.approvalState === second.approvalState
  );
}

function isSameOwnerDecision(
  first: ReleaseOwnerReviewDecisionRecord,
  second: ReleaseOwnerReviewDecisionRecord,
): boolean {
  return (
    first.decision === second.decision &&
    first.decidedBy === second.decidedBy &&
    first.selectionMethod === second.selectionMethod &&
    first.recordedTimestamp === second.recordedTimestamp &&
    first.approvalState === second.approvalState
  );
}

function haveSameItemIds(
  first: readonly ReleaseSubmissionReviewItemId[],
  second: readonly ReleaseSubmissionReviewItemId[],
): boolean {
  return (
    first.length === second.length &&
    new Set(first).size === first.length &&
    new Set(second).size === second.length &&
    first.every((itemId) => second.includes(itemId))
  );
}

export function getReleaseSubmissionReviewCloseoutCopy(): ReleaseSubmissionReviewCloseoutCopy {
  return releaseSubmissionReviewCloseoutCopy;
}

export function isReleaseSubmissionReviewCloseoutRecordValid(
  record: ReleaseSubmissionReviewCloseoutRecord,
): boolean {
  if (
    !isReleaseSubmissionReviewSummaryBalanced(record.summary) ||
    !isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.summary.selectedCandidateIdentity,
    ) ||
    !isSameOwnerDecision(
      record.ownerDecisionContext,
      record.summary.ownerDecision,
    ) ||
    record.ownerNextStepState !== 'pending' ||
    record.legalCorrectnessState !== 'not-inferred' ||
    record.appStoreAcceptanceState !== 'not-inferred' ||
    record.approvalState !== 'not-inferred' ||
    !haveSameItemIds(
      record.unresolvedPendingItemIds,
      record.summary.itemIdsByOutcome.pending,
    ) ||
    !haveSameItemIds(
      record.unresolvedChangeItemIds,
      record.summary.unresolvedChanges,
    ) ||
    !haveSameItemIds(
      record.unresolvedBlockerItemIds,
      record.summary.unresolvedBlockers,
    )
  ) {
    return false;
  }

  const hasUnresolvedItems =
    record.unresolvedPendingItemIds.length > 0 ||
    record.unresolvedChangeItemIds.length > 0 ||
    record.unresolvedBlockerItemIds.length > 0;

  if (hasUnresolvedItems) {
    return (
      record.closeoutState === 'unresolved-items-remain' &&
      record.nextProcessAvailable === 'resolve-unresolved-review-items'
    );
  }

  return (
    record.closeoutState ===
      'fully-reviewed-pending-owner-submission-decision' &&
    record.nextProcessAvailable === 'explicit-owner-submission-decision'
  );
}
