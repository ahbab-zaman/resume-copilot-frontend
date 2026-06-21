# UI Rules — Frontend

> **Used in:** Frontend repo only. Visual direction follows the real Vercel design system — stark black/white/gray canvas, hairline borders, stacked shadows, sentence-case headlines, and exactly one decorative element (the mesh gradient, hero-scale only). Token values live in `ui-tokens.md`; this file is the rules for applying them.

## Font

```typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

Apply `${GeistSans.variable} ${GeistMono.variable}` on the `<html>` tag in the root layout. `--font-sans` and `--font-mono` are declared in `@theme` in `globals.css`. Never fall back to a system font as the primary face. See `library-docs.md` for the exact package and import.

---

## Two Registers — Marketing vs. In-App

This project has two distinct visual modes, and a component built for one must never bleed into the other:

|              | Marketing (`/`, `/pricing`, public navbar)             | In-App (sidebar shell — six authenticated pages) |
| ------------ | ------------------------------------------------------ | ------------------------------------------------ |
| Card radius  | `radius-lg` (12px) / `radius-xl` (16px)                | `radius-sm` (6px) / `radius-md` (8px)            |
| Button shape | `radius-pill` (100px)                                  | `radius-sm` (6px)                                |
| Padding      | Generous — `spacing.xl` to `spacing.5xl` between bands | Tight — `spacing.md` card padding, dense layout  |
| Decoration   | Mesh gradient allowed (hero only)                      | No gradient, no decoration — pure utility        |

---

## Layout

- Authenticated app content max-width: 1280px, centered, `spacing.lg` (24px) padding.
- Marketing pages: max content width ~1400px, gutters `spacing.lg` desktop / `spacing.md` mobile.
- Gap between sections: `spacing.lg` (in-app) to `spacing.4xl`–`5xl` (marketing bands).
- **Sidebar** for the authenticated app — six items don't fit a top navbar cleanly. Width 240px, fixed, full height, hairline right border only, no shadow.
- Public marketing pages use a top navbar — `nav-bar` height 64px, background `canvas`, padding `spacing.sm spacing.lg`.

---

## Sidebar (Authenticated App)

```
background: bg-surface
border-right: 1px solid border-border
width: 240px
```

- Logo + wordmark top, nav items below, user menu (avatar + email + sign out) pinned to the bottom.
- Active item: `bg-surface-secondary`, `text-text-primary`, 2px left indicator bar in `bg-accent` (ink black) — mirrors Vercel's own app-shell active-row pattern.
- Inactive item: `text-text-secondary`, no background, `body-sm` typography.
- No nested/collapsible sections — six flat items only.

---

## Public Navbar (Landing/Pricing)

```
background: bg-surface
height: 64px
padding: spacing.sm spacing.lg
```

- Logo left (set in `display-sm`, weight 700 is the one sanctioned exception for the logotype only — never on body text).
- Center or right: nav links in `body-sm`, `text-text-secondary`, ghost-pill hover (`rounded-full`, visible only on hover).
- Right cluster: "Log In" (`button-secondary-sm`, white) + "Get Started" (`button-primary-sm`, ink black) — both at the in-app 6px radius scale, matching Vercel's own `nav-cta-login`/`nav-cta-signup`, since these sit inside a 64px nav bar, not a hero band.

---

## Cards

### In-App Cards (dashboard, copilot, resumes, applications, interview, settings)

```
background: bg-surface
border-radius: rounded-md (8px)
padding: 16px (spacing.md)
elevation: Level 1 (inset hairline only) for default cards, Level 2 for the ATS Score Dashboard and Kanban cards
```

### Marketing Cards (landing features, pricing tiers)

```
background: bg-surface
border-radius: rounded-lg (12px)
padding: 24-32px (spacing.lg–xl)
elevation: Level 3 for feature cards, Level 4 for pricing cards
```

Never use a colored card background. Color goes inside the card via badges, bars, and text only — the one exception is a polarity-flipped dark card (`bg-accent`, `text-on-primary`), reserved for a featured pricing tier if one is ever added.

---

## Typography Hierarchy

Use the scale defined in `ui-tokens.md` exactly. Key rules specific to this project:

- **Landing hero headline**: `display-xl`, sentence-case, period-terminated ("Land your next role, faster.").
- **In-app page titles** (e.g. "Dashboard", "Find Jobs"): `display-lg`, sentence-case, **no period**.
- **Card section headings**: `display-sm` or `body-sm-strong` depending on density — dashboard stat-card group titles use `display-md`, individual card titles use `body-sm-strong`.
- **AI model / source credit labels** ("Analyzed with Gemini 2.5 Flash", "Jobs by Adzuna"-style credits if ever needed): `caption-mono`, `text-text-muted`.
- **Resume extracted-text preview**: `code`, inside a `canvas-soft-2` inset block — this is the one place body content is allowed in mono, since it's literally raw extracted text, not prose.

---

## Badges

Pill shape (`rounded-full`) always.

```
padding: px-2 py-0.5 (0px 8px)
typography: caption (12px / 400)
```

ATS score bands, skill badges, Kanban status, and interview-category badges use the exact tokens in `ui-tokens.md` — never a generic badge color.

---

## Buttons

**Marketing (pill, 100px radius):**

```
primary:   bg-accent text-accent-foreground rounded-[100px], button-lg label
secondary: bg-surface text-text-primary rounded-[100px], button-lg label
```

**In-App (6px radius):**

```
primary-sm:   bg-accent text-accent-foreground rounded-sm h-7, button-md label
secondary-sm: bg-surface border border-border text-text-primary rounded-sm h-7
ghost:        bg-transparent text-text-secondary hover:bg-surface-secondary rounded-sm
```

Never mix the two button scales on one screen — marketing pages only ever use the pill scale, in-app pages only ever use the 6px scale.

---

## Form Inputs

```
background: bg-surface
border: 1px solid border-border
border-radius: rounded-sm (6px)
height: 40px default, 32px small (tight in-app forms), 48px large (marketing/hero only)
typography: body-sm (or body-md at the 48px large size)
placeholder: text-text-muted
focus: ring-1 ring-accent border-accent
```

---

## Resume Table (`/resumes`)

- White rows only, `1px solid border-border` between rows.
- Column headers: `caption-mono`, uppercase via CSS `text-transform`, `text-text-secondary` — mirrors Vercel's own data-table header treatment (mono eyebrow + body-sm rows).
- Row text: `body-sm`, `text-text-primary`.
- Hover: `bg-surface-secondary`.

---

## ATS Match Score Bar

```
height: 4px
border-radius: rounded-full
background track: bg-border
```

Fill color by score — see the ATS Match Score Bands table in `ui-tokens.md`.

---

## Kanban Board (`/applications`)

- Five columns: Applied, Screening, Interview, Rejected, Offer — equal width, `spacing.md` gap between columns.
- Column header: status name (`body-sm-strong`) + count badge.
- Card: `bg-surface`, `border-border`, `rounded-md`, Elevation Level 2. Company name `body-sm-strong`, role `body-sm` `text-text-secondary`, date `caption` `text-text-muted`.
- Dragging state: card gets `ring-1 ring-accent` (ink black, not a colored ring — consistent with the single-accent rule).

---

## Question Cards (`/interview`)

- One card per question, Elevation Level 1, category badge top-left using the tokens in `ui-tokens.md`.
- "Show Answer" toggles a `bg-surface-secondary` block below the question, `body-md` text.
- "Next Question" — `ghost` button, bottom-right.

---

## Landing Page Hero

- The only place the mesh gradient appears. Render as inline SVG or canvas gradient behind the headline/CTA stack, scaled to roughly the top half of the hero band.
- Small `caption-mono` eyebrow badge above the headline (e.g. "AI-POWERED JOB APPLICATIONS").
- Headline: `display-xl`, sentence-case, period-terminated.
- Lead paragraph: `body-lg`, `text-text-secondary`.
- CTA row: `button-primary` + `button-secondary`, pill scale.
- Never crop, tile, or miniaturise the gradient — it renders at full hero scale or not at all.

---

## Empty States

Every section that can be empty has one:

- Short descriptive text, `text-text-muted`, `body-md`.
- Optional icon above text (lucide-react, muted color, 32px).
- CTA button if there's a logical next action (e.g. "Upload your first resume") — in-app scale.

---

## Tailwind v4

Tokens defined with `@theme` in `globals.css` — no `tailwind.config.ts`. Always add new tokens to `@theme`, never inline hex.

---

## Do Nots

- Never introduce a colored accent beyond ink black + link blue + the documented semantic set (success/warning/error/violet) — no sixth accent color.
- Never use Tailwind's built-in color classes (`bg-blue-500`, `text-gray-600`) — use project tokens only.
- Never render a heading in all-caps or with positive letter-spacing — sentence-case + negative tracking only.
- Never apply a single flat `box-shadow` — always the stacked elevation levels in `ui-tokens.md`.
- Never use the mesh gradient outside the landing-page hero — not as an icon, not as a card background, not reduced to one color.
- Never set body paragraphs or prose in Geist Mono — mono is for extracted-text previews, code-like content, and technical eyebrow labels only.
- Never use weight 700+ on Geist anywhere except the logotype.
- Never mix the pill button scale and the 6px button scale on the same screen.
- Never use `position: fixed` except for the sidebar and dialogs/dropdowns (Radix/shadcn portal pattern, not manual `fixed`).
