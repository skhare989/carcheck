# CarCheck MVP - Development Guidelines

## Project Overview
Mobile app built with React Native + Expo to help rental car customers systematically document vehicles and prevent false damage charges.

## Tech Stack
- **Framework:** React Native with Expo
- **Language:** TypeScript (preferred) or JavaScript
- **Design System:** Material Design 3
- **Target Platform:** Mobile (iOS/Android via Expo Go)

## Development Commands
```bash
# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android

# Install dependencies
npm install

# TypeScript check
npx tsc --noEmit

# Expo build/export
npx expo export
```

## Project Structure Best Practices
```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation setup
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── constants/         # App constants
└── assets/            # Images, fonts, etc.
```

## React Native/Expo Guidelines

### File Naming
- Components: PascalCase (e.g., `PhotoChecklist.tsx`)
- Screens: PascalCase with "Screen" suffix (e.g., `HomeScreen.tsx`)
- Utils/hooks: camelCase (e.g., `useCamera.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `RENTAL_COMPANIES.ts`)

### Component Structure
```tsx
// Prefer functional components with hooks
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
}

export const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Styling
- Use StyleSheet.create() for performance
- Follow Material Design 3 principles
- Use consistent spacing units (8, 16, 24, 32px)
- Prefer flexbox for layouts

### State Management
- Start with React useState/useContext for MVP
- Consider Zustand or Redux Toolkit for complex state later

### Expo Specific
- Use Expo APIs when available (expo-camera, expo-location, expo-file-system)
- Check Expo SDK compatibility before adding libraries
- Use Expo Go for development testing

## CarCheck MVP Specific Rules

### Core Features Priority
1. Photo checklist (6 sections)
2. Camera integration with guides
3. Auto photo labeling (timestamp, GPS)
4. Rental organization
5. PDF export
6. Email functionality

### Data Storage
- **Local only** for MVP (no cloud sync)
- Use Expo SecureStore for sensitive data
- Use Expo FileSystem for photo storage
- Consider AsyncStorage for app settings

### Photo Management
- Store photos locally with meaningful filenames
- Include metadata: timestamp, GPS, section, rental ID
- Optimize for storage (compress if needed)
- Plan for easy PDF generation

### Navigation Structure
```
App Navigator
├── HomeScreen (rental list + start new)
├── NewRentalScreen (company, license plate form)
├── ChecklistScreen (6-section photo checklist)
├── CameraScreen (guided photo capture)
├── RentalDetailScreen (view past rental photos)
└── ExportScreen (PDF generation & email)
```

### Key Components to Build
- `PhotoChecklist` - Core 6-section checklist
- `GuidedCamera` - Camera with overlay guides
- `RentalCard` - Display rental info
- `SectionItem` - Individual checklist section
- `PhotoGallery` - View photos by section

## Performance Guidelines
- Use FlatList for photo galleries
- Implement lazy loading for images
- Optimize image sizes for mobile
- Use React.memo for expensive components

## Testing Strategy
- Test on actual device via Expo Go
- Test camera functionality in real conditions
- Verify GPS accuracy
- Test PDF generation with real photos

## Common Expo Libraries to Use
```bash
# Camera
expo install expo-camera

# Location/GPS
expo install expo-location

# File system
expo install expo-file-system

# Sharing (email/export)
expo install expo-sharing

# Print/PDF
expo install expo-print

# Device info
expo install expo-device

# Secure storage
expo install expo-secure-store
```

## Design System
- Use Material Design 3 components
- Primary colors: Blue (#1976D2) for trust/reliability
- Consistent button styles and spacing
- Large touch targets for mobile (44px minimum)
- High contrast for outdoor/parking lot visibility

## MVP Constraints
- No user accounts/authentication
- No cloud storage or sync
- No automatic reminders
- No AI features
- Keep it simple and focused

## Success Criteria Reminders
- 70%+ checklist completion rate
- 2-4 minute completion time
- 50%+ repeat usage
- Focus on core value: systematic documentation

## Development Notes
- Always test camera in real rental car scenarios
- Verify GPS accuracy in parking garages
- Test PDF export with multiple photos
- Consider offline functionality (no internet required)
- Optimize for one-handed use while standing by car