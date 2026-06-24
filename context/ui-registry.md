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
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface` |
| Border | `border-b border-border/80`, `border border-border` |
| Border radius | `rounded-[12px]`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `h-16`, `h-8`, `px-4 py-2`, `px-3 py-2` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90`, `hover:text-text-primary` |
| Shadow | `none` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
Public navigation uses a sticky surface bar, compact pill links, and a strong primary CTA when logged out. The public links now resolve to dedicated marketing routes, while the landing-page sections still handle intra-page anchors elsewhere on the page. When a session exists, the right-side controls hand off to the account dropdown instead of showing auth CTAs.

### Navbar Actions Dropdown

File: `src/components/layout/NavbarActions.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface/95` |
| Border | `border border-border`, `border-t border-border` |
| Border radius | `rounded-sm`, `rounded-md`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `h-8`, `px-3 py-2`, `p-2` |
| Hover state | `hover:bg-surface-secondary`, `hover:text-text-primary`, `hover:opacity-90` |
| Shadow | `shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
Logged-in users see a compact account button with a dropdown that includes the main app routes plus sign out. On mobile, the same control opens an opaque canvas-backed drawer so the menu never reads as transparent. Keep this menu token-only and aligned to the top-right of the navbar.

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
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--color-border) inset` |
| Accent usage | `bg-accent`, `bg-accent-light`, `bg-accent/70`, `bg-teal/70` |

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
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--color-border) inset` |
| Accent usage | `bg-accent-light`, `bg-success-light`, `bg-teal-light`, `bg-warning-light` |

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
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--color-border) inset` |
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
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--color-border) inset` |
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
| Shadow | `0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--color-border) inset` |
| Accent usage | `none` |

**Pattern notes:**
FAQ cards stay deliberately plain. The only variation is a single highlighted accordion row using `bg-surface-secondary`.

### Footer

File: `src/components/layout/Footer.tsx`
Last updated: `2026-06-23`

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
Footer repeats the same logo treatment as the navbar and keeps links low-contrast. It should remain visually quiet relative to the hero and CTA, and only point to real public destinations.

### Call To Action

File: `src/components/landing/CallToAction.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-background`, `bg-surface`, `bg-surface-secondary`, `bg-gradient-to-br` |
| Border | `border border-border` |
| Border radius | `rounded-[24px]`, `rounded-[18px]`, `rounded-[100px]` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary` |
| Spacing | `px-4 py-16`, `px-6 py-6`, `px-6 py-10` |
| Hover state | `hover:bg-surface-secondary` |
| Shadow | `shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]`, `shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.08),0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `bg-accent-light`, `bg-accent-deep` |

**Pattern notes:**
The CTA now layers the hero-style radial gradient behind an inverted callout card, so the ending band feels connected to the landing hero without reusing the hero mesh directly as a card fill. Keep the outer wrapper roomy and the inner action pill clean and high-contrast.

### Auth Form

File: `src/components/auth/AuthForm.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-error-light` |
| Border | `border border-border`, `border-error/30` |
| Border radius | `rounded-[16px]`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-error-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-8`, `mt-6`, `mt-8`, `px-3 py-2` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90`, `active:scale-[0.98]` |
| Shadow | `0 2px 2px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(0,0,0,0.04), 0 0 0 1px var(--color-border) inset` |
| Accent usage | `bg-accent`, `bg-google` |

**Pattern notes:**
Public auth uses a centered, surface card with a two-column page shell on wide screens, compact 6px controls, and a single strong primary action. Error messaging stays token-based and the Google button uses the dedicated brand token, not a generic blue.

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
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `text-on-primary`, `bg-success-light` |

**Pattern notes:**
Resume management stays in the in-app register: compact cards, table rows, and small 6px-radius controls. Upload, rename, set-active, and delete actions all use the same token set as the sidebar shell, and the active state is represented with a semantic badge instead of a custom color.

### Phase 3 Design Pass Additions

File: `src/components/layout/AppChrome.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-background`, `bg-surface` |
| Border | `border-b border-border`, `border-l border-border`, `border-r border-border` |
| Border radius | `rounded-sm`, `rounded-md` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `h-12`, `px-4`, `p-4`, `py-6` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `text-on-primary` |

**Pattern notes:**
The app chrome now owns the responsive top bar and mobile drawer, while the sidebar stays as the desktop navigation surface. Keep this shell token-only and fixed to the in-app 6px register.

File: `src/components/landing/RevealSection.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `none` |
| Border | `none` |
| Border radius | `none` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `translate-y-4`, `opacity-0`, `opacity-100` |
| Hover state | `none` |
| Shadow | `none` |
| Accent usage | `none` |

**Pattern notes:**
Marketing sections use this wrapper for the one-time scroll reveal. It should only control transform and opacity, with no extra chrome.

File: `src/components/shared/UploadDropzone.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border-2 border-dashed border-border-strong`, `border-accent` |
| Border radius | `rounded-md`, `rounded-full` |
| Text - primary | `text-text-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `mt-4`, `mt-2` |
| Hover state | `hover:bg-surface-secondary` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `border-accent` |

**Pattern notes:**
Reusable upload chrome for Copilot and the resumes modal. Keep it minimal, drag-safe, and token-only.

File: `src/components/landing/HowItWorks.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface-secondary`, `bg-surface` |
| Border | `border border-border` |
| Border radius | `rounded-[12px]` |
| Text - primary | `text-text-primary`, `text-accent` |
| Text - secondary | `text-text-secondary` |
| Spacing | `px-4 py-16`, `p-6`, `mt-12` |
| Hover state | `none` |
| Shadow | `0 2px 2px rgba(0,0,0,0.04), 0 8px 8px -8px rgba(0,0,0,0.04), 0 0 0 1px var(--color-border) inset` |
| Accent usage | `bg-accent` |

**Pattern notes:**
Landing step cards use the marketing register with a simple numbered flow and the same stacked shadow treatment as the other marketing cards.

File: `src/components/landing/AtsPreview.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border border-border` |
| Border radius | `rounded-[16px]`, `rounded-[14px]`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted`, `text-success-foreground`, `text-warning-foreground`, `text-error-foreground` |
| Spacing | `p-6`, `p-5`, `mt-4`, `mt-5` |
| Hover state | `none` |
| Shadow | `0 2px 2px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(0,0,0,0.04), 0 0 0 1px var(--color-border) inset` |
| Accent usage | `bg-success-light`, `bg-warning-light`, `bg-error-light`, `bg-accent` |

**Pattern notes:**
The landing ATS preview is a static, honest mock of the real analysis layout. Keep it marketing-friendly but still visibly rooted in the in-app score system.

File: `src/components/settings/SettingsWorkspace.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-accent-light`, `bg-success-light`, `bg-error-light` |
| Border | `border border-border`, `border-error/30`, `border-success/30` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-accent`, `text-success-foreground`, `text-error-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `mt-2`, `mt-3`, `mt-4`, `mt-5` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `bg-accent-light`, `bg-success-light`, `bg-error-light` |

**Pattern notes:**
Settings now uses a left-side tab rail on desktop, a horizontal tab row on smaller screens, a locked-light appearance card, and a typed-email account deletion confirmation.

### Copilot Workspace

File: `src/components/copilot/CopilotWorkspace.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-border`, `bg-error-light`, `bg-success-light`, `bg-warning-light`, `bg-accent-light` |
| Border | `border border-border`, `border-accent`, `border-error-light` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-success`, `text-warning`, `text-error`, `text-accent` |
| Text - secondary | `text-text-secondary`, `text-text-muted`, `text-success-foreground`, `text-warning-foreground`, `text-error-foreground` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `px-2 py-0.5`, `mt-2`, `mt-3`, `mt-4`, `mt-5` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `bg-success-light`, `bg-warning-light`, `bg-error-light`, `bg-accent-light` |

**Pattern notes:**
Copilot uses the in-app register exclusively: dense 16px cards, 6px controls, and rounded status chips. The page combines a three-column work area with a tabbed output panel, the resume tab uses a two-panel compare layout with a scrollable source-text pane on the left and a structured rewrite pane on the right, the cover-letter tab follows the same dense pattern with a tone selector and editable draft textarea, and the interview tab now uses a focused single-question layout with a compact navigator, large centered question card, and only the current practice controls. Keep those compare/editor patterns and token-based chips consistent with the rest of the authenticated shell rather than introducing a marketing-style treatment.

### Interview Question Card

File: `src/components/interview/QuestionCard.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary` |
| Border | `border border-border` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-4`, `mt-2`, `mt-4`, `px-3 py-2`, `h-8` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent` |

**Pattern notes:**
This is the reusable interview practice card for Copilot and the standalone interview page. Keep the answer toggle compact, keep the next-question action visually primary when it is shown, and preserve the same dense in-app register used by the rest of Copilot rather than introducing a larger marketing-style card. In list mode, the same card can render without the next-question button while keeping the answer reveal and count chip intact.

### Interview Workspace

File: `src/components/interview/InterviewWorkspace.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-error-light` |
| Border | `border border-border`, `border-error-light` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-error-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `mt-2`, `mt-3`, `mt-4` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent` |

**Pattern notes:**
The standalone interview page uses the same dense in-app register as Copilot, but it is more structured: a setup card, an empty state when no session exists, a live session details panel, and three category sections for Technical, Behavioral, and HR. It should stay token-only and never fall back to mock question data once the backend is connected.

### Applications Workspace

File: `src/components/applications/ApplicationsWorkspace.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-background/70` |
| Border | `border border-border` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-error-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `py-0.5`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `min-h-[160px]` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `ring-accent`, `bg-accent-light`, `bg-teal-light`, `bg-success-light`, `bg-error-light`, `bg-success` |

**Pattern notes:**
The applications tracker is a dense Kanban board in the in-app register: hero summary, stats row, filter bar, five status columns, draggable cards, and modal dialogs for create/edit/delete flows. Keep status chips token-based, keep drag feedback to the single accent ring, and keep all interactions in the same 6px-radius system used by the rest of the authenticated shell.

### Dashboard Workspace

File: `src/components/dashboard/DashboardWorkspace.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-warning-light`, `bg-accent-light`, `bg-teal-light`, `bg-success-light` |
| Border | `border border-border`, `border border-warning-light`, `border-success`, `border-border` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-warning-foreground`, `text-accent`, `text-teal-foreground`, `text-success-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `gap-2`, `gap-3`, `gap-4`, `gap-5`, `space-y-3`, `space-y-6` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `bg-warning-light`, `bg-accent-light`, `bg-teal-light`, `bg-success-light` |

**Pattern notes:**
Dashboard stays in the in-app register and combines a neutral hero, a warning resume-attention banner, four stat cards, a recent-activity feed, a weekly focus checklist, and a quick-actions rail. Keep it dense, token-only, and utility-first. The real-data version keeps the same visual language while adding loading, empty, and error states inside the same surface/card pattern.

### Settings Workspace

File: `src/components/settings/SettingsWorkspace.tsx`
Last updated: `2026-06-23`

| Property | Class |
| --- | --- |
| Background | `bg-surface`, `bg-surface-secondary`, `bg-warning-light`, `bg-accent-light`, `bg-success-light`, `bg-error-light` |
| Border | `border border-border`, `border border-warning-light`, `border border-error-light`, `border-error/30`, `border-success/30` |
| Border radius | `rounded-md`, `rounded-sm`, `rounded-full` |
| Text - primary | `text-text-primary`, `text-on-primary`, `text-warning-foreground`, `text-accent`, `text-success-foreground`, `text-error-foreground` |
| Text - secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | `p-6`, `p-4`, `px-3 py-2`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `space-y-3`, `space-y-4`, `space-y-6` |
| Hover state | `hover:bg-surface-secondary`, `hover:opacity-90` |
| Shadow | `shadow-[0_0_0_1px_var(--color-border)_inset]` |
| Accent usage | `bg-accent`, `bg-accent-light`, `bg-success-light`, `bg-warning-light`, `bg-error-light` |

**Pattern notes:**
Settings keeps the dense in-app register but adds three distinct surfaces: a profile form, a local-only theme chooser, and a destructive account-delete block. Preserve the same compact 6px controls, token-based semantic chips, and explicit confirmation pattern for dangerous actions. The theme selector is intentionally stateful without introducing a global dark-mode visual treatment yet.

