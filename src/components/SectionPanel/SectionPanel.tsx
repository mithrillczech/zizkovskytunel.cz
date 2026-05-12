"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types";

interface SectionPanelProps {
  visibleSection: SectionId;
  children: React.ReactNode;
}

export function SectionPanel({ visibleSection, children }: SectionPanelProps) {
  if (visibleSection === "none") return null;

  return (
    <div className="fixed inset-0 z-20 flex items-end lg:items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleSection}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
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
      </AnimatePresence>
    </div>
  );
}
