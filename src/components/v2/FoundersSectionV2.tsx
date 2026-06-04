"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const FOUNDER_PHOTOS: Record<string, string> = {
  "Martin Wichterle": "/img/founders/martin-wichterle.jpg",
  "Jiří Řezák":       "/img/founders/jiri-rezak.jpg",
  "David Koller":     "/img/founders/david-koller.jpg",
  "Jiří Fajt":        "/img/founders/jiri-fajt.jpg",
};

const FOUNDERS = ["Martin Wichterle", "Jiří Řezák", "David Koller", "Jiří Fajt"];

function FounderPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const imgSrc = failed ? "/img/founders/placeholder.svg" : src;
  return (
    <Image
      src={imgSrc}
      alt={name}
      fill
      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
      sizes="(max-width: 768px) 50vw, 25vw"
      onError={() => setFailed(true)}
    />
  );
}

export function FoundersSectionV2() {
  const t = useTranslations("sections.founders");

  return (
    <section id="founders" className="bg-black py-20 px-6 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent mb-3">
          {t("title")}
        </p>
        <h2 className="font-sans font-bold text-2xl lg:text-3xl uppercase text-white mb-12">
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {FOUNDERS.map((name, i) => {
            const photo = FOUNDER_PHOTOS[name];
            return (
              <div key={name} className="flex flex-col">
                {/* Photo */}
                <div className="relative w-full aspect-square overflow-hidden mb-4 bg-surface">
                  <FounderPhoto src={photo} name={name} />
                  {/* bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="border-l-2 border-accent/40 pl-3">
                  <p className="font-sans font-semibold text-sm text-white leading-snug">
                    {name}
                  </p>
                  <p className="font-sans font-light text-xs text-white/50 mt-1 leading-snug">
                    {t(`list.${i}.role`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
