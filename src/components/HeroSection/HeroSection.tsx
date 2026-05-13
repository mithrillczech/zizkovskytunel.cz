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
  const overlayRef = useRef<HTMLDivElement>(null);
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

    const overlay = overlayRef.current;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTimeout(() => { onTransitionMidpoint(); startAmbient(); }, 0);
      return;
    }

    ambientRef.current?.stop();
    ambientRef.current = null;

    if (!overlay) {
      onTransitionMidpoint();
      startAmbient();
      return;
    }

    // Darkness collapses from edges toward center.
    // Direct DOM + requestAnimationFrame ensures the browser commits
    // circle(150%) before the transition starts (FM batching would make it invisible).
    overlay.style.transition = "none";
    overlay.style.opacity    = "1";
    overlay.style.clipPath   = "circle(150% at 50% 50%)";
    overlay.style.filter     = "blur(250px)";

    requestAnimationFrame(() => {
      overlay.style.transition = "clip-path 1.4s cubic-bezier(0.4, 0, 0.6, 1)";
      overlay.style.clipPath   = "circle(0% at 50% 50%)";

      const done = () => {
        overlay.removeEventListener("transitionend", done);
        overlay.style.transition = "opacity 0.35s ease";
        overlay.style.opacity    = "0";
        setTimeout(() => {
          overlay.style.transition = "none";
          overlay.style.filter     = "blur(0px)";
          animate(overlay, { opacity: 0, clipPath: "circle(0% at 50% 50%)", filter: "blur(0px)" }, { duration: 0 });
          onTransitionMidpoint();
          startAmbient();
        }, 350);
      };
      overlay.addEventListener("transitionend", done);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Tunnel image — ambient breathing only, no zoom on navigation */}
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
      {/* Reveal overlay — black circle collapses from edges to center */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
      />
      {children}
    </div>
  );
}
