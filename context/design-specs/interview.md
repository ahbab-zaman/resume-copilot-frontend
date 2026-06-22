# Design Spec — Interview Page (`/interview`)

> **Used in:** Frontend repo only. Build alongside Feature 21 in `build-plan.md`.

## Desktop Layout (≥1024px)

Two states: **Setup State** and **Practice State** — same page, conditional render, same pattern as the Copilot page.

### Setup State

- Centered, `max-w-xl mx-auto`, similar focused-task framing to the Copilot's Input State.
- Role selector: three large selectable cards in a row (not a dropdown — this is a low-frequency, high-clarity choice that deserves visual weight) — Frontend / Backend / Full Stack, each with a small icon, `body-sm-strong` label, selected state gets `border-accent` + `bg-surface-secondary`.
- Difficulty selector: a segmented control below — Junior / Mid / Senior, single row, `radius-sm` chrome, selected segment gets `bg-accent text-on-primary`.
- "Generate Questions" — `button-primary-sm` scaled up (`h-11`), full-width within the centered column.

### Practice State

- Header row: "Frontend · Mid-Level" summary chip (`caption-mono`, `bg-surface-secondary`) + a "New Set" ghost button to return to Setup.
- Three labeled groups stacked vertically: **Technical**, **Behavioral**, **HR** — each group header is `display-sm` + the category's badge color as a small accent dot.
- Within each group, question cards stacked `gap-3`:
  - Card: question text (`body-md-strong`) top, category badge top-right corner (per `ui-tokens.md`'s category colors).
  - "Show Answer" (`button-secondary-sm`, ghost-leaning) — clicking expands a `bg-surface-secondary rounded-sm p-3 mt-3` block containing the model answer (`body-sm`), expand/collapse per `ui-rules.md`'s accordion-style motion.
  - If a follow-up question exists: shown as a smaller indented line below the model answer once expanded, `body-sm italic`, `text-text-secondary`, prefixed "Follow-up:".
  - "Next Question" — bottom-right of the card, ghost button, advances focus/scroll to the next card in the same category (purely a UX convenience, doesn't remove the current card).

## Tablet (640–1023px)

- Role selector cards: 3-up stays (they're narrow enough), or drop to a horizontal-scroll row if they feel cramped — test both, prefer keeping 3-up if it fits without text wrapping awkwardly.
- Question groups: unchanged, full width.

## Mobile (<640px)

- Role selector cards stack vertically, full width, `gap-3`.
- Difficulty segmented control stays horizontal (only 3 options, fits fine).
- Question cards: unchanged structure, full width, slightly reduced card padding (`p-3` instead of `p-4`) to fit more visible content per scroll.

## Loading State

- While questions generate: Setup State's button shows a spinner-in-button state (icon swaps to a spinning loader, label changes to "Generating..."), the whole Setup card dims slightly (`opacity-70`) — simpler than the Copilot's multi-step cycling label, since this generation is typically faster and doesn't need the same pacing treatment.
