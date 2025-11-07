# CarCheck MVP - Development Tasks

## Project Overview
Building a mobile app (React Native + Expo) that helps rental car customers systematically document vehicles with a 6-section photo checklist to prevent false damage charges.

**Target:** 2-3 minute completion time, organized evidence, dispute-ready documentation

**UI Component Library:** React Native Paper (Material Design 3)

---

## Task Categories

### 1. Project Setup & Configuration
- [ ] Verify existing Expo project structure in `carcheck-app/`
- [ ] Review and update dependencies in package.json
- [ ] Set up TypeScript configuration
- [ ] Configure eslint and code formatting
- [ ] Set up proper folder structure (components, screens, hooks, utils, types, constants)
- [ ] Install required Expo libraries:
  - expo-camera (camera functionality)
  - expo-location (GPS tagging)
  - expo-file-system (photo storage)
  - expo-print (PDF generation)
  - expo-sharing (email/export functionality)
  - expo-secure-store (data storage)
  - expo-device (device information)
- [ ] Install UI component library:
  - react-native-paper (Material Design 3 components)
  - react-native-safe-area-context (required for Paper)
  - @react-native-vector-icons (icon support for Paper)

### 2. Design System & Theme Setup (React Native Paper)
- [ ] Set up React Native Paper Provider and theme
- [ ] Configure Material Design 3 theme using Paper's theming system
- [ ] Define custom color palette (Primary: Blue #1976D2) in Paper theme
- [ ] Create spacing constants (8, 16, 24, 32px system)
- [ ] Configure typography using Paper's text variants
- [ ] Set up Paper theme colors for light/dark modes
- [ ] Ensure high contrast for outdoor visibility
- [ ] Verify touch target sizes meet Material Design specs (48dp/44px minimum)

### 3. Navigation Structure
- [ ] Set up React Navigation
- [ ] Create main app navigator with screens:
  - HomeScreen (rental list + start new)
  - NewRentalScreen (company, license plate form)
  - ChecklistScreen (6-section photo checklist)
  - CameraScreen (guided photo capture)
  - RentalDetailScreen (view past rental photos)
  - ExportScreen (PDF generation & email)
- [ ] Configure navigation flow and transitions
- [ ] Add navigation headers and back buttons

### 4. Data Models & Storage
- [ ] Define TypeScript types:
  - Rental (company, car details, license plate, date, location)
  - Photo (uri, timestamp, GPS, section, notes)
  - ChecklistSection (name, status, photos)
- [ ] Set up local storage with AsyncStorage/SecureStore
- [ ] Create data access layer (CRUD operations)
- [ ] Implement photo file naming convention
- [ ] Set up metadata storage (timestamps, GPS, labels)

### 5. Core Screen: Home Screen
- [ ] Create HomeScreen component
- [ ] Build "Start New Rental" button using Paper's FAB (Floating Action Button)
- [ ] Create rental list view (current + past) using FlatList or ScrollView
- [ ] Build RentalCard component using Paper's Card component:
  - Card.Title for company and date
  - Card.Content for car details and photo count
  - Use Card's onPress for navigation
- [ ] Implement filtering/sorting by date
- [ ] Add tap navigation to rental details
- [ ] Handle empty state with Paper's Surface and Text components

### 6. Core Screen: New Rental Form
- [ ] Create NewRentalScreen component
- [ ] Build company dropdown using Paper's Menu or custom picker with major rental companies:
  - Enterprise, Hertz, Avis, Budget, Alamo, National, Dollar, Thrifty, Sixt
  - Include "Other" option
- [ ] Add license plate/registration input using Paper's TextInput (required)
- [ ] Add optional fields using Paper's TextInput:
  - Car make
  - Car model
  - Car color
  - Notes (multiline)
- [ ] Form validation with error states in TextInput
- [ ] "Start Inspection" Button using Paper's Button component (contained mode)
- [ ] Save rental data to storage

### 7. Core Screen: Inspection Checklist
- [ ] Create ChecklistScreen component
- [ ] Display rental info header using Paper's Appbar or Card
- [ ] Create progress card using Paper's Card showing car details and completion status
- [ ] Add Paper's ProgressBar to show checklist completion percentage
- [ ] Build 6 checklist sections using Paper's List components:
  - Front (bumper, hood, windshield, headlights)
  - Driver Side (door, wheel, mirror)
  - Rear (bumper, trunk, lights)
  - Passenger Side (door, wheel, mirror)
  - Interior (dashboard, seats, condition)
  - Odometer (mileage reading)
- [ ] Create SectionItem using Paper's List.Item with:
  - left prop: Checkbox or custom icon for status
  - title: Section name
  - description: Section details
  - right prop: Photo count and thumbnails
  - onPress: Navigate to camera
  - Note indicator using Chip or Badge
- [ ] Add "Add Note" functionality using Paper's TextInput in Dialog
- [ ] Use Paper's ProgressBar for visual progress indicator
- [ ] Add floating "Complete Inspection" button using Paper's FAB (appears when all checked)
- [ ] Handle inspection completion with Paper's Snackbar confirmation

### 8. Core Screen: Camera with Guides
- [ ] Create GuidedCamera component
- [ ] Integrate expo-camera
- [ ] Request camera permissions
- [ ] Build full-screen camera viewfinder
- [ ] Add semi-transparent car outline overlay
- [ ] Display text prompts per section using Paper's Banner or custom Text overlay:
  - "Capture front bumper, hood, and windshield"
  - "Capture driver side door, wheel, and mirror"
  - etc.
- [ ] Large shutter button using Paper's FAB or custom IconButton
- [ ] Quick capture with immediate confirmation using Paper's Snackbar
- [ ] Handle photo saving with proper metadata
- [ ] Cancel/back functionality using Paper's IconButton
- [ ] Support multiple photos per section with Paper's Chip to show count

### 9. Photo Management & Metadata
- [ ] Implement photo capture and storage
- [ ] Generate meaningful filenames (date_rentalID_section_timestamp)
- [ ] Auto-tag photos with:
  - Timestamp (date and exact time)
  - GPS coordinates (latitude/longitude) via expo-location
  - Location name (if available)
  - Car section label
  - Rental identification
- [ ] Handle photo compression for storage optimization
- [ ] Create photo thumbnail generation
- [ ] Implement photo gallery view by section

### 10. Core Screen: Rental Detail / Gallery
- [ ] Create RentalDetailScreen component
- [ ] Display rental metadata using Paper's Card (company, date, location, GPS)
- [ ] Build photo gallery organized by section using Paper's List.Section and List.Accordion
- [ ] Show thumbnails with expand functionality
- [ ] Display notes under relevant photos using Paper's Caption text
- [ ] Add "Export PDF" button using Paper's Button (contained mode)
- [ ] Add "Email Photos" button using Paper's Button (outlined mode)
- [ ] Implement photo viewing (full-screen with swipe) using Modal

### 11. PDF Export Functionality
- [ ] Integrate expo-print for PDF generation
- [ ] Design PDF template:
  - Cover page with rental details
  - Each photo on separate page
  - Include timestamps and GPS coordinates
  - Show section labels and notes
  - Summary page
- [ ] Implement PDF generation logic
- [ ] Handle multiple photos in PDF
- [ ] Add loading state during generation
- [ ] Store generated PDF temporarily
- [ ] Test PDF output quality

### 12. Email & Sharing Functionality
- [ ] Integrate expo-sharing
- [ ] Implement one-tap email function
- [ ] Pre-populate email subject line: "CarCheck Documentation - [Company] [Date]"
- [ ] Attach PDF or individual photos
- [ ] Use device's native email app
- [ ] Handle sharing to other apps (Messages, Drive, etc.)
- [ ] Test on both iOS and Android

### 13. GPS & Location Features
- [ ] Integrate expo-location
- [ ] Request location permissions
- [ ] Capture GPS coordinates when photo taken
- [ ] Reverse geocode to get location name
- [ ] Handle location unavailable scenarios (parking garages)
- [ ] Store location data with photos
- [ ] Display location in rental details

### 14. Notes & Damage Documentation
- [ ] Create note-taking UI using Paper's Dialog with TextInput
- [ ] Add "Add Note" button using Paper's IconButton or Button (optional, always visible)
- [ ] Simple text input field using Paper's TextInput (multiline): "Existing scratch on bumper"
- [ ] Associate notes with specific photos/sections
- [ ] Display notes in gallery view using Paper's Caption or Paragraph text
- [ ] Include notes in PDF export
- [ ] Support editing and deleting notes with Paper's Menu for actions

### 15. Onboarding Experience
- [ ] Create welcome screen: "Never worry about rental car damage charges"
- [ ] Build 3-screen tutorial:
  - Screen 1: Take photos using checklist
  - Screen 2: Everything auto-labeled
  - Screen 3: Export to PDF for disputes
- [ ] Add "Set Reminder" guidance screen
- [ ] Implement skip tutorial option
- [ ] Show onboarding only on first launch
- [ ] Store onboarding completion state

### 16. UI/UX Polish
- [ ] Implement loading states using Paper's ActivityIndicator for async operations
- [ ] Add error handling with Paper's Snackbar and Dialog for user-friendly error messages
- [ ] Create success confirmations using Paper's Snackbar
- [ ] Add haptic feedback for key actions (camera shutter, checklist completion)
- [ ] Implement smooth transitions and animations using Paper's animation support
- [ ] Optimize for one-handed use (FAB placement, reachable buttons)
- [ ] Test touch target sizes meet Paper's Material Design specs (48dp minimum)
- [ ] Ensure high contrast for outdoor visibility in theme configuration
- [ ] Add pull-to-refresh on home screen using RefreshControl
- [ ] Implement empty states with Paper's Surface, Icon, and Text components

### 17. Performance Optimization
- [ ] Use FlatList for photo galleries
- [ ] Implement lazy loading for images
- [ ] Optimize image sizes for mobile
- [ ] Use React.memo for expensive components
- [ ] Profile and optimize render performance
- [ ] Test with multiple rentals (20+)
- [ ] Test with many photos per rental (50+)

### 18. Testing & Quality Assurance
- [ ] Test on actual device via Expo Go (iOS and Android)
- [ ] Test camera functionality in real parking lot conditions
- [ ] Test in dark parking garages
- [ ] Verify GPS accuracy in various locations
- [ ] Test PDF generation with real photos (8-12 photos)
- [ ] Test complete user flow end-to-end
- [ ] Test offline functionality (no internet required)
- [ ] Test with various screen sizes
- [ ] Handle edge cases:
  - No camera permission
  - No location permission
  - Storage full
  - Camera unavailable
  - GPS unavailable

### 19. Build & Deployment Preparation
- [ ] Configure app.json with proper metadata
- [ ] Add app icon and splash screen
- [ ] Set up proper bundle identifier
- [ ] Configure app permissions in app.json
- [ ] Test production build
- [ ] Create app store screenshots
- [ ] Write app store description
- [ ] Prepare privacy policy
- [ ] Set up analytics (optional for MVP)

### 20. Documentation
- [ ] Update README with setup instructions
- [ ] Document development workflow
- [ ] Create user guide/FAQ
- [ ] Document known limitations
- [ ] Add troubleshooting guide
- [ ] Document future enhancement ideas

---

## Success Criteria for MVP

The MVP will be considered complete when:

1. **Functional Requirements:**
   - ✓ User can start a new rental and fill in details
   - ✓ User can complete 6-section photo checklist in 2-3 minutes
   - ✓ Photos are automatically tagged with timestamp, GPS, and labels
   - ✓ User can view past rentals and photos organized by section
   - ✓ User can export rental documentation as PDF
   - ✓ User can email PDF with one tap

2. **Quality Requirements:**
   - ✓ App works offline (no internet required)
   - ✓ Camera works in low-light conditions
   - ✓ GPS coordinates captured accurately
   - ✓ PDF includes all photos with proper metadata
   - ✓ Responsive and smooth UI (no lag)
   - ✓ Tested on real devices (iOS and Android)

3. **User Experience Requirements:**
   - ✓ Onboarding is clear and quick (< 1 minute)
   - ✓ Photo checklist is intuitive and guided
   - ✓ Visual progress indicators keep user motivated
   - ✓ Error messages are helpful and actionable
   - ✓ Optimized for one-handed use while standing by car

---

## Priority Levels

**P0 (Critical Path):** Must have for MVP to function
- Project setup, navigation, data storage
- New rental form, checklist screen, camera integration
- Photo storage with metadata, rental list/detail views
- PDF export and email functionality

**P1 (Core Experience):** Important for good UX
- Onboarding, guided camera overlays
- Notes functionality, progress indicators
- Error handling, loading states

**P2 (Polish):** Nice to have, enhances experience
- Animations, haptic feedback
- Advanced photo gallery features
- Performance optimizations

---

## Next Steps

1. **Review existing codebase** in `carcheck-app/` to see what's already built
2. **Prioritize tasks** based on current state
3. **Start with P0 tasks** to build core functionality
4. **Test frequently** on actual device
5. **Iterate based on real-world testing**

---

## Questions to Discuss

1. **Platform Priority:** Should we focus on iOS first, Android first, or both simultaneously?
2. **Camera Overlay Design:** How detailed should the car outline guides be?
3. **Photo Storage Limits:** Should we set a maximum number of photos per rental?
4. **PDF Styling:** Do you have brand preferences for the PDF template design?
5. **Analytics:** Do we want to include analytics in the MVP to track usage patterns?
6. **Beta Testing:** Do you have access to testers with upcoming rentals?

---

**Last Updated:** November 6, 2025
**UI Library:** React Native Paper (Material Design 3 components)
