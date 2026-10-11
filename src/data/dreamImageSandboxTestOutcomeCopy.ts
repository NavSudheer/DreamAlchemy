/**
 * Dream Image Sandbox Test Outcome Copy
 *
 * Typed, content-only outcome guidance for the optional, disabled-by-default
 * Dream Image preparation flow. This module does not enable generation and
 * does not accept generated media or sensitive testing artifacts.
 */

export type DreamImageSandboxTestOutcome =
  | 'preparation-ui-defect'
  | 'expected-feature-disabled'
  | 'provider-blocker'
  | 'deployment-blocker'
  | 'generation-skipped'
  | 'not-run';

export type DreamImageMacTestCaseId =
  | 'TC-IMG-SCENE-01'
  | 'TC-IMG-SCENE-02'
  | 'TC-IMG-SCENE-03'
  | 'TC-IMG-SCENE-04'
  | 'TC-IMG-SCENE-05'
  | 'TC-IMG-SCENE-06'
  | 'TC-IMG-STYLE-01'
  | 'TC-IMG-STYLE-02'
  | 'TC-IMG-STYLE-03'
  | 'TC-IMG-STYLE-04'
  | 'TC-IMG-CONSENT-01'
  | 'TC-IMG-CONSENT-02'
  | 'TC-IMG-CONSENT-03'
  | 'TC-IMG-FAIL-01'
  | 'TC-IMG-FAIL-02'
  | 'TC-IMG-FAIL-03'
  | 'TC-IMG-FAIL-04'
  | 'TC-IMG-FAIL-05'
  | 'TC-IMG-FAIL-06'
  | 'TC-IMG-PROG-01'
  | 'TC-IMG-PROG-02'
  | 'TC-IMG-PROG-03'
  | 'TC-IMG-PROG-04'
  | 'TC-IMG-PROG-05'
  | 'TC-IMG-PROG-06'
  | 'TC-IMG-ACT-01'
  | 'TC-IMG-ACT-02'
  | 'TC-IMG-ACT-03'
  | 'TC-IMG-ACT-04'
  | 'TC-IMG-DEL-01'
  | 'TC-IMG-DEL-02'
  | 'TC-IMG-DEL-03'
  | 'TC-IMG-DEL-04'
  | 'TC-IMG-A11Y-01'
  | 'TC-IMG-A11Y-02'
  | 'TC-IMG-A11Y-03'
  | 'TC-IMG-A11Y-04'
  | 'TC-IMG-A11Y-05';

export type DreamImageMacBlockerId =
  | 'BLK-IMG-01'
  | 'BLK-IMG-02'
  | 'BLK-IMG-03'
  | 'BLK-IMG-04'
  | 'BLK-IMG-05';

export type DreamImageSandboxReferenceId =
  | DreamImageMacTestCaseId
  | DreamImageMacBlockerId;

export interface DreamImageSandboxTestOutcomeEntry {
  /** Stable outcome key. */
  outcome: DreamImageSandboxTestOutcome;
  /** Primary user-facing label. */
  label: string;
  /** Compact badge label. */
  badgeLabel: string;
  /** Concise outcome definition. */
  description: string;
  /** Conditions required before choosing the outcome. */
  useWhen: readonly string[];
  /** Nearby state that belongs under a different outcome. */
  doNotUseWhen: string;
  /** Safe next action for the tester or reviewer. */
  nextAction: string;
  /** Representative existing matrix or blocker references. */
  relevantReferenceIds: readonly DreamImageSandboxReferenceId[];
  /** Screen-reader description of the outcome. */
  accessibilityLabel: string;
}

export interface DreamImageSandboxTestOutcomeReport {
  outcome: DreamImageSandboxTestOutcome;
  /** Must be an existing Dream Image Mac test or blocker id. */
  referenceId: DreamImageSandboxReferenceId;
  /** Text-only observation containing no sensitive or media content. */
  sanitizedObservation: string;
}

export interface DreamImageSandboxTestOutcomeBundle {
  title: string;
  subtitle: string;
  scopeReminder: string;
  evidenceReminder: string;
  orderedOutcomes: readonly DreamImageSandboxTestOutcome[];
  outcomes: Record<
    DreamImageSandboxTestOutcome,
    DreamImageSandboxTestOutcomeEntry
  >;
  allowedReportFields: readonly [
    'outcome',
    'referenceId',
    'sanitizedObservation',
  ];
  prohibitedEvidence: readonly string[];
}

type DreamImageMacTestGroup =
  | 'SCENE'
  | 'STYLE'
  | 'CONSENT'
  | 'FAIL'
  | 'PROG'
  | 'ACT'
  | 'DEL'
  | 'A11Y';

const DREAM_IMAGE_MAC_TEST_GROUP_MAX: Record<DreamImageMacTestGroup, number> = {
  SCENE: 6,
  STYLE: 4,
  CONSENT: 3,
  FAIL: 6,
  PROG: 6,
  ACT: 4,
  DEL: 4,
  A11Y: 5,
};

export const DREAM_IMAGE_SANDBOX_TEST_OUTCOME_ORDER: readonly DreamImageSandboxTestOutcome[] = [
  'preparation-ui-defect',
  'expected-feature-disabled',
  'provider-blocker',
  'deployment-blocker',
  'generation-skipped',
  'not-run',
] as const;

export const DREAM_IMAGE_SANDBOX_TEST_OUTCOME_COPY: Record<
  DreamImageSandboxTestOutcome,
  DreamImageSandboxTestOutcomeEntry
> = {
  'preparation-ui-defect': {
    outcome: 'preparation-ui-defect',
    label: 'Preparation UI Defect',
    badgeLabel: 'UI Defect',
    description:
      'Available scene, style, consent, preview, failure, action, or accessibility behavior reproducibly differs from an existing TC-IMG expectation.',
    useWhen: [
      'The relevant preparation or component behavior was available to test.',
      'A curated catalog selection and the documented test steps were used.',
      'The sanitized observation states the expected and visible interface behavior.',
    ],
    doNotUseWhen:
      'Do not classify absent live generation or another known provider/deployment gate as a preparation UI defect.',
    nextAction:
      'Record the exact TC-IMG id and the shortest reproducible text-only observation for product review.',
    relevantReferenceIds: [
      'TC-IMG-SCENE-01',
      'TC-IMG-STYLE-01',
      'TC-IMG-CONSENT-01',
      'TC-IMG-FAIL-01',
      'TC-IMG-A11Y-01',
    ],
    accessibilityLabel:
      'Preparation user interface defect in an available Dream Image test path.',
  },

  'expected-feature-disabled': {
    outcome: 'expected-feature-disabled',
    label: 'Expected Feature-Disabled State',
    badgeLabel: 'Disabled as Expected',
    description:
      'The disabled-by-default flow presents its unavailable notice while curated preparation remains usable.',
    useWhen: [
      'The Dream Image service is intentionally unavailable for the tested build.',
      'The Preview or unavailable notice is understandable and accessible.',
      'Scene, style, safety, and prepared-description controls remain available as documented.',
    ],
    doNotUseWhen:
      'If the unavailable state is missing, inaccessible, misleading, or prevents documented preparation behavior, record a preparation UI defect against TC-IMG-FAIL-01.',
    nextAction:
      'Record TC-IMG-FAIL-01 with a concise observation and continue testing the preparation UI without attempting generation.',
    relevantReferenceIds: ['TC-IMG-FAIL-01'],
    accessibilityLabel:
      'Dream Image generation is disabled as expected and preparation remains available.',
  },

  'provider-blocker': {
    outcome: 'provider-blocker',
    label: 'Provider Blocker',
    badgeLabel: 'Provider Blocked',
    description:
      'A provider-dependent generation, moderation, request-control, or delivery capability is not available for sandbox execution.',
    useWhen: [
      'The observation depends on an approved and connected image provider.',
      'The relevant provider, moderation, throttling, or delivery gate remains unresolved.',
      'No separate defect was observed in the available preparation UI.',
    ],
    doNotUseWhen:
      'Do not use for the application-owned Preview route itself being absent or disconnected; use deployment blocker.',
    nextAction:
      'Record the matching BLK-IMG id and stop at the provider-neutral boundary. Do not attempt to enable or connect generation.',
    relevantReferenceIds: [
      'BLK-IMG-02',
      'BLK-IMG-03',
      'BLK-IMG-04',
      'BLK-IMG-05',
    ],
    accessibilityLabel:
      'Dream Image sandbox test blocked by an unresolved provider-dependent release gate.',
  },

  'deployment-blocker': {
    outcome: 'deployment-blocker',
    label: 'Deployment Blocker',
    badgeLabel: 'Deployment Blocked',
    description:
      'The application-owned disabled route is not deployed or connected to the private Preview test path.',
    useWhen: [
      'The assigned check requires the application-owned Preview route.',
      'The route cannot be reached from the current preparation build.',
      'The local preparation UI itself remains available for its assigned cases.',
    ],
    doNotUseWhen:
      'Do not use for provider approval, moderation, throttling, or asset delivery gates after the route boundary.',
    nextAction:
      'Record BLK-IMG-01 and continue only with preparation cases that do not require the route.',
    relevantReferenceIds: ['BLK-IMG-01'],
    accessibilityLabel:
      'Dream Image sandbox test blocked because the application-owned Preview route is not deployed or connected.',
  },

  'generation-skipped': {
    outcome: 'generation-skipped',
    label: 'Generation Skipped',
    badgeLabel: 'Skipped',
    description:
      'A generation-dependent case was deliberately not exercised, without claiming success or failure.',
    useWhen: [
      'Generation was optional or outside the assigned session scope.',
      'The tester remained within the preparation UI and made no generation request.',
      'The relevant existing TC-IMG or BLK-IMG reference is recorded.',
    ],
    doNotUseWhen:
      'Do not use when an assigned provider-dependent case was attempted but could not proceed; record the applicable provider or deployment blocker.',
    nextAction:
      'Record the relevant existing id and state only that generation was skipped; do not infer result behavior.',
    relevantReferenceIds: [
      'TC-IMG-PROG-01',
      'TC-IMG-ACT-01',
      'TC-IMG-DEL-01',
    ],
    accessibilityLabel:
      'Dream Image generation-dependent test was deliberately skipped and no result claim was made.',
  },

  'not-run': {
    outcome: 'not-run',
    label: 'Not Run',
    badgeLabel: 'Not Run',
    description:
      'The referenced Dream Image test or blocker check has not been executed in this session.',
    useWhen: [
      'No hands-on or assigned component execution occurred for the referenced item.',
      'Available evidence comes only from documentation, another build, or an earlier session.',
      'No pass, defect, or blocker claim can yet be supported for this session.',
    ],
    doNotUseWhen:
      'Do not use after an assigned case was attempted and a known provider or deployment boundary prevented completion.',
    nextAction:
      'Keep the item not run until its existing TC-IMG or BLK-IMG reference is exercised or formally skipped.',
    relevantReferenceIds: [
      'TC-IMG-SCENE-01',
      'TC-IMG-FAIL-01',
      'BLK-IMG-01',
    ],
    accessibilityLabel:
      'Dream Image sandbox test has not been run and has no result claim.',
  },
};

export const DREAM_IMAGE_SANDBOX_TEST_OUTCOME_BUNDLE: DreamImageSandboxTestOutcomeBundle = {
  title: 'Dream Image Sandbox Test Outcomes',
  subtitle:
    'Outcome and blocker guidance for the optional provider-neutral preparation flow.',
  scopeReminder:
    'Test the curated preparation experience and expected disabled state only. Do not enable, connect, or invoke live image generation.',
  evidenceReminder:
    'Record only an existing TC-IMG or BLK-IMG id and a brief sanitized text observation.',
  orderedOutcomes: DREAM_IMAGE_SANDBOX_TEST_OUTCOME_ORDER,
  outcomes: DREAM_IMAGE_SANDBOX_TEST_OUTCOME_COPY,
  allowedReportFields: [
    'outcome',
    'referenceId',
    'sanitizedObservation',
  ],
  prohibitedEvidence: [
    'Dream journal text, analyses, tags, voice transcripts, names, or personal details',
    'Generated images, image files, image URLs, image descriptions, or media exports',
    'Private Preview links, invitations, access values, or browser session data',
    'Credentials, tokens, authorization headers, cookies, or configuration values',
    'Console output, private logs, network traces, or diagnostic dumps',
    'Request or response payloads and provider-returned content',
    'Screenshots, recordings, files, or other attachments',
  ],
};

export function getDreamImageSandboxTestOutcomeBundle(): DreamImageSandboxTestOutcomeBundle {
  return DREAM_IMAGE_SANDBOX_TEST_OUTCOME_BUNDLE;
}

export function getDreamImageSandboxTestOutcomeCopy(
  outcome: DreamImageSandboxTestOutcome,
): DreamImageSandboxTestOutcomeEntry {
  return DREAM_IMAGE_SANDBOX_TEST_OUTCOME_COPY[outcome];
}

export function getAllDreamImageSandboxTestOutcomeEntries(): DreamImageSandboxTestOutcomeEntry[] {
  return DREAM_IMAGE_SANDBOX_TEST_OUTCOME_ORDER.map(
    outcome => DREAM_IMAGE_SANDBOX_TEST_OUTCOME_COPY[outcome],
  );
}

export function isRecognizedDreamImageSandboxReferenceId(
  value: unknown,
): value is DreamImageSandboxReferenceId {
  if (typeof value !== 'string') return false;

  const blockerMatch = /^BLK-IMG-0([1-5])$/.exec(value);
  if (blockerMatch) return true;

  const testMatch = /^TC-IMG-(SCENE|STYLE|CONSENT|FAIL|PROG|ACT|DEL|A11Y)-(\d{2})$/.exec(
    value,
  );
  if (!testMatch) return false;
  const group = testMatch[1] as DreamImageMacTestGroup;
  const caseNumber = Number(testMatch[2]);
  return caseNumber >= 1 && caseNumber <= DREAM_IMAGE_MAC_TEST_GROUP_MAX[group];
}

export function isCompleteDreamImageSandboxOutcomeReport(
  report: Partial<DreamImageSandboxTestOutcomeReport>,
): report is DreamImageSandboxTestOutcomeReport {
  return (
    typeof report.outcome === 'string' &&
    DREAM_IMAGE_SANDBOX_TEST_OUTCOME_ORDER.includes(
      report.outcome as DreamImageSandboxTestOutcome,
    ) &&
    isRecognizedDreamImageSandboxReferenceId(report.referenceId) &&
    typeof report.sanitizedObservation === 'string' &&
    report.sanitizedObservation.trim().length > 0
  );
}

export function isRecognizedDreamImageSandboxTestOutcome(
  value: unknown,
): value is DreamImageSandboxTestOutcome {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_SANDBOX_TEST_OUTCOME_ORDER.includes(
      value as DreamImageSandboxTestOutcome,
    )
  );
}
