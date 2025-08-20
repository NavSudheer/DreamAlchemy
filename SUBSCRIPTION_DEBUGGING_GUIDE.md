# Subscription Debugging Guide

## Overview

This guide implements the comprehensive debugging solution suggested by ChatGPT-5 for diagnosing subscription paywall issues. The debugging system helps identify whether the problem is on the App Store Connect side or the RevenueCat configuration side.

## 🚨 PRODUCTION SAFETY

**All debugging features are automatically disabled in production builds:**
- Debug panel activation is blocked (`__DEV__` check)
- Debug methods return early with "development only" errors
- Debug logging is disabled in production
- Verbose RevenueCat logging only enabled in development

This ensures your production app has no debugging overhead or security concerns.

## What's Been Implemented

### ✅ Step 1: Enable Verbose Logs & Product Identifier Validation
- **Location**: `src/services/subscriptions.ts` - `debugStep1_CheckProductIdentifiers()`
- **What it does**: 
  - Enables verbose RevenueCat logging (always on for debugging)
  - Checks for valid offerings and packages
  - Logs detailed product information
  - Identifies missing or invalid product identifiers

### ✅ Step 2: Direct StoreKit Probe (Bypassing RevenueCat)
- **Location**: `src/services/subscriptions.ts` - `debugStep2_DirectStoreKitProbe()`
- **What it does**:
  - Tests if products `dreamAlchemy_monthly` and `dreamAlchemy_annual` are available
  - Bypasses RevenueCat to test direct App Store Connect configuration
  - Identifies whether the issue is App Store Connect vs RevenueCat mapping

### ✅ Step 3: Country & Availability Checks
- **Location**: `src/services/subscriptions.ts` - `debugStep3_CountryAvailabilityCheck()`
- **What it does**:
  - Analyzes customer info and region settings
  - Provides recommendations for sandbox account configuration
  - Helps identify territory/region availability issues

### ✅ Step 4: Device & Account Reset Instructions
- **Location**: `src/components/debug/DebugPanel.tsx` - `showDeviceResetInstructions()`
- **What it provides**:
  - Step-by-step device reset instructions
  - Sandbox account sign-out/sign-in process
  - App deletion and reinstallation guide
  - Device reboot instructions to flush StoreKit cache

### ✅ Step 5: App-Level Prerequisites Validation
- **Location**: `src/components/debug/DebugPanel.tsx` - `showAppPrerequisites()`
- **What it checks**:
  - Bundle ID matches App Store Connect
  - In-App Purchases capability enabled
  - Provisioning profile includes IAP
  - Agreements, Tax, and Banking are Active
  - Products are in "Ready to Submit" status

### ✅ Step 6: RevenueCat Configuration Sanity Check
- **Location**: `src/services/subscriptions.ts` - `debugStep6_RevenueCatSanityCheck()`
- **What it validates**:
  - API key format (`appl_...` for iOS, `goog_...` for Android)
  - Offerings configuration
  - Product ID mapping between App Store Connect and RevenueCat
  - Current offering assignment

### ✅ Comprehensive Debug Runner
- **Location**: `src/services/subscriptions.ts` - `runAllDebuggingSteps()`
- **What it does**:
  - Runs all debugging steps in sequence
  - Provides a summary of passed/failed steps
  - Collects all recommendations in one place

## How to Use the Debugging System

> **Note**: Debug features are only available in development builds. In production, the debug panel won't activate and all debug methods are disabled.

### 1. Access the Debug Panel (Development Only)
1. Open the subscription paywall in your app
2. Tap the "Unlock Premium" title **7 times** to activate debug mode
3. The debug panel will appear

### 2. Run the Debug Steps

#### Option A: Run All Steps at Once
- Tap **"🚀 Run All Debug Steps"** (orange button)
- This will run all 6 debugging steps automatically
- Shows a summary at the end with pass/fail count

#### Option B: Run Individual Steps
- **Step 1: Product IDs** - Check RevenueCat product configuration
- **Step 2: StoreKit** - Test direct App Store Connect availability
- **Step 3: Country** - Verify region and availability settings
- **Step 4: Reset Guide** - Show device/account reset instructions
- **Step 5: Prerequisites** - Display app-level checklist
- **Step 6: RC Config** - Validate RevenueCat configuration

### 3. Interpret the Results

#### If Step 2 returns "invalidProductIdentifiers"
- **Problem**: App Store Connect configuration
- **Next steps**:
  1. Check product status in App Store Connect
  2. Verify pricing and availability settings
  3. Ensure products are in "Ready to Submit" status
  4. Check territory availability for sandbox account region

#### If Step 2 returns products with prices
- **Problem**: RevenueCat mapping/offerings issue
- **Next steps**:
  1. Verify product IDs match exactly between ASC and RevenueCat
  2. Check offering configuration in RevenueCat dashboard
  3. Ensure current offering is set
  4. Verify packages are mapped to correct products

### 4. Check the Logs
- All debugging results are logged in the debug panel
- Tap **"Export Logs"** to share detailed information
- Look for specific error messages and recommendations

## Key Files Modified

1. **`src/services/subscriptions.ts`**
   - Added verbose logging (always enabled for debugging)
   - Added 6 comprehensive debugging methods
   - Enhanced error reporting and analysis

2. **`src/components/debug/DebugPanel.tsx`**
   - Added buttons for all debugging steps
   - Added device reset and prerequisites instructions
   - Enhanced UI with color-coded buttons

## Expected Debug Flow

1. **Run All Debug Steps** to get a complete overview
2. **Check the summary** to see which steps passed/failed
3. **Focus on failed steps** for targeted troubleshooting
4. **Follow recommendations** provided by each step
5. **Export logs** if you need to share with support

## Troubleshooting Quick Reference

| Issue | Most Likely Cause | First Step |
|-------|------------------|------------|
| No products found | App Store Connect config | Run Step 2, check ASC product status |
| Products found but paywall fails | RevenueCat mapping | Run Step 6, verify offering config |
| "Service unavailable" | API keys or network | Run Step 6, check initialization |
| Regional issues | Sandbox account territory | Run Step 3, check country settings |

## Next Steps After Debugging

1. **Save the debug logs** before making changes
2. **Address issues** based on the recommendations
3. **Re-run the debug steps** after making fixes
4. **Test the paywall** in a clean environment (reset device if needed)

The debugging system will help you quickly identify whether the issue is on the App Store Connect side (product configuration, pricing, availability) or the RevenueCat side (API keys, offerings, product mapping).
