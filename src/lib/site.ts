export const site = {
  name: 'Pixel Creative Agency',
  url: 'https://pixelcreativeagency.net',
  api: 'https://api.pixeldz.store',
  email: 'contact@pixeldz.store',
  // One number for calls and WhatsApp.
  phone: { display: '0770 69 69 82', href: 'tel:+213770696982', e164: '+213770696982' },
  whatsapp: { display: '0770 69 69 82', href: 'https://wa.me/213770696982', e164: '+213770696982' },
  foundingYear: 2018,
  // Studios in Algiers and Batna; Batna is the registered address used in structured data.
  address: { city: 'Batna', region: 'Batna', country: 'DZ' },
  geo: { latitude: 35.5541, longitude: 6.1731 },
  mapsUrl: 'https://maps.google.com/?q=Pixel+Creative+Agency+Batna',
  socials: {
    instagram: { href: 'https://www.instagram.com/_pixeldz', handle: '@_pixeldz' },
    tiktok: { href: 'https://www.tiktok.com/@pixel.creativeagency', handle: '@pixel.creativeagency' },
    facebook: { href: 'https://www.facebook.com/pixel.lab.3110', handle: 'pixel.lab' },
  },
  gaId: 'G-86F35330NS',
  // Shown in the UI and in structured data — keep in sync with the Google Business profile.
  rating: { value: 4.8, best: 5 },
  privacyUpdatedAt: '2026-11-13',
} as const
