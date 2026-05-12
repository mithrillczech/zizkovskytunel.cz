import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");

  return (
    <div className="w-full h-14 flex items-center justify-center bg-bg border-b border-white/5 z-50 relative">
      <h1 className="font-display text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-text-primary">
        {t("title")}
      </h1>
    </div>
  );
}
