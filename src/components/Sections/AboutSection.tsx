import { useTranslations } from "next-intl";

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
      <polyline points="2 7 5 10 11 3" />
    </svg>
  );
}

export function AboutSection() {
  const t = useTranslations("sections.about");

  const visionItems  = [t("vision.item0"),  t("vision.item1"),  t("vision.item2")];
  const features     = [t("how.feature0"), t("how.feature1"), t("how.feature2"), t("how.feature3"), t("how.feature4")];
  const whyItems     = [t("why.item0"), t("why.item1"), t("why.item2")];

  return (
    <div className="p-8 lg:p-10 space-y-10">

      {/* ── Page heading ── */}
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary">
        {t("title")}
      </h2>

      {/* ── Block 1: Tunel jako galerie ── */}
      <div className="border-l-2 border-accent/40 pl-6 space-y-3">
        <p className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-accent">
          {t("intro.heading")}
        </p>
        <p className="text-text-primary/85 leading-relaxed text-sm lg:text-base">
          {t("intro.p1")}
        </p>
        <p className="text-text-primary/70 leading-relaxed text-sm lg:text-base">
          {t("intro.p2")}
        </p>
      </div>

      {/* ── Block 2: Vize ── */}
      <div className="bg-surface-raised/50 p-6 lg:p-8 space-y-4">
        <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-text-muted">
          {t("vision.label")}
        </p>
        <h3 className="font-display text-2xl lg:text-3xl font-light tracking-wide text-accent">
          {t("vision.heading")}
        </h3>
        <ul className="space-y-2 pt-1">
          {visionItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-text-primary/80 text-sm">
              <span className="text-accent mt-0.5 select-none">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Block 3: Jak to bude fungovat ── */}
      <div className="space-y-4">
        <div>
          <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-text-muted mb-1">
            {t("how.label")}
          </p>
          <h3 className="font-display text-2xl lg:text-3xl font-light tracking-wide text-text-primary">
            {t("how.heading")}
          </h3>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 pt-1">
          {features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-text-primary/80 text-sm">
              <CheckIcon />
              {feat}
            </li>
          ))}
        </ul>

        <p className="font-sans text-xs text-text-muted/70 italic border-t border-white/5 pt-4">
          {t("how.note")}
        </p>
      </div>

      {/* ── Block 4: Proč Žižkovský tunel? ── */}
      <div className="space-y-4">
        <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-text-muted">
          {t("why.label")}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {whyItems.map((item) => (
            <div key={item} className="border border-white/8 p-4 text-center">
              <p className="font-display text-sm lg:text-base font-light tracking-wide text-text-primary/90">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
