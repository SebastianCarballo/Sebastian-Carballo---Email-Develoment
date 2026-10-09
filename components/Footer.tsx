import { ArrowUpRight, Inbox, Mail, Rss } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { contactEmail, socials } from "@/lib/seo";

export default function Footer({ lang, tagline }: { lang: Locale; tagline: string }) {
  const links = [
    { href: socials.github, label: "GitHub", external: true },
    { href: "/rss.xml", label: "RSS", rss: true },
    { href: `mailto:${contactEmail}`, label: "Email", mail: true },
  ];
  return (
    <footer className="border-t border-white/10 bg-ink py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row">
        <p className="flex items-center gap-1.5 font-mono">
          <Inbox size={14} aria-hidden className="text-inbox" /> inbox.dev — {tagline}
        </p>
        <nav aria-label="Social" className="flex items-center gap-4 font-mono text-xs">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "me noopener" } : {})}
              className="flex items-center gap-1 transition hover:text-inbox"
            >
              {l.rss ? <Rss size={13} aria-hidden /> : l.mail ? <Mail size={13} aria-hidden /> : null}
              {l.label}
              {l.external && <ArrowUpRight size={12} aria-hidden />}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs">
          MJML · VML · {lang.toUpperCase()} · © 2026
        </p>
      </div>
    </footer>
  );
}
