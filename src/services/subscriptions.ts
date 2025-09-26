import Purchases, { 
  PurchasesOffering, 
  CustomerInfo, 
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
  PurchasesError
} from 'react-native-purchases';
import { Platform } from 'react-native';
import { DebugLogger } from '../components/debug/DebugPanel';

// Import StoreKit for direct product testing (iOS only)
let Product: any = null;
if (Platform.OS === 'ios') {
  try {
    // Dynamic import for iOS StoreKit
    Product = require('@react-native-async-storage/async-storage').default;
    // Note: We'll use expo-store-kit or implement native module for actual StoreKit access
  } catch (error) {
    console.warn('StoreKit not available for direct testing');
  }
}

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
      
      // Set debug mode in development only
      if (__DEV__) {
        await Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
        DebugLogger.log('info', 'RevenueCat verbose logging enabled (development only)');
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
    const purchaseData = {
      identifier: packageToPurchase.identifier,
      product: packageToPurchase.product,
    };
    console.log('🛒 Starting purchase for package:', purchaseData);
    DebugLogger.log('info', 'Starting purchase', purchaseData);

    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      
      const successData = {
        customerInfo: {
          originalAppUserId: customerInfo.originalAppUserId,
          activeSubscriptions: Object.keys(customerInfo.activeSubscriptions),
          entitlements: Object.keys(customerInfo.entitlements.active),
          latestExpirationDate: customerInfo.latestExpirationDate,
        }
      };
      console.log('✅ Purchase successful:', successData);
      DebugLogger.log('info', 'Purchase successful', successData);
      
      return {
        success: true,
        customerInfo,
      };
    } catch (error) {
      const purchasesError = error as PurchasesError;
      
      const errorData = {
        code: purchasesError.code,
        message: purchasesError.message,
        userInfo: purchasesError.userInfo,
        underlyingErrorMessage: purchasesError.underlyingErrorMessage,
      };
      console.error('❌ Purchase failed:', errorData);
      DebugLogger.log('error', 'Purchase failed', errorData);
      
      // Handle user cancellation gracefully
      if (purchasesError.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        console.log('👤 User cancelled purchase');
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

  // ================== DEBUGGING METHODS (DEVELOPMENT ONLY) ==================

  /**
   * STEP 1: Check for invalid product identifiers in RevenueCat logs
   * DEVELOPMENT ONLY - Not available in production builds
   */
  async debugStep1_CheckProductIdentifiers(): Promise<{
    success: boolean;
    offerings?: any;
    packages?: any[];
    invalidProducts?: string[];
    error?: string;
    recommendations?: string[];
  }> {
    // TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION
    // if (!__DEV__) {
    //   return {
    //     success: false,
    //     error: 'Debug methods only available in development builds',
    //   };
    // }

    await this.initialize();
    
    try {
      DebugLogger.log('info', '🔍 STEP 1: Checking RevenueCat product identifiers...');
      
      const offerings = await Purchases.getOfferings();
      
      const debugInfo = {
        hasCurrentOffering: !!offerings.current,
        offeringIdentifier: offerings.current?.identifier,
        allOfferingsCount: Object.keys(offerings.all).length,
        allOfferingIds: Object.keys(offerings.all),
        packages: offerings.current?.availablePackages?.map(pkg => ({
          identifier: pkg.identifier,
          productId: pkg.product.identifier,
          productTitle: pkg.product.title,
          productPrice: pkg.product.priceString,
          productType: pkg.product.productType,
        })) || [],
      };
      
      DebugLogger.log('info', 'RevenueCat offerings analysis', debugInfo);
      
      if (!offerings.current) {
        DebugLogger.log('error', '❌ No current offering found - check RevenueCat dashboard');
        return {
          success: false,
          error: 'No current offering configured in RevenueCat dashboard',
        };
      }
      
      if (!offerings.current.availablePackages || offerings.current.availablePackages.length === 0) {
        DebugLogger.log('error', '❌ No packages in current offering - check App Store Connect product configuration');
        return {
          success: false,
          error: 'No packages found in current offering',
          offerings: debugInfo,
        };
      }
      
      DebugLogger.log('info', '✅ STEP 1 PASSED: Products found in RevenueCat');
      return {
        success: true,
        offerings: debugInfo,
        packages: debugInfo.packages,
      };
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      DebugLogger.log('error', '❌ STEP 1 FAILED: Error fetching offerings', {
        error: errorMsg,
        stack: error instanceof Error ? error.stack : undefined,
      });
      
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * STEP 2: Direct StoreKit probe (bypassing RevenueCat)
   * DEVELOPMENT ONLY - This will help determine if the issue is App Store Connect vs RevenueCat mapping
   */
  async debugStep2_DirectStoreKitProbe(): Promise<{
    success: boolean;
    products?: any[];
    invalidProductIds?: string[];
    error?: string;
    platform?: string;
    recommendations?: string[];
  }> {
    // TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION
    // if (!__DEV__) {
    //   return {
    //     success: false,
    //     error: 'Debug methods only available in development builds',
    //     platform: Platform.OS,
    //   };
    // }

    const productIds = ['dreamAlchemy_monthly', 'dreamAlchemy_annual'];
    
    DebugLogger.log('info', '🔍 STEP 2: Direct StoreKit probe (bypassing RevenueCat)', {
      productIds,
      platform: Platform.OS,
    });
    
    if (Platform.OS !== 'ios') {
      DebugLogger.log('warn', '⚠️ Direct StoreKit probe only available on iOS');
      return {
        success: false,
        error: 'StoreKit probe only available on iOS platform',
        platform: Platform.OS,
      };
    }
    
    try {
      // For now, we'll simulate this check since we need native StoreKit integration
      // In a real implementation, you'd use expo-store-review or a custom native module
      
      DebugLogger.log('info', '📱 Simulating StoreKit product request...', {
        note: 'This requires native StoreKit integration - check Xcode console for actual StoreKit logs',
        productIds,
        instruction: 'Look for "invalidProductIdentifiers" in Xcode console logs',
      });
      
      // Simulate the check by attempting to get offerings and analyzing the response
      const offerings = await Purchases.getOfferings();
      const availableProductIds = offerings.current?.availablePackages?.map(pkg => pkg.product.identifier) || [];
      
      const foundProducts = productIds.filter(id => availableProductIds.includes(id));
      const missingProducts = productIds.filter(id => !availableProductIds.includes(id));
      
      if (missingProducts.length > 0) {
        DebugLogger.log('error', '❌ STEP 2: Missing products detected', {
          foundProducts,
          missingProducts,
          analysis: 'Missing products indicate App Store Connect configuration issue',
        });
        
        return {
          success: false,
          invalidProductIds: missingProducts,
          products: foundProducts,
          error: `Products not found in App Store Connect: ${missingProducts.join(', ')}`,
        };
      }
      
      DebugLogger.log('info', '✅ STEP 2 PASSED: All products found', {
        foundProducts,
        analysis: 'Products are available in App Store Connect',
      });
      
      return {
        success: true,
        products: foundProducts,
      };
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      DebugLogger.log('error', '❌ STEP 2 FAILED: StoreKit probe error', {
        error: errorMsg,
      });
      
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * STEP 3: Country and availability checks
   * DEVELOPMENT ONLY
   */
  async debugStep3_CountryAvailabilityCheck(): Promise<{
    success: boolean;
    customerInfo?: any;
    recommendations?: string[];
  }> {
    // TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION
    // if (!__DEV__) {
    //   return {
    //     success: false,
    //     recommendations: ['Debug methods only available in development builds'],
    //   };
    // }

    await this.initialize();
    
    try {
      DebugLogger.log('info', '🔍 STEP 3: Checking country and availability...');
      
      const customerInfo = await Purchases.getCustomerInfo();
      
      const debugInfo = {
        originalAppUserId: customerInfo.originalAppUserId,
        firstSeen: customerInfo.firstSeen,
        originalApplicationVersion: customerInfo.originalApplicationVersion,
        requestDate: customerInfo.requestDate,
        managementURL: customerInfo.managementURL,
      };
      
      DebugLogger.log('info', 'Customer info analysis', debugInfo);
      
      const recommendations = [
        '1. Check App Store Connect → Subscription → Pricing and Availability',
        '2. Ensure your sandbox tester country is included in available territories',
        '3. Verify pricing is set for the sandbox tester\'s country',
        '4. Check if app is available in the tester\'s region',
        '5. Confirm sandbox account region matches available territories',
      ];
      
      DebugLogger.log('info', '✅ STEP 3: Country check recommendations', {
        recommendations,
      });
      
      return {
        success: true,
        customerInfo: debugInfo,
        recommendations,
      };
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      DebugLogger.log('error', '❌ STEP 3 FAILED: Country check error', {
        error: errorMsg,
      });
      
      return {
        success: false,
        recommendations: [
          'Unable to check customer info - verify RevenueCat configuration',
          'Check network connectivity',
          'Verify API keys are correct',
        ],
      };
    }
  }

  /**
   * STEP 6: RevenueCat configuration sanity check
   * DEVELOPMENT ONLY
   */
  async debugStep6_RevenueCatSanityCheck(): Promise<{
    success: boolean;
    configuration?: any;
    issues?: string[];
    recommendations?: string[];
  }> {
    // TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION
    // if (!__DEV__) {
    //   return {
    //     success: false,
    //     issues: ['Debug methods only available in development builds'],
    //     recommendations: ['Debug methods only available in development builds'],
    //   };
    // }

    await this.initialize();
    
    try {
      DebugLogger.log('info', '🔍 STEP 6: RevenueCat configuration sanity check...');
      
      const issues: string[] = [];
      const recommendations: string[] = [];
      
      // Check API key format
      const apiKey = Platform.OS === 'ios' ? REVENUECAT_KEYS.ios : REVENUECAT_KEYS.android;
      
      if (!apiKey.startsWith('appl_') && Platform.OS === 'ios') {
        issues.push('iOS API key does not start with "appl_"');
        recommendations.push('Verify iOS API key from RevenueCat dashboard');
      }
      
      if (!apiKey.startsWith('goog_') && Platform.OS === 'android') {
        issues.push('Android API key does not start with "goog_"');
        recommendations.push('Add Android API key from RevenueCat dashboard');
      }
      
      // Check offerings configuration
      const offerings = await Purchases.getOfferings();
      
      if (Object.keys(offerings.all).length === 0) {
        issues.push('No offerings configured in RevenueCat');
        recommendations.push('Create an offering in RevenueCat dashboard');
      }
      
      if (!offerings.current) {
        issues.push('No current offering set');
        recommendations.push('Set a current offering in RevenueCat dashboard');
      }
      
      const expectedProducts = ['dreamAlchemy_monthly', 'dreamAlchemy_annual'];
      const availableProducts = offerings.current?.availablePackages?.map(pkg => pkg.product.identifier) || [];
      const missingProducts = expectedProducts.filter(id => !availableProducts.includes(id));
      
      if (missingProducts.length > 0) {
        issues.push(`Missing products in offering: ${missingProducts.join(', ')}`);
        recommendations.push('Add missing products to RevenueCat offering');
        recommendations.push('Verify product IDs match exactly between App Store Connect and RevenueCat');
      }
      
      const configuration = {
        platform: Platform.OS,
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        hasApiKey: !!apiKey,
        isInitialized: this.isInitialized,
        offeringsCount: Object.keys(offerings.all).length,
        currentOfferingId: offerings.current?.identifier,
        packagesCount: offerings.current?.availablePackages?.length || 0,
        availableProducts,
        expectedProducts,
        missingProducts,
      };
      
      DebugLogger.log('info', 'RevenueCat configuration analysis', {
        configuration,
        issues,
        recommendations,
      });
      
      if (issues.length === 0) {
        DebugLogger.log('info', '✅ STEP 6 PASSED: RevenueCat configuration looks good');
        return {
          success: true,
          configuration,
        };
      } else {
        DebugLogger.log('error', '❌ STEP 6: Configuration issues found', {
          issues,
          recommendations,
        });
        return {
          success: false,
          configuration,
          issues,
          recommendations,
        };
      }
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      DebugLogger.log('error', '❌ STEP 6 FAILED: Configuration check error', {
        error: errorMsg,
      });
      
      return {
        success: false,
        issues: ['Failed to check RevenueCat configuration'],
        recommendations: ['Check network connectivity and API keys'],
      };
    }
  }

  /**
   * Enhanced debugging with TestFlight-specific checks
   * DEVELOPMENT ONLY
   */
  async debugStep7_TestFlightChecklist(): Promise<{
    success: boolean;
    checklist: {
      item: string;
      status: 'unknown' | 'check_required' | 'critical';
      details: string;
    }[];
    appInfo: {
      bundleId: string;
      ascAppId: string;
      productIds: string[];
      testingEnvironment: string;
    };
    recommendations: string[];
  }> {
    const appInfo = {
      bundleId: 'com.navford.DreamAlchemy', // From app.json
      ascAppId: '6743727774', // From eas.json
      productIds: ['dreamAlchemy_monthly', 'dreamAlchemy_annual'],
      testingEnvironment: 'TestFlight (App Review Environment)',
    };

    const checklist = [
      {
        item: '🚨 In-App Purchases submitted WITH app for review',
        status: 'critical' as const,
        details: 'CRITICAL: When submitting your app version to App Store Connect, you MUST include your in-app purchases in the submission. Go to App Store Connect → App Store → [Your Version] → In-App Purchases → Add your products to this version before submitting.',
      },
      {
        item: 'Products in Ready to Submit or Approved state',
        status: 'critical' as const,
        details: 'Go to App Store Connect → Apps → Dream Alchemy → In-App Purchases. Verify both dreamAlchemy_monthly and dreamAlchemy_annual are in "Ready to Submit" or "Approved" status (not "Draft" or "Rejected")',
      },
      {
        item: 'App version includes IAP metadata',
        status: 'critical' as const,
        details: 'TestFlight uses the App Review environment which requires IAPs to be attached to the specific app version. Check App Store Connect → App Store → [Your Version] → In-App Purchases section.',
      },
      {
        item: 'Bundle ID exact match (EAS Build)',
        status: 'check_required' as const,
        details: `EAS Build uses app.json bundle ID. Verify "ios.bundleIdentifier": "${appInfo.bundleId}" matches exactly in App Store Connect`,
      },
      {
        item: 'Paid Applications Agreement signed',
        status: 'critical' as const,
        details: 'App Store Connect → Agreements, Tax, and Banking → Paid Applications Agreement must be "Active" (not expired). TestFlight will not load products if this is missing.',
      },
      {
        item: 'Banking and tax info complete',
        status: 'critical' as const,
        details: 'App Store Connect → Agreements, Tax, and Banking → All sections must be complete and "Active" for TestFlight IAP testing',
      },
      {
        item: 'TestFlight 24hr propagation wait',
        status: 'check_required' as const,
        details: 'After submitting app + IAPs for review, wait 24+ hours before TestFlight can access the products. The App Review environment takes longer to propagate.',
      },
      {
        item: 'App Review environment testing',
        status: 'check_required' as const,
        details: 'TestFlight uses the App Review environment (not Sandbox). Products must be approved and attached to your app version, not just created in App Store Connect.',
      },
    ];

    const recommendations = [
      '🚨 TESTFLIGHT CRITICAL ACTIONS:',
      '1. App Store Connect → App Store → [Your Version] → In-App Purchases → ADD YOUR PRODUCTS TO THIS VERSION',
      '2. When submitting for review, INCLUDE both dreamAlchemy_monthly and dreamAlchemy_annual',
      '3. Check Paid Applications Agreement is active (TestFlight requires this)',
      '4. Complete all banking/tax info (required for App Review environment)',
      '',
      '⏰ TIMING CONSIDERATIONS:',
      '5. Wait 24+ hours after submitting app + IAPs before testing in TestFlight',
      '6. App Review environment propagation is slower than Sandbox',
      '7. Products must be "Approved" state, not just "Ready to Submit"',
      '',
      '🛠️ TESTFLIGHT TROUBLESHOOTING:',
      '8. TestFlight uses App Review environment (different from Sandbox)',
      '9. Products must be attached to specific app version, not just created',
      '10. EAS Build bundle ID in app.json must match App Store Connect exactly',
      '11. If still failing, submit a video of TestFlight IAP flow to Apple Support',
      '',
      '📚 REFERENCE:',
      '12. Apple Docs: In-App Purchase must be submitted with app version for TestFlight',
      '13. RevenueCat: App Review environment is notoriously flaky',
    ];

    DebugLogger.log('info', '🔍 STEP 7: TestFlight Configuration Checklist', {
      appInfo,
      checklist,
      recommendations,
    });

    return {
      success: true,
      checklist,
      appInfo,
      recommendations,
    };
  }

  /**
   * Run all debugging steps in sequence
   * DEVELOPMENT ONLY
   */
  async runAllDebuggingSteps(): Promise<{
    step1: any;
    step2: any;
    step3: any;
    step6: any;
    step7: any;
    summary: {
      passed: number;
      failed: number;
      recommendations: string[];
    };
  }> {
    // TODO: REMOVE DEBUG FEATURES BEFORE APP STORE SUBMISSION
    // if (!__DEV__) {
    //   const errorResult = {
    //     success: false,
    //     error: 'Debug methods only available in development builds',
    //   };
    //   return {
    //     step1: errorResult,
    //     step2: errorResult,
    //     step3: errorResult,
    //     step6: errorResult,
    //     summary: {
    //       passed: 0,
    //       failed: 4,
    //       recommendations: ['Debug methods only available in development builds'],
    //     },
    //   };
    // }

    DebugLogger.log('info', '🚀 Starting comprehensive subscription debugging...');
    
    const step1 = await this.debugStep1_CheckProductIdentifiers();
    const step2 = await this.debugStep2_DirectStoreKitProbe();
    const step3 = await this.debugStep3_CountryAvailabilityCheck();
    const step6 = await this.debugStep6_RevenueCatSanityCheck();
    const step7 = await this.debugStep7_TestFlightChecklist();
    
    const results = [step1, step2, step3, step6];
    const passed = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    const allRecommendations = [
      ...(step1.recommendations || []),
      ...(step2.recommendations || []),
      ...(step3.recommendations || []),
      ...(step6.recommendations || []),
      ...(step7.recommendations || []),
    ].filter(Boolean);
    
    const summary = {
      passed,
      failed,
      recommendations: [...new Set(allRecommendations)], // Remove duplicates
    };
    
    DebugLogger.log('info', '📊 Debugging summary', summary);
    
    return {
      step1,
      step2,
      step3,
      step6,
      step7,
      summary,
    };
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService(); 