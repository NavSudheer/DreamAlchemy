import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AstrologyProgress } from '../AstrologyProgress';

jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));

describe('AstrologyProgress', () => {
  let screen: ReactTestRenderer;

  afterEach(() => {
    act(() => screen.unmount());
  });

  it('announces chart calculation without describing it as AI reflection', () => {
    act(() => { screen = create(<AstrologyProgress state="calculating-placements" />); });

    const progress = screen.root.findByProps({ accessibilityRole: 'progressbar' });
    const liveRegion = screen.root.findByProps({ accessibilityLiveRegion: 'polite' });
    expect(progress.props.accessibilityValue).toEqual({ min: 1, max: 4, now: 2, text: 'Calculating' });
    expect(liveRegion.props.children).toContain('chart placements');
    expect(liveRegion.props.children).not.toContain('reflection');
  });

  it('labels reflection generation as a distinct optional phase', () => {
    act(() => { screen = create(<AstrologyProgress state="generating-reflection" />); });

    const progress = screen.root.findByProps({ accessibilityRole: 'progressbar' });
    expect(progress.props.accessibilityValue.now).toBe(4);
    const labels = screen.root.findAllByType('Text' as never).map(node => Array.isArray(node.props.children)
      ? node.props.children.join('')
      : node.props.children);
    expect(labels).toContain('Optional reflection · Step 4 of 4');
  });
});
