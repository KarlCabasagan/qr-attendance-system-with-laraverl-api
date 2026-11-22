---
PIPELINE: add-feature
SCOPE: update-ui
CURRENT_PHASE: 5
STATUS: completed
---
# Active Execution Plan: System-Wide Clean Minimal Professional UI

## Alignment Decisions (Confirmed in Phase 2A)
- **Visual Direction:** Refined Neutral + Brand Purple — off-white canvas (`#F8FAFC`), crisp white cards (`#FFFFFF`), `1px` slate borders (`#E2E8F0`), charcoal ink (`#0F172A` / `#475569` / `#64748B`), keeping brand purple (`#402E7A`) as the single primary accent (matching `logo-small.png` / `logo-full.png`) with subtle emerald/rose semantic tints for Present/Absent.
- **Responsive Shell:** Mobile uses a compact sticky top bar + fixed thumb-friendly bottom navigation bar; tablet/desktop (`md:`) expands into a centered `max-w-3xl` workspace with a sticky top navigation bar (eliminating the narrow `460px` gray-framed mobile column and brittle `mt-64` spacer).
- **UI Polish (Zero New Dependencies):** Replace browser `alert()` calls (auth errors, QR scan feedback) with inline error/status banners, introduce a tiny zero-dep `Icons.jsx` with uniform `24px` stroke SVGs, add proper empty/loading states, and upgrade modals into accessible responsive dialogs/sheets.
- **Phase 3 Bypass:** `SCOPE: update-ui` (no backend or API contract changes; Phase 3 skipped directly to Phase 4).

## Invariants (Must Preserve)
- Keep all 10 exported Contexts and `[value, setValue]` tuple contracts in `frontend/src/App.jsx` unchanged (`IsModalOnContext`, `ModalIdContext`, `SelectedNavBtnContext`, `TokenContext`, `UserContext`, `IsLoggedInContext`, `SelectedSubjectContext`, `NextSubjectsContext`, `CurrentSubjectContext`, `UserSubjectsContext`).
- Keep `EnrollmentDetailsContext` export and tuple shape in `frontend/src/components/FacultySubjectModal.jsx` unchanged.
- Preserve all existing API endpoints, request payloads, headers, polling interval, and `localStorage` token handling (`/api/login`, `/api/register`, `/api/logout`, `/api/user`, `/api/subjects/:id`, `/api/attendance/:id`, `/api/attendances/:id`).
- Add zero new npm dependencies in `frontend/package.json`.

## Design System Tokens
- **Typography (`frontend/index.html`, `frontend/tailwind.config.js`):**
  - Load `Plus Jakarta Sans` (400, 500, 600, 700) and `JetBrains Mono` (400, 500) via Google Fonts (`display=swap`) with calibrated system sans/mono fallbacks.
  - Apply `tabular-nums` to all dates, class times, subject codes, year levels, and counts.
  - Cap body/helper prose at `max-w-prose` (`65ch`), use single ellipsis `…` (never `...`), expand tracking on all `uppercase` labels (`tracking-wider`), and reserve underlines strictly for hyperlinks.
- **Color Palette (`frontend/tailwind.config.js` — move custom colors under `theme.extend.colors` so Tailwind's default `slate`, `emerald`, `rose`, `amber` scales are restored):**
  - `brand`: `{ DEFAULT: '#402E7A', hover: '#322362', muted: '#6D55B8', soft: '#F3F0FA', border: '#DDD6F3' }`
  - `surface`: `{ canvas: '#F8FAFC', card: '#FFFFFF', subtle: '#F1F5F9' }`
  - Keep backward-compat aliases if needed or migrate all component usages to `brand` / `surface` / `slate` / `emerald` / `rose`.
- **Emil Kowalski Motion & Tactile Rules (`frontend/src/index.css`):**
  - Animate strictly `transform` and `opacity` (zero `transition-all`, zero `height`/`width` layout animations).
  - Tactile button/card press: `:active { transform: scale(0.97); }` with `transition: transform 100ms ease`.
  - Modal entrances: `opacity 0 -> 1` and `scale(0.96) -> scale(1)` in `200ms cubic-bezier(0.16, 1, 0.3, 1)` (never `scale(0)`).
  - Minimum `44x44px` tap/click hit targets on all buttons, nav tabs, modal close controls, visibility toggles, and Present/Absent controls.
  - Respect `prefers-reduced-motion: reduce`.

## File-by-File Modification Manifest (25 existing + 1 new)

### 1. Foundation & Tokens
- `frontend/index.html`: Add Google Fonts (`Plus Jakarta Sans`, `JetBrains Mono`) preconnect/stylesheet, set `<meta name="theme-color" content="#F8FAFC" />`, clean title `Attendance — QR Attendance System`.
- `frontend/tailwind.config.js`: Move custom tokens under `theme.extend.colors` (`brand`, `surface`) and `theme.extend.fontFamily` (`sans`, `mono`), plus keyframe/animation utilities (`modal-in`, `fade-in`) using `transform` + `opacity` only.
- `frontend/src/index.css`: Remove `#root { display: flex; justify-content: center; background-color: #bfbfbf; }`; set base `html, body` styles (`bg-[#F8FAFC] text-slate-900 antialiased`), `min-h-[100dvh]`, `.btn-press` active scale utility, focus-visible ring defaults, and `prefers-reduced-motion` guard.
- `frontend/src/components/Icons.jsx` *(NEW)*: Minimal unified `24px` stroke SVG icon components (`QrIcon`, `ScanIcon`, `SubjectsIcon`, `ProfileIcon`, `CloseIcon`, `ChevronRightIcon`, `ChevronDownIcon`, `EyeIcon`, `EyeOffIcon`, `CheckIcon`, `XMarkIcon`, `CalendarIcon`, `LogoutIcon`, `AlertCircleIcon`, `CheckCircleIcon`).

### 2. App Shell & Navigation
- `frontend/src/App.jsx`: Replace rigid `w-screen h-screen max-w-[460px] bg-[#E5E4E2]` container with `min-h-[100dvh] w-full bg-surface-canvas text-slate-900 flex flex-col relative`. Conditionally render `{isLoggedIn ? <Dashboard ... /> : <Authentication ... />}` and `{isModalOn && <ModalOverlay ... />}` so unauthenticated screens do not mount hidden camera/dashboard trees and modal state resets cleanly on close.
- `frontend/src/Dashboard.jsx`: Remove `mt-64` spacer and `w-11/12` wrapper. Render sticky `<Header dayName={dayName} navBtn={navBtn} userRole={userRole} />` followed by `<main className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-10 flex-1">`.
- `frontend/src/components/Header.jsx`:
  - Replace absolute oversized icon boxes with responsive dual navigation:
  - Sticky top header (`bg-white/90 backdrop-blur-md border-b border-slate-200`) showing `logo-small.png` + `"Attendance"` + subtle role badge (`Student` / `Faculty`), centered desktop segmented tab buttons (`md:flex hidden`, labels `QR Code`/`Scanner`, `Subjects`, `Profile`, `44px` height, `bg-brand-soft text-brand` active state), and right-aligned date (`tabular-nums`).
  - Fixed mobile bottom tab bar (`md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-[env(safe-area-inset-bottom)]`) with 3 semantic `<button type="button">` tabs (`min-h-[56px]`, crisp icon + 11px label).

### 3. Authentication Views
- `frontend/src/Authentication.jsx`: Centered auth page (`min-h-[100dvh] flex items-center justify-center px-4 py-10`), white elevated card (`max-w-[420px] w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8`), compact brand header (`logo-small.png` + wordmark + concise helper subtitle), and accessible `<button type="button">` mode toggle with `44px` hit height (replacing clickable `<span>` and negative-margin `or` divider).
- `frontend/src/components/LoginForm.jsx`: Proper `<label>` + `h-11` rounded inputs (`text-base` to prevent mobile zoom), `44x44px` `<button type="button">` password visibility toggle using `EyeIcon`/`EyeOffIcon`, inline error alert banner (`role="alert"`) replacing `alert()`, loading/disabled submit state (`"Signing in…"`), primary `bg-brand hover:bg-brand-hover` CTA with tactile press.
- `frontend/src/components/RegistrationForm.jsx`: Match `LoginForm.jsx` field design, password visibility toggle, inline error banner replacing `alert()` (safely guarding `data?.errors` / `data?.message`), fix field reset to empty strings on success only, loading/disabled submit state (`"Creating account…"`).

### 4. Student & Faculty Core Views
- `frontend/src/StudentPage.jsx` & `frontend/src/FacultyPage.jsx`: Keep clean view switching (render active tab cleanly or preserve visibility props) inside `<section>` wrappers without layout shift.
- `frontend/src/components/QrPage.jsx`: Clean page heading + helper (`max-w-prose`); centered white QR card (`max-w-md mx-auto`) with live class emerald indicator and quiet-zone `<QRCode>` when `currentSubject?.enrollments?.[0]?.qr_code` exists, or polished empty-state card when no active class is scheduled; clickable `<button type="button">` Today's Schedule card beneath (`tabular-nums` time, code badge, chevron).
- `frontend/src/components/QrScanner.jsx`: Matching centered `max-w-md mx-auto` camera card with rounded `aspect-square` viewport and minimal CSS corner viewfinder brackets; replace `alert('QR Code not Found')` with inline auto-clearing status banner (`role="status"`, emerald on scan recorded, rose on not found / no active session) and guard against empty `enrollments`; matching clickable Today's Schedule card beneath.
- `frontend/src/components/StudentSubjectPage.jsx` & `frontend/src/components/FacultySubjectPage.jsx`: Unified header (`"My Subjects"` + `tabular-nums` count pill), responsive `grid grid-cols-1 md:grid-cols-2 gap-3` (removing fixed `h-[35rem]` clipping), skeleton loading state (`userSubjects === null`), and clean empty state (`userSubjects.length === 0`).
- `frontend/src/components/Subject.jsx` & `frontend/src/components/FacultySubject.jsx`: Unified semantic `<button type="button">` subject cards (`bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 text-left active:scale-[0.98]`), displaying title, monospace uppercase code pill (`bg-brand-soft text-brand`), schedule day chips (`bg-slate-100 text-slate-600`), and chevron icon.
- `frontend/src/components/ProfilePage.jsx` & `frontend/src/components/CourseAndYear.jsx`: Centered `max-w-xl mx-auto` white profile card with initials avatar (`bg-brand-soft text-brand`), role badge, structured `divide-y divide-slate-100` key-value rows (`uppercase tracking-wider text-xs text-slate-500` labels, `tabular-nums` year level — removing floating negative-margin labels), and footer `"Sign Out"` button (`min-h-[44px]`, restrained neutral/rose-hover outline style + submitting state).

### 5. Modals & Attendance Details
- `frontend/src/ModalOverlay.jsx`: Accessible `fixed inset-0 z-50` overlay (`bg-slate-900/40 backdrop-blur-[2px]`), bottom-sheet on mobile / centered dialog on desktop, `Escape` key dismissal, smooth `modal-in` (`opacity` + `scale(0.96 -> 1)`) animation, passing `onClose` helper cleanly alongside context dismissal.
- `frontend/src/components/TodaySubjectModal.jsx`: Sticky modal header (`"Today's Schedule"` + `44x44px` close button), highlighted Current Class block (`border-brand-border bg-brand-soft/40` + `"In Progress"` pill + `tabular-nums` range), unified row-based `"Up Next"` list (fixing dual-column wrapping drift), and clean empty state with `CalendarIcon`.
- `frontend/src/components/StudentSubjectModal.jsx` & `frontend/src/components/SubjectSchedule.jsx`: Header with subject name, monospace code pill, and `44x44px` close button; structured Schedule chips (`SubjectSchedule.jsx` with `tabular-nums` times) and Instructor card (name + `mailto:` email link).
- `frontend/src/components/FacultySubjectModal.jsx` & `frontend/src/components/Student.jsx`: Header with subject name, code pill, enrolled count (`tabular-nums`), and close button; clean `uppercase tracking-wider` column headers (`Student` / `Year`); `min-h-[52px]` `<button type="button">` rows (`Student.jsx`) with initials avatar, name, year pill, and chevron; empty state when roster is empty.
- `frontend/src/components/SubjectStudentDetails.jsx` & `frontend/src/components/AttendanceLog.jsx`:
  - Nested dialog (`z-[60]` backdrop / `z-[70]` panel) with `44x44px` close button, student identity header (name, course/year pills, subject/code).
  - Replace tiny `w-4 h-4` present/absent circles with a two-button `min-h-[44px]` segmented status toggle (`Present` emerald active pill / `Absent` rose active pill).
  - Replace underlined non-link `"Show Attendance"` and `h-0` height animation with an accessible `<button type="button" aria-expanded={viewAttendance}>` + rotating chevron revealing a crisp `fade-in` history list.
  - `AttendanceLog.jsx`: Replace broken read-only radio circles with crisp rows showing `tabular-nums` date, check-in time, and semantic `Present`/`Absent` status pill.

## Phase 4 Execution & Verification Checklist
1. Load `ui-ux-pro-max` and `impeccable` (`polish`, `harden`) skills before editing.
2. Apply changes across the 26 files above in clean batches, maintaining `ponytail` discipline (minimal diff, no legacy backend edits).
3. Run `cd frontend && npm run lint && npm run build` — must exit 0 with zero errors.
4. Start Vite dev server and run Playwright MCP verification across mobile (`390x844`) and desktop (`1280x800`) viewports: verify Auth (Login + Register + inline validation error), responsive layout, typography measure (`<= 65ch`), `44px` hit targets, no horizontal overflow, and zero console errors.
5. Update `PLAN.md` frontmatter to `CURRENT_PHASE: 5` and stop for `/clear` before Phase 5 (`ponytail-review`, `graphify update .`, `caveman-commit`).

## Phase 4 Verification Notes
- `frontend/eslint.config.js`: added `'react/prop-types': 'off'` (`prop-types` absent in `package.json`, zero new deps).
- `npm run lint` (`frontend/`): exited `0` (0 errors, 0 warnings).
- `npm run build` (`frontend/`): exited `0` (`dist/assets/index-*.css` 21.29 kB, `dist/assets/index-*.js` 329.92 kB).
- Playwright MCP (`390x844` & `1280x800` across Auth Login/Register, Student QR/Subjects/Profile, Faculty Scanner/Subjects/Roster/StudentDetails, TodayScheduleModal, StudentSubjectModal): `0` horizontal overflow, `0` interactive elements under `44x44px`, `0` prose blocks over `65ch`, `0` `alert()` dialogs, `0` JS/React console errors, nested `Escape` closes only nested dialog.

## Phase 5 Verification Notes
- `ponytail-review` fixes applied:
  - `frontend/src/App.jsx`: extracted `resetSessionState()` (including `selectedSubject` and `selectedNavBtn(1)`), guarded `getUser`/`getUserSubjects` against post-unmount/token-change staleness, and stopped the 2s interval from fetching `/api/subjects/:id` after a `401` logout.
  - `frontend/src/components/SubjectStudentDetails.jsx`: initialized `isPresent` from `enrollment?.attendances?.[0]?.time`, neutralized disabled Present/Absent button styling when no attendance record exists today, and added unmount/selection cancellation guard for `getCurrentAttendanceStatus`.
  - `frontend/src/components/Icons.jsx`: aliased `XMarkIcon = CloseIcon` to remove duplicate SVG markup.
  - `frontend/src/ModalOverlay.jsx`: reset `modalId` to numeric `1` instead of `false` on close.
- Removed stray `.playwright-mcp/` directory.
- `npm run lint` (`frontend/`): exited `0` (0 errors, 0 warnings).
- `npm run build` (`frontend/`): exited `0` (`dist/assets/index-LtnktABo.css` 21.29 kB, `dist/assets/index-C0uGAHsC.js` 330.21 kB).
- `graphify update . --force`: exited `0` (547 nodes, 1003 edges, 39 communities).
