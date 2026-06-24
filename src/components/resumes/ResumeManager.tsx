"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { UploadDropzone } from "@/components/shared/UploadDropzone";
import { useResumes, type ResumeRecord } from "@/hooks/queries/useResumes";
import { apiFetch } from "@/lib/api-client";
import { useAppDispatch } from "@/store/hooks";
import { setActiveResume } from "@/store/activeResumeSlice";

type ResumeDraft = {
  title: string;
  file: File | null;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatRelative(value: string): string {
  const date = new Date(value);
  const delta = date.getTime() - Date.now();
  const days = Math.round(delta / (1000 * 60 * 60 * 24));

  if (Math.abs(days) < 1) {
    return "Today";
  }

  if (Math.abs(days) < 7) {
    return `${Math.abs(days)}d ago`;
  }

  return formatDate(value);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function getPreview(text: string): string {
  const compact = text.trim().replaceAll(/\s+/g, " ");

  if (!compact) {
    return "No parsed text available yet.";
  }

  return compact.slice(0, 520);
}

function getScoreTone(score: number | null | undefined): string {
  if (typeof score !== "number") {
    return "bg-surface-secondary text-text-secondary";
  }

  if (score >= 80) {
    return "bg-success-light text-success-foreground";
  }

  if (score >= 50) {
    return "bg-warning-light text-warning-foreground";
  }

  return "bg-error-light text-error-foreground";
}

function getScoreLabel(score: number | null | undefined): string {
  return typeof score === "number" ? `${score}%` : "—";
}

function ResumeRow({
  resume,
  onSelect,
  onSetActive,
  onRename,
  onDelete,
  onDownload,
}: {
  resume: ResumeRecord;
  onSelect: (resume: ResumeRecord) => void;
  onSetActive: (resume: ResumeRecord) => void;
  onRename: (resume: ResumeRecord) => void;
  onDelete: (resume: ResumeRecord) => void;
  onDownload: (resume: ResumeRecord) => void;
}) {
  const latestScore = null;

  return (
    <tr
      className="cursor-pointer border-b border-border transition hover:bg-surface-secondary"
      onClick={() => onSelect(resume)}
    >
      <td className="px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-surface-secondary text-[12px] font-medium text-text-secondary">
            PDF
          </div>
          <div>
            <p className="text-[14px] font-medium leading-5 text-text-primary">
              {resume.title}
            </p>
            <p className="mt-1 text-[12px] leading-4 text-text-muted lg:hidden">
              {formatRelative(resume.createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-4 text-[14px] leading-5 text-text-secondary lg:table-cell">
        {formatRelative(resume.createdAt)}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-20 rounded-full bg-border">
            <div className={`h-1.5 rounded-full ${getScoreTone(latestScore)}`} style={{ width: "0%" }} />
          </div>
          <span className="text-[14px] leading-5 text-text-secondary">
            {getScoreLabel(latestScore)}
          </span>
        </div>
      </td>
      <td className="px-4 py-4">
        {resume.isActive ? (
          <span className="inline-flex rounded-full bg-success-light px-2 py-0.5 text-[12px] leading-4 text-success-foreground">
            Active
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] leading-4 text-text-secondary">
            Inactive
          </span>
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap justify-end gap-2">
          <button
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSetActive(resume);
            }}
          >
            Set active
          </button>
          <button
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRename(resume);
            }}
          >
            Rename
          </button>
          <button
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDownload(resume);
            }}
          >
            Download
          </button>
          <button
            className="inline-flex h-8 items-center justify-center rounded-sm border border-error-light bg-error-light px-3 text-[14px] font-medium leading-5 text-error-foreground transition hover:opacity-90"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(resume);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function ResumeCard({
  resume,
  onSelect,
  onSetActive,
  onRename,
  onDelete,
  onDownload,
}: {
  resume: ResumeRecord;
  onSelect: (resume: ResumeRecord) => void;
  onSetActive: (resume: ResumeRecord) => void;
  onRename: (resume: ResumeRecord) => void;
  onDelete: (resume: ResumeRecord) => void;
  onDownload: (resume: ResumeRecord) => void;
}) {
  const latestScore = null;

  return (
    <article
      className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]"
      onClick={() => onSelect(resume)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-surface-secondary text-[12px] font-medium text-text-secondary">
            PDF
          </div>
          <div>
            <p className="text-[14px] font-medium leading-5 text-text-primary">
              {resume.title}
            </p>
            <p className="mt-1 text-[12px] leading-4 text-text-muted">
              {formatDate(resume.createdAt)}
            </p>
          </div>
        </div>
        {resume.isActive ? (
          <span className="inline-flex rounded-full bg-success-light px-2 py-0.5 text-[12px] leading-4 text-success-foreground">
            Active
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
          <span>Latest ATS score</span>
          <span>{getScoreLabel(latestScore)}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-border">
          <div className={`h-1.5 rounded-full ${getScoreTone(latestScore)}`} style={{ width: "0%" }} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSetActive(resume);
          }}
        >
          Set active
        </button>
        <button
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRename(resume);
          }}
        >
          Rename
        </button>
        <button
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDownload(resume);
          }}
        >
          Download
        </button>
        <button
          className="inline-flex h-8 items-center justify-center rounded-sm border border-error-light bg-error-light px-3 text-[14px] font-medium leading-5 text-error-foreground"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(resume);
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

function ResumeDialog({
  open,
  title,
  draft,
  selectedResume,
  onClose,
  onDraftChange,
  onSubmit,
  submitting,
}: {
  open: boolean;
  title: string;
  draft: ResumeDraft;
  selectedResume: ResumeRecord | null;
  onClose: () => void;
  onDraftChange: (draft: ResumeDraft) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4">
      <div className="w-full max-w-md rounded-md border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] leading-4 text-text-muted">
              {title}
            </p>
            <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              {selectedResume ? `Update ${selectedResume.title}` : "Upload a resume"}
            </h2>
          </div>
          <button
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <UploadDropzone
            file={draft.file}
            onFileChange={(file) => onDraftChange({ ...draft, file })}
          />

          <label className="block space-y-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Title
            </span>
            <input
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              value={draft.title}
              onChange={(event) => onDraftChange({ ...draft, title: event.target.value })}
              placeholder="Optional. Defaults to the file name."
            />
          </label>

          <div className="flex items-center justify-end gap-2">
            <button
              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={submitting}
              onClick={onSubmit}
            >
              {submitting ? "Saving..." : selectedResume ? "Save changes" : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResumeManager() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useResumes();

  const resumes = data?.resumes ?? [];
  const activeResume = useMemo(
    () => resumes.find((resume) => resume.isActive) ?? null,
    [resumes],
  );
  const [selectedResume, setSelectedResume] = useState<ResumeRecord | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [draft, setDraft] = useState<ResumeDraft>({ title: "", file: null });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setActiveResume(activeResume?.id ?? null));
  }, [activeResume?.id, dispatch]);

  useEffect(() => {
    if (!selectedResumeId) {
      // Keeps the local detail drawer aligned with the selected resume id.
      setSelectedResume(null);
      return;
    }

    // Keeps the local detail drawer aligned with the selected resume id.
    setSelectedResume(resumes.find((resume) => resume.id === selectedResumeId) ?? null);
  }, [resumes, selectedResumeId]);

  const uploadMutation = useMutation({
    mutationFn: async (input: ResumeDraft) => {
      if (!input.file) {
        throw new Error("Choose a PDF resume before uploading.");
      }

      if (input.file.type !== "application/pdf") {
        throw new Error("Only PDF files are supported.");
      }

      if (input.file.size > 5 * 1024 * 1024) {
        throw new Error("Files must be 5MB or smaller.");
      }

      const formData = new FormData();
      formData.append("file", input.file);

      if (input.title.trim()) {
        formData.append("title", input.title.trim());
      }

      const response = await apiFetch<ResumeRecord>("/api/resumes", {
        method: "POST",
        body: formData,
      });

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not upload the resume.");
      }

      return response.data;
    },
    onSuccess: async () => {
      setDraft({ title: "", file: null });
      setIsUploadOpen(false);
      setStatusMessage("Resume uploaded.");
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (mutationError) => {
      setStatusMessage(getErrorMessage(mutationError));
    },
  });

  const patchResumeMutation = useMutation({
    mutationFn: async (input: { id: string; title?: string; isActive?: boolean }) => {
      const response = await apiFetch<ResumeRecord>(`/api/resumes/${input.id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      });

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not update the resume.");
      }

      return response.data;
    },
    onSuccess: async () => {
      setStatusMessage("Resume updated.");
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (mutationError) => {
      setStatusMessage(getErrorMessage(mutationError));
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch<{ deleted: boolean }>(`/api/resumes/${id}`, {
        method: "DELETE",
      });

      if (!response.success) {
        throw new Error(response.error ?? "Could not delete the resume.");
      }
    },
    onSuccess: async () => {
      setStatusMessage("Resume deleted.");
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (mutationError) => {
      setStatusMessage(getErrorMessage(mutationError));
    },
  });

  function openUploadDialog() {
    setSelectedResume(null);
    setDraft({ title: "", file: null });
    setShowDetails(false);
    setIsUploadOpen(true);
  }

  function openRenameDialog(resume: ResumeRecord) {
    setSelectedResume(resume);
    setRenameValue(resume.title);
    setDraft({ title: resume.title, file: null });
    setShowDetails(false);
    setIsUploadOpen(true);
  }

  function handleSelect(resume: ResumeRecord) {
    setSelectedResumeId(resume.id);
    setShowDetails(true);
  }

  function handleUploadSubmit() {
    if (selectedResume) {
      patchResumeMutation.mutate({
        id: selectedResume.id,
        title: draft.title.trim() || selectedResume.title,
      });
      return;
    }

    uploadMutation.mutate(draft);
  }

  const tableEmpty = !isLoading && resumes.length === 0;

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-[12px] leading-4 text-text-muted">RESUMES</p>
            <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Manage your resume library.
            </h1>
            <p className="mt-3 text-[16px] leading-7 text-text-secondary">
              Keep one resume active, upload new versions, and jump into the extracted text
              whenever you need to review the source copy.
            </p>
          </div>

          <button
            className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            type="button"
            onClick={openUploadDialog}
          >
            Upload Resume
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Saved resumes", value: resumes.length },
          { label: "Active resume", value: activeResume?.title ?? "None" },
          { label: "Latest action", value: statusMessage ?? "Ready" },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </p>
            <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              {item.value}
            </p>
            <p className="mt-2 text-[14px] leading-5 text-text-secondary">
              {item.label === "Latest action"
                ? "Upload, rename, set active, and delete feedback appears here."
                : item.label === "Active resume"
                  ? "The baseline resume used for Copilot analysis."
                  : "Total resumes stored in your workspace."}
            </p>
          </article>
        ))}
      </section>

      {isLoading ? (
        <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <p className="text-[14px] leading-6 text-text-secondary">Loading resumes...</p>
        </section>
      ) : error instanceof Error ? (
        <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <p className="text-[14px] leading-6 text-error">{error.message}</p>
        </section>
      ) : tableEmpty ? (
        <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-secondary text-[18px] text-text-muted">
              PDF
            </div>
            <p className="mt-4 text-[16px] font-medium leading-6 text-text-primary">
              No resumes yet
            </p>
            <p className="mt-2 max-w-md text-[14px] leading-6 text-text-secondary">
              Upload your resume to start tracking versions and to feed the Copilot workflow.
            </p>
            <button
              className="mt-5 inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary"
              type="button"
              onClick={openUploadDialog}
            >
              Upload Resume
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-md border border-border bg-surface shadow-[0_0_0_1px_var(--color-border)_inset]">
          <div className="overflow-hidden">
            <div className="hidden lg:block">
              <table className="w-full border-collapse">
                <thead className="border-b border-border bg-surface-secondary">
                  <tr>
                    {["Resume", "Uploaded", "Latest ATS Score", "Status", "Actions"].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left font-mono text-[12px] uppercase tracking-normal text-text-secondary"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resumes.map((resume) => (
                    <ResumeRow
                      key={resume.id}
                      resume={resume}
                      onSelect={handleSelect}
                      onSetActive={(item) =>
                        patchResumeMutation.mutate({ id: item.id, isActive: true })
                      }
                      onRename={openRenameDialog}
                      onDelete={(item) => {
                        if (window.confirm(`Delete ${item.title}? This cannot be undone.`)) {
                          deleteResumeMutation.mutate(item.id);
                        }
                      }}
                      onDownload={(item) => {
                        window.open(item.originalFileUrl, "_blank", "noreferrer");
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 lg:hidden">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onSelect={handleSelect}
                  onSetActive={(item) =>
                    patchResumeMutation.mutate({ id: item.id, isActive: true })
                  }
                  onRename={openRenameDialog}
                  onDelete={(item) => {
                    if (window.confirm(`Delete ${item.title}? This cannot be undone.`)) {
                      deleteResumeMutation.mutate(item.id);
                    }
                  }}
                  onDownload={(item) => window.open(item.originalFileUrl, "_blank", "noreferrer")}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {showDetails && selectedResume ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-background/70" onClick={() => setShowDetails(false)}>
          <aside
            className="h-full w-full max-w-xl overflow-y-auto border-l border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  RESUME DETAIL
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  {selectedResume.title}
                </h2>
              </div>
              <button
                className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary"
                type="button"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-md border border-border bg-surface-secondary p-4">
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  EXTRACTED TEXT
                </p>
                <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-surface-secondary p-4 font-mono text-[13px] leading-5 text-text-primary">
                  {getPreview(selectedResume.parsedText)}
                </pre>
              </div>
              <div className="rounded-md border border-border bg-surface-secondary p-4">
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  FILE
                </p>
                <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                  {selectedResume.originalFileUrl}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                  Uploaded {formatDate(selectedResume.createdAt)}.
                </p>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      <ResumeDialog
        open={isUploadOpen}
        title={selectedResume ? "Rename resume" : "Upload resume"}
        selectedResume={selectedResume}
        draft={selectedResume ? { title: renameValue || selectedResume.title, file: null } : draft}
        onClose={() => {
          setIsUploadOpen(false);
          setSelectedResume(null);
          setRenameValue("");
        }}
        onDraftChange={(nextDraft) => {
          if (selectedResume) {
            setRenameValue(nextDraft.title);
            return;
          }

          setDraft(nextDraft);
        }}
        onSubmit={() => {
          if (selectedResume) {
            patchResumeMutation.mutate({
              id: selectedResume.id,
              title: renameValue.trim() || selectedResume.title,
            });
            setIsUploadOpen(false);
            setSelectedResume(null);
            setRenameValue("");
            return;
          }

          handleUploadSubmit();
        }}
        submitting={uploadMutation.isPending || patchResumeMutation.isPending}
      />
    </div>
  );
}
