"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import type { GalleryImage } from "@/types";

const PLACEHOLDER_IMAGES: GalleryImage[] = [
  { src: "/img/gallery-1.jpg", alt: "Žižkovský tunel — pohled 1" },
  { src: "/img/gallery-2.jpg", alt: "Žižkovský tunel — pohled 2" },
  { src: "/img/gallery-3.jpg", alt: "Žižkovský tunel — pohled 3" },
  { src: "/img/gallery-4.jpg", alt: "Žižkovský tunel — pohled 4" },
  { src: "/img/gallery-5.jpg", alt: "Žižkovský tunel — pohled 5" },
];

interface GallerySectionProps {
  images?: GalleryImage[];
  /** mobile = carousel, desktop = grid */
  variant?: "carousel" | "grid";
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

// ─── Shared thumbnail strip ───────────────────────────────────────────────────

function ThumbnailStrip({
  images,
  current,
  onSelect,
}: {
  images: GalleryImage[];
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2" style={{ scrollbarWidth: "none" }}>
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`
            relative flex-shrink-0 h-14 transition-all duration-150 overflow-hidden
            ${i === current
              ? "ring-1 ring-accent opacity-100"
              : "opacity-50 hover:opacity-80"
            }
          `}
          style={{ aspectRatio: "4/3" }}
          aria-label={img.alt}
          aria-current={i === current ? "true" : undefined}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="80px"
          />
        </button>
      ))}
    </div>
  );
}

// ─── Mobile carousel ──────────────────────────────────────────────────────────

function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);
  const t = useTranslations("accessibility");

  if (images.length === 0) return null;

  function goTo(index: number) {
    const next = (index + images.length) % images.length;
    setCurrent(next);
    animate(x, 0, { duration: 0 });
  }

  return (
    <div className="w-full">
      {/* Main image + arrows */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.velocity.x < -200 || info.offset.x < -50) goTo(current + 1);
            else if (info.velocity.x > 200 || info.offset.x > 50) goTo(current - 1);
          }}
          style={{ x }}
        >
          <div className="relative w-full h-full flex-shrink-0">
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
            />
          </div>
        </motion.div>

        {/* Arrow buttons */}
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
          aria-label={t("prevImage")}
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
          aria-label={t("nextImage")}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Thumbnail strip replaces dot indicators */}
      <ThumbnailStrip images={images} current={current} onSelect={goTo} />
    </div>
  );
}

// ─── Desktop grid + lightbox ──────────────────────────────────────────────────

function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const t = useTranslations("accessibility");

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-accent"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1280px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/40 transition-colors duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
              <span className="font-sans text-xs text-text-primary tracking-wide border-b border-accent pb-0.5">
                {img.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-bg/95 flex flex-col items-center justify-center p-4 pb-24"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Main image */}
          <div className="relative max-w-4xl w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Prev / next arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white hover:text-accent"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) - 1 + images.length) % images.length); }}
            aria-label={t("prevImage")}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white hover:text-accent"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) + 1) % images.length); }}
            aria-label={t("nextImage")}
          >
            <ChevronRight />
          </button>

          {/* Thumbnail strip */}
          <div
            className="absolute bottom-4 left-4 right-4 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl w-full">
              <ThumbnailStrip
                images={images}
                current={lightbox}
                onSelect={(i) => setLightbox(i)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

export function GallerySection({ images = PLACEHOLDER_IMAGES, variant = "grid" }: GallerySectionProps) {
  const t = useTranslations("sections.gallery");

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-6">
        <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary">
          {t("title")}
        </h2>
        <p className="text-text-muted text-sm mt-2 font-sans tracking-wide">
          {t("subtitle")}
        </p>
      </div>

      {variant === "carousel" ? (
        <GalleryCarousel images={images} />
      ) : (
        <GalleryGrid images={images} />
      )}
    </div>
  );
}
