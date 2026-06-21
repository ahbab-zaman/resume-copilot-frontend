# AGENTS.md — Frontend (AI Resume Job Pilot)

> **Read this file first, every session, before touching any code.** It is the entry point. After this, read `context/project-overview.md` and `context/architecture.md` in full before starting any feature, then only the other `context/` files relevant to what you're building.

---

## 1. Project Overview

AI Resume Job Pilot is a two-repo application. **This repo is the frontend** — Next.js, all UI, and all authentication. It talks to a separate Express backend over a documented REST API; it never runs AI calls, never queries Postgres for business data, and never generates PDFs itself.

One-line product description: upload a resume + paste a job description → get an ATS match score, an AI-optimized resume, a tailored cover letter, and mock interview questions, then track applications in a Kanban board.

---

## 2. Core Technologies

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Auth**: better-auth — email/password + Google OAuth, JWT plugin enabled (this repo owns 100% of authentication)
- **Drag and drop**: `@dnd-kit/core` (Kanban board)
- **Forms**: `react-hook-form` + `zod`

This repo has **no** database query layer of its own beyond better-auth's own tables, **no** AI SDKs, **no** PDF generation. If a task seems to need any of those, it belongs in the backend repo instead — say so rather than installing them here.

---

## 3. Project Structure

```
/
├── AGENTS.md                      ← this file
├── context/                       ← read after this file
│   ├── project-overview.md
│   ├── architecture.md
│   ├── build-plan.md
│   ├── progress-tracker.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── ui-rules.md
│   ├── ui-tokens.md
│   └── ui-registry.md
├── skills/                        ← /architect /imprint /recover /remember /review
├── app/
│   ├── layout.tsx
│   ├── page.tsx                   → Landing page
│   ├── (marketing)/pricing/page.tsx
│   ├── (auth)/login/page.tsx
│   ├── (auth)/register/page.tsx
│   ├── (app)/                     → authenticated shell, sidebar layout, auth guard
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── copilot/page.tsx
│   │   ├── resumes/page.tsx
│   │   ├── applications/page.tsx
│   │   ├── interview/page.tsx
│   │   └── settings/page.tsx
│   └── api/auth/[...all]/route.ts → better-auth handler — the only API route in this repo
├── components/
│   ├── ui/                        → shadcn/ui only
│   ├── layout/                    → Sidebar, Navbar, Footer
│   ├── landing/
│   ├── copilot/
│   ├── resumes/
│   ├── applications/
│   ├── interview/
│   └── settings/
├── lib/
│   ├── auth.ts                    → better-auth server instance
│   ├── auth-client.ts             → better-auth React client
│   ├── api-client.ts              → fetch wrapper, calls the backend with a Bearer JWT
│   └── utils.ts
└── types/
    └── api.ts                     → hand-kept mirror of the backend's response shapes
```

---

## 4. Page Structure

### 4.1 Public Pages

- **Landing** (`app/page.tsx`)
- **Pricing** (`app/(marketing)/pricing/page.tsx`)
- **Login** (`app/(auth)/login/page.tsx`) — email/password + Google OAuth
- **Register** (`app/(auth)/register/page.tsx`) — email/password + Google OAuth

### 4.2 Authenticated App (sidebar layout)

- **Dashboard** (`app/(app)/dashboard/page.tsx`) — stat cards, recent activity, quick actions
- **Copilot** (`app/(app)/copilot/page.tsx`) — the flagship flow: upload resume + paste JD → ATS score, optimized resume, cover letter, interview questions
- **Resumes** (`app/(app)/resumes/page.tsx`) — list, rename, delete, set active, download
- **Applications** (`app/(app)/applications/page.tsx`) — Kanban tracker
- **Interview** (`app/(app)/interview/page.tsx`) — standalone mock interview practice
- **Settings** (`app/(app)/settings/page.tsx`) — profile, theme, delete account

There is no `/profile/subscription`, no `/dashboard/home` separate from `/dashboard`, and no per-resume edit/view/download sub-routes — resume actions are dialogs/buttons on the single `/resumes` list page, not separate pages. Do not add pages beyond the six above without checking `project-overview.md`'s "Features Out of Scope" list first.

---

## 5. API Integration

All calls to the backend go through `lib/api-client.ts` — never call `fetch` against the backend URL anywhere else. Every call attaches a fresh Bearer JWT from better-auth. Every response is shaped `{ success: boolean, data?: T, error?: string }`.

### Endpoints this repo calls (full contract lives in `context/architecture.md`)

| Method                | Path                             | Purpose                      |
| --------------------- | -------------------------------- | ---------------------------- |
| POST                  | `/api/resumes`                   | Upload resume PDF            |
| GET                   | `/api/resumes`                   | List resumes                 |
| PATCH                 | `/api/resumes/:id`               | Rename / set active          |
| DELETE                | `/api/resumes/:id`               | Delete                       |
| POST                  | `/api/analyses`                  | Run Copilot ATS analysis     |
| GET                   | `/api/analyses/:id`              | Fetch a saved analysis       |
| POST                  | `/api/analyses/:id/optimize`     | Generate optimized resume    |
| POST                  | `/api/analyses/:id/cover-letter` | Generate cover letter        |
| POST                  | `/api/interview`                 | Generate interview questions |
| GET/POST/PATCH/DELETE | `/api/applications`              | Application CRUD             |
| GET                   | `/api/dashboard/stats`           | Stat card counts             |
| GET                   | `/api/dashboard/activity`        | Recent activity feed         |

There is no `/api/auth/login` or `/api/auth/signup` on the backend — auth never goes through `api-client.ts`, it goes through `authClient` (better-auth) directly, entirely within this repo.

---

## 6. Authentication

This repo owns authentication completely via better-auth:

- `lib/auth.ts` — server instance, email/password + Google OAuth, JWT plugin (required — this is what lets the backend verify requests)
- `lib/auth-client.ts` — the only auth import allowed in Client Components
- `middleware.ts` / the `(app)/layout.tsx` guard — protects `/dashboard`, `/copilot`, `/resumes`, `/applications`, `/interview`, `/settings`
- Sessions stored in httpOnly cookies, managed entirely by better-auth — never write custom token or password code anywhere in this repo

---

## 7. Context Files — Read in This Order

1. `context/project-overview.md` — what's being built and why
2. `context/architecture.md` — the frontend/backend boundary, the full REST contract, the auth handshake
3. `context/build-plan.md` — what's built in what order, and which parts are frontend/backend/both
4. `context/progress-tracker.md` — what's actually done so far in _this_ repo
5. `context/code-standards.md` — how code in this repo must be written
6. `context/library-docs.md` — exact usage patterns for Next.js, better-auth, shadcn, drag-and-drop
7. `context/ui-rules.md` + `context/ui-tokens.md` — visual rules and design tokens
8. `context/ui-registry.md` — what's already been built, to match before inventing something new

---

## 8. Skills Installed

All in `/.agents/skills/`. Use them — don't skip them because a task feels small.

| Skill                                  | When to run it                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `/architect`                           | Before building any new feature — think it through and confirm a plan first                       |
| `/imprint`                             | After building any UI component — capture its patterns to `ui-registry.md`. **Frontend only.**    |
| `/review`                              | After finishing any feature — verify it against the plan, the architecture, and the design system |
| `/recover`                             | The moment something goes wrong — diagnose before re-prompting                                    |
| `/remember save` / `/remember restore` | End / start of every session                                                                      |

---

## 9. UI Guidelines

- Tailwind v4, tokens via `@theme` in `globals.css` — never hardcode hex values or use Tailwind's built-in color classes.
- Sidebar nav for the authenticated app (six items), simple top navbar for public pages.
- Font is Inter via `next/font/google`.
- Full detail in `context/ui-rules.md` and `context/ui-tokens.md`.

---

## 10. Development Workflow

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — lint
- Backend must be running separately (see backend repo's own `AGENTS.md`) for any page beyond static UI with mock data to work end to end.

---

## 11. Environment Variables

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
DATABASE_URL=postgresql://neondb_owner:npg_0s6fwVvqmIQT@ep-flat-moon-adexcgwo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
BETTER_AUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Never put `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, or any backend-only secret in this repo's environment — this repo never calls those services.

---

## 12. Best Practices & Invariants

- TypeScript strict, no `any`.
- Server Components by default; `"use client"` only when state/effects/browser APIs/event listeners require it.
- The only API route in this entire repo is `app/api/auth/[...all]/route.ts`. Do not add others — backend logic belongs in the Express repo.
- Every data-fetching component has a loading state and an error state — no silent failures.
- Never show a raw error string from the backend without checking it's already human-readable (it should be, per the backend's contract).

---

## 13. Security

- Sessions in httpOnly cookies, managed entirely by better-auth.
- Every backend call carries a short-lived Bearer JWT, fetched fresh per request — never cached across requests.
- Sanitize and validate all form inputs client-side with `zod` before sending — the backend re-validates everything regardless, but don't rely on it as the only check.
- Never log a JWT, OAuth token, or any `.env` value to the console or to `memory.md`.
