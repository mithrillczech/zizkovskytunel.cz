import { useTranslations } from "next-intl";

// Update this URL with the actual Mapy.cz embed URL for the tunnel location
const MAPY_EMBED_URL =
  "https://frame.mapy.cz/s/lozahuhuza";

export function FindUsSection() {
  const t = useTranslations("sections.findUs");

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-8">
        {t("title")}
      </h2>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Text directions */}
        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-accent mb-3">
              Adresa / Address
            </h3>
            <address className="not-italic font-display text-lg font-light text-text-primary leading-relaxed whitespace-pre-line">
              {t("address")}
            </address>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-accent mb-3">
              Doprava / Transport
            </h3>
            <p className="text-text-primary/85 text-sm leading-relaxed whitespace-pre-line">
              {t("directions")}
            </p>
          </div>

          <p className="text-text-muted text-xs font-sans border-l border-accent/40 pl-3">
            {t("mapNote")}
          </p>
        </div>

        {/* Map embed */}
        <div className="rounded-sm overflow-hidden border border-white/8" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={MAPY_EMBED_URL}
            title="Žižkovský tunel — mapa"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
