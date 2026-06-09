"use client";

import { useMemo, useState } from "react";
import { questions } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { activeWrongQuestions, dueWrongQuestions, wrongSummary } from "@/lib/stats";
import { createId } from "@/lib/storage";
import type { WrongQuestion } from "@/lib/types";
import { ProgressStats } from "@/components/ProgressStats";
import { WrongQuestionCard } from "@/components/WrongQuestionCard";
import { LoadingPanel } from "@/components/LoadingPanel";

export default function WrongPracticePage() {
  const { progress, ready, setProgress } = useProgress();
  const [mode, setMode] = useState<"due" | "all">("due");
  const summary = wrongSummary(progress);
  const pool = useMemo(() => (mode === "due" ? dueWrongQuestions(progress) : activeWrongQuestions(progress)), [mode, progress]);

  function reviewWrongQuestion(wrongId: string, selectedAnswer: string, isCorrect: boolean) {
    setProgress((current) => {
      const now = new Date();
      const nextReview = new Date(now.getTime() + (isCorrect ? 24 : 2) * 60 * 60 * 1000).toISOString();
      const wrongQuestion = current.wrongQuestions.find((item) => item.id === wrongId);
      const question = wrongQuestion ? questions.find((item) => item.id === wrongQuestion.questionId) : undefined;

      if (!wrongQuestion || !question) {
        return current;
      }

      const correctReviewCount = isCorrect ? wrongQuestion.correctReviewCount + 1 : 0;
      const updatedWrongQuestion: WrongQuestion = {
        ...wrongQuestion,
        wrongCount: isCorrect ? wrongQuestion.wrongCount : wrongQuestion.wrongCount + 1,
        correctReviewCount,
        status: correctReviewCount >= 3 ? "mastered" : isCorrect ? "reviewing" : "wrong",
        lastWrongAt: isCorrect ? wrongQuestion.lastWrongAt : now.toISOString(),
        nextReviewAt: nextReview
      };

      return {
        ...current,
        questionAttempts: [
          ...current.questionAttempts,
          {
            id: createId("review"),
            userId: current.user.id,
            unitAttemptId: "wrong-practice",
            questionId: question.id,
            selectedAnswer,
            isCorrect,
            attemptedAt: now.toISOString()
          }
        ],
        wrongQuestions: current.wrongQuestions.map((item) => (item.id === wrongId ? updatedWrongQuestion : item))
      };
    });
  }

  if (!ready) {
    return <LoadingPanel />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">Wrong Practice</h1>
        <p className="mt-2 text-slate-600">Review questions answered incorrectly. Three correct reviews mark a question as mastered.</p>
      </div>

      <ProgressStats
        items={[
          { label: "Total Wrong", value: summary.total, detail: "Ever added" },
          { label: "Active", value: summary.waiting, detail: "Not mastered" },
          { label: "Reviewing", value: summary.reviewing, detail: "Correct at least once" },
          { label: "Mastered", value: summary.mastered, detail: "Three correct reviews" }
        ]}
      />

      <div className="flex w-fit rounded-full border border-line bg-white p-1 shadow-soft">
        <button
          type="button"
          onClick={() => setMode("due")}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold ${mode === "due" ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Due Questions
        </button>
        <button
          type="button"
          onClick={() => setMode("all")}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold ${mode === "all" ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          All Active
        </button>
      </div>

      {pool.length ? (
        <section className="grid gap-4">
          {pool.map((wrongQuestion) => (
            <WrongQuestionCard key={wrongQuestion.id} wrongQuestion={wrongQuestion} onReviewed={(answer, isCorrect) => reviewWrongQuestion(wrongQuestion.id, answer, isCorrect)} />
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-line bg-white p-8 text-center shadow-soft">
          <h2 className="text-xl font-bold text-ink">No questions in this queue</h2>
          <p className="mt-2 text-slate-600">Finish a unit or switch to all active wrong questions.</p>
        </section>
      )}
    </div>
  );
}
