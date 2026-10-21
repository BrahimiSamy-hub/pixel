import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/*/paiement'] },
      // Explicitly welcome AI search crawlers (kept from the previous robots.txt).
      { userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'], allow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: [`${site.url}/sitemap.xml`, `${site.url}/sitemap-images.xml`],
    host: site.url,
  }
}
