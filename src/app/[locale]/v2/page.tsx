import { HomePageV2 } from "@/components/v2/HomePageV2";
import { getGalleryImages } from "@/lib/gallery";

export default function V2Page() {
  const galleryImages = getGalleryImages();
  return <HomePageV2 galleryImages={galleryImages} />;
}
