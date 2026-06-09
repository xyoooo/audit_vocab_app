import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { NavTabs } from "@/components/NavTabs";

export const metadata: Metadata = {
  title: "Professional Vocabulary Trainer",
  description: "Vocabulary learning for audit, accounting, and CFA-style finance topics."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="w-fit">
              <div className="text-sm font-semibold uppercase text-brand">Vocab Desk</div>
              <div className="text-2xl font-bold text-ink">Professional English Trainer</div>
            </Link>
            <NavTabs />
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
