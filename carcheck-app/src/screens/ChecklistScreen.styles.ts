import { StyleSheet } from 'react-native';
import { colors, spacing } from '../constants';

export const checklistScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rentalInfo: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  rentalCompany: {
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  rentalDetails: {
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  completionMessage: {
    backgroundColor: colors.successLight,
    padding: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  completionText: {
    color: colors.success,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  completionSubtext: {
    color: colors.success,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
  buttonContainer: {
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    flexDirection: 'row',
  },
  primaryButton: {
    flex: 1,
  },
  secondaryButton: {
    flex: 1,
  },
});
