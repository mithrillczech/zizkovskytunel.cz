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
    /* Full-screen container, splits content top/bottom */
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col pt-[104px] pb-[72px]">
      <AnimatePresence>
        {section === "none" && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col justify-end h-full"
          >
            {/* ── BOTTOM: dark tint stripe ── */}
            <div className="pointer-events-auto bg-black/45 backdrop-blur-[2px] px-6 py-5 flex justify-center">
              <div className="w-full max-w-xl flex flex-col items-center gap-3 text-center">
                <p className="font-sans font-light text-sm xl:text-base tracking-[0.25em] uppercase text-text-primary/75">
                  {t("subtitle")}
                </p>

                <p className="font-sans font-light text-sm xl:text-base text-text-primary/70 leading-relaxed max-w-md">
                  {t("tagline")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
