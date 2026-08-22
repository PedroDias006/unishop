import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

/**
 * O painel de conteúdo, servido pelo próprio site em `/studio`.
 *
 * Rodar o Studio dentro do Next (em vez de um projeto separado) mantém schema e
 * front-end no mesmo repositório: mudou o schema, o tipo do TypeScript e a
 * consulta mudam no mesmo commit, e não existe versão do painel divergindo da
 * versão do site.
 *
 * A estrutura do menu é escrita à mão para separar o que é blog do que é
 * conteúdo das páginas — a lista automática do Sanity mistura os dois e fica
 * confusa para quem só quer publicar um post.
 */
export default defineConfig({
  name: "unishop",
  title: "Rede Unishop",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Blog")
              .child(
                S.list()
                  .title("Blog")
                  .items([
                    S.documentTypeListItem("post").title("Posts"),
                    S.documentTypeListItem("categoria").title("Categorias"),
                    S.documentTypeListItem("autor").title("Autores"),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Conteúdo do site")
              .child(
                S.list()
                  .title("Conteúdo do site")
                  .items([
                    S.documentTypeListItem("numeroDaRede").title("Números da rede"),
                    S.documentTypeListItem("pilarDaParceria").title("Pilares da parceria"),
                    S.documentTypeListItem("depoimento").title("Depoimentos"),
                    S.documentTypeListItem("perguntaFrequente").title("Perguntas frequentes"),
                  ]),
              ),
          ]),
    }),
    // Console de consultas GROQ: serve para conferir o que a API devolve sem
    // precisar subir código.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
