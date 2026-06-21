# UI Registry - Frontend

> **Used in:** Frontend repo only. Living document, updated after every component is built. Read this before building any new component - match existing patterns exactly before inventing new ones.

## How to Use

Before building any component:

1. Check if a similar component already exists here.
2. If yes - match its exact classes.
3. If no - build it following `ui-rules.md` and `ui-tokens.md`, then add it here.

After building any component - update this file with the component name, file path, and exact classes used.

## Baseline

This project's design tokens are adapted from the Vercel design system - full token values, typography scale, spacing, radius, and elevation levels live in `ui-tokens.md`; application rules (marketing vs. in-app registers, sidebar, buttons, badges) live in `ui-rules.md`. Read both before building anything new. Any class used below should trace back to a token defined there - if it doesn't, that's a violation to flag during `/review`, not a new pattern to record here.

## Components

### Landing Page Shell

File: `src/app/page.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-background` |
| Border | `none` |
| Border radius | `none` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary` |
| Spacing | `min-h-screen` |
| Hover state | `none` |
| Shadow | `none` |
| Accent usage | `none` |

**Pattern notes:**
Composition-only route. The visual patterns now live in reusable landing/layout components instead of the route file.

### Public Navbar

File: `src/components/layout/Navbar.tsx`
Last updated: `2026-06-22`

| Property | Class |
| --- | --- |
| Background | `bg-background`, `bg-surface` |
| Border | `border-b border-border/80`, `border border-border` |
| Border radius | `rounded-[12px]`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `h-16`, `h-8`, `px-4 py-2`, `px-3 py-2` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90`, `hover:text-text-primary` |
| Shadow | `none` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
Public navigation uses a sticky bar, compact pill links, and a strong primary CTA when logged out. When a session exists, the right-side controls hand off to the account dropdown instead of showing auth CTAs.

### Navbar Actions Dropdown

File: `src/components/layout/NavbarActions.tsx`
Last updated: `2026-06-22`

| Property | Class |
| --- | --- |
| Background | `bg-surface` |
| Border | `border border-border`, `border-t border-border` |
| Border radius | `rounded-sm`, `rounded-md`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `h-8`, `px-3 py-2`, `p-2` |
| Hover state | `hover:bg-surface-secondary`, `hover:text-text-primary`, `hover:opacity-90` |
| Shadow | `shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
Logged-in users see a compact account button with a dropdown that includes the main app routes plus sign out. Keep this menu token-only and aligned to the top-right of the navbar.

### Hero Section

File: `src/components/landing/Hero.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-background`, `bg-surface`, `bg-surface-secondary`, `bg-accent` |
| Border | `border border-border`, `border-b border-border`, `border-t border-border` |
| Border radius | `rounded-[100px]`, `rounded-[24px]`, `rounded-[16px]`, `rounded-[14px]`, `rounded-[12px]`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-4 py-14`, `px-4 py-10`, `p-5`, `p-4` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `bg-accent`, `bg-violet`, `bg-violet-light`, `bg-success-light` |

**Pattern notes:**
Hero is the only place where the mesh-gradient treatment appears. Keep it behind the content, never as a card fill.

### Landing Feature Sections

File: `src/components/landing/Features.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-background`, `bg-surface-secondary` |
| Border | `border border-border`, `border-b border-border` |
| Border radius | `rounded-[20px]`, `rounded-[12px]`, `rounded-[10px]`, `rounded-full` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-4 py-16`, `px-4 py-10`, `p-6`, `p-5`, `p-4` |
| Hover state | `none` |
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `bg-violet-light`, `bg-success-light`, `bg-link-bg-soft`, `bg-warning-light` |

**Pattern notes:**
These sections rely on white or surface cards with hairline borders and stacked shadows. The stat band uses token-based semantic backgrounds only.

### Social Proof

File: `src/components/landing/SocialProof.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border border-border` |
| Border radius | `rounded-[20px]`, `rounded-[16px]`, `rounded-full` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-4 py-16`, `p-6`, `p-5` |
| Hover state | `none` |
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
Social proof stays neutral and uses chips for emphasis instead of filled cards. Keep testimonial cards aligned with the rest of the white-card treatment.

### Pricing Cards

File: `src/components/landing/Pricing.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-background`, `bg-accent` |
| Border | `border border-border`, `border-accent` |
| Border radius | `rounded-[16px]`, `rounded-[12px]`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary` |
| Spacing | `px-4 py-16`, `p-6`, `mt-6`, `mt-4` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `bg-accent`, `text-on-primary`, `bg-success` |

**Pattern notes:**
The featured tier is the only inverted card on the page. All other pricing cards stay neutral and use token borders plus stacked shadows.

### FAQ Cards

File: `src/components/landing/Faq.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border border-border` |
| Border radius | `rounded-[16px]` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-4 py-16`, `p-5` |
| Hover state | `none` |
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `none` |

**Pattern notes:**
FAQ cards stay deliberately plain. The only variation is a single highlighted accordion row using `bg-surface-secondary`.

### Footer

File: `src/components/layout/Footer.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface` |
| Border | `border-t border-border` |
| Border radius | `rounded-[12px]` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-4 py-12`, `mt-10`, `p-6` |
| Hover state | `hover:text-text-primary` |
| Shadow | `none` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
Footer repeats the same logo treatment as the navbar and keeps links low-contrast. It should remain visually quiet relative to the hero and CTA.

### Auth Form

File: `src/components/auth/AuthForm.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-error-light` |
| Border | `border border-border`, `border-error/30` |
| Border radius | `rounded-lg`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-error-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-8`, `mt-6`, `mt-8`, `px-3 py-2` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `0 2px 2px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(0,0,0,0.04), 0 0 0 1px var(--border) inset` |
| Accent usage | `bg-accent`, `bg-google` |

**Pattern notes:**
Public auth uses a centered, surface card with a two-column feel on wide screens and a single strong primary action. Error messaging stays token-based and the Google button uses the dedicated brand token, not a generic blue.

### Authenticated Sidebar

File: `src/components/layout/Sidebar.tsx`
Last updated: `2026-06-21`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border-r border-border`, `border-t border-border`, `border border-border` |
| Border radius | `rounded-sm` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `px-5 py-6`, `px-3 py-4`, `p-4`, `p-3` |
| Hover state | `hover:bg-surface-secondary`, `hover:text-text-primary`, `hover:opacity-90` |
| Shadow | `none` |
| Accent usage | `bg-accent` |

**Pattern notes:**
Authenticated navigation keeps the shell compact and utility-first: fixed 240px column, hairline dividers, one active left border, and a pinned user card at the bottom. It should stay visually quieter than the marketing pages and never use the pill-button register.

### Resume Manager

File: `src/components/resumes/ResumeManager.tsx`
Last updated: `2026-06-22`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border border-border`, `border-b border-border` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-success-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-5`, `p-4`, `px-4 py-4`, `px-3 py-2`, `h-10`, `h-8` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--border)_inset]` |
| Accent usage | `bg-accent`, `text-on-primary`, `bg-success-light` |

**Pattern notes:**
Resume management stays in the in-app register: compact cards, table rows, and small 6px-radius controls. Upload, rename, set-active, and delete actions all use the same token set as the sidebar shell, and the active state is represented with a semantic badge instead of a custom color.

### Copilot Workspace

File: `src/components/copilot/CopilotWorkspace.tsx`
Last updated: `2026-06-22`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-border`, `bg-error-light`, `bg-success-light`, `bg-warning-light`, `bg-link-bg-soft` |
| Border | `border border-border`, `border-accent`, `border-error-light` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-success`, `text-warning`, `text-error`, `text-link-deep` |
| Text - secondary | `text-text-secondary`, `text-text-muted`, `text-success-foreground`, `text-warning-foreground`, `text-error-foreground` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `px-2 py-0.5`, `mt-2`, `mt-3`, `mt-4`, `mt-5` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--border)_inset]` |
| Accent usage | `bg-accent`, `bg-success-light`, `bg-warning-light`, `bg-error-light`, `bg-link-bg-soft` |

**Pattern notes:**
Copilot uses the in-app register exclusively: dense 16px cards, 6px controls, and rounded status chips. The page combines a three-column work area with a tabbed output panel, but the visual language stays aligned to the rest of the authenticated shell rather than introducing a marketing-style treatment.
