/**
 * Storage utilities for managing rentals
 * Uses AsyncStorage for local persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rental } from '../types/rental';

const RENTALS_KEY = '@carcheck:rentals';

/**
 * Get all rentals from storage
 */
export const getRentals = async (): Promise<Rental[]> => {
  try {
    const rentalsJson = await AsyncStorage.getItem(RENTALS_KEY);
    if (!rentalsJson) {
      return [];
    }

    const rentals = JSON.parse(rentalsJson);

    // Convert date strings back to Date objects
    return rentals.map((rental: any) => ({
      ...rental,
      createdAt: new Date(rental.createdAt),
      rentalStartDate: new Date(rental.rentalStartDate),
      photos: rental.photos.map((photo: any) => ({
        ...photo,
        timestamp: new Date(photo.timestamp),
      })),
    }));
  } catch (error) {
    console.error('Error loading rentals:', error);
    return [];
  }
};

/**
 * Get a single rental by ID
 */
export const getRentalById = async (id: string): Promise<Rental | null> => {
  try {
    const rentals = await getRentals();
    return rentals.find(rental => rental.id === id) || null;
  } catch (error) {
    console.error('Error loading rental:', error);
    return null;
  }
};

/**
 * Save a new rental
 */
export const saveRental = async (rental: Rental): Promise<void> => {
  try {
    const rentals = await getRentals();
    rentals.push(rental);
    await AsyncStorage.setItem(RENTALS_KEY, JSON.stringify(rentals));
  } catch (error) {
    console.error('Error saving rental:', error);
    throw error;
  }
};

/**
 * Update an existing rental
 */
export const updateRental = async (rental: Rental): Promise<void> => {
  try {
    const rentals = await getRentals();
    const index = rentals.findIndex(r => r.id === rental.id);

    if (index === -1) {
      throw new Error('Rental not found');
    }

    rentals[index] = rental;
    await AsyncStorage.setItem(RENTALS_KEY, JSON.stringify(rentals));
  } catch (error) {
    console.error('Error updating rental:', error);
    throw error;
  }
};

/**
 * Delete a rental
 */
export const deleteRental = async (id: string): Promise<void> => {
  try {
    const rentals = await getRentals();
    const filtered = rentals.filter(rental => rental.id !== id);
    await AsyncStorage.setItem(RENTALS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting rental:', error);
    throw error;
  }
};

/**
 * Clear all rentals (for testing/debugging)
 */
export const clearAllRentals = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(RENTALS_KEY);
  } catch (error) {
    console.error('Error clearing rentals:', error);
    throw error;
  }
};
