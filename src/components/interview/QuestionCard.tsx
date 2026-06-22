"use client";

import { useEffect, useState } from "react";

import type { InterviewQuestion } from "@/types/api";

type QuestionCardProps = {
  question: InterviewQuestion;
  index: number;
  total: number;
  onNext: () => void;
};

export function QuestionCard({
  question,
  index,
  total,
  onNext,
}: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [question]);

  return (
    <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            {question.category}
          </p>
          <h3 className="mt-2 text-[18px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
            Question {index + 1} of {total}
          </h3>
        </div>

        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
          onClick={() => setShowAnswer((current) => !current)}
        >
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
      </div>

      <p className="mt-4 text-[16px] leading-7 text-text-primary">
        {question.question}
      </p>

      {showAnswer ? (
        <div className="mt-4 space-y-3 rounded-md border border-border bg-surface-secondary p-4">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Model answer
            </p>
            <p className="mt-2 text-[14px] leading-6 text-text-secondary">
              {question.modelAnswer}
            </p>
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Follow-up
            </p>
            <p className="mt-2 text-[14px] leading-6 text-text-secondary">
              {question.followUp}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-[14px] leading-6 text-text-muted">
          Show the answer to compare a strong response and the likely follow-up.
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
          {index + 1}/{total}
        </span>
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
          onClick={onNext}
        >
          Next question
        </button>
      </div>
    </article>
  );
}
