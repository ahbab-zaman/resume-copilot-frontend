# AI Resume Job Pilot — Frontend

Next.js 16 frontend for the AI Resume Job Pilot platform. Handles all UI, authentication, and client-side state. Communicates with a separate Express backend for AI analysis and data persistence.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** (App Router) | React framework |
| **TypeScript 5** (strict) | Language |
| **Tailwind CSS v4** | Utility-first styling with custom design tokens |
| **better-auth** | Authentication (email/password + Google OAuth, JWT) |
| **Redux Toolkit** | UI state management (sidebar, theme, active resume) |
| **TanStack React Query 5** | Server state management & caching |
| **PostgreSQL** | better-auth's own user/session tables |

## Pages & Routes

### Public Pages
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Marketing landing: Hero, Features, How It Works, ATS Preview, Testimonials, FAQ, Pricing, CTA |
| `/pricing` | `PricingPage` | Pricing tiers comparison |
| `/contact` | Contact form | Name, email, message submission |
| `/faq` | FAQ accordion | Frequently asked questions |

### Auth Pages
| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login form | Email/password + Google OAuth sign in |
| `/register` | Registration form | Email/password + Google OAuth sign up |

### Authenticated App (sidebar layout)
| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | `DashboardWorkspace` | Stats cards, recent activity feed, quick actions, weekly checklist |
| `/copilot` | `CopilotWorkspace` | 3-step AI workflow: analyze resume → optimize → generate cover letter & interview questions |
| `/resumes` | `ResumeManager` | Upload, list, rename, delete, set active resume |
| `/applications` | `ApplicationsWorkspace` | Kanban board: Applied / Screening / Interview / Rejected / Offer |
| `/interview` | `InterviewWorkspace` | Mock interview practice with AI-generated questions |
| `/settings` | `SettingsWorkspace` | Profile editor, theme toggle (light/dark/system), account deletion |

### API Route
| Route | Description |
|-------|-------------|
| `/api/auth/[...all]` | Better-auth Next.js handler — the only backend API route |

## Component Architecture

### Layout Hierarchy
```
Root Layout (globals.css, fonts, providers)
├── QueryProvider (TanStack React Query)
├── ReduxProvider (Redux store)
├── Public Pages
│   ├── Landing (/)
│   ├── Pricing (/pricing)
│   ├── Login/Register ((auth)/)
│   └── Contact, FAQ
└── Authenticated Shell ((app)/)
    ├── Auth Guard (session check → redirect or render)
    └── AppChrome
        ├── Sidebar (collapsible: 64px/240px)
        ├── Mobile Drawer (overlay)
        ├── Main Content (max-w-7xl centered)
        └── [Dashboard, Copilot, Resumes, Applications, Interview, Settings]
```

### Key Components

| Component | Description |
|-----------|-------------|
| `AppChrome` | Authenticated shell — sidebar navigation + content area |
| `Sidebar` | 6-item collapsible nav with active route highlighting, user card, sign-out |
| `Navbar` | Public marketing navbar with sticky positioning and mobile drawer |
| `CopilotWorkspace` | 3-step wizard: resume selection → ATS analysis → output generation (optimized resume, cover letter, interview Qs) |
| `ApplicationsWorkspace` | Kanban board with HTML5 native drag-and-drop (no library) |
| `ResumeManager` | Resume list with upload, rename, delete, set-active actions |
| `InterviewWorkspace` | Question display with category badges and follow-up questions |
| `DashboardWorkspace` | Stat cards + activity timeline + quick action grid |
| `SettingsWorkspace` | Profile editing, theme switching, account deletion |
| `UploadDropzone` | Drag-and-drop PDF uploader with validation |
| `Hero` | Animated landing hero with floating resume cards |
| `Features` | Feature showcase with animated cards |
| `SocialProof` | Infinite marquee testimonial scroll |

## State Management

### Redux Toolkit (global UI state)
| Slice | State | Purpose |
|-------|-------|---------|
| `uiSlice` | `sidebarCollapsed`, `theme` | Layout & appearance |
| `activeResumeSlice` | `resumeId` | Currently selected resume across features |

### TanStack React Query (server state)
| Hook | Endpoint | Cache Key |
|------|----------|-----------|
| `useResumes` | `GET /api/resumes` | `["resumes"]` |
| `useAnalysis` | `GET /api/analyses/:id` | `["analysis", id]` |
| `useDashboardStats` | `GET /api/dashboard/stats` | `["dashboard", "stats"]` |
| `useDashboardActivity` | `GET /api/dashboard/activity` | `["dashboard", "activity"]` |
| `useApplications` | `GET /api/applications` | `["applications"]` |
| `useGenerateInterviewQuestions` | `POST /api/interview` | Mutation |

Default stale time: 30s | Retry: 1 | refetchOnWindowFocus: disabled

## Authentication (better-auth)

- **Server instance** (`lib/auth.ts`): Email/password + Google OAuth + JWT plugin. Uses PostgreSQL for its own tables (`user`, `session`, `account`, `verification`). Marked `"server-only"`.
- **Client instance** (`lib/auth-client.ts`): Browser-side auth operations.
- **Auth guard**: `(app)/layout.tsx` is a Server Component that checks `auth.api.getSession()`. No session → redirect to `/login`.
- **JWT flow**: Every backend API call fetches a fresh short-lived Bearer JWT via `authClient.token()` and attaches it in `api-client.ts`.

## API Integration

All backend calls go through `lib/api-client.ts` — a typed fetch wrapper that:
- Attaches `Authorization: Bearer <token>` (fresh JWT from better-auth per request)
- Sets `Content-Type: application/json` automatically (except FormData)
- Returns `{ success: boolean, data?: T, error?: string }`
- Handles network errors with a human-readable fallback

Exposed functions:
- `apiFetch<T>(path, options)` — for JSON API calls
- `apiDownload(path, options)` — for file downloads (returns Blob)

### Endpoints Used

| Method | Path | Hook/Component |
|--------|------|----------------|
| `POST` | `/api/resumes` | ResumeManager (upload) |
| `GET` | `/api/resumes` | `useResumes` |
| `PATCH` | `/api/resumes/:id` | ResumeManager (rename/set active) |
| `DELETE` | `/api/resumes/:id` | ResumeManager (delete) |
| `POST` | `/api/analyses` | CopilotWorkspace |
| `GET` | `/api/analyses/:id` | `useAnalysis` |
| `POST` | `/api/analyses/:id/optimize` | `useOptimizeResume` |
| `POST` | `/api/analyses/:id/cover-letter` | `useCoverLetter` |
| `POST` | `/api/interview` | `useGenerateInterviewQuestions` |
| `GET/POST/PATCH/DELETE` | `/api/applications` | `useApplications*` |
| `GET` | `/api/dashboard/stats` | `useDashboardStats` |
| `GET` | `/api/dashboard/activity` | `useDashboardActivity` |

## Styling

- **Tailwind CSS v4** with `@import "tailwindcss"` syntax in `globals.css`
- **Custom design tokens** defined via `@theme inline`:
  - Primary: Coral `#ff5e59`
  - Secondary: Indigo-blue `#514eea`
  - Semantic colors: success, warning, error, info, teal, purple, premium (orange)
  - Full surface, border, text token system
- **Typography**: Roboto via `next/font/google`
- **Animations**: `aurora-gradient`, `float-1`–`float-4`, marquee, scroll-reveal
- **Dark mode**: Light/dark/system toggle (theme state in Redux, future implementation)
- **All UI built from scratch** with Tailwind utilities — no component library

## Design System

| Token Category | Values |
|----------------|--------|
| Border Radius | none (0), xs (2px), sm (4px), md (6px), lg (8px), xl (12px), pill (9999px) |
| Spacing | Consistent 4px base grid |
| Breakpoints | xs (360px), sm (576px), md (768px), lg (992px), xl (1200px), xxl (1400px) |
| Duration | fast (120ms), normal (200ms), slow (350ms), deliberate (500ms), hero (800ms) |
| Easing | 4 custom cubic-bezier curves |

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Backend server running at `NEXT_PUBLIC_BACKEND_URL`

### Installation

```bash
git clone <repo-url>
cd ai-resume-frontend
npm install
```

### Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
BETTER_AUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Run Auth Migrations

```bash
npm run auth:migrate
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run auth:migrate` | Run better-auth database migrations |

## Project Structure

```
src/
├── app/
│   ├── globals.css               # Tailwind v4 + custom design tokens
│   ├── layout.tsx                # Root layout (Roboto font + providers)
│   ├── page.tsx                  # Landing page
│   ├── (app)/                    # Authenticated route group
│   │   ├── layout.tsx            # Auth guard + AppChrome shell
│   │   ├── dashboard/
│   │   ├── copilot/
│   │   ├── resumes/
│   │   ├── applications/
│   │   ├── interview/
│   │   └── settings/
│   ├── (auth)/                   # Login / Register
│   ├── (marketing)/              # Pricing
│   ├── api/auth/[...all]/        # Better-auth handler (only API route)
│   ├── contact/
│   └── faq/
├── components/
│   ├── applications/             # Kanban board
│   ├── auth/                     # Login/Register form
│   ├── copilot/                  # 3-step AI workflow
│   ├── dashboard/                # Stats + activity + quick actions
│   ├── interview/                # Mock interview Q&A
│   ├── landing/                  # Marketing page sections
│   ├── layout/                   # AppChrome, Sidebar, Navbar, Footer
│   ├── resumes/                  # Resume CRUD workspace
│   ├── settings/                 # Profile, theme, account
│   └── shared/                   # UploadDropzone
├── hooks/queries/                # 5 TanStack React Query hooks
├── lib/
│   ├── api-client.ts             # Typed fetch wrapper (Bearer JWT)
│   ├── auth-client.ts            # Better-auth browser client
│   └── auth.ts                   # Better-auth server instance
├── providers/                    # QueryProvider, ReduxProvider
├── store/                        # Redux store (uiSlice, activeResumeSlice)
└── types/api.ts                  # Backend response type definitions
```

## Deployment

Configured for Vercel deployment (`.vercel/project.json`). Required environment variables:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_BACKEND_URL`
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
