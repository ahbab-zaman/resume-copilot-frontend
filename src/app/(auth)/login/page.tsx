import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-center rounded-lg border border-border bg-surface p-8 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              AI resume job pilot
            </p>
            <h2 className="mt-4 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Tailor every application without rebuilding your workflow.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-text-secondary">
              Sign in to access your dashboard, run Copilot analyses, and keep
              your applications organized in one place.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Email/password",
                "Google OAuth",
                "JWT-backed API calls",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-sm border border-border bg-surface-secondary px-4 py-3 text-[14px] leading-5 text-text-primary"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <AuthForm mode="login" />
        </div>
      </div>
    </main>
  );
}
