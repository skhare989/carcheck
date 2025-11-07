/**
 * ProgressHeader - Displays checklist completion progress
 */

import React from 'react';
import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { colors } from '../../constants';
import { progressHeaderStyles as styles } from './ProgressHeader.styles';

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
