import { useTranslations } from "next-intl";

function Dot() {
  return <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-[0.5em]" aria-hidden="true" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent mb-3">
      {children}
    </p>
  );
}

export function AboutSectionV2() {
  const t = useTranslations("sections.about");

  const visionItems = [t("vision.item0"), t("vision.item1"), t("vision.item2")];
  const features    = [t("how.feature0"), t("how.feature1"), t("how.feature2"), t("how.feature3"), t("how.feature4")];
  const whyItems    = [t("why.item0"), t("why.item1"), t("why.item2")];

  return (
    <section id="about" className="bg-bg py-24 px-6 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* ── Block 1: Tunel jako galerie ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <SectionLabel>{t("intro.heading")}</SectionLabel>
            <h2 className="font-sans font-bold text-3xl lg:text-4xl uppercase text-white mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="font-sans font-light text-sm text-white/70 leading-relaxed mb-4">
              {t("intro.p1")}
            </p>
            <p className="font-sans font-light text-sm text-white/55 leading-relaxed">
              {t("intro.p2")}
            </p>
          </div>
          {/* decorative tunnel image */}
          <div className="relative h-64 lg:h-80 overflow-hidden">
            <img
              src="/img/tunnel-hero.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
          </div>
        </div>

        {/* ── Block 2: Vize ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* decorative gallery image */}
          <div className="relative h-56 lg:h-72 overflow-hidden order-last lg:order-first">
            <img
              src="/img/gallery/1.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
          </div>
          <div>
            <SectionLabel>{t("vision.label")}</SectionLabel>
            <h3 className="font-sans font-bold text-2xl lg:text-3xl uppercase text-white mb-6 leading-tight">
              {t("vision.heading")}
            </h3>
            <ul className="space-y-3">
              {visionItems.map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans font-light text-sm text-white/75">
                  <Dot />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Block 3: Jak to bude fungovat ── */}
        <div>
          <SectionLabel>{t("how.label")}</SectionLabel>
          <h3 className="font-sans font-bold text-2xl lg:text-3xl uppercase text-white mb-8 leading-tight">
            {t("how.heading")}
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {features.map((feat) => (
              <li key={feat} className="flex flex-col items-center text-center gap-3">
                <span className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </span>
                <span className="font-sans font-light text-xs text-white/70 leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans font-light text-xs text-white/40 italic">
            {t("how.note")}
          </p>
        </div>

        {/* ── Block 4: Proč ── */}
        <div>
          <SectionLabel>{t("why.label")}</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item) => (
              <div key={item} className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-full border border-accent/40 flex items-center justify-center mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </span>
                <div>
                  <p className="font-sans font-semibold text-sm text-white uppercase tracking-wide mb-1">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
