import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DatePickerModal } from 'react-native-paper-dates';
import { NewRentalScreenProps } from '../types/navigation';
import { RENTAL_COMPANIES, isOtherCompany } from '../constants';
import { Rental } from '../types/rental';
import { saveRental } from '../utils/storage';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import { newRentalScreenStyles as styles } from './NewRentalScreen.styles';

// Transform RENTAL_COMPANIES to dropdown options format
const COMPANY_OPTIONS = RENTAL_COMPANIES.map((company) => ({
  label: company,
  value: company,
}));

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompanySelect = (selectedCompany?: string) => {
    if (selectedCompany) {
      setCompany(selectedCompany);
      setErrors({ ...errors, company: '' });
    }
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

    // Check if rental starts today or in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = rentalStartDate ? new Date(rentalStartDate) : null;
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }
    const isStartingToday = startDate && startDate.getTime() <= today.getTime();

    // Validate license plate - required only if rental is starting today or in the past
    if (isStartingToday) {
      if (!licensePlate.trim()) {
        newErrors.licensePlate = 'License plate is required for rentals starting today';
      } else if (licensePlate.trim().length < 3 || licensePlate.trim().length > 10) {
        newErrors.licensePlate = 'License plate must be 3-10 characters';
      }
    } else {
      // Optional for future rentals, but validate format if provided
      if (licensePlate.trim() && (licensePlate.trim().length < 3 || licensePlate.trim().length > 10)) {
        newErrors.licensePlate = 'License plate must be 3-10 characters';
      }
    }

    // Validate date (only check if provided)
    if (!rentalStartDate) {
      newErrors.rentalStartDate = 'Rental start date is required';
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Rental Company Dropdown */}
        <View style={styles.fieldContainer}>
          <Dropdown
            label="Rental Company *"
            placeholder="Select Company"
            options={COMPANY_OPTIONS}
            value={company}
            onSelect={handleCompanySelect}
            mode="outlined"
            error={!!errors.company}
          />
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
        />

        {/* License Plate */}
        <View style={styles.fieldContainer}>
          <TextInput
            mode="outlined"
            label={(() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const startDate = rentalStartDate ? new Date(rentalStartDate) : null;
              if (startDate) {
                startDate.setHours(0, 0, 0, 0);
              }
              const isStartingToday = startDate && startDate.getTime() <= today.getTime();
              return isStartingToday ? 'License Plate *' : 'License Plate (Optional)';
            })()}
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
