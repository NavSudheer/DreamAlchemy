import React from 'react';
import { Alert, Linking } from 'react-native';
import { act, create, ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import SubscriptionPaywall from '../SubscriptionPaywall';

const mockRestore = jest.fn();
const mockGetOfferings = jest.fn();
const mockPurchase = jest.fn();
const mockRefreshSubscriptionStatus = jest.fn();
const monthlyPackage = {
  product: {
    identifier: 'dreamAlchemy_monthly',
    priceString: '$7.99',
    subscriptionPeriod: 'P1M',
  },
};
const annualPackage = {
  product: {
    identifier: 'dreamAlchemy_annual',
    priceString: '$59.99',
    subscriptionPeriod: 'P1Y',
  },
};
jest.mock('@/services/subscriptions', () => ({
  subscriptionService: {
    restorePurchases: () => mockRestore(),
    getOfferings: () => mockGetOfferings(),
    purchaseSubscription: (...args: unknown[]) => mockPurchase(...args),
  },
}));
jest.mock('@/services/trialTracking', () => ({
  trialTrackingService: {
    refreshSubscriptionStatus: () => mockRefreshSubscriptionStatus(),
  },
}));
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
  beforeEach(async () => {
    mockRestore.mockReset();
    mockGetOfferings.mockReset().mockResolvedValue({
      availablePackages: [monthlyPackage, annualPackage],
    });
    mockPurchase.mockReset();
    mockRefreshSubscriptionStatus.mockReset().mockResolvedValue(undefined);
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    await act(async () => { screen = create(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={jest.fn()} />); });
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

  it('announces complete plan labels and the current radio selection', () => {
    const hasRadioState = (label: string, selected: boolean) => screen.root.findAll(node =>
      node.props.accessibilityRole === 'radio' &&
      node.props.accessibilityLabel === label &&
      node.props.accessibilityState?.selected === selected &&
      node.props.accessibilityHint === 'Selects this subscription plan',
    ).length > 0;

    expect(hasRadioState('Monthly, $7.99 per month', true)).toBe(true);
    expect(hasRadioState('Annual, $59.99 per year', false)).toBe(true);

    act(() => pressLabel('Annual'));

    expect(hasRadioState('Monthly, $7.99 per month', false)).toBe(true);
    expect(hasRadioState('Annual, $59.99 per year', true)).toBe(true);
  });

  it('groups the plan choices under a named radio group', () => {
    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'radiogroup' &&
      node.props.accessibilityLabel === 'Subscription plans',
    )).toBeTruthy();
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

  it('refreshes entitlement state after a successful purchase', async () => {
    mockPurchase.mockResolvedValue({ success: true });

    await act(async () => { await screen.root.findByType('Button' as never).props.onPress(); });

    expect(mockPurchase).toHaveBeenCalledWith(monthlyPackage);
    expect(mockRefreshSubscriptionStatus).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      '🎉 Welcome to Premium!',
      'Your subscription is now active. Enjoy unlimited dream analyses!',
      expect.any(Array),
    );
  });

  it('starts only one purchase when the action is pressed repeatedly', async () => {
    let finishPurchase: ((value: { success: boolean }) => void) | undefined;
    mockPurchase.mockImplementation(() => new Promise(resolve => {
      finishPurchase = resolve;
    }));

    let firstPurchase: Promise<void> | undefined;
    await act(async () => {
      const purchase = screen.root.findByType('Button' as never).props.onPress;
      firstPurchase = purchase();
      void purchase();
      await Promise.resolve();
    });

    expect(mockPurchase).toHaveBeenCalledTimes(1);
    await act(async () => {
      finishPurchase?.({ success: false });
      await firstPurchase;
    });
  });

  it('announces purchase progress and disables both store actions while purchasing', async () => {
    let finishPurchase: ((value: { success: boolean }) => void) | undefined;
    mockPurchase.mockImplementation(() => new Promise(resolve => {
      finishPurchase = resolve;
    }));

    let purchase: Promise<void> | undefined;
    await act(async () => {
      purchase = screen.root.findByType('Button' as never).props.onPress();
      await Promise.resolve();
    });

    const subscribeButton = screen.root.findByType('Button' as never);
    expect(subscribeButton.props.isDisabled).toBe(true);
    expect(subscribeButton.props.accessibilityLabel).toBe('Processing subscription purchase');
    expect(subscribeButton.props.accessibilityState).toEqual({ busy: true, disabled: true });
    expect(screen.root.find(node =>
      node.props.accessibilityLabel === 'Restore Purchases' &&
      node.props.accessibilityState?.disabled === true,
    )).toBeTruthy();
    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'radio' &&
      node.props.accessibilityLabel === 'Annual, $59.99 per year' &&
      node.props.disabled === true &&
      node.props.accessibilityState?.disabled === true,
    )).toBeTruthy();

    await act(async () => {
      finishPurchase?.({ success: false });
      await purchase;
    });
  });

  it('announces restore progress and disables both store actions while restoring', async () => {
    let finishRestore: ((value: { success: boolean; isActive: boolean }) => void) | undefined;
    mockRestore.mockImplementation(() => new Promise(resolve => {
      finishRestore = resolve;
    }));

    let restore: Promise<void> | undefined;
    await act(async () => {
      restore = pressLabel('Restore Purchases');
      await Promise.resolve();
    });

    const subscribeButton = screen.root.findByType('Button' as never);
    expect(subscribeButton.props.isDisabled).toBe(true);
    expect(subscribeButton.props.accessibilityState.disabled).toBe(true);
    expect(screen.root.find(node =>
      node.props.accessibilityLabel === 'Restoring purchases' &&
      node.props.accessibilityState?.busy === true &&
      node.props.accessibilityState?.disabled === true,
    )).toBeTruthy();
    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'radio' &&
      node.props.accessibilityLabel === 'Annual, $59.99 per year' &&
      node.props.disabled === true &&
      node.props.accessibilityState?.disabled === true,
    )).toBeTruthy();

    await act(async () => {
      finishRestore?.({ success: false, isActive: false });
      await restore;
    });
  });

  it('does not show stale purchase success UI after the paywall is hidden', async () => {
    let finishPurchase: ((value: { success: boolean }) => void) | undefined;
    mockPurchase.mockImplementation(() => new Promise(resolve => {
      finishPurchase = resolve;
    }));
    const onSuccess = jest.fn();
    act(() => {
      screen.update(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={onSuccess} />);
    });

    let purchase: Promise<void> | undefined;
    await act(async () => {
      purchase = screen.root.findByType('Button' as never).props.onPress();
      await Promise.resolve();
    });
    act(() => {
      screen.update(<SubscriptionPaywall visible={false} onClose={jest.fn()} onSuccess={onSuccess} />);
    });
    await act(async () => {
      finishPurchase?.({ success: true });
      await purchase;
    });

    expect(mockRefreshSubscriptionStatus).toHaveBeenCalledTimes(1);
    expect(Alert.alert).not.toHaveBeenCalledWith(
      '🎉 Welcome to Premium!',
      expect.any(String),
      expect.any(Array),
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('uses the localized prices returned by the active offering', () => {
    expect(screen.root.findAllByType('Text' as never).map(node => node.props.children)).toEqual(
      expect.arrayContaining(['$7.99', '$59.99']),
    );
  });

  it('names the offering progress indicator for assistive technology', async () => {
    let finishOffering: ((value: { availablePackages: (typeof monthlyPackage)[] }) => void) | undefined;
    mockGetOfferings.mockImplementationOnce(() => new Promise(resolve => {
      finishOffering = resolve;
    }));

    act(() => {
      screen.update(<SubscriptionPaywall visible={false} onClose={jest.fn()} onSuccess={jest.fn()} />);
    });
    await act(async () => {
      screen.update(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={jest.fn()} />);
      await Promise.resolve();
    });

    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'progressbar' &&
      node.props.accessibilityLabel === 'Loading subscription options',
    )).toBeTruthy();

    await act(async () => {
      finishOffering?.({ availablePackages: [monthlyPackage] });
      await Promise.resolve();
    });
  });

  it('clears stale plans when a later offering refresh fails', async () => {
    mockGetOfferings.mockRejectedValueOnce(new Error('Store unavailable'));

    act(() => {
      screen.update(<SubscriptionPaywall visible={false} onClose={jest.fn()} onSuccess={jest.fn()} />);
    });
    await act(async () => {
      screen.update(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={jest.fn()} />);
    });

    const visibleCopy = JSON.stringify(screen.toJSON());
    expect(visibleCopy).toContain('Subscription options are temporarily unavailable');
    expect(visibleCopy).not.toContain('$7.99');
    expect(screen.root.findByType('Button' as never).props.isDisabled).toBe(true);
    expect(screen.root.find(node =>
      node.props.children === 'Subscription options are temporarily unavailable. You can still restore an existing purchase.' &&
      node.props.accessibilityLiveRegion === 'polite',
    )).toBeTruthy();
  });

  it('does not advertise excluded or unimplemented subscription benefits', () => {
    const visibleCopy = JSON.stringify(screen.toJSON());
    expect(visibleCopy).toContain('Unlimited dream analyses during an active subscription');
    expect(visibleCopy).not.toContain('Community access');
    expect(visibleCopy).not.toContain('Priority customer support');
    expect(visibleCopy).not.toContain('Export dream journal');
  });

  it('renders the release title as a non-interactive heading', () => {
    const title = screen.root.findAllByType('Text' as never).find(node =>
      node.props.children === 'Unlock Premium',
    );

    expect(title?.props.accessibilityRole).toBe('header');
    expect(typeof title?.parent?.props.onPress).not.toBe('function');
  });

  it('gives the icon-only close control an accessible dismiss name', () => {
    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'button' &&
      node.props.accessibilityLabel === 'Close subscription options' &&
      node.props.accessibilityHint === 'Dismisses the subscription options',
    )).toBeTruthy();
  });

  it('exposes the legal controls as clearly labelled links', () => {
    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'link' &&
      node.props.accessibilityLabel === 'Terms of Use' &&
      node.props.accessibilityHint === 'Opens the DreamAlchemy Terms of Use',
    )).toBeTruthy();
    expect(screen.root.find(node =>
      node.props.accessibilityRole === 'link' &&
      node.props.accessibilityLabel === 'Privacy Policy' &&
      node.props.accessibilityHint === 'Opens the DreamAlchemy Privacy Policy',
    )).toBeTruthy();
  });

  it('expands the touch target around each compact legal link', () => {
    const expectedHitSlop = { top: 12, right: 8, bottom: 12, left: 8 };

    expect(screen.root.find(node =>
      node.props.accessibilityLabel === 'Terms of Use' &&
      node.props.hitSlop?.top === expectedHitSlop.top,
    ).props.hitSlop).toEqual(expectedHitSlop);
    expect(screen.root.find(node =>
      node.props.accessibilityLabel === 'Privacy Policy' &&
      node.props.hitSlop?.top === expectedHitSlop.top,
    ).props.hitSlop).toEqual(expectedHitSlop);
  });

  it('shows clear feedback when a legal link cannot be opened', async () => {
    jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(false);
    const openUrl = jest.spyOn(Linking, 'openURL');

    await act(async () => { await pressLabel('Privacy Policy'); });

    expect(openUrl).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      'Unable to Open Link',
      'The Privacy Policy could not be opened. Please check your connection and try again.',
    );
    expect(mockPurchase).not.toHaveBeenCalled();
    expect(mockRestore).not.toHaveBeenCalled();
  });

  it('starts only one legal navigation for repeated presses', async () => {
    let finishCheck: ((supported: boolean) => void) | undefined;
    const canOpenUrl = jest.spyOn(Linking, 'canOpenURL').mockImplementation(
      () => new Promise(resolve => { finishCheck = resolve; }),
    );
    const openUrl = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    canOpenUrl.mockClear();
    openUrl.mockClear();

    let firstPress: Promise<void> | undefined;
    act(() => {
      firstPress = pressLabel('Terms of Use');
      void pressLabel('Terms of Use');
    });
    expect(canOpenUrl).toHaveBeenCalledTimes(1);

    await act(async () => {
      finishCheck?.(true);
      await firstPress;
    });
    expect(openUrl).toHaveBeenCalledTimes(1);
  });

  it('does not show stale legal-link failure UI after the paywall is hidden', async () => {
    let finishCheck: ((supported: boolean) => void) | undefined;
    const canOpenUrl = jest.spyOn(Linking, 'canOpenURL').mockImplementation(
      () => new Promise(resolve => { finishCheck = resolve; }),
    );
    canOpenUrl.mockClear();

    act(() => { void pressLabel('Terms of Use'); });
    act(() => {
      screen.update(<SubscriptionPaywall visible={false} onClose={jest.fn()} onSuccess={jest.fn()} />);
    });
    await act(async () => {
      finishCheck?.(false);
      await Promise.resolve();
    });

    expect(Alert.alert).not.toHaveBeenCalledWith(
      'Unable to Open Link',
      expect.any(String),
    );
  });

  it('refreshes entitlement state only for an active restore', async () => {
    mockRestore.mockResolvedValue({ success: true, isActive: true });

    await act(async () => { await pressLabel('Restore Purchases'); });

    expect(mockRefreshSubscriptionStatus).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      '✅ Purchases Restored',
      'Your subscription has been restored successfully!',
      expect.any(Array),
    );
  });

  it('starts only one restore when the action is pressed repeatedly', async () => {
    let finishRestore: ((value: { success: boolean; isActive: boolean }) => void) | undefined;
    mockRestore.mockImplementation(() => new Promise(resolve => {
      finishRestore = resolve;
    }));

    let firstRestore: Promise<void> | undefined;
    act(() => {
      firstRestore = pressLabel('Restore Purchases');
      void pressLabel('Restore Purchases');
    });

    expect(mockRestore).toHaveBeenCalledTimes(1);
    await act(async () => {
      finishRestore?.({ success: true, isActive: false });
      await firstRestore;
    });
  });

  it('does not show stale restore success UI after the paywall is hidden', async () => {
    let finishRestore: ((value: { success: boolean; isActive: boolean }) => void) | undefined;
    mockRestore.mockImplementation(() => new Promise(resolve => {
      finishRestore = resolve;
    }));
    const onSuccess = jest.fn();
    act(() => {
      screen.update(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={onSuccess} />);
    });

    let restore: Promise<void> | undefined;
    act(() => {
      restore = pressLabel('Restore Purchases');
    });
    act(() => {
      screen.update(<SubscriptionPaywall visible={false} onClose={jest.fn()} onSuccess={onSuccess} />);
    });
    await act(async () => {
      finishRestore?.({ success: true, isActive: true });
      await restore;
    });

    expect(mockRefreshSubscriptionStatus).toHaveBeenCalledTimes(1);
    expect(Alert.alert).not.toHaveBeenCalledWith(
      '✅ Purchases Restored',
      expect.any(String),
      expect.any(Array),
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('does not render or unlock debug tools in a release build', async () => {
    const devGlobal = global as unknown as { __DEV__: boolean };
    const originalDev = devGlobal.__DEV__;
    Object.defineProperty(global, '__DEV__', { value: false, writable: true, configurable: true });
    try {
      act(() => screen.unmount());
      await act(async () => { screen = create(<SubscriptionPaywall visible onClose={jest.fn()} onSuccess={jest.fn()} />); });
      const title = screen.root.findAllByType('Text' as never).find(node =>
        node.props.children === 'Unlock Premium',
      );
      expect(typeof title?.parent?.props.onPress).not.toBe('function');
      expect(screen.root.findAllByType('DebugPanel' as never)).toHaveLength(0);
    } finally {
      Object.defineProperty(global, '__DEV__', { value: originalDev, writable: true, configurable: true });
    }
  });
});
