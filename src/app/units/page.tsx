"use client";

import { getQuestionsForUnit, units } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { unitCompletion } from "@/lib/stats";
import { UnitCard } from "@/components/UnitCard";

export default function UnitsPage() {
  const { progress } = useProgress();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-ink">Units</h1>
        <p className="mt-2 text-slate-600">Choose a compact study unit. Completing a unit does not require a perfect score.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {units.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            wordCount={unit.wordIds.length}
            questionCount={getQuestionsForUnit(unit.id).length}
            completion={unitCompletion(progress, unit.id)}
          />
        ))}
      </section>
    </div>
  );
}
