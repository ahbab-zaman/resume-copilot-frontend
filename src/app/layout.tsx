import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import logo from "@/assets/logo-pilot.png";

import { QueryProvider } from "@/providers/QueryProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Copilot",
  description: "AI-powered resume tailoring and application tracking.",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-text-primary">
        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
