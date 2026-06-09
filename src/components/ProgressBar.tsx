export function ProgressBar({ value, tone = "brand" }: { value: number; tone?: "brand" | "good" | "bad" | "blue" }) {
  const color = {
    brand: "bg-brand",
    good: "bg-good",
    bad: "bg-bad",
    blue: "bg-accent"
  }[tone];

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
