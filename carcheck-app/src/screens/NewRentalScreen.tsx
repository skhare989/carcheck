import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NewRentalScreenProps } from '../types/navigation';
import { colors, spacing } from '../constants';

export const NewRentalScreen: React.FC<NewRentalScreenProps> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          New Rental
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          This is the New Rental screen. We'll build the form here next!
        </Text>

        <Button
          mode="contained"
          onPress={handleGoBack}
          style={styles.button}
        >
          Go Back to Home
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
    marginBottom: spacing.xl,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.lg,
  },
});
