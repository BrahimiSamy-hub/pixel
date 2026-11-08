import type { CardLang } from '@/server/card-schema'

// Landing pages live outside the next-intl tree (/c/…), so their few labels live here.
const dict = {
  fr: {
    call: 'Appeler',
    phone: 'Téléphone',
    whatsapp: 'WhatsApp',
    email: 'E-mail',
    directions: 'Itinéraire',
    website: 'Site web',
    saveContact: 'Enregistrer le contact',
    follow: 'Réseaux sociaux',
    links: 'Liens',
    contact: 'Contact',
    location: 'Adresse',
    openMaps: 'Ouvrir dans Maps',
    share: 'Partager',
    copied: 'Lien copié',
    madeBy: 'Carte digitale par',
    language: 'Langue',
  },
  en: {
    call: 'Call',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    email: 'Email',
    directions: 'Directions',
    website: 'Website',
    saveContact: 'Save contact',
    follow: 'Social media',
    links: 'Links',
    contact: 'Contact',
    location: 'Address',
    openMaps: 'Open in Maps',
    share: 'Share',
    copied: 'Link copied',
    madeBy: 'Digital card by',
    language: 'Language',
  },
  ar: {
    call: 'اتصال',
    phone: 'الهاتف',
    whatsapp: 'واتساب',
    email: 'البريد',
    directions: 'الاتجاهات',
    website: 'الموقع',
    saveContact: 'حفظ جهة الاتصال',
    follow: 'مواقع التواصل',
    links: 'روابط',
    contact: 'التواصل',
    location: 'العنوان',
    openMaps: 'فتح في الخرائط',
    share: 'مشاركة',
    copied: 'تم نسخ الرابط',
    madeBy: 'بطاقة رقمية من',
    language: 'اللغة',
  },
} satisfies Record<CardLang, Record<string, string>>

export type CardDict = (typeof dict)['fr']

export function cardDict(lang: CardLang): CardDict {
  return dict[lang]
}

export const langNames: Record<CardLang, string> = { fr: 'Français', en: 'English', ar: 'العربية' }
