/**
 * ChecklistScreen - Photo checklist for rental car documentation
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { ChecklistScreenProps } from '../types/navigation';
import { CHECKLIST_SECTIONS, getTotalSections } from '../constants';
import { Rental } from '../types/rental';
import { getRentalById, updateRental } from '../utils/storage';
import { ProgressHeader } from '../components/checklist/ProgressHeader';
import { SectionCard } from '../components/checklist/SectionCard';
import { useFocusEffect } from '@react-navigation/native';
import { checklistScreenStyles as styles } from './ChecklistScreen.styles';

export const ChecklistScreen: React.FC<ChecklistScreenProps> = ({ navigation, route }) => {
  const { rentalId } = route.params;

  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load rental data
  const loadRental = useCallback(async () => {
    try {
      const rentalData = await getRentalById(rentalId);
      if (rentalData) {
        setRental(rentalData);
      } else {
        Alert.alert('Error', 'Rental not found');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading rental:', error);
      Alert.alert('Error', 'Failed to load rental data');
    } finally {
      setLoading(false);
    }
  }, [rentalId, navigation]);

  // Load rental on mount and when screen gains focus
  useEffect(() => {
    loadRental();
  }, [loadRental]);

  // Reload when returning from camera
  useFocusEffect(
    useCallback(() => {
      if (!loading) {
        loadRental();
      }
    }, [loading, loadRental])
  );

  // Calculate completion stats
  const getCompletedSectionsCount = (): number => {
    if (!rental) return 0;

    return CHECKLIST_SECTIONS.filter((section) => {
      const sectionPhotos = rental.photos.filter(
        (photo) => photo.section === section.id
      );
      return sectionPhotos.length >= section.minPhotos;
    }).length;
  };

  const completedSections = getCompletedSectionsCount();
  const totalSections = getTotalSections();
  const isChecklistComplete = completedSections === totalSections;

  // Get photos for a specific section
  const getPhotosForSection = (sectionId: string) => {
    if (!rental) return [];
    return rental.photos.filter((photo) => photo.section === sectionId);
  };

  // Navigate to camera screen
  const handleTakePhoto = (sectionId: string) => {
    navigation.navigate('Camera', { rentalId, sectionId });
  };

  // View photos for a section
  const handleViewPhotos = (sectionId: string) => {
    // TODO: Navigate to photo viewer when implemented
    const photos = getPhotosForSection(sectionId);
    Alert.alert('View Photos', `Section has ${photos.length} photos`);
  };

  // Save for later (update status to pending)
  const handleSaveForLater = async () => {
    if (!rental) return;

    setIsSaving(true);
    try {
      const updatedRental: Rental = {
        ...rental,
        status: 'pending',
      };

      await updateRental(updatedRental);
      Alert.alert('Saved', 'Your progress has been saved. You can continue later.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.error('Error saving rental:', error);
      Alert.alert('Error', 'Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  // Complete checklist
  const handleCompleteChecklist = async () => {
    if (!rental) return;

    if (!isChecklistComplete) {
      Alert.alert(
        'Incomplete Checklist',
        'Please complete all sections before finishing the checklist.'
      );
      return;
    }

    setIsSaving(true);
    try {
      const updatedRental: Rental = {
        ...rental,
        status: 'completed',
      };

      await updateRental(updatedRental);
      Alert.alert(
        'Checklist Complete!',
        'Your rental car documentation is complete. You can now export and share your report.',
        [
          {
            text: 'View Details',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      console.error('Error completing rental:', error);
      Alert.alert('Error', 'Failed to complete checklist');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !rental) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text variant="bodyLarge">Loading checklist...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Photo Checklist" />
      </Appbar.Header>

      {/* Rental Info */}
      <View style={styles.rentalInfo}>
        <Text variant="titleMedium" style={styles.rentalCompany}>
          {rental.company}
        </Text>
        <Text variant="bodyMedium" style={styles.rentalDetails}>
          License Plate: {rental.licensePlate}
          {rental.make && ` • ${rental.make}`}
        </Text>
      </View>

      {/* Progress Header */}
      <ProgressHeader
        completedSections={completedSections}
        totalSections={totalSections}
      />

      {/* Checklist Sections */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {CHECKLIST_SECTIONS.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            photos={getPhotosForSection(section.id)}
            onTakePhoto={handleTakePhoto}
            onViewPhotos={handleViewPhotos}
          />
        ))}

        {/* Completion Message */}
        {isChecklistComplete && (
          <View style={styles.completionMessage}>
            <Text variant="titleMedium" style={styles.completionText}>
              ✓ All sections complete!
            </Text>
            <Text variant="bodyMedium" style={styles.completionSubtext}>
              You're ready to complete the checklist.
            </Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={handleSaveForLater}
          style={styles.secondaryButton}
          disabled={isSaving}
        >
          Save for Later
        </Button>
        <Button
          mode="contained"
          onPress={handleCompleteChecklist}
          style={styles.primaryButton}
          disabled={!isChecklistComplete || isSaving}
          loading={isSaving}
        >
          Complete Checklist
        </Button>
      </View>
    </View>
  );
};
