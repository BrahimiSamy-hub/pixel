import 'server-only'
import QRCode from 'qrcode'

export type QrOptions = {
  format: 'svg' | 'png'
  /** PNG width in pixels. */
  size?: number
  dark?: string
  /** `transparent` for a see-through background. */
  light?: string
}

const HEX = /^#?([0-9a-f]{6})$/i

function color(value: string | null | undefined, fallback: string) {
  if (value === 'transparent') return '#00000000'
  const match = value ? HEX.exec(value) : null
  return match ? `#${match[1]}` : fallback
}

/** Reads `format`, `size`, `dark` and `light` from a query string. */
export function qrOptionsFromSearch(params: URLSearchParams): QrOptions {
  const size = Number(params.get('size'))
  return {
    format: params.get('format') === 'png' ? 'png' : 'svg',
    size: Number.isFinite(size) && size >= 256 ? Math.min(size, 4096) : 2048,
    dark: color(params.get('dark'), '#000000'),
    light: color(params.get('light'), '#ffffff'),
  }
}

/**
 * Error correction H (30 %) so the code still scans when printed small, slightly worn,
 * or when a designer places a logo over its centre. Margin 2 keeps the quiet zone.
 */
export async function renderQr(url: string, options: QrOptions) {
  const common = {
    errorCorrectionLevel: 'H' as const,
    margin: 2,
    color: { dark: options.dark ?? '#000000', light: options.light ?? '#ffffff' },
  }
  if (options.format === 'svg') {
    const svg = await QRCode.toString(url, { ...common, type: 'svg' })
    return { body: svg, contentType: 'image/svg+xml; charset=utf-8', extension: 'svg' }
  }
  const png = await QRCode.toBuffer(url, { ...common, type: 'png', width: options.size ?? 2048 })
  return { body: new Uint8Array(png), contentType: 'image/png', extension: 'png' }
}

export function qrResponse(rendered: Awaited<ReturnType<typeof renderQr>>, filename: string, download: boolean) {
  return new Response(rendered.body, {
    headers: {
      'Content-Type': rendered.contentType,
      'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${filename}.${rendered.extension}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
