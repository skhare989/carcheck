import { StyleSheet } from 'react-native';
import { colors, spacing, fontWeight, dimensions } from '../../constants';

export const progressHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    borderRadius: dimensions.borderRadius.sm,
    backgroundColor: colors.gray200,
  },
});
