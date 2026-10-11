export type DreamImageDeviceCheckId =
  | 'voiceover-scene-announcements'
  | 'voiceover-style-announcements'
  | 'keyboard-and-focus'
  | 'light-and-dark-appearance'
  | 'narrow-viewport-and-taps'
  | 'disabled-state-clarity';

export type DreamImageDeviceCheckReferenceId =
  | 'TC-IMG-A11Y-01'
  | 'TC-IMG-A11Y-02'
  | 'TC-IMG-A11Y-03'
  | 'TC-IMG-A11Y-04'
  | 'TC-IMG-A11Y-05'
  | 'TC-IMG-STYLE-04'
  | 'TC-IMG-FAIL-01';

export type DreamImageDeviceCheckOutcome =
  | 'not-run'
  | 'pass'
  | 'fail'
  | 'blocked';

export interface DreamImageDeviceCheckEntry {
  id: DreamImageDeviceCheckId;
  title: string;
  referenceIds: readonly DreamImageDeviceCheckReferenceId[];
  setup: string;
  actions: readonly string[];
  observe: readonly string[];
  preExecutionOutcome: 'not-run';
  outcomeRule: string;
}

export interface DreamImageDeviceCheckCopy {
  title: string;
  introduction: string;
  executionRequirement: string;
  evidenceRequirement: string;
  allowedEvidenceFields: readonly string[];
  prohibitedEvidence: readonly string[];
  checks: readonly DreamImageDeviceCheckEntry[];
  closingReminder: string;
}

const checks = [
  {
    id: 'voiceover-scene-announcements',
    title: 'VoiceOver scene announcements',
    referenceIds: ['TC-IMG-A11Y-01'],
    setup:
      'On the assigned device, turn on VoiceOver and open the curated scene choices without entering dream content.',
    actions: [
      'Move through each scene choice using VoiceOver navigation.',
      'Select more than one approved catalog scene and revisit the choices.',
    ],
    observe: [
      'Each scene announces an understandable title and description.',
      'The radio role and current selected state are announced in a usable order.',
    ],
    preExecutionOutcome: 'not-run',
    outcomeRule:
      'Record pass or fail only after hearing the announcements on the assigned device.',
  },
  {
    id: 'voiceover-style-announcements',
    title: 'VoiceOver style announcements',
    referenceIds: ['TC-IMG-A11Y-02', 'TC-IMG-STYLE-04'],
    setup:
      'Keep VoiceOver on and move to the approved catalog style choices.',
    actions: [
      'Navigate across every style option.',
      'Change the selected style and return to the radiogroup.',
    ],
    observe: [
      'Each option announces a clear style label and helpful hint.',
      'The radiogroup, radio role, and current selected state are understandable.',
    ],
    preExecutionOutcome: 'not-run',
    outcomeRule:
      'Record pass or fail only after hearing and changing the style selection on the assigned device.',
  },
  {
    id: 'keyboard-and-focus',
    title: 'Keyboard and focus',
    referenceIds: [
      'TC-IMG-A11Y-01',
      'TC-IMG-A11Y-02',
      'TC-IMG-STYLE-04',
    ],
    setup:
      'Connect or enable the assigned keyboard and place focus at the start of the preparation screen.',
    actions: [
      'Move through scene and style choices using keyboard controls only.',
      'Change approved selections, move away, and return to the selected controls.',
    ],
    observe: [
      'Focus remains visible and follows a predictable order.',
      'Every required choice is reachable and usable without touch or pointer input.',
      'The selected state remains clear when focus moves away and returns.',
    ],
    preExecutionOutcome: 'not-run',
    outcomeRule:
      'Record pass or fail only after completing the keyboard-only path on the assigned device.',
  },
  {
    id: 'light-and-dark-appearance',
    title: 'Light and dark appearance',
    referenceIds: ['TC-IMG-A11Y-04'],
    setup:
      'Open the preparation screen on the assigned device with approved synthetic selections.',
    actions: [
      'Review the screen in light appearance.',
      'Switch the device to dark appearance and review the same screen again.',
    ],
    observe: [
      'Text, surfaces, controls, and selected borders remain readable in both appearances.',
      'No required label, state, or focus indicator disappears or becomes unclear.',
    ],
    preExecutionOutcome: 'not-run',
    outcomeRule:
      'Record pass or fail only after visually checking both appearances on the assigned device.',
  },
  {
    id: 'narrow-viewport-and-taps',
    title: 'Narrow viewport and tap handling',
    referenceIds: ['TC-IMG-A11Y-05'],
    setup:
      'Use the assigned narrow viewport or mobile-width device with the preparation screen open.',
    actions: [
      'Scroll through the full preparation screen.',
      'Tap approved scene and style choices near the top, middle, and bottom of the screen.',
    ],
    observe: [
      'Cards reflow without clipping required content or controls.',
      'Taps activate the intended choice and scrolling does not cause accidental selection.',
    ],
    preExecutionOutcome: 'not-run',
    outcomeRule:
      'Record pass or fail only after the narrow layout and tap path are exercised on the assigned device.',
  },
  {
    id: 'disabled-state-clarity',
    title: 'Disabled-state clarity',
    referenceIds: ['TC-IMG-FAIL-01'],
    setup:
      'Open the preparation screen in its expected feature-disabled state on the assigned device.',
    actions: [
      'Read the unavailable-state heading, explanation, and preparation guidance.',
      'Confirm that preparation remains distinguishable from live generation.',
    ],
    observe: [
      'The screen clearly says the image service is unavailable.',
      'The guidance makes clear that catalog preparation is safe to explore and does not create media.',
      'No control or message implies that live generation occurred or is available.',
    ],
    preExecutionOutcome: 'not-run',
    outcomeRule:
      'Record pass or fail only after reviewing the disabled state on the assigned device.',
  },
] as const satisfies readonly DreamImageDeviceCheckEntry[];

export const dreamImageDeviceCheckCopy: DreamImageDeviceCheckCopy = {
  title: 'Dream Image hands-on device checks',
  introduction:
    'Use approved synthetic catalog selections to complete the remaining preparation-screen checks. Live image generation stays disabled.',
  executionRequirement:
    'Every check begins as not run. A pass or fail requires hands-on execution on the assigned device; documentation or automated results alone are not sufficient.',
  evidenceRequirement:
    'Share sanitized text only. Name the exercised reference ID and briefly describe the observed interface behavior.',
  allowedEvidenceFields: [
    'Existing permitted reference ID',
    'Device category and public operating-system version',
    'Browser or app surface and public version',
    'Pass, fail, blocked, or not-run outcome',
    'Brief sanitized text observation',
  ],
  prohibitedEvidence: [
    'Dream content or journal text',
    'Generated media, media links, or media descriptions',
    'Private Preview links or access details',
    'Credentials, tokens, headers, cookies, or private configuration',
    'Logs, traces, or request and response payloads',
    'Screenshots or attachments',
    'Provider selections, recommendations, or approval claims',
    'Claims that live generation was available, attempted, or completed',
  ],
  checks,
  closingReminder:
    'If a hands-on step cannot be completed, keep it not run or mark it blocked with sanitized text; do not infer a pass or fail.',
};

export function getDreamImageDeviceCheckCopy(): DreamImageDeviceCheckCopy {
  return dreamImageDeviceCheckCopy;
}

export function getDreamImageDeviceCheck(
  id: DreamImageDeviceCheckId,
): DreamImageDeviceCheckEntry | undefined {
  return dreamImageDeviceCheckCopy.checks.find((check) => check.id === id);
}

export function canRecordDreamImageDeviceCheckResult(
  outcome: DreamImageDeviceCheckOutcome,
  handsOnExecutionCompleted: boolean,
): boolean {
  if (outcome === 'pass' || outcome === 'fail') {
    return handsOnExecutionCompleted;
  }

  return true;
}
