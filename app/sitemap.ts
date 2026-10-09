import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { projects, posts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = [
    "/es",
    "/en",
    "/es/about",
    "/en/about",
    "/es/work",
    "/en/work",
    "/es/blog",
    "/en/blog",
    "/es/contacto",
    "/en/contacto",
  ];
  const projectPaths = projects.flatMap((p) => [`/es/work/${p.slug}`, `/en/work/${p.slug}`]);
  const postPaths = posts.flatMap((p) => [`/es/blog/${p.slug}`, `/en/blog/${p.slug}`]);

  return [...staticPaths, ...projectPaths, ...postPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path.includes("/blog/") ? "monthly" : "weekly",
    priority: path === "/es" || path === "/en" ? 1 : path.split("/").length === 3 ? 0.8 : 0.6,
  }));
}
