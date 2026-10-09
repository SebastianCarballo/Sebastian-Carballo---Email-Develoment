export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-white/10 bg-ink-soft/60 py-2.5" aria-hidden>
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-xs text-slate-300">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-2">
            <span className="text-sent">✓</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
