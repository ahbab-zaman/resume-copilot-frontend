import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/components/auth/AuthForm";

import logo from "@/assets/logo-pilot.png";

const registerHighlights = [
  "Keep every resume version and ATS result in one workspace",
  "Run tailored drafts, cover letters, and interview prep from one account",
  "Start free with email/password or continue with Google",
];

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1400px] flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-6">
          <Link href="/" className="flex items-center gap-3">
            <Image height={56} width={56} src={logo} alt="Resume Copilot logo" />
            <div>
              <p className="text-[14px] font-semibold leading-5 tracking-[-0.03em] text-text-primary">
                Resume Copilot
              </p>
              <p className="text-[12px] leading-4 text-text-muted">
                Build a cleaner application flow
              </p>
            </div>
          </Link>

          <Link
            href="/login"
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition duration-150 hover:bg-surface-secondary active:scale-[0.98]"
          >
            Sign in
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
          <div className="space-y-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[12px] leading-4 text-text-muted">
                NEW ACCOUNT
              </p>
              <h1 className="mt-4 text-[48px] font-semibold leading-[48px] tracking-[-0.06em] text-text-primary max-sm:text-[36px] max-sm:leading-[40px]">
                Create your account.
              </h1>
              <p className="mt-4 max-w-xl text-[18px] leading-7 text-text-secondary">
                Set up your workspace once, then keep every application,
                analysis, and draft connected as you move through the search.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {registerHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[12px] border border-border bg-surface p-4 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]"
                >
                  <p className="text-[14px] leading-5 text-text-primary">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[16px] border border-border bg-surface p-5 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset] sm:grid-cols-3">
              <div>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  SAVE
                </p>
                <p className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Drafts
                </p>
                <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                  Return to every generated version.
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  ANALYZE
                </p>
                <p className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  ATS
                </p>
                <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                  See what needs work before applying.
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  PREP
                </p>
                <p className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Interview
                </p>
                <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                  Keep the next step ready too.
                </p>
              </div>
            </div>
          </div>

          <AuthForm mode="register" />
        </section>
      </div>
    </main>
  );
}
