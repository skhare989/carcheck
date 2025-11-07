/**
 * Rental company options
 * Pre-defined list of major rental car companies
 */

export const RENTAL_COMPANIES = [
  'Hertz',
  'Enterprise',
  'Avis',
  'Budget',
  'National',
  'Alamo',
  'Sixt',
  'Thrifty',
  'Dollar',
  'Other',
] as const;

export type RentalCompany = typeof RENTAL_COMPANIES[number];

/**
 * Check if a company name is the "Other" option
 */
export const isOtherCompany = (company: string): boolean => {
  return company === 'Other';
};
