"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types";

interface SectionPanelProps {
  section: SectionId;
  onClose: () => void;
  children: React.ReactNode;
}

export function SectionPanel({ section, onClose, children }: SectionPanelProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-end lg:items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {section !== "none" && (
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
            className="
              pointer-events-auto relative
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
            <button
              onClick={onClose}
              aria-label="Zavřít"
              className="
                sticky top-0 float-right
                m-3 p-1.5
                text-text-muted hover:text-text-primary
                transition-colors duration-150
                z-10
              "
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
