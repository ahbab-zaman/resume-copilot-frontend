# Code Standards — Frontend

> **Used in:** Frontend repo only.

## Engineering Mindset

- Read `architecture.md` and `project-overview.md` first — never assume the backend contract, verify against it.
- Scope is sacred — build only what the current feature requires.
- Every page/component must be visually verifiable with mock data before it's wired to the real backend.
- Clean over clever.

---

## TypeScript

- Strict mode, no exceptions.
- Never use `any` — use `unknown` and narrow.
- Never use type assertions without a comment explaining why.
- `type` for object shapes/unions, `interface` only for extendable component props.
- `const` by default.

---

## Next.js Conventions

- App Router only.
- All components are Server Components by default.
- Only add `"use client"` when the component needs `useState`/`useReducer`, `useEffect`, browser APIs, event listeners, or a client-only library (better-auth React client).
- Never add `"use client"` to layout files unless absolutely required.
- This repo has **no** server-side data layer of its own beyond better-auth — all business data is fetched from the Express backend via `lib/api-client.ts`, called from Server Components where possible, or from Client Components when interactivity requires it (e.g. the Kanban board).
- The only route handler in this entire repo is `app/api/auth/[...all]/route.ts` (better-auth). Do not add other API routes here — backend logic belongs in the Express repo.

---

## File and Folder Naming

- Folders: kebab-case.
- Component files: PascalCase.
- Utility files: camelCase.
- One component per file, named exports only (no default exports for components).
- Index files only in `components/ui/`.

---

## Component Structure

```typescript
"use client"; // only if needed

// 1. External imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Internal imports
import { AtsScoreDashboard } from "@/components/copilot/AtsScoreDashboard";

// 3. Type definitions
type Props = {
  analysisId: string;
};

// 4. Component
export function CopilotResults({ analysisId }: Props) {
  // state
  // derived values
  // handlers
  // return JSX
}
```

- No inline styles — Tailwind classes using tokens from `ui-tokens.md` only.

---

## better-auth

```typescript
// lib/auth.ts — server instance
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [jwt()],
});
```

```typescript
// lib/auth-client.ts — browser client
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
```

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

**Rules:**

- `lib/auth.ts` is server-only — never imported from a Client Component.
- `lib/auth-client.ts` is the only auth import allowed in Client Components.
- The `jwt()` plugin is mandatory — it's what lets the Express backend verify requests via JWKS. Never remove it.
- Session checks in Server Components use `auth.api.getSession({ headers })`; redirect to `/login` if absent.
- Never write custom token-issuing or password-hashing code anywhere in this repo — better-auth owns 100% of authentication.

---

## API Client (calling the Backend)

```typescript
// lib/api-client.ts
import { authClient } from "@/lib/auth-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const { data: tokenData } = await authClient.token();
    const response = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${tokenData?.token}`,
        ...(options.body && !(options.body instanceof FormData)
          ? { "Content-Type": "application/json" }
          : {}),
      },
    });

    return await response.json();
  } catch (error) {
    console.error("[lib/api-client]", error);
    return {
      success: false,
      error: "Could not reach the server. Please try again.",
    };
  }
}
```

**Rules:**

- This is the **only** way the frontend talks to the backend — never call `fetch` against `NEXT_PUBLIC_BACKEND_URL` anywhere else.
- Always re-fetches a fresh token per call rather than caching it across requests — tokens are short-lived.
- Response shape always assumed to be `{ success, data?, error? }` per the backend contract in `architecture.md`.
- Never put backend-only secrets (`GEMINI_API_KEY`, `DATABASE_URL` used by the Express service, etc.) into this repo's environment — this repo only needs its own `DATABASE_URL` for better-auth's tables plus `NEXT_PUBLIC_BACKEND_URL`.

---

## Error Handling

- Never show raw error messages from `apiFetch` results directly — map known error strings to friendly copy where it matters, otherwise show the message as-is since the backend already returns human-readable text.
- Loading and error states are required for every data-fetching component — no silent failures.

---

## Dependencies

Approved for this repo:

- `next`, `react`, `react-dom`
- `better-auth`
- `tailwindcss`, `shadcn/ui` components, `lucide-react`
- `geist` — Geist Sans + Geist Mono fonts (the actual Vercel typefaces, see `ui-tokens.md`/`ui-rules.md`)
- `@tanstack/react-query` — all server data fetching/caching
- `@reduxjs/toolkit`, `react-redux` — client-only cross-page state, never server data
- `zod` — client-side form validation only

Never install a backend-style dependency here (no `sequelize`, no AI SDKs, no `pdf-parse`) — if a feature seems to need one, it belongs in the Express repo instead.

---

## State Management

Three tools, each with a strict, non-overlapping job. Before writing any `useState`, ask which bucket the data falls into:

| Data                                                                                                                       | Tool                        | Why                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Anything that came from or will be saved to the backend (resumes, analyses, applications, dashboard stats)                 | **TanStack Query**          | It's server state — needs caching, refetching, loading/error states, optimistic updates. Never copy it into Redux. |
| Client-only state shared across distant pages/components (active resume selection, theme, sidebar collapsed)               | **Redux Toolkit**           | No server source of truth, but more than one component needs it.                                                   |
| State used by a single component or its direct children (form input value, a dialog's open/closed state, drag-in-progress) | **`useState`/`useReducer`** | Local — no global tool needed.                                                                                     |

**The one rule that matters most: never store the same piece of data in both Redux and TanStack Query.** If you find yourself dispatching a Redux action every time a query resolves "to keep things in sync," that's the anti-pattern — let TanStack Query be the only source of truth for server data and read it directly with `useQuery` wherever it's needed.

- Query hooks live in `hooks/queries/`, one file per resource (`useResumes.ts`, `useAnalysis.ts`, `useApplications.ts`) — components never call `useQuery`/`useMutation` inline with an ad-hoc key, always through a named hook so the query key is defined in exactly one place.
- Redux slices live in `store/`, one file per concern (`activeResumeSlice.ts`, `uiSlice.ts`) — a slice is added only when state genuinely needs to be read or written from more than one unrelated component tree; if only two sibling components need something, lift state up instead.
- Both `QueryProvider` and `ReduxProvider` wrap the app once, in the root layout, in `providers/` — never re-instantiate a `QueryClient` or `store` inside a page or component.

---

## Comments

- No comments explaining what the code does.
- Comments only for why.
- No TODO comments in committed code.
