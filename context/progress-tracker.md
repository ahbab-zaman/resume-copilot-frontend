# Progress Tracker

---

## Current Status

**Phase:** Phase 2 - App Shell
**Repo (frontend/backend/both):** frontend
**Last completed:** better-auth auth flow, authenticated shell, placeholder dashboard, JWT-aware API client, and frontend better-auth schema migration
**Next:** build the pricing page, then finish the backend JWT verification middleware for cross-repo auth

---

## Progress

### Phase 1 - Foundation

- [ ] 01 Backend Skeleton _(backend)_
- [x] 02 Frontend Skeleton + better-auth _(frontend)_
- [ ] 03 Database Schema _(both)_
- [ ] 04 Cross-Repo Auth Wiring _(both)_

### Phase 2 - App Shell

- [x] 05 Sidebar + Authenticated Layout _(frontend)_
- [ ] 06 Landing + Pricing Pages _(frontend)_

### Phase 3 - Resume Manager

- [ ] 07 Resumes Page - Full UI _(frontend)_
- [ ] 08 Resume Upload + Extraction _(both)_

### Phase 4 - Copilot Flow

- [ ] 09 Copilot Page - Full UI _(frontend)_
- [ ] 10 ATS Analysis - AI Service _(both)_
- [ ] 11 Resume Optimizer _(both)_
- [ ] 12 Cover Letter Generator _(both)_
- [ ] 13 Mock Interview Generator (Copilot tab) _(both)_

### Phase 5 - Interview Practice

- [ ] 14 Interview Page - Full UI _(frontend)_
- [ ] 15 Interview Page - Wired _(both)_

### Phase 6 - Application Tracker

- [ ] 16 Applications Page - Full UI _(frontend)_
- [ ] 17 Applications - Wired _(both)_

### Phase 7 - Dashboard

- [ ] 18 Dashboard Page - Full UI _(frontend)_
- [ ] 19 Dashboard - Real Data _(both)_

### Phase 8 - Settings

- [ ] 20 Settings Page _(frontend)_

---

## Decisions Made During Build

- Authentication is owned entirely by the frontend via better-auth.
- The authenticated shell redirects unauthenticated users at the layout level.
- The frontend API client fetches a fresh bearer JWT per request instead of caching it.
- Google OAuth is wired in the auth config when the required client credentials are present.
- The frontend better-auth tables (`user`, `session`, `account`, `verification`) are now provisioned in the shared Postgres database.

---

## Notes

- Frontend auth pages are implemented at `/login` and `/register`.
- The authenticated routes `/dashboard`, `/copilot`, `/resumes`, `/applications`, `/interview`, and `/settings` now exist behind the app layout guard.
- Backend `verifyAuth` middleware still needs to be completed to finish cross-repo auth wiring.
