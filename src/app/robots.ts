import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog", "/properties"],
      disallow: ["/admin", "/dashboard", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
