"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getQuestionsForUnit, getUnit } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { createId, recordUnitAttempt } from "@/lib/storage";
import type { QuestionAttempt, Unit, UnitAttempt } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { LoadingPanel } from "@/components/LoadingPanel";

export default function QuizPage({ params }: { params: { unitId: string } }) {
  const router = useRouter();
  const { progress, ready, setProgress } = useProgress();
  const unit = getUnit(params.unitId);
  const activeUnit: Unit | null = unit ?? null;
  const quizQuestions = useMemo(() => getQuestionsForUnit(params.unitId), [params.unitId]);
  const [index, setIndex] = useState(0);
  const [startedAt] = useState(() => new Date());
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [answers, setAnswers] = useState<QuestionAttempt[]>([]);

  useEffect(() => {
    if (ready && activeUnit && progress.lastUnitId !== activeUnit.id) {
      setProgress((current) => ({ ...current, lastUnitId: activeUnit.id }));
    }
  }, [activeUnit, progress.lastUnitId, ready, setProgress]);

  if (!ready) {
    return <LoadingPanel />;
  }

  if (!activeUnit) {
    return (
      <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Unit not found</h1>
        <Link href="/units" className="mt-4 inline-block text-sm font-semibold text-brand">
          Back to Units
        </Link>
      </div>
    );
  }

  const question = quizQuestions[index];
  const progressValue = quizQuestions.length ? (index / quizQuestions.length) * 100 : 0;

  function selectAnswer(answer: string) {
    if (selectedAnswer || !question) return;
    const attempt: QuestionAttempt = {
      id: createId("qa"),
      userId: progress.user.id,
      unitAttemptId: "pending",
      questionId: question.id,
      selectedAnswer: answer,
      isCorrect: answer === question.correctAnswer,
      attemptedAt: new Date().toISOString()
    };
    setSelectedAnswer(answer);
    setAnswers((current) => [...current, attempt]);
  }

  function next() {
    if (!activeUnit) return;

    if (index < quizQuestions.length - 1) {
      setIndex((current) => current + 1);
      setSelectedAnswer(undefined);
      return;
    }

    const completedAt = new Date();
    const unitAttemptId = createId("unit-attempt");
    const finalizedAnswers = answers.map((attempt) => ({ ...attempt, unitAttemptId }));
    const correctAnswers = finalizedAnswers.filter((attempt) => attempt.isCorrect).length;
    const unitAttempt: UnitAttempt = {
      id: unitAttemptId,
      userId: progress.user.id,
      unitId: activeUnit.id,
      startedAt: startedAt.toISOString(),
      completedAt: completedAt.toISOString(),
      totalQuestions: quizQuestions.length,
      correctAnswers,
      accuracy: quizQuestions.length ? correctAnswers / quizQuestions.length : 0,
      timeSpentSeconds: Math.max(1, Math.round((completedAt.getTime() - startedAt.getTime()) / 1000))
    };

    setProgress(recordUnitAttempt(progress, unitAttempt, finalizedAnswers));
    router.push(`/result/${unitAttemptId}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
          <span>{activeUnit.title}</span>
          <span>{Math.round(progressValue)}%</span>
        </div>
        <ProgressBar value={progressValue} />
      </div>
      {question ? <QuestionCard question={question} index={index} total={quizQuestions.length} selectedAnswer={selectedAnswer} onSelect={selectAnswer} /> : null}
      <div className="flex justify-between gap-3">
        <Link className="focus-ring rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50" href={`/units/${activeUnit.id}`}>
          Exit
        </Link>
        <button
          type="button"
          disabled={!selectedAnswer}
          onClick={next}
          className="focus-ring rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {index < quizQuestions.length - 1 ? "Next Question" : "Finish Unit"}
        </button>
      </div>
    </div>
  );
}
