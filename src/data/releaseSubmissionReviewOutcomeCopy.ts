import {
  RELEASE_SUBMISSION_REVIEW_ITEM_ORDER,
  type ReleaseSubmissionReviewItemId,
} from './releaseSubmissionReviewStartCopy';

export type ReleaseSubmissionReviewOutcome =
  | 'pending'
  | 'evidence-confirmed'
  | 'change-required'
  | 'external-blocker'
  | 'not-applicable';

export type ReleaseSubmissionReviewEvidenceState =
  | 'unreviewed'
  | 'incomplete'
  | 'confirmed'
  | 'blocked'
  | 'not-applicable';

export interface ReleaseSubmissionReviewOutcomeEntry {
  outcome: ReleaseSubmissionReviewOutcome;
  label: string;
  badgeLabel: string;
  description: string;
  useWhen: readonly string[];
  doNotUseWhen: string;
  nextAction: string;
  compatibleEvidenceStates: readonly ReleaseSubmissionReviewEvidenceState[];
  grantsLegalApproval: false;
  grantsAppStoreApproval: false;
  grantsReleaseApproval: false;
  grantsSubmissionApproval: false;
  grantsProviderApproval: false;
  grantsSigningApproval: false;
  grantsProductionApproval: false;
  accessibilityLabel: string;
}

export interface ReleaseSubmissionReviewItemOutcome {
  itemId: ReleaseSubmissionReviewItemId;
  outcome: ReleaseSubmissionReviewOutcome;
  evidenceState: ReleaseSubmissionReviewEvidenceState;
  sanitizedNote: string;
}

export interface ReleaseSubmissionReviewOutcomeCopy {
  title: string;
  subtitle: string;
  evidenceReminder: string;
  distinctionReminder: string;
  noteReminder: string;
  approvalBoundary: string;
  maximumSanitizedNoteCharacters: number;
  orderedOutcomes: readonly ReleaseSubmissionReviewOutcome[];
  outcomes: Readonly<
    Record<ReleaseSubmissionReviewOutcome, ReleaseSubmissionReviewOutcomeEntry>
  >;
  allowedOutcomeFields: readonly string[];
  prohibitedEvidenceContent: readonly string[];
}

export const RELEASE_SUBMISSION_REVIEW_OUTCOME_ORDER = [
  'pending',
  'evidence-confirmed',
  'change-required',
  'external-blocker',
  'not-applicable',
] as const satisfies readonly ReleaseSubmissionReviewOutcome[];

export const RELEASE_SUBMISSION_REVIEW_OUTCOMES = {
  pending: {
    outcome: 'pending',
    label: 'Pending review',
    badgeLabel: 'Pending',
    description:
      'The submission review item has not yet been assessed, or evidence collection is still underway.',
    useWhen: [
      'Evaluation of the item against candidate evidence has not started.',
      'Verification evidence is incomplete or actively being gathered.',
    ],
    doNotUseWhen:
      'Do not use after the item has been reviewed; record evidence confirmed, change required, external blocker, or not applicable.',
    nextAction:
      'Execute the specific candidate checks and collect verified sanitized observations.',
    compatibleEvidenceStates: ['unreviewed', 'incomplete'],
    grantsLegalApproval: false,
    grantsAppStoreApproval: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsSigningApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Submission item pending review; no evaluation conclusion or approval has been made.',
  },
  'evidence-confirmed': {
    outcome: 'evidence-confirmed',
    label: 'Evidence confirmed',
    badgeLabel: 'Confirmed',
    description:
      'Candidate implementation, copy, assets, or configuration match current submission expectations with verified evidence.',
    useWhen: [
      'All item checks were completed against the exact confirmed candidate build.',
      'Supporting evidence kinds are documented and verified without open discrepancies.',
    ],
    doNotUseWhen:
      'Do not use if any defect, copy mismatch, unverified claim, or blocker remains unresolved.',
    nextAction:
      'Retain the confirmed sanitized evidence note for separate submission packaging.',
    compatibleEvidenceStates: ['confirmed'],
    grantsLegalApproval: false,
    grantsAppStoreApproval: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsSigningApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Submission item evidence confirmed against candidate; does not grant release or submission approval.',
  },
  'change-required': {
    outcome: 'change-required',
    label: 'Change required',
    badgeLabel: 'Change needed',
    description:
      'Discrepancies, outdated copy, asset defects, or claim mismatches require remediation before submission.',
    useWhen: [
      'Store copy, listing claims, privacy disclosures, assets, or links do not match the delivered candidate.',
      'A defect or inconsistency is found that must be resolved prior to submission.',
    ],
    doNotUseWhen:
      'Do not use for external portal or infrastructure outages; use external blocker instead.',
    nextAction:
      'Remediate the identified issue, produce an updated candidate or asset bundle, and re-review.',
    compatibleEvidenceStates: ['incomplete', 'confirmed'],
    grantsLegalApproval: false,
    grantsAppStoreApproval: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsSigningApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Change required: discrepancies or defects observed that must be remediated.',
  },
  'external-blocker': {
    outcome: 'external-blocker',
    label: 'External blocker',
    badgeLabel: 'Blocked',
    description:
      'External developer portal prerequisites, store outages, network restrictions, or third-party limits prevent completion.',
    useWhen: [
      'App Store Connect portal or developer account issues prevent verifying the item.',
      'External dependencies or sandbox environments outside the client app are unavailable.',
    ],
    doNotUseWhen:
      'Do not use for application bugs, asset defects, or copy mismatches; use change required.',
    nextAction:
      'Clear the external prerequisite or account blocker before resuming submission review.',
    compatibleEvidenceStates: ['blocked'],
    grantsLegalApproval: false,
    grantsAppStoreApproval: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsSigningApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'External blocker: external prerequisites prevent completing submission review.',
  },
  'not-applicable': {
    outcome: 'not-applicable',
    label: 'Not applicable',
    badgeLabel: 'N/A',
    description:
      'The item is explicitly outside the scope of the candidate build or intended distribution channel.',
    useWhen: [
      'The check applies only to a platform, feature, or distribution channel not part of this candidate.',
    ],
    doNotUseWhen:
      'Do not use to bypass required submission checklist items for the target release.',
    nextAction:
      'Record the clear rationale for why this item is out of scope in the sanitized note.',
    compatibleEvidenceStates: ['not-applicable'],
    grantsLegalApproval: false,
    grantsAppStoreApproval: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsSigningApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Submission item not applicable to this release scope; verified as out of scope.',
  },
} as const satisfies Readonly<
  Record<ReleaseSubmissionReviewOutcome, ReleaseSubmissionReviewOutcomeEntry>
>;

export const releaseSubmissionReviewOutcomeCopy: ReleaseSubmissionReviewOutcomeCopy = {
  title: 'Submission review item outcomes',
  subtitle:
    'Typed, privacy-safe per-item outcomes for App Store submission review.',
  evidenceReminder:
    'Every outcome must be substantiated by observable candidate evidence or an explicit out-of-scope determination.',
  distinctionReminder:
    'Preserve strict separation between pending items, required changes, and external environment blockers.',
  noteReminder:
    'Sanitized notes must be concise, text-only, and capped at 280 characters without sensitive or diagnostic artifacts.',
  approvalBoundary:
    'Recording item outcomes does not grant legal, App Store, release, submission, provider, signing, or Production approval.',
  maximumSanitizedNoteCharacters: 280,
  orderedOutcomes: RELEASE_SUBMISSION_REVIEW_OUTCOME_ORDER,
  outcomes: RELEASE_SUBMISSION_REVIEW_OUTCOMES,
  allowedOutcomeFields: [
    'itemId',
    'outcome',
    'evidenceState',
    'sanitizedNote',
  ],
  prohibitedEvidenceContent: [
    'Dream narratives, journal text, tags, analyses, or personal reflections',
    'Real birth dates, birth times, locations, coordinates, or profile identities',
    'Audio recordings, voice dictation audio files, transcripts, or media links',
    'Live API credentials, secret keys, tokens, headers, cookies, or account passwords',
    'StoreKit transaction receipts, billing tokens, account credentials, or credit card details',
    'Device UDIDs, serial numbers, IP addresses, diagnostic dumps, or raw HTTP payloads',
    'Screenshots, video recordings, or binary diagnostic attachments',
    'Legal compliance assertions or release/submission approval claims',
  ],
};

export function getReleaseSubmissionReviewOutcomeCopy(): ReleaseSubmissionReviewOutcomeCopy {
  return releaseSubmissionReviewOutcomeCopy;
}

export function getReleaseSubmissionReviewOutcomeEntry(
  outcome: ReleaseSubmissionReviewOutcome,
): ReleaseSubmissionReviewOutcomeEntry {
  return releaseSubmissionReviewOutcomeCopy.outcomes[outcome];
}

export function isReleaseSubmissionReviewItemOutcomeValid(
  itemOutcome: ReleaseSubmissionReviewItemOutcome,
): boolean {
  if (
    !RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.includes(itemOutcome.itemId) ||
    !RELEASE_SUBMISSION_REVIEW_OUTCOME_ORDER.includes(itemOutcome.outcome)
  ) {
    return false;
  }

  const entry =
    releaseSubmissionReviewOutcomeCopy.outcomes[itemOutcome.outcome];
  if (!entry.compatibleEvidenceStates.includes(itemOutcome.evidenceState)) {
    return false;
  }

  if (
    typeof itemOutcome.sanitizedNote !== 'string' ||
    itemOutcome.sanitizedNote.length >
      releaseSubmissionReviewOutcomeCopy.maximumSanitizedNoteCharacters
  ) {
    return false;
  }

  if (
    itemOutcome.outcome !== 'pending' &&
    !itemOutcome.sanitizedNote.trim()
  ) {
    return false;
  }

  return true;
}

export function isReleaseSubmissionReviewOutcomeReportBalanced(
  outcomes: readonly ReleaseSubmissionReviewItemOutcome[],
): boolean {
  if (outcomes.length !== RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.length) {
    return false;
  }

  const seenItems = new Set<ReleaseSubmissionReviewItemId>();

  for (const itemOutcome of outcomes) {
    if (seenItems.has(itemOutcome.itemId)) {
      return false;
    }
    if (!isReleaseSubmissionReviewItemOutcomeValid(itemOutcome)) {
      return false;
    }
    seenItems.add(itemOutcome.itemId);
  }

  return RELEASE_SUBMISSION_REVIEW_ITEM_ORDER.every((id) => seenItems.has(id));
}
