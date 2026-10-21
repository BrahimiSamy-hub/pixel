import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

const tones = {
  teal: '#4bb1af',
  yellow: '#ebba3a',
  red: '#e24a5e',
  lime: '#acc544',
  violet: '#858dff',
  orange: '#f18a27',
} as const

const HEX = 'M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z'

/**
 * Brand OG card. Text stays Latin (studio brand names) on purpose: the default OG font
 * has no Arabic glyphs, and the same card works for every locale.
 */
export function brandOgImage({ title, kicker, tone = 'orange' }: { title: string; kicker: string; tone?: keyof typeof tones }) {
  const color = tones[tone]
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0e0c15', color: '#fff', padding: 72, position: 'relative', fontFamily: 'sans-serif' }}>
        <svg width="560" height="640" viewBox="0 0 100 100" style={{ position: 'absolute', right: -120, top: -60 }}>
          <path d={HEX} fill="#15131d" />
        </svg>
        <svg width="140" height="160" viewBox="0 0 100 100" style={{ position: 'absolute', right: 140, top: 120 }}>
          <path d={HEX} fill={color} />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="44" height="50" viewBox="0 0 100 100">
              <path d={HEX} fill="#f18a27" />
            </svg>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>Pixel Creative Agency</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
            <span style={{ fontSize: 26, color, textTransform: 'uppercase', letterSpacing: 4 }}>{kicker}</span>
            <span style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#ada8c3' }}>
            <span>Batna · Algeria · since 2018</span>
            <span>pixeldz.store</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  )
}
