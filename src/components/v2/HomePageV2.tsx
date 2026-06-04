import { HeaderV2 } from "./HeaderV2";
import { HeroV2 } from "./HeroV2";
import { AboutSectionV2 } from "./AboutSectionV2";
import { GalleryStrip } from "./GalleryStrip";
import { FoundersSectionV2 } from "./FoundersSectionV2";
import { FindUsSectionV2 } from "./FindUsSectionV2";
import { FooterV2 } from "./FooterV2";
import type { GalleryImage } from "@/types";

interface HomePageV2Props {
  galleryImages: GalleryImage[];
}

export function HomePageV2({ galleryImages }: HomePageV2Props) {
  return (
    <div className="min-h-screen bg-black">
      <HeaderV2 />
      <main>
        <HeroV2 />
        <AboutSectionV2 />
        <GalleryStrip images={galleryImages} />
        <FoundersSectionV2 />
        <FindUsSectionV2 />
      </main>
      <FooterV2 />
    </div>
  );
}
