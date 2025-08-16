import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Layout from "@/app/components/Layout";

interface BlogParams {
  params: Promise<{ slug: string }>; 
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(postsDir);
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPage({ params }: BlogParams) {
   const { slug } = await params;

  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);



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
          {data.author?.postedby}: {data.author?.name}, {data.author?.title}, {data.publishedDate}{" "}
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

        {/* about author */}
        {data.author?.name && (
          <div className="mt-5 rounded-lg flex items-center gap-4 md:mx-30 p-5 md:p-0">
            {data.author.profileImage && (
              <img
                src={data.author.profileImage}
                alt={data.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{data.author.name}</p>
              <p className="text-sm text-gray-600">{data.author.title}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
