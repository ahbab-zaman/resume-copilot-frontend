"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type NavbarUser = {
  name?: string | null;
  email?: string | null;
} | null;

type NavbarActionsProps = {
  user: NavbarUser;
};

const authLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/copilot", label: "Copilot" },
  { href: "/resumes", label: "Resumes" },
  { href: "/applications", label: "Applications" },
  { href: "/interview", label: "Interview" },
  { href: "/settings", label: "Settings" },
];

export function NavbarActions({ user }: NavbarActionsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="hidden h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary sm:inline-flex"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
        >
          Get started
        </Link>
      </div>
    );
  }

  const displayName = user.name?.trim() || user.email?.split("@")[0] || "Account";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
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
        <span aria-hidden="true" className="text-[10px] leading-none text-text-muted">
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
            {authLinks.map((item) => (
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
  );
}
