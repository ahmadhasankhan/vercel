// src/app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
// @ts-ignore
import type { Metadata, PageProps } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Layout from "@/app/components/Layout";

type Props = PageProps<{ slug: string }>;

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

function readPost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, data };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR);
  return files.map((filename) => ({ slug: filename.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = readPost(slug);
  if (!post) return {};

  const { title, paragraph, coverImage, publishedDate, updatedDate, tags, author } =
      post.data as {
        title?: string;
        paragraph?: string;
        coverImage?: string;
        publishedDate?: string;
        updatedDate?: string;
        tags?: string[];
        author?: { name?: string };
      };

  const canonical = `/blog/${slug}`;
  const ogImage = coverImage ?? "/og-default.jpg";
  const metaTitle = title ?? slug;
  const description = paragraph ?? "";

  return {
    title: metaTitle,
    description,
    keywords: tags,
    authors: author?.name ? [{ name: author.name }] : undefined,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: metaTitle,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: publishedDate,
      modifiedTime: updatedDate ?? publishedDate,
      authors: author?.name ? [author.name] : undefined,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const post = readPost(slug);
  if (!post) notFound();

  const { content, data } = post;

  return (
      <Layout>
        <div className="prose lg:prose-xl mx-auto md:px-30 py-8">
          <h1 className="md:px-20 md:text-5xl text-3xl semibold text-center md:pt-10 ">
            {data.title}
          </h1>
          <p className="text-xl text-center mt-5 text-primary px-10">
            {data.paragraph}
          </p>
          <p className="text-center italic text-gray-500 mt-5 p-2">
            {data.author?.postedby}: {data.author?.name}, {data.author?.title}, {data.publishedDate}
          </p>

          {data.coverImage && (
              <img
                  src={data.coverImage}
                  alt={data.title}
                  className="w-full my-6 rounded-lg shadow-md mt-10 p-2"
              />
          )}

          <article className="text-[18px] md:mt-20 md:px-30 p-5">
            <MDXRemote source={content} />
          </article>
        </div>
      </Layout>
  );
}
