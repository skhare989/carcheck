/**
 * Spacing system for CarCheck app
 * Based on 8px grid system (Material Design)
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 999,
} as const;

/**
 * Touch target sizes (Material Design minimum 48dp)
 */
export const touchTarget = {
  min: 44, // iOS minimum
  recommended: 48, // Material Design recommended
} as const;

/**
 * Icon sizes
 */
export const iconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export type SpacingKey = keyof typeof spacing;
