# UI Rules — Frontend

> **Used in:** Frontend repo only. A premium, considered identity — warm ivory canvas, hairline borders, stacked shadows, sentence-case headlines, one confident indigo accent used constantly, a champagne gold reserved for rare premium signals, and exactly one decorative element (the aurora gradient, hero-scale only). Token values live in `ui-tokens.md`; this file is the rules for applying them.

## Font

```typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

Apply `${GeistSans.variable} ${GeistMono.variable}` on the `<html>` tag in the root layout. `--font-sans` and `--font-mono` are declared in `@theme` in `globals.css`. Never fall back to a system font as the primary face. See `library-docs.md` for the exact package and import.

---

## Motion & Microinteractions

Every interactive element has a deliberate motion response — the absence of motion on hover/press/load is itself a bug, not a neutral default. Use the duration/easing tokens from `ui-tokens.md` exclusively.

### Buttons

- Hover: background lightens 4% (in-app: `bg-surface-secondary` swap) or text/background invert (marketing pill), `duration-fast`.
- Press (`:active`): `scale(0.98)`, `duration-fast`, `ease-standard` — gives tactile feedback without a layout shift.
- Disabled: opacity 0.5, no hover/press response, cursor `not-allowed`.

### Cards (in-app: stat cards, resume rows, question cards, Kanban cards)

- Hover (where clickable): elevation steps up one level (e.g. Level 1 → Level 2) and `border-border` shifts to `border-border-strong`, `duration-fast`.
- Entrance: when a list of cards mounts (dashboard stats, resume table rows, question cards), stagger a `fade + translateY(8px → 0)` at `duration-base`/`ease-emphasized`, 40ms delay between siblings, capped at 6 staggered items — beyond that, fade the rest in together to avoid a sluggish feel.

### Tabs (Copilot Output Tabs)

- Active tab indicator slides via `transform: translateX()` under the tab row, `duration-base`/`ease-standard` — never a hard cut.
- Tab content cross-fades, `duration-base`.

### Dialogs, Dropdowns, Modals

- Open: `scale(0.96) + opacity 0 → scale(1) + opacity 1`, `duration-moderate`/`ease-emphasized`, with a backdrop fade-in at the same duration.
- Close: reverse, `ease-exit`, slightly faster feel is fine (`duration-base`).

### Sidebar

- Active-item indicator bar transitions position via `transform`, `duration-fast`, when switching routes — never an instant snap.
- Hover state on inactive items: background fade-in, `duration-fast`.

### Kanban Drag (Applications page)

- Picked-up card: scale to 1.03, elevate to Level 4, slight rotate (1–2deg) for a tactile "lifted" feel.
- Drop: animate into the new position with `duration-base`/`ease-snap` (the only place the slight-overshoot easing is used) — it should feel like it settles, not stops dead.
- Column drop-zone: background tints `bg-surface-secondary` while a card hovers over it.

### Loading States

- Skeleton screens (gray pulsing blocks matching the real layout's shape), never a bare spinner, for anything that takes >300ms: resume table, dashboard stats, Kanban board, question list.
- Skeleton → real content: cross-fade, `duration-base`, never an abrupt swap.
- The Copilot's multi-step "Analyzing..." state: cycle through 3–4 step labels (e.g. "Reading resume" → "Comparing against job description" → "Scoring matches") every ~1.5s while the single backend request is in flight — purely cosmetic pacing, not real progress tracking, since the backend doesn't report intermediate steps (see `library-docs.md`'s Polling pattern note).

### Scroll-Triggered Reveals (Landing Page Only)

- Each marketing section (Features, How It Works, Testimonials) fades + translates up 16px as it enters the viewport, `duration-slow`/`ease-emphasized`, triggered once (no repeat on scroll-back), using `IntersectionObserver` — never a scroll-linked/parallax effect, which would undercut the considered, premium feel.

### What Never Animates

- Color changes on data that updates in place (ATS score number ticking up) — instant, no count-up animation; the brand's calm voice doesn't do playful number tweens here.
- Page navigation between sidebar routes — instant route swap, no page transition wrapper (Next.js App Router default).
- Table row reordering on sort — instant, no FLIP animation (out of scope for this project's complexity budget).

---

## Responsive Strategy

Three breakpoints, using Tailwind's defaults directly — no custom breakpoint tokens needed.

| Name    | Width      | Tailwind prefix  |
| ------- | ---------- | ---------------- |
| Mobile  | < 640px    | (none — default) |
| Tablet  | 640–1023px | `sm:`            |
| Desktop | ≥ 1024px   | `lg:`            |

Exact per-page responsive behavior lives in each page's file under `context/design-specs/` — the rules below are the _cross-page_ defaults every page inherits unless its spec says otherwise.

### Sidebar (In-App Shell)

- Desktop (`lg:`): fixed 240px sidebar, always visible.
- Tablet/Mobile: sidebar collapses to a slide-in drawer triggered by a hamburger icon in a thin top bar (48px), backdrop overlay, closes on item click or backdrop tap. Drawer slides via `transform: translateX()`, `duration-moderate`/`ease-emphasized`.

### Public Navbar

- Desktop (`lg:`): logo, centered links, right-side auth buttons all visible.
- Tablet/Mobile: nav links collapse into a hamburger → full-screen overlay menu; logo + hamburger remain in the 64px bar.

### Grids (feature rows, pricing tiers, dashboard stat cards, resume/question lists)

- Desktop: as specified per page (commonly 3-up or 4-up).
- Tablet: drop to 2-up.
- Mobile: 1-up, full width.

### Kanban Board

- Desktop/Tablet: five columns side by side, horizontal scroll if the viewport can't fit all five (never force-shrink columns below a usable width).
- Mobile: single-column view with a status selector (segmented control or dropdown) swapping which column is visible — five columns side-by-side on a phone screen is unusable, don't attempt it.

### Forms (Copilot input panel, Settings, auth)

- Desktop: multi-column where it makes sense (Settings' Personal Info section).
- Mobile: always single column, full-width inputs, label above field (never inline label + field on mobile).

### Touch Targets

- Every interactive element is at least 44×44px on mobile/tablet, even if its visual size is smaller — pad the hit area, don't enlarge the visible chrome.

### Typography Scaling

- `display-xl`/`display-lg` step down one size at mobile (e.g. hero headline: 48px desktop → 36px mobile) to avoid wrapping into more than 3 lines. Body and caption sizes stay constant across breakpoints — only display sizes scale.

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
- Active item: `bg-surface-secondary`, `text-text-primary`, 2px left indicator bar in `bg-accent` (indigo).
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
- Right cluster: "Log In" (`button-secondary-sm`, white) + "Get Started" (`button-primary-sm`, indigo) — both at the in-app 6px radius scale, since these sit inside a 64px nav bar, not a hero band.

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
- **Resume extracted-text preview**: `code`, inside a `bg-surface-secondary` inset block — this is the one place body content is allowed in mono, since it's literally raw extracted text, not prose.

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
- Column headers: `caption-mono`, uppercase via CSS `text-transform`, `text-text-secondary` — mono eyebrow + body-sm rows.
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
- Dragging state: card gets `ring-1 ring-accent` (indigo).

---

## Question Cards (`/interview`)

- One card per question, Elevation Level 1, category badge top-left using the tokens in `ui-tokens.md`.
- "Show Answer" toggles a `bg-surface-secondary` block below the question, `body-md` text.
- "Next Question" — `ghost` button, bottom-right.

---

## Landing Page Hero

- The only place the aurora gradient (indigo → violet → gold → teal stops, see `ui-tokens.md`) appears. Render as inline SVG or canvas gradient behind the headline/CTA stack, scaled to roughly the top half of the hero band.
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

- Never introduce a colored accent beyond indigo (the one constant accent) + gold (premium-only, three contexts max) + the documented jewel-tone semantic set — no additional accent colors.
- Never use Tailwind's built-in color classes (`bg-blue-500`, `text-gray-600`) — use project tokens only.
- Never render a heading in all-caps or with positive letter-spacing — sentence-case + negative tracking only.
- Never apply a single flat `box-shadow` — always the stacked elevation levels in `ui-tokens.md`.
- Never use the aurora gradient outside the landing-page hero — not as an icon, not as a card background, not reduced to one color. Never use gold anywhere beyond its three sanctioned contexts (featured pricing card, premium badge, the gradient's warm stop).
- Never set body paragraphs or prose in Geist Mono — mono is for extracted-text previews, code-like content, and technical eyebrow labels only.
- Never use weight 700+ on Geist anywhere except the logotype.
- Never mix the pill button scale and the 6px button scale on the same screen.
- Never use `position: fixed` except for the sidebar and dialogs/dropdowns (Radix/shadcn portal pattern, not manual `fixed`).
