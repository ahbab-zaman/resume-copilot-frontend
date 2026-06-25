"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { navLinks } from "@/components/landing/content";
import { Menu } from "lucide-react";

type NavbarUser = {
  name?: string | null;
  email?: string | null;
} | null;

type NavbarActionsProps = {
  user: NavbarUser;
};

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    href: "/copilot",
    label: "Copilot",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    href: "/resumes",
    label: "Resumes",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    href: "/applications",
    label: "Applications",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    href: "/interview",
    label: "Interview",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

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
  const mobileNavLinks = navLinks.filter((link) => link.href !== "/dashboard");

  return (
    <>
      {/* Mobile hamburger */}
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
        <Menu />
      </button>

      {/* Desktop actions */}
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
            {/* Trigger */}
            <button
              aria-expanded={open}
              aria-haspopup="menu"
              className="flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-2 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
              type="button"
              onClick={() => setOpen((v) => !v)}
            >
              {/* Avatar */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-on-primary">
                {initials || "A"}
              </span>

              {/* Chevron */}
              <svg
                style={{
                  width: "12px",
                  height: "12px",
                  color: "var(--color-text-muted)",
                  transition: "transform 200ms ease",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  flexShrink: 0,
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.10),0_0_0_1px_var(--color-border)_inset]"
                role="menu"
                style={{
                  animation: "dropdown-in 160ms cubic-bezier(0.2,0,0,1)",
                }}
              >
                <style>{`
                  @keyframes dropdown-in {
                    from { opacity: 0; transform: translateY(-6px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0)    scale(1);    }
                  }
                `}</style>

                {/* User info header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-on-primary">
                    {initials || "A"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold leading-5 text-text-primary">
                      {displayName}
                    </p>
                    <p className="truncate text-[12px] leading-4 text-text-muted">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Nav items */}
                <div className="p-1.5">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] leading-5 text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                    >
                      <svg
                        style={{
                          width: "15px",
                          height: "15px",
                          flexShrink: 0,
                          color: "var(--color-text-muted)",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d={item.icon} />
                      </svg>
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Sign out */}
                <div className="border-t border-border p-1.5">
                  <button
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] leading-5 text-text-primary transition-colors hover:bg-surface-secondary"
                    type="button"
                    onClick={handleSignOut}
                  >
                    <svg
                      style={{
                        width: "15px",
                        height: "15px",
                        flexShrink: 0,
                        color: "var(--color-text-muted)",
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile drawer — unchanged logic, improved visuals */}
      {mobileMounted && (
        <div
          className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-opacity duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] lg:hidden supports-[backdrop-filter]:bg-background/80 ${
            mobileVisible ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          onClick={closeMobileMenu}
        >
          <div
            className={`ml-auto flex h-[100dvh] w-[min(88vw,24rem)] max-w-sm flex-col overflow-y-auto overscroll-contain border-l border-border bg-surface shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04)] transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] ${
              mobileVisible ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-4 py-4">
              <p className="text-[14px] font-semibold leading-5 text-text-primary">
                AI Resume Copilot
              </p>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition hover:bg-surface-secondary"
                type="button"
                onClick={closeMobileMenu}
              >
                <svg
                  style={{ width: "14px", height: "14px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 px-3 py-3">
              <div className="space-y-0.5">
                {mobileNavLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex rounded-lg px-3 py-2.5 text-[14px] leading-5 text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {user && (
                <>
                  <p className="mb-1 mt-5 px-3 text-[11px] font-medium uppercase tracking-widest text-text-muted">
                    Account
                  </p>
                  <div className="space-y-0.5">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] leading-5 text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
                        onClick={closeMobileMenu}
                      >
                        <svg
                          style={{
                            width: "15px",
                            height: "15px",
                            flexShrink: 0,
                            color: "var(--color-text-muted)",
                          }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-3 py-3">
              {!user ? (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="flex h-9 items-center justify-center rounded-lg border border-border bg-surface text-[14px] font-medium text-text-primary transition hover:bg-surface-secondary"
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="flex h-9 items-center justify-center rounded-lg bg-accent text-[14px] font-medium text-on-primary transition hover:opacity-90"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-secondary px-3 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-on-primary">
                      {initials || "A"}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium leading-5 text-text-primary">
                        {displayName}
                      </p>
                      <p className="truncate text-[12px] leading-4 text-text-muted">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface text-[14px] font-medium text-text-primary transition hover:bg-surface-secondary"
                    type="button"
                    onClick={handleSignOut}
                  >
                    <svg
                      style={{
                        width: "14px",
                        height: "14px",
                        color: "var(--color-text-muted)",
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
