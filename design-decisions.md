# CarCheck - Design Decisions

**Purpose:** Document all UX/UI design decisions made during development for future reference and consistency.

**Last Updated:** November 7, 2025

---

## Component Design Decisions

### 1. RentalCard Component

**Decision Date:** Nov 7, 2025

**Visual Elements:**
- ✅ Show company logo/icon for quick visual recognition
- ❌ No photo thumbnails on cards (keep it clean, can revisit later)
- ✅ Show make/model of car for quick reference
- ✅ License plate displayed prominently
- ✅ Status badge with color coding (blue=in-progress, gray=pending, green=completed)
- ✅ Photo progress shown as "X/6 sections"
- ✅ Creation date shown at bottom

**Rationale:**
- Company logo helps quick scanning when user has rental history
- Make/model important for identifying specific rental quickly
- No thumbnail keeps card compact and focused on key info
- Can add thumbnails later if user feedback suggests it's valuable

---

### 2. HomeScreen Layout

**Decision Date:** Nov 7, 2025

**Grouping & Organization:**
- ✅ Group rentals by status: In Progress, Pending, Completed
- ✅ Show section count for all sections (e.g., "IN PROGRESS (1)")
- ✅ Sort by creation date (newest first) within each section
- ✅ Only show section headers if that section has rentals

**Rationale for Section Count:**
- Typically users have only 1 active rental at a time
- Count is most useful for Completed section (shows rental history size)
- Still helpful to show count for all sections for consistency

**Completed Section Behavior:**
- ✅ **Collapsible section (default: collapsed)**
- ✅ Always starts collapsed when loading home screen
- ✅ Does NOT remember expanded/collapsed state across app sessions
- ✅ Shows count even when collapsed (e.g., "COMPLETED (5)")
- ✅ Tap to expand/collapse
- ✅ Uses `List.Accordion` from React Native Paper

**Rationale:**
- Most users care about active/pending rentals, not history
- Completed rentals can accumulate over time, taking up space
- Collapsing keeps home screen focused on current tasks
- Count visible when collapsed shows user has rental history

**Actions & Interactions:**
- ✅ 3-dot menu on each rental card (top-right corner)
- ❌ No swipe-to-delete (can add later if needed)
- ✅ Pull-to-refresh to reload data
- ✅ FAB button always visible for "Start New Rental"
- ✅ Tap card to open (smart navigation based on status)

---

### 3. Delete Rental Behavior

**Decision Date:** Nov 7, 2025

**Warning for Rentals with Photos:**
- ✅ If rental has photos, show warning dialog before deletion
- ✅ Warning message: "This rental has X photos. Deleting this rental will permanently delete all associated photos. This cannot be undone."
- ✅ Two buttons: "Cancel" and "Delete Anyway" (destructive style)

**No Photos - Simple Confirmation:**
- ✅ If rental has no photos, show simple confirmation
- ✅ Message: "Are you sure you want to delete this rental?"
- ✅ Two buttons: "Cancel" and "Delete"

**Post-Deletion:**
- ✅ Delete rental from AsyncStorage
- ✅ Delete all associated photo files from file system
- ✅ Show success Snackbar: "Rental deleted"
- ✅ Refresh home screen list

**Rationale:**
- Users need clear warning when deleting work (photos)
- Different warning levels based on data loss severity
- Prevents accidental deletion of documented evidence

---

### 4. 3-Dot Menu Options

**Decision Date:** Nov 7, 2025

**For In Progress & Pending Rentals:**
```
- Edit Details (navigate to edit screen - future feature)
- Delete Rental (with warning if has photos)
```

**For Completed Rentals:**
```
- View Details (navigate to RentalDetailScreen)
- Export PDF (placeholder for Phase 3)
- Delete Rental (with warning, photos always present)
```

**Rationale:**
- In-progress rentals need editing capability (fix typos, update info)
- Completed rentals are "locked" - no editing, only viewing
- Export PDF only makes sense for completed rentals
- Delete always available but with appropriate warnings

---

### 5. Smart Navigation Logic

**Decision Date:** Nov 7, 2025

**Navigation Rules:**
```typescript
if (rental.status === 'completed') {
  // Navigate to read-only detail view
  navigation.navigate('RentalDetail', { rentalId: rental.id });
} else {
  // Navigate to checklist to resume/continue
  navigation.navigate('Checklist', { rentalId: rental.id });
}
```

**Rationale:**
- In-progress/pending rentals should resume at checklist (continue work)
- Completed rentals should show full detail view (review work)
- Different screens provide appropriate context for rental state

---

### 6. RentalDetailScreen Design

**Decision Date:** Nov 7, 2025

**Section Display:**
- ✅ All 6 sections shown as accordions (List.Accordion)
- ✅ **Default state: collapsed**
- ✅ Show photo count in section header (e.g., "Exterior - Front (3 photos)")
- ✅ Tap to expand and view photos
- ✅ Can expand multiple sections at once

**Photo Display:**
- ✅ Thumbnail grid when section expanded (3 photos per row)
- ✅ Tap photo to open full-screen viewer
- ✅ Show metadata below photos (GPS coords as text, timestamp)

**Full-Screen Photo Viewer:**
- ✅ **Navigate across ALL photos in the rental** (not just within section)
- ✅ Swipe left/right to go to next/previous photo
- ✅ Show which section the photo belongs to in overlay
- ✅ Show metadata overlay (section name, timestamp, GPS coordinates)
- ✅ Close with X button or swipe down
- ✅ Pinch to zoom
- ✅ Photo order: by section order, then by timestamp within section

**GPS Display:**
- ✅ Show coordinates as text (e.g., "Lat: 40.7128, Lon: -74.0060")
- ❌ No map preview (deferred to Phase 3)

**Actions:**
- ✅ "Export to PDF" button (placeholder for Phase 3)
- ✅ "Share" button (placeholder for Phase 3)
- ✅ Delete rental via 3-dot menu

**Rationale:**
- Collapsed sections keep screen manageable, user expands what they need
- Full rental navigation in viewer provides complete context
- Simple GPS coordinates sufficient for MVP (maps add complexity)
- Photo order by section maintains checklist structure

---

### 7. CameraScreen Design

**Decision Date:** Nov 7, 2025

**Screen Layout:**
- ✅ Full-screen camera preview
- ✅ Semi-transparent overlay at top with section name and guidance
- ✅ Close button (X) top-left
- ✅ Flash toggle top-right
- ✅ Large capture button at bottom center (FAB style)

**Photo Capture Flow:**
- ✅ **Immediate save (no preview screen)**
- ✅ Capture → Save → Navigate back to ChecklistScreen
- ✅ Show success Snackbar on ChecklistScreen after return
- ✅ ChecklistScreen auto-reloads to show new photo

**Rationale for Immediate Save:**
- Speed is critical - user is standing by car, possibly in parking lot
- 2-4 minute completion time goal
- User can see thumbnail in checklist if they want to verify
- Can add "retake" feature later if needed

**Flash Control:**
- ✅ **Default: AUTO**
- ✅ Toggle cycles: AUTO → OFF → ON → AUTO
- ✅ Icon shows current state (⚡AUTO, ⚡OFF, ⚡ON)

**Guidance Overlay:**
- ✅ **Stays visible** (does not auto-dismiss)
- ✅ Shows section name (e.g., "Exterior - Front")
- ✅ Shows brief instructions (e.g., "Capture bumper, hood, windshield")
- ✅ Semi-transparent background for readability
- ✅ Uses data from checklistSections.ts constants

**Photo Quality:**
- ✅ **Maximum quality (no compression)**
- ✅ Save at highest available camera resolution
- ❌ No image compression/optimization for MVP
- ✅ Can add compression later if storage becomes issue

**Rationale for No Compression:**
- Photo quality is evidence - must be clear for disputes
- Modern phones have ample storage
- Typical rental: 6-12 photos = ~20-40MB total (manageable)
- Can optimize later if user feedback indicates storage issues

**Permissions:**
- ✅ Request camera permission on mount
- ✅ Request location permission for GPS tagging
- ✅ If camera denied: show explanation + "Open Settings" button
- ✅ If location denied: still allow photo capture, warn "GPS unavailable"

**Error Handling:**
- ✅ Camera unavailable: Error message + "Go Back" button
- ✅ Photo save failed: Error Snackbar + allow retry
- ✅ GPS unavailable: Log warning, save photo without location data
- ✅ Storage full: Error message, suggest deleting old rentals

---

### 8. Photo Storage Utility Design

**Decision Date:** Nov 7, 2025

**File Location:** `src/utils/photoStorage.ts`

**Core Functions (MVP):**
- ✅ `initPhotoDirectory()` - Create photos directory on app startup
- ✅ `savePhoto(rentalId, sectionId, photoUri, location)` - Save photo and return metadata
- ✅ `deletePhoto(photoUri)` - Delete single photo file
- ✅ `deleteRentalPhotos(rentalId)` - Delete all photos for a rental

**File Naming:**
- ✅ Pattern: `rental_{rentalId}_{sectionId}_{timestamp}.jpg`
- ✅ Example: `rental_abc123_front_exterior_1699234567890.jpg`
- ✅ Storage location: `FileSystem.documentDirectory + 'photos/'`

**Simplicity Principles:**
- ✅ **Keep it simple for MVP**
- ❌ No storage limit warnings (defer to later)
- ❌ No orphaned photo cleanup (defer to later)
- ❌ No extensive validation (trust the data)
- ❌ No compression (max quality)
- ✅ Basic error handling with console logging
- ✅ Functions return reasonable defaults on errors
- ✅ Don't throw errors - fail gracefully

**Rationale:**
- Get core functionality working first
- Avoid complicating data storage unnecessarily
- Can add cleanup/optimization features later based on real usage
- Focus on the happy path for MVP

**Deferred Features:**
- Storage statistics and monitoring
- Orphaned photo cleanup utility
- Photo validation before display
- Maximum storage warnings
- Batch operations for performance

---

## Future Decisions to Document

### Photo Management (Deferred)
- Photo deletion (individual vs all in section)
- Photo retake (replace vs add another)
- Maximum photos per rental
- Storage cleanup utilities
- Photo validation strategies
- When to implement compression (if storage issues reported)

### Export & Sharing
- PDF template design
- What metadata to include
- Email pre-population format
- Share to other apps behavior

### Performance
- When to implement pagination for completed rentals
- Thumbnail generation strategy
- Image caching approach

---

## Design Principles

**Established Principles:**

1. **Simplicity First**
   - Minimize cognitive load
   - Show only essential information
   - Hide complexity behind progressive disclosure (like collapsed completed section)

2. **Prevent Data Loss**
   - Warn before destructive actions
   - Make warnings proportional to data loss severity
   - Use clear, specific language (not generic "Are you sure?")

3. **Focus on Active Work**
   - Prioritize in-progress and pending rentals
   - Minimize space for historical data
   - Keep user focused on current task

4. **Quick Visual Recognition**
   - Company logos for scanning
   - Color-coded status badges
   - Consistent layout across cards

5. **One-Handed Usage**
   - FAB in thumb-reach zone (bottom-right)
   - Large touch targets (minimum 44px)
   - Minimize need to stretch/reach

6. **Offline-First**
   - All data stored locally
   - No internet required for core functionality
   - Graceful handling when GPS/camera unavailable

---

## Deferred Decisions (TBD)

- [ ] Onboarding flow design
- [ ] Settings screen options
- [ ] Edit rental details screen design
- [ ] Photo gallery/viewer UI
- [ ] PDF template layout
- [ ] Error handling UX patterns
- [ ] Loading state designs
- [ ] Empty state variations
- [ ] Search/filter functionality (if needed)
- [ ] Sort options (if needed)

---

**Note:** This document should be updated whenever design decisions are made during development. Include the date, rationale, and any alternatives considered.
