# CarCheck: Product Specification Document
**Last Updated:** November 4, 2025  
**Version:** 1.0 - MVP Specification

---

## Executive Summary

**Product Name:** CarCheck  
**Tagline:** "A 2-minute photo checklist that protects you from false rental car damage charges"

**Core Value Proposition:**  
A mobile app that guides rental car customers through systematic vehicle documentation at pickup, providing timestamped, GPS-tagged photographic evidence to prevent false damage charges and reduce anxiety.

---

## Problem Statement

### Primary Problem (MVP Focus)
"When travelers remember to document their rental car, they struggle to do it systematically and thoroughly, leading to anxiety about missing damage and inadequate evidence for disputes."

### User Pain Points
1. **Uncertainty about coverage** - "Did I miss any parts of the car?"
2. **Poor documentation conditions** - Dark parking garages, time pressure, fatigue
3. **Disorganized evidence** - Random photos scattered in camera roll
4. **Inadequate proof for disputes** - Photos lack timestamps, GPS, or proper labeling
5. **Stress and anxiety** - Worry about potential false charges weeks later

### Market Context
- **48 million Americans** rented cars in 2023
- **25-56% of travelers** experience surprise fees or disputed charges
- **60% of damage claims** are not the renter's fault
- **Average disputed charges:** $350-$750 per incident
- **No dominant consumer-facing solution** currently exists

---

## Target Users

### Primary User Profile
- **Frequency:** Both frequent and occasional rental car users
- **Demographics:** Adults 25-55 who rent cars for business or leisure
- **Behaviors:** 
  - Remember to take photos but do so inconsistently
  - Feel rushed and stressed during pickup
  - Worry about potential disputes
  - Willing to spend 2-3 minutes for peace of mind

### User Mindset at Pickup
- Time-pressured (want to get on the road)
- Mentally fatigued (just traveled)
- Physically uncomfortable (standing in parking lot)
- Slightly anxious (new vehicle, unfamiliar location)
- Solution-oriented (willing to follow simple process for protection)

---

## Solution Overview

### Product Vision
A dead-simple mobile photo checklist that guides renters through complete car documentation in 2-3 minutes, with automatic organization and dispute-ready evidence.

### Core User Experience
1. User opens app at rental pickup
2. Follows 6-section photo checklist with visual guides
3. Takes 8-12 photos in 2-3 minutes
4. Photos automatically labeled with timestamps, GPS, and organization
5. User has peace of mind and dispute-ready evidence
6. If charge disputed weeks later, exports organized PDF with all evidence

### Key Differentiation
- **Consumer-focused** (not designed for rental companies)
- **Guided process** (not just a camera app)
- **Organized evidence** (not random photos)
- **Dispute-ready** (proper documentation from the start)

---

## MVP Feature Specification

### Must-Have Features (MVP)

#### 1. Simple Photo Checklist
- 6 inspection sections:
  - Front (bumper, hood, windshield, headlights)
  - Driver Side (door, wheel, mirror)
  - Rear (bumper, trunk, lights)
  - Passenger Side (door, wheel, mirror)
  - Interior (dashboard, seats, condition)
  - Odometer (mileage reading)
- Visual progress indicator
- Clear completion status per section

#### 2. Guided Camera Experience
- Camera integration with overlay guides
- Visual prompts: "Point at front bumper"
- Semi-transparent car outline overlay
- Quick capture with immediate confirmation

#### 3. Automatic Photo Labeling
Each photo automatically tagged with:
- Timestamp (date and exact time)
- GPS coordinates (latitude/longitude)
- Location name (if available)
- Car section label
- Rental identification

#### 4. Optional Note-Taking
- Add damage notes to any photo
- Simple text field: "Existing scratch on bumper"
- Optional button always visible but not intrusive
- Notes included in exports

#### 5. Rental Organization
- Gallery organized by rental date
- Each rental shows:
  - Company name
  - Car details (make, model, color)
  - License plate/registration
  - Date and location
  - Photo count
  - Status (current/past)

#### 6. New Rental Form
Required fields:
- Rental company (dropdown with major companies + "Other")
- License plate/registration number

Optional fields:
- Car make
- Car model
- Car color
- Notes

#### 7. PDF Export
Generate professional PDF including:
- Cover page with rental details
- Each photo on separate page
- Timestamps and GPS coordinates
- Section labels and notes
- Summary page

#### 8. Email Functionality
- One-tap email function
- Pre-populated subject line
- Attached PDF or individual photos
- Uses device's native email app

#### 9. Simple Reminder Setup
- Onboarding prompts: "When's your next rental?"
- Guides user to set phone reminder
- Quick tutorial (3 screens)
- Sets expectation that user owns the reminder

### Explicitly Out of Scope for MVP
- ❌ Automatic reminders/notifications
- ❌ Calendar integration
- ❌ Email parsing of rental confirmations
- ❌ AI damage detection
- ❌ Photo quality enhancement
- ❌ Dispute letter templates
- ❌ Cloud sync/backup
- ❌ User accounts
- ❌ Rental agreement upload
- ❌ Video recording

---

## User Flows

### Flow 1: First-Time User Onboarding
1. Download app from app store
2. Welcome screen: "Never worry about rental car damage charges"
3. Enter next rental date/time
4. Guided to set phone reminder
5. Quick 3-screen tutorial:
   - Take photos using checklist
   - Everything auto-labeled
   - Export to PDF for disputes
6. Arrive at home screen

### Flow 2: Taking Photos at Pickup (Core Experience)
1. User at rental lot, opens app
2. Home screen: Taps "Start New Rental"
3. Fills out rental form:
   - Company: Enterprise (dropdown selection)
   - Car: Toyota Camry, Silver
   - Registration: ABC 1234
   - Taps "Start Inspection"
4. Sees inspection checklist (all unchecked)
5. Taps "Front" section
6. Camera opens with overlay guide
7. Takes photo of front of car
8. Returns to checklist (Front now checked with thumbnail)
9. Optional: Taps "Add note" to document existing scratch
10. Repeats for remaining 5 sections
11. All sections complete
12. Taps "Complete Inspection"
13. Success confirmation
14. Returns to home screen

**Time to complete:** 2-3 minutes  
**Photos taken:** 8-12 (1-2+ per section)

### Flow 3: Reviewing Past Rentals
1. Opens app to home screen
2. Sees list of rentals (Current + Past)
3. Taps on specific rental
4. Views rental detail screen with:
   - Company, date, location info
   - Photo gallery (organized by section)
   - Export and email options

### Flow 4: Exporting for Dispute
1. Receives disputed charge 2-4 weeks after return
2. Opens app
3. Finds rental from that date
4. Taps "Export PDF"
5. PDF generates with all photos and metadata
6. Taps to share
7. Selects email
8. Sends to rental company dispute department

---

## Key Design Decisions

### Information Architecture
- **Photos per section:** Unlimited (user decides based on damage)
- **Note-taking prompt:** Optional button always visible, not forced
- **Company selection:** Dropdown with major companies + "Other" field
- **Registration field:** Required (critical for vehicle identification)

### Checklist Sections (6 Total)
Kept intentionally broad to avoid feeling tedious:
- Front (not broken into bumper/hood/windshield separately)
- Driver Side
- Rear
- Passenger Side
- Interior
- Odometer

Users can take multiple photos per section if needed.

### Photo Count Target
- **Minimum:** 6 photos (one per section)
- **Recommended:** 8-12 photos
- **Maximum:** Unlimited
- **Balance:** Thorough without being tedious

### Design System
- **Recommended:** Material Design 3
- **Rationale:** Cross-platform compatibility, modern aesthetic, well-documented
- **Screen size:** Standard mobile (390 x 844 - iPhone 14)

---

## Screen Specifications

### Home Screen
**Purpose:** Central hub for rentals and starting new inspections

**Key Elements:**
- Prominent "Start New Rental" button
- Current rental section (if active)
- Past rentals list (collapsible)
- Each rental shows: Company, date, car, photo count, location

### Inspection Checklist Screen
**Purpose:** Core experience - guide user through photo capture

**Key Elements:**
- Header: Rental company, date/time
- Progress card: Car details, completion status
- 6 checklist items (expandable):
  - Unchecked state: Circle icon, "Tap to capture"
  - Checked state: Checkmark icon, photo count, thumbnails
  - Note indicator if present
- Floating "Complete Inspection" button (appears when all checked)

### Camera Screen
**Purpose:** Guided photo capture with context

**Key Elements:**
- Full-screen camera viewfinder
- Semi-transparent car outline overlay
- Text prompt: "Capture front bumper, hood, and windshield"
- Large shutter button
- Cancel/back option

### New Rental Form
**Purpose:** Capture rental details before inspection

**Key Elements:**
- Company dropdown (Enterprise, Hertz, Avis, Budget, etc. + Other)
- Car details fields (make, model, color - optional)
- License plate/registration (required)
- Notes field (optional)
- "Start Inspection" button

### Rental Detail / Gallery Screen
**Purpose:** View all photos from a specific rental

**Key Elements:**
- Rental metadata (company, date, location, GPS)
- Photos organized by section with thumbnails
- Notes displayed under relevant photos
- "Export PDF" button
- "Email Photos" button

---

## Success Metrics for MVP

### Adoption Metrics
- **Completion rate:** % of users who complete full 6-section checklist when they start
- **Photos per rental:** Average number (target: 8-12)
- **Time to complete:** Average duration (target: 2-3 minutes)

### Retention Metrics
- **Repeat usage:** % of users who use app for subsequent rentals
- **App opens per rental:** How reliably users remember to open the app

### Value Realization Metrics
- **Dispute success rate:** % of disputes resolved in user's favor with app evidence
- **Anxiety reduction:** User reported peace of mind (qualitative feedback)
- **NPS score:** Net Promoter Score from users

### Usage Pattern Metrics
- **Section completion:** Which sections get skipped most often?
- **Notes usage:** How often do users add damage notes?
- **Export frequency:** How many users actually export PDFs?

---

## Primary Learning Objectives for MVP

### 1. Core Value Validation
**Question:** Is guided documentation genuinely more helpful than random photos?

**How we'll know:**
- Users complete the checklist vs. abandoning
- Users report feeling more protected
- Disputes are resolved successfully with the evidence

### 2. Feature Prioritization
**Question:** Which guidance/organization features provide the most value?

**How we'll know:**
- Usage patterns (which features get used)
- User feedback (which features they mention)
- Export analysis (what's included in PDFs)

### 3. User Behavior Insights
**Question:** What's the optimal checklist design?

**How we'll know:**
- Time spent per section
- Photos taken per section
- Which sections get skipped
- Where users add notes

### 4. Dispute Effectiveness
**Question:** Does proper documentation actually help in real disputes?

**How we'll know:**
- Documented cases of dispute resolution
- User testimonials
- Comparison to disputes without app

---

## Key Challenge: The Reminder Problem

### The Behavioral Hurdle
The biggest challenge is **getting users to remember to open the app** during the stressful rental pickup moment.

### MVP Approach (Manual Solution)
- Onboarding prompts user to set phone reminder
- Clear instruction: "Open this app BEFORE you drive away"
- Quick tutorial showing 2-3 minute process
- Sets user expectation that they own the reminder

### Rationale for Manual Approach
1. **Test core value first** - Is the documentation tool itself valuable?
2. **Avoid premature optimization** - Don't solve reminders until we know the tool works
3. **Learn user behavior** - How often do people actually forget vs. choose not to use it?
4. **Technical simplicity** - No complex integrations needed for MVP

### Future Enhancement (Post-MVP)
If MVP succeeds and forgetting is the main barrier:
- Calendar integration (detect rental bookings)
- Geofencing (notify when arriving at rental location)
- Email parsing (scan confirmation emails)
- Booking platform integrations (Expedia, Kayak, etc.)

---

## Post-MVP Enhancement Roadmap

### Version 1.1 - Quick Wins
- Dark/low-light photo enhancement
- Damage highlighting (circles/arrows on photos)
- Improved visual guides in camera
- More rental company logos

### Version 1.2 - Reminder System
- Calendar integration
- Geofencing notifications
- Email parsing for rental confirmations

### Version 2.0 - Advanced Features
- Rental agreement upload and analysis
- AI damage detection
- Damage cost estimation
- Dispute letter templates
- Cloud backup and sync

### Version 3.0 - Ecosystem
- Integration with rental company apps
- Integration with credit card dispute processes
- Integration with insurance companies
- Business traveler features (expense reports)

---

## Business Model Considerations

### Pricing Options to Test
- **Per-rental:** $2-5 one-time fee per rental
- **Subscription:** $9.99/year for unlimited rentals
- **Freemium:** Basic features free, premium features paid

### Revenue Potential
- 48M rentals per year (US market)
- If 5% adoption = 2.4M users
- At $3 per rental = $7.2M potential revenue

### Customer Acquisition Strategy
- App store optimization (ASO)
- Content marketing (rental car tips, dispute stories)
- Partnerships with travel booking sites
- Social proof (testimonials from dispute wins)

---

## Risks and Mitigation

### Risk 1: Users Forget to Use the App
**Mitigation:** 
- Clear onboarding about setting reminders
- Post-MVP: Automatic reminder system
- Marketing emphasis on "before you drive away"

### Risk 2: Rental Companies Don't Accept Evidence
**Mitigation:**
- PDF format is standard and professional
- Timestamps and GPS are verifiable
- Document successful disputes as case studies

### Risk 3: Too Many Photos Feels Tedious
**Mitigation:**
- Limited to 6 sections (not overly granular)
- 2-3 minute completion time (tested in MVP)
- Visual progress indicator keeps users motivated

### Risk 4: Low Perceived Value (Nothing Bad Happens)
**Mitigation:**
- Marketing focuses on peace of mind, not just disputes
- Position as "insurance" against rare but expensive events
- Emphasize anxiety reduction benefit

---

## Development Roadmap

### Phase 1: Design (Week 1-2)
- Create Figma designs for all MVP screens
- Test prototype flow on mobile device
- Gather feedback from 3-5 potential users

### Phase 2: MVP Development (Week 3-6)
- Build core functionality
- Internal testing on actual rentals
- Bug fixes and refinement

### Phase 3: Beta Testing (Week 7-8)
- Recruit 10-20 beta testers with upcoming rentals
- Collect usage data and feedback
- Iterate based on findings

### Phase 4: Launch Preparation (Week 9-10)
- App store submission
- Create marketing materials
- Set up analytics and monitoring

### Phase 5: MVP Launch (Week 11)
- Launch on iOS or Android (platform TBD)
- Monitor metrics closely
- Rapid iteration based on user feedback

---

## Success Criteria for MVP

The MVP will be considered successful if:

1. **70%+ completion rate** - Users who start the checklist complete all sections
2. **2-4 minute completion time** - Fast enough to not feel burdensome
3. **50%+ repeat usage** - Users who complete one rental use it again
4. **3+ documented dispute wins** - Real evidence that it works
5. **8+ NPS score** - Users would recommend to others

If these criteria are met, proceed with:
- Expansion to second platform
- Development of reminder system
- Investment in marketing and user acquisition

---

## Appendix: Design Principles

### 1. Simplicity Over Complexity
Every screen should have one clear purpose. No feature bloat.

### 2. Speed Over Perfection
2-3 minutes maximum. Users are standing in a parking lot.

### 3. Guidance Over Automation
Help users do it right, don't try to do it for them (yet).

### 4. Evidence Over Convenience
Documentation quality is more important than ease of sharing.

### 5. Peace of Mind Over Fear
Marketing focuses on protection and confidence, not scary dispute stories.

---

## Document Version History

**v1.0** (November 4, 2025)
- Initial product specification
- MVP feature set defined
- User flows documented
- Success metrics established

---

*This document represents the foundational product specification for CarCheck MVP. All decisions are subject to revision based on user testing and feedback.*