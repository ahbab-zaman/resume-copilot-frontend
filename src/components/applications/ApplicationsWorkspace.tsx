"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useCreateApplication,
  useDeleteApplication,
  useUpdateApplication,
  useApplications,
} from "@/hooks/queries/useApplications";
import type {
  ApplicationRecord,
  ApplicationStatus,
} from "@/types/api";

const statusOrder: ApplicationStatus[] = [
  "applied",
  "screening",
  "interview",
  "rejected",
  "offer",
];

const statusMeta: Record<
  ApplicationStatus,
  {
    label: string;
    description: string;
    chipClass: string;
  }
> = {
  applied: {
    label: "Applied",
    description: "Sent and waiting for the first reply.",
    chipClass: "bg-accent-light text-accent",
  },
  screening: {
    label: "Screening",
    description: "Initial recruiter or hiring-manager review.",
    chipClass: "bg-teal-light text-teal-foreground",
  },
  interview: {
    label: "Interview",
    description: "Live conversations and take-home work in motion.",
    chipClass: "bg-success-light text-success-foreground",
  },
  rejected: {
    label: "Rejected",
    description: "Closed out or not moving forward.",
    chipClass: "bg-error-light text-error-foreground",
  },
  offer: {
    label: "Offer",
    description: "You reached the finish line.",
    chipClass: "bg-success text-on-primary",
  },
};

type ApplicationDraft = {
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes: string;
};

type DialogMode = "create" | "edit" | "delete" | null;

const emptyApplications: ApplicationRecord[] = [];

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function getTodayInputValue(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function createEmptyDraft(): ApplicationDraft {
  return {
    company: "",
    role: "",
    status: "applied",
    appliedDate: getTodayInputValue(),
    notes: "",
  };
}

function normalizeQueryValue(value: string): string {
  return value.trim().toLowerCase();
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

function getStats(applications: ApplicationRecord[]) {
  const total = applications.length;
  const inPipeline = applications.filter((application) =>
    ["applied", "screening", "interview"].includes(application.status),
  ).length;
  const interviews = applications.filter((application) =>
    ["interview", "offer"].includes(application.status),
  ).length;
  const offers = applications.filter(
    (application) => application.status === "offer",
  ).length;
  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  return {
    total,
    inPipeline,
    interviews,
    successRate,
  };
}

type ApplicationCardProps = {
  application: ApplicationRecord;
  onEdit: (application: ApplicationRecord) => void;
  onDelete: (application: ApplicationRecord) => void;
  onDragStart: (application: ApplicationRecord) => void;
  onDragEnd: () => void;
  dragging: boolean;
};

function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  dragging,
}: ApplicationCardProps) {
  const meta = statusMeta[application.status];

  return (
    <article
      draggable
      onDragStart={() => onDragStart(application)}
      onDragEnd={onDragEnd}
      className={`cursor-grab rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset] transition ${
        dragging ? "ring-1 ring-accent opacity-60" : "hover:bg-surface-secondary"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            {application.company}
          </p>
          <h3 className="mt-2 text-[16px] font-semibold leading-6 tracking-[-0.04em] text-text-primary">
            {application.role}
          </h3>
        </div>

        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${meta.chipClass}`}
        >
          {meta.label}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-[14px] leading-5 text-text-secondary">
          Applied {formatDate(application.appliedDate)}
        </p>
        <p className="text-[14px] leading-6 text-text-secondary">
          {application.notes || "No notes yet."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
          onClick={() => onEdit(application)}
        >
          Edit
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
          onClick={() => onDelete(application)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

type ApplicationDialogProps = {
  mode: Exclude<DialogMode, null>;
  draft: ApplicationDraft;
  application?: ApplicationRecord | null;
  onClose: () => void;
  onSubmit: (draft: ApplicationDraft) => void;
  onDraftChange: (draft: ApplicationDraft) => void;
  submitting: boolean;
};

function ApplicationDialog({
  mode,
  draft,
  application,
  onClose,
  onSubmit,
  onDraftChange,
  submitting,
}: ApplicationDialogProps) {
  if (mode === "delete" && application) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4">
        <div className="w-full max-w-lg rounded-md border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Delete application
          </p>
          <h2 className="mt-3 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
            Remove {application.company}?
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-text-secondary">
            This will permanently delete the {application.role} application
            from the tracker.
          </p>

          <div className="mt-5 rounded-md border border-border bg-surface-secondary p-4">
            <p className="text-[14px] font-medium leading-5 text-text-primary">
              {application.company}
            </p>
            <p className="mt-1 text-[14px] leading-5 text-text-secondary">
              {application.role}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
              onClick={() => onSubmit(draft)}
            >
              {submitting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4">
      <div className="w-full max-w-2xl rounded-md border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              {mode === "edit" ? "Edit application" : "New application"}
            </p>
            <h2 className="mt-3 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
              {mode === "edit"
                ? "Update the pipeline card."
                : "Add a new application to the board."}
            </h2>
          </div>

          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Company
            </span>
            <input
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              value={draft.company}
              onChange={(event) =>
                onDraftChange({ ...draft, company: event.target.value })
              }
              placeholder="Acme Inc."
            />
          </label>

          <label className="space-y-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Role
            </span>
            <input
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              value={draft.role}
              onChange={(event) =>
                onDraftChange({ ...draft, role: event.target.value })
              }
              placeholder="Senior Frontend Engineer"
            />
          </label>

          <label className="space-y-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Status
            </span>
            <select
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
              value={draft.status}
              onChange={(event) =>
                onDraftChange({
                  ...draft,
                  status: event.target.value as ApplicationStatus,
                })
              }
            >
              {statusOrder.map((status) => (
                <option key={status} value={status}>
                  {statusMeta[status].label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Applied date
            </span>
            <input
              className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
              type="date"
              value={draft.appliedDate}
              onChange={(event) =>
                onDraftChange({ ...draft, appliedDate: event.target.value })
              }
            />
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Notes
          </span>
          <textarea
            className="min-h-[160px] w-full rounded-sm border border-border bg-surface px-3 py-2 text-[14px] leading-6 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
            value={draft.notes}
            onChange={(event) =>
              onDraftChange({ ...draft, notes: event.target.value })
            }
            placeholder="Interview dates, recruiter names, or follow-up notes."
          />
        </label>

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={submitting}
            onClick={() => onSubmit(draft)}
          >
            {submitting ? "Saving..." : mode === "edit" ? "Save changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

type ColumnProps = {
  status: ApplicationStatus;
  applications: ApplicationRecord[];
  draggingId: string | null;
  onDragStart: (application: ApplicationRecord) => void;
  onDragEnd: () => void;
  onEdit: (application: ApplicationRecord) => void;
  onDelete: (application: ApplicationRecord) => void;
  onDrop: (status: ApplicationStatus) => void;
  onDragOverStatus: ApplicationStatus | null;
  onDragEnter: (status: ApplicationStatus) => void;
  onDragLeave: () => void;
};

function Column({
  status,
  applications,
  draggingId,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
  onDrop,
  onDragOverStatus,
  onDragEnter,
  onDragLeave,
}: ColumnProps) {
  const meta = statusMeta[status];

  return (
    <section
      className={`rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset] transition ${
        onDragOverStatus === status ? "ring-1 ring-accent" : ""
      }`}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => onDragEnter(status)}
      onDragLeave={onDragLeave}
      onDrop={(event) => {
        event.preventDefault();
        onDrop(status);
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            {meta.label}
          </p>
          <h3 className="mt-2 text-[18px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
            {applications.length} card{applications.length === 1 ? "" : "s"}
          </h3>
        </div>

        <span className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${meta.chipClass}`}>
          {meta.label}
        </span>
      </div>

      <p className="mt-2 text-[12px] leading-5 text-text-muted">
        {meta.description}
      </p>

      <div className="mt-4 space-y-3">
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              dragging={draggingId === application.id}
            />
          ))
        ) : (
          <div className="rounded-md border border-border bg-surface-secondary p-4">
            <p className="text-[14px] leading-6 text-text-secondary">
              Drop an application here or clear the filters to see more cards.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ApplicationsWorkspace() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [dialogApplication, setDialogApplication] =
    useState<ApplicationRecord | null>(null);
  const [draft, setDraft] = useState<ApplicationDraft>(createEmptyDraft());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<ApplicationStatus | null>(
    null,
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const { data, isLoading, error } = useApplications();
  const createApplicationMutation = useCreateApplication();
  const updateApplicationMutation = useUpdateApplication();
  const deleteApplicationMutation = useDeleteApplication();

  const applications = data ?? emptyApplications;
  const stats = getStats(applications);
  const filteredApplications = useMemo(() => {
    const query = normalizeQueryValue(searchTerm);

    return applications.filter((application) => {
      const matchesStatus =
        statusFilter === "all" || application.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchable = [
        application.company,
        application.role,
        application.notes ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [applications, searchTerm, statusFilter]);

  const groupedApplications = useMemo(() => {
    return statusOrder.reduce<Record<ApplicationStatus, ApplicationRecord[]>>(
      (groups, status) => {
        groups[status] = filteredApplications.filter(
          (application) => application.status === status,
        );
        return groups;
      },
      {
        applied: [],
        screening: [],
        interview: [],
        rejected: [],
        offer: [],
      },
    );
  }, [filteredApplications]);

  function openCreateDialog() {
    setDialogApplication(null);
    setDraft(createEmptyDraft());
    setDialogMode("create");
  }

  function openEditDialog(application: ApplicationRecord) {
    setDialogApplication(application);
    setDraft({
      company: application.company,
      role: application.role,
      status: application.status,
      appliedDate: application.appliedDate,
      notes: application.notes ?? "",
    });
    setDialogMode("edit");
  }

  function openDeleteDialog(application: ApplicationRecord) {
    setDialogApplication(application);
    setDraft(createEmptyDraft());
    setDialogMode("delete");
  }

  function closeDialog() {
    setDialogMode(null);
    setDialogApplication(null);
    setDraft(createEmptyDraft());
  }

  function handleSubmitDraft(nextDraft: ApplicationDraft) {
    if (dialogMode === "delete") {
      if (!dialogApplication) {
        return;
      }

      deleteApplicationMutation.mutate(dialogApplication.id, {
        onSuccess: async () => {
          setFeedbackMessage("Application deleted.");
          closeDialog();
          await queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
        onError: (mutationError) => {
          setFeedbackMessage(getErrorMessage(mutationError));
        },
      });
      return;
    }

    const payload = {
      company: nextDraft.company.trim(),
      role: nextDraft.role.trim(),
      status: nextDraft.status,
      appliedDate: nextDraft.appliedDate,
      notes: nextDraft.notes.trim().length > 0 ? nextDraft.notes.trim() : null,
    };

    if (dialogMode === "edit" && dialogApplication) {
      updateApplicationMutation.mutate(
        { id: dialogApplication.id, ...payload },
        {
          onSuccess: async () => {
            setFeedbackMessage("Application updated.");
            closeDialog();
            await queryClient.invalidateQueries({ queryKey: ["applications"] });
          },
          onError: (mutationError) => {
            setFeedbackMessage(getErrorMessage(mutationError));
          },
        },
      );
      return;
    }

    createApplicationMutation.mutate(payload, {
      onSuccess: async () => {
        setFeedbackMessage("Application added.");
        closeDialog();
        await queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
      onError: (mutationError) => {
        setFeedbackMessage(getErrorMessage(mutationError));
      },
    });
  }

  function handleDragStart(application: ApplicationRecord) {
    setDraggingId(application.id);
    setDragOverStatus(null);
  }

  function handleDragEnd() {
    setDraggingId(null);
    setDragOverStatus(null);
  }

  function handleDrop(status: ApplicationStatus) {
    const movingApplication = applications.find(
      (application) => application.id === draggingId,
    );

    setDragOverStatus(null);

    if (!movingApplication || movingApplication.status === status) {
      setDraggingId(null);
      return;
    }

    updateApplicationMutation.mutate(
      { id: movingApplication.id, status },
      {
        onSuccess: async () => {
          setFeedbackMessage(
            `Moved ${movingApplication.company} to ${statusMeta[status].label}.`,
          );
          setDraggingId(null);
          await queryClient.invalidateQueries({
            queryKey: ["applications"],
          });
        },
        onError: (mutationError) => {
          setDraggingId(null);
          setFeedbackMessage(getErrorMessage(mutationError));
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Applications
            </p>
            <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Track every application through the pipeline.
            </h1>
            <p className="mt-3 text-[16px] leading-7 text-text-secondary">
              Move cards between statuses, filter by company or role, and keep
              notes close to the work instead of scattered across tabs.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            onClick={openCreateDialog}
          >
            New application
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total applications",
            value: String(stats.total),
            body: "Everything stored in the tracker.",
          },
          {
            label: "In pipeline",
            value: String(stats.inPipeline),
            body: "Applied, screening, and interview stages.",
          },
          {
            label: "Interview stage",
            value: String(stats.interviews),
            body: "Cards that have reached live conversations.",
          },
          {
            label: "Success rate",
            value: `${stats.successRate}%`,
            body: "Offers as a share of all tracked applications.",
          },
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
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-md border border-border bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)_inset]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Filter bar
            </p>
            <h2 className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
              Narrow the board quickly.
            </h2>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              className="h-10 min-w-0 rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent md:w-80"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search company, role, or notes"
            />
            <select
              className="h-10 rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as ApplicationStatus | "all")
              }
            >
              <option value="all">All statuses</option>
              {statusOrder.map((status) => (
                <option key={status} value={status}>
                  {statusMeta[status].label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary disabled:opacity-50"
              disabled={!searchTerm && statusFilter === "all"}
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              Clear filters
            </button>
          </div>
        </div>

        {feedbackMessage ? (
          <p className="mt-4 text-[14px] leading-5 text-text-secondary">
            {feedbackMessage}
          </p>
        ) : null}
      </section>

      {isLoading ? (
        <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <p className="text-[14px] leading-6 text-text-secondary">
            Loading applications...
          </p>
        </section>
      ) : error instanceof Error ? (
        <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <p className="text-[14px] leading-6 text-error">{error.message}</p>
        </section>
      ) : applications.length === 0 ? (
        <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)_inset]">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
            Empty tracker
          </p>
          <h2 className="mt-3 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
            Add your first application.
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-text-secondary">
            Track company names, roles, status changes, and notes in one place.
            Drag cards later once you start filling the pipeline.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            onClick={openCreateDialog}
          >
            Create application
          </button>
        </section>
      ) : (
        <section className="grid gap-4 xl:grid-cols-5">
          {statusOrder.map((status) => (
            <Column
              key={status}
              status={status}
              applications={groupedApplications[status]}
              draggingId={draggingId}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              onDrop={handleDrop}
              onDragOverStatus={dragOverStatus}
              onDragEnter={setDragOverStatus}
              onDragLeave={() => setDragOverStatus(null)}
            />
          ))}
        </section>
      )}

      {dialogMode ? (
        <ApplicationDialog
          mode={dialogMode}
          draft={draft}
          application={dialogApplication}
          onClose={closeDialog}
          onSubmit={handleSubmitDraft}
          onDraftChange={setDraft}
          submitting={
            createApplicationMutation.isPending ||
            updateApplicationMutation.isPending ||
            deleteApplicationMutation.isPending
          }
        />
      ) : null}
    </div>
  );
}
