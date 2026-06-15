import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zizkovtunnel.cz";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const altLocale = locale === "cs" ? "en" : "cs";
  const ogImage = `${SITE_URL}/img/hero-og.jpg`;

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords"),

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        cs: `${SITE_URL}/cs`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/cs`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("siteName"),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: altLocale === "cs" ? "cs_CZ" : "en_US",
      type: "website",
      url: `${SITE_URL}/${locale}`,
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },

    icons: {
      icon: [
        { url: "/brand/favicon.svg", type: "image/svg+xml" },
        { url: "/brand/favicon-placeholder.svg", type: "image/svg+xml" },
      ],
      apple: "/brand/apple-touch-icon.png",
    },

    other: {
      "geo.region": "CZ-PR",
      "geo.placename": "Praha",
      "geo.position": "50.0877;14.4531",
      ICBM: "50.0877, 14.4531",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spolek žižkovského tunelu",
    alternateName: "Žižkov Tunnel Association",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/favicon-placeholder.svg`,
    description:
      locale === "cs"
        ? "Nezávislá iniciativa proměňující Žižkovský tunel v kurátorsky vedenou galerii současného umění."
        : "An independent initiative transforming the Žižkov Tunnel into a curated gallery of contemporary art.",
    email: "info@zizkovskytunel.cz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pod dráhou 1638/7",
      addressLocality: "Praha 7 — Holešovice",
      postalCode: "170 00",
      addressCountry: "CZ",
    },
    foundingDate: "2025",
    areaServed: {
      "@type": "City",
      name: "Praha",
    },
    sameAs: [],
  };

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/img/tunnel-hero.jpg" />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, value is server-generated
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
