/**
 * Dream Image Mac Test Guidance
 *
 * Typed, content-only guidance for privacy-safe manual testing of the
 * disabled-by-default Dream Image flow on macOS and iOS Simulator.
 */

import type { DreamImageStyle } from '../types/dreamImage';

export type DreamImageMacTestHelpTopic =
  | 'curated-synthetic-selections'
  | 'secret-and-personal-data-redaction'
  | 'disabled-and-sandbox-states'
  | 'accessible-generated-art-evidence'
  | 'safe-screenshots'
  | 'defect-report-evidence';

export type DreamImageMacTestScope =
  | 'preparation-ui'
  | 'controlled-disabled-route'
  | 'provider-connected-generation';

export type DreamImageMacTestReadiness =
  | 'testable-now'
  | 'controlled-preview-only'
  | 'blocked';

export interface DreamImageSyntheticSelection {
  /** Stable identifier for test reports. */
  id: string;
  /** Short scenario name. */
  label: string;
  /** Existing curated scene-template identifier. */
  templateId: string;
  /** Existing curated scene title for visual confirmation. */
  templateTitle: string;
  /** Existing supported rendering style. */
  style: DreamImageStyle;
  /** Manual test cases exercised by this selection. */
  relatedTestCases: readonly string[];
  /** Expected preparation-screen behavior. */
  expectedPreparationResult: string;
}

export interface DreamImageMacTestScopeState {
  scope: DreamImageMacTestScope;
  label: string;
  readiness: DreamImageMacTestReadiness;
  expectedState: string;
  testerAction: string;
}

export interface DreamImageMacTestHelpItem {
  id: DreamImageMacTestHelpTopic;
  title: string;
  shortTitle: string;
  badgeLabel: string;
  summary: string;
  guidance: string;
  checklist: readonly string[];
  accessibilityLabel: string;
}

export interface DreamImageMacTestHelpBundle {
  title: string;
  subtitle: string;
  scopeReminder: string;
  privacyReminder: string;
  items: Record<DreamImageMacTestHelpTopic, DreamImageMacTestHelpItem>;
  orderedTopics: readonly DreamImageMacTestHelpTopic[];
  sampleSelections: readonly DreamImageSyntheticSelection[];
  scopeStates: readonly DreamImageMacTestScopeState[];
}

export const DREAM_IMAGE_SYNTHETIC_SELECTIONS: readonly DreamImageSyntheticSelection[] = [
  {
    id: 'threshold-default',
    label: 'Default Preparation State',
    templateId: 'threshold-passage',
    templateTitle: 'Luminous Threshold',
    style: 'ethereal',
    relatedTestCases: ['TC-IMG-SCENE-01', 'TC-IMG-SCENE-05'],
    expectedPreparationResult:
      'The default scene and recommended style are selected, and the accessible scene description matches the ethereal Luminous Threshold preview.',
  },
  {
    id: 'stillness-recommended-style',
    label: 'Recommended Style Change',
    templateId: 'reflective-stillness',
    templateTitle: 'Mirror of Stillness',
    style: 'watercolor',
    relatedTestCases: ['TC-IMG-SCENE-03', 'TC-IMG-STYLE-03'],
    expectedPreparationResult:
      'Selecting Mirror of Stillness activates its recommended watercolor style and updates the prepared reflection and accessible description.',
  },
  {
    id: 'sanctuary-style-override',
    label: 'Manual Style Override',
    templateId: 'canopy-sanctuary',
    templateTitle: 'Forest Sanctuary',
    style: 'ethereal',
    relatedTestCases: ['TC-IMG-STYLE-02', 'TC-IMG-A11Y-02'],
    expectedPreparationResult:
      'The manual ethereal selection remains active until another scene is chosen, with its radio state and style-specific accessible description updated.',
  },
] as const;

export const DREAM_IMAGE_MAC_TEST_SCOPE_STATES: readonly DreamImageMacTestScopeState[] = [
  {
    scope: 'preparation-ui',
    label: 'Preparation UI',
    readiness: 'testable-now',
    expectedState:
      'Curated scene and style selection, prepared prompt copy, consent framing, safety guidance, preview alt text, theming, and VoiceOver behavior are available for local testing.',
    testerAction:
      'Report reproducible functional, visual, copy, privacy-boundary, and accessibility defects against the matching TC-IMG case.',
  },
  {
    scope: 'controlled-disabled-route',
    label: 'Disabled Route',
    readiness: 'controlled-preview-only',
    expectedState:
      'The application-owned route returns a stable feature_disabled response while DREAM_IMAGE_FEATURE_ENABLED is false or unset; the prepared selection remains usable.',
    testerAction:
      'Verify the disabled response only in a controlled local or Preview environment without adding provider credentials.',
  },
  {
    scope: 'provider-connected-generation',
    label: 'Live Generation',
    readiness: 'blocked',
    expectedState:
      'Live rendering, remote asset delivery, persistent saving, native sharing, and provider-side deletion are unavailable until BLK-IMG-01 through BLK-IMG-05 are cleared.',
    testerAction:
      'Record the applicable blocker instead of reporting the absence of provider-connected generation as a preparation-screen defect.',
  },
] as const;

export const DREAM_IMAGE_MAC_TEST_HELP_ORDERED_TOPICS: readonly DreamImageMacTestHelpTopic[] = [
  'curated-synthetic-selections',
  'secret-and-personal-data-redaction',
  'disabled-and-sandbox-states',
  'accessible-generated-art-evidence',
  'safe-screenshots',
  'defect-report-evidence',
] as const;

export const DREAM_IMAGE_MAC_TEST_HELP_ITEMS: Record<
  DreamImageMacTestHelpTopic,
  DreamImageMacTestHelpItem
> = {
  'curated-synthetic-selections': {
    id: 'curated-synthetic-selections',
    title: 'Curated Synthetic Selections',
    shortTitle: 'Test Selections',
    badgeLabel: 'Curated Only',
    summary:
      'Use catalog scenes and supported styles only; never substitute personal dream text.',
    guidance:
      'Use the provided scene-and-style selections to reproduce preparation behavior consistently. They contain only application-owned catalog content and do not require a real dream, personal narrative, or identifying metadata.',
    checklist: [
      'Reference the synthetic selection id in the test report.',
      'Confirm the scene title, active style, prepared prompt, and accessible description update together.',
      'Do not paste journal text, analysis, voice transcripts, names, or personal notes into test tools.',
    ],
    accessibilityLabel:
      'Guidance for testing Dream Image preparation with curated synthetic scene and style selections only.',
  },

  'secret-and-personal-data-redaction': {
    id: 'secret-and-personal-data-redaction',
    title: 'Secret & Personal Data Redaction',
    shortTitle: 'Redaction',
    badgeLabel: 'Redact Evidence',
    summary:
      'Remove credentials, personal journal content, system identifiers, and private paths from all evidence.',
    guidance:
      'Provider credentials must remain server-side. Before sharing logs or captures, redact Authorization headers, bearer tokens, cookies, signed URLs, deployment secrets, personal dream content, local dream identifiers, account details, and macOS usernames or home-directory paths.',
    checklist: [
      'Confirm browser requests contain no provider credential or server secret.',
      'Exclude raw dream text, analysis, tags, voice transcripts, names, and local dream identifiers.',
      'Mask cookies, bearer tokens, signed query values, Apple IDs, usernames, and local file paths.',
    ],
    accessibilityLabel:
      'Guidance for removing secrets and personal data from Dream Image testing evidence.',
  },

  'disabled-and-sandbox-states': {
    id: 'disabled-and-sandbox-states',
    title: 'Disabled & Sandbox State Expectations',
    shortTitle: 'Availability States',
    badgeLabel: 'Scope Boundary',
    summary:
      'Test the preparation flow and controlled disabled response; treat live generation as blocked.',
    guidance:
      'The preparation UI is available for local testing without a provider. A controlled route check may verify feature_disabled while the feature flag is off. Provider-connected sandbox rendering is not an expected working path until deployment, provider approval, moderation, durable throttling, and transient delivery gates are cleared.',
    checklist: [
      'Verify preparation controls remain usable when generation is unavailable.',
      'Expect feature_disabled only when exercising the configured application-owned route with the feature flag off.',
      'Do not enable production, add credentials, or classify blocked live generation as a UI defect.',
      'Reference BLK-IMG-01 through BLK-IMG-05 when a finding depends on provider-connected behavior.',
    ],
    accessibilityLabel:
      'Explanation of currently testable Dream Image states and provider-connected generation blockers.',
  },

  'accessible-generated-art-evidence': {
    id: 'accessible-generated-art-evidence',
    title: 'Accessible Artwork Evidence',
    shortTitle: 'Accessible Evidence',
    badgeLabel: 'Alt Text Review',
    summary:
      'Evaluate catalog alt-text previews now; label any future sandbox artwork evidence as provider-connected.',
    guidance:
      'For current manual testing, record the selected synthetic scene and style, the displayed accessible description, VoiceOver output, and whether the description communicates visible subject, medium, lighting, and palette without interpretation. Do not claim that preview alt text proves a live image was generated. Future sandbox artwork evidence must use curated inputs and identify the controlled environment.',
    checklist: [
      'Verify the accessible description changes with both scene and style.',
      'Reject empty text, filenames, generic placeholders, and psychological or predictive claims.',
      'Record VoiceOver behavior separately from the project heuristic result.',
      'Do not attach or describe provider-generated artwork as current evidence while live generation remains blocked.',
    ],
    accessibilityLabel:
      'Guidance for reviewing Dream Image alternative text without implying blocked live generation occurred.',
  },

  'safe-screenshots': {
    id: 'safe-screenshots',
    title: 'Safe Screenshots & Captures',
    shortTitle: 'Safe Screenshots',
    badgeLabel: 'Clean Captures',
    summary:
      'Crop evidence to the relevant component and inspect it for private context before sharing.',
    guidance:
      'Capture only the relevant Dream Image card, control, banner, or dialog. Exclude other tabs, bookmarks, browser profiles, desktop notifications, DevTools credential panes, personal dream screens, system usernames, and unrelated application content.',
    checklist: [
      'Crop the capture tightly to the component under test.',
      'Exclude browser chrome, other tabs, bookmarks, extensions, and desktop notifications.',
      'Do not show request headers, cookies, signed URLs, or environment-variable values.',
      'Reinspect every attachment for journal content, identifiers, and system paths.',
    ],
    accessibilityLabel:
      'Instructions for capturing sanitized Dream Image screenshots without exposing private context.',
  },

  'defect-report-evidence': {
    id: 'defect-report-evidence',
    title: 'Defect-Report Evidence',
    shortTitle: 'Defect Evidence',
    badgeLabel: 'Report Template',
    summary:
      'Provide reproducible, scope-aware findings with a test id, environment, synthetic selection, and sanitized evidence.',
    guidance:
      'Include the TC-IMG or BLK-IMG identifier, preparation-versus-provider scope, macOS/browser or simulator version, Git commit hash, synthetic selection id, exact steps, expected and actual behavior, accessibility observations, and sanitized evidence. State explicitly when a result depends on architecture that is still blocked.',
    checklist: [
      'Reference a case such as TC-IMG-SCENE-03, TC-IMG-A11Y-01, TC-IMG-FAIL-01, or BLK-IMG-01.',
      'Record the tested surface, operating-system version, browser or simulator version, and commit hash.',
      'Name the synthetic selection and list exact reproduction steps.',
      'Separate preparation-screen defects from provider-connected blockers.',
      'Attach only redacted screenshots and sanitized logs.',
    ],
    accessibilityLabel:
      'Checklist for privacy-safe and scope-aware Dream Image defect reports.',
  },
};

export const DREAM_IMAGE_MAC_TEST_HELP_BUNDLE: DreamImageMacTestHelpBundle = {
  title: 'Dream Image Mac Test Guidance',
  subtitle:
    'Privacy-safe guidance for the testable preparation flow and its provider-connected release boundary.',
  scopeReminder:
    'Curated preparation, consent, preview alt text, and accessibility are testable now; live provider generation and asset workflows remain blocked.',
  privacyReminder:
    'Use curated synthetic selections only, keep provider credentials server-side, and exclude personal dream content and identifiers from all evidence.',
  items: DREAM_IMAGE_MAC_TEST_HELP_ITEMS,
  orderedTopics: DREAM_IMAGE_MAC_TEST_HELP_ORDERED_TOPICS,
  sampleSelections: DREAM_IMAGE_SYNTHETIC_SELECTIONS,
  scopeStates: DREAM_IMAGE_MAC_TEST_SCOPE_STATES,
};

export function getDreamImageMacTestHelpItem(
  topic: DreamImageMacTestHelpTopic,
): DreamImageMacTestHelpItem {
  return DREAM_IMAGE_MAC_TEST_HELP_ITEMS[topic];
}

export function getAllDreamImageMacTestHelpItems(): DreamImageMacTestHelpItem[] {
  return DREAM_IMAGE_MAC_TEST_HELP_ORDERED_TOPICS.map(
    topic => DREAM_IMAGE_MAC_TEST_HELP_ITEMS[topic],
  );
}

export function getDreamImageMacTestHelpBundle(): DreamImageMacTestHelpBundle {
  return DREAM_IMAGE_MAC_TEST_HELP_BUNDLE;
}

export function getDreamImageSyntheticSelections(): readonly DreamImageSyntheticSelection[] {
  return DREAM_IMAGE_SYNTHETIC_SELECTIONS;
}

export function getDreamImageSyntheticSelectionById(
  id: string,
): DreamImageSyntheticSelection | undefined {
  return DREAM_IMAGE_SYNTHETIC_SELECTIONS.find(selection => selection.id === id);
}

export function getDreamImageMacTestScopeStates(): readonly DreamImageMacTestScopeState[] {
  return DREAM_IMAGE_MAC_TEST_SCOPE_STATES;
}

export function getDreamImageMacTestScopeState(
  scope: DreamImageMacTestScope,
): DreamImageMacTestScopeState | undefined {
  return DREAM_IMAGE_MAC_TEST_SCOPE_STATES.find(item => item.scope === scope);
}

export function isRecognizedDreamImageMacTestHelpTopic(
  value: unknown,
): value is DreamImageMacTestHelpTopic {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_MAC_TEST_HELP_ORDERED_TOPICS.includes(
      value as DreamImageMacTestHelpTopic,
    )
  );
}

export function isDreamImageMacTestScopeReady(
  scope: DreamImageMacTestScope,
): boolean {
  return getDreamImageMacTestScopeState(scope)?.readiness === 'testable-now';
}
