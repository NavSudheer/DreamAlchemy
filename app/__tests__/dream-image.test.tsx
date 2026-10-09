import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import DreamImageScreen from '../dream-image';
import { DreamImageResultActions } from '@/components/dream-image/DreamImageResultActions';

let mockDreamId: string | undefined;
let mockAvailable = false;
const mockGenerateDreamImage = jest.fn();
const mockGetDreams = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
  useLocalSearchParams: () => ({ dreamId: mockDreamId }),
}));
jest.mock('@/components/ui/Header', () => 'Header');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/components/ui/Button', () => 'Button');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));
jest.mock('@/services/dreamImage', () => ({
  DreamImageError: class DreamImageError extends Error {},
  getDreamImageAvailability: () => mockAvailable
    ? ({ available: true })
    : ({ available: false, reason: 'not-configured' }),
  generateDreamImage: (...args: unknown[]) => mockGenerateDreamImage(...args),
}));
jest.mock('@/utils/storage', () => ({
  getDreams: (...args: unknown[]) => mockGetDreams(...args),
}));

describe('Dream Image preparation screen', () => {
  let screen: ReactTestRenderer;

  beforeEach(() => {
    mockDreamId = undefined;
    mockAvailable = false;
    mockGenerateDreamImage.mockReset();
    mockGetDreams.mockReset();
    mockGetDreams.mockResolvedValue([]);
    act(() => { screen = create(<DreamImageScreen />); });
  });

  afterEach(() => {
    act(() => screen.unmount());
  });

  it('groups the scene and style radio choices for assistive technology', () => {
    const groups = screen.root.findAll(node => typeof node.type === 'string' && node.props.accessibilityRole === 'radiogroup');
    const radios = screen.root.findAll(node => typeof node.type === 'string' && node.props.accessibilityRole === 'radio');

    expect(groups).toHaveLength(2);
    expect(radios).toHaveLength(11);
    expect(radios.find(node => node.props.accessibilityLabel === 'Luminous Threshold')?.props.accessibilityState)
      .toEqual({ selected: true, checked: true });
    expect(radios.find(node => node.props.accessibilityLabel === 'Ethereal artistic style')?.props.accessibilityState)
      .toEqual({ selected: true, checked: true });
  });

  it('updates the selected scene and its recommended style together', () => {
    const radios = () => screen.root.findAll(node => typeof node.type === 'string' && node.props.accessibilityRole === 'radio');
    const mirror = radios().find(node => node.props.accessibilityLabel === 'Mirror of Stillness');
    if (!mirror) throw new Error('Mirror of Stillness radio not found');
    act(() => mirror.props.onClick({}));

    expect(radios().find(node => node.props.accessibilityLabel === 'Mirror of Stillness')?.props.accessibilityState)
      .toEqual({ selected: true, checked: true });
    expect(radios().find(node => node.props.accessibilityLabel === 'Watercolor artistic style')?.props.accessibilityState)
      .toEqual({ selected: true, checked: true });
  });

  it('keeps generation disabled in Explore preview and never calls the unavailable service', () => {
    const button = screen.root.findByType('Button' as never);
    expect(button.props.isDisabled).toBe(true);
    expect(button.props.children).toBe('Image Service Unavailable');
    expect(button.props.accessibilityLabel).toBe('Image service unavailable');

    act(() => button.props.onPress());

    expect(mockGenerateDreamImage).not.toHaveBeenCalled();
  });

  it('requires a saved-dream association in addition to explicit consent', () => {
    const consent = screen.root.findByProps({ accessibilityLabel: 'Consent to process curated Dream Image scene' });
    act(() => consent.props.onValueChange(true));

    expect(screen.root.findByType('Button' as never).props.isDisabled).toBe(true);
  });

  it('shows only regenerate and in-memory delete actions after a successful result', async () => {
    act(() => screen.unmount());
    mockDreamId = 'dream-1';
    mockAvailable = true;
    mockGetDreams.mockResolvedValue([{
      id: 'dream-1',
      content: 'SECRET_DREAM_CONTENT',
      analysis: { interpretation: 'SECRET_ANALYSIS_CONTENT' },
    }]);
    mockGenerateDreamImage.mockResolvedValue({
      id: 'image-1',
      imageUrl: 'https://images.example/image-1.png',
      altText: 'Watercolor scene of a luminous doorway beneath a violet sky.',
      generatedAt: '2026-10-09T00:00:00.000Z',
      style: 'ethereal',
    });
    await act(async () => { screen = create(<DreamImageScreen />); });

    const mirror = screen.root.findAll(node => typeof node.type === 'string' && node.props.accessibilityLabel === 'Mirror of Stillness')[0];
    const surreal = screen.root.findAll(node => typeof node.type === 'string' && node.props.accessibilityLabel === 'Surreal artistic style')[0];
    act(() => mirror.props.onClick({}));
    act(() => surreal.props.onClick({}));
    const consent = screen.root.findByProps({ accessibilityLabel: 'Consent to process curated Dream Image scene' });
    act(() => consent.props.onValueChange(true));
    const generate = screen.root.findAllByType('Button' as never)
      .find(node => node.props.children === 'Generate Visual Reflection');
    if (!generate) throw new Error('Generate Visual Reflection button not found');
    await act(async () => { await generate.props.onPress(); });

    const actions = screen.root.findByType(DreamImageResultActions);
    expect(Object.keys(actions.props.handlers).sort()).toEqual(['delete', 'regenerate']);
    expect(screen.root.findByProps({
      accessibilityLabel: 'Watercolor scene of a luminous doorway beneath a violet sky.',
    })).toBeDefined();
    expect(mockGenerateDreamImage).toHaveBeenCalledWith({
      dreamId: 'dream-1',
      visualReflectionPrompt: expect.stringContaining('glassy alpine lake'),
      style: 'surreal',
    });
    expect(JSON.stringify(mockGenerateDreamImage.mock.calls)).not.toContain('SECRET_DREAM_CONTENT');
    expect(JSON.stringify(mockGenerateDreamImage.mock.calls)).not.toContain('SECRET_ANALYSIS_CONTENT');

    await act(async () => { await actions.props.handlers.regenerate(); });
    expect(mockGenerateDreamImage).toHaveBeenCalledTimes(2);
    expect(Object.keys(mockGenerateDreamImage.mock.calls[1][0]).sort()).toEqual([
      'dreamId',
      'style',
      'visualReflectionPrompt',
    ]);
  });

  it('offers an accessible retry after a retryable generation failure', async () => {
    act(() => screen.unmount());
    mockDreamId = 'dream-1';
    mockAvailable = true;
    mockGetDreams.mockResolvedValue([{
      id: 'dream-1',
      content: 'SECRET_RETRY_DREAM',
      analysis: { interpretation: 'SECRET_RETRY_ANALYSIS' },
    }]);
    mockGenerateDreamImage.mockRejectedValueOnce(new Error('Could not reach the dream image service. Check your connection and try again.'));
    await act(async () => { screen = create(<DreamImageScreen />); });

    act(() => screen.root.findByProps({ accessibilityLabel: 'Consent to process curated Dream Image scene' }).props.onValueChange(true));
    const generate = screen.root.findAllByType('Button' as never)
      .find(node => node.props.children === 'Generate Visual Reflection');
    if (!generate) throw new Error('Generate Visual Reflection button not found');
    await act(async () => { await generate.props.onPress(); });

    const retry = screen.root.findAllByType('Button' as never)
      .find(node => node.props.children === 'Try Again');
    expect(retry).toBeDefined();
    expect(screen.root.findAllByProps({ accessibilityLiveRegion: 'polite' }).length).toBeGreaterThan(0);
    mockGenerateDreamImage.mockResolvedValueOnce({
      id: 'image-2',
      imageUrl: 'https://images.example/image-2.png',
      altText: 'Ethereal scene of a luminous doorway beneath a violet sky.',
      generatedAt: '2026-10-09T00:00:00.000Z',
      style: 'ethereal',
    });
    await act(async () => { await retry?.props.onPress(); });
    expect(mockGenerateDreamImage).toHaveBeenCalledTimes(2);
    expect(JSON.stringify(mockGenerateDreamImage.mock.calls)).not.toContain('SECRET_RETRY_DREAM');
    expect(JSON.stringify(mockGenerateDreamImage.mock.calls)).not.toContain('SECRET_RETRY_ANALYSIS');
  });

  it('does not enable generation for an unknown route-provided dream id', async () => {
    act(() => screen.unmount());
    mockDreamId = 'missing-dream';
    mockAvailable = true;
    mockGetDreams.mockResolvedValue([{ id: 'different-dream', analysis: { interpretation: 'local only' } }]);
    await act(async () => { screen = create(<DreamImageScreen />); });

    act(() => screen.root.findByProps({ accessibilityLabel: 'Consent to process curated Dream Image scene' }).props.onValueChange(true));

    const generate = screen.root.findAllByType('Button' as never)
      .find(node => node.props.children === 'Generate Visual Reflection');
    expect(generate?.props.isDisabled).toBe(true);
    act(() => generate?.props.onPress());
    expect(mockGenerateDreamImage).not.toHaveBeenCalled();
  });
});
