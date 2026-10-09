export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-14" aria-busy="true" aria-label="Cargando">
      <div className="h-9 w-1/3 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
      <div className="mt-4 h-24 max-w-3xl rounded-2xl bg-ink/90" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl border bg-white">
            <div className="aspect-[2/1] bg-ink/90" />
            <div className="space-y-2 p-5">
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
