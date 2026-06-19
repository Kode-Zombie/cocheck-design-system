# Owner Schedule Create Mobile Design

## Goal

Add a mobile schedule creation screen to the Attendance Storybook owner schedule flow, and make the existing owner mobile schedule entry points clearly point to it.

The current owner mobile schedule group includes roster, schedule management, and schedule edit screens, but it has no `owner-schedule-create-mobile` screen. As a result, the `편성` and `일정 추가` actions imply creation without an explicit target screen.

## Current Context

- `owner-roster-mobile` renders the weekly roster view and has a header action labeled `편성`.
- `owner-schedule-management-mobile` renders today's schedule/checklist management and has a header action labeled `일정 추가`.
- `owner-schedule-edit-mobile` exists as `F1 · 일정 수정 (모바일)`.
- `owner-schedule-create-web` exists as `F3 · 일정 추가 (웹 모달)`, but it is not the right destination for the mobile owner flow.
- Existing Storybook screen relationships use `data-target-screen` and `aria-controls` for intended navigation targets, as seen in the owner notification launcher.

## Chosen Approach

Create a dedicated `owner-schedule-create-mobile` screen and wire the mobile schedule entry points to it.

This keeps the app flow platform-consistent: mobile roster and schedule management actions lead to a mobile creation form, while the web schedule flow keeps using the web modal.

## Screen Behavior

The new `OwnerScheduleCreateMobile` screen should:

- Use `MobileShell` with the schedule context.
- Use a back affordance in `PageHeader`.
- Use the title `일정 추가`.
- Use a primary header action such as `일정 저장`.
- Show a schedule form similar to `OwnerScheduleEditMobile`, but with creation-oriented sample values.
- Include schedule-owned checklist items under `일정별 할 일`, matching the existing product direction that todos belong to schedules.
- Include an action to add another checklist item.

The screen is a static Storybook design state. It does not need real routing, form submission, validation, persistence, or API calls.

## Navigation Markers

The following buttons should point to `owner-schedule-create-mobile`:

- `owner-roster-mobile` header action labeled `편성`.
- `owner-schedule-management-mobile` header action labeled `일정 추가`.
- `owner-home-mobile` quick action labeled `일정 추가`.

Use the existing convention:

```tsx
aria-controls="owner-schedule-create-mobile"
data-target-screen="owner-schedule-create-mobile"
```

## Registry And Stories

Register the new screen in `ownerMobile.registry.ts`:

- id: `owner-schedule-create-mobile`
- label: `F3 · 일정 추가 (모바일)`
- group: `경영주 모바일`
- viewport: `mobile`
- width/height consistent with the owner mobile schedule screens

Expose it in `AttendanceFeatureOwnerScheduleApp.stories.tsx` so reviewers can open it from the feature-specific owner schedule app story.

Include it in the `경영주 일정관리` app feature group after `owner-roster-mobile` and before management/edit screens, so the flow reads as roster -> create -> manage -> edit.

## Tests

Add or update focused tests to confirm:

- `owner-schedule-create-mobile` is registered with the expected label.
- The create screen renders schedule creation copy, schedule form fields, and checklist copy.
- `owner-roster-mobile` points its creation action at `owner-schedule-create-mobile`.
- `owner-schedule-management-mobile` points its creation action at `owner-schedule-create-mobile`.
- Existing edit screen expectations continue to pass.

## Non-Goals

- No production router changes.
- No API integration.
- No web modal changes.
- No full responsive redesign of the owner roster grid.
- No broad refactor of owner mobile screen structure.

## Verification

Run targeted tests for owner schedule mobile screens. Before marking implementation complete, also run the broader unit suite or document why it was skipped. Visually inspect the owner schedule app stories in Storybook when changing layout styles.
