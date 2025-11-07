/**
 * CameraScreen - Guided photo capture
 * TODO: Implement camera functionality with expo-camera
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { CameraScreenProps } from '../types/navigation';
import { colors, spacing } from '../constants';

export const CameraScreen: React.FC<CameraScreenProps> = ({ navigation, route }) => {
  const { rentalId, sectionId } = route.params;

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Take Photo" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Camera Coming Soon
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Rental ID: {rentalId}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Section: {sectionId}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Camera functionality will be implemented using expo-camera.
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Back to Checklist
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
  header: {
    backgroundColor: colors.primary,
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
