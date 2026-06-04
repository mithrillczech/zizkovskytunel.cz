"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { SectionId } from "@/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS: { id: SectionId; labelKey: string }[] = [
  { id: "about",    labelKey: "about"    },
  { id: "gallery",  labelKey: "gallery"  },
  { id: "founders", labelKey: "founders" },
  { id: "findus",   labelKey: "findUs"   },
];

interface MobileNavProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const ta = useTranslations("accessibility");
  const th = useTranslations("header");

  function handleItemClick(id: SectionId) {
    setIsOpen(false);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onSectionChange(id);
  }

  return (
    <>
      {/* Sticky mobile header */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center h-14 px-6 bg-bg/95 backdrop-blur-md border-b border-white/5">
        <span className="flex-1 flex items-baseline justify-center gap-2 uppercase">
          <span className="font-display text-sm font-light tracking-[0.2em] text-text-muted">
            {th("prefix")}
          </span>
          <span className="font-display text-xl font-bold tracking-[0.12em] text-accent">
            {th("highlight")}
          </span>
        </span>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="absolute right-6 text-text-primary p-1"
          aria-label={isOpen ? ta("closeMenu") : ta("openMenu")}
          aria-expanded={isOpen}
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <nav onClick={(e) => e.stopPropagation()} aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6 mb-10" role="list">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleItemClick(item.id)}
                        className={`
                          font-display text-4xl font-light tracking-wide transition-colors duration-150
                          ${isActive ? "text-accent" : "text-text-primary hover:text-accent"}
                        `}
                      >
                        {t(item.labelKey)}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-center items-center gap-4">
                <span className="font-sans text-xl tracking-widest uppercase text-text-muted">
                  Language
                </span>
                <LanguageSwitcher activeSection={activeSection} large />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
