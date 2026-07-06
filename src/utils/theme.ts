import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { fontFamily } from './fonts';

// Dream Alchemy palette — twilight violet, astral teal, and alchemical gold
// over indigo-tinted neutrals for a nocturnal, dreamlike feel.
export const Colors = {
  // Primary — twilight violet
  primary: {
    50: '#F4F2FF',
    100: '#E6E1FE',
    200: '#CEC5FD',
    300: '#B2A4F9',
    400: '#9683F0', // Main primary in dark mode
    500: '#7C64E3',
    600: '#654BC8', // Main primary in light mode
    700: '#4F38A3',
    800: '#3B297D',
    900: '#271A57',
  },
  // Secondary — astral teal
  secondary: {
    50: '#EBFDFB',
    100: '#C7F7F1',
    200: '#96EDE4',
    300: '#63DDD3',
    400: '#3BC7BE',
    500: '#26A8A2',
    600: '#1E8783',
    700: '#1B6A68',
    800: '#185351',
    900: '#153F3E',
  },
  // Accent — alchemical gold
  accent: {
    50: '#FFF9EB',
    100: '#FEEFC7',
    200: '#FDDD8A',
    300: '#FBC64D',
    400: '#F7AE24',
    500: '#E8930C',
    600: '#C87107',
    700: '#A3550A',
    800: '#84420F',
    900: '#6D3610',
  },
  // Neutrals — indigo-tinted grays; 900 is the night background, 800 the card surface
  neutral: {
    50: '#F9F8FD',
    100: '#F0EEF8',
    200: '#E2DFF0',
    300: '#C8C4DE',
    400: '#9C97B8',
    500: '#6E6990',
    600: '#4C4769',
    700: '#332F4E',
    800: '#211E38',
    900: '#14121F',
  },
  // Semantic colors as scales (components index e.g. Colors.error[500])
  success: {
    50: '#F0FDF5',
    100: '#DCFCE8',
    200: '#BBF7D1',
    300: '#6EE7A0',
    400: '#48CE7F',
    500: '#2FAE64',
    600: '#238B50',
    700: '#1D6F41',
    800: '#175835',
    900: '#12482C',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FBD38D',
    400: '#F6AD55',
    500: '#ED8936',
    600: '#C05621',
    700: '#9C4318',
    800: '#7B3413',
    900: '#652A11',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // Dream theme colors
  dreamBlue: '#60A5FA',
  dreamTeal: '#3BC7BE',
  dreamAmber: '#F7AE24',
  dreamGray: '#9C97B8',
  // Transparent colors for overlays
  transparentLight: 'rgba(249, 248, 253, 0.1)',
  transparentDark: 'rgba(20, 18, 31, 0.1)',
  transparentTeal: 'rgba(59, 199, 190, 0.12)',
  transparentAmber: 'rgba(247, 174, 36, 0.12)',
  transparentViolet: 'rgba(150, 131, 240, 0.12)',
  // Gradient colors
  gradients: {
    primary: ['#654BC8', '#9683F0'],
    secondary: ['#1E8783', '#3BC7BE'],
    accent: ['#C87107', '#F7AE24'],
    night: ['#271A57', '#14121F'],
    twilight: ['#3B297D', '#654BC8'],
    dawn: ['#654BC8', '#E8930C'],
    dark: ['#14121F', '#211E38'],
    light: ['#F9F8FD', '#F0EEF8'],
  },
};

// Define typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  fonts: {
    regular: fontFamily.regular,
    medium: fontFamily.medium,
    semibold: fontFamily.semibold,
    bold: fontFamily.bold,
    extrabold: fontFamily.extrabold,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2.0,
  },
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
    widest: 1.5,
  },
};

// Define spacing
export type SpacingKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
  // String-based keys for backward compatibility
  xs: 4,    // maps to [1]
  sm: 8,    // maps to [2]
  md: 16,   // maps to [4]
  lg: 24,   // maps to [6]
  xl: 32,   // maps to [8]
  '2xl': 48 // maps to [12]
} as const;

export type SpacingType = typeof spacing;

// Define border radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  '2xl': 32,
  pill: 9999,
};

// Define shadows — violet-tinted for a softer glow on light backgrounds
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#271A57',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#271A57',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  lg: {
    shadowColor: '#271A57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  xl: {
    shadowColor: '#271A57',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
};

// Animation durations
export const Animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Define light theme
export const LightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: Colors.primary[600],
    background: Colors.neutral[50],
    card: Colors.neutral[100],
    text: Colors.neutral[800],
    border: Colors.neutral[200],
    notification: Colors.accent[500],
  },
  dark: false,
};

// Define dark theme
export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: Colors.primary[400],
    background: Colors.neutral[900],
    card: Colors.neutral[800],
    text: Colors.neutral[100],
    border: Colors.neutral[700],
    notification: Colors.accent[400],
  },
  dark: true,
};

// Export theme object
export const theme = {
  colors: Colors,
  typography: typography,
  spacing: spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  animation: Animation,
  lightTheme: LightTheme,
  darkTheme: DarkTheme,
};
