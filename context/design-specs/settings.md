# Design Spec — Settings Page (`/settings`)

> **Used in:** Frontend repo only. Build alongside Feature 23 in `build-plan.md`.

## Desktop Layout (≥1024px)

- Page header: `display-lg` "Settings".
- Left-nav-within-page pattern: a narrow vertical tab list (`w-48`, `body-sm`, ghost-style active/inactive matching the sidebar's own active-indicator convention) for **Profile**, **Appearance**, **Account** — content area to the right, `gap-8`.

### Profile Tab

- Avatar row: 64px avatar (from better-auth's user image, fallback to initials on `bg-surface-secondary`), "Change Avatar" ghost button beside it (if better-auth/Google profile supports it — otherwise omit rather than building a non-functional button).
- Form fields, two-column grid where it makes sense (`grid-cols-2 gap-4`): Name, Email (disabled/read-only, since it's tied to the auth provider — show a small `caption` "Managed by your login provider" beneath it).
- Save button: `button-primary-sm`, bottom-right of the form card, disabled until a field actually changes (dirty-state tracking), shows a brief inline checkmark animation on success rather than a separate toast for this one action (it's a small, contained form — a toast is overkill).

### Appearance Tab

- Theme: a 2-up selectable card row (Light / Dark... but note: this project's tokens in `ui-tokens.md` only define light-mode values currently — if Dark isn't actually implemented yet, this tab should show only "Light" as selected/locked with a `caption` note "Dark mode coming soon" rather than presenting a toggle that does nothing. Don't build a fake-functional toggle.

### Account Tab

- Sign Out: `button-secondary-sm`.
- Delete Account: separated by a `border-t border-border pt-6 mt-6` divider, section labeled in `text-error` (`body-sm-strong`, "Danger Zone"), explanation text (`body-sm`, `text-text-secondary`) describing what gets deleted, then a `bg-error text-on-primary` destructive button "Delete Account" — clicking opens a Level 5 confirmation dialog requiring the user to type their email to confirm (a stronger confirmation pattern than a plain Yes/No, appropriate for an irreversible destructive action).

## Tablet (640–1023px)

- Vertical tab list becomes a horizontal tab row (tab-ghost chrome) above the content instead of beside it.
- Profile form's two-column grid drops to one column.

## Mobile (<640px)

- Same horizontal tab row as tablet, scrollable if needed (only 3 items, likely fits without scrolling).
- All forms single column, full width.
- Danger Zone section gets extra top margin (`mt-8`) to visually separate it further from the rest of the page on a long single-column scroll, where accidental proximity-tapping is more of a risk than on desktop.
