import { AstrologyRemoteError } from '../astrologyRemote';
import { formatAstrologyRequestError, getAstrologyRequestError } from '../astrologyErrorPresentation';

describe('astrology request error presentation', () => {
  it('maps a disabled chart route to the disabled recovery state', () => {
    const error = new AstrologyRemoteError('Optional Astrology is not available on this build yet.', 'not_available', false);
    expect(getAstrologyRequestError(error, 'chart').state).toBe('disabled');
  });

  it('keeps network failures retryable and local-data specific', () => {
    const error = new AstrologyRemoteError('Could not reach the astrology service.', 'network', true);
    const copy = getAstrologyRequestError(error, 'chart');
    expect(copy.state).toBe('offline');
    expect(copy.retryable).toBe(true);
    expect(formatAstrologyRequestError(error, 'chart')).toContain('Previously saved astrology data remains unchanged');
  });

  it('distinguishes reflection service failures from chart response errors', () => {
    const error = new AstrologyRemoteError('The reflection service returned an invalid response.', 'request_failed', true);
    expect(getAstrologyRequestError(error, 'reflection').state).toBe('reflection-unavailable');
    expect(getAstrologyRequestError(error, 'chart').state).toBe('reflection-unavailable');
  });

  it('preserves rate-limit recovery when the response identifies it', () => {
    const error = new AstrologyRemoteError('Too many requests; rate limit reached.', 'request_failed', false);
    expect(getAstrologyRequestError(error, 'reflection').state).toBe('rate-limited');
  });
});
