# UI Tokens — Frontend

> **Used in:** Frontend repo only. A premium, considered palette — warm ivory canvas, one confident indigo accent used everywhere (buttons, links, active states), and a champagne gold reserved exclusively for rare "premium" signals (Pro tier, premium badges). Structural system (radius scales, elevation, motion, typography, two-register marketing/in-app split) is unchanged from before — only the color identity changed. Never hardcode hex values or use raw Tailwind color classes in components.

## How to Use

Tailwind v4. Tokens defined via `@theme` in `app/globals.css` — no `tailwind.config.ts` for colors.

```tsx
// Correct
className = "bg-surface text-text-primary border-border rounded-sm";

// Never
className = "bg-[#faf9f6] text-[#1c1b1f]";
className = "bg-blue-500 text-gray-600";
```

---

## globals.css — Token Definition

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-sans: "Geist", "Inter", system-ui, -apple-system, sans-serif;
  --font-mono:
    "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* Surfaces — warm ivory ladder, not cold gray */
  --color-background: #faf9f6; /* warm ivory — default page background */
  --color-surface: #ffffff; /* pure white — cards, dialogs, kept crisp against the warm body */
  --color-surface-secondary: #f3f1ec; /* warm cream inset — hover states, dropdowns */

  /* Borders — warm-neutral, not blue-gray */
  --color-border: #e8e4dc;
  --color-border-strong: #c9c2b4;

  /* Text — warm charcoal, not cool black */
  --color-text-primary: #1c1b1f;
  --color-text-secondary: #5b5752;
  --color-text-muted: #94908a;
  --color-on-primary: #ffffff;

  /* The one accent — deep indigo-violet, used for every CTA, link, and active state */
  --color-accent: #4f3cc9;
  --color-accent-deep: #3c2d9e; /* hover/pressed */
  --color-accent-light: #ece8fb; /* soft badge background */
  --color-accent-foreground: #ffffff;

  /* Champagne gold — premium signal ONLY. Pro tier, premium badges. Nowhere else. */
  --color-gold: #c9a227;
  --color-gold-light: #f5eac8;
  --color-gold-foreground: #6b5310;

  /* Jewel-tone semantics — muted, never flat/saturated */
  --color-success: #1f8a5f; /* deep emerald */
  --color-success-light: #dcf3e7;
  --color-success-foreground: #0e5c3d;
  --color-warning: #d98324; /* warm copper-amber */
  --color-warning-light: #fbe8d2;
  --color-warning-foreground: #8a4e0e;
  --color-error: #c8385a; /* sophisticated rose, not stock red */
  --color-error-light: #f8dce3;
  --color-error-foreground: #8c1f3b;
  --color-teal: #1b7a78; /* secondary jewel tone — category variety only */
  --color-teal-light: #d9efee;
  --color-teal-foreground: #0f4d4b;

  /* Google brand (OAuth button) */
  --color-google: #4285f4;

  /* Hero decoration — one signature gradient mesh, recolored to the new identity */
  --gradient-aurora-start: #4f3cc9; /* indigo */
  --gradient-aurora-mid: #8a6fe8; /* soft violet */
  --gradient-aurora-end: #c9a227; /* champagne gold — the gradient is the one place gold appears more freely, since it's decorative, not a UI signal */
  --gradient-aurora-accent: #1b7a78; /* teal accent stop */

  /* Border radius — two deliberate scales, never mixed on one screen */
  --radius-none: 0px;
  --radius-xs: 4px;
  --radius-sm: 6px; /* in-app: nav buttons, form inputs, dropdowns */
  --radius-md: 8px; /* in-app: cards (dashboard, copilot, resumes, applications, interview, settings) */
  --radius-lg: 12px; /* marketing: larger feature/pricing cards */
  --radius-xl: 16px; /* marketing: hero-adjacent image cards */
  --radius-pill-sm: 64px;
  --radius-pill: 100px; /* marketing: every primary/secondary CTA pill on landing + pricing */
  --radius-full: 9999px; /* badges, circular icon buttons, sidebar ghost pills */
}
```

---

## Two Radius Scales — Never Mixed on One Screen

| Surface                                        | Radius scale                        | Button shape          |
| ---------------------------------------------- | ----------------------------------- | --------------------- |
| **Marketing** (`/`, `/pricing`, public navbar) | `radius-lg` / `radius-xl` for cards | `radius-pill` (100px) |
| **In-app** (sidebar shell)                     | `radius-sm` / `radius-md` for cards | `radius-sm` (6px)     |

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

### Accent — Indigo (Used Constantly, Not Sparingly)

Unlike a restrained single-purpose accent, this indigo is vibrant enough to carry every interactive signal in the product — buttons, links, active states, focus rings. Using it everywhere is what makes it feel intentional.

| Element                                  | Token                             |
| ---------------------------------------- | --------------------------------- |
| Primary button background                | `bg-accent`                       |
| Primary button hover/press               | `bg-accent-deep`                  |
| Primary button text                      | `text-accent-foreground`          |
| Inline link                              | `text-accent`, underline on hover |
| Active sidebar item — left indicator bar | `bg-accent`                       |
| Soft badge background                    | `bg-accent-light`                 |

### Gold — Premium Signal, Used in Exactly Three Places

1. The featured/Pro pricing tier card.
2. A "Premium"/"Pro" badge, if one is ever needed.
3. The hero gradient's warm stop (decorative, not a UI signal).

Never use gold for a button, a link, a regular badge, or anything that appears more than a handful of times on a page. The moment it's common, it stops working.

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
| Applied   | `bg-accent-light`  | `text-accent`             |
| Screening | `bg-teal-light`    | `text-teal-foreground`    |
| Interview | `bg-success-light` | `text-success-foreground` |
| Rejected  | `bg-error-light`   | `text-error-foreground`   |
| Offer     | `bg-success`       | `text-on-primary`         |

### Interview Question Category Badges

| Category   | Background             | Text                   |
| ---------- | ---------------------- | ---------------------- |
| Technical  | `bg-accent-light`      | `text-accent`          |
| Behavioral | `bg-teal-light`        | `text-teal-foreground` |
| HR         | `bg-surface-secondary` | `text-text-secondary`  |

---

## Typography Scale

(Unchanged from before — Geist sans, Geist Mono for technical labels, weight 600 ceiling, negative tracking on display sizes. See `ui-rules.md` for full application rules.)

| Token            | Size | Weight | Line height | Letter spacing | Use                                             |
| ---------------- | ---- | ------ | ----------- | -------------- | ----------------------------------------------- |
| `display-xl`     | 48px | 600    | 48px        | -2.4px         | Landing page hero headline only                 |
| `display-lg`     | 32px | 600    | 40px        | -1.28px        | Marketing section headlines, in-app page `<h1>` |
| `display-md`     | 24px | 600    | 32px        | -0.96px        | Card-cluster headlines                          |
| `display-sm`     | 20px | 600    | 28px        | -0.6px         | Section headings inside cards                   |
| `body-lg`        | 18px | 400    | 28px        | 0              | Lead paragraph under a marketing headline       |
| `body-md`        | 16px | 400    | 24px        | 0              | Default body paragraph                          |
| `body-md-strong` | 16px | 500    | 24px        | 0              | Bolded inline body                              |
| `body-sm`        | 14px | 400    | 20px        | -0.28px        | Card text, sidebar nav items, table rows        |
| `body-sm-strong` | 14px | 500    | 20px        | -0.28px        | Nav CTA labels, emphasised row text             |
| `caption`        | 12px | 400    | 16px        | 0              | Timestamps, badge labels, fine print            |
| `caption-mono`   | 12px | 400    | 16px        | 0              | Section eyebrows, "AI model used" badge         |
| `code`           | 13px | 400    | 20px        | 0              | Extracted resume text preview                   |
| `button-md`      | 14px | 500    | 20px        | 0              | In-app (6px-radius) button labels               |
| `button-lg`      | 16px | 500    | 24px        | 0              | Marketing (pill) button labels                  |

---

## Spacing

(Unchanged — base unit 4px.) `xxs` 4px · `xs` 8px · `sm` 12px · `md` 16px · `lg` 24px · `xl` 32px · `2xl`–`6xl` 40–128px · `section` 192px.

---

## Elevation — Stacked Shadows, Never a Single Drop

Shadows stay neutral black-based regardless of accent color — that's standard practice and keeps elevation feeling like physical depth, not tinted color.

| Level              | CSS                                                                                                                | Use                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| 0 — Flat           | none                                                                                                               | Landing hero band, polarity-flipped dark section |
| 1 — Inset hairline | `0 0 0 1px var(--color-border) inset`                                                                              | Default in-app card chrome                       |
| 2 — Subtle drop    | `0 1px 1px rgba(0,0,0,0.03), 0 2px 2px rgba(0,0,0,0.05)` + inset hairline                                          | Kanban cards, ATS Score Dashboard card           |
| 3 — Soft stack     | `0 2px 2px rgba(0,0,0,0.05), 0 8px 8px -8px rgba(0,0,0,0.05)` + inset hairline                                     | Marketing feature cards                          |
| 4 — Float stack    | `0 2px 2px rgba(0,0,0,0.05), 0 8px 16px -4px rgba(0,0,0,0.05)` + inset hairline                                    | Pricing cards                                    |
| 5 — Modal          | `0 1px 1px rgba(0,0,0,0.03), 0 8px 16px -4px rgba(0,0,0,0.05), 0 24px 32px -8px rgba(0,0,0,0.08)` + inset hairline | Dialogs, dropdowns                               |

---

## Motion & Animation Tokens

(Unchanged — see `ui-rules.md`'s Motion & Microinteractions section for full application.)

```css
@theme {
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-moderate: 320ms;
  --duration-slow: 480ms;
  --duration-hero: 800ms;

  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-snap: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Component Tokens

### Buttons — Marketing

```
button-primary:   bg-accent text-accent-foreground rounded-[100px], hover bg-accent-deep
button-secondary: bg-surface text-text-primary rounded-[100px], border border-border
```

### Buttons — In-App

```
button-primary-sm:   bg-accent text-accent-foreground rounded-sm h-7, hover bg-accent-deep
button-secondary-sm: bg-surface border border-border text-text-primary rounded-sm h-7
ghost: bg-transparent text-text-secondary hover:bg-surface-secondary rounded-sm
```

### Cards

```
in-app card:    bg-surface border border-border rounded-md p-4   (Elevation Level 1 or 2)
marketing card: bg-surface rounded-lg p-6                          (Elevation Level 3)
pricing card:   bg-surface rounded-lg p-8                          (Elevation Level 4)
featured pricing card: bg-accent text-on-primary rounded-lg p-8, gold accent border (border-2 border-gold) — the one card on the entire site allowed a gold border
```

### Form Inputs

```
background: bg-surface
border: 1px solid border-border
border-radius: rounded-sm
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

---

## Invariants

- Never use hex values directly in components — always use tokens via Tailwind utility classes.
- Fonts are Geist (sans) and Geist Mono (technical) — never substitute Inter unless Geist genuinely fails to load.
- Never use Tailwind's built-in color scales (`bg-blue-500`, `text-gray-600`).
- `--color-accent` (indigo) carries every button, link, and active state — used constantly, not sparingly. This is deliberate: an accent used everywhere reads as intentional brand identity, not decoration.
- `--color-gold` is reserved for exactly three contexts (see Color Usage Guide above) — using it anywhere else dilutes the one thing that makes it feel premium.
- The aurora gradient exists only for the landing-page hero — never used as a card background, icon, or anywhere at in-app scale.
- Marketing pages use the pill radius scale; in-app pages use the 6/8px radius scale — never mixed on one screen.
- Shadows are always stacked and neutral black-based — never tinted with the accent color, never a single generic `box-shadow`.
- Match score bars, skill badges, and Kanban status badges always use the score-band/status tokens above — never hardcoded colors.
- All borders default to `--color-border` — never `border-gray-*`.
- Every transition uses a duration + easing token from the Motion scale — never an inline arbitrary value.
