import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseOwnerReviewDecisionRecord } from './releaseOwnerReviewDecisionCopy';
import {
  isReleaseSubmissionReviewItemOutcomeValid,
  type ReleaseSubmissionReviewItemOutcome,
  type ReleaseSubmissionReviewOutcome,
} from './releaseSubmissionReviewOutcomeCopy';
import {
  isReleaseSubmissionReviewStartRecordValid,
  RELEASE_SUBMISSION_REVIEW_ITEM_ORDER,
  type ReleaseSubmissionReviewItemId,
  type ReleaseSubmissionReviewStartRecord,
} from './releaseSubmissionReviewStartCopy';

export type ReleaseSubmissionReviewOutcomeCounts = Record<
  ReleaseSubmissionReviewOutcome,
  number
>;

export type ReleaseSubmissionReviewItemGroups = Record<
  ReleaseSubmissionReviewOutcome,
  readonly ReleaseSubmissionReviewItemId[]
>;

export interface ReleaseSubmissionReviewSummary {
  reviewStart: ReleaseSubmissionReviewStartRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  ownerDecision: ReleaseOwnerReviewDecisionRecord;
  totalItems: number;
  outcomeCounts: ReleaseSubmissionReviewOutcomeCounts;
  itemIdsByOutcome: ReleaseSubmissionReviewItemGroups;
  unresolvedChanges: readonly ReleaseSubmissionReviewItemId[];
  unresolvedBlockers: readonly ReleaseSubmissionReviewItemId[];
  ownerNextStepState: 'pending';
  legalCorrectnessState: 'not-inferred';
  appStoreAcceptanceState: 'not-inferred';
  approvalState: 'not-inferred';
}

export interface ReleaseSubmissionReviewSummaryCopy {
  title: string;
  subtitle: string;
  accountingReminder: string;
  unresolvedReminder: string;
  ownerNextStepPrompt: string;
  correctnessBoundary: string;
  approvalBoundary: string;
  orderedOutcomes: readonly ReleaseSubmissionReviewOutcome[];
  outcomeLabels: Readonly<Record<ReleaseSubmissionReviewOutcome, string>>;
  allowedSummaryFields: readonly string[];
  prohibitedSummaryContent: readonly string[];
}

export const RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_ORDER = [
  'pending',
  'evidence-confirmed',
  'change-required',
  'external-blocker',
  'not-applicable',
] as const satisfies readonly ReleaseSubmissionReviewOutcome[];

export const RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_LABELS = {
  pending: 'Pending',
  'evidence-confirmed': 'Evidence confirmed',
  'change-required': 'Change required',
  'external-blocker': 'External blocker',
  'not-applicable': 'Not applicable',
} as const satisfies Readonly<Record<ReleaseSubmissionReviewOutcome, string>>;

export const releaseSubmissionReviewSummaryCopy: ReleaseSubmissionReviewSummaryCopy = {
  title: 'Submission-review summary',
  subtitle:
    'A privacy-safe aggregate of every existing submission-review item outcome for the selected candidate.',
  accountingReminder:
    'Each exact existing submission-review item id appears once under pending, reviewed with no issue observed, changes required, externally blocked, or not applicable. Counts must match the id groups and total item count.',
  unresolvedReminder:
    'Unresolved changes must exactly match the change-required group, and unresolved blockers must exactly match the external-blocker group. Pending items remain visible separately.',
  ownerNextStepPrompt:
    'After reviewing this aggregate, what explicit next step does the owner choose through a separate decision process? This summary always leaves that state pending.',
  correctnessBoundary:
    'Aggregate counts, including a summary with only evidence-confirmed items, do not establish legal correctness, disclosure correctness, compliance, or App Store acceptance.',
  approvalBoundary:
    'No summary count, item group, absence of unresolved items, or completed accounting grants release, launch, submission, provider, signing, App Store, or Production approval.',
  orderedOutcomes: RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_ORDER,
  outcomeLabels: RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_LABELS,
  allowedSummaryFields: [
    'Validated submission-review start record',
    'Validated selected candidate identity',
    'Validated explicit owner-decision record',
    'Total item count',
    'Counts by existing submission-review outcome',
    'Exact existing submission-review item ids grouped by outcome',
    'Exact unresolved change and blocker item ids',
    'Pending owner next-step marker',
    'Not-inferred correctness, acceptance, and approval markers',
  ],
  prohibitedSummaryContent: [
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

function createEmptyOutcomeCounts(): ReleaseSubmissionReviewOutcomeCounts {
  return {
    pending: 0,
    'evidence-confirmed': 0,
    'change-required': 0,
    'external-blocker': 0,
    'not-applicable': 0,
  };
}

function createEmptyItemGroups(): Record<
  ReleaseSubmissionReviewOutcome,
  ReleaseSubmissionReviewItemId[]
> {
  return {
    pending: [],
    'evidence-confirmed': [],
    'change-required': [],
    'external-blocker': [],
    'not-applicable': [],
  };
}

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

export function buildReleaseSubmissionReviewSummary(
  reviewStart: ReleaseSubmissionReviewStartRecord,
  itemOutcomes: readonly ReleaseSubmissionReviewItemOutcome[],
): ReleaseSubmissionReviewSummary | undefined {
  if (!isReleaseSubmissionReviewStartRecordValid(reviewStart)) {
    return undefined;
  }

  const outcomeCounts = createEmptyOutcomeCounts();
  const itemIdsByOutcome = createEmptyItemGroups();
  const seenItemIds = new Set<ReleaseSubmissionReviewItemId>();

  for (const itemOutcome of itemOutcomes) {
    if (
      !isReleaseSubmissionReviewItemOutcomeValid(itemOutcome) ||
      seenItemIds.has(itemOutcome.itemId)
    ) {
      return undefined;
    }

    seenItemIds.add(itemOutcome.itemId);
    outcomeCounts[itemOutcome.outcome] += 1;
    itemIdsByOutcome[itemOutcome.outcome].push(itemOutcome.itemId);
  }

  if (
    seenItemIds.size !== RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.length ||
    !RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.every((itemId) =>
      seenItemIds.has(itemId),
    )
  ) {
    return undefined;
  }

  return {
    reviewStart,
    selectedCandidateIdentity: reviewStart.selectedCandidateIdentity,
    ownerDecision: reviewStart.ownerDecision,
    totalItems: RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.length,
    outcomeCounts,
    itemIdsByOutcome,
    unresolvedChanges: itemIdsByOutcome['change-required'],
    unresolvedBlockers: itemIdsByOutcome['external-blocker'],
    ownerNextStepState: 'pending',
    legalCorrectnessState: 'not-inferred',
    appStoreAcceptanceState: 'not-inferred',
    approvalState: 'not-inferred',
  };
}

export function getReleaseSubmissionReviewSummaryCopy(): ReleaseSubmissionReviewSummaryCopy {
  return releaseSubmissionReviewSummaryCopy;
}

export function isReleaseSubmissionReviewSummaryBalanced(
  summary: ReleaseSubmissionReviewSummary,
): boolean {
  if (
    !isReleaseSubmissionReviewStartRecordValid(summary.reviewStart) ||
    !isSameCandidateIdentity(
      summary.selectedCandidateIdentity,
      summary.reviewStart.selectedCandidateIdentity,
    ) ||
    !isSameOwnerDecision(
      summary.ownerDecision,
      summary.reviewStart.ownerDecision,
    ) ||
    summary.ownerNextStepState !== 'pending' ||
    summary.legalCorrectnessState !== 'not-inferred' ||
    summary.appStoreAcceptanceState !== 'not-inferred' ||
    summary.approvalState !== 'not-inferred'
  ) {
    return false;
  }

  const groupedItemIds = RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_ORDER.flatMap(
    (outcome) => summary.itemIdsByOutcome[outcome],
  );
  const groupedSet = new Set(groupedItemIds);
  const countTotal = RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_ORDER.reduce(
    (total, outcome) => total + summary.outcomeCounts[outcome],
    0,
  );

  return (
    summary.totalItems === RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.length &&
    countTotal === summary.totalItems &&
    groupedSet.size === groupedItemIds.length &&
    groupedSet.size === RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.length &&
    RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.every((itemId) =>
      groupedSet.has(itemId),
    ) &&
    RELEASE_SUBMISSION_REVIEW_SUMMARY_OUTCOME_ORDER.every(
      (outcome) =>
        summary.outcomeCounts[outcome] ===
        summary.itemIdsByOutcome[outcome].length,
    ) &&
    summary.unresolvedChanges.length ===
      summary.itemIdsByOutcome['change-required'].length &&
    summary.unresolvedChanges.every((itemId) =>
      summary.itemIdsByOutcome['change-required'].includes(itemId),
    ) &&
    summary.unresolvedBlockers.length ===
      summary.itemIdsByOutcome['external-blocker'].length &&
    summary.unresolvedBlockers.every((itemId) =>
      summary.itemIdsByOutcome['external-blocker'].includes(itemId),
    )
  );
}
