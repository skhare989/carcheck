/**
 * Theme configuration for CarCheck app
 * Using React Native Paper's Material Design 3 theme system
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { colors } from './colors';

/**
 * Light theme (default)
 */
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryLight,
    error: colors.error,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.gray100,
    onPrimary: colors.white,
    onSecondary: colors.white,
    onBackground: colors.textPrimary,
    onSurface: colors.textPrimary,
  },
};

/**
 * Dark theme (for future implementation)
 */
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primaryLight,
    primaryContainer: colors.primary,
    secondary: colors.secondaryLight,
    secondaryContainer: colors.secondary,
    error: colors.error,
    background: colors.gray900,
    surface: colors.gray800,
    surfaceVariant: colors.gray700,
    onPrimary: colors.black,
    onSecondary: colors.black,
    onBackground: colors.white,
    onSurface: colors.white,
  },
};

// Export the default theme
export const theme = lightTheme;

// Export type for theme
export type AppTheme = typeof lightTheme;
