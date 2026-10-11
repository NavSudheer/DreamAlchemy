import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseDeviceDefectTriageCategory =
  | 'reproducible-product-defect'
  | 'device-environment-blocker'
  | 'optional-provider-blocker'
  | 'needs-more-sanitized-evidence'
  | 'duplicate-known-issue'
  | 'no-issue';

export type ReleaseDeviceDefectTriageEvidenceField =
  | 'testIdentifier'
  | 'sanitizedObservation';

export interface ReleaseDeviceDefectTriageEntry {
  category: ReleaseDeviceDefectTriageCategory;
  label: string;
  badgeLabel: string;
  description: string;
  useWhen: readonly string[];
  doNotUseWhen: string;
  nextAction: string;
  compatibleOutcomes: readonly ReleaseDeviceTestOutcome[];
  compatibleClassifications: readonly ReleaseDeviceTestClassification[];
  impliesPass: false;
  impliesReleaseApproval: false;
  accessibilityLabel: string;
}

export interface ReleaseDeviceDefectTriagePrompt {
  id: string;
  question: string;
  whyItMatters: string;
  answerGuidance: string;
}

export interface ReleaseDeviceDefectTriageReport {
  category: ReleaseDeviceDefectTriageCategory;
  testIdentifier: ReleaseDeviceTestIdentifier;
  sanitizedObservation: string;
}

export interface ReleaseDeviceDefectTriageBundle {
  title: string;
  subtitle: string;
  classificationReminder: string;
  identifierReminder: string;
  evidenceReminder: string;
  approvalBoundary: string;
  orderedCategories: readonly ReleaseDeviceDefectTriageCategory[];
  categories: Readonly<
    Record<ReleaseDeviceDefectTriageCategory, ReleaseDeviceDefectTriageEntry>
  >;
  prompts: readonly ReleaseDeviceDefectTriagePrompt[];
  allowedEvidenceFields: readonly ReleaseDeviceDefectTriageEvidenceField[];
  maximumObservationCharacters: number;
  prohibitedEvidence: readonly string[];
}

export const RELEASE_DEVICE_DEFECT_TRIAGE_CATEGORY_ORDER = [
  'reproducible-product-defect',
  'device-environment-blocker',
  'optional-provider-blocker',
  'needs-more-sanitized-evidence',
  'duplicate-known-issue',
  'no-issue',
] as const satisfies readonly ReleaseDeviceDefectTriageCategory[];

export const RELEASE_DEVICE_DEFECT_TRIAGE_CATEGORIES = {
  'reproducible-product-defect': {
    category: 'reproducible-product-defect',
    label: 'Reproducible product defect',
    badgeLabel: 'Product defect',
    description:
      'Available app behavior repeatedly differs from the expectation for the assigned existing test identifier.',
    useWhen: [
      'The target behavior was reached on the owner Mac or iOS device.',
      'The same observable mismatch occurred again with the same safe test setup.',
      'The mismatch remains after device, environment, and optional-provider limits are excluded.',
    ],
    doNotUseWhen:
      'Do not use when the target path was unavailable, the observation is not reproducible, or an external dependency prevented execution.',
    nextAction:
      'Record fail with the exact existing test identifier and a brief sanitized expected-versus-observed description.',
    compatibleOutcomes: ['fail'],
    compatibleClassifications: ['reproducible-product-defect'],
    impliesPass: false,
    impliesReleaseApproval: false,
    accessibilityLabel:
      'Reproducible product defect observed in available owner-device behavior; no release decision implied.',
  },
  'device-environment-blocker': {
    category: 'device-environment-blocker',
    label: 'Device or environment blocker',
    badgeLabel: 'Device blocked',
    description:
      'A device capability, permission, sandbox, connectivity condition, assigned build, or test environment prevents the target behavior from being reached.',
    useWhen: [
      'The required device feature, permission state, account sandbox, network condition, or assigned candidate is unavailable.',
      'The app behavior under test cannot be reached, so no product result can be observed.',
    ],
    doNotUseWhen:
      'Do not use when the target behavior is available and reproducibly differs from its expectation.',
    nextAction:
      'Record blocked with the exact existing test identifier and a sanitized description of the unavailable prerequisite.',
    compatibleOutcomes: ['blocked'],
    compatibleClassifications: ['device-environment-blocker'],
    impliesPass: false,
    impliesReleaseApproval: false,
    accessibilityLabel:
      'Owner-device test blocked by a device or environment prerequisite; no product result or release decision implied.',
  },
  'optional-provider-blocker': {
    category: 'optional-provider-blocker',
    label: 'Optional-provider blocker',
    badgeLabel: 'Provider blocked',
    description:
      'An optional Astrology or Dream Image behavior depends on a provider or protected Preview capability that remains unavailable or deliberately disabled.',
    useWhen: [
      'The assigned optional-feature case cannot reach provider-dependent behavior.',
      'The unavailable dependency is outside the core native release path.',
      'The provider-neutral or expected disabled behavior has not itself shown a reproducible product mismatch.',
    ],
    doNotUseWhen:
      'Do not use for a reproducible defect in an available provider-neutral preparation, disclosure, accessibility, or recovery path.',
    nextAction:
      'Record blocked with the exact existing matrix or blocker identifier and a brief sanitized statement of the optional dependency.',
    compatibleOutcomes: ['blocked'],
    compatibleClassifications: ['optional-provider-blocker'],
    impliesPass: false,
    impliesReleaseApproval: false,
    accessibilityLabel:
      'Optional feature blocked by an unavailable provider dependency; no core product result or release decision implied.',
  },
  'needs-more-sanitized-evidence': {
    category: 'needs-more-sanitized-evidence',
    label: 'Needs more sanitized evidence',
    badgeLabel: 'More evidence',
    description:
      'The current text does not establish whether the observation is a reproducible product mismatch, an external blocker, or expected behavior.',
    useWhen: [
      'The assigned test identifier, execution state, expected behavior, observed behavior, or repeat result is unclear.',
      'The available report contains only a conclusion without a concise observable fact.',
      'Unsafe evidence was removed and the remaining sanitized text is not sufficient to classify.',
    ],
    doNotUseWhen:
      'Do not guess a defect or blocker category when the missing facts can be obtained through an approved safe rerun.',
    nextAction:
      'Keep the test not run unless execution is already established, then request a short sanitized clarification or approved rerun.',
    compatibleOutcomes: ['not-run'],
    compatibleClassifications: ['none'],
    impliesPass: false,
    impliesReleaseApproval: false,
    accessibilityLabel:
      'More sanitized evidence is required before the owner-device observation can be classified.',
  },
  'duplicate-known-issue': {
    category: 'duplicate-known-issue',
    label: 'Duplicate of a known issue',
    badgeLabel: 'Known issue',
    description:
      'The sanitized symptoms and existing test identifier match an already tracked issue without adding a distinct behavior.',
    useWhen: [
      'The same existing test identifier and observable symptom are already tracked.',
      'The current observation adds no distinct device path, product mismatch, or blocker condition.',
    ],
    doNotUseWhen:
      'Do not merge observations that differ in affected path, expected behavior, visible symptom, or blocker type.',
    nextAction:
      'Link through the approved issue-tracking process outside this data copy and retain the original fail or blocked outcome; do not add private issue details here.',
    compatibleOutcomes: ['fail', 'blocked'],
    compatibleClassifications: [
      'reproducible-product-defect',
      'device-environment-blocker',
      'optional-provider-blocker',
    ],
    impliesPass: false,
    impliesReleaseApproval: false,
    accessibilityLabel:
      'Observation duplicates a known issue; the underlying fail or blocked outcome remains unchanged.',
  },
  'no-issue': {
    category: 'no-issue',
    label: 'No issue identified',
    badgeLabel: 'No issue',
    description:
      'The reported observation matches the documented expectation, is outside the assigned scope, or does not describe a product or dependency problem.',
    useWhen: [
      'The visible behavior is the documented expected state, including a clearly described optional feature remaining disabled.',
      'The report is a question, preference, or out-of-scope observation rather than an issue.',
      'The assigned case is explicitly not applicable to the tested surface.',
    ],
    doNotUseWhen:
      'Do not use to dismiss an unresolved reproducible mismatch or unavailable required dependency.',
    nextAction:
      'Close the triage item with a brief sanitized reason. Determine any test outcome separately under the owner-device outcome rules.',
    compatibleOutcomes: ['not-applicable', 'not-run'],
    compatibleClassifications: ['none'],
    impliesPass: false,
    impliesReleaseApproval: false,
    accessibilityLabel:
      'No triage issue identified; this category does not establish a test pass or release approval.',
  },
} as const satisfies Readonly<
  Record<ReleaseDeviceDefectTriageCategory, ReleaseDeviceDefectTriageEntry>
>;

export const RELEASE_DEVICE_DEFECT_TRIAGE_PROMPTS = [
  {
    id: 'existing-identifier',
    question:
      'Which exact existing assigned test identifier does this observation concern?',
    whyItMatters:
      'Triage must stay anchored to an approved matrix or blocker reference rather than a newly invented id.',
    answerGuidance:
      'Copy the identifier exactly. Do not include a private issue link or location.',
  },
  {
    id: 'hands-on-execution',
    question:
      'Was the target path executed hands-on on the assigned owner Mac or iOS surface?',
    whyItMatters:
      'A product failure cannot be established from documentation, automation, or an unexecuted device path alone.',
    answerGuidance:
      'Answer yes, no, or blocked with one short sanitized reason.',
  },
  {
    id: 'target-reached',
    question:
      'Was the intended product behavior reached before the observation occurred?',
    whyItMatters:
      'Unavailable prerequisites belong to blocker triage rather than product-defect triage.',
    answerGuidance:
      'Describe only the visible stopping point; do not include technical output or access details.',
  },
  {
    id: 'expected-versus-observed',
    question:
      'What existing expectation and observable behavior differed?',
    whyItMatters:
      'A concise mismatch is required to distinguish a reproducible defect from preference or ambiguity.',
    answerGuidance:
      'Use interface labels and visible states only, with private content removed.',
  },
  {
    id: 'repeat-result',
    question:
      'Did the same observable result occur again with the same approved safe setup?',
    whyItMatters:
      'A repeat result supports reproducibility without requiring logs, captures, or payloads.',
    answerGuidance:
      'Answer yes, no, or not retried; do not include fixture contents.',
  },
  {
    id: 'device-environment-dependency',
    question:
      'Did a device capability, permission, sandbox, connectivity condition, assigned build, or environment prevent the check?',
    whyItMatters:
      'These conditions are external blockers unless available app behavior independently differs from its expectation.',
    answerGuidance:
      'Name only the general prerequisite and visible state, not account, network, or configuration details.',
  },
  {
    id: 'optional-provider-dependency',
    question:
      'Did the observation require an optional Astrology or Dream Image provider-dependent path?',
    whyItMatters:
      'Unavailable optional providers remain separate from core product defects and core release results.',
    answerGuidance:
      'State only whether the assigned optional dependency was unavailable; do not name or evaluate a provider.',
  },
  {
    id: 'known-issue-match',
    question:
      'Does the same existing test identifier and sanitized symptom already have a tracked issue?',
    whyItMatters:
      'A true duplicate should retain the underlying outcome without creating a second issue record.',
    answerGuidance:
      'Answer yes, no, or unknown. Do not paste private issue links, attachments, or internal discussion.',
  },
  {
    id: 'safe-evidence-sufficiency',
    question:
      'After prohibited material is removed, is the remaining text sufficient to classify the observation?',
    whyItMatters:
      'Insufficient safe evidence should remain unclassified rather than being guessed into a defect or blocker.',
    answerGuidance:
      'Request only the missing sanitized observable fact or an approved safe rerun.',
  },
] as const satisfies readonly ReleaseDeviceDefectTriagePrompt[];

export const releaseDeviceDefectTriageCopy: ReleaseDeviceDefectTriageBundle = {
  title: 'Owner Mac and iOS defect triage',
  subtitle:
    'Concise categories for classifying sanitized owner-device observations without changing release scope.',
  classificationReminder:
    'A reproducible product defect requires an available path and repeated observable mismatch. Device, environment, and optional-provider limits remain blockers.',
  identifierReminder:
    'Use only an exact existing identifier accepted by the release device outcome contract. Never invent, shorten, or modify a test id.',
  evidenceReminder:
    'Evidence is sanitized text only: the exact existing test identifier and a brief observation of visible behavior.',
  approvalBoundary:
    'No triage category implies a test pass, launch approval, submission approval, provider approval, or Production readiness.',
  orderedCategories: RELEASE_DEVICE_DEFECT_TRIAGE_CATEGORY_ORDER,
  categories: RELEASE_DEVICE_DEFECT_TRIAGE_CATEGORIES,
  prompts: RELEASE_DEVICE_DEFECT_TRIAGE_PROMPTS,
  allowedEvidenceFields: ['testIdentifier', 'sanitizedObservation'],
  maximumObservationCharacters: 280,
  prohibitedEvidence: [
    'Dream content, journal text, voice recordings, transcripts, tags, analyses, or personal reflections',
    'Real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Generated media, media links, exports, or descriptions of generated media',
    'Private Preview, issue, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, store details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Launch, release, submission, provider, or Production approval claims',
  ],
};

export function getReleaseDeviceDefectTriageCopy(): ReleaseDeviceDefectTriageBundle {
  return releaseDeviceDefectTriageCopy;
}

export function getReleaseDeviceDefectTriageCategory(
  category: ReleaseDeviceDefectTriageCategory,
): ReleaseDeviceDefectTriageEntry {
  return releaseDeviceDefectTriageCopy.categories[category];
}

export function isReleaseDeviceTriageOutcomeCompatible(
  category: ReleaseDeviceDefectTriageCategory,
  outcome: ReleaseDeviceTestOutcome,
): boolean {
  return releaseDeviceDefectTriageCopy.categories[
    category
  ].compatibleOutcomes.includes(outcome);
}

export function isReleaseDeviceTriageClassificationCompatible(
  category: ReleaseDeviceDefectTriageCategory,
  classification: ReleaseDeviceTestClassification,
): boolean {
  return releaseDeviceDefectTriageCopy.categories[
    category
  ].compatibleClassifications.includes(classification);
}

export function isReleaseDeviceDefectTriageReportComplete(
  report: ReleaseDeviceDefectTriageReport,
): boolean {
  const observation = report.sanitizedObservation.trim();

  return (
    observation.length > 0 &&
    observation.length <=
      releaseDeviceDefectTriageCopy.maximumObservationCharacters
  );
}

export function isReleaseDeviceDefectTriageCategory(
  value: string,
): value is ReleaseDeviceDefectTriageCategory {
  return (
    RELEASE_DEVICE_DEFECT_TRIAGE_CATEGORY_ORDER as readonly string[]
  ).includes(value);
}
