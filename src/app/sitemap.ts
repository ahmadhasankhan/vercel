import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://asistensia.com";
    const locales = ["en", "nl", "ar"];
    const postsDir = path.join(process.cwd(), "src/content/blog");

    let blogPages: any[] = [];
    if (fs.existsSync(postsDir)) {
        const filenames = fs.readdirSync(postsDir);
        locales.forEach(locale => {
            filenames
                .filter((file) => file.endsWith(".mdx"))
                .map((file) => {
                    const slug = file.replace(/\.mdx$/, "");
                    blogPages.push({
                        url: `${base}/${locale}/blog/${slug}`,
                        lastModified: new Date(),
                        changeFrequency: "monthly" as const,
                        priority: 0.6,
                    });
                });
        });
    }

    const staticPages: MetadataRoute.Sitemap = [];
    locales.forEach(locale => {
        staticPages.push({ url: `${base}/${locale}`, changeFrequency: "weekly", priority: 1.0 });
        staticPages.push({ url: `${base}/${locale}/blog`, changeFrequency: "weekly", priority: 0.8 });
    });

    return [...staticPages, ...blogPages];
}
