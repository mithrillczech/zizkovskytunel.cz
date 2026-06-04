"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function HeroV2() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");

  return (
    <section className="relative min-h-screen pt-16 bg-black flex items-stretch">
      {/* Left column — text */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 w-full lg:w-1/2">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-white/40 mb-6">
          {t("eyebrow")}
        </p>

        <h1 className="font-sans font-bold text-4xl md:text-5xl xl:text-6xl uppercase leading-tight text-white mb-6">
          {t("subtitle")}
        </h1>

        <p className="font-sans font-light text-base text-white/60 max-w-md mb-10 leading-relaxed">
          {t("tagline")}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => scrollTo("about")}
            className="font-sans font-light text-[0.7rem] tracking-[0.2em] uppercase px-7 py-3 bg-accent text-bg hover:bg-accent-hover transition-colors duration-200"
          >
            {tNav("about")}
          </button>
          <button
            className="font-sans font-light text-[0.7rem] tracking-[0.2em] uppercase px-7 py-3 border border-white/30 text-white hover:border-white transition-colors duration-200"
          >
            {t("cta")}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex items-center gap-3 mt-16 text-white/30">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <line x1="9" y1="3" x2="9" y2="15" />
            <polyline points="5 11 9 15 13 11" />
          </svg>
          <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </div>

      {/* Right column — image (desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/img/tunnel-hero.jpg"
          alt="Žižkovský tunel"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Left fade overlay to blend with text column */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      </div>

      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/img/tunnel-hero.jpg"
          alt="Žižkovský tunel"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>
    </section>
  );
}
