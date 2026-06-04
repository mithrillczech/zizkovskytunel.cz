import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("sections.about");

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-8">
        {t("title")}
      </h2>

      <div className="max-w-2xl">
        {t("body")
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i} className="text-text-primary/85 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
}
