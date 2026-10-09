import {
  AstrologyCalculationLocation,
  AstrologyChart,
  AstrologyConsent,
  AstrologyReflection,
  LocalBirthProfile,
} from '../types/astrology';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
  || 'https://nextjs-boilerplate-eight-topaz-22.vercel.app';
const REQUEST_TIMEOUT_MS = 30_000;

export type AstrologyRemoteErrorCode =
  | 'not_available'
  | 'request_failed'
  | 'invalid_response'
  | 'rate_limited'
  | 'timeout'
  | 'network';

export class AstrologyRemoteError extends Error {
  constructor(
    message: string,
    public readonly code: AstrologyRemoteErrorCode,
    public readonly retryable: boolean,
    public readonly serverCode?: string,
  ) {
    super(message);
    this.name = 'AstrologyRemoteError';
  }
}

const postJson = async <T>(path: string, body: unknown): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const serverCode = typeof result?.code === 'string' ? result.code : undefined;
      if (response.status === 503 || ['feature_disabled', 'provider_not_configured', 'reflection_not_configured'].includes(serverCode ?? '')) {
        throw new AstrologyRemoteError('Optional Astrology is not available on this build yet.', 'not_available', false, serverCode);
      }
      if (response.status === 429 || serverCode === 'provider_rate_limited') {
        throw new AstrologyRemoteError(
          result?.error || 'The astrology request limit has been reached.',
          'rate_limited',
          false,
          serverCode,
        );
      }
      if (serverCode === 'provider_timeout') {
        throw new AstrologyRemoteError(result?.error || 'The astrology request timed out.', 'timeout', true, serverCode);
      }
      if (['provider_invalid_response', 'reflection_empty'].includes(serverCode ?? '')) {
        throw new AstrologyRemoteError(
          result?.error || 'The astrology service returned an invalid response.',
          'invalid_response',
          true,
          serverCode,
        );
      }
      throw new AstrologyRemoteError(
        result?.error || 'The astrology service is temporarily unavailable.',
        'request_failed',
        response.status >= 500,
        serverCode,
      );
    }
    return result as T;
  } catch (error) {
    if (error instanceof AstrologyRemoteError) throw error;
    if ((error as Error)?.name === 'AbortError') {
      throw new AstrologyRemoteError('The astrology request timed out. Please try again.', 'timeout', true);
    }
    throw new AstrologyRemoteError('Could not reach the astrology service. Check your connection and try again.', 'network', true);
  } finally {
    clearTimeout(timeout);
  }
};

const formatDate = (profile: LocalBirthProfile) => {
  const { year, month, day } = profile.birthDate;
  return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const formatTime = (profile: LocalBirthProfile) => profile.birthTime
  ? `${profile.birthTime.hour.toString().padStart(2, '0')}:${profile.birthTime.minute.toString().padStart(2, '0')}`
  : undefined;

export const calculateAstrologyChart = (
  profile: LocalBirthProfile,
  location: AstrologyCalculationLocation,
  consent: AstrologyConsent,
): Promise<AstrologyChart> => postJson('/api/astrology-chart', {
  birth: {
    date: formatDate(profile),
    time: formatTime(profile),
    timezone: profile.timezone,
    latitude: location.latitude,
    longitude: location.longitude,
  },
  consent,
});

export const generateAstrologyReflection = (
  chart: AstrologyChart,
  consent: AstrologyConsent,
): Promise<AstrologyReflection> => postJson('/api/astrology-reflection', { chart, consent });
