import {
  isRecognizedAstrologyPreviewMacMatrixCaseId,
  type AstrologyPreviewMacMatrixCaseId,
} from './astrologyPreviewIssueTriageCopy';
import {
  isRecognizedDreamImageSandboxReferenceId,
  type DreamImageSandboxReferenceId,
} from './dreamImageSandboxTestOutcomeCopy';

export type ReleaseDeviceTestOutcome =
  | 'pass'
  | 'fail'
  | 'blocked'
  | 'not-run'
  | 'not-applicable';

export type ReleaseDeviceTestClassification =
  | 'none'
  | 'reproducible-product-defect'
  | 'device-environment-blocker'
  | 'optional-provider-blocker';

export type ReleaseDeviceAllowedEvidenceField =
  | 'testIdentifier'
  | 'sanitizedObservation';

export type ReleaseDeviceTestIdentifier =
  | AstrologyPreviewMacMatrixCaseId
  | DreamImageSandboxReferenceId;

export interface ReleaseDeviceTestOutcomeEntry {
  outcome: ReleaseDeviceTestOutcome;
  label: string;
  badgeLabel: string;
  description: string;
  useWhen: readonly string[];
  doNotUseWhen: string;
  allowedClassifications: readonly ReleaseDeviceTestClassification[];
  requiresHandsOnExecution: boolean;
  requiresSanitizedObservation: boolean;
  accessibilityLabel: string;
}

export interface ReleaseDeviceTestOutcomeReport {
  outcome: ReleaseDeviceTestOutcome;
  classification: ReleaseDeviceTestClassification;
  /** Identifier copied from an existing assigned checklist or test matrix. */
  testIdentifier: ReleaseDeviceTestIdentifier;
  /** Brief text about observable behavior with all private material removed. */
  sanitizedObservation?: string;
}

export interface ReleaseDeviceTestOutcomeBundle {
  title: string;
  subtitle: string;
  classificationReminder: string;
  executionReminder: string;
  evidenceReminder: string;
  launchBoundary: string;
  orderedOutcomes: readonly ReleaseDeviceTestOutcome[];
  outcomes: Readonly<
    Record<ReleaseDeviceTestOutcome, ReleaseDeviceTestOutcomeEntry>
  >;
  allowedEvidenceFields: readonly ReleaseDeviceAllowedEvidenceField[];
  maximumObservationCharacters: number;
  prohibitedEvidence: readonly string[];
}

export const RELEASE_DEVICE_TEST_OUTCOME_ORDER = [
  'pass',
  'fail',
  'blocked',
  'not-run',
  'not-applicable',
] as const satisfies readonly ReleaseDeviceTestOutcome[];

export const RELEASE_DEVICE_ALLOWED_EVIDENCE_FIELDS = [
  'testIdentifier',
  'sanitizedObservation',
] as const satisfies readonly ReleaseDeviceAllowedEvidenceField[];

export const RELEASE_DEVICE_TEST_OUTCOMES = {
  pass: {
    outcome: 'pass',
    label: 'Expected behavior observed',
    badgeLabel: 'Pass',
    description:
      'The assigned behavior was exercised on the owner Mac or iOS device and matched the existing test expectation.',
    useWhen: [
      'The complete assigned path was run hands-on on the intended surface.',
      'The observable result matched the existing test identifier’s expectation.',
      'No required step was inferred from automated or browser-only evidence.',
    ],
    doNotUseWhen:
      'Do not use when the case was partial, unexecuted, unavailable, or dependent on an unresolved optional provider.',
    allowedClassifications: ['none'],
    requiresHandsOnExecution: true,
    requiresSanitizedObservation: true,
    accessibilityLabel:
      'Owner device test passed because the expected behavior was observed hands-on.',
  },
  fail: {
    outcome: 'fail',
    label: 'Reproducible product defect',
    badgeLabel: 'Fail',
    description:
      'Available product behavior reproducibly differed from the expectation for the existing test identifier.',
    useWhen: [
      'The assigned path and target behavior were available on the owner device.',
      'The mismatch was observed again using the same sanitized steps.',
      'The finding concerns product behavior rather than device setup, environment availability, or an optional provider.',
    ],
    doNotUseWhen:
      'Do not classify missing device capability, environment setup, connectivity, private access, or optional-provider availability as a product failure.',
    allowedClassifications: ['reproducible-product-defect'],
    requiresHandsOnExecution: true,
    requiresSanitizedObservation: true,
    accessibilityLabel:
      'Owner device test failed because a reproducible product defect differed from the expected behavior.',
  },
  blocked: {
    outcome: 'blocked',
    label: 'Test dependency blocked',
    badgeLabel: 'Blocked',
    description:
      'The assigned behavior could not be reached because a device or environment dependency, or an optional-provider dependency, was unavailable.',
    useWhen: [
      'The required device capability, permission, test environment, network condition, account sandbox, or assigned access path prevented execution.',
      'An optional feature depends on a provider that remains deliberately unavailable or disabled.',
      'The target product behavior was not reached, so no product pass or fail can be claimed.',
    ],
    doNotUseWhen:
      'Do not use when the behavior was available and reproducibly differed from the expected result; classify that as a fail.',
    allowedClassifications: [
      'device-environment-blocker',
      'optional-provider-blocker',
    ],
    requiresHandsOnExecution: false,
    requiresSanitizedObservation: true,
    accessibilityLabel:
      'Owner device test blocked by a device, environment, or optional-provider dependency; no product result claimed.',
  },
  'not-run': {
    outcome: 'not-run',
    label: 'Not yet run',
    badgeLabel: 'Not run',
    description:
      'The assigned device check has not been executed in the current owner test pass.',
    useWhen: [
      'The case is assigned but hands-on execution has not started or completed.',
      'No observation is available from the intended Mac or iOS surface.',
    ],
    doNotUseWhen:
      'Do not use to hide a known blocker or an observed mismatch; record blocked or fail as appropriate.',
    allowedClassifications: ['none'],
    requiresHandsOnExecution: false,
    requiresSanitizedObservation: false,
    accessibilityLabel:
      'Owner device test has not been run and has no product result.',
  },
  'not-applicable': {
    outcome: 'not-applicable',
    label: 'Not applicable to this pass',
    badgeLabel: 'N/A',
    description:
      'The existing test identifier is outside the assigned device, platform, feature, or session scope.',
    useWhen: [
      'The approved test plan explicitly excludes the case from this surface or pass.',
      'The case does not apply to the selected device or enabled release scope.',
    ],
    doNotUseWhen:
      'Do not use for an applicable case that cannot run because of a device, environment, or provider dependency; record blocked.',
    allowedClassifications: ['none'],
    requiresHandsOnExecution: false,
    requiresSanitizedObservation: true,
    accessibilityLabel:
      'Owner device test is not applicable to the assigned pass and has no product result.',
  },
} as const satisfies Readonly<
  Record<ReleaseDeviceTestOutcome, ReleaseDeviceTestOutcomeEntry>
>;

export const releaseDeviceTestOutcomeCopy: ReleaseDeviceTestOutcomeBundle = {
  title: 'Owner Mac and iOS test outcomes',
  subtitle:
    'Consistent labels for hands-on release checks without implying launch readiness.',
  classificationReminder:
    'A fail requires a reproducible product mismatch in an available path. Device or environment limits and optional-provider unavailability are blockers, not product defects.',
  executionReminder:
    'Pass and fail require hands-on execution on the assigned owner Mac or iOS device. Keep unexecuted cases not run.',
  evidenceReminder:
    'Use only an identifier copied from an existing assigned checklist or test matrix and a brief sanitized text observation.',
  launchBoundary:
    'No individual outcome, group of passes, or completed device pass is launch approval. Release and submission approval remain separate owner decisions.',
  orderedOutcomes: RELEASE_DEVICE_TEST_OUTCOME_ORDER,
  outcomes: RELEASE_DEVICE_TEST_OUTCOMES,
  allowedEvidenceFields: RELEASE_DEVICE_ALLOWED_EVIDENCE_FIELDS,
  maximumObservationCharacters: 280,
  prohibitedEvidence: [
    'Dream content, journal text, transcripts, tags, analyses, or personal reflections',
    'Real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Generated media, media links, exports, or descriptions of generated media',
    'Private Preview links, invitations, or access details',
    'Credentials, tokens, headers, cookies, account details, or private configuration',
    'Console output, logs, traces, crash dumps, or diagnostic archives',
    'Request or response payloads and submitted field values',
    'Screenshots, screen recordings, or other attachments',
    'Launch, release, submission, or Production approval claims',
  ],
};

export function getReleaseDeviceTestOutcomeCopy(): ReleaseDeviceTestOutcomeBundle {
  return releaseDeviceTestOutcomeCopy;
}

export function getReleaseDeviceTestOutcome(
  outcome: ReleaseDeviceTestOutcome,
): ReleaseDeviceTestOutcomeEntry {
  return releaseDeviceTestOutcomeCopy.outcomes[outcome];
}

export function isReleaseDeviceTestClassificationAllowed(
  outcome: ReleaseDeviceTestOutcome,
  classification: ReleaseDeviceTestClassification,
): boolean {
  return releaseDeviceTestOutcomeCopy.outcomes[
    outcome
  ].allowedClassifications.includes(classification);
}

export function isReleaseDeviceProductDefect(
  report: Pick<
    ReleaseDeviceTestOutcomeReport,
    'outcome' | 'classification'
  >,
): boolean {
  return (
    report.outcome === 'fail' &&
    report.classification === 'reproducible-product-defect'
  );
}

export function isReleaseDeviceExternalBlocker(
  report: Pick<
    ReleaseDeviceTestOutcomeReport,
    'outcome' | 'classification'
  >,
): boolean {
  return (
    report.outcome === 'blocked' &&
    (report.classification === 'device-environment-blocker' ||
      report.classification === 'optional-provider-blocker')
  );
}

export function isReleaseDeviceOutcomeReportComplete(
  report: ReleaseDeviceTestOutcomeReport,
): boolean {
  if (!isReleaseDeviceTestIdentifier(report.testIdentifier)) {
    return false;
  }

  if (
    !isReleaseDeviceTestClassificationAllowed(
      report.outcome,
      report.classification,
    )
  ) {
    return false;
  }

  const observation = report.sanitizedObservation?.trim() ?? '';
  const outcomeCopy = releaseDeviceTestOutcomeCopy.outcomes[report.outcome];

  if (outcomeCopy.requiresSanitizedObservation && !observation) {
    return false;
  }

  return observation.length <= releaseDeviceTestOutcomeCopy.maximumObservationCharacters;
}

export function isReleaseDeviceTestIdentifier(
  value: unknown,
): value is ReleaseDeviceTestIdentifier {
  return (
    isRecognizedAstrologyPreviewMacMatrixCaseId(value) ||
    isRecognizedDreamImageSandboxReferenceId(value)
  );
}

export function isReleaseDeviceTestOutcome(
  value: string,
): value is ReleaseDeviceTestOutcome {
  return (RELEASE_DEVICE_TEST_OUTCOME_ORDER as readonly string[]).includes(
    value,
  );
}
