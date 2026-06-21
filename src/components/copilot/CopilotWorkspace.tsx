"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useResumes } from "@/hooks/queries/useResumes";
import { apiFetch } from "@/lib/api-client";
import type { AnalysisRecord } from "@/types/api";

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

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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
    <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
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

export function CopilotWorkspace() {
  const queryClient = useQueryClient();
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisRecord | null>(
    null,
  );
  const [selectedTab, setSelectedTab] = useState<OutputTabKey>("summary");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { data, isLoading, error } = useResumes();
  const resumes = data?.resumes ?? [];

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
    if (
      selectedResumeId &&
      resumes.length > 0 &&
      !resumes.some((resume) => resume.id === selectedResumeId)
    ) {
      setSelectedResumeId(activeResume?.id ?? resumes[0]?.id ?? "");
    }
  }, [activeResume?.id, resumes, selectedResumeId]);

  const selectedResume =
    resumes.find((resume) => resume.id === selectedResumeId) ?? activeResume;

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

  const liveAnalysis = analysisResult ?? previewAnalysis;
  const tone = getScoreTone(liveAnalysis.atsScore);
  const canAnalyze =
    Boolean(selectedResumeId) && jobDescriptionText.trim().length >= 40;

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
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
        <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
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
                Minimum 40 characters. The backend stores the result for later
                reuse.
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

        <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
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

        <article className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
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

      <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]">
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

        <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-md border border-border bg-surface-secondary p-4">
            {selectedTab === "summary" ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-link-bg-soft px-2 py-0.5 text-[12px] font-medium leading-4 text-link-deep">
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
              <div className="space-y-4">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Resume draft
                  </p>
                  <p className="mt-2 text-[16px] leading-7 text-text-primary">
                    Next step: generate an optimized resume from this saved
                    analysis.
                  </p>
                </div>
                <div className="rounded-md border border-border bg-surface p-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Preview
                  </p>
                  <p className="mt-3 text-[14px] leading-6 text-text-secondary">
                    Highlight the strongest resume bullets, mirror the job title
                    language, and keep the language specific to the role.
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-muted">
                  This tab is ready for the optimize endpoint in the next
                  backend pass.
                </p>
              </div>
            ) : null}

            {selectedTab === "cover-letter" ? (
              <div className="space-y-4">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Cover letter
                  </p>
                  <p className="mt-2 text-[16px] leading-7 text-text-primary">
                    Tone-aware letter preview for the same analysis context.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Professional", "Startup", "Corporate"].map((toneOption) => (
                    <div
                      key={toneOption}
                      className="rounded-md border border-border bg-surface p-3 text-[14px] leading-5 text-text-secondary"
                    >
                      {toneOption}
                    </div>
                  ))}
                </div>
                <p className="text-[12px] leading-4 text-text-muted">
                  The future backend endpoint will fill this panel and let the
                  user edit before export.
                </p>
              </div>
            ) : null}

            {selectedTab === "interview" ? (
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    Interview questions
                  </p>
                  <p className="mt-2 text-[16px] leading-7 text-text-primary">
                    Prepare follow-up prompts that map back to the ATS findings.
                  </p>
                </div>
                {[
                  {
                    title: "Technical",
                    body: "Tell me about a system you improved for performance or usability.",
                  },
                  {
                    title: "Behavioral",
                    body: "Describe a time when you had to balance speed and quality.",
                  },
                  {
                    title: "HR",
                    body: "Why does this role make sense for your next move?",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-md border border-border bg-surface p-3"
                  >
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-5 text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-md border border-border bg-surface p-4">
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
        </div>
      </section>
    </div>
  );
}
