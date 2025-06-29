import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, spacing } from '@/utils/theme';
import { useTheme } from '@/providers/ThemeProvider';
import Text from './Text';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
  color?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message = 'Loading...',
  color,
  fullScreen = false,
}) => {
  const { isDark } = useTheme();

  const spinnerColor = color || (isDark ? Colors.primary[400] : Colors.primary[500]);

  if (fullScreen) {
    return (
      <View style={[
        styles.fullScreenContainer,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}>
        <ActivityIndicator size={size} color={spinnerColor} />
        {message && (
          <Text 
            variant="body1" 
            style={[
              styles.message,
              { color: isDark ? Colors.neutral[400] : Colors.neutral[600] }
            ]}
          >
            {message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && (
        <Text 
          variant="body2" 
          style={[
            styles.inlineMessage,
            { color: isDark ? Colors.neutral[400] : Colors.neutral[600] }
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  message: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  inlineMessage: {
    marginLeft: spacing.sm,
  },
});

export default LoadingSpinner; 