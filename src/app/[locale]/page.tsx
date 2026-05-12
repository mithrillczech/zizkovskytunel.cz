"use client";

import { useState, useCallback, useRef } from "react";
import { Header } from "@/components/Header/Header";
import { Navigation } from "@/components/Navigation/Navigation";
import { MobileNav } from "@/components/Navigation/MobileNav";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { SectionPanel } from "@/components/SectionPanel/SectionPanel";
import { AboutSection } from "@/components/Sections/AboutSection";
import { HistorySection } from "@/components/Sections/HistorySection";
import { GallerySection } from "@/components/Sections/GallerySection";
import { FindUsSection } from "@/components/Sections/FindUsSection";
import { ContactSection } from "@/components/Sections/ContactSection";
import { Footer } from "@/components/Footer/Footer";
import type { SectionId } from "@/types";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("none");
  // visibleSection is what's actually rendered in the panel — updated at animation midpoint
  const [visibleSection, setVisibleSection] = useState<SectionId>("none");
  const pendingSection = useRef<SectionId>("none");

  const handleSectionChange = useCallback((section: SectionId) => {
    pendingSection.current = section;
    setActiveSection(section);
  }, []);

  const handleTransitionMidpoint = useCallback(() => {
    setVisibleSection(pendingSection.current);
  }, []);

  function renderSection() {
    switch (visibleSection) {
      case "about":
        return <AboutSection />;
      case "history":
        return <HistorySection />;
      case "gallery":
        return <GallerySection variant="grid" />;
      case "findus":
        return <FindUsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  }

  return (
    <>
      {/* ─── Desktop layout ─── */}
      <div className="hidden lg:block">
        {/* Fixed chrome (header + nav) sits above everything */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>

        {/* Hero fills the viewport; section panel floats over it */}
        <HeroSection
          activeSection={activeSection}
          onTransitionMidpoint={handleTransitionMidpoint}
        >
          <SectionPanel visibleSection={visibleSection}>
            {renderSection()}
          </SectionPanel>
        </HeroSection>

        {/* Spacer so footer appears below the viewport */}
        <div className="h-screen" aria-hidden="true" />

        {/* Footer */}
        <Footer onSectionChange={handleSectionChange} />
      </div>

      {/* ─── Mobile layout ─── */}
      <div className="lg:hidden">
        <MobileNav
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        {/* Hero banner */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-bg/50 to-bg/80" aria-hidden="true" />
          <div className="absolute bottom-8 left-6 right-6">
            <p className="font-display text-3xl font-light text-text-primary tracking-wide">
              Žižkovský tunel
            </p>
          </div>
        </div>

        {/* Scrollable sections */}
        <main className="bg-bg">
          <section id="section-about" className="py-14 px-6 border-b border-white/5">
            <AboutSection />
          </section>

          <section id="section-history" className="py-14 px-6 border-b border-white/5">
            <HistorySection />
          </section>

          <section id="section-gallery" className="py-14 border-b border-white/5">
            <div className="px-6 mb-6">
              <GallerySection variant="carousel" />
            </div>
          </section>

          <section id="section-findus" className="py-14 px-6 border-b border-white/5">
            <FindUsSection />
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
