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
    <header className="sticky top-0 z-40 border-b border-border bg-surface-secondary/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
        <Link href="/">
          <Image height={50} width={50} src={logo} className="py-2" alt="Resume Copilot Logo" />
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
