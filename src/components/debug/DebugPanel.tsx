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
    this.listeners.push(listener);
    listener([...this.logs]);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static getLogs() {
    return [...this.logs];
  }

  static clear() {
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
          <TouchableOpacity onPress={testRevenueCat} style={styles.button}>
            <Text style={styles.buttonText}>Test RevenueCat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={testTrialStatus} style={styles.button}>
            <Text style={styles.buttonText}>Test Trial</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={exportLogs} style={styles.button}>
            <Text style={styles.buttonText}>Export Logs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={DebugLogger.clear} style={styles.button}>
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
  buttonText: {
    color: '#fff',
    fontSize: 14,
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
