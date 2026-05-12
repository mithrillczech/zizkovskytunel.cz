# Design Standards — Žižkov Tunnel Association Website

## Design Philosophy

The visual language contrasts the tunnel's raw, utilitarian concrete atmosphere with the
cultural prestige and ambition of the association. The design is restrained — darkness and
space do the heavy lifting, with gold used sparingly as the only decorative accent. The
tunnel image is the hero at all times; UI elements serve it, never compete with it.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#080808` | Page background, near-black |
| `--color-surface` | `#141414` | Cards, section panel backgrounds |
| `--color-surface-raised` | `#1E1E1E` | Elevated surfaces, hover backgrounds |
| `--color-text-primary` | `#F0EDE8` | Body text, warm off-white |
| `--color-text-muted` | `#888880` | Secondary text, captions, labels |
| `--color-accent` | `#C8A96E` | Gold — links, active nav indicator, hover states |
| `--color-accent-hover` | `#DFC08A` | Lighter gold on hover |
| `--color-footer-bg` | `#000000` | Footer — pure black |
| `--color-footer-text` | `#FFFFFF` | Footer — pure white |
| `--color-overlay` | `rgba(8,8,8,0.72)` | Section panel dark backdrop over hero |
| `--color-arrow-bg` | `rgba(0,0,0,0.30)` | Gallery arrow buttons |

### Usage Rules

- Gold (`--color-accent`) is used **only** for: active nav item indicator (1px bottom border),
  link hover states, gallery caption overlays, and the Send button in the contact form.
- The footer uses **only** black and white — no gold, no gradients.
- Backgrounds are achieved through opacity and blur (`backdrop-filter`), not solid fills,
  wherever the hero image should bleed through.

---

## Typography

### Typefaces

| Role | Font | Source |
|---|---|---|
| Display / Headings | `Cormorant Garamond` | `next/font/google` |
| Body / UI / Navigation | `DM Sans` | `next/font/google` |

`Cormorant Garamond` is editorial and architectural — used for section titles, the site
name bar, and any large display text. `DM Sans` handles all navigation labels, body copy,
form fields, and captions.

### Type Scale

| Name | Size | Weight | Font | Usage |
|---|---|---|---|---|
| `display-xl` | 72px / `text-7xl` | 300 | Cormorant | Hero overlay title |
| `display-lg` | 48px / `text-5xl` | 400 | Cormorant | Section headings |
| `display-md` | 30px / `text-3xl` | 400 | Cormorant | Sub-headings |
| `body-lg` | 20px / `text-xl` | 400 | DM Sans | Lead paragraphs |
| `body-base` | 16px / `text-base` | 400 | DM Sans | Body copy |
| `body-sm` | 14px / `text-sm` | 400 | DM Sans | Captions, labels |
| `nav` | 14px / `text-sm` | 500 | DM Sans | Navigation items |
| `nav-mobile` | 32px / `text-4xl` | 300 | Cormorant | Mobile nav overlay items |

### Line Height & Tracking

- Headings: `leading-tight` (1.15), `tracking-wide` (+0.05em)
- Body: `leading-relaxed` (1.65)
- Navigation: `leading-none`, `tracking-widest` (+0.15em), uppercase

---

## Spacing & Layout

### Container

- Max-width: `1280px`
- Horizontal padding: `px-6` (mobile) → `px-10` (md) → `px-16` (xl)
- Centered with `mx-auto`

### Vertical Rhythm

- Section top/bottom padding: `py-24` (desktop), `py-14` (mobile)
- Between heading and body: `mt-6`
- Between body paragraphs: `mt-4`

### Responsive Breakpoints (Tailwind defaults)

| Name | Min-width | Target |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Wide desktop |

---

## Layout Structure

### Desktop

```
┌─────────────────────────────────────────────────────┐
│  HEADER BAR  — "Žižkov Tunnel" (Cormorant, center)  │  h-14
├────────────┬───────────────────────────────────┬────┤
│ LOGO space │  NAV ITEMS (About·History·Gallery  │ CS/│  h-12
│            │  FindUs·Contact)                  │ EN │
│            │                               IG FB│    │
├────────────┴───────────────────────────────────┴────┤
│                                                      │
│          HERO IMAGE  (100vw × 100vh, fixed)          │
│                                                      │
│   ┌────────────────────────────────────────────┐    │
│   │  SECTION PANEL (absolute, overlaid on hero) │    │
│   │  fade-in after tunnel transition            │    │
│   └────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────┤
│  FOOTER — black bg, white text, nav links + socials  │
└─────────────────────────────────────────────────────┘
```

### Mobile

```
┌───────────────────────────────┐
│  "Žižkovský tunel"   ☰       │  sticky header
├───────────────────────────────┤
│  [About section]              │
│  [History section]            │
│  [Gallery — full-width        │
│   ←  carousel  →]             │
│  [Find Us — map embed]        │
│  [Contact form]               │
├───────────────────────────────┤
│  FOOTER                       │
└───────────────────────────────┘
```

---

## The Tunnel Transition Effect

This is the defining visual element of the site. When a nav item is clicked (desktop), the
hero image simulates sprinting through the tunnel.

### Animation Sequence

```
State       Property    Value         Duration   Easing
─────────────────────────────────────────────────────────
Phase 1     scale       1 → 1.25      400ms      ease-in
(rush in)   filter      blur(0) →     400ms      ease-in
                        blur(12px)

Phase 2     scale       1.25 → 1      500ms      ease-out
(emerge)    filter      blur(12px)    500ms      ease-out
                        → blur(0)

Content     opacity     0 → 1         300ms      ease-out
fade-in     (starts at mid-point of Phase 2, i.e. +650ms after click)
```

### Idle Ambient Breathing (no active section)

When no section panel is open, the hero image breathes slowly:

```
scale:  1 → 1.04 → 1     duration: 8s    easing: ease-in-out    loop: infinite
blur:   0 → 2px  → 0     duration: 8s    easing: ease-in-out    loop: infinite
```

Stops immediately when a nav click starts the full effect.

### Accessibility

When `prefers-reduced-motion: reduce` is set:
- All scale and blur animations are **skipped entirely**
- Only the content `opacity` fade plays (300ms)
- The idle ambient loop does not run

---

## Navigation

### Desktop

- Project name bar: centered `Cormorant Garamond` display text, `h-14`, `bg-bg`
- Nav bar: `h-12`, `bg-bg/80 backdrop-blur-sm`, flex, space-between
  - Left: logo image (from `/brand/`) or name text fallback
  - Center: nav items — `DM Sans`, `text-sm`, `tracking-widest`, uppercase
    - Active item: `1px solid var(--color-accent)` bottom border
    - Hover: gold color transition (`150ms`)
  - Right: `CS | EN` language switcher + Instagram + Facebook icons

### Mobile

- Sticky header bar: `h-14`, project name (left, Cormorant), hamburger icon (right)
- **Open state:** full-screen dark overlay (`bg-bg/95 backdrop-blur-md`)
  - Nav items stacked, `Cormorant Garamond text-4xl font-light`, centered
  - Active: gold color
  - Close: tap outside or on `✕`
  - Enters from top with `y: -20 → 0` + `opacity: 0 → 1` (Framer Motion)

---

## Gallery

### Desktop

- 3-column CSS Grid, `gap-4`
- Images: fixed aspect ratio `4/3`, `object-fit: cover`
- Hover: caption overlay fades in (`bg-bg/70`), gold section border appears

### Mobile

- Single image, full viewport width, `aspect-ratio: 4/3`
- Horizontal carousel: Framer Motion `drag="x"` with velocity snap
- Navigation arrows: `w-12 h-12`, `bg-black/30 backdrop-blur-sm`, `rounded-full`,
  absolute positioned overlapping left/right edges by `~1.5rem`
- Dots indicator below image

---

## Contact Form

- Fields: `Full Name` / `Email` / `Message` (textarea, 5 rows) / `Send` button
- Input styling: `bg-surface border border-white/10 focus:border-accent`, no fill on focus
- Send button: `bg-accent text-bg` (gold with dark text), hover: `bg-accent-hover`
- Error states: muted red text below field (`#E57373`)
- Success state: replaces form with a thank-you message

---

## "How to Find Us" Section

- Written directions block (left column, desktop)
- Mapy.cz iframe embed (right column desktop / below text on mobile)
  - Responsive via `aspect-ratio: 16/9`, `w-full`
  - Loaded lazily (`loading="lazy"`)

---

## Footer

- Background: `#000000`
- Text: `#FFFFFF` only — no gold, no gray
- Layout: two columns (desktop) — nav links (left), social icons + copyright (right)
- Mobile: stacked, centered
- Link hover: `opacity: 0.6` transition (no color change)

---

## Visual Language Principles

1. **Contrast as theme** — utilitarian raw concrete vs. refined gold and editorial type
2. **Restraint** — the tunnel image is the statement; UI steps back
3. **Layering** — section panels float over the hero; depth is achieved through opacity and blur, not z-fighting
4. **No decorative borders** — separation through spacing, scale, and opacity
5. **Purposeful motion** — every animation has narrative meaning (rushing through the tunnel)
6. **Footer as reset** — pure black/white signals the end of the experience

---

## Brand Assets

Stored in `public/brand/`. Replace placeholder files with real assets — no code changes needed.

| File | Purpose | Format |
|---|---|---|
| `logo-placeholder.svg` | Header logo | SVG (replace with real logo) |
| `favicon-placeholder.svg` | Browser tab icon | SVG / ICO (replace with real) |

Recommended final formats: `logo.svg` + `logo-dark.svg` (if needed for light contexts),
`favicon.ico` (multi-size), `favicon-192.png` and `favicon-512.png` for PWA manifest.
