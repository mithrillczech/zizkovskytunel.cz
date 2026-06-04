import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");

  return (
    <div className="w-full h-14 flex items-center justify-center bg-bg border-b border-white/5 z-50 relative">
      <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase text-accent">
        {t("highlight")}
      </h1>
    </div>
  );
}
