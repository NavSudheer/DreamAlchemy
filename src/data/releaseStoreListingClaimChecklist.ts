export type ReleaseStoreClaimState =
  | 'implemented'
  | 'private-preview'
  | 'blocked'
  | 'excluded';

export type ReleaseStoreClaimEligibility =
  | 'evidence-required'
  | 'not-eligible';

export type ReleaseStoreClaimArea =
  | 'core-journal-analysis-history'
  | 'patterns'
  | 'techniques-and-timer'
  | 'saved-search-and-links'
  | 'psychology'
  | 'dictionary'
  | 'astrology'
  | 'dream-images'
  | 'community'
  | 'accounts'
  | 'sync'
  | 'health'
  | 'android';

export type ReleaseStoreClaimEvidenceKind =
  | 'candidate-implementation'
  | 'automated-regression'
  | 'owner-device-observation'
  | 'content-accuracy-review'
  | 'policy-and-privacy-review';

export interface ReleaseStoreListingClaimEntry {
  area: ReleaseStoreClaimArea;
  title: string;
  state: ReleaseStoreClaimState;
  eligibility: ReleaseStoreClaimEligibility;
  deliveredBoundary: string;
  publicClaimRule: string;
  requiredEvidence: readonly ReleaseStoreClaimEvidenceKind[];
  checklist: readonly string[];
  prohibitedClaimExamples: readonly string[];
  grantsLaunchApproval: false;
  accessibilityLabel: string;
}

export interface ReleaseStoreClaimReview {
  area: ReleaseStoreClaimArea;
  confirmedEvidence: readonly ReleaseStoreClaimEvidenceKind[];
}

export interface ReleaseStoreListingClaimChecklist {
  title: string;
  subtitle: string;
  evidenceReminder: string;
  scopeReminder: string;
  commercialClaimBoundary: string;
  safetyClaimBoundary: string;
  approvalBoundary: string;
  orderedAreas: readonly ReleaseStoreClaimArea[];
  entries: Readonly<
    Record<ReleaseStoreClaimArea, ReleaseStoreListingClaimEntry>
  >;
  finalReviewChecklist: readonly string[];
  prohibitedEvidence: readonly string[];
}

const IMPLEMENTED_REQUIRED_EVIDENCE = [
  'candidate-implementation',
  'automated-regression',
  'owner-device-observation',
  'content-accuracy-review',
  'policy-and-privacy-review',
] as const satisfies readonly ReleaseStoreClaimEvidenceKind[];

export const RELEASE_STORE_CLAIM_AREA_ORDER = [
  'core-journal-analysis-history',
  'patterns',
  'techniques-and-timer',
  'saved-search-and-links',
  'psychology',
  'dictionary',
  'astrology',
  'dream-images',
  'community',
  'accounts',
  'sync',
  'health',
  'android',
] as const satisfies readonly ReleaseStoreClaimArea[];

export const RELEASE_STORE_LISTING_CLAIM_ENTRIES = {
  'core-journal-analysis-history': {
    area: 'core-journal-analysis-history',
    title: 'Core journal, analysis, and history',
    state: 'implemented',
    eligibility: 'evidence-required',
    deliveredBoundary:
      'The candidate includes the core journal entry, analysis, saved-history, detail, and return-navigation experience.',
    publicClaimRule:
      'A concise functional claim may be considered only after the complete core path is confirmed on the exact candidate and the wording matches observable behavior.',
    requiredEvidence: IMPLEMENTED_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm the journal-to-analysis-to-history path on the owner device.',
      'Confirm saved entries remain readable after relaunch.',
      'Confirm error copy does not promise a result or hide trial impact.',
      'Describe reflection and organization features without medical, diagnostic, predictive, or guaranteed-outcome language.',
    ],
    prohibitedClaimExamples: [
      'Guaranteed insight or interpretation',
      'Medical, diagnostic, treatment, or predictive benefit',
      'Unlimited, instantaneous, or failure-free analysis',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Core journal, analysis, and history are implemented, but any store claim still requires candidate evidence and separate approval.',
  },
  patterns: {
    area: 'patterns',
    title: 'Dream Patterns',
    state: 'implemented',
    eligibility: 'evidence-required',
    deliveredBoundary:
      'The candidate includes local pattern summaries, selectable time ranges, activity views, and drilldowns based on available saved records.',
    publicClaimRule:
      'Claims must describe organization and reflection support only, and must remain conditional on the user’s locally available records.',
    requiredEvidence: IMPLEMENTED_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm day, week, and month views and their empty states on the candidate.',
      'Confirm drilldowns and malformed-data recovery remain usable.',
      'Avoid certainty, prediction, diagnosis, or claims that patterns reveal objective meaning.',
    ],
    prohibitedClaimExamples: [
      'Automatic discovery of hidden truths',
      'Clinical pattern detection',
      'Predictive conclusions about future behavior or events',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Dream Patterns is implemented as local reflective organization; evidence is required before any public claim.',
  },
  'techniques-and-timer': {
    area: 'techniques-and-timer',
    title: 'Techniques and timer',
    state: 'implemented',
    eligibility: 'evidence-required',
    deliveredBoundary:
      'The candidate includes written dream-practice techniques, optional cues, presets, and an offline timer experience.',
    publicClaimRule:
      'Claims may describe optional educational or practice tools after candidate verification, without promising sleep, health, recall, or therapeutic outcomes.',
    requiredEvidence: IMPLEMENTED_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm technique navigation, preset selection, timer controls, completion, and relaunch behavior.',
      'Confirm cues remain optional, gentle, and non-guaranteeing.',
      'Avoid health, sleep-treatment, performance, or guaranteed recall claims.',
    ],
    prohibitedClaimExamples: [
      'Guaranteed lucid dreaming or dream recall',
      'Treatment for sleep or mental-health conditions',
      'Clinically proven outcomes without reviewed evidence',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Techniques and the offline timer are implemented, with evidence required and no health or guaranteed-outcome claims.',
  },
  'saved-search-and-links': {
    area: 'saved-search-and-links',
    title: 'Saved items, search, and related links',
    state: 'implemented',
    eligibility: 'evidence-required',
    deliveredBoundary:
      'The candidate includes saved-content access, Explore search, and related navigation among available learning and symbol content.',
    publicClaimRule:
      'Claims must match the searchable and linkable content visible on the candidate and must not imply cloud sync, accounts, or universal search.',
    requiredEvidence: IMPLEMENTED_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm search handles whitespace, duplicates, empty results, and unavailable destinations.',
      'Confirm saved and related-link navigation reaches only delivered local destinations.',
      'Remove language that implies account-based saving or cross-device sync.',
    ],
    prohibitedClaimExamples: [
      'Cloud-backed saved items',
      'Cross-device or account sync',
      'Search across private external services',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Saved items, local search, and related links are implemented; claims must not imply accounts or sync.',
  },
  psychology: {
    area: 'psychology',
    title: 'Psychology learning content',
    state: 'implemented',
    eligibility: 'evidence-required',
    deliveredBoundary:
      'The candidate includes educational psychology checkpoints, reflections, glossary material, study notes, and related learning links.',
    publicClaimRule:
      'Claims may describe educational and reflective content after accuracy and policy review, never diagnosis, treatment, professional advice, or clinical efficacy.',
    requiredEvidence: IMPLEMENTED_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm each listed learning surface is present and navigable on the candidate.',
      'Review final wording for educational framing and source accuracy.',
      'Remove medical, diagnostic, therapeutic, or professional-advice implications.',
    ],
    prohibitedClaimExamples: [
      'Mental-health diagnosis or screening',
      'Therapy, treatment, or professional psychological advice',
      'Clinical improvement claims',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Psychology learning content is implemented for education and reflection, not diagnosis or treatment.',
  },
  dictionary: {
    area: 'dictionary',
    title: 'Dream dictionary',
    state: 'implemented',
    eligibility: 'evidence-required',
    deliveredBoundary:
      'The candidate includes symbol descriptions, cultural context, reflection prompts, keyword search, and related-symbol navigation.',
    publicClaimRule:
      'Claims must frame dictionary content as optional cultural and reflective material, not authoritative interpretation or prediction.',
    requiredEvidence: IMPLEMENTED_REQUIRED_EVIDENCE,
    checklist: [
      'Confirm symbol content, keyword search, and related-symbol links on the candidate.',
      'Confirm cultural context and reflection wording remain qualified and non-prescriptive.',
      'Avoid universal meanings, factual interpretation, prediction, or guaranteed insight.',
    ],
    prohibitedClaimExamples: [
      'Definitive or universal dream meanings',
      'Prediction of future events',
      'Medical or psychological conclusions from symbols',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'The dream dictionary is implemented as optional cultural and reflective content, not authoritative interpretation.',
  },
  astrology: {
    area: 'astrology',
    title: 'Astrology',
    state: 'private-preview',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'Astrology remains isolated to assigned private Preview testing with approved synthetic profiles and is disabled for Production.',
    publicClaimRule:
      'Do not advertise Astrology as a released App Store feature for this candidate.',
    requiredEvidence: [],
    checklist: [
      'Remove Astrology from public feature lists, screenshots, captions, and promotional comparisons.',
      'Keep private Preview evidence and access information out of listing materials.',
      'Do not make predictive, factual, medical, compatibility, or provider claims.',
    ],
    prohibitedClaimExamples: [
      'Available Production Astrology charts or reflections',
      'Predictive or factual astrological guidance',
      'Provider accuracy, availability, or launch promises',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Astrology is private Preview only and is not eligible for a released App Store feature claim.',
  },
  'dream-images': {
    area: 'dream-images',
    title: 'Dream Images',
    state: 'blocked',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'Provider-neutral preparation and an expected disabled state exist, while live generation, delivery, persistence, sharing, and provider-side flows remain blocked.',
    publicClaimRule:
      'Do not advertise Dream Image generation or generated-media capabilities for this candidate.',
    requiredEvidence: [],
    checklist: [
      'Remove image-generation, image-quality, provider, delivery, saving, sharing, and availability claims.',
      'Do not turn preparation-only interface work into a customer-facing feature promise.',
      'Keep generated media and provider evaluation material out of listing evidence.',
    ],
    prohibitedClaimExamples: [
      'Generate artwork from dreams',
      'Provider-backed image quality or availability',
      'Saving, sharing, delivery, persistence, or deletion of generated media',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Dream Image live generation is blocked and is not eligible for an App Store capability claim.',
  },
  community: {
    area: 'community',
    title: 'Community features',
    state: 'excluded',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'Community posting, feeds, messaging, groups, sharing, moderation, and social discovery are not part of the delivered candidate.',
    publicClaimRule:
      'Do not make community, social-network, public-sharing, or user-generated-content claims.',
    requiredEvidence: [],
    checklist: [
      'Remove community and social language from listing copy and comparisons.',
      'Do not imply public profiles, messaging, feeds, groups, or moderation.',
    ],
    prohibitedClaimExamples: [
      'Share dreams with a community',
      'Public profiles, feeds, groups, or messaging',
      'Community moderation or discovery',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Community and social features are excluded and not eligible for store claims.',
  },
  accounts: {
    area: 'accounts',
    title: 'User accounts',
    state: 'excluded',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'Customer account creation, sign-in, identity profiles, and account recovery are not part of the delivered candidate.',
    publicClaimRule:
      'Do not claim account-based access, profiles, backup, recovery, or portability.',
    requiredEvidence: [],
    checklist: [
      'Remove sign-in, profile, account recovery, and account portability language.',
      'Do not confuse subscription sandbox testing with a delivered customer account system.',
    ],
    prohibitedClaimExamples: [
      'Create an account or profile',
      'Account-based backup or recovery',
      'Portable data tied to a user identity',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'User accounts are excluded and not eligible for store claims.',
  },
  sync: {
    area: 'sync',
    title: 'Cloud or cross-device sync',
    state: 'excluded',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'Cloud backup, cross-device synchronization, and account-based data transfer are not part of the delivered candidate.',
    publicClaimRule:
      'Do not claim that journals, analyses, settings, or saved content sync across devices or to a cloud account.',
    requiredEvidence: [],
    checklist: [
      'Remove cloud, backup, sync, and cross-device continuity language.',
      'Keep local persistence claims distinct from cloud or account-backed storage.',
    ],
    prohibitedClaimExamples: [
      'Sync across devices',
      'Cloud backup or restore',
      'Access the same journal from any device',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Cloud and cross-device sync are excluded and not eligible for store claims.',
  },
  health: {
    area: 'health',
    title: 'Health and medical features',
    state: 'excluded',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'The candidate is not a medical device, diagnostic tool, treatment, clinical service, or health-monitoring product.',
    publicClaimRule:
      'Do not make medical, mental-health, diagnosis, treatment, prevention, monitoring, efficacy, or clinical claims.',
    requiredEvidence: [],
    checklist: [
      'Remove clinical, diagnostic, treatment, prevention, and health-outcome language.',
      'Frame reflection and educational content without professional-advice implications.',
    ],
    prohibitedClaimExamples: [
      'Diagnose or treat a condition',
      'Improve mental health, sleep health, or clinical outcomes',
      'Replace professional medical or psychological care',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Health and medical functions are excluded and no medical or clinical claims are allowed.',
  },
  android: {
    area: 'android',
    title: 'Android availability',
    state: 'excluded',
    eligibility: 'not-eligible',
    deliveredBoundary:
      'This pre-submission checklist covers the owner Mac and iOS candidate and does not establish an Android release.',
    publicClaimRule:
      'Do not claim Android availability, compatibility, parity, timing, or support from this candidate evidence.',
    requiredEvidence: [],
    checklist: [
      'Remove Android availability and compatibility claims from this submission’s materials.',
      'Do not infer Android support from cross-platform code or browser checks.',
    ],
    prohibitedClaimExamples: [
      'Available on Android',
      'Feature parity across iOS and Android',
      'Android launch timing or compatibility promises',
    ],
    grantsLaunchApproval: false,
    accessibilityLabel:
      'Android availability is outside this candidate and is not eligible for store claims.',
  },
} as const satisfies Readonly<
  Record<ReleaseStoreClaimArea, ReleaseStoreListingClaimEntry>
>;

export const releaseStoreListingClaimChecklist: ReleaseStoreListingClaimChecklist = {
  title: 'Store listing claim checklist',
  subtitle:
    'Validate every public App Store or marketing claim against the exact delivered candidate and reviewed evidence.',
  evidenceReminder:
    'A claim is eligible only when every evidence kind required by its implemented entry is confirmed for the exact candidate. Implementation status alone is insufficient.',
  scopeReminder:
    'Private Preview, blocked, and excluded entries are not eligible for released-feature claims, even when supporting preparation or test work exists.',
  commercialClaimBoundary:
    'Do not invent or repeat unverified prices, subscription terms, trial terms, product identifiers, store availability, or provider commitments.',
  safetyClaimBoundary:
    'Do not make medical, diagnostic, therapeutic, clinical, predictive, factual-interpretation, or guaranteed-outcome claims.',
  approvalBoundary:
    'Claim eligibility and completed evidence do not approve launch, submission, provider selection, or Production activation.',
  orderedAreas: RELEASE_STORE_CLAIM_AREA_ORDER,
  entries: RELEASE_STORE_LISTING_CLAIM_ENTRIES,
  finalReviewChecklist: [
    'Map every headline, description sentence, feature bullet, caption, and comparison to one implemented eligible entry.',
    'Confirm every required evidence kind for each retained implemented claim.',
    'Remove all private Preview, blocked, and excluded feature claims.',
    'Remove unverified commercial, provider, medical, predictive, and guaranteed-outcome language.',
    'Confirm listing evidence contains no private content, access information, technical artifacts, or attachments.',
    'Route the reviewed listing through the separate owner approval and current App Store submission process.',
  ],
  prohibitedEvidence: [
    'Dream content, journal text, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Voice recordings, transcripts, generated media, media links, exports, or descriptions of media',
    'Private Preview, issue, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, store details, product details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Launch, release, submission, provider, or Production approval claims',
  ],
};

export function getReleaseStoreListingClaimChecklist(): ReleaseStoreListingClaimChecklist {
  return releaseStoreListingClaimChecklist;
}

export function getReleaseStoreListingClaimEntry(
  area: ReleaseStoreClaimArea,
): ReleaseStoreListingClaimEntry {
  return releaseStoreListingClaimChecklist.entries[area];
}

export function isReleaseStoreClaimAllowed(
  review: ReleaseStoreClaimReview,
): boolean {
  const entry = releaseStoreListingClaimChecklist.entries[review.area];

  if (
    entry.state !== 'implemented' ||
    entry.eligibility !== 'evidence-required'
  ) {
    return false;
  }

  return entry.requiredEvidence.every((evidenceKind) =>
    review.confirmedEvidence.includes(evidenceKind),
  );
}

export function getIneligibleReleaseStoreClaimAreas(): readonly ReleaseStoreClaimArea[] {
  return releaseStoreListingClaimChecklist.orderedAreas.filter(
    (area) =>
      releaseStoreListingClaimChecklist.entries[area].eligibility ===
      'not-eligible',
  );
}
