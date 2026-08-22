import type { SchemaTypeDefinition } from "sanity";
import { autor } from "./autor";
import { blockContent } from "./blockContent";
import { categoria } from "./categoria";
import { depoimento } from "./depoimento";
import { numeroDaRede } from "./numeroDaRede";
import { perguntaFrequente } from "./perguntaFrequente";
import { pilarDaParceria } from "./pilarDaParceria";
import { post } from "./post";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  autor,
  categoria,
  blockContent,
  depoimento,
  perguntaFrequente,
  numeroDaRede,
  pilarDaParceria,
];
