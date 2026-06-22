# Design Spec — Dashboard Page (`/dashboard`) & App Shell

> **Used in:** Frontend repo only. Build alongside Feature 17 (App Shell) and Feature 22 (Dashboard) in `build-plan.md`. Combined into one file since the sidebar is structurally part of every in-app page's frame.

## App Shell — Sidebar (Desktop, ≥1024px)

- `width: 240px`, fixed, full viewport height, `bg-surface`, `border-r border-border`.
- Top: logo mark + wordmark, `p-4`, `border-b border-border`.
- Nav items, `p-2` container, each item `h-9 px-3 rounded-sm`, `gap-3` icon+label (lucide icons, 18px): Dashboard, Copilot, Resumes, Applications, Interview, Settings.
  - Active: `bg-surface-secondary`, `text-text-primary`, 2px `bg-accent` left indicator bar (positioned via an absolutely-positioned pseudo-element, animated via `transform` on route change per `ui-rules.md`).
  - Inactive: `text-text-secondary`, hover → `bg-surface-secondary` fade-in, `duration-fast`.
- Bottom: user menu — avatar (24px circle) + truncated email (`body-sm`), click opens a dropdown (Settings shortcut, Sign Out), `border-t border-border`, `p-3`.

## App Shell — Mobile/Tablet (<1024px)

- Sidebar replaced by a 48px top bar: hamburger (left) + logo (center or left-aligned next to hamburger) + avatar (right, opens the same user menu as a dropdown instead of being sidebar-bottom-pinned).
- Hamburger opens the full sidebar as a slide-in drawer from the left, `w-[280px]`, backdrop overlay (`bg-overlay/40`), per `ui-rules.md`'s Sidebar responsive rule. Closes on nav item tap or backdrop tap.

---

## Dashboard Page Content

## Desktop Layout (≥1024px)

- Page header: `display-lg` "Dashboard", below it a one-line greeting (`body-md`, `text-text-secondary`) — "Welcome back" is acceptable but prefer something with actual signal once data exists, e.g. "You've analyzed 3 jobs this week."
- **Incomplete-resume banner** (only if no active resume exists): full-width, `bg-warning-light` background, `border border-warning`, `rounded-md`, icon + "Upload a resume to start using the Copilot" + inline `button-secondary-sm` CTA — sits directly under the header, above everything else, `mb-6`.
- **Stat cards row**: 4-up grid, `gap-4`. Each card: label (`body-sm`, `text-text-secondary`) top, big number (`display-xl`) below, small trend indicator if there's a meaningful week-over-week comparison (otherwise omit rather than fabricate a trend). Cards: Resumes Uploaded, ATS Analyses Run, Cover Letters Generated, Applications Tracked.
  - Entrance: stagger-fade per `ui-rules.md`, 4 items, well under the 6-item cap.
- **Two-column row below**, `grid-cols-[2fr_1fr] gap-6`:
  - Left: **Recent Activity** card — list of up to 10 entries, each row: colored dot (8px, color per activity type — reuse the dot-color convention already in `ui-tokens.md`'s component tokens) + description (`body-sm`) + relative timestamp (`caption`, `text-text-muted`, right-aligned).
  - Right: **Quick Actions** card — 4 stacked `button-secondary-sm`-style rows (full width inside the card), each with an icon: Upload Resume, New Job Analysis, Start Mock Interview, Track Application — each navigates to the relevant page.

## Tablet (640–1023px)

- Stat cards: 4-up → 2×2 grid.
- Two-column row stacks vertically: Recent Activity first, Quick Actions below.

## Mobile (<640px)

- Stat cards: 1-up, full width, stacked.
- Quick Actions: collapses to a horizontal-scroll row of icon+label chips instead of a stacked card, to save vertical space on a page that's already stat-heavy.
- Recent Activity: unchanged structure, full width.

## Empty/First-Run State

- If literally nothing has happened yet (no resumes, no analyses): Recent Activity card shows its own empty state ("Nothing here yet — your activity will show up once you run your first analysis") instead of an empty list with no explanation.
