/**
 * Data types for Rental management
 */

/**
 * Photo metadata
 */
export interface Photo {
  id: string;
  uri: string;
  section: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Rental status
 * - pending: Created but photos not started yet
 * - in_progress: User started photo checklist
 * - completed: All photos captured
 */
export type RentalStatus = 'pending' | 'in_progress' | 'completed';

/**
 * Main Rental interface
 */
export interface Rental {
  id: string;
  company: string;
  licensePlate: string;
  rentalStartDate: Date;
  make?: string;
  model?: string;
  notes?: string;
  createdAt: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  photos: Photo[];
  status: RentalStatus;
  // Future fields to add:
  // returnDate?: Date;
  // returnLocation?: string;
}

/**
 * Form data for creating new rental
 */
export interface NewRentalFormData {
  company: string;
  customCompany?: string;
  licensePlate: string;
  rentalStartDate: Date;
  make?: string;
  model?: string;
  notes?: string;
}
