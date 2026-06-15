import { HomePageShell } from "@/components/HomePageShell";
import { getGalleryImages } from "@/lib/gallery";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params: _ }: PageProps) {
  const galleryImages = getGalleryImages();
  return <HomePageShell galleryImages={galleryImages} />;
}
