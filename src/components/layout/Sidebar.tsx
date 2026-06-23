"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo-pilot.png";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type SidebarProps = {
  user: {
    name: string;
    email: string;
  };
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/copilot", label: "Copilot" },
  { href: "/resumes", label: "Resumes" },
  { href: "/applications", label: "Applications" },
  { href: "/interview", label: "Interview" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <aside className="flex min-h-screen w-[240px] flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-5 py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image height={60} width={60} src={logo} alt="Resume Copilot Logo" />
          <div>
            <p className="text-[14px] font-medium leading-5 text-text-primary">
              Resume
            </p>
            <p className="text-[12px] leading-4 text-text-muted"> Copilot</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-sm px-3 py-2 text-[14px] leading-5 transition ${
                    isActive
                      ? "border-l-2 border-accent bg-surface-secondary pl-[11px] text-text-primary"
                      : "border-l-2 border-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-sm border border-border bg-surface-secondary p-3">
          <p className="text-[14px] font-medium leading-5 text-text-primary">
            {user.name}
          </p>
          <p className="mt-1 text-[12px] leading-4 text-text-muted">
            {user.email}
          </p>
          <button
            className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
