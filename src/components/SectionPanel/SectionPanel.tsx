"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types";

interface SectionPanelProps {
  section: SectionId;
  children: React.ReactNode;
}

// Lightbulb / electricity flicker sequences.
// Irregular keyframe pacing intentionally mimics an electrical flicker —
// sharp brightness spikes followed by rapid drops, ending in darkness (exit)
// or settling to full brightness (enter).

const FLICKER_EXIT = {
  opacity:    [1,   0.9, 1,   0.2, 0.85, 0.1, 0.6, 0],
  filter: [
    "brightness(1)",
    "brightness(2.2)",
    "brightness(0.3)",
    "brightness(1.6)",
    "brightness(0.15)",
    "brightness(0.9)",
    "brightness(0.05)",
    "brightness(0)",
  ],
};

const FLICKER_ENTER = {
  opacity:    [0,   0.6, 0.1, 1,   0.45, 0.95, 1],
  filter: [
    "brightness(0)",
    "brightness(2.8)",
    "brightness(0.25)",
    "brightness(1.6)",
    "brightness(0.55)",
    "brightness(1.2)",
    "brightness(1)",
  ],
};

export function SectionPanel({ section, children }: SectionPanelProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-end lg:items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {section !== "none" && (
          <motion.div
            key={section}
            initial={{ opacity: 0, filter: "brightness(0)" }}
            animate={FLICKER_ENTER}
            exit={FLICKER_EXIT}
            transition={{ duration: 0.45, ease: "linear" }}
            className="
              pointer-events-auto
              w-full max-w-4xl mx-4 lg:mx-auto
              mb-20 lg:mb-0
              bg-surface/90 backdrop-blur-md
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
