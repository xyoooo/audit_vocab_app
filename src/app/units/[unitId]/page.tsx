import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionsForUnit, getUnit, getWord } from "@/lib/data";
import { Badge, DifficultyBadge } from "@/components/Badge";

export default function UnitDetailPage({ params }: { params: { unitId: string } }) {
  const unit = getUnit(params.unitId);
  if (!unit) {
    return notFound();
  }

  const activeUnit = unit;
  const words = activeUnit.wordIds.map((wordId) => getWord(wordId)).filter(Boolean);
  const questions = getQuestionsForUnit(activeUnit.id);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">{activeUnit.category}</Badge>
          <DifficultyBadge difficulty={activeUnit.difficulty} />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-ink">{activeUnit.title}</h1>
        <p className="mt-2 text-slate-600">
          {words.length} vocabulary words and {questions.length} quiz questions.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link className="focus-ring rounded-md bg-ink px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700" href={`/quiz/${activeUnit.id}`}>
            Start Quiz
          </Link>
          <Link className="focus-ring rounded-md border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink hover:bg-slate-50" href="/units">
            Back to Units
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {words.map((word) =>
          word ? (
            <article key={word.id} className="rounded-lg border border-line bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-ink">{word.word}</h2>
                <Badge>{word.chineseMeaning}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-700">{word.englishDefinition}</p>
              <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{word.exampleSentence}</p>
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-semibold text-ink">Common mistake:</span> {word.commonMistake}
              </p>
            </article>
          ) : null
        )}
      </section>
    </div>
  );
}
