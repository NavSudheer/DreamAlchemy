import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
  Animated,
} from 'react-native';
import { Colors, spacing, BorderRadius, Shadows, Animation } from '../../utils/theme';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';

export type InputVariant = 'outlined' | 'filled' | 'underlined';
export type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  helperStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  variant = 'outlined',
  size = 'medium',
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  errorStyle,
  secureTextEntry,
  fullWidth = false,
  style,
  ...props
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const focusAnim = useRef(new Animated.Value(0)).current;
  
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: Animation.normal,
      useNativeDriver: false,
    }).start();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: Animation.normal,
      useNativeDriver: false,
    }).start();
  };

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: error 
            ? Colors.error
            : isFocused 
              ? isDark ? Colors.primary[400] : Colors.primary[500]
              : isDark ? Colors.neutral[600] : Colors.neutral[300],
          backgroundColor: isDark ? 'rgba(45, 55, 72, 0.3)' : 'transparent',
          borderRadius: BorderRadius.lg,
          ...Shadows.sm,
        };
      case 'filled':
        return {
          borderWidth: 0,
          backgroundColor: error 
            ? isDark ? 'rgba(245, 101, 101, 0.1)' : Colors.transparentAmber
            : isFocused 
              ? isDark ? 'rgba(66, 153, 225, 0.1)' : Colors.primary[50]
              : isDark ? 'rgba(45, 55, 72, 0.5)' : Colors.neutral[100],
          borderRadius: BorderRadius.lg,
          ...Shadows.sm,
        };
      case 'underlined':
        return {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: error 
            ? Colors.error
            : isFocused 
              ? isDark ? Colors.primary[400] : Colors.primary[500]
              : isDark ? Colors.neutral[600] : Colors.neutral[300],
          backgroundColor: 'transparent',
          borderRadius: 0,
        };
      default:
        return {};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing[1],
          paddingHorizontal: spacing[2],
          minHeight: 36,
        };
      case 'large':
        return {
          paddingVertical: spacing[3],
          paddingHorizontal: spacing[4],
          minHeight: 56,
        };
      default: // medium
        return {
          paddingVertical: spacing[2],
          paddingHorizontal: spacing[3],
          minHeight: 46,
        };
    }
  };

  const getInputSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: 14,
        };
      case 'large':
        return {
          fontSize: 18,
        };
      default: // medium
        return {
          fontSize: 16,
        };
    }
  };

  const textColor = isDark ? Colors.neutral[200] : Colors.neutral[800];
  const placeholderColor = isDark ? Colors.neutral[500] : Colors.neutral[400];
  
  // Animated inner shadow for better focus state
  const innerShadow = {
    shadowColor: Colors.primary[400],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.2]
    }),
    shadowRadius: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4]
    }),
  };

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth, containerStyle]}>
      {label && (
        <Text
          variant="subtitle2"
          style={[
            styles.label,
            error ? styles.errorText : {},
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}

      <Animated.View
        style={[
          styles.inputContainer,
          getVariantStyle(),
          getSizeStyle(),
          innerShadow,
          style as any,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            getInputSizeStyle(),
            { color: textColor },
            leftIcon ? { paddingLeft: 0 } : {},
            rightIcon || secureTextEntry ? { paddingRight: 0 } : {},
            inputStyle,
          ]}
          placeholderTextColor={placeholderColor}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={isDark ? Colors.primary[400] : Colors.primary[300]}
          {...props}
        />

        {(rightIcon || secureTextEntry) && (
          <View style={styles.rightIcon}>
            {rightIcon}
            
            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.passwordToggle}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={18}
                  color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </Animated.View>

      {(error || helper) && (
        <Text
          variant="caption"
          style={[
            styles.helper,
            error ? styles.errorText : {},
            error ? errorStyle : helperStyle,
          ]}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3],
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    marginBottom: spacing[1],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 0, // Remove default padding
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.3,
  },
  helper: {
    marginTop: spacing[1],
  },
  errorText: {
    color: Colors.error,
  },
  leftIcon: {
    marginRight: spacing[2],
  },
  rightIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[2],
  },
  passwordToggle: {
    padding: spacing[1],
  },
});

export default Input; 