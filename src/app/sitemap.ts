import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCourses } from "@/lib/courses";
import { LEARN_ENABLED, LOCALES, localizedUrl } from "@/lib/site";

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

/** English-only content: list just the English URL (other language copies point to it as canonical). */
function englishEntry(
  path: string,
  opts: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">
): MetadataRoute.Sitemap {
  return [{ url: localizedUrl("en", path), ...opts }];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updatedISO ?? posts[0]?.publishedISO;

  return [
    ...entry("", { changeFrequency: "weekly", priority: 1.0 }),
    ...entry("/blog", { changeFrequency: "weekly", priority: 0.8, lastModified: latest }),
    ...entry("/careers", { changeFrequency: "monthly", priority: 0.5 }),
    ...(LEARN_ENABLED
      ? [
          ...entry("/learn", { changeFrequency: "weekly", priority: 0.7 }),
        ...getAllCourses().flatMap((c) => [
          ...englishEntry(`/learn/${c.slug}`, { changeFrequency: "weekly", priority: 0.7 }),
          // only free, published lessons are indexable
          ...c.lessons.filter((l) => l.free && l.available).flatMap((l) => englishEntry(`/learn/${c.slug}/${l.slug}`, { changeFrequency: "monthly", priority: 0.6 })),
        ]),
        ]
      : []),
    ...englishEntry("/privacy", { changeFrequency: "yearly", priority: 0.3 }),
    ...posts.flatMap((p) =>
      englishEntry(`/blog/${p.slug}`, {
        changeFrequency: "monthly",
        priority: 0.6,
        lastModified: p.updatedISO ?? p.publishedISO,
      })
    ),
  ];
}
