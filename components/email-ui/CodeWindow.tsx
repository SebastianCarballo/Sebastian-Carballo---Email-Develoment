"use client";
import { useState } from "react";

const MJML = `<mjml>
  <mj-body background-color="#0A0F1E">
    <mj-section>
      <mj-column>
        <mj-text color="#00D4FF" font-family="monospace">
          Hola, inbox
        </mj-text>
        <mj-button background-color="#FF6B35" border-radius="8px">
          Ver oferta
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

const HTML = `<!--[if mso]>
<v:roundrect fillcolor="#FF6B35" ...>
<![endif]-->
<a href="#" style="background:#FF6B35;
  border-radius:8px;display:inline-block">
  Ver oferta
</a>`;

export default function CodeWindow() {
  const [tab, setTab] = useState<"mjml" | "html">("mjml");
  const code = tab === "mjml" ? MJML : HTML;
  return (
    <div className="code-window overflow-hidden rounded-xl border border-white/10 bg-[#080d1d]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex gap-2">
          {(["mjml", "html"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-3 py-1 font-mono text-xs ${tab === t ? "bg-inbox/20 text-inbox" : "text-slate-400"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigator.clipboard?.writeText(code)}
          className="font-mono text-xs text-slate-400 hover:text-white"
        >
          copy
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-200">
        {code}
      </pre>
    </div>
  );
}
