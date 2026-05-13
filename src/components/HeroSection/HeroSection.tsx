"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import type { SectionId } from "@/types";

interface HeroSectionProps {
  activeSection: SectionId;
  onTransitionMidpoint: () => void;
  children?: React.ReactNode;
}

// Shared background style reused across main image + ghost trail divs
const TUNNEL_BG: React.CSSProperties = {
  backgroundImage: "url('/img/tunnel-hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#1a1a1a",
};

export function HeroSection({
  activeSection,
  onTransitionMidpoint,
  children,
}: HeroSectionProps) {
  const imgRef    = useRef<HTMLDivElement>(null);
  const ghost1Ref = useRef<HTMLDivElement>(null); // motion trail — reaches 2.8× scale
  const ghost2Ref = useRef<HTMLDivElement>(null); // motion trail — reaches 5× scale
  const flashRef  = useRef<HTMLDivElement>(null); // overexposure glow at zoom peak
  const vignetteRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
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

    const el      = imgRef.current;
    const ghost1  = ghost1Ref.current;
    const ghost2  = ghost2Ref.current;
    const flash   = flashRef.current;
    const vignette = vignetteRef.current;
    const overlay  = overlayRef.current;
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

    // ── Phase 1 — light-speed rush ─────────────────────────────────────────
    // scale: [1, 1] on the main image snaps ambient scale to neutral so every
    // transition starts from the same visual baseline.
    const RUSH_DURATION = 0.41;
    const RUSH_EASE: [number, number, number, number] = [0.15, 0, 1, 1];

    // Peripheral edge darkening
    if (vignette) {
      animate(vignette, { opacity: 1 }, { duration: RUSH_DURATION, ease: RUSH_EASE });
    }

    // Ghost trail 1 — scales to 2.8× while fading out.
    // Represents the tunnel image "half a beat behind" the main zoom, creating
    // the first layer of radial smear (light-speed star-stretch approximation).
    if (ghost1) {
      animate(
        ghost1,
        { scale: [1, 2.8], filter: ["blur(0px)", "blur(12px)"], opacity: [0.55, 0] },
        { duration: RUSH_DURATION, ease: RUSH_EASE }
      );
    }

    // Ghost trail 2 — scales more aggressively to 5× with heavier blur.
    // Outer smear layer — represents the fastest "light streaks" at the edge.
    if (ghost2) {
      animate(
        ghost2,
        { scale: [1, 5], filter: ["blur(0px)", "blur(22px)"], opacity: [0.3, 0] },
        { duration: RUSH_DURATION, ease: RUSH_EASE }
      );
    }

    // Overexposure flash — radial white glow that peaks at the moment of jump
    if (flash) {
      animate(flash, { opacity: [0, 0.65] }, { duration: RUSH_DURATION, ease: RUSH_EASE });
    }

    // Main image — perspective z-zoom with blur
    animate(
      el,
      { scale: [1, 1], z: [0, 460], filter: ["blur(0px)", "blur(20px)"] },
      { duration: RUSH_DURATION, ease: RUSH_EASE }
    )
    .then(() => {
      // Hard cut — snap everything back to resting state
      animate(el,     { z: 0, filter: "blur(0px)", scale: 1 }, { duration: 0 });
      if (ghost1)  animate(ghost1,  { scale: 1, opacity: 0, filter: "blur(0px)" }, { duration: 0 });
      if (ghost2)  animate(ghost2,  { scale: 1, opacity: 0, filter: "blur(0px)" }, { duration: 0 });
      if (flash)   animate(flash,   { opacity: 0 }, { duration: 0 });
      if (vignette) animate(vignette, { opacity: 0 }, { duration: 0 });

      if (!overlay) {
        onTransitionMidpoint();
        startAmbient();
        return;
      }

      // ── Phase 2 — darkness reveals from edges toward center ────────────────
      // Uses direct DOM + requestAnimationFrame instead of FM's duration:0 +
      // timed animate (which are batched in the same frame and the reveal starts
      // from circle(0%) making it invisible).
      overlay.style.transition = "none";
      overlay.style.opacity    = "1";
      overlay.style.clipPath   = "circle(150% at 50% 50%)";
      overlay.style.filter     = "blur(250px)";

      requestAnimationFrame(() => {
        overlay.style.transition = "clip-path 1.4s cubic-bezier(0.4, 0, 0.6, 1)";
        overlay.style.clipPath   = "circle(0% at 50% 50%)";

        const done = () => {
          overlay.removeEventListener("transitionend", done);
          // Smooth fade-out — the large blur leaves a visible dark blob at
          // circle(0%) so an instant cut looks jarring
          overlay.style.transition = "opacity 0.35s ease";
          overlay.style.opacity    = "0";
          setTimeout(() => {
            overlay.style.transition = "none";
            overlay.style.filter     = "blur(0px)";
            // Re-sync FM's internal cache for the next transition's reset
            animate(overlay, { opacity: 0, clipPath: "circle(0% at 50% 50%)", filter: "blur(0px)" }, { duration: 0 });
            onTransitionMidpoint();
            startAmbient();
          }, 350);
        };
        overlay.addEventListener("transitionend", done);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "500px" }} aria-hidden="true">
      {/* Main tunnel image — perspective z-zoom during transition */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={TUNNEL_BG}
      />
      {/* Permanent dark vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg/80" />

      {/* Ghost trail 1 — scales 1→2.8× while fading, first smear layer */}
      <div
        ref={ghost1Ref}
        className="absolute inset-0 will-change-transform pointer-events-none"
        style={{ ...TUNNEL_BG, opacity: 0 }}
      />
      {/* Ghost trail 2 — scales 1→5× while fading, outer smear layer */}
      <div
        ref={ghost2Ref}
        className="absolute inset-0 will-change-transform pointer-events-none"
        style={{ ...TUNNEL_BG, opacity: 0 }}
      />
      {/* Overexposure flash — white radial glow at zoom peak */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)",
        }}
      />
      {/* Peripheral speed vignette — edges darken during Phase 1 zoom */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      {/* Tunnel reveal overlay — black circle collapses from edges to center */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
      />
      {children}
    </div>
  );
}
