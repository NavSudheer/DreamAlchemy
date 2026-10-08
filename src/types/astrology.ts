/**
 * Contracts for the optional Astrology feature.
 *
 * Astrology data is intentionally separate from dream analysis. Consumers must
 * obtain a separate opt-in before passing a profile to a chart client, and must
 * not attach these values to a Dream or DreamAnalysis record.
 */

export const ASTROLOGY_PROFILE_VERSION = 1 as const;

export interface BirthDate {
  year: number;
  month: number;
  day: number;
}

/** Local clock time at the place of birth. Its absence is meaningful. */
export interface BirthTime {
  hour: number;
  minute: number;
}

/**
 * A deliberately minimal, local-only profile. Location is an optional display
 * label and timezone is an optional IANA identifier; neither is a coordinate
 * or address, so a UI can collect only the precision a person chooses.
 */
export interface LocalBirthProfile {
  version: typeof ASTROLOGY_PROFILE_VERSION;
  birthDate: BirthDate;
  birthTime?: BirthTime;
  timezone?: string;
  locationLabel?: string;
  createdAt: number;
  updatedAt: number;
}

/** Input used before it becomes a persisted local profile. */
export interface BirthProfileDraft {
  birthDate?: Partial<BirthDate>;
  birthTime?: Partial<BirthTime>;
  timezone?: string;
  locationLabel?: string;
}

export type BirthProfileField =
  | 'birthDate'
  | 'birthTime'
  | 'timezone'
  | 'locationLabel'
  | 'consent';

export interface BirthProfileValidationIssue {
  field: BirthProfileField;
  code:
    | 'required'
    | 'invalid_date'
    | 'future_date'
    | 'invalid_time'
    | 'incomplete_time'
    | 'timezone_requires_time'
    | 'invalid_timezone'
    | 'location_too_long'
    | 'consent_required';
  message: string;
}

export interface BirthProfileValidationResult {
  isValid: boolean;
  issues: BirthProfileValidationIssue[];
}

/** A UI-owned, explicit acknowledgement for any external chart lookup. */
export interface AstrologyConsent {
  acknowledgedAt: number;
  /** Confirms that chart output is reflective, not factual or predictive. */
  reflectiveUseAcknowledged: true;
  /** Required only when a future client sends data off-device. */
  externalProcessingAllowed?: boolean;
}

export type AstrologyPrecision = 'date-only' | 'date-and-time' | 'date-time-timezone';

export interface ChartCalculationRequest {
  profile: LocalBirthProfile;
  consent: AstrologyConsent;
}

/** Coordinates are supplied only for an explicitly requested calculation. */
export interface AstrologyCalculationLocation {
  latitude: number;
  longitude: number;
}

export interface AstrologyReflection {
  reflection: string;
  generatedAt: string;
  disclosure: string;
}

export interface LocalAstrologyBundle {
  profile: LocalBirthProfile;
  chart?: AstrologyChart;
  reflection?: AstrologyReflection;
}

export interface ChartBodyPlacement {
  body: string;
  sign: string;
  longitude?: number;
  house?: number;
  retrograde?: boolean;
}

export interface ChartAspect {
  type: string;
  fromBody: string;
  toBody: string;
  orbDegrees?: number;
}

/** Provider-neutral output; explanations stay reflective and non-predictive. */
export interface AstrologyChart {
  providerId: string;
  calculatedAt: number;
  precision: AstrologyPrecision;
  placements: ChartBodyPlacement[];
  aspects: ChartAspect[];
  uncertaintyNotes: string[];
  reflectiveDisclosure: string;
}

export type ChartCalculationResult =
  | { ok: true; chart: AstrologyChart }
  | {
      ok: false;
      error: {
        code: 'unavailable' | 'invalid_profile' | 'consent_required' | 'provider_error';
        message: string;
        retryable: boolean;
      };
    };

/** A future provider adapter; this package deliberately ships no implementation. */
export interface AstrologyChartClient {
  calculate(request: ChartCalculationRequest): Promise<ChartCalculationResult>;
}

/** Storage is local by default and operates on the profile only, never dreams. */
export interface LocalBirthProfileStore {
  read(): Promise<LocalBirthProfile | null>;
  write(profile: LocalBirthProfile): Promise<void>;
  /** Must remove every local copy managed by this store. */
  delete(): Promise<void>;
}

export type BirthProfileDeletionResult =
  | { ok: true; deleted: boolean }
  | { ok: false; error: 'storage_error' };
