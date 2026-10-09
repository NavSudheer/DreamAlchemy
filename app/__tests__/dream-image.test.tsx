import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import DreamImageScreen from '../dream-image';

let mockDreamId: string | undefined;
const mockGenerateDreamImage = jest.fn();

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
  getDreamImageAvailability: () => ({ available: false, reason: 'not-configured' }),
  generateDreamImage: (...args: unknown[]) => mockGenerateDreamImage(...args),
}));

describe('Dream Image preparation screen', () => {
  let screen: ReactTestRenderer;

  beforeEach(() => {
    mockDreamId = undefined;
    mockGenerateDreamImage.mockReset();
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
      .toEqual({ selected: true });
    expect(radios.find(node => node.props.accessibilityLabel === 'Ethereal artistic style')?.props.accessibilityState)
      .toEqual({ selected: true });
  });

  it('updates the selected scene and its recommended style together', () => {
    const radios = () => screen.root.findAll(node => typeof node.type === 'string' && node.props.accessibilityRole === 'radio');
    const mirror = radios().find(node => node.props.accessibilityLabel === 'Mirror of Stillness');
    if (!mirror) throw new Error('Mirror of Stillness radio not found');
    act(() => mirror.props.onClick({}));

    expect(radios().find(node => node.props.accessibilityLabel === 'Mirror of Stillness')?.props.accessibilityState)
      .toEqual({ selected: true });
    expect(radios().find(node => node.props.accessibilityLabel === 'Watercolor artistic style')?.props.accessibilityState)
      .toEqual({ selected: true });
  });

  it('keeps generation disabled in Explore preview and never calls the unavailable service', () => {
    const button = screen.root.findByType('Button' as never);
    expect(button.props.isDisabled).toBe(true);
    expect(button.props.children).toBe('Image Service Unavailable');

    act(() => button.props.onPress());

    expect(mockGenerateDreamImage).not.toHaveBeenCalled();
  });

  it('requires a saved-dream association in addition to explicit consent', () => {
    const consent = screen.root.findByProps({ accessibilityLabel: 'Consent to process curated Dream Image scene' });
    act(() => consent.props.onValueChange(true));

    expect(screen.root.findByType('Button' as never).props.isDisabled).toBe(true);
  });
});
