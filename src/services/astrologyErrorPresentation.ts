import {
  AstrologyProviderErrorEntry,
  resolveAstrologyProviderError,
} from '../data/astrologyProviderErrorCopy';

export type AstrologyRequestKind = 'chart' | 'reflection';

type RemoteLikeError = Error & {
  code?: 'not_available' | 'request_failed' | 'timeout' | 'network';
};

export function getAstrologyRequestError(
  error: unknown,
  requestKind: AstrologyRequestKind,
): AstrologyProviderErrorEntry {
  const remoteError = error instanceof Error ? error as RemoteLikeError : undefined;
  if (remoteError?.code === 'network' || remoteError?.code === 'timeout') {
    return resolveAstrologyProviderError('offline');
  }
  if (remoteError?.code === 'not_available') {
    return resolveAstrologyProviderError(requestKind === 'reflection' ? 'reflection-unavailable' : 'disabled');
  }

  const resolved = resolveAstrologyProviderError(error);
  if (requestKind === 'reflection' && resolved.state === 'invalid-provider-response') {
    return resolveAstrologyProviderError('reflection-unavailable');
  }
  return resolved;
}

export function formatAstrologyRequestError(
  error: unknown,
  requestKind: AstrologyRequestKind,
): string {
  const copy = getAstrologyRequestError(error, requestKind);
  return `${copy.title}. ${copy.message} ${copy.recoveryAction} ${copy.localDataPreservation}`;
}
