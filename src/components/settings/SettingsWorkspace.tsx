"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/uiSlice";

type SettingsUser = {
  name: string;
  email: string;
  image?: string | null;
};

type ThemeOption = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "ai-resume-theme";

const themeOptions: Array<{
  value: ThemeOption;
  title: string;
  body: string;
}> = [
  {
    value: "system",
    title: "System",
    body: "Follow the device preference and keep the app aligned with the OS.",
  },
  {
    value: "light",
    title: "Light",
    body: "Lock the workspace into the current light design register.",
  },
  {
    value: "dark",
    title: "Dark",
    body: "Reserve the setting now so dark mode can be enabled later.",
  },
];

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

function getThemeLabel(value: ThemeOption): string {
  switch (value) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    default:
      return "System";
  }
}

function getThemeButtonClass(active: boolean): string {
  return active
    ? "border-accent bg-accent text-on-primary"
    : "border-border bg-surface text-text-primary hover:bg-surface-secondary";
}

type SettingsWorkspaceProps = {
  user: SettingsUser;
};

export function SettingsWorkspace({ user }: SettingsWorkspaceProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storedTheme = useAppSelector((state) => state.ui.theme);

  const [displayName, setDisplayName] = useState(user.name);
  const [nameError, setNameError] = useState<string | null>(null);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "system" || savedTheme === "light" || savedTheme === "dark") {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, storedTheme);
    document.documentElement.dataset.theme = storedTheme;
  }, [storedTheme]);

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameError(null);
    setProfileMessage(null);

    const nextName = displayName.trim();

    if (!nextName) {
      setNameError("Display name cannot be empty.");
      return;
    }

    if (nextName === user.name) {
      setProfileMessage("Profile already matches the current name.");
      return;
    }

    setIsSavingProfile(true);

    try {
      const result = await authClient.updateUser({
        name: nextName,
      });

      if (result.error) {
        setNameError(result.error.message ?? "Could not save profile changes.");
        return;
      }

      setProfileMessage("Profile updated. The sidebar will refresh now.");
      router.refresh();
    } catch (error) {
      setNameError(
        error instanceof Error ? error.message : "Could not save profile changes.",
      );
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleteError(null);

    if (deleteConfirmation !== "DELETE") {
      setDeleteError('Type DELETE to confirm account removal.');
      return;
    }

    setIsDeleting(true);

    try {
      const result = await authClient.deleteUser({
        callbackURL: "/login",
        password: deletePassword.trim() || undefined,
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
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Settings
            </p>
            <h1 className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary">
              Profile, theme, and account control.
            </h1>
            <p className="mt-3 text-[16px] leading-7 text-text-secondary">
              Keep the account details current, pick the UI preference you want
              to preserve, and remove the account when you are done.
            </p>
          </div>

          <div className="rounded-md border border-border bg-surface-secondary p-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Current account
            </p>
            <div className="mt-3 flex items-center gap-3">
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

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
        <div className="space-y-6">
          <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Profile
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Update the display name used across the app.
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-link-bg-soft px-2 py-0.5 text-[12px] font-medium leading-4 text-link-deep">
                {user.email}
              </span>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleProfileSubmit}>
              <label className="block space-y-2">
                <span className="text-[14px] font-medium leading-5 text-text-primary">
                  Display name
                </span>
                <input
                  autoComplete="name"
                  className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                  name="name"
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Alex Morgan"
                  value={displayName}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-[14px] font-medium leading-5 text-text-primary">
                  Email
                </span>
                <input
                  className="h-10 w-full rounded-sm border border-border bg-surface-secondary px-3 text-[14px] leading-5 text-text-muted outline-none"
                  readOnly
                  value={user.email}
                />
              </label>

              {nameError ? (
                <p className="rounded-sm border border-error/30 bg-error-light px-3 py-2 text-[14px] leading-5 text-error-foreground">
                  {nameError}
                </p>
              ) : null}

              {profileMessage ? (
                <p className="rounded-sm border border-success/30 bg-success-light px-3 py-2 text-[14px] leading-5 text-success-foreground">
                  {profileMessage}
                </p>
              ) : null}

              <button
                className="inline-flex h-10 items-center justify-center rounded-sm bg-accent px-4 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSavingProfile}
                type="submit"
              >
                {isSavingProfile ? "Saving..." : "Save profile"}
              </button>
            </form>
          </section>

          <section className="rounded-md border border-border bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Theme
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Keep the workspace in the register you prefer.
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-surface-secondary px-2 py-0.5 text-[12px] font-medium leading-4 text-text-secondary">
                {getThemeLabel(storedTheme)}
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {themeOptions.map((option) => {
                const active = storedTheme === option.value;

                return (
                  <button
                    key={option.value}
                    className={`rounded-md border p-4 text-left transition ${getThemeButtonClass(active)}`}
                    type="button"
                    onClick={() => dispatch(setTheme(option.value))}
                  >
                    <p className="text-[14px] font-medium leading-5">{option.title}</p>
                    <p
                      className={`mt-2 text-[14px] leading-6 ${
                        active ? "text-on-primary/80" : "text-text-secondary"
                      }`}
                    >
                      {option.body}
                    </p>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-[14px] leading-6 text-text-secondary">
              The preference is stored locally for now. The app shell still uses
              the light design tokens, so dark mode is reserved until the theme
              system is expanded.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-warning-light bg-surface p-6 shadow-[0_0_0_1px_var(--border)_inset]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Danger zone
                </p>
                <h2 className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.04em] text-text-primary">
                  Delete the account when you are finished.
                </h2>
              </div>

              <span className="inline-flex rounded-full bg-warning-light px-2 py-0.5 text-[12px] font-medium leading-4 text-warning-foreground">
                Permanent
              </span>
            </div>

            <p className="mt-4 text-[14px] leading-6 text-text-secondary">
              Removing the account clears the session and all saved resume,
              Copilot, application, interview, and dashboard records tied to this
              user.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block space-y-2">
                <span className="text-[14px] font-medium leading-5 text-text-primary">
                  Password
                </span>
                <input
                  autoComplete="current-password"
                  className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                  name="password"
                  onChange={(event) => setDeletePassword(event.target.value)}
                  placeholder="Enter your password if required"
                  type="password"
                  value={deletePassword}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-[14px] font-medium leading-5 text-text-primary">
                  Confirmation
                </span>
                <input
                  className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                  name="deleteConfirmation"
                  onChange={(event) => setDeleteConfirmation(event.target.value)}
                  placeholder="Type DELETE"
                  value={deleteConfirmation}
                />
              </label>

              {deleteError ? (
                <p className="rounded-sm border border-error/30 bg-error-light px-3 py-2 text-[14px] leading-5 text-error-foreground">
                  {deleteError}
                </p>
              ) : null}

              <button
                className="inline-flex h-10 w-full items-center justify-center rounded-sm border border-error-light bg-error-light px-4 text-[14px] font-medium leading-5 text-error-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isDeleting || deleteConfirmation !== "DELETE"}
                type="button"
                onClick={handleDeleteAccount}
              >
                {isDeleting ? "Deleting..." : "Delete account"}
              </button>
            </div>
          </section>

          <section className="rounded-md border border-border bg-surface-secondary p-6 shadow-[0_0_0_1px_var(--border)_inset]">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Notes
            </p>
            <ul className="mt-3 space-y-3 text-[14px] leading-6 text-text-secondary">
              <li>Profile updates refresh the authenticated shell after save.</li>
              <li>The theme selection is stored locally for the current browser.</li>
              <li>Account deletion routes through better-auth and returns you to login.</li>
            </ul>
          </section>
        </aside>
      </section>
    </div>
  );
}
