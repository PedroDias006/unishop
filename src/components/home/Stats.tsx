import { Container } from "@/components/ui/Container";
import { stats } from "@/data/site";

export function Stats() {
  return (
    <section
      aria-label="Números da Rede Unishop"
      className="relative z-10 border-b border-[#0a376a]/10 bg-[#f7f9fb]"
    >
      <Container className="grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative flex items-baseline gap-3 border-b border-[#0a376a]/10 px-4 py-6 last:border-b-0 even:border-l sm:border-b-0 sm:border-l sm:px-6 sm:py-8 sm:first:border-l-0"
          >
            <span className="absolute inset-x-5 top-0 h-px origin-left scale-x-0 bg-[#ffc928] transition-transform duration-500 group-hover:scale-x-100" />
            <strong className="block shrink-0 text-2xl font-black tracking-[-0.05em] text-[#082f63] sm:text-3xl">
              {stat.value}
            </strong>
            <span className="block max-w-[95px] text-[10px] font-black uppercase leading-4 tracking-[0.11em] text-[#49647f] sm:text-[11px]">
              {stat.label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
