"use client";

import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/logo-pilot.png";
import { navLinks } from "@/components/landing/content";
import { authClient } from "@/lib/auth-client";

import { NavbarActions } from "./NavbarActions";

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image height={60} width={60} src={logo} alt="Resume Copilot Logo" />
          <div>
            <p className="text-[14px] font-semibold leading-5 tracking-[-0.03em] text-text-primary">
              Resume Copilot
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-3 py-2 text-[14px] leading-5 text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <NavbarActions user={user} />
      </div>
    </header>
  );
}
