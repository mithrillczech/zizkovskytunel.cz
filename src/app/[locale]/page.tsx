import { HomePageShell } from "@/components/HomePageShell";
import { getGalleryImages } from "@/lib/gallery";

export default function Page() {
  const galleryImages = getGalleryImages();
  return <HomePageShell galleryImages={galleryImages} />;
}
