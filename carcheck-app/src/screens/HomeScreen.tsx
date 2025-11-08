import React, { useState, useCallback } from 'react';
import { View, SectionList, RefreshControl } from 'react-native';
import { Text, FAB, IconButton, Portal, Dialog, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { HomeScreenProps } from '../types/navigation';
import { Rental } from '../types/rental';
import { getRentals, deleteRental } from '../utils/storage';
import { deleteRentalPhotos } from '../utils/photoStorage';
import { RentalCard } from '../components/rental';
import { colors } from '../constants';
import { homeScreenStyles as styles } from './HomeScreen.styles';

interface RentalSection {
  title: string;
  count: number;
  data: Rental[];
  isCollapsible?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [completedExpanded, setCompletedExpanded] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState<Rental | null>(null);

  // Load rentals from storage
  const loadRentals = useCallback(async () => {
    try {
      const allRentals = await getRentals();
      setRentals(allRentals);
    } catch (error) {
      console.error('Failed to load rentals:', error);
    }
  }, []);

  // Load rentals on screen focus
  useFocusEffect(
    useCallback(() => {
      loadRentals();
    }, [loadRentals])
  );

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadRentals();
    setRefreshing(false);
  }, [loadRentals]);

  // Group rentals by status
  const getSections = (): RentalSection[] => {
    const inProgress = rentals.filter((r) => r.status === 'in_progress');
    const pending = rentals.filter((r) => r.status === 'pending');
    const completed = rentals.filter((r) => r.status === 'completed');

    const sections: RentalSection[] = [];

    if (inProgress.length > 0) {
      sections.push({
        title: `🔵 IN PROGRESS (${inProgress.length})`,
        count: inProgress.length,
        data: inProgress,
      });
    }

    if (pending.length > 0) {
      sections.push({
        title: `⏱️ PENDING (${pending.length})`,
        count: pending.length,
        data: pending,
      });
    }

    if (completed.length > 0) {
      sections.push({
        title: `✅ COMPLETED (${completed.length})`,
        count: completed.length,
        data: completedExpanded ? completed : [],
        isCollapsible: true,
      });
    }

    return sections;
  };

  // Smart navigation based on rental status
  const handleRentalPress = (rental: Rental) => {
    if (rental.status === 'completed') {
      navigation.navigate('RentalDetail', { rentalId: rental.id });
    } else {
      navigation.navigate('Checklist', { rentalId: rental.id });
    }
  };

  // Handle delete rental
  const handleDeletePress = (rental: Rental) => {
    setRentalToDelete(rental);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (!rentalToDelete) return;

    try {
      // Delete photos from file system
      await deleteRentalPhotos(rentalToDelete.id);

      // Delete rental metadata
      await deleteRental(rentalToDelete.id);

      await loadRentals();
      setDeleteDialogVisible(false);
      setRentalToDelete(null);
    } catch (error) {
      console.error('Failed to delete rental:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogVisible(false);
    setRentalToDelete(null);
  };

  // Get delete dialog message
  const getDeleteMessage = () => {
    if (!rentalToDelete) return '';

    const photoCount = rentalToDelete.photos.length;

    if (photoCount > 0) {
      return `This rental has ${photoCount} photo${
        photoCount > 1 ? 's' : ''
      }. Deleting this rental will permanently delete all associated photos. This cannot be undone.`;
    }

    return 'Are you sure you want to delete this rental?';
  };

  // Render section header
  const renderSectionHeader = ({ section }: { section: RentalSection }) => {
    if (section.isCollapsible) {
      return (
        <View style={styles.sectionHeader}>
          <Text variant="titleSmall" style={styles.sectionHeaderText}>
            {section.title}
          </Text>
          <IconButton
            icon={completedExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            onPress={() => setCompletedExpanded(!completedExpanded)}
          />
        </View>
      );
    }

    return (
      <View style={styles.sectionHeader}>
        <Text variant="titleSmall" style={styles.sectionHeaderText}>
          {section.title}
        </Text>
      </View>
    );
  };

  // Render rental card
  const renderRentalCard = ({ item }: { item: Rental }) => (
    <RentalCard
      rental={item}
      onPress={() => handleRentalPress(item)}
      onDelete={() => handleDeletePress(item)}
      onEdit={
        item.status !== 'completed'
          ? () => {
              // TODO: Navigate to edit screen when implemented
              console.log('Edit rental:', item.id);
            }
          : undefined
      }
      onExport={
        item.status === 'completed'
          ? () => {
              // TODO: Navigate to export when implemented
              console.log('Export rental:', item.id);
            }
          : undefined
      }
    />
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text variant="displaySmall" style={styles.emptyIcon}>
        📋
      </Text>
      <Text variant="headlineSmall" style={styles.emptyText}>
        No rentals yet
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubtext}>
        Start documenting your first rental car to protect yourself from damage
        charges.
      </Text>
    </View>
  );

  const sections = getSections();
  const hasRentals = rentals.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          CarCheck
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Document your rental car and protect yourself from false damage
          charges
        </Text>
      </View>

      {/* Rental List or Empty State */}
      {hasRentals ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderRentalCard}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
            />
          }
        />
      ) : (
        renderEmptyState()
      )}

      {/* FAB Button */}
      <FAB
        icon="plus"
        label="Start New Rental"
        style={styles.fab}
        onPress={() => navigation.navigate('NewRental')}
      />

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={cancelDelete}>
          <Dialog.Title>Delete Rental</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{getDeleteMessage()}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelDelete}>Cancel</Button>
            <Button
              onPress={confirmDelete}
              textColor={colors.error}
              mode={rentalToDelete?.photos.length ? 'contained' : 'text'}
              buttonColor={
                rentalToDelete?.photos.length ? colors.error : undefined
              }
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
