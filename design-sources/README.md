# Arquivos originais das imagens

Esta pasta guarda a versão original (PNG/JPG em alta) de tudo que foi
convertido para WebP em `public/`. Ela **não é publicada** — só `public/`
vai para o servidor.

Use estes arquivos quando precisar reexportar uma imagem em outro tamanho
ou qualidade. Para gerar a versão publicada, o padrão usado foi:

```bash
npx sharp-cli --input original.png --output public/images/.../arquivo.webp resize 1400 --withoutEnlargement -- webp --quality 78
```

Ou, em Node, com o `sharp` que já é dependência do Next:

```js
await sharp(origem)
  .resize({ width: 1400, withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toFile(destino);
```

Larguras usadas por tipo de imagem:

| Uso | Largura máx. | Qualidade |
| --- | --- | --- |
| Banner do hero (tela cheia) | 2172 | 74 |
| Fundo do showcase de produtos | 1920 | 70 |
| Foto de seção / card | 1400–1600 | 76–78 |
| Personagem recortado (com alpha) | 1100–1200 | 78–80 |
| Logotipo e marcas | 660–800 | 84–86 |

`og.png` virou `public/og.jpg` em 1200x630 — formato canônico de Open Graph
e o único que WhatsApp e Twitter renderizam de forma confiável.

Se preferir não versionar estes originais, adicione `design-sources/` ao
`.gitignore`, mas mantenha uma cópia em outro lugar.
