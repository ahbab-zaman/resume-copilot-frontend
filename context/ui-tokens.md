# UI Tokens — Frontend

> **Used in:** Frontend repo only. Vivid, energetic SaaS identity — coral as the one accent used everywhere (buttons, links route through a separate indigo-blue to stay distinct from CTAs), orange reserved for rare "premium" signals, and confident saturated semantic colors (this palette is intentionally more saturated than a muted/jewel-tone system — that's a deliberate identity choice, not an inconsistency). Structural system (radius scales, elevation, motion, typography sizes, two-register marketing/in-app split) is unchanged — only colors, font, and breakpoints changed. Never hardcode hex values or use raw Tailwind color classes in components.

## How to Use

Tailwind v4. Tokens defined via `@theme inline` in `app/globals.css` — no `tailwind.config.ts` for colors.

```tsx
// Correct
className = "bg-surface text-text-primary border-border rounded-sm";

// Never
className = "bg-[#ff5e59] text-[#343a40]";
className = "bg-red-500 text-gray-600";
```

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

### Accent — Coral, Used Constantly

Every button, every active state. This is the color that should feel synonymous with the product.

| Element                                  | Token                    |
| ---------------------------------------- | ------------------------ |
| Primary button background                | `bg-accent`              |
| Primary button hover/press               | `bg-accent-deep`         |
| Primary button text                      | `text-accent-foreground` |
| Active sidebar item — left indicator bar | `bg-accent`              |
| Soft badge background                    | `bg-accent-light`        |

### Link / Category — Indigo-Blue, Kept Distinct From Accent

Deliberately separate from the coral accent so a hyperlink never visually competes with a call-to-action button on the same screen.

| Element               | Token                                    |
| --------------------- | ---------------------------------------- |
| Inline link           | `text-link`, underline on hover          |
| Soft badge background | `bg-link-light` / `text-link-foreground` |

### Premium — Orange, Used in Exactly Three Places

1. The featured/Pro pricing tier card.
2. A "Premium"/"Pro" badge, if one is ever needed.
3. The hero gradient's warm stop (decorative, not a UI signal).

Never use `bg-premium`/`text-premium` for a button, a link, or a regular badge — the moment it's common, it stops signaling anything.

### A Note on Primary vs. Danger

The accent (`#ff5e59`) and the error/danger color (`#e80029`) are both red-family hues, close enough that color alone won't reliably distinguish "primary action" from "destructive action." **Never rely on hue alone for this distinction** — a destructive button always also gets a `ti-trash`/warning icon and, for anything irreversible (delete account, delete resume), a confirmation dialog. Placement matters too: keep primary and destructive buttons from sitting directly adjacent without a clear visual break (spacing, a divider, or opposite alignment in a dialog footer).

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
| Applied   | `bg-info-light`    | `text-info-foreground`    |
| Screening | `bg-purple-light`  | `text-purple-foreground`  |
| Interview | `bg-success-light` | `text-success-foreground` |
| Rejected  | `bg-error-light`   | `text-error-foreground`   |
| Offer     | `bg-success`       | `text-on-primary`         |

### Interview Question Category Badges

| Category   | Background             | Text                   |
| ---------- | ---------------------- | ---------------------- |
| Technical  | `bg-link-light`        | `text-link-foreground` |
| Behavioral | `bg-teal-light`        | `text-teal-foreground` |
| HR         | `bg-surface-secondary` | `text-text-secondary`  |

---

## Typography Scale

Font changed to **Roboto** (with the system fallback chain in `globals.css`) — sizes, weights, and line-heights are otherwise unchanged from before. See `library-docs.md` for the `next/font/google` setup.

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

Roboto does support weight 700 (unlike Geist's 600 ceiling) — but **stay at the 600 ceiling anyway** for consistency with the sizes above; don't introduce 700 just because the font supports it.

---

## Breakpoints — 7-Tier Scale

Defined as real Tailwind v4 custom breakpoints via `--breakpoint-*` in `@theme inline` — these generate actual `xs:`, `sm:`, `md:`, `lg:`, `xl:`, `xxl:` variants, not just documentation.

| Tier | Width  | Tailwind prefix              |
| ---- | ------ | ---------------------------- |
| xxs  | 0px    | (none — default/base styles) |
| xs   | 360px  | `xs:`                        |
| sm   | 576px  | `sm:`                        |
| md   | 768px  | `md:`                        |
| lg   | 992px  | `lg:`                        |
| xl   | 1200px | `xl:`                        |
| xxl  | 1400px | `xxl:`                       |

For the simpler mobile/tablet/desktop collapsing logic used throughout `ui-rules.md`: **mobile** = below `sm` (576px), **tablet** = `sm` to `lg` (576–991px), **desktop** = `lg` and up (992px+). `xs` (360px) is for the narrowest phones specifically (tighter padding, smaller touch-safe adjustments); `xxl` (1400px) caps the max content width on very large monitors — see `ui-rules.md`'s Responsive Strategy section for full detail.

---

## Spacing

(Unchanged — base unit 4px.) `xxs` 4px · `xs` 8px · `sm` 12px · `md` 16px · `lg` 24px · `xl` 32px · `2xl`–`6xl` 40–128px · `section` 192px.

---

## Elevation — Stacked Shadows, Never a Single Drop

Shadows stay neutral black-based regardless of accent color.

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
--duration-fast: 120ms;
--duration-base: 200ms;
--duration-moderate: 320ms;
--duration-slow: 480ms;
--duration-hero: 800ms;
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
--ease-snap: cubic-bezier(0.34, 1.56, 0.64, 1);
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
destructive: bg-error text-on-primary rounded-sm h-7 — always paired with a trash/warning icon, never adjacent to a primary button without a clear visual break
```

### Cards

```
in-app card:    bg-surface border border-border rounded-md p-4   (Elevation Level 1 or 2)
marketing card: bg-surface rounded-lg p-6                          (Elevation Level 3)
pricing card:   bg-surface rounded-lg p-8                          (Elevation Level 4)
featured pricing card: bg-accent text-on-primary rounded-lg p-8, premium accent border (border-2 border-premium)
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
- Font is Roboto (with the system fallback chain defined in `globals.css`) — see `library-docs.md` for the `next/font/google` setup.
- Never use Tailwind's built-in color scales (`bg-red-500`, `text-gray-600`).
- `--color-accent` (coral) carries every button and active state — used constantly. `--color-link` (indigo-blue) is reserved for hyperlinks and category badges specifically, kept separate so links never visually compete with CTAs.
- `--color-premium` (orange) is reserved for exactly three contexts (see Color Usage Guide) — using it elsewhere dilutes the one thing that makes it feel premium.
- Never rely on color alone to distinguish primary from destructive actions — see the "A Note on Primary vs. Danger" section above. Always pair destructive actions with an icon and, for irreversible ones, a confirmation dialog.
- The hero gradient exists only for the landing-page hero — never used as a card background, icon, or anywhere at in-app scale.
- Marketing pages use the pill radius scale; in-app pages use the 6/8px radius scale — never mixed on one screen.
- Shadows are always stacked and neutral black-based — never tinted with the accent color.
- Match score bars, skill badges, and Kanban status badges always use the score-band/status tokens above — never hardcoded colors.
- All borders default to `--color-border` — never `border-gray-*`.
- Every transition uses a duration + easing token from the Motion scale — never an inline arbitrary value.
- Breakpoints are the 7-tier custom scale (`xs`–`xxl`) defined in `globals.css` — never assume Tailwind's stock breakpoint values when reasoning about a layout's responsive behavior.
