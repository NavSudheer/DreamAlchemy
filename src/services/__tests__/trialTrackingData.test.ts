import { getElapsedTrialDays, normalizeTrialData } from '../trialTracking';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('../subscriptions', () => ({
  subscriptionService: { getSubscriptionStatus: jest.fn() },
}));

describe('trial persistence normalization', () => {
  const now = new Date('2026-10-11T12:00:00.000Z');

  it('normalizes malformed and partial stored values to a safe fresh state', () => {
    expect(normalizeTrialData(null, now)).toEqual({
      installDate: now.toISOString(),
      analysisCount: 0,
    });
    expect(normalizeTrialData({ installDate: 'invalid', analysisCount: -4 }, now)).toEqual({
      installDate: now.toISOString(),
      analysisCount: 0,
    });
  });

  it('preserves valid consumed analyses without allowing fractional counts', () => {
    expect(normalizeTrialData({
      installDate: '2026-10-09T12:00:00.000Z',
      analysisCount: 2,
      lastAnalysisDate: '2026-10-10T12:00:00.000Z',
    }, now)).toEqual({
      installDate: '2026-10-09T12:00:00.000Z',
      analysisCount: 2,
      lastAnalysisDate: '2026-10-10T12:00:00.000Z',
    });
    expect(normalizeTrialData({
      installDate: '2026-10-09T12:00:00.000Z',
      analysisCount: 1.5,
    }, now).analysisCount).toBe(0);
  });

  it('prevents future timestamps from producing negative elapsed days', () => {
    expect(normalizeTrialData({
      installDate: '2027-01-01T00:00:00.000Z',
      analysisCount: 1,
    }, now).installDate).toBe(now.toISOString());
    expect(getElapsedTrialDays('2027-01-01T00:00:00.000Z', now)).toBe(0);
    expect(getElapsedTrialDays('2026-10-01T12:00:00.000Z', now)).toBe(10);
  });
});
