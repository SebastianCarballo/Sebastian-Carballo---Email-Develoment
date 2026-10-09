import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import InboxMock from "@/components/email-ui/InboxMock";
import CodeWindow from "@/components/email-ui/CodeWindow";
import ClientBadges from "@/components/email-ui/ClientBadges";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import Marquee from "@/components/motion/Marquee";
import Typewriter from "@/components/motion/Typewriter";
import Tilt from "@/components/motion/Tilt";
import HeroBackground from "@/components/motion/HeroBackground";
import CardCover, { coverAlt, coverForPost, coverForWork } from "@/components/cards/CardCover";
import StrapiCover, { postCoverUrl } from "@/components/cards/StrapiCover";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HoverLift } from "@/components/motion/Float";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import { cmsGetPosts, cmsGetProjects } from "@/lib/cms";

const SUBJECTS_ES = [
  "Promo -50% solo hoy 🛒",
  "Tu recibo de octubre 🧾",
  "Tu resumen semanal 📊",
  "Bienvenido al inbox ✉️",
];

const SUBJECTS_EN = [
  "Promo -50% today only 🛒",
  "Your October receipt 🧾",
  "Your weekly digest 📊",
  "Welcome to the inbox ✉️",
];

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const projects = (await cmsGetProjects(lang)).slice(0, 3);
  const posts = (await cmsGetPosts(lang)).slice(0, 3);
  const subjects = lang === "es" ? SUBJECTS_ES : SUBJECTS_EN;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink py-14 text-white md:py-20">
        <div className="email-grid absolute inset-0" />
        <HeroBackground />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="inbox">{dict.hero.kicker}</Badge>
                <Badge tone="sent">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sent" />
                  </span>
                  {dict.hero.badge}
                </Badge>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                {dict.hero.titleA}
                <br />
                <span className="gradient-text">{dict.hero.titleB}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-300 backdrop-blur">
                <ChevronRight size={13} strokeWidth={3} aria-hidden className="text-sent" />
                <span className="text-slate-500">Subject:</span>
                <Typewriter phrases={subjects} className="text-white" />
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 max-w-lg leading-relaxed text-slate-300">{dict.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/${lang}/work`} className={cn(buttonVariants({ variant: "cta", size: "lg" }), "glow-inbox")}>
                  {dict.hero.primary} <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href={`/${lang}/blog`} className={buttonVariants({ variant: "outlineLight", size: "lg" })}>
                  {dict.hero.secondary}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {dict.hero.stats.map((s: { value: string; label: string }) => (
                  <div key={s.label}>
                    <CountUp value={s.value} className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl" />
                    <p className="mt-1 text-[11px] leading-snug text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={32}>
            <Tilt className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-inbox/30 via-sent/20 to-cta/30 blur-2xl" aria-hidden />
              <div className="relative">
                <InboxMock />
              </div>
              {/* Floating chips */}
              <div className="absolute -left-3 top-8 hidden animate-bounce rounded-lg border border-white/15 bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-sent shadow-xl backdrop-blur md:block" style={{ animationDuration: "3s" }}>
                ✓ Outlook OK
              </div>
              <div className="absolute -right-3 bottom-16 hidden animate-bounce rounded-lg border border-white/15 bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-inbox shadow-xl backdrop-blur md:block" style={{ animationDuration: "4s" }}>
                ◐ dark mode
              </div>
            </Tilt>
            <div className="mt-4">
              <ClientBadges />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={["Outlook 2016/2019 OK", "Gmail <102KB", "Apple Mail dark mode", "MJML + VML", "AA accessible", "Responsive 320–600px"]} />

      {/* STACK STRIP */}
      <section className="border-b bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-6 font-mono text-xs text-slate-500">
          {["MJML", "Foundation", "VML", "Litmus", "Email on Acid", "AMP for Email", "Resend", "Sanity"].map((t) => (
            <span key={t} className="transition hover:text-ink">{t}</span>
          ))}
        </div>
      </section>

      {/* CODE */}
      <section className="bg-paper py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="inline-block rounded-full bg-ink px-3 py-1 font-mono text-[11px] text-inbox">{"<mjml> → <html> bulletproof"}</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Código limpio, testeado en 12 clientes.</p>
              <p className="mt-3 leading-relaxed text-slate-600">
                MJML para velocidad, HTML tabular + VML para Outlook. Dark mode, accesibilidad y menos de 102KB para Gmail.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {["Tablas híbridas", "VML Outlook", "color-scheme", "rol presentation"].map((label) => (
                  <span key={label} className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 font-medium text-slate-700">
                    <Check size={14} strokeWidth={3} aria-hidden className="shrink-0 text-sent" /> {label}
                  </span>
                ))}
              </div>
              <Link href={`/${lang}/about`} className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-soft">
                {dict.nav.about} →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glow-inbox rounded-xl">
              <CodeWindow />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="bg-gradient-to-b from-paper to-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading kicker="01 — selected work" title={dict.work.title} subtitle={dict.work.subtitle} />
            <Link href={`/${lang}/work`} aria-label={dict.work.title} className="mb-1 shrink-0 rounded-full border p-2.5 transition hover:bg-ink hover:text-white">
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="mt-6 grid items-stretch gap-4 md:grid-cols-3">
            {projects.map((p, i) => {
              const cover = coverForWork(p.slug);
              return (
                <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                  <HoverLift className="h-full">
                    <Link href={`/${lang}/work/${p.slug}`} className="card-sheen group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <CardCover variant={cover.variant} caption={cover.caption} lang={lang} />
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-xs text-muted">{p.client} · {p.year}</p>
                          <span className="inline-flex items-center gap-1 rounded-full bg-sent/15 px-2 py-0.5 font-mono text-[11px] text-green-700"><Check size={11} strokeWidth={3} aria-hidden /> tested</span>
                        </div>
                        <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-cta">{p.tTitle}</h3>
                        <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">{p.tExcerpt}</p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">{t}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </HoverLift>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y bg-ink py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading kicker="02 — proceso" kickerClassName="text-inbox" title={lang === "es" ? "Del Figma al inbox sin sustos" : "From Figma to inbox, no scares"} dark />
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              { n: "01", t: "Sistema modular", d: "600px + fluido + híbrido" },
              { n: "02", t: "Maquetación", d: "MJML + tabular + VML" },
              { n: "03", t: "Test 12 clientes", d: "Litmus + dark mode" },
              { n: "04", t: "QA & envío", d: "A11y, <102KB, UTMs" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-inbox/40 hover:bg-white/10">
                  <p className="font-mono text-2xl font-extrabold text-inbox">{s.n}</p>
                  <p className="mt-2 font-bold">{s.t}</p>
                  <p className="text-sm text-slate-400">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading kicker="03 — blog" title={dict.blog.title} subtitle={dict.blog.subtitle} />
          <div className="mt-6 grid items-stretch gap-4 md:grid-cols-3">
            {posts.map((p, i) => {
              const cover = coverForPost(p.slug, p.category);
              const caption = `${p.category} · ${p.minutes} ${dict.blog.min}`;
              const strapiSrc = postCoverUrl(p);
              return (
                <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                  <HoverLift className="h-full">
                    <Link href={`/${lang}/blog/${p.slug}`} className="card-sheen group flex h-full flex-col overflow-hidden rounded-2xl bg-ink text-white transition hover:shadow-2xl">
                      {strapiSrc ? (
                        <StrapiCover src={strapiSrc} alt={coverAlt(cover.variant, lang)} caption={caption} />
                      ) : (
                        <CardCover variant={cover.variant} caption={caption} lang={lang} />
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="font-mono text-xs text-inbox">{p.category} · {p.minutes} {dict.blog.min}</p>
                        <h3 className="mt-1 font-bold leading-snug group-hover:text-inbox">{p.tTitle}</h3>
                        <p className="mt-1 flex-1 text-sm text-slate-300">{p.tExcerpt}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sent">{dict.blog.readMore} <ArrowRight size={14} aria-hidden /></span>
                      </div>
                    </Link>
                  </HoverLift>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-white md:py-16">
              <div className="orb orb-a" />
              <div className="orb orb-b" />
              <h2 className="relative text-3xl font-extrabold md:text-4xl">{dict.contact.title}</h2>
              <p className="relative mx-auto mt-2 max-w-md text-slate-300">{dict.contact.subtitle}</p>
              <Link href={`/${lang}/contacto`} className={cn(buttonVariants({ variant: "cta", size: "lg" }), "relative mt-6")}>
                {dict.nav.cta} <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
