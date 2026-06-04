import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");

  return (
    <div className="w-full h-14 flex items-center justify-center bg-bg border-b border-white/5 z-50 relative">
      <h1 className="font-display flex items-baseline gap-3 uppercase">
        <span className="text-base md:text-lg font-light tracking-[0.25em] text-text-muted">
          {t("prefix")}
        </span>
        <span className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-accent">
          {t("highlight")}
        </span>
      </h1>
    </div>
  );
}
