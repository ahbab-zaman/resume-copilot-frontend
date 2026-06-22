# Design Spec — Copilot Page (`/copilot`)

> **Used in:** Frontend repo only. Build alongside Feature 19 in `build-plan.md`. This is the flagship page — it should feel like the most polished surface in the app, since it's where the product's value is actually demonstrated.

## Desktop Layout (≥1024px)

Two states: **Input State** (before analysis) and **Results State** (after). Don't build them as separate routes — same page, conditional render based on whether an analysis exists for the session.

### Input State

- Centered single column, `max-w-2xl mx-auto`, generous vertical rhythm (`gap-6` between blocks) — this is the one in-app page allowed slightly more breathing room than the dense dashboard pages, since it's a focused single-task screen.
- Block 1 — Resume: a card (`radius-md`, Level 1) containing either (a) a dropdown of existing resumes if any exist (default to the active one) or (b) a drag-and-drop upload zone if none exist yet — dashed `border-border-strong`, centered icon + "Click to upload or drag and drop" (`body-sm`, `text-text-muted`), "PDF only, up to 5MB" (`caption`).
  - Drag-over state: border becomes `border-accent`, background tints `bg-surface-secondary`, `duration-fast`.
- Block 2 — Job Description: a card containing a `Textarea` (min-height 200px, resizable), placeholder "Paste the job description here...".
- Block 3 — Analyze button: full-width `button-primary-sm` scaled up slightly for this one prominent action (`h-11` instead of the standard `h-7`, since this is the page's single most important click), disabled until both blocks have content, label "Analyze" with a small sparkle icon (lucide `Sparkles`).

### Results State

Three-column grid `grid-cols-[280px_1fr_1fr] gap-6`, collapsing per Tablet/Mobile rules below:

- **Column 1 — Input recap**: collapsed/summarized version of the input (resume filename, JD truncated to 3 lines with "Show full" toggle), plus a "New Analysis" ghost button at the bottom to reset.
- **Column 2 — ATS Score Dashboard**:
  - Overall score: large circular progress ring (SVG, `stroke: var(--color-success|warning|error)` per band), `display-xl` number centered inside, `text-text-muted` "ATS Match Score" caption below the ring.
  - Three sub-bars below the ring: Skills / Experience / Education, each a labeled `body-sm` row + the Match Score Bar component (see `ui-tokens.md`), percentage right-aligned.
  - Missing Keywords: wrapped row of pill badges (`bg-warning-light`/`text-warning-foreground`), `gap-2`.
- **Column 3 — Insights Panel**:
  - Strengths: list with a green checkmark icon per item (lucide `CheckCircle2`, `text-success`), `body-sm`.
  - Weaknesses: list with an amber/warning icon (lucide `AlertCircle`, `text-warning`), `body-sm`.
  - Below both lists: **Output Tabs** — `Resume` / `Cover Letter` / `Interview Qs`, tab-ghost chrome, active indicator slides per `ui-rules.md`'s Tab motion rule. Each tab's content area is a card that shows either a "Generate" button (if not yet generated for this analysis) or the generated result with a regenerate option.

### Entrance Animation (Results State)

When the analysis completes, don't just pop the results in — the score ring animates its stroke from 0 to the final value over `duration-slow` (this IS an exception to the "no count-up animation" rule, because it's a one-time reveal of a freshly computed result, not a live data update), sub-bars fill left-to-right at `duration-base` staggered 60ms after the ring starts, Insights Panel fades in last.

## Tablet (640–1023px)

- Results State collapses to two columns: `[Column 1 + Column 2 stacked]` `[Column 3]`, or simpler — stack all three columns vertically in order 2 → 3 → 1 (score first, since it's the headline result; recap last, since it's reference material).

## Mobile (<640px)

- Single column throughout, both states. Score ring shrinks proportionally but stays circular (don't flatten it into a bar-only view — the ring is a recognizable signature element).
- Output Tabs become a horizontally-scrollable tab row if all three labels don't fit, rather than wrapping to two rows.

## Processing State (between Input and Results)

- Replace the Analyze button area with the multi-step "Analyzing..." cycling label per `ui-rules.md`'s Loading States rule, plus a thin indeterminate progress bar (looping `transform: translateX` sweep, not a real percentage) above it.
- Input blocks (resume/JD) gray out slightly (`opacity-60`) and become non-interactive during this state.
