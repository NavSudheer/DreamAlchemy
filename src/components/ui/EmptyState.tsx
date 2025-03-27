import React from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, typography, Shadows } from '../../utils/theme';
import Text from './Text';

interface StepProps {
  number: number;
  text: string;
}

const Step: React.FC<StepProps> = ({ number, text }) => {
  const { isDark } = useTheme();
  
  return (
    <View style={styles.stepContainer}>
      <View style={[
        styles.stepNumber,
        { backgroundColor: isDark ? Colors.primary[900] : Colors.primary[100] }
      ]}>
        <Text 
          variant="caption" 
          color={isDark ? Colors.primary[300] : Colors.primary[700]}
          style={styles.stepNumberText}
        >
          {number}
        </Text>
      </View>
      <Text 
        variant="body1"
        color={isDark ? Colors.neutral[300] : Colors.neutral[800]}
        style={styles.stepText}
      >
        {text}
      </Text>
    </View>
  );
};

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
  const { isDark } = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
    // Announce the empty state to screen readers
    AccessibilityInfo.announceForAccessibility(`${title}. ${description}`);
  }, [title, description]);

  return (
    <View 
      style={[
        styles.container,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={`${title}. ${description}`}
    >
      <View style={styles.content}>
        {icon && (
          <View style={[
            styles.iconContainer,
            { backgroundColor: isDark ? Colors.primary[900] : Colors.primary[50] }
          ]}>
            <Ionicons
              name={icon}
              size={64}
              color={isDark ? Colors.primary[300] : Colors.primary[500]}
              style={styles.icon}
              accessibilityRole="image"
              accessibilityLabel={`${icon} icon`}
            />
          </View>
        )}
        
        <Text 
          variant="h1"
          color={isDark ? Colors.neutral[100] : Colors.neutral[900]}
          style={styles.title}
        >
          {title}
        </Text>
        
        <Text 
          variant="body1"
          color={isDark ? Colors.neutral[300] : Colors.neutral[700]}
          style={styles.description}
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
            <Text 
              variant="button"
              color={Colors.neutral[50]}
            >
              {actionLabel}
            </Text>
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
    padding: spacing[4],
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  icon: {
    marginBottom: 0,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.lg,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: spacing[8],
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  stepNumberText: {
    fontSize: typography.fontSizes.sm,
  },
  stepText: {
    flex: 1,
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
  },
  button: {
    backgroundColor: Colors.primary[500],
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    borderRadius: BorderRadius.pill,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  buttonPressed: {
    backgroundColor: Colors.primary[600],
    transform: [{ scale: 0.98 }],
  },
}); 