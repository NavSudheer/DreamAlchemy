import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import HistoryScreen from '../(tabs)/history';

const mockPush = jest.fn();
const mockGetDreams = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, setParams: jest.fn() }),
  useLocalSearchParams: () => ({ dreamId: 'dream-1' }),
  useFocusEffect: (callback: () => void | (() => void)) => {
    require('react').useEffect(callback, []);
  },
}));
jest.mock('@/components/DreamHistory', () => 'DreamHistory');
jest.mock('@/components/DreamAnalysis', () => 'DreamAnalysis');
jest.mock('@/components/ui/Header', () => 'Header');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));
jest.mock('@/utils/storage', () => ({
  getDreams: (...args: unknown[]) => mockGetDreams(...args),
  deleteDream: jest.fn(),
  clearDreams: jest.fn(),
}));

describe('saved dream to Dream Image navigation', () => {
  let screen: ReactTestRenderer;

  beforeEach(async () => {
    mockPush.mockReset();
    mockGetDreams.mockResolvedValue([{
      id: 'dream-1',
      content: 'Private dream narrative that must not be routed.',
      timestamp: 1,
      analysis: {
        interpretation: 'Private analysis that must not be routed.',
        symbols: [],
        archetypes: [],
        mood: 'neutral',
        theme: 'General',
      },
    }]);
    await act(async () => { screen = create(<HistoryScreen />); });
  });

  afterEach(() => {
    act(() => screen.unmount());
  });

  it('routes only the local dream id into Dream Image Studio', () => {
    const analysis = screen.root.findByType('DreamAnalysis' as never);
    act(() => analysis.props.onCreateDreamImage());

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/dream-image',
      params: { dreamId: 'dream-1' },
    });
    expect(JSON.stringify(mockPush.mock.calls[0][0])).not.toContain('Private dream');
    expect(JSON.stringify(mockPush.mock.calls[0][0])).not.toContain('Private analysis');
  });
});
