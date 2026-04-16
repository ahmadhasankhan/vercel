// src/app/blog/[slug]/page.tsx — improved for SEO & correctness
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Layout from "../../components/Layout";

type LocaleParams = { locale: string; slug: string };
type Props = { params: Promise<LocaleParams> };

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");
const SITE = "https://asistensia.com"; // used to build absolute URLs

function readPost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, data, slug } as const;
}

export async function generateStaticParams() {
  const locales = ["en", "nl", "ar"];
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  
  const params: LocaleParams[] = [];
  locales.forEach(locale => {
    files.forEach(filename => {
      params.push({ 
        locale, 
        slug: filename.replace(/\.mdx$/, "") 
      });
    });
  });
  return params;
}

const abs = (u?: string) => (u ? (u.startsWith("http") ? u : `${SITE}${u}`) : undefined);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = readPost(slug);
  if (!post) return { robots: { index: false, follow: false } };

  const {
    title,
    paragraph,
    coverImage,
    publishedDate,
    updatedDate,
    tags,
    author,
  } = post.data as {
    title?: string;
    paragraph?: string;
    coverImage?: string;
    publishedDate?: string;
    updatedDate?: string;
    tags?: string[];
    author?: { name?: string };
  };

  const currentUrl = locale === 'en' ? `${SITE}/blog/${slug}` : `${SITE}/${locale}/blog/${slug}`;
  const ogImage = abs(coverImage) ?? `${SITE}/og-image.png`;
  const metaTitle = title ?? slug;
  const description = paragraph ?? "";

  return {
    title: `${metaTitle} | Asistensia Blog`,
    description,
    keywords: tags,
    authors: author?.name ? [{ name: author.name }] : undefined,
    alternates: { 
      canonical: currentUrl,
      languages: {
        'en': `${SITE}/blog/${slug}`,
        'nl': `${SITE}/nl/blog/${slug}`,
        'ar': `${SITE}/ar/blog/${slug}`,
        'x-default': `${SITE}/blog/${slug}`,
      }
    },
    openGraph: {
      type: "article",
      title: metaTitle,
      description,
      url: currentUrl,
      images: [{ url: ogImage }],
      publishedTime: publishedDate,
      modifiedTime: updatedDate ?? publishedDate,
      authors: author?.name ? [author.name] : undefined,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = readPost(slug);
  if (!post) notFound();

  const { content, data } = post;

  const currentUrl = locale === 'en' ? `${SITE}/blog/${slug}` : `${SITE}/${locale}/blog/${slug}`;
  const imgAbs = abs(data.coverImage as string) ?? `${SITE}/og-image.png`;

  // Article JSON-LD (scales globally; single-language site)
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.paragraph,
    image: [imgAbs],
    mainEntityOfPage: currentUrl,
    datePublished: data.publishedDate,
    dateModified: data.updatedDate ?? data.publishedDate,
    author: data.author?.name ? { "@type": "Person", name: data.author.name } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Asistensia",
      logo: { "@type": "ImageObject", url: `${SITE}/assets/brand/logo.png` },
    },
  };

  return (
      <Layout>
        <div className="prose lg:prose-xl mx-auto md:px-30 py-8">
          <h1 className="md:px-20 md:text-5xl text-3xl semibold text-center md:pt-10 ">{data.title}</h1>
          {data.paragraph && (
              <p className="text-xl text-center mt-5 text-primary px-10">{data.paragraph}</p>
          )}
          {(data.author?.name || data.publishedDate) && (
              <p className="text-center italic text-gray-500 mt-5 p-2">
                {data.author?.postedby ? `${data.author.postedby}: ` : ""}
                {data.author?.name}
                {data.author?.title ? `, ${data.author.title}` : ""}
                {data.publishedDate ? `, ${data.publishedDate}` : ""}
              </p>
          )}

          {data.coverImage && (
              <div className="w-full my-6 rounded-lg shadow-md mt-10 p-2">
                {/* Use next/image to avoid CLS; default to 1200x630 if unknown */}
                <Image
                    src={data.coverImage}
                    alt={data.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto rounded-lg"
                    priority
                />
              </div>
          )}

          <article className="text-[18px] md:mt-20 md:px-30 p-5">
            <MDXRemote source={content} />
          </article>

          {/* JSON-LD */}
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
          />
        </div>
      </Layout>
  );
}
