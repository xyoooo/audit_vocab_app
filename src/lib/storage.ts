"use client";

import type { AppProgress, QuestionAttempt, UnitAttempt, WrongQuestion } from "./types";
import { questions } from "./data";

const STORAGE_KEY = "professional-vocab-progress-v1";
const USER_ID = "local-user";

export const defaultProgress: AppProgress = {
  user: {
    id: USER_ID,
    name: "Learner",
    createdAt: new Date().toISOString()
  },
  unitAttempts: [],
  questionAttempts: [],
  wrongQuestions: []
};

export function loadProgress(): AppProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultProgress;
  }

  try {
    return { ...defaultProgress, ...JSON.parse(raw) } as AppProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: AppProgress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function recordUnitAttempt(progress: AppProgress, unitAttempt: UnitAttempt, questionAttempts: QuestionAttempt[]): AppProgress {
  let wrongQuestions = [...progress.wrongQuestions];
  const now = new Date().toISOString();

  for (const attempt of questionAttempts) {
    if (!attempt.isCorrect) {
      const question = questions.find((item) => item.id === attempt.questionId);
      const existingIndex = wrongQuestions.findIndex((item) => item.questionId === attempt.questionId);
      const existing = existingIndex >= 0 ? wrongQuestions[existingIndex] : undefined;
      const wrongQuestion: WrongQuestion = {
        id: existing?.id ?? createId("wrong"),
        userId: progress.user.id,
        questionId: attempt.questionId,
        vocabWordId: existing?.vocabWordId ?? question?.vocabWordId ?? "",
        wrongCount: (existing?.wrongCount ?? 0) + 1,
        correctReviewCount: 0,
        status: "wrong",
        lastWrongAt: now,
        nextReviewAt: now
      };

      wrongQuestions =
        existingIndex >= 0
          ? wrongQuestions.map((item, index) => (index === existingIndex ? { ...item, ...wrongQuestion, vocabWordId: item.vocabWordId || wrongQuestion.vocabWordId } : item))
          : [...wrongQuestions, wrongQuestion];
    }
  }

  return {
    ...progress,
    unitAttempts: [...progress.unitAttempts, unitAttempt],
    questionAttempts: [...progress.questionAttempts, ...questionAttempts],
    wrongQuestions,
    lastUnitId: unitAttempt.unitId
  };
}

export function upsertWrongQuestion(progress: AppProgress, wrongQuestion: WrongQuestion): AppProgress {
  const exists = progress.wrongQuestions.some((item) => item.id === wrongQuestion.id);
  return {
    ...progress,
    wrongQuestions: exists
      ? progress.wrongQuestions.map((item) => (item.id === wrongQuestion.id ? wrongQuestion : item))
      : [...progress.wrongQuestions, wrongQuestion]
  };
}

export function resetProgress() {
  window.localStorage.removeItem(STORAGE_KEY);
}
