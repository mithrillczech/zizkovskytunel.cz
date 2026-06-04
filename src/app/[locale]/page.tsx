import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SelectorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row bg-black overflow-hidden">

      {/* ── Side A ── */}
      <Link
        href={`/${locale}/v1`}
        className="
          group relative flex-1 flex flex-col items-center justify-center
          border-b md:border-b-0 md:border-r border-white/10
          overflow-hidden
          transition-all duration-500
          hover:flex-[1.4]
        "
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-35 transition-opacity duration-500 scale-105 group-hover:scale-100"
          style={{ backgroundImage: "url('/img/tunnel-hero.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center text-center px-8 gap-5">
          <span className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-white/35 group-hover:text-white/60 transition-colors duration-300">
            Verze A
          </span>
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-white tracking-tight uppercase">
            TUNEL!
          </h2>
          <p className="font-sans font-light text-xs tracking-[0.2em] uppercase text-white/45 group-hover:text-white/70 transition-colors duration-300 max-w-[200px]">
            Původní design
          </p>
          <span className="
            mt-4 font-sans text-[0.6rem] tracking-[0.25em] uppercase
            px-6 py-2.5 border border-white/20 text-white/50
            group-hover:border-white/60 group-hover:text-white
            transition-all duration-300
          ">
            Otevřít →
          </span>
        </div>
      </Link>

      {/* ── Divider label ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/15" />
          <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/20 bg-black px-2 py-1">VS</span>
          <div className="w-px h-12 bg-white/15" />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <div className="h-px w-12 bg-white/15" />
          <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/20 bg-black px-2 py-1">VS</span>
          <div className="h-px w-12 bg-white/15" />
        </div>
      </div>

      {/* ── Side B ── */}
      <Link
        href={`/${locale}/v2`}
        className="
          group relative flex-1 flex flex-col items-center justify-center
          overflow-hidden
          transition-all duration-500
          hover:flex-[1.4]
        "
      >
        {/* Background — different gallery image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-35 transition-opacity duration-500 scale-105 group-hover:scale-100"
          style={{ backgroundImage: "url('/img/gallery/1.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center text-center px-8 gap-5">
          <span className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-white/35 group-hover:text-white/60 transition-colors duration-300">
            Verze B
          </span>
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-accent tracking-tight uppercase">
            TUNEL!
          </h2>
          <p className="font-sans font-light text-xs tracking-[0.2em] uppercase text-white/45 group-hover:text-white/70 transition-colors duration-300 max-w-[200px]">
            Nový design
          </p>
          <span className="
            mt-4 font-sans text-[0.6rem] tracking-[0.25em] uppercase
            px-6 py-2.5 border border-accent/30 text-accent/60
            group-hover:border-accent group-hover:text-accent
            transition-all duration-300
          ">
            Otevřít →
          </span>
        </div>
      </Link>

    </div>
  );
}
