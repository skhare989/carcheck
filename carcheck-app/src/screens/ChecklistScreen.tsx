/**
 * ChecklistScreen - Photo checklist for rental car documentation
 * TODO: Implement the 6-section photo checklist
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ChecklistScreenProps } from '../types/navigation';
import { colors, spacing } from '../constants';

export const ChecklistScreen: React.FC<ChecklistScreenProps> = ({ navigation, route }) => {
  const { rentalId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Photo Checklist
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Rental ID: {rentalId}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          This screen will contain the 6-section photo checklist. Coming soon!
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Back to Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    marginBottom: spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  description: {
    marginBottom: spacing.xl,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.lg,
  },
});
