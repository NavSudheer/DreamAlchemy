import Purchases, { 
  PurchasesOffering, 
  CustomerInfo, 
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
  PurchasesError
} from 'react-native-purchases';
import { Platform } from 'react-native';

// RevenueCat API Keys (replace with your actual keys)
const REVENUECAT_KEYS = {
  ios: 'appl_paiNLobQQfBhyxvwASGMzDAkoFL', // ✅ Your iOS API key
  android: 'goog_YOUR_ANDROID_KEY_HERE', // TODO: Add Android key when available
};

export interface SubscriptionStatus {
  isActive: boolean;
  productIdentifier?: string;
  expirationDate?: string;
  willRenew?: boolean;
}

export interface TrialInfo {
  isInTrial: boolean;
  analysesLeft: number;
  daysLeft: number;
  hasExpired: boolean;
}

class SubscriptionService {
  private isInitialized = false;

  /**
   * Initialize RevenueCat SDK
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const apiKey = Platform.OS === 'ios' ? REVENUECAT_KEYS.ios : REVENUECAT_KEYS.android;
      
      await Purchases.configure({
        apiKey,
        appUserID: undefined, // Optional: set user ID for cross-platform tracking
      });

      this.isInitialized = true;
      
      // Set debug mode in development
      if (__DEV__) {
        await Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      }
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      throw error;
    }
  }

  /**
   * Get available subscription offerings
   */
  async getOfferings(): Promise<PurchasesOffering | null> {
    await this.initialize();
    
    try {
      const offerings = await Purchases.getOfferings();
      return offerings.current;
    } catch (error) {
      console.error('Failed to get offerings:', error);
      return null;
    }
  }

  /**
   * Purchase a subscription package
   */
  async purchaseSubscription(packageToPurchase: PurchasesPackage): Promise<{
    success: boolean;
    customerInfo?: CustomerInfo;
    error?: string;
  }> {
    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      
      return {
        success: true,
        customerInfo,
      };
    } catch (error) {
      const purchasesError = error as PurchasesError;
      
      // Handle user cancellation gracefully
      if (purchasesError.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        return {
          success: false,
          error: 'Purchase cancelled by user',
        };
      }
      
      return {
        success: false,
        error: purchasesError.message || 'Purchase failed',
      };
    }
  }

  /**
   * Check current subscription status
   */
  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    await this.initialize();
    
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const activeEntitlements = Object.keys(customerInfo.entitlements.active);
      
      if (activeEntitlements.length > 0) {
        const entitlement = customerInfo.entitlements.active[activeEntitlements[0]];
        
        return {
          isActive: true,
          productIdentifier: entitlement.productIdentifier,
          expirationDate: entitlement.expirationDate || undefined,
          willRenew: entitlement.willRenew,
        };
      }
      
      return { isActive: false };
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      return { isActive: false };
    }
  }

  /**
   * Restore previous purchases
   */
  async restorePurchases(): Promise<{
    success: boolean;
    isActive: boolean;
    error?: string;
  }> {
    try {
      const customerInfo = await Purchases.restorePurchases();
      const hasActiveSubscription = Object.keys(customerInfo.entitlements.active).length > 0;
      
      return {
        success: true,
        isActive: hasActiveSubscription,
      };
    } catch (error) {
      const purchasesError = error as PurchasesError;
      return {
        success: false,
        isActive: false,
        error: purchasesError.message || 'Failed to restore purchases',
      };
    }
  }

  /**
   * Check if user is eligible for free trial
   */
  async isEligibleForTrial(): Promise<boolean> {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      
      // If user has never purchased, they're eligible for trial
      return Object.keys(customerInfo.allPurchaseDates).length === 0;
    } catch (error) {
      console.error('Failed to check trial eligibility:', error);
      return true; // Default to eligible if we can't check
    }
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService(); 