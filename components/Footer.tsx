import { Inbox } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export default function Footer({ lang, tagline }: { lang: Locale; tagline: string }) {
  return (
    <footer className="border-t border-white/10 bg-ink py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm md:flex-row">
        <p className="flex items-center gap-1.5 font-mono">
          <Inbox size={14} aria-hidden className="text-inbox" /> inbox.dev — {tagline}
        </p>
        <p className="font-mono text-xs">
          MJML · VML · {lang.toUpperCase()} · © 2026
        </p>
      </div>
    </footer>
  );
}
