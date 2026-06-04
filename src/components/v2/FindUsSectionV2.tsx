import { useTranslations } from "next-intl";

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] shrink-0 mt-[0.45em]" aria-hidden="true" />;
}

export function FindUsSectionV2() {
  const t = useTranslations("sections.findUs");

  return (
    <section id="findus" className="bg-[#F5F5F0] py-20 px-6 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Info */}
        <div>
        <p className="font-sans font-medium text-[0.65rem] tracking-[0.4em] uppercase text-[#F5C400] mb-3">
          {t("title")}
        </p>
        <h2 className="font-sans font-bold text-2xl lg:text-3xl uppercase text-[#1A1A1A] mb-8 leading-tight">
          {t("title")}
        </h2>

        <div className="space-y-6">
            <div>
              <p className="font-sans font-medium text-[0.6rem] tracking-[0.35em] uppercase text-[#888] mb-2">
                {t("addressLabel")}
              </p>
              <p className="font-sans font-normal text-sm text-[#444] whitespace-pre-line leading-relaxed">
                {t("address")}
              </p>
            </div>

            <div className="space-y-2">
              {[t("entranceZizkov"), t("entranceKarlin")].map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <Dot />
                  <p className="font-sans font-normal text-sm text-[#444] leading-relaxed">{line}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="font-sans font-medium text-[0.6rem] tracking-[0.35em] uppercase text-[#888] mb-2">
                {t("transportLabel")}
              </p>
              <div className="flex items-start gap-2.5">
                <Dot />
                <p className="font-sans font-normal text-sm text-[#444] leading-relaxed">
                  {t("transport")}
                </p>
              </div>
            </div>

            <p className="font-sans font-normal text-xs text-[#888] italic">
              {t("mapNote")}
            </p>
          </div>
        </div>

        {/* Map embed */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "65%" }}>
          <iframe
            title="Žižkovský tunel — mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.9874516897!2d14.453!3d50.087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA1JzEzLjIiTiAxNMKwMjcnMTAuOCJF!5e0!3m2!1scs!2scz!4v1"
            className="absolute inset-0 w-full h-full border-0 grayscale opacity-70"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}
