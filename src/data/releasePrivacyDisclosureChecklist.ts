export type ReleasePrivacyDisclosureState =
  | 'implemented'
  | 'device-verification-pending'
  | 'private-preview'
  | 'blocked'
  | 'excluded';

export type ReleasePrivacyDisclosureEligibility =
  | 'evidence-required'
  | 'not-eligible';

export type ReleasePrivacyDisclosureArea =
  | 'local-dream-storage'
  | 'external-dream-analysis'
  | 'optional-voice'
  | 'subscription-sdk'
  | 'astrology-preview'
  | 'dream-images-disabled'
  | 'local-data-deletion'
  | 'excluded-accounts'
  | 'excluded-sync'
  | 'excluded-health';

export type ReleasePrivacyDataHandlingCategory =
  | 'on-device-only'
  | 'external-processing-via-proxy'
  | 'native-platform-speech-processing'
  | 'third-party-purchase-sdk'
  | 'preview-only-isolated'
  | 'provider-blocked-no-collection'
  | 'not-collected-excluded';

export type ReleasePrivacyEvidenceKind =
  | 'code-and-storage-audit'
  | 'automated-regression'
  | 'owner-device-verification'
  | 'payload-boundary-inspection'
  | 'policy-and-disclosure-alignment';

export interface ReleasePrivacyDisclosureEntry {
  area: ReleasePrivacyDisclosureArea;
  title: string;
  state: ReleasePrivacyDisclosureState;
  eligibility: ReleasePrivacyDisclosureEligibility;
  dataHandlingCategory: ReleasePrivacyDataHandlingCategory;
  candidateDataBehavior: string;
  disclosureGuidance: string;
  requiredEvidence: readonly ReleasePrivacyEvidenceKind[];
  checklist: readonly string[];
  prohibitedPractices: readonly string[];
  grantsLegalCompliance: false;
  grantsReleaseApproval: false;
  accessibilityLabel: string;
}

export interface ReleasePrivacyDisclosureReview {
  area: ReleasePrivacyDisclosureArea;
  confirmedEvidence: readonly ReleasePrivacyEvidenceKind[];
}

export interface ReleasePrivacyDisclosureChecklist {
  title: string;
  subtitle: string;
  evidenceReminder: string;
  boundaryReminder: string;
  legalDisclaimer: string;
  approvalBoundary: string;
  orderedAreas: readonly ReleasePrivacyDisclosureArea[];
  entries: Readonly<
    Record<ReleasePrivacyDisclosureArea, ReleasePrivacyDisclosureEntry>
  >;
  reviewChecklist: readonly string[];
  prohibitedEvidenceContent: readonly string[];
}

const ACTIVE_CANDIDATE_REQUIRED_EVIDENCE = [
  'code-and-storage-audit',
  'automated-regression',
  'owner-device-verification',
  'payload-boundary-inspection',
  'policy-and-disclosure-alignment',
] as const satisfies readonly ReleasePrivacyEvidenceKind[];

const POLICY_ALIGNMENT_ONLY_EVIDENCE = [
  'code-and-storage-audit',
  'policy-and-disclosure-alignment',
] as const satisfies readonly ReleasePrivacyEvidenceKind[];

export const RELEASE_PRIVACY_DISCLOSURE_AREA_ORDER = [
  'local-dream-storage',
  'external-dream-analysis',
  'optional-voice',
  'subscription-sdk',
  'astrology-preview',
  'dream-images-disabled',
  'local-data-deletion',
  'excluded-accounts',
  'excluded-sync',
  'excluded-health',
] as const satisfies readonly ReleasePrivacyDisclosureArea[];

export const RELEASE_PRIVACY_DISCLOSURE_ENTRIES = {
  'local-dream-storage': {
    area: 'local-dream-storage',
    title: 'Local dream journal and history storage',
    state: 'implemented',
    eligibility: 'evidence-required',
    dataHandlingCategory: 'on-device-only',
    candidateDataBehavior:
      'Dream entries, titles, narratives, dates, tags, and generated analyses are saved locally in AsyncStorage on the device.',
    disclosureGuidance:
      'Disclose as locally stored user content. No personal identity, account credentials, or tracking identifiers are attached.',
    requiredEvidence: ACTIVE_CANDIDATE_REQUIRED_EVIDENCE,
    checklist: [
      'Verify dream entries are stored strictly in local device AsyncStorage.',
      'Confirm no background upload, shadow replication, or telemetry logging exists for journal narratives.',
      'Confirm AsyncStorage keys remain bounded within the DreamAlchemy application domain.',
    ],
    prohibitedPractices: [
      'Uploading dream narratives to persistent external storage or telemetry sinks',
      'Attaching personally identifiable accounts or profile data to dream records',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Local dream storage is implemented strictly on-device; evidence is required and no legal compliance or release approval is granted.',
  },
  'external-dream-analysis': {
    area: 'external-dream-analysis',
    title: 'External dream analysis proxy boundary',
    state: 'implemented',
    eligibility: 'evidence-required',
    dataHandlingCategory: 'external-processing-via-proxy',
    candidateDataBehavior:
      'When triggered by the user, bounded dream narrative text is transmitted over HTTPS to the backend proxy route and then to the configured model provider. The application does not add an application database write to this request path; provider handling remains subject to the reviewed provider terms and configuration.',
    disclosureGuidance:
      'Disclose dream text as user content sent to a third-party model provider for application functionality. Do not claim zero provider retention or training use without separately verified provider evidence.',
    requiredEvidence: ACTIVE_CANDIDATE_REQUIRED_EVIDENCE,
    checklist: [
      'Verify analysis payload passes only the dream text entered by the user.',
      'Confirm no user identity, hardware UDID, or tracking tokens are passed in headers or body.',
      'Confirm error responses and provider failures do not persist or leak raw payload fragments.',
      'Confirm retry and edit flows preserve the dream locally without generating unauthorized background requests.',
    ],
    prohibitedPractices: [
      'Transmitting birth data, contacts, or hardware tracking tokens with the dream',
      'Persisting raw dream text in an application database or making unverified provider retention or training claims',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'External dream analysis is implemented with an ephemeral proxy boundary; candidate evidence is required.',
  },
  'optional-voice': {
    area: 'optional-voice',
    title: 'Optional native voice dictation',
    state: 'device-verification-pending',
    eligibility: 'evidence-required',
    dataHandlingCategory: 'native-platform-speech-processing',
    candidateDataBehavior:
      'Voice input relies on the native iOS speech recognition service while the microphone control is actively engaged. The application does not save an audio file or send audio to its own backend; Apple may process speech on-device or through Apple services depending on device, locale, and availability.',
    disclosureGuidance:
      'Disclose optional microphone and Apple speech-recognition use for dictation. State only the verified application boundary: Dream Alchemy does not save audio files or send audio to its own backend.',
    requiredEvidence: ACTIVE_CANDIDATE_REQUIRED_EVIDENCE,
    checklist: [
      'Verify microphone permission prompt copy clearly explains the dictation purpose.',
      'Confirm audio capture halts immediately upon stop, pause, cancellation, or backgrounding.',
      'Verify the application writes no audio file and sends no audio to its own backend.',
      'Complete hands-on verification on supported iOS hardware.',
    ],
    prohibitedPractices: [
      'Continuous background audio capture or ambient listening',
      'Sending audio files to Dream Alchemy application servers or unrelated third parties',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Native voice dictation is pending device verification and may use Apple speech services; the application does not retain audio files.',
  },
  'subscription-sdk': {
    area: 'subscription-sdk',
    title: 'In-app purchases and subscription SDK',
    state: 'device-verification-pending',
    eligibility: 'evidence-required',
    dataHandlingCategory: 'third-party-purchase-sdk',
    candidateDataBehavior:
      'RevenueCat SDK handles StoreKit purchase transactions, receipt validation, and entitlement checking using an anonymous App User ID.',
    disclosureGuidance:
      'Disclose purchase history and financial transaction handling by Apple App Store and RevenueCat for subscription entitlement; no payment card details are accessible to the app.',
    requiredEvidence: ACTIVE_CANDIDATE_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm StoreKit transactions use anonymous app user identifiers without personal account linking.',
      'Verify credit card, billing address, and bank details remain entirely within Apple StoreKit.',
      'Verify debug panels and diagnostic tools are strictly disabled in production builds.',
      'Verify subscription restore and trial state recovery do not leak user identities.',
    ],
    prohibitedPractices: [
      'Collecting credit card, banking, or billing address details directly',
      'Linking purchase tokens to personal user identity without an account system',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Subscription SDK is pending device sandbox verification; discloses anonymous purchase management only.',
  },
  'astrology-preview': {
    area: 'astrology-preview',
    title: 'Optional Astrology private Preview',
    state: 'private-preview',
    eligibility: 'not-eligible',
    dataHandlingCategory: 'preview-only-isolated',
    candidateDataBehavior:
      'Astrology calculation is restricted to private Preview testing with synthetic profiles and blocked in Production. With explicit consent, chart inputs are sent through the preview backend to the configured astrology provider; the resulting profile can be stored locally and remains isolated from core dream analysis.',
    disclosureGuidance:
      'Keep private Preview behavior separate from public App Store production disclosures; feature is disabled for public release.',
    requiredEvidence: POLICY_ALIGNMENT_ONLY_EVIDENCE,
    checklist: [
      'Confirm remote Astrology calculation is blocked by the Production environment boundary.',
      'Verify local birth profile data is never transmitted to the core dream analysis route.',
      'Verify the private Preview disclosure identifies the configured astrology provider data transfer.',
      'Verify local birth profile deletion completely purges stored birth date and location.',
    ],
    prohibitedPractices: [
      'Disclosing Astrology as an active public production feature',
      'Transmitting birth data to analytics or unauthorized third-party services',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Astrology is private Preview only and not eligible for public production store disclosures.',
  },
  'dream-images-disabled': {
    area: 'dream-images-disabled',
    title: 'Dream Images disabled preparation state',
    state: 'blocked',
    eligibility: 'not-eligible',
    dataHandlingCategory: 'provider-blocked-no-collection',
    candidateDataBehavior:
      'Dream Image generation route is disabled and unconfigured. Catalog selection and preparation UI exist locally, but no images are generated or transmitted.',
    disclosureGuidance:
      'Do not disclose image generation or media processing as an active feature; generation remains blocked.',
    requiredEvidence: [
      'code-and-storage-audit',
      'automated-regression',
      'policy-and-disclosure-alignment',
    ],
    checklist: [
      'Confirm /api/dream-image route returns feature-disabled responses.',
      'Confirm no image provider credentials exist in the client application bundle.',
      'Confirm no media or prompt files are uploaded to image generation services.',
    ],
    prohibitedPractices: [
      'Advertising or disclosing active AI image generation capabilities',
      'Sending user dream narratives to third-party image generation APIs',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Dream Images live generation is blocked; no image generation data handling is active.',
  },
  'local-data-deletion': {
    area: 'local-data-deletion',
    title: 'Local data deletion and reset',
    state: 'implemented',
    eligibility: 'evidence-required',
    dataHandlingCategory: 'on-device-only',
    candidateDataBehavior:
      'Users can delete individual dream entries, reset onboarding state, and clear locally saved items directly from the application.',
    disclosureGuidance:
      'Disclose that deleting entries from the device permanently removes them from local storage, with no residual cloud copies.',
    requiredEvidence: [
      'code-and-storage-audit',
      'automated-regression',
      'owner-device-verification',
      'policy-and-disclosure-alignment',
    ],
    checklist: [
      'Confirm deletion of an entry removes it from AsyncStorage history and pattern indices.',
      'Confirm deleted entries cannot be recovered from local device cache.',
      'Verify deletion completes locally without network calls.',
    ],
    prohibitedPractices: [
      'Retaining shadow copies or soft-deleted records after user deletion',
      'Requiring account-based deletion flows when no account exists',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Local data deletion is implemented on-device; permanently removes local records without cloud residue.',
  },
  'excluded-accounts': {
    area: 'excluded-accounts',
    title: 'Customer accounts and user authentication',
    state: 'excluded',
    eligibility: 'not-eligible',
    dataHandlingCategory: 'not-collected-excluded',
    candidateDataBehavior:
      'The application contains no user account creation, login, email registration, password storage, or user profile system.',
    disclosureGuidance:
      'Do not declare account creation, contact info collection (name, email, phone), or login credentials on privacy nutritional labels.',
    requiredEvidence: POLICY_ALIGNMENT_ONLY_EVIDENCE,
    checklist: [
      'Confirm no authentication or registration forms exist in the candidate.',
      'Ensure App Store privacy disclosures reflect zero collection of contact or identity information.',
    ],
    prohibitedPractices: [
      'Collecting user names, email addresses, phone numbers, or passwords',
      'Disclosing user account data practices for a feature that is excluded',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'User accounts are excluded; no contact or account data is collected.',
  },
  'excluded-sync': {
    area: 'excluded-sync',
    title: 'Cloud backup and cross-device sync',
    state: 'excluded',
    eligibility: 'not-eligible',
    dataHandlingCategory: 'not-collected-excluded',
    candidateDataBehavior:
      'The application does not synchronize data to remote cloud databases or across devices.',
    disclosureGuidance:
      'Do not declare cloud backup, remote database sync, or cross-device account data transfer.',
    requiredEvidence: POLICY_ALIGNMENT_ONLY_EVIDENCE,
    checklist: [
      'Confirm all persistence remains strictly on-device in AsyncStorage.',
      'Verify no cloud sync services (e.g. Firebase, iCloud sync, AWS) are configured or bundled.',
    ],
    prohibitedPractices: [
      'Claiming cloud synchronization or multi-device account access',
      'Quietly synchronizing dream journals to third-party cloud storage',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Cloud sync is excluded; data remains strictly on the local device.',
  },
  'excluded-health': {
    area: 'excluded-health',
    title: 'HealthKit, medical, and clinical data',
    state: 'excluded',
    eligibility: 'not-eligible',
    dataHandlingCategory: 'not-collected-excluded',
    candidateDataBehavior:
      'The application does not integrate with Apple HealthKit, biometric sensors, clinical medical systems, or health records.',
    disclosureGuidance:
      'Do not declare health, medical, or clinical data collection on App Store privacy nutritional labels.',
    requiredEvidence: POLICY_ALIGNMENT_ONLY_EVIDENCE,
    checklist: [
      'Confirm no HealthKit entitlements or APIs are referenced in the app bundle.',
      'Ensure no sleep-staging sensor data or vital signs are collected.',
      'Verify psychological reflections and techniques are framed purely as self-reflection, not clinical data.',
    ],
    prohibitedPractices: [
      'Accessing Apple HealthKit or biometric health databases',
      'Marketing the app as collecting or processing regulated medical data',
    ],
    grantsLegalCompliance: false,
    grantsReleaseApproval: false,
    accessibilityLabel:
      'Health and medical features are excluded; no health data is collected or processed.',
  },
} as const satisfies Readonly<
  Record<ReleasePrivacyDisclosureArea, ReleasePrivacyDisclosureEntry>
>;

export const releasePrivacyDisclosureChecklist: ReleasePrivacyDisclosureChecklist = {
  title: 'Privacy disclosure checklist',
  subtitle:
    'A pre-submission checklist mapping actual candidate data behavior to accurate privacy disclosures.',
  evidenceReminder:
    'Every disclosure entry requires verified evidence on the exact candidate build before final review. Technical capability alone does not satisfy disclosure requirements.',
  boundaryReminder:
    'Private Preview, blocked, and excluded features must not be disclosed as active production data practices.',
  legalDisclaimer:
    'This checklist verifies observable application data flows and technical boundaries against privacy disclosure expectations. It does not constitute legal counsel, statutory certification, or regulatory compliance sign-off.',
  approvalBoundary:
    'Completed privacy disclosure verification does not grant release, submission, provider selection, or Production launch approval.',
  orderedAreas: RELEASE_PRIVACY_DISCLOSURE_AREA_ORDER,
  entries: RELEASE_PRIVACY_DISCLOSURE_ENTRIES,
  reviewChecklist: [
    'Confirm local-only storage for journals, history, and patterns without background telemetry.',
    'Confirm external analysis transmits only bounded dream text through the proxy and that provider retention claims match verified provider evidence.',
    'Verify native voice dictation creates no application audio file or backend upload and accurately discloses possible Apple speech processing.',
    'Verify StoreKit subscription SDK uses anonymous user identifiers without personal account linking.',
    'Confirm Astrology remains private Preview only and is disabled for production builds.',
    'Confirm Dream Image live generation remains blocked and unconfigured.',
    'Verify local data deletion permanently clears target records on-device without residual cloud copies.',
    'Confirm complete exclusion of user accounts, cloud sync, and health/medical integrations.',
    'Route reviewed disclosures through the separate owner approval and App Store submission process.',
  ],
  prohibitedEvidenceContent: [
    'Real user dream narratives, reflections, personal thoughts, or private journals',
    'Real birth dates, birth times, birth locations, coordinates, or profile names',
    'Audio recordings, voice dictation audio files, transcripts, or media links',
    'Private Preview, staging, issue, or internal repository links',
    'Live API credentials, tokens, bearer headers, cookies, or secret keys',
    'StoreKit transaction receipts, billing tokens, account credentials, or credit card details',
    'Internal server logs, crash reports, diagnostic dumps, or raw HTTP payloads',
    'Screenshots, video recordings, or binary diagnostic attachments',
    'Legal compliance assertions or release/launch approval claims',
  ],
};

export function getReleasePrivacyDisclosureChecklist(): ReleasePrivacyDisclosureChecklist {
  return releasePrivacyDisclosureChecklist;
}

export function getReleasePrivacyDisclosureEntry(
  area: ReleasePrivacyDisclosureArea,
): ReleasePrivacyDisclosureEntry {
  return releasePrivacyDisclosureChecklist.entries[area];
}

export function isReleasePrivacyDisclosureReviewed(
  review: ReleasePrivacyDisclosureReview,
): boolean {
  const entry = releasePrivacyDisclosureChecklist.entries[review.area];

  if (entry.eligibility !== 'evidence-required') {
    return false;
  }

  return entry.requiredEvidence.every((evidenceKind) =>
    review.confirmedEvidence.includes(evidenceKind),
  );
}

export function getReleasePrivacyAreasByState(
  state: ReleasePrivacyDisclosureState,
): readonly ReleasePrivacyDisclosureArea[] {
  return releasePrivacyDisclosureChecklist.orderedAreas.filter(
    (area) => releasePrivacyDisclosureChecklist.entries[area].state === state,
  );
}

export function getIneligibleReleasePrivacyAreas(): readonly ReleasePrivacyDisclosureArea[] {
  return releasePrivacyDisclosureChecklist.orderedAreas.filter(
    (area) =>
      releasePrivacyDisclosureChecklist.entries[area].eligibility ===
      'not-eligible',
  );
}
