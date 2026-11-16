import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import type { ServiceId } from '@/lib/studios'

export const ogSize = { width: 1200, height: 630 }

/** Sub-brand accents (globals.css) and the app's brand gradients, for the bottom bar. */
const brands: Record<ServiceId | 'pixel', { accent: string; from: string; to: string }> = {
  pixel: { accent: '#ee7d22', from: '#e75924', to: '#f6a43d' },
  creative: { accent: '#e76e3f', from: '#d46136', to: '#e0743f' },
  photo: { accent: '#34a668', from: '#214915', to: '#3a8444' },
  dev: { accent: '#5297cc', from: '#142d4f', to: '#2b65a5' },
  events: { accent: '#f5b4d1', from: '#ebabd2', to: '#bb6b94' },
  sounds: { accent: '#80949b', from: '#606669', to: '#75858a' },
  enseigne: { accent: '#f16366', from: '#731914', to: '#c9332d' },
  tapini: { accent: '#2ec4b6', from: '#0b6e6e', to: '#2ec4b6' },
}

// Paths stay scoped to the two logo folders so the build only traces those files.
const svgData = (file: Buffer) => `data:image/svg+xml;base64,${file.toString('base64')}`
const serviceLogo = (service: ServiceId) => readFileSync(join(process.cwd(), 'src/assets/services/logos', `${service}.svg`))
const pixelLockup = () => readFileSync(join(process.cwd(), 'src/assets/brand', 'pixel-lockup-dark.svg'))
/** Archivo, the site's typeface (OFL), in the weights the card uses. */
const archivo = (file: string) => readFileSync(join(process.cwd(), 'src/assets/fonts', file))

/** Same 2.66:1 artboard for the Pixel lockup and the sub-brand logos. */
const LOGO_RATIO = 3064.3 / 1153.9

// The P symbol, normalised to a 100×100 box (watermark).
const MARK = 'M0 7.7 L32.2 25.5 L67.3 0 L100 29.2 L100 57.4 L67.2 86.3 L37.8 66 L37.8 100 L0 83 Z'

/**
 * Share card (1200×630) in the site's dark identity: the Pixel lockup, or the sub-brand logo on a
 * service page, then the kicker in the brand colour, a large title, both studios and the address,
 * and the brand gradient along the bottom. Latin text only: Archivo has no Arabic.
 */
export function brandOgImage({ title, kicker, service }: { title: string; kicker: string; service?: ServiceId }) {
  const brand = brands[service ?? 'pixel']
  // Tapini has no logo yet: its pages keep the Pixel lockup.
  const logo = service && service !== 'tapini' ? serviceLogo(service) : pixelLockup()
  const logoHeight = 96

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0f1010', color: '#f0efef', position: 'relative', fontFamily: 'Archivo' }}>
        <svg width="620" height="700" viewBox="0 0 100 100" style={{ position: 'absolute', right: -150, top: -40 }}>
          <path d={MARK} fill="#151616" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '64px 72px 76px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={svgData(logo)} alt="" width={Math.round(logoHeight * LOGO_RATIO)} height={logoHeight} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 900 }}>
            <span style={{ fontSize: 26, color: brand.accent, textTransform: 'uppercase', letterSpacing: 5, fontWeight: 700 }}>{kicker}</span>
            <span style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>{title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#a6a3a0' }}>
            <span>Algiers · Batna · Algeria · since 2018</span>
            <span>pixelcreativeagency.net</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, display: 'flex', backgroundImage: `linear-gradient(90deg, ${brand.from}, ${brand.to})` }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Archivo', data: archivo('Archivo_400Regular.ttf'), weight: 400, style: 'normal' },
        { name: 'Archivo', data: archivo('Archivo_700Bold.ttf'), weight: 700, style: 'normal' },
        { name: 'Archivo', data: archivo('Archivo_800ExtraBold.ttf'), weight: 800, style: 'normal' },
      ],
    },
  )
}
