export function ProgressStats({ items }: { items: { label: string; value: string | number; detail?: string }[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <div className="text-sm font-semibold text-slate-500">{item.label}</div>
          <div className="mt-2 text-2xl font-bold text-ink">{item.value}</div>
          {item.detail ? <div className="mt-1 text-sm text-slate-600">{item.detail}</div> : null}
        </div>
      ))}
    </section>
  );
}
