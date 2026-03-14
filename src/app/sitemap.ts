import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/properties",
    "/countries",
    "/countries/greece",
    "/countries/cyprus",
    "/countries/georgia",
    "/countries/portugal",
    "/calculator",
    "/compare",
    "/blog",
    "/blog/guide-to-investing-in-greek-real-estate",
    "/blog/tax-benefits-international-real-estate",
    "/blog/georgia-emerging-market-opportunity",
    "/blog/portugal-nhr-program-explained",
    "/blog/cyprus-residency-through-investment",
    "/blog/5-mistakes-first-time-international-investors",
    "/about",
    "/how-it-works",
    "/contact",
    "/register/buyer",
    "/register/agent",
    "/privacy",
    "/terms",
  ];

  return staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : path === "/properties" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/properties" ? 0.9 : 0.7,
  }));
}
