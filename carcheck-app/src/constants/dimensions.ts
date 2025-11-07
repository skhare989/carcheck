/**
 * Centralized component dimensions and styling values
 * Follows Material Design 3 guidelines
 */

export const dimensions = {
  // Border radius
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Component heights
  minHeight: {
    button: 40,
    input: 56, // Material Design 3 standard
    touchTarget: 44, // Minimum touch target size
  },

  // Border widths
  borderWidth: {
    thin: 1,
    medium: 2,
    thick: 3,
  },

  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Common widths
  maxWidth: {
    form: 600,
    card: 400,
  },
} as const;

export type DimensionKey = keyof typeof dimensions;
