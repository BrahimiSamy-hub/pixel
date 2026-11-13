// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/**
 * Pixel Creative: quote forms of "Creative.pdf" (logo & identity, print & cut, restaurant menus,
 * advertising works). Sale prices only; `null` = "À définir" / "Sur devis".
 */
import { areaM2, l, type L10n, type Price, type QuoteLine, type Lang } from './core'

export type CreativeTab = 'logo' | 'print' | 'menus' | 'ads'

export const creativeTabs: readonly { id: CreativeTab; label: L10n }[] = [
  { id: 'logo', label: l('Logo', 'Logo', 'الشعار') },
  { id: 'print', label: l('Impression', 'Print', 'الطباعة') },
  { id: 'menus', label: l('Menus', 'Menus', 'القوائم') },
  { id: 'ads', label: l('Pub', 'Ads', 'الإشهار') },
]

export type Option<K extends string = string> = { id: K; label: L10n; hint?: L10n; price?: Price }

// ---------------------------------------------------------------------------
// 01 · Logo & identité visuelle
// ---------------------------------------------------------------------------

export const logo = {
  title: l('Logo & identité visuelle', 'Logo & visual identity', 'الشعار والهوية البصرية'),
  intro: l(
    'Décrivez votre marque, choisissez au maximum deux styles de logo et indiquez les usages prévus.',
    'Describe your brand, pick up to two logo styles and tell us where it will be used.',
    'صف علامتك التجارية، اختر نمطين للشعار كحد أقصى وحدد أماكن استعماله.',
  ),
  nature: [
    { id: 'new', label: l('Création d’un nouveau logo', 'New logo design', 'تصميم شعار جديد'), hint: l('2 propositions initiales ; 1 piste retenue ; 3 séries de modifications incluses', '2 initial proposals; 1 direction kept; 3 rounds of changes included', 'مقترحان أوليان؛ اختيار مقترح واحد؛ 3 جولات تعديل مشمولة'), price: null },
    { id: 'vector', label: l('Vectorisation d’un logo', 'Logo vectorisation', 'تحويل الشعار إلى فكتور'), hint: l('Reconstruction fidèle d’un visuel existant, notamment généré par IA', 'Faithful rebuild of an existing visual, including AI-generated ones', 'إعادة بناء دقيقة لتصميم موجود، خاصة المولّد بالذكاء الاصطناعي'), price: null },
    { id: 'modern', label: l('Modernisation d’un logo', 'Logo refresh', 'تحديث شعار'), hint: l('Refonte ou redesign d’une identité existante', 'Redesign of an existing identity', 'إعادة تصميم هوية موجودة'), price: null },
  ] as const satisfies readonly Option[],
  aiLogo: l('Je possède déjà un logo généré à l’aide d’une intelligence artificielle.', 'I already have a logo generated with AI.', 'لدي شعار مولّد بالذكاء الاصطناعي.'),
  aiNote: l(
    'La vectorisation fidèle d’un logo IA est une prestation distincte d’une création originale. Tout changement de concept ou de style fera l’objet d’un chiffrage séparé.',
    'Faithfully vectorising an AI logo is a separate service from an original design. Any change of concept or style is quoted separately.',
    'تحويل شعار مولّد بالذكاء الاصطناعي خدمة مختلفة عن التصميم الأصلي. أي تغيير في الفكرة أو الأسلوب يُسعّر على حدة.',
  ),
  brand: {
    title: l('Présentation de la marque', 'About the brand', 'تقديم العلامة'),
    name: l('Nom exact à écrire sur le logo', 'Exact name on the logo', 'الاسم كما يُكتب على الشعار'),
    slogan: l('Slogan / texte secondaire', 'Slogan / secondary text', 'الشعار النصي / نص ثانوي'),
    sector: l('Secteur d’activité', 'Business sector', 'مجال النشاط'),
    audience: l('Clientèle visée', 'Target customers', 'الزبائن المستهدفون'),
    words: l('3 mots qui décrivent la marque', '3 words that describe the brand', '3 كلمات تصف العلامة'),
    colors: l('Couleurs souhaitées / à éviter', 'Colours wanted / to avoid', 'الألوان المرغوبة / المرفوضة'),
    refs: l('Marques, liens ou références appréciés', 'Brands, links or references you like', 'علامات أو روابط أو مراجع تعجبك'),
    avoid: l('Ce que vous ne voulez surtout pas', 'What you definitely don’t want', 'ما لا تريده إطلاقًا'),
  },
  typesTitle: l('Types de logo préférés · 2 choix maximum', 'Preferred logo types · 2 choices max', 'أنواع الشعار المفضلة · اختياران كحد أقصى'),
  types: [
    { id: 'type', label: l('Typographique', 'Wordmark', 'كتابي'), hint: l('Le nom travaillé par un dessin de lettres distinctif', 'The name drawn with distinctive lettering', 'الاسم بخط مميز') },
    { id: 'mono', label: l('Monogramme', 'Monogram', 'حروف أولى'), hint: l('Initiales stylisées, adaptées aux noms longs', 'Stylised initials, good for long names', 'حروف أولى منسقة، مناسبة للأسماء الطويلة') },
    { id: 'picto', label: l('Pictogramme figuratif', 'Pictorial mark', 'رمز تصويري'), hint: l('Symbole reconnaissable : objet, activité ou idée', 'A recognisable symbol: object, activity or idea', 'رمز واضح: شيء أو نشاط أو فكرة') },
    { id: 'abstract', label: l('Symbole abstrait', 'Abstract mark', 'رمز تجريدي'), hint: l('Forme originale, sans représentation littérale', 'An original shape, not literal', 'شكل أصلي غير حرفي') },
    { id: 'combo', label: l('Logo combiné', 'Combination mark', 'شعار مركب'), hint: l('Nom + symbole, ensemble ou séparément', 'Name + symbol, together or apart', 'اسم + رمز، معًا أو منفصلين') },
    { id: 'emblem', label: l('Emblème / badge', 'Emblem / badge', 'شارة'), hint: l('Texte et symbole dans un sceau ou écusson', 'Text and symbol inside a seal or crest', 'نص ورمز داخل ختم أو درع') },
    { id: 'mascot', label: l('Mascotte / personnage', 'Mascot / character', 'شخصية / تميمة'), hint: l('Personnage représentant l’univers de marque', 'A character embodying the brand', 'شخصية تمثل عالم العلامة') },
    { id: 'advise', label: l('Je laisse Pixel me conseiller', 'Let Pixel advise me', 'أترك Pixel تنصحني'), hint: l('Direction choisie selon le marché et le positionnement', 'Direction chosen for your market and positioning', 'اتجاه يُختار حسب السوق والتموضع') },
  ] as const satisfies readonly Option[],
  directionTitle: l('Direction artistique', 'Art direction', 'التوجه الفني'),
  directions: [
    { id: 'minimal', label: l('Minimaliste', 'Minimalist', 'بسيط') },
    { id: 'premium', label: l('Premium / élégant', 'Premium / elegant', 'فاخر / أنيق') },
    { id: 'modern', label: l('Moderne / techno', 'Modern / tech', 'عصري / تقني') },
    { id: 'playful', label: l('Ludique / convivial', 'Playful / friendly', 'مرح / ودود') },
    { id: 'craft', label: l('Artisanal / authentique', 'Crafted / authentic', 'حرفي / أصيل') },
    { id: 'bold', label: l('Audacieux / expressif', 'Bold / expressive', 'جريء / معبّر') },
    { id: 'classic', label: l('Classique / institutionnel', 'Classic / institutional', 'كلاسيكي / مؤسساتي') },
  ] as const satisfies readonly Option[],
  usesTitle: l('Supports d’utilisation', 'Where it will be used', 'أماكن الاستعمال'),
  uses: [
    { id: 'social', label: l('Réseaux sociaux & web', 'Social media & web', 'مواقع التواصل والويب') },
    { id: 'sign', label: l('Enseigne et impression', 'Signage & print', 'اللافتات والطباعة') },
    { id: 'pack', label: l('Packaging / étiquettes', 'Packaging / labels', 'التغليف / الملصقات') },
    { id: 'all', label: l('Tous supports', 'Everywhere', 'كل الوسائط') },
    { id: 'other', label: l('Autre / à définir', 'Other / to define', 'أخرى / تُحدد لاحقًا') },
  ] as const satisfies readonly Option[],
  advice: l(
    'Conseil Pixel : privilégiez une direction précise et décrivez aussi ce qu’il faut éviter. Le type choisi guide le travail sans garantir un résultat graphique précis.',
    'Pixel tip: pick a clear direction and say what to avoid too. The chosen type guides the work but doesn’t guarantee a specific result.',
    'نصيحة Pixel: اختر اتجاهًا واضحًا واذكر ما يجب تجنبه. النوع المختار يوجّه العمل دون ضمان نتيجة محددة.',
  ),
  animation: l('Je souhaite faire animer mon logo', 'I want my logo animated', 'أريد تحريك شعاري'),
  socialTitle: l('Conception pour les réseaux sociaux', 'Social media designs', 'تصاميم لمواقع التواصل'),
  socialPacks: [10, 20, 30] as const,
  socialPack: l('Pack de {n} affiches', 'Pack of {n} posters', 'باقة {n} تصاميم'),
}

export type LogoState = {
  nature: (typeof logo.nature)[number]['id'] | null
  aiLogo: boolean
  brand: Record<keyof typeof logo.brand, string>
  types: string[]
  directions: string[]
  uses: string[]
  animation: boolean
  socialPack: number | null
}

export const emptyLogo: LogoState = {
  nature: null,
  aiLogo: false,
  brand: { title: '', name: '', slogan: '', sector: '', audience: '', words: '', colors: '', refs: '', avoid: '' },
  types: [],
  directions: [],
  uses: [],
  animation: false,
  socialPack: null,
}

export function logoLines(s: LogoState, lang: Lang): QuoteLine[] {
  const lines: QuoteLine[] = []
  const nature = logo.nature.find((n) => n.id === s.nature)
  if (nature) lines.push({ label: nature.label[lang], detail: s.brand.name || undefined, amount: null })
  if (s.animation) lines.push({ label: logo.animation[lang], amount: null })
  if (s.socialPack) lines.push({ label: logo.socialPack[lang].replace('{n}', String(s.socialPack)), amount: null })
  return lines
}

// ---------------------------------------------------------------------------
// 02 · Impression & découpe
// ---------------------------------------------------------------------------

/** How a print service is billed: per m² of the entered size, or on quote (with an indicative text). */
type Billing = { perM2: number } | { indicative?: L10n }

export const print = {
  title: l('Impression & découpe', 'Print & cut', 'الطباعة والقص'),
  intro: l(
    'Supports imprimés, découpes sur matériaux rigides et impression UV. La conception graphique est facturée séparément.',
    'Printed media, rigid-material cutting and UV printing. Graphic design is billed separately.',
    'مطبوعات، قص على مواد صلبة وطباعة UV. التصميم الغرافيكي يُحتسب على حدة.',
  ),
  services: [
    { id: 'sticker', label: l('Autocollant imprimé', 'Printed sticker', 'ملصق مطبوع'), hint: l('Vitrine, panneau et surfaces adaptées', 'Shop windows, panels and suitable surfaces', 'واجهات ولوحات وأسطح مناسبة'), billing: { perM2: 1800 } },
    { id: 'tarp', label: l('Bâche PVC', 'PVC banner', 'لافتة PVC'), hint: l('Bâche souple, cadre optionnel', 'Flexible banner, frame optional', 'لافتة مرنة، الإطار اختياري'), billing: { perM2: 1800 } },
    { id: 'oneway', label: l('One Way Vision', 'One Way Vision', 'One Way Vision'), hint: l('Film microperforé pour vitrage', 'Micro-perforated window film', 'فيلم مثقب للزجاج'), billing: { perM2: 1800 } },
    { id: 'pmma', label: l('Découpe PMMA', 'PMMA cutting', 'قص PMMA'), hint: l('Plexiglas, coloris et épaisseurs à définir', 'Acrylic, colours and thickness to define', 'بلكسي، الألوان والسماكة تُحدد'), billing: {} },
    { id: 'alucobond', label: l('Découpe Alucobond', 'Alucobond cutting', 'قص ألوكوبوند'), hint: l('Panneau composite aluminium, coloris au choix', 'Aluminium composite panel, any colour', 'لوح ألمنيوم مركب، اللون حسب الاختيار'), billing: {} },
    { id: 'forex', label: l('Découpe Forex', 'Forex cutting', 'قص فوركس'), hint: l('PVC expansé pour lettres, formes et panneaux', 'Foam PVC for letters, shapes and panels', 'PVC ممدد للحروف والأشكال واللوحات'), billing: {} },
    { id: 'uv', label: l('Impression UV', 'UV printing', 'طباعة UV'), hint: l('Prix de base annoncé, unité de facturation à confirmer', 'Base price given, billing unit to confirm', 'سعر أساسي معلن، وحدة الفوترة تُؤكد'), billing: { indicative: l('2 400 DA · à préciser', '2 400 DA · to confirm', '2400 دج · يُحدد') } },
    { id: 'uvSupport', label: l('Impression UV sur support', 'UV printing on a support', 'طباعة UV على حامل'), hint: l('Selon support, couleur de fond et couche de blanc UV', 'Depends on support, background colour and UV white layer', 'حسب الحامل ولون الخلفية وطبقة الأبيض'), billing: { indicative: l('7 000–9 000 DA indicatifs', '7 000–9 000 DA indicative', '7000–9000 دج تقريبًا') } },
  ] as const satisfies readonly (Option & { billing: Billing })[],
  formula: l(
    'Surface = largeur × hauteur (cm) ÷ 10 000 × quantité. Supports, cadres, finitions, conception et pose s’ajoutent au montant de base.',
    'Area = width × height (cm) ÷ 10,000 × quantity. Supports, frames, finishes, design and fitting come on top.',
    'المساحة = العرض × الارتفاع (سم) ÷ 10000 × الكمية. الحوامل والإطارات والتشطيبات والتصميم والتركيب تُضاف.',
  ),
  optionsTitle: l('Options autocollant / bâche', 'Sticker / banner options', 'خيارات الملصق / اللافتة'),
  stickerOptions: [
    { id: 'adhesive', label: l('Adhésif seul', 'Adhesive only', 'لاصق فقط'), hint: l('Sans support rigide', 'No rigid support', 'دون حامل صلب') },
    { id: 'forex5', label: l('Forex 5 mm', 'Forex 5 mm', 'فوركس 5 مم'), hint: l('Support rigide ajouté', 'Rigid support added', 'حامل صلب مضاف'), price: null },
    { id: 'forex8', label: l('Forex 8 mm', 'Forex 8 mm', 'فوركس 8 مم'), hint: l('Support rigide ajouté', 'Rigid support added', 'حامل صلب مضاف'), price: null },
    { id: 'forex10', label: l('Forex 10 mm', 'Forex 10 mm', 'فوركس 10 مم'), hint: l('Support rigide ajouté', 'Rigid support added', 'حامل صلب مضاف'), price: null },
  ] as const satisfies readonly Option[],
  tarpOptions: [
    { id: 'noFrame', label: l('Bâche sans cadre', 'Banner without frame', 'لافتة دون إطار'), hint: l('Impression souple seule', 'Flexible print only', 'طباعة مرنة فقط') },
    { id: 'wood', label: l('Cadre en bois', 'Wooden frame', 'إطار خشبي'), price: null },
    { id: 'metal', label: l('Cadre en métal', 'Metal frame', 'إطار معدني'), price: null },
  ] as const satisfies readonly Option[],
  cutTitle: l('Découpe et impression UV', 'Cutting and UV printing', 'القص وطباعة UV'),
  cutColor: l('Coloris du matériau', 'Material colour', 'لون المادة'),
  cutThickness: l('Épaisseur / matière souhaitée', 'Thickness / material wanted', 'السماكة / المادة المطلوبة'),
  cutTypes: [
    { id: 'letters', label: l('Lettres / chiffres', 'Letters / numbers', 'حروف / أرقام') },
    { id: 'logo', label: l('Logo / symbole', 'Logo / symbol', 'شعار / رمز') },
    { id: 'panel', label: l('Panneau / forme géométrique', 'Panel / geometric shape', 'لوحة / شكل هندسي') },
    { id: 'free', label: l('Découpe libre complexe', 'Complex custom shape', 'قص حر معقد') },
  ] as const satisfies readonly Option[],
  uvSupportTitle: l('Support d’impression UV', 'UV print support', 'حامل طباعة UV'),
  uvSupports: [
    { id: 'pmmaClear', label: l('PMMA transparent', 'Clear PMMA', 'PMMA شفاف') },
    { id: 'pmmaColor', label: l('PMMA coloré / opale', 'Coloured / opal PMMA', 'PMMA ملون / حليبي') },
    { id: 'forex', label: l('Forex', 'Forex', 'فوركس') },
    { id: 'alucobond', label: l('Alucobond', 'Alucobond', 'ألوكوبوند') },
    { id: 'client', label: l('Support fourni par le client', 'Support supplied by the client', 'حامل يوفره الزبون') },
    { id: 'pixel', label: l('À recommander par Pixel', 'Pixel to recommend', 'تقترحه Pixel') },
  ] as const satisfies readonly Option[],
  whiteLayer: [
    { id: 'with', label: l('Avec blanc UV', 'With UV white', 'مع أبيض UV'), hint: l('Supplément à prévoir', 'Extra cost', 'تكلفة إضافية') },
    { id: 'without', label: l('Sans blanc UV', 'Without UV white', 'دون أبيض UV') },
    { id: 'advise', label: l('À conseiller', 'Advise me', 'انصحوني') },
  ] as const satisfies readonly Option[],
  fileTitle: l('Fichier de conception', 'Design file', 'ملف التصميم'),
  files: [
    { id: 'ready', label: l('Je fournis un fichier prêt à imprimer', 'I supply a print-ready file', 'أوفر ملفًا جاهزًا للطباعة') },
    { id: 'pixel', label: l('Je confie la conception à Pixel', 'Pixel designs it for me', 'أترك التصميم لـ Pixel'), hint: l('Supplément sur devis', 'Extra, on quote', 'إضافة حسب الطلب'), price: null },
  ] as const satisfies readonly Option[],
}

export type PrintState = {
  service: (typeof print.services)[number]['id'] | null
  w: string
  h: string
  qty: number
  option: string | null
  cutColor: string
  cutThickness: string
  cutTypes: string[]
  uvSupport: string | null
  whiteLayer: string | null
  file: string | null
}

export const emptyPrint: PrintState = { service: null, w: '', h: '', qty: 1, option: null, cutColor: '', cutThickness: '', cutTypes: [], uvSupport: null, whiteLayer: null, file: null }

const num = (text: string) => Number(text.replace(',', '.')) || 0

export function printLines(s: PrintState, lang: Lang): QuoteLine[] {
  const service = print.services.find((x) => x.id === s.service)
  if (!service) return []
  const w = num(s.w)
  const h = num(s.h)
  const size = w && h ? `${w} × ${h} cm × ${s.qty}` : undefined
  const billing: Billing = service.billing
  const lines: QuoteLine[] = []
  if ('perM2' in billing) {
    const m2 = areaM2(w, h, s.qty)
    lines.push({ label: service.label[lang], detail: size && `${size} · ${m2.toFixed(2)} m²`, amount: m2 ? Math.round(m2 * billing.perM2) : null })
  } else {
    const indicative = billing.indicative?.[lang]
    lines.push({ label: service.label[lang], detail: [size, indicative].filter(Boolean).join(' · ') || undefined, amount: null })
  }
  const option = [...print.stickerOptions, ...print.tarpOptions].find((o) => o.id === s.option)
  if (option && 'price' in option) lines.push({ label: option.label[lang], amount: null })
  if (s.file === 'pixel') lines.push({ label: print.files[1].label[lang], amount: null })
  return lines
}

// ---------------------------------------------------------------------------
// 03 · Menus de restaurant
// ---------------------------------------------------------------------------

/** Design fee family of a menu type (PDF p.10). */
type DesignFee = 'a4' | 'a3' | 'book' | 'quote'

export const menus = {
  title: l('Menus de restaurant', 'Restaurant menus', 'قوائم المطاعم'),
  intro: l(
    'Choisissez le support et la finition. Les prix de fabrication n’incluent pas la conception graphique.',
    'Choose the material and finish. Production prices don’t include graphic design.',
    'اختر الحامل والتشطيب. أسعار الإنتاج لا تشمل التصميم.',
  ),
  types: [
    { id: 'a4photo', label: l('A4 photo recto-verso', 'A4 photo, double-sided', 'A4 صور وجهين'), hint: l('Papier photo 300 g, plastification', '300 g photo paper, laminated', 'ورق صور 300 غ، مغلف'), price: 350, design: 'a4' },
    { id: 'pmmaA4', label: l('Premium PMMA A4', 'Premium PMMA A4', 'PMMA فاخر A4'), hint: l('PMMA couleur + autocollant + plastification', 'Coloured PMMA + sticker + lamination', 'PMMA ملون + ملصق + تغليف'), price: 1000, design: 'a4' },
    { id: 'pmmaA3', label: l('Premium PMMA A3', 'Premium PMMA A3', 'PMMA فاخر A3'), hint: l('PMMA couleur + autocollant + plastification', 'Coloured PMMA + sticker + lamination', 'PMMA ملون + ملصق + تغليف'), price: 2000, design: 'a3' },
    { id: 'a3fold', label: l('A3 pliable', 'Folding A3', 'A3 قابل للطي'), hint: l('Papier couché 300 g, plastifié', '300 g coated paper, laminated', 'ورق مطلي 300 غ، مغلف'), price: 600, design: 'a3' },
    { id: 'pmmaFree', label: l('PMMA forme libre', 'Custom-shape PMMA', 'PMMA بشكل حر'), hint: l('Forme sur mesure, ex. La Dolce Vita', 'Made-to-measure shape, e.g. La Dolce Vita', 'شكل حسب الطلب، مثل La Dolce Vita'), price: null, design: 'quote' },
    { id: 'bookPaper', label: l('Book papier', 'Paper menu book', 'كتيّب ورقي'), hint: l('Papier couché plastifié, spirale ou gainage', 'Laminated coated paper, spiral or sleeve', 'ورق مطلي مغلف، حلزوني أو مغلّف'), price: null, design: 'book' },
    { id: 'bookPmma', label: l('Book PMMA', 'PMMA menu book', 'كتيّب PMMA'), hint: l('Finition ordinaire ou spirale', 'Standard or spiral finish', 'تشطيب عادي أو حلزوني'), price: null, design: 'book' },
    { id: 'digital', label: l('Menu digital', 'Digital menu', 'قائمة رقمية'), hint: l('QR code, page en ligne ou autre solution', 'QR code, online page or other', 'رمز QR أو صفحة إلكترونية أو حل آخر'), price: null, design: 'quote' },
  ] as const satisfies readonly (Option & { price: Price; design: DesignFee })[],
  qty: l('Quantité de menus', 'Number of menus', 'عدد القوائم'),
  pages: l('Pages graphiques (books)', 'Designed pages (books)', 'صفحات التصميم (كتيّبات)'),
  orientationTitle: l('Orientation', 'Orientation', 'الاتجاه'),
  orientations: [
    { id: 'portrait', label: l('Portrait', 'Portrait', 'عمودي') },
    { id: 'landscape', label: l('Paysage', 'Landscape', 'أفقي') },
    { id: 'advise', label: l('À conseiller', 'Advise me', 'انصحوني') },
  ] as const satisfies readonly Option[],
  custom: l('Couleur PMMA / dimension / forme souhaitée', 'PMMA colour / size / shape wanted', 'لون PMMA / المقاس / الشكل المطلوب'),
  finishesTitle: l('Finitions', 'Finishes', 'التشطيبات'),
  finishes: [
    { id: 'spiral', label: l('Book : spirale', 'Book: spiral', 'كتيّب: حلزوني') },
    { id: 'sleeve', label: l('Book : gainage', 'Book: sleeve', 'كتيّب: تغليف') },
    { id: 'binding', label: l('Book : reliure ordinaire', 'Book: standard binding', 'كتيّب: تجليد عادي') },
    { id: 'bookAdvise', label: l('Book : à conseiller', 'Book: advise me', 'كتيّب: انصحوني') },
    { id: 'fold3', label: l('Pliable 3 volets (type Speedy)', 'Tri-fold (Speedy style)', 'مطوية 3 أجزاء (نمط Speedy)') },
    { id: 'fold2', label: l('Pliable 2 volets', 'Bi-fold', 'مطوية جزأين') },
    { id: 'foldTbd', label: l('Pliage à déterminer', 'Fold to decide', 'الطي يُحدد') },
  ] as const satisfies readonly Option[],
  designTitle: l('Conception graphique', 'Graphic design', 'التصميم الغرافيكي'),
  designOwn: l('Je fournis mon fichier prêt pour l’impression (contrôle technique nécessaire)', 'I supply my print-ready file (technical check needed)', 'أوفر ملفي الجاهز للطباعة (فحص تقني ضروري)'),
  designPixel: l('Pixel réalise la conception du menu', 'Pixel designs the menu', 'Pixel تصمم القائمة'),
  designFees: { a4: 2000, a3: 3000, book: 500 } as const,
  designLabel: l('Conception', 'Design', 'التصميم'),
  designNote: l(
    'Books, PMMA forme libre et menus digitaux : conception sur devis. Pour l’A3 pliable, le prix final dépend du périmètre validé.',
    'Books, custom-shape PMMA and digital menus: design on quote. For folding A3, the final price depends on the agreed scope.',
    'الكتيّبات وPMMA بشكل حر والقوائم الرقمية: التصميم حسب الطلب. لقائمة A3 القابلة للطي، السعر النهائي حسب النطاق المتفق عليه.',
  ),
}

export type MenuState = {
  type: (typeof menus.types)[number]['id'] | null
  qty: number
  pages: number
  orientation: string | null
  custom: string
  finishes: string[]
  design: 'own' | 'pixel' | null
}

export const emptyMenu: MenuState = { type: null, qty: 1, pages: 1, orientation: null, custom: '', finishes: [], design: null }

export function menuLines(s: MenuState, lang: Lang): QuoteLine[] {
  const type = menus.types.find((x) => x.id === s.type)
  if (!type) return []
  const lines: QuoteLine[] = [{ label: type.label[lang], detail: `× ${s.qty}`, amount: type.price === null ? null : type.price * s.qty }]
  if (s.design === 'pixel') {
    const fee = type.design === 'quote' ? null : type.design === 'book' ? menus.designFees.book * s.pages : menus.designFees[type.design]
    const detail = type.design === 'book' ? `${s.pages} × 500 DA` : undefined
    lines.push({ label: `${menus.designLabel[lang]} · ${type.label[lang]}`, detail, amount: fee })
  }
  return lines
}

// ---------------------------------------------------------------------------
// Travaux publicitaires
// ---------------------------------------------------------------------------

export const ads = {
  title: l('Travaux publicitaires', 'Advertising works', 'الأعمال الإشهارية'),
  intro: l(
    'Cochez les supports souhaités et précisez les quantités. Tarifs sur devis, sauf les stickers A3+.',
    'Tick the items you need and set quantities. Prices on quote, except A3+ stickers.',
    'اختر الوسائط المطلوبة وحدد الكميات. الأسعار حسب الطلب، باستثناء ملصقات A3+.',
  ),
  items: [
    { id: 'flyers', label: l('Flyers', 'Flyers', 'مطويات إشهارية'), formats: ['A5', 'A2'], min: 500, price: null },
    { id: 'cards', label: l('Cartes de visite', 'Business cards', 'بطاقات الزيارة'), min: 1000, price: null },
    { id: 'leaflet', label: l('Dépliant', 'Leaflet', 'مطوية'), formats: ['A4'], min: 1, price: null },
    { id: 'freeStickers', label: l('Stickers de forme libre', 'Custom-shape stickers', 'ملصقات بشكل حر'), hint: l('Sur devis uniquement', 'On quote only', 'حسب الطلب فقط'), min: 1, price: null },
    { id: 'stickersA3', label: l('Stickers A3+', 'A3+ stickers', 'ملصقات A3+'), min: 1, price: 350 },
    { id: 'rollup', label: l('Roll-up', 'Roll-up', 'رول أب'), hint: l('Dimensions en cm', 'Size in cm', 'المقاس بالسم'), formats: ['80 × 200', '100 × 200', '150 × 200'], min: 1, price: null },
    { id: 'flag', label: l('Flag', 'Flag', 'علم إشهاري'), hint: l('Conception et impression', 'Design and print', 'تصميم وطباعة'), formats: ['250 × 70', '300 × 70', '400 × 70'], min: 1, price: null },
    { id: 'desk', label: l('Desk', 'Desk', 'مكتب عرض'), hint: l('Comptoir en plastique', 'Plastic counter', 'منضدة بلاستيكية'), min: 1, price: null },
    { id: 'poster', label: l('Affiche', 'Poster', 'ملصق حائطي'), hint: l('Conception et impression', 'Design and print', 'تصميم وطباعة'), min: 1, price: null },
  ] as const satisfies readonly (Option & { min: number; formats?: readonly string[]; price: Price })[],
  notes: l('Précisions sur la commande', 'Order details', 'تفاصيل الطلب'),
}

export type AdsItemId = (typeof ads.items)[number]['id']
export type AdsState = Partial<Record<AdsItemId, { qty: number; format: string | null }>>

export function adsLines(s: AdsState, lang: Lang): QuoteLine[] {
  return ads.items.flatMap((item) => {
    const pick = s[item.id]
    if (!pick) return []
    // Below the minimum the request still goes out at the minimum (PDF: "Minimum 500 pièces").
    const qty = Math.max(item.min, pick.qty)
    return [{ label: item.label[lang], detail: [pick.format, `× ${qty}`].filter(Boolean).join(' · '), amount: item.price === null ? null : item.price * qty }]
  })
}
