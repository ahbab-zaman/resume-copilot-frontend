# Design Spec — Landing Page (`/`)

> **Used in:** Frontend repo only. Build alongside Feature 15 in `build-plan.md`. Read `ui-rules.md`'s Motion and Responsive sections before building any of this — this file assumes those rules and only adds page-specific layout/copy-structure detail.

## Section Order

1. Navbar (see `navbar-footer.md`)
2. Hero
3. Logo Strip (optional — "Trusted by job seekers at" — use only if you have real testimonial-adjacent signal; skip silently rather than inventing fake logos)
4. Features (3-up)
5. How It Works (3-step)
6. ATS Analysis Preview (a static, real-looking mock of the Copilot's score dashboard)
7. Testimonials (3-up, dummy data clearly fine for now)
8. FAQ (accordion)
9. Bottom CTA band
10. Footer

---

## 1. Hero (`hero-band`)

### Desktop (≥992px)

- Full-bleed `bg-canvas`, `padding-top: 96px` (below the 64px fixed navbar, plus `spacing.3xl` breathing room), `padding-bottom: spacing.5xl`.
- Aurora gradient (the only place it appears — use the `.aurora-gradient` utility class from globals.css) rendered as an absolutely-positioned layer behind the content, occupying roughly the top 60% of the band, radial-fading to transparent toward the bottom so it doesn't fight with the content below.
- Content stack, centered, `max-w-3xl mx-auto text-center`:
  - Small `caption-mono` eyebrow badge ("AI-POWERED JOB APPLICATIONS"), pill chrome, `bg-canvas-soft`, `mb-6`.
  - Headline: `display-xl`, sentence-case, period-terminated — e.g. "Land your next role, faster."
  - Lead paragraph: `body-lg`, `text-text-secondary`, `max-w-xl mx-auto`, `mt-4`.
  - CTA row, `mt-8`, `gap-4`: `button-primary` ("Get Started Free") + `button-secondary` ("See How It Works" → scrolls to section 5).
- Entrance animation on page load (not scroll-triggered, since it's above the fold): eyebrow → headline → lead → CTAs fade+translateY(12px→0) in sequence, 100ms stagger, `duration-hero`/`ease-emphasized`.

### Tablet (576–991px)

- Same structure, `max-w-2xl`, headline drops to `display-lg` (32px) to avoid 4+ line wraps.

### Mobile (<576px)

- `padding-top: 80px`, headline at `display-md` (24px) per the typography-scaling rule in `ui-rules.md`.
- CTA row stacks vertically, full-width buttons.
- Aurora gradient still renders but scaled/cropped to roughly the top 40% of the band — never hidden entirely, it's the brand's signature.

---

## 2. Features (3-up `card-marketing`)

- Section header centered above the grid: `display-lg`, e.g. "Everything you need to apply, faster."
- Three cards: **ATS Scoring**, **AI Resume Optimizer**, **Cover Letter + Interview Prep** (consolidate the 5 backend features into 3 marketing-friendly groupings — don't list all 5 as separate cards, it reads as cluttered).
- Each card: icon (lucide-react, 32px, `text-accent`) top, `display-sm` card title, `body-md` description, Elevation Level 3.
- Scroll-reveal: cards stagger in (40ms apart) as the section enters viewport, per `ui-rules.md`'s scroll-trigger rule.
- Responsive: 3-up desktop → 2-up tablet (third card wraps to its own row, centered) → 1-up mobile.

---

## 3. How It Works (3-step, numbered)

- Horizontal stepper desktop: three steps connected by a thin dashed `border-border` line. Each step: large numeral (`display-md`, `text-accent`) + `display-sm` step title + `body-md` description.
- Steps: "1. Upload your resume" → "2. Paste the job description" → "3. Get your full application kit."
- Tablet/Mobile: stepper becomes vertical, numerals left-aligned with a vertical connecting line instead of horizontal.

---

## 4. ATS Analysis Preview

- A non-interactive, realistic-looking static mockup of the actual `AtsScoreDashboard` component from `/copilot` (reuse the real component with hardcoded demo data rather than building a separate fake one — keeps it honest and reduces duplicate code).
- Framed inside a `card-marketing-large`, Elevation Level 4, sitting on a `bg-canvas-soft` section band for contrast against the white cards above/below.
- Caption below: `body-sm`, `text-text-muted`, "Real output from an actual analysis."

---

## 5. Testimonials (3-up)

- `card-soft` chrome. Quote (`body-md`), then a small footer row: avatar placeholder (32px circle, initials), name (`body-sm-strong`), role (`caption`, `text-text-muted`).
- Dummy data is fine — keep it realistic and specific ("Got 3 interview callbacks in the first week" beats generic praise).
- Responsive: 3-up → 2-up → 1-up, same pattern as Features.

---

## 6. FAQ (accordion)

- Single column, `max-w-2xl mx-auto`. Each item: question (`body-md-strong`) + chevron, click expands answer (`body-md`, `text-text-secondary`) — `duration-moderate`/`ease-emphasized`, chevron rotates 180deg.
- Only one item open at a time (standard accordion behavior, not multi-expand).

---

## 7. Bottom CTA Band

- `showcase-band-dark` treatment: `bg-accent` (coral), `text-on-primary`, centered content, `display-lg` headline ("Ready to apply smarter?"), single `button-secondary` (white pill on the coral background — the one place the secondary button appears solo, no primary pairing, since the whole band IS the CTA).

---

## Page-Level Notes

- Total page should not feel like a wall of equal-weight sections — alternate `bg-canvas` and `bg-canvas-soft` band backgrounds section-to-section (Hero: canvas, Features: canvas, How It Works: canvas-soft, ATS Preview: canvas-soft, Testimonials: canvas, FAQ: canvas, Bottom CTA: accent) to create visual rhythm without adding new colors.
- Run `/imprint` after this page is built — it establishes the marketing-card and scroll-reveal patterns every other marketing surface (Pricing) should match.
