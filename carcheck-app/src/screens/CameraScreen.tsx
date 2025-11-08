import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Linking } from 'react-native';
import { Text, IconButton, ActivityIndicator, Button } from 'react-native-paper';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { CameraScreenProps } from '../types/navigation';
import { savePhoto } from '../utils/photoStorage';
import { getRentalById, updateRental } from '../utils/storage';
import { CHECKLIST_SECTIONS } from '../constants/checklistSections';
import { colors } from '../constants';
import { cameraScreenStyles as styles } from './CameraScreen.styles';

type FlashModeType = 'auto' | 'on' | 'off';

export const CameraScreen: React.FC<CameraScreenProps> = ({ route, navigation }) => {
  const { rentalId, sectionId } = route.params;

  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus | null>(null);
  const [flashMode, setFlashMode] = useState<FlashModeType>('auto');
  const [isCapturing, setIsCapturing] = useState(false);

  // Get section details
  const section = CHECKLIST_SECTIONS.find((s) => s.id === sectionId);

  // Request location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      if (status !== 'granted') {
        console.log('Location permission denied');
      }
    })();
  }, []);

  // Request camera permission if not granted
  useEffect(() => {
    if (cameraPermission && !cameraPermission.granted && cameraPermission.canAskAgain) {
      requestCameraPermission();
    }
  }, [cameraPermission]);

  // Pre-warm GPS hardware when camera screen mounts
  // This improves subsequent location requests
  useEffect(() => {
    const preWarmGPS = async () => {
      if (locationPermission === 'granted') {
        try {
          // Request location in background to warm up GPS
          // Fire and forget - don't await
          Location.getLastKnownPositionAsync({
            maxAge: 0, // Ensure fresh request to wake up GPS
          }).catch(() => {
            // Silently fail - this is just pre-warming
          });
        } catch (error) {
          // Pre-warm failures are non-critical
          console.log('GPS pre-warming skipped:', error);
        }
      }
    };

    preWarmGPS();
  }, [locationPermission]);

  // Toggle flash mode
  const toggleFlash = () => {
    setFlashMode((prev) => {
      if (prev === 'auto') return 'off';
      if (prev === 'off') return 'on';
      return 'auto';
    });
  };

  // Get flash icon
  const getFlashIcon = () => {
    if (flashMode === 'on') return 'flash';
    if (flashMode === 'off') return 'flash-off';
    return 'flash-auto';
  };

  // Get flash label
  const getFlashLabel = () => {
    return flashMode.toUpperCase();
  };

  // Optimized location acquisition with cached fallback and timeout
  const getOptimizedLocation = async (): Promise<{ latitude: number; longitude: number } | undefined> => {
    if (locationPermission !== 'granted') {
      return undefined;
    }

    try {
      // Phase 1: Try cached location first (instant, 0-50ms)
      const lastLocation = await Location.getLastKnownPositionAsync({
        maxAge: 60000, // Accept cached location up to 1 minute old
      });

      if (lastLocation && lastLocation.coords.accuracy) {
        console.log('Using cached location, accuracy:', lastLocation.coords.accuracy);
        return {
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
        };
      }

      // Phase 2: Request fresh location with low accuracy (1-2 seconds)
      // Use timeout to prevent indefinite waiting
      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low, // 100-500m, much faster than Balanced
      });

      const loc = await Promise.race([
        locationPromise,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Location request timeout')), 3000)
        ),
      ]);

      console.log('Using fresh location, accuracy:', loc.coords.accuracy);
      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    } catch (error) {
      console.log('Failed to get GPS location:', error instanceof Error ? error.message : error);
      // Gracefully return undefined - photo capture continues without GPS
      return undefined;
    }
  };

  // Capture photo
  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);

      // Take photo
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      if (!photo) {
        throw new Error('Failed to capture photo');
      }

      // Run location fetch and photo save in parallel for better performance
      const [location, savedPhoto] = await Promise.all([
        getOptimizedLocation(), // Get location with cached fallback
        savePhoto(rentalId, sectionId, photo.uri, undefined), // Save photo first without location
      ]);

      // Update photo with location if available
      if (location) {
        savedPhoto.location = location;
      }

      // Update rental with new photo
      const rental = await getRentalById(rentalId);
      if (rental) {
        rental.photos.push(savedPhoto);

        // Update status to in_progress if it was pending
        if (rental.status === 'pending') {
          rental.status = 'in_progress';
        }

        await updateRental(rental);
      }

      // Navigate back to checklist
      navigation.goBack();
    } catch (error) {
      console.error('Failed to capture and save photo:', error);
      // TODO: Show error snackbar
      setIsCapturing(false);
    }
  };

  // Handle close
  const handleClose = () => {
    navigation.goBack();
  };

  // Open settings
  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // Loading state
  if (!cameraPermission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text variant="bodyMedium" style={{ marginTop: 16 }}>
          Loading camera...
        </Text>
      </View>
    );
  }

  // Permission denied state
  if (!cameraPermission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="displaySmall" style={styles.errorIcon}>
          📷
        </Text>
        <Text variant="headlineSmall" style={styles.errorTitle}>
          Camera Permission Required
        </Text>
        <Text variant="bodyMedium" style={styles.errorMessage}>
          CarCheck needs camera access to take photos of your rental vehicle for
          documentation and protection against false damage charges.
        </Text>
        {cameraPermission.canAskAgain ? (
          <Button mode="contained" onPress={requestCameraPermission}>
            Grant Permission
          </Button>
        ) : (
          <Button mode="contained" onPress={openSettings}>
            Open Settings
          </Button>
        )}
        <Button
          mode="text"
          onPress={handleClose}
          style={{ marginTop: 16 }}
        >
          Go Back
        </Button>
      </View>
    );
  }

  // Camera view
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        flash={flashMode}
      >
        {/* Controls overlay */}
        <View style={styles.controlsContainer}>
          {/* Top controls */}
          <View style={styles.topControls}>
            <IconButton
              icon="close"
              iconColor={colors.white}
              size={28}
              onPress={handleClose}
              style={styles.closeButton}
            />
            <IconButton
              icon={getFlashIcon()}
              iconColor={colors.white}
              size={24}
              onPress={toggleFlash}
              style={styles.flashButton}
            />
          </View>

          {/* Guidance overlay */}
          {section && (
            <View style={styles.guidanceOverlay}>
              <Text variant="titleMedium" style={styles.guidanceTitle}>
                {section.title}
              </Text>
              <Text variant="bodyMedium" style={styles.guidanceText}>
                {section.description}
              </Text>
            </View>
          )}

          {/* Capture button */}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};
