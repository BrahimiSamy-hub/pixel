// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/**
 * Tapini: NFC products and connected services, from "Tapini.pdf" (prototype n° 6, 9 Nov 2026).
 * `null` = "À définir" → shown as "Sur devis".
 */
import { l, type L10n, type Price, type QuoteLine, type Lang } from './core'

export type TapiniProduct = { id: string; label: L10n; hint: L10n; price: Price }

export const tapiniProducts: readonly TapiniProduct[] = [
  { id: 'TP-01', label: l('Carte de visite PVC', 'PVC business card', 'بطاقة زيارة PVC'), hint: l('Un geste du téléphone partage vos contacts', 'One tap shares your contact details', 'لمسة هاتف تشارك معلوماتك'), price: 3500 },
  { id: 'TP-02', label: l('Carte de visite PVC personnalisée', 'Custom PVC business card', 'بطاقة زيارة PVC مخصصة'), hint: l('Votre design, votre logo, la puce NFC', 'Your design, your logo, the NFC chip', 'تصميمك وشعارك مع شريحة NFC'), price: 4000 },
  { id: 'TP-03', label: l('Menu statique personnalisé', 'Custom static menu', 'قائمة ثابتة مخصصة'), hint: l('Le client approche son téléphone, le menu s’ouvre', 'Customers tap their phone, the menu opens', 'يقرّب الزبون هاتفه فتفتح القائمة'), price: null },
  { id: 'TP-04', label: l('Menu simple avec borne de commande', 'Simple menu with ordering kiosk', 'قائمة بسيطة مع نقطة طلب'), hint: l('Commande directe depuis la table', 'Order straight from the table', 'الطلب مباشرة من الطاولة'), price: null },
  { id: 'TP-05', label: l('Menu personnalisé avec borne de commande', 'Custom menu with ordering kiosk', 'قائمة مخصصة مع نقطة طلب'), hint: l('Votre identité, commande à table', 'Your branding, ordering at the table', 'هويتك، والطلب من الطاولة'), price: null },
  { id: 'TP-06', label: l('Carte avis Google', 'Google review card', 'بطاقة تقييمات Google'), hint: l('Plus d’avis : un geste ouvre votre page d’avis', 'More reviews: one tap opens your review page', 'تقييمات أكثر: لمسة تفتح صفحة التقييم'), price: null },
  { id: 'TP-07', label: l('Carte réseaux sociaux', 'Social media card', 'بطاقة مواقع التواصل'), hint: l('Instagram, TikTok, Facebook en un geste', 'Instagram, TikTok, Facebook in one tap', 'إنستغرام وتيك توك وفيسبوك بلمسة'), price: null },
  { id: 'TP-08', label: l('Carte de fidélité', 'Loyalty card', 'بطاقة الوفاء'), hint: l('Récompensez vos clients réguliers', 'Reward your regular customers', 'كافئ زبائنك الأوفياء'), price: null },
  { id: 'TP-09', label: l('Carte de contacts', 'Contacts card', 'بطاقة جهات الاتصال'), hint: l('Toutes vos coordonnées à enregistrer', 'All your details, ready to save', 'كل معلوماتك جاهزة للحفظ'), price: null },
  { id: 'TP-10', label: l('Sticker NFC', 'NFC sticker', 'ملصق NFC'), hint: l('À coller sur un comptoir, une vitrine, un produit', 'Stick it on a counter, window or product', 'يُلصق على منضدة أو واجهة أو منتج'), price: 2000 },
]

export type TapiniState = Partial<Record<string, number>>

export function tapiniLines(s: TapiniState, lang: Lang): QuoteLine[] {
  return tapiniProducts.flatMap((p) => {
    const qty = s[p.id]
    if (!qty) return []
    return [{ label: p.label[lang], detail: `× ${qty}`, amount: p.price === null ? null : p.price * qty }]
  })
}

export const tapini = {
  title: l('Supports & services connectés', 'Connected supports & services', 'وسائط وخدمات متصلة'),
  intro: l(
    'Choisissez vos supports NFC et leurs quantités. Prix à la pièce ; les autres services sont sur devis.',
    'Pick your NFC products and quantities. Prices per piece; other services are on quote.',
    'اختر وسائط NFC وكمياتها. الأسعار بالقطعة؛ الخدمات الأخرى حسب الطلب.',
  ),
  cardLink: l('Votre carte digitale Pixel', 'Your Pixel digital card', 'بطاقتك الرقمية من Pixel'),
  cardLinkHint: l(
    'Une carte NFC peut ouvrir directement votre carte digitale, déjà dans l’app.',
    'An NFC card can open your digital card, already in the app.',
    'يمكن لبطاقة NFC أن تفتح مباشرة بطاقتك الرقمية الموجودة في التطبيق.',
  ),
  notes: l('Texte, liens ou design à mettre sur vos supports', 'Text, links or design for your products', 'النص أو الروابط أو التصميم المطلوب'),
}
