import type { MetadataRoute } from "next";

// If your blog posts live in a data source, read them here.
// For slug-based MDX, replace this array by reading your source at build time.
// const posts = [
//     // { slug: "/blog/react-vs-react-native" },
//     // { slug: "/blog/why-ruby-on-rails-is-best-for-startups" },
//     // ...
// ];

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://asistensia.com";

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${base}/`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
        { url: `${base}/ruby-on-rails-consulting`, changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/rails-upgrade`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/rails-performance-audit`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/devops-consulting`, changeFrequency: "monthly", priority: 0.7 },
    ];

    // const blogPages = posts.map(p => ({
    //     url: `${base}${p.slug}`,
    //     changeFrequency: "monthly",
    //     priority: 0.6,
    // }));

    //return [...staticPages, ...blogPages];
    return [...staticPages];
}
