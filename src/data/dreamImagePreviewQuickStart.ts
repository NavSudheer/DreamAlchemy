/**
 * Dream Image Preview Quick Start
 *
 * A typed, content-only five-minute path for provider-neutral preparation
 * testing. It uses approved catalog selections, expects generation to remain
 * disabled, and collects sanitized text outcomes only.
 */

import type {
  DreamImageMacBlockerId,
  DreamImageMacTestCaseId,
  DreamImageSandboxReferenceId,
} from './dreamImageSandboxTestOutcomeCopy';

export type DreamImagePreviewQuickStartStepId =
  | 'open-preparation'
  | 'confirm-default-selection'
  | 'exercise-catalog-selection'
  | 'review-consent-and-privacy'
  | 'verify-disabled-state'
  | 'accessibility-spot-check'
  | 'record-sanitized-result';

export type DreamImagePreviewQuickStartOutcome =
  | 'complete'
  | 'blocked'
  | 'not-run';

export type DreamImageApprovedSelectionId =
  | 'threshold-default'
  | 'stillness-recommended-style'
  | 'sanctuary-style-override';

export interface DreamImagePreviewQuickStartSelectionRef {
  id: DreamImageApprovedSelectionId;
  label: string;
  sceneTitle: string;
  styleLabel: string;
  purpose: string;
}

export interface DreamImagePreviewQuickStartStep {
  /** Stable step identifier. */
  id: DreamImagePreviewQuickStartStepId;
  /** One-based display order. */
  step: number;
  /** Short action title. */
  title: string;
  /** Time allocated within the five-minute pass. */
  estimatedSeconds: number;
  /** Provider-neutral tester action. */
  instruction: string;
  /** Observable preparation-screen completion check. */
  successCheck: string;
  /** Existing Dream Image Mac test or blocker references. */
  referenceIds: readonly DreamImageSandboxReferenceId[];
  /** Safe action when the step cannot complete. */
  blockedAction: string;
}

export interface DreamImagePreviewQuickStartReport {
  outcome: DreamImagePreviewQuickStartOutcome;
  referenceId: DreamImageSandboxReferenceId;
  sanitizedObservation: string;
}

export interface DreamImagePreviewQuickStartBundle {
  title: string;
  subtitle: string;
  estimatedMinutes: 5;
  scopeReminder: string;
  reportingReminder: string;
  selections: readonly DreamImagePreviewQuickStartSelectionRef[];
  steps: readonly DreamImagePreviewQuickStartStep[];
  allowedOutcomes: readonly DreamImagePreviewQuickStartOutcome[];
  allowedReportFields: readonly [
    'outcome',
    'referenceId',
    'sanitizedObservation',
  ];
  outOfScope: readonly string[];
}

export const DREAM_IMAGE_PREVIEW_QUICK_START_SELECTIONS: readonly DreamImagePreviewQuickStartSelectionRef[] = [
  {
    id: 'threshold-default',
    label: 'Default Preparation State',
    sceneTitle: 'Luminous Threshold',
    styleLabel: 'Ethereal',
    purpose:
      'Confirm the initial curated scene, recommended style, and accessible description.',
  },
  {
    id: 'stillness-recommended-style',
    label: 'Recommended Style Change',
    sceneTitle: 'Mirror of Stillness',
    styleLabel: 'Watercolor',
    purpose:
      'Confirm a scene change applies its catalog-recommended style and updates prepared copy.',
  },
  {
    id: 'sanctuary-style-override',
    label: 'Manual Style Override',
    sceneTitle: 'Forest Sanctuary',
    styleLabel: 'Ethereal',
    purpose:
      'Confirm a manual style choice updates selection state and accessible description.',
  },
] as const;

export const DREAM_IMAGE_PREVIEW_QUICK_START_STEPS: readonly DreamImagePreviewQuickStartStep[] = [
  {
    id: 'open-preparation',
    step: 1,
    title: 'Open Dream Image preparation',
    estimatedSeconds: 30,
    instruction:
      'Open the already assigned Dream Image preparation screen and confirm that the curated catalog loads.',
    successCheck:
      'The preparation title, scene choices, style choices, privacy guidance, and unavailable-state area are visible without requesting generation.',
    referenceIds: ['TC-IMG-SCENE-01', 'TC-IMG-FAIL-01'],
    blockedAction:
      'Record the relevant existing test id, or BLK-IMG-01 if the assigned Preview route boundary is required and unavailable. Do not record a private location.',
  },
  {
    id: 'confirm-default-selection',
    step: 2,
    title: 'Confirm the default catalog selection',
    estimatedSeconds: 30,
    instruction:
      'Use the approved “threshold-default” selection and review its selected scene, recommended style, prepared description, and accessible scene description.',
    successCheck:
      'Luminous Threshold and Ethereal are selected, and the prepared and accessible descriptions correspond to that catalog combination.',
    referenceIds: ['TC-IMG-SCENE-01', 'TC-IMG-SCENE-05'],
    blockedAction:
      'Record the matching TC-IMG id and a sanitized description of the visible mismatch.',
  },
  {
    id: 'exercise-catalog-selection',
    step: 3,
    title: 'Exercise scene and style selection',
    estimatedSeconds: 60,
    instruction:
      'Select “stillness-recommended-style,” then “sanctuary-style-override.” Confirm the selected cards, prepared subtitle, style metadata, and accessible description update after each choice.',
    successCheck:
      'The recommended Watercolor choice appears for Mirror of Stillness, and the manual Ethereal override appears for Forest Sanctuary without freeform input.',
    referenceIds: [
      'TC-IMG-SCENE-02',
      'TC-IMG-SCENE-03',
      'TC-IMG-STYLE-01',
      'TC-IMG-STYLE-02',
      'TC-IMG-STYLE-03',
    ],
    blockedAction:
      'Record the closest TC-IMG scene or style id and a concise sanitized observation; do not add custom scene text.',
  },
  {
    id: 'review-consent-and-privacy',
    step: 4,
    title: 'Review consent and privacy boundaries',
    estimatedSeconds: 50,
    instruction:
      'Read the consent acknowledgment, non-interpretive disclosure, and privacy-and-safety checklist for the active catalog selection.',
    successCheck:
      'The copy identifies an abstract artistic use, excludes psychological or medical interpretation, and states that personal journal material is not part of the prepared request.',
    referenceIds: [
      'TC-IMG-SCENE-04',
      'TC-IMG-CONSENT-01',
      'TC-IMG-CONSENT-02',
      'TC-IMG-CONSENT-03',
    ],
    blockedAction:
      'Record the relevant consent or boundary test id and only the short interface phrase that was missing or unclear.',
  },
  {
    id: 'verify-disabled-state',
    step: 5,
    title: 'Verify the expected disabled state',
    estimatedSeconds: 40,
    instruction:
      'Review the Preview or unavailable notice without attempting generation. Confirm that catalog preparation remains usable.',
    successCheck:
      'The screen explains that image service is unavailable while scene, style, consent, safety, and accessible-description content remain available.',
    referenceIds: ['TC-IMG-FAIL-01'],
    blockedAction:
      'If the unavailable notice itself is incorrect, record TC-IMG-FAIL-01. If the application-owned Preview route is required but absent, record BLK-IMG-01.',
  },
  {
    id: 'accessibility-spot-check',
    step: 6,
    title: 'Perform accessibility spot checks',
    estimatedSeconds: 60,
    instruction:
      'Use keyboard or VoiceOver when available to sample one scene and one style option, then review selection state in light and dark appearance or at a narrower viewport.',
    successCheck:
      'Scene and style choices expose understandable names and selected state, focus remains usable, and the preparation layout remains readable without clipping required controls.',
    referenceIds: [
      'TC-IMG-STYLE-04',
      'TC-IMG-A11Y-01',
      'TC-IMG-A11Y-02',
      'TC-IMG-A11Y-04',
      'TC-IMG-A11Y-05',
    ],
    blockedAction:
      'Keep an unavailable device-specific check not run; otherwise record the exact TC-IMG accessibility id and a text-only observation.',
  },
  {
    id: 'record-sanitized-result',
    step: 7,
    title: 'Record sanitized outcomes',
    estimatedSeconds: 30,
    instruction:
      'Record each exercised item with only an existing TC-IMG or BLK-IMG id and a brief sanitized text observation.',
    successCheck:
      'The report contains no sensitive data, media, private locations, technical artifacts, or claim that live generation occurred.',
    referenceIds: ['TC-IMG-FAIL-01', 'BLK-IMG-01'],
    blockedAction:
      'Remove any prohibited detail before sharing the text outcome.',
  },
] as const;

export const DREAM_IMAGE_PREVIEW_QUICK_START_OUTCOMES: readonly DreamImagePreviewQuickStartOutcome[] = [
  'complete',
  'blocked',
  'not-run',
] as const;

export const DREAM_IMAGE_PREVIEW_QUICK_START_BUNDLE: DreamImagePreviewQuickStartBundle = {
  title: 'Five-Minute Dream Image Preview Quick Start',
  subtitle:
    'A provider-neutral browser pass for curated preparation, privacy, disabled-state, and accessibility behavior.',
  estimatedMinutes: 5,
  scopeReminder:
    'Remain within catalog preparation. Image generation is optional, unavailable by default, and must not be enabled or represented as tested by this quick-start.',
  reportingReminder:
    'Report only existing TC-IMG or BLK-IMG ids with brief sanitized text observations.',
  selections: DREAM_IMAGE_PREVIEW_QUICK_START_SELECTIONS,
  steps: DREAM_IMAGE_PREVIEW_QUICK_START_STEPS,
  allowedOutcomes: DREAM_IMAGE_PREVIEW_QUICK_START_OUTCOMES,
  allowedReportFields: [
    'outcome',
    'referenceId',
    'sanitizedObservation',
  ],
  outOfScope: [
    'Dream journal text, analyses, tags, voice transcripts, names, or personal details',
    'Generated images, image files, image URLs, image descriptions, or media exports',
    'Private Preview links, invitations, access values, or browser session data',
    'Credentials, tokens, authorization headers, cookies, or configuration values',
    'Console output, private logs, network traces, or diagnostic dumps',
    'Request or response payloads and provider-returned content',
    'Screenshots, recordings, files, exports, or other attachments',
    'Provider comparison, selection, connection, or approval',
    'Claims that live generation, remote delivery, saving, sharing, or provider-side deletion was tested',
  ],
};

export function getDreamImagePreviewQuickStartBundle(): DreamImagePreviewQuickStartBundle {
  return DREAM_IMAGE_PREVIEW_QUICK_START_BUNDLE;
}

export function getDreamImagePreviewQuickStartStep(
  id: DreamImagePreviewQuickStartStepId,
): DreamImagePreviewQuickStartStep | undefined {
  return DREAM_IMAGE_PREVIEW_QUICK_START_STEPS.find(step => step.id === id);
}

export function getDreamImagePreviewQuickStartSelection(
  id: DreamImageApprovedSelectionId,
): DreamImagePreviewQuickStartSelectionRef | undefined {
  return DREAM_IMAGE_PREVIEW_QUICK_START_SELECTIONS.find(
    selection => selection.id === id,
  );
}

export function getDreamImagePreviewQuickStartEstimatedSeconds(): number {
  return DREAM_IMAGE_PREVIEW_QUICK_START_STEPS.reduce(
    (total, step) => total + step.estimatedSeconds,
    0,
  );
}

export function isRecognizedDreamImagePreviewQuickStartOutcome(
  value: unknown,
): value is DreamImagePreviewQuickStartOutcome {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_PREVIEW_QUICK_START_OUTCOMES.includes(
      value as DreamImagePreviewQuickStartOutcome,
    )
  );
}

export function isDreamImagePreviewQuickStartTestCase(
  value: DreamImageSandboxReferenceId,
): value is DreamImageMacTestCaseId {
  return value.startsWith('TC-IMG-');
}

export function isDreamImagePreviewQuickStartBlocker(
  value: DreamImageSandboxReferenceId,
): value is DreamImageMacBlockerId {
  return value.startsWith('BLK-IMG-');
}
