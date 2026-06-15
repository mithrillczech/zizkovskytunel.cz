import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zizkovtunnel.cz";
const LOCALES = ["cs", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepageEntries = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  }));

  return homepageEntries;
}
