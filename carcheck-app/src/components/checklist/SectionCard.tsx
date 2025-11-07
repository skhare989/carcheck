/**
 * SectionCard - Individual checklist section with photo capture
 */

import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, Chip, TouchableRipple } from 'react-native-paper';
import { ChecklistSection } from '../../constants';
import { colors, spacing, dimensions } from '../../constants';
import { Photo } from '../../types/rental';

interface SectionCardProps {
  section: ChecklistSection;
  photos: Photo[];
  onTakePhoto: (sectionId: string) => void;
  onViewPhotos?: (sectionId: string) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  photos,
  onTakePhoto,
  onViewPhotos,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isComplete = photos.length >= section.minPhotos;
  const photoCount = photos.length;
  const canAddMore = photos.length < section.maxPhotos;

  const handleCardPress = () => {
    if (isComplete && photos.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleTakePhoto = () => {
    onTakePhoto(section.id);
  };

  return (
    <Card
      style={[styles.card, isComplete && styles.cardComplete]}
      mode="outlined"
    >
      <TouchableRipple
        onPress={handleCardPress}
        disabled={!isComplete}
        rippleColor="rgba(0, 0, 0, .08)"
      >
        <Card.Content style={styles.cardContent}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              {isComplete ? (
                <Chip
                  icon="check-circle"
                  mode="flat"
                  style={styles.chipComplete}
                  textStyle={styles.chipCompleteText}
                >
                  Complete
                </Chip>
              ) : (
                <Chip
                  icon="circle-outline"
                  mode="flat"
                  style={styles.chipIncomplete}
                  textStyle={styles.chipIncompleteText}
                >
                  Pending
                </Chip>
              )}
            </View>
          </View>

          {/* Section Title */}
          <View style={styles.titleRow}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {section.title}
            </Text>
          </View>

          {/* Description */}
          <Text variant="bodySmall" style={styles.description}>
            {section.description}
          </Text>

          {/* Photo Count */}
          <View style={styles.photoCountRow}>
            <Text variant="bodyMedium" style={styles.photoCount}>
              {photoCount === 0
                ? 'No photos yet'
                : `${photoCount} photo${photoCount !== 1 ? 's' : ''} captured`}
            </Text>
          </View>

          {/* Expanded: Photo Thumbnails */}
          {isExpanded && photos.length > 0 && (
            <View style={styles.thumbnailContainer}>
              {photos.map((photo) => (
                <TouchableRipple
                  key={photo.id}
                  style={styles.thumbnailWrapper}
                  onPress={() => onViewPhotos?.(section.id)}
                  rippleColor="rgba(0, 0, 0, .15)"
                  borderless={false}
                >
                  <Image
                    source={{ uri: photo.uri }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                </TouchableRipple>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {!isComplete ? (
              <Button
                mode="contained"
                onPress={handleTakePhoto}
                icon="camera"
                style={styles.primaryButton}
              >
                Take First Photo
              </Button>
            ) : (
              <>
                {isExpanded && canAddMore && (
                  <Button
                    mode="outlined"
                    onPress={handleTakePhoto}
                    icon="camera-plus"
                    style={styles.secondaryButton}
                  >
                    Add Another Photo
                  </Button>
                )}
                {!isExpanded && (
                  <Button
                    mode="outlined"
                    onPress={handleCardPress}
                    icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                    style={styles.secondaryButton}
                  >
                    Tap to view/add more
                  </Button>
                )}
              </>
            )}
          </View>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  cardComplete: {
    borderColor: colors.success,
    borderWidth: 2,
  },
  cardContent: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipComplete: {
    backgroundColor: colors.successLight,
  },
  chipCompleteText: {
    color: colors.success,
    fontWeight: '600',
  },
  chipIncomplete: {
    backgroundColor: colors.gray100,
  },
  chipIncompleteText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  titleRow: {
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  description: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  photoCountRow: {
    marginBottom: spacing.sm,
  },
  photoCount: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  thumbnailWrapper: {
    width: 80,
    height: 80,
    borderRadius: dimensions.borderRadius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: spacing.xs,
  },
  primaryButton: {
    borderRadius: dimensions.borderRadius.sm,
  },
  secondaryButton: {
    borderRadius: dimensions.borderRadius.sm,
  },
});
