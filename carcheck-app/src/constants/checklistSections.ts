/**
 * Checklist section definitions for CarCheck MVP
 */

export interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  minPhotos: number;
  maxPhotos: number;
}

export const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: 'exterior-front',
    title: 'Exterior - Front',
    description: 'Bumper, headlights, hood, windshield, license plate',
    icon: 'car-front',
    minPhotos: 1,
    maxPhotos: 5,
  },
  {
    id: 'exterior-sides-back',
    title: 'Exterior - Sides, Back & Roof',
    description: 'Doors, mirrors, trunk, rear bumper, roof',
    icon: 'car-side',
    minPhotos: 1,
    maxPhotos: 5,
  },
  {
    id: 'interior-dashboard',
    title: 'Interior - Dashboard & Controls',
    description: 'Dashboard, gauges, center console, radio, AC',
    icon: 'car-cog',
    minPhotos: 1,
    maxPhotos: 5,
  },
  {
    id: 'interior-seats',
    title: 'Interior - Seats & Upholstery',
    description: 'Front seats, back seats, floor mats, ceiling',
    icon: 'car-seat',
    minPhotos: 1,
    maxPhotos: 5,
  },
  {
    id: 'tires-wheels',
    title: 'Tires & Wheels',
    description: 'All 4 tires, rims, tire tread condition',
    icon: 'car-tire-alert',
    minPhotos: 1,
    maxPhotos: 5,
  },
  {
    id: 'fuel-odometer',
    title: 'Fuel Level & Odometer',
    description: 'Fuel gauge reading, odometer/mileage',
    icon: 'gauge',
    minPhotos: 1,
    maxPhotos: 5,
  },
];

export const getTotalSections = (): number => CHECKLIST_SECTIONS.length;

export const getSectionById = (id: string): ChecklistSection | undefined => {
  return CHECKLIST_SECTIONS.find((section) => section.id === id);
};
