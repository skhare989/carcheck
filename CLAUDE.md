# CarCheck MVP - Development Guidelines

## Project Overview
Mobile app built with React Native + Expo to help rental car customers systematically document vehicles and prevent false damage charges.

## Tech Stack
- **Framework:** React Native with Expo
- **Language:** TypeScript (preferred) or JavaScript
- **UI Library:** React Native Paper (Material Design 3)
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
├── constants/         # App constants (CRITICAL - use these for all styling)
│   ├── spacing.ts      # SPACING.XS, SM, MD, LG, XL
│   ├── typography.ts   # Font sizes, weights, styles
│   ├── colors.ts       # Color palette
│   └── index.ts        # Main exports
└── assets/            # Images, fonts, etc.
```

**IMPORTANT:** Always import and use constants from `@/constants/` for consistency across the app.

## React Native/Expo Guidelines

### Core Development Principles
1. **Use React Native Paper components** - Always prefer Paper components over basic React Native components
2. **Use constants for all dimensions** - Import from `@/constants/` for spacing, typography, colors
3. Never hardcode spacing or dimensions - Always reference constants

### File Naming
- Components: PascalCase (e.g., `PhotoChecklist.tsx`)
- Screens: PascalCase with "Screen" suffix (e.g., `HomeScreen.tsx`)
- Utils/hooks: camelCase (e.g., `useCamera.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `RENTAL_COMPANIES.ts`)

### Component Structure
```tsx
// Prefer functional components with hooks
// IMPORTANT: Use React Native Paper components wherever possible
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { SPACING, TYPOGRAPHY } from '@/constants';

interface Props {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="headlineSmall">{title}</Text>
        <Button
          mode="contained"
          onPress={onPress}
          style={{ marginTop: SPACING.MD }}
        >
          Action
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACING.MD,
    padding: SPACING.SM,
  },
});
```

### Styling
- **CRITICAL:** Always use constants from `src/constants/` for dimensions, spacing, typography, and colors
- Use StyleSheet.create() for performance
- Follow Material Design 3 principles
- **Use SPACING constants:** `SPACING.XS`, `SPACING.SM`, `SPACING.MD`, `SPACING.LG`, `SPACING.XL`
- **Use TYPOGRAPHY constants:** For font sizes and text styles
- Never hardcode spacing values (8, 16, 24, etc.) - always reference constants
- Prefer flexbox for layouts
- Use React Native Paper's theme for colors and styling

### Constants Usage
```tsx
// ✅ CORRECT - Using constants
import { SPACING, TYPOGRAPHY } from '@/constants';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.MD,
    marginVertical: SPACING.LG,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.large,
  },
});

// ❌ WRONG - Hardcoded values
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 24,
  },
  title: {
    fontSize: 20,
  },
});
```

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
# React Native Paper (Material Design 3 components)
npm install react-native-paper
npm install react-native-safe-area-context

# React Native Paper Dropdown (for dropdown/select inputs)
npm install react-native-paper-dropdown

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
- **ALWAYS use React Native Paper components** for UI elements (Button, Card, Text, Surface, etc.)
- Use Material Design 3 principles via React Native Paper
- Primary colors: Blue (#1976D2) for trust/reliability
- **Use constants for all dimensions:** Import from `@/constants/spacing`, `@/constants/typography`
- Consistent button styles and spacing using SPACING constants
- Large touch targets for mobile (minimum 44px via constants)
- High contrast for outdoor/parking lot visibility

### Preferred React Native Paper Components
```tsx
// Text components
import { Text, Headline, Subheading, Caption } from 'react-native-paper';

// Interactive components
import { Button, IconButton, FAB, Chip } from 'react-native-paper';

// Containers
import { Card, Surface, List } from 'react-native-paper';

// Input components
import { TextInput, Checkbox, RadioButton, Switch } from 'react-native-paper';
// For dropdowns/selects, use react-native-paper-dropdown
import { Dropdown, MultiSelectDropdown } from 'react-native-paper-dropdown';

// Feedback
import { Snackbar, Banner, Dialog, Portal } from 'react-native-paper';

// Navigation
import { Appbar, BottomNavigation, Drawer } from 'react-native-paper';

// Touchable components
import { TouchableRipple } from 'react-native-paper';
```

### Dropdown Component Usage
For dropdown/select inputs, use `react-native-paper-dropdown`:
```tsx
import { Dropdown } from 'react-native-paper-dropdown';

// Transform array to dropdown options format
const OPTIONS = ['Option 1', 'Option 2', 'Option 3'].map((item) => ({
  label: item,
  value: item,
}));

// In component
<Dropdown
  label="Select Option *"
  placeholder="Choose an option"
  options={OPTIONS}
  value={selectedValue}
  onSelect={setSelectedValue}
  mode="outlined"
  error={!!errors.field}
/>
```

**Important Notes:**
- Do NOT use React Native Paper's `Menu` component for dropdowns - use `react-native-paper-dropdown` instead
- `TouchableRipple` works well for general touchable areas but has compatibility issues with Menu anchors
- For Menu anchors or date pickers, use `TouchableOpacity` from React Native

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