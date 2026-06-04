import { useTranslations } from "next-intl";

function Dot() {
  return (
    <span className="w-1.5 h-1.5 rounded-full bg-accent/55 shrink-0 mt-[0.45em]" aria-hidden="true" />
  );
}

interface BlockProps {
  align: "left" | "right";
  label: string;
  heading?: string;
  children: React.ReactNode;
}

function Block({ align, label, heading, children }: BlockProps) {
  const right = align === "right";
  return (
    <div className={`
      max-w-xl
      ${right ? "border-r-2 pr-6 ml-auto text-right" : "border-l-2 pl-6"}
      border-accent/35
      space-y-3
    `}>
      <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent">
        {label}
      </p>
      {heading && (
        <p className="font-sans text-xl lg:text-2xl font-light text-text-primary">
          {heading}
        </p>
      )}
      {children}
    </div>
  );
}

interface BulletListProps {
  items: string[];
  align: "left" | "right";
  columns?: boolean;
}

function BulletList({ items, align, columns }: BulletListProps) {
  const right = align === "right";
  return (
    <ul className={`space-y-2 ${columns ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 space-y-0" : ""}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-2.5 font-sans text-sm text-text-primary/80 leading-relaxed
            ${right ? "flex-row-reverse justify-start" : ""}
          `}
        >
          <Dot />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function AboutSection() {
  const t = useTranslations("sections.about");

  const visionItems = [t("vision.item0"), t("vision.item1"), t("vision.item2")];
  const features    = [t("how.feature0"), t("how.feature1"), t("how.feature2"), t("how.feature3"), t("how.feature4")];
  const whyItems    = [t("why.item0"), t("why.item1"), t("why.item2")];

  return (
    <div className="p-8 lg:p-10 space-y-10">

      {/* Page heading */}
      <h2 className="font-sans text-3xl lg:text-4xl font-light tracking-wide text-text-primary">
        {t("title")}
      </h2>

      {/* Block 1 — left */}
      <Block align="left" label={t("intro.heading")}>
        <p className="font-sans text-sm text-text-primary/80 leading-relaxed">
          {t("intro.p1")}
        </p>
        <p className="font-sans text-sm text-text-primary/65 leading-relaxed">
          {t("intro.p2")}
        </p>
      </Block>

      {/* Block 2 — right */}
      <Block align="right" label={t("vision.label")} heading={t("vision.heading")}>
        <BulletList items={visionItems} align="right" />
      </Block>

      {/* Block 3 — left */}
      <Block align="left" label={t("how.label")} heading={t("how.heading")}>
        <BulletList items={features} align="left" columns />
        <p className="font-sans text-xs text-text-muted/65 leading-relaxed mt-1">
          {t("how.note")}
        </p>
      </Block>

      {/* Block 4 — right */}
      <Block align="right" label={t("why.label")}>
        <BulletList items={whyItems} align="right" />
      </Block>

    </div>
  );
}
