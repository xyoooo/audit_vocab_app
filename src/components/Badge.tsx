import type { ReactNode } from "react";
import type { Difficulty } from "@/lib/types";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "brand" | "blue" | "good" | "bad" }) {
  const toneClass = {
    neutral: "border-line bg-white text-slate-700",
    brand: "border-teal-200 bg-teal-50 text-teal-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    good: "border-green-200 bg-green-50 text-green-800",
    bad: "border-red-200 bg-red-50 text-red-800"
  }[tone];

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{children}</span>;
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const tone = difficulty === "Advanced" ? "bad" : difficulty === "Intermediate" ? "blue" : "brand";
  return <Badge tone={tone}>{difficulty}</Badge>;
}
