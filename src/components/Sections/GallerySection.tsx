"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import type { GalleryImage } from "@/types";

const PLACEHOLDER_IMAGES: GalleryImage[] = [
  { src: "/img/gallery-1.jpg", alt: "Žižkovský tunel — pohled 1", width: 1200, height: 900 },
  { src: "/img/gallery-2.jpg", alt: "Žižkovský tunel — pohled 2", width: 1200, height: 900 },
  { src: "/img/gallery-3.jpg", alt: "Žižkovský tunel — pohled 3", width: 1200, height: 900 },
  { src: "/img/gallery-4.jpg", alt: "Žižkovský tunel — pohled 4", width: 1200, height: 900 },
  { src: "/img/gallery-5.jpg", alt: "Žižkovský tunel — pohled 5", width: 1200, height: 900 },
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

function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);
  const t = useTranslations("accessibility");

  function goTo(index: number) {
    const next = (index + images.length) % images.length;
    setCurrent(next);
    animate(x, 0, { duration: 0 });
  }

  return (
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

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === current ? "bg-accent w-4" : "bg-white/40"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const t = useTranslations("accessibility");

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
          className="fixed inset-0 z-50 bg-bg/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="relative max-w-4xl w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
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
        </div>
      )}
    </>
  );
}

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
