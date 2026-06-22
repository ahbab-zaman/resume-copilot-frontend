"use client";

import { useState } from "react";
import Link from "next/link";

import { Sidebar } from "@/components/layout/Sidebar";

type AppChromeProps = {
  user: {
    name?: string | null;
    email?: string | null;
  };
  children: React.ReactNode;
};

export function AppChrome({ user, children }: AppChromeProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="lg:hidden">
        <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-surface px-4">
          <button
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
            type="button"
            onClick={() => setMobileOpen(true)}
          >
            Menu
          </button>
          <Link href="/dashboard" className="text-[14px] font-medium leading-5">
            AI Resume
          </Link>
          <div className="h-8 w-8 rounded-full bg-surface-secondary" />
        </header>
      </div>

      <div className="lg:pl-[240px]">
        <div className="hidden lg:block">
          <div className="fixed inset-y-0 left-0 z-30 w-[240px]">
            <Sidebar user={{ name: user.name ?? "", email: user.email ?? "" }} />
          </div>
        </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 bg-background/70 lg:hidden" onClick={() => setMobileOpen(false)}>
            <div
              className="h-full w-[280px] overflow-y-auto border-r border-border bg-surface"
              onClick={(event) => event.stopPropagation()}
            >
              <Sidebar user={{ name: user.name ?? "", email: user.email ?? "" }} />
            </div>
          </div>
        ) : null}

        <main className="px-4 py-6 lg:px-6">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
