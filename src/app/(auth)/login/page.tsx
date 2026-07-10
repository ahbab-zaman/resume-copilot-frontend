import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/components/auth/AuthForm";

import logo from "@/assets/logo-pilot.png";

const loginHighlights = [
  "Resume history and saved analyses in one place",
  "ATS scoring, optimized drafts, and interview prep ready to reopen",
  "Email/password and Google sign-in with the same session flow",
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-350 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border">
          <Link href="/" className="flex items-center">
            <Image height={50} width={50} src={logo} className="py-2" alt="Resume Copilot logo" />
          </Link>

          <Link
            href="/register"
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition duration-150 hover:bg-surface-secondary active:scale-[0.98]"
          >
            Create account
          </Link>
        </header>

        <section className="mx-auto py-8 lg:py-12">
          <AuthForm mode="login" />
        </section>
      </div>
    </main>
  );
}
