"use client";

import { useTranslations } from "next-intl";
import type { SectionId } from "@/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS: { id: SectionId; labelKey: string }[] = [
  { id: "about",    labelKey: "about"    },
  { id: "gallery",  labelKey: "gallery"  },
  { id: "founders", labelKey: "founders" },
  { id: "findus",   labelKey: "findUs"   },
];

interface NavigationProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const t = useTranslations("nav");

  return (
    <nav
      className="hidden lg:flex w-full h-12 items-center px-10 xl:px-16 bg-bg/80 backdrop-blur-sm border-b border-white/5 z-40 relative"
      aria-label="Main navigation"
    >
      {/* Nav items — centered, fills remaining space */}
      <ul className="flex flex-1 items-center justify-center gap-8" role="list">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`
                  font-sans text-xs tracking-widest uppercase transition-colors duration-150 pb-0.5
                  ${isActive
                    ? "text-accent border-b border-accent"
                    : "text-text-muted hover:text-text-primary"
                  }
                `}
              >
                {t(item.labelKey)}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Right side: language switcher */}
      <div className="flex items-center">
        <LanguageSwitcher activeSection={activeSection} />
      </div>
    </nav>
  );
}
