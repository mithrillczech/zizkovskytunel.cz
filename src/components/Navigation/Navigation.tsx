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

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const t = useTranslations("nav");
  const ta = useTranslations("accessibility");

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

      {/* Right side: language switcher + social */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher activeSection={activeSection} />
        <div className="w-px h-4 bg-white/10" />
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors duration-150"
          aria-label={ta("instagramLink")}
        >
          <InstagramIcon />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors duration-150"
          aria-label={ta("facebookLink")}
        >
          <FacebookIcon />
        </a>
      </div>
    </nav>
  );
}
