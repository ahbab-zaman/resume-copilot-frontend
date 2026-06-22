import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/components/auth/AuthForm";

import logo from "../../../../public/assets/logo-pilot.png";

const loginHighlights = [
  "Resume history and saved analyses in one place",
  "ATS scoring, optimized drafts, and interview prep ready to reopen",
  "Email/password and Google sign-in with the same session flow",
];

export default function LoginPage() {
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
                Tailor applications faster
              </p>
            </div>
          </Link>

          <Link
            href="/register"
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition duration-150 hover:bg-surface-secondary active:scale-[0.98]"
          >
            Create account
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
          <div className="space-y-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[12px] leading-4 text-text-muted">
                RETURNING USER
              </p>
              <h1 className="mt-4 text-[48px] font-semibold leading-[48px] tracking-[-0.06em] text-text-primary max-[639px]:text-[36px] max-[639px]:leading-[40px]">
                Sign in and keep moving.
              </h1>
              <p className="mt-4 max-w-xl text-[18px] leading-7 text-text-secondary">
                Open your dashboard, review the latest resume analysis, and
                continue from the exact point you left off.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {loginHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[12px] border border-border bg-surface p-4 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]"
                >
                  <p className="text-[14px] leading-5 text-text-primary">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[16px] border border-border bg-surface p-5 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset] sm:grid-cols-3">
              <div>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  SESSION
                </p>
                <p className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  1 login
                </p>
                <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                  Resume your work instantly.
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  ACCESS
                </p>
                <p className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Google
                </p>
                <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                  Fast sign-in when you need it.
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  WORKFLOW
                </p>
                <p className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Dashboard
                </p>
                <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                  Everything stays organized there.
                </p>
              </div>
            </div>
          </div>

          <AuthForm mode="login" />
        </section>
      </div>
    </main>
  );
}
