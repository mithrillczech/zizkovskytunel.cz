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
  const imgRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const ambientRef = useRef<ReturnType<typeof animate> | null>(null);

  // Idle ambient breathing — only when no section is active
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = imgRef.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (activeSection === "none") {
      ambientRef.current = animate(
        el,
        { scale: [1, 1.04, 1] },
        { duration: 8, ease: "easeInOut", repeat: Infinity }
      );
    } else {
      ambientRef.current?.stop();
      ambientRef.current = null;
    }

    return () => {
      ambientRef.current?.stop();
    };
  }, [activeSection]);

  // Tunnel transition on section change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const el = imgRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Skip animation, just call midpoint immediately
      setTimeout(onTransitionMidpoint, 0);
      return;
    }

    ambientRef.current?.stop();
    ambientRef.current = null;

    // Phase 1: rush in
    animate(
      el,
      { scale: 1.25, filter: "blur(12px)" },
      { duration: 0.4, ease: [0.4, 0, 1, 1] }
    ).then(() => {
      // Midpoint — swap content
      onTransitionMidpoint();

      // Phase 2: emerge
      animate(
        el,
        { scale: 1, filter: "blur(0px)" },
        { duration: 0.5, ease: [0, 0, 0.2, 1] }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* The tunnel image */}
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
      {/* Dark vignette overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg/80" />
      {children}
    </div>
  );
}
