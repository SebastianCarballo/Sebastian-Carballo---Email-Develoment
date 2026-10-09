# inbox.dev — Email Developer Portfolio & Blog

Portfolio + blog de email development: MJML, HTML tabular responsive, VML para
Outlook, dark mode, accesibilidad y deliverability. Bilingüe ES/EN.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- i18n nativo ES/EN (`app/[lang]`, `proxy.ts`)
- Sanity CMS headless con fallback a mock local (`lib/cms.ts`, Studio en `/studio`)
- framer-motion, lucide-react, class-variance-authority
- SEO + AEO + GEO: sitemap, robots (bots de IA permitidos), JSON-LD, `llms.txt`

## Desarrollo local

```bash
pnpm install
pnpm dev --port 3000 --hostname 127.0.0.1
```

Abrir http://127.0.0.1:3000/es (o `/en`).

## Sanity (opcional)

```bash
cp .env.local.example .env.local
pnpm dlx sanity@latest init
```

Sin `NEXT_PUBLIC_SANITY_PROJECT_ID` el sitio usa el mock de `lib/data.ts`.
El Studio vive en `/studio`.

## Build

```bash
pnpm build
```
