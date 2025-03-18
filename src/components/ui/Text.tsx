import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';
import { typography } from '../../utils/theme';
import { useTheme } from '../../providers/ThemeProvider';

export type TextVariant = 
  | 'h1'     // Large titles
  | 'h2'     // Section headers
  | 'h3'     // Subsection headers
  | 'h4'     // Small headers
  | 'h5'     // Mini headers
  | 'h6'     // Micro headers
  | 'subtitle1' // Large subtitle
  | 'subtitle2' // Small subtitle
  | 'body1'   // Primary body text
  | 'body2'   // Secondary body text
  | 'caption' // Small caption text
  | 'button'  // Button text
  | 'overline' // Small all-caps text
  | 'dreamText'; // Special variant for dream content

export interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
}

const Text: React.FC<CustomTextProps> = ({
  children,
  variant = 'body1',
  style,
  color,
  ...props
}) => {
  const { isDark } = useTheme();
  
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: typography.fontSizes['4xl'],
          fontFamily: typography.fonts.bold,
          lineHeight: typography.lineHeights.tight * typography.fontSizes['4xl'],
          letterSpacing: typography.letterSpacing.tight,
          marginBottom: 8,
        };
      case 'h2':
        return {
          fontSize: typography.fontSizes['3xl'],
          fontFamily: typography.fonts.bold,
          lineHeight: typography.lineHeights.tight * typography.fontSizes['3xl'],
          letterSpacing: typography.letterSpacing.tight,
          marginBottom: 6,
        };
      case 'h3':
        return {
          fontSize: typography.fontSizes['2xl'],
          fontFamily: typography.fonts.semibold,
          lineHeight: typography.lineHeights.tight * typography.fontSizes['2xl'],
          letterSpacing: typography.letterSpacing.normal,
          marginBottom: 4,
        };
      case 'h4':
        return {
          fontSize: typography.fontSizes.xl,
          fontFamily: typography.fonts.semibold,
          lineHeight: typography.lineHeights.tight * typography.fontSizes.xl,
          letterSpacing: typography.letterSpacing.normal,
          marginBottom: 2,
        };
      case 'h5':
        return {
          fontSize: typography.fontSizes.lg,
          fontFamily: typography.fonts.semibold,
          lineHeight: typography.lineHeights.normal * typography.fontSizes.lg,
          letterSpacing: typography.letterSpacing.normal,
        };
      case 'h6':
        return {
          fontSize: typography.fontSizes.md,
          fontFamily: typography.fonts.semibold,
          lineHeight: typography.lineHeights.normal * typography.fontSizes.md,
          letterSpacing: typography.letterSpacing.normal,
        };
      case 'subtitle1':
        return {
          fontSize: typography.fontSizes.md,
          fontFamily: typography.fonts.medium,
          lineHeight: typography.lineHeights.normal * typography.fontSizes.md,
          letterSpacing: typography.letterSpacing.wide,
          opacity: 0.9,
        };
      case 'subtitle2':
        return {
          fontSize: typography.fontSizes.sm,
          fontFamily: typography.fonts.medium,
          lineHeight: typography.lineHeights.normal * typography.fontSizes.sm,
          letterSpacing: typography.letterSpacing.wide,
          opacity: 0.9,
        };
      case 'body1':
        return {
          fontSize: typography.fontSizes.md,
          fontFamily: typography.fonts.regular,
          lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
          letterSpacing: typography.letterSpacing.normal,
        };
      case 'body2':
        return {
          fontSize: typography.fontSizes.sm,
          fontFamily: typography.fonts.regular,
          lineHeight: typography.lineHeights.relaxed * typography.fontSizes.sm,
          letterSpacing: typography.letterSpacing.normal,
        };
      case 'caption':
        return {
          fontSize: typography.fontSizes.xs,
          fontFamily: typography.fonts.regular,
          lineHeight: typography.lineHeights.normal * typography.fontSizes.xs,
          letterSpacing: typography.letterSpacing.wide,
          opacity: 0.8,
        };
      case 'button':
        return {
          fontSize: typography.fontSizes.xs,
          fontFamily: typography.fonts.medium,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wide,
        };
      case 'overline':
        return {
          fontSize: typography.fontSizes.xs,
          fontFamily: typography.fonts.medium,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.widest,
          opacity: 0.7,
        };
      case 'dreamText':
        return {
          fontSize: typography.fontSizes.md,
          fontFamily: 'Georgia', // Using serif font for dream text
          fontStyle: 'italic',
          lineHeight: typography.lineHeights.loose * typography.fontSizes.md,
          letterSpacing: typography.letterSpacing.normal,
          paddingHorizontal: 4, // Add slight padding
          paddingVertical: 2,
        };
      default:
        return {
          fontSize: typography.fontSizes.md,
          fontFamily: typography.fonts.regular,
          lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
          letterSpacing: typography.letterSpacing.normal,
        };
    }
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        color ? { color } : {},
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text; 