import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { siteUrl } from "@/data/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/produtos", priority: 0.9 },
  { path: "/modelo-de-negocio", priority: 0.9 },
  { path: "/seja-parceiro", priority: 0.8 },
  { path: "/sobre", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/lojas", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...routes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.data}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
