"use client";

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type { AnalysisRecord } from "@/types/api";

export function useAnalysis(analysisId: string | null) {
  return useQuery({
    queryKey: ["analysis", analysisId],
    queryFn: async () => {
      if (!analysisId) {
        throw new Error("Analysis id is required.");
      }

      const response = await apiFetch<AnalysisRecord>(`/api/analyses/${analysisId}`);

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not load the analysis.");
      }

      return response.data;
    },
    enabled: Boolean(analysisId),
  });
}

