import Link from "next/link";
import { DifficultyBadge, Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { Unit } from "@/lib/types";

export function UnitCard({ unit, wordCount, questionCount, completion }: { unit: Unit; wordCount: number; questionCount: number; completion: number }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="brand">{unit.category}</Badge>
        <DifficultyBadge difficulty={unit.difficulty} />
      </div>
      <h3 className="text-xl font-bold text-ink">{unit.title}</h3>
      <p className="mt-2 text-sm text-slate-600">
        {wordCount} words / {questionCount} questions
      </p>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-slate-600">
          <span>Completion</span>
          <span>{completion}%</span>
        </div>
        <ProgressBar value={completion} />
      </div>
      <div className="mt-5 flex gap-3">
        <Link className="focus-ring flex-1 rounded-md bg-ink px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-700" href={`/units/${unit.id}`}>
          View Unit
        </Link>
        <Link className="focus-ring flex-1 rounded-md border border-line bg-white px-4 py-2 text-center text-sm font-semibold text-ink hover:bg-slate-50" href={`/quiz/${unit.id}`}>
          Start
        </Link>
      </div>
    </article>
  );
}
