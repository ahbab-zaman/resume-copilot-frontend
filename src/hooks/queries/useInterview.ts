"use client";

import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";
import type {
  InterviewDifficulty,
  InterviewRole,
  InterviewSessionRecord,
} from "@/types/api";

export function useGenerateInterviewQuestions() {
  return useMutation({
    mutationFn: async (input: {
      role: InterviewRole;
      difficulty: InterviewDifficulty;
    }) => {
      const response = await apiFetch<InterviewSessionRecord>("/api/interview", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not generate interview questions.");
      }

      return response.data;
    },
  });
}
