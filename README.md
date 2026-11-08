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

The identity follows the new Pixel logo (V1 "Nouvelle identité"). Tokens live in `src/app/globals.css`:

- **Colours:** ink `#0F1010` background, paper `#F0EFEF` text, flame `#EE7D22` as the only solid accent. The ember → flame → amber gradient (`#E75924 → #EE7D22 → #F6A43D`) is reserved for the symbol and one word of a page title (`text-brand-gradient`). The old studio colour tokens (`teal`, `yellow`…) still exist but resolve to the brand accent.
- **Type:** Archivo ExtraBold at 112 % width for headings (echoes the PIXEL wordmark), Barlow Condensed wide-tracked capitals for labels, buttons and navigation (echoes the CREATIVE AGENCY tagline), Archivo Regular for body text. Readex Pro for Arabic.
- **Shapes:** `clip-mark` (alias `clip-hex`) is the P symbol, used for the hero photo mask, bullets and badges. Buttons use `clip-chamfer`: the symbol's forward point, mirrored in RTL. Corners stay tight (4 px).
- **Logo files:** `src/assets/brand/` (full logo, lockup without tagline, symbol, white symbol).

## Digital cards (Pixel Cards)

The site is also the backend of the mobile app (`../pixel-mobile`). Pixel creates client accounts; each client gets a landing page at `/c/<username>` and a QR code that points to it. Clients edit their page from the app.

### First run

```bash
cp .env.example .env.local       # DATABASE_URL, CARD_BASE_URL
npm run db:migrate               # creates ./data/pixel.db (SQLite)
npm run admin:create -- <username> <password>
npm run dev                      # back office at http://localhost:3000/admin
```

**`CARD_BASE_URL` is printed into every QR code.** Set it to the final domain before any business card is printed: changing it later changes every QR code.

### Pieces

| Path | What |
| --- | --- |
| `src/server/db/schema.ts` | Drizzle schema: `users`, `cards` (page content as JSON), `media` (images), `sessions`. After a change: `npm run db:generate` then `npm run db:migrate`. |
| `src/server/card-schema.ts` | zod schema of a card, themes, social networks. Mirrored by `pixel-mobile/src/lib/types.ts`: keep both in sync. |
| `src/server/auth.ts` | Username + password (scrypt), opaque session tokens (only their SHA-256 is stored), login throttling. App: `Authorization: Bearer`. Back office: `pixel_admin` cookie. |
| `src/app/admin/` | Back office (French, not indexed): create clients (the QR code exists from creation), download SVG/PNG, reset passwords, disable, delete. No public sign-up. |
| `src/app/api/v1/` | App API: `auth/login`, `auth/logout`, `me`, `me/card` (PUT), `me/media` (POST multipart: logo / avatar / cover), `me/qr`, `me/password`. |
| `src/app/c/[slug]/[[...lang]]/` | Public page. `/c/<user>` uses the client's default language, `/c/<user>/ar` forces one. Own `<html>`: no site header/footer. |
| `src/components/card/` | Page markup and its five themes (`aurora`, `minimal`, `bold`, `card`, `elegant`) in `card-page.module.css`. `theme-vars.ts` adjusts the client's colours until text keeps WCAG AA contrast on each theme. |
| `src/server/images.ts` | Uploads are re-encoded to WebP with sharp (SVG refused). Logo uploads also return a palette of brand colours, which the app applies to the page. |

### Production notes

- **Database:** a local SQLite file only works on a host with a persistent disk. On serverless hosting (Vercel), use Turso: `DATABASE_URL=libsql://…` plus `DATABASE_AUTH_TOKEN`, then `npm run db:migrate`.
- **Images** are stored in the database, so there is no upload folder to back up.
- **Login throttling** is kept in memory, so the limit applies per server instance.
