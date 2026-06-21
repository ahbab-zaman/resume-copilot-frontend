import type { ReactNode } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/layout/Sidebar";
import { auth } from "@/lib/auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <Sidebar user={session.user} />
      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </main>
    </div>
  );
}
