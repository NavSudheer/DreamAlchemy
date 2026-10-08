import React from 'react';
import { Alert } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { DreamImageResultActions } from '../DreamImageResultActions';

jest.mock('@/components/ui/Button', () => 'Button');
jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));

describe('DreamImageResultActions', () => {
  let screen: ReactTestRenderer;

  afterEach(() => {
    if (screen) act(() => screen.unmount());
    jest.restoreAllMocks();
  });

  it('renders only actions backed by handlers', () => {
    act(() => { screen = create(<DreamImageResultActions handlers={{ share: jest.fn() }} />); });

    const buttons = screen.root.findAllByType('Button' as never);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].props.children).toBe('Share Reflection Image');
  });

  it('runs non-destructive actions without a confirmation dialog', () => {
    const onShare = jest.fn();
    const alert = jest.spyOn(Alert, 'alert');
    act(() => { screen = create(<DreamImageResultActions handlers={{ share: onShare }} />); });

    act(() => screen.root.findByType('Button' as never).props.onPress());

    expect(alert).not.toHaveBeenCalled();
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('requires confirmation before deleting artwork', () => {
    const onDelete = jest.fn();
    const alert = jest.spyOn(Alert, 'alert');
    act(() => { screen = create(<DreamImageResultActions handlers={{ delete: onDelete }} />); });

    act(() => screen.root.findByType('Button' as never).props.onPress());
    expect(onDelete).not.toHaveBeenCalled();
    const actions = alert.mock.calls[0][2];
    act(() => actions?.[1].onPress?.());
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
