import React from 'react';
import { Alert } from 'react-native';
import { act, create, ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import SubscriptionPaywall from '../SubscriptionPaywall';

const mockRestore = jest.fn();
jest.mock('@/services/subscriptions', () => ({
  subscriptionService: { restorePurchases: () => mockRestore() },
}));
jest.mock('@/services/trialTracking', () => ({ trialTrackingService: {} }));
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: false }) }));
jest.mock('@/components/debug/DebugPanel', () => 'DebugPanel');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/components/ui/Button', () => 'Button');
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Icon' }));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'Gradient' }));
jest.mock('expo-blur', () => ({ BlurView: 'Blur' }));
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(), ImpactFeedbackStyle: { Medium: 'medium', Light: 'light' },
}));

describe('subscription paywall', () => {
  let screen: ReactTestRenderer;
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    act(() => { screen = create(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={jest.fn()} />); });
  });
  afterEach(() => {
    act(() => screen.unmount());
    jest.restoreAllMocks();
  });
  const pressLabel = (text: string) => {
    let target: ReactTestInstance | null | undefined = screen.root
      .findAllByType('Text' as never).find(node => node.props.children === text);
    while (target && typeof target.props.onPress !== 'function') target = target.parent;
    if (!target) throw new Error(`Button not found: ${text}`);
    return target.props.onPress();
  };

  it('labels annual subscriptions with the annual billing period', () => {
    act(() => pressLabel('Annual'));
    expect(screen.root.findByType('Button' as never).props.children).toBe('Subscribe $59.99 per year');
  });

  it('distinguishes a restore failure from an empty purchase history', async () => {
    mockRestore.mockResolvedValue({ success: false, isActive: false, error: 'Network unavailable' });
    await act(async () => { await pressLabel('Restore Purchases'); });
    expect(Alert.alert).toHaveBeenCalledWith('Restore Failed', 'Network unavailable');
  });

  it('reports no purchases only after a successful empty restore', async () => {
    mockRestore.mockResolvedValue({ success: true, isActive: false });
    await act(async () => { await pressLabel('Restore Purchases'); });
    expect(Alert.alert).toHaveBeenCalledWith('No Purchases Found', 'No active subscriptions found to restore.');
  });
});
