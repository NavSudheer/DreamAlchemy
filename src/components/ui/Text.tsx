import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, TextProps as RNTextProps } from 'react-native';
import { Colors, Typography } from '../../utils/theme';

export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'button' 
  | 'overline';

// React Native fontWeight type
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Our custom weight names
type WeightName = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: WeightName;
  style?: TextStyle;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  color,
  align,
  weight,
  style,
  ...props
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: Typography.fontSizes['4xl'],
          fontWeight: '700',
          lineHeight: Typography.lineHeights.tight,
        };
      case 'h2':
        return {
          fontSize: Typography.fontSizes['3xl'],
          fontWeight: '700',
          lineHeight: Typography.lineHeights.tight,
        };
      case 'h3':
        return {
          fontSize: Typography.fontSizes['2xl'],
          fontWeight: '600',
          lineHeight: Typography.lineHeights.tight,
        };
      case 'h4':
        return {
          fontSize: Typography.fontSizes.xl,
          fontWeight: '600',
          lineHeight: Typography.lineHeights.tight,
        };
      case 'subtitle1':
        return {
          fontSize: Typography.fontSizes.lg,
          fontWeight: '500',
          lineHeight: Typography.lineHeights.normal,
        };
      case 'subtitle2':
        return {
          fontSize: Typography.fontSizes.md,
          fontWeight: '500',
          lineHeight: Typography.lineHeights.normal,
        };
      case 'body1':
        return {
          fontSize: Typography.fontSizes.md,
          fontWeight: '400',
          lineHeight: Typography.lineHeights.normal,
        };
      case 'body2':
        return {
          fontSize: Typography.fontSizes.sm,
          fontWeight: '400',
          lineHeight: Typography.lineHeights.normal,
        };
      case 'caption':
        return {
          fontSize: Typography.fontSizes.xs,
          fontWeight: '400',
          lineHeight: Typography.lineHeights.normal,
        };
      case 'button':
        return {
          fontSize: Typography.fontSizes.md,
          fontWeight: '600',
          lineHeight: Typography.lineHeights.none,
          textTransform: 'uppercase' as const,
        };
      case 'overline':
        return {
          fontSize: Typography.fontSizes.xs,
          fontWeight: '500',
          lineHeight: Typography.lineHeights.none,
          textTransform: 'uppercase' as const,
          letterSpacing: 1.5,
        };
      default:
        return {
          fontSize: Typography.fontSizes.md,
          fontWeight: '400',
          lineHeight: Typography.lineHeights.normal,
        };
    }
  };

  const getWeightStyle = (): TextStyle => {
    if (!weight) return {};
    
    const weightMap: Record<WeightName, FontWeight> = {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    };
    
    return {
      fontWeight: weightMap[weight],
    };
  };

  return (
    <RNText
      style={[
        styles.text,
        getVariantStyle(),
        getWeightStyle(),
        color && { color },
        align && { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.neutral[900],
  },
});

export default Text; 