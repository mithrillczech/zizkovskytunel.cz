import { useTranslations } from "next-intl";

interface BlockProps {
  align: "left" | "right";
  heading: string;
  children: React.ReactNode;
}

function Block({ align, heading, children }: BlockProps) {
  const right = align === "right";
  return (
    <div className={`
      max-w-xl space-y-3
      ${right ? "border-r-2 pr-6 ml-auto text-right" : "border-l-2 pl-6"}
      border-accent/35
    `}>
      <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent">
        {heading}
      </p>
      {children}
    </div>
  );
}

export function AboutSection() {
  const t = useTranslations("sections.about");

  return (
    <div className="p-8 lg:p-10 space-y-10">

      {/* Page heading */}
      <h2 className="font-sans text-3xl lg:text-4xl font-light tracking-wide text-text-primary">
        {t("title")}
      </h2>

      {/* Block 1 — left */}
      <Block align="left" heading={t("intro.heading")}>
        <p className="font-sans text-sm text-text-primary/80 leading-relaxed">
          {t("intro.p1")}
        </p>
        <p className="font-sans text-sm text-text-primary/65 leading-relaxed">
          {t("intro.p2")}
        </p>
      </Block>

      {/* Block 2 — right */}
      <Block align="right" heading={t("vision.heading")}>
        <p className="font-sans text-sm text-text-primary/80 leading-relaxed">
          {t("vision.p1")}
        </p>
        <p className="font-sans text-sm text-text-primary/70 leading-relaxed">
          {t("vision.p2")}
        </p>
        <p className="font-sans text-sm text-text-primary/60 leading-relaxed">
          {t("vision.p3")}
        </p>
      </Block>

      {/* Block 3 — left */}
      <Block align="left" heading={t("how.heading")}>
        <p className="font-sans text-sm text-text-primary/80 leading-relaxed">
          {t("how.p1")}
        </p>
        <p className="font-sans text-sm text-text-primary/70 leading-relaxed">
          {t("how.p2")}
        </p>
        <p className="font-sans text-sm text-text-primary/60 leading-relaxed">
          {t("how.p3")}
        </p>
      </Block>

      {/* Block 4 — right */}
      <Block align="right" heading={t("why.heading")}>
        <p className="font-sans text-sm text-text-primary/80 leading-relaxed">
          {t("why.p1")}
        </p>
        <p className="font-sans text-sm text-text-primary/65 leading-relaxed">
          {t("why.p2")}
        </p>
      </Block>

    </div>
  );
}
