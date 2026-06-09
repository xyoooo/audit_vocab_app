"use client";

import Link from "next/link";
import { units, getQuestionsForUnit } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { dueWrongQuestions, unitCompletion, wrongSummary } from "@/lib/stats";
import { ProgressStats } from "@/components/ProgressStats";
import { UnitCard } from "@/components/UnitCard";

export default function HomePage() {
  const { progress } = useProgress();
  const nextUnit = units.find((unit) => unitCompletion(progress, unit.id) === 0) ?? units[0];
  const lastUnit = progress.lastUnitId ? units.find((unit) => unit.id === progress.lastUnitId) : undefined;
  const unfinishedUnit = lastUnit && unitCompletion(progress, lastUnit.id) === 0 ? lastUnit : undefined;
  const wrong = wrongSummary(progress);
  const due = dueWrongQuestions(progress).length;
  const completedUnitCount = new Set(progress.unitAttempts.map((attempt) => attempt.unitId)).size;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-brand">Today&apos;s focus</p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{unfinishedUnit ? unfinishedUnit.title : nextUnit.title}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              {unfinishedUnit
                ? "Continue the unit you opened last, or jump into review if wrong questions are waiting."
                : "Build professional vocabulary for audit, accounting, finance, and market discussions through compact units and targeted review."}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link className="focus-ring rounded-md bg-ink px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700" href={`/quiz/${unfinishedUnit?.id ?? nextUnit.id}`}>
                {unfinishedUnit ? "Continue Unit" : "Continue Learning"}
              </Link>
              <Link className="focus-ring rounded-md border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink hover:bg-slate-50" href="/wrong-practice">
                Start Review
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-paper p-5">
            <div className="text-sm font-semibold text-slate-500">Wrong questions waiting</div>
            <div className="mt-2 text-5xl font-bold text-ink">{due}</div>
            <p className="mt-2 text-sm text-slate-600">{wrong.waiting} active in the review pool.</p>
          </div>
        </div>
      </section>

      <ProgressStats
        items={[
          { label: "Completed Units", value: completedUnitCount, detail: `${units.length} available` },
          { label: "Due Reviews", value: due, detail: "Ready today" },
          { label: "Reviewing", value: wrong.reviewing, detail: "In wrong practice" },
          { label: "Mastered", value: wrong.mastered, detail: "Cleared from active review" }
        ]}
      />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">Suggested Unit</h2>
          <Link href="/units" className="text-sm font-semibold text-brand hover:text-teal-900">
            View all
          </Link>
        </div>
        <UnitCard
          unit={unfinishedUnit ?? nextUnit}
          wordCount={(unfinishedUnit ?? nextUnit).wordIds.length}
          questionCount={getQuestionsForUnit((unfinishedUnit ?? nextUnit).id).length}
          completion={unitCompletion(progress, (unfinishedUnit ?? nextUnit).id)}
        />
      </section>
    </div>
  );
}
