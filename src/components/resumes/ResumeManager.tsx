"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { apiFetch } from "@/lib/api-client";
import { setActiveResume } from "@/store/activeResumeSlice";
import { useResumes, type ResumeRecord } from "@/hooks/queries/useResumes";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export function ResumeManager() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { data, isLoading, error } = useResumes();

  const resumes = data?.resumes ?? [];

  const activeResume = useMemo(
    () => resumes.find((resume) => resume.isActive) ?? null,
    [resumes],
  );

  useEffect(() => {
    dispatch(setActiveResume(activeResume?.id ?? null));
  }, [activeResume?.id, dispatch]);

  const createResumeMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) {
        throw new Error("Choose a PDF resume before uploading.");
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      if (title.trim().length > 0) {
        formData.append("title", title.trim());
      }

      const response = await apiFetch<ResumeRecord>("/api/resumes", {
        method: "POST",
        body: formData,
      });

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Upload failed.");
      }

      return response.data;
    },
    onSuccess: async () => {
      setSelectedFile(null);
      setTitle("");
      setStatusMessage("Resume uploaded successfully.");
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (mutationError) => {
      setStatusMessage(getErrorMessage(mutationError));
    },
  });

  const updateResumeMutation = useMutation({
    mutationFn: async (input: {
      id: string;
      title?: string;
      isActive?: boolean;
    }) => {
      const response = await apiFetch<ResumeRecord>(
        `/api/resumes/${input.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...(input.title ? { title: input.title } : {}),
            ...(typeof input.isActive === "boolean"
              ? { isActive: input.isActive }
              : {}),
          }),
        },
      );

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not update the resume.");
      }

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      setEditingResumeId(null);
      setEditingTitle("");
      setStatusMessage("Resume updated.");
    },
    onError: (mutationError) => {
      setStatusMessage(getErrorMessage(mutationError));
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch<{ deleted: boolean }>(
        `/api/resumes/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.success) {
        throw new Error(response.error ?? "Could not delete the resume.");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      setStatusMessage("Resume deleted.");
    },
    onError: (mutationError) => {
      setStatusMessage(getErrorMessage(mutationError));
    },
  });

  const currentCount = resumes.length;

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
          Resumes
        </p>
        <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
          Manage your resume library.
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-text-secondary">
          Upload PDFs, keep one resume active, and manage the versions you use
          for Copilot analysis.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Saved resumes",
            value: String(currentCount),
            body: "Total resumes stored in your workspace.",
          },
          {
            label: "Active resume",
            value: activeResume?.title ?? "None",
            body: activeResume ? "Used by default in future workflows." : "Upload one to get started.",
          },
          {
            label: "Latest action",
            value: statusMessage ?? "Ready",
            body: "Recent upload, edit, or delete feedback appears here.",
          },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--border)_inset]"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </p>
            <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              {item.value}
            </p>
            <p className="mt-2 text-[14px] leading-5 text-text-secondary">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Upload
            </p>
            <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
              Add a PDF resume
            </h2>
          </div>

          <div className="text-[12px] leading-4 text-text-muted">
            PDF only, up to 5MB. The backend extracts text before saving.
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1.5fr_2fr_auto]">
          <label className="block">
            <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Resume PDF
            </span>
            <input
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              type="file"
              accept="application/pdf"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Title
            </span>
            <input
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              type="text"
              value={title}
              placeholder="Optional. Defaults to the file name."
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <div className="flex items-end">
            <button
              className="inline-flex h-10 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={createResumeMutation.isPending || !selectedFile || isPending}
              onClick={() => {
                startTransition(() => {
                  createResumeMutation.mutate();
                });
              }}
            >
              {createResumeMutation.isPending ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        {statusMessage ? (
          <p className="mt-4 text-[14px] leading-5 text-text-secondary">
            {statusMessage}
          </p>
        ) : null}
      </section>

      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Library
            </p>
            <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
              Uploaded resumes
            </h2>
          </div>
          <p className="text-[12px] leading-4 text-text-muted">
            {resumes.length} item{resumes.length === 1 ? "" : "s"}
          </p>
        </div>

        {isLoading ? (
          <p className="mt-6 text-[14px] leading-5 text-text-secondary">
            Loading resumes...
          </p>
        ) : error instanceof Error ? (
          <p className="mt-6 text-[14px] leading-5 text-error">
            {error.message}
          </p>
        ) : resumes.length === 0 ? (
          <div className="mt-6 rounded-md border border-border bg-surface-secondary p-5">
            <p className="text-[14px] font-medium leading-5 text-text-primary">
              No resumes yet.
            </p>
            <p className="mt-2 text-[14px] leading-5 text-text-secondary">
              Upload your first PDF to start tracking versions and make one
              resume active.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-md border border-border">
            <table className="w-full border-collapse">
              <thead className="bg-surface-secondary">
                <tr>
                  <th className="border-b border-border px-4 py-3 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                    Title
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                    Uploaded
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                    State
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume) => (
                  <tr
                    key={resume.id}
                    className="border-b border-border last:border-b-0 hover:bg-surface-secondary"
                  >
                    <td className="px-4 py-4 align-top">
                      {editingResumeId === resume.id ? (
                        <div className="space-y-2">
                          <input
                            className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                            value={editingTitle}
                            onChange={(event) => setEditingTitle(event.target.value)}
                          />
                          <p className="text-[12px] leading-4 text-text-muted">
                            Renaming the resume updates the library only.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[14px] font-medium leading-5 text-text-primary">
                            {resume.title}
                          </p>
                          <p className="mt-1 text-[12px] leading-4 text-text-muted">
                            Source file: {resume.originalFileUrl}
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top text-[14px] leading-5 text-text-secondary">
                      {formatDate(resume.createdAt)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      {resume.isActive ? (
                        <span className="inline-flex rounded-full bg-success-light px-2 py-0.5 text-[12px] font-medium leading-4 text-success-foreground">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        {editingResumeId === resume.id ? (
                          <>
                            <button
                              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:opacity-50"
                              type="button"
                              disabled={updateResumeMutation.isPending}
                              onClick={() => {
                                startTransition(() => {
                                  updateResumeMutation.mutate({
                                    id: resume.id,
                                    title: editingTitle.trim(),
                                  });
                                });
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
                              type="button"
                              onClick={() => {
                                setEditingResumeId(null);
                                setEditingTitle("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
                              type="button"
                              onClick={() => {
                                setEditingResumeId(resume.id);
                                setEditingTitle(resume.title);
                              }}
                            >
                              Rename
                            </button>
                            {!resume.isActive ? (
                            <button
                              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:opacity-50"
                              type="button"
                              disabled={updateResumeMutation.isPending}
                              onClick={() => {
                                startTransition(() => {
                                  updateResumeMutation.mutate({
                                    id: resume.id,
                                    isActive: true,
                                  });
                                });
                              }}
                              >
                                Set active
                              </button>
                            ) : null}
                            <button
                              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary disabled:opacity-50"
                              type="button"
                              disabled={deleteResumeMutation.isPending}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Delete this resume? This cannot be undone.",
                                  )
                                ) {
                                  startTransition(() => {
                                    deleteResumeMutation.mutate(
                                      resume.id,
                                    );
                                  });
                                }
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
