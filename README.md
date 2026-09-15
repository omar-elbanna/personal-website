# Omar El-Banna — portfolio

Single-page portfolio built with Next.js (App Router), TypeScript, Tailwind CSS,
and Framer Motion. Bright and playful: a warm beige paper background with navy
and red accents, hand-built SVG stickers, a preloader, and a ball that rolls
down a line as you scroll.

## Motion pieces

- `components/Preloader.tsx` — intro overlay; a ball rolls a track, then the
  curtain lifts. Locks scroll while it runs.
- `components/ScrollBall.tsx` — the background ball that rolls up and down a
  fixed line, tied to scroll progress. Desktop only.
- `components/Stickers.tsx` — original inline-SVG stickers in the palette (cup
  character, controller, keyboard, laptop, clapperboard, neural net, sparkle,
  star). No external images, so nothing to download and no copyright issues.
  The cup is an original character, a nod to the Cuphead project, not the game's
  own art.
- `components/FloatingSticker.tsx` — positions a sticker and gives it a gentle
  idle float plus a hover.

Every one of these is dropped entirely for `prefers-reduced-motion` users.

## Palette

Defined in `tailwind.config.ts`: `bg` (beige), `surface` (near-white), `navy`
and `red` (brand), plus `fg`/`muted`/`border`. Change the hex values there to
retheme the whole site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

- `lib/content.ts` — every piece of copy and data. Edit here to change wording.
- `components/sections/` — one file per section (Hero, About, Research,
  Projects, Experience, Footer).
- `components/Reveal.tsx` — scroll-triggered reveal + stagger primitives.
- `components/RotatingText.tsx` — the hero's typewriter role cycle.
- `app/globals.css` — theme tokens live in `tailwind.config.ts`; global styles
  and the reduced-motion fallback live here.

## Editing copy

All strings come from `lib/content.ts`. The draft lines are meant to be rewritten
into Omar's own voice. House rules for anything added:

- No em dashes.
- Sentence case for headings.
- No filler ("passionate about", "leverage", "seamless", "unlock").
- Avoid "not just X, but Y".

## Assets to add

See `public/README-assets.md`. In short: real resume PDF, Cuphead and Flick
media, and repo URLs in `lib/content.ts` if the repos are public.

## Motion and accessibility

- Every reveal and the hero typewriter respect `prefers-reduced-motion` and fall
  back to no animation.
- Reveals fire once on scroll-in and never cause layout shift.
- Semantic sections, keyboard-focusable links with visible focus rings.

## Deploy

Push to GitHub and import into Vercel. No environment variables required.
