import { ImageResponse } from "next/og";
import { getPost, type Locale } from "@/lib/data";
import { posts } from "@/lib/data";

export const alt = "Artículo del blog de email development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.flatMap((p) => [{ lang: "es", slug: p.slug }, { lang: "en", slug: p.slug }]);
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  const locale = (lang === "en" ? "en" : "es") as Locale;
  const title = post?.title[locale] ?? slug;
  const category = post?.category ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0F1E",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#00D4FF", fontFamily: "monospace" }}>
          {`inbox.dev / blog / ${category}`}
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>{title}</div>
        <div style={{ marginTop: 40, height: 8, width: 320, backgroundColor: "#FF6B35", borderRadius: 4 }} />
      </div>
    ),
    { ...size }
  );
}
