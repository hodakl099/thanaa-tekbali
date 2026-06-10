# كلمة وداع · A Farewell to the First Cohort

A bilingual (Arabic-RTL by default, English toggle) single-page tribute from
**Dr. Thana Al-Tukbali (د. ثناء التكبالي)** to her first cohort of dental
students, marking the end of the General Anatomy Lab practical.

Built with **React 19 + Vite + TypeScript** and **Tailwind CSS** (via CDN,
configured inline in `index.html`).

## Develop

```bash
npm install
npm run dev      # local dev server on http://localhost:3000
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Structure

- `index.html` — Tailwind config, Google Fonts, and the `<style>` block of
  keyframe animations (all honour `prefers-reduced-motion`).
- `App.tsx` — language state (`ar` default) + section composition.
- `constants.ts` — all bilingual copy (`CONTENT.ar` / `CONTENT.en`).
- `types.ts` — the `Content` shape.
- `components/` — one file per section: `Header`, `Hero`, `Letter`, `Advice`,
  `Signature`, `Encouragement`, `Footer`, plus `FadeIn` (scroll reveals) and
  `CursorFollower`.

## Brand palette (`brand-*` Tailwind tokens)

| Token | Hex | Use |
| --- | --- | --- |
| `primary` | `#9A79BA` | African Violet — accents, the gradient panel |
| `primary-deep` | `#653C87` | Deep Violet — text/links on light, hover |
| `secondary` | `#A8A2AB` | Rose Quartz — **decoration only** (hairlines, dots) |
| `dark` | `#241C2C` | Deep Plum — all body & label text |
| `bg` | `#F9F8FA` | Lavender Mist — page background |
| `surface` | `#FFFFFF` | white — cards |

## Accessibility guardrail

To keep contrast accessible with these mid-tones:

- **White text** is allowed **only** on the violet→deep gradient panel (large,
  bold) or on solid `#653C87`. Never white on `#9A79BA` / `#A8A2AB`.
- **Rose Quartz (`#A8A2AB`) is decoration only** — hairlines, dots, the
  signature flourish. Never use it for label or body text (it fails contrast on
  the light background). Use `text-brand-dark/70` for muted labels and
  `text-brand-primary-deep` for violet text.
- All body and label copy is Deep Plum (`#241C2C`) on light surfaces.

> The 4 English motivational phrases ("Future doctor loading", etc.) are
> intentionally English in both language modes, rendered `dir="ltr" lang="en"`.
