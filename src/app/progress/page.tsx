"use client";

import { questions, questionTypeLabels, units, vocabWords } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { averageAccuracy, bestAndWeakestCategory, pct, weakWords, weakestQuestionType, wrongSummary } from "@/lib/stats";
import { ProgressStats } from "@/components/ProgressStats";
import { ProgressBar } from "@/components/ProgressBar";
import { LoadingPanel } from "@/components/LoadingPanel";

export default function ProgressPage() {
  const { progress, ready } = useProgress();
  const wrong = wrongSummary(progress);
  const category = bestAndWeakestCategory(progress);
  const weakWordList = weakWords(progress);
  const completedUnitIds = new Set(progress.unitAttempts.map((attempt) => attempt.unitId));

  if (!ready) {
    return <LoadingPanel />;
  }

  const typeRows = Object.entries(questionTypeLabels).map(([type, label]) => {
    const attempts = progress.questionAttempts.filter((attempt) => {
      const question = questions.find((item) => item.id === attempt.questionId);
      return question?.questionType === type;
    });
    const correct = attempts.filter((attempt) => attempt.isCorrect).length;
    return { label, total: attempts.length, correct, accuracy: attempts.length ? correct / attempts.length : 0 };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">Progress</h1>
        <p className="mt-2 text-slate-600">Track completed units, accuracy, weak areas, and review status from localStorage.</p>
      </div>

      <ProgressStats
        items={[
          { label: "Completed Units", value: completedUnitIds.size, detail: `${units.length} total units` },
          { label: "Average Accuracy", value: `${pct(averageAccuracy(progress))}%`, detail: "Across unit attempts" },
          { label: "Best Category", value: category.best, detail: "Highest average accuracy" },
          { label: "Weakest Type", value: weakestQuestionType(progress), detail: "Lowest question-type accuracy" }
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Unit Completion</h2>
          <div className="mt-4 space-y-4">
            {units.map((unit) => {
              const completed = completedUnitIds.has(unit.id);
              return (
                <div key={unit.id}>
                  <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
                    <span>{unit.title}</span>
                    <span>{completed ? "Completed" : "Not started"}</span>
                  </div>
                  <ProgressBar value={completed ? 100 : 0} tone={completed ? "good" : "brand"} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Question Type Accuracy</h2>
          <div className="mt-4 space-y-4">
            {typeRows.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
                  <span>{row.label}</span>
                  <span>
                    {row.total ? `${row.correct} / ${row.total}` : "No data"}
                  </span>
                </div>
                <ProgressBar value={Math.round(row.accuracy * 100)} tone={row.accuracy >= 0.8 ? "good" : row.accuracy > 0 ? "blue" : "brand"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Category Snapshot</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4 rounded-md bg-slate-50 p-3">
              <dt className="font-semibold text-slate-600">Best category</dt>
              <dd className="text-right font-bold text-ink">{category.best}</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-md bg-slate-50 p-3">
              <dt className="font-semibold text-slate-600">Weakest category</dt>
              <dd className="text-right font-bold text-ink">{category.weakest}</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-md bg-slate-50 p-3">
              <dt className="font-semibold text-slate-600">Wrong questions</dt>
              <dd className="text-right font-bold text-ink">
                {wrong.waiting} active / {wrong.mastered} mastered
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Weak Words</h2>
          {weakWordList.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {weakWordList.map((word) => {
                const item = vocabWords.find((vocabWord) => vocabWord.word === word);
                return (
                  <span key={word} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-800" title={item?.chineseMeaning}>
                    {word}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No active weak words yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
