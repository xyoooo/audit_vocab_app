import { ProgressBar } from "./ProgressBar";
import { formatSeconds, pct } from "@/lib/stats";

export function ScoreSummary({ correct, total, timeSpentSeconds }: { correct: number; total: number; timeSpentSeconds: number }) {
  const accuracy = total ? correct / total : 0;

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-slate-500">Score</div>
          <div className="mt-1 text-3xl font-bold text-ink">
            {correct} / {total}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-500">Accuracy</div>
          <div className="mt-1 text-3xl font-bold text-ink">{pct(accuracy)}%</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-500">Time Spent</div>
          <div className="mt-1 text-3xl font-bold text-ink">{formatSeconds(timeSpentSeconds)}</div>
        </div>
      </div>
      <div className="mt-5">
        <ProgressBar value={pct(accuracy)} tone={accuracy >= 0.8 ? "good" : accuracy >= 0.6 ? "blue" : "bad"} />
      </div>
    </section>
  );
}
