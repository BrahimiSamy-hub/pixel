import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Old English slugs that were indexed before the French slugs became canonical.
const legacySlugs: Array<[from: string, to: string]> = [
  ['about-us', 'a-propos'],
  ['advertisement', 'publicite'],
  ['checkout', 'paiement'],
  ['development', 'developpement'],
  ['graphic-design', 'design-graphique'],
  ['privacy-policy', 'politique-de-confidentialite'],
  ['shop', 'boutique'],
  ['sounds', 'sons'],
  ['terms', 'loup-garou-regles'],
  ['testimonials', 'temoignages'],
  ['wedding', 'mariage'],
]

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  serverExternalPackages: ['@libsql/client', 'sharp'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'api.pixeldz.store', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'img.youtube.com', pathname: '/vi/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        // The app API authenticates with bearer tokens, never cookies, so allowing any
        // origin is safe (browsers do not attach the token on their own). Needed for Expo web.
        source: '/api/v1/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type, Accept' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
      {
        source: '/:file*.(ico|png|svg|jpg|jpeg|webp|avif|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  async redirects() {
    return legacySlugs.flatMap(([from, to]) => [
      { source: `/:locale(fr|en|ar)/${from}`, destination: `/:locale/${to}`, permanent: true },
      { source: `/${from}`, destination: `/fr/${to}`, permanent: true },
    ])
  },
}

export default withNextIntl(nextConfig)
