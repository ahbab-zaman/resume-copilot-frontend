"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/uiSlice";

type SettingsUser = {
  name: string;
  email: string;
  image?: string | null;
};

type SettingsTab = "profile" | "appearance" | "account";

const THEME_STORAGE_KEY = "ai-resume-theme";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "A";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex h-10 items-center rounded-sm px-3 text-[14px] leading-5 transition ${
        active
          ? "border-l-2 border-accent bg-surface-secondary pl-[11px] text-text-primary"
          : "border-l-2 border-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type SettingsWorkspaceProps = {
  user: SettingsUser;
};

export function SettingsWorkspace({ user }: SettingsWorkspaceProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  const [tab, setTab] = useState<SettingsTab>("profile");
  const [name, setName] = useState(user.name);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "system" || savedTheme === "light" || savedTheme === "dark") {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const hasChanges = useMemo(() => name.trim() !== user.name, [name, user.name]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveMessage(null);

    if (!name.trim()) {
      setSaveMessage("Display name cannot be empty.");
      return;
    }

    if (!hasChanges) {
      setSaveMessage("Profile already matches the current name.");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({ name: name.trim() });

      if (result.error) {
        setSaveMessage(result.error.message ?? "Could not save profile changes.");
        return;
      }

      setSaveMessage("Profile updated.");
      router.refresh();
    } catch (error) {
      setSaveMessage(
        error instanceof Error ? error.message : "Could not save profile changes.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleteError(null);

    if (deleteConfirm.trim().toLowerCase() !== user.email.toLowerCase()) {
      setDeleteError("Type your email exactly to confirm deletion.");
      return;
    }

    setIsDeleting(true);

    try {
      const result = await authClient.deleteUser({
        callbackURL: "/login",
      });

      if (result.error) {
        setDeleteError(result.error.message ?? "Could not delete the account.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Could not delete the account.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-[12px] leading-4 text-text-muted">
              SETTINGS
            </p>
            <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Settings
            </h1>
            <p className="mt-3 text-[16px] leading-7 text-text-secondary">
              Keep the account details current, keep the UI on the supported light
              register, and remove the account when you&apos;re finished.
            </p>
          </div>

          <div className="rounded-md border border-border bg-surface-secondary p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-on-primary">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="text-[14px] font-medium leading-5 text-text-primary">
                  {user.name}
                </p>
                <p className="text-[12px] leading-4 text-text-muted">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <nav className="flex gap-2 overflow-x-auto border-b border-border pb-2 lg:flex-col lg:border-b-0 lg:border-r lg:pr-4 lg:pb-0">
          <TabButton active={tab === "profile"} onClick={() => setTab("profile")}>
            Profile
          </TabButton>
          <TabButton active={tab === "appearance"} onClick={() => setTab("appearance")}>
            Appearance
          </TabButton>
          <TabButton active={tab === "account"} onClick={() => setTab("account")}>
            Account
          </TabButton>
        </nav>

        <div className="space-y-6">
          {tab === "profile" ? (
            <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    PROFILE
                  </p>
                  <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                    Update the display name used across the app.
                  </h2>
                </div>
                <span className="inline-flex rounded-full bg-accent-light px-2 py-0.5 text-[12px] leading-4 text-accent">
                  Managed by login provider
                </span>
              </div>

              <form className="mt-5 space-y-4" onSubmit={handleSave}>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-secondary text-[18px] font-medium text-text-primary">
                    {getInitials(user.name)}
                  </div>
                  <button
                    className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
                    type="button"
                  >
                    Change Avatar
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[14px] font-medium leading-5 text-text-primary">
                      Name
                    </span>
                    <input
                      autoComplete="name"
                      className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-[14px] font-medium leading-5 text-text-primary">
                      Email
                    </span>
                    <input
                      className="h-10 w-full rounded-sm border border-border bg-surface-secondary px-3 text-[14px] leading-5 text-text-muted outline-none"
                      readOnly
                      value={user.email}
                    />
                    <p className="text-[12px] leading-4 text-text-muted">
                      Managed by your login provider.
                    </p>
                  </label>
                </div>

                {saveMessage ? (
                  <p className="rounded-sm border border-success/30 bg-success-light px-3 py-2 text-[14px] leading-5 text-success-foreground">
                    {saveMessage}
                  </p>
                ) : null}

                <div className="flex justify-end">
                  <button
                    className="inline-flex h-8 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!hasChanges || isSaving}
                    type="submit"
                  >
                    {isSaving ? "Saving..." : "Save profile"}
                  </button>
                </div>
              </form>
            </section>
          ) : null}

          {tab === "appearance" ? (
            <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    APPEARANCE
                  </p>
                  <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                    Light mode is currently the only supported theme.
                  </h2>
                </div>
                <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] leading-4 text-text-secondary">
                  {theme}
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <button
                  className="rounded-md border border-accent bg-surface-secondary p-4 text-left transition"
                  type="button"
                  onClick={() => dispatch(setTheme("light"))}
                >
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    Light
                  </p>
                  <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                    Locked to the current light design system.
                  </p>
                </button>

                <div className="rounded-md border border-border bg-surface p-4 text-left">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    Dark
                  </p>
                  <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                    Dark mode coming soon.
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {tab === "account" ? (
            <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    ACCOUNT
                  </p>
                  <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                    Keep account access under control.
                  </h2>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  className="inline-flex h-8 items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
                  type="button"
                  onClick={() => authClient.signOut().then(() => router.push("/login"))}
                >
                  Sign Out
                </button>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <p className="text-[14px] font-medium leading-5 text-error">
                  Danger Zone
                </p>
                <p className="mt-2 max-w-2xl text-[14px] leading-6 text-text-secondary">
                  Deleting the account removes authentication, saved resumes,
                  Copilot analysis history, interview sessions, and application
                  records for this user.
                </p>

                <div className="mt-4 space-y-4">
                  <label className="space-y-2">
                    <span className="text-[14px] font-medium leading-5 text-text-primary">
                      Confirm email
                    </span>
                    <input
                      className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder={user.email}
                      value={deleteConfirm}
                      onChange={(event) => setDeleteConfirm(event.target.value)}
                    />
                  </label>

                  {deleteError ? (
                    <p className="rounded-sm border border-error/30 bg-error-light px-3 py-2 text-[14px] leading-5 text-error-foreground">
                      {deleteError}
                    </p>
                  ) : null}

                  <div className="flex justify-end">
                    <button
                      className="inline-flex h-8 items-center justify-center rounded-sm bg-error px-3 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isDeleting}
                      type="button"
                      onClick={handleDeleteAccount}
                    >
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </div>
  );
}
