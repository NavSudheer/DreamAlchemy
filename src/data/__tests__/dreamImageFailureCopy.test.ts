import {
  getDreamImageFailureCopy,
  isRetryableFailure,
  resolveDreamImageFailure,
} from '../dreamImageFailureCopy';
import { DreamImageError } from '../../services/dreamImage';

describe('dream image failure recovery copy', () => {
  it('provides privacy-specific unavailable guidance for preview builds', () => {
    const copy = getDreamImageFailureCopy('provider-unavailable');

    expect(copy.retryable).toBe(false);
    expect(copy.recoveryAction).toContain('curated scene templates');
    expect(copy.privacyReassurance).toContain('No personal dream data');
  });

  it('classifies known provider and moderation failures', () => {
    expect(resolveDreamImageFailure('503 service unavailable').state).toBe('provider-unavailable');
    expect(resolveDreamImageFailure('prompt rejected by moderation').state).toBe('moderation-rejected');
  });

  it('marks only immediately recoverable states as retryable', () => {
    expect(isRetryableFailure('offline')).toBe(true);
    expect(isRetryableFailure('retryable-failure')).toBe(true);
    expect(isRetryableFailure('rate-limited')).toBe(false);
  });

  it('prefers stable typed client codes over message wording', () => {
    expect(resolveDreamImageFailure(new DreamImageError('Opaque.', 'offline', true)).state).toBe('offline');
    expect(resolveDreamImageFailure(new DreamImageError('Opaque.', 'not_available', false)).state).toBe('provider-unavailable');
    expect(resolveDreamImageFailure(new DreamImageError('Opaque.', 'invalid_request', false)).state).toBe('request-invalid');
    expect(resolveDreamImageFailure(new DreamImageError('Opaque.', 'moderation_rejected', false)).state).toBe('moderation-rejected');
    expect(resolveDreamImageFailure(new DreamImageError('Opaque.', 'rate_limited', false)).state).toBe('rate-limited');
  });
});
