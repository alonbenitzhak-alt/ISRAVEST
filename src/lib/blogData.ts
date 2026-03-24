interface BlogPostData {
  id: string;
  slug: string;
  title: { he: string; en: string };
  excerpt: { he: string; en: string };
  content: { he: string; en: string };
  category: { he: string; en: string };
  cover: string;
  date: string;
  readTime: number;
  author: string;
}

export const blogPosts: BlogPostData[] = [];

