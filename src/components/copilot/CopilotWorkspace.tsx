"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  useCoverLetter,
  useOptimizeResume,
} from "@/hooks/queries/useAnalysis";
import { useGenerateInterviewQuestions } from "@/hooks/queries/useInterview";
import { useResumes } from "@/hooks/queries/useResumes";
import { apiDownload, apiFetch } from "@/lib/api-client";
import type {
  AnalysisRecord,
  CoverLetterRecord,
  CoverLetterTone,
  InterviewDifficulty,
  InterviewQuestion,
  InterviewRole,
  InterviewSessionRecord,
  OptimizedResumeRecord,
} from "@/types/api";

type OutputTabKey = "summary" | "resume" | "cover-letter" | "interview";

type ScoreLineProps = {
  label: string;
  value: number;
};

const previewAnalysis: AnalysisRecord = {
  id: "preview",
  resumeId: "preview",
  jobDescriptionText:
    "Paste a job description to generate a live ATS analysis. This panel shows the final layout before data arrives.",
  jobTitleDetected: "Senior Product Engineer",
  seniorityDetected: "senior",
  atsScore: 82,
  skillsMatch: 78,
  experienceMatch: 86,
  educationMatch: 74,
  missingKeywords: ["System design", "Performance tuning", "React testing"],
  strengths: [
    "Clear ownership across product-facing projects.",
    "Strong delivery cadence with practical, shippable work.",
    "Good alignment with front-end and API integration needs.",
  ],
  weaknesses: [
    "Some keywords are implied rather than explicit.",
    "The resume could show more measurable outcomes.",
  ],
  jobSummary: {
    whatTheyWant:
      "A product-minded engineer who can build polished user experiences and collaborate across the stack.",
    keyResponsibilities: [
      "Ship production-ready UI quickly.",
      "Work with backend and design partners.",
      "Improve performance and accessibility.",
    ],
  },
  aiModelUsed: "Preview mode",
  createdAt: new Date().toISOString(),
};

const previewInterviewSession: InterviewSessionRecord = {
  id: "preview",
  role: "fullstack",
  difficulty: "mid",
  questions: [
    {
      category: "Technical",
      question:
        "How would you structure a production-ready feature from API contract to UI delivery?",
      modelAnswer:
        "I would start by clarifying the data shape, defining the backend contract, and building the UI against mocked responses before wiring the live endpoint. I would keep the implementation testable at each layer and verify error states before shipping.",
      followUp:
        "How would you handle a schema change after the UI is already in review?",
    },
    {
      category: "Technical",
      question:
        "Tell me about a time you improved a user-facing workflow without expanding scope too much.",
      modelAnswer:
        "I would focus on the smallest change that removed the most friction, such as simplifying a form or reducing the number of steps to complete a task. I would validate the change with user feedback or a lightweight experiment instead of building extra features prematurely.",
      followUp:
        "What signal would tell you the simplification actually helped?",
    },
    {
      category: "Behavioral",
      question:
        "Describe a time you had to balance speed and quality on a deadline.",
      modelAnswer:
        "I would explain how I protected the critical path first, then separated must-have work from nice-to-have polish. That usually means shipping the core flow with clear error handling and leaving secondary improvements for a follow-up iteration.",
      followUp:
        "How did you communicate the trade-offs to stakeholders?",
    },
    {
      category: "Behavioral",
      question:
        "Tell me about a time you disagreed with a teammate about the implementation approach.",
      modelAnswer:
        "I would describe how I compared options against the actual constraints, then aligned on the approach that reduced risk or complexity. The goal is to keep the discussion grounded in the product outcome rather than personal preference.",
      followUp:
        "What would you do if the disagreement stayed unresolved?",
    },
    {
      category: "HR",
      question: "Why does this role make sense for your next move?",
      modelAnswer:
        "This role is a good fit because it combines ownership, delivery, and collaboration. I can contribute quickly while still growing in the areas that matter for the team, such as product thinking and reliable execution.",
      followUp:
        "What kind of team environment helps you do your best work?",
    },
    {
      category: "HR",
      question: "What would success look like for you in the first 90 days?",
      modelAnswer:
        "Success would mean I understand the product, ship a few meaningful improvements, and build trust with the team. I would want to show that I can learn quickly, communicate clearly, and deliver work that is easy to maintain.",
      followUp:
        "How would you prioritize your first few weeks?",
    },
  ],
  createdAt: new Date().toISOString(),
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function inferInterviewRole(title: string): InterviewRole {
  const normalized = title.toLowerCase();

  if (normalized.includes("backend")) {
    return "backend";
  }

  if (normalized.includes("frontend") || normalized.includes("front-end")) {
    return "frontend";
  }

  return "fullstack";
}

function inferInterviewDifficulty(
  seniority: AnalysisRecord["seniorityDetected"] | null,
): InterviewDifficulty {
  if (seniority === "junior" || seniority === "mid" || seniority === "senior") {
    return seniority;
  }

  return "mid";
}

function normalizeInterviewRole(value: string): InterviewRole {
  if (value === "frontend" || value === "backend" || value === "fullstack") {
    return value;
  }

  return "fullstack";
}

function normalizeInterviewDifficulty(value: string): InterviewDifficulty {
  if (value === "junior" || value === "mid" || value === "senior") {
    return value;
  }

  return "mid";
}

async function downloadBlob(
  path: string,
  filename: string,
  options: RequestInit = {},
): Promise<string | null> {
  const response = await apiDownload(path, options);

  if (!response.success || !response.blob) {
    return response.error ?? "Could not download the file.";
  }

  const url = URL.createObjectURL(response.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);

  return null;
}

function getScoreTone(score: number): {
  label: string;
  fillClass: string;
  textClass: string;
  chipClass: string;
} {
  if (score >= 80) {
    return {
      label: "Strong",
      fillClass: "bg-success",
      textClass: "text-success",
      chipClass: "bg-success-light text-success-foreground",
    };
  }

  if (score >= 50) {
    return {
      label: "Moderate",
      fillClass: "bg-warning",
      textClass: "text-warning",
      chipClass: "bg-warning-light text-warning-foreground",
    };
  }

  return {
    label: "Low",
    fillClass: "bg-error",
    textClass: "text-error",
    chipClass: "bg-error-light text-error-foreground",
  };
}

function ScoreLine({ label, value }: ScoreLineProps) {
  const tone = getScoreTone(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[14px] leading-5 text-text-primary">{label}</p>
        <p className={`text-[14px] font-medium leading-5 ${tone.textClass}`}>
          {value}%
        </p>
      </div>
      <div className="h-1 rounded-full bg-border">
        <div
          className={`h-1 rounded-full ${tone.fillClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  body,
}: {
  label: string;
  value: string;
  body: string;
}) {
  return (
    <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
        {label}
      </p>
      <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
        {value}
      </p>
      <p className="mt-2 text-[14px] leading-5 text-text-secondary">{body}</p>
    </article>
  );
}

function getInterviewCategoryChipClass(
  category: InterviewQuestion["category"],
): string {
  if (category === "Technical") {
    return "bg-accent-light text-accent";
  }

  if (category === "Behavioral") {
    return "bg-teal-light text-teal-foreground";
  }

  return "bg-surface-secondary text-text-secondary";
}

function InterviewQuestionNavigator({
  questions,
  activeIndex,
  onSelect,
}: {
  questions: InterviewQuestion[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <aside className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Question navigator
          </p>
          <h3 className="mt-2 text-[18px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
            {questions.length} question{questions.length === 1 ? "" : "s"}
          </h3>
        </div>
        <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
          {activeIndex + 1}/{questions.length || 1}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {questions.map((question, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${question.category}-${index}-${question.question}`}
              type="button"
              className={`w-full rounded-md border px-3 py-3 text-left transition duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive
                  ? "border-accent bg-surface-secondary"
                  : "border-border bg-surface hover:bg-surface-secondary"
              }`}
              onClick={() => onSelect(index)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    {question.category}
                  </p>
                  <p className="mt-1 break-words text-[14px] leading-6 text-text-primary">
                    Question {index + 1}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${getInterviewCategoryChipClass(question.category)}`}
                >
                  {isActive ? "Now" : "Jump"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function InterviewPracticeCard({
  question,
  index,
  total,
  onNext,
  onRecordAnswer,
}: {
  question: InterviewQuestion;
  index: number;
  total: number;
  onNext: () => void;
  onRecordAnswer: () => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <article className="min-w-0 rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset] lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Question {index + 1} of {total}
          </p>
          <h3 className="mt-2 text-[28px] font-semibold leading-9 tracking-[-0.04em] text-text-primary lg:text-[32px] lg:leading-10">
            Current question
          </h3>
        </div>

        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${getInterviewCategoryChipClass(question.category)}`}
        >
          {question.category}
        </span>
      </div>

      <p className="mt-6 max-w-3xl text-[20px] leading-8 text-text-primary lg:text-[24px] lg:leading-10">
        {question.question}
      </p>

      {showAnswer ? (
        <div className="mt-8 space-y-4 rounded-md border border-border bg-surface-secondary p-4 lg:p-5">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Model answer
            </p>
            <p className="mt-2 break-words text-[14px] leading-6 text-text-secondary lg:text-[16px] lg:leading-7">
              {question.modelAnswer}
            </p>
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Follow-up
            </p>
            <p className="mt-2 break-words text-[14px] leading-6 text-text-secondary lg:text-[16px] lg:leading-7">
              {question.followUp}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-8 max-w-2xl text-[14px] leading-6 text-text-muted">
          Reveal the answer only after you have talked through the question.
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
          onClick={() => setShowAnswer((current) => !current)}
        >
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
          onClick={onNext}
        >
          Next question
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
          onClick={onRecordAnswer}
        >
          Record answer
        </button>
      </div>
    </article>
  );
}

export function CopilotWorkspace() {
  const queryClient = useQueryClient();
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisRecord | null>(
    null,
  );
  const [optimizedResume, setOptimizedResume] =
    useState<OptimizedResumeRecord | null>(null);
  const [coverLetterResult, setCoverLetterResult] =
    useState<CoverLetterRecord | null>(null);
  const [coverLetterTone, setCoverLetterTone] =
    useState<CoverLetterTone>("professional");
  const [coverLetterDraft, setCoverLetterDraft] = useState("");
  const [interviewSession, setInterviewSession] =
    useState<InterviewSessionRecord | null>(null);
  const [interviewRole, setInterviewRole] = useState<InterviewRole>("fullstack");
  const [interviewDifficulty, setInterviewDifficulty] =
    useState<InterviewDifficulty>("mid");
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<OutputTabKey>("summary");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { data, isLoading, error } = useResumes();
  const resumes = useMemo(() => data?.resumes ?? [], [data?.resumes]);

  const activeResume = useMemo(
    () => resumes.find((resume) => resume.isActive) ?? null,
    [resumes],
  );

  useEffect(() => {
    if (selectedResumeId || resumes.length === 0) {
      return;
    }

    setSelectedResumeId(activeResume?.id ?? resumes[0]?.id ?? "");
  }, [activeResume?.id, resumes, selectedResumeId]);

  useEffect(() => {
    setAnalysisResult(null);
    setOptimizedResume(null);
    setCoverLetterResult(null);
    setCoverLetterDraft("");
    setInterviewSession(null);
    setInterviewQuestionIndex(0);
    setCoverLetterTone("professional");
    setSelectedTab("summary");
    setFeedbackMessage(null);
  }, [selectedResumeId]);

  useEffect(() => {
    if (
      selectedResumeId &&
      resumes.length > 0 &&
      !resumes.some((resume) => resume.id === selectedResumeId)
    ) {
      setSelectedResumeId(activeResume?.id ?? resumes[0]?.id ?? "");
    }
  }, [activeResume?.id, resumes, selectedResumeId]);

  useEffect(() => {
    if (!analysisResult || analysisResult.id === "preview") {
      setInterviewRole("fullstack");
      setInterviewDifficulty("mid");
      return;
    }

    setInterviewRole(inferInterviewRole(analysisResult.jobTitleDetected));
    setInterviewDifficulty(
      inferInterviewDifficulty(analysisResult.seniorityDetected),
    );
  }, [analysisResult]);

  const selectedResume =
    resumes.find((resume) => resume.id === selectedResumeId) ?? activeResume;
  const canOptimize =
    analysisResult !== null && analysisResult.id !== "preview";
  const canGenerateCoverLetter =
    analysisResult !== null && analysisResult.id !== "preview";
  const canGenerateInterviewQuestions = true;
  const optimizeResumeMutation = useOptimizeResume(analysisResult?.id ?? null);
  const coverLetterMutation = useCoverLetter(analysisResult?.id ?? null);
  const interviewQuestionsMutation = useGenerateInterviewQuestions();

  const analysisMutation = useMutation({
    mutationFn: async () => {
      if (!selectedResumeId) {
        throw new Error("Select a resume before running Copilot.");
      }

      const trimmedJobDescription = jobDescriptionText.trim();
      if (trimmedJobDescription.length < 40) {
        throw new Error("Paste a longer job description before analyzing.");
      }

      const response = await apiFetch<AnalysisRecord>("/api/analyses", {
        method: "POST",
        body: JSON.stringify({
          resumeId: selectedResumeId,
          jobDescriptionText: trimmedJobDescription,
        }),
      });

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not run ATS analysis.");
      }

      return response.data;
    },
    onSuccess: async (data) => {
      setAnalysisResult(data);
      setOptimizedResume(null);
      setCoverLetterResult(null);
      setCoverLetterDraft("");
      setSelectedTab("summary");
      setFeedbackMessage(`Analysis saved with ${data.aiModelUsed}.`);
      await queryClient.setQueryData(["analysis", data.id], data);
    },
    onError: (mutationError) => {
      setFeedbackMessage(
        mutationError instanceof Error
          ? mutationError.message
          : "Something went wrong.",
      );
    },
  });

  function handleOptimizeResume(): void {
    if (!canOptimize) {
      setFeedbackMessage("Run an analysis before optimizing the resume.");
      return;
    }

    optimizeResumeMutation.mutate(undefined, {
      onSuccess: (data) => {
        setOptimizedResume(data);
        setSelectedTab("resume");
        setFeedbackMessage("Optimized resume saved.");
      },
      onError: (mutationError) => {
        setFeedbackMessage(
          mutationError instanceof Error
            ? mutationError.message
            : "Something went wrong.",
        );
      },
    });
  }

  function handleGenerateCoverLetter(): void {
    if (!canGenerateCoverLetter) {
      setFeedbackMessage("Run an analysis before generating a cover letter.");
      return;
    }

    coverLetterMutation.mutate(coverLetterTone, {
      onSuccess: (data) => {
        setCoverLetterResult(data);
        setCoverLetterDraft(data.content);
        setSelectedTab("cover-letter");
        setFeedbackMessage("Cover letter saved.");
      },
      onError: (mutationError) => {
        setFeedbackMessage(
          mutationError instanceof Error
            ? mutationError.message
            : "Something went wrong.",
        );
      },
    });
  }

  function handleGenerateInterviewQuestions(): void {
    interviewQuestionsMutation.mutate(
      {
        role: interviewRole,
        difficulty: interviewDifficulty,
      },
      {
        onSuccess: (data) => {
          setInterviewSession(data);
          setInterviewQuestionIndex(0);
          setSelectedTab("interview");
          setFeedbackMessage("Interview questions saved.");
        },
        onError: (mutationError) => {
          setFeedbackMessage(
            mutationError instanceof Error
              ? mutationError.message
              : "Something went wrong.",
          );
        },
      },
    );
  }

  async function handleDownloadOptimizedResume(): Promise<void> {
    if (!optimizedResume) {
      setFeedbackMessage("Generate the optimized resume before downloading.");
      return;
    }

    const errorMessage = await downloadBlob(
      `/api/analyses/${analysisResult?.id}/optimize/download`,
      `optimized-resume-${analysisResult?.id}.pdf`,
    );

    if (errorMessage) {
      setFeedbackMessage(errorMessage);
    }
  }

  async function handleDownloadCoverLetter(): Promise<void> {
    if (!coverLetterResult) {
      setFeedbackMessage("Generate the cover letter before downloading.");
      return;
    }

    const tone = coverLetterResult.tone ?? coverLetterTone;
    const errorMessage = await downloadBlob(
      `/api/analyses/${analysisResult?.id}/cover-letter/download?tone=${encodeURIComponent(tone)}`,
      `cover-letter-${analysisResult?.id}-${tone}.pdf`,
    );

    if (errorMessage) {
      setFeedbackMessage(errorMessage);
    }
  }

  const activeInterviewSession = interviewSession ?? previewInterviewSession;
  const activeInterviewQuestions = activeInterviewSession.questions;
  const activeInterviewQuestion =
    activeInterviewQuestions[interviewQuestionIndex] ??
    activeInterviewQuestions[0] ??
    previewInterviewSession.questions[0];
  const activeInterviewQuestionCount = activeInterviewQuestions.length || 1;

  function handleNextInterviewQuestion(): void {
    if (activeInterviewQuestions.length === 0) {
      return;
    }

    setInterviewQuestionIndex((current) =>
      (current + 1) % activeInterviewQuestions.length,
    );
  }

  function handleSelectInterviewQuestion(nextIndex: number): void {
    if (nextIndex < 0 || nextIndex >= activeInterviewQuestions.length) {
      return;
    }

    setInterviewQuestionIndex(nextIndex);
  }

  function handleRecordInterviewAnswer(): void {
    setFeedbackMessage("Answer recording is not connected yet.");
  }

  const liveAnalysis = analysisResult ?? previewAnalysis;
  const tone = getScoreTone(liveAnalysis.atsScore);
  const canAnalyze =
    Boolean(selectedResumeId) && jobDescriptionText.trim().length >= 40;

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Copilot
            </p>
            <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Run ATS analysis against a resume and job description.
            </h1>
            <p className="mt-3 text-[16px] leading-7 text-text-secondary">
              Pick an active resume, paste a job description, and get a
              structured analysis you can turn into an optimized resume, cover
              letter, or interview prep later.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
              {resumes.length} resume{resumes.length === 1 ? "" : "s"} loaded
            </span>
            <span className="inline-flex rounded-full bg-success-light px-2 py-0.5 text-[12px] font-medium leading-4 text-success-foreground">
              {liveAnalysis.aiModelUsed}
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr_1.15fr]">
        <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Input
              </p>
              <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                Pick a resume and paste a job description.
              </h2>
            </div>
            <Link
              href="/resumes"
              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            >
              Manage resumes
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Resume
              </span>
              {isLoading ? (
                <div className="rounded-sm border border-border bg-surface-secondary px-3 py-2 text-[14px] leading-5 text-text-secondary">
                  Loading resumes...
                </div>
              ) : error instanceof Error ? (
                <div className="rounded-sm border border-error-light bg-error-light px-3 py-2 text-[14px] leading-5 text-error-foreground">
                  {error.message}
                </div>
              ) : resumes.length === 0 ? (
                <div className="rounded-sm border border-border bg-surface-secondary p-4">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    No resumes yet.
                  </p>
                  <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                    Upload one in the resume manager before running Copilot.
                  </p>
                </div>
              ) : (
                <select
                  className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  value={selectedResumeId}
                  onChange={(event) => setSelectedResumeId(event.target.value)}
                >
                  <option value="">Select a resume</option>
                  {resumes.map((resume) => (
                    <option key={resume.id} value={resume.id}>
                      {resume.title}
                      {resume.isActive ? " (active)" : ""}
                    </option>
                  ))}
                </select>
              )}
            </label>

            <div className="rounded-md border border-border bg-surface-secondary p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Selected resume
              </p>
              <p className="mt-2 text-[14px] font-medium leading-5 text-text-primary">
                {selectedResume?.title ?? "None selected"}
              </p>
              <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                {selectedResume
                  ? `Uploaded ${formatDate(selectedResume.createdAt)}`
                  : "Choose a resume to see Copilot analysis."}
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Job description
              </span>
              <textarea
                className="min-h-[224px] w-full rounded-sm border border-border bg-surface px-3 py-2 text-[14px] leading-6 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Paste the role description here. Include responsibilities, must-have skills, and any preferred qualifications."
                value={jobDescriptionText}
                onChange={(event) => setJobDescriptionText(event.target.value)}
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] leading-4 text-text-muted">
                Minimum 40 characters.
              </p>
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={analysisMutation.isPending || isPending || !canAnalyze}
                onClick={() => {
                  startTransition(() => {
                    analysisMutation.mutate();
                  });
                }}
              >
                {analysisMutation.isPending ? "Analyzing..." : "Run analysis"}
              </button>
            </div>

            {feedbackMessage ? (
              <p className="rounded-sm border border-border bg-surface-secondary px-3 py-2 text-[14px] leading-5 text-text-secondary">
                {feedbackMessage}
              </p>
            ) : null}
          </div>
        </article>

        <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Processing
              </p>
              <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                Flow status
              </h2>
            </div>
            <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
              {analysisMutation.isPending ? "Running" : "Ready"}
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {[
              {
                title: "1. Resume",
                description: selectedResume
                  ? selectedResume.title
                  : "Select a resume to analyze.",
                state: selectedResume ? "complete" : "idle",
              },
              {
                title: "2. ATS analysis",
                description: analysisMutation.isPending
                  ? "Gemini is scoring the resume and extracting key signals."
                  : "Model output will appear here after the request completes.",
                state: analysisMutation.isPending ? "active" : "idle",
              },
              {
                title: "3. Save result",
                description: analysisResult
                  ? `Saved on ${formatDate(analysisResult.createdAt)}.`
                  : "The analysis will be stored in the backend after success.",
                state: analysisResult ? "complete" : "idle",
              },
            ].map((step) => {
              const isActive = step.state === "active";
              const isComplete = step.state === "complete";

              return (
                <div
                  key={step.title}
                  className={`rounded-md border p-4 ${
                    isActive
                      ? "border-accent bg-surface-secondary"
                      : "border-border bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      {step.title}
                    </p>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${
                        isComplete
                          ? "bg-success-light text-success-foreground"
                          : isActive
                            ? "bg-warning-light text-warning-foreground"
                            : "bg-surface-secondary text-text-secondary"
                      }`}
                    >
                      {isComplete ? "Done" : isActive ? "Working" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-5 text-text-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-md border border-border bg-surface-secondary p-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Quick check
            </p>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[14px] leading-5 text-text-primary">
                  Resume fit
                </p>
                <span className={`rounded-full px-2 py-0.5 text-[12px] ${tone.chipClass}`}>
                  {tone.label}
                </span>
              </div>
              <p className="text-[14px] leading-5 text-text-secondary">
                {selectedResume
                  ? "Copilot uses the active resume as the baseline and scores the job description against it."
                  : "Pick a resume to unlock the analysis workflow."}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                ATS score dashboard
              </p>
              <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                {liveAnalysis.jobTitleDetected}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[12px] uppercase tracking-[0.12em] text-text-muted">
                Overall
              </p>
              <p className="mt-1 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
                {liveAnalysis.atsScore}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Skills match"
              value={`${liveAnalysis.skillsMatch}%`}
              body="Keyword and tool overlap."
            />
            <StatCard
              label="Experience match"
              value={`${liveAnalysis.experienceMatch}%`}
              body="Senior-level scope and outcomes."
            />
            <StatCard
              label="Education match"
              value={`${liveAnalysis.educationMatch}%`}
              body="Formal requirements and degree fit."
            />
          </div>

          <div className="mt-5 space-y-4">
            <ScoreLine label="Skills" value={liveAnalysis.skillsMatch} />
            <ScoreLine label="Experience" value={liveAnalysis.experienceMatch} />
            <ScoreLine label="Education" value={liveAnalysis.educationMatch} />
          </div>

          <div className="mt-5 rounded-md border border-border bg-surface-secondary p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Keywords
              </p>
              <span className="text-[12px] leading-4 text-text-muted">
                {liveAnalysis.missingKeywords.length} missing
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {liveAnalysis.missingKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex rounded-full bg-warning-light px-2 py-0.5 text-[12px] font-medium leading-4 text-warning-foreground"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Output tabs
            </p>
            <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
              Move from analysis to the next action.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "summary", label: "ATS summary" },
              { key: "resume", label: "Resume draft" },
              { key: "cover-letter", label: "Cover letter" },
              { key: "interview", label: "Interview Qs" },
            ].map((tab) => {
              const isActive = selectedTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`inline-flex h-8 items-center justify-center rounded-sm px-3 text-[14px] font-medium leading-5 transition ${
                    isActive
                      ? "bg-accent text-on-primary"
                      : "border border-border bg-surface text-text-primary hover:bg-surface-secondary"
                  }`}
                  onClick={() => setSelectedTab(tab.key as OutputTabKey)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid items-start gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.75fr)]">
          <div className={`min-w-0 rounded-md border border-border bg-surface-secondary p-4 ${selectedTab !== "summary" ? "col-span-full" : ""}`}>
            {selectedTab === "summary" ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-accent-light px-2 py-0.5 text-[12px] font-medium leading-4 text-accent">
                    {liveAnalysis.seniorityDetected}
                  </span>
                  <span className="inline-flex rounded-full bg-surface px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                    {formatDate(liveAnalysis.createdAt)}
                  </span>
                </div>

                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Summary
                  </p>
                  <p className="mt-2 text-[16px] leading-7 text-text-primary">
                    {liveAnalysis.jobSummary.whatTheyWant}
                  </p>
                </div>

                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Key responsibilities
                  </p>
                  <ul className="mt-3 space-y-2">
                    {liveAnalysis.jobSummary.keyResponsibilities.map(
                      (item) => (
                        <li
                          key={item}
                          className="rounded-md border border-border bg-surface px-3 py-2 text-[14px] leading-5 text-text-secondary"
                        >
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ) : null}

            {selectedTab === "resume" ? (
              <div className="space-y-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      Resume draft
                    </p>
                    <p className="mt-2 text-[16px] leading-7 text-text-primary">
                      Compare the source resume with the optimized rewrite
                      generated from the analysis.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={
                        !canOptimize || optimizeResumeMutation.isPending
                      }
                      onClick={handleOptimizeResume}
                    >
                      {optimizeResumeMutation.isPending
                        ? "Optimizing..."
                        : "Generate optimized resume"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!optimizedResume}
                      onClick={() => {
                        void handleDownloadOptimizedResume();
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>

                {!canOptimize ? (
                  <div className="rounded-md border border-border bg-surface-secondary p-4">
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      Run an analysis first.
                    </p>
                    <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                      The optimizer uses the saved analysis and original resume
                      text, so this tab unlocks after Copilot finishes.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 xxl:grid-cols-2">
                      <article className="min-w-0 rounded-md border border-border bg-surface-secondary p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                              Original
                            </p>
                            <h3 className="mt-2 text-[18px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                              {selectedResume?.title ?? "Selected resume"}
                            </h3>
                          </div>
                          <span className="inline-flex rounded-full bg-surface px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                            Source text
                          </span>
                        </div>

                        <div className="mt-4 rounded-md border border-border bg-surface p-4">
                          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap text-[14px] leading-6 text-text-secondary">
                            {selectedResume?.parsedText ??
                              "No source resume text is available."}
                          </pre>
                        </div>
                      </article>

                      <article className="min-w-0 rounded-md border border-border bg-surface-secondary p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                              Optimized
                            </p>
                            <h3 className="mt-2 text-[18px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                              {optimizedResume?.optimizedContent.headline ??
                                "Generate the rewrite to compare it here."}
                            </h3>
                          </div>
                          <span className="inline-flex rounded-full bg-success-light px-2 py-0.5 text-[12px] font-medium leading-4 text-success-foreground">
                            {optimizedResume ? "Saved" : "Pending"}
                          </span>
                        </div>

                        {optimizedResume ? (
                          <div className="mt-4 space-y-4">
                            <div className="rounded-md border border-border bg-surface p-4">
                              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                                Summary
                              </p>
                              <p className="mt-2 text-[14px] leading-6 text-text-primary">
                                {optimizedResume.optimizedContent.summary}
                              </p>
                            </div>

                            <div className="space-y-3">
                              {optimizedResume.optimizedContent.sectionPairs.map(
                                (pair) => (
                                  <div
                                    key={`${pair.section}-${pair.optimized}`}
                                    className="rounded-md border border-border bg-surface p-4"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                                        {pair.section}
                                      </p>
                                      <span className="text-[12px] leading-4 text-text-muted">
                                        {pair.reason}
                                      </span>
                                    </div>
                                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                                      <div className="rounded-sm border border-border bg-surface-secondary p-3">
                                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                                          Original
                                        </p>
                                        <p className="mt-2 whitespace-pre-wrap text-[14px] leading-6 text-text-secondary">
                                          {pair.original}
                                        </p>
                                      </div>
                                      <div className="rounded-sm border border-accent bg-surface-secondary p-3">
                                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                                          Optimized
                                        </p>
                                        <p className="mt-2 whitespace-pre-wrap text-[14px] leading-6 text-text-primary">
                                          {pair.optimized}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>

                            <div className="rounded-md border border-border bg-surface p-4">
                              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                                Keyword integrations
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {optimizedResume.optimizedContent.keywordIntegrations.map(
                                  (keyword) => (
                                    <span
                                      key={keyword}
                                      className="inline-flex rounded-full bg-accent-light px-2 py-0.5 text-[12px] font-medium leading-4 text-accent"
                                    >
                                      {keyword}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>

                            <div className="rounded-md border border-border bg-surface p-4">
                              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                                Next steps
                              </p>
                              <ul className="mt-3 space-y-2">
                                {optimizedResume.optimizedContent.nextSteps.map(
                                  (step) => (
                                    <li
                                      key={step}
                                      className="rounded-sm border border-border bg-surface-secondary px-3 py-2 text-[14px] leading-5 text-text-secondary"
                                    >
                                      {step}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 rounded-md border border-border bg-surface p-4">
                            <p className="text-[14px] font-medium leading-5 text-text-primary">
                              Ready to rewrite.
                            </p>
                            <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                              Generate the optimized resume to populate this
                              side of the comparison with tailored bullets,
                              keyword placements, and follow-up actions.
                            </p>
                          </div>
                        )}
                      </article>
                    </div>

                  
                  </>
                )}
              </div>
            ) : null}

            {selectedTab === "cover-letter" ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      Cover letter
                    </p>
                    <p className="mt-2 text-[16px] leading-7 text-text-primary">
                      Generate a tone-aware draft, then edit it before export.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2">
                      <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                        Tone
                      </span>
                      <select
                        className="h-8 rounded-sm border border-border bg-surface px-2 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                        value={coverLetterTone}
                        onChange={(event) =>
                          setCoverLetterTone(
                            event.target.value as CoverLetterTone,
                          )
                        }
                      >
                        <option value="professional">Professional</option>
                        <option value="startup">Startup</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </label>

                    <button
                      type="button"
                      className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={
                        !canGenerateCoverLetter ||
                        coverLetterMutation.isPending
                      }
                      onClick={handleGenerateCoverLetter}
                    >
                      {coverLetterMutation.isPending
                        ? "Generating..."
                        : "Generate cover letter"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!coverLetterResult}
                      onClick={() => {
                        void handleDownloadCoverLetter();
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>

                {!canGenerateCoverLetter ? (
                  <div className="rounded-md border border-border bg-surface-secondary p-4">
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      Run an analysis first.
                    </p>
                    <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                      The cover letter uses the saved analysis and original
                      resume text, so this tab unlocks after Copilot finishes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-md border border-border bg-surface-secondary p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                          Draft
                        </p>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${
                            coverLetterResult
                              ? "bg-success-light text-success-foreground"
                              : "bg-surface text-text-secondary"
                          }`}
                        >
                          {coverLetterResult
                            ? coverLetterResult.tone
                            : "Pending"}
                        </span>
                      </div>
                      <textarea
                        className="mt-3 min-h-80 w-full rounded-sm border border-border bg-surface px-3 py-2 text-[14px] leading-6 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Generate a cover letter to populate this draft, then refine the wording here."
                        value={coverLetterDraft}
                        onChange={(event) =>
                          setCoverLetterDraft(event.target.value)
                        }
                      />
                    </div>

                    
                  </div>
                )}
              </div>
            ) : null}

            {selectedTab === "interview" ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      Interview questions
                    </p>
                    <p className="mt-2 text-[16px] leading-7 text-text-primary">
                      Generate a role-specific practice set and step through it
                      one answer at a time.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2">
                      <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                        Role
                      </span>
                      <select
                        className="h-8 rounded-sm border border-border bg-surface px-2 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                        value={interviewRole}
                        onChange={(event) =>
                          setInterviewRole(
                            normalizeInterviewRole(event.target.value),
                          )
                        }
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                      </select>
                    </label>

                    <label className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2">
                      <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                        Difficulty
                      </span>
                      <select
                        className="h-8 rounded-sm border border-border bg-surface px-2 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                        value={interviewDifficulty}
                        onChange={(event) =>
                          setInterviewDifficulty(
                            normalizeInterviewDifficulty(event.target.value),
                          )
                        }
                      >
                        <option value="junior">Junior</option>
                        <option value="mid">Mid</option>
                        <option value="senior">Senior</option>
                      </select>
                    </label>

                    <button
                      type="button"
                      className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={
                        !canGenerateInterviewQuestions ||
                        interviewQuestionsMutation.isPending
                      }
                      onClick={handleGenerateInterviewQuestions}
                    >
                      {interviewQuestionsMutation.isPending
                        ? "Generating..."
                        : "Generate questions"}
                    </button>
                  </div>
                </div>

                {!canGenerateInterviewQuestions ? (
                  <div className="rounded-md border border-border bg-surface-secondary p-4">
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      Run an analysis first.
                    </p>
                    <p className="mt-1 text-[14px] leading-5 text-text-secondary">
                      The interview generator uses the saved analysis to pick a
                      relevant role and difficulty before creating the practice
                      set.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 rounded-md border border-border bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--color-border)_inset] lg:flex-row lg:items-center lg:justify-between">
                      <div className="space-y-2">
                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                          Live practice set
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex rounded-full bg-accent-light px-2 py-0.5 text-[12px] font-medium leading-4 text-accent">
                            {activeInterviewSession.role}
                          </span>
                          <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                            {activeInterviewSession.difficulty}
                          </span>
                          <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                            {activeInterviewQuestionCount} question
                            {activeInterviewQuestionCount === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={interviewQuestionsMutation.isPending}
                        onClick={handleGenerateInterviewQuestions}
                      >
                        {interviewQuestionsMutation.isPending
                          ? "Generating..."
                          : "New set"}
                      </button>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                      <div className="space-y-4">
                        <div className="mx-auto w-full max-w-5xl">
                          <InterviewPracticeCard
                            key={`${activeInterviewSession.id}-${interviewQuestionIndex}`}
                            question={activeInterviewQuestion}
                            index={interviewQuestionIndex}
                            total={activeInterviewQuestionCount}
                            onNext={handleNextInterviewQuestion}
                            onRecordAnswer={handleRecordInterviewAnswer}
                          />
                        </div>

                        <details className="rounded-md border border-border bg-surface p-4 xl:hidden">
                          <summary className="cursor-pointer list-none text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                            Question navigator
                          </summary>
                          <div className="mt-4">
                            <InterviewQuestionNavigator
                              questions={activeInterviewQuestions}
                              activeIndex={interviewQuestionIndex}
                              onSelect={handleSelectInterviewQuestion}
                            />
                          </div>
                        </details>
                      </div>

                      <div className="hidden xl:block">
                        <div className="sticky top-6">
                          <InterviewQuestionNavigator
                            questions={activeInterviewQuestions}
                            activeIndex={interviewQuestionIndex}
                            onSelect={handleSelectInterviewQuestion}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {selectedTab === "summary" ? (
            <div className="min-w-0 rounded-md border border-border bg-surface p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Insights
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-md border border-border bg-surface-secondary p-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Strengths
                  </p>
                  <ul className="mt-3 space-y-2">
                    {liveAnalysis.strengths.map((item) => (
                      <li
                        key={item}
                        className="rounded-md bg-surface px-3 py-2 text-[14px] leading-5 text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-border bg-surface-secondary p-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Weaknesses
                  </p>
                  <ul className="mt-3 space-y-2">
                    {liveAnalysis.weaknesses.map((item) => (
                      <li
                        key={item}
                        className="rounded-md bg-surface px-3 py-2 text-[14px] leading-5 text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-border bg-surface-secondary p-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    ATS fit
                  </p>
                  <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                    {liveAnalysis.atsScore >= 80
                      ? "This resume is already competitive. The fastest wins are keyword alignment and stronger measurable outcomes."
                      : "There is room to improve the baseline fit before you optimize the resume draft."}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
