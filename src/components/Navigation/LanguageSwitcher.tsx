"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types";

const LOCALES = [
  { code: "cs", label: "CS" },
  { code: "en", label: "EN" },
  // Add more locales here — dropdown grows automatically
];

interface LanguageSwitcherProps {
  activeSection?: SectionId;
}

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 150ms ease",
      }}
    >
      <polyline points="2 3.5 5 6.5 8 3.5" />
    </svg>
  );
}

export function LanguageSwitcher({ activeSection }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("accessibility");

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function switchLocale(nextLocale: string) {
    setIsOpen(false);
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      const basePath = segments.join("/");
      const query =
        activeSection && activeSection !== "none"
          ? `?section=${activeSection}`
          : "";
      router.replace(`${basePath}${query}`);
    });
  }

  return (
    <div ref={ref} className="relative" aria-label={t("languageSwitcher")}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        disabled={isPending}
        className={`
          flex items-center gap-1 px-2 py-1
          font-sans text-xs tracking-widest uppercase
          transition-colors duration-150
          ${isOpen ? "text-accent" : "text-text-muted hover:text-text-primary"}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{locale.toUpperCase()}</span>
        <ChevronDown isOpen={isOpen} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            aria-label={t("languageSwitcher")}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="
              absolute right-0 top-full mt-1
              min-w-[3.5rem]
              bg-surface/95 backdrop-blur-md
              border border-white/8
              py-1
              z-50
            "
          >
            {LOCALES.map(({ code, label }) => {
              const isActive = code === locale;
              return (
                <li key={code} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => !isActive && switchLocale(code)}
                    disabled={isActive || isPending}
                    className={`
                      w-full px-3 py-1.5
                      font-sans text-xs tracking-widest uppercase text-left
                      transition-colors duration-150
                      ${
                        isActive
                          ? "text-accent cursor-default"
                          : "text-text-muted hover:text-text-primary hover:bg-surface-raised"
                      }
                    `}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
