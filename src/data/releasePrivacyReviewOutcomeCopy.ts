import {
  getReleasePrivacyDisclosureEntry,
  type ReleasePrivacyDisclosureArea,
  type ReleasePrivacyDisclosureState,
  type ReleasePrivacyEvidenceKind,
} from './releasePrivacyDisclosureChecklist';

export type ReleasePrivacyReviewOutcome =
  | 'not-reviewed'
  | 'evidence-incomplete'
  | 'evidence-confirmed'
  | 'not-eligible';

export interface ReleasePrivacyReviewOutcomeEntry {
  outcome: ReleasePrivacyReviewOutcome;
  label: string;
  badgeLabel: string;
  description: string;
  useWhen: readonly string[];
  doNotUseWhen: string;
  nextAction: string;
  eligibleStates: readonly ReleasePrivacyDisclosureState[];
  grantsLegalCompliance: false;
  grantsDisclosureCorrectness: false;
  grantsReleaseApproval: false;
  grantsProviderApproval: false;
  grantsProductionActivation: false;
  accessibilityLabel: string;
}

export interface ReleasePrivacyReviewAreaOutcome {
  area: ReleasePrivacyDisclosureArea;
  outcome: ReleasePrivacyReviewOutcome;
  confirmedEvidence: readonly ReleasePrivacyEvidenceKind[];
  sanitizedNote: string;
}

export interface ReleasePrivacyReviewStateGuidance {
  state: ReleasePrivacyDisclosureState;
  title: string;
  guidance: string;
  eligibleOutcomes: readonly ReleasePrivacyReviewOutcome[];
}

export interface ReleasePrivacyReviewOutcomeCopy {
  title: string;
  subtitle: string;
  evidenceReminder: string;
  stateReminder: string;
  noteReminder: string;
  legalBoundary: string;
  approvalBoundary: string;
  orderedOutcomes: readonly ReleasePrivacyReviewOutcome[];
  outcomes: Readonly<
    Record<ReleasePrivacyReviewOutcome, ReleasePrivacyReviewOutcomeEntry>
  >;
  stateGuidance: Readonly<
    Record<ReleasePrivacyDisclosureState, ReleasePrivacyReviewStateGuidance>
  >;
  maximumSanitizedNoteCharacters: number;
  prohibitedEvidence: readonly string[];
}

export const RELEASE_PRIVACY_REVIEW_OUTCOME_ORDER = [
  'not-reviewed',
  'evidence-incomplete',
  'evidence-confirmed',
  'not-eligible',
] as const satisfies readonly ReleasePrivacyReviewOutcome[];

export const RELEASE_PRIVACY_REVIEW_OUTCOMES = {
  'not-reviewed': {
    outcome: 'not-reviewed',
    label: 'Not reviewed',
    badgeLabel: 'Not reviewed',
    description:
      'The owner has not yet compared the area’s candidate behavior, required evidence, and disclosure guidance.',
    useWhen: [
      'No required evidence has been confirmed for the area.',
      'The owner review has not started or has not reached an observable conclusion.',
    ],
    doNotUseWhen:
      'Do not use after evidence has been assessed; record evidence incomplete, evidence confirmed, or not eligible as appropriate.',
    nextAction:
      'Review the area’s current candidate state and gather only the required privacy-safe evidence.',
    eligibleStates: [
      'implemented',
      'device-verification-pending',
      'private-preview',
      'blocked',
      'excluded',
    ],
    grantsLegalCompliance: false,
    grantsDisclosureCorrectness: false,
    grantsReleaseApproval: false,
    grantsProviderApproval: false,
    grantsProductionActivation: false,
    accessibilityLabel:
      'Privacy disclosure area not reviewed; no evidence or approval conclusion has been made.',
  },
  'evidence-incomplete': {
    outcome: 'evidence-incomplete',
    label: 'Evidence incomplete',
    badgeLabel: 'Incomplete',
    description:
      'Review has started for an evidence-required area, but one or more required evidence kinds remain unconfirmed.',
    useWhen: [
      'At least one required evidence kind has been reviewed.',
      'The full required evidence set is not yet confirmed on the exact candidate.',
      'A device-verification-pending area still lacks its required hands-on evidence.',
    ],
    doNotUseWhen:
      'Do not use for private-preview, blocked, or excluded areas that are ineligible for a reviewed public disclosure outcome.',
    nextAction:
      'Identify the missing evidence kinds and complete only their approved candidate checks before reviewing again.',
    eligibleStates: ['implemented', 'device-verification-pending'],
    grantsLegalCompliance: false,
    grantsDisclosureCorrectness: false,
    grantsReleaseApproval: false,
    grantsProviderApproval: false,
    grantsProductionActivation: false,
    accessibilityLabel:
      'Privacy disclosure evidence is incomplete; additional candidate evidence is required.',
  },
  'evidence-confirmed': {
    outcome: 'evidence-confirmed',
    label: 'Required evidence confirmed',
    badgeLabel: 'Evidence confirmed',
    description:
      'Every evidence kind required by an eligible disclosure area has been confirmed for the exact candidate.',
    useWhen: [
      'The area is marked evidence required in the disclosure checklist.',
      'Every evidence kind listed for that area is confirmed for the same candidate.',
      'The sanitized note states what was reviewed without including source data or private artifacts.',
    ],
    doNotUseWhen:
      'Do not treat evidence completeness as legal compliance, App Store disclosure correctness, or any form of release approval.',
    nextAction:
      'Carry the evidence-complete area into the separate owner, policy, legal, and submission review processes without changing its candidate state.',
    eligibleStates: ['implemented', 'device-verification-pending'],
    grantsLegalCompliance: false,
    grantsDisclosureCorrectness: false,
    grantsReleaseApproval: false,
    grantsProviderApproval: false,
    grantsProductionActivation: false,
    accessibilityLabel:
      'Required candidate evidence confirmed; legal compliance, disclosure correctness, and release approval remain undetermined.',
  },
  'not-eligible': {
    outcome: 'not-eligible',
    label: 'Not eligible for reviewed public disclosure',
    badgeLabel: 'Not eligible',
    description:
      'The area remains private Preview, blocked, or excluded and cannot be marked evidence confirmed for an active public candidate behavior.',
    useWhen: [
      'The checklist state is private Preview, blocked, or excluded.',
      'Evidence may support the boundary, but the area is not an active public Production data behavior.',
    ],
    doNotUseWhen:
      'Do not use to hide missing evidence for an implemented or device-verification-pending area.',
    nextAction:
      'Preserve the current boundary, keep the area out of active public behavior claims, and review again only if an approved candidate changes its state.',
    eligibleStates: ['private-preview', 'blocked', 'excluded'],
    grantsLegalCompliance: false,
    grantsDisclosureCorrectness: false,
    grantsReleaseApproval: false,
    grantsProviderApproval: false,
    grantsProductionActivation: false,
    accessibilityLabel:
      'Privacy disclosure area is private Preview, blocked, or excluded and is not eligible for an active public review outcome.',
  },
} as const satisfies Readonly<
  Record<ReleasePrivacyReviewOutcome, ReleasePrivacyReviewOutcomeEntry>
>;

export const RELEASE_PRIVACY_REVIEW_STATE_GUIDANCE = {
  implemented: {
    state: 'implemented',
    title: 'Implemented candidate behavior',
    guidance:
      'Review all required evidence for the exact candidate. Keep the outcome not reviewed or evidence incomplete until every requirement is confirmed.',
    eligibleOutcomes: [
      'not-reviewed',
      'evidence-incomplete',
      'evidence-confirmed',
    ],
  },
  'device-verification-pending': {
    state: 'device-verification-pending',
    title: 'Device verification pending',
    guidance:
      'Do not confirm evidence until the required hands-on owner-device check and every other listed evidence kind are complete.',
    eligibleOutcomes: [
      'not-reviewed',
      'evidence-incomplete',
      'evidence-confirmed',
    ],
  },
  'private-preview': {
    state: 'private-preview',
    title: 'Private Preview boundary',
    guidance:
      'Preserve the isolated private Preview state and do not convert Preview evidence into an active public Production disclosure result.',
    eligibleOutcomes: ['not-reviewed', 'not-eligible'],
  },
  blocked: {
    state: 'blocked',
    title: 'Blocked feature boundary',
    guidance:
      'Preserve the blocked state and do not describe unavailable provider behavior as active data handling.',
    eligibleOutcomes: ['not-reviewed', 'not-eligible'],
  },
  excluded: {
    state: 'excluded',
    title: 'Excluded behavior',
    guidance:
      'Keep the excluded behavior out of active collection and processing disclosures unless a separately approved candidate changes the scope.',
    eligibleOutcomes: ['not-reviewed', 'not-eligible'],
  },
} as const satisfies Readonly<
  Record<ReleasePrivacyDisclosureState, ReleasePrivacyReviewStateGuidance>
>;

export const releasePrivacyReviewOutcomeCopy: ReleasePrivacyReviewOutcomeCopy = {
  title: 'Privacy disclosure owner review outcomes',
  subtitle:
    'Privacy-safe status labels for reviewing evidence against each existing candidate disclosure area.',
  evidenceReminder:
    'Evidence confirmed means only that the checklist’s required evidence kinds were observed for the exact candidate. It is not a substantive compliance or submission conclusion.',
  stateReminder:
    'Keep implemented, device-verification-pending, private-preview, blocked, and excluded states distinct. A review outcome never changes the underlying state.',
  noteReminder:
    'Every outcome requires one sanitized text note of 280 characters or fewer describing review status without source content or private artifacts.',
  legalBoundary:
    'No outcome asserts legal compliance, regulatory compliance, privacy-label accuracy, or App Store disclosure correctness.',
  approvalBoundary:
    'No outcome grants release, launch, submission, provider approval, or Production activation.',
  orderedOutcomes: RELEASE_PRIVACY_REVIEW_OUTCOME_ORDER,
  outcomes: RELEASE_PRIVACY_REVIEW_OUTCOMES,
  stateGuidance: RELEASE_PRIVACY_REVIEW_STATE_GUIDANCE,
  maximumSanitizedNoteCharacters: 280,
  prohibitedEvidence: [
    'Dream content, journal text, analyses, tags, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Audio recordings, voice transcripts, generated media, media links, exports, or descriptions of media',
    'Private Preview, issue, install, invitation, repository, or access links and details',
    'Credentials, tokens, headers, cookies, secret keys, account details, store details, product details, or private configuration',
    'Receipts, billing tokens, transaction records, payment details, or subscription account data',
    'Console output, logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Legal compliance, App Store correctness, release, launch, submission, provider, or Production approval claims',
  ],
};

export function getReleasePrivacyReviewOutcomeCopy(): ReleasePrivacyReviewOutcomeCopy {
  return releasePrivacyReviewOutcomeCopy;
}

export function getReleasePrivacyReviewOutcome(
  outcome: ReleasePrivacyReviewOutcome,
): ReleasePrivacyReviewOutcomeEntry {
  return releasePrivacyReviewOutcomeCopy.outcomes[outcome];
}

export function getReleasePrivacyReviewStateGuidance(
  state: ReleasePrivacyDisclosureState,
): ReleasePrivacyReviewStateGuidance {
  return releasePrivacyReviewOutcomeCopy.stateGuidance[state];
}

export function isReleasePrivacyReviewOutcomeAllowedForArea(
  area: ReleasePrivacyDisclosureArea,
  outcome: ReleasePrivacyReviewOutcome,
): boolean {
  const state = getReleasePrivacyDisclosureEntry(area).state;
  return releasePrivacyReviewOutcomeCopy.stateGuidance[
    state
  ].eligibleOutcomes.includes(outcome);
}

export function isReleasePrivacyReviewAreaOutcomeComplete(
  review: ReleasePrivacyReviewAreaOutcome,
): boolean {
  const entry = getReleasePrivacyDisclosureEntry(review.area);
  const note = review.sanitizedNote.trim();

  if (
    note.length === 0 ||
    note.length > releasePrivacyReviewOutcomeCopy.maximumSanitizedNoteCharacters ||
    !isReleasePrivacyReviewOutcomeAllowedForArea(review.area, review.outcome)
  ) {
    return false;
  }

  const confirmedEvidence = new Set(review.confirmedEvidence);
  const confirmedRequiredCount = entry.requiredEvidence.filter((kind) =>
    confirmedEvidence.has(kind),
  ).length;
  const allRequiredEvidenceConfirmed =
    confirmedRequiredCount === entry.requiredEvidence.length;

  if (review.outcome === 'not-reviewed') {
    return confirmedEvidence.size === 0;
  }

  if (review.outcome === 'not-eligible') {
    return entry.eligibility === 'not-eligible';
  }

  if (entry.eligibility !== 'evidence-required') {
    return false;
  }

  if (review.outcome === 'evidence-incomplete') {
    return confirmedRequiredCount > 0 && !allRequiredEvidenceConfirmed;
  }

  return allRequiredEvidenceConfirmed;
}

export function isReleasePrivacyReviewOutcome(
  value: string,
): value is ReleasePrivacyReviewOutcome {
  return (RELEASE_PRIVACY_REVIEW_OUTCOME_ORDER as readonly string[]).includes(
    value,
  );
}
