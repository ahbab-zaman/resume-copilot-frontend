export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
          Dashboard
        </p>
        <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
          Authentication is wired.
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-text-secondary">
          You are signed in through better-auth, the app shell is protected, and
          the API client can attach a fresh JWT before backend calls.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Login",
            value: "Email + Google",
            body: "Both sign-in methods are available from the public auth pages.",
          },
          {
            title: "Guard",
            value: "Layout-level",
            body: "Logged-out users are redirected before protected content renders.",
          },
          {
            title: "Token",
            value: "Fresh per call",
            body: "Backend requests will use a new bearer JWT from better-auth.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              {item.title}
            </p>
            <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              {item.value}
            </p>
            <p className="mt-2 text-[14px] leading-5 text-text-secondary">
              {item.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
