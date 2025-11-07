/**
 * SectionCard - Individual checklist section with photo capture
 */

import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button, Chip, TouchableRipple } from 'react-native-paper';
import { ChecklistSection } from '../../constants';
import { Photo } from '../../types/rental';
import { sectionCardStyles as styles } from './SectionCard.styles';

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
