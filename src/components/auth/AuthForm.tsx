"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "login" | "register";
};

type ErrorLike = {
  message?: string;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return (error as ErrorLike).message ?? "Something went wrong.";
  }

  return "Something went wrong.";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";
  const badgeLabel = isRegister ? "Start free" : "Welcome back";
  const headline = isRegister ? "Create your account." : "Sign in to continue.";
  const description = isRegister
    ? "Save resumes, run ATS checks, and keep every application organized in one place."
    : "Pick up where you left off and keep your resume workflow moving.";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isRegister) {
        const result = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: "/dashboard",
        });

        if (result.error) {
          setError(getErrorMessage(result.error));
          return;
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/dashboard",
        });

        if (result.error) {
          setError(getErrorMessage(result.error));
          return;
        }
      }

      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(getErrorMessage(result.error));
      }
    } catch (caughtError) {
      setError(getErrorMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className=" rounded-[16px] border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset] sm:p-8">
      <div className="space-y-3">
        <p className="inline-flex rounded-full border border-border bg-surface-secondary px-3 py-1 font-mono text-[12px] leading-4 text-text-muted">
          {badgeLabel}
        </p>
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
          {headline}
        </h1>
        <p className="text-[16px] leading-6 text-text-secondary">
          {description}
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {isRegister ? (
          <label className="block space-y-2">
            <span className="text-[14px] font-medium leading-5 text-text-primary">
              Full name
            </span>
            <input
              autoComplete="name"
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              name="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Alex Morgan"
              value={name}
            />
          </label>
        ) : null}

        <label className="block space-y-2">
          <span className="text-[14px] font-medium leading-5 text-text-primary">
            Email
          </span>
          <input
            autoComplete="email"
            className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-[14px] font-medium leading-5 text-text-primary">
            Password
          </span>
          <input
            autoComplete={isRegister ? "new-password" : "current-password"}
            className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            type="password"
            value={password}
          />
          {isRegister ? (
            <p className="text-[12px] leading-4 text-text-muted">
              Use at least 8 characters. Longer passwords are better.
            </p>
          ) : null}
        </label>

        {isRegister ? (
          <label className="block space-y-2">
            <span className="text-[14px] font-medium leading-5 text-text-primary">
              Confirm password
            </span>
            <input
              autoComplete="new-password"
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              name="confirmPassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
            />
          </label>
        ) : null}

        {error ? (
          <p className="rounded-sm border border-error/30 bg-error-light px-3 py-2 text-[14px] leading-5 text-error-foreground">
            {error}
          </p>
        ) : null}

        <button
          className="inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent px-4 text-[14px] font-medium leading-5 text-on-primary transition duration-150 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Please wait"
            : isRegister
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[12px] leading-4 text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-border bg-surface px-4 text-[14px] font-medium leading-5 text-text-primary transition duration-150 hover:bg-surface-secondary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="button"
        onClick={handleGoogleSignIn}
      >
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold leading-none text-on-primary">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
        </span>
        Continue with Google
      </button>

      <p className="mt-6 text-center text-[14px] leading-5 text-text-secondary">
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          className="font-medium text-text-primary underline underline-offset-4"
          href={isRegister ? "/login" : "/register"}
        >
          {isRegister ? "Sign in" : "Create one"}
        </Link>
      </p>
    </div>
  );
}
