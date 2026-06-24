// Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo-pilot.png";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const navItems = [
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

type SidebarProps = {
  user: { name: string; email: string };
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ user, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const initials = (user.name || user.email)
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <aside
      className="flex h-full flex-col border-r border-border bg-surface transition-all duration-300 ease-emphasized"
      style={{ width: collapsed ? "64px" : "" }}
    >
      {/* Logo + toggle */}
      <div className="flex h-15.25 shrink-0 items-center justify-between border-b border-border px-3">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image
              height={36}
              width={36}
              src={logo}
              alt="Resume Copilot"
              className="shrink-0"
            />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold leading-4 text-text-primary">
                Resume
              </p>
              <p className="truncate text-[11px] leading-4 text-text-muted">
                Copilot
              </p>
            </div>
          </Link>
        )}

        {collapsed && (
          <Link href="/" className="mx-auto">
            <Image height={32} width={32} src={logo} alt="Resume Copilot" />
          </Link>
        )}

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition hover:bg-surface-secondary"
            aria-label="Collapse sidebar"
          >
            <svg
              style={{ width: "13px", height: "13px" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="flex justify-center border-b border-border py-2">
          <button
            type="button"
            onClick={onToggle}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition hover:bg-surface-secondary"
            aria-label="Expand sidebar"
          >
            <svg
              style={{ width: "13px", height: "13px" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] leading-5 transition-colors ${
                    isActive
                      ? "bg-surface-secondary font-medium text-text-primary"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  }`}
                  style={{
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                >
                  {/* Icon */}
                  <svg
                    style={{
                      width: "16px",
                      height: "16px",
                      flexShrink: 0,
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d={item.icon} />
                  </svg>

                  {/* Active indicator dot when collapsed */}
                  {collapsed && isActive && (
                    <span
                      className="absolute right-1.5 h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                  )}

                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className="shrink-0 border-t border-border p-2">
        {collapsed ? (
          /* Collapsed: just avatar */
          <div className="flex flex-col items-center gap-2 py-1">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-on-primary"
              style={{ background: "var(--color-accent)" }}
            >
              {initials}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition hover:bg-surface-secondary"
            >
              <svg
                style={{ width: "13px", height: "13px" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        ) : (
          /* Expanded: full user card */
          <div
            className="rounded-xl border border-border p-3"
            style={{ background: "var(--color-surface-secondary)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-on-primary"
                style={{ background: "var(--color-accent)" }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium leading-4 text-text-primary">
                  {user.name}
                </p>
                <p className="truncate text-[11px] leading-4 text-text-muted">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface py-1.5 text-[12px] font-medium text-text-primary transition hover:bg-surface-secondary"
              type="button"
              onClick={handleSignOut}
            >
              <svg
                style={{
                  width: "13px",
                  height: "13px",
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
    </aside>
  );
}
