import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const CSP = [
  "default-src 'self'",
  // Next.js inline scripts required for hydration
  "script-src 'self' 'unsafe-inline'",
  // Tailwind/Framer Motion inline styles + Google Fonts stylesheet
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Google Fonts webfont files
  "font-src 'self' https://fonts.gstatic.com",
  // Local images, data URIs, and remote images (gallery, og, etc.)
  "img-src 'self' data: https:",
  // Google Maps iframe used in v2 FindUsSection
  "frame-src https://www.google.com",
  // API calls go to same origin only
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy",    value: CSP },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
