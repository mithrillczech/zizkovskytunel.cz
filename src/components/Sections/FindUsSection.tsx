import { useTranslations } from "next-intl";

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
              {t("addressLabel")}
            </h3>
            <address className="not-italic font-display text-lg font-light text-text-primary leading-relaxed whitespace-pre-line">
              {t("address")}
            </address>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-accent mb-3">
              {t("transportLabel")}
            </h3>
            <div className="space-y-2 text-sm leading-relaxed">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.08780%2C14.45148"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-text-primary/85 hover:text-accent transition-colors duration-150 group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span>{t("entranceZizkov")}</span>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.08987%2C14.45553"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-text-primary/85 hover:text-accent transition-colors duration-150 group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span>{t("entranceKarlin")}</span>
              </a>
              <p className="text-text-primary/85 pl-5">{t("transport")}</p>
            </div>
          </div>

          <p className="text-text-muted text-xs font-sans border-l border-accent/40 pl-3">
            {t("mapNote")}
          </p>
        </div>

        {/* Google Maps embed */}
        <div
          className="rounded-sm overflow-hidden border border-white/8"
          style={{ aspectRatio: "4/3" }}
        >
          <iframe
            src="https://maps.google.com/maps?q=50.08887,14.45312&z=16&output=embed"
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
