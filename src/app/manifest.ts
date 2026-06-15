import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spolek žižkovského tunelu",
    short_name: "TUNEL!",
    description:
      "Proměňujeme Žižkovský tunel v kurátorsky vedenou galerii současného umění.",
    start_url: "/cs",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    lang: "cs",
    icons: [
      {
        src: "/brand/favicon-placeholder.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
