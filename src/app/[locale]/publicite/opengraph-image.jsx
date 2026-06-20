import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Panneau Publicitaire & Enseigne Lumineuse — Pixel Creative Agency Algérie'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0C15',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#F17A28' }} />
        <div style={{ color: '#F17A28', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '24px' }}>
          Pixel Creative Agency · Algérie
        </div>
        <div style={{ color: 'white', fontSize: '58px', fontWeight: '900', lineHeight: '1.1', maxWidth: '820px' }}>
          Panneaux Publicitaires & Enseignes Lumineuses
        </div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '22px', marginTop: '28px' }}>
          Néon · Bâches · Roll-ups · Impression grand format
        </div>
        <div style={{ position: 'absolute', bottom: '64px', right: '64px', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
          pixeldz.store
        </div>
      </div>
    ),
    { ...size }
  )
}
