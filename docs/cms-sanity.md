# CMS — Sanity Studio dentro do site

O painel roda em `/studio`, no mesmo projeto Next.js. Schema, consultas e telas
vivem no mesmo repositório: mudou o schema, o tipo do TypeScript e a consulta
mudam no mesmo commit, e não existe versão do painel divergindo da do site.

## A regra que sustenta tudo: o CMS é preferência, não dependência

Cada consulta devolve `null` quando o Sanity não está configurado, não tem aquele
tipo de conteúdo cadastrado ou simplesmente falhou. Quem chama cai no conteúdo
versionado no repositório.

```text
página → obterFaq() → Sanity respondeu?  sim → conteúdo do painel
                                          não → src/data/network.ts
```

Três consequências práticas:

- o site funciona hoje, sem conta no Sanity, exatamente como funcionava antes;
- a migração é gradual: cadastrou os números no painel, os números passam a vir
  de lá; o resto continua onde está;
- CMS fora do ar não derruba página nenhuma.

## Ligar o painel

1. Crie um projeto em [sanity.io/manage](https://www.sanity.io/manage) e copie o
   **Project ID**.
2. Preencha em `.env.local`:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID="xxxxxxxx"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```
3. No painel do Sanity, em **API > CORS origins**, libere `http://localhost:3000`
   e o domínio de produção, com *Allow credentials* ligado.
4. Abra `http://localhost:3000/studio` e entre com a conta do Sanity.

Sem o passo 2, `/studio` mostra essas mesmas instruções em vez de quebrar.

## O que o painel gerencia

| Tipo | Onde aparece | Reserva no repositório |
| --- | --- | --- |
| **Post do blog** | `/blog` e `/blog/<slug>` | `src/content/blog/posts.json` |
| **Autor**, **Categoria** | metadados do post | — |
| **Número da rede** | faixa de números da home e do modelo de negócio | `src/data/network.ts` |
| **Pilar da parceria** | carrossel de pilares da home | `src/data/network.ts` |
| **Pergunta frequente** | FAQ da home | `src/data/network.ts` |
| **Depoimento** | depoimentos em `/modelo-de-negocio` | lista dentro do componente |

Produtos **não** entram aqui: as 316 famílias vêm de
`scripts/importar-produtos.mjs`, que lê o catálogo da Start Química. Se
estivessem no CMS, cada nova execução do importador apagaria o que o marketing
tivesse editado.

## Levar os posts antigos para o painel

Os 24 artigos importados do WordPress continuam no repositório. Para editá-los
pelo painel, migre uma vez:

```bash
node scripts/migrar-blog-para-sanity.mjs --teste
```

Isso só mostra o que seria feito. Para gravar de verdade, gere um token *Editor*
em **API > Tokens** e rode:

```bash
SANITY_API_WRITE_TOKEN=xxx node scripts/migrar-blog-para-sanity.mjs
```

O script é idempotente — o `_id` de cada documento vem do slug, então rodar de
novo atualiza em vez de duplicar. Ele converte os blocos do JSON em rich text e
sobe as capas de `public/images/blog`.

Depois da migração, `posts.json` continua no repositório como rede de segurança:
o site só volta a usá-lo se o CMS não responder.

## Como o conteúdo chega na tela

- `src/sanity/lib/client.ts` — cliente e a função `consultar`, que engole erro e
  devolve `null`
- `src/sanity/lib/queries.ts` — as consultas GROQ, já convertidas para os tipos
  que as telas usam
- `src/content/blog/index.ts` — posts, com CMS na frente e JSON atrás
- `src/data/editorial.ts` — números, pilares, FAQ e depoimentos, mesma lógica

Conteúdo do CMS é revalidado a cada 5 minutos (`revalidate: 300`). Publicou no
painel, aparece no site sem deploy.

## Rich text

Post do CMS usa Portable Text e mantém negrito, itálico, links e imagens no meio
do texto. Post do acervo antigo é texto puro — foi assim que saiu do WordPress.
`src/components/blog/CorpoDoPost.tsx` desenha os dois com a mesma tipografia.

Os estilos disponíveis no editor são poucos de propósito (parágrafo, título de
seção, subtítulo, citação e listas): menos opção, blog mais consistente. O H1
não entra porque já é o título do post, e dois H1 na mesma página confundem o
buscador.
