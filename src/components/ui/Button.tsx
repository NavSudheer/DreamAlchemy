import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, BorderRadius, Shadows, Typography } from '../../utils/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  hapticFeedback?: boolean;
  feedbackType?: Haptics.ImpactFeedbackStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  style,
  textStyle,
  onPress,
  hapticFeedback = true,
  feedbackType = Haptics.ImpactFeedbackStyle.Medium,
  ...props
}) => {
  const handlePress = () => {
    if (isDisabled || isLoading) return;
    
    if (hapticFeedback) {
      Haptics.impactAsync(feedbackType);
    }
    
    onPress?.();
  };

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isDisabled ? Colors.neutral[300] : Colors.primary[500],
        };
      case 'secondary':
        return {
          backgroundColor: isDisabled ? Colors.neutral[300] : Colors.secondary[500],
        };
      case 'accent':
        return {
          backgroundColor: isDisabled ? Colors.neutral[300] : Colors.accent[500],
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDisabled ? Colors.neutral[300] : Colors.primary[500],
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: isDisabled ? Colors.neutral[300] : Colors.primary[500],
        };
    }
  };

  const getTextColor = (): string => {
    if (isDisabled) {
      return Colors.neutral[500];
    }
    
    switch (variant) {
      case 'outline':
      case 'ghost':
        return Colors.primary[500];
      default:
        return Colors.neutral[50];
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: BorderRadius.md,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: BorderRadius.xl,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: BorderRadius.lg,
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'sm':
        return {
          fontSize: Typography.fontSizes.sm,
        };
      case 'lg':
        return {
          fontSize: Typography.fontSizes.lg,
        };
      default:
        return {
          fontSize: Typography.fontSizes.md,
        };
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        isLoading && styles.loading,
        style,
      ]}
      onPress={handlePress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={getTextColor()}
          size={size === 'sm' ? 'small' : 'small'}
        />
      ) : (
        <>
          {leftIcon && (
            <Ionicons
              name={leftIcon as any}
              size={getIconSize()}
              color={getTextColor()}
              style={styles.leftIcon}
            />
          )}
          
          {typeof children === 'string' ? (
            <Text
              style={[
                styles.text,
                getTextSize(),
                { color: getTextColor() },
                textStyle,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          
          {rightIcon && (
            <Ionicons
              name={rightIcon as any}
              size={getIconSize()}
              color={getTextColor()}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  loading: {
    opacity: 0.7,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button; 