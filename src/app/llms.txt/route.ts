import { getAllPosts } from "@/lib/posts";
import { BOOKING_URL, CONTACT, LOCALES, SITE_URL, localizedUrl } from "@/lib/site";
import en from "../../../messages/en.json";

/**
 * /llms.txt — a plain-Markdown summary of the site for AI assistants (llmstxt.org).
 * Generated from the same content as the website, so it never goes stale.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const services = en.Services.items.map((s) => `- **${s.title}**: ${s.description}`).join("\n");
  const ai = en.AI.items.map((s) => `- **${s.title}**: ${s.description}`).join("\n");
  const faq = en.Faq.items.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");
  const blog = posts
    .map((p) => `- [${p.title}](${localizedUrl("en", `/blog/${p.slug}`)})${p.description ? `: ${p.description}` : ""}`)
    .join("\n");

  const body = `# Asistensia

> Asistensia (asistensia.com) is a software consulting company based in ${CONTACT.locality}, Netherlands, serving clients worldwide. We provide senior engineering for AI solutions, Ruby on Rails, PHP/Laravel, DevOps and cloud infrastructure. Note: the name is spelled "Asistensia" (with an "s"), not "asistencia".

${en.About.p1} ${en.About.p2}

## AI solutions
${en.AI.subtitle}

${ai}

## Services
${services}

## How engagements work
${en.AI.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`).join("\n")}

## Contact
- Book a free 30-minute consultation: ${BOOKING_URL}
- Email: ${CONTACT.email}
- Phone: ${CONTACT.telephone}
- Location: ${CONTACT.locality}, Netherlands

## Key pages
- [Home](${SITE_URL})
- [AI solutions](${SITE_URL}/#ai)
- [Services](${SITE_URL}/#services)
- [FAQ](${SITE_URL}/#faq)
- [Blog](${localizedUrl("en", "/blog")})
- [Privacy policy](${localizedUrl("en", "/privacy")})

## Blog articles
${blog}

## FAQ
${faq}

## Languages
The site is available in: ${LOCALES.join(", ")} (e.g. ${localizedUrl("de")}, ${localizedUrl("ar")}).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
