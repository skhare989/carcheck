# CarCheck - Rental Car Documentation App

A mobile app that helps rental car customers systematically document vehicles with a photo checklist to prevent false damage charges.

**Target:** 2-3 minute completion time, organized evidence, dispute-ready documentation

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (iOS/Android)

### Installation & Running

```bash
# Navigate to the app directory
cd carcheck-app

# Install dependencies
npm install

# Start the development server
npm start
```

After starting, you can:
- **Scan the QR code** with Expo Go app (Android) or Camera app (iOS)
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Press `w` for web browser

## Project Structure

```
carcheck/
├── carcheck-app/           # Main Expo/React Native application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Generic components
│   │   │   ├── rental/     # Rental-specific components
│   │   │   └── checklist/  # Checklist components
│   │   ├── screens/        # Screen components
│   │   ├── navigation/     # Navigation setup
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Business logic (storage, camera, PDF)
│   │   ├── context/        # React Context providers
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Helper functions
│   │   ├── constants/      # App constants
│   │   └── __tests__/      # Test utilities
│   ├── assets/             # Images, fonts, icons
│   ├── App.tsx             # Main app entry point
│   └── package.json
├── ARCHITECTURE.md         # Technical architecture & patterns
├── CLAUDE.md               # Development guidelines
├── product-spec.md         # Product specification
└── tasks.md                # Development task list
```

## Tech Stack

- **Framework:** React Native with Expo SDK 54
- **Language:** TypeScript (strict mode)
- **UI Library:** React Native Paper (Material Design 3) - to be installed
- **Navigation:** React Navigation - to be installed
- **State Management:** React Context API (MVP)
- **Target Platforms:** iOS & Android (via Expo Go)

## Core Features (MVP)

1. **6-Section Photo Checklist** - Systematic car documentation
2. **Guided Camera** - Overlay guides for consistent photos
3. **Auto-Labeling** - Timestamp, GPS, and section labels on each photo
4. **Rental Organization** - Organized by date and company
5. **PDF Export** - Professional documentation for disputes
6. **Email Functionality** - One-tap sharing

## Documentation

- **product-spec.md** - Full product specification, user flows, success metrics
- **ARCHITECTURE.md** - Technical architecture, state management, testing strategy
- **tasks.md** - Detailed development tasks organized in 20 categories
- **CLAUDE.md** - Quick development guidelines and best practices

## Current Status

✅ **Baseline Setup Complete**
- Expo project initialized with TypeScript
- Folder structure created
- Git repository configured
- Ready for feature development

**Next Steps:**
- Install UI libraries (React Native Paper, React Navigation)
- Install Expo libraries as needed (camera, location, etc.)
- Build core features per tasks.md

## Development Guidelines

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `RentalCard.tsx` |
| Screens | PascalCase + Screen | `HomeScreen.tsx` |
| Hooks | camelCase + use prefix | `useCamera.ts` |
| Services | camelCase | `storage.ts` |
| Utils | camelCase | `dateFormatter.ts` |
| Constants | UPPER_SNAKE_CASE | `RENTAL_COMPANIES.ts` |

### Component Structure
- Prefer functional components with hooks
- Use TypeScript interfaces for props
- Use StyleSheet.create() for styling
- Follow Material Design 3 principles

## Testing

Run tests with:
```bash
cd carcheck-app
npm test
```

Test on actual devices using Expo Go for:
- Camera functionality
- GPS/location features
- Performance validation

## Success Metrics (MVP)

- 70%+ checklist completion rate
- 2-4 minute completion time
- 50%+ repeat usage
- High-quality dispute-ready documentation

## License

Private project - All rights reserved