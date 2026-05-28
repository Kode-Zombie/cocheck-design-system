# Attendance Storybook Design

## Goal

Rebuild the attached attendance-management HTML design inside this Storybook project as a reusable React screen and pattern library. The implementation should preserve the full design surface from the source HTML while fitting the project's existing Vite, React, TypeScript, Storybook, CSS, and lucide-react conventions.

The source design contains about 60 artboards across owner and employee flows for mobile and web. The target is a Storybook design-pattern/screen library, not a production app connected to APIs.

## Source Context

- Source HTML: `/Users/youngjinshin/Downloads/_ Design (1).html`
- Project root: `/Users/youngjinshin/storybook`
- Existing project style:
  - Components live under `src/components` and `src/componentsJB`.
  - Styles are plain CSS files imported by components.
  - Stories use `*.stories.tsx` with Korean titles and labels.
  - Icons use `lucide-react` where available.

The new attendance work should be isolated from existing component folders so the current Storybook examples remain stable.

## Chosen Approach

Use "full reconstruction with pattern extraction."

The implementation will recreate all source artboards, but it will not be a direct one-file copy of the bundled HTML. Instead, repeated design elements will become lightweight reusable React components, and each screen will be composed from those patterns.

This gives enough fidelity for visual review while keeping future edits practical.

## Proposed File Structure

```text
src/componentsAttendance/
  attendance-theme.ts
  components/
    ActionCard.tsx
    AttendanceCanvas.tsx
    DocumentPreview.tsx
    EmptyState.tsx
    Frame.tsx
    MetricCard.tsx
    Navigation.tsx
    StatusBadge.tsx
  data/
    attendanceSampleData.ts
  screens/
    onboarding.tsx
    employeeMobile.tsx
    ownerMobile.tsx
    employeeWeb.tsx
    ownerWeb.tsx
    emptyStates.tsx
    proposals.tsx
  attendance.css
  index.ts
  AttendanceGallery.stories.tsx
  AttendanceOnboarding.stories.tsx
  AttendanceEmployeeMobile.stories.tsx
  AttendanceOwnerMobile.stories.tsx
  AttendanceEmployeeWeb.stories.tsx
  AttendanceOwnerWeb.stories.tsx
  AttendanceEmptyStates.stories.tsx
  AttendanceProposals.stories.tsx
```

Exact filenames can shift during implementation if the code reads better, but the isolation boundary should stay the same.

## Theme System

Move the source HTML's three theme variants into TypeScript and CSS variables:

- `calm`: default blue/slate theme.
- `warm`: warmer slate/brown theme.
- `dark`: dark theme.

Every attendance story should accept a `theme` Storybook control with `calm | warm | dark`, defaulting to `calm`.

## Core Patterns

The following components should be extracted first because they repeat across many artboards:

- `MobileFrame`: fixed mobile artboard shell for 390/402px-wide screens.
- `WebFrame`: fixed 1280px desktop artboard shell.
- `AttendanceCanvas`: grouped gallery wrapper for scanning many screens together.
- `Sidebar`, `TopBar`, `TabBar`, `OwnerTabBar`: navigation patterns.
- `StatusBadge`: status chips for signed, active, waiting, completed, expired, warning, and danger states.
- `MetricCard`: dashboard counters and summary cards.
- `ActionCard`: bordered action rows/cards with optional icon, title, caption, and status.
- `DocumentPreview`: labor contract preview pattern used in employee and owner contract screens.
- `EmptyState`: first-run or no-data states.
- `FormPanel`: repeated form section wrapper for onboarding, store setup, contract creation, and payment flows.

Components should be intentionally lightweight. They only need enough props to support the included screens and avoid obvious duplication.

## Storybook Organization

Expose the rebuilt screens under `Attendance/`:

- `Attendance/00 전체 갤러리`
  - Shows all sections and artboards in one scrollable canvas for broad visual review.
- `Attendance/01 가입·온보딩`
  - Owner signup web, mobile login, role selection, store registration, invite, store management web, store registration step 2, employee join code, password reset.
- `Attendance/02 직원 모바일`
  - Home, punch, schedule, late/absence report, todo, todo create, memo, memo detail, memo create, salary, my contract, contract detail sheet.
- `Attendance/03 사장님 모바일`
  - Owner home, roster/schedule, payroll, payroll publish, stores, attendance, todo, todo create, owner profile.
- `Attendance/04 직원 웹`
  - Home, punch, schedule, shift swap mobile reference, todo, memo, memo detail, salary, contract.
- `Attendance/05 사장님 웹`
  - Dashboard, schedule, schedule-create modal, payroll, staff, staff-add modal, attendance, memo, memo-create modal, leave, stats, taxation, labor contract, labor create, labor preview, payment/subscription, checkout widget.
- `Attendance/06 Empty States`
  - Owner mobile no store, employee mobile no shift, owner web no staff.
- `Attendance/07 제안 기능`
  - Feature proposal summary artboard.

Each story may expose multiple named exports if that keeps individual screens easy to open and test.

## Screen Scope

All 60 source artboards should be represented. The first implementation pass should prioritize faithful layout, typography hierarchy, status colors, spacing, and overall information architecture.

The screens are static design states. They do not need real routing, persistence, authentication, payment execution, file downloads, or API integration.

## Data Flow

Use static sample data in `attendanceSampleData.ts` for:

- stores
- employees
- shifts
- todo items
- memos and comments
- payroll rows
- contracts
- payment plans
- dashboard metrics

Screen components should import data and render it directly. Only use `useState` where visual review benefits from local selection, such as:

- selected contract row
- selected tab or segment
- selected theme in story controls
- selected row inside a table-like view

No global state library is needed.

## Interaction Scope

Implement visual interactions only:

- hover, active, selected, disabled, and focus-visible states
- local selection for list/detail layouts
- modal or bottom-sheet states when the artboard represents that state

Do not implement destructive actions, form submission, payment calls, downloads, uploads, notifications, or server communication.

## Accessibility and Responsiveness

Because these are Storybook design artifacts, artboards may keep fixed dimensions. Within each artboard, layout should remain stable and readable:

- buttons use real `button` elements when clickable
- repeated cards and lists use semantic markup where practical
- icon-only controls include accessible labels
- text should not overlap its containers
- Korean text should render with the existing system font stack, with optional Pretendard-like fallback in CSS

## Error Handling

Runtime error handling should be minimal because the screens use static data. Defensive handling is still useful for reusable patterns:

- empty arrays should render `EmptyState` or a clear no-data row
- optional icons should not break layout when omitted
- long labels and filenames should truncate where the source design expects truncation

## Verification

Before calling the implementation complete:

1. Run `npm run build`.
2. Run `npm run build-storybook` if time permits, or `npm run storybook` plus targeted browser checks.
3. Open representative stories in the browser:
   - full gallery
   - one onboarding screen
   - one employee mobile screen
   - one owner mobile screen
   - one employee web screen
   - one owner web screen
   - empty states
4. Check for blank canvases, missing icons, overlapping text, broken fixed frames, and severe overflow.

## Out of Scope

- API integration
- backend schema or authentication work
- production routing
- real payment processing
- real PDF generation or upload/download behavior
- replacing or refactoring existing `src/components` and `src/componentsJB`

## Open Decisions

No user-facing design decisions remain open. During implementation, naming and file splitting may be adjusted if it improves readability while preserving the scope above.
