# Memory — Copilot Interview Generator (Frontend)

Last updated: 2026-06-23

## What was built

- Extended `src/components/copilot/CopilotWorkspace.tsx` with a real interview tab instead of the placeholder.
- Added `src/hooks/queries/useInterview.ts` to call `POST /api/interview`.
- Added `src/components/interview/QuestionCard.tsx` as the reusable interview practice card with answer reveal and next-question actions.
- Added interview API types to `src/types/api.ts`.
- Updated `context/ui-registry.md` with the Copilot interview pattern and the new Question Card pattern.
- Updated `context/progress-tracker.md` to mark feature 14 complete on the frontend side.

## Decisions made

- Kept the interview flow inside the Copilot workspace as a dense in-app register pattern, not a marketing-style layout.
- Used a reusable question card so the Copilot interview tab and the standalone interview page can share the same visual treatment later.
- Allowed the interview generator to run without an ATS analysis, while still auto-inferring a role/difficulty when analysis data exists.

## Problems solved

- The Copilot interview tab was previously a placeholder with hardcoded questions.
- The frontend now generates saved interview sessions from the backend and can step through questions with show-answer/next-question controls.
- The frontend build passes after wiring the new interview flow.

## Current state

- `/copilot` now supports ATS analysis, optimized resumes, cover letters, and interview question generation from the backend.
- Interview generation returns a saved question set with role/difficulty metadata.
- The question card pattern is now captured in `ui-registry.md`.

## Next session starts with

- Build feature 15: the standalone Interview page full UI in the frontend repo.

## Open questions

- The standalone `/interview` page still needs its own UI implementation.
- If the interview page ends up reusing the same card component, keep it aligned with the Copilot interview pattern.
