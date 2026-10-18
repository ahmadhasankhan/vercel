import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { LOCALES, localizedUrl } from "@/lib/site";

function entry(
  path: string,
  opts: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localizedUrl(l, path)]));
  return LOCALES.map((locale) => ({
    url: localizedUrl(locale, path),
    alternates: { languages },
    ...opts,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updatedISO ?? posts[0]?.publishedISO;

  return [
    ...entry("", { changeFrequency: "weekly", priority: 1.0 }),
    ...entry("/blog", { changeFrequency: "weekly", priority: 0.8, lastModified: latest }),
    ...entry("/privacy", { changeFrequency: "yearly", priority: 0.3 }),
    ...posts.flatMap((p) =>
      entry(`/blog/${p.slug}`, {
        changeFrequency: "monthly",
        priority: 0.6,
        lastModified: p.updatedISO ?? p.publishedISO,
      })
    ),
  ];
}
