interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-black uppercase tracking-[0.22em] ${
            light ? "text-[var(--brand-yellow)]" : "text-[var(--brand-blue-700)]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-pretty text-base leading-7 sm:text-lg ${
            light ? "text-white/72" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
