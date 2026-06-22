"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type { ApplicationRecord, ApplicationStatus } from "@/types/api";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await apiFetch<ApplicationRecord[]>("/api/applications");

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not load applications.");
      }

      return response.data;
    },
  });
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: async (input: {
      company: string;
      role: string;
      status?: ApplicationStatus;
      appliedDate?: string;
      notes?: string | null;
    }) => {
      const response = await apiFetch<ApplicationRecord>("/api/applications", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not create the application.");
      }

      return response.data;
    },
  });
}

export function useUpdateApplication() {
  return useMutation({
    mutationFn: async (input: {
      id: string;
      company?: string;
      role?: string;
      status?: ApplicationStatus;
      appliedDate?: string;
      notes?: string | null;
    }) => {
      const response = await apiFetch<ApplicationRecord>(
        `/api/applications/${input.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...(input.company ? { company: input.company } : {}),
            ...(input.role ? { role: input.role } : {}),
            ...(input.status ? { status: input.status } : {}),
            ...(input.appliedDate ? { appliedDate: input.appliedDate } : {}),
            ...(input.notes !== undefined ? { notes: input.notes } : {}),
          }),
        },
      );

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not update the application.");
      }

      return response.data;
    },
  });
}

export function useDeleteApplication() {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch<{ deleted: boolean }>(
        `/api/applications/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.success) {
        throw new Error(response.error ?? "Could not delete the application.");
      }
    },
  });
}
