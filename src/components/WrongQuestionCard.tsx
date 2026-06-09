"use client";

import { useState } from "react";
import { questions, getWord, questionTypeLabels } from "@/lib/data";
import { WrongQuestion } from "@/lib/types";
import { Badge } from "./Badge";
import { AnswerOption } from "./AnswerOption";

export function WrongQuestionCard({ wrongQuestion, onReviewed }: { wrongQuestion: WrongQuestion; onReviewed: (selectedAnswer: string, isCorrect: boolean) => void }) {
  const question = questions.find((item) => item.id === wrongQuestion.questionId);
  const word = getWord(wrongQuestion.vocabWordId);
  const [selected, setSelected] = useState<string>();

  if (!question || !word) {
    return null;
  }

  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="blue">{questionTypeLabels[question.questionType]}</Badge>
        <Badge tone={wrongQuestion.status === "mastered" ? "good" : wrongQuestion.status === "reviewing" ? "brand" : "bad"}>{wrongQuestion.status}</Badge>
        <Badge>Correct reviews: {wrongQuestion.correctReviewCount} / 3</Badge>
      </div>
      <h2 className="text-lg font-bold text-ink">{question.questionText}</h2>
      <div className="mt-2 text-sm text-slate-600">
        Focus word: <span className="font-semibold text-ink">{word.word}</span> / Wrong count: {wrongQuestion.wrongCount}
      </div>
      <div className="mt-5 grid gap-3">
        {question.options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            selected={selected === option}
            correct={question.correctAnswer === option}
            locked={Boolean(selected)}
            onSelect={() => {
              setSelected(option);
              onReviewed(option, option === question.correctAnswer);
            }}
          />
        ))}
      </div>
      {selected ? <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{question.explanation}</p> : null}
    </article>
  );
}
