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
  const vignetteRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const ambientRef = useRef<ReturnType<typeof animate> | null>(null);

  // Idle ambient breathing — runs always (idle + while section is shown)
  // Started on mount; stopped during transitions and restarted after them
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

  // Tunnel transition on section change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const el = imgRef.current;
    const vignette = vignetteRef.current;
    const overlay = overlayRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTimeout(() => { onTransitionMidpoint(); startAmbient(); }, 0);
      return;
    }

    ambientRef.current?.stop();
    ambientRef.current = null;

    // Phase 1 — accelerating rush into the tunnel (3D perspective depth)
    // Peripheral vignette darkens simultaneously to sell the speed sensation
    const RUSH_DURATION = 0.41;
    const RUSH_EASE: [number, number, number, number] = [0.15, 0, 1, 1];

    if (vignette) {
      animate(vignette, { opacity: 1 }, { duration: RUSH_DURATION, ease: RUSH_EASE });
    }

    animate(el, { z: 460, filter: "blur(20px)" }, { duration: RUSH_DURATION, ease: RUSH_EASE })
    .then(() => {
      // Hard cut — instant return to origin depth, clear peripheral vignette
      animate(el, { z: 0, filter: "blur(0px)" }, { duration: 0 });
      if (vignette) animate(vignette, { opacity: 0 }, { duration: 0 });

      if (!overlay) {
        onTransitionMidpoint();
        startAmbient();
        return;
      }

      // Reset overlay through Framer Motion so its internal cache is always in sync.
      // Direct .style assignments are invisible to FM and cause it to skip subsequent
      // animations (it sees no change from its cached value).
      animate(overlay, { opacity: 1, clipPath: "circle(150% at 50% 50%)", filter: "blur(50px)" }, { duration: 0 });

      // Phase 2 — darkness collapses from edges toward the center
      // (outer image edges revealed first, like tunnel lights turning on as you pass)
      animate(
        overlay,
        { clipPath: "circle(0% at 50% 50%)" },
        { duration: 0.9, ease: [0, 0, 0.4, 1] }
      ).then(() => {
        animate(overlay, { opacity: 0, filter: "blur(0px)" }, { duration: 0 });
        // Content box appears only after the full darkness reveal is complete
        onTransitionMidpoint();
        // Resume ambient pulsing now that the transition is fully done
        startAmbient();
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "500px" }} aria-hidden="true">
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
      {/* Permanent dark vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg/80" />
      {/* Peripheral speed vignette — edges darken during Phase 1 zoom */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      {/* Tunnel reveal overlay — black circle that collapses from edges to center */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
      />
      {children}
    </div>
  );
}
