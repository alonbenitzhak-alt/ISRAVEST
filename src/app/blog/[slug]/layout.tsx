import type { Metadata } from "next";
import { blogPosts } from "@/lib/blogData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manaio.com";
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title.en} | MANAIO Blog`,
    description: post.metaDescription.en,
    keywords: post.keywords.en,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      url,
      title: post.title.en,
      description: post.metaDescription.en,
      images: [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title.en,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.en,
      description: post.metaDescription.en,
      images: [post.cover],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
