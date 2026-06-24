# Library Docs — Frontend

> **Used in:** Frontend repo only. Project-specific usage patterns for every third party library used by the Next.js app.

## Order of Authority

```
Official docs (if fetched) → this file (project rules) → general training knowledge
```

---

## Next.js (App Router)

### Auth Guard on the Authenticated Shell

```typescript
// app/(app)/layout.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={session.user} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

**Rules:**

- Every page under `(app)/` relies on this single layout-level guard — never re-check the session inside individual pages.
- Pages in `(app)/` are Server Components that fetch data via `lib/api-client.ts` at the top of the component when possible; only drop to a Client Component for the specific interactive piece (e.g. the Kanban board, the Copilot upload form).

---

## better-auth React Client

```typescript
// In a Client Component
"use client";
import { authClient } from "@/lib/auth-client";

async function handleGoogleLogin() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
}

async function handleEmailLogin(email: string, password: string) {
  const { error } = await authClient.signIn.email({ email, password });
  if (error) {
    // show error.message
  }
}
```

**Rules:**

- All sign-in/sign-up/sign-out calls go through `authClient` — never call `fetch("/api/auth/...")` manually.
- `callbackURL` is always `/dashboard` after login/register.
- Settings page's "Delete Account" button calls `authClient.deleteUser()` — this repo never deletes a user via its own code, since the backend doesn't own the `user` table.

---

## shadcn/ui

- Components live in `components/ui/` and are only ever generated via the shadcn CLI, never hand-written from scratch.
- Never edit a generated component's internal structure beyond what's needed to apply project tokens (`ui-tokens.md`) — keep diffs from the CLI output minimal so future `shadcn add` upgrades don't conflict.
- Form components always paired with `react-hook-form` + `zod` resolver for client-side validation before calling the backend.

```typescript
const form = useForm<JdAnalysisInput>({
  resolver: zodResolver(jdAnalysisSchema),
  defaultValues: { jobDescriptionText: "" },
});
```

---

## Tailwind v4

- Tokens defined via `@theme` in `app/globals.css` — no `tailwind.config.ts` for colors.
- See `ui-tokens.md` for the exact token list — never hardcode hex values or use Tailwind's built-in color palette (`bg-blue-500`, `text-gray-600`, etc.) in components.

## Fonts — Roboto

This project uses Roboto via `next/font/google` — no separate package needed, and no licensing concern (unlike the previously-considered "Graphik Web," which is a commercial typeface this project doesn't have a license for).

```typescript
// app/layout.tsx
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
```

`--font-sans` in `globals.css`'s `@theme inline` block references `var(--font-roboto)` with the fallback chain (Helvetica Neue, Arial, Noto Sans, system emoji fonts) already baked in. `--font-mono` is a plain system monospace stack — nothing to load via `next/font` for it.

**Rules:**

- Never reintroduce the `geist` package — this project no longer uses Geist or Geist Mono.
- Stay at weight 600 as the display ceiling even though Roboto supports 700 — see `ui-rules.md`.
- If a future request asks for "Graphik Web" specifically, flag the licensing issue again rather than silently trying to load it from an unverified source.

---

## File Upload (Resume PDF)

The frontend only collects the file and forwards it — it never parses or stores PDFs itself.

```typescript
"use client";
async function handleUpload(file: File) {
  const formData = new FormData();
  formData.append("resume", file);

  const result = await apiFetch<{ id: string; title: string }>("/api/resumes", {
    method: "POST",
    body: formData,
  });

  if (!result.success) {
    // show result.error
  }
}
```

**Rules:**

- Always validate `file.type === "application/pdf"` and a reasonable size cap (5MB) client-side before sending, as a fast UX check — the backend still re-validates, since client checks are never trusted as the only line of defense.
- Never attempt to read or render PDF content in the browser — display only filename, upload date, and the ATS score once analysis completes.

---

## Drag and Drop (Application Tracker Kanban)

```typescript
"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over || active.id === over.id) return;
  // optimistic update, then:
  apiFetch(`/api/applications/${active.id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: over.id }),
  });
}
```

**Rules:**

- `@dnd-kit/core` is the approved drag-and-drop library for the Kanban board — do not introduce a second one.
- Always update local state optimistically on drop, then reconcile with the backend response; revert on failure with a toast.

---

## Polling / Refresh Pattern (Copilot Processing State)

The Copilot analysis can take a few seconds (AI round trip, possibly with a Gemini→DeepSeek fallback). The frontend shows a processing UI and waits on the single `POST /api/analyses` promise — there is no background job queue or polling endpoint in this project's scope.

```typescript
"use client";
const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">(
  "idle",
);

async function handleAnalyze() {
  setStatus("processing");
  const result = await apiFetch("/api/analyses", {
    method: "POST",
    body: JSON.stringify({ resumeId, jobDescriptionText }),
  });
  setStatus(result.success ? "done" : "error");
}
```

**Rules:**

- No polling, no websockets — the request simply waits for the backend's AI fallback chain to resolve. Show a generic multi-step "Analyzing..." UI rather than fake granular progress, since the backend does not report intermediate steps.

---

## TanStack Query

The only way components read or mutate backend data. See `code-standards.md`'s State Management section for what does and doesn't belong here.

```typescript
// providers/QueryProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
  }));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

```typescript
// hooks/queries/useResumes.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import type { Resume } from "@/types/api";

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: () => apiFetch<Resume[]>("/api/resumes"),
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      apiFetch<Resume>("/api/resumes", { method: "POST", body: formData }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });
}
```

```typescript
// Usage in a page/component
"use client";
import { useResumes } from "@/hooks/queries/useResumes";

export function ResumeTable() {
  const { data, isLoading, error } = useResumes();
  if (isLoading) return <Skeleton />;
  if (error || !data?.success) return <ErrorState message={data?.error} />;
  return <Table rows={data.data} />;
}
```

**Rules:**

- One query hook file per resource — never call `useQuery` with an inline key directly in a page component.
- Query keys are simple, flat arrays (`["resumes"]`, `["analysis", analysisId]`) — never build a key from an object that changes reference every render.
- Every mutation that changes a list invalidates that list's query key in `onSuccess` — never manually patch the cache unless the optimistic-update pattern specifically calls for it (the Kanban board is the one place that does, for instant drag feedback).
- `apiFetch`'s `{ success, data, error }` shape is checked in every consuming component — `isLoading`/`error` from TanStack Query covers network failure, `data.success === false` covers a backend-returned business error (e.g. validation failure), and both have to be handled.

---

## Redux Toolkit

Client-only, cross-page state with no server source of truth. See `code-standards.md` for what does and doesn't belong here — this is deliberately small in this project.

```typescript
// store/activeResumeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveResumeState = { resumeId: string | null };
const initialState: ActiveResumeState = { resumeId: null };

const activeResumeSlice = createSlice({
  name: "activeResume",
  initialState,
  reducers: {
    setActiveResume: (state, action: PayloadAction<string | null>) => {
      state.resumeId = action.payload;
    },
  },
});

export const { setActiveResume } = activeResumeSlice.actions;
export default activeResumeSlice.reducer;
```

```typescript
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import activeResumeReducer from "./activeResumeSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    activeResume: activeResumeReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```typescript
// store/hooks.ts
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```typescript
// providers/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "@/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

**Rules:**

- Always use `useAppDispatch`/`useAppSelector` from `store/hooks.ts` — never the untyped `useDispatch`/`useSelector` directly.
- A slice never stores anything also fetched by a TanStack Query hook — `activeResumeSlice` stores only the _selected ID_, the resume data itself still comes from `useResumes()`.
- `store/index.ts` is instantiated once via `ReduxProvider` in the root layout — never per-page.

---

## Dependencies

Approved for this repo:

- `next`, `react`, `react-dom`
- `better-auth`
- `tailwindcss`, `shadcn/ui`, `lucide-react`
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `@dnd-kit/core` — Kanban drag-and-drop
- `@tanstack/react-query` — all server data fetching/caching
- `@reduxjs/toolkit`, `react-redux` — client-only cross-page state only

Never install `sequelize`, any AI SDK, `pdf-parse`, or `@react-pdf/renderer` in this repo — those belong to the backend.
