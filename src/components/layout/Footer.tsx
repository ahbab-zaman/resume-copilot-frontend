import { footerColumns } from "@/components/landing/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent text-[13px] font-semibold text-on-primary">
                A
              </div>
              <div>
                <p className="text-[14px] font-semibold leading-5 text-text-primary">
                  AI Resume
                </p>
                <p className="text-[12px] leading-4 text-text-muted">Job pilot</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-[14px] leading-6 text-text-secondary">
              A mock landing page built to match the reference screenshot and
              the project UI rules before any feature logic is connected.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[12px] font-medium leading-4 text-text-muted">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[14px] leading-5 text-text-secondary hover:text-text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 text-[12px] leading-4 text-text-muted">
          Mock data only. No backend logic is connected on this page yet.
        </p>
      </div>
    </footer>
  );
}
