import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../utils/theme';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';

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
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: error 
            ? Colors.error
            : isFocused 
              ? Colors.primary[500] 
              : Colors.neutral[300],
          backgroundColor: 'transparent',
          borderRadius: BorderRadius.md,
        };
      case 'filled':
        return {
          borderWidth: 0,
          backgroundColor: error 
            ? Colors.transparentRed
            : isFocused 
              ? Colors.primary[50] 
              : Colors.neutral[100],
          borderRadius: BorderRadius.md,
        };
      case 'underlined':
        return {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: error 
            ? Colors.error
            : isFocused 
              ? Colors.primary[500] 
              : Colors.neutral[300],
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
          paddingVertical: Spacing.xs,
          paddingHorizontal: Spacing.sm,
        };
      case 'large':
        return {
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.lg,
        };
      case 'medium':
      default:
        return {
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
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
      case 'medium':
      default:
        return {
          fontSize: 16,
        };
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderPasswordIcon = () => {
    if (!secureTextEntry) return rightIcon;

    return (
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Ionicons
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={24}
          color={Colors.neutral[500]}
        />
      </TouchableOpacity>
    );
  };

  // Helper function to handle conditional styles
  const getConditionalStyle = (condition: boolean | undefined | null, styleToApply: StyleProp<any>): StyleProp<any> => {
    return condition ? styleToApply : undefined;
  };

  return (
    <View style={[styles.container, getConditionalStyle(fullWidth, styles.fullWidth), containerStyle]}>
      {label && (
        <Text
          variant="subtitle2"
          style={[
            styles.label,
            getConditionalStyle(!!error, styles.errorLabel),
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        getVariantStyle(),
        getSizeStyle(),
        getConditionalStyle(fullWidth, styles.fullWidth),
        style as StyleProp<ViewStyle>,
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            getInputSizeStyle(),
            getConditionalStyle(!!leftIcon, styles.inputWithLeftIcon),
            getConditionalStyle(!!(rightIcon || secureTextEntry), styles.inputWithRightIcon),
            inputStyle,
          ]}
          placeholderTextColor={Colors.neutral[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        
        {(rightIcon || secureTextEntry) && (
          <View style={styles.rightIcon}>
            {renderPasswordIcon()}
          </View>
        )}
      </View>
      
      {(error || helper) && (
        <Text
          variant="caption"
          style={[
            styles.helper,
            getConditionalStyle(!!error, styles.error),
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
    marginBottom: Spacing.md,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    marginBottom: Spacing.xs,
    color: Colors.neutral[700],
  },
  errorLabel: {
    color: Colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    color: Colors.neutral[900],
    paddingVertical: 0,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.xs,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  helper: {
    marginTop: Spacing.xs,
    color: Colors.neutral[500],
  },
  error: {
    color: Colors.error,
  },
});

export default Input; 