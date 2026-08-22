import type { MetadataRoute } from "next";
import { listarPosts } from "@/content/blog";
import { produtos } from "@/data/produtos";
import { siteUrl } from "@/data/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/produtos", priority: 0.9 },
  { path: "/produtos/catalogo", priority: 0.9 },
  { path: "/modelo-de-negocio", priority: 0.9 },
  { path: "/seja-parceiro", priority: 0.8 },
  { path: "/sobre", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/lojas", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listarPosts();
  const lastModified = new Date();

  return [
    ...routes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    // Uma entrada por família de produto: são centenas de páginas geradas
    // estaticamente, e é por elas que a busca por nome de produto chega aqui.
    ...produtos.map((produto) => ({
      url: `${siteUrl}/produtos/${produto.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.data}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
