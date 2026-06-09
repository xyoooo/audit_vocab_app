"use client";

export function AnswerOption({
  option,
  selected,
  correct,
  locked,
  onSelect
}: {
  option: string;
  selected: boolean;
  correct: boolean;
  locked: boolean;
  onSelect: () => void;
}) {
  const stateClass = !locked
    ? "border-line bg-white hover:border-brand hover:bg-teal-50"
    : correct
      ? "border-green-300 bg-green-50 text-green-900"
      : selected
        ? "border-red-300 bg-red-50 text-red-900"
        : "border-line bg-white text-slate-500";

  return (
    <button
      type="button"
      disabled={locked}
      onClick={onSelect}
      className={`focus-ring flex min-h-12 w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${stateClass}`}
    >
      <span>{option}</span>
      {locked && correct ? <span className="text-xs uppercase">Correct</span> : null}
      {locked && selected && !correct ? <span className="text-xs uppercase">Your answer</span> : null}
    </button>
  );
}
