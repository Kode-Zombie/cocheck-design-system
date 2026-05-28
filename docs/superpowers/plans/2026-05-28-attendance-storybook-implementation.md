# Attendance Storybook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the attached attendance-management HTML design as a complete Storybook screen and pattern library with all 60 source artboards represented.

**Architecture:** Add an isolated `src/componentsAttendance` package with theme tokens, reusable frame/navigation/card patterns, static sample data, grouped screen modules, and Storybook stories. Preserve the existing `src/components` and `src/componentsJB` folders. Use fixed artboard dimensions for visual review and static data for all screen states.

**Tech Stack:** React 19, TypeScript, Vite, Storybook 10, plain CSS, lucide-react icons.

---

## Source Reference

- Design spec: `docs/superpowers/specs/2026-05-28-attendance-storybook-design.md`
- Source HTML: `/Users/youngjinshin/Downloads/_ Design (1).html`
- Storybook config: `.storybook/main.ts`, `.storybook/preview.ts`
- Existing global styles: `src/index.css`, `src/components/components.css`, `src/componentsJB/componentsJB.css`

## File Map

Create these files:

- `src/componentsAttendance/attendance-theme.ts`: theme definitions and CSS variable helper.
- `src/componentsAttendance/attendance.css`: all attendance-specific layout and component styles.
- `src/componentsAttendance/components/ActionCard.tsx`: icon/title/caption action row/card.
- `src/componentsAttendance/components/AttendanceCanvas.tsx`: sectioned gallery canvas and artboard wrappers.
- `src/componentsAttendance/components/DocumentPreview.tsx`: contract/document preview used by employee and owner contract screens.
- `src/componentsAttendance/components/EmptyState.tsx`: no-data state pattern.
- `src/componentsAttendance/components/FormPanel.tsx`: repeated form panel pattern.
- `src/componentsAttendance/components/Frame.tsx`: `MobileFrame` and `WebFrame`.
- `src/componentsAttendance/components/MetricCard.tsx`: summary metric cards.
- `src/componentsAttendance/components/Navigation.tsx`: sidebars, top bars, and mobile tab bars.
- `src/componentsAttendance/components/StatusBadge.tsx`: status chip pattern.
- `src/componentsAttendance/data/attendanceSampleData.ts`: stores, staff, shifts, tasks, memos, payroll, contracts, plans, metrics.
- `src/componentsAttendance/screens/screenTypes.ts`: shared screen and story types.
- `src/componentsAttendance/screens/onboarding.tsx`: 9 onboarding/store-entry screens.
- `src/componentsAttendance/screens/employeeMobile.tsx`: 12 employee mobile screens.
- `src/componentsAttendance/screens/ownerMobile.tsx`: 9 owner mobile screens.
- `src/componentsAttendance/screens/employeeWeb.tsx`: 9 employee web screens.
- `src/componentsAttendance/screens/ownerWeb.tsx`: 17 owner web screens.
- `src/componentsAttendance/screens/emptyStates.tsx`: 3 empty-state screens.
- `src/componentsAttendance/screens/proposals.tsx`: 1 feature proposal screen.
- `src/componentsAttendance/screens/allScreens.ts`: exports grouped screen arrays.
- `src/componentsAttendance/index.ts`: public exports.
- `src/componentsAttendance/AttendanceGallery.stories.tsx`: all artboards in one gallery.
- `src/componentsAttendance/AttendanceOnboarding.stories.tsx`: onboarding screens.
- `src/componentsAttendance/AttendanceEmployeeMobile.stories.tsx`: employee mobile screens.
- `src/componentsAttendance/AttendanceOwnerMobile.stories.tsx`: owner mobile screens.
- `src/componentsAttendance/AttendanceEmployeeWeb.stories.tsx`: employee web screens.
- `src/componentsAttendance/AttendanceOwnerWeb.stories.tsx`: owner web screens.
- `src/componentsAttendance/AttendanceEmptyStates.stories.tsx`: empty states.
- `src/componentsAttendance/AttendanceProposals.stories.tsx`: feature proposal.

Modify these files only if needed:

- `.storybook/preview.ts`: import `../src/componentsAttendance/attendance.css` only if component-local imports do not cover all stories.

Do not modify:

- `src/components/**`
- `src/componentsJB/**`
- existing stories outside `src/componentsAttendance`

## Screen Registry

All source artboards must appear in the registry below.

Onboarding and store entry:

1. `owner-signup-web`: `01 · 사장님 회원가입 (웹)`, 1280x800
2. `login-mobile`: `02 · 로그인 (모바일)`, 402x874
3. `role-select-mobile`: `03 · 역할 선택`, 402x874
4. `store-register-mobile`: `04 · 매장 등록`, 402x874
5. `staff-invite-mobile`: `05 · 직원 초대`, 402x874
6. `store-manage-web`: `06 · 매장 관리 (웹)`, 1280x800
7. `store-register-step2-mobile`: `04-B · 매장 등록 2/3 (영업시간·인증)`, 402x874
8. `staff-join-mobile`: `07 · 직원 - 매장 코드 입력`, 402x874
9. `password-reset-mobile`: `08 · 비밀번호 찾기 (인증 단계)`, 402x874

Employee mobile:

1. `employee-home-mobile`: `01 · 홈`, 402x874
2. `employee-punch-mobile`: `02 · 출퇴근`, 402x874
3. `employee-schedule-mobile`: `03 · 스케줄`, 402x874
4. `employee-late-mobile`: `M4 · 지각·결근 보고 (직원)`, 390x844
5. `employee-todo-mobile`: `04 · 할 일`, 402x874
6. `employee-todo-create-mobile`: `M5b · 내 할일 추가 (직원)`, 390x844
7. `employee-memo-mobile`: `05 · 메모·인수인계`, 402x874
8. `employee-memo-detail-mobile`: `M6b · 메모 상세·댓글 (직원)`, 390x844
9. `employee-memo-create-mobile`: `F2 · 메모·게시글 작성 (모바일)`, 402x874
10. `employee-salary-mobile`: `06 · 월급 계산`, 402x874
11. `employee-contract-mobile`: `M9 · 내 근로계약서 (직원)`, 390x844
12. `employee-contract-detail-mobile`: `M9b · 계약서 상세 바텀시트`, 390x844

Owner mobile:

1. `owner-home-mobile`: `01 · 사장님 홈`, 402x874
2. `owner-roster-mobile`: `02 · 스케줄 편성`, 402x874
3. `owner-payroll-mobile`: `03 · 급여 관리`, 402x874
4. `owner-payroll-publish-mobile`: `OM3b · 급여 발행`, 390x844
5. `owner-stores-mobile`: `04 · 매장 관리`, 402x874
6. `owner-attendance-mobile`: `05 · 출퇴근 현황`, 402x874
7. `owner-todo-mobile`: `06 · 할 일 관리`, 402x874
8. `owner-todo-create-mobile`: `F1 · 할 일 추가 (모바일)`, 402x874
9. `owner-me-mobile`: `OM7 · 나 탭 (사장 마이페이지)`, 390x844

Employee web:

1. `employee-home-web`: `00 · 홈`, 1280x800
2. `employee-punch-web`: `01 · 출퇴근`, 1280x800
3. `employee-schedule-web`: `05 · 스케줄`, 1280x800
4. `employee-shift-swap-mobile`: `06 · 스케줄 교환 신청 (모바일)`, 402x874
5. `employee-todo-web`: `02 · 할 일`, 1280x800
6. `employee-memo-web`: `03 · 메모·인수인계`, 1280x800
7. `employee-memo-detail-web`: `EW5b · 메모 상세·댓글 (직원웹)`, 1280x800
8. `employee-salary-web`: `04 · 내 급여`, 1280x800
9. `employee-contract-web`: `EW8 · 내 근로계약서 (직원웹)`, 1280x800

Owner web:

1. `owner-dashboard-web`: `01 · 대시보드`, 1280x800
2. `owner-schedule-web`: `02 · 스케줄 편성`, 1280x800
3. `owner-schedule-create-web`: `F3 · 새 근무 추가 (웹 모달)`, 1280x800
4. `owner-payroll-web`: `03 · 급여 관리`, 1280x800
5. `owner-staff-web`: `04 · 직원 관리`, 1280x800
6. `owner-staff-add-web`: `F4 · 직원 추가 (웹 모달)`, 1280x800
7. `owner-attendance-web`: `05 · 근태 현황`, 1280x800
8. `owner-memo-web`: `06 · 메모·인수인계`, 1280x800
9. `owner-memo-create-web`: `F5 · 메모·공지 작성 (웹 모달)`, 1280x800
10. `owner-leave-web`: `07 · 휴가·연차 관리`, 1280x800
11. `owner-stats-web`: `08 · 통계 리포트`, 1280x800
12. `owner-taxation-web`: `D9 · 세무사 연결`, 1280x800
13. `owner-labor-web`: `D10 · 근로계약서`, 1280x800
14. `owner-labor-create-web`: `D10b · 근로계약서 작성 폼`, 1280x800
15. `owner-labor-preview-web`: `D10c · 계약서 미리보기·다운로드·업로드`, 1280x800
16. `owner-payment-web`: `D11 · 결제·구독 관리`, 1280x800
17. `owner-payment-checkout-web`: `D11b · 결제 위젯 (토스페이먼츠)`, 1280x800

Empty states and proposals:

1. `empty-owner-mobile`: `E1 · 사장님 홈 (매장 없음)`, 402x874
2. `empty-employee-mobile`: `E2 · 직원 홈 (근무 없음)`, 402x874
3. `empty-owner-web`: `E3 · 사장님 웹 대시보드 (직원 없음)`, 1280x800
4. `proposal-summary`: `기능 제안 요약`, 720x600

## Task 1: Source Inventory Helper

**Files:**

- Create: `scripts/attendance-source-inventory.mjs`
- No production files modified.

- [ ] **Step 1: Create the inventory script**

Use `apply_patch` to create `scripts/attendance-source-inventory.mjs`:

```js
import { readFileSync } from 'node:fs';

const htmlPath = '/Users/youngjinshin/Downloads/_ Design (1).html';
const html = readFileSync(htmlPath, 'utf8');
const templateMatch = html.match(
  /<script type="__bundler\/template">([\s\S]*?)<\/script>/,
);

if (!templateMatch) {
  throw new Error(`Could not find bundled template in ${htmlPath}`);
}

const template = JSON.parse(templateMatch[1]);
const appStart = template.indexOf('function App');

if (appStart === -1) {
  throw new Error('Could not find function App in bundled template');
}

const appEnd = template.indexOf('function ProposalCard');
const appSource = template.slice(appStart, appEnd === -1 ? undefined : appEnd);
const artboards = [...appSource.matchAll(/<DCArtboard\s+([^>]*)>/g)].map(
  ([, attrs]) => {
    const label = attrs.match(/label="([^"]+)"/)?.[1] ?? 'unlabelled';
    const width = Number(attrs.match(/width=\{?(\d+)/)?.[1] ?? 0);
    const height = Number(attrs.match(/height=\{?(\d+)/)?.[1] ?? 0);

    return { label, width, height };
  },
);

console.log(JSON.stringify({ count: artboards.length, artboards }, null, 2));
```

- [ ] **Step 2: Run the inventory script**

Run:

```bash
node scripts/attendance-source-inventory.mjs
```

Expected:

- JSON output with `"count": 60`.
- The labels match the Screen Registry section above.

- [ ] **Step 3: Commit the helper**

Run:

```bash
git add scripts/attendance-source-inventory.mjs
git commit -m "chore: add attendance source inventory helper"
```

## Task 2: Theme, CSS, and Base Types

**Files:**

- Create: `src/componentsAttendance/attendance-theme.ts`
- Create: `src/componentsAttendance/attendance.css`
- Create: `src/componentsAttendance/screens/screenTypes.ts`
- Create: `src/componentsAttendance/index.ts`

- [ ] **Step 1: Create theme definitions**

Create `src/componentsAttendance/attendance-theme.ts`:

```ts
import type { CSSProperties } from 'react';

export type AttendanceThemeName = 'calm' | 'warm' | 'dark';

export type AttendanceTheme = {
  name: string;
  bg: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  primaryHover: string;
  primarySoft: string;
  primaryText: string;
  success: string;
  successSoft: string;
  warn: string;
  warnSoft: string;
  danger: string;
  dangerSoft: string;
};

export const attendanceThemes: Record<AttendanceThemeName, AttendanceTheme> = {
  calm: {
    name: '차분한 블루',
    bg: '#FAFAF9',
    surface: '#FFFFFF',
    surfaceMuted: '#F5F5F4',
    border: '#E7E5E4',
    borderStrong: '#D6D3D1',
    text: '#1C1917',
    textMuted: '#57534E',
    textSubtle: '#A8A29E',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primarySoft: '#EFF6FF',
    primaryText: '#FFFFFF',
    success: '#059669',
    successSoft: '#ECFDF5',
    warn: '#D97706',
    warnSoft: '#FFFBEB',
    danger: '#DC2626',
    dangerSoft: '#FEF2F2',
  },
  warm: {
    name: '따뜻한 슬레이트',
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceMuted: '#F4EFE7',
    border: '#E8DFCF',
    borderStrong: '#D4C7B0',
    text: '#2A2520',
    textMuted: '#6B5F50',
    textSubtle: '#A99E8C',
    primary: '#7C5E3C',
    primaryHover: '#614826',
    primarySoft: '#F4EBDE',
    primaryText: '#FFFFFF',
    success: '#3E7C3A',
    successSoft: '#EDF6EC',
    warn: '#B45309',
    warnSoft: '#FEF6E7',
    danger: '#B91C1C',
    dangerSoft: '#FBEAEA',
  },
  dark: {
    name: '다크 모드',
    bg: '#0A0A0A',
    surface: '#161615',
    surfaceMuted: '#1F1F1E',
    border: '#2A2A28',
    borderStrong: '#3A3A38',
    text: '#F5F5F4',
    textMuted: '#A8A29E',
    textSubtle: '#78716C',
    primary: '#3B82F6',
    primaryHover: '#60A5FA',
    primarySoft: '#1E293B',
    primaryText: '#FFFFFF',
    success: '#10B981',
    successSoft: '#0F2A1F',
    warn: '#F59E0B',
    warnSoft: '#2A1F0A',
    danger: '#EF4444',
    dangerSoft: '#2A1414',
  },
};

export const getAttendanceThemeStyle = (
  themeName: AttendanceThemeName = 'calm',
): CSSProperties => {
  const theme = attendanceThemes[themeName];

  return {
    '--att-bg': theme.bg,
    '--att-surface': theme.surface,
    '--att-surface-muted': theme.surfaceMuted,
    '--att-border': theme.border,
    '--att-border-strong': theme.borderStrong,
    '--att-text': theme.text,
    '--att-text-muted': theme.textMuted,
    '--att-text-subtle': theme.textSubtle,
    '--att-primary': theme.primary,
    '--att-primary-hover': theme.primaryHover,
    '--att-primary-soft': theme.primarySoft,
    '--att-primary-text': theme.primaryText,
    '--att-success': theme.success,
    '--att-success-soft': theme.successSoft,
    '--att-warn': theme.warn,
    '--att-warn-soft': theme.warnSoft,
    '--att-danger': theme.danger,
    '--att-danger-soft': theme.dangerSoft,
  } as CSSProperties;
};
```

- [ ] **Step 2: Create base CSS**

Create `src/componentsAttendance/attendance.css` with these base rules before component-specific rules added in later tasks:

```css
.att-root {
  min-height: 100%;
  color: var(--att-text);
  background: var(--att-bg);
  font-family:
    Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Noto Sans KR", "Segoe UI", sans-serif;
  letter-spacing: 0;
}

.att-root *,
.att-root *::before,
.att-root *::after {
  box-sizing: border-box;
}

.att-root button,
.att-root input,
.att-root select,
.att-root textarea {
  font: inherit;
  letter-spacing: 0;
}

.att-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--att-primary-text);
  background: var(--att-primary);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.att-button:hover {
  background: var(--att-primary-hover);
}

.att-button--secondary {
  color: var(--att-text);
  background: var(--att-surface-muted);
  border-color: var(--att-border);
}

.att-button--ghost {
  color: var(--att-text-muted);
  background: transparent;
  border-color: var(--att-border);
}

.att-section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.25;
}

.att-subtitle {
  margin: 4px 0 0;
  color: var(--att-text-muted);
  font-size: 13px;
  line-height: 1.45;
}
```

- [ ] **Step 3: Create screen types**

Create `src/componentsAttendance/screens/screenTypes.ts`:

```ts
import type { ComponentType } from 'react';
import type { AttendanceThemeName } from '../attendance-theme';

export type AttendanceViewport = 'mobile' | 'web' | 'custom';

export type AttendanceScreenProps = {
  theme?: AttendanceThemeName;
};

export type AttendanceScreen = {
  id: string;
  label: string;
  group: string;
  width: number;
  height: number;
  viewport: AttendanceViewport;
  Component: ComponentType<AttendanceScreenProps>;
};
```

- [ ] **Step 4: Create initial exports**

Create `src/componentsAttendance/index.ts`:

```ts
export {
  attendanceThemes,
  getAttendanceThemeStyle,
  type AttendanceThemeName,
} from './attendance-theme';
export type {
  AttendanceScreen,
  AttendanceScreenProps,
  AttendanceViewport,
} from './screens/screenTypes';
```

- [ ] **Step 5: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 6: Commit base layer**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance theme foundation"
```

## Task 3: Reusable Pattern Components

**Files:**

- Create component files listed in the File Map under `src/componentsAttendance/components/`.
- Modify: `src/componentsAttendance/attendance.css`
- Modify: `src/componentsAttendance/index.ts`

- [ ] **Step 1: Create frames**

Create `src/componentsAttendance/components/Frame.tsx`:

```tsx
import type { ReactNode } from 'react';
import { getAttendanceThemeStyle, type AttendanceThemeName } from '../attendance-theme';
import '../attendance.css';

type FrameProps = {
  children: ReactNode;
  theme?: AttendanceThemeName;
  width?: number;
  height?: number;
  title?: string;
};

export function MobileFrame({
  children,
  theme = 'calm',
  width = 402,
  height = 874,
  title,
}: FrameProps) {
  return (
    <section
      aria-label={title}
      className="att-root att-mobile-frame"
      style={{ ...getAttendanceThemeStyle(theme), width, height }}
    >
      {children}
    </section>
  );
}

export function WebFrame({
  children,
  theme = 'calm',
  width = 1280,
  height = 800,
  title,
}: FrameProps) {
  return (
    <section
      aria-label={title}
      className="att-root att-web-frame"
      style={{ ...getAttendanceThemeStyle(theme), width, height }}
    >
      {children}
    </section>
  );
}
```

Add CSS:

```css
.att-mobile-frame,
.att-web-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--att-border);
  background: var(--att-bg);
}

.att-mobile-frame {
  display: flex;
  flex-direction: column;
  border-radius: 28px;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.16);
}

.att-web-frame {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.12);
}
```

- [ ] **Step 2: Create badges and cards**

Create `StatusBadge.tsx`, `MetricCard.tsx`, `ActionCard.tsx`, `EmptyState.tsx`, and `FormPanel.tsx` with this shared shape:

```tsx
import type { ReactNode } from 'react';

export type StatusTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export function StatusBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return <span className={`att-status-badge att-status-badge--${tone}`}>{children}</span>;
}
```

```tsx
import type { ReactNode } from 'react';

export function MetricCard({
  label,
  value,
  caption,
  icon,
}: {
  label: string;
  value: string;
  caption?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="att-metric-card">
      <div className="att-metric-card__top">
        <span>{label}</span>
        {icon ? <span className="att-metric-card__icon">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      {caption ? <p>{caption}</p> : null}
    </div>
  );
}
```

```tsx
import type { ReactNode } from 'react';

export function ActionCard({
  title,
  caption,
  meta,
  icon,
  right,
}: {
  title: string;
  caption?: string;
  meta?: string;
  icon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="att-action-card">
      {icon ? <div className="att-action-card__icon">{icon}</div> : null}
      <div className="att-action-card__body">
        <strong>{title}</strong>
        {caption ? <span>{caption}</span> : null}
        {meta ? <small>{meta}</small> : null}
      </div>
      {right ? <div className="att-action-card__right">{right}</div> : null}
    </div>
  );
}
```

Add CSS for badge/card states:

```css
.att-status-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.att-status-badge--neutral {
  color: var(--att-text-muted);
  background: var(--att-surface-muted);
}

.att-status-badge--primary {
  color: var(--att-primary);
  background: var(--att-primary-soft);
}

.att-status-badge--success {
  color: var(--att-success);
  background: var(--att-success-soft);
}

.att-status-badge--warning {
  color: var(--att-warn);
  background: var(--att-warn-soft);
}

.att-status-badge--danger {
  color: var(--att-danger);
  background: var(--att-danger-soft);
}

.att-metric-card,
.att-action-card,
.att-form-panel,
.att-empty-state {
  border: 1px solid var(--att-border);
  border-radius: 8px;
  background: var(--att-surface);
}

.att-metric-card {
  padding: 16px;
}

.att-metric-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--att-text-muted);
  font-size: 12px;
  font-weight: 700;
}

.att-metric-card strong {
  display: block;
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.1;
}

.att-metric-card p {
  margin: 6px 0 0;
  color: var(--att-text-subtle);
  font-size: 12px;
}

.att-action-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
}

.att-action-card__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--att-primary);
  background: var(--att-primary-soft);
  flex: 0 0 auto;
}

.att-action-card__body {
  display: grid;
  min-width: 0;
  gap: 2px;
  flex: 1;
}

.att-action-card__body strong,
.att-action-card__body span,
.att-action-card__body small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.att-action-card__body strong {
  font-size: 13px;
}

.att-action-card__body span,
.att-action-card__body small {
  color: var(--att-text-muted);
  font-size: 12px;
}

.att-empty-state,
.att-form-panel {
  padding: 20px;
}
```

- [ ] **Step 3: Create navigation and document preview**

Create `Navigation.tsx` with `TopBar`, `MobileTabBar`, `OwnerTabBar`, `Sidebar`, and `WebAppShell`. Use `button` for tabs and `aria-current="page"` for the active item.

Create `DocumentPreview.tsx` with this public shape:

```tsx
export type DocumentPreviewItem = {
  title: string;
  content: string;
};

export function DocumentPreview({
  title = '근 로 계 약 서',
  subtitle,
  items,
  signedDate,
}: {
  title?: string;
  subtitle?: string;
  items: DocumentPreviewItem[];
  signedDate?: string;
}) {
  return (
    <article className="att-document-preview">
      <header>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div className="att-document-preview__body">
        {items.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </section>
        ))}
      </div>
      {signedDate ? <footer>{signedDate} 체결</footer> : null}
    </article>
  );
}
```

- [ ] **Step 4: Create gallery canvas**

Create `AttendanceCanvas.tsx`:

```tsx
import type { ReactNode } from 'react';
import type { AttendanceScreen } from '../screens/screenTypes';

export function AttendanceCanvas({ children }: { children: ReactNode }) {
  return <div className="att-gallery">{children}</div>;
}

export function AttendanceSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="att-gallery-section">
      <div className="att-gallery-section__header">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="att-gallery-section__grid">{children}</div>
    </section>
  );
}

export function AttendanceArtboard({
  screen,
  children,
}: {
  screen: Pick<AttendanceScreen, 'label' | 'width' | 'height'>;
  children: ReactNode;
}) {
  return (
    <figure className="att-artboard" style={{ width: screen.width }}>
      <figcaption>{screen.label}</figcaption>
      {children}
    </figure>
  );
}
```

- [ ] **Step 5: Export components**

Update `src/componentsAttendance/index.ts`:

```ts
export { ActionCard } from './components/ActionCard';
export { AttendanceArtboard, AttendanceCanvas, AttendanceSection } from './components/AttendanceCanvas';
export { DocumentPreview, type DocumentPreviewItem } from './components/DocumentPreview';
export { EmptyState } from './components/EmptyState';
export { FormPanel } from './components/FormPanel';
export { MobileFrame, WebFrame } from './components/Frame';
export { MetricCard } from './components/MetricCard';
export { MobileTabBar, OwnerTabBar, Sidebar, TopBar, WebAppShell } from './components/Navigation';
export { StatusBadge, type StatusTone } from './components/StatusBadge';
export {
  attendanceThemes,
  getAttendanceThemeStyle,
  type AttendanceThemeName,
} from './attendance-theme';
export type {
  AttendanceScreen,
  AttendanceScreenProps,
  AttendanceViewport,
} from './screens/screenTypes';
```

- [ ] **Step 6: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 7: Commit patterns**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance design patterns"
```

## Task 4: Static Data and Screen Registry

**Files:**

- Create: `src/componentsAttendance/data/attendanceSampleData.ts`
- Create: `src/componentsAttendance/screens/allScreens.ts`
- Modify: `src/componentsAttendance/index.ts`

- [ ] **Step 1: Add static data**

Create `attendanceSampleData.ts` with named exports:

```ts
export const attendanceStores = [
  { id: 'store-gs25', name: 'GS25 강남역점', address: '서울시 강남구 강남대로 123' },
  { id: 'store-cafe', name: '스타벅스 선릉', address: '서울시 강남구 테헤란로 456' },
  { id: 'store-bakery', name: '성수 베이커리', address: '서울시 성동구 연무장길 7' },
] as const;

export const attendanceEmployees = [
  { id: 'emp-jiwoo', name: '최지우', role: '오픈', phone: '010-1234-5678', status: '출근중' },
  { id: 'emp-mina', name: '박민아', role: '마감', phone: '010-9876-5432', status: '대기' },
  { id: 'emp-jun', name: '이준호', role: '주말', phone: '010-2222-3333', status: '휴무' },
] as const;

export const attendanceShifts = [
  { id: 'shift-1', employee: '최지우', store: 'GS25 강남역점', day: '월', time: '09:00-18:00', status: '확정' },
  { id: 'shift-2', employee: '박민아', store: 'GS25 강남역점', day: '수', time: '14:00-22:00', status: '교환요청' },
  { id: 'shift-3', employee: '이준호', store: '스타벅스 선릉', day: '토', time: '10:00-19:00', status: '확정' },
] as const;

export const attendanceTodos = [
  { id: 'todo-1', title: '냉장고 온도 확인', owner: '최지우', due: '오늘 11:00', done: false },
  { id: 'todo-2', title: '폐기 상품 체크', owner: '박민아', due: '오늘 18:00', done: true },
  { id: 'todo-3', title: '행사 매대 정리', owner: '전체', due: '내일', done: false },
] as const;

export const attendanceMemos = [
  { id: 'memo-1', title: '아침 입고 지연', author: '김성호', time: '09:12', comments: 3 },
  { id: 'memo-2', title: 'POS 영수증 용지 보충', author: '최지우', time: '13:40', comments: 1 },
  { id: 'memo-3', title: '주말 행사 안내', author: '박민아', time: '어제', comments: 5 },
] as const;

export const attendancePayrollRows = [
  { id: 'pay-1', employee: '최지우', hours: '142h', wage: '10,030원', amount: '1,424,260원', status: '확정' },
  { id: 'pay-2', employee: '박민아', hours: '96h', wage: '10,030원', amount: '962,880원', status: '검토' },
  { id: 'pay-3', employee: '이준호', hours: '64h', wage: '10,030원', amount: '641,920원', status: '확정' },
] as const;

export const attendanceContracts = [
  {
    id: 'contract-1',
    store: 'GS25 강남역점',
    period: '2026.01.01 - 2026.12.31',
    wage: '10,030원/h',
    status: '서명완료',
    signed: '2026.01.01',
    file: '계약서_GS25강남역점_2026.pdf',
  },
  {
    id: 'contract-2',
    store: '스타벅스 선릉',
    period: '2025.07.01 - 2025.12.31',
    wage: '9,860원/h',
    status: '만료',
    signed: '2025.07.01',
    file: '계약서_스타벅스선릉_2025.pdf',
  },
] as const;

export const attendanceDashboardMetrics = [
  { label: '오늘 출근', value: '12명', caption: '지각 1명' },
  { label: '이번 주 근무', value: '286h', caption: '전주 대비 +12h' },
  { label: '급여 예상', value: '5,842,000원', caption: '3개 매장 합산' },
  { label: '대기 요청', value: '4건', caption: '교환 2 · 휴가 2' },
] as const;

export const attendancePlans = [
  { id: 'basic', name: 'Basic', price: '19,000원', stores: '1개 매장', staff: '직원 10명' },
  { id: 'pro', name: 'Pro', price: '39,000원', stores: '3개 매장', staff: '직원 50명' },
  { id: 'team', name: 'Team', price: '79,000원', stores: '무제한', staff: '무제한' },
] as const;
```

- [ ] **Step 2: Create screen registry shell**

Create `allScreens.ts` after screen modules exist in later tasks. Until then, export empty arrays with the final names:

```ts
import type { AttendanceScreen } from './screenTypes';

export const onboardingScreens: AttendanceScreen[] = [];
export const employeeMobileScreens: AttendanceScreen[] = [];
export const ownerMobileScreens: AttendanceScreen[] = [];
export const employeeWebScreens: AttendanceScreen[] = [];
export const ownerWebScreens: AttendanceScreen[] = [];
export const emptyStateScreens: AttendanceScreen[] = [];
export const proposalScreens: AttendanceScreen[] = [];

export const attendanceScreenGroups = [
  { title: '가입 · 로그인 · 매장 등록', screens: onboardingScreens },
  { title: '직원용 · 모바일 앱', screens: employeeMobileScreens },
  { title: '사장님용 · 모바일 앱', screens: ownerMobileScreens },
  { title: '직원용 · 웹 버전', screens: employeeWebScreens },
  { title: '사장님용 · 웹 대시보드', screens: ownerWebScreens },
  { title: '첫 가입 · Empty States', screens: emptyStateScreens },
  { title: '제안한 추가 기능', screens: proposalScreens },
];
```

- [ ] **Step 3: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Commit data layer**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance sample data"
```

## Task 5: Onboarding Screens

**Files:**

- Create: `src/componentsAttendance/screens/onboarding.tsx`
- Modify: `src/componentsAttendance/screens/allScreens.ts`

- [ ] **Step 1: Implement 9 onboarding components**

Create components with these exact export names:

```tsx
export function OwnerSignupWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function LoginMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function RoleSelectMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function StoreRegisterMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function StaffInviteMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function StoreManageWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function StoreRegisterStep2Mobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function StaffJoinMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function PasswordResetMobile({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use `MobileFrame` for 402x874 screens and `WebFrame` for 1280x800 screens. Use `FormPanel`, `ActionCard`, `StatusBadge`, `TopBar`, and lucide icons.

Each screen must render:

- a visible page title matching the source artboard intent
- real sample content from `attendanceSampleData.ts`
- primary and secondary action buttons where the source has them
- no API or submit behavior

- [ ] **Step 2: Export onboarding registry**

At the bottom of `onboarding.tsx`, export:

```tsx
export const onboardingScreens: AttendanceScreen[] = [
  { id: 'owner-signup-web', label: '01 · 사장님 회원가입 (웹)', group: '가입 · 온보딩', width: 1280, height: 800, viewport: 'web', Component: OwnerSignupWeb },
  { id: 'login-mobile', label: '02 · 로그인 (모바일)', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: LoginMobile },
  { id: 'role-select-mobile', label: '03 · 역할 선택', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: RoleSelectMobile },
  { id: 'store-register-mobile', label: '04 · 매장 등록', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StoreRegisterMobile },
  { id: 'staff-invite-mobile', label: '05 · 직원 초대', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StaffInviteMobile },
  { id: 'store-manage-web', label: '06 · 매장 관리 (웹)', group: '가입 · 온보딩', width: 1280, height: 800, viewport: 'web', Component: StoreManageWeb },
  { id: 'store-register-step2-mobile', label: '04-B · 매장 등록 2/3 (영업시간·인증)', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StoreRegisterStep2Mobile },
  { id: 'staff-join-mobile', label: '07 · 직원 - 매장 코드 입력', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StaffJoinMobile },
  { id: 'password-reset-mobile', label: '08 · 비밀번호 찾기 (인증 단계)', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: PasswordResetMobile },
];
```

- [ ] **Step 3: Wire registry**

Update `allScreens.ts` to import `onboardingScreens` from `./onboarding` and remove the empty onboarding export.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 5: Commit onboarding screens**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance onboarding screens"
```

## Task 6: Employee Mobile Screens

**Files:**

- Create: `src/componentsAttendance/screens/employeeMobile.tsx`
- Modify: `src/componentsAttendance/screens/allScreens.ts`

- [ ] **Step 1: Implement 12 employee mobile components**

Create these exports:

```tsx
export function EmployeeHomeMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeePunchMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeScheduleMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeLateMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeTodoMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeTodoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeMemoMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeMemoDetailMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeMemoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeSalaryMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeContractMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeContractDetailMobile({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use `MobileFrame`, `MobileTabBar`, `MetricCard`, `ActionCard`, `StatusBadge`, `DocumentPreview`, and static data. Use 390x844 for `EmployeeLateMobile`, `EmployeeTodoCreateMobile`, `EmployeeMemoDetailMobile`, `EmployeeContractMobile`, and `EmployeeContractDetailMobile`; use 402x874 for the rest.

- [ ] **Step 2: Export employee mobile registry**

Export `employeeMobileScreens` with the 12 IDs and labels from the Screen Registry.

- [ ] **Step 3: Wire registry**

Update `allScreens.ts` to import `employeeMobileScreens` from `./employeeMobile`.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 5: Commit employee mobile screens**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance employee mobile screens"
```

## Task 7: Owner Mobile Screens

**Files:**

- Create: `src/componentsAttendance/screens/ownerMobile.tsx`
- Modify: `src/componentsAttendance/screens/allScreens.ts`

- [ ] **Step 1: Implement 9 owner mobile components**

Create these exports:

```tsx
export function OwnerHomeMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerRosterMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerPayrollMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerPayrollPublishMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerStoresMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerAttendanceMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerTodoMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerTodoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerMeMobile({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use `MobileFrame`, `OwnerTabBar`, `MetricCard`, `ActionCard`, `StatusBadge`, and static data. Use 390x844 for payroll publish and owner profile; use 402x874 for the rest.

- [ ] **Step 2: Export owner mobile registry**

Export `ownerMobileScreens` with the 9 IDs and labels from the Screen Registry.

- [ ] **Step 3: Wire registry**

Update `allScreens.ts` to import `ownerMobileScreens` from `./ownerMobile`.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 5: Commit owner mobile screens**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance owner mobile screens"
```

## Task 8: Employee Web Screens

**Files:**

- Create: `src/componentsAttendance/screens/employeeWeb.tsx`
- Modify: `src/componentsAttendance/screens/allScreens.ts`

- [ ] **Step 1: Implement 9 employee web components**

Create these exports:

```tsx
export function EmployeeHomeWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeePunchWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeScheduleWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeShiftSwapMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeTodoWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeMemoWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeMemoDetailWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeSalaryWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmployeeContractWeb({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use `WebFrame` and `WebAppShell` for 1280x800 screens. Use `MobileFrame` for the shift swap mobile reference. Keep list/detail screens locally interactive when useful, especially `EmployeeContractWeb`.

- [ ] **Step 2: Export employee web registry**

Export `employeeWebScreens` with the 9 IDs and labels from the Screen Registry.

- [ ] **Step 3: Wire registry**

Update `allScreens.ts` to import `employeeWebScreens` from `./employeeWeb`.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 5: Commit employee web screens**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance employee web screens"
```

## Task 9: Owner Web Screens

**Files:**

- Create: `src/componentsAttendance/screens/ownerWeb.tsx`
- Modify: `src/componentsAttendance/screens/allScreens.ts`

- [ ] **Step 1: Implement 17 owner web components**

Create these exports:

```tsx
export function OwnerDashboardWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerScheduleWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerScheduleCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerPayrollWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerStaffWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerStaffAddWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerAttendanceWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerMemoWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerMemoCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerLeaveWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerStatsWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerTaxationWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerLaborWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerLaborCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerLaborPreviewWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerPaymentWeb({ theme = 'calm' }: AttendanceScreenProps) {}
export function OwnerPaymentCheckoutWeb({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use `WebFrame`, `WebAppShell`, `MetricCard`, `ActionCard`, `StatusBadge`, `DocumentPreview`, and static data. Modal artboards should render as a normal web screen with an overlay layer inside the fixed frame.

- [ ] **Step 2: Export owner web registry**

Export `ownerWebScreens` with the 17 IDs and labels from the Screen Registry.

- [ ] **Step 3: Wire registry**

Update `allScreens.ts` to import `ownerWebScreens` from `./ownerWeb`.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 5: Commit owner web screens**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance owner web screens"
```

## Task 10: Empty States and Proposal Screen

**Files:**

- Create: `src/componentsAttendance/screens/emptyStates.tsx`
- Create: `src/componentsAttendance/screens/proposals.tsx`
- Modify: `src/componentsAttendance/screens/allScreens.ts`

- [ ] **Step 1: Implement empty states**

Create:

```tsx
export function EmptyOwnerMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmptyEmployeeMobile({ theme = 'calm' }: AttendanceScreenProps) {}
export function EmptyOwnerWeb({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use `EmptyState`, `MobileFrame`, `WebFrame`, and clear action buttons. Export `emptyStateScreens` with the 3 IDs from the Screen Registry.

- [ ] **Step 2: Implement proposal summary**

Create:

```tsx
export function ProposalSummary({ theme = 'calm' }: AttendanceScreenProps) {}
```

Use a custom 720x600 artboard and export `proposalScreens`.

- [ ] **Step 3: Wire registries**

Update `allScreens.ts` to import `emptyStateScreens` and `proposalScreens`.

- [ ] **Step 4: Add registry guard**

Add this export to `allScreens.ts`:

```ts
export const allAttendanceScreens = attendanceScreenGroups.flatMap(
  (group) => group.screens,
);
```

Run:

```bash
node scripts/attendance-source-inventory.mjs
```

Expected:

- The inventory still reports 60 source artboards.
- The screen registry is verified by `npm run build` in the next step.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 6: Commit final screens**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: add attendance empty and proposal screens"
```

## Task 11: Storybook Stories

**Files:**

- Create all `Attendance*.stories.tsx` files listed in the File Map.

- [ ] **Step 1: Create shared story helpers**

Inside each story file, use this control pattern:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';

type StoryArgs = {
  theme: AttendanceThemeName;
};

const argTypes = {
  theme: {
    control: 'inline-radio',
    options: ['calm', 'warm', 'dark'],
  },
};
```

- [ ] **Step 2: Create gallery story**

`AttendanceGallery.stories.tsx` should render every group:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AttendanceArtboard, AttendanceCanvas, AttendanceSection } from './components/AttendanceCanvas';
import { attendanceScreenGroups } from './screens/allScreens';
import type { AttendanceThemeName } from './attendance-theme';

function Gallery({ theme }: { theme: AttendanceThemeName }) {
  return (
    <AttendanceCanvas>
      {attendanceScreenGroups.map((group) => (
        <AttendanceSection key={group.title} title={group.title}>
          {group.screens.map((screen) => (
            <AttendanceArtboard key={screen.id} screen={screen}>
              <screen.Component theme={theme} />
            </AttendanceArtboard>
          ))}
        </AttendanceSection>
      ))}
    </AttendanceCanvas>
  );
}

const meta = {
  title: 'Attendance/00 전체 갤러리',
  component: Gallery,
  args: { theme: 'calm' },
  argTypes: {
    theme: { control: 'inline-radio', options: ['calm', 'warm', 'dark'] },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllScreens: Story = { name: '전체 화면' };
```

- [ ] **Step 3: Create group stories**

For each group story file, render one named export per screen. Use the screen label as `name`. Each export should render `screen.Component`.

Example shape for `AttendanceOnboarding.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { onboardingScreens } from './screens/onboarding';
import type { AttendanceThemeName } from './attendance-theme';

function ScreenStory({
  screenId,
  theme,
}: {
  screenId: string;
  theme: AttendanceThemeName;
}) {
  const screen = onboardingScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/01 가입·온보딩',
  component: ScreenStory,
  args: { theme: 'calm' },
  argTypes: {
    theme: { control: 'inline-radio', options: ['calm', 'warm', 'dark'] },
    screenId: { table: { disable: true } },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerSignupWeb: Story = {
  name: '01 · 사장님 회원가입 (웹)',
  args: { screenId: 'owner-signup-web' },
};
```

Repeat this pattern for all groups and all screen IDs.

- [ ] **Step 4: Build Storybook**

Run:

```bash
npm run build-storybook
```

Expected: Storybook builds into `storybook-static`.

- [ ] **Step 5: Commit stories**

Run:

```bash
git add src/componentsAttendance
git commit -m "feat: expose attendance screens in storybook"
```

## Task 12: Visual QA and Polish

**Files:**

- Modify: files under `src/componentsAttendance/**` as needed.

- [ ] **Step 1: Start Storybook**

Run:

```bash
npm run storybook
```

Expected:

- Storybook prints a local URL, usually `http://localhost:6006/`.
- Leave the server running while checking stories.

- [ ] **Step 2: Browser checks**

Open these stories and verify they are not blank and have no severe text overlap:

- `Attendance/00 전체 갤러리`
- `Attendance/01 가입·온보딩/01 · 사장님 회원가입 (웹)`
- `Attendance/02 직원 모바일/01 · 홈`
- `Attendance/03 사장님 모바일/01 · 사장님 홈`
- `Attendance/04 직원 웹/00 · 홈`
- `Attendance/05 사장님 웹/01 · 대시보드`
- `Attendance/06 Empty States/E3 · 사장님 웹 대시보드 (직원 없음)`

- [ ] **Step 3: Fix CSS issues**

For any screen with overflow or overlapping text, adjust `attendance.css` using fixed artboard-safe rules:

```css
.att-action-card__body,
.att-table-cell,
.att-sidebar-item,
.att-document-preview p {
  min-width: 0;
}

.att-table-cell,
.att-sidebar-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- [ ] **Step 4: Final build checks**

Run:

```bash
npm run build
npm run build-storybook
```

Expected: both commands pass.

- [ ] **Step 5: Commit polish**

Run:

```bash
git add src/componentsAttendance
git commit -m "fix: polish attendance storybook layouts"
```

## Completion Criteria

- `node scripts/attendance-source-inventory.mjs` reports 60 source artboards.
- `allAttendanceScreens.length` is 60 when inspected through the built Storybook source.
- All `Attendance/` story groups exist.
- `npm run build` passes.
- `npm run build-storybook` passes.
- Representative browser checks show nonblank mobile and web artboards.
- Existing non-attendance component files are not changed.

## Self-Review Notes

- Spec coverage: the plan covers isolated component structure, all 60 artboards, theme controls, static data, visual-only interactions, Storybook grouping, and verification.
- Placeholder scan: no deferred implementation markers are intentionally left in this plan.
- Type consistency: exported screen arrays use `AttendanceScreen`; all screens accept `AttendanceScreenProps`; story controls use `AttendanceThemeName`.
