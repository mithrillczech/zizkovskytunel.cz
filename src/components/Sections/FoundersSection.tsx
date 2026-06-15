"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const FOUNDER_PHOTOS: Record<string, string> = {
  "Martin Wichterle": "/img/Founders/martin-wichterle.jpg",
  "Jiří Řezák":       "/img/Founders/jiri-rezak.jpg",
  "David Koller":     "/img/Founders/david-koller.jpg",
  "Jiří Fajt":        "/img/Founders/jiri-fajt.jpg",
};

const FOUNDERS = ["Martin Wichterle", "Jiří Řezák", "David Koller", "Jiří Fajt"];

function FounderPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? "/img/Founders/placeholder.svg" : src}
      alt={name}
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
    />
  );
}

export function FoundersSection() {
  const t = useTranslations("sections.founders");

  return (
    <div className="p-8 lg:p-10">
      <h2 className="font-sans text-3xl lg:text-4xl font-light tracking-wide text-text-primary mb-2">
        {t("title")}
      </h2>
      <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent mb-6">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {FOUNDERS.map((name, i) => (
          <div key={name} className="flex flex-col gap-2">
            {/* Photo — square, compact */}
            <div className="relative w-full aspect-square overflow-hidden bg-surface">
              <FounderPhoto src={FOUNDER_PHOTOS[name]} name={name} />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Name + role */}
            <div className="border-l border-accent/30 pl-2.5">
              <p className="font-sans font-medium text-xs text-text-primary leading-snug">
                {name}
              </p>
              <p className="font-sans text-[0.65rem] text-text-muted mt-0.5 leading-snug">
                {t(`list.${i}.role`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
