"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

export default function Navbar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/work`, label: dict.nav.work },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/contacto`, label: dict.nav.contact },
  ];
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${lang}`} className="flex items-center gap-1.5 font-mono text-sm text-white transition hover:text-inbox">
          <Inbox size={15} className="text-inbox" aria-hidden /> inbox.dev<span className="text-cta">_</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((l, i) => (
            <motion.span
              key={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
            >
              <Link href={l.href} className="transition hover:text-inbox">
                {l.label}
              </Link>
            </motion.span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/es"
            className={`rounded px-2 py-1 font-mono text-xs transition ${lang === "es" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"}`}
          >
            ES
          </Link>
          <Link
            href="/en"
            className={`rounded px-2 py-1 font-mono text-xs transition ${lang === "en" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"}`}
          >
            EN
          </Link>
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={`/${lang}/contacto`}
              className={cn(buttonVariants({ variant: "cta", size: "sm" }), "hidden sm:inline-flex")}
            >
              {dict.nav.cta}
            </Link>
          </motion.span>
        </div>
      </nav>
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 text-xs text-slate-400 md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap">
            {l.label}
          </Link>
        ))}
      </div>
    </motion.header>
  );
}
