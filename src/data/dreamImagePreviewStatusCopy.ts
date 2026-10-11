import type { DreamImageSandboxReferenceId } from './dreamImageSandboxTestOutcomeCopy';

export type DreamImagePreviewStatus =
  | 'preparation-ready'
  | 'device-checks-pending'
  | 'protected-preview-blocked'
  | 'provider-gates-open'
  | 'live-generation-disabled';

export interface DreamImagePreviewStatusEntry {
  status: DreamImagePreviewStatus;
  title: string;
  badgeLabel: string;
  summary: string;
  nextAction: string;
  relatedReferenceIds: readonly DreamImageSandboxReferenceId[];
  preparationAvailable: boolean;
  liveGenerationAllowed: false;
  launchReadiness: 'not-claimed';
  accessibilityLabel: string;
}

export interface DreamImagePreviewStatusCopy {
  title: string;
  subtitle: string;
  globalGenerationState: 'disabled';
  optionalityReminder: string;
  reportingReminder: string;
  prohibitedEvidence: readonly string[];
  orderedStatuses: readonly DreamImagePreviewStatus[];
  statuses: Readonly<Record<DreamImagePreviewStatus, DreamImagePreviewStatusEntry>>;
}

const orderedStatuses = [
  'preparation-ready',
  'device-checks-pending',
  'protected-preview-blocked',
  'provider-gates-open',
  'live-generation-disabled',
] as const satisfies readonly DreamImagePreviewStatus[];

const statuses = {
  'preparation-ready': {
    status: 'preparation-ready',
    title: 'Preparation is ready to review',
    badgeLabel: 'Preparation ready',
    summary:
      'The provider-neutral preparation flow is available for approved catalog selections, consent review, and privacy checks.',
    nextAction:
      'Use approved synthetic selections to review TC-IMG-SCENE-01, TC-IMG-STYLE-01, and TC-IMG-CONSENT-01. This status does not enable image generation.',
    relatedReferenceIds: [
      'TC-IMG-SCENE-01',
      'TC-IMG-STYLE-01',
      'TC-IMG-CONSENT-01',
    ],
    preparationAvailable: true,
    liveGenerationAllowed: false,
    launchReadiness: 'not-claimed',
    accessibilityLabel:
      'Dream Image preparation is ready for review. Live generation remains disabled.',
  },
  'device-checks-pending': {
    status: 'device-checks-pending',
    title: 'Device checks are still pending',
    badgeLabel: 'Checks pending',
    summary:
      'Manual keyboard, focus, screen-reader, contrast, viewport, and tap-handling checks still require execution on an approved device.',
    nextAction:
      'Run the relevant TC-IMG-A11Y cases on the assigned device and report only the case IDs with sanitized observations. Do not mark them passed before execution.',
    relatedReferenceIds: [
      'TC-IMG-A11Y-01',
      'TC-IMG-A11Y-02',
      'TC-IMG-A11Y-03',
      'TC-IMG-A11Y-04',
      'TC-IMG-A11Y-05',
    ],
    preparationAvailable: true,
    liveGenerationAllowed: false,
    launchReadiness: 'not-claimed',
    accessibilityLabel:
      'Dream Image device checks are pending. No accessibility result has been claimed.',
  },
  'protected-preview-blocked': {
    status: 'protected-preview-blocked',
    title: 'Protected Preview access is blocked',
    badgeLabel: 'Preview blocked',
    summary:
      'The protected Preview deployment cannot be verified in the current session. Local preparation checks may continue where approved.',
    nextAction:
      'Report BLK-IMG-01 with a sanitized observation. Do not include the private Preview link or access details.',
    relatedReferenceIds: ['BLK-IMG-01'],
    preparationAvailable: true,
    liveGenerationAllowed: false,
    launchReadiness: 'not-claimed',
    accessibilityLabel:
      'Protected Dream Image Preview access is blocked. Live generation remains disabled.',
  },
  'provider-gates-open': {
    status: 'provider-gates-open',
    title: 'Provider gates remain open',
    badgeLabel: 'Gates unresolved',
    summary:
      'Required deployment, approval, moderation, throttling, and storage evidence is still unresolved. Open gates do not mean the feature is available.',
    nextAction:
      'Track BLK-IMG-01 through BLK-IMG-05 using sanitized status notes only. Do not name, recommend, or select a provider.',
    relatedReferenceIds: [
      'BLK-IMG-01',
      'BLK-IMG-02',
      'BLK-IMG-03',
      'BLK-IMG-04',
      'BLK-IMG-05',
    ],
    preparationAvailable: true,
    liveGenerationAllowed: false,
    launchReadiness: 'not-claimed',
    accessibilityLabel:
      'Dream Image provider gates remain unresolved. This is not approval to generate or launch.',
  },
  'live-generation-disabled': {
    status: 'live-generation-disabled',
    title: 'Live generation is disabled',
    badgeLabel: 'Generation off',
    summary:
      'Dream Images remains optional and disabled by default. Preparation review does not send content or create media.',
    nextAction:
      'Verify the expected disabled behavior with TC-IMG-FAIL-01 and record only the test ID with a sanitized observation.',
    relatedReferenceIds: [
      'TC-IMG-FAIL-01',
      'BLK-IMG-02',
      'BLK-IMG-03',
      'BLK-IMG-04',
      'BLK-IMG-05',
    ],
    preparationAvailable: true,
    liveGenerationAllowed: false,
    launchReadiness: 'not-claimed',
    accessibilityLabel:
      'Live Dream Image generation is disabled. Preparation review remains available.',
  },
} as const satisfies Readonly<
  Record<DreamImagePreviewStatus, DreamImagePreviewStatusEntry>
>;

export const dreamImagePreviewStatusCopy: DreamImagePreviewStatusCopy = {
  title: 'Dream Image Preview status',
  subtitle:
    'Use these statuses for the optional, provider-neutral preparation flow. None authorizes live generation or launch.',
  globalGenerationState: 'disabled',
  optionalityReminder:
    'Dream Images is optional. Preparation may be reviewed without enabling generation.',
  reportingReminder:
    'Report only existing TC-IMG-* or BLK-IMG-* IDs with brief, sanitized observations based on approved synthetic inputs.',
  prohibitedEvidence: [
    'Dream content or journal text',
    'Generated media, image links, or media descriptions',
    'Private Preview links or access details',
    'Credentials, tokens, headers, cookies, or private configuration',
    'Logs, traces, or request and response payloads',
    'Screenshots or attachments',
    'Provider selections, recommendations, or approval claims',
    'Launch dates, launch promises, or Production readiness claims',
  ],
  orderedStatuses,
  statuses,
};

export function getDreamImagePreviewStatusCopy(): DreamImagePreviewStatusCopy {
  return dreamImagePreviewStatusCopy;
}

export function getDreamImagePreviewStatus(
  status: DreamImagePreviewStatus,
): DreamImagePreviewStatusEntry {
  return dreamImagePreviewStatusCopy.statuses[status];
}

export function getDreamImagePreviewStatuses(): readonly DreamImagePreviewStatusEntry[] {
  return dreamImagePreviewStatusCopy.orderedStatuses.map(
    (status) => dreamImagePreviewStatusCopy.statuses[status],
  );
}

export function getDreamImagePreviewStatusReferenceIds(
  status: DreamImagePreviewStatus,
): readonly DreamImageSandboxReferenceId[] {
  return dreamImagePreviewStatusCopy.statuses[status].relatedReferenceIds;
}

export function isDreamImagePreviewStatus(
  value: string,
): value is DreamImagePreviewStatus {
  return (dreamImagePreviewStatusCopy.orderedStatuses as readonly string[]).includes(value);
}
