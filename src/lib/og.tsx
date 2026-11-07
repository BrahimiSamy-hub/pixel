import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

const tones = {
  teal: '#ee7d22',
  yellow: '#f6a43d',
  red: '#ee7d22',
  lime: '#ee7d22',
  violet: '#ee7d22',
  orange: '#ee7d22',
} as const

// The P symbol, normalised to a 100×100 box.
const HEX = 'M0 7.7 L32.2 25.5 L67.3 0 L100 29.2 L100 57.4 L67.2 86.3 L37.8 66 L37.8 100 L0 83 Z'

/**
 * Brand OG card. Text stays Latin (studio brand names) on purpose: the default OG font
 * has no Arabic glyphs, and the same card works for every locale.
 */
export function brandOgImage({ title, kicker, tone = 'orange' }: { title: string; kicker: string; tone?: keyof typeof tones }) {
  const color = tones[tone]
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0f1010', color: '#f0efef', padding: 72, position: 'relative', fontFamily: 'sans-serif' }}>
        <svg width="560" height="640" viewBox="0 0 100 100" style={{ position: 'absolute', right: -120, top: -60 }}>
          <path d={HEX} fill="#1e1f1f" />
        </svg>
        <svg width="140" height="160" viewBox="0 0 100 100" style={{ position: 'absolute', right: 140, top: 120 }}>
          <path d={HEX} fill={color} />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="44" height="50" viewBox="0 0 100 100">
              <path d={HEX} fill="#ee7d22" />
            </svg>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>Pixel Creative Agency</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
            <span style={{ fontSize: 26, color, textTransform: 'uppercase', letterSpacing: 4 }}>{kicker}</span>
            <span style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#a6a3a0' }}>
            <span>Batna · Algeria · since 2018</span>
            <span>pixeldz.store</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  )
}
