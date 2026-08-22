import Image from "next/image";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { DepoimentoEditorial } from "@/data/editorial";

const testimonialsDoRepositorio: {
  name: string;
  image?: string;
  text: string;
}[] = [
  {
    name: "Rael",
    image: "/images/partners/rael.webp",
    text: "Como parceiro da Unishop eu percebi que o principal diferencial é quando o cliente chega, apresenta o problema dele, você capta o tipo de superfície que for lavar, passa a parte técnica, explica o produto próprio. A pessoa sai satisfeita, te indica, volta. Esse plano Start Shop ficou excelente, para quem quer ter uma loja, é um negócio show de bola.",
  },
  {
    name: "Adeir e Dona Adriana",
    image: "/images/partners/adeir-adriana.webp",
    text: "Mesmo quando nossos clientes fazem a compra do mês no supermercado, eles acabam vindo na nossa loja para repor alguma coisa ou procurar produtos que não encontram lá. A Unishop é um bom negócio, e nós recomendamos. Acreditamos que nossos pontos fortes, que garantem o ótimo desempenho da loja, são o relacionamento com os clientes e a qualidade dos produtos Start.",
  },
  {
    name: "Alisson da Di Sene",
    text: "Posso afirmar que fazer parte da rede Unishop foi uma das melhores decisões que tomei. Mesmo com a concorrência de grandes lojas, meu negócio continua a crescer. A Unishop oferece produtos de alta qualidade e um suporte incrível, o que me permite oferecer o melhor para meus clientes. Nossos pontos fortes são, sem dúvida, a excelência dos produtos e o relacionamento pessoal que conseguimos estabelecer com os clientes.",
  },
  {
    name: "Alex Costa Pondé",
    text: "Estabelecemos essa parceria com a Unishop há apenas 2 anos. Apesar de termos iniciado com recursos financeiros bem limitados, estamos conseguindo nos posicionar no mercado local, conquistando nosso espaço no segmento e, principalmente, a confiança dos nossos clientes. Nossa parceria com a Rede Unishop tem sido muito positiva, no trato, na atenção, no suporte e na disponibilidade da equipe.",
  },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Os depoimentos vêm do CMS quando existem lá; senão ficam os quatro que já
 * estavam no site, que foram colhidos das páginas oficiais da rede.
 */
export function PartnerTestimonials({
  depoimentos,
}: {
  depoimentos: DepoimentoEditorial[] | null;
}) {
  const testimonials =
    depoimentos && depoimentos.length > 0
      ? depoimentos.map((item) => ({
          name: item.nome,
          image: item.foto ?? undefined,
          text: item.texto,
        }))
      : testimonialsDoRepositorio;

  return (
    <section className="bg-[#f5f8fc] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
            Quem já faz parte
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-4xl">
            O que dizem os lojistas da rede.
          </h2>
        </div>

        <div className="mt-10 gap-6 md:columns-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="mb-6 break-inside-avoid rounded-[24px] bg-white p-7 shadow-[0_10px_30px_rgba(6,31,73,0.06)]"
            >
              <Quote
                size={26}
                className="text-[var(--brand-yellow)]"
                fill="currentColor"
                aria-hidden="true"
              />

              <blockquote className="mt-4 text-sm leading-7 text-slate-600">
                {item.text}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`Foto de ${item.name}, lojista Unishop`}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--brand-blue-900)] text-sm font-black text-white"
                  >
                    {initialsOf(item.name)}
                  </span>
                )}

                <div>
                  <strong className="block text-sm font-black text-[var(--brand-blue-950)]">
                    {item.name}
                  </strong>

                  <span className="mt-0.5 block text-xs font-semibold text-slate-500">
                    Lojista Unishop
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
