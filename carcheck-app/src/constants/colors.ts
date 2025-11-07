/**
 * Color palette for CarCheck app
 * Based on Material Design 3 principles
 */

export const colors = {
  // Primary brand colors
  primary: '#1976D2', // Blue - trust and reliability
  primaryLight: '#63A4FF',
  primaryDark: '#004BA0',

  // Secondary colors
  secondary: '#424242',
  secondaryLight: '#6D6D6D',
  secondaryDark: '#1B1B1B',

  // Semantic colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',

  // Gray scale
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Text colors
  textPrimary: '#212121',
  textSecondary: '#666666',
  textDisabled: '#999999',
  textHint: '#BDBDBD',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  surface: '#FFFFFF',

  // Rental company colors (for future use)
  enterprise: '#00873E',
  hertz: '#FFC600',
  avis: '#D0021B',
  budget: '#FF6600',
} as const;

export type ColorKey = keyof typeof colors;
