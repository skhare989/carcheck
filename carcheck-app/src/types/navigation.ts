/**
 * Navigation types for CarCheck app
 * Defines all screens and their parameters
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root stack parameter list
 * Add all screens and their params here
 */
export type RootStackParamList = {
  Home: undefined;
  NewRental: undefined;
  Checklist: { rentalId: string };
  Camera: { rentalId: string; sectionId: string };
  RentalDetail: { rentalId: string };
  Export: { rentalId: string };
};

/**
 * Screen props helpers
 * Use these to type your screen components
 *
 * Example:
 * export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => { ... }
 */
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type NewRentalScreenProps = NativeStackScreenProps<RootStackParamList, 'NewRental'>;
export type ChecklistScreenProps = NativeStackScreenProps<RootStackParamList, 'Checklist'>;
export type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
export type RentalDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'RentalDetail'>;
export type ExportScreenProps = NativeStackScreenProps<RootStackParamList, 'Export'>;

// Declare global navigation types for TypeScript
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
