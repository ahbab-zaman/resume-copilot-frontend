"use client";

import { useMemo, useState } from "react";

import { QuestionCard } from "@/components/interview/QuestionCard";
import { useGenerateInterviewQuestions } from "@/hooks/queries/useInterview";
import type {
  InterviewDifficulty,
  InterviewQuestion,
  InterviewRole,
  InterviewSessionRecord,
} from "@/types/api";

const roleOptions: Array<{
  label: string;
  value: InterviewRole;
  description: string;
}> = [
  {
    label: "Fullstack",
    value: "fullstack",
    description: "Balanced across product, API, and delivery questions.",
  },
  {
    label: "Frontend",
    value: "frontend",
    description: "Focuses on UI, accessibility, performance, and state.",
  },
  {
    label: "Backend",
    value: "backend",
    description: "Leans into APIs, data modeling, and reliability.",
  },
];

const difficultyOptions: Array<{
  label: string;
  value: InterviewDifficulty;
  description: string;
}> = [
  {
    label: "Junior",
    value: "junior",
    description: "Foundational questions with guided follow-ups.",
  },
  {
    label: "Mid",
    value: "mid",
    description: "Practical questions about delivery and trade-offs.",
  },
  {
    label: "Senior",
    value: "senior",
    description: "Sharper system, leadership, and decision-making prompts.",
  },
];

const questionCategories: InterviewQuestion["category"][] = [
  "Technical",
  "Behavioral",
  "HR",
];

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function groupQuestions(questions: InterviewQuestion[]) {
  return questionCategories.reduce<Record<InterviewQuestion["category"], InterviewQuestion[]>>(
    (groups, category) => {
      groups[category] = questions.filter((question) => question.category === category);
      return groups;
    },
    {
      Technical: [],
      Behavioral: [],
      HR: [],
    },
  );
}

type InterviewSectionProps = {
  title: InterviewQuestion["category"];
  questions: InterviewQuestion[];
};

function InterviewSection({ title, questions }: InterviewSectionProps) {
  return (
    <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            {title}
          </p>
          <h3 className="mt-2 text-[18px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
            {questions.length} question{questions.length === 1 ? "" : "s"}
          </h3>
        </div>

        <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
          Live set
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionCard
              key={`${title}-${index}-${question.question}`}
              question={question}
              index={index}
              total={questions.length}
              showNextButton={false}
            />
          ))
        ) : (
          <div className="rounded-md border border-border bg-surface-secondary p-4">
            <p className="text-[14px] leading-6 text-text-secondary">
              This category will appear after you generate a session.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function InterviewWorkspace() {
  const [role, setRole] = useState<InterviewRole>("fullstack");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>("mid");
  const [session, setSession] = useState<InterviewSessionRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateInterviewQuestions = useGenerateInterviewQuestions();

  const groupedQuestions = useMemo(
    () => groupQuestions(session?.questions ?? []),
    [session],
  );

  const totalQuestions = session?.questions.length ?? 0;
  const hasSession = session !== null;

  function handleGenerateQuestions() {
    setError(null);

    generateInterviewQuestions.mutate(
      { role, difficulty },
      {
        onSuccess: (data) => {
          setSession(data);
        },
        onError: (mutationError) => {
          setError(
            mutationError instanceof Error
              ? mutationError.message
              : "Could not generate interview questions.",
          );
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
        <div className="max-w-3xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Interview
          </p>
          <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
            Practice with a live question set.
          </h1>
          <p className="mt-3 text-[16px] leading-7 text-text-secondary">
            Pick a role and difficulty, generate a fresh interview session from
            the backend, and step through the saved questions with answers and
            follow-ups.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Session setup
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Generate a practice loop
                </h2>
              </div>

              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={generateInterviewQuestions.isPending}
                onClick={handleGenerateQuestions}
              >
                {generateInterviewQuestions.isPending
                  ? "Generating..."
                  : "Generate questions"}
              </button>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Role
                </span>
                <select
                  className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value as InterviewRole)
                  }
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-[12px] leading-5 text-text-muted">
                  {
                    roleOptions.find((option) => option.value === role)
                      ?.description
                  }
                </p>
              </label>

              <label className="space-y-2">
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Difficulty
                </span>
                <select
                  className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  value={difficulty}
                  onChange={(event) =>
                    setDifficulty(event.target.value as InterviewDifficulty)
                  }
                >
                  {difficultyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-[12px] leading-5 text-text-muted">
                  {
                    difficultyOptions.find(
                      (option) => option.value === difficulty,
                    )?.description
                  }
                </p>
              </label>
            </div>

            {error ? (
              <div className="mt-4 rounded-md border border-error-light bg-error-light p-4">
                <p className="text-[14px] font-medium leading-5 text-error-foreground">
                  Could not generate questions.
                </p>
                <p className="mt-1 text-[14px] leading-6 text-error-foreground">
                  {error}
                </p>
              </div>
            ) : null}
          </section>

          {hasSession ? (
            <div className="space-y-4">
              {questionCategories.map((category) => (
                <InterviewSection
                  key={category}
                  title={category}
                  questions={groupedQuestions[category]}
                />
              ))}
            </div>
          ) : (
            <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                No session yet
              </p>
              <h2 className="mt-3 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                Generate the first practice set to begin.
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-text-secondary">
                The backend will return six saved questions split across
                Technical, Behavioral, and HR prompts. Nothing is mocked here;
                the page stays empty until a live session is created.
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Session details
            </p>
            {hasSession ? (
              <div className="mt-4 space-y-3 text-[14px] leading-6 text-text-secondary">
                <div className="rounded-md border border-border bg-surface-secondary p-4">
                  <p>
                    Role{" "}
                    <span className="text-text-primary">{session.role}</span>
                  </p>
                  <p>
                    Difficulty{" "}
                    <span className="text-text-primary">
                      {session.difficulty}
                    </span>
                  </p>
                  <p>
                    Questions{" "}
                    <span className="text-text-primary">{totalQuestions}</span>
                  </p>
                  <p>
                    Saved on{" "}
                    <span className="text-text-primary">
                      {formatDate(session.createdAt)}
                    </span>
                  </p>
                </div>

                <div className="rounded-md border border-border bg-surface-secondary p-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    What this page does
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="rounded-md bg-surface px-3 py-2">
                      Generates a saved interview session from the backend.
                    </li>
                    <li className="rounded-md bg-surface px-3 py-2">
                      Groups the question set by Technical, Behavioral, and HR.
                    </li>
                    <li className="rounded-md bg-surface px-3 py-2">
                      Reveals model answers and follow-ups on each card.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-[14px] leading-6 text-text-secondary">
                The generated session will appear here once the backend responds.
              </p>
            )}
          </section>

          <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Flow
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-md border border-border bg-surface-secondary p-4">
                <p className="text-[14px] font-medium leading-5 text-text-primary">
                  1. Pick a role and difficulty
                </p>
                <p className="mt-1 text-[14px] leading-6 text-text-secondary">
                  Start with a focused practice target instead of a generic set.
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-secondary p-4">
                <p className="text-[14px] font-medium leading-5 text-text-primary">
                  2. Generate a live session
                </p>
                <p className="mt-1 text-[14px] leading-6 text-text-secondary">
                  The backend saves the generated questions and returns the full
                  session record.
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-secondary p-4">
                <p className="text-[14px] font-medium leading-5 text-text-primary">
                  3. Review answers by category
                </p>
                <p className="mt-1 text-[14px] leading-6 text-text-secondary">
                  Expand any card to compare your answer with a strong model
                  response and likely follow-up.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
