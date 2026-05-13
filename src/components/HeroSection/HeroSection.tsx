"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface HeroSectionProps {
  flickerKey?: number; // increments on each nav change to trigger the flicker
  children?: React.ReactNode;
}

// Matches the exit sequence in SectionPanel — full flicker cycle over ~0.9s
// (exit 0.45s + enter 0.45s) so the background and content die/revive together.
const FLICKER_BRIGHTNESS = [
  "brightness(1)",
  "brightness(2.2)",
  "brightness(0.3)",
  "brightness(1.6)",
  "brightness(0.15)",
  "brightness(0.9)",
  "brightness(0.05)",
  "brightness(0)",
  "brightness(2.8)",
  "brightness(0.25)",
  "brightness(1.6)",
  "brightness(0.55)",
  "brightness(1.2)",
  "brightness(1)",
];

export function HeroSection({ flickerKey, children }: HeroSectionProps) {
  const imgRef     = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<ReturnType<typeof animate> | null>(null);
  const isFirstFlicker = useRef(true);

  const startAmbient = () => {
    const el = imgRef.current;
    if (!el) return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ambientRef.current?.stop();
    ambientRef.current = animate(
      el,
      { scale: [1, 1.04, 1] },
      { duration: 8, ease: "easeInOut", repeat: Infinity }
    );
  };

  useEffect(() => {
    startAmbient();
    return () => { ambientRef.current?.stop(); };
  }, []);

  // Flicker the background image in sync with the SectionPanel flicker
  useEffect(() => {
    if (isFirstFlicker.current) {
      isFirstFlicker.current = false;
      return;
    }
    const el = imgRef.current;
    if (!el) return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ambientRef.current?.stop();
    ambientRef.current = null;

    animate(
      el,
      { filter: FLICKER_BRIGHTNESS },
      { duration: 0.9, ease: "linear" }
    ).then(() => {
      animate(el, { filter: "brightness(1)" }, { duration: 0 });
      startAmbient();
    });
  }, [flickerKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('/img/tunnel-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1a1a1a",
        }}
      />
      {/* Permanent dark vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg/80" />
      {children}
    </div>
  );
}
