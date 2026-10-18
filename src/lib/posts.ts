import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  publishedDate?: string; // as written in frontmatter
  publishedISO?: string; // ISO 8601 for schema.org / sitemap
  updatedISO?: string;
  tags: string[];
  author?: { name?: string; title?: string; postedby?: string; profileImage?: string };
};

export function toISO(d?: unknown): string | undefined {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(String(d));
  return isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function readPost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.paragraph as string) ?? (data.description as string) ?? "",
    coverImage: data.coverImage as string | undefined,
    publishedDate: data.publishedDate ? String(data.publishedDate) : undefined,
    publishedISO: toISO(data.publishedDate),
    updatedISO: toISO(data.updatedDate) ?? toISO(data.publishedDate),
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? undefined,
  };
  return { content, data, meta };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((s) => readPost(s)?.meta)
    .filter((p): p is PostMeta => !!p)
    .sort((a, b) => (b.publishedISO ?? "").localeCompare(a.publishedISO ?? ""));
}
