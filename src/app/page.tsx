const navLinks = ["Features", "How it works", "Pricing", "FAQ"];

const trustedBy = ["Catalog", "Galileo", "Hourglass", "Netzsche", "Boltshift"];

const featureCards = [
  {
    title: "Smart task management",
    description:
      "Keep every application, resume, and follow-up in one calm workspace.",
    accent: "Task auto-assigned",
  },
  {
    title: "AI email summaries",
    description:
      "Turn job descriptions and recruiter notes into concise action items.",
    accent: "Reply draft generated",
  },
  {
    title: "Workflow automations",
    description:
      "Move from analysis to cover letter and interview prep without context switching.",
    accent: "Resume optimized",
  },
  {
    title: "Team analytics",
    description:
      "See where your applications are stalling and what to prioritize next.",
    accent: "Projects in progress",
  },
];

const metrics = [
  { value: "50k+", label: "applications tailored" },
  { value: "99%", label: "ATS clarity" },
  { value: "12h", label: "saved every week" },
  { value: "4.9/5", label: "user rating" },
];

const testimonials = [
  {
    quote:
      "The flow feels immediate. I paste a JD, get a sharper resume, and know exactly what to fix next.",
    name: "Marta E.",
    title: "Product designer",
  },
  {
    quote:
      "It looks polished enough to trust, but stays focused on the actual job search work.",
    name: "Jordan T.",
    title: "Frontend engineer",
  },
  {
    quote:
      "The mock interview cards and ATS summary make the next step obvious instead of overwhelming.",
    name: "Lina S.",
    title: "Career switcher",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    description: "For trying the workflow and exploring the layout.",
    features: ["One resume upload", "Basic ATS analysis", "Saved mock data"],
  },
  {
    name: "Growth",
    price: "$0",
    description: "For regular job seekers who need a repeatable system.",
    features: [
      "Unlimited analyses",
      "Optimized resume drafts",
      "Cover letter and interview prep",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams, coaches, and larger career services workflows.",
    features: ["Shared templates", "Reporting views", "White-glove support"],
  },
];

const faqs = [
  {
    question: "How does the resume analysis work?",
    answer:
      "You upload a resume, paste a job description, and the app returns a structured ATS score with matched and missing keywords.",
  },
  {
    question: "Can I generate cover letters from the same analysis?",
    answer:
      "Yes. The mock layout shows the full path from one analysis into an optimized resume, cover letter, and interview questions.",
  },
  {
    question: "Does this page connect to live data yet?",
    answer:
      "No. This feature is mock UI only, so the page is safe to review and refine before wiring any backend behavior.",
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Yes. The layout compresses into a single-column marketing page and keeps the key sections readable on smaller screens.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-[12px] font-normal tracking-normal text-text-muted">
        {eyebrow}
      </p>
      <h2
        className="mt-3 text-text-primary font-semibold tracking-[-0.04em]"
        style={{ fontSize: "32px", lineHeight: "40px" }}
      >
        {title}
      </h2>
      <p className="mt-3 text-[16px] leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  );
}

function CardChrome() {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-violet" />
        <div className="h-2.5 w-16 rounded-full bg-surface-secondary" />
      </div>
      <div className="flex items-center gap-2 text-text-muted">
        <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
        <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
        <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
      </div>
    </div>
  );
}

function MiniMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[12px] border border-border bg-surface px-4 py-3">
      <p
        className="font-semibold text-text-primary tracking-[-0.04em]"
        style={{ fontSize: "24px", lineHeight: "32px" }}
      >
        {value}
      </p>
      <p className="mt-1 text-[12px] leading-4 text-text-secondary">{label}</p>
    </div>
  );
}

function MockDesktopPreview() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border border-border bg-surface"
      style={{
        boxShadow:
          "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
      }}
    >
      <CardChrome />
      <div className="grid gap-4 p-5">
        <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-[16px] border border-border bg-surface-secondary p-4">
            <div className="h-2.5 w-20 rounded-full bg-border" />
            <div className="mt-4 space-y-3">
              {["Overview", "Resume", "Analysis", "Interview"].map((item) => (
                <div key={item} className="h-8 rounded-[10px] bg-surface" />
              ))}
            </div>
          </aside>
          <div className="grid gap-4">
            <div className="rounded-[16px] border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] leading-4 text-text-muted">
                    Today&apos;s overview
                  </p>
                  <p
                    className="mt-1 font-semibold tracking-[-0.04em] text-text-primary"
                    style={{ fontSize: "20px", lineHeight: "28px" }}
                  >
                    Work faster with a complete application workspace.
                  </p>
                </div>
                <div className="rounded-full bg-violet-light px-3 py-1 text-[12px] leading-4 text-violet-foreground">
                  Live preview
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.slice(0, 4).map((metric) => (
                  <MiniMetric key={metric.label} {...metric} />
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[16px] border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    Performance trend
                  </p>
                  <span className="rounded-full bg-success-light px-2 py-1 text-[12px] leading-4 text-success-foreground">
                    92% match
                  </span>
                </div>
                <div className="mt-4 h-40 rounded-[14px] bg-surface-secondary p-4">
                  <div className="flex h-full items-end gap-2">
                    {[28, 40, 34, 58, 46, 72, 64, 84].map((height, index) => (
                      <div
                        key={`${height}-${index}`}
                        className="flex-1 rounded-t-[999px] bg-violet/70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-[16px] border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    ATS score
                  </p>
                  <span className="font-mono text-[12px] text-text-muted">
                    AI summary
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-border bg-surface-secondary">
                    <div className="absolute inset-2 rounded-full border border-border bg-surface" />
                    <div className="relative text-center">
                      <p
                        className="font-semibold text-text-primary tracking-[-0.05em]"
                        style={{ fontSize: "32px", lineHeight: "32px" }}
                      >
                        86
                      </p>
                      <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                        overall
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "Skills", value: "91%" },
                    { label: "Experience", value: "84%" },
                    { label: "Education", value: "88%" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-[12px] leading-4">
                        <span className="text-text-secondary">{row.label}</span>
                        <span className="text-text-primary">{row.value}</span>
                      </div>
                      <div className="mt-1 h-1 rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: row.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-accent text-[13px] font-semibold text-on-primary">
              A
            </div>
            <div>
              <p className="text-[14px] font-semibold leading-5 tracking-[-0.03em] text-text-primary">
                AI Resume
              </p>
              <p className="text-[12px] leading-4 text-text-muted">
                Job pilot
              </p>
            </div>
          </a>

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

          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="hidden h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary sm:inline-flex"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden border-b border-border"
          id="features"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, color-mix(in srgb, var(--gradient-preview-start) 16%, transparent), transparent 28%), radial-gradient(circle at 72% 20%, color-mix(in srgb, var(--gradient-develop-start) 16%, transparent), transparent 28%), radial-gradient(circle at 55% 62%, color-mix(in srgb, var(--gradient-ship-end) 10%, transparent), transparent 34%)",
            }}
          />
          <div className="relative mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-12 xl:grid-cols-[0.92fr_1.08fr] xl:gap-10">
              <div className="max-w-2xl">
                <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] leading-4 text-text-muted">
                  AI-POWERED JOB APPLICATIONS
                </p>
                <h1
                  className="mt-5 font-semibold tracking-[-0.06em] text-text-primary"
                  style={{ fontSize: "48px", lineHeight: "48px" }}
                >
                  Tailor every application.
                  <br />
                  Land interviews faster.
                </h1>
                <p className="mt-5 max-w-xl text-[18px] leading-7 text-text-secondary">
                  Upload a resume, paste a job description, and get a sharper
                  ATS score, a better resume draft, a tailored cover letter, and
                  interview questions in one focused workflow.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/register"
                    className="inline-flex h-12 items-center justify-center rounded-[100px] bg-accent px-5 text-[16px] font-medium leading-6 text-on-primary transition hover:opacity-90"
                  >
                    Try free
                  </a>
                  <a
                    href="#pricing"
                    className="inline-flex h-12 items-center justify-center rounded-[100px] border border-border bg-surface px-5 text-[16px] font-medium leading-6 text-text-primary transition hover:bg-surface-secondary"
                  >
                    See pricing
                  </a>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    "Resume upload",
                    "ATS analysis",
                    "Interview prep",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[12px] border border-border bg-surface p-4"
                    >
                      <p className="text-[13px] font-medium leading-5 text-text-primary">
                        {item}
                      </p>
                      <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                        Mock data only.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--gradient-preview-start) 24%, transparent), transparent 52%), radial-gradient(circle at 65% 30%, color-mix(in srgb, var(--gradient-develop-end) 24%, transparent), transparent 46%), radial-gradient(circle at 55% 70%, color-mix(in srgb, var(--gradient-ship-end) 14%, transparent), transparent 48%)",
                  }}
                />
                <div className="relative xl:min-h-[640px]">
                  <div className="relative z-10 w-full max-w-[660px]">
                    <MockDesktopPreview />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[13px] leading-5 text-text-muted">
              {trustedBy.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Everything you need to stay productive."
              description="A single, polished workspace covers the whole application flow from first upload to interview prep."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {featureCards.map((card, index) => (
                <article
                  key={card.title}
                  className="rounded-[12px] border border-border bg-surface p-6"
                  style={{
                    boxShadow:
                      "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex rounded-full bg-violet-light px-2 py-0.5 text-[12px] leading-4 text-violet-foreground">
                        Feature 0{index + 1}
                      </div>
                      <h3 className="mt-4 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                        {card.title}
                      </h3>
                    </div>
                    <div className="rounded-full border border-border bg-surface-secondary px-3 py-1 text-[12px] leading-4 text-text-secondary">
                      {card.accent}
                    </div>
                  </div>
                  <p className="mt-4 max-w-md text-[14px] leading-6 text-text-secondary">
                    {card.description}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[12px] border border-border bg-surface-secondary p-4">
                      <div className="h-2.5 w-16 rounded-full bg-border" />
                      <div className="mt-4 h-20 rounded-[10px] bg-surface" />
                    </div>
                    <div className="rounded-[12px] border border-border bg-surface-secondary p-4">
                      <div className="h-2.5 w-20 rounded-full bg-border" />
                      <div className="mt-4 h-20 rounded-[10px] bg-surface" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
            <div
              className="grid gap-4 rounded-[20px] border border-border bg-surface p-5 md:grid-cols-4"
              style={{
                boxShadow:
                  "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                backgroundImage:
                  "linear-gradient(90deg, color-mix(in srgb, var(--success-light) 12%, transparent), color-mix(in srgb, var(--link-bg-soft) 12%, transparent), color-mix(in srgb, var(--violet-light) 12%, transparent), color-mix(in srgb, var(--warning-light) 12%, transparent))",
              }}
            >
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center md:text-left">
                  <p
                    className="font-semibold tracking-[-0.05em] text-text-primary"
                    style={{ fontSize: "32px", lineHeight: "32px" }}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-2 text-[13px] leading-5 text-text-secondary">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="rounded-[20px] border border-border bg-surface-secondary p-6">
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  SOCIAL PROOF
                </p>
                <h2
                  className="mt-3 font-semibold tracking-[-0.04em] text-text-primary"
                  style={{ fontSize: "32px", lineHeight: "40px" }}
                >
                  Loved by productive teams.
                </h2>
                <p className="mt-3 text-[16px] leading-6 text-text-secondary">
                  Mock testimonials capture the tone of the final product page
                  without relying on live customer data.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {trustedBy.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={`rounded-full px-3 py-1 text-[12px] leading-4 ${
                        index === 1
                          ? "bg-accent text-on-primary"
                          : "bg-surface text-text-secondary"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className="rounded-[16px] border border-border bg-surface p-5"
                    style={{
                      boxShadow:
                        "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                    }}
                  >
                    <p className="text-[14px] leading-6 text-text-secondary">
                      {testimonial.quote}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-[14px] font-semibold text-text-primary">
                        {testimonial.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium leading-5 text-text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-[12px] leading-4 text-text-muted">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              eyebrow="PRICING"
              title="Simple, transparent pricing."
              description="The layout matches the reference, but the data stays mock-only until the pricing flow is actually implemented."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-[16px] border p-6 ${
                    plan.featured
                      ? "border-accent bg-surface"
                      : "border-border bg-surface"
                  }`}
                  style={{
                    boxShadow: plan.featured
                      ? "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset"
                      : "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                  }}
                >
                  {plan.featured ? (
                    <div className="inline-flex rounded-full bg-accent px-3 py-1 text-[12px] leading-4 text-on-primary">
                      Most popular
                    </div>
                  ) : null}
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                        {plan.name}
                      </h3>
                      <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                        {plan.description}
                      </p>
                    </div>
                    <p
                      className="font-semibold tracking-[-0.05em] text-text-primary"
                      style={{ fontSize: "32px", lineHeight: "32px" }}
                    >
                      {plan.price}
                    </p>
                  </div>
                  <a
                    href="/register"
                    className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-[12px] text-[14px] font-medium leading-5 transition ${
                      plan.featured
                        ? "bg-accent text-on-primary hover:opacity-90"
                        : "border border-border bg-surface text-text-primary hover:bg-surface-secondary"
                    }`}
                  >
                    Get started
                  </a>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[14px] leading-5 text-text-secondary"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions."
              description="Use these mocked answers as placeholders until the content strategy is finalized."
            />

            <div className="mx-auto mt-12 max-w-4xl space-y-4">
              {faqs.map((faq, index) => (
                <article
                  key={faq.question}
                  className={`rounded-[16px] border p-5 ${
                    index === 1
                      ? "border-border bg-surface-secondary"
                      : "border-border bg-surface"
                  }`}
                  style={{
                    boxShadow:
                      "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[16px] font-medium leading-6 text-text-primary">
                        {faq.question}
                      </p>
                      {index === 1 ? (
                        <p className="mt-3 max-w-3xl text-[14px] leading-6 text-text-secondary">
                          {faq.answer}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-[20px] leading-none text-text-muted">
                      {index === 1 ? "−" : "+"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div
            className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-border bg-accent px-6 py-10 text-on-primary sm:px-8 lg:px-10"
            style={{
              boxShadow:
                "0 2px 2px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
              backgroundImage:
                "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--gradient-preview-start) 28%, transparent), transparent 42%), radial-gradient(circle at 78% 30%, color-mix(in srgb, var(--gradient-develop-end) 18%, transparent), transparent 32%)",
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-[12px] leading-4 text-white/70">
                  READY TO TRANSFORM
                </p>
                <h2
                  className="mt-3 font-semibold tracking-[-0.05em]"
                  style={{ fontSize: "32px", lineHeight: "40px" }}
                >
                  Ready to transform your workflow?
                </h2>
                <p className="mt-3 max-w-2xl text-[16px] leading-6 text-white/75">
                  Keep the same polished structure from the reference while the
                  product logic is still mocked out.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/register"
                  className="inline-flex h-11 items-center justify-center rounded-[100px] bg-violet px-5 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
                >
                  Start free trial
                </a>
                <a
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-[100px] border border-white/15 bg-white/10 px-5 text-[14px] font-medium leading-5 text-on-primary transition hover:bg-white/15"
                >
                  Book a demo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
                  <p className="text-[12px] leading-4 text-text-muted">
                    Job pilot
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-md text-[14px] leading-6 text-text-secondary">
                A mock landing page built to match the reference screenshot and
                the project UI rules before any feature logic is connected.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "FAQ"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Contact"],
                },
                {
                  title: "Resources",
                  links: ["Docs", "Blog", "Support"],
                },
              ].map((column) => (
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
    </div>
  );
}
