/**
 * Conteúdo institucional levantado dos dois sites oficiais da empresa —
 * `redeunishop.com.br` e `startquimica.com.br`. O texto integral das fontes,
 * com a indicação de onde cada número saiu, está em `docs/conteudo-fontes.md`.
 *
 * Nada aqui é copy inventada: se um dado não existe nas fontes, ele não entra.
 */

/** Os quatro números que o site atual exibe logo abaixo dos depoimentos. */
export const networkNumbers = [
  { value: "+500", unit: "", label: "lojas no Brasil" },
  { value: "27", unit: "", label: "estados atendidos" },
  { value: "+2.000", unit: "", label: "itens no mix de produtos" },
  { value: "38", unit: "anos", label: "de mercado" },
] as const;

/** Os números do negócio, usados na faixa logo abaixo. */
export const businessNumbers = [
  {
    value: "R$ 60 mil",
    label: "investimento inicial",
    detail: "É o menor dos três formatos de loja.",
  },
  {
    value: "até 20%",
    label: "de lucro líquido",
    detail: "Margem informada pela rede para a operação madura.",
  },
  {
    value: "18 a 24",
    label: "meses de retorno",
    detail: "Prazo médio de retorno do investimento.",
  },
  {
    value: "+35 anos",
    label: "de Grupo Lima & Pergher",
    detail: "A indústria que fabrica tudo o que a loja vende.",
  },
] as const;

/**
 * Os três formatos de loja, como a fonte A os publica na seção "Quanto você
 * deseja investir?". Área de vendas, tamanho da equipe e o que o valor cobre
 * saem da tabela reproduzida na seção 4 de `docs/conteudo-fontes.md` — nada
 * aqui é arredondado para parecer melhor.
 *
 * Os nomes Compacta, Intermediária e Completa são os mesmos que o restante do
 * site usa para as lojas P, M e G da fonte.
 */
export const storeFormats = [
  {
    id: "compacta",
    badge: "Loja P",
    label: "Para começar",
    name: "Unishop Compacta",
    tagline:
      "A porta de entrada da rede: uma operação enxuta, no ponto certo do bairro.",
    investment: "R$ 60 mil",
    area: "50 m²",
    team: "Você e mais 1 funcionário",
    image: "/images/home/modelo-loja-compacta-v1.webp",
    imageAlt: "Fachada de uma loja Unishop no formato compacto, vista da rua.",
  },
  {
    id: "intermediaria",
    badge: "Loja M",
    label: "O equilíbrio",
    name: "Unishop Intermediária",
    tagline:
      "Espaço para ampliar o mix, guardar estoque e atender empresa e consumidor no mesmo balcão.",
    investment: "R$ 86 mil",
    area: "80 m²",
    team: "Você e mais 2 funcionários",
    image: "/images/home/modelo-loja-intermediaria-v1.webp",
    imageAlt:
      "Fachada de uma loja Unishop no formato intermediário, com o carro da loja em frente.",
  },
  {
    id: "completa",
    badge: "Loja G",
    label: "O maior potencial",
    name: "Unishop Completa",
    tagline:
      "O shopping da limpeza: portfólio inteiro, equipe maior e capacidade para atender indústria e frota.",
    investment: "R$ 120 mil",
    area: "100 m² ou acima",
    team: "Você e mais 4 funcionários",
    image: "/images/home/modelo-loja-completa-v1.webp",
    imageAlt:
      "Fachada de uma loja Unishop no formato completo, vista da esquina.",
  },
] as const;

/**
 * O que o investimento cobre — igual nos três formatos, por isso aparece uma
 * vez só, fora dos cartões, em vez de repetido três vezes.
 */
export const storeFormatIncludes = [
  "Documentação para abertura do negócio",
  "Mobiliário da loja",
  "Equipamento e software",
  "Suporte de marketing B2B e B2C",
  "Primeiro estoque de produtos Start",
] as const;

/**
 * Os oito pilares que o site atual apresenta em vídeo, um a um. O texto é o
 * da fonte, com ajustes mínimos de pontuação — a chamada "Assista ao vídeo e
 * saiba mais!" foi retirada porque aqui não há vídeo por pilar.
 */
export const partnershipPillars = [
  {
    id: "o-que-e",
    title: "O que é a Unishop",
    text: "Uma rede de lojas que funcionam como Centros de Soluções em Limpeza e Higienização. O modelo permite ao varejista ser dono do próprio negócio aproveitando a estrutura de uma marca já reconhecida no mercado.",
  },
  {
    id: "sem-royalties",
    title: "Sem taxas, sem royalties",
    text: "A Unishop não adota o modelo tradicional de franquia, e sim o de parceria — o licenciamento de uso da marca. Neste sistema não há cobrança de royalties, taxas ou mensalidades.",
  },
  {
    id: "produtos-start",
    title: "Produtos Start",
    text: "Como lojista Unishop, você comercializa os produtos da Start Química, o que possibilita atender diversos segmentos com um único fornecedor.",
  },
  {
    id: "retorno",
    title: "Retorno do investimento",
    text: "O retorno do investimento fica em torno de 18 a 24 meses, considerando os formatos de loja praticados pela rede.",
  },
  {
    id: "treinamentos",
    title: "Treinamentos",
    text: "A Unishop oferece todo o suporte de treinamento ao parceiro e à equipe da loja, tanto presencial quanto online.",
  },
  {
    id: "marketing",
    title: "Suporte de marketing",
    text: "Do projeto de fachada da loja ao envio de materiais de PDV e mídias digitais, além de campanhas mensais — o suporte cobre B2B e B2C.",
  },
  {
    id: "condicao-comercial",
    title: "Condição comercial",
    text: "A Start disponibiliza uma condição comercial diferenciada para o parceiro Unishop, o que sustenta a margem da loja.",
  },
  {
    id: "rotina",
    title: "Rotina de parceria",
    text: "Como lojista Unishop, é importante seguir as orientações da equipe da rede para tirar o melhor proveito da parceria no dia a dia.",
  },
] as const;

/**
 * As cinco marcas que a loja vende, com o posicionamento oficial de cada uma
 * (fonte: páginas de marca em startquimica.com.br). Hoje o site só mostrava os
 * logos rolando, sem dizer o que cada marca resolve.
 */
export const brandUniverse = [
  {
    name: "Azulim",
    tagline: "A essência do lar brasileiro",
    text: "Mais de três décadas de produtos que limpam, desinfetam, protegem e perfumam todos os cômodos da casa. É a marca mais conhecida da Start entre as donas de casa.",
    highlight: "Vice-líder nacional em concentrados de limpeza (Super Varejo/Kantar)",
    categories: [
      "Limpadores",
      "Multiusos",
      "Desinfetantes",
      "Desengordurantes",
      "Água sanitária e clorados",
      "Ceras",
    ],
    logo: "/images/marcas/azulim.webp",
    product: "/images/produtos-showcase/clorogel.webp",
    background: "/images/produtos-showcase/azulim-fundo.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/azulim",
  },
  {
    name: "Tuff",
    tagline: "Roupas com aspecto de novas por muito mais tempo",
    text: "Cobre todas as etapas da lavagem. As fórmulas removem sujeira, gordura e suor, deixam as cores vibrantes, protegem as fibras e evitam manchas e bolinhas.",
    highlight: "Linha completa de lavagem, do sabão ao amaciante concentrado",
    categories: [
      "Amaciantes",
      "Sabão em pó",
      "Sabão líquido",
      "Alvejantes",
      "Odorizadores",
    ],
    logo: "/images/marcas/tuff.webp",
    product: "/images/produtos-showcase/tuff-linha.webp",
    background: "/images/produtos-showcase/tuff-fundo.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/tuff",
  },
  {
    name: "Asseptgel",
    tagline: "A melhor proteção é a prevenção",
    text: "A linha de higienizadores que esteve na linha de frente da covid-19 e da H1N1. Gel antisséptico com Aloe Vera e sprays com álcool 70% mais clorexidina.",
    highlight: "Elimina 99,9% dos germes e bactérias fixados na pele",
    categories: ["Álcool em gel", "Sprays antissépticos", "Sabonetes", "Espumas"],
    logo: "/images/marcas/assept.webp",
    product: "/images/produtos-showcase/asseptgel.webp",
    background: "/images/produtos-showcase/assept-fundo.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/asseptgel-para-casa",
  },
  {
    name: "Start PRO",
    tagline: "Limpeza prática e eficiente para empresas",
    text: "A linha profissional da Start. O Acabamento Acrílico faz o trabalho de quatro produtos — seladora, impermeabilizante, restaurador e antiderrapante — em pisos de médio e alto tráfego.",
    highlight: "Bactericida testado contra Salmonella e Staphylococcus aureus",
    categories: [
      "Tratamento de pisos",
      "Higienização",
      "Manutenção predial",
      "Linha alimentícia",
    ],
    logo: "/images/marcas/startpro.webp",
    product: "/images/produtos-showcase/lavinia.webp",
    background: "/images/produtos-showcase/startpro-fundo.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/start-pro",
  },
  {
    name: "Pedrex",
    tagline: "O limpa-pedras número 1 do Brasil",
    text: "Limpa pisos rústicos e de pedra sem esfregar. Em cinco minutos a área está limpa e liberada — o que resolve a vida de condomínio, clube e prédio comercial com fluxo intenso.",
    highlight: "Não usar em azulejo, mármore, porcelanato ou piso vitrificado",
    categories: ["Tratamento de pisos", "Áreas externas", "Áreas de piscina"],
    logo: "/images/marcas/pedrex.webp",
    product: "/images/produtos-showcase/pedrex.webp",
    background: "/images/produtos-showcase/pedrex-fundo.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/pedrex",
  },
] as const;

/**
 * O FAQ não existe em nenhum dos dois sites oficiais. As respostas abaixo foram
 * escritas a partir dos oito pilares e dos formatos de loja — ou seja, só
 * afirmam o que as fontes já afirmam. As perguntas cujo dado a empresa ainda
 * não publicou (prazo de implantação, exclusividade de território) ficaram de
 * fora de propósito; veja a seção 14 de `docs/conteudo-fontes.md`.
 */
export const faq = [
  {
    question: "A Unishop é uma franquia?",
    answer:
      "Não. A Unishop trabalha com licenciamento de uso da marca, o que na prática é uma parceria: você é dono do seu negócio e não paga royalties, taxas de franquia nem mensalidade à rede.",
  },
  {
    question: "Quanto preciso investir para abrir uma loja?",
    answer:
      "Há três formatos. O menor parte de R$ 60 mil, para uma área de vendas de 50 m² e uma equipe de duas pessoas. O intermediário fica em R$ 86 mil, com 80 m². O maior, em R$ 120 mil, com 100 m² ou mais e uma equipe de cinco pessoas.",
  },
  {
    question: "O que está incluído no investimento?",
    answer:
      "Nos três formatos, o valor cobre a documentação para abertura do negócio, o mobiliário da loja, equipamento e software, o suporte de marketing B2B e B2C e o primeiro estoque de produtos Start.",
  },
  {
    question: "Em quanto tempo o investimento retorna?",
    answer:
      "A rede trabalha com uma estimativa de 18 a 24 meses para o retorno do investimento, e informa uma margem de até 20% de lucro líquido na operação.",
  },
  {
    question: "Preciso ter experiência em varejo?",
    answer:
      "Não é um pré-requisito. A rede oferece treinamento comercial e operacional, presencial e online, para o parceiro e para a equipe da loja. O formulário de contato pergunta sobre experiência apenas para que a equipe entenda seu ponto de partida.",
  },
  {
    question: "Que produtos a loja vende?",
    answer:
      "O mix da Start Química, com mais de 2.000 itens de limpeza, higiene e assepsia sob marcas como Azulim, Tuff, Asseptgel, Start PRO e Pedrex — atendendo desde a casa do consumidor até indústria, hospital, lavanderia, condomínio e frota.",
  },
  {
    question: "Que apoio de marketing a loja recebe?",
    answer:
      "O suporte começa no projeto de fachada e segue com materiais de ponto de venda, peças para mídias digitais e campanhas mensais da rede, tanto para o público final quanto para a venda a empresas.",
  },
  {
    question: "Quem fabrica os produtos que eu vou vender?",
    answer:
      "A Start Química, fundada em 1987 em Uberlândia (MG) e parte do Grupo Lima & Pergher. A indústria tem mais de 20 marcas, cerca de 2.500 produtos e está entre as dez maiores do setor no país.",
  },
] as const;
