import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { DreamImageProgress } from '../DreamImageProgress';

jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));

describe('DreamImageProgress', () => {
  let screen: ReactTestRenderer;

  afterEach(() => {
    act(() => screen.unmount());
  });

  it('exposes the queued step as an accessible progress value', () => {
    act(() => { screen = create(<DreamImageProgress state="queued" />); });

    const progress = screen.root.findByProps({ accessibilityRole: 'progressbar' });
    expect(progress.props.accessibilityValue).toEqual({ min: 1, max: 4, now: 1, text: 'Queued' });
  });

  it('updates its live announcement and progress value when state changes', () => {
    act(() => { screen = create(<DreamImageProgress state="moderating" />); });
    act(() => { screen.update(<DreamImageProgress state="finalizing" />); });

    const progress = screen.root.findByProps({ accessibilityRole: 'progressbar' });
    const liveRegion = screen.root.findByProps({ accessibilityLiveRegion: 'polite' });
    expect(progress.props.accessibilityValue.now).toBe(4);
    expect(liveRegion.props.children).toContain('Finalizing artwork');
  });
});
