"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types";

interface GalleryStripProps {
  images: GalleryImage[];
}

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors z-10"
        aria-label="Zavřít"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Předchozí"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 10 16 20 26" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16"
        style={{ aspectRatio: "16/9" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Další"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="12 6 22 16 12 26" />
        </svg>
      </button>

      {/* Counter */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-xs text-white/40 tracking-widest">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

export function GalleryStrip({ images }: GalleryStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Double the images for seamless infinite loop
  const doubled = [...images, ...images];

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 4000);
  }, []);

  function manualScroll(dir: "left" | "right") {
    pauseTemporarily();
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  }

  // Reset scroll position mid-way through to create the illusion of infinite scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // start at the beginning of the second set
    const singleWidth = track.scrollWidth / 2;
    track.scrollLeft = 0;

    let animFrame: number;
    let lastTime: number | null = null;
    const SPEED = 40; // px per second

    function step(ts: number) {
      if (lastTime === null) lastTime = ts;
      const delta = ts - lastTime;
      lastTime = ts;

      if (!paused && track) {
        track.scrollLeft += (SPEED * delta) / 1000;
        // When we've scrolled through the first copy, jump back silently
        if (track.scrollLeft >= singleWidth) {
          track.scrollLeft -= singleWidth;
        }
      }
      animFrame = requestAnimationFrame(step);
    }

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [paused]);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const nextImage = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % images.length : null), [images.length]);

  return (
    <section id="gallery" className="bg-black py-16">
      {/* Section label */}
      <div className="px-6 md:px-14 lg:px-20 mb-8">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent">
          Galerie
        </p>
      </div>

      {/* Strip wrapper */}
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => manualScroll("left")}
          className="
            absolute left-3 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 flex items-center justify-center
            bg-black/60 text-white/60 hover:text-white hover:bg-black/80
            transition-all duration-150
            opacity-0 group-hover:opacity-100
          "
          aria-label="Předchozí"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="12 3 6 9 12 15" />
          </svg>
        </button>

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-hidden cursor-pointer select-none"
          style={{ scrollbarWidth: "none" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {doubled.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="shrink-0 relative overflow-hidden"
              style={{ width: "280px", height: "190px" }}
              onClick={() => {
                setLightbox(i % images.length);
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="280px"
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => manualScroll("right")}
          className="
            absolute right-3 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 flex items-center justify-center
            bg-black/60 text-white/60 hover:text-white hover:bg-black/80
            transition-all duration-150
            opacity-0 group-hover:opacity-100
          "
          aria-label="Další"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 3 12 9 6 15" />
          </svg>
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={images}
          index={lightbox}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
