import { useTranslations } from "next-intl";

export function HistorySection() {
  const t = useTranslations("sections.history");

  const timeline = t.raw("timeline") as { year: string; text: string }[];

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-6">
        {t("title")}
      </h2>

      <p className="text-text-primary/85 leading-relaxed mb-10 max-w-2xl">
        {t("intro")}
      </p>

      <ol className="relative border-l border-white/10 space-y-8 ml-2">
        {timeline.map((entry, i) => (
          <li key={i} className="ml-6">
            <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-accent" />
            <span className="font-display text-accent text-sm tracking-widest uppercase mb-1 block">
              {entry.year}
            </span>
            <p className="text-text-primary/85 leading-relaxed text-sm lg:text-base">
              {entry.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
