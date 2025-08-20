import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';

import { useTheme } from '../../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows, typography } from '../../utils/theme';
import Text from './Text';
import Button from './Button';
import { subscriptionService } from '../../services/subscriptions';
import { trialTrackingService, TrialStatus } from '../../services/trialTracking';
import DebugPanel from '../debug/DebugPanel';

interface SubscriptionPaywallProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  trialStatus?: TrialStatus;
}

interface SubscriptionPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  savings?: string;
}

const { width } = Dimensions.get('window');

const SubscriptionPaywall: React.FC<SubscriptionPaywallProps> = ({
  visible,
  onClose,
  onSuccess,
  trialStatus,
}) => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('dreamAlchemy_monthly');
  const [isRestoring, setIsRestoring] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugTaps, setDebugTaps] = useState(0);

  // Sample subscription plans - replace with actual RevenueCat offerings
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'dreamAlchemy_monthly',
      title: 'Monthly',
      price: '$7.99',
      period: 'per month',
      features: [
        'Unlimited dream analyses',
        'Advanced psychological insights',
        'Dream pattern tracking',
        'Symbol dictionary access',
        'Voice recording support',
        'Export dream journal',
      ],
    },
    {
      id: 'dreamAlchemy_annual',
      title: 'Annual',
      price: '$59.99',
      period: 'per year',
      savings: 'Save 37%',
      isPopular: true,
      features: [
        'Everything in Monthly',
        'Priority customer support',
        'Exclusive dream techniques',
        'Advanced analytics',
        'Meditation guides',
        'Community access',
      ],
    },
  ];

  const handlePurchase = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Get current offerings from RevenueCat
      const offering = await subscriptionService.getOfferings();
      
      if (!offering) {
        Alert.alert(
          'Service Temporarily Unavailable', 
          'Unable to load subscription options. This might be a temporary issue. Please try again in a few minutes or contact support if the problem persists.',
          [
            { text: 'OK', style: 'default' },
            { text: 'Try Again', onPress: handlePurchase }
          ]
        );
        return;
      }

      // Find the selected package by product identifier
      const packageToPurchase = offering.availablePackages.find(
        pkg => pkg.product.identifier === selectedPlan
      );

      if (!packageToPurchase) {
        Alert.alert('Error', 'Selected subscription plan not available.');
        return;
      }

      // Attempt purchase
      const result = await subscriptionService.purchaseSubscription(packageToPurchase);

      if (result.success) {
        // Refresh trial status
        await trialTrackingService.refreshSubscriptionStatus();
        
        // Show success message
        Alert.alert(
          '🎉 Welcome to Premium!',
          'Your subscription is now active. Enjoy unlimited dream analyses!',
          [{ text: 'Get Started', onPress: onSuccess }]
        );
      } else {
        if (result.error !== 'Purchase cancelled by user') {
          Alert.alert('Purchase Failed', result.error || 'An unexpected error occurred.');
        }
      }
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert('Error', 'Failed to process purchase. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const result = await subscriptionService.restorePurchases();

      if (result.success && result.isActive) {
        // Refresh trial status
        await trialTrackingService.refreshSubscriptionStatus();
        
        Alert.alert(
          '✅ Purchases Restored',
          'Your subscription has been restored successfully!',
          [{ text: 'Continue', onPress: onSuccess }]
        );
      } else {
        Alert.alert('No Purchases Found', 'No active subscriptions found to restore.');
      }
    } catch (error) {
      Alert.alert('Restore Failed', 'Unable to restore purchases. Please try again.');
    } finally {
      setIsRestoring(false);
    }
  };

  const handleTitlePress = () => {
    // TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION
    // Debug panel activation only available in development builds
    // if (!__DEV__) {
    //   return;
    // }
    
    const newTaps = debugTaps + 1;
    setDebugTaps(newTaps);
    
    if (newTaps >= 7) {
      setShowDebug(true);
      setDebugTaps(0);
    } else if (newTaps >= 3) {
      // Give haptic feedback when close to activating debug mode
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const getTrialMessage = () => {
    if (!trialStatus) return null;
    
    if (trialStatus.hasTrialExpired) {
      return '🔮 Your free trial has ended';
    }
    
    return '🔮 ' + trialStatus.analysesLeft + ' free analyses remaining';
  };

  const renderPlan = (plan: SubscriptionPlan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planContainer,
        selectedPlan === plan.id && styles.selectedPlan,
        plan.isPopular && styles.popularPlan,
        {
          backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100],
          borderColor: selectedPlan === plan.id 
            ? Colors.primary[500] 
            : isDark ? Colors.neutral[700] : Colors.neutral[200],
        },
      ]}
      onPress={() => setSelectedPlan(plan.id)}
      activeOpacity={0.8}
    >
      {plan.isPopular && (
        <View style={[styles.popularBadge, { backgroundColor: Colors.primary[500] }]}>
          <Text variant="caption" style={styles.popularText}>
            MOST POPULAR
          </Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text variant="h4" style={{ color: isDark ? Colors.neutral[100] : Colors.neutral[800] }}>
          {plan.title}
        </Text>
        {plan.savings && (
          <Text variant="caption" style={{ color: Colors.accent[500] }}>
            {plan.savings}
          </Text>
        )}
      </View>
      
      <View style={styles.priceContainer}>
        <Text variant="h2" style={{ color: Colors.primary[500] }}>
          {plan.price}
        </Text>
        <Text variant="body2" style={{ color: isDark ? Colors.neutral[400] : Colors.neutral[600] }}>
          {plan.period}
        </Text>
      </View>
      
      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={Colors.accent[500]}
              style={styles.featureIcon}
            />
            <Text variant="body2" style={{ color: isDark ? Colors.neutral[300] : Colors.neutral[700] }}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <BlurView intensity={100} style={styles.container}>
        <LinearGradient
          colors={isDark ? ['#1a1a2e', '#16213e'] : ['#f7fafc', '#edf2f7']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleTitlePress} activeOpacity={1}>
              <Text variant="h3" style={[styles.title, { color: isDark ? Colors.neutral[100] : Colors.neutral[800] }]}>
                Unlock Premium
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <Ionicons
                name="close"
                size={24}
                color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
              />
            </TouchableOpacity>
          </View>

          <Text variant="body1" style={[styles.subtitle, { color: isDark ? Colors.neutral[300] : Colors.neutral[600] }]}>
            {getTrialMessage()}
          </Text>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.plansContainer}>
              {subscriptionPlans.map(renderPlan)}
            </View>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={handlePurchase}
              isLoading={isLoading}
              style={styles.subscribeButton}
            >
              {isLoading ? 'Processing...' : `Subscribe ${subscriptionPlans.find(p => p.id === selectedPlan)?.price}/month`}
            </Button>

            <TouchableOpacity
              onPress={handleRestore}
              style={styles.restoreButton}
              disabled={isRestoring}
            >
              {isRestoring ? (
                <ActivityIndicator size="small" color={Colors.primary[500]} />
              ) : (
                <Text variant="body2" style={{ color: Colors.primary[500] }}>
                  Restore Purchases
                </Text>
              )}
            </TouchableOpacity>

            <Text variant="caption" style={[styles.termsText, { color: isDark ? Colors.neutral[500] : Colors.neutral[500] }]}>
              Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
            </Text>
          </ScrollView>
        </LinearGradient>
      </BlurView>
      
      {/* TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION */}
      {/* Debug panel only available in development builds */}
      {/* {__DEV__ && ( */}
        <DebugPanel 
          visible={showDebug} 
          onClose={() => setShowDebug(false)} 
        />
      {/* )} */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[8],
    paddingBottom: spacing[2],
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: spacing[2],
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: spacing[5],
    marginBottom: spacing[6],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[5],
  },
  plansContainer: {
    marginBottom: spacing[6],
  },
  planContainer: {
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    padding: spacing[4],
    marginBottom: spacing[4],
    position: 'relative',
    ...Shadows.md,
  },
  selectedPlan: {
    borderWidth: 2,
  },
  popularPlan: {
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: spacing[4],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: BorderRadius.pill,
  },
  popularText: {
    color: Colors.neutral[50],
    fontWeight: '600',
    fontSize: 10,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  featuresContainer: {
    gap: spacing[2],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  featureIcon: {
    marginTop: 1,
  },
  subscribeButton: {
    marginBottom: spacing[4],
  },
  restoreButton: {
    alignItems: 'center',
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  termsText: {
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing[2],
    marginBottom: spacing[6],
  },
});

export default SubscriptionPaywall; 