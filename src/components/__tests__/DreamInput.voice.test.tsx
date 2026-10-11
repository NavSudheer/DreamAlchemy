import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import DreamInput from '../DreamInput';
import type { SpeechResultsEvent } from '../../services/voiceRecognition';

let mockHandlers: { onSpeechResults?: (event: SpeechResultsEvent) => void } = {};
const mockCancelRecognizing = jest.fn(() => Promise.resolve());
const mockDestroyRecognizer = jest.fn(() => Promise.resolve());
const mockSetupEventHandlers = jest.fn((handlers) => { mockHandlers = handlers; });

jest.mock('../../services/voiceRecognition', () => ({
  __esModule: true,
  default: {
    isAvailable: jest.fn(() => Promise.resolve(true)),
    setupEventHandlers: (handlers: unknown) => mockSetupEventHandlers(handlers),
    startRecognizing: jest.fn(() => Promise.resolve()),
    stopRecognizing: jest.fn(() => Promise.resolve()),
    cancelRecognizing: () => mockCancelRecognizing(),
    destroyRecognizer: () => mockDestroyRecognizer(),
  },
  initialState: {
    recognized: false,
    pitch: '',
    error: '',
    end: false,
    started: false,
    results: [],
    partialResults: [],
    isRecording: false,
  },
}));
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: { Medium: 'medium', Light: 'light' },
}));
jest.mock('../../providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));
jest.mock('../ui/Text', () => 'Text');
jest.mock('../ui/Button', () => 'Button');
jest.mock('../ui/Card', () => 'Card');
jest.mock('../ui/AlertDialog', () => 'AlertDialog');

describe('DreamInput voice lifecycle', () => {
  let screen: ReactTestRenderer;

  beforeEach(async () => {
    mockHandlers = {};
    mockCancelRecognizing.mockClear();
    mockDestroyRecognizer.mockClear();
    mockSetupEventHandlers.mockClear();
    await act(async () => {
      screen = create(<DreamInput onSubmit={jest.fn()} isLoading={false} initialText="Existing dream" />);
    });
  });

  afterEach(() => {
    if (screen) act(() => screen.unmount());
  });

  it('appends a final transcript without replacing existing dream text', () => {
    act(() => mockHandlers.onSpeechResults?.({ value: ['and then I woke up'] }));

    const dreamInput = screen.root.findAllByType(TextInput)
      .find(node => node.props.multiline === true);
    expect(dreamInput?.props.value).toBe('Existing dream and then I woke up');
  });

  it('detaches callbacks and cancels native recognition before destroy on unmount', () => {
    act(() => screen.unmount());

    expect(mockSetupEventHandlers).toHaveBeenLastCalledWith({});
    expect(mockCancelRecognizing).toHaveBeenCalledTimes(1);
    expect(mockDestroyRecognizer).toHaveBeenCalledTimes(1);
  });
});
