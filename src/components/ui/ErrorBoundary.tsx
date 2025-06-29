import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import Button from './Button';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing, BorderRadius } from '@/utils/theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const { isDark } = useTheme();

  return (
    <View style={[
      styles.errorContainer,
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <View style={[
        styles.errorCard,
        { backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100] }
      ]}>
        <Ionicons 
          name="warning-outline" 
          size={48} 
          color={Colors.secondary[500]} 
          style={styles.errorIcon}
        />
        
        <Text variant="h3" style={styles.errorTitle}>
          Oops! Something went wrong
        </Text>
        
        <Text 
          variant="body1" 
          style={[
            styles.errorMessage,
            { color: isDark ? Colors.neutral[400] : Colors.neutral[600] }
          ]}
        >
          We encountered an unexpected error. Don't worry, your data is safe.
        </Text>
        
        {__DEV__ && error && (
          <View style={[
            styles.errorDetails,
            { backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[200] }
          ]}>
            <Text variant="caption" style={styles.errorText}>
              {error.message}
            </Text>
          </View>
        )}
        
        <Button
          onPress={resetError}
          style={styles.retryButton}
          variant="primary"
        >
          Try Again
        </Button>
      </View>
    </View>
  );
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you might want to log to an error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorCard: {
    borderRadius: BorderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  errorIcon: {
    marginBottom: spacing.md,
  },
  errorTitle: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  errorDetails: {
    borderRadius: BorderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
    width: '100%',
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  retryButton: {
    width: '100%',
  },
});

export default ErrorBoundary;
export type { ErrorFallbackProps }; 