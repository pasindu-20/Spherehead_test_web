import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { blogPosts, type BlogPost } from "@/data/blog-posts";

type BlogStoryPageProps = {
  post: BlogPost;
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: blogPosts.map((post) => ({
    params: { slug: post.slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogStoryPageProps> = ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
};

export default function BlogStoryPage({ post }: BlogStoryPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Spherehead Technologies</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="min-h-screen bg-white text-[#01030B]">
        {/* Gradient header area so the navbar (white text) is visible */}
        <div className="bg-animated-gradient pt-28 pb-32 lg:pt-36 lg:pb-80">
          <SiteContainer>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blogs
            </Link>

            <article className="mt-10">
              <span className="heading-2">
                {post.title}
              </span>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/60">
                <span>{post.date}</span>
                <span aria-hidden="true">/</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          </SiteContainer>
        </div>

        {/* Article body on white background */}
        <SiteContainer className="pb-20 lg:pb-28">
          <div className="relative -mt-24 lg:-mt-64 aspect-[16/8] overflow-hidden rounded-[8px] bg-[#edf4ff]">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06142E]/80 via-[#0A2F76]/35 to-transparent" />
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-7 body-small text-[#263348]">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SiteContainer>
      </main>
    </>
  );
}
