import { ensureContrast, mix, onColor } from '@/lib/color'
import type { CardTheme } from '@/server/card-schema'

/**
 * CSS custom properties for a client page. Each theme has its own background, and the
 * client's colours are nudged until they read well on it (WCAG AA for text).
 */
export function themeVars(theme: CardTheme, colors: { primary: string; accent: string }) {
  const { primary: p, accent: a } = colors
  const bg = {
    aurora: '#0b0b10',
    minimal: '#fafaf9',
    bold: p,
    card: mix(p, '#ffffff', 0.9),
    elegant: mix(p, '#000000', 0.84),
  }[theme]
  // Surfaces where body text sits.
  const surface = { aurora: '#16161d', minimal: '#ffffff', bold: '#ffffff', card: '#ffffff', elegant: mix(p, '#000000', 0.76) }[theme]
  const ink = onColor(surface)

  // These are inline styles, so they win over the stylesheet: theme-specific values go here.
  return {
    '--p': p,
    '--a': a,
    '--on-p': onColor(p),
    '--on-a': onColor(a),
    '--bg': bg,
    '--on-bg': onColor(bg),
    // Aurora uses frosted glass; contrast below is still computed against its opaque equivalent.
    '--surface': theme === 'aurora' ? 'rgb(255 255 255 / 0.07)' : surface,
    '--ink': ink,
    // Brand colours safe to use as text or icons on the surface / page background.
    '--p-text': ensureContrast(p, surface),
    '--a-text': ensureContrast(a, surface),
    '--p-on-bg': ensureContrast(p, bg),
    '--a-on-bg': ensureContrast(a, bg),
  } as Record<string, string>
}
