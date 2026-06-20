import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'gsap',
    'framer-motion',
    'swiper',
    'react-photo-view',
    'react-icons',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.pixeldz.store',
      },
      {
        protocol: 'https',
        hostname: 'pixeldz.store',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)\\.(ico|png|svg|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  async redirects() {
    const locales = ['fr', 'en', 'ar']
    const slugPairs = [
      { from: 'about-us', to: 'a-propos' },
      { from: 'advertisement', to: 'publicite' },
      { from: 'checkout', to: 'paiement' },
      { from: 'development', to: 'developpement' },
      { from: 'graphic-design', to: 'design-graphique' },
      { from: 'privacy-policy', to: 'politique-de-confidentialite' },
      { from: 'shop', to: 'boutique' },
      { from: 'sounds', to: 'sons' },
      { from: 'terms', to: 'loup-garou-regles' },
      { from: 'testimonials', to: 'temoignages' },
      { from: 'wedding', to: 'mariage' },
    ]

    const redirects = []

    for (const locale of locales) {
      for (const { from, to } of slugPairs) {
        redirects.push({
          source: `/${locale}/${from}`,
          destination: `/${locale}/${to}`,
          permanent: true,
        })
        redirects.push({
          source: `/${from}`,
          destination: `/${to}`,
          permanent: true,
        })
      }
    }
    return redirects
  },
}

export default withNextIntl(nextConfig)
