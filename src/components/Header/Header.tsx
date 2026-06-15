import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");

  return (
    <div className="w-full h-14 flex items-center justify-center bg-black border-b border-white/5 z-50 relative">
      <h1 className="font-sans text-2xl md:text-3xl font-bold tracking-[0.12em] uppercase text-white">
        TUNEL<span className="text-accent">!</span>
      </h1>
    </div>
  );
}
