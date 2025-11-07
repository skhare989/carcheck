import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { HomeScreenProps } from '../types/navigation';
import { colors, spacing } from '../constants';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleStartNewRental = () => {
    navigation.navigate('NewRental');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          CarCheck
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Document your rental car and protect yourself from false damage charges
        </Text>

        <View style={styles.emptyState}>
          <Text variant="bodyMedium" style={styles.emptyText}>
            No rentals yet
          </Text>
          <Text variant="bodySmall" style={styles.emptySubtext}>
            Tap the button below to start your first inspection
          </Text>
        </View>
      </View>

      <FAB
        icon="plus"
        label="Start New Rental"
        style={styles.fab}
        onPress={handleStartNewRental}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
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
