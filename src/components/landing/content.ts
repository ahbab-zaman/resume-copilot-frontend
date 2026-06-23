import ats from "@/assets/ats.png";
import resume from "@/assets/resume.png";
import doc from "@/assets/document.png";
export const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export const featureCards = [
  {
    title: "ATS scoring",
    description:
      "See match quality, missing keywords, and the hiring signals behind a job description.",
    icon: ats,
  },
  {
    title: "Resume optimization",
    description:
      "Turn one resume into a sharper draft with stronger verbs, better structure, and clearer signals.",
    icon: resume,
  },
  {
    title: "Cover letters and interview prep",
    description:
      "Generate a tailored letter and role-specific questions from the same analysis.",
    icon: doc,
  },
];

export const howItWorksSteps = [
  {
    number: "1",
    title: "Upload your resume",
    description:
      "Drop in a PDF or choose an existing file from your workspace.",
  },
  {
    number: "2",
    title: "Paste the job description",
    description:
      "The analysis compares your resume against the job you actually want.",
  },
  {
    number: "3",
    title: "Get the full application kit",
    description:
      "Review the ATS score, optimize the resume, generate a letter, and practice interview questions.",
  },
];

export const testimonials = [
  {
    quote:
      "I got three callbacks in the first week because the ATS gap was obvious and the optimized resume was easy to trust.",
    name: "Marta E.",
    title: "Product designer",
  },
  {
    quote:
      "The page feels focused instead of noisy. I can move from resume to interview prep without losing context.",
    name: "Jordan T.",
    title: "Frontend engineer",
  },
  {
    quote:
      "It makes the next step obvious, which is the part most job tools get wrong.",
    name: "Lina S.",
    title: "Career switcher",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "A simple starting point for testing the full workflow.",
    features: ["One active resume", "ATS analysis", "Interview question set"],
    featured: false,
  },
  {
    name: "Growing job search",
    price: "$0",
    description:
      "Everything stays free for now while the product is in build-out.",
    features: [
      "Unlimited analyses",
      "Resume optimization",
      "Cover letter drafts",
      "Application tracking",
    ],
    featured: true,
  },
  {
    name: "Team later",
    price: "Custom",
    description: "Reserved for future coaching and support workflows.",
    features: ["Shared templates", "Bulk reporting", "Priority support"],
    featured: false,
  },
];

export const faqs = [
  {
    question: "How does the Copilot flow work?",
    answer:
      "You upload a resume, paste a job description, and the backend returns an ATS score plus the outputs you can generate from it.",
  },
  {
    question: "Is pricing live yet?",
    answer:
      "No. The pricing page is presentational only for now and shows the free tier clearly.",
  },
  {
    question: "Does the app support mobile?",
    answer:
      "Yes. The shell collapses into mobile-safe layouts with a drawer sidebar and stacked content.",
  },
  {
    question: "Can I revisit generated outputs later?",
    answer:
      "Yes. The backend saves analysis, optimized resume, cover letter, and interview session records.",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log In", href: "/login" },
      { label: "Get Started", href: "/register" },
    ],
  },
];
