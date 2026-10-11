import type { ReleaseCandidateHandsOnArea } from './releaseCandidateHandoffCopy';
import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseCandidateLimitationId =
  | 'device-testing-pending'
  | 'astrology-private-preview'
  | 'dream-image-provider-blocked'
  | 'subscription-sandbox-required'
  | 'release-approval-separate';

export type ReleaseCandidateLimitationNature =
  | 'pending-validation'
  | 'expected-scope-boundary'
  | 'external-blocker'
  | 'test-environment-requirement'
  | 'approval-boundary';

export interface ReleaseCandidateKnownLimitationEntry {
  id: ReleaseCandidateLimitationId;
  title: string;
  shortLabel: string;
  nature: ReleaseCandidateLimitationNature;
  summary: string;
  expectedBoundary: string;
  defectDistinction: string;
  ownerNextAction: string;
  relatedHandsOnAreas: readonly ReleaseCandidateHandsOnArea[];
  /** Populate only with exact existing identifiers assigned to the session. */
  relatedTestIdentifiers: readonly ReleaseDeviceTestIdentifier[];
  compatibleOutcomes: readonly ReleaseDeviceTestOutcome[];
  compatibleClassifications: readonly ReleaseDeviceTestClassification[];
  isProductDefect: false;
  grantsApproval: false;
  accessibilityLabel: string;
}

export interface ReleaseCandidateKnownLimitationsCopy {
  title: string;
  subtitle: string;
  scopeReminder: string;
  identifierReminder: string;
  defectReminder: string;
  approvalBoundary: string;
  orderedLimitations: readonly ReleaseCandidateLimitationId[];
  limitations: Readonly<
    Record<ReleaseCandidateLimitationId, ReleaseCandidateKnownLimitationEntry>
  >;
  prohibitedContent: readonly string[];
}

export const RELEASE_CANDIDATE_KNOWN_LIMITATION_ORDER = [
  'device-testing-pending',
  'astrology-private-preview',
  'dream-image-provider-blocked',
  'subscription-sandbox-required',
  'release-approval-separate',
] as const satisfies readonly ReleaseCandidateLimitationId[];

export const RELEASE_CANDIDATE_KNOWN_LIMITATIONS = {
  'device-testing-pending': {
    id: 'device-testing-pending',
    title: 'Owner device testing is still pending',
    shortLabel: 'Device checks pending',
    nature: 'pending-validation',
    summary:
      'Automated and browser evidence does not replace the remaining hands-on Mac and iOS checks for the assigned candidate.',
    expectedBoundary:
      'Unexecuted native voice, subscription, persistence, accessibility, layout, and core-flow checks remain not run until completed on their assigned surfaces.',
    defectDistinction:
      'A pending check is not a product defect and is not evidence that the expected behavior passed.',
    ownerNextAction:
      'Run the assigned owner-device checklist and record each existing identifier or checklist area with its observed outcome.',
    relatedHandsOnAreas: [
      'core-journal-analysis-history',
      'native-voice-permissions',
      'subscription-sandbox',
      'persistence-relaunch',
      'accessibility-layout',
    ],
    relatedTestIdentifiers: [],
    compatibleOutcomes: ['not-run', 'blocked'],
    compatibleClassifications: ['none', 'device-environment-blocker'],
    isProductDefect: false,
    grantsApproval: false,
    accessibilityLabel:
      'Owner Mac and iOS device checks remain pending; no pass or approval is implied.',
  },
  'astrology-private-preview': {
    id: 'astrology-private-preview',
    title: 'Astrology remains private Preview only',
    shortLabel: 'Private Preview',
    nature: 'expected-scope-boundary',
    summary:
      'Astrology remains isolated to its assigned private Preview test scope and is disabled for Production.',
    expectedBoundary:
      'Only approved existing matrix cases with synthetic profiles may be exercised; Production activation and unassigned provider work remain outside this candidate.',
    defectDistinction:
      'The private, Production-disabled state is an intentional scope boundary. An observable mismatch within an available assigned Preview case must be triaged separately.',
    ownerNextAction:
      'Keep unassigned or provider-dependent work blocked and complete only the private Preview cases already assigned to the owner session.',
    relatedHandsOnAreas: ['optional-astrology-preview'],
    relatedTestIdentifiers: [],
    compatibleOutcomes: ['not-run', 'blocked', 'not-applicable'],
    compatibleClassifications: ['none', 'optional-provider-blocker'],
    isProductDefect: false,
    grantsApproval: false,
    accessibilityLabel:
      'Astrology remains private Preview only and Production disabled; this expected boundary is not a product defect or approval.',
  },
  'dream-image-provider-blocked': {
    id: 'dream-image-provider-blocked',
    title: 'Dream Image live generation remains blocked',
    shortLabel: 'Generation blocked',
    nature: 'external-blocker',
    summary:
      'Dream Image preparation is provider neutral, while live generation, delivery, persistence, sharing, and provider-side flows remain unavailable.',
    expectedBoundary:
      'The unavailable live-generation state is expected for this candidate. Assigned preparation and disabled-state checks may still be exercised independently.',
    defectDistinction:
      'An unavailable provider-dependent flow is an optional-provider blocker, not a core product defect. A mismatch in available preparation behavior must be triaged separately.',
    ownerNextAction:
      'Keep provider-dependent identifiers blocked and run only assigned provider-neutral preparation cases without choosing or activating a provider.',
    relatedHandsOnAreas: ['dream-image-preparation'],
    relatedTestIdentifiers: [],
    compatibleOutcomes: ['not-run', 'blocked', 'not-applicable'],
    compatibleClassifications: ['none', 'optional-provider-blocker'],
    isProductDefect: false,
    grantsApproval: false,
    accessibilityLabel:
      'Dream Image live generation and provider flows remain blocked; preparation scope does not grant provider approval.',
  },
  'subscription-sandbox-required': {
    id: 'subscription-sandbox-required',
    title: 'Subscription checks require the approved sandbox',
    shortLabel: 'Sandbox required',
    nature: 'test-environment-requirement',
    summary:
      'Purchase, restore, cancellation, entitlement, expiry, and trial transitions require the assigned store sandbox and test account.',
    expectedBoundary:
      'These checks must not use a personal or Production account, and an unavailable sandbox prevents the assigned path from running.',
    defectDistinction:
      'Sandbox or test-account unavailability is a device or environment blocker. A reproducible mismatch after the sandbox path is reached must be triaged separately.',
    ownerNextAction:
      'Use the approved sandbox process when available; otherwise record the assigned check as blocked without exposing account or store details.',
    relatedHandsOnAreas: ['subscription-sandbox'],
    relatedTestIdentifiers: [],
    compatibleOutcomes: ['not-run', 'blocked', 'not-applicable'],
    compatibleClassifications: ['none', 'device-environment-blocker'],
    isProductDefect: false,
    grantsApproval: false,
    accessibilityLabel:
      'Subscription validation requires the approved sandbox; sandbox unavailability is an external blocker, not approval or a product result.',
  },
  'release-approval-separate': {
    id: 'release-approval-separate',
    title: 'Release approval is a separate decision',
    shortLabel: 'Approval separate',
    nature: 'approval-boundary',
    summary:
      'Automated evidence, device outcomes, aggregate pass counts, and a candidate handoff inform review but do not authorize release or submission.',
    expectedBoundary:
      'Launch, submission, provider selection, and Production activation require their own explicit owner decisions after evidence is reviewed.',
    defectDistinction:
      'The absence of approval is not a product defect or an external test blocker; it is a governance boundary.',
    ownerNextAction:
      'Reconcile pending checks, defects, blockers, assets, configuration, and store requirements before using the separate approval process.',
    relatedHandsOnAreas: [],
    relatedTestIdentifiers: [],
    compatibleOutcomes: ['not-run', 'not-applicable'],
    compatibleClassifications: ['none'],
    isProductDefect: false,
    grantsApproval: false,
    accessibilityLabel:
      'Release approval remains a separate owner decision; this limitation list grants no launch, provider, or Production approval.',
  },
} as const satisfies Readonly<
  Record<ReleaseCandidateLimitationId, ReleaseCandidateKnownLimitationEntry>
>;

export const releaseCandidateKnownLimitationsCopy: ReleaseCandidateKnownLimitationsCopy = {
  title: 'Known candidate limitations',
  subtitle:
    'Owner-facing boundaries and blockers that remain distinct from verified product defects.',
  scopeReminder:
    'These entries describe current test scope, external prerequisites, and approval boundaries. They do not predict future availability.',
  identifierReminder:
    'Attach only exact existing identifiers accepted by the release device outcome contract when a limitation applies to an assigned case. This copy defines no test ids.',
  defectReminder:
    'An expected boundary, pending check, or unavailable external prerequisite is not a product defect. Triage a defect only from reproducible behavior in an available assigned path.',
  approvalBoundary:
    'No entry promises launch, submission, provider support, or Production activation, and no combination of entries grants approval.',
  orderedLimitations: RELEASE_CANDIDATE_KNOWN_LIMITATION_ORDER,
  limitations: RELEASE_CANDIDATE_KNOWN_LIMITATIONS,
  prohibitedContent: [
    'Dream content, journal text, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Voice recordings, transcripts, generated media, media links, exports, or descriptions of media',
    'Private Preview, issue, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, store details, product details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Launch, release, submission, provider, or Production promises or approval claims',
  ],
};

export function getReleaseCandidateKnownLimitationsCopy(): ReleaseCandidateKnownLimitationsCopy {
  return releaseCandidateKnownLimitationsCopy;
}

export function getReleaseCandidateKnownLimitation(
  id: ReleaseCandidateLimitationId,
): ReleaseCandidateKnownLimitationEntry {
  return releaseCandidateKnownLimitationsCopy.limitations[id];
}

export function getReleaseCandidateKnownLimitationsByNature(
  nature: ReleaseCandidateLimitationNature,
): readonly ReleaseCandidateKnownLimitationEntry[] {
  return releaseCandidateKnownLimitationsCopy.orderedLimitations
    .map((id) => releaseCandidateKnownLimitationsCopy.limitations[id])
    .filter((entry) => entry.nature === nature);
}

export function isReleaseCandidateLimitationOutcomeCompatible(
  id: ReleaseCandidateLimitationId,
  outcome: ReleaseDeviceTestOutcome,
): boolean {
  return releaseCandidateKnownLimitationsCopy.limitations[
    id
  ].compatibleOutcomes.includes(outcome);
}

export function isReleaseCandidateLimitationClassificationCompatible(
  id: ReleaseCandidateLimitationId,
  classification: ReleaseDeviceTestClassification,
): boolean {
  return releaseCandidateKnownLimitationsCopy.limitations[
    id
  ].compatibleClassifications.includes(classification);
}
