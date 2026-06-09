"use client";

import Link from "next/link";
import { getUnit, getWord, questions } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { breakdownByQuestionType } from "@/lib/stats";
import type { VocabWord } from "@/lib/types";
import { ScoreSummary } from "@/components/ScoreSummary";
import { ProgressBar } from "@/components/ProgressBar";
import { LoadingPanel } from "@/components/LoadingPanel";

export default function ResultPage({ params }: { params: { attemptId: string } }) {
  const { progress, ready } = useProgress();
  const attempt = progress.unitAttempts.find((item) => item.id === params.attemptId);

  if (!ready) {
    return <LoadingPanel />;
  }

  if (!attempt) {
    return (
      <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Result not found</h1>
        <p className="mt-2 text-slate-600">The result may still be saving. Return to units and try again if needed.</p>
        <Link href="/units" className="mt-4 inline-block text-sm font-semibold text-brand">
          Back to Units
        </Link>
      </div>
    );
  }

  const unit = getUnit(attempt.unitId);
  const questionAttempts = progress.questionAttempts.filter((item) => item.unitAttemptId === attempt.id);
  const weakWords = questionAttempts
    .filter((item) => !item.isCorrect)
    .map((item) => questions.find((question) => question.id === item.questionId))
    .map((question) => (question ? getWord(question.vocabWordId) : undefined))
    .filter((word): word is VocabWord => Boolean(word));
  const breakdown = breakdownByQuestionType([attempt.id], progress);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">{unit?.title ?? "Unit"} Result</h1>
        <p className="mt-2 text-slate-600">Completed. Wrong answers have been added to Wrong Practice automatically.</p>
      </div>

      <ScoreSummary correct={attempt.correctAnswers} total={attempt.totalQuestions} timeSpentSeconds={attempt.timeSpentSeconds} />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Breakdown by Question Type</h2>
          <div className="mt-4 space-y-4">
            {breakdown.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
                  <span>{row.label}</span>
                  <span>
                    {row.correct} / {row.total}
                  </span>
                </div>
                <ProgressBar value={Math.round(row.accuracy * 100)} tone={row.accuracy >= 0.8 ? "good" : "blue"} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Weak Words</h2>
          {weakWords.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {weakWords.map((word) => (
                <span key={word.id} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-800">
                  {word.word}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No weak words from this attempt.</p>
          )}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link className="focus-ring rounded-md bg-ink px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700" href="/wrong-practice">
          Practice Wrong Questions
        </Link>
        <Link className="focus-ring rounded-md border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink hover:bg-slate-50" href="/units">
          Back to Units
        </Link>
      </div>
    </div>
  );
}
