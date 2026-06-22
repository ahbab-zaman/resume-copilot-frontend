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

export type OptimizedResumeSectionPair = {
  section: string;
  original: string;
  optimized: string;
  reason: string;
};

export type OptimizedResumeContent = {
  headline: string;
  summary: string;
  sectionPairs: OptimizedResumeSectionPair[];
  keywordIntegrations: string[];
  nextSteps: string[];
};

export type OptimizedResumeRecord = {
  id: string;
  analysisId: string;
  optimizedContent: OptimizedResumeContent;
  pdfUrl: string | null;
  createdAt: string;
};

export type CoverLetterTone = "professional" | "startup" | "corporate";

export type CoverLetterRecord = {
  id: string;
  analysisId: string;
  tone: CoverLetterTone;
  content: string;
  pdfUrl: string | null;
  createdAt: string;
};
