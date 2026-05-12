"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("accessibility");

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      // Replace the locale segment in the current path
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.replace(segments.join("/"));
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-xs font-sans tracking-widest uppercase"
      aria-label={t("languageSwitcher")}
    >
      <button
        onClick={() => switchLocale("cs")}
        disabled={isPending}
        className={`px-1 py-0.5 transition-colors duration-150 ${
          locale === "cs"
            ? "text-accent border-b border-accent"
            : "text-text-muted hover:text-text-primary"
        }`}
      >
        CS
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`px-1 py-0.5 transition-colors duration-150 ${
          locale === "en"
            ? "text-accent border-b border-accent"
            : "text-text-muted hover:text-text-primary"
        }`}
      >
        EN
      </button>
    </div>
  );
}
