import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseDeviceRetestPhase =
  | 'confirm-scope'
  | 'confirm-candidate'
  | 'rerun-smallest-path'
  | 'repeat-safely'
  | 'adjacent-regression'
  | 'classify-blockers'
  | 'record-sanitized-result'
  | 'closeout';

export interface ReleaseDeviceRetestStep {
  id: string;
  order: number;
  phase: ReleaseDeviceRetestPhase;
  title: string;
  instruction: string;
  observe: readonly string[];
  outcomeRule: string;
  initialOutcome: 'not-run';
  boundary: string;
}

export interface ReleaseDeviceRetestRecord {
  testIdentifier: ReleaseDeviceTestIdentifier;
  candidateBuildReference: string;
  outcome: ReleaseDeviceTestOutcome;
  classification: ReleaseDeviceTestClassification;
  adjacentTestIdentifier?: ReleaseDeviceTestIdentifier;
  sanitizedObservation: string;
}

export interface ReleaseDeviceRetestCopy {
  title: string;
  subtitle: string;
  scopeReminder: string;
  identifierReminder: string;
  executionReminder: string;
  blockerReminder: string;
  evidenceReminder: string;
  approvalBoundary: string;
  orderedPhases: readonly ReleaseDeviceRetestPhase[];
  steps: readonly ReleaseDeviceRetestStep[];
  maximumObservationCharacters: number;
  prohibitedEvidence: readonly string[];
}

export const RELEASE_DEVICE_RETEST_PHASES = [
  'confirm-scope',
  'confirm-candidate',
  'rerun-smallest-path',
  'repeat-safely',
  'adjacent-regression',
  'classify-blockers',
  'record-sanitized-result',
  'closeout',
] as const satisfies readonly ReleaseDeviceRetestPhase[];

export const RELEASE_DEVICE_RETEST_STEPS = [
  {
    id: 'confirm-existing-defect-identifier',
    order: 1,
    phase: 'confirm-scope',
    title: 'Confirm the existing defect identifier',
    instruction:
      'Copy the exact existing test identifier from the approved defect record and confirm that its expected behavior and original reproducible symptom are understood.',
    observe: [
      'The identifier is already accepted by the release device outcome contract.',
      'The retest scope describes one observable product mismatch rather than a new or expanded issue.',
    ],
    outcomeRule:
      'Keep the retest not run if the exact identifier or expected behavior cannot be confirmed; never create or alter an identifier.',
    initialOutcome: 'not-run',
    boundary:
      'Do not copy private issue links, original attachments, content, logs, payloads, or account details.',
  },
  {
    id: 'confirm-candidate-build',
    order: 2,
    phase: 'confirm-candidate',
    title: 'Confirm the candidate build',
    instruction:
      'Compare the installed app’s public version and approved short build reference with the candidate named for this retest.',
    observe: [
      'The expected app and assigned owner Mac or iOS surface are in use.',
      'The public version and approved short build reference match the retest brief.',
    ],
    outcomeRule:
      'If the candidate cannot be confirmed or installed, record a device or environment blocker rather than a product result.',
    initialOutcome: 'not-run',
    boundary:
      'Record only the approved short build reference; exclude install links, signing details, credentials, and private configuration.',
  },
  {
    id: 'rerun-smallest-affected-path',
    order: 3,
    phase: 'rerun-smallest-path',
    title: 'Rerun the smallest affected path',
    instruction:
      'Using approved safe test setup, execute only the shortest sequence that reaches the original expected behavior and symptom.',
    observe: [
      'The target product behavior is reached on the assigned device.',
      'The original observable mismatch is present, absent, or replaced by a distinct visible behavior.',
      'No unrelated feature or optional provider is required to judge the target path unless the existing case explicitly requires it.',
    ],
    outcomeRule:
      'Do not record pass or fail before this hands-on path completes. If the target cannot be reached, classify the blocker instead.',
    initialOutcome: 'not-run',
    boundary:
      'Use only approved non-personal fixtures and keep their contents out of evidence.',
  },
  {
    id: 'repeat-target-once',
    order: 4,
    phase: 'repeat-safely',
    title: 'Repeat once where safe',
    instruction:
      'When the action is non-destructive and the approved test setup remains valid, repeat the same smallest path once without changing conditions.',
    observe: [
      'The second result is consistent with or different from the first result.',
      'The repeat does not consume a real purchase, alter personal data, or require prohibited content.',
    ],
    outcomeRule:
      'If a safe repeat is unavailable, record that limitation in sanitized text; do not manufacture reproducibility or perform a risky action.',
    initialOutcome: 'not-run',
    boundary:
      'Do not repeat purchases, destructive actions, provider calls, or any step that could affect real accounts or data unless the approved sandbox explicitly permits it.',
  },
  {
    id: 'check-one-adjacent-path',
    order: 5,
    phase: 'adjacent-regression',
    title: 'Check one adjacent regression path',
    instruction:
      'Run one assigned neighboring behavior most directly affected by the fix, using its exact existing identifier when the approved matrix provides one.',
    observe: [
      'The adjacent path remains reachable and its expected visible behavior can be evaluated independently.',
      'A new mismatch is recorded separately from the original defect rather than merged into its retest note.',
    ],
    outcomeRule:
      'Do not infer the adjacent result from the target retest. Keep it not run if no safe, assigned adjacent path is available.',
    initialOutcome: 'not-run',
    boundary:
      'Do not invent an adjacent test identifier, broaden the fix scope, or use personal or provider-generated material.',
  },
  {
    id: 'preserve-device-environment-blocker',
    order: 6,
    phase: 'classify-blockers',
    title: 'Preserve device and environment blockers',
    instruction:
      'When the assigned build, device capability, permission, sandbox, or required environment prevents the target path, stop and classify the retest as blocked.',
    observe: [
      'The target product behavior was not reached.',
      'The stopping condition is external to the observable product expectation under retest.',
    ],
    outcomeRule:
      'Use blocked with device-environment-blocker; do not convert the unavailable retest into pass, fail, or not applicable.',
    initialOutcome: 'not-run',
    boundary:
      'Describe only the general unavailable prerequisite and visible state, without credentials, account data, logs, or configuration.',
  },
  {
    id: 'preserve-optional-provider-blocker',
    order: 7,
    phase: 'classify-blockers',
    title: 'Preserve optional-provider blockers',
    instruction:
      'If the existing case requires an optional Astrology or Dream Image provider-dependent path that remains unavailable or disabled, stop at that boundary.',
    observe: [
      'Provider-neutral behavior is distinguished from provider-dependent behavior.',
      'The optional dependency remains unavailable without being treated as a core product defect.',
    ],
    outcomeRule:
      'Use blocked with optional-provider-blocker; do not select a provider, attempt activation, or claim provider readiness.',
    initialOutcome: 'not-run',
    boundary:
      'Do not name provider preferences, expose private Preview access, create media, or attempt live generation.',
  },
  {
    id: 'record-target-outcome',
    order: 8,
    phase: 'record-sanitized-result',
    title: 'Record the target outcome',
    instruction:
      'After execution, use the existing release outcome definitions with the exact test identifier, candidate short build reference, and one brief sanitized observation.',
    observe: [
      'A remaining reproducible mismatch is recorded as fail with reproducible-product-defect.',
      'An unavailable prerequisite is recorded under the correct blocker classification.',
      'An unexecuted target remains not run and is never described as fixed.',
    ],
    outcomeRule:
      'A successful observation may support the assigned case outcome only after execution; it does not approve release, launch, a provider, or Production.',
    initialOutcome: 'not-run',
    boundary:
      'Evidence is text only and limited to exact existing identifiers, the approved short build reference, and concise sanitized visible behavior.',
  },
  {
    id: 'record-adjacent-outcome',
    order: 9,
    phase: 'record-sanitized-result',
    title: 'Record the adjacent outcome separately',
    instruction:
      'If the adjacent check was executed, record its outcome separately under its existing identifier rather than adding it to the target defect result.',
    observe: [
      'Target and adjacent observations remain distinguishable.',
      'A newly observed mismatch can be triaged without changing the original retest evidence.',
    ],
    outcomeRule:
      'Do not claim an adjacent pass or failure when the adjacent path was not executed hands-on.',
    initialOutcome: 'not-run',
    boundary:
      'Do not add screenshots, recordings, exports, logs, payloads, or private links to either record.',
  },
  {
    id: 'close-out-retest',
    order: 10,
    phase: 'closeout',
    title: 'Close out the retest',
    instruction:
      'Review the target and adjacent records, remove temporary unsafe notes, and list any remaining blocker or product mismatch using sanitized text only.',
    observe: [
      'The exact identifiers and candidate short build reference are present where required.',
      'No prohibited content or artifact remains in the handoff.',
      'The record states that retest outcomes do not constitute approval.',
    ],
    outcomeRule:
      'Closeout accounts for the retest evidence only; it does not approve release, launch, submission, provider use, or Production activation.',
    initialOutcome: 'not-run',
    boundary:
      'Do not retain credentials, account or store details, private locations, media, content, logs, payloads, screenshots, or attachments.',
  },
] as const satisfies readonly ReleaseDeviceRetestStep[];

export const releaseDeviceRetestCopy: ReleaseDeviceRetestCopy = {
  title: 'Owner Mac and iOS defect retest',
  subtitle:
    'A minimal, privacy-safe rerun for a claimed fix to one reproducible product defect.',
  scopeReminder:
    'Retest the original observable mismatch on the assigned candidate, repeat once only where safe, and check one assigned adjacent path.',
  identifierReminder:
    'Use only exact existing identifiers accepted by the release device outcome contract. This guidance defines no test ids.',
  executionReminder:
    'Every retest step begins not run. A claimed fix remains unverified until the affected path is executed hands-on on the assigned surface.',
  blockerReminder:
    'Keep device or environment blockers separate from optional-provider blockers. Neither is evidence that the defect is fixed or still present.',
  evidenceReminder:
    'Record sanitized text only: exact existing identifiers, the approved short candidate build reference, and brief visible observations.',
  approvalBoundary:
    'No retest outcome implies release, launch, submission, provider, or Production approval.',
  orderedPhases: RELEASE_DEVICE_RETEST_PHASES,
  steps: RELEASE_DEVICE_RETEST_STEPS,
  maximumObservationCharacters: 280,
  prohibitedEvidence: [
    'Dream content, journal text, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Voice recordings, transcripts, generated media, media links, exports, or descriptions of generated media',
    'Private Preview, issue, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, store details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Release, launch, submission, provider, or Production approval claims',
  ],
};

export function getReleaseDeviceRetestCopy(): ReleaseDeviceRetestCopy {
  return releaseDeviceRetestCopy;
}

export function getReleaseDeviceRetestStep(
  id: string,
): ReleaseDeviceRetestStep | undefined {
  return releaseDeviceRetestCopy.steps.find((step) => step.id === id);
}

export function getReleaseDeviceRetestStepsByPhase(
  phase: ReleaseDeviceRetestPhase,
): readonly ReleaseDeviceRetestStep[] {
  return releaseDeviceRetestCopy.steps.filter((step) => step.phase === phase);
}

export function isReleaseDeviceRetestClassificationCompatible(
  outcome: ReleaseDeviceTestOutcome,
  classification: ReleaseDeviceTestClassification,
): boolean {
  if (outcome === 'fail') {
    return classification === 'reproducible-product-defect';
  }

  if (outcome === 'blocked') {
    return (
      classification === 'device-environment-blocker' ||
      classification === 'optional-provider-blocker'
    );
  }

  return classification === 'none';
}

export function isReleaseDeviceRetestRecordComplete(
  record: ReleaseDeviceRetestRecord,
): boolean {
  const candidateBuildReference = record.candidateBuildReference.trim();
  const observation = record.sanitizedObservation.trim();

  return (
    candidateBuildReference.length > 0 &&
    observation.length > 0 &&
    observation.length <= releaseDeviceRetestCopy.maximumObservationCharacters &&
    isReleaseDeviceRetestClassificationCompatible(
      record.outcome,
      record.classification,
    )
  );
}
