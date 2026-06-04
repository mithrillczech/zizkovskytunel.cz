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
    <section id="founders" className="bg-[#1A1A1A] py-16 px-6 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[0.65rem] tracking-[0.4em] uppercase text-[#F5C400] mb-2">
          {t("title")}
        </p>
        <h2 className="font-sans font-bold text-2xl lg:text-3xl uppercase text-white mb-10">
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#F5C400]/20">
          {FOUNDERS.map((name, i) => {
            const photo = FOUNDER_PHOTOS[name];
            return (
              <div key={name} className="flex flex-col px-4 first:pl-0 last:pr-0">
                {/* Photo */}
                <div className="relative w-full aspect-square overflow-hidden mb-4 bg-[#111]">
                  <FounderPhoto src={photo} name={name} />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <p className="font-sans font-semibold text-sm text-white leading-snug">
                  {name}
                </p>
                <p className="font-sans font-normal text-xs text-[#AAAAAA] mt-1 leading-snug">
                  {t(`list.${i}.role`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
