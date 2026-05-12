import fs from "fs";
import path from "path";
import type { GalleryImage } from "@/types";

const GALLERY_DIR = path.join(process.cwd(), "public", "img", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Server-only. Reads all images from public/img/gallery/ and returns
 * a sorted GalleryImage array. Alt text is derived from the filename.
 *
 * Drop any image into public/img/gallery/ and it will appear automatically
 * on next build or dev hot-reload — no code changes needed.
 */
export function getGalleryImages(): GalleryImage[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  return fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((filename) => ({
      src: `/img/gallery/${filename}`,
      alt: path
        .basename(filename, path.extname(filename))
        .replace(/[-_]/g, " "),
    }));
}
