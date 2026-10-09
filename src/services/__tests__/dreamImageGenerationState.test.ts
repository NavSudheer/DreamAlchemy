import {
  canStartDreamImageGeneration,
  getPreparedDreamImageProviderPayload,
  INITIAL_DREAM_IMAGE_GENERATION_STATE,
  reduceDreamImageGeneration,
} from '../dreamImageGenerationState';
import { DreamImageRequest, GeneratedDreamImage } from '../../types/dreamImage';

const request: DreamImageRequest = {
  dreamId: ' local-dream-1 ',
  visualReflectionPrompt: ' A quiet forest threshold. ',
  style: 'watercolor',
};

const result: GeneratedDreamImage = {
  id: 'image-1',
  imageUrl: 'https://images.example/image-1.png',
  altText: 'Watercolor scene of a quiet forest threshold in soft green light.',
  generatedAt: '2026-10-09T00:00:00.000Z',
  style: 'watercolor',
};

describe('Dream Image generation state boundary', () => {
  it('requires both a local dream association and explicit consent before starting', () => {
    const prepared = reduceDreamImageGeneration(INITIAL_DREAM_IMAGE_GENERATION_STATE, { type: 'prepare', request });
    expect(canStartDreamImageGeneration(prepared)).toBe(false);
    expect(reduceDreamImageGeneration(prepared, { type: 'start' })).toBe(prepared);

    const consented = reduceDreamImageGeneration(prepared, { type: 'set-consent', consented: true });
    expect(canStartDreamImageGeneration(consented)).toBe(true);
    expect(reduceDreamImageGeneration(consented, { type: 'start' }).phase).toBe('queued');
  });

  it('exposes only the curated prompt and style as the provider payload', () => {
    const prepared = reduceDreamImageGeneration(INITIAL_DREAM_IMAGE_GENERATION_STATE, { type: 'prepare', request });
    const consented = reduceDreamImageGeneration(prepared, { type: 'set-consent', consented: true });
    const payload = getPreparedDreamImageProviderPayload(consented);

    expect(payload).toEqual({
      visualReflectionPrompt: 'A quiet forest threshold.',
      style: 'watercolor',
      consent: {
        artisticUseAcknowledged: true,
        externalProcessingAllowed: true,
      },
    });
    expect(payload).not.toHaveProperty('dreamId');
  });

  it('keeps progress monotonic and accepts a result only from an active request', () => {
    const prepared = reduceDreamImageGeneration(INITIAL_DREAM_IMAGE_GENERATION_STATE, { type: 'prepare', request });
    const consented = reduceDreamImageGeneration(prepared, { type: 'set-consent', consented: true });
    const queued = reduceDreamImageGeneration(consented, { type: 'start' });
    const rendering = reduceDreamImageGeneration(queued, { type: 'progress', phase: 'rendering' });

    expect(reduceDreamImageGeneration(rendering, { type: 'progress', phase: 'moderating' })).toBe(rendering);
    expect(reduceDreamImageGeneration(rendering, { type: 'succeed', result })).toMatchObject({
      phase: 'succeeded',
      result,
    });
    expect(reduceDreamImageGeneration(prepared, { type: 'succeed', result })).toBe(prepared);
  });

  it('clears result and error state when consent is withdrawn or reset', () => {
    const active = {
      phase: 'rendering' as const,
      request,
      consented: true,
      result,
      errorMessage: 'old failure',
    };
    expect(reduceDreamImageGeneration(active, { type: 'set-consent', consented: false })).toMatchObject({
      phase: 'idle',
      consented: false,
      result: undefined,
      errorMessage: undefined,
      errorCode: undefined,
    });
    expect(reduceDreamImageGeneration(active, { type: 'reset' })).toEqual(INITIAL_DREAM_IMAGE_GENERATION_STATE);
  });

  it('clears an in-memory result without losing the prepared request or consent', () => {
    const completed = {
      phase: 'succeeded' as const,
      request,
      consented: true,
      result,
    };

    expect(reduceDreamImageGeneration(completed, { type: 'clear-result' })).toEqual({
      phase: 'idle',
      request,
      consented: true,
      result: undefined,
      errorMessage: undefined,
      errorCode: undefined,
    });
  });
});
