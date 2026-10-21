# Pixel Creative Agency — pixeldz.store

Website of Pixel Creative Agency (Batna, Algeria): six studios, a portfolio and a shop, in French, English and Arabic.

## Stack

- **Next.js 16** App Router, Server Components by default, Turbopack, React Compiler, TypeScript strict
- **next-intl 4** for routing and messages (`/fr`, `/en`, `/ar`; Arabic is right-to-left)
- **Tailwind CSS 4**, configured in CSS (`src/app/globals.css`)
- **zod** for server-side validation, **zustand** for the cart, **lucide-react** icons, **sonner** toasts

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically generated)
npm run start
npm run lint
npm run typecheck  # regenerates route types, then tsc
```

## Where things live

| Path | What |
| --- | --- |
| `src/app/[locale]/…` | Pages. URLs keep the historical French slugs in every locale (SEO). |
| `src/app/actions/` | Server actions: contact form, express quote, orders. |
| `src/components/` | `ui/` primitives, `layout/` header/footer/consent, `sections/` shared blocks, feature folders. |
| `src/messages/{fr,en,ar}.json` | All copy. `fr.json` is the reference: keys are type-checked against it. |
| `src/lib/` | Site constants, SEO/metadata helpers, shop API client, cart store, formatting. |
| `src/data/` | Portfolio items, wedding packs, wilayas with delivery fees. |
| `src/assets/` | Images imported statically (sizes and blur placeholders come for free). |

## Content and data

- **Shop** data comes from `https://api.pixeldz.store` (`src/lib/api.ts`), cached for an hour (ISR).
- **Orders** are re-priced on the server from the API before being sent, so a modified cart cannot change prices.
- **Delivery fees** come from `src/data/wilayas.json`.
- **Contact details, rating, GA id**: `src/lib/site.ts`.
- **Portfolio**: add an item to `src/data/portfolio.ts` with a static image import.

## Translations

1. Add the key to `src/messages/fr.json`, then the same key to `en.json` and `ar.json`. TypeScript flags any `t('…')` call to a missing key.
2. Use ICU syntax for plurals: `{count, plural, one {…} other {…}}`. Arabic also has `two`, `few` and `many`.
3. Server Components use `getTranslations`. Client Components use `useTranslations`, and their namespace must be listed in `clientNamespaces` in `src/app/[locale]/layout.tsx`.

## RTL rules

- Use logical utilities only: `ms-/me-`, `ps-/pe-`, `inset-s-/inset-e-`, `text-start/end`, `border-s/e`. Avoid `left/right`, `ml/mr`.
- Add `flip-rtl` to directional icons (arrows, chevrons).
- Wrap phone numbers, emails and codes in `dir="ltr"`. In Arabic messages, wrap numeric ranges (`09:00–18:00`, `60×40`) in the isolates U+2066 … U+2069.
- Don't add letter-spacing or uppercase to Arabic: `globals.css` resets both under `:lang(ar)`, and the type utilities (`text-h1`, `text-label`…) add extra line-height for Arabic.
- Numbers and dates go through `src/lib/format.ts`, which uses `ar-DZ`: Western digits and Algerian month names.

## Brand

Colours, type scale and shapes are tokens in `src/app/globals.css`:

- **Colours:** ink `#0E0C15` background and orange `#F18A27` for actions.
- **Studio colours:** each studio takes one of the logo dots: Photo teal, Creative yellow, Weddings red, Development lime, Sounds violet, Advertisement orange.
- **Shapes:** the hexagon from the "P" monogram is available as `clip-hex`, and buttons use `clip-chamfer`.
