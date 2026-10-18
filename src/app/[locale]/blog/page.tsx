import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../components/Layout";
import { Link } from "@/i18n/routing";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { BRAND, OG_LOCALE, SITE_NAME, SITE_URL, absUrl, alternatesFor, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const url = localizedUrl(locale, "/blog");

  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
    alternates: alternatesFor(locale, "/blog"),
    openGraph: {
      title: `${t("blogTitle")} | ${SITE_NAME}`,
      description: t("blogDescription"),
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [{ url: BRAND.ogImage, width: 1200, height: 630, alt: `${SITE_NAME} Blog` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("blogTitle")} | ${SITE_NAME}`,
      description: t("blogDescription"),
      images: [BRAND.ogImage],
    },
  };
}

function Author({ post }: { post: PostMeta }) {
  const name = post.author?.name ?? `${SITE_NAME} Team`;
  const avatar = post.author?.profileImage ?? BRAND.iconPng;
  return (
    <div className="flex items-center space-x-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar} alt={name} width={40} height={40} loading="lazy" className="w-10 h-10 rounded-full" />
      <div>
        <p className="text-primary font-medium">{name}</p>
        {post.publishedDate && (
          <time dateTime={post.publishedISO} className="text-sm text-gray-500">
            {post.publishedDate}
          </time>
        )}
      </div>
    </div>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const blogUrl = localizedUrl(locale, "/blog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        url: blogUrl,
        name: `${SITE_NAME} Blog`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: localizedUrl(locale, `/blog/${p.slug}`),
          datePublished: p.publishedISO,
          image: p.coverImage ? absUrl(p.coverImage) : undefined,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localizedUrl(locale) },
          { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
        ],
      },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-primary">Asistensia Blog</h1>
        <p className="text-lg text-muted mb-4">
          Stay ahead with expert articles, case studies, and updates on Ruby,
          PHP, DevOps, and the software development world.
        </p>

        {featured && (
          <article className="bg-white rounded-lg pt-5 flex flex-col md:flex-row items-start gap-4">
            <Link href={`/blog/${featured.slug}`} className="w-full block overflow-hidden rounded-lg">
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  width={1200}
                  height={630}
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="rounded-lg w-full h-full object-cover max-h-60 md:max-h-full transition-transform duration-300 hover:scale-105"
                />
              )}
            </Link>
            <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 md:ml-10 pt-12">
              <h2 className="text-3xl font-semibold text-muted hover:text-primary">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              {featured.description && <p className="text-muted">{featured.description}</p>}
              <Author post={featured} />
            </div>
          </article>
        )}

        <h2 className="text-primary font-medium text-2xl pt-20">All topics</h2>
        <hr className="mt-6" />

        {rest.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg pt-20 flex flex-col md:flex-row items-start">
            <Link href={`/blog/${post.slug}`} className="w-full md:w-1/2 block overflow-hidden rounded-lg">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="rounded-lg object-cover w-full h-auto max-h-60 md:max-h-90 transition-transform duration-300 hover:scale-105"
                />
              )}
            </Link>
            <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 pt-12 md:pl-10">
              <h3 className="text-3xl font-semibold text-muted hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.description && <p className="text-muted">{post.description}</p>}
              <Author post={post} />
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
