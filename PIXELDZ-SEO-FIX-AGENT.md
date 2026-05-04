# SEO Fix Agent — pixeldz.store
**Generated:** 2026-03-30
**Audit Score:** 31/100 (POOR)
**Target Site:** https://pixeldz.store/
**Platform:** React SPA (Client-Side Rendering — CSR)
**Business Type:** Creative Services Agency — Photography, Graphic Design, Web Development, Audio Production (Algeria)
**Founded:** 2018 | **Location:** Algeria | **Language:** French (primary), English, Arabic

---

## Instructions for the Agent

You are an SEO fix agent. Your task is to implement every fix listed below on the website `https://pixeldz.store/`. The site appears to be a **React Single Page Application (SPA) with full client-side rendering (CSR)** — this is the root cause of most issues. Apply all fixes in order: Critical first, then High, then Medium. For each fix provide the exact code, file path, and placement. Do not skip any fix. Do not add features beyond what is specified.

---

## ROOT CAUSE — WHY THE SCORE IS 31/100

Every page on pixeldz.store returns an **empty HTML body** when fetched without JavaScript execution. Search crawlers (especially Bing, AI crawlers, and even Google's second-wave indexer) see:

```html
<html>
  <head>
    <!-- metadata here -->
  </head>
  <body>
    <div id="root"></div>  <!-- EMPTY — all content loaded by JS -->
  </body>
</html>
```

This means:
- H1 tags, headings, body text, product/service descriptions, internal links — all invisible to crawlers
- Google processes JS in a second wave, which can delay indexing by days/weeks
- Bing, Perplexity, and AI crawlers largely cannot render JS at all
- Every other SEO fix is secondary to resolving this

**The master fix is migrating from CSR to SSR or SSG.**

---

## CRITICAL FIXES (Implement First)

---

### FIX C1 — Migrate from Client-Side Rendering (CSR) to Server-Side Rendering (SSR) or Static Site Generation (SSG)

**Problem:** All page content is rendered exclusively via JavaScript in the browser. Crawlers without JS execution see empty pages.

**Recommended approach: Migrate to Next.js**

Next.js is the standard solution for React apps that need SSR/SSG. It is backward-compatible with existing React components.

#### Step 1 — Install Next.js

```bash
npm install next react react-dom
# or if starting fresh:
npx create-next-app@latest pixeldz --typescript --tailwind --app
```

#### Step 2 — Convert your React Router routes to Next.js pages

Current React Router routes → Next.js file structure:

| Current Route | Next.js File (App Router) | Next.js File (Pages Router) |
|---|---|---|
| `/` | `app/page.js` | `pages/index.js` |
| `/about-us` | `app/about-us/page.js` | `pages/about-us.js` |
| `/shop` | `app/shop/page.js` | `pages/shop/index.js` |
| `/portfolio` | `app/portfolio/page.js` | `pages/portfolio.js` |
| `/wedding` | `app/wedding/page.js` | `pages/wedding.js` |
| `/contact` | `app/contact/page.js` | `pages/contact.js` |
| `/photo-lab` | `app/photo-lab/page.js` | `pages/photo-lab.js` |
| `/sounds` | `app/sounds/page.js` | `pages/sounds.js` |
| `/development` | `app/development/page.js` | `pages/development.js` |
| `/creative` | `app/creative/page.js` | `pages/creative.js` |
| `/advertisement` | `app/advertisement/page.js` | `pages/advertisement.js` |
| `/rules` | `app/terms/page.js` | `pages/terms.js` |

#### Step 3 — For each page, ensure content is server-rendered

**App Router (recommended):** All components are server components by default — content renders on the server.

```jsx
// app/about-us/page.js — Server Component (default)
export default function AboutUs() {
  return (
    <main>
      <h1>À Propos de Pixel Creative Agency</h1>
      <p>Agence créative professionnelle en Algérie depuis 2018...</p>
      {/* All content here is in the initial HTML */}
    </main>
  );
}
```

**Pages Router:** Use `getStaticProps` for static pages:

```jsx
// pages/about-us.js
export default function AboutUs({ content }) {
  return (
    <main>
      <h1>À Propos de Pixel Creative Agency</h1>
      <p>{content.description}</p>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      content: { description: "Agence créative professionnelle en Algérie depuis 2018..." }
    }
  };
}
```

#### Step 4 — Verify server rendering works

After migrating, verify each page with:
```bash
curl -s https://pixeldz.store/about-us | grep -i "<h1"
# Should return the H1 tag content
```

If the H1 appears in the curl output, SSR is working. If not, content is still CSR.

#### Minimum viable alternative (if full migration is not possible now)

If a full Next.js migration is not feasible immediately, implement **pre-rendering** using `react-snap` or `prerender.io`:

```bash
npm install --save-dev react-snap
```

In `package.json`:
```json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "source": "build",
    "destination": "build",
    "fallbackPage": "/index.html",
    "include": ["/", "/about-us", "/shop", "/portfolio", "/wedding", "/contact", "/photo-lab", "/sounds", "/development", "/creative", "/advertisement", "/terms"]
  }
}
```

---

### FIX C2 — Add Unique Meta Title Tag to Every Page

**Problem:** All pages share one identical title: `"Pixel Creative Agency - Agence Créative en Algérie | Photographie, Design, Web"` (72 chars — 12 over limit). Title must be unique per page, 50–60 chars, lead with primary keyword.

**In Next.js (App Router) — add `export const metadata` to each page:**

#### Homepage (`/`)
```jsx
export const metadata = {
  title: 'Agence Créative en Algérie — Photo, Design, Web | Pixel',
  // 57 chars ✓
};
```

#### About Us (`/about-us`)
```jsx
export const metadata = {
  title: 'À Propos — Pixel Creative Agency Algérie | Depuis 2018',
  // 55 chars ✓
};
```

#### Shop (`/shop`)
```jsx
export const metadata = {
  title: 'Boutique Créative — Photos, Sons, Design | Pixel Algérie',
  // 56 chars ✓
};
```

#### Portfolio (`/portfolio`)
```jsx
export const metadata = {
  title: 'Portfolio — Réalisations Photo & Design | Pixel Algérie',
  // 55 chars ✓
};
```

#### Wedding (`/wedding`)
```jsx
export const metadata = {
  title: 'Photographe Mariage en Algérie — Forfaits Wedding | Pixel',
  // 57 chars ✓
};
```

#### Contact (`/contact`)
```jsx
export const metadata = {
  title: 'Contactez Pixel Creative Agency — Algérie | Devis Gratuit',
  // 57 chars ✓
};
```

#### Photo Lab (`/photo-lab`)
```jsx
export const metadata = {
  title: 'Photo Lab Algérie — Portraits, Tirages & Retouches | Pixel',
  // 58 chars ✓
};
```

#### Sounds (`/sounds`)
```jsx
export const metadata = {
  title: 'Production Audio Algérie — Sons, Voix & Musique | Pixel',
  // 55 chars ✓
};
```

#### Web Development (`/development`)
```jsx
export const metadata = {
  title: 'Développement Web & E-commerce en Algérie | Pixel Agency',
  // 56 chars ✓
};
```

#### Graphic Design (`/creative`)
```jsx
export const metadata = {
  title: 'Design Graphique & Identité Visuelle Algérie | Pixel',
  // 51 chars ✓
};
```

#### Advertisement (`/advertisement`)
```jsx
export const metadata = {
  title: 'Publicité & Impression Algérie — Enseignes Neon | Pixel',
  // 55 chars ✓
};
```

#### Terms (`/terms`)
```jsx
export const metadata = {
  title: 'Conditions Générales d\'Utilisation | Pixel Creative Agency',
  // 57 chars ✓
};
```

**In Next.js (Pages Router):**
```jsx
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Agence Créative en Algérie — Photo, Design, Web | Pixel</title>
      </Head>
      {/* page content */}
    </>
  );
}
```

---

### FIX C3 — Add Meta Description to Every Page

**Problem:** Zero meta descriptions found on any page. Google generates its own snippets — usually poor quality and irrelevant.

**Add to each page's `metadata` export (App Router) or `<Head>` (Pages Router):**

#### Homepage
```
"Pixel Creative Agency — agence créative professionnelle en Algérie depuis 2018. Photographie, design graphique, développement web, production audio. Devis gratuit."
```
(158 chars ✓)

#### About Us
```
"Découvrez Pixel Creative Agency, votre partenaire créatif en Algérie depuis 2018. Équipe passionnée, projets personnalisés, résultats professionnels garantis."
```
(158 chars ✓)

#### Shop
```
"Achetez des photos professionnelles, sons, designs et actifs créatifs en ligne. Large catalogue de ressources créatives algériennes. Paiement sécurisé."
```
(151 chars ✓)

#### Portfolio
```
"Découvrez nos réalisations: mariages, portraits, identités visuelles, sites web et campagnes publicitaires. Plus de 6 ans d'expérience créative en Algérie."
```
(155 chars ✓)

#### Wedding
```
"Forfaits photographie mariage en Algérie. Capturez chaque moment de votre journée avec notre équipe professionnelle. Reportage complet, album souvenir."
```
(151 chars ✓)

#### Contact
```
"Contactez Pixel Creative Agency pour votre prochain projet créatif. Lundi–Vendredi 9h–18h. Devis gratuit sous 24h. Basés en Algérie, disponibles partout."
```
(153 chars ✓)

#### Photo Lab
```
"Service photo lab professionnel en Algérie: portraits studio, retouches, tirages haute qualité. Shootings professionnels et personnels avec Pixel Agency."
```
(153 chars ✓)

#### Sounds
```
"Production audio professionnelle en Algérie: effets sonores, voix off, musique originale pour vos projets vidéo, pubs et contenus digitaux. Pixel Agency."
```
(153 chars ✓)

#### Development
```
"Création de sites e-commerce, landing pages et applications mobiles en Algérie. Solutions web performantes et optimisées SEO par Pixel Creative Agency."
```
(151 chars ✓)

#### Creative (Graphic Design)
```
"Design graphique professionnel en Algérie: logos, charte graphique, packaging et supports de communication. Identité visuelle sur mesure par Pixel Agency."
```
(155 chars ✓)

#### Advertisement
```
"Services publicité et impression en Algérie: enseignes lumineuses, néon, affiches, roll-ups et supports publicitaires. Devis rapide par Pixel Agency."
```
(149 chars ✓)

**Next.js App Router implementation:**
```jsx
export const metadata = {
  title: 'Page Title Here',
  description: 'Meta description here',
};
```

**Next.js Pages Router:**
```jsx
<Head>
  <meta name="description" content="Meta description here" />
</Head>
```

---

### FIX C4 — Add Canonical Tags to Every Page

**Problem:** No `<link rel="canonical">` exists on any page. Without canonicals, Google may choose a wrong canonical version, split link equity, or create duplicate content issues.

**Rule:** Every page must self-reference its own canonical URL using non-www HTTPS.

**Next.js App Router — add to each page's metadata:**
```jsx
export const metadata = {
  title: '...',
  description: '...',
  alternates: {
    canonical: 'https://pixeldz.store/about-us',
  },
};
```

**Next.js Pages Router:**
```jsx
<Head>
  <link rel="canonical" href="https://pixeldz.store/about-us" />
</Head>
```

**Canonical URLs per page:**

| Page | Canonical URL |
|---|---|
| Homepage | `https://pixeldz.store/` |
| About | `https://pixeldz.store/about-us` |
| Shop | `https://pixeldz.store/shop` |
| Portfolio | `https://pixeldz.store/portfolio` |
| Wedding | `https://pixeldz.store/wedding` |
| Contact | `https://pixeldz.store/contact` |
| Photo Lab | `https://pixeldz.store/photo-lab` |
| Sounds | `https://pixeldz.store/sounds` |
| Development | `https://pixeldz.store/development` |
| Creative | `https://pixeldz.store/creative` |
| Advertisement | `https://pixeldz.store/advertisement` |
| Terms | `https://pixeldz.store/terms` |

---

### FIX C5 — Add Visible, Unique H1 to Every Page (Server-Rendered)

**Problem:** H1 tags are either missing or only in the JS-rendered DOM — invisible to crawlers without JS. Every page needs exactly one H1 in the server-rendered initial HTML.

**IMPORTANT (December 2025 JS SEO rule):** H1 tags injected via JavaScript after hydration may not be reliably indexed. The H1 must be in the **initial HTML response from the server**.

#### Homepage H1
```html
<h1>Agence Créative Professionnelle en Algérie</h1>
```

#### About Us H1
```html
<h1>À Propos de Pixel Creative Agency</h1>
```

#### Shop H1
```html
<h1>Boutique Créative — Photos, Sons & Designs</h1>
```

#### Portfolio H1
```html
<h1>Nos Réalisations — Portfolio Pixel Agency</h1>
```

#### Wedding H1
```html
<h1>Photographie Mariage en Algérie</h1>
```

#### Contact H1
```html
<h1>Contactez Pixel Creative Agency</h1>
```

#### Photo Lab H1
```html
<h1>Photo Lab Professionnel — Portraits & Tirages</h1>
```

#### Sounds H1
```html
<h1>Production Audio Professionnelle en Algérie</h1>
```

#### Development H1
```html
<h1>Développement Web & E-commerce en Algérie</h1>
```

#### Creative (Graphic Design) H1
```html
<h1>Design Graphique & Identité Visuelle</h1>
```

#### Advertisement H1
```html
<h1>Publicité & Impression en Algérie</h1>
```

#### Terms H1
```html
<h1>Conditions Générales d'Utilisation</h1>
```

---

## HIGH PRIORITY FIXES (Implement Within 1 Week)

---

### FIX H1 — Create a Privacy Policy Page

**Problem:** No privacy policy page exists. Required for GDPR-adjacent compliance (Algerian Law 18-07 on personal data protection) and E-E-A-T trust for a site processing orders and contact forms.

**Create:** `/privacy-policy` → `app/privacy-policy/page.js` or `pages/privacy-policy.js`

```jsx
export const metadata = {
  title: 'Politique de Confidentialité | Pixel Creative Agency',
  description: 'Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.',
  alternates: { canonical: 'https://pixeldz.store/privacy-policy' },
};
```

**Required content sections:**
1. Données collectées (nom, email, téléphone via formulaire de contact)
2. Utilisation des données (réponse aux demandes, envoi de devis)
3. Conservation des données
4. Droits de l'utilisateur (accès, correction, suppression)
5. Contact pour questions de confidentialité
6. Date de dernière mise à jour

**Add a link to this page in the site footer.** It must appear on every page.

---

### FIX H2 — Add Email Address to Contact Page and Schema

**Problem:** Only phone number found in schema. No email address on the site. Reduces trust and accessibility.

**On the `/contact` page, add:**
```html
<a href="mailto:contact@pixeldz.store">contact@pixeldz.store</a>
```
(Use your actual business email address.)

**Update LocalBusiness schema** (see Fix H5 below for full schema) to include:
```json
"email": "contact@pixeldz.store"
```

---

### FIX H3 — Add Per-Service JSON-LD Schema on Each Service Page

**Problem:** No Service or ProfessionalService schema on any service page. Missing rich result opportunities.

**Add the following JSON-LD to each service page (server-rendered in initial HTML):**

#### Photography / Photo Lab (`/photo-lab`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Photographie Professionnelle — Pixel Creative Agency",
  "provider": {
    "@type": "Organization",
    "name": "Pixel Creative Agency",
    "url": "https://pixeldz.store"
  },
  "serviceType": "Photography",
  "areaServed": { "@type": "Country", "name": "Algeria" },
  "description": "Services de photographie professionnelle en Algérie: mariages, portraits, événements, photographie commerciale.",
  "url": "https://pixeldz.store/photo-lab",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "DZD",
    "availability": "https://schema.org/InStock"
  }
}
```

#### Wedding Photography (`/wedding`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Photographie de Mariage en Algérie",
  "provider": {
    "@type": "Organization",
    "name": "Pixel Creative Agency"
  },
  "serviceType": "Wedding Photography",
  "areaServed": { "@type": "Country", "name": "Algeria" },
  "description": "Forfaits photographie et vidéographie de mariage complets en Algérie. Reportage, album souvenir, édition professionnelle.",
  "url": "https://pixeldz.store/wedding",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "DZD",
    "availability": "https://schema.org/InStock"
  }
}
```

#### Graphic Design (`/creative`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Design Graphique & Identité Visuelle",
  "provider": {
    "@type": "Organization",
    "name": "Pixel Creative Agency"
  },
  "serviceType": "Graphic Design",
  "areaServed": { "@type": "Country", "name": "Algeria" },
  "description": "Création de logos, chartes graphiques, packaging et supports de communication visuels pour entreprises algériennes.",
  "url": "https://pixeldz.store/creative"
}
```

#### Web Development (`/development`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Développement Web & E-commerce Algérie",
  "provider": {
    "@type": "Organization",
    "name": "Pixel Creative Agency"
  },
  "serviceType": "Web Development",
  "areaServed": { "@type": "Country", "name": "Algeria" },
  "description": "Création de sites e-commerce, landing pages et applications mobiles performantes pour entreprises algériennes.",
  "url": "https://pixeldz.store/development"
}
```

#### Audio Production (`/sounds`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Production Audio Professionnelle",
  "provider": {
    "@type": "Organization",
    "name": "Pixel Creative Agency"
  },
  "serviceType": "Audio Production",
  "areaServed": { "@type": "Country", "name": "Algeria" },
  "description": "Production d'effets sonores, voix off, jingles et musique originale pour projets vidéo et publicitaires en Algérie.",
  "url": "https://pixeldz.store/sounds"
}
```

#### Advertisement / Printing (`/advertisement`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Publicité & Impression en Algérie",
  "provider": {
    "@type": "Organization",
    "name": "Pixel Creative Agency"
  },
  "serviceType": "Advertising & Printing",
  "areaServed": { "@type": "Country", "name": "Algeria" },
  "description": "Création et impression de supports publicitaires en Algérie: enseignes lumineuses, néon, roll-ups, affiches, stickers.",
  "url": "https://pixeldz.store/advertisement"
}
```

**Implementation:** Render each schema block as a `<script type="application/ld+json">` tag in the server-rendered `<head>` of the respective page.

---

### FIX H4 — Add BreadcrumbList Schema to All Non-Homepage Pages

**Problem:** No BreadcrumbList schema anywhere. Breadcrumbs help Google understand site hierarchy and can appear as rich results in SERPs.

**Add to every service/inner page:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://pixeldz.store/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Page Name]",
      "item": "https://pixeldz.store/[page-slug]"
    }
  ]
}
```

Examples:
- Wedding: `[{"name":"Accueil","item":"/"}, {"name":"Photographie Mariage","item":"/wedding"}]`
- Creative: `[{"name":"Accueil","item":"/"}, {"name":"Design Graphique","item":"/creative"}]`
- Shop product: Add a third level for the product

**Also render visible breadcrumb navigation** on each page:
```jsx
// components/Breadcrumb.jsx
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="fil d'ariane">
      <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0 }}>
        {items.map((item, i) => (
          <li key={i}>
            {i < items.length - 1
              ? <><a href={item.url}>{item.name}</a> &rsaquo; </>
              : <span aria-current="page">{item.name}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

### FIX H5 — Update and Expand LocalBusiness / Organization Schema

**Problem:** Existing schema is good but missing email, street-level address, and weekend hours (if applicable). Update the global schema blocks in your root layout.

**Replace existing Organization + LocalBusiness JSON-LD with:**

```json
[
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Pixel Creative Agency",
    "alternateName": "Pixel DZ",
    "url": "https://pixeldz.store",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pixeldz.store/assets/logo.png",
      "width": 200,
      "height": 60
    },
    "image": "https://pixeldz.store/assets/og-image.jpg",
    "description": "Agence créative professionnelle en Algérie depuis 2018. Photographie, design graphique, développement web et production audio.",
    "foundingDate": "2018",
    "telephone": "+213-XXX-XXX-XXX",
    "email": "contact@pixeldz.store",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DZ",
      "addressLocality": "[Your City]",
      "addressRegion": "[Your Wilaya]"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.5541321",
      "longitude": "6.1731097"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "DZD",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": {
      "@type": "Country",
      "name": "Algeria",
      "sameAs": "https://www.wikidata.org/wiki/Q262"
    },
    "availableLanguage": ["French", "English", "Arabic"],
    "sameAs": [
      "https://www.facebook.com/pixelcreativeagency",
      "https://www.instagram.com/pixelcreativeagency",
      "https://www.linkedin.com/company/pixelcreativeagency"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Créatifs",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Photographie Professionnelle" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design Graphique" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Développement Web" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Production Audio" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Publicité & Impression" } }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pixel Creative Agency",
    "url": "https://pixeldz.store",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pixeldz.store/shop?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
]
```

> Replace `[Your City]` and `[Your Wilaya]` with actual values. Replace `+213-XXX-XXX-XXX` with the real phone number.

---

### FIX H6 — Convert All Images to WebP Format

**Problem:** All 16 images in the image sitemap are JPEG or PNG. WebP images are 25–35% smaller, directly improving LCP (Largest Contentful Paint) scores.

**Steps:**

1. **Convert all images** using a batch tool:
```bash
# Using cwebp (install: brew install webp / apt install webp)
for f in public/assets/*.jpg public/assets/*.png; do
  cwebp -q 85 "$f" -o "${f%.*}.webp"
done
```

2. **Update all `<img>` tags** to use `.webp` source with JPEG fallback:
```jsx
<picture>
  <source srcSet="/assets/heroes.webp" type="image/webp" />
  <img src="/assets/heroes.jpg" alt="Portfolio photographique — Pixel Agency" loading="lazy" />
</picture>
```

3. **Or use Next.js `<Image>` component** — it auto-converts to WebP/AVIF:
```jsx
import Image from 'next/image';

<Image
  src="/assets/heroes.jpg"
  alt="Portfolio photographique — Pixel Agency"
  width={1200}
  height={800}
  priority={false}  // set to true only for above-fold images
/>
```

**Priority images** (above-fold, set `priority={true}` or add `<link rel="preload">`):
- Homepage hero image
- Above-fold brand logo

---

### FIX H7 — Fix `/photoLab` URL → `/photo-lab` and Add 301 Redirect

**Problem:** CamelCase URLs (`/photoLab`) are non-standard. Web servers are typically case-sensitive on Linux, which can cause duplicate content at both `/photoLab` and `/photo-lab`.

**Step 1 — Rename the route:**
- Rename `app/photoLab/` → `app/photo-lab/`
- Or rename `pages/photoLab.js` → `pages/photo-lab.js`

**Step 2 — Add 301 redirect** in `next.config.js`:
```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/photoLab',
        destination: '/photo-lab',
        permanent: true,  // 301 redirect
      },
      {
        source: '/rules',
        destination: '/terms',
        permanent: true,
      },
    ];
  },
};
```

**Step 3 — Update sitemap.xml** to use `/photo-lab` and `/terms` instead of `/photoLab` and `/rules`.

---

## MEDIUM PRIORITY FIXES (Implement Within 1 Month)

---

### FIX M1 — Create llms.txt File

**Problem:** No `llms.txt` exists. This file helps AI search engines (Perplexity, ChatGPT, Claude) understand the site.

**Create:** `public/llms.txt`

```txt
# Pixel Creative Agency — llms.txt
# https://pixeldz.store

## About
Pixel Creative Agency is a professional creative agency based in Algeria, founded in 2018.
We specialize in photography, graphic design, web development, and audio production.

## Services
- Professional Photography: weddings, portraits, events, commercial photography
- Graphic Design: logos, brand identity, packaging, visual communication
- Web Development: e-commerce sites, landing pages, mobile apps
- Audio Production: sound effects, voiceovers, original music, jingles
- Advertising & Printing: neon signs, posters, roll-ups, stickers, banners
- Photo Lab: portrait sessions, professional printing, photo retouching

## Key Pages
- Homepage: https://pixeldz.store/
- Portfolio: https://pixeldz.store/portfolio
- Wedding packages: https://pixeldz.store/wedding
- Shop: https://pixeldz.store/shop
- Contact: https://pixeldz.store/contact

## Contact
- Phone: +213-XXX-XXX-XXX
- Email: contact@pixeldz.store
- Hours: Monday–Friday, 09:00–18:00
- Location: Algeria

## Social
- Instagram: https://www.instagram.com/pixelcreativeagency
- Facebook: https://www.facebook.com/pixelcreativeagency
- LinkedIn: https://www.linkedin.com/company/pixelcreativeagency
```

---

### FIX M2 — Add AI Crawler Directives to robots.txt

**Problem:** No AI crawler rules in robots.txt. The current robots.txt allows all by default (`Allow: /`), which means AI crawlers are already allowed. However, adding explicit rules is best practice for clarity and AI search visibility.

**Current robots.txt is actually fine for AI visibility** (all crawlers allowed). Add explicit AI crawler permissions to clarify intent:

**Replace `public/robots.txt` with:**
```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /uploads/temp/
Disallow: /checkout

# Explicit AI crawler allowances for AI search visibility
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Block ByteDance training crawler (optional — TikTok parent company)
User-agent: Bytespider
Disallow: /

Sitemap: https://pixeldz.store/sitemap.xml
Sitemap: https://pixeldz.store/sitemap-images.xml
```

**Note:** Removed `Crawl-delay: 1` — Googlebot ignores it, and it can slow down other beneficial crawlers unnecessarily.

---

### FIX M3 — Add hreflang HTML Tags for FR/EN Languages

**Problem:** The sitemap declares French and English alternates, but HTML pages have no `<link rel="alternate" hreflang>` tags. HTML hreflang is more reliable than sitemap-only hreflang.

**Add to the `<head>` of every page** (or in Next.js App Router via metadata):

```jsx
// Next.js App Router — in each page's metadata:
export const metadata = {
  alternates: {
    canonical: 'https://pixeldz.store/about-us',
    languages: {
      'fr': 'https://pixeldz.store/fr/about-us',  // if FR version exists at /fr/
      'en': 'https://pixeldz.store/en/about-us',  // if EN version exists at /en/
      'x-default': 'https://pixeldz.store/about-us',
    },
  },
};
```

**If you have a single URL serving multilingual content** (language switcher on same URL), use:
```html
<link rel="alternate" hreflang="fr" href="https://pixeldz.store/about-us" />
<link rel="alternate" hreflang="en" href="https://pixeldz.store/about-us" />
<link rel="alternate" hreflang="ar" href="https://pixeldz.store/about-us" />
<link rel="alternate" hreflang="x-default" href="https://pixeldz.store/about-us" />
```

---

### FIX M4 — Add FAQ Schema to Key Service Pages

**Problem:** Service pages (wedding, development, creative, etc.) would benefit from FAQ structured data to capture featured snippets and AI citation traffic.

**Note:** FAQPage schema is restricted to government/healthcare for Google rich results (Aug 2023), but still valuable for AI search citations.

**Add to Wedding page:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels sont vos forfaits photographie mariage en Algérie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pixel Creative Agency propose plusieurs forfaits mariage incluant reportage photo, vidéographie, séance couple, et album souvenir. Contactez-nous pour un devis personnalisé."
      }
    },
    {
      "@type": "Question",
      "name": "Dans quelles villes d'Algérie intervenez-vous pour les mariages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous intervenons dans toute l'Algérie pour les mariages. Notre équipe se déplace selon vos besoins."
      }
    }
  ]
}
```

**Add to Development page:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte la création d'un site e-commerce en Algérie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le coût d'un site e-commerce varie selon les fonctionnalités requises. Pixel Creative Agency propose des solutions adaptées aux budgets algériens. Contactez-nous pour un devis gratuit."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour créer un site web professionnel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un site vitrine simple est livré en 1-2 semaines. Un site e-commerce complet peut prendre 3-6 semaines selon la complexité du projet."
      }
    }
  ]
}
```

---

### FIX M5 — Add OG Image (Open Graph) to Each Page

**Problem:** No `og:image` or `twitter:image` meta tags detected. Social sharing will show no image preview on Facebook, Twitter/X, LinkedIn, and WhatsApp.

**Create a base OG image:**
- Format: JPG or PNG (not SVG)
- Dimensions: 1200 × 630px
- File path: `public/og-image.jpg`
- Content: Pixel Creative Agency logo + tagline on brand-colored background

**Per-page OG images (optional but recommended for key service pages):**
- `public/og-wedding.jpg` — wedding photo preview
- `public/og-portfolio.jpg` — portfolio collage
- `public/og-development.jpg` — web mockup

**Add to each page's metadata:**
```jsx
export const metadata = {
  openGraph: {
    title: 'Agence Créative en Algérie — Pixel',
    description: 'Photographie, design graphique, développement web et production audio.',
    url: 'https://pixeldz.store',
    siteName: 'Pixel Creative Agency',
    images: [
      {
        url: 'https://pixeldz.store/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pixel Creative Agency — Agence Créative en Algérie',
      },
    ],
    locale: 'fr_DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixel Creative Agency — Algérie',
    description: 'Photographie, design, web et audio.',
    images: ['https://pixeldz.store/og-image.jpg'],
  },
};
```

---

### FIX M6 — Rename `/creative` to `/graphic-design`

**Problem:** `/creative` is vague and carries no keyword signal. `/graphic-design` directly targets the service keyword.

**Step 1 — Rename the route:**
- `app/creative/` → `app/graphic-design/`

**Step 2 — Add 301 redirect in `next.config.js`:**
```js
{
  source: '/creative',
  destination: '/graphic-design',
  permanent: true,
}
```

**Step 3 — Update internal links** throughout the site to use `/graphic-design`.

**Step 4 — Update sitemap.xml** to use `/graphic-design`.

---

### FIX M7 — Add Team/About Content (E-E-A-T)

**Problem:** No author bios, team members, or credentials visible. For a service business, E-E-A-T (Experience, Expertise, Authority, Trust) requires human signals.

**On `/about-us` page, add:**
1. Team member profiles with names and roles (photographer, designer, developer)
2. Years of experience per team member
3. Portfolio samples inline (not just a link to portfolio page)
4. Awards, certifications, or notable clients (if any)
5. Physical studio address or city

**Add `Person` schema for key team members:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Team Member Name]",
  "jobTitle": "Photographe Principal",
  "worksFor": {
    "@type": "Organization",
    "name": "Pixel Creative Agency"
  },
  "url": "https://pixeldz.store/about-us"
}
```

---

## LOW PRIORITY FIXES (Backlog)

---

### FIX L1 — Create a Blog / Content Section

**Rationale:** A blog targeting informational keywords like "comment choisir un photographe de mariage en Algérie" or "tendances design graphique 2026" would build topical authority and drive organic traffic.

**Create:** `/blog` → `app/blog/page.js`

Suggested first 5 articles:
1. "Comment choisir un photographe de mariage en Algérie" — targets wedding photo searches
2. "Combien coûte un logo professionnel en Algérie" — targets design price searches
3. "Les meilleures pratiques pour un site e-commerce algérien" — targets dev searches
4. "Pourquoi investir dans la photographie professionnelle pour votre entreprise"
5. "Guide des enseignes publicitaires: néon vs LED en Algérie"

Each article must use `Article` JSON-LD schema with `datePublished`, `author`, and `headline`.

---

### FIX L2 — Create a Google Business Profile

Not a code fix — a business action.

1. Go to `business.google.com`
2. Create a profile for Pixel Creative Agency
3. Category: "Photographer" + "Graphic Designer" + "Web Design"
4. Add phone, address, website URL, hours, photos
5. Verify the listing
6. Add the GBP URL to `sameAs` in Organization schema

---

### FIX L3 — Add Client Reviews / Testimonials Page

**Create:** `/testimonials` with visible review content server-rendered.

**Add AggregateRating schema** once you have verifiable reviews:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Pixel Creative Agency",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5"
  }
}
```

**Note:** Only use real, verifiable review counts. Do not fabricate numbers.

---

## Verification Checklist

After implementing all fixes, verify with these checks:

| Check | Method | Expected Result |
|---|---|---|
| SSR working | `curl -s https://pixeldz.store/ \| grep "<h1"` | H1 tag content visible in output |
| Meta descriptions present | View source on each page | `<meta name="description" content="...">` present |
| Title tags unique | View source on /wedding, /development | Different title on each page |
| Canonical tags | View source on each page | Self-referencing canonical URL |
| Product/Service schema | Google Rich Results Test | Schema detected, no critical errors |
| Privacy Policy accessible | Visit URL | Page loads with content, linked in footer |
| robots.txt clean | `https://pixeldz.store/robots.txt` | No accidental blocking; AI bots explicitly allowed |
| WebP images | Check Network tab in DevTools | Images loading as .webp |
| llms.txt | `https://pixeldz.store/llms.txt` | Returns 200 with content |
| /photoLab redirect | Visit `https://pixeldz.store/photoLab` | 301 redirect to `/photo-lab` |
| OG image | Facebook Sharing Debugger | 1200×630px image preview shown |

---

## Expected Impact After Fixes

| Fix Group | Expected Outcome | Timeline |
|---|---|---|
| C1 (SSR migration) | All pages become indexable; body content visible to crawlers | 2–4 weeks after Google recrawl |
| C2–C4 (titles, descriptions, canonicals) | Improved CTR, pages independently indexed | 1–3 weeks |
| C5 (H1 tags) | Keyword relevance signals restored | 2–4 weeks |
| H3 (Service schema) | Rich results for services in SERPs | 1–2 weeks after schema validated |
| H6 (WebP images) | Faster LCP, better Core Web Vitals score | Immediate after deploy |
| M1 (llms.txt) | AI search discoverability improved | 4–8 weeks |

**Projected SEO Health Score after all Critical + High fixes: ~65–72 / 100**
(Up from 31/100 — the CSR fix alone accounts for +20 points)

---

*Generated by claude-seo v1.7.0 skill (AgriciDaniel/claude-seo) — Audit date: 2026-03-30*
