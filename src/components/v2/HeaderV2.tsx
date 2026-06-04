"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const NAV_ITEMS = [
  { id: "about",    labelKey: "about"    },
  { id: "gallery",  labelKey: "gallery"  },
  { id: "founders", labelKey: "founders" },
  { id: "findus",   labelKey: "findUs"   },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function HeaderV2() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-sans font-bold text-2xl tracking-[0.1em] text-white uppercase select-none">
          TUNEL!
        </span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-150"
            >
              {t(item.labelKey)}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6"  x2="19" y2="6"  />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { scrollTo(item.id); setOpen(false); }}
              className="font-sans text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white text-left transition-colors duration-150"
            >
              {t(item.labelKey)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
