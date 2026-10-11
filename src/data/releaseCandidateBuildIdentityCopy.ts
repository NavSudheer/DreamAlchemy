export type ReleaseCandidateBuildIdentityComparison =
  | 'not-compared'
  | 'matches-configured-values'
  | 'differs-from-configured-values';

export interface ReleaseCandidateConfiguredBuildIdentity {
  publicVersion: string;
  iosBuildNumber: string;
  shortGitCommit: string;
  branchName: string;
}

export interface ReleaseCandidateInstalledBuildObservation {
  publicVersion: string;
  iosBuildNumber: string;
  observedTimestamp: string;
}

export interface ReleaseCandidateBuildIdentityRecord {
  configured: ReleaseCandidateConfiguredBuildIdentity;
  installed: ReleaseCandidateInstalledBuildObservation;
  comparison: ReleaseCandidateBuildIdentityComparison;
  approvalState: 'not-inferred';
}

export interface ReleaseCandidateBuildIdentityFieldCopy {
  label: string;
  guidance: string;
  maximumCharacters: number;
}

export interface ReleaseCandidateBuildIdentityCopy {
  title: string;
  subtitle: string;
  configuredBoundary: string;
  installedBoundary: string;
  comparisonBoundary: string;
  timestampReminder: string;
  fields: {
    publicVersion: ReleaseCandidateBuildIdentityFieldCopy;
    iosBuildNumber: ReleaseCandidateBuildIdentityFieldCopy;
    shortGitCommit: ReleaseCandidateBuildIdentityFieldCopy;
    branchName: ReleaseCandidateBuildIdentityFieldCopy;
    observedTimestamp: ReleaseCandidateBuildIdentityFieldCopy;
  };
  checklist: readonly string[];
  prohibitedRecordContent: readonly string[];
}

const MAX_PUBLIC_VERSION_CHARACTERS = 32;
const MAX_IOS_BUILD_NUMBER_CHARACTERS = 24;
const MAX_SHORT_GIT_COMMIT_CHARACTERS = 12;
const MIN_SHORT_GIT_COMMIT_CHARACTERS = 7;
const MAX_BRANCH_NAME_CHARACTERS = 120;
const MAX_OBSERVED_TIMESTAMP_CHARACTERS = 40;

export const releaseCandidateBuildIdentityCopy: ReleaseCandidateBuildIdentityCopy = {
  title: 'Candidate build identity',
  subtitle:
    'Record configured source values and the actually observed installed version before owner Mac or iOS testing.',
  configuredBoundary:
    'Configured public version, iOS build number, short Git commit, and branch name identify the intended source candidate only. They do not prove that a build was uploaded or installed.',
  installedBoundary:
    'Installed public version and iOS build number must be read from the assigned installed app or approved device-test surface at the recorded time.',
  comparisonBoundary:
    'A match confirms only that the two visible version fields agree with the configured candidate. It does not establish signing, upload, processing, App Store selection, release, or approval state.',
  timestampReminder:
    'Use an ISO 8601 timestamp for when the installed values were actually observed. Do not backfill an unobserved time.',
  fields: {
    publicVersion: {
      label: 'Public version',
      guidance:
        'Record the non-secret user-facing version exactly as configured or observed, without adding store status.',
      maximumCharacters: MAX_PUBLIC_VERSION_CHARACTERS,
    },
    iosBuildNumber: {
      label: 'iOS build number',
      guidance:
        'Record the non-secret numeric build value exactly as configured or observed on the installed app.',
      maximumCharacters: MAX_IOS_BUILD_NUMBER_CHARACTERS,
    },
    shortGitCommit: {
      label: 'Short Git commit',
      guidance:
        'Record the abbreviated hexadecimal commit for the configured source candidate only.',
      maximumCharacters: MAX_SHORT_GIT_COMMIT_CHARACTERS,
    },
    branchName: {
      label: 'Branch name',
      guidance:
        'Record the configured source branch name without repository, remote, or private-link details.',
      maximumCharacters: MAX_BRANCH_NAME_CHARACTERS,
    },
    observedTimestamp: {
      label: 'Observed timestamp',
      guidance:
        'Record the ISO 8601 time when the installed public version and build number were directly observed.',
      maximumCharacters: MAX_OBSERVED_TIMESTAMP_CHARACTERS,
    },
  },
  checklist: [
    'Read the configured public version, iOS build number, short commit, and branch from the approved local candidate context.',
    'Open the assigned installed app or approved test surface and read its displayed public version and iOS build number.',
    'Record the actual observation time in ISO 8601 format.',
    'Derive the comparison state from the two version fields; do not infer upload, App Store, signing, or approval state.',
    'Stop owner testing when installed values differ from the configured candidate until the intended build is confirmed through the approved process.',
  ],
  prohibitedRecordContent: [
    'Credentials, passwords, tokens, headers, cookies, secret keys, or private configuration',
    'Signing certificates, provisioning profiles, entitlements, signing identities, or signing keys',
    'Apple account, team, membership, App Store Connect, or developer portal details',
    'Device names, serial numbers, UDIDs, advertising identifiers, or other device identifiers',
    'Private repository, commit, build, install, invitation, or access links',
    'Console output, build logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Upload, processing, App Store selection, release, launch, submission, signing, or Production approval claims',
  ],
};

function isNonEmptyBoundedValue(value: string, maximumCharacters: number): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maximumCharacters;
}

export function isReleaseCandidatePublicVersionValid(value: string): boolean {
  return (
    isNonEmptyBoundedValue(value, MAX_PUBLIC_VERSION_CHARACTERS) &&
    /^[0-9A-Za-z]+(?:[._+-][0-9A-Za-z]+)*$/.test(value)
  );
}

export function isReleaseCandidateIosBuildNumberValid(value: string): boolean {
  return (
    isNonEmptyBoundedValue(value, MAX_IOS_BUILD_NUMBER_CHARACTERS) &&
    /^\d+(?:\.\d+){0,2}$/.test(value)
  );
}

export function isReleaseCandidateShortGitCommitValid(value: string): boolean {
  return (
    value.length >= MIN_SHORT_GIT_COMMIT_CHARACTERS &&
    value.length <= MAX_SHORT_GIT_COMMIT_CHARACTERS &&
    /^[0-9a-f]+$/i.test(value)
  );
}

export function isReleaseCandidateBranchNameValid(value: string): boolean {
  if (!isNonEmptyBoundedValue(value, MAX_BRANCH_NAME_CHARACTERS)) {
    return false;
  }

  return (
    value === value.trim() &&
    !/[\u0000-\u001F\u007F ~^:?*\[\\]/.test(value) &&
    !value.startsWith('-') &&
    !value.startsWith('.') &&
    !value.startsWith('/') &&
    !value.endsWith('.') &&
    !value.endsWith('/') &&
    !value.endsWith('.lock') &&
    !value.includes('..') &&
    !value.includes('//') &&
    !value.includes('@{')
  );
}

export function isReleaseCandidateObservedTimestampValid(value: string): boolean {
  if (!isNonEmptyBoundedValue(value, MAX_OBSERVED_TIMESTAMP_CHARACTERS)) {
    return false;
  }

  const isoTimestampPattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

  return isoTimestampPattern.test(value) && !Number.isNaN(Date.parse(value));
}

export function isReleaseCandidateConfiguredBuildIdentityValid(
  identity: ReleaseCandidateConfiguredBuildIdentity,
): boolean {
  return (
    isReleaseCandidatePublicVersionValid(identity.publicVersion) &&
    isReleaseCandidateIosBuildNumberValid(identity.iosBuildNumber) &&
    isReleaseCandidateShortGitCommitValid(identity.shortGitCommit) &&
    isReleaseCandidateBranchNameValid(identity.branchName)
  );
}

export function isReleaseCandidateInstalledBuildObservationValid(
  observation: ReleaseCandidateInstalledBuildObservation,
): boolean {
  return (
    isReleaseCandidatePublicVersionValid(observation.publicVersion) &&
    isReleaseCandidateIosBuildNumberValid(observation.iosBuildNumber) &&
    isReleaseCandidateObservedTimestampValid(observation.observedTimestamp)
  );
}

export function compareReleaseCandidateBuildIdentity(
  configured: ReleaseCandidateConfiguredBuildIdentity,
  installed: ReleaseCandidateInstalledBuildObservation,
): ReleaseCandidateBuildIdentityComparison {
  if (
    !isReleaseCandidateConfiguredBuildIdentityValid(configured) ||
    !isReleaseCandidateInstalledBuildObservationValid(installed)
  ) {
    return 'not-compared';
  }

  return configured.publicVersion === installed.publicVersion &&
    configured.iosBuildNumber === installed.iosBuildNumber
    ? 'matches-configured-values'
    : 'differs-from-configured-values';
}

export function isReleaseCandidateBuildIdentityRecordValid(
  record: ReleaseCandidateBuildIdentityRecord,
): boolean {
  const derivedComparison = compareReleaseCandidateBuildIdentity(
    record.configured,
    record.installed,
  );

  return (
    record.approvalState === 'not-inferred' &&
    derivedComparison !== 'not-compared' &&
    record.comparison === derivedComparison
  );
}

export function getReleaseCandidateBuildIdentityCopy(): ReleaseCandidateBuildIdentityCopy {
  return releaseCandidateBuildIdentityCopy;
}
