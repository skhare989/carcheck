/**
 * Photo Storage Utility
 * Manages photo files on device storage
 *
 * Storage Structure:
 * photos/
 * ├── rental_{rentalId}/
 * │   ├── {sectionId}_{timestamp}.jpg
 * │   └── ...
 */

import { Paths, Directory, File } from 'expo-file-system';
import { Photo } from '../types/rental';

// Base photos directory
const getPhotosDirectory = () => new Directory(Paths.document, 'photos');

/**
 * Initialize the base photos directory
 * Call this once on app startup
 */
export async function initPhotoDirectory(): Promise<void> {
  try {
    const photosDir = getPhotosDirectory();

    if (!photosDir.exists) {
      await photosDir.create();
      console.log('Photos directory created:', photosDir.uri);
    }
  } catch (error) {
    console.error('Failed to initialize photos directory:', error);
  }
}

/**
 * Get the directory for a specific rental
 */
function getRentalPhotoDirectory(rentalId: string): Directory {
  return new Directory(getPhotosDirectory(), `rental_${rentalId}`);
}

/**
 * Save a photo to the rental's directory
 * Creates the rental directory if it doesn't exist
 *
 * @param rentalId - The rental ID
 * @param sectionId - The section ID (e.g., 'front_exterior')
 * @param photoUri - The temporary photo URI from camera
 * @param location - Optional GPS coordinates
 * @returns Photo metadata object
 */
export async function savePhoto(
  rentalId: string,
  sectionId: string,
  photoUri: string,
  location?: { latitude: number; longitude: number }
): Promise<Photo> {
  try {
    // Get rental directory
    const rentalDir = getRentalPhotoDirectory(rentalId);

    // Create rental directory if it doesn't exist
    if (!rentalDir.exists) {
      await rentalDir.create();
      console.log('Created rental photo directory:', rentalDir.uri);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${sectionId}_${timestamp}.jpg`;
    const destinationFile = new File(rentalDir, filename);

    // Copy photo from temp location to permanent storage
    const sourceFile = new File(photoUri);
    await sourceFile.copy(destinationFile);

    console.log('Photo saved:', destinationFile.uri);

    // Create and return Photo metadata
    const photo: Photo = {
      id: `${rentalId}_${sectionId}_${timestamp}`,
      uri: destinationFile.uri,
      section: sectionId,
      timestamp: new Date(),
      location,
    };

    return photo;
  } catch (error) {
    console.error('Failed to save photo:', error);
    throw error;
  }
}

/**
 * Delete a single photo file
 *
 * @param photoUri - The file URI to delete
 */
export async function deletePhoto(photoUri: string): Promise<void> {
  try {
    const file = new File(photoUri);

    if (file.exists) {
      await file.delete();
      console.log('Photo deleted:', photoUri);
    } else {
      console.log('Photo does not exist, skipping deletion:', photoUri);
    }
  } catch (error) {
    console.error('Failed to delete photo:', error);
    // Don't throw - graceful failure
  }
}

/**
 * Delete all photos for a rental
 * Deletes the entire rental directory
 *
 * @param rentalId - The rental ID
 */
export async function deleteRentalPhotos(rentalId: string): Promise<void> {
  try {
    const rentalDir = getRentalPhotoDirectory(rentalId);

    if (rentalDir.exists) {
      await rentalDir.delete();
      console.log('Rental photos deleted:', rentalDir.uri);
    } else {
      console.log('Rental photo directory does not exist, skipping:', rentalDir.uri);
    }
  } catch (error) {
    console.error('Failed to delete rental photos:', error);
    // Don't throw - graceful failure
  }
}

/**
 * Get all photo URIs for a rental
 * Useful for debugging or future features
 *
 * @param rentalId - The rental ID
 * @returns Array of photo URIs
 */
export async function getRentalPhotoUris(rentalId: string): Promise<string[]> {
  try {
    const rentalDir = getRentalPhotoDirectory(rentalId);

    if (!rentalDir.exists) {
      return [];
    }

    const items = rentalDir.list();
    return items
      .filter((item) => item instanceof File)
      .map((file) => file.uri);
  } catch (error) {
    console.error('Failed to get rental photo URIs:', error);
    return [];
  }
}
