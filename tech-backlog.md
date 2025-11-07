# CarCheck Technical Backlog

This document tracks technical improvements, refactoring tasks, and architectural enhancements for future implementation.

---

## 🔴 High Priority

### 1. Refactor Screen Components - Extract Logic into Custom Hooks

**Status:** 📋 Planned
**Estimated Effort:** Medium (4-6 hours)
**Impact:** High - Improves maintainability, testability, and code reusability

#### Problem
Screen components (e.g., `NewRentalScreen.tsx`) are growing large (370+ lines) and mixing concerns:
- Form state management
- Validation logic
- Business logic
- UI rendering
- Navigation

This makes the code:
- Hard to test
- Difficult to maintain
- Impossible to reuse (e.g., for edit rental functionality)

#### Proposed Solution

**Phase 1: Extract Form Logic** (Quick Wins)

1. **Create Custom Hook:** `src/hooks/useNewRentalForm.ts`
   - Extract all form state management
   - Extract form handlers (onChange, onSubmit)
   - Extract validation logic
   - Return clean interface for screen to consume

2. **Create Utility Functions:** `src/utils/validation.ts`
   - Pure validation functions (testable in isolation)
   - `validateLicensePlate(plate: string, isRequired: boolean)`
   - `validateCompany(company: string, customCompany: string)`
   - `validateRentalForm(formData: RentalFormData)`

3. **Create Date Helpers:** `src/utils/dateHelpers.ts`
   - `isRentalStartingToday(date: Date): boolean`
   - `isRentalInFuture(date: Date): boolean`
   - `formatRentalDate(date: Date): string`

**Phase 2: Component Splitting** (As Needed Later)

4. **Extract Form Sections:** `src/components/forms/`
   - `CompanySelector.tsx` - Company dropdown + custom name field
   - `DatePickerButton.tsx` - Reusable date picker component
   - `LicensePlateInput.tsx` - License plate with dynamic validation
   - `VehicleDetailsForm.tsx` - Make/model/notes section

5. **Create Form Container:** `src/components/forms/RentalFormFields.tsx`
   - Compose all form sections
   - Handle field orchestration
   - Keep NewRentalScreen focused on navigation/submission

#### Expected Results

- ✅ Screen components: **370 lines → ~100 lines**
- ✅ Logic becomes **testable in isolation**
- ✅ Form logic becomes **reusable** (edit rental, duplicate rental)
- ✅ Easier to **onboard new developers**
- ✅ **Consistent patterns** across the app

#### Files to Refactor (Priority Order)
1. `src/screens/NewRentalScreen.tsx` (370 lines) - HIGH
2. `src/screens/ChecklistScreen.tsx` (check size) - MEDIUM
3. Other screens as they grow - LOW

#### References
- [React Native Best Practices - Custom Hooks](https://reactnative.dev/docs/custom-hooks)
- [Separation of Concerns in React](https://kentcdodds.com/blog/separation-of-concerns)

---

## 🟡 Medium Priority

### 2. Improve TypeScript Type Safety

**Status:** 📋 Planned
**Estimated Effort:** Small (2-3 hours)

#### Tasks
- [ ] Create dedicated form types (`src/types/forms.ts`)
- [ ] Add stricter types for validation errors
- [ ] Type utility functions with proper generics
- [ ] Remove `any` types if present

---

### 3. Add Unit Tests for Business Logic

**Status:** 📋 Planned
**Estimated Effort:** Medium (3-4 hours)
**Prerequisite:** Complete refactoring (#1)

#### Tasks
- [ ] Set up testing framework (Jest + React Native Testing Library)
- [ ] Test validation functions
- [ ] Test custom hooks
- [ ] Test date helper utilities
- [ ] Test rental creation logic

#### Coverage Goals
- Utilities: 90%+
- Custom Hooks: 80%+
- Components: 60%+

---

## 🟢 Low Priority / Nice to Have

### 4. Consider Form Library Integration

**Status:** 💭 Research Phase
**Estimated Effort:** Medium (4-5 hours)

#### Options to Evaluate
- **react-hook-form** - Most popular, performance optimized
- **formik** - Feature rich, larger bundle size
- **Custom solution** - Continue with current approach

#### Evaluation Criteria
- Bundle size impact
- Learning curve for team
- TypeScript support
- React Native compatibility
- Validation flexibility

#### Decision
- ⏸️ **Defer for MVP** - Current custom solution works well
- 📅 **Revisit** when form complexity increases significantly

---

### 5. Performance Optimizations

**Status:** 📋 Planned
**Estimated Effort:** Small (2-3 hours)

#### Tasks
- [ ] Add `React.memo` to expensive components
- [ ] Use `useCallback` for handlers passed to children
- [ ] Use `useMemo` for computed values
- [ ] Profile render performance with React DevTools

#### When to Implement
- When performance issues are observed
- After form refactoring is complete

---

### 6. Accessibility Improvements

**Status:** 📋 Planned
**Estimated Effort:** Medium (3-4 hours)

#### Tasks
- [ ] Add proper accessibility labels
- [ ] Test with screen readers (iOS VoiceOver, Android TalkBack)
- [ ] Improve touch target sizes (minimum 44x44dp)
- [ ] Add semantic HTML/native elements
- [ ] Test keyboard navigation

---

### 7. Error Handling & User Feedback

**Status:** 📋 Planned
**Estimated Effort:** Small (2-3 hours)

#### Tasks
- [ ] Implement global error boundary
- [ ] Add toast/snackbar notifications for errors
- [ ] Improve error messages (more user-friendly)
- [ ] Add retry mechanisms for failed saves
- [ ] Log errors for debugging (dev mode only)

---

## 📝 Code Quality & Standards

### 8. Set Up ESLint + Prettier

**Status:** 📋 Planned
**Estimated Effort:** Small (1-2 hours)

#### Tasks
- [ ] Install and configure ESLint with React Native rules
- [ ] Configure Prettier for consistent formatting
- [ ] Add pre-commit hooks (husky + lint-staged)
- [ ] Document code style in CLAUDE.md

---

### 9. Documentation Improvements

**Status:** 🔄 Ongoing

#### Tasks
- [x] Create CLAUDE.md with development guidelines
- [x] Document constants usage
- [x] Document React Native Paper best practices
- [ ] Add JSDoc comments to complex functions
- [ ] Create component documentation with examples
- [ ] Document testing strategy

---

## 🏗️ Architecture Decisions

### 10. State Management Strategy

**Status:** ✅ Decided (for MVP)
**Decision:** Use React `useState` + `useContext` for MVP

#### Rationale
- Simple and sufficient for MVP scope
- No additional dependencies
- Easy to understand for new developers

#### Revisit When
- State becomes complex (deeply nested)
- Need for global state sharing increases
- Performance issues due to prop drilling

#### Future Options
- Zustand (lightweight)
- Redux Toolkit (if complex state logic needed)

---

## 📊 Technical Debt Tracking

| Priority | Item | Estimated Effort | Impact | Status |
|----------|------|-----------------|--------|--------|
| 🔴 High | Refactor screens - extract logic | Medium (4-6h) | High | 📋 Planned |
| 🟡 Medium | Improve TypeScript types | Small (2-3h) | Medium | 📋 Planned |
| 🟡 Medium | Add unit tests | Medium (3-4h) | High | 📋 Planned |
| 🟢 Low | Evaluate form libraries | Medium (4-5h) | Low | 💭 Research |
| 🟢 Low | Performance optimizations | Small (2-3h) | Medium | 📋 Planned |
| 🟢 Low | Accessibility improvements | Medium (3-4h) | Medium | 📋 Planned |
| 🟢 Low | Error handling improvements | Small (2-3h) | Medium | 📋 Planned |

---

## 🎯 Sprint Planning

### Next Sprint Recommendations
1. **Refactor NewRentalScreen** (High Priority, High Impact)
2. **Add validation utilities** (Enables testing)
3. **Set up testing framework** (Foundation for quality)

### Future Sprints
- Component splitting as screens grow
- Performance profiling and optimization
- Accessibility audit and improvements

---

## 📌 Notes

- All architectural decisions should be documented here
- Update this file when completing backlog items
- Link related issues/PRs when implementing
- Review and prioritize quarterly

---

**Last Updated:** 2025-01-07
**Next Review:** After MVP launch
