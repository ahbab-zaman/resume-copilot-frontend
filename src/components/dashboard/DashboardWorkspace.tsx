"use client";

import Link from "next/link";

import {
  useDashboardActivity,
  useDashboardStats,
} from "@/hooks/queries/useDashboard";
import type { DashboardActivityCategory } from "@/types/api";

type StatCard = {
  label: string;
  value: string;
  body: string;
};

type ActivityItem = {
  id: string;
  source: string;
  sourceClass: string;
  title: string;
  detail: string;
  time: string;
};

type QuickAction = {
  label: string;
  href: string;
  body: string;
};

type ChecklistItem = {
  title: string;
  body: string;
  done: boolean;
};

const quickActions: QuickAction[] = [
  {
    label: "Open resumes",
    href: "/resumes",
    body: "Pick the active resume and keep the library tidy.",
  },
  {
    label: "Run Copilot",
    href: "/copilot",
    body: "Paste a job description and review the ATS analysis.",
  },
  {
    label: "Review applications",
    href: "/applications",
    body: "Move cards through the pipeline and capture notes.",
  },
  {
    label: "Practice interview",
    href: "/interview",
    body: "Generate a fresh interview set and rehearse answers.",
  },
];

const checklist: ChecklistItem[] = [
  {
    title: "Set one resume active",
    body: "The rest of the workspace is clearer when the baseline is fixed.",
    done: false,
  },
  {
    title: "Run the latest ATS check",
    body: "Use the freshest job description before you polish the resume.",
    done: true,
  },
  {
    title: "Move the newest application",
    body: "Keep the pipeline current so the board reflects reality.",
    done: true,
  },
];

function ActionLink({ label, href, body }: QuickAction) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset] transition hover:bg-surface-secondary"
    >
      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
        Quick action
      </p>
      <p className="mt-2 text-[16px] font-semibold leading-6 tracking-[-0.04em] text-text-primary">
        {label}
      </p>
      <p className="mt-2 flex-1 text-[14px] leading-6 text-text-secondary">
        {body}
      </p>
      <span className="mt-4 text-[14px] font-medium leading-5 text-text-primary transition group-hover:opacity-90">
        Open
      </span>
    </Link>
  );
}

function formatRelativeTime(value: string): string {
  const time = new Date(value);
  const deltaInSeconds = Math.round((time.getTime() - Date.now()) / 1000);
  const absoluteDelta = Math.abs(deltaInSeconds);

  if (absoluteDelta < 60) {
    return "just now";
  }

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  for (const [unit, secondsPerUnit] of units) {
    if (absoluteDelta >= secondsPerUnit) {
      const amount = Math.round(deltaInSeconds / secondsPerUnit);
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        amount,
        unit,
      );
    }
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(time);
}

function getActivityBadgeClass(category: DashboardActivityCategory): string {
  switch (category) {
    case "resume":
      return "bg-accent-light text-accent";
    case "analysis":
    case "cover-letter":
      return "bg-teal-light text-teal-foreground";
    case "application":
      return "bg-success-light text-success-foreground";
    case "interview":
      return "bg-warning-light text-warning-foreground";
    default:
      return "bg-surface-secondary text-text-secondary";
  }
}

function getActivityLabel(category: DashboardActivityCategory): string {
  switch (category) {
    case "resume":
      return "Resume";
    case "analysis":
    case "cover-letter":
      return "Copilot";
    case "application":
      return "Applications";
    case "interview":
      return "Interview";
    default:
      return "Activity";
  }
}

export function DashboardWorkspace() {
  const statsQuery = useDashboardStats();
  const activityQuery = useDashboardActivity();

  const isLoading = statsQuery.isLoading || activityQuery.isLoading;
  const error = statsQuery.error ?? activityQuery.error;

  const activeResume = statsQuery.data?.activeResume ?? null;
  const stats: StatCard[] = [
    {
      label: "Active resume",
      value: activeResume?.title ?? "None",
      body: activeResume
        ? "This is the baseline Copilot and future workflows use."
        : "Mark one resume active so Copilot starts from the right baseline.",
    },
    {
      label: "Applications tracked",
      value: statsQuery.data ? String(statsQuery.data.applicationCount) : "-",
      body: "A small pipeline is already in motion across applied and interview stages.",
    },
    {
      label: "ATS checks this week",
      value: statsQuery.data ? String(statsQuery.data.atsChecksThisWeek) : "-",
      body: "Fresh analyses help surface missing keywords before the next application.",
    },
    {
      label: "Interview sessions",
      value: statsQuery.data ? String(statsQuery.data.interviewSessionCount) : "-",
      body: "Practice loops are saved and ready when you want to rehearse again.",
    },
  ];

  const activityFeed: ActivityItem[] =
    activityQuery.data?.map((item) => ({
      id: item.id,
      source: getActivityLabel(item.category),
      sourceClass: getActivityBadgeClass(item.category),
      title: item.title,
      detail: item.detail,
      time: formatRelativeTime(item.createdAt),
    })) ?? [];

  const errorMessage =
    error instanceof Error ? error.message : "Could not load dashboard data.";

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Dashboard
            </p>
            <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Keep the search moving.
            </h1>
            <p className="mt-3 text-[16px] leading-7 text-text-secondary">
              One calm place to see what is live, what needs attention, and
              where to go next across resumes, Copilot, applications, and
              interview prep.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/resumes"
              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            >
              Review resumes
            </Link>
            <Link
              href="/copilot"
              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            >
              Run Copilot
            </Link>
          </div>
        </div>
      </section>

      {!isLoading && !error && !activeResume ? (
        <section className="rounded-md border border-warning-light bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-warning-light px-2 py-0.5 text-[12px] font-medium leading-4 text-warning-foreground">
                Resume attention
              </span>
              <h2 className="mt-3 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                No active resume is set.
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                Pick a current resume before your next analysis so the dashboard
                and Copilot stay aligned with the same baseline.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/resumes"
                className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
              >
                Set active resume
              </Link>
              <Link
                href="/applications"
                className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
              >
                Review pipeline
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {error ? (
        <section className="rounded-md border border-warning-light bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Dashboard unavailable
          </p>
          <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
            Could not load live dashboard data.
          </h2>
          <p className="mt-2 text-[14px] leading-6 text-text-secondary">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => {
              void statsQuery.refetch();
              void activityQuery.refetch();
            }}
            className="mt-4 inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
          >
            Retry
          </button>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              {stat.label}
            </p>
            <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              {stat.value}
            </p>
            <p className="mt-2 text-[14px] leading-5 text-text-secondary">
              {stat.body}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6">
          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Recent activity
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  What changed most recently.
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                Last 5 events
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-24 rounded-md border border-border bg-surface-secondary" />
                  <div className="h-24 rounded-md border border-border bg-surface-secondary" />
                  <div className="h-24 rounded-md border border-border bg-surface-secondary" />
                </div>
              ) : null}

              {!isLoading && activityFeed.length === 0 && !error ? (
                <div className="rounded-md border border-border bg-surface-secondary p-4">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    No recent activity yet.
                  </p>
                  <p className="mt-1 text-[14px] leading-6 text-text-secondary">
                    Upload a resume, run Copilot, or move an application to start
                    building the feed.
                  </p>
                </div>
              ) : null}

              {!isLoading
                ? activityFeed.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-md border border-border bg-surface-secondary p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${item.sourceClass}`}
                          >
                            {item.source}
                          </span>
                          <h3 className="mt-3 text-[16px] font-semibold leading-6 tracking-[-0.04em] text-text-primary">
                            {item.title}
                          </h3>
                        </div>

                        <time className="text-[12px] leading-4 text-text-muted">
                          {item.time}
                        </time>
                      </div>

                      <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                        {item.detail}
                      </p>
                    </article>
                  ))
                : null}
            </div>
          </section>

          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Weekly focus
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Keep the next move obvious.
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-accent-light px-2 py-0.5 text-[12px] font-medium leading-4 text-accent">
                2 of 3 complete
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-md border border-border bg-surface-secondary p-4"
                >
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[12px] font-medium ${
                      item.done
                        ? "border-success bg-success-light text-success-foreground"
                        : "border-border bg-surface text-text-muted"
                    }`}
                  >
                    {item.done ? "x" : "*"}
                  </span>

                  <div>
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-6 text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Quick actions
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Jump straight to the next step.
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                Four shortcuts
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {quickActions.map((action) => (
                <ActionLink key={action.href} {...action} />
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Dashboard note
            </p>
            <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              This page now renders live dashboard data.
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-text-secondary">
              Feature 20 connects the stat cards and activity feed to the backend
              dashboard endpoints while keeping the same in-app layout.
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}
