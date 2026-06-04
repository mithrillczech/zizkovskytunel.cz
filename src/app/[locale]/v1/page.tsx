import { HomePageShell } from "@/components/HomePageShell";
import { getGalleryImages } from "@/lib/gallery";

export default function V1Page() {
  const galleryImages = getGalleryImages();
  return <HomePageShell galleryImages={galleryImages} />;
}
