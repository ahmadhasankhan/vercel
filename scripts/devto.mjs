#!/usr/bin/env node
/**
 * Cross-post blog articles from src/content/blog/*.mdx to dev.to.
 *
 *   npm run devto -- <slug> [--publish] [--dry-run]
 *   npm run devto -- --all [--publish]
 *
 * - The API key comes from DEVTO_API_KEY (env or .env.local). Never commit it.
 * - Posts go up as drafts unless you pass --publish.
 * - canonical_url points to asistensia.com, so Google credits the original.
 * - Created article ids are saved in scripts/devto-articles.json, and later
 *   runs update the same dev.to article instead of making duplicates.
 * - Optional frontmatter: devto_tags: [ruby, rails, webdev] (max 4).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://asistensia.com";
const BRAND = "Asistensia";
const BOOKING_URL = "https://calendly.com/asistensia/30min";
const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "src/content/blog");
const MAP_FILE = path.join(ROOT, "scripts/devto-articles.json");
const API = "https://dev.to/api/articles";

// ---------- config ----------
function loadKey() {
  if (process.env.DEVTO_API_KEY) return process.env.DEVTO_API_KEY.trim();
  for (const f of [".env.local", ".env"]) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf8").match(/^DEVTO_API_KEY\s*=\s*["']?([^"'\r\n]+)/m);
    if (m) return m[1].trim();
  }
  return null;
}
const readMap = () => (fs.existsSync(MAP_FILE) ? JSON.parse(fs.readFileSync(MAP_FILE, "utf8")) : {});
const writeMap = (m) => fs.writeFileSync(MAP_FILE, JSON.stringify(m, null, 2) + "\n");

// ---------- MDX/JSX -> dev.to markdown ----------
const abs = (u) => (/^(https?:|mailto:|#)/.test(u) ? u : SITE_URL + (u.startsWith("/") ? u : "/" + u));
const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function inline(s) {
  return s
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, h, t) => `[${inline(t).trim()}](${abs(h)})`)
    .replace(/<(strong|b)(\s[^>]*)?>([\s\S]*?)<\/\1>/g, "**$3**")
    .replace(/<(em|i)(\s[^>]*)?>([\s\S]*?)<\/\1>/g, "_$3_")
    .replace(/<code(\s[^>]*)?>([\s\S]*?)<\/code>/g, (_, __, c) => "`" + decode(c) + "`")
    // markdown links inside MDX: make relative URLs absolute
    .replace(/\]\((\/[^)]*)\)/g, (_, u) => `](${abs(u)})`);
}

function convertProse(s) {
  return inline(
    s
      .replace(/<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (_, n, __, t) => {
        // dev.to renders the title as h1, so shift MDX h1/h2 down to ##
        const level = Math.max(2, Number(n));
        return `\n\n${"#".repeat(level)} ${inline(t).trim()}\n\n`;
      })
      .replace(/<ul(\s[^>]*)?>([\s\S]*?)<\/ul>/g, (_, __, body) =>
        "\n\n" + [...body.matchAll(/<li(\s[^>]*)?>([\s\S]*?)<\/li>/g)].map((m) => `- ${inline(m[2]).replace(/\s+/g, " ").trim()}`).join("\n") + "\n\n")
      .replace(/<ol(\s[^>]*)?>([\s\S]*?)<\/ol>/g, (_, __, body) =>
        "\n\n" + [...body.matchAll(/<li(\s[^>]*)?>([\s\S]*?)<\/li>/g)].map((m, i) => `${i + 1}. ${inline(m[2]).replace(/\s+/g, " ").trim()}`).join("\n") + "\n\n")
      .replace(/<img\s+[^>]*src="([^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*\/?>/g, (_, src, alt = "") => `![${alt}](${abs(src)})`)
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<\/?(p|div|span|section)(\s[^>]*)?>/g, "\n")
  );
}

function toDevtoMarkdown(content) {
  // Leave fenced code blocks untouched; convert everything else.
  const parts = content.split(/(^```[\s\S]*?^```)/m);
  const tidy = (s) =>
    s
      .split("\n")
      .map((l) => l.trim())
      .join("\n");
  const md = parts.map((p) => (p.startsWith("```") ? `\n\n${p}\n\n` : tidy(convertProse(p)))).join("");
  // collapse blank lines outside code blocks only
  return md
    .split(/(^```[\s\S]*?^```)/m)
    .map((p) => (p.startsWith("```") ? p : p.replace(/\n{3,}/g, "\n\n")))
    .join("")
    .trim();
}

function devtoTags(data) {
  const raw = Array.isArray(data.devto_tags) && data.devto_tags.length ? data.devto_tags : data.tags || [];
  const clean = raw.map((t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, "")).filter(Boolean);
  return [...new Set(clean)].slice(0, 4);
}

function buildArticle(slug) {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) throw new Error(`No post found: ${file}`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const canonical = `${SITE_URL}/blog/${slug}`;

  let body = toDevtoMarkdown(content);
  body += `\n\n---\n\n_Originally published on the [${BRAND} blog](${canonical})._ ` +
    `${BRAND} is a software consultancy for Ruby on Rails, PHP/Laravel and DevOps. ` +
    `[Book a free 30-minute consultation](${BOOKING_URL}).`;

  return {
    title: data.title,
    body_markdown: body,
    description: data.paragraph || data.description || "",
    tags: devtoTags(data),
    canonical_url: canonical,
    main_image: data.coverImage ? abs(data.coverImage) : undefined,
  };
}

// ---------- API ----------
async function send(key, slug, article, publish, map) {
  const existing = map[slug]?.id;
  const res = await fetch(existing ? `${API}/${existing}` : API, {
    method: existing ? "PUT" : "POST",
    headers: { "api-key": key, "Content-Type": "application/json", Accept: "application/vnd.forem.api-v1+json" },
    body: JSON.stringify({ article: { ...article, published: publish } }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${text}`);
  const json = JSON.parse(text);
  map[slug] = { id: json.id, url: json.url, published: json.published };
  writeMap(map);
  return { json, updated: Boolean(existing) };
}

// ---------- CLI ----------
async function main() {
  const args = process.argv.slice(2);
  const publish = args.includes("--publish");
  const dry = args.includes("--dry-run");
  const all = args.includes("--all");
  const slugs = all
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
    : args.filter((a) => !a.startsWith("--"));

  if (!slugs.length) {
    console.log("Usage: npm run devto -- <slug> [--publish] [--dry-run]\n       npm run devto -- --all [--publish]");
    process.exit(1);
  }

  const key = dry ? null : loadKey();
  if (!dry && !key) {
    console.error("Missing DEVTO_API_KEY. Add it to .env.local:  DEVTO_API_KEY=your_key");
    process.exit(1);
  }

  const map = readMap();
  for (const slug of slugs) {
    const article = buildArticle(slug);
    if (dry) {
      const out = path.join(ROOT, `scripts/.devto-preview-${slug}.md`);
      fs.writeFileSync(out, `# ${article.title}\n\n${article.body_markdown}\n`);
      console.log(`[dry-run] ${slug}: tags=${article.tags.join(",")} canonical=${article.canonical_url}\n          preview -> ${path.relative(ROOT, out)}`);
      continue;
    }
    try {
      const { json, updated } = await send(key, slug, article, publish, map);
      console.log(`${updated ? "Updated" : "Created"} ${json.published ? "published post" : "draft"}: ${slug}\n  ${json.url}`);
    } catch (e) {
      console.error(`Failed: ${slug}\n  ${e.message}`);
      process.exitCode = 1;
    }
    await new Promise((r) => setTimeout(r, 3500)); // stay under dev.to rate limits
  }
}

main();
