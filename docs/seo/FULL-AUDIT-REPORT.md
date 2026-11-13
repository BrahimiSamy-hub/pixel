# SEO audit: pixelcreativeagency.net

Date: 13 November 2026. Scope: all 138 pages in the sitemap (46 pages × French, English, Arabic), audited on a local production build of the current code, plus a check of the live site. Lighthouse run locally in mobile mode.

**Business type:** local service business (creative agency in Batna) serving all of Algeria, with a small online shop.

## Score

| Category | Weight | Before | After the fixes in this audit |
|---|---|---|---|
| Technical SEO | 22 % | 80 | 90 |
| Content quality | 23 % | 62 | 62 |
| On-page SEO | 20 % | 60 | 85 |
| Structured data | 10 % | 78 | 85 |
| Performance | 10 % | 85 | 91 |
| AI search readiness | 10 % | 65 | 80 |
| Images | 5 % | 80 | 85 |
| **Overall** | | **71** | **81** |

The scores are my assessment from the checks below, not a Google metric. Content is the category holding the site back, and it needs your input (see the action plan).

## Not measured

- **Google Search Console and Analytics:** no access, so no data on current rankings, clicks or indexed pages.
- **Backlinks:** no tool access.
- **Google Business Profile:** not checked.
- **Real-user speed (Core Web Vitals field data):** Google's PageSpeed quota was exhausted; Lighthouse was run locally instead.

## Lighthouse (mobile, local build)

| Page | Performance before → after | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| /fr | 85 → 90 | 100 | 100 | 92* |
| /fr/mariage | 81 → 93 | 100 | 100 | 92* |
| /fr/publicite | 83 → 92 | 100 | 100 | 92* |
| /ar | — → 91 | 100 | 100 | 92* |

\* The only failed SEO check is "canonical points to another domain", which happens because the test ran on localhost. On the live domain this check passes.

Main image load time (LCP, simulated slow phone) went from 4.5–5.3 s to 3.2–3.6 s; layout shift is 0. Page weight went from 625 kB to about 460–560 kB.

## Findings

### Critical
1. **The live site is behind the code.** `/fr/tapini` returns 404 on the live site. None of the work below, the quote builders or the privacy update is online until the site is redeployed.
2. **The old domain doesn't answer.** `pixeldz.store` timed out from here. If it is down, every old link, printed QR code and Google result pointing to it is lost. It should redirect (301) to the same page on the new domain.

### High
3. **45 of 135 page titles were longer than 60 characters** and got cut off in Google. Cause: every title ended with " | Pixel Creative Agency" (24 characters). *Fixed:* the suffix is now " | Pixel"; no title exceeds 60.
4. **Titles didn't use the words Algerians search.** For example "Publicité & impression" instead of "enseignes lumineuses", and "Agence créative" instead of "agence de communication". *Fixed* for the 9 main pages in 3 languages (see keyword table).
5. **No page for Batna**, the city the agency is in, while Alger, Oran, Constantine, Annaba and Sétif had one. *Fixed:* `/agence-batna` added in 3 languages and to the sitemap.
6. **The six city pages are near-identical** (328 words, only the city name changes). Google can treat these as doorway pages. Not fixed: each needs real local content (see action plan).
7. **`sitemap-images.xml` listed 16 image addresses that all return 404.** *Fixed:* file removed and dropped from robots.txt.
8. **30+ pages had no share image** (services, portfolio, shop, city pages, Tapini), so links shared on WhatsApp or Facebook showed no preview. *Fixed:* every page now falls back to the site's share image.

### Medium
9. **Wrong prices in structured data:** the Sounds page declared "from 4 000 DA" to Google; the price list says 5 000. *Fixed.*
10. **Business schema lacked** a map link, price range, languages and the WhatsApp sales contact. *Fixed.* Tapini had no service schema. *Fixed.*
11. **`llms.txt` (read by AI assistants) was out of date:** wrong Instagram account, dead links, no prices, no Tapini. *Rewritten* with services, public prices and correct links.
12. **Fonts:** 110 kB of unused font data was preloaded on every page. *Fixed.*
13. **Thin pages:** blog (288 words, no articles), shop categories (204–220 words), portfolio categories (223–340 words, mostly images).
14. **Portfolio page HTML is 390 kB**, because all ~200 items are in the first load.
15. **Short descriptions** (under 70 characters) on terms, privacy and some Arabic pages. Low impact.

### Passing
- Every page returns 200, has exactly one H1, a canonical address matching its URL, and correct language links (fr-DZ, en, ar-DZ, x-default).
- robots.txt is valid and allows AI search crawlers; the checkout page is excluded from indexing.
- Security headers are present (HSTS, nosniff, frame options, referrer policy).
- Valid structured data on all 138 pages (LocalBusiness everywhere, plus Service, FAQ, Product, Review, Breadcrumb where relevant).
- Images are served as AVIF/WebP with sizes; images without alt text are decorative ones only.
- `www` and `http` redirect to `https://pixelcreativeagency.net`.

## Keyword targets

Chosen for how people in Algeria search (mostly French, also Arabic), without search-volume data, which I couldn't access.

| Page | Main keyword (FR) | Arabic | Now in the title |
|---|---|---|---|
| Home | agence de communication Batna / Algérie | وكالة إشهار باتنة | yes |
| /agence-{ville} | agence de communication {ville} | وكالة إشهار {ville} | yes |
| /developpement | création site web Algérie, site e-commerce | إنشاء موقع ويب الجزائر | yes |
| /design-graphique | création logo Algérie, design graphique | تصميم شعار الجزائر | yes |
| /mariage | photographe mariage Batna, vidéaste mariage | مصور أعراس باتنة | yes |
| /publicite | enseigne lumineuse, néon LED, impression bâche | لافتات مضيئة، نيون | yes |
| /photo-lab | shooting photo produit, vidéo publicitaire | تصوير منتجات | yes |
| /sons | voix off darija, jingle publicitaire | تعليق صوتي بالدارجة | yes |
| /tapini | carte de visite NFC Algérie, carte avis Google | بطاقة زيارة NFC | yes |
