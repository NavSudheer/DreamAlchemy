import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { MeditationTimer } from '../MeditationTimer';

let mockFocused = true;
let mockReleased = false;
const mockPlayer = {
  loop: false,
  volume: 0,
  play: jest.fn(),
  pause: jest.fn(() => {
    if (mockReleased) throw new Error('Native player already released');
  }),
  seekTo: jest.fn(() => Promise.resolve()),
};

jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => mockFocused,
  DefaultTheme: { colors: {} },
  DarkTheme: { colors: {} },
}));
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Icon' }));
jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: false }) }));
jest.mock('expo-audio', () => ({
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  useAudioPlayer: () => {
    // Model Expo's cleanup ordering: the hook releases before the component effects.
    require('react').useEffect(() => () => { mockReleased = true; }, []);
    return mockPlayer;
  },
}));

describe('meditation playback lifecycle', () => {
  let screen: ReactTestRenderer;
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockFocused = true;
    mockReleased = false;
    act(() => { screen = create(<MeditationTimer />); });
  });
  afterEach(() => {
    act(() => screen.unmount());
    jest.useRealTimers();
  });

  const start = () => act(() => {
    const label = screen.root.findAllByType('Text' as never).find(node => node.props.children === 'Start session');
    let button = label?.parent;
    while (button && typeof button.props.onPress !== 'function') button = button.parent;
    if (!button) throw new Error('Start session button not found');
    button.props.onPress();
  });

  it('leaves teardown to Expo when exiting an active session', () => {
    start();
    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
    act(() => jest.advanceTimersByTime(2000));
    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
    expect(() => act(() => screen.unmount())).not.toThrow();
    expect(mockReleased).toBe(true);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('pauses on tab blur and does not resume when returning', () => {
    start();
    mockFocused = false;
    act(() => screen.update(<MeditationTimer />));
    expect(mockPlayer.pause).toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
    mockPlayer.play.mockClear();
    mockFocused = true;
    act(() => screen.update(<MeditationTimer />));
    expect(mockPlayer.play).not.toHaveBeenCalled();
  });
});
