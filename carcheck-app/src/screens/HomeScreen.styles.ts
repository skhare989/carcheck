import { StyleSheet } from 'react-native';
import { colors, spacing } from '../constants';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gray100,
  },
  sectionHeaderText: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    marginBottom: spacing.md,
  },
  emptyText: {
    marginBottom: spacing.sm,
    color: colors.textDisabled,
  },
  emptySubtext: {
    color: colors.textDisabled,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: spacing.md,
    right: 0,
    bottom: 0,
  },
});
