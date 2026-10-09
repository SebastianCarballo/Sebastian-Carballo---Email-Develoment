"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAILS = [
  { from: "Tienda Retail", subject: "Promo -50% solo hoy", pre: "Hero VML OK en Outlook", time: "9:41", tag: "promo" },
  { from: "SaaS App", subject: "Tu recibo de octubre", pre: "Accesible + texto plano", time: "8:15", tag: "transactional" },
  { from: "Fintech", subject: "Tu resumen semanal", pre: "Dark mode perfecto", time: "7:02", tag: "newsletter" },
];

export default function InboxMock() {
  const [active, setActive] = useState(0);
  const mail = EMAILS[active];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-soft shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-sent" />
        <span className="ml-3 font-mono text-xs text-slate-400">inbox — 3 sin leer</span>
      </div>
      <div className="grid md:grid-cols-[1fr_1.2fr]">
        <ul className="divide-y divide-white/5">
          {EMAILS.map((m, i) => (
            <li key={m.subject}>
              <button
                onClick={() => setActive(i)}
                className={`w-full px-4 py-3 text-left hover:bg-white/5 ${i === active ? "bg-white/10" : ""}`}
              >
                <p className="text-xs text-inbox">{m.from}</p>
                <p className="truncate text-sm font-semibold text-white">{m.subject}</p>
                <p className="truncate text-xs text-slate-400">{m.pre}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 p-4 md:border-l md:border-t-0">
          <p className="font-mono text-[11px] text-slate-500">Subject: {mail.subject}</p>
          <p className="font-mono text-[11px] text-slate-500">Preheader: {mail.pre}</p>
          <div className="mt-3 rounded-lg bg-white p-4 text-ink">
            <p className="text-xs font-bold uppercase tracking-wide text-cta">{mail.tag}</p>
            <p className="mt-1 text-lg font-bold leading-snug">{mail.subject}</p>
            <p className="mt-2 text-sm text-slate-600">
              Hola, este es un preview realista de un email responsive con tablas, VML y dark mode.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded bg-ink px-4 py-2 text-sm font-bold text-white">
              Ver oferta <ArrowRight size={14} aria-hidden />
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1 font-mono text-[11px] text-sent"><Check size={12} strokeWidth={3} aria-hidden /> render OK · Outlook / Gmail / Apple</p>
        </div>
      </div>
    </div>
  );
}
