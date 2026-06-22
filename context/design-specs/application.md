# Design Spec — Applications Page (`/applications`)

> **Used in:** Frontend repo only. Build alongside Feature 20 in `build-plan.md`.

## Desktop Layout (≥1024px)

- Page header: `display-lg` "Applications" left, `button-primary-sm` "Add Application" right.
- **Stats row** below header, `mb-6`: three compact inline stats (not full stat-cards, just `body-sm-strong` number + `caption` label pairs in a row, `gap-8`) — Total Applications, Interviews Received, Success Rate. Lighter-weight than the Dashboard's stat cards since this page's main content is the board itself.
- **Filter bar**: search input (`form-input-sm`, placeholder "Filter by company or role...") + a sort dropdown (Newest / Oldest / Company A–Z), `gap-3`, `mb-4`.
- **Kanban board**: five columns, `grid-cols-5 gap-4`, each column `min-w-[240px]`.
  - Column header: status name (`body-sm-strong`) + count badge (`bg-surface-secondary`, `rounded-full`, `caption`), `pb-3 border-b border-border`.
  - Column body: vertically stacked cards, `gap-3`, scrollable independently if it overflows the viewport height (`max-h-[calc(100vh-280px)] overflow-y-auto`).
  - Empty column: dashed-border drop zone placeholder, `text-text-muted caption`, "Drop applications here."

### Card Anatomy

- `bg-surface border-border rounded-md p-3`, Elevation Level 2.
- Company name: `body-sm-strong`, `text-text-primary`.
- Role: `body-sm`, `text-text-secondary`, directly below.
- Bottom row: relative date (`caption`, `text-text-muted`) left, a small notes icon (lucide `StickyNote`) right if the card has notes — click opens the edit dialog directly to the notes field.
- Click anywhere else on the card opens the full edit dialog (company, role, status, date, notes — same fields as Add Application).

### Drag and Drop

- Exactly the motion spec in `ui-rules.md`'s Kanban Drag section: lift (scale 1.03, rotate 1–2deg, Level 4), drop with `ease-snap`, drop-zone background tint while hovering.
- Implemented with `@dnd-kit/core`; optimistic update on drop (card visually moves immediately), reconciled with the `PATCH` response, reverted with a toast if the request fails.

### Add/Edit Dialog

- Level 5 modal, `max-w-md`. Fields: Company (text), Role (text), Status (segmented control matching the 5 columns, not a plain dropdown — visually ties the dialog to the board), Date Applied (date picker), Notes (textarea).
- Delete action: ghost destructive-styled button (`text-error`) in the dialog footer, left-aligned, separate from Cancel/Save on the right — prevents accidental clicks between Delete and Save.

## Tablet (640–1023px)

- Five columns stay side by side but the board becomes horizontally scrollable (`overflow-x-auto`), each column fixed at `min-w-[220px]` — don't shrink columns to fit, per `ui-rules.md`.
- Stats row and filter bar wrap to two lines if needed rather than truncating.

## Mobile (<640px)

- Board becomes single-column per `ui-rules.md`'s Kanban mobile rule: a segmented control or horizontally-scrollable pill row above the card list lets the user pick which status to view (Applied / Screening / Interview / Rejected / Offer), only that column's cards render below.
- Switching the selected status cross-fades the card list, `duration-base`.
- Drag-and-drop is disabled on mobile/touch in this single-column view — moving a card between statuses happens via the status field inside the edit dialog instead (dragging a single-column list to itself doesn't make sense).
