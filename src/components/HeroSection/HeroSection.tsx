"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface HeroSectionProps {
  flickerKey?: number;
  children?: React.ReactNode;
}

export function HeroSection({ children }: HeroSectionProps) {
  const imgRef     = useRef<HTMLDivElement>(null);
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
      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-bg to-transparent" />
      {children}
    </div>
  );
}
