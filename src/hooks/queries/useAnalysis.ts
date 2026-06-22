"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type {
  AnalysisRecord,
  CoverLetterRecord,
  CoverLetterTone,
  OptimizedResumeRecord,
} from "@/types/api";

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

export function useOptimizeResume(analysisId: string | null) {
  return useMutation({
    mutationFn: async () => {
      if (!analysisId) {
        throw new Error("Analysis id is required.");
      }

      const response = await apiFetch<OptimizedResumeRecord>(
        `/api/analyses/${analysisId}/optimize`,
        {
          method: "POST",
        },
      );

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not optimize the resume.");
      }

      return response.data;
    },
  });
}

export function useCoverLetter(analysisId: string | null) {
  return useMutation({
    mutationFn: async (tone: CoverLetterTone) => {
      if (!analysisId) {
        throw new Error("Analysis id is required.");
      }

      const response = await apiFetch<CoverLetterRecord>(
        `/api/analyses/${analysisId}/cover-letter`,
        {
          method: "POST",
          body: JSON.stringify({ tone }),
        },
      );

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not generate the cover letter.");
      }

      return response.data;
    },
  });
}
