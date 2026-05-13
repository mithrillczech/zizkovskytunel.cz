import { useTranslations } from "next-intl";

const ACCENT = "#c8a96e";
const STREET = "#888880";
const BG = "#080808";

function TunnelMap() {
  return (
    <svg
      viewBox="0 0 400 520"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Schematic map of Žižkovský tunel and surroundings"
      role="img"
      style={{ display: "block", background: BG }}
    >
      {/* ── Tunnel label path (used for textPath) ── */}
      <defs>
        <path id="tlp" d="M 178 140 C 175 210, 180 280, 178 340" />
      </defs>

      {/* ── District labels ── */}
      <text x="370" y="85" fill={STREET} fontSize="9" fontFamily="sans-serif"
        opacity="0.45" textAnchor="end" letterSpacing="2">KARLÍN</text>
      <text x="370" y="455" fill={STREET} fontSize="9" fontFamily="sans-serif"
        opacity="0.45" textAnchor="end" letterSpacing="2">ŽIŽKOV</text>

      {/* ── Vítkov hill label ── */}
      <text x="200" y="258" fill={STREET} fontSize="12" fontFamily="sans-serif"
        opacity="0.3" textAnchor="middle" fontStyle="italic" letterSpacing="1">Vítkov</text>

      {/* ════════ KARLÍN streets (north/top) ════════ */}

      {/* Pobřežní — runs W toward the river */}
      <line x1="20" y1="72" x2="175" y2="82" stroke={STREET} strokeWidth="1.5" />
      <text x="17" y="71" fill={STREET} fontSize="9" fontFamily="sans-serif"
        textAnchor="start">Pobřežní</text>

      {/* Thámova — north portal is here */}
      <line x1="35" y1="112" x2="370" y2="112" stroke={STREET} strokeWidth="1.5" />
      <text x="372" y="115" fill={STREET} fontSize="9" fontFamily="sans-serif">Thámova</text>

      {/* Křižíkova */}
      <line x1="35" y1="168" x2="370" y2="168" stroke={STREET} strokeWidth="1.5" />
      <text x="372" y="171" fill={STREET} fontSize="9" fontFamily="sans-serif">Křižíkova</text>

      {/* Šaldova */}
      <line x1="75" y1="224" x2="370" y2="224" stroke={STREET} strokeWidth="1.5" />
      <text x="372" y="227" fill={STREET} fontSize="9" fontFamily="sans-serif">Šaldova</text>

      {/* Vertical connector Karlín (Chelčického) */}
      <line x1="290" y1="112" x2="290" y2="224" stroke={STREET} strokeWidth="1.5" />
      <line x1="220" y1="112" x2="220" y2="168" stroke={STREET} strokeWidth="1" opacity="0.5" />

      {/* ════════ ŽIŽKOV streets (south/bottom) ════════ */}

      {/* Husitská */}
      <line x1="20" y1="342" x2="310" y2="342" stroke={STREET} strokeWidth="1.5" />
      <text x="17" y="340" fill={STREET} fontSize="9" fontFamily="sans-serif"
        textAnchor="start">Husitská</text>

      {/* Seifertova — major street */}
      <line x1="20" y1="406" x2="370" y2="406" stroke={STREET} strokeWidth="2" />
      <text x="372" y="409" fill={STREET} fontSize="9" fontFamily="sans-serif">Seifertova</text>

      {/* Koněvova — diagonal NE from Tachovské nám. */}
      <line x1="186" y1="372" x2="340" y2="295" stroke={STREET} strokeWidth="1.5" />
      <text x="342" y="292" fill={STREET} fontSize="9" fontFamily="sans-serif">Koněvova</text>

      {/* Tachovská — SE from the square */}
      <line x1="186" y1="372" x2="295" y2="465" stroke={STREET} strokeWidth="1.5" />
      <text x="297" y="469" fill={STREET} fontSize="9" fontFamily="sans-serif">Tachovská</text>

      {/* Blanická / vertical connector Žižkov */}
      <line x1="290" y1="342" x2="290" y2="406" stroke={STREET} strokeWidth="1.5" />

      {/* Short connector from Husitská toward Tachovské nám. */}
      <line x1="186" y1="342" x2="186" y2="372" stroke={STREET} strokeWidth="1" opacity="0.5" />

      {/* ════════ Náměstí Winstona Churchilla (metro B) ════════ */}
      {/* Located on Seifertova, west of tunnel entrance */}
      <circle cx="95" cy="406" r="5" fill="none" stroke={STREET} strokeWidth="1.2" />
      {/* Metro B badge */}
      <circle cx="95" cy="393" r="8" fill="#f5c800" />
      <text x="95" y="397" fill="#000" fontSize="9" fontFamily="sans-serif"
        fontWeight="bold" textAnchor="middle">B</text>
      <text x="95" y="422" fill={STREET} fontSize="8" fontFamily="sans-serif"
        textAnchor="middle">nám. W. Churchilla</text>

      {/* ════════ TUNNEL ════════ */}

      {/* Dashed underground hint (slightly offset to the right) */}
      <path
        d="M 192 112 C 188 210, 193 290, 190 372"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="5 5"
        opacity="0.28"
      />

      {/* Main tunnel line */}
      <path
        d="M 186 112 C 182 210, 187 290, 185 372"
        fill="none"
        stroke={ACCENT}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tunnel name along path */}
      <text fill={ACCENT} fontSize="8.5" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.9">
        <textPath href="#tlp" startOffset="8%">ŽIŽKOVSKÝ TUNEL</textPath>
      </text>

      {/* North portal circle (Karlín / Thámova) */}
      <circle cx="186" cy="112" r="6" fill={ACCENT} />

      {/* South portal circle (Žižkov / Tachovské nám.) */}
      <circle cx="185" cy="372" r="6" fill={ACCENT} />

      {/* Portal labels */}
      <text x="197" y="109" fill={ACCENT} fontSize="8.5" fontFamily="sans-serif">
        Karlínský portál
      </text>
      <text x="197" y="386" fill={ACCENT} fontSize="8.5" fontFamily="sans-serif">
        Tachovské nám.
      </text>

      {/* ════════ North arrow ════════ */}
      <g transform="translate(358, 468)">
        <line x1="0" y1="18" x2="0" y2="2" stroke={STREET} strokeWidth="1.2" />
        <polygon points="0,0 -3.5,8 3.5,8" fill={STREET} />
        <text x="0" y="27" fill={STREET} fontSize="8" fontFamily="sans-serif"
          textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

export function FindUsSection() {
  const t = useTranslations("sections.findUs");

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-8">
        {t("title")}
      </h2>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Text directions */}
        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-accent mb-3">
              Adresa / Address
            </h3>
            <address className="not-italic font-display text-lg font-light text-text-primary leading-relaxed whitespace-pre-line">
              {t("address")}
            </address>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-accent mb-3">
              Doprava / Transport
            </h3>
            <p className="text-text-primary/85 text-sm leading-relaxed whitespace-pre-line">
              {t("directions")}
            </p>
          </div>

          <p className="text-text-muted text-xs font-sans border-l border-accent/40 pl-3">
            {t("mapNote")}
          </p>
        </div>

        {/* Schematic map */}
        <div
          className="rounded-sm overflow-hidden border border-white/8"
          style={{ aspectRatio: "3/4" }}
        >
          <TunnelMap />
        </div>
      </div>
    </div>
  );
}
