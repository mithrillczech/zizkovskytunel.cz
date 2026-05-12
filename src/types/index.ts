export type Locale = "cs" | "en";

export type SectionId =
  | "none"
  | "about"
  | "history"
  | "gallery"
  | "findus"
  | "contact";

export interface NavItem {
  id: SectionId;
  labelKey: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Member {
  name: string;
  role: string;
}

export interface TimelineEntry {
  year: string;
  text: string;
}
