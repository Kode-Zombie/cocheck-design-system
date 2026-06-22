# Employee App Support Screens Design

## Goal

Add four employee mobile app screens under the `...` / `나` tab flow in Attendance Storybook:

- `알림 설정`
- `공지사항`
- `1:1 문의`
- `문의 내역 조회`

These screens should make the existing employee mobile profile menu feel complete by giving each support item a dedicated reviewable Storybook state.

## Current Context

- `EmployeeProfileMobile` already renders a `마이페이지` screen with `알림 설정` and `고객지원` entries.
- The employee mobile registry already groups profile-related app screens in `employeeMobileScreens`.
- Feature-specific stories use `getFeatureStoryGroup(feature, platform)` and pull screen IDs from `attendanceFeatureStoryGroups`.
- Existing mobile screens are static Storybook design states. They use `MobileShell`, `PageHeader`, `ActionCard`, `FormPanel`, `StatusBadge`, `Chip`, and fixed sample data rather than real routing or API calls.

## Chosen Approach

Use the approved A direction from 2026-06-22: keep the screens as `직원 프로필` / `앱` sub-screens reached from the existing `나` tab.

This keeps the `...` context clear, keeps the implementation small, and avoids scattering related support screens across `직원 알림`, `직원 메모`, and a new customer support feature group.

## Screen Behavior

### 알림 설정

Create `EmployeeNotificationSettingsMobile`.

The screen should:

- Use `MobileShell` with `activeTab="me"` and a back page header.
- Show notification preference sections for work reminders, schedule changes, payroll, memo/comment updates, and service notices.
- Use toggle-style visual states for enabled and disabled preferences.
- Include a compact receive-channel summary such as app push, night quiet hours, and important notice exceptions.

### 공지사항

Create `EmployeeNoticesMobile`.

The screen should:

- Use `MobileShell` with `activeTab="me"` and a back page header.
- Show a filter row for all notices, unread notices, and important notices.
- Render a list of service or operation notices with pinned/new/read status.
- Include enough notice metadata for reviewers to understand title, category, date, and short body copy.

### 1:1 문의

Create `EmployeeInquiryCreateMobile`.

The screen should:

- Use `MobileShell` with `activeTab="me"` and a back page header.
- Render a static inquiry form with type chips, title, body, optional attachment area, and answer notification preference.
- End with a full-width primary submit button.
- Make clear that the form is a Storybook visual state only, with no real validation or submission.

### 문의 내역 조회

Create `EmployeeInquiryHistoryMobile`.

The screen should:

- Use `MobileShell` with `activeTab="me"` and a back page header.
- Show status filters such as all, waiting, and answered.
- Render inquiry cards with status badges, submitted date, inquiry type, short question text, and latest answer preview.
- Include an answered case and a waiting case so both states are visible.

## Navigation Markers

Update `EmployeeProfileMobile` menu cards so each item points at the matching Storybook screen with the existing marker convention:

```tsx
aria-controls="employee-notification-settings-mobile"
data-target-screen="employee-notification-settings-mobile"
```

Apply the same pattern for:

- `employee-notices-mobile`
- `employee-inquiry-create-mobile`
- `employee-inquiry-history-mobile`

## Registry And Stories

Register the new screens in `employeeMobile.registry.ts`:

- `employee-notification-settings-mobile`
- `employee-notices-mobile`
- `employee-inquiry-create-mobile`
- `employee-inquiry-history-mobile`

Add them to the `직원 프로필` app feature group after `employee-profile-mobile`, so the feature story reads as the `나` tab followed by the four destination screens.

`AttendanceFeatureEmployeeProfileApp.stories.tsx` should expose named exports for all four new screens through the existing `story(screenId)` helper.

## Tests

Update or add focused static render tests to confirm:

- The four new employee mobile profile sub-screens are registered.
- The `직원 프로필` / `앱` feature group includes the profile screen followed by the four new support screens.
- `EmployeeProfileMobile` contains navigation markers to each new screen.
- Each new screen renders its core Korean title and representative content.

## Non-Goals

- No production router implementation.
- No API integration, persistence, validation, file upload, or form submission behavior.
- No web support screens.
- No broad redesign of employee profile, employee notification, or employee memo flows.
- No changes to owner screens.

## Verification

Run the targeted employee profile mobile tests after implementation. Before marking implementation complete, also run the broader relevant unit suite or document why it was skipped. Visually inspect the employee profile app Storybook story after layout changes.
