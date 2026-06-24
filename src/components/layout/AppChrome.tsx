// AppChrome.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-pilot.png";

import { Sidebar } from "@/components/layout/Sidebar";

type AppChromeProps = {
  user: {
    name?: string | null;
    email?: string | null;
  };
  children: React.ReactNode;
};

export function AppChrome({ user, children }: AppChromeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* ── Desktop fixed sidebar ── */}
      <div
        className="fixed inset-y-0 left-0 z-30 hidden lg:block transition-all duration-300 ease-emphasized"
        style={{ width: `${sidebarWidth}px` }}
      >
        <Sidebar
          user={{ name: user.name ?? "", email: user.email ?? "" }}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* ── Mobile header ── */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition hover:bg-surface-secondary"
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg
            style={{ width: "15px", height: "15px" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/dashboard" className="flex items-center gap-2">
          <Image height={24} width={24} src={logo} alt="Resume Copilot" />
          <span className="text-[14px] font-semibold text-text-primary">
            Resume Copilot
          </span>
        </Link>

        {/* Avatar placeholder */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-on-primary"
          style={{ background: "var(--color-accent)" }}
        >
          {(user.name ?? user.email ?? "A")[0].toUpperCase()}
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-96 overflow-y-auto  transition-transform duration-300"
            style={{
              animation: "slide-in 300ms cubic-bezier(0.2,0,0,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              user={{ name: user.name ?? "", email: user.email ?? "" }}
              collapsed={false}
              onToggle={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Main content — shifts with sidebar ── */}
      <div
        className="hidden lg:block transition-all duration-300 ease-emphasized"
        style={{ paddingLeft: `${sidebarWidth}px` }}
      >
        <main className="px-6 py-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {/* Mobile main — no padding offset */}
      <div className="lg:hidden">
        <main className="px-4 py-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
