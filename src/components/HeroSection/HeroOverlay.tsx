"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { SectionId } from "@/types";

interface HeroOverlayProps {
  section: SectionId;
}

export function HeroOverlay({ section }: HeroOverlayProps) {
  const t = useTranslations("hero");

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-6 pt-[104px] pb-20">
      <AnimatePresence>
        {section === "none" && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <p className="font-sans text-[0.6rem] tracking-[0.45em] uppercase text-text-muted mb-6 select-none">
              {t("eyebrow")}
            </p>

            <h2 className="font-display text-7xl xl:text-[9rem] font-light tracking-[0.12em] uppercase text-accent leading-none mb-5">
              {t("headline")}
            </h2>

            <p className="font-sans text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase text-text-primary/60 max-w-sm mb-4">
              {t("subtitle")}
            </p>

            <p className="font-display text-base xl:text-lg font-light italic text-text-primary/60 max-w-md mb-10 leading-relaxed">
              {t("tagline")}
            </p>

            <button className="
              font-sans text-[0.65rem] tracking-[0.25em] uppercase
              px-8 py-3
              border border-accent/50 text-accent
              hover:bg-accent hover:text-bg
              transition-colors duration-200
            ">
              {t("cta")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
