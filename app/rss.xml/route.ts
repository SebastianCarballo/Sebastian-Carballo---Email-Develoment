import { posts, type Locale } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const items = (["es", "en"] as Locale[]).flatMap((lang) =>
    posts.map((p) => {
      const url = `${siteUrl}/${lang}/blog/${p.slug}`;
      const pubDate = new Date(p.date || "2026-01-01").toUTCString();
      return `    <item>
      <title>${esc(p.title[lang])}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${esc(p.excerpt[lang])}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${esc(p.category)}</category>
    </item>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>inbox.dev — Blog de email development</title>
    <link>${siteUrl}/es/blog</link>
    <description>Guías de HTML para email: dark mode, Outlook VML y accesibilidad. ES/EN.</description>
    <language>es</language>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
