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

## Fonts — Geist + Geist Mono

This project uses Vercel's own typefaces, shipped as the `geist` npm package — **not** `next/font/google`, Geist isn't hosted there.

```bash
npm install geist
```

```typescript
// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`--font-sans` and `--font-mono` are declared in `@theme` in `globals.css` and reference these variables. Use `font-mono` only for technical labels and the resume extracted-text preview — see `ui-rules.md`.

**Rules:**

- Never substitute Inter for Geist — if `geist` genuinely fails to install or build, fall back to `Inter` only as a documented last resort and flag it, don't silently swap.
- Never load Geist Mono onto body paragraphs or prose — mono is reserved per `ui-rules.md`.

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

## Dependencies

Approved for this repo:

- `next`, `react`, `react-dom`
- `better-auth`
- `tailwindcss`, `shadcn/ui`, `lucide-react`
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `@dnd-kit/core` — Kanban drag-and-drop

Never install `sequelize`, any AI SDK, `pdf-parse`, or `@react-pdf/renderer` in this repo — those belong to the backend.
