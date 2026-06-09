export function LoadingPanel({ label = "Loading progress..." }: { label?: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-6 text-center text-sm font-semibold text-slate-600 shadow-soft">
      {label}
    </div>
  );
}
