"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types";

interface SectionPanelProps {
  section: SectionId;
  children: React.ReactNode;
}

// Total flicker duration in HeroSection
const FLICKER_DURATION = 0.33;
// How long the panel fades out (runs concurrently with the start of the flicker)
const EXIT_DURATION = 0.15;
// How long the panel fades in after the flicker ends
const ENTER_DURATION = 0.22;
// Delay before fade-in starts: flicker must finish, minus the exit time already elapsed
const ENTER_DELAY = FLICKER_DURATION - EXIT_DURATION;

export function SectionPanel({ section, children }: SectionPanelProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-end lg:items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {section !== "none" && (
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: ENTER_DURATION, delay: ENTER_DELAY, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: EXIT_DURATION, ease: "easeIn" } }}
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
