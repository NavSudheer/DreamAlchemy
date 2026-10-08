import { createLocalBirthProfile } from '../astrology';
import { AstrologyChart, ChartCalculationResult } from '../../types/astrology';

describe('astrology provider-neutral contract', () => {
  it('creates a local profile without attaching it to dream analysis data', () => {
    const profile = createLocalBirthProfile({
      birthDate: { year: 1990, month: 1, day: 1 },
      locationLabel: 'Toronto',
    }, 123);

    expect(profile).toEqual(expect.objectContaining({ version: 1, createdAt: 123, updatedAt: 123 }));
    expect(profile).not.toHaveProperty('dreamId');
    expect(profile).not.toHaveProperty('analysis');
  });

  it('represents chart results as reflective, provider-neutral data', () => {
    const chart: AstrologyChart = {
      providerId: 'future-provider',
      calculatedAt: 123,
      precision: 'date-only',
      placements: [],
      aspects: [],
      uncertaintyNotes: ['Birth time was not provided.'],
      reflectiveDisclosure: 'For reflection only; not factual or predictive.',
    };
    const result: ChartCalculationResult = { ok: true, chart };

    expect(result.ok).toBe(true);
    expect(chart.reflectiveDisclosure).toMatch(/not factual or predictive/i);
  });
});
