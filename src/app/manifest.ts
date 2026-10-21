import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Pixel',
    description: 'Agence créative à Batna — photo, vidéo, design, web, son et publicité.',
    start_url: '/fr',
    scope: '/',
    display: 'standalone',
    background_color: '#0e0c15',
    theme_color: '#0e0c15',
    lang: 'fr',
    categories: ['business', 'photography', 'design'],
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
