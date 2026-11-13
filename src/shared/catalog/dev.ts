// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/** Pixel Dev: development quote request from "Devlopement.pdf". All projects are on quote. */
import { l, type QuoteLine, type Lang } from './core'

export const devProjects = [
  { id: 'vitrine', label: l('Site web vitrine', 'Showcase website', 'موقع تعريفي') },
  { id: 'ecommerce', label: l('Site e-commerce', 'E-commerce website', 'متجر إلكتروني') },
  { id: 'mobile', label: l('Application mobile', 'Mobile app', 'تطبيق جوال') },
  { id: 'platform', label: l('Plateforme digitale', 'Digital platform', 'منصة رقمية') },
  { id: 'custom', label: l('Solution digitale sur mesure', 'Custom digital solution', 'حل رقمي حسب الطلب') },
] as const

export const dev = {
  title: l('Votre projet', 'Your project', 'مشروعك'),
  current: l('Site actuel, si disponible', 'Current website, if any', 'الموقع الحالي إن وجد'),
  goal: l('Que souhaitez-vous permettre à vos clients ou à votre équipe de faire ?', 'What should your customers or team be able to do?', 'ماذا تريد أن يتمكن زبائنك أو فريقك من فعله؟'),
  includedTitle: l('Inclus dans chaque projet', 'Included in every project', 'مشمول في كل مشروع'),
  included: [
    l('Nom de domaine', 'Domain name', 'اسم النطاق'),
    l('Hébergement', 'Hosting', 'الاستضافة'),
    l('Maintenance', 'Maintenance', 'الصيانة'),
  ],
  includedNote: l('Le devis précisera leur durée et les modalités de renouvellement.', 'The quote states their duration and renewal terms.', 'يحدد العرض مدتها وشروط تجديدها.'),
  emails: l('Adresses e-mail professionnelles (en supplément)', 'Professional email addresses (extra)', 'عناوين بريد احترافية (إضافية)'),
  emailsCount: l('Nombre d’adresses', 'Number of addresses', 'عدد العناوين'),
  provideTitle: l('À préparer pour démarrer', 'What to prepare', 'ما يجب تحضيره'),
  provide: [
    l('Présentation de votre activité', 'A short presentation of your business', 'تقديم نشاطك'),
    l('Vos coordonnées', 'Your contact details', 'معلومات الاتصال'),
    l('Votre logo', 'Your logo', 'شعارك'),
    l('Les photos à utiliser', 'The photos to use', 'الصور المراد استعمالها'),
    l('Les textes disponibles', 'Any texts you have', 'النصوص المتوفرة'),
    l('Pour une boutique : le catalogue produits', 'For a shop: the product catalogue', 'للمتجر: كتالوج المنتجات'),
  ],
  provideNote: l('Le délai dépend de la disponibilité de ces éléments.', 'The timeline depends on having these ready.', 'تعتمد المدة على توفر هذه العناصر.'),
  paymentTitle: l('Modalités de paiement', 'Payment terms', 'طريقة الدفع'),
  payment: [
    { pct: 20, label: l('À la commande', 'On order', 'عند الطلب') },
    { pct: 30, label: l('À la validation de la maquette', 'On mock-up approval', 'عند الموافقة على النموذج') },
    { pct: 50, label: l('À la livraison finale', 'On final delivery', 'عند التسليم النهائي') },
  ],
  paymentNote: l('Pourcentages du montant total du devis accepté.', 'Percentages of the accepted quote total.', 'نسب من المبلغ الإجمالي للعرض المقبول.'),
}

export type DevState = { projects: string[]; emails: boolean; emailCount: number }

export function devLines(s: DevState, lang: Lang): QuoteLine[] {
  const lines: QuoteLine[] = devProjects.filter((p) => s.projects.includes(p.id)).map((p) => ({ label: p.label[lang], amount: null }))
  if (s.emails) lines.push({ label: dev.emails[lang], detail: `× ${s.emailCount}`, amount: null })
  return lines
}
