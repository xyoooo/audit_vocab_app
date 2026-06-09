import { questions, questionTypeLabels, units, vocabWords } from "./data";
import type { AppProgress, QuestionType } from "./types";

export function pct(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.round(value * 100);
}

export function formatSeconds(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export function unitCompletion(progress: AppProgress, unitId: string) {
  return progress.unitAttempts.some((attempt) => attempt.unitId === unitId) ? 100 : 0;
}

export function averageAccuracy(progress: AppProgress) {
  if (progress.unitAttempts.length === 0) {
    return 0;
  }
  return progress.unitAttempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) / progress.unitAttempts.length;
}

export function dueWrongQuestions(progress: AppProgress) {
  const now = Date.now();
  return progress.wrongQuestions.filter((item) => item.status !== "mastered" && new Date(item.nextReviewAt).getTime() <= now);
}

export function activeWrongQuestions(progress: AppProgress) {
  return progress.wrongQuestions.filter((item) => item.status !== "mastered");
}

export function wrongSummary(progress: AppProgress) {
  return {
    total: progress.wrongQuestions.length,
    reviewing: progress.wrongQuestions.filter((item) => item.status === "reviewing").length,
    mastered: progress.wrongQuestions.filter((item) => item.status === "mastered").length,
    waiting: activeWrongQuestions(progress).length
  };
}

export function categoryStats(progress: AppProgress) {
  return units.map((unit) => {
    const attempts = progress.unitAttempts.filter((attempt) => attempt.unitId === unit.id);
    const accuracy = attempts.length ? attempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) / attempts.length : 0;
    return { category: unit.category, unitTitle: unit.title, attempts: attempts.length, accuracy };
  });
}

export function bestAndWeakestCategory(progress: AppProgress) {
  const attempted = categoryStats(progress).filter((item) => item.attempts > 0);
  if (!attempted.length) {
    return { best: "No completed units yet", weakest: "No completed units yet" };
  }
  const sorted = [...attempted].sort((a, b) => b.accuracy - a.accuracy);
  return { best: sorted[0].category, weakest: sorted[sorted.length - 1].category };
}

export function weakestQuestionType(progress: AppProgress) {
  const grouped = new Map<QuestionType, { total: number; correct: number }>();
  for (const attempt of progress.questionAttempts) {
    const question = questions.find((item) => item.id === attempt.questionId);
    if (!question) continue;
    const current = grouped.get(question.questionType) ?? { total: 0, correct: 0 };
    grouped.set(question.questionType, {
      total: current.total + 1,
      correct: current.correct + (attempt.isCorrect ? 1 : 0)
    });
  }
  const sorted = Array.from(grouped.entries()).sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);
  return sorted[0] ? questionTypeLabels[sorted[0][0]] : "No quiz data yet";
}

export function weakWords(progress: AppProgress) {
  return progress.wrongQuestions
    .filter((wrong) => wrong.status !== "mastered")
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .map((wrong) => vocabWords.find((word) => word.id === wrong.vocabWordId)?.word)
    .filter((word): word is string => Boolean(word));
}

export function breakdownByQuestionType(attemptIds: string[], progress: AppProgress) {
  const rows = Object.entries(questionTypeLabels).map(([type, label]) => {
    const attempts = progress.questionAttempts.filter((attempt) => {
      const question = questions.find((item) => item.id === attempt.questionId);
      return attemptIds.includes(attempt.unitAttemptId) && question?.questionType === type;
    });
    const correct = attempts.filter((attempt) => attempt.isCorrect).length;
    return { label, total: attempts.length, correct, accuracy: attempts.length ? correct / attempts.length : 0 };
  });

  return rows.filter((row) => row.total > 0);
}
