# Progress Tracker

> **Used in:** Frontend repo AND Backend repo. Each repo keeps its own copy and checks off only the boxes relevant to it for shared features - update this after every completed feature.

---

## Current Status

**Phase:** Phase 8 - Settings
**Repo (frontend/backend/both):** frontend
**Last completed:** 20 Dashboard - Real Data
**Next:** 21 Settings Page

---

## Progress

### Phase 1 - Foundation

- [ ] 01 Backend Skeleton _(backend)_
- [x] 02 Frontend Skeleton + better-auth _(frontend)_ - email/password + Google OAuth working
- [ ] 03 Database Schema _(both)_
- [x] 04 Cross-Repo Auth Wiring _(both)_ - api-client fetches fresh bearer JWTs and backend verifyAuth accepts them

### Phase 2 - App Shell

- [x] 05 Sidebar + Authenticated Layout _(frontend)_ - protected app shell with sidebar and login redirect
- [x] 06 State Management Setup _(frontend)_ - QueryProvider/ReduxProvider added and root layout wrapped
- [x] 07 Landing + Pricing Pages _(frontend)_ - public landing page and pricing section are in place

### Phase 3 - Resume Manager

- [x] 08 Resumes Page - Full UI _(frontend)_ - resume library UI with upload, inline rename, delete, and set-active actions
- [x] 09 Resume Upload + Extraction _(both)_ - frontend wired to the backend resumes API

### Phase 4 - Copilot Flow

- [x] 10 Copilot Page - Full UI _(frontend)_ - dense three-column Copilot workspace with analysis input, processing states, and output tabs
- [x] 11 ATS Analysis - AI Service _(both)_ - frontend wired to the backend analyses API and renders live ATS results
- [x] 12 Resume Optimizer _(both)_ - Copilot resume tab now shows original vs optimized content and calls the backend optimize endpoint
- [x] 13 Cover Letter Generator _(both)_ - Copilot cover letter tab now calls the backend tone-based generator and lets the draft be edited locally
- [x] 14 Mock Interview Generator (Copilot tab) _(both)_ - Copilot interview tab now generates a saved role/difficulty question set with show-answer and next-question controls

### Phase 5 - Interview Practice

- [x] 15 Interview Page - Full UI _(frontend)_ - standalone interview practice page now uses live-generated sessions with grouped Technical/Behavioral/HR cards
- [x] 16 Interview Page - Wired _(both)_ - frontend generates real sessions from the backend interview endpoint and renders the saved response

### Phase 6 - Application Tracker

- [x] 17 Applications Page - Full UI _(frontend)_
- [x] 18 Applications - Wired _(both)_

### Phase 7 - Dashboard

- [x] 19 Dashboard Page - Full UI _(frontend)_
- [x] 20 Dashboard - Real Data _(both)_

### Phase 8 - Settings

- [ ] 21 Settings Page _(frontend)_

---

## Decisions Made During Build

- TanStack Query owns all backend/server state in the frontend.
- Redux Toolkit is reserved for client-only cross-page state like active resume and UI preferences.
- The root layout now mounts both providers once, instead of recreating them per page.
- The Copilot workspace now owns the ATS analysis flow in the frontend, with live data rendered from the backend analyses endpoint.
- The Copilot workspace now also owns the resume optimization flow, with side-by-side comparison against the source resume.
- The Copilot workspace now also owns the cover letter flow, with tone selection, generated draft editing, and backend persistence.
- The Copilot workspace now also owns the mock interview flow, with role/difficulty selection, saved interview sessions, and a reusable question-card pattern.
- The applications tracker now owns the Kanban workflow, with filter/search controls, drag-to-status updates, and create/edit/delete dialogs wired to the backend CRUD API.
- The dashboard page now owns the live analytics shell, with stat cards, a resume-attention banner, recent activity, a weekly checklist, quick-action links, and loading/error states backed by the dashboard endpoints.

---

## Notes

- Feature 03 (Database Schema) is partially done from this repo's side: better-auth's own tables (`user`, `session`, `account`, `verification`) already exist since auth is working. The box stays unchecked until the backend's Sequelize-owned tables also exist - it's a _(both)_ feature.
- TanStack Query and Redux Toolkit are now installed and wired into the root layout. Query state is reserved for backend data; Redux is reserved for client-only cross-page state.
- The dashboard UI is now wired to real dashboard data; the next step is the settings page.
