// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/** Pixel Sounds: voice & sound offers from "Sounds.pdf" (prototype n° 4, 9 Nov 2026). */
import { l, type L10n, type Price, type QuoteLine, type Lang } from './core'

export type SoundOffer = { id: 'SND-01' | 'SND-02' | 'SND-03'; label: L10n; desc: L10n; price: Price; from?: boolean; voice: boolean }

export const soundOffers: readonly SoundOffer[] = [
  { id: 'SND-01', label: l('VoiceOver', 'Voice-over', 'تعليق صوتي'), desc: l('Une voix professionnelle pour vos pubs, vidéos et messages.', 'A professional voice for your ads, videos and messages.', 'صوت احترافي لإعلاناتك وفيديوهاتك ورسائلك.'), price: 5000, from: true, voice: true },
  { id: 'SND-02', label: l('VoiceOver IA', 'AI voice-over', 'تعليق صوتي بالذكاء الاصطناعي'), desc: l('Une voix générée par IA, rapide et économique.', 'An AI-generated voice, fast and affordable.', 'صوت مولّد بالذكاء الاصطناعي، سريع واقتصادي.'), price: null, voice: true },
  { id: 'SND-03', label: l('Création soundtrack originale', 'Original soundtrack', 'موسيقى تصويرية أصلية'), desc: l('Une bande-son composée pour votre marque ou votre film.', 'A soundtrack composed for your brand or film.', 'موسيقى مؤلفة لعلامتك أو فيلمك.'), price: null, voice: false },
]

export const voices = [
  { id: 'male', label: l('Homme', 'Male', 'رجل') },
  { id: 'female', label: l('Femme', 'Female', 'امرأة') },
  { id: 'both', label: l('Les deux', 'Both', 'الاثنان') },
] as const

export const voiceLangs = [
  { id: 'fr', label: l('Français', 'French', 'الفرنسية') },
  { id: 'en', label: l('Anglais', 'English', 'الإنجليزية') },
  { id: 'ar', label: l('Arabe', 'Arabic', 'العربية') },
  { id: 'darija', label: l('Darija', 'Darija', 'الدارجة') },
] as const

export const sounds = {
  title: l('Voix & création sonore', 'Voice & sound design', 'الصوت والإبداع الصوتي'),
  voiceTitle: l('Voix', 'Voice', 'الصوت'),
  langTitle: l('Langues', 'Languages', 'اللغات'),
  script: l('Votre texte ou votre idée (durée, ton, usage)', 'Your script or idea (length, tone, use)', 'نصك أو فكرتك (المدة، النبرة، الاستعمال)'),
}

export type SoundsState = { offers: string[]; voice: string | null; langs: string[] }

export function soundLines(s: SoundsState, lang: Lang): QuoteLine[] {
  return soundOffers
    .filter((o) => s.offers.includes(o.id))
    .map((o) => {
      const voice = o.voice ? [voices.find((v) => v.id === s.voice)?.label[lang], voiceLangs.filter((x) => s.langs.includes(x.id)).map((x) => x.label[lang]).join(', ')].filter(Boolean).join(' · ') : ''
      // "À partir de 5 000 DA": the base counts in the estimate, the final price follows the script.
      return { label: o.label[lang], detail: voice || undefined, amount: o.price }
    })
}
