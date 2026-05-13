"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import type { SectionId } from "@/types";

interface HeroSectionProps {
  activeSection: SectionId;
  onTransitionMidpoint: () => void;
  children?: React.ReactNode;
}

export function HeroSection({
  activeSection,
  onTransitionMidpoint,
  children,
}: HeroSectionProps) {
  const imgRef     = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const ambientRef = useRef<ReturnType<typeof animate> | null>(null);

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

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    onTransitionMidpoint();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Tunnel image — ambient breathing only */}
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
