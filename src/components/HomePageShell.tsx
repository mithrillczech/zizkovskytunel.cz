"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { Navigation } from "@/components/Navigation/Navigation";
import { MobileNav } from "@/components/Navigation/MobileNav";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { HeroOverlay } from "@/components/HeroSection/HeroOverlay";
import { SectionPanel } from "@/components/SectionPanel/SectionPanel";
import { AboutSection } from "@/components/Sections/AboutSection";
import { GallerySection } from "@/components/Sections/GallerySection";
import { FoundersSection } from "@/components/Sections/FoundersSection";
import { FindUsSection } from "@/components/Sections/FindUsSection";
import { Footer } from "@/components/Footer/Footer";
import type { GalleryImage, SectionId } from "@/types";

import { useTranslations } from "next-intl";

function MobileHeroText() {
  const t = useTranslations("hero");
  return (
    <div className="w-full h-full flex flex-col justify-end pb-5 px-5">
      <div className="bg-black/25 backdrop-blur-[2px] border border-white/6 px-5 py-4 text-center flex flex-col gap-2">
        <p className="font-display text-sm font-light tracking-[0.12em] uppercase text-text-primary/75">
          {t("subtitle")}
        </p>
        <p className="font-display text-sm font-light text-text-primary/65 leading-relaxed">
          {t("tagline")}
        </p>
      </div>
    </div>
  );
}

interface HomePageShellProps {
  galleryImages: GalleryImage[];
}

function HomePageInner({ galleryImages }: HomePageShellProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [section, setSection] = useState<SectionId>(
    (searchParams.get("section") ?? "none") as SectionId
  );
  const handleSectionChange = useCallback(
    (next: SectionId) => {
      setSection(next);

      const params = new URLSearchParams(searchParams.toString());
      if (next === "none") {
        params.delete("section");
      } else {
        params.set("section", next);
      }
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  function renderSection() {
    switch (section) {
      case "about":    return <AboutSection />;
      case "gallery":  return <GallerySection variant="grid" images={galleryImages} />;
      case "founders": return <FoundersSection />;
      case "findus":   return <FindUsSection />;
      default:         return null;
    }
  }

  return (
    <>
      {/* ─────────────────────── Desktop layout ─────────────────────── */}
      <div className="hidden lg:block">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
          <Navigation
            activeSection={section}
            onSectionChange={handleSectionChange}
          />
        </div>

        <HeroSection>
          <SectionPanel section={section}>
            {renderSection()}
          </SectionPanel>
        </HeroSection>

        <HeroOverlay section={section} />

        <Footer onSectionChange={handleSectionChange} />
      </div>

      {/* ─── Mobile layout ─── */}
      <div className="lg:hidden">
        <MobileNav
          activeSection={section}
          onSectionChange={handleSectionChange}
        />

        <div className="relative w-full" style={{ height: "70vw", minHeight: "300px" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/img/tunnel-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-bg/40" aria-hidden="true" />
          {/* Hero text */}
          <div className="absolute inset-0">
            <MobileHeroText />
          </div>
          {/* Bottom fade to background */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />
        </div>

        <main className="bg-bg pb-28">
          <section id="section-about" className="py-7 px-6 border-b border-white/5">
            <AboutSection />
          </section>
          <section id="section-gallery" className="py-7 border-b border-white/5">
            <div className="px-6 mb-3">
              <GallerySection variant="carousel" images={galleryImages} />
            </div>
          </section>
          <section id="section-founders" className="py-7 px-6 border-b border-white/5">
            <FoundersSection />
          </section>
          <section id="section-findus" className="py-7 px-6">
            <FindUsSection />
          </section>
        </main>

        <Footer onSectionChange={handleSectionChange} />
      </div>
    </>
  );
}

export function HomePageShell({ galleryImages }: HomePageShellProps) {
  return (
    <Suspense>
      <HomePageInner galleryImages={galleryImages} />
    </Suspense>
  );
}
