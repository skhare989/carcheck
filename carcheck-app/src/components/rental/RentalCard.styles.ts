import { StyleSheet } from 'react-native';
import { spacing, colors } from '../../constants';

export const rentalCardStyles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyIcon: {
    margin: 0,
    marginRight: spacing.xs,
  },
  companyName: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuButton: {
    margin: 0,
  },
  plateStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  licensePlate: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statusChip: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray300,
    marginVertical: spacing.sm,
  },
  makeModel: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  date: {
    color: colors.textSecondary,
  },
});
