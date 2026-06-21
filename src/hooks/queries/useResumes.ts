"use client";

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-client";

export type ResumeRecord = {
  id: string;
  title: string;
  originalFileUrl: string;
  parsedText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ResumesResponse = {
  resumes: ResumeRecord[];
};

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const response = await apiFetch<ResumeRecord[]>("/api/resumes");

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Could not load resumes.");
      }

      return response.data;
    },
    select: (data): ResumesResponse => ({
      resumes: data,
    }),
  });
}
