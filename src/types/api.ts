export type JobSummary = {
  whatTheyWant: string;
  keyResponsibilities: string[];
};

export type AnalysisRecord = {
  id: string;
  resumeId: string;
  jobDescriptionText: string;
  jobTitleDetected: string;
  seniorityDetected: "junior" | "mid" | "senior";
  atsScore: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  jobSummary: JobSummary;
  aiModelUsed: string;
  createdAt: string;
};

