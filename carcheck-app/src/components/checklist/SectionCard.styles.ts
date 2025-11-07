import { StyleSheet } from 'react-native';
import { colors, spacing, dimensions } from '../../constants';

export const sectionCardStyles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  cardComplete: {
    borderColor: colors.success,
    borderWidth: 2,
  },
  cardContent: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipComplete: {
    backgroundColor: colors.successLight,
  },
  chipCompleteText: {
    color: colors.success,
    fontWeight: '600',
  },
  chipIncomplete: {
    backgroundColor: colors.gray100,
  },
  chipIncompleteText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  titleRow: {
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  description: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  photoCountRow: {
    marginBottom: spacing.sm,
  },
  photoCount: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  thumbnailWrapper: {
    width: 80,
    height: 80,
    borderRadius: dimensions.borderRadius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: spacing.xs,
  },
  primaryButton: {
    borderRadius: dimensions.borderRadius.sm,
  },
  secondaryButton: {
    borderRadius: dimensions.borderRadius.sm,
  },
});
