import type { MetadataRoute } from "next";

// Keep the entire showcase out of search engines / LLM crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
