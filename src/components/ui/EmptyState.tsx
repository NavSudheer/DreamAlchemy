import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';
import { fontFamily } from '../../utils/fonts';

interface StepProps {
  number: number;
  text: string;
}

const Step: React.FC<StepProps> = ({ number, text }) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  steps?: string[];
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'moon',
  title,
  description,
  steps,
  actionLabel,
  onAction,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
    // Announce the empty state to screen readers
    AccessibilityInfo.announceForAccessibility(`${title}. ${description}`);
  }, [title, description]);

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={`${title}. ${description}`}
    >
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons
              name={icon}
              size={64}
              color={theme.colors.primary[400]}
              style={styles.icon}
              accessibilityRole="image"
              accessibilityLabel={`${icon} icon`}
            />
          </View>
        )}
        
        <Text 
          style={styles.title}
          accessibilityRole="header"
        >
          {title}
        </Text>
        
        <Text 
          style={styles.description}
          accessibilityRole="text"
        >
          {description}
        </Text>

        {steps && steps.length > 0 && (
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <Step
                key={index}
                number={index + 1}
                text={step}
              />
            ))}
          </View>
        )}

        {actionLabel && onAction && (
          <Pressable
            onPress={onAction}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={[
              styles.button,
              isPressed && styles.buttonPressed
            ]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            accessibilityHint="Tap to get started"
          >
            <Text style={styles.buttonText}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
    backgroundColor: theme.colors.neutral[50],
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.transparentPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[6],
  },
  icon: {
    marginBottom: 0,
  },
  title: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontFamily: fontFamily.bold,
    color: theme.colors.neutral[900],
    textAlign: 'center',
    marginBottom: theme.spacing[3],
  },
  description: {
    fontSize: theme.typography.fontSizes.lg,
    fontFamily: fontFamily.regular,
    color: theme.colors.neutral[700],
    textAlign: 'center',
    marginBottom: theme.spacing[6],
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.lg,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: theme.spacing[8],
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[3],
  },
  stepNumberText: {
    fontSize: theme.typography.fontSizes.sm,
    fontFamily: fontFamily.semibold,
    color: theme.colors.primary[700],
  },
  stepText: {
    flex: 1,
    fontSize: theme.typography.fontSizes.md,
    fontFamily: fontFamily.medium,
    color: theme.colors.neutral[800],
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.md,
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.borderRadius.lg,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  buttonPressed: {
    backgroundColor: theme.colors.primary[600],
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: theme.colors.neutral[50],
    fontSize: theme.typography.fontSizes.lg,
    fontFamily: fontFamily.semibold,
    textAlign: 'center',
  },
}); 