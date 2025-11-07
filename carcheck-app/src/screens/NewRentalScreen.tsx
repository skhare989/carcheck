import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, Menu } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { NewRentalScreenProps } from '../types/navigation';
import { colors, spacing, dimensions, RENTAL_COMPANIES, isOtherCompany } from '../constants';
import { Rental } from '../types/rental';
import { saveRental } from '../utils/storage';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

export const NewRentalScreen: React.FC<NewRentalScreenProps> = ({ navigation }) => {
  // Form state
  const [company, setCompany] = useState<string>('');
  const [customCompany, setCustomCompany] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [rentalStartDate, setRentalStartDate] = useState<CalendarDate>(new Date());
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // UI state
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleCompanySelect = (selectedCompany: string) => {
    setCompany(selectedCompany);
    setErrors({ ...errors, company: '' });
    closeMenu();
  };

  const handleDateConfirm = (params: { date: CalendarDate }) => {
    setShowDatePicker(false);
    setRentalStartDate(params.date);
    setErrors({ ...errors, rentalStartDate: '' });
  };

  const handleDateDismiss = () => {
    setShowDatePicker(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate company
    if (!company) {
      newErrors.company = 'Rental company is required';
    } else if (isOtherCompany(company) && !customCompany.trim()) {
      newErrors.customCompany = 'Company name is required';
    }

    // Validate license plate
    if (!licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    } else if (licensePlate.trim().length < 3 || licensePlate.trim().length > 10) {
      newErrors.licensePlate = 'License plate must be 3-10 characters';
    }

    // Validate date (required and must not be in future)
    if (!rentalStartDate) {
      newErrors.rentalStartDate = 'Rental start date is required';
    } else if (rentalStartDate > new Date()) {
      newErrors.rentalStartDate = 'Rental start date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartChecklist = async () => {
    if (!validateForm()) {
      return;
    }

    // Validation guarantees these are defined
    if (!rentalStartDate) return;

    setIsSubmitting(true);

    try {
      const finalCompany = isOtherCompany(company) ? customCompany.trim() : company;

      const newRental: Rental = {
        id: `rental_${Date.now()}`,
        company: finalCompany,
        licensePlate: licensePlate.trim().toUpperCase(),
        rentalStartDate,
        make: make.trim() || undefined,
        model: model.trim() || undefined,
        notes: notes.trim() || undefined,
        createdAt: new Date(),
        photos: [],
        status: 'in_progress',
      };

      await saveRental(newRental);

      // Navigate to Checklist screen
      navigation.replace('Checklist', { rentalId: newRental.id });
    } catch (error) {
      console.error('Error creating rental:', error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveForLater = async () => {
    if (!validateForm()) {
      return;
    }

    // Validation guarantees these are defined
    if (!rentalStartDate) return;

    setIsSubmitting(true);

    try {
      const finalCompany = isOtherCompany(company) ? customCompany.trim() : company;

      const newRental: Rental = {
        id: `rental_${Date.now()}`,
        company: finalCompany,
        licensePlate: licensePlate.trim().toUpperCase(),
        rentalStartDate,
        make: make.trim() || undefined,
        model: model.trim() || undefined,
        notes: notes.trim() || undefined,
        createdAt: new Date(),
        photos: [],
        status: 'pending',
      };

      await saveRental(newRental);

      // Navigate back to Home
      navigation.goBack();
    } catch (error) {
      console.error('Error creating rental:', error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: CalendarDate): string => {
    if (!date) {
      return 'Select Date';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Rental Company Dropdown */}
        <View style={styles.fieldContainer}>
          <Text variant="labelLarge" style={styles.label}>
            Rental Company *
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.dropdownButton}>
                <Text style={[styles.dropdownText, !company && styles.placeholder]}>
                  {company || 'Select Company'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            }
          >
            {RENTAL_COMPANIES.map((companyOption) => (
              <Menu.Item
                key={companyOption}
                onPress={() => handleCompanySelect(companyOption)}
                title={companyOption}
              />
            ))}
          </Menu>
          {errors.company && <Text style={styles.errorText}>{errors.company}</Text>}
        </View>

        {/* Custom Company Name (if Other selected) */}
        {isOtherCompany(company) && (
          <View style={styles.fieldContainer}>
            <TextInput
              mode="outlined"
              label="Company Name *"
              value={customCompany}
              onChangeText={(text) => {
                setCustomCompany(text);
                setErrors({ ...errors, customCompany: '' });
              }}
              style={styles.input}
              error={!!errors.customCompany}
            />
            {errors.customCompany && <Text style={styles.errorText}>{errors.customCompany}</Text>}
          </View>
        )}

        {/* License Plate */}
        <View style={styles.fieldContainer}>
          <TextInput
            mode="outlined"
            label="License Plate *"
            value={licensePlate}
            onChangeText={(text) => {
              setLicensePlate(text.toUpperCase());
              setErrors({ ...errors, licensePlate: '' });
            }}
            style={styles.input}
            placeholder="ABC-1234"
            autoCapitalize="characters"
            error={!!errors.licensePlate}
          />
          {errors.licensePlate && <Text style={styles.errorText}>{errors.licensePlate}</Text>}
        </View>

        {/* Rental Start Date */}
        <View style={styles.fieldContainer}>
          <Text variant="labelLarge" style={styles.label}>
            Rental Start Date *
          </Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>📅 {formatDate(rentalStartDate)}</Text>
          </TouchableOpacity>
          {errors.rentalStartDate && <Text style={styles.errorText}>{errors.rentalStartDate}</Text>}
        </View>

        {/* Date Picker Modal */}
        <DatePickerModal
          locale="en"
          mode="single"
          visible={showDatePicker}
          onDismiss={handleDateDismiss}
          date={rentalStartDate}
          onConfirm={handleDateConfirm}
          validRange={{
            endDate: new Date(),
          }}
        />

        {/* Car Make/Model */}
        <View style={styles.fieldContainer}>
          <TextInput
            mode="outlined"
            label="Car Make/Model (Optional)"
            value={make}
            onChangeText={setMake}
            style={styles.input}
            placeholder="Toyota Camry"
          />
        </View>

        {/* Notes */}
        <View style={styles.fieldContainer}>
          <TextInput
            mode="outlined"
            label="Notes (Optional)"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="Any additional details..."
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleStartChecklist}
          style={styles.primaryButton}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Start Checklist
        </Button>
        <Button
          mode="outlined"
          onPress={handleSaveForLater}
          style={styles.secondaryButton}
          disabled={isSubmitting}
        >
          Save for Later
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: dimensions.borderWidth.thin,
    borderColor: colors.gray300,
    borderRadius: dimensions.borderRadius.sm,
    padding: spacing.md,
    minHeight: dimensions.minHeight.input,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textSecondary,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dateButton: {
    backgroundColor: colors.surface,
    borderWidth: dimensions.borderWidth.thin,
    borderColor: colors.gray300,
    borderRadius: dimensions.borderRadius.sm,
    padding: spacing.md,
    minHeight: dimensions.minHeight.input,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: dimensions.borderWidth.thin,
    borderTopColor: colors.gray200,
  },
  primaryButton: {
    paddingVertical: spacing.xs,
  },
  secondaryButton: {
    paddingVertical: spacing.xs,
  },
});
