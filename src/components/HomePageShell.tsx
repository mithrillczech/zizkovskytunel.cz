"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { Navigation } from "@/components/Navigation/Navigation";
import { MobileNav } from "@/components/Navigation/MobileNav";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { SectionPanel } from "@/components/SectionPanel/SectionPanel";
import { AboutSection } from "@/components/Sections/AboutSection";
import { HistorySection } from "@/components/Sections/HistorySection";
import { GallerySection } from "@/components/Sections/GallerySection";
import { FindUsSection } from "@/components/Sections/FindUsSection";
import { MediaSection } from "@/components/Sections/MediaSection";
import { ContactSection } from "@/components/Sections/ContactSection";
import { Footer } from "@/components/Footer/Footer";
import type { GalleryImage, SectionId } from "@/types";

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
      case "about":   return <AboutSection />;
      case "history": return <HistorySection />;
      case "gallery": return <GallerySection variant="grid" images={galleryImages} />;
      case "findus":  return <FindUsSection />;
      case "media":   return <MediaSection />;
      case "contact": return <ContactSection />;
      default:        return null;
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

        <Footer onSectionChange={handleSectionChange} />
      </div>

      {/* ─── Mobile layout ─── */}
      <div className="lg:hidden">
        <MobileNav
          activeSection={section}
          onSectionChange={handleSectionChange}
        />

        <div className="relative w-full" style={{ height: "60vw", minHeight: "260px" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/img/tunnel-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
        </div>

        <main className="bg-bg pb-52">
          <section id="section-about" className="py-14 px-6 border-b border-white/5">
            <AboutSection />
          </section>
          <section id="section-history" className="py-14 px-6 border-b border-white/5">
            <HistorySection />
          </section>
          <section id="section-gallery" className="py-14 border-b border-white/5">
            <div className="px-6 mb-6">
              <GallerySection variant="carousel" images={galleryImages} />
            </div>
          </section>
          <section id="section-findus" className="py-14 px-6 border-b border-white/5">
            <FindUsSection />
          </section>
          <section id="section-media" className="py-14 px-6 border-b border-white/5">
            <MediaSection />
          </section>
          <section id="section-contact" className="py-14 px-6">
            <ContactSection />
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
