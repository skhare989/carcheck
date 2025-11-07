/**
 * ProgressHeader - Displays checklist completion progress
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { colors, spacing } from '../../constants';

interface ProgressHeaderProps {
  completedSections: number;
  totalSections: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  completedSections,
  totalSections,
}) => {
  const progress = totalSections > 0 ? completedSections / totalSections : 0;
  const percentage = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="titleMedium" style={styles.title}>
          Progress: {percentage}%
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {completedSections}/{totalSections} sections complete
        </Text>
      </View>
      <ProgressBar
        progress={progress}
        color={colors.primary}
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray200,
  },
});
