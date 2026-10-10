/**
 * Astrology Preview Issue Triage Copy
 *
 * Typed, content-only guidance for classifying sanitized private-test
 * observations. Reports require an existing Mac matrix case id and a concise
 * sanitized observation, plus an approved public error code when one was
 * displayed. Sensitive artifacts and attachments are excluded.
 */

import {
  isRecognizedAstrologyPreviewPublicErrorCode,
  type AstrologyPreviewPublicErrorCode,
} from './astrologyPreviewTroubleshooting';

export type AstrologyPreviewIssueTriageClassification =
  | 'product-defect'
  | 'provider-blocker'
  | 'deployment-blocker'
  | 'needs-more-evidence'
  | 'no-issue';

export type AstrologyPreviewMacMatrixCaseId =
  | 'TC-DATE-01'
  | 'TC-DATE-02'
  | 'TC-DATE-03'
  | 'TC-DATE-04'
  | 'TC-DATE-05'
  | 'TC-DATE-06'
  | 'TC-DATE-07'
  | 'TC-DATE-08'
  | 'TC-TIME-01'
  | 'TC-TIME-02'
  | 'TC-TIME-03'
  | 'TC-TIME-04'
  | 'TC-TIME-05'
  | 'TC-TIME-06'
  | 'TC-TIME-07'
  | 'TC-COORD-01'
  | 'TC-COORD-02'
  | 'TC-COORD-03'
  | 'TC-COORD-04'
  | 'TC-COORD-05'
  | 'TC-COORD-06'
  | 'TC-COORD-07'
  | 'TC-COORD-08'
  | 'TC-CONSENT-01'
  | 'TC-CONSENT-02'
  | 'TC-CONSENT-03'
  | 'TC-CONSENT-04'
  | 'TC-ERR-01'
  | 'TC-ERR-02'
  | 'TC-ERR-03'
  | 'TC-ERR-04'
  | 'TC-ERR-05'
  | 'TC-PERSIST-01'
  | 'TC-PERSIST-02'
  | 'TC-PERSIST-03'
  | 'TC-REFL-01'
  | 'TC-REFL-02'
  | 'TC-REFL-03'
  | 'TC-REFL-04'
  | 'TC-A11Y-01'
  | 'TC-A11Y-02'
  | 'TC-A11Y-03'
  | 'TC-A11Y-04'
  | 'TC-A11Y-05'
  | 'TC-DEL-01'
  | 'TC-DEL-02'
  | 'TC-DEL-03'
  | 'TC-DEL-04'
  | 'TC-DEL-05';

type AstrologyPreviewMacMatrixCaseGroup =
  | 'DATE'
  | 'TIME'
  | 'COORD'
  | 'CONSENT'
  | 'ERR'
  | 'PERSIST'
  | 'REFL'
  | 'A11Y'
  | 'DEL';

const ASTROLOGY_PREVIEW_MAC_MATRIX_CASE_MAX: Record<
  AstrologyPreviewMacMatrixCaseGroup,
  number
> = {
  DATE: 8,
  TIME: 7,
  COORD: 8,
  CONSENT: 4,
  ERR: 5,
  PERSIST: 3,
  REFL: 4,
  A11Y: 5,
  DEL: 5,
};

export interface AstrologyPreviewIssueTriageEntry {
  /** Stable triage classification. */
  classification: AstrologyPreviewIssueTriageClassification;
  /** Primary user-facing label. */
  label: string;
  /** Compact badge label. */
  badgeLabel: string;
  /** Concise definition. */
  description: string;
  /** Observable conditions required before choosing this classification. */
  useWhen: readonly string[];
  /** Closely related state that should use a different classification. */
  doNotUseWhen: string;
  /** Safe next step for the reviewer. */
  nextAction: string;
  /** Test outcome normally paired with the classification. */
  suggestedOutcome: 'pass' | 'fail' | 'blocked' | 'not-run';
  /** Screen-reader description. */
  accessibilityLabel: string;
}

export interface AstrologyPreviewIssueTriageReport {
  /** An existing case from the Astrology Mac test matrix is always required. */
  testCaseId: AstrologyPreviewMacMatrixCaseId;
  classification: AstrologyPreviewIssueTriageClassification;
  /** Include only when the app displayed an approved public code. */
  publicErrorCode?: AstrologyPreviewPublicErrorCode;
  /** Brief description of visible behavior with all private data removed. */
  sanitizedObservation: string;
}

export interface AstrologyPreviewIssueTriageBundle {
  title: string;
  subtitle: string;
  decisionReminder: string;
  evidenceReminder: string;
  orderedClassifications: readonly AstrologyPreviewIssueTriageClassification[];
  classifications: Record<
    AstrologyPreviewIssueTriageClassification,
    AstrologyPreviewIssueTriageEntry
  >;
  allowedReportFields: readonly [
    'testCaseId',
    'classification',
    'publicErrorCode',
    'sanitizedObservation',
  ];
  prohibitedEvidence: readonly string[];
}

export const ASTROLOGY_PREVIEW_ISSUE_TRIAGE_ORDER: readonly AstrologyPreviewIssueTriageClassification[] = [
  'product-defect',
  'provider-blocker',
  'deployment-blocker',
  'needs-more-evidence',
  'no-issue',
] as const;

export const ASTROLOGY_PREVIEW_PROVIDER_BLOCKER_CODES: readonly AstrologyPreviewPublicErrorCode[] = [
  'provider_unavailable',
  'provider_invalid_response',
  'provider_rate_limited',
  'rate_limit_exceeded',
  'provider_timeout',
  'reflection_empty',
] as const;

export const ASTROLOGY_PREVIEW_DEPLOYMENT_BLOCKER_CODES: readonly AstrologyPreviewPublicErrorCode[] = [
  'feature_disabled',
  'provider_not_configured',
  'rate_limit_not_configured',
  'rate_limit_unavailable',
  'reflection_not_configured',
] as const;

export const ASTROLOGY_PREVIEW_ISSUE_TRIAGE_COPY: Record<
  AstrologyPreviewIssueTriageClassification,
  AstrologyPreviewIssueTriageEntry
> = {
  'product-defect': {
    classification: 'product-defect',
    label: 'Product Defect',
    badgeLabel: 'Product Defect',
    description:
      'Available app behavior reproducibly differs from the expectation of a specific Mac matrix case.',
    useWhen: [
      'The behavior under test was available on the assigned surface.',
      'Approved synthetic inputs and the documented case steps were used.',
      'The sanitized observation describes a visible mismatch that can be repeated.',
    ],
    doNotUseWhen:
      'Do not use solely because a provider, Preview deployment, or protected access path was unavailable.',
    nextAction:
      'Record the matrix case id, any displayed public error code, and the shortest reproducible sanitized observation for product review.',
    suggestedOutcome: 'fail',
    accessibilityLabel:
      'Product defect: available app behavior reproducibly did not match the Mac test case expectation.',
  },

  'provider-blocker': {
    classification: 'provider-blocker',
    label: 'Provider Blocker',
    badgeLabel: 'Provider Blocked',
    description:
      'An external calculation or reflection service state prevented the target behavior from completing.',
    useWhen: [
      'The app reached the provider-connected request path.',
      'A provider-related public error code was displayed when available.',
      'The observation does not show a separate defect in the app’s recovery behavior.',
    ],
    doNotUseWhen:
      'If the recovery message, retained form state, retry control, or accessibility behavior differs from its matrix expectation, classify that observable mismatch as a product defect.',
    nextAction:
      'Mark the case blocked and record the approved public error code plus a sanitized observation; do not repeatedly retry.',
    suggestedOutcome: 'blocked',
    accessibilityLabel:
      'Provider blocker: an external Astrology service state prevented the test path from completing.',
  },

  'deployment-blocker': {
    classification: 'deployment-blocker',
    label: 'Deployment Blocker',
    badgeLabel: 'Deployment Blocked',
    description:
      'The assigned private Preview build or its enabled route boundary prevented the target behavior from being reached.',
    useWhen: [
      'The expected private Preview path was disabled, unavailable, or not configured.',
      'A deployment-related public error code was recorded when the app supplied one.',
      'No available product behavior contradicted the assigned matrix expectation.',
    ],
    doNotUseWhen:
      'Do not use to hide a reproducible defect in a screen, validation rule, accessibility state, persistence path, deletion flow, or error presentation that was available to test.',
    nextAction:
      'Mark the case blocked, record the matrix case id and any approved public code, and leave deployment changes to the authorized owner.',
    suggestedOutcome: 'blocked',
    accessibilityLabel:
      'Deployment blocker: the assigned private Preview boundary prevented the test behavior from being reached.',
  },

  'needs-more-evidence': {
    classification: 'needs-more-evidence',
    label: 'Needs More Evidence',
    badgeLabel: 'Needs Evidence',
    description:
      'The sanitized observation is not yet sufficient to distinguish a product defect from an external blocker or expected behavior.',
    useWhen: [
      'The matrix case id is known but the observation does not state expected versus visible behavior.',
      'The result was intermittent, incomplete, or not reproduced with approved synthetic inputs.',
      'A public error code was visible but was not recorded, or the reported code and observation conflict.',
    ],
    doNotUseWhen:
      'Do not request sensitive artifacts to resolve uncertainty; additional evidence must remain within the approved text-only fields.',
    nextAction:
      'Repeat the same matrix case once when safe and add only the displayed public code and a clearer sanitized observation.',
    suggestedOutcome: 'not-run',
    accessibilityLabel:
      'Needs more evidence: the current sanitized observation is insufficient for issue classification.',
  },

  'no-issue': {
    classification: 'no-issue',
    label: 'No Issue Observed',
    badgeLabel: 'No Issue',
    description:
      'The executed case matched its documented expectation, including any expected public error and recovery state.',
    useWhen: [
      'The assigned case was fully executed with approved synthetic inputs.',
      'The visible behavior matched the matrix expectation.',
      'Any expected error case displayed the correct public state and recovery behavior.',
    ],
    doNotUseWhen:
      'Do not use for an unexecuted, partially executed, unavailable, or assumed result.',
    nextAction:
      'Record the case id and a brief sanitized observation, then continue to the next assigned case.',
    suggestedOutcome: 'pass',
    accessibilityLabel:
      'No issue observed: the executed private Preview test matched its expected behavior.',
  },
};

export const ASTROLOGY_PREVIEW_ISSUE_TRIAGE_BUNDLE: AstrologyPreviewIssueTriageBundle = {
  title: 'Astrology Preview Issue Triage',
  subtitle:
    'Text-only classification guidance for sanitized private-test observations.',
  decisionReminder:
    'Classify the observable app behavior, not the sensitivity or importance of the feature. External unavailability is a blocker unless the app’s own recovery behavior is defective.',
  evidenceReminder:
    'Every report requires an existing Mac matrix case id and a sanitized observation. Add an approved public error code whenever the app displayed one.',
  orderedClassifications: ASTROLOGY_PREVIEW_ISSUE_TRIAGE_ORDER,
  classifications: ASTROLOGY_PREVIEW_ISSUE_TRIAGE_COPY,
  allowedReportFields: [
    'testCaseId',
    'classification',
    'publicErrorCode',
    'sanitizedObservation',
  ],
  prohibitedEvidence: [
    'Private Preview links, invitations, access values, or browser session data',
    'Credentials, tokens, authorization headers, cookies, or configuration values',
    'Real birth dates, times, locations, coordinates, names, or identifiers',
    'Dream journal text, audio, tags, analyses, or personal reflections',
    'Request or response bodies and non-public service or provider payloads',
    'Private logs, console exports, network traces, or diagnostic dumps',
    'Screenshots, recordings, files, exports, or other attachments',
  ],
};

export function getAstrologyPreviewIssueTriageBundle(): AstrologyPreviewIssueTriageBundle {
  return ASTROLOGY_PREVIEW_ISSUE_TRIAGE_BUNDLE;
}

export function getAstrologyPreviewIssueTriageCopy(
  classification: AstrologyPreviewIssueTriageClassification,
): AstrologyPreviewIssueTriageEntry {
  return ASTROLOGY_PREVIEW_ISSUE_TRIAGE_COPY[classification];
}

export function getAllAstrologyPreviewIssueTriageEntries(): AstrologyPreviewIssueTriageEntry[] {
  return ASTROLOGY_PREVIEW_ISSUE_TRIAGE_ORDER.map(
    classification => ASTROLOGY_PREVIEW_ISSUE_TRIAGE_COPY[classification],
  );
}

export function getSuggestedAstrologyPreviewBlockerClassification(
  code: AstrologyPreviewPublicErrorCode,
): Extract<
  AstrologyPreviewIssueTriageClassification,
  'provider-blocker' | 'deployment-blocker'
> | undefined {
  if (ASTROLOGY_PREVIEW_PROVIDER_BLOCKER_CODES.includes(code)) {
    return 'provider-blocker';
  }
  if (ASTROLOGY_PREVIEW_DEPLOYMENT_BLOCKER_CODES.includes(code)) {
    return 'deployment-blocker';
  }
  return undefined;
}

export function isCompleteAstrologyPreviewTriageReport(
  report: Partial<AstrologyPreviewIssueTriageReport>,
): report is AstrologyPreviewIssueTriageReport {
  return (
    isRecognizedAstrologyPreviewMacMatrixCaseId(report.testCaseId) &&
    isRecognizedAstrologyPreviewIssueTriageClassification(
      report.classification,
    ) &&
    (report.publicErrorCode === undefined ||
      isRecognizedAstrologyPreviewPublicErrorCode(report.publicErrorCode)) &&
    typeof report.sanitizedObservation === 'string' &&
    report.sanitizedObservation.trim().length > 0
  );
}

export function isRecognizedAstrologyPreviewMacMatrixCaseId(
  value: unknown,
): value is AstrologyPreviewMacMatrixCaseId {
  if (typeof value !== 'string') return false;
  const match = /^TC-(DATE|TIME|COORD|CONSENT|ERR|PERSIST|REFL|A11Y|DEL)-(\d{2})$/.exec(
    value,
  );
  if (!match) return false;
  const group = match[1] as AstrologyPreviewMacMatrixCaseGroup;
  const caseNumber = Number(match[2]);
  return caseNumber >= 1 && caseNumber <= ASTROLOGY_PREVIEW_MAC_MATRIX_CASE_MAX[group];
}

export function isRecognizedAstrologyPreviewIssueTriageClassification(
  value: unknown,
): value is AstrologyPreviewIssueTriageClassification {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_ISSUE_TRIAGE_ORDER.includes(
      value as AstrologyPreviewIssueTriageClassification,
    )
  );
}
