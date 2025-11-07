import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, Chip, IconButton, Menu } from 'react-native-paper';
import { Rental, Photo } from '../../types/rental';
import { colors } from '../../constants';
import { rentalCardStyles as styles } from './RentalCard.styles';

interface RentalCardProps {
  rental: Rental;
  onPress: () => void;
  onEdit?: () => void;
  onDelete: () => void;
  onExport?: () => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({
  rental,
  onPress,
  onEdit,
  onDelete,
  onExport,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Calculate photo progress
  const totalSections = 6;
  const sectionsWithPhotos = rental.photos.reduce((acc, photo) => {
    if (!acc.includes(photo.section)) {
      acc.push(photo.section);
    }
    return acc;
  }, [] as string[]).length;

  // Get status badge configuration
  const getStatusConfig = () => {
    switch (rental.status) {
      case 'in_progress':
        return {
          label: `In Progress (${sectionsWithPhotos}/${totalSections})`,
          color: colors.info,
          icon: 'progress-clock',
        };
      case 'pending':
        return {
          label: `Pending (${sectionsWithPhotos}/${totalSections})`,
          color: colors.textSecondary,
          icon: 'clock-outline',
        };
      case 'completed':
        return {
          label: `Completed (${sectionsWithPhotos}/${totalSections})`,
          color: colors.success,
          icon: 'check-circle',
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Format date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get company icon (placeholder for now, can enhance later)
  const getCompanyIcon = (company: string) => {
    // For MVP, use a generic car icon
    // Later can map specific companies to their logos
    return 'car';
  };

  return (
    <Card style={styles.card} mode="elevated" onPress={onPress}>
      <Card.Content>
        {/* Header Row: Company and Menu */}
        <View style={styles.headerRow}>
          <View style={styles.companyRow}>
            <IconButton
              icon={getCompanyIcon(rental.company)}
              size={24}
              iconColor={colors.primary}
              style={styles.companyIcon}
            />
            <Text variant="titleMedium" style={styles.companyName}>
              {rental.company}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  onPress={(e) => {
                    setMenuVisible(true);
                  }}
                  rippleColor="transparent"
                  style={styles.menuButton}
                />
              }
            >
            {rental.status === 'completed' ? (
              <>
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(false);
                    onPress();
                  }}
                  title="View Details"
                  leadingIcon="eye"
                />
                {onExport && (
                  <Menu.Item
                    onPress={() => {
                      setMenuVisible(false);
                      onExport();
                    }}
                    title="Export PDF"
                    leadingIcon="file-pdf-box"
                  />
                )}
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(false);
                    onDelete();
                  }}
                  title="Delete Rental"
                  leadingIcon="delete"
                />
              </>
            ) : (
              <>
                {onEdit && (
                  <Menu.Item
                    onPress={() => {
                      setMenuVisible(false);
                      onEdit();
                    }}
                    title="Edit Details"
                    leadingIcon="pencil"
                  />
                )}
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(false);
                    onDelete();
                  }}
                  title="Delete Rental"
                  leadingIcon="delete"
                />
              </>
            )}
          </Menu>
          </TouchableOpacity>
        </View>

        {/* License Plate and Status Badge */}
        <View style={styles.plateStatusRow}>
          <Text variant="titleLarge" style={styles.licensePlate}>
            {rental.licensePlate}
          </Text>
          <Chip
            icon={statusConfig.icon}
            mode="flat"
            style={[styles.statusChip, { backgroundColor: `${statusConfig.color}20` }]}
            textStyle={{ color: statusConfig.color, fontSize: 12, lineHeight: 16 }}
          >
            {statusConfig.label}
          </Chip>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Make/Model */}
        <Text variant="bodyMedium" style={styles.makeModel}>
          {rental.make && rental.model
            ? `${rental.make} ${rental.model}`
            : rental.make || rental.model || 'No vehicle info'}
        </Text>

        {/* Creation Date */}
        <Text variant="bodySmall" style={styles.date}>
          Created {formatDate(rental.createdAt)}
        </Text>
      </Card.Content>
    </Card>
  );
};
