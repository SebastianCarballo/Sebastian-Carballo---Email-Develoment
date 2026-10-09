"use client";
import { useState } from "react";
import { Link2, Share2 } from "lucide-react";
import { canonical } from "@/lib/seo";

export default function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = canonical(path);
  const links = [
    { label: "X", href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-4">
      <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
        <Share2 size={13} aria-hidden /> Compartir
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener"
          className="rounded-full border px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-ink hover:text-ink"
        >
          {l.label}
        </a>
      ))}
      <button
        onClick={() => {
          navigator.clipboard?.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-ink hover:text-ink"
      >
        <Link2 size={12} aria-hidden /> {copied ? "¡Copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
}
