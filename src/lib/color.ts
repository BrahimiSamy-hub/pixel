// Colour maths for client themes: a logo colour is rarely readable as-is on every
// background, so themes derive "safe" variants that keep WCAG AA contrast.

type Rgb = [number, number, number]

export function hexToRgb(hex: string): Rgb {
  const v = hex.replace('#', '')
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
}

export function rgbToHex([r, g, b]: Rgb) {
  return `#${[r, g, b].map((c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0')).join('')}`
}

export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }) as Rgb
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** Linear mix: t = 0 → a, t = 1 → b. */
export function mix(a: string, b: string, t: number) {
  const x = hexToRgb(a)
  const y = hexToRgb(b)
  return rgbToHex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t])
}

/** Black or white, whichever reads better on `bg`. */
export function onColor(bg: string) {
  return contrast(bg, '#ffffff') >= contrast(bg, '#111111') ? '#ffffff' : '#111111'
}

/** Moves `color` toward white or black until it reaches `ratio` against `bg`. */
export function ensureContrast(color: string, bg: string, ratio = 4.5) {
  if (contrast(color, bg) >= ratio) return color
  const target = luminance(bg) < 0.4 ? '#ffffff' : '#000000'
  for (let t = 0.1; t <= 1; t += 0.1) {
    const candidate = mix(color, target, t)
    if (contrast(candidate, bg) >= ratio) return candidate
  }
  return target
}
