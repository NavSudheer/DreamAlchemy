import Purchases, { 
  PurchasesOffering, 
  CustomerInfo, 
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
  PurchasesError
} from 'react-native-purchases';
import { Platform } from 'react-native';
import { DebugLogger } from '../components/debug/DebugPanel';


// RevenueCat API Keys
const REVENUECAT_KEYS = {
  ios: 'appl_paiNLobQQfBhyxvwASGMzDAkoFL',
  android: 'goog_YOUR_ANDROID_KEY_HERE', // Add when supporting Android
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
    if (this.isInitialized) {
      DebugLogger.log('info', 'RevenueCat already initialized');
      return;
    }

    try {
      const apiKey = Platform.OS === 'ios' ? REVENUECAT_KEYS.ios : REVENUECAT_KEYS.android;
      
      DebugLogger.log('info', 'Initializing RevenueCat', {
        platform: Platform.OS,
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        hasKey: !!apiKey,
      });
      
      await Purchases.configure({
        apiKey,
        appUserID: undefined, // Optional: set user ID for cross-platform tracking
      });

      this.isInitialized = true;
      
      // Set appropriate log level
      if (__DEV__) {
        await Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
        DebugLogger.log('info', 'RevenueCat debug logging enabled');
      } else {
        await Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
      }
      
      DebugLogger.log('info', 'RevenueCat initialized successfully');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      DebugLogger.log('error', 'Failed to initialize RevenueCat', {
        error: errorMsg,
        stack: error instanceof Error ? error.stack : undefined,
      });
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
      DebugLogger.log('info', 'Fetching RevenueCat offerings...');
      const offerings = await Purchases.getOfferings();
      
      DebugLogger.log('info', 'Raw offerings response', {
        current: offerings.current?.identifier,
        all: Object.keys(offerings.all),
        currentPackages: offerings.current?.availablePackages?.length || 0,
      });
      
      if (!offerings.current) {
        DebugLogger.log('error', 'No current offering found', {
          allOfferings: Object.keys(offerings.all),
          message: 'Check RevenueCat dashboard for active offerings'
        });
        return null;
      }
      
      if (!offerings.current.availablePackages || offerings.current.availablePackages.length === 0) {
        DebugLogger.log('error', 'No packages in current offering', {
          offeringId: offerings.current.identifier,
          message: 'Check products are configured in App Store Connect and RevenueCat'
        });
        return null;
      }
      
      return offerings.current;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      DebugLogger.log('error', 'Failed to get offerings', {
        error: errorMsg,
        stack: error instanceof Error ? error.stack : undefined,
      });
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
    DebugLogger.log('info', 'Starting purchase', {
      identifier: packageToPurchase.identifier,
      productId: packageToPurchase.product.identifier,
    });

    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      
      DebugLogger.log('info', 'Purchase successful', {
        activeSubscriptions: Object.keys(customerInfo.activeSubscriptions),
        entitlements: Object.keys(customerInfo.entitlements.active),
      });
      
      return {
        success: true,
        customerInfo,
      };
    } catch (error) {
      const purchasesError = error as PurchasesError;
      
      DebugLogger.log('error', 'Purchase failed', {
        code: purchasesError.code,
        message: purchasesError.message,
      });
      
      // Handle user cancellation gracefully
      if (purchasesError.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        DebugLogger.log('info', 'Purchase cancelled by user');
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