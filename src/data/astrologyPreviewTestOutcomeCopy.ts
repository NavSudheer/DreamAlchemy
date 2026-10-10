/**
 * Astrology Preview Test Outcome Copy
 *
 * Typed, content-only labels and reporting guidance for private Preview tests.
 * Evidence is limited to test-case identifiers, public error codes, and
 * sanitized observations. Private links, credentials, personal data, dream
 * content, and attachments are not part of this reporting contract.
 */

import type { AstrologyPreviewPublicErrorCode } from './astrologyPreviewTroubleshooting';

export type AstrologyPreviewTestOutcome =
  | 'complete'
  | 'blocked'
  | 'skipped'
  | 'pass'
  | 'fail';

export type AstrologyPreviewIssueClassification =
  | 'none'
  | 'product-defect'
  | 'provider-blocker'
  | 'deployment-blocker';

export type AstrologyPreviewAllowedEvidenceField =
  | 'testCaseId'
  | 'publicErrorCode'
  | 'sanitizedObservation';

export interface AstrologyPreviewTestOutcomeEntry {
  /** Stable outcome key. */
  outcome: AstrologyPreviewTestOutcome;
  /** Primary user-facing label. */
  label: string;
  /** Compact status label. */
  shortLabel: string;
  /** Concise definition of the outcome. */
  description: string;
  /** Guidance for choosing this outcome. */
  useWhen: string;
  /** Common classification mistake to avoid. */
  doNotUseWhen: string;
  /** Issue classifications permitted with this outcome. */
  allowedClassifications: readonly AstrologyPreviewIssueClassification[];
  /** Whether a specific test-case identifier is required. */
  requiresTestCaseId: boolean;
  /** Whether a displayed public error code may be included. */
  allowsPublicErrorCode: boolean;
  /** Screen-reader description of the status. */
  accessibilityLabel: string;
}

export interface AstrologyPreviewTestOutcomeReport {
  outcome: AstrologyPreviewTestOutcome;
  classification: AstrologyPreviewIssueClassification;
  testCaseId?: string;
  publicErrorCode?: AstrologyPreviewPublicErrorCode;
  sanitizedObservation?: string;
}

export interface AstrologyPreviewTestOutcomeBundle {
  title: string;
  subtitle: string;
  classificationReminder: string;
  evidenceReminder: string;
  outcomes: Record<
    AstrologyPreviewTestOutcome,
    AstrologyPreviewTestOutcomeEntry
  >;
  orderedOutcomes: readonly AstrologyPreviewTestOutcome[];
  allowedEvidenceFields: readonly AstrologyPreviewAllowedEvidenceField[];
  prohibitedEvidence: readonly string[];
}

export const ASTROLOGY_PREVIEW_TEST_OUTCOME_ORDER: readonly AstrologyPreviewTestOutcome[] = [
  'complete',
  'pass',
  'fail',
  'blocked',
  'skipped',
] as const;

export const ASTROLOGY_PREVIEW_ALLOWED_EVIDENCE_FIELDS: readonly AstrologyPreviewAllowedEvidenceField[] = [
  'testCaseId',
  'publicErrorCode',
  'sanitizedObservation',
] as const;

export const ASTROLOGY_PREVIEW_TEST_OUTCOME_COPY: Record<
  AstrologyPreviewTestOutcome,
  AstrologyPreviewTestOutcomeEntry
> = {
  complete: {
    outcome: 'complete',
    label: 'Session Complete',
    shortLabel: 'Complete',
    description:
      'Every assigned item has a recorded pass, fail, blocked, or skipped outcome.',
    useWhen:
      'Use after all assigned private-test items have been accounted for and the session has been closed out.',
    doNotUseWhen:
      'Do not use “complete” to imply that every individual case passed or that any Production gate is cleared.',
    allowedClassifications: ['none'],
    requiresTestCaseId: false,
    allowsPublicErrorCode: false,
    accessibilityLabel:
      'Private Astrology Preview session complete; individual test outcomes may vary.',
  },

  blocked: {
    outcome: 'blocked',
    label: 'Blocked by Preview Dependency',
    shortLabel: 'Blocked',
    description:
      'The assigned case could not reach the behavior under test because a provider or deployment dependency was unavailable.',
    useWhen:
      'Use for an unavailable private deployment path, disabled provider-connected capability, or public service state that prevents the case from running.',
    doNotUseWhen:
      'Do not use when the product loaded the testable behavior and that behavior differed from the case expectation; record that as “fail.”',
    allowedClassifications: ['provider-blocker', 'deployment-blocker'],
    requiresTestCaseId: true,
    allowsPublicErrorCode: true,
    accessibilityLabel:
      'Test blocked by a provider or deployment dependency, not classified as a product defect.',
  },

  skipped: {
    outcome: 'skipped',
    label: 'Optional Case Skipped',
    shortLabel: 'Skipped',
    description:
      'An optional or out-of-session case was deliberately not exercised.',
    useWhen:
      'Use when an optional reflection was not requested or the session brief did not assign the case.',
    doNotUseWhen:
      'Do not use for an assigned case that could not run because a service or deployment dependency was unavailable; record that as “blocked.”',
    allowedClassifications: ['none'],
    requiresTestCaseId: true,
    allowsPublicErrorCode: false,
    accessibilityLabel:
      'Optional or unassigned private Astrology Preview test case skipped.',
  },

  pass: {
    outcome: 'pass',
    label: 'Expected Behavior Observed',
    shortLabel: 'Pass',
    description:
      'The observable product behavior matched the stated expectation for the test case.',
    useWhen:
      'Use after completing the assigned case with synthetic inputs and observing its expected interface, accessibility, persistence, or recovery behavior.',
    doNotUseWhen:
      'Do not use for a case that was only partially exercised, could not reach its target behavior, or relied on an unverified assumption.',
    allowedClassifications: ['none'],
    requiresTestCaseId: true,
    allowsPublicErrorCode: true,
    accessibilityLabel:
      'Private Astrology Preview test passed because expected product behavior was observed.',
  },

  fail: {
    outcome: 'fail',
    label: 'Product Behavior Did Not Match',
    shortLabel: 'Fail',
    description:
      'The available product behavior reproducibly differed from the stated test-case expectation.',
    useWhen:
      'Use for a reproducible interface, accessibility, validation, persistence, deletion, privacy-boundary, or recovery defect in behavior that was available to test.',
    doNotUseWhen:
      'Do not classify provider downtime, disabled deployment capability, missing private Preview access, or another known external dependency as a product failure.',
    allowedClassifications: ['product-defect'],
    requiresTestCaseId: true,
    allowsPublicErrorCode: true,
    accessibilityLabel:
      'Private Astrology Preview test failed because available product behavior did not match the expected result.',
  },
};

export const ASTROLOGY_PREVIEW_TEST_OUTCOME_BUNDLE: AstrologyPreviewTestOutcomeBundle = {
  title: 'Astrology Preview Test Outcomes',
  subtitle:
    'Concise status labels for private-test coverage, product defects, and external blockers.',
  classificationReminder:
    'A product defect is reproducible behavior within an available path that differs from the test case. Provider or deployment unavailability is a blocker, not a product defect.',
  evidenceReminder:
    'Record only the test-case id, displayed public error code when present, and a brief sanitized observation of visible behavior.',
  outcomes: ASTROLOGY_PREVIEW_TEST_OUTCOME_COPY,
  orderedOutcomes: ASTROLOGY_PREVIEW_TEST_OUTCOME_ORDER,
  allowedEvidenceFields: ASTROLOGY_PREVIEW_ALLOWED_EVIDENCE_FIELDS,
  prohibitedEvidence: [
    'Private Preview links or access information',
    'Credentials, tokens, headers, cookies, or private logs',
    'Real birth dates, times, locations, coordinates, or identifiers',
    'Dream journal text, voice transcripts, tags, or personal reflections',
    'Request or response bodies containing submitted data',
    'Screenshots, recordings, exports, or other attachments',
  ],
};

export function getAstrologyPreviewTestOutcomeBundle(): AstrologyPreviewTestOutcomeBundle {
  return ASTROLOGY_PREVIEW_TEST_OUTCOME_BUNDLE;
}

export function getAstrologyPreviewTestOutcomeCopy(
  outcome: AstrologyPreviewTestOutcome,
): AstrologyPreviewTestOutcomeEntry {
  return ASTROLOGY_PREVIEW_TEST_OUTCOME_COPY[outcome];
}

export function getAllAstrologyPreviewTestOutcomeEntries(): AstrologyPreviewTestOutcomeEntry[] {
  return ASTROLOGY_PREVIEW_TEST_OUTCOME_ORDER.map(
    outcome => ASTROLOGY_PREVIEW_TEST_OUTCOME_COPY[outcome],
  );
}

export function isClassificationAllowedForAstrologyPreviewOutcome(
  outcome: AstrologyPreviewTestOutcome,
  classification: AstrologyPreviewIssueClassification,
): boolean {
  return ASTROLOGY_PREVIEW_TEST_OUTCOME_COPY[
    outcome
  ].allowedClassifications.includes(classification);
}

export function isAstrologyPreviewProductDefect(
  report: Pick<AstrologyPreviewTestOutcomeReport, 'outcome' | 'classification'>,
): boolean {
  return report.outcome === 'fail' && report.classification === 'product-defect';
}

export function isAstrologyPreviewExternalBlocker(
  report: Pick<AstrologyPreviewTestOutcomeReport, 'outcome' | 'classification'>,
): boolean {
  return (
    report.outcome === 'blocked' &&
    (report.classification === 'provider-blocker' ||
      report.classification === 'deployment-blocker')
  );
}

export function isRecognizedAstrologyPreviewTestOutcome(
  value: unknown,
): value is AstrologyPreviewTestOutcome {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_TEST_OUTCOME_ORDER.includes(
      value as AstrologyPreviewTestOutcome,
    )
  );
}

export function isRecognizedAstrologyPreviewIssueClassification(
  value: unknown,
): value is AstrologyPreviewIssueClassification {
  return (
    value === 'none' ||
    value === 'product-defect' ||
    value === 'provider-blocker' ||
    value === 'deployment-blocker'
  );
}
