import { useTranslations } from "next-intl";
import type { SectionId } from "@/types";

const NAV_ITEMS = [
  { id: "about", labelKey: "about" },
  { id: "history", labelKey: "history" },
  { id: "gallery", labelKey: "gallery" },
  { id: "findus", labelKey: "findUs" },
  { id: "contact", labelKey: "contact" },
];

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

interface FooterProps {
  onSectionChange?: (id: SectionId) => void;
}

export function Footer({ onSectionChange }: FooterProps) {
  const t = useTranslations("footer");
  const ta = useTranslations("accessibility");

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-footer-bg text-footer-text">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 py-6">

        {/* Nav links — horizontal, centered */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-2" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange?.(item.id as SectionId)}
                  className="font-sans text-[0.65rem] tracking-widest uppercase text-white/55 hover:text-white/90 transition-colors duration-150"
                >
                  {t(`nav.${item.labelKey}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social icons — centered, on their own row */}
        <div className="flex justify-center items-center gap-5 mt-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white/90 transition-colors duration-150"
            aria-label={ta("instagramLink")}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white/90 transition-colors duration-150"
            aria-label={ta("facebookLink")}
          >
            <FacebookIcon />
          </a>
        </div>

        {/* Copyright */}
        <p className="font-sans text-[0.6rem] text-white/30 tracking-wide text-center mt-3">
          © Petr Machacek
        </p>
      </div>
    </footer>
  );
}
