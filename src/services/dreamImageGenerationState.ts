import { DreamImageProgressState } from '../data/dreamImageProgressCopy';
import { DreamImageRequest, GeneratedDreamImage } from '../types/dreamImage';
import { createDreamImageProviderPayload, DreamImageErrorCode } from './dreamImage';

export type DreamImageGenerationPhase =
  | 'idle'
  | DreamImageProgressState
  | 'succeeded'
  | 'failed';

export interface DreamImageGenerationState {
  phase: DreamImageGenerationPhase;
  /** Local association only. This object must never be serialized as a provider payload. */
  request?: DreamImageRequest;
  consented: boolean;
  result?: GeneratedDreamImage;
  errorMessage?: string;
  errorCode?: DreamImageErrorCode;
}

export type DreamImageGenerationEvent =
  | { type: 'prepare'; request: DreamImageRequest }
  | { type: 'set-consent'; consented: boolean }
  | { type: 'start' }
  | { type: 'progress'; phase: DreamImageProgressState }
  | { type: 'succeed'; result: GeneratedDreamImage }
  | { type: 'fail'; message: string; code?: DreamImageErrorCode }
  | { type: 'clear-result' }
  | { type: 'reset' };

const ACTIVE_PHASES: readonly DreamImageProgressState[] = [
  'queued',
  'moderating',
  'rendering',
  'finalizing',
];

export const INITIAL_DREAM_IMAGE_GENERATION_STATE: DreamImageGenerationState = {
  phase: 'idle',
  consented: false,
};

const normalizeRequest = (request: DreamImageRequest): DreamImageRequest => ({
  dreamId: request.dreamId.trim(),
  visualReflectionPrompt: request.visualReflectionPrompt.trim(),
  style: request.style,
});

export const canStartDreamImageGeneration = (state: DreamImageGenerationState): boolean =>
  state.consented
  && !!state.request?.dreamId
  && !!state.request.visualReflectionPrompt
  && !ACTIVE_PHASES.includes(state.phase as DreamImageProgressState);

export const getPreparedDreamImageProviderPayload = (state: DreamImageGenerationState) =>
  canStartDreamImageGeneration(state) && state.request
    ? createDreamImageProviderPayload(state.request)
    : undefined;

export function reduceDreamImageGeneration(
  state: DreamImageGenerationState,
  event: DreamImageGenerationEvent,
): DreamImageGenerationState {
  switch (event.type) {
    case 'prepare':
      return {
        phase: 'idle',
        request: normalizeRequest(event.request),
        consented: state.consented,
      };
    case 'set-consent':
      return {
        ...state,
        consented: event.consented,
        ...(event.consented ? {} : { phase: 'idle' as const, result: undefined, errorMessage: undefined, errorCode: undefined }),
      };
    case 'start':
      return canStartDreamImageGeneration(state)
        ? { ...state, phase: 'queued', result: undefined, errorMessage: undefined, errorCode: undefined }
        : state;
    case 'progress': {
      const currentIndex = ACTIVE_PHASES.indexOf(state.phase as DreamImageProgressState);
      const nextIndex = ACTIVE_PHASES.indexOf(event.phase);
      return currentIndex >= 0 && nextIndex >= currentIndex
        ? { ...state, phase: event.phase }
        : state;
    }
    case 'succeed':
      return ACTIVE_PHASES.includes(state.phase as DreamImageProgressState)
        ? { ...state, phase: 'succeeded', result: event.result, errorMessage: undefined, errorCode: undefined }
        : state;
    case 'fail':
      return ACTIVE_PHASES.includes(state.phase as DreamImageProgressState)
        ? { ...state, phase: 'failed', result: undefined, errorMessage: event.message.trim(), errorCode: event.code }
        : state;
    case 'clear-result':
      return {
        ...state,
        phase: 'idle',
        result: undefined,
        errorMessage: undefined,
        errorCode: undefined,
      };
    case 'reset':
      return INITIAL_DREAM_IMAGE_GENERATION_STATE;
    default:
      return state;
  }
}
