import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../../components/Layout";
import { Link } from "@/i18n/routing";
import { getPostSlugs, readPost } from "@/lib/posts";
import {
  BRAND,
  LOCALES,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  absUrl,
  alternatesFor,
  localizedUrl,
} from "@/lib/site";

type LocaleParams = { locale: string; slug: string };
type Props = { params: Promise<LocaleParams> };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<LocaleParams[]> {
  const slugs = getPostSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = readPost(slug);
  if (!post) return { robots: { index: false, follow: false } };
  const { meta } = post;

  const url = localizedUrl(locale, `/blog/${slug}`);
  const ogImage = meta.coverImage ? absUrl(meta.coverImage) : absUrl(BRAND.ogImage);

  return {
    // Layout template appends "| Asistensia" — don't add a second brand suffix here
    title: meta.title,
    description: meta.description,
    keywords: meta.tags,
    authors: meta.author?.name ? [{ name: meta.author.name }] : undefined,
    alternates: alternatesFor(locale, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      images: [{ url: ogImage, alt: meta.title }],
      publishedTime: meta.publishedISO,
      modifiedTime: meta.updatedISO,
      authors: meta.author?.name ? [meta.author.name] : undefined,
      tags: meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

/** MDX files sometimes contain literal <h1> tags; the page already has an <h1> (the title). */
const demoteH1 = (src: string) =>
  src.replace(/<h1(\s|>)/g, "<h2$1").replace(/<\/h1>/g, "</h2>").replace(/^# /gm, "## ");

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = readPost(slug);
  if (!post) notFound();
  const tb = await getTranslations({ locale, namespace: "Blog" });

  const { content, meta } = post;
  const url = localizedUrl(locale, `/blog/${slug}`);
  const imgAbs = meta.coverImage ? absUrl(meta.coverImage) : absUrl(BRAND.ogImage);
  const isTeam = !meta.author?.name || /team/i.test(meta.author.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: meta.title,
        description: meta.description,
        image: [imgAbs],
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: locale,
        datePublished: meta.publishedISO,
        dateModified: meta.updatedISO,
        keywords: meta.tags.length ? meta.tags.join(", ") : undefined,
        author: isTeam
          ? { "@id": `${SITE_URL}/#organization` }
          : {
              "@type": "Person",
              name: meta.author!.name,
              jobTitle: meta.author?.title,
              image: meta.author?.profileImage ? absUrl(meta.author.profileImage) : undefined,
            },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: absUrl(BRAND.logoPng), width: 1000, height: 313 },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tb("home"), item: localizedUrl(locale) },
          { "@type": "ListItem", position: 2, name: tb("blog"), item: localizedUrl(locale, "/blog") },
          { "@type": "ListItem", position: 3, name: meta.title, item: url },
        ],
      },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="prose lg:prose-xl mx-auto md:px-30 py-8">
        <nav aria-label={tb("breadcrumb")} className="text-sm text-gray-500 px-5 md:px-20">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/" className="hover:text-primary">{tb("home")}</Link> /</li>
            <li><Link href="/blog" className="hover:text-primary">{tb("blog")}</Link> /</li>
            <li aria-current="page" className="text-muted truncate max-w-[60vw]">{meta.title}</li>
          </ol>
        </nav>

        {locale !== "en" && (
          <p className="mx-5 md:mx-20 mt-4 rounded-lg bg-surface px-4 py-2 text-sm text-muted">{tb("englishOnly")}</p>
        )}
        <header lang="en" dir="ltr">
          <h1 className="md:px-20 md:text-5xl text-3xl semibold text-center md:pt-10">{meta.title}</h1>
          {meta.description && (
            <p className="text-xl text-center mt-5 text-primary px-10">{meta.description}</p>
          )}
          {(meta.author?.name || meta.publishedDate) && (
            <p className="text-center italic text-gray-500 mt-5 p-2">
              {meta.author?.postedby ? `${meta.author.postedby}: ` : ""}
              {meta.author?.name}
              {meta.author?.title ? `, ${meta.author.title}` : ""}
              {meta.publishedDate && (
                <>
                  {", "}
                  <time dateTime={meta.publishedISO}>{meta.publishedDate}</time>
                </>
              )}
            </p>
          )}
        </header>

        {meta.coverImage && (
          <div className="w-full my-6 rounded-lg shadow-md mt-10 p-2">
            <Image
              src={meta.coverImage}
              alt={meta.title}
              width={1200}
              height={630}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        )}

        <div lang="en" dir="ltr" className="text-[18px] md:mt-20 md:px-30 p-5">
          <MDXRemote source={demoteH1(content)} />
        </div>
      </article>
    </Layout>
  );
}
