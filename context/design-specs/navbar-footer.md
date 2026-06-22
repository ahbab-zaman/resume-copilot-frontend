# Design Spec — Navbar & Footer

> **Used in:** Frontend repo only. Read alongside `ui-rules.md`/`ui-tokens.md` — this file is the detailed, page-specific application of those system rules. Covers `components/layout/Navbar.tsx` (public) and `components/layout/Footer.tsx`. Sidebar has its own spec inside `dashboard.md` since it's part of the in-app shell.

## Public Navbar

### Desktop Layout (≥1024px)

- Fixed/sticky, `height: 64px`, `bg-surface`, `border-b border-border` (hairline only, no shadow while at top of page).
- On scroll past 8px: add Elevation Level 2 shadow (subtle drop) — gives the bar separation once content scrolls under it. Transition: `duration-base`/`ease-standard`.
- Three-zone grid: `[logo] [nav links — centered] [auth buttons — right]`, `max-w-[1400px] mx-auto px-6`.
- Logo: 28px mark (gradient-accent square, `radius-sm`) + wordmark in `display-sm` weight 700 (the one sanctioned 700-weight exception), `text-text-primary`.
- Nav links (Features, Pricing, FAQ): `body-sm`, `text-text-secondary`, `gap-8` between items. Hover: `text-text-primary` + a 2px underline that wipes in from the left via `transform: scaleX(0 → 1)`, `duration-fast`. Active route (e.g. on `/pricing`): underline persists, `text-text-primary`.
- Right cluster: "Log In" (`button-secondary-sm`) + "Get Started" (`button-primary-sm`), `gap-3`.

### Tablet (640–1023px)

- Same 64px bar. Nav links collapse into a hamburger icon (24px, `text-text-primary`) positioned left of the auth buttons. Logo stays left.
- Tapping hamburger opens a full-screen overlay (`bg-surface`, fade+scale in per `ui-rules.md`'s Dialog motion pattern) with nav links stacked vertically, `body-lg`, `gap-6`, centered, auth buttons pinned at the bottom of the overlay.

### Mobile (<640px)

- Bar height drops to 56px, horizontal padding `px-4`.
- Same hamburger pattern as tablet. "Get Started" button shrinks to icon+label compact form if needed, but never disappears — it's the primary conversion action.

### Interaction Detail

- Logo always links to `/` (or `/dashboard` if already authenticated — check session, don't show the public navbar at all to logged-in users on marketing pages; redirect them to `/dashboard` instead per `project-overview.md`).

---

## Footer

### Desktop Layout (≥1024px)

- `bg-surface`, `text-text-secondary`, padding `py-16 px-6` (spacing.4xl top/bottom).
- Four-column grid: **Product** (Features, Pricing, Copilot), **Company** (About, Blog — placeholder links acceptable pre-launch), **Resources** (FAQ, Support), **Legal** (Privacy, Terms).
- Column header: `caption-mono`, uppercase via `text-transform`, `text-text-muted`, `mb-3`.
- Links: `body-sm`, `text-text-secondary`, hover `text-text-primary`, `duration-fast`, stacked `gap-2`.
- Bottom row below a `border-t border-border` divider, `mt-12 pt-6`: logo mark (small, 20px) + "© 2026 AI Resume Job Pilot" left, social icons (if any) right — `icon-button-circular` chrome at 32px.

### Tablet (640–1023px)

- Four columns collapse to two columns, 2×2 grid, same column content.

### Mobile (<640px)

- Single column, each section becomes a collapsible accordion (tap column header to expand/collapse links) to avoid an extremely long scroll — `duration-moderate`/`ease-emphasized` expand, chevron icon rotates 180deg.
- Bottom row stacks vertically, centered.

### What NOT to do

- No newsletter signup form in the footer — out of scope per `project-overview.md`, don't invent one.
- No mesh gradient or any decoration here — footer stays purely typographic, consistent with Vercel's own restrained footer treatment.
