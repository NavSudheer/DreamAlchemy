import React, { useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, BorderRadius, Shadows, typography, Animation } from '../../utils/theme';
import { useTheme } from '../../providers/ThemeProvider';
import Text from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'error';
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
  isRounded?: boolean;
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
  feedbackType = Haptics.ImpactFeedbackStyle.Light,
  isRounded = true,
  ...props
}) => {
  const { isDark } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePress = () => {
    if (isDisabled || isLoading) return;
    
    if (hapticFeedback) {
      Haptics.impactAsync(feedbackType);
    }
    
    if (onPress) {
      onPress();
    }
  };

  const getBackgroundStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isDisabled 
            ? isDark ? Colors.neutral[600] : Colors.neutral[300]
            : isDark ? Colors.primary[400] : Colors.primary[500],
        };
      case 'secondary':
        return {
          backgroundColor: isDisabled 
            ? isDark ? Colors.neutral[600] : Colors.neutral[300]
            : isDark ? Colors.secondary[400] : Colors.secondary[500],
        };
      case 'accent':
        return {
          backgroundColor: isDisabled 
            ? isDark ? Colors.neutral[600] : Colors.neutral[300]
            : isDark ? Colors.accent[400] : Colors.accent[500],
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDisabled 
            ? isDark ? Colors.neutral[600] : Colors.neutral[300]
            : isDark ? Colors.primary[400] : Colors.primary[500],
        };
      case 'ghost':
        return {
          backgroundColor: isDisabled 
            ? 'transparent' 
            : isDark ? 'rgba(74, 85, 104, 0.1)' : 'rgba(203, 213, 224, 0.1)',
        };
      case 'error':
        return {
          backgroundColor: isDisabled 
            ? isDark ? Colors.neutral[600] : Colors.neutral[300]
            : Colors.error[500],
        };
      default:
        return {
          backgroundColor: isDisabled 
            ? isDark ? Colors.neutral[600] : Colors.neutral[300]
            : isDark ? Colors.primary[400] : Colors.primary[500],
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'outline':
        return isDisabled 
          ? isDark ? Colors.neutral[500] : Colors.neutral[400]
          : isDark ? Colors.primary[400] : Colors.neutral[900];
      case 'ghost':
        return isDark ? Colors.neutral[300] : Colors.primary[600];
      case 'error':
        return Colors.neutral[50];
      default:
        return Colors.neutral[50];
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
        };
      case 'lg':
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
        };
      case 'md':
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
        };
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      case 'md':
      default:
        return 20;
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'sm':
        return {
          fontSize: typography.fontSizes.xs,
        };
      case 'lg':
        return {
          fontSize: typography.fontSizes.md,
        };
      case 'md':
      default:
        return {
          fontSize: typography.fontSizes.sm,
        };
    }
  };

  const buttonStyles: ViewStyle[] = [
    styles.button,
    getBackgroundStyle(),
    getSizeStyle(),
    fullWidth ? { width: '100%' } : {},
    isRounded ? { borderRadius: BorderRadius.pill } : { borderRadius: BorderRadius.md },
    isDisabled ? styles.disabled : {},
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    { color: getTextColor() },
    getTextSize(),
    textStyle as TextStyle,
  ];

  const iconColor = getTextColor();
  const iconSize = getIconSize();

  return (
    <Animated.View 
      style={{ 
        transform: [{ scale: scaleAnim }],
        opacity: isDisabled ? 0.6 : 1,
        alignSelf: fullWidth ? 'stretch' : 'flex-start',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled || isLoading}
        style={buttonStyles}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <React.Fragment>
            {leftIcon && (
              <Ionicons
                name={leftIcon as any}
                size={iconSize}
                color={iconColor}
                style={styles.leftIcon}
              />
            )}
            <Text style={textStyles}>{children}</Text>
            {rightIcon && (
              <Ionicons
                name={rightIcon as any}
                size={iconSize}
                color={iconColor}
                style={styles.rightIcon}
              />
            )}
          </React.Fragment>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontFamily: typography.fonts.medium,
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button; 