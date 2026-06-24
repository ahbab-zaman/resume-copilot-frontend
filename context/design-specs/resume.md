# Design Spec — Resumes Page (`/resumes`)

> **Used in:** Frontend repo only. Build alongside Feature 18 in `build-plan.md`.

## Desktop Layout (≥992px)

- Page header row: `display-lg` "Resumes" left, `button-primary-sm` "Upload Resume" right, `mb-6`.
- Below: a `bg-surface border border-border rounded-md` table card, Elevation Level 1.

### Table

- Columns: **Resume** (filename + a small PDF icon), **Uploaded** (relative date, `caption`, `text-text-muted`), **Latest ATS Score** (a compact Match Score Bar + percentage, or "—" if never analyzed), **Status** (an "Active" badge, `bg-success-light`/`text-success-foreground`, shown only on the one active resume), **Actions** (overflow `⋯` menu: Set Active, Rename, Download, Delete).
- Column headers: `caption-mono`, uppercase, `text-text-secondary`, per `ui-rules.md`'s data-table convention.
- Row hover: `bg-surface-secondary`, `duration-fast`. Clicking a row (not on the actions menu) opens a side panel (Sheet component) showing the extracted text preview in `code` typography inside a `bg-surface-secondary` block, plus a list of every analysis ever run against this resume (clickable, jumps to that analysis on `/copilot`).
- Delete: requires a confirmation dialog (Level 5 elevation, per `ui-rules.md`) — never delete on a single click.

### Empty State (no resumes yet)

- Centered, full-width-of-card illustration area: a simple line-art document icon (lucide `FileText`, 48px, `text-text-muted`), "No resumes yet" (`body-md-strong`), "Upload your resume to get started" (`body-sm`, `text-text-muted`), `button-primary-sm` "Upload Resume" CTA below — this is the actual primary path into the app for a brand-new user, so it must feel inviting, not like an error state.

### Upload Dialog

- Triggered by the header button or the empty-state CTA. Level 5 modal, `max-w-md`.
- Same drag-and-drop zone styling as the Copilot page's upload block (reuse the component — don't rebuild it) — consistency between the two upload entry points matters.
- On successful upload: dialog closes, new row animates into the table at the top with the stagger-entrance pattern, brief success toast ("Resume uploaded").

## Tablet (576–991px)

- Table collapses the **Uploaded** column (date moves into a secondary line under the filename instead of its own column) to keep the remaining columns from feeling cramped.

## Mobile (<576px)

- Table becomes a stacked card list — one `bg-surface border-border rounded-md p-4` card per resume instead of a table row. Each card: filename + PDF icon top, score bar below, status badge + actions `⋯` menu in the bottom row.
- "Upload Resume" button in the header becomes icon-only (`+` icon) to save header width, full label still available inside the dialog/empty state.
