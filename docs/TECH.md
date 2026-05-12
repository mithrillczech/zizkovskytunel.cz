# Technical Architecture — Žižkov Tunnel Association Website

## Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.x | SSR/SSG, built-in i18n routing, Vercel-native |
| Language | TypeScript | 5.x strict | Type safety across components and CMS layer |
| Styling | Tailwind CSS | 4.x | Utility-first, design token integration |
| Animations | Framer Motion | 12.x | Tunnel blur/zoom effect, carousel drag, page transitions |
| i18n | next-intl | 3.x | Locale routing, typed message keys, middleware |
| CMS (future) | Supabase | — | Postgres-backed content + Storage for gallery images |
| Auth (future) | Supabase Auth + `@supabase/ssr` | — | Cookie-based SSR-compatible sessions for CMS editor |
| Contact | `mailto:` fallback → Supabase Edge Function / Resend | — | Isolated handler, swap without UI changes |
| Images | Next.js `<Image>` | — | Automatic optimization, lazy loading, AVIF/WebP |
| Map | Mapy.cz iframe | — | Czech-native map service, no API key needed |
| Deployment | Vercel | — | Zero-config Next.js, edge network, env var management |
| Package manager | pnpm | — | Fast installs, strict dependency graph |

---

## Project Structure

```
zizkovtunnel/
├── public/
│   ├── img/                        # Tunnel gallery images (JPG/WebP)
│   └── brand/
│       ├── logo-placeholder.svg    # Replace with real logo
│       └── favicon-placeholder.svg # Replace with real favicon
│
├── src/
│   ├── app/
│   │   └── [locale]/               # next-intl locale segment (cs | en)
│   │       ├── layout.tsx          # Root layout: fonts, metadata, providers
│   │       └── page.tsx            # Single-page shell: all sections rendered here
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.tsx          # Project name bar (top bar)
│   │   │   └── Logo.tsx            # Logo image with text fallback
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx      # Desktop nav bar
│   │   │   ├── MobileNav.tsx       # Hamburger + full-screen overlay
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── HeroSection/
│   │   │   └── HeroSection.tsx     # Fixed full-bleed tunnel image + animations
│   │   ├── SectionPanel/
│   │   │   └── SectionPanel.tsx    # Animated content panel overlaid on hero
│   │   ├── Sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── HistorySection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── FindUsSection.tsx   # Map embed + directions
│   │   │   └── ContactSection.tsx  # Contact form
│   │   └── Footer/
│   │       └── Footer.tsx
│   │
│   ├── i18n/
│   │   ├── cs.json                 # Czech strings (default locale)
│   │   ├── en.json                 # English strings
│   │   └── request.ts              # next-intl server-side request config
│   │
│   ├── lib/
│   │   ├── supabase.ts             # Typed Supabase client (server + browser)
│   │   └── contact.ts             # Contact form submission handler
│   │
│   ├── types/
│   │   └── index.ts                # Shared TypeScript types
│   │
│   └── middleware.ts               # next-intl locale routing middleware
│
├── docs/
│   ├── DESIGN.md                   # This design system document
│   └── TECH.md                     # This technical architecture document
│
├── .env.local.example              # Required environment variables (template)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Navigation Architecture — Section-Switcher

The website uses a **single-URL section-switcher** model. There is no client-side routing
between content sections. The hero image is a permanent fixed background layer.

### State Model

```
activeSection: 'none' | 'about' | 'history' | 'gallery' | 'findus' | 'contact'
```

- Lives in `page.tsx` as React state
- Passed as a prop to `<HeroSection>` (to trigger animation) and `<SectionPanel>` (to
  render the correct section content)

### Transition Flow

```
User clicks nav item
       │
       ▼
setActiveSection(newSection)
       │
       ▼
HeroSection receives new activeSection
  → Framer Motion sequence starts:
    Phase 1: scale(1.25) + blur(12px)   [400ms]
    Phase 2: scale(1) + blur(0)         [500ms]
       │
       ▼  (at +650ms, mid Phase 2)
SectionPanel swaps content
  → new section fades in [300ms]
```

### Mobile

On mobile the section-switcher model is **not used**. Instead, all sections are stacked
vertically as standard scroll sections. Navigation links scroll to the relevant section
using `scrollIntoView({ behavior: 'smooth' })`.

---

## Internationalisation (next-intl)

### Locales

| Code | Language | Default |
|---|---|---|
| `cs` | Czech | Yes |
| `en` | English | No |

### Routing

- Locale prefix: `always` — all URLs include the locale (`/cs/`, `/en/`)
- `src/middleware.ts` handles locale detection from `Accept-Language` header and redirects
  `/` → `/cs` (or browser-preferred locale if available)

### Message Files

All user-visible strings are stored in `src/i18n/cs.json` and `src/i18n/en.json`.

Message key structure:
```json
{
  "nav": {
    "about": "O nás",
    "history": "Historie",
    "gallery": "Galerie",
    "findUs": "Jak nás najít",
    "contact": "Kontakt"
  },
  "sections": {
    "about": { "title": "...", "body": "..." },
    "history": { "title": "...", "body": "..." },
    ...
  },
  "contact": {
    "name": "Jméno",
    "email": "E-mail",
    "message": "Zpráva",
    "send": "Odeslat",
    "success": "Zpráva odeslána.",
    "error": "Chyba, zkuste to znovu."
  },
  "footer": { ... },
  "meta": {
    "title": "Spolek žižkovského tunelu",
    "description": "..."
  }
}
```

### CMS-Ready Content Props

Every section component accepts a `content` prop typed to match its message shape.
Initially the prop is populated from `useTranslations()` (next-intl). When Supabase
content rows are introduced, the parent component fetches the row and passes it as the
same prop — zero changes to the section component.

---

## Supabase Integration Plan

### Phase 1 (current) — Static

- `src/lib/supabase.ts` exports a typed client but is not called
- All content comes from i18n JSON files
- Gallery images are static files in `public/img/`
- Contact form uses `mailto:` fallback

### Phase 2 (future) — CMS Content

Supabase schema (planned):

```sql
-- Editable text content blocks
create table content_blocks (
  id         uuid primary key default gen_random_uuid(),
  locale     text not null,           -- 'cs' | 'en'
  section    text not null,           -- 'about' | 'history' | ...
  key        text not null,           -- matches i18n message key
  value      text not null,
  updated_at timestamptz default now()
);

-- Gallery images
create table gallery_images (
  id         uuid primary key default gen_random_uuid(),
  storage_path text not null,         -- Supabase Storage path
  alt_cs     text,
  alt_en     text,
  sort_order integer default 0,
  published  boolean default true
);
```

- Row Level Security: public read, authenticated write
- Editor UI: separate `/admin` route (protected by Supabase Auth)

### Phase 3 (future) — Contact Form

- Supabase Edge Function `send-contact` or Resend integration
- Switch `src/lib/contact.ts` implementation — no component changes

---

## Environment Variables

See `.env.local.example` for all required variables.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, never exposed to client
CONTACT_EMAIL=                    # mailto: fallback recipient
NEXT_PUBLIC_SITE_URL=             # used for OG tags
```

---

## SEO & Open Graph

Defined in `src/app/[locale]/layout.tsx` via Next.js `Metadata` API:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/img/hero-og.jpg'],
      locale: params.locale,
      alternateLocale: params.locale === 'cs' ? 'en' : 'cs',
    },
  };
}
```

---

## Performance Considerations

- Hero image: served as WebP, preloaded via `<link rel="preload">` in layout
- Gallery images: lazy-loaded, Next.js `<Image>` with `sizes` prop
- Fonts: `display: swap`, subset to Latin + Latin-Extended (covers Czech diacritics)
- Map iframe: `loading="lazy"`, only rendered when "Find Us" section is active
- Framer Motion: imported as `motion/react` for tree-shaking

---

## Development Workflow

```bash
pnpm install           # install dependencies
pnpm dev               # start dev server on http://localhost:3000
pnpm build             # production build
pnpm lint              # ESLint
pnpm type-check        # tsc --noEmit
```

### Adding a New Language

1. Add locale code to `src/middleware.ts` locales array
2. Add locale to `next.config.ts` i18n config
3. Create `src/i18n/{locale}.json` mirroring the structure of `cs.json`
4. Add locale option to `<LanguageSwitcher>` component

### Replacing Placeholder Brand Assets

Drop files into `public/brand/`:
- `logo.svg` — replaces `logo-placeholder.svg` (update filename reference in `Logo.tsx`)
- `favicon.ico` — replaces `favicon-placeholder.svg` (update reference in `layout.tsx`)

No other code changes needed.
