import { footerColumns } from "@/components/landing/content";
import Link from "next/link";
import logo from "@/assets/logo-pilot.png";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center">
              <Link
                href="/"
                className="flex h-10 w-20 items-center justify-center text-[13px] font-semibold text-on-primary"
              >
                <Image
                  height={80}
                  width={80}
                  src={logo}
                  alt="Resume Copilot Logo"
                />
              </Link>
              <div>
                <p className="text-[14px] font-semibold leading-5 text-text-primary">
                  Resume Copilot
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-[14px] leading-6 text-text-secondary">
              A focused workspace for resume tailoring, ATS scoring, interview
              prep, and application tracking.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] leading-5 text-text-secondary transition hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-[12px] leading-4 text-text-muted">
          (c) 2026 AI Resume CoPilot
        </p>
      </div>
    </footer>
  );
}
