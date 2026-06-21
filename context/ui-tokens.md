# UI Tokens — Frontend

> **Used in:** Frontend repo only. Adapted from the Vercel design system (real values, not approximated) — stark black/white/gray canvas, a single ink-black accent for every primary action, and the brand's signature multi-color mesh gradient reserved for marketing-page hero moments only. All colors, typography, spacing, and component values below. Never hardcode hex values or use raw Tailwind color classes in components.

## How to Use

Tailwind v4. Tokens defined via `@theme` in `app/globals.css` — no `tailwind.config.ts` for colors.

```tsx
// Correct
className = "bg-surface text-text-primary border-border rounded-sm";

// Never
className = "bg-[#fafafa] text-[#171717]";
className = "bg-blue-500 text-gray-600";
```

---

## globals.css — Token Definition

```css
@import "tailwindcss";

@theme {
  /* Fonts — Vercel's own faces, via the `geist` package */
  --font-sans: "Geist", "Inter", system-ui, -apple-system, sans-serif;
  --font-mono:
    "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* Surfaces — four-step ladder */
  --color-canvas: #ffffff; /* cards, dialogs, modals */
  --color-canvas-soft: #fafafa; /* default page background */
  --color-canvas-soft-2: #f5f5f5; /* inset regions, hover states, dropdowns */
  --color-background: #fafafa; /* alias — page body */
  --color-surface: #ffffff; /* alias — card surface */
  --color-surface-secondary: #f5f5f5; /* alias — inset surface */

  /* Borders */
  --color-border: #ebebeb; /* hairline — all dividers, card borders, input borders */
  --color-border-strong: #a1a1a1; /* hairline-strong — emphasised dividers */

  /* Text */
  --color-text-primary: #171717; /* ink — all headings and body on light surfaces */
  --color-text-secondary: #4d4d4d; /* body — secondary text, captions, inactive nav */
  --color-text-muted: #888888; /* mute — placeholders, fine print */
  --color-on-primary: #ffffff; /* text on the ink-black surface */

  /* The single accent — ink black, every primary CTA and active state */
  --color-accent: #171717;
  --color-accent-foreground: #ffffff;

  /* Link blue — reserved for inline links and info only, never reused as a status color */
  --color-link: #0070f3;
  --color-link-deep: #0761d1;
  --color-link-bg-soft: #d3e5ff;

  /* In-product semantic colors (extends the marketing-only palette for dashboard use) */
  --color-success: #29bc9b; /* cyan-deep — ATS high score, "Offer" status, matched skill */
  --color-success-light: #aaffec; /* cyan-soft */
  --color-success-foreground: #0d6b56;
  --color-warning: #f5a623;
  --color-warning-light: #ffefcf;
  --color-warning-foreground: #ab570a;
  --color-error: #ee0000;
  --color-error-light: #f7d4d6;
  --color-error-foreground: #c50000;
  --color-violet: #7928ca;
  --color-violet-light: #d8ccf1;
  --color-violet-foreground: #4c2889;

  /* Google brand (OAuth button) */
  --color-google: #4285f4;

  /* Brand mesh gradient — landing page hero ONLY, never miniaturised, never reused elsewhere */
  --gradient-develop-start: #007cf0;
  --gradient-develop-end: #00dfd8;
  --gradient-preview-start: #7928ca;
  --gradient-preview-end: #ff0080;
  --gradient-ship-start: #ff4d4d;
  --gradient-ship-end: #f9cb28;

  /* Border radius — two deliberate scales, never mixed on one screen */
  --radius-none: 0px;
  --radius-xs: 4px;
  --radius-sm: 6px; /* in-app: nav buttons, form inputs, dropdowns — the authenticated app's scale */
  --radius-md: 8px; /* in-app: cards (dashboard, copilot, resumes, applications, interview, settings) */
  --radius-lg: 12px; /* marketing: larger feature/pricing cards */
  --radius-xl: 16px; /* marketing: hero-adjacent image cards */
  --radius-pill-sm: 64px;
  --radius-pill: 100px; /* marketing: every primary/secondary CTA pill on landing + pricing */
  --radius-full: 9999px; /* badges, circular icon buttons, sidebar ghost pills */
}
```

Tailwind v4 generates utility classes automatically: `bg-accent`, `text-text-secondary`, `border-border`, `bg-success-light`, `rounded-sm`, etc.

---

## Two Radius Scales — Never Mixed on One Screen

This project genuinely has two visual registers, matching Vercel's own marketing-vs-dashboard split:

| Surface                                                                                     | Radius scale                        | Button shape                                                  |
| ------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| **Marketing** (`/`, `/pricing`, public navbar)                                              | `radius-lg` / `radius-xl` for cards | `radius-pill` (100px) — `button-primary` / `button-secondary` |
| **In-app** (sidebar shell — dashboard, copilot, resumes, applications, interview, settings) | `radius-sm` / `radius-md` for cards | `radius-sm` (6px) — tight, dashboard-scale buttons            |

Never put a 100px pill button next to a 6px-radius card, or vice versa — pick the register for the page and stay there.

---

## Color Usage Guide

### Page Layout

| Element               | Token                  |
| --------------------- | ---------------------- |
| Page background       | `bg-background`        |
| Card / surface        | `bg-surface`           |
| Inset / hover surface | `bg-surface-secondary` |
| Default border        | `border-border`        |
| Emphasised border     | `border-border-strong` |

### Typography

| Element                        | Token                 |
| ------------------------------ | --------------------- |
| Headings, primary text         | `text-text-primary`   |
| Secondary text, labels         | `text-text-secondary` |
| Placeholder, muted, fine print | `text-text-muted`     |

### Accent (Ink Black — Reserve for Conversion Points Only)

| Element                                  | Token                         |
| ---------------------------------------- | ----------------------------- |
| Primary button background                | `bg-accent`                   |
| Primary button text                      | `text-accent-foreground`      |
| Active sidebar item — left indicator bar | `bg-accent` (2px left border) |

### Links

| Element                        | Token                           |
| ------------------------------ | ------------------------------- |
| Inline body link               | `text-link`, underline on hover |
| Visited / pressed link         | `text-link-deep`                |
| Informational badge background | `bg-link-bg-soft`               |

### ATS Match Score Bands

| Score Range | Token                               |
| ----------- | ----------------------------------- |
| 80–100%     | `text-success` / `bg-success-light` |
| 50–79%      | `text-warning` / `bg-warning-light` |
| Below 50%   | `text-error` / `bg-error-light`     |

### Skill Badges

| Type          | Background         | Text                      |
| ------------- | ------------------ | ------------------------- |
| Matched skill | `bg-success-light` | `text-success-foreground` |
| Missing skill | `bg-warning-light` | `text-warning-foreground` |

### Application Status Badges (Kanban)

| Status    | Background         | Text                      |
| --------- | ------------------ | ------------------------- |
| Applied   | `bg-link-bg-soft`  | `text-link-deep`          |
| Screening | `bg-violet-light`  | `text-violet-foreground`  |
| Interview | `bg-success-light` | `text-success-foreground` |
| Rejected  | `bg-error-light`   | `text-error-foreground`   |
| Offer     | `bg-success`       | `text-on-primary`         |

### Interview Question Category Badges

| Category   | Background             | Text                     |
| ---------- | ---------------------- | ------------------------ |
| Technical  | `bg-violet-light`      | `text-violet-foreground` |
| Behavioral | `bg-link-bg-soft`      | `text-link-deep`         |
| HR         | `bg-surface-secondary` | `text-text-secondary`    |

---

## Typography Scale

Two faces carry everything: **Geist** (sans, weights 400/500/600 only — never 700+) for all narrative content, **Geist Mono** (weight 400 only) for technical labels — AI model badges, the resume's extracted-text preview, JSON-ish content, source credits. Body copy is never set in mono.

| Token            | Size | Weight | Line height | Letter spacing | Use                                                      |
| ---------------- | ---- | ------ | ----------- | -------------- | -------------------------------------------------------- |
| `display-xl`     | 48px | 600    | 48px        | -2.4px         | Landing page hero headline only                          |
| `display-lg`     | 32px | 600    | 40px        | -1.28px        | Marketing section headlines, page `<h1>` on in-app pages |
| `display-md`     | 24px | 600    | 32px        | -0.96px        | Card-cluster headlines, dashboard stat-card group titles |
| `display-sm`     | 20px | 600    | 28px        | -0.6px         | Section headings inside cards                            |
| `body-lg`        | 18px | 400    | 28px        | 0              | Lead paragraph under a marketing headline                |
| `body-md`        | 16px | 400    | 24px        | 0              | Default body paragraph                                   |
| `body-md-strong` | 16px | 500    | 24px        | 0              | Bolded inline body                                       |
| `body-sm`        | 14px | 400    | 20px        | -0.28px        | Card text, sidebar nav items, table rows                 |
| `body-sm-strong` | 14px | 500    | 20px        | -0.28px        | Nav CTA labels, emphasised row text                      |
| `caption`        | 12px | 400    | 16px        | 0              | Timestamps, badge labels, fine print                     |
| `caption-mono`   | 12px | 400    | 16px        | 0              | Section eyebrows, "AI model used" badge, source credits  |
| `code`           | 13px | 400    | 20px        | 0              | Extracted resume text preview, any monospaced content    |
| `button-md`      | 14px | 500    | 20px        | 0              | In-app (6px-radius) button labels                        |
| `button-lg`      | 16px | 500    | 24px        | 0              | Marketing (pill) button labels                           |

Stat numbers on dashboard: use `display-xl` at `text-text-primary`.

### Typography Principles

- **Negative tracking on every display size** — never revert to default tracking on headings.
- **Sentence-case headlines.** The landing-page hero headline is period-terminated ("Land your next role, faster."); in-app page titles are not.
- **Mono is for the technical layer only** — never set a body paragraph or a cover letter/resume preview's prose in mono, only literal extracted-text blocks or labels.
- **Weight 600 is the ceiling.** Never use 700+ anywhere.

### Font Setup

See `library-docs.md` for the exact `geist` package import — do not load Geist via `next/font/google`, it isn't there; it ships as its own npm package from Vercel.

---

## Spacing

Base unit 4px, every value a multiple of 4.

| Token       | Value      | Usage                                                                 |
| ----------- | ---------- | --------------------------------------------------------------------- |
| `xxs`       | 4px        | Tightest inline gaps                                                  |
| `xs`        | 8px        | Badge/tag gaps, headline-to-paragraph gap inside a card               |
| `sm`        | 12px       | Form field gaps, button row gaps                                      |
| `md`        | 16px       | Section internal gaps, in-app card padding                            |
| `lg`        | 24px       | Between sections, marketing card padding                              |
| `xl`        | 32px       | Large marketing card padding (pricing cards)                          |
| `2xl`–`6xl` | 40px–128px | Marketing band vertical padding only — never used inside in-app cards |
| `section`   | 192px      | Landing page hero band only                                           |

In-app cards (dashboard, copilot, resumes, applications, interview, settings) stay tight: `md` (16px) padding, `xs`–`sm` internal gaps. Marketing cards (landing, pricing) use `lg`–`xl` padding with generous whitespace between bands.

---

## Elevation — Stacked Shadows, Never a Single Drop

Vercel's signature: cards never use one heavy `box-shadow: 0 4px 12px ...` — always small offsets layered together, plus a 1px inset hairline ring so the edge stays crisp.

| Level              | CSS                                                                                                                | Use in this project                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 0 — Flat           | none                                                                                                               | Landing hero band, the polarity-flipped dark section if used                      |
| 1 — Inset hairline | `0 0 0 1px var(--color-border) inset`                                                                              | Default card chrome — every in-app card (stat cards, resume rows, question cards) |
| 2 — Subtle drop    | `0 1px 1px rgba(0,0,0,0.02), 0 2px 2px rgba(0,0,0,0.04)` + inset hairline                                          | Slightly elevated — Kanban cards, the ATS Score Dashboard card                    |
| 3 — Soft stack     | `0 2px 2px rgba(0,0,0,0.04), 0 8px 8px -8px rgba(0,0,0,0.04)` + inset hairline                                     | Marketing feature cards                                                           |
| 4 — Float stack    | `0 2px 2px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(0,0,0,0.04)` + inset hairline                                    | Pricing cards                                                                     |
| 5 — Modal          | `0 1px 1px rgba(0,0,0,0.02), 0 8px 16px -4px rgba(0,0,0,0.04), 0 24px 32px -8px rgba(0,0,0,0.06)` + inset hairline | Dialogs, dropdowns, the upload-resume modal                                       |

---

## Component Tokens

### Buttons — Marketing (landing, pricing)

```
button-primary:   bg-accent text-accent-foreground rounded-[100px] px-3 py-0 (button-lg label, ~48px tall)
button-secondary: bg-surface text-text-primary rounded-[100px] px-3 py-0 (same label/height)
```

### Buttons — In-App (sidebar shell)

```
button-primary-sm:   bg-accent text-accent-foreground rounded-sm px-2 h-7 (button-md label)
button-secondary-sm: bg-surface border border-border text-text-primary rounded-sm px-2 h-7
ghost: bg-transparent text-text-secondary hover:bg-surface-secondary rounded-sm
```

### Cards

```
in-app card:    bg-surface border border-border rounded-md p-4   (Elevation Level 1 or 2)
marketing card: bg-surface rounded-lg p-6                          (Elevation Level 3)
pricing card:   bg-surface rounded-lg p-8                          (Elevation Level 4)
featured pricing card (if ever used): bg-accent text-on-primary rounded-lg p-8
```

### Form Inputs

```
background: bg-surface
border: 1px solid border-border
border-radius: rounded-sm
height: 40px (form-input), 32px (form-input-sm), 48px (form-input-lg, hero/marketing only)
text: body-sm, text-text-primary
placeholder: text-text-muted
focus: ring-1 ring-accent border-accent
```

### Match Score Bar

```
background track: bg-border
fill: varies by score range (see ATS Match Score Bands above)
height: 4px
border-radius: rounded-full
```

### Sidebar Active Indicator

```
left border: 2px solid var(--color-accent)
background: bg-surface-secondary
text: text-text-primary
```

### Badges

```
border-radius: rounded-full
padding: px-2 py-0.5
typography: caption (12px / 400)
```

---

## Invariants

- Never use hex values directly in components — always use tokens via Tailwind utility classes.
- Fonts are Geist (sans) and Geist Mono (technical) — see `library-docs.md` for the exact package, never substitute Inter unless Geist genuinely fails to load.
- Never use Tailwind's built-in color scales (`bg-blue-500`, `text-gray-600`).
- `--color-accent` (ink black) is the **only** accent — used for primary buttons and active states only, never decoratively, and never replaced with the link blue.
- The mesh gradient tokens exist only for the landing-page hero — never used as a card background, icon, or anywhere at in-app scale.
- Marketing pages use the pill radius scale; in-app pages use the 6/8px radius scale — never mixed on one screen.
- Shadows are always stacked (see Elevation table) — never a single generic `box-shadow` value.
- Match score bars, skill badges, and Kanban status badges always use the score-band/status tokens above — never hardcoded colors.
- All borders default to `--color-border` — never `border-gray-*`.
