import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI search & assistant crawlers are explicitly welcomed so Asistensia can be
 * found and cited in ChatGPT, Claude, Gemini, Perplexity, Copilot, etc.
 * (They are also covered by "*", but explicit groups make intent unambiguous and
 * some AI crawlers only honour rules that name them.)
 */
const AI_CRAWLERS = [
  // OpenAI — ChatGPT Search, user-initiated browsing, model training
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic — Claude search, user-initiated fetches, model training
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Google — Gemini / AI features (Search itself uses Googlebot)
  "Google-Extended",
  "GoogleOther",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Microsoft Copilot (uses Bing's index)
  "Bingbot",
  // Apple Intelligence, Meta AI, Amazon, Mistral, DuckDuckGo AI, Common Crawl
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Amazonbot",
  "MistralAI-User",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
