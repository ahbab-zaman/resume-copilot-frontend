# UI Registry — Frontend

> **Used in:** Frontend repo only. Living document, updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

## How to Use

Before building any component:

1. Check if a similar component already exists here.
2. If yes — match its exact classes.
3. If no — build it following `ui-rules.md` and `ui-tokens.md`, then add it here.

After building any component — update this file with the component name, file path, and exact classes used.

---

## Baseline

This project's design tokens are adapted from the Vercel design system — full token values, typography scale, spacing, radius, and elevation levels live in `ui-tokens.md`; application rules (marketing vs. in-app registers, sidebar, buttons, badges) live in `ui-rules.md`. Read both before building anything new. Any class used below should trace back to a token defined there — if it doesn't, that's a violation to flag during `/review`, not a new pattern to record here.

## Components

### Landing Page Shell

File: `src/app/page.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-background`, `bg-surface`, `bg-surface-secondary`, `bg-accent` |
| Border | `border border-border`, `border-b border-border`, `border border-border/80` |
| Border radius | `rounded-[100px]`, `rounded-[34px]`, `rounded-[28px]`, `rounded-[24px]`, `rounded-[20px]`, `rounded-[16px]`, `rounded-[12px]`, `rounded-sm`, `rounded-full` |
| Text â€” primary | `text-text-primary`, `text-on-primary` |
| Text â€” secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-4 py-14`, `px-4 py-16`, `px-4 py-10`, `px-6 py-20`, `p-6`, `p-5`, `p-4` |
| Hover state | `hover:bg-surface-secondary`, `hover:bg-white/15`, `hover:opacity-90`, `hover:text-text-primary` |
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `bg-accent`, `text-on-primary`, `bg-violet`, `bg-violet-light`, `bg-success-light`, `bg-link-bg-soft` |

**Pattern notes:**
Marketing pages use the pill CTA scale and larger card radii exclusively. The landing page hero is the only place where the mesh-gradient treatment appears, and it stays behind the hero content rather than inside any card. Hero, feature, pricing, FAQ, and CTA sections all reuse the same white-card, hairline-border, stacked-shadow treatment so the page reads as one system. Mobile preview content is a static mock of the desktop layout and should keep the same border language and typography scale if it is refined later.
