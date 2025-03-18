import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { fontFamily } from './fonts';

// Define our custom color palette
export const Colors = {
  // Primary colors - switching to soft gray-blue palette
  primary: {
    50: '#F0F4F8',
    100: '#D9E2EC',
    200: '#BCCCDC',
    300: '#9FB3C8',
    400: '#829AB1', // Main primary color
    500: '#627D98',
    600: '#486581',
    700: '#334E68',
    800: '#243B53',
    900: '#102A43',
  },
  // Secondary colors - subtle teal
  secondary: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC', // Main secondary color
    500: '#319795',
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },
  // Accent colors - soft amber
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Main accent color
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  // Neutral colors - enhanced with softer tones
  neutral: {
    50: '#F7FAFC', // Light mode background
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C', // Dark mode background
    900: '#171923',
  },
  // Semantic colors - softer tones
  success: '#48BB78',
  warning: '#F6AD55',
  error: '#F56565',
  info: '#63B3ED',
  // Dream theme colors
  dreamBlue: '#4299E1',
  dreamTeal: '#38B2AC',
  dreamAmber: '#F6AD55',
  dreamGray: '#A0AEC0',
  // Transparent colors for overlays
  transparentLight: 'rgba(247, 250, 252, 0.1)',
  transparentDark: 'rgba(26, 32, 44, 0.1)',
  transparentTeal: 'rgba(56, 178, 172, 0.1)',
  transparentAmber: 'rgba(246, 173, 85, 0.1)',
  // Gradient colors
  gradients: {
    primary: ['#334E68', '#486581'],
    secondary: ['#285E61', '#38B2AC'],
    accent: ['#B45309', '#F59E0B'],
    dark: ['#171923', '#1A202C'],
    light: ['#F7FAFC', '#EDF2F7'],
  }
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

// Define border radius - Updated with more modern values
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  '2xl': 32,
  pill: 9999,
};

// Define shadows with more modern, subtle effects
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
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
    primary: Colors.primary[500],
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
    background: Colors.neutral[900], // Darker background for more contrast
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