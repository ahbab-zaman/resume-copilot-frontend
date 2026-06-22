"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { navLinks } from "@/components/landing/content";

type NavbarUser = {
  name?: string | null;
  email?: string | null;
} | null;

type NavbarActionsProps = {
  user: NavbarUser;
};

export function NavbarActions({ user }: NavbarActionsProps) {
  const [open, setOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const mobileOpenFrameRef = useRef<number | null>(null);
  const mobileCloseTimerRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (mobileMounted) {
          if (mobileOpenFrameRef.current !== null) {
            window.cancelAnimationFrame(mobileOpenFrameRef.current);
            mobileOpenFrameRef.current = null;
          }

          if (mobileCloseTimerRef.current !== null) {
            window.clearTimeout(mobileCloseTimerRef.current);
            mobileCloseTimerRef.current = null;
          }

          setMobileVisible(false);
          setOpen(false);
          mobileCloseTimerRef.current = window.setTimeout(() => {
            setMobileMounted(false);
            mobileCloseTimerRef.current = null;
          }, 320);
          return;
        }

        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMounted]);

  useEffect(() => {
    return () => {
      if (mobileOpenFrameRef.current !== null) {
        window.cancelAnimationFrame(mobileOpenFrameRef.current);
        mobileOpenFrameRef.current = null;
      }
      if (mobileCloseTimerRef.current !== null) {
        window.clearTimeout(mobileCloseTimerRef.current);
        mobileCloseTimerRef.current = null;
      }
    };
  }, []);

  function openMobileMenu() {
    if (mobileOpenFrameRef.current !== null) {
      window.cancelAnimationFrame(mobileOpenFrameRef.current);
      mobileOpenFrameRef.current = null;
    }

    if (mobileCloseTimerRef.current !== null) {
      window.clearTimeout(mobileCloseTimerRef.current);
      mobileCloseTimerRef.current = null;
    }

    setMobileMounted(true);
    setOpen(true);

    mobileOpenFrameRef.current = window.requestAnimationFrame(() => {
      setMobileVisible(true);
      mobileOpenFrameRef.current = null;
    });
  }

  function closeMobileMenu() {
    if (mobileOpenFrameRef.current !== null) {
      window.cancelAnimationFrame(mobileOpenFrameRef.current);
      mobileOpenFrameRef.current = null;
    }

    if (mobileCloseTimerRef.current !== null) {
      window.clearTimeout(mobileCloseTimerRef.current);
      mobileCloseTimerRef.current = null;
    }

    setMobileVisible(false);
    setOpen(false);
    mobileCloseTimerRef.current = window.setTimeout(() => {
      setMobileMounted(false);
      mobileCloseTimerRef.current = null;
    }, 320);
  }

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || "Account";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary lg:hidden"
        type="button"
        onClick={() => {
          if (mobileMounted) {
            closeMobileMenu();
            return;
          }

          openMobileMenu();
        }}
      >
        Menu
      </button>

      <div className="hidden items-center gap-2 lg:flex">
        {!user ? (
          <>
            <Link
              href="/login"
              className="hidden h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary sm:inline-flex"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            >
              Get Started
            </Link>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              aria-expanded={open}
              aria-haspopup="menu"
              className="flex h-8 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
              type="button"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-secondary text-[11px] font-medium text-text-secondary">
                {initials || "A"}
              </span>
              <span className="max-w-[120px] truncate">{displayName}</span>
              <span
                aria-hidden="true"
                className="text-[10px] leading-none text-text-muted"
              >
                v
              </span>
            </button>

            {open ? (
              <div
                className="absolute right-0 z-50 mt-2 w-64 rounded-md border border-border bg-surface p-2 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]"
                role="menu"
              >
                <div className="border-b border-border px-3 py-3">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    {displayName}
                  </p>
                  <p className="mt-1 truncate text-[12px] leading-4 text-text-muted">
                    {user.email}
                  </p>
                </div>

                <div className="py-2">
                  {[
                    { href: "/dashboard", label: "Dashboard" },
                    { href: "/copilot", label: "Copilot" },
                    { href: "/resumes", label: "Resumes" },
                    { href: "/applications", label: "Applications" },
                    { href: "/interview", label: "Interview" },
                    { href: "/settings", label: "Settings" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex rounded-sm px-3 py-2 text-[14px] leading-5 text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-border pt-2">
                  <button
                    className="flex w-full items-center rounded-sm px-3 py-2 text-left text-[14px] leading-5 text-text-primary transition hover:bg-surface-secondary"
                    type="button"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {mobileMounted ? (
        <div
          className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-opacity duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] lg:hidden supports-[backdrop-filter]:bg-background/80 ${
            mobileVisible ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          onClick={closeMobileMenu}
        >
          <div
            className={`ml-auto flex h-[100dvh] w-[min(88vw,24rem)] max-w-sm flex-col overflow-y-auto overscroll-contain border-l border-border bg-surface px-4 py-4 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset] transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] ${
              mobileVisible ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface pb-4 pt-0">
              <div>
                <p className="text-[14px] font-medium leading-5 text-text-primary">
                  AI Resume Copilot
                </p>
                
              </div>
              <button
                className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
                type="button"
                onClick={closeMobileMenu}
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex rounded-sm px-3 py-3 text-[14px] leading-5 text-text-primary transition hover:bg-surface-secondary"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-4">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <div className="rounded-sm border border-border bg-surface-secondary p-3">
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      {displayName}
                    </p>
                    <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                      {user.email}
                    </p>
                  </div>
                  <button
                    className="flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
                    type="button"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
