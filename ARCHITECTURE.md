# CarCheck - Architecture Guidelines

## Table of Contents
1. [Project Structure](#project-structure)
2. [State Management](#state-management)
3. [Testing Strategy](#testing-strategy)
4. [Component Architecture](#component-architecture)
5. [Code Style & Conventions](#code-style--conventions)
6. [Performance Guidelines](#performance-guidelines)
7. [Security Considerations](#security-considerations)
8. [Data Flow](#data-flow)

---

## Project Structure

### Folder Organization

```
carcheck-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components (LoadingSpinner, ErrorBoundary)
│   │   ├── rental/         # Rental-specific (RentalCard, RentalList)
│   │   └── checklist/      # Checklist-specific (SectionItem, ChecklistProgress)
│   ├── screens/            # Screen components (one per route)
│   │   ├── HomeScreen.tsx
│   │   ├── NewRentalScreen.tsx
│   │   ├── ChecklistScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── RentalDetailScreen.tsx
│   │   └── OnboardingScreen.tsx
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── types.ts       # Navigation type definitions
│   ├── hooks/             # Custom React hooks
│   │   ├── useCamera.ts
│   │   ├── useLocation.ts
│   │   ├── useRentals.ts
│   │   ├── usePhotos.ts
│   │   └── usePermissions.ts
│   ├── services/          # Business logic & external services
│   │   ├── storage.ts     # AsyncStorage operations
│   │   ├── camera.ts      # Camera operations
│   │   ├── pdf.ts         # PDF generation
│   │   ├── location.ts    # GPS handling
│   │   └── fileSystem.ts  # File management
│   ├── context/           # React Context providers
│   │   ├── RentalContext.tsx
│   │   └── ThemeContext.tsx
│   ├── types/             # TypeScript type definitions
│   │   ├── rental.ts
│   │   ├── photo.ts
│   │   ├── checklist.ts
│   │   └── index.ts       # Re-export all types
│   ├── utils/             # Helper functions
│   │   ├── dateFormatter.ts
│   │   ├── fileNaming.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── constants/         # App constants
│   │   ├── theme.ts       # React Native Paper theme
│   │   ├── checklistSections.ts
│   │   ├── rentalCompanies.ts
│   │   └── config.ts      # App configuration
│   └── __tests__/         # Test utilities and setup
│       └── testUtils.tsx  # Shared test helpers
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
├── e2e/                   # End-to-end tests (Detox)
├── app.json
├── package.json
├── tsconfig.json
├── jest.config.js
└── babel.config.js
```

### File Naming Conventions

| File Type | Convention | Example |
|-----------|-----------|---------|
| **Components** | PascalCase | `RentalCard.tsx` |
| **Screens** | PascalCase + "Screen" | `HomeScreen.tsx` |
| **Hooks** | camelCase + "use" prefix | `useCamera.ts` |
| **Services** | camelCase | `storage.ts` |
| **Utils** | camelCase | `dateFormatter.ts` |
| **Types** | camelCase | `rental.ts` |
| **Constants** | camelCase or UPPER_SNAKE_CASE | `theme.ts`, `RENTAL_COMPANIES.ts` |
| **Tests** | Same as source + `.test` | `RentalCard.test.tsx` |

---

## State Management

### Decision: React Context API (MVP) → Zustand (if needed)

**Rationale:**
- CarCheck has simple, straightforward state requirements
- Context API is sufficient for MVP
- Easy migration path to Zustand if performance issues arise
- Avoid Redux complexity for a small app

### State Categories

| State Type | Storage Method | Example | Persistence |
|------------|---------------|---------|-------------|
| **UI State** | `useState` in components | Modal visibility, form inputs | No |
| **Shared State** | React Context | Current rental, rentals list | No |
| **Persistent Data** | AsyncStorage | Saved rentals, user preferences | Yes |
| **Derived State** | `useMemo` | Filtered rentals, completion % | No |
| **Async State** | `useEffect` + `useState` | Loading states, API calls | No |

### Context Structure

#### RentalContext (Primary State Manager)

```typescript
// src/context/RentalContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as StorageService from '../services/storage';
import { Rental, Photo } from '../types';

interface RentalContextType {
  // State
  rentals: Rental[];
  currentRental: Rental | null;
  loading: boolean;
  error: string | null;

  // Actions
  addRental: (rental: Rental) => Promise<void>;
  updateRental: (id: string, updates: Partial<Rental>) => Promise<void>;
  deleteRental: (id: string) => Promise<void>;
  setCurrentRental: (rental: Rental | null) => void;
  addPhotoToRental: (rentalId: string, photo: Photo) => Promise<void>;
  refreshRentals: () => Promise<void>;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [currentRental, setCurrentRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load rentals on mount
  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      setLoading(true);
      const loadedRentals = await StorageService.loadRentals();
      setRentals(loadedRentals);
      setError(null);
    } catch (err) {
      setError('Failed to load rentals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addRental = async (rental: Rental) => {
    try {
      await StorageService.saveRental(rental);
      setRentals((prev) => [...prev, rental]);
      setError(null);
    } catch (err) {
      setError('Failed to save rental');
      throw err;
    }
  };

  const updateRental = async (id: string, updates: Partial<Rental>) => {
    try {
      const updated = rentals.map((r) => (r.id === id ? { ...r, ...updates } : r));
      await StorageService.saveRentals(updated);
      setRentals(updated);

      // Update current rental if it's the one being updated
      if (currentRental?.id === id) {
        setCurrentRental({ ...currentRental, ...updates });
      }
      setError(null);
    } catch (err) {
      setError('Failed to update rental');
      throw err;
    }
  };

  const deleteRental = async (id: string) => {
    try {
      await StorageService.deleteRental(id);
      setRentals((prev) => prev.filter((r) => r.id !== id));
      if (currentRental?.id === id) {
        setCurrentRental(null);
      }
      setError(null);
    } catch (err) {
      setError('Failed to delete rental');
      throw err;
    }
  };

  const addPhotoToRental = async (rentalId: string, photo: Photo) => {
    try {
      const rental = rentals.find((r) => r.id === rentalId);
      if (!rental) throw new Error('Rental not found');

      const updatedPhotos = [...rental.photos, photo];
      await updateRental(rentalId, { photos: updatedPhotos });
    } catch (err) {
      setError('Failed to add photo');
      throw err;
    }
  };

  const value: RentalContextType = {
    rentals,
    currentRental,
    loading,
    error,
    addRental,
    updateRental,
    deleteRental,
    setCurrentRental,
    addPhotoToRental,
    refreshRentals: loadRentals,
  };

  return <RentalContext.Provider value={value}>{children}</RentalContext.Provider>;
};

// Custom hook for consuming context
export const useRentals = (): RentalContextType => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRentals must be used within a RentalProvider');
  }
  return context;
};
```

### Migration Path to Zustand (If Needed)

If Context causes performance issues (unnecessary re-renders), migrate to Zustand:

```typescript
// src/store/rentalStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rental, Photo } from '../types';

interface RentalStore {
  rentals: Rental[];
  currentRental: Rental | null;
  loading: boolean;

  addRental: (rental: Rental) => void;
  updateRental: (id: string, updates: Partial<Rental>) => void;
  deleteRental: (id: string) => void;
  setCurrentRental: (rental: Rental | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useRentalStore = create<RentalStore>()(
  persist(
    (set) => ({
      rentals: [],
      currentRental: null,
      loading: false,

      addRental: (rental) =>
        set((state) => ({ rentals: [...state.rentals, rental] })),

      updateRental: (id, updates) =>
        set((state) => ({
          rentals: state.rentals.map((r) => (r.id === id ? { ...r, ...updates } : r)),
          currentRental:
            state.currentRental?.id === id
              ? { ...state.currentRental, ...updates }
              : state.currentRental,
        })),

      deleteRental: (id) =>
        set((state) => ({
          rentals: state.rentals.filter((r) => r.id !== id),
          currentRental: state.currentRental?.id === id ? null : state.currentRental,
        })),

      setCurrentRental: (rental) => set({ currentRental: rental }),

      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'rental-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

**When to migrate:**
- Performance profiling shows Context re-renders are expensive
- Need for DevTools and middleware (logging, time-travel)
- State logic becomes complex with many actions

---

## Testing Strategy

### Testing Pyramid

```
        E2E Tests (Detox)
         [5-10 tests]
    ────────────────────
   Integration Tests (RNTL)
      [20-30 tests]
  ──────────────────────────
     Unit Tests (Jest)
      [50-100 tests]
──────────────────────────────
```

### Test Stack

| Test Type | Tool | Purpose | Priority |
|-----------|------|---------|----------|
| **Unit Tests** | Jest | Services, utils, hooks | HIGH |
| **Component Tests** | React Native Testing Library | UI components | HIGH |
| **Integration Tests** | RNTL + Navigation | Screen flows | MEDIUM |
| **E2E Tests** | Detox | Full user journeys | LOW (Post-MVP) |

### Coverage Targets

| Area | Target | Rationale |
|------|--------|-----------|
| **Services** | 80-90% | Critical business logic |
| **Utils** | 90%+ | Pure functions, easy to test |
| **Hooks** | 70-80% | Custom logic |
| **Components** | 60-70% | UI coverage |
| **Screens** | 50-60% | Integration tests |
| **Overall** | 70%+ | Good balance |

### Test Setup

```javascript
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-paper|@react-navigation|expo.*)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/index.{ts,tsx}',
    '!src/types/**',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Test Examples

#### 1. Service Tests (Unit)

```typescript
// src/services/__tests__/storage.test.ts
import { saveRental, loadRentals, deleteRental } from '../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rental } from '../../types';

jest.mock('@react-native-async-storage/async-storage');

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveRental', () => {
    it('should save rental to AsyncStorage', async () => {
      const rental: Rental = {
        id: 'rental-1',
        company: 'Enterprise',
        licensePlate: 'ABC123',
        date: '2025-11-06',
        photos: [],
      };

      await saveRental(rental);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'rentals',
        expect.stringContaining('rental-1')
      );
    });

    it('should handle save errors gracefully', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage full'));

      await expect(saveRental({} as Rental)).rejects.toThrow('Storage full');
    });
  });

  describe('loadRentals', () => {
    it('should load rentals from AsyncStorage', async () => {
      const mockRentals = [
        { id: '1', company: 'Hertz' },
        { id: '2', company: 'Avis' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockRentals)
      );

      const rentals = await loadRentals();

      expect(rentals).toEqual(mockRentals);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('rentals');
    });

    it('should return empty array if no rentals exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const rentals = await loadRentals();

      expect(rentals).toEqual([]);
    });
  });
});
```

#### 2. Hook Tests (Unit)

```typescript
// src/hooks/__tests__/useRentals.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useRentals, RentalProvider } from '../../context/RentalContext';
import { Rental } from '../../types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RentalProvider>{children}</RentalProvider>
);

describe('useRentals', () => {
  it('should add rental', async () => {
    const { result } = renderHook(() => useRentals(), { wrapper });

    const newRental: Rental = {
      id: 'rental-1',
      company: 'Enterprise',
      licensePlate: 'ABC123',
      date: '2025-11-06',
      photos: [],
    };

    await act(async () => {
      await result.current.addRental(newRental);
    });

    expect(result.current.rentals).toContainEqual(newRental);
  });

  it('should set current rental', () => {
    const { result } = renderHook(() => useRentals(), { wrapper });

    const rental: Rental = {
      id: 'rental-1',
      company: 'Hertz',
      licensePlate: 'XYZ789',
      date: '2025-11-06',
      photos: [],
    };

    act(() => {
      result.current.setCurrentRental(rental);
    });

    expect(result.current.currentRental).toEqual(rental);
  });
});
```

#### 3. Component Tests (Integration)

```typescript
// src/components/__tests__/RentalCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { RentalCard } from '../RentalCard';
import { Rental } from '../../types';

const mockRental: Rental = {
  id: 'rental-1',
  company: 'Enterprise',
  licensePlate: 'ABC123',
  date: '2025-11-06T10:30:00',
  photos: [{}, {}, {}] as any[], // 3 photos
  location: { name: 'San Francisco, CA' },
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(<PaperProvider>{component}</PaperProvider>);
};

describe('RentalCard', () => {
  it('should render rental information correctly', () => {
    const { getByText } = renderWithProviders(
      <RentalCard rental={mockRental} onPress={jest.fn()} />
    );

    expect(getByText('Enterprise')).toBeTruthy();
    expect(getByText('ABC123')).toBeTruthy();
    expect(getByText(/3 photos/)).toBeTruthy();
    expect(getByText(/San Francisco, CA/)).toBeTruthy();
  });

  it('should call onPress when card is tapped', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = renderWithProviders(
      <RentalCard rental={mockRental} onPress={onPressMock} testID="rental-card" />
    );

    fireEvent.press(getByTestId('rental-card'));

    expect(onPressMock).toHaveBeenCalledWith(mockRental);
  });

  it('should display formatted date', () => {
    const { getByText } = renderWithProviders(
      <RentalCard rental={mockRental} onPress={jest.fn()} />
    );

    expect(getByText(/November 6, 2025/)).toBeTruthy();
  });
});
```

#### 4. Screen Tests (Integration)

```typescript
// src/screens/__tests__/ChecklistScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { ChecklistScreen } from '../ChecklistScreen';
import { RentalProvider } from '../../context/RentalContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    <PaperProvider>
      <RentalProvider>{children}</RentalProvider>
    </PaperProvider>
  </NavigationContainer>
);

describe('ChecklistScreen', () => {
  it('should display all 6 checklist sections', () => {
    const { getByText } = render(<ChecklistScreen />, { wrapper: AllTheProviders });

    expect(getByText('Front')).toBeTruthy();
    expect(getByText('Driver Side')).toBeTruthy();
    expect(getByText('Rear')).toBeTruthy();
    expect(getByText('Passenger Side')).toBeTruthy();
    expect(getByText('Interior')).toBeTruthy();
    expect(getByText('Odometer')).toBeTruthy();
  });

  it('should show progress bar with 0% initially', () => {
    const { getByTestId } = render(<ChecklistScreen />, { wrapper: AllTheProviders });

    const progressBar = getByTestId('checklist-progress');
    expect(progressBar.props.progress).toBe(0);
  });

  it('should not show complete button when checklist incomplete', () => {
    const { queryByText } = render(<ChecklistScreen />, { wrapper: AllTheProviders });

    expect(queryByText('Complete Inspection')).toBeNull();
  });

  it('should navigate to camera when section tapped', () => {
    const mockNavigate = jest.fn();
    jest.mock('@react-navigation/native', () => ({
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({ navigate: mockNavigate }),
    }));

    const { getByText } = render(<ChecklistScreen />, { wrapper: AllTheProviders });

    fireEvent.press(getByText('Front'));

    expect(mockNavigate).toHaveBeenCalledWith('Camera', { section: 'front' });
  });
});
```

### Test Utilities

```typescript
// src/__tests__/testUtils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { RentalProvider } from '../context/RentalContext';

// Custom render function with all providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <NavigationContainer>
      <PaperProvider>
        <RentalProvider>{children}</RentalProvider>
      </PaperProvider>
    </NavigationContainer>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock factory functions
export const createMockRental = (overrides = {}) => ({
  id: 'rental-1',
  company: 'Enterprise',
  licensePlate: 'ABC123',
  date: '2025-11-06',
  photos: [],
  ...overrides,
});

export const createMockPhoto = (overrides = {}) => ({
  id: 'photo-1',
  uri: 'file:///path/to/photo.jpg',
  timestamp: '2025-11-06T10:30:00Z',
  section: 'front',
  gps: { latitude: 37.7749, longitude: -122.4194 },
  ...overrides,
});
```

### Package Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=src/.*/.*\\.test\\.tsx?$",
    "test:integration": "jest --testPathPattern=src/screens",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "type-check": "tsc --noEmit",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix"
  }
}
```

---

## Component Architecture

### Component Patterns

#### 1. Presentational vs Container Components

**Presentational Components** (Dumb/Stateless):
- Focus on how things look
- Receive data via props
- No business logic
- Highly reusable

```typescript
// src/components/rental/RentalCard.tsx
import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Rental } from '../../types';

interface Props {
  rental: Rental;
  onPress: (rental: Rental) => void;
  testID?: string;
}

export const RentalCard: React.FC<Props> = ({ rental, onPress, testID }) => {
  return (
    <Card testID={testID} onPress={() => onPress(rental)} style={styles.card}>
      <Card.Title title={rental.company} subtitle={rental.licensePlate} />
      <Card.Content>
        <Text>{rental.photos.length} photos</Text>
        <Text>{formatDate(rental.date)}</Text>
      </Card.Content>
    </Card>
  );
};
```

**Container Components** (Smart/Stateful):
- Focus on how things work
- Manage state and side effects
- Connect to Context/Store
- Handle business logic

```typescript
// src/screens/HomeScreen.tsx
import React from 'react';
import { FlatList } from 'react-native';
import { useRentals } from '../context/RentalContext';
import { RentalCard } from '../components/rental/RentalCard';

export const HomeScreen: React.FC = () => {
  const { rentals, loading } = useRentals();
  const navigation = useNavigation();

  const handleRentalPress = (rental: Rental) => {
    navigation.navigate('RentalDetail', { rentalId: rental.id });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      data={rentals}
      renderItem={({ item }) => (
        <RentalCard rental={item} onPress={handleRentalPress} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
```

#### 2. Custom Hooks Pattern

Extract reusable logic into custom hooks:

```typescript
// src/hooks/useCamera.ts
import { useState, useCallback } from 'react';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  const requestPermission = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  }, []);

  const takePicture = useCallback(async () => {
    if (!cameraRef) return null;

    const photo = await cameraRef.takePictureAsync({
      quality: 0.8,
      skipProcessing: false,
    });

    return photo;
  }, [cameraRef]);

  return {
    hasPermission,
    cameraRef,
    setCameraRef,
    requestPermission,
    takePicture,
  };
};
```

```typescript
// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      return status === 'granted';
    } catch (err) {
      setError('Failed to request location permission');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc);
      return loc;
    } catch (err) {
      setError('Failed to get location');
      return null;
    }
  };

  return {
    location,
    hasPermission,
    error,
    requestPermission,
    getCurrentLocation,
  };
};
```

#### 3. Composition Pattern

Build complex components from simple ones:

```typescript
// src/components/checklist/ChecklistItem.tsx
import React from 'react';
import { List, Checkbox, Chip } from 'react-native-paper';

interface Props {
  title: string;
  description: string;
  completed: boolean;
  photoCount: number;
  hasNotes: boolean;
  onPress: () => void;
}

export const ChecklistItem: React.FC<Props> = ({
  title,
  description,
  completed,
  photoCount,
  hasNotes,
  onPress,
}) => {
  return (
    <List.Item
      title={title}
      description={description}
      onPress={onPress}
      left={() => <Checkbox status={completed ? 'checked' : 'unchecked'} />}
      right={() => (
        <>
          {photoCount > 0 && <Chip>{photoCount} photos</Chip>}
          {hasNotes && <Chip icon="note">Note</Chip>}
        </>
      )}
    />
  );
};
```

### Component Guidelines

1. **Keep components small** - Aim for < 200 lines
2. **Single responsibility** - One component, one job
3. **Props interface** - Always define TypeScript interfaces
4. **Default props** - Use default parameters, not defaultProps
5. **Memoization** - Use `React.memo` for expensive renders
6. **Prop drilling** - Avoid deep prop drilling, use Context instead

---

## Code Style & Conventions

### TypeScript Guidelines

#### Type Definitions

```typescript
// src/types/rental.ts
export interface Rental {
  id: string;
  company: string;
  licensePlate: string;
  carMake?: string;
  carModel?: string;
  carColor?: string;
  date: string; // ISO 8601 format
  location?: Location;
  photos: Photo[];
  notes?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  uri: string;
  section: ChecklistSection;
  timestamp: string; // ISO 8601
  gps?: GPSCoordinates;
  locationName?: string;
  notes?: string;
}

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

export type ChecklistSection =
  | 'front'
  | 'driver-side'
  | 'rear'
  | 'passenger-side'
  | 'interior'
  | 'odometer';

export interface Location {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}
```

#### Avoid `any` - Use proper types or `unknown`

```typescript
// ❌ Bad
const parseData = (data: any) => {
  return data.value;
};

// ✅ Good
const parseData = (data: unknown): string => {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return String((data as { value: unknown }).value);
  }
  throw new Error('Invalid data format');
};
```

#### Use Type Guards

```typescript
// src/utils/typeGuards.ts
export const isRental = (obj: unknown): obj is Rental => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'company' in obj &&
    'licensePlate' in obj
  );
};
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `RentalCard`, `ChecklistItem` |
| **Functions** | camelCase | `formatDate`, `calculateProgress` |
| **Variables** | camelCase | `currentRental`, `photoCount` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_PHOTOS`, `DEFAULT_THEME` |
| **Interfaces** | PascalCase | `RentalContextType`, `NavigationProps` |
| **Types** | PascalCase | `ChecklistSection`, `PhotoMetadata` |
| **Enums** | PascalCase | `RentalStatus`, `PhotoSection` |

### Import Organization

```typescript
// 1. React and React Native
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// 3. Local components
import { RentalCard } from '../components/rental/RentalCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// 4. Hooks
import { useRentals } from '../context/RentalContext';
import { useCamera } from '../hooks/useCamera';

// 5. Services and utils
import * as StorageService from '../services/storage';
import { formatDate } from '../utils/dateFormatter';

// 6. Types
import { Rental, Photo } from '../types';

// 7. Constants
import { RENTAL_COMPANIES } from '../constants/rentalCompanies';
```

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',

    // React
    'react/prop-types': 'off', // Using TypeScript instead
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
```

---

## Performance Guidelines

### React Native Performance Best Practices

#### 1. List Optimization

```typescript
// ✅ Use FlatList with proper optimization
<FlatList
  data={rentals}
  renderItem={({ item }) => <RentalCard rental={item} />}
  keyExtractor={(item) => item.id}
  // Performance optimizations
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  windowSize={10}
  // Re-render optimization
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

#### 2. Memoization

```typescript
// Memoize expensive components
export const RentalCard = React.memo<Props>(({ rental, onPress }) => {
  return <Card>...</Card>;
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.rental.id === nextProps.rental.id;
});

// Memoize expensive calculations
const completionPercentage = useMemo(() => {
  const completed = sections.filter(s => s.completed).length;
  return (completed / sections.length) * 100;
}, [sections]);

// Memoize callbacks
const handlePress = useCallback((rental: Rental) => {
  navigation.navigate('Detail', { id: rental.id });
}, [navigation]);
```

#### 3. Image Optimization

```typescript
// src/components/common/OptimizedImage.tsx
import React from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface Props {
  uri: string;
  width?: number;
  height?: number;
}

export const OptimizedImage: React.FC<Props> = ({ uri, width = 300, height = 300 }) => {
  // Resize image if too large
  const optimizedUri = useMemo(() => {
    if (width > 1000 || height > 1000) {
      // Implement image compression/resizing
      return compressImage(uri, width, height);
    }
    return uri;
  }, [uri, width, height]);

  return (
    <Image
      source={{ uri: optimizedUri }}
      style={{ width, height }}
      resizeMode="cover"
      // Performance optimizations
      fadeDuration={0}
    />
  );
};
```

#### 4. Avoid Inline Functions and Objects

```typescript
// ❌ Bad - Creates new function on every render
<Button onPress={() => handlePress(rental)} />

// ✅ Good - Stable reference
const onPress = useCallback(() => handlePress(rental), [rental]);
<Button onPress={onPress} />

// ❌ Bad - Creates new object on every render
<View style={{ marginTop: 10 }} />

// ✅ Good - Use StyleSheet
const styles = StyleSheet.create({
  container: { marginTop: 10 }
});
<View style={styles.container} />
```

#### 5. Lazy Loading

```typescript
// Lazy load screens
const CameraScreen = lazy(() => import('./screens/CameraScreen'));
const RentalDetailScreen = lazy(() => import('./screens/RentalDetailScreen'));
```

---

## Security Considerations

### 1. Data Storage

```typescript
// Use SecureStore for sensitive data
import * as SecureStore from 'expo-secure-store';

// Store sensitive user preferences
export const saveSecureData = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

// Use AsyncStorage for non-sensitive data
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store rental data (non-sensitive)
export const saveRentals = async (rentals: Rental[]) => {
  await AsyncStorage.setItem('rentals', JSON.stringify(rentals));
};
```

### 2. File System Security

```typescript
// Store photos in app's private directory
const PHOTO_DIR = `${FileSystem.documentDirectory}photos/`;

// Ensure directory exists
const ensurePhotoDirectory = async () => {
  const dirInfo = await FileSystem.getInfoAsync(PHOTO_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(PHOTO_DIR, { intermediates: true });
  }
};
```

### 3. Permission Handling

```typescript
// Always check permissions before accessing sensitive APIs
export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  return { hasPermission, requestPermission };
};
```

### 4. Input Validation

```typescript
// Validate user input
export const validateLicensePlate = (plate: string): boolean => {
  // Basic validation - adjust regex for your needs
  const regex = /^[A-Z0-9]{2,10}$/i;
  return regex.test(plate.trim());
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
```

---

## Data Flow

### Application Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      USER ACTION                         │
│          (Start Rental, Take Photo, Export PDF)          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   SCREEN COMPONENT                       │
│            (HomeScreen, ChecklistScreen)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              CUSTOM HOOK / CONTEXT                       │
│         (useRentals, useCamera, useLocation)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  SERVICE LAYER                           │
│        (storage.ts, camera.ts, pdf.ts)                   │
└────────────────────┬────────────────────────────────────┘
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│  ASYNC STORAGE   │  │   FILE SYSTEM    │
│   (Metadata)     │  │    (Photos)      │
└──────────────────┘  └──────────────────┘
```

### Example: Taking a Photo Flow

```typescript
1. User taps "Front" section in ChecklistScreen
   ↓
2. Navigation navigates to CameraScreen with { section: 'front' }
   ↓
3. CameraScreen uses useCamera() hook
   ↓
4. User taps shutter button → takePicture() called
   ↓
5. Camera service captures photo → returns Photo object
   ↓
6. useLocation() captures GPS coordinates
   ↓
7. Photo saved to file system with metadata
   ↓
8. useRentals().addPhotoToRental() updates rental
   ↓
9. Storage service persists updated rental
   ↓
10. Navigate back to ChecklistScreen
   ↓
11. Context updates → ChecklistScreen re-renders with new photo count
```

---

## Conclusion

This architecture is designed for:
- **Simplicity** - Easy to understand and maintain
- **Scalability** - Can grow with the app
- **Testability** - Every layer is independently testable
- **Performance** - Optimized for mobile constraints
- **Type Safety** - Comprehensive TypeScript usage

Follow these guidelines consistently to maintain code quality and developer productivity throughout the project.

---

**Last Updated:** November 6, 2025
**Version:** 1.0
