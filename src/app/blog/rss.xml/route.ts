import { listarPosts } from "@/content/blog";
import { siteUrl } from "@/data/site";

function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const dynamic = "force-static";

export async function GET() {
  const posts = await listarPosts();

  const itens = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;

      return `    <item>
      <title>${escapar(post.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.data}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapar(post.resumo)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog da Rede Unishop</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Mercado de limpeza profissional, gestão de loja e como empreender com a Rede Unishop.</description>
    <language>pt-BR</language>
${itens}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
