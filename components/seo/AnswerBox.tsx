import type { ReactNode } from "react";

// AEO/GEO: bloque respuesta-directa primero (pirámide invertida, 40-60 palabras citables).
export default function AnswerBox({ title = "Respuesta rápida", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-inbox/30 bg-gradient-to-br from-ink to-ink-soft p-5 text-white">
      <p className="font-mono text-xs uppercase tracking-wide text-inbox">{title}</p>
      <div className="mt-2 leading-relaxed text-slate-100">{children}</div>
    </div>
  );
}
