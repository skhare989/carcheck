import { StyleSheet } from 'react-native';
import { colors, spacing, dimensions } from '../constants';

export const newRentalScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
  },
  dateButton: {
    backgroundColor: colors.surface,
    borderWidth: dimensions.borderWidth.thin,
    borderColor: colors.gray300,
    borderRadius: dimensions.borderRadius.sm,
    padding: spacing.md,
    minHeight: dimensions.minHeight.input,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: dimensions.borderWidth.thin,
    borderTopColor: colors.gray200,
  },
  primaryButton: {
    paddingVertical: spacing.xs,
  },
  secondaryButton: {
    paddingVertical: spacing.xs,
  },
});
