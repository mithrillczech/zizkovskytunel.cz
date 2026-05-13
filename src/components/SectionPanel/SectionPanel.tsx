"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types";

interface SectionPanelProps {
  section: SectionId;
  children: React.ReactNode;
}

// The background flicker in HeroSection runs for 0.25s.
// Content disappears instantly, stays hidden during the flicker,
// then appears cleanly once the background animation is done.
const FLICKER_DURATION = 0.25;

export function SectionPanel({ section, children }: SectionPanelProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-end lg:items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {section !== "none" && (
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0, delay: FLICKER_DURATION } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="
              pointer-events-auto
              w-full max-w-4xl mx-4 lg:mx-auto
              mb-20 lg:mb-0
              bg-surface/70 backdrop-blur-md
              border border-white/8
              rounded-sm
              max-h-[75vh] overflow-y-auto
            "
            role="region"
            aria-live="polite"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
