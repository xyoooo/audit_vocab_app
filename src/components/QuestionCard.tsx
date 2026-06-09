"use client";

import { questionTypeLabels } from "@/lib/data";
import { Question } from "@/lib/types";
import { Badge } from "./Badge";
import { AnswerOption } from "./AnswerOption";

export function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  onSelect
}: {
  question: Question;
  index: number;
  total: number;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
}) {
  const locked = Boolean(selectedAnswer);
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Badge tone="blue">{questionTypeLabels[question.questionType]}</Badge>
        <span className="text-sm font-semibold text-slate-500">
          {index + 1} / {total}
        </span>
      </div>
      <h1 className="text-xl font-bold text-ink sm:text-2xl">{question.questionText}</h1>
      <div className="mt-6 grid gap-3">
        {question.options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            selected={selectedAnswer === option}
            correct={question.correctAnswer === option}
            locked={locked}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
      {locked ? (
        <div className={`mt-5 rounded-md border p-4 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
          <div className={`font-bold ${isCorrect ? "text-good" : "text-bad"}`}>{isCorrect ? "Correct" : "Incorrect"}</div>
          <p className="mt-1 text-sm text-slate-700">{question.explanation}</p>
        </div>
      ) : null}
    </section>
  );
}
