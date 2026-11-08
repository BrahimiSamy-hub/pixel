import {
  siBehance,
  siFacebook,
  siGithub,
  siInstagram,
  siPinterest,
  siSnapchat,
  siTelegram,
  siThreads,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
} from 'simple-icons'
import type { SocialPlatform } from '@/server/card-schema'

// LinkedIn was removed from simple-icons at the brand's request; this is the public "in" mark.
const linkedinPath =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z'

export const socialMeta: Record<SocialPlatform | 'whatsapp', { name: string; path: string; color: string }> = {
  instagram: { name: 'Instagram', path: siInstagram.path, color: '#E4405F' },
  facebook: { name: 'Facebook', path: siFacebook.path, color: `#${siFacebook.hex}` },
  tiktok: { name: 'TikTok', path: siTiktok.path, color: '#111111' },
  linkedin: { name: 'LinkedIn', path: linkedinPath, color: '#0A66C2' },
  x: { name: 'X', path: siX.path, color: '#111111' },
  youtube: { name: 'YouTube', path: siYoutube.path, color: `#${siYoutube.hex}` },
  snapchat: { name: 'Snapchat', path: siSnapchat.path, color: '#FFFC00' },
  telegram: { name: 'Telegram', path: siTelegram.path, color: `#${siTelegram.hex}` },
  threads: { name: 'Threads', path: siThreads.path, color: '#111111' },
  pinterest: { name: 'Pinterest', path: siPinterest.path, color: `#${siPinterest.hex}` },
  behance: { name: 'Behance', path: siBehance.path, color: `#${siBehance.hex}` },
  github: { name: 'GitHub', path: siGithub.path, color: '#181717' },
  whatsapp: { name: 'WhatsApp', path: siWhatsapp.path, color: `#${siWhatsapp.hex}` },
}

export function SocialIcon({ platform, size = 22 }: { platform: SocialPlatform | 'whatsapp'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d={socialMeta[platform].path} />
    </svg>
  )
}
