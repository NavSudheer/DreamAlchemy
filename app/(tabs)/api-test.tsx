import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Button, Alert, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { analyzeDream } from '../../src/services/dreamAnalysis';
import { DreamAnalysis } from '../../src/types';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Header from '../../src/components/ui/Header';

export default function APITestScreen() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DreamAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log("Starting API test...");
      const dreamText = "I was flying over mountains and diving into the ocean";
      
      // Call the analyzeDream function
      const response = await analyzeDream(dreamText);
      
      console.log("API Test Result:", JSON.stringify(response, null, 2));
      setResult(response);
      Alert.alert("Success", "API connection works!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("API Test Error:", errorMessage);
      setError(errorMessage);
      Alert.alert("Error", `API call failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header title="API Connection Test" />
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.testSection}>
          <Text variant="h2" style={styles.heading}>Test Vercel API Connection</Text>
          <Text variant="body1" style={styles.description}>
            This screen tests the connection to your Vercel serverless function. 
            Press the button below to send a test dream analysis request.
          </Text>
          
          <Button
            title={loading ? "Testing..." : "Run API Test"}
            onPress={testApi}
            disabled={loading}
            color={isDark ? Colors.secondary[400] : Colors.primary[600]}
          />
          
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator 
                size="large" 
                color={isDark ? Colors.secondary[400] : Colors.primary[600]} 
              />
              <Text variant="body2" style={styles.loadingText}>Testing API connection...</Text>
            </View>
          )}
          
          {error && (
            <View style={styles.errorContainer}>
              <Text variant="h3" style={styles.errorTitle}>Error</Text>
              <Text variant="body2" style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          {result && (
            <View style={styles.resultContainer}>
              <Text variant="h3" style={styles.resultTitle}>Success!</Text>
              <Text variant="body2" style={styles.resultSubtitle}>API Response:</Text>
              
              <View style={styles.jsonContainer}>
                <Text variant="body2" style={styles.jsonText}>
                  Interpretation: {result.interpretation.substring(0, 100)}...
                </Text>
                
                <Text variant="body2" style={styles.jsonText}>
                  Symbols: {result.symbols.length} found
                </Text>
                
                <Text variant="body2" style={styles.jsonText}>
                  Archetypes: {result.archetypes.length} found
                </Text>
                
                {result.theme && (
                  <Text variant="body2" style={styles.jsonText}>
                    Theme: {result.theme.primary}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[4],
    paddingBottom: 100, // Extra padding for tab bar
  },
  testSection: {
    marginBottom: spacing[6],
  },
  heading: {
    marginBottom: spacing[2],
  },
  description: {
    marginBottom: spacing[4],
    opacity: 0.8,
  },
  loadingContainer: {
    marginTop: spacing[4],
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing[2],
    opacity: 0.7,
  },
  errorContainer: {
    marginTop: spacing[4],
    padding: spacing[3],
    backgroundColor: 'rgba(254, 178, 178, 0.2)',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  errorTitle: {
    color: Colors.error,
    marginBottom: spacing[2],
  },
  errorText: {
    color: Colors.error,
  },
  resultContainer: {
    marginTop: spacing[4],
    padding: spacing[3],
    backgroundColor: 'rgba(154, 230, 180, 0.2)',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  resultTitle: {
    color: Colors.success,
    marginBottom: spacing[2],
  },
  resultSubtitle: {
    fontWeight: '600',
    marginBottom: spacing[2],
  },
  jsonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: spacing[3],
    borderRadius: 8,
  },
  jsonText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: spacing[2],
  },
}); 