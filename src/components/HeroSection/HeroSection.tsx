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

    // Phase 1 — accelerating rush into the tunnel (3D perspective depth).
    // scale: [1, 1] snaps the ambient scale back to neutral at the very first frame
    // so every transition starts from the same visual baseline, regardless of where
    // the breathing cycle was paused. Using keyframes in a single call avoids the
    // timing/cancellation issue that a separate animate({ scale:1 }, { duration:0 })
    // would cause on Framer Motion's first animation of this element.
    const RUSH_DURATION = 0.41;
    const RUSH_EASE: [number, number, number, number] = [0.15, 0, 1, 1];

    if (vignette) {
      animate(vignette, { opacity: 1 }, { duration: RUSH_DURATION, ease: RUSH_EASE });
    }

    animate(
      el,
      { scale: [1, 1], z: [0, 460], filter: ["blur(0px)", "blur(20px)"] },
      { duration: RUSH_DURATION, ease: RUSH_EASE }
    )
    .then(() => {
      // Hard cut — instant return to origin depth, clear peripheral vignette.
      // Also reset scale so the darkness reveal always shows the image at 1:1 scale.
      animate(el, { z: 0, filter: "blur(0px)", scale: 1 }, { duration: 0 });
      if (vignette) animate(vignette, { opacity: 0 }, { duration: 0 });

      if (!overlay) {
        onTransitionMidpoint();
        startAmbient();
        return;
      }

      // Phase 2 — darkness collapses from edges toward center via CSS transition.
      // FM's imperative animate() batches the duration:0 reset and the subsequent
      // timed animation into the same frame, so FM reads circle(0%) as the start
      // point and the animation is invisible. Using direct DOM + void reflow +
      // CSS transition guarantees the browser commits circle(150%) before animating.
      // Commit the "full black" state in this tick, then start the collapse in the
      // next animation frame. This avoids the synchronous layout forced by
      // void offsetHeight (which caused a visible frozen-black pause) while still
      // ensuring the browser sees circle(150%) as the transition's from-value.
      overlay.style.transition = "none";
      overlay.style.opacity = "1";
      overlay.style.clipPath = "circle(150% at 50% 50%)";
      overlay.style.filter = "blur(20px)";

      requestAnimationFrame(() => {
        overlay.style.transition = "clip-path 1.4s cubic-bezier(0.4, 0, 0.6, 1)";
        overlay.style.clipPath = "circle(0% at 50% 50%)";

        const done = () => {
          overlay.removeEventListener("transitionend", done);
          overlay.style.transition = "none";
          overlay.style.opacity = "0";
          overlay.style.filter = "blur(0px)";
          // Re-sync FM's internal cache so the next transition's reset is correct.
          animate(overlay, { opacity: 0, clipPath: "circle(0% at 50% 50%)", filter: "blur(0px)" }, { duration: 0 });
          // Content box appears only after the full darkness reveal is complete
          onTransitionMidpoint();
          // Resume ambient pulsing now that the transition is fully done
          startAmbient();
        };
        overlay.addEventListener("transitionend", done);
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
