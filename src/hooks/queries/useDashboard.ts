"use client";

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type {
  DashboardActivityRecord,
  DashboardStatsRecord,
} from "@/types/api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const response = await apiFetch<DashboardStatsRecord>("/api/dashboard/stats");

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not load dashboard stats.");
      }

      return response.data;
    },
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: async () => {
      const response = await apiFetch<DashboardActivityRecord[]>(
        "/api/dashboard/activity",
      );

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not load dashboard activity.");
      }

      return response.data;
    },
  });
}
