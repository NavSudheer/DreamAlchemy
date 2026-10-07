import { generateDreamImage, getDreamImageAvailability } from '../dreamImage';

describe('dream image foundation', () => {
  it('stays unavailable without a configured server proxy', () => {
    expect(getDreamImageAvailability()).toEqual({ available: false, reason: 'not-configured' });
  });

  it('rejects generation without a configured server proxy', async () => {
    await expect(generateDreamImage({
      dreamId: 'local-dream',
      visualReflectionPrompt: 'An abstract moonlit landscape',
      style: 'ethereal',
    })).rejects.toThrow('not available yet');
  });
});
