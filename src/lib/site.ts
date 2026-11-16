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
  /**
   * The studios' maps (About page toggle). Batna is the agency's Google Maps place; Algiers shows
   * the city until its studio has its own place: swap in its "Share > Embed a map" URL then.
   */
  studios: {
    batna: {
      embed:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12984.668506192997!2d6.1845218!3d35.54957445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1794835788193!5m2!1sfr!2sdz',
    },
    algiers: {
      embed: 'https://maps.google.com/maps?q=Alger%2C%20Alg%C3%A9rie&z=12&output=embed',
    },
  },
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
