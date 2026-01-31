# Dream Alchemy - Project Summary & Current State

## 📋 Project Overview

**Dream Alchemy** is a mobile application that provides AI-powered dream analysis using Jungian psychology principles. The app helps users interpret their dreams, identify symbols and archetypes, track dream patterns, and learn about dream psychology.

**Current Version:** 1.0.3 (Build 16)  
**Status:** Production-ready, preparing for App Store submission  
**Branch:** `production`  
**Last Commit:** `d2abab4` - "refactor: remove debug code for production release"

---

## 🎯 Core Features

### 1. **Dream Analysis**
- Text and voice-to-text dream input
- AI-powered analysis using OpenAI GPT-4o
- Jungian psychology-based interpretations
- Symbol identification and meaning
- Archetype recognition
- Detailed analysis results with confidence scores

### 2. **Dream Dictionary**
- Comprehensive symbol dictionary (1000+ symbols)
- Search functionality
- Symbol detail pages with meanings
- Category-based browsing

### 3. **Dream History**
- Save and review past dreams
- Pattern tracking over time
- Recurring symbols and themes identification
- Emotion distribution charts
- Dream activity statistics

### 4. **Explore Section**
- **Dream Psychology Hub**: Educational content on:
  - Scientific perspectives on dreams
  - Psychological theories (Jung, Freud, etc.)
  - Dream types and categories
  - Cultural perspectives
- **Dream Techniques**: 
  - Lucid dreaming techniques
  - Dream recall enhancement
  - Meditation and visualization guides
- **Dream Patterns**: Advanced pattern analysis and visualization

### 5. **Subscription System**
- Free trial: 3 dream analyses + 7 days
- Monthly subscription: $7.99/month
- Annual subscription: $59.99/year (37% savings)
- RevenueCat integration for subscription management
- Trial tracking and paywall implementation

---

## 🛠 Tech Stack

### **Frontend Framework**
- **React Native** 0.79.4
- **Expo SDK** ~53.0.0
- **Expo Router** ~5.1.1 (file-based routing)
- **TypeScript** ~5.8.3
- **React** 19.0.0

### **Key Libraries**
- **Navigation**: `@react-navigation/native`, `@react-navigation/bottom-tabs`
- **State Management**: React hooks, AsyncStorage
- **AI Integration**: OpenAI API (GPT-4o)
- **Voice Recognition**: `@react-native-voice/voice`
- **Subscriptions**: `react-native-purchases` (RevenueCat)
- **UI Components**: 
  - `react-native-paper` (Material Design)
  - `expo-linear-gradient`
  - `react-native-chart-kit` (for pattern visualization)
- **Storage**: `@react-native-async-storage/async-storage`
- **Error Tracking**: `@sentry/react-native`
- **Development**: `expo-dev-client` for custom native modules

### **Platform Support**
- ✅ iOS (Primary - production ready)
- ⏳ Android (configured but not fully tested)
- ⏳ Web (basic support)

---

## 📁 Project Structure

```
DreamAlchemy/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout
│   ├── (tabs)/                  # Tab navigation screens
│   │   ├── index.tsx            # Home/Dream Input
│   │   ├── dictionary.tsx      # Symbol Dictionary
│   │   ├── history.tsx         # Dream History
│   │   ├── explore.tsx         # Explore Hub
│   │   └── technique/[id].tsx  # Technique detail pages
│   ├── category/[id].tsx       # Category detail
│   └── symbol/[id].tsx         # Symbol detail
│
├── src/
│   ├── components/             # Reusable components
│   │   ├── DreamAnalysis.tsx   # Analysis results display
│   │   ├── DreamInput.tsx      # Dream entry form
│   │   ├── DreamHistory.tsx   # History list component
│   │   ├── DreamPatterns.tsx  # Pattern visualization
│   │   ├── dictionary/         # Dictionary components
│   │   ├── psychology/         # Psychology content components
│   │   ├── dream-techniques/   # Technique components
│   │   └── ui/                 # UI primitives (buttons, cards, etc.)
│   │
│   ├── services/               # Business logic
│   │   ├── dreamAnalysis.ts    # OpenAI API integration
│   │   ├── subscriptions.ts    # RevenueCat integration
│   │   ├── trialTracking.ts    # Trial management
│   │   └── voiceRecognition.ts # Voice-to-text
│   │
│   ├── data/                   # Static data
│   │   └── dreamSymbols.ts     # Symbol database
│   │
│   ├── types/                  # TypeScript definitions
│   ├── utils/                  # Utilities (storage, helpers, theme)
│   ├── hooks/                  # Custom React hooks
│   └── providers/              # Context providers (Theme)
│
├── api/                        # API routes (if using Expo API routes)
│   └── analyze-dream.js
│
├── assets/                     # Images, fonts, icons
├── components/                 # Legacy components (from Expo template)
├── constants/                  # App constants
├── hooks/                      # Legacy hooks
├── docs/                       # Legal documents (HTML)
│   ├── privacy-policy.html
│   └── terms-of-service.html
│
├── notes/                      # Planning documents
├── scripts/                    # Build scripts
│   └── reset-project.js
│
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
```

---

## 🔐 Environment & Configuration

### **Required Environment Variables**
```env
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### **OpenAI API Key Implementation**

The app uses a **dual-mode approach** for OpenAI API calls:

#### **Production Mode (Default)**
- **Flow**: Client → Vercel Edge Function → OpenAI API
- **Key Storage**: Server-side environment variable (`OPENAI_API_KEY`) on Vercel
- **Endpoint**: `https://dream-analysis-navneethsudheer-gmailcoms-projects.vercel.app/api/analyze-dream`
- **Implementation**: `api/analyze-dream.js` (Vercel Edge Function)
- **Security**: API key never exposed to client; stored securely on Vercel

#### **Development Mode (Optional)**
- **Flow**: Client → OpenAI API (direct)
- **Key Storage**: Client-side environment variable (`EXPO_PUBLIC_OPENAI_API_KEY`)
- **Activation**: Set `EXPO_PUBLIC_USE_LOCAL_API=true` in environment
- **Implementation**: `src/services/dreamAnalysis.ts` → `analyzeWithLocalAPI()`
- **Use Case**: Local development/testing without Vercel dependency

#### **Routing Logic** (`src/services/dreamAnalysis.ts`)
```typescript
if (USE_LOCAL_API && OPENAI_API_KEY) {
  // Use local OpenAI API for development
  analysisData = await analyzeWithLocalAPI(dreamText);
} else {
  // Use Vercel proxy for production (default)
  analysisData = await analyzeWithVercelProxy(dreamText);
}
```

#### **Key Points**
- **Default behavior**: Always uses Vercel proxy (production-safe)
- **Model**: `gpt-4o-mini` (used in both modes)
- **Error handling**: Falls back to error message if API call fails
- **No hardcoded keys**: All keys come from environment variables

### **RevenueCat Configuration**
- **iOS API Key**: `appl_paiNLobQQfBhyxvwASGMzDAkoFL` (configured)
- **Android API Key**: Placeholder (not yet configured)
- **Product IDs**:
  - Monthly: `dreamAlchemy_monthly`
  - Annual: `dreamAlchemy_annual`

### **App Store Connect**
- **Bundle ID**: `com.navford.DreamAlchemy`
- **App Store ID**: `6743727774`
- **Apple Team ID**: `FQTZY686NM`
- **Apple ID**: `navneet.sudheer@gmail.com`

---

## ✅ Current Status

### **Completed Features**
- ✅ Core dream analysis functionality
- ✅ Voice-to-text input
- ✅ Dream history and storage
- ✅ Symbol dictionary (1000+ symbols)
- ✅ Dream pattern tracking and visualization
- ✅ Subscription system with RevenueCat
- ✅ Trial tracking (3 analyses + 7 days)
- ✅ Paywall implementation
- ✅ Explore section with psychology content
- ✅ Dream techniques library
- ✅ Error handling and loading states
- ✅ Dark mode support
- ✅ Legal documents (Privacy Policy, Terms of Service)
- ✅ App Store description and marketing copy

### **Recent Changes** (Last 10 commits)
1. `d2abab4` - refactor: remove debug code for production release
2. `f815374` - feat: working TestFlight paywall with RevenueCat integration
3. `ee21973` - Fix package selection to use product.identifier
4. `41082b3` - Remove __DEV__ guards for TestFlight testing
5. `ebe2176` - Add expo-dev-client for development builds
6. `d48ea31` - Add comprehensive subscription debugging system
7. `3442dac` - Fix: Change debug trigger from close button to title tap
8. `16ffa54` - Fix: Remove Flipper dependency causing build failure
9. `4672ba0` - v1.0.1: Add comprehensive debugging features
10. `226c679` - Update subscription product IDs to match RevenueCat

### **Known Issues**

#### **iOS Development Build Crash (Current Issue)**
- ⚠️ **Status**: Workaround applied (reset to production branch)
- **Problem**: iOS development builds crash on simulator with `keyWindow` error
  - Error: `Fatal error: Cannot find the keyWindow. Make sure to call window.makeKeyAndVisible()`
  - Occurs in `ExpoDevLauncherAppDelegateSubscriber.swift:8`
  - Related to Expo Dev Client initialization order (`autoSetupStart` vs `autoSetupPrepare`)
- **Root Cause**: Window initialization timing issue with Expo Dev Client and Swift AppDelegate
- **Current State**: Production branch doesn't include iOS native code (no crash, but can't build iOS)
- **Impact**: Cannot currently build/test iOS development builds locally
- **Next Steps**: 
  - Need to properly configure `AppDelegate.swift` with correct initialization order
  - Window must be created and made key/visible before Expo Dev Client accesses it
  - Consider using EAS Build for iOS instead of local builds

#### **Other Issues**
- ⚠️ Android not fully tested
- ⚠️ Some debug code may need cleanup before App Store submission
- ⚠️ iOS native code needs to be regenerated/reconfigured for local development builds

### **Pending Tasks** (From FINAL_LAUNCH_CHECKLIST.md)
- 🔴 **Critical**: RevenueCat production testing
- 🔴 **Critical**: App Store Connect subscription product setup
- 🟠 **High**: App Store screenshots (5 required)
- 🟠 **High**: App preview video (optional but recommended)
- 🟡 **Medium**: Legal document hosting (GitHub Pages or similar)
- 🟡 **Medium**: Final App Store submission

---

## 🚀 Build & Deployment

### **Build Profiles** (from eas.json)
- **Development**: Development client with simulator support
- **Preview**: Internal distribution builds
- **Production**: App Store builds with auto-increment

### **Build Commands**
```bash
# Development
npx expo run:ios --device "iPhone 15 Pro Max"

# Production build
eas build --profile production --platform ios

# Submit to App Store
eas submit --platform ios --profile production
```

### **Development Setup**
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android
npx expo run:android
```

---

## 📊 Architecture Highlights

### **Navigation**
- Uses Expo Router (file-based routing)
- Tab-based navigation for main sections
- Stack navigation for detail screens
- Deep linking support via `expo-linking`

### **State Management**
- React hooks for local state
- AsyncStorage for persistent data (dreams, trial status)
- Context API for theme management
- RevenueCat SDK for subscription state

### **API Integration**
- **OpenAI GPT-4o**: Dream analysis (see "OpenAI API Key Implementation" section above for details)
- **RevenueCat**: Subscription management
- **Error handling**: Sentry integration

### **Data Flow**
1. User inputs dream (text or voice)
2. Dream sent to OpenAI API via `dreamAnalysis.ts`
3. Analysis results displayed with symbols and archetypes
4. Results saved to AsyncStorage
5. Pattern tracking updates based on saved dreams
6. Subscription check before analysis (if trial expired)

---

## 🎨 UI/UX Features

- **Material Design** components via `react-native-paper`
- **Dark mode** support (automatic based on system)
- **Haptic feedback** for interactions
- **Smooth animations** with `react-native-reanimated`
- **Loading states** and error boundaries
- **Accessibility** considerations

---

## 📱 App Store Information

### **App Details**
- **Name**: Dream Alchemy - AI Dream Analysis
- **Subtitle**: Free Trial, Then $7.99/month
- **Category**: Health & Fitness (Primary), Education (Secondary)
- **Content Rating**: 4+ (No objectionable content)
- **Description**: See `APP_STORE_DESCRIPTION.md` for full copy

### **Pricing**
- **Free Trial**: 3 dream analyses + 7 days
- **Monthly**: $7.99/month
- **Annual**: $59.99/year (37% savings)

### **Permissions**
- Microphone (for voice input)
- Speech Recognition (for transcription)
- Photo Library (for saving/sharing insights)

---

## 🔍 Testing Status

### **Tested**
- ✅ Core dream analysis flow
- ✅ Subscription paywall display
- ✅ Trial tracking logic
- ✅ Dream history saving/loading
- ✅ Symbol dictionary navigation
- ✅ Pattern visualization

### **Needs Testing**
- ⏳ RevenueCat purchase flow (sandbox)
- ⏳ Restore purchases functionality
- ⏳ Android build and functionality
- ⏳ Network error handling
- ⏳ Edge cases (empty states, large datasets)

---

## 📚 Documentation

### **Available Documentation**
- `README.md` - Basic setup and usage
- `APP_STORE_DESCRIPTION.md` - App Store copy and keywords
- `FINAL_LAUNCH_CHECKLIST.md` - Pre-launch tasks
- `FINAL_SUBMISSION_CHECKLIST.md` - Submission checklist
- `SUBSCRIPTION_SETUP_GUIDE.md` - RevenueCat setup guide
- `SUBSCRIPTION_DEBUGGING_GUIDE.md` - Debugging subscription issues
- `PRIVACY_POLICY.md` - Privacy policy content
- `TERMS_OF_SERVICE.md` - Terms of service content

### **Planning Documents** (in `notes/`)
- `dream_psychology_roadmap.md`
- `dream_techniques_roadmap.md`
- `dream_patterns_roadmap.md`
- `explore_dreams_roadmap.md`
- `pricing_strategy_and_revenue_implementation.md`
- `revenuecat_implementation_plan.md`
- `simple_launch_strategy.md`

---

## 🎯 Next Steps

### **Immediate (Before Submission)**
1. Complete RevenueCat production testing
2. Set up App Store Connect subscription products
3. Create App Store screenshots (5 required)
4. Host legal documents (Privacy Policy, Terms)
5. Final code review and cleanup

### **Post-Launch**
1. Monitor subscription conversions
2. Gather user feedback
3. Implement analytics tracking
4. Plan feature updates based on usage data
5. Android release preparation

---

## 💡 Key Technical Decisions

1. **Expo Router**: Chosen for file-based routing simplicity
2. **RevenueCat**: Selected for subscription management (handles App Store/Play Store complexity)
3. **OpenAI GPT-4o**: Provides high-quality dream analysis
4. **AsyncStorage**: Simple local storage for MVP (may migrate to SQLite for scale)
5. **Expo Dev Client**: Required for native modules (voice recognition, RevenueCat)

---

## 🔗 External Dependencies

- **OpenAI API**: Dream analysis
- **RevenueCat**: Subscription management
- **Sentry**: Error tracking
- **Expo EAS**: Build and submission service

---

## 📝 Notes for Claude Code

### **Important Context**
- This is a production-ready app preparing for App Store submission
- The codebase is clean and well-structured
- Subscription system is implemented but needs final testing
- iOS is the primary platform; Android support is configured but not fully tested

### **Common Tasks**
- Adding new symbols to dictionary: Edit `src/data/dreamSymbols.ts`
- Modifying subscription logic: See `src/services/subscriptions.ts`
- Updating analysis prompts: See `src/services/dreamAnalysis.ts` (both local and Vercel proxy modes)
- Modifying OpenAI API configuration: See "OpenAI API Key Implementation" section above
- Adding new screens: Create files in `app/` directory (Expo Router)

### **Debugging**
- Subscription issues: See `SUBSCRIPTION_DEBUGGING_GUIDE.md`
- Debug panel available (tap title on some screens in dev mode)
- Sentry integration for production error tracking

### **Current Development Issue**
- **iOS Simulator Crash**: The app crashes on iOS simulator with keyWindow error when using development builds
- **Error Details**: `Fatal error: Cannot find the keyWindow` in `ExpoDevLauncherAppDelegateSubscriber.swift:8`
- **Root Cause**: Expo Dev Client initialization order issue - window must be created and made key/visible before `autoSetupStart` is called
- **Workaround**: Use EAS Build for iOS instead of local `expo run:ios`, or use Expo Go for basic testing (limited functionality)
- **To Fix**: Need to properly configure `AppDelegate.swift` with correct window initialization order for Expo Dev Client
- **Current State**: Production branch doesn't include iOS native code (reset to avoid crash), so local iOS builds aren't possible until fixed

---

**Last Updated**: January 18, 2025  
**Branch**: `production`  
**Status**: Ready for final testing and App Store submission (iOS development builds blocked by keyWindow issue)
