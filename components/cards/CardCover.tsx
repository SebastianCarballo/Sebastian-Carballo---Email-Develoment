// Covers SVG relevantes por contenido (sin imágenes externas, 0 peso de red).
// SEO/AEO/GEO visual: cada cover es imagen informativa con <title>/<desc>
// localizados, role="img" y <figure>/<figcaption> semánticos.

import { useId } from "react";
import type { Locale } from "@/lib/i18n";

const ACCENTS: Record<string, { from: string; to: string; glow: string }> = {
  fintech: { from: "#00D4FF", to: "#00E676", glow: "rgba(0,212,255,.35)" },
  saas: { from: "#00E676", to: "#00D4FF", glow: "rgba(0,230,118,.30)" },
  retail: { from: "#FF6B35", to: "#FFB35C", glow: "rgba(255,107,53,.35)" },
  dark: { from: "#7C6CFF", to: "#00D4FF", glow: "rgba(124,108,255,.35)" },
  outlook: { from: "#3B9DFF", to: "#00D4FF", glow: "rgba(59,157,255,.35)" },
  a11y: { from: "#00E676", to: "#FFD166", glow: "rgba(0,230,118,.30)" },
};

// Texto alternativo descriptivo por variante e idioma (entidades + contexto,
// frase completa citable para AEO/GEO, <125 caracteres idealmente).
const ALT: Record<string, Record<Locale, { title: string; desc: string }>> = {
  fintech: {
    es: {
      title: "Newsletter fintech responsive con métricas",
      desc: "Ilustración de un newsletter fintech: gráfico de barras de apertura y clics junto a un sobre de email sobre fondo oscuro de bandeja de entrada.",
    },
    en: {
      title: "Responsive fintech newsletter with metrics",
      desc: "Illustration of a fintech newsletter: open-and-click bar chart next to an email envelope on a dark inbox background.",
    },
  },
  saas: {
    es: {
      title: "Email transaccional accesible con recibo",
      desc: "Ilustración de un email transaccional accesible: recibo con líneas de texto y candado de seguridad sobre fondo oscuro.",
    },
    en: {
      title: "Accessible transactional email with receipt",
      desc: "Illustration of an accessible transactional email: receipt with text lines and a security lock on a dark background.",
    },
  },
  retail: {
    es: {
      title: "Email promocional retail con descuento",
      desc: "Ilustración de un email promocional retail: etiqueta de descuento con porcentaje junto a un sobre sobre fondo oscuro.",
    },
    en: {
      title: "Retail promo email with discount",
      desc: "Illustration of a retail promo email: percent-off price tag next to an envelope on a dark background.",
    },
  },
  dark: {
    es: {
      title: "Email en modo oscuro con luna y estrellas",
      desc: "Ilustración del modo oscuro en email: luna creciente y estrellas junto a un sobre, representa light y dark scheme.",
    },
    en: {
      title: "Email in dark mode with moon and stars",
      desc: "Illustration of email dark mode: crescent moon and stars next to an envelope, representing light and dark scheme.",
    },
  },
  outlook: {
    es: {
      title: "Email compatible con Outlook usando VML",
      desc: "Ilustración de compatibilidad con Outlook: ventana de código con etiqueta VML v:rect junto a un sobre sobre fondo oscuro.",
    },
    en: {
      title: "Outlook-compatible email using VML",
      desc: "Illustration of Outlook compatibility: code window with VML v:rect tag next to an envelope on a dark background.",
    },
  },
  a11y: {
    es: {
      title: "Email accesible con contraste y CTA grande",
      desc: "Ilustración de accesibilidad en email: ojo con líneas de texto de alto contraste y letras Aa sobre fondo oscuro.",
    },
    en: {
      title: "Accessible email with contrast and large CTA",
      desc: "Illustration of email accessibility: eye with high-contrast text lines and Aa glyphs on a dark background.",
    },
  },
};

function Bars({ color }: { color: string }) {
  const heights = [34, 58, 44, 78, 62, 92, 70];
  return (
    <g>
      {heights.map((h, i) => (
        <rect key={i} x={28 + i * 26} y={130 - h} width={16} height={h} rx={4} fill={color} opacity={0.35 + (i / heights.length) * 0.65} />
      ))}
    </g>
  );
}

function Envelope({ x, y, scale, stroke }: { x: number; y: number; scale: number; stroke: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-46} y={-30} width={92} height={60} rx={8} fill="none" stroke={stroke} strokeWidth={5} />
      <path d="M-42 -24 L0 12 L42 -24" fill="none" stroke={stroke} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

export default function CardCover({
  variant,
  caption,
  lang = "es",
}: {
  variant: string;
  caption: string;
  lang?: Locale;
}) {
  const a = ACCENTS[variant] ?? ACCENTS.fintech;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = `g-${variant}-${uid}`;
  const titleId = `cover-title-${uid}`;
  const descId = `cover-desc-${uid}`;
  const alt = ALT[variant]?.[lang] ?? ALT.fintech[lang];

  return (
    <figure className="relative m-0 overflow-hidden rounded-t-2xl">
      <svg
        viewBox="0 0 320 160"
        className="block aspect-[2/1] w-full"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
      >
        <title id={titleId}>{alt.title}</title>
        <desc id={descId}>{alt.desc}</desc>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a.from} />
            <stop offset="100%" stopColor={a.to} />
          </linearGradient>
        </defs>
        <rect width="320" height="160" fill="#0A0F1E" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="160" stroke="#ffffff" strokeOpacity="0.05" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 32} x2="320" y2={i * 32} stroke="#ffffff" strokeOpacity="0.05" />
        ))}
        <circle cx="272" cy="26" r="52" fill={a.from} opacity="0.16" />
        <circle cx="40" cy="150" r="60" fill={a.to} opacity="0.10" />

        {variant === "fintech" && (
          <>
            <Bars color={`url(#${gid})`} />
            <Envelope x={248} y={104} scale={0.85} stroke={`url(#${gid})`} />
          </>
        )}
        {variant === "saas" && (
          <>
            <rect x="52" y="36" width="120" height="88" rx="10" fill="none" stroke={`url(#${gid})`} strokeWidth="5" />
            <line x1="70" y1="62" x2="154" y2="62" stroke="#fff" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" />
            <line x1="70" y1="80" x2="130" y2="80" stroke="#fff" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" />
            <line x1="70" y1="98" x2="142" y2="98" stroke="#fff" strokeOpacity="0.25" strokeWidth="5" strokeLinecap="round" />
            <circle cx="238" cy="80" r="30" fill="none" stroke={`url(#${gid})`} strokeWidth="5" />
            <rect x="228" y="72" width="20" height="8" rx="2" fill={`url(#${gid})`} transform="rotate(45 238 80)" />
            <circle cx="238" cy="80" r="6" fill={`url(#${gid})`} />
          </>
        )}
        {variant === "retail" && (
          <>
            <g transform="translate(120 80) rotate(-12)">
              <rect x="-58" y="-34" width="116" height="68" rx="10" fill="none" stroke={`url(#${gid})`} strokeWidth="5" />
              <circle cx="-42" cy="0" r="6" fill={`url(#${gid})`} />
              <text x="6" y="14" fontSize="30" fontWeight="800" fill="#fff" fontFamily="monospace" aria-hidden="true">%</text>
            </g>
            <Envelope x={248} y={52} scale={0.7} stroke="#ffffff" />
          </>
        )}
        {variant === "dark" && (
          <>
            <circle cx="120" cy="80" r="44" fill="none" stroke={`url(#${gid})`} strokeWidth="5" />
            <circle cx="138" cy="68" r="36" fill="#0A0F1E" />
            <circle cx="230" cy="60" r="4" fill="#fff" />
            <circle cx="256" cy="92" r="3" fill="#fff" opacity="0.7" />
            <circle cx="214" cy="108" r="2.5" fill="#fff" opacity="0.5" />
            <Envelope x={70} y={118} scale={0.55} stroke={`url(#${gid})`} />
          </>
        )}
        {variant === "outlook" && (
          <>
            <rect x="44" y="30" width="150" height="100" rx="10" fill="none" stroke={`url(#${gid})`} strokeWidth="5" />
            <line x1="44" y1="54" x2="194" y2="54" stroke={`url(#${gid})`} strokeWidth="4" />
            <circle cx="60" cy="42" r="5" fill="#FF6B5C" />
            <circle cx="78" cy="42" r="5" fill="#FFD166" />
            <circle cx="96" cy="42" r="5" fill="#00E676" />
            <text x="62" y="98" fontSize="22" fontWeight="700" fill="#fff" fontFamily="monospace" aria-hidden="true">{"<v:rect>"}</text>
            <Envelope x={248} y={110} scale={0.7} stroke={`url(#${gid})`} />
          </>
        )}
        {variant === "a11y" && (
          <>
            <circle cx="130" cy="76" r="42" fill="none" stroke={`url(#${gid})`} strokeWidth="5" />
            <circle cx="130" cy="76" r="16" fill={`url(#${gid})`} />
            <circle cx="130" cy="76" r="30" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
            <line x1="60" y1="128" x2="200" y2="128" stroke="#fff" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" />
            <line x1="90" y1="142" x2="170" y2="142" stroke="#fff" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" />
            <text x="218" y="84" fontSize="26" fontWeight="800" fill="#fff" fontFamily="monospace" aria-hidden="true">Aa</text>
          </>
        )}
      </svg>
      <figcaption
        className="absolute bottom-2 left-2 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold"
        style={{ background: "rgba(10,15,30,.75)", color: a.from, boxShadow: `0 0 0 1px ${a.glow}`, backdropFilter: "blur(4px)" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

// Mapeo slug/categoría → variante visual
export function coverForWork(slug: string): { variant: string; caption: string } {
  if (slug.includes("fintech")) return { variant: "fintech", caption: "newsletter · 600px modular" };
  if (slug.includes("saas") || slug.includes("transaccional")) return { variant: "saas", caption: "transactional · AA + texto" };
  return { variant: "retail", caption: "promo · hero VML" };
}

export function coverForPost(slug: string, category: string): { variant: string; caption: string } {
  if (slug.includes("dark") || category.toLowerCase().includes("dark")) return { variant: "dark", caption: "dark mode · light + dark" };
  if (slug.includes("outlook") || slug.includes("vml")) return { variant: "outlook", caption: "outlook · VML bulletproof" };
  return { variant: "a11y", caption: "a11y · 4.5:1 + 44px CTA" };
}
