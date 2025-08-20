import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
  Share,
} from 'react-native';
import { subscriptionService } from '../../services/subscriptions';
import { trialTrackingService } from '../../services/trialTracking';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'error' | 'warn';
  message: string;
  data?: any;
}

class DebugLogger {
  private static logs: LogEntry[] = [];
  private static listeners: ((logs: LogEntry[]) => void)[] = [];

  static log(level: 'info' | 'error' | 'warn', message: string, data?: any) {
    // Only log in development builds
    if (!__DEV__) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
    
    this.logs.unshift(entry); // Add to beginning
    if (this.logs.length > 100) this.logs = this.logs.slice(0, 100); // Keep last 100
    
    this.listeners.forEach(listener => listener([...this.logs]));
  }

  static subscribe(listener: (logs: LogEntry[]) => void) {
    if (!__DEV__) {
      return () => {}; // Return empty unsubscribe function
    }

    this.listeners.push(listener);
    listener([...this.logs]);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static getLogs() {
    if (!__DEV__) {
      return [];
    }
    return [...this.logs];
  }

  static clear() {
    if (!__DEV__) {
      return;
    }
    this.logs = [];
    this.listeners.forEach(listener => listener([]));
  }
}

interface DebugPanelProps {
  visible: boolean;
  onClose: () => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ visible, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const unsubscribe = DebugLogger.subscribe(setLogs);
    return unsubscribe;
  }, []);

  // Debug panel only available in development builds
  if (!__DEV__) {
    return null;
  }

  const testRevenueCat = async () => {
    DebugLogger.log('info', 'Testing RevenueCat offerings...');
    
    try {
      const offerings = await subscriptionService.getOfferings();
      DebugLogger.log('info', 'Offerings loaded', offerings);
      
      const status = await subscriptionService.getSubscriptionStatus();
      DebugLogger.log('info', 'Subscription status', status);
      
    } catch (error) {
      DebugLogger.log('error', 'RevenueCat test failed', error);
    }
  };

  const runDebugStep1 = async () => {
    DebugLogger.log('info', '🚀 Running Debug Step 1: Product Identifiers Check...');
    try {
      // @ts-ignore - TypeScript doesn't know about our new debug methods yet
      const result = await subscriptionService.debugStep1_CheckProductIdentifiers();
      DebugLogger.log('info', 'Step 1 Result', result);
    } catch (error) {
      DebugLogger.log('error', 'Step 1 failed', error);
    }
  };

  const runDebugStep2 = async () => {
    DebugLogger.log('info', '🚀 Running Debug Step 2: StoreKit Probe...');
    try {
      // @ts-ignore
      const result = await subscriptionService.debugStep2_DirectStoreKitProbe();
      DebugLogger.log('info', 'Step 2 Result', result);
    } catch (error) {
      DebugLogger.log('error', 'Step 2 failed', error);
    }
  };

  const runDebugStep3 = async () => {
    DebugLogger.log('info', '🚀 Running Debug Step 3: Country Availability...');
    try {
      // @ts-ignore
      const result = await subscriptionService.debugStep3_CountryAvailabilityCheck();
      DebugLogger.log('info', 'Step 3 Result', result);
    } catch (error) {
      DebugLogger.log('error', 'Step 3 failed', error);
    }
  };

  const runDebugStep6 = async () => {
    DebugLogger.log('info', '🚀 Running Debug Step 6: RevenueCat Sanity Check...');
    try {
      // @ts-ignore
      const result = await subscriptionService.debugStep6_RevenueCatSanityCheck();
      DebugLogger.log('info', 'Step 6 Result', result);
    } catch (error) {
      DebugLogger.log('error', 'Step 6 failed', error);
    }
  };

  const runAllDebugSteps = async () => {
    DebugLogger.log('info', '🚀 Running ALL Debug Steps...');
    try {
      // @ts-ignore
      const result = await subscriptionService.runAllDebuggingSteps();
      DebugLogger.log('info', 'All Steps Result', result);
      
      Alert.alert(
        'Debug Complete',
        `Passed: ${result.summary.passed}/4 steps\nFailed: ${result.summary.failed}/4 steps\n\nCheck logs for details.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      DebugLogger.log('error', 'All steps failed', error);
    }
  };

  const showDeviceResetInstructions = () => {
    Alert.alert(
      'Device & Account Reset Instructions',
      'STEP 4: Device & Account Reset\n\n' +
      '1. Settings → Developer → Sandbox Account\n' +
      '2. Sign out of current sandbox Apple ID\n' +
      '3. Sign in with your sandbox Apple ID\n' +
      '4. Delete Dream Alchemy app\n' +
      '5. Reboot your device\n' +
      '6. Reinstall via TestFlight\n\n' +
      'This flushes the StoreKit cache and ensures clean testing conditions.',
      [
        { text: 'Copy Instructions', onPress: () => {
          // You could implement clipboard copy here
        }},
        { text: 'OK' }
      ]
    );
  };

  const showAppPrerequisites = () => {
    Alert.alert(
      'App Prerequisites Checklist',
      'STEP 5: App-Level Prerequisites\n\n' +
      '✓ Bundle ID matches App Store Connect\n' +
      '✓ In-App Purchases capability enabled\n' +
      '✓ Provisioning profile includes IAP\n' +
      '✓ Agreements, Tax, and Banking are Active\n' +
      '✓ Products are in "Ready to Submit" status\n\n' +
      'Verify these in App Store Connect and Xcode.',
      [{ text: 'OK' }]
    );
  };

  const testTrialStatus = async () => {
    DebugLogger.log('info', 'Testing trial status...');
    
    try {
      const status = await trialTrackingService.getTrialStatus();
      DebugLogger.log('info', 'Trial status', status);
    } catch (error) {
      DebugLogger.log('error', 'Trial test failed', error);
    }
  };

  const exportLogs = async () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}${
        log.data ? '\n' + JSON.stringify(log.data, null, 2) : ''
      }`
    ).join('\n\n');

    try {
      await Share.share({
        message: logText,
        title: 'Dream Alchemy Debug Logs',
      });
    } catch (error) {
      Alert.alert('Export Failed', 'Could not export logs');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return '#ff4444';
      case 'warn': return '#ffaa00';
      default: return '#00aa00';
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Debug Panel</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={runAllDebugSteps} style={[styles.button, styles.primaryButton]}>
            <Text style={styles.buttonText}>🚀 Run All Debug Steps</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={runDebugStep1} style={styles.button}>
            <Text style={styles.buttonText}>Step 1: Product IDs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={runDebugStep2} style={styles.button}>
            <Text style={styles.buttonText}>Step 2: StoreKit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={runDebugStep3} style={styles.button}>
            <Text style={styles.buttonText}>Step 3: Country</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={showDeviceResetInstructions} style={styles.button}>
            <Text style={styles.buttonText}>Step 4: Reset Guide</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={showAppPrerequisites} style={styles.button}>
            <Text style={styles.buttonText}>Step 5: Prerequisites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={runDebugStep6} style={styles.button}>
            <Text style={styles.buttonText}>Step 6: RC Config</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={testRevenueCat} style={styles.button}>
            <Text style={styles.buttonText}>Test RevenueCat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={testTrialStatus} style={styles.button}>
            <Text style={styles.buttonText}>Test Trial</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={exportLogs} style={styles.button}>
            <Text style={styles.buttonText}>Export Logs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={DebugLogger.clear} style={[styles.button, styles.clearButton]}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.logs}>
          {logs.map((log, index) => (
            <View key={index} style={styles.logEntry}>
              <Text style={[styles.logLevel, { color: getLevelColor(log.level) }]}>
                {log.level.toUpperCase()}
              </Text>
              <Text style={styles.logTime}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </Text>
              <Text style={styles.logMessage}>{log.message}</Text>
              {log.data && (
                <Text style={styles.logData}>
                  {JSON.stringify(log.data, null, 2)}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    color: '#007AFF',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    minWidth: '100%',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  logs: {
    flex: 1,
    padding: 16,
  },
  logEntry: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#111',
    borderRadius: 4,
  },
  logLevel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  logTime: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  logMessage: {
    color: '#fff',
    marginTop: 4,
  },
  logData: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'monospace',
  },
});

// Export the logger for use in other files
export { DebugLogger };
export default DebugPanel;
