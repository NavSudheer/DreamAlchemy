import AsyncStorage from '@react-native-async-storage/async-storage';
import { subscriptionService, SubscriptionStatus } from './subscriptions';

const TRIAL_STORAGE_KEY = 'dreamalchemy_trial_data';
const MAX_TRIAL_ANALYSES = 3;
const TRIAL_DURATION_DAYS = 7;

export interface TrialData {
  installDate: string;
  analysisCount: number;
  lastAnalysisDate?: string;
}

export interface TrialStatus {
  canUseApp: boolean;
  isSubscriptionActive: boolean;
  isInTrial: boolean;
  analysesLeft: number;
  daysLeft: number;
  hasTrialExpired: boolean;
  trialType: 'analyses' | 'time' | 'none';
}

class TrialTrackingService {
  private subscriptionStatus: SubscriptionStatus | null = null;
  private trialData: TrialData | null = null;

  /**
   * Initialize trial tracking - call this on app startup
   */
  async initialize(): Promise<void> {
    await this.loadTrialData();
    await this.updateSubscriptionStatus();
  }

  /**
   * Get current trial status
   */
  async getTrialStatus(): Promise<TrialStatus> {
    await this.initialize();
    
    // If user has active subscription, they can use everything
    if (this.subscriptionStatus?.isActive) {
      return {
        canUseApp: true,
        isSubscriptionActive: true,
        isInTrial: false,
        analysesLeft: -1, // Unlimited
        daysLeft: -1, // Unlimited
        hasTrialExpired: false,
        trialType: 'none',
      };
    }

    // Check trial limits
    const daysSinceInstall = this.getDaysSinceInstall();
    const analysesLeft = Math.max(0, MAX_TRIAL_ANALYSES - (this.trialData?.analysisCount || 0));
    const daysLeft = Math.max(0, TRIAL_DURATION_DAYS - daysSinceInstall);
    
    const hasAnalysesLeft = analysesLeft > 0;
    const hasTimeLeft = daysLeft > 0;
    const canUseApp = hasAnalysesLeft && hasTimeLeft;
    
    // Determine which limit will be hit first
    let trialType: 'analyses' | 'time' | 'none' = 'none';
    if (hasAnalysesLeft && hasTimeLeft) {
      trialType = analysesLeft <= daysLeft ? 'analyses' : 'time';
    }

    return {
      canUseApp,
      isSubscriptionActive: false,
      isInTrial: canUseApp,
      analysesLeft,
      daysLeft,
      hasTrialExpired: !canUseApp,
      trialType,
    };
  }

  /**
   * Record a new dream analysis
   */
  async recordAnalysis(): Promise<TrialStatus> {
    await this.initialize();
    
    // If subscription is active, allow unlimited analyses
    if (this.subscriptionStatus?.isActive) {
      return this.getTrialStatus();
    }

    // Increment analysis count
    if (this.trialData) {
      this.trialData.analysisCount += 1;
      this.trialData.lastAnalysisDate = new Date().toISOString();
      await this.saveTrialData();
    }

    return this.getTrialStatus();
  }

  /**
   * Check if user can perform another analysis
   */
  async canPerformAnalysis(): Promise<boolean> {
    const status = await this.getTrialStatus();
    return status.canUseApp;
  }

  /**
   * Get trial message for UI
   */
  async getTrialMessage(): Promise<string> {
    const status = await this.getTrialStatus();
    
    if (status.isSubscriptionActive) {
      return 'Unlimited analyses with your subscription';
    }
    
    if (status.hasTrialExpired) {
      return 'Free trial expired. Subscribe to continue analyzing your dreams!';
    }
    
    if (status.trialType === 'analyses') {
      return `${status.analysesLeft} free analyses remaining`;
    } else if (status.trialType === 'time') {
      return `${status.daysLeft} days left in your free trial`;
    }
    
    return `${status.analysesLeft} analyses left, ${status.daysLeft} days remaining`;
  }

  /**
   * Get days since app installation
   */
  private getDaysSinceInstall(): number {
    if (!this.trialData?.installDate) return 0;
    
    const installDate = new Date(this.trialData.installDate);
    const now = new Date();
    const diffInMs = now.getTime() - installDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    return diffInDays;
  }

  /**
   * Load trial data from storage
   */
  private async loadTrialData(): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(TRIAL_STORAGE_KEY);
      
      if (data) {
        this.trialData = JSON.parse(data);
      } else {
        // First time user - initialize trial
        this.trialData = {
          installDate: new Date().toISOString(),
          analysisCount: 0,
        };
        await this.saveTrialData();
      }
    } catch (error) {
      console.error('Failed to load trial data:', error);
      // Fallback to new trial data
      this.trialData = {
        installDate: new Date().toISOString(),
        analysisCount: 0,
      };
    }
  }

  /**
   * Save trial data to storage
   */
  private async saveTrialData(): Promise<void> {
    if (!this.trialData) return;
    
    try {
      await AsyncStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(this.trialData));
    } catch (error) {
      console.error('Failed to save trial data:', error);
    }
  }

  /**
   * Update subscription status from RevenueCat
   */
  private async updateSubscriptionStatus(): Promise<void> {
    try {
      this.subscriptionStatus = await subscriptionService.getSubscriptionStatus();
    } catch (error) {
      console.error('Failed to update subscription status:', error);
      this.subscriptionStatus = { isActive: false };
    }
  }

  /**
   * Refresh subscription status (call after purchase)
   */
  async refreshSubscriptionStatus(): Promise<void> {
    await this.updateSubscriptionStatus();
  }

  /**
   * Reset trial data (for testing purposes)
   */
  async resetTrial(): Promise<void> {
    await AsyncStorage.removeItem(TRIAL_STORAGE_KEY);
    this.trialData = null;
    await this.initialize();
  }
}

// Export singleton instance
export const trialTrackingService = new TrialTrackingService(); 