import 'server-only'
import type { CardData } from './card-schema'

// vCard 3.0: the version both iOS and Android contacts import without complaint.
const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')

/** RFC 6350 line folding at 75 octets. */
function fold(line: string) {
  const out: string[] = []
  let rest = line
  while (Buffer.byteLength(rest) > 75) {
    let cut = 75
    while (Buffer.byteLength(rest.slice(0, cut)) > 75) cut--
    out.push(rest.slice(0, cut))
    rest = ` ${rest.slice(cut)}`
  }
  out.push(rest)
  return out.join('\r\n')
}

export function buildVCard(card: CardData, pageUrl: string, photo?: { base64: string; type: string }) {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${escape(card.displayName)}`, `N:;${escape(card.displayName)};;;`]
  if (card.company) lines.push(`ORG:${escape(card.company)}`)
  if (card.title) lines.push(`TITLE:${escape(card.title)}`)
  for (const p of card.phones) lines.push(`TEL;TYPE=${p.label ? escape(p.label) : 'CELL'}:${p.number.replace(/[^+0-9]/g, '')}`)
  if (card.whatsapp) lines.push(`TEL;TYPE=WHATSAPP:${card.whatsapp.replace(/[^+0-9]/g, '')}`)
  for (const e of card.emails) lines.push(`EMAIL;TYPE=INTERNET:${escape(e.address)}`)
  if (card.address) lines.push(`ADR;TYPE=WORK:;;${escape(card.address)};;;;`)
  if (card.website) lines.push(`URL:${card.website}`)
  lines.push(`URL;TYPE=Pixel:${pageUrl}`)
  for (const s of card.socials) lines.push(`X-SOCIALPROFILE;TYPE=${s.platform}:${s.url}`)
  if (card.bio) lines.push(`NOTE:${escape(card.bio)}`)
  if (photo) lines.push(`PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`)
  lines.push('END:VCARD')
  return lines.map(fold).join('\r\n') + '\r\n'
}
