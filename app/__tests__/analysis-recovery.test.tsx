import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import Index from '../(tabs)/index';

const mockAnalyzeDream = jest.fn();
const mockRecordAnalysis = jest.fn();
const mockCanPerformAnalysis = jest.fn();
const mockGetDreams = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useFocusEffect: () => {},
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('@/components/DreamInput', () => 'DreamInput');
jest.mock('@/components/DreamAnalysis', () => 'DreamAnalysis');
jest.mock('@/components/ui/Header', () => 'Header');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/components/ui/SubscriptionPaywall', () => 'SubscriptionPaywall');
jest.mock('@/providers/ThemeProvider', () => ({
  useTheme: () => ({ isDark: true, themeType: 'dark', setThemeType: jest.fn() }),
}));
jest.mock('@/utils/storage', () => ({
  getDreams: (...args: unknown[]) => mockGetDreams(...args),
  saveDream: jest.fn(),
}));
jest.mock('@/services/dreamAnalysis', () => ({
  DreamAnalysisError: class DreamAnalysisError extends Error {},
  analyzeDream: (...args: unknown[]) => mockAnalyzeDream(...args),
}));
jest.mock('@/services/trialTracking', () => ({
  trialTrackingService: {
    initialize: jest.fn(() => Promise.resolve()),
    getTrialStatus: jest.fn(() => Promise.resolve({
      isSubscriptionActive: false,
      hasTrialExpired: false,
      analysesLeft: 3,
    })),
    canPerformAnalysis: (...args: unknown[]) => mockCanPerformAnalysis(...args),
    recordAnalysis: (...args: unknown[]) => mockRecordAnalysis(...args),
  },
}));

const { DreamAnalysisError: MockDreamAnalysisError } = jest.requireMock(
  '@/services/dreamAnalysis',
) as { DreamAnalysisError: new (message: string) => Error };

describe('core analysis failure recovery', () => {
  let screen: ReactTestRenderer;

  beforeEach(async () => {
    mockAnalyzeDream.mockReset();
    mockRecordAnalysis.mockReset();
    mockCanPerformAnalysis.mockReset().mockResolvedValue(true);
    mockGetDreams.mockReset().mockResolvedValue([]);
    await act(async () => { screen = create(<Index />); });
  });

  afterEach(() => {
    act(() => screen.unmount());
  });

  it('preserves input, skips trial usage, and retries after a safe service failure', async () => {
    const fixture = 'A non-personal fixture about walking through a quiet library.';
    mockAnalyzeDream
      .mockRejectedValueOnce(new MockDreamAnalysisError('The dream analysis service is temporarily unavailable.'))
      .mockResolvedValueOnce({
        symbols: [],
        archetypes: [],
        interpretation: 'A bounded fixture interpretation.',
        timestamp: new Date().toISOString(),
      });
    mockRecordAnalysis.mockResolvedValue({
      isSubscriptionActive: false,
      hasTrialExpired: false,
      analysesLeft: 2,
    });

    const input = screen.root.findByType('DreamInput' as never);
    await act(async () => {
      await input.props.onSubmit(fixture, 'neutral', ['fixture']);
    });

    let analysis = screen.root.findByType('DreamAnalysis' as never);
    expect(analysis.props.dreamText).toBe(fixture);
    expect(analysis.props.analysis).toBeNull();
    expect(analysis.props.error).toBe('The dream analysis service is temporarily unavailable.');
    expect(mockRecordAnalysis).not.toHaveBeenCalled();

    await act(async () => {
      await analysis.props.onRetry();
    });

    analysis = screen.root.findByType('DreamAnalysis' as never);
    expect(analysis.props.dreamText).toBe(fixture);
    expect(analysis.props.error).toBeNull();
    expect(analysis.props.analysis.interpretation).toBe('A bounded fixture interpretation.');
    expect(mockAnalyzeDream).toHaveBeenNthCalledWith(2, fixture, expect.any(Function));
    expect(mockRecordAnalysis).toHaveBeenCalledTimes(1);
  });

  it('returns to editing with the original text after a failed request', async () => {
    const fixture = 'A non-personal fixture about a blue doorway in an empty field.';
    mockAnalyzeDream.mockRejectedValue(
      new MockDreamAnalysisError('The dream analysis service is temporarily unavailable.'),
    );

    const input = screen.root.findByType('DreamInput' as never);
    await act(async () => {
      await input.props.onSubmit(fixture, 'neutral', []);
    });

    const analysis = screen.root.findByType('DreamAnalysis' as never);
    act(() => analysis.props.onEdit());

    const editedInput = screen.root.findByType('DreamInput' as never);
    expect(editedInput.props.initialText).toBe(fixture);
    expect(mockRecordAnalysis).not.toHaveBeenCalled();
  });
});
