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
    <section className="relative min-h-screen pt-[60px] flex flex-col lg:flex-row bg-black">

      {/* ── Left: text content ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 lg:px-16 py-20 lg:py-0 w-full lg:w-[48%] bg-black">
        <p className="font-sans font-medium text-[0.65rem] tracking-[0.4em] uppercase text-white/40 mb-8">
          {t("eyebrow")}
        </p>

        <h1 className="font-sans font-extrabold text-4xl md:text-[2.8rem] xl:text-[3.2rem] uppercase leading-[1.08] text-white mb-7 max-w-xs md:max-w-sm">
          {t("subtitle")}
        </h1>

        <p className="font-sans font-normal text-sm text-white/60 max-w-sm mb-4 leading-relaxed">
          {t("tagline")}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => scrollTo("about")}
            className="font-sans font-medium text-[0.7rem] tracking-[0.18em] uppercase px-7 py-3 bg-[#F5C400] text-black hover:bg-yellow-300 transition-colors duration-200"
          >
            {tNav("about")}
          </button>
          <button
            className="font-sans font-medium text-[0.7rem] tracking-[0.18em] uppercase px-7 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            {t("cta")}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex items-center gap-3 mt-20 text-white/30">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <line x1="9" y1="3" x2="9" y2="15" />
            <polyline points="5 11 9 15 13 11" />
          </svg>
          <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </div>

      {/* ── Right: hero photo (desktop) ── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/img/tunnel-hero.jpg"
          alt="Žižkovský tunel"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      </div>

      {/* ── Mobile: background image ── */}
      <div className="absolute inset-0 lg:hidden pointer-events-none">
        <Image
          src="/img/tunnel-hero.jpg"
          alt="Žižkovský tunel"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
      </div>
    </section>
  );
}
