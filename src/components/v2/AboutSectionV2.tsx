import React from "react";
import { useTranslations } from "next-intl";

// ─── Shared primitives ───────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans font-medium text-[0.65rem] tracking-[0.4em] uppercase text-[#F5C400] mb-3">
      {children}
    </p>
  );
}

function SectionHeading({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 className={`font-sans font-bold text-2xl md:text-3xl uppercase leading-tight mb-5 ${dark ? "text-[#1A1A1A]" : "text-white"}`}>
      {children}
    </h2>
  );
}

function BodyText({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`font-sans font-normal text-sm leading-relaxed mb-3 ${dark ? "text-[#444444]" : "text-white/70"}`}>
      {children}
    </p>
  );
}

// ─── Route map SVG ───────────────────────────────────────────────────────────

function RouteMap() {
  return (
    <svg
      viewBox="0 0 360 300"
      className="w-full h-full"
      aria-label="Mapa trasy Holešovice – Karlín – Žižkov"
    >
      {/* Dark background */}
      <rect width="360" height="300" fill="#111111" />

      {/* Faint grid lines */}
      {[40, 80, 120, 160, 200, 240, 280].map((y) => (
        <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#222" strokeWidth="1" />
      ))}
      {[60, 120, 180, 240, 300].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="#222" strokeWidth="1" />
      ))}

      {/* Route line */}
      <polyline
        points="180,60 130,150 180,240"
        fill="none"
        stroke="#F5C400"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Node: Holešovice (top) */}
      <circle cx="180" cy="60" r="8" fill="#F5C400" />
      <circle cx="180" cy="60" r="14" fill="none" stroke="#F5C400" strokeWidth="1" strokeOpacity="0.3" />
      <text x="200" y="65" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">HOLEŠOVICE</text>

      {/* Node: Karlín (mid) */}
      <circle cx="130" cy="150" r="8" fill="#F5C400" />
      <circle cx="130" cy="150" r="14" fill="none" stroke="#F5C400" strokeWidth="1" strokeOpacity="0.3" />
      <text x="150" y="155" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">KARLÍN</text>

      {/* Node: Žižkov (bottom) */}
      <circle cx="180" cy="240" r="8" fill="#F5C400" />
      <circle cx="180" cy="240" r="14" fill="none" stroke="#F5C400" strokeWidth="1" strokeOpacity="0.3" />
      <text x="200" y="245" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">ŽIŽKOV</text>
    </svg>
  );
}

// ─── Feature icons ────────────────────────────────────────────────────────────

function IconCurator() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="14" cy="14" r="8" />
      <line x1="20" y1="20" x2="27" y2="27" />
      <line x1="11" y1="14" x2="17" y2="14" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4C12.13 4 9 7.13 9 11c0 5.25 7 17 7 17s7-11.75 7-17c0-3.87-3.13-7-7-7z" />
      <circle cx="16" cy="11" r="2.5" />
    </svg>
  );
}

function IconArch() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 26 L6 14 Q16 4 26 14 L26 26" />
      <line x1="4" y1="26" x2="28" y2="26" />
      <line x1="12" y1="26" x2="12" y2="18" />
      <line x1="20" y1="26" x2="20" y2="18" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4L6 8v8c0 5.5 4.4 10.7 10 12 5.6-1.3 10-6.5 10-12V8L16 4z" />
      <polyline points="12 16 15 19 21 13" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="3" />
      <circle cx="20" cy="9" r="3" />
      <path d="M5 26c0-4 3.1-7 7-7h8c3.9 0 7 3 7 7" />
      <line x1="16" y1="19" x2="16" y2="26" />
    </svg>
  );
}

function IconArchi() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="20" width="24" height="6" />
      <path d="M8 20 L16 8 L24 20" />
      <line x1="16" y1="8" x2="16" y2="4" />
    </svg>
  );
}

function IconPublic() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="16" cy="16" r="11" />
      <path d="M5 16 Q10 10 16 16 Q22 22 27 16" />
      <line x1="16" y1="5" x2="16" y2="27" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="16,4 19.5,13 29,13 21.5,18.5 24.5,28 16,22.5 7.5,28 10.5,18.5 3,13 12.5,13" />
    </svg>
  );
}

const FEATURE_ICONS = [<IconCurator key="0" />, <IconPin key="1" />, <IconArch key="2" />, <IconShield key="3" />, <IconPeople key="4" />];
const WHY_ICONS = [<IconArchi key="0" />, <IconPublic key="1" />, <IconStar key="2" />];

// ─── Main component ───────────────────────────────────────────────────────────

export function AboutSectionV2() {
  const t = useTranslations("sections.about");

  const visionItems = [t("vision.item0"), t("vision.item1"), t("vision.item2")];
  const features    = [t("how.feature0"), t("how.feature1"), t("how.feature2"), t("how.feature3"), t("how.feature4")];
  const whyItems    = [t("why.item0"), t("why.item1"), t("why.item2")];
  const whyDescs    = [t("why.desc0"), t("why.desc1"), t("why.desc2")];

  return (
    <div id="about">

      {/* ── Block 1: Tunel jako galerie — light left / dark photo right ── */}
      <div className="flex flex-col lg:flex-row min-h-[420px]">
        <div className="w-full lg:w-1/2 bg-[#F5F5F0] px-10 md:px-14 py-16 flex flex-col justify-center">
          <Eyebrow>{t("intro.heading")}</Eyebrow>
          <SectionHeading dark>{t("title")}</SectionHeading>
          <BodyText dark>{t("intro.p1")}</BodyText>
          <BodyText dark>{t("intro.p2")}</BodyText>
        </div>
        <div className="w-full lg:w-1/2 relative min-h-[240px] lg:min-h-0">
          <img
            src="/img/tunnel-hero.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* ── Block 2: Vize — dark map left / light text right ── */}
      <div className="flex flex-col lg:flex-row min-h-[380px]">
        <div className="w-full lg:w-1/2 bg-[#1A1A1A] flex items-center justify-center p-8 min-h-[280px] lg:min-h-0">
          <RouteMap />
        </div>
        <div className="w-full lg:w-1/2 bg-[#F5F5F0] px-10 md:px-14 py-16 flex flex-col justify-center">
          <Eyebrow>{t("vision.label")}</Eyebrow>
          <SectionHeading dark>{t("vision.heading")}</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {visionItems.map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-2">
                <span className="w-8 h-8 rounded-full border border-[#F5C400]/50 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#F5C400]" />
                </span>
                <p className="font-sans font-normal text-xs text-[#444444] leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Block 3: Jak to bude fungovat — light left / vivid photo right ── */}
      <div className="flex flex-col lg:flex-row min-h-[380px]">
        <div className="w-full lg:w-1/2 bg-[#F5F5F0] px-10 md:px-14 py-16 flex flex-col justify-center">
          <Eyebrow>{t("how.label")}</Eyebrow>
          <SectionHeading dark>{t("how.heading")}</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-2">
            {features.map((feat, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                {FEATURE_ICONS[i]}
                <span className="font-sans font-normal text-[0.65rem] text-[#444444] leading-snug">{feat}</span>
              </div>
            ))}
          </div>
          <p className="font-sans font-normal text-xs text-[#888] italic mt-6">
            {t("how.note")}
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative min-h-[240px] lg:min-h-0">
          <img
            src="/img/gallery/5.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ── Block 4: Proč — light bg, two-col ── */}
      <div className="bg-[#F5F5F0] px-10 md:px-14 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow>{t("why.label")}</Eyebrow>
            <SectionHeading dark>{t("why.label")}</SectionHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {whyItems.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                {WHY_ICONS[i]}
                <p className="font-sans font-bold text-sm uppercase text-[#1A1A1A] tracking-wide leading-snug">
                  {item}
                </p>
                <p className="font-sans font-normal text-xs text-[#444444] leading-relaxed">
                  {whyDescs[i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
