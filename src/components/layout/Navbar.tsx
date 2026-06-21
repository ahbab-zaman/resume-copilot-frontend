import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { navLinks } from "@/components/landing/content";

import { NavbarActions } from "./NavbarActions";

export async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-accent text-[13px] font-semibold text-on-primary">
            A
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-5 tracking-[-0.03em] text-text-primary">
              AI Resume
            </p>
            <p className="text-[12px] leading-4 text-text-muted">Job pilot</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
              className="rounded-full px-3 py-2 text-[14px] leading-5 text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
            >
              {link}
            </a>
          ))}
        </nav>

        <NavbarActions user={session?.user ?? null} />
      </div>
    </header>
  );
}
