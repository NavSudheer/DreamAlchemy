import { OPTIONAL_FEATURE_RELEASE_COPY } from '@/data/optionalFeatureReleaseCopy';

describe('Explore optional feature release boundaries', () => {
  it('labels Astrology as private Preview and Production-disabled', () => {
    expect(OPTIONAL_FEATURE_RELEASE_COPY.astrology).toContain('Private Preview only');
    expect(OPTIONAL_FEATURE_RELEASE_COPY.astrology).toContain('Production access remains disabled');
    expect(OPTIONAL_FEATURE_RELEASE_COPY.astrology).toContain('non-predictive');
  });

  it('labels Dream Images as preparation-only with generation unavailable', () => {
    expect(OPTIONAL_FEATURE_RELEASE_COPY.dreamImages).toContain('Preparation only');
    expect(OPTIONAL_FEATURE_RELEASE_COPY.dreamImages).toContain('Live image generation is unavailable');
    expect(OPTIONAL_FEATURE_RELEASE_COPY.dreamImages).toContain('without sharing your journal text');
  });
});
