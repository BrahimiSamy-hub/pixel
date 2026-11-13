// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/**
 * Pixel Photo Lab: "Build Your Project" from "Photography_Video.pdf": 6 main services, their
 * categories, the questions each one needs, and add-ons shown only where relevant.
 * No prices in the doc: everything is on quote.
 */
import { l, type L10n, type QuoteLine, type Lang } from './core'

export type PhotoServiceId = 'photography' | 'videography' | 'social' | 'photoEdit' | 'videoEdit' | 'design'

type Choice = { id: string; label: L10n }

/** One project question. `onlyFor` limits it to some categories (e.g. background for products). */
export type FieldDef = {
  id: string
  label: L10n
  kind: 'number' | 'text' | 'yesno' | 'choice' | 'multi'
  options?: readonly Choice[]
  onlyFor?: readonly string[]
}

export type PhotoService = {
  id: PhotoServiceId
  label: L10n
  icon: 'camera-outline' | 'videocam-outline' | 'phone-portrait-outline' | 'color-wand-outline' | 'film-outline' | 'brush-outline'
  categories: readonly (Choice & { hint?: L10n })[]
  /** Several categories can be picked (editing and design lists); one otherwise. */
  multiCategory?: boolean
  fields: readonly FieldDef[]
}

const yes = (id: string, fr: string, en: string, ar: string): FieldDef => ({ id, label: l(fr, en, ar), kind: 'yesno' })
const n = (id: string, fr: string, en: string, ar: string): FieldDef => ({ id, label: l(fr, en, ar), kind: 'number' })
const txt = (id: string, fr: string, en: string, ar: string): FieldDef => ({ id, label: l(fr, en, ar), kind: 'text' })
const c = (id: string, fr: string, en: string, ar: string): Choice => ({ id, label: l(fr, en, ar) })

export const photoServices: readonly PhotoService[] = [
  {
    id: 'photography',
    label: l('Photographie', 'Photography', 'التصوير الفوتوغرافي'),
    icon: 'camera-outline',
    categories: [
      { ...c('product', 'Photo produit', 'Product photography', 'تصوير المنتجات'), hint: l('E-commerce, bijoux, cosmétiques, électronique', 'E-commerce, jewellery, cosmetics, electronics', 'تجارة إلكترونية، مجوهرات، مستحضرات، إلكترونيات') },
      { ...c('food', 'Photo culinaire', 'Food photography', 'تصوير الأطعمة'), hint: l('Restaurant, fast-food, menu, boissons', 'Restaurant, fast food, menu, drinks', 'مطاعم، وجبات سريعة، قوائم، مشروبات') },
      { ...c('portrait', 'Portrait', 'Portrait', 'بورتريه'), hint: l('Portraits, photos pro, couples', 'Portraits, headshots, couples', 'صور شخصية، مهنية، أزواج') },
      { ...c('fashion', 'Mode', 'Fashion', 'الموضة'), hint: l('Vêtements, campagnes, lookbooks, mannequins', 'Clothing, campaigns, lookbooks, models', 'ملابس، حملات، كتالوجات، عارضون') },
      { ...c('wedding', 'Mariage', 'Wedding', 'الأعراس'), hint: l('Jour J, fiançailles, henna, pré-mariage', 'Wedding day, engagement, henna, pre-wedding', 'يوم العرس، الخطوبة، الحنة، ما قبل العرس') },
      { ...c('event', 'Événement', 'Event', 'المناسبات'), hint: l('Anniversaires, conférences, entreprises, soirées', 'Birthdays, conferences, corporate, parties', 'أعياد ميلاد، مؤتمرات، شركات، حفلات') },
      { ...c('realEstate', 'Immobilier', 'Real estate', 'العقارات'), hint: l('Maisons, appartements, hôtels, commerces', 'Houses, flats, hotels, commercial spaces', 'منازل، شقق، فنادق، محلات') },
      { ...c('lifestyle', 'Lifestyle', 'Lifestyle', 'نمط الحياة'), hint: l('Famille, extérieur, intérieur', 'Family, outdoor, indoor', 'عائلة، خارجي، داخلي') },
    ],
    fields: [
      n('subjects', 'Nombre de produits, modèles ou personnes', 'Number of products, models or people', 'عدد المنتجات أو العارضين أو الأشخاص'),
      n('photos', 'Nombre de photos finales', 'Number of final photos', 'عدد الصور النهائية'),
      txt('duration', 'Durée de la séance', 'Shooting duration', 'مدة الجلسة'),
      { id: 'location', label: l('Lieu', 'Location', 'المكان'), kind: 'choice', options: [c('studio', 'Studio', 'Studio', 'استوديو'), c('outdoor', 'Extérieur', 'Outdoor', 'خارجي'), c('client', 'Chez le client', 'Client’s place', 'لدى الزبون')] },
      n('locations', 'Nombre de lieux', 'Number of locations', 'عدد الأماكن'),
      { id: 'background', label: l('Fond', 'Background', 'الخلفية'), kind: 'choice', onlyFor: ['product'], options: [c('white', 'Blanc', 'White', 'أبيض'), c('lifestyle', 'Lifestyle', 'Lifestyle', 'نمط حياة'), c('creative', 'Créatif', 'Creative', 'إبداعي')] },
      yes('makeup', 'Maquilleuse', 'Makeup artist', 'خبيرة تجميل'),
      yes('stylist', 'Styliste', 'Stylist', 'منسق أزياء'),
    ],
  },
  {
    id: 'videography',
    label: l('Vidéo', 'Videography', 'الفيديو'),
    icon: 'videocam-outline',
    categories: [
      { ...c('commercial', 'Publicité', 'Commercial', 'إعلان'), hint: l('Spot TV, produit, marque', 'TV ad, product, brand', 'إعلان تلفزيوني، منتج، علامة') },
      { ...c('promo', 'Vidéo promotionnelle', 'Promotional video', 'فيديو ترويجي'), hint: l('Entreprise, produit, service', 'Business, product, service', 'مؤسسة، منتج، خدمة') },
      { ...c('corporate', 'Vidéo corporate', 'Corporate video', 'فيديو مؤسساتي'), hint: l('Présentation, profil, interviews', 'Presentation, profile, interviews', 'تقديم، تعريف، مقابلات') },
      { ...c('event', 'Événement', 'Event', 'المناسبات'), hint: l('Mariages, anniversaires, conférences', 'Weddings, birthdays, conferences', 'أعراس، أعياد ميلاد، مؤتمرات') },
      { ...c('education', 'Éducatif', 'Educational', 'تعليمي'), hint: l('Tutoriels, cours en ligne', 'Tutorials, online courses', 'دروس، دورات عبر الإنترنت') },
      { ...c('music', 'Clip musical', 'Music video', 'فيديو كليب'), hint: l('Clips, live', 'Clips, live performances', 'كليبات، عروض حية') },
      { ...c('documentary', 'Documentaire', 'Documentary', 'وثائقي'), hint: l('Court-métrage, interview', 'Short film, interview', 'فيلم قصير، مقابلة') },
      { ...c('realEstate', 'Immobilier', 'Real estate', 'العقارات'), hint: l('Visites, hôtels, architecture', 'Tours, hotels, architecture', 'جولات، فنادق، هندسة') },
    ],
    fields: [
      { id: 'duration', label: l('Durée de la vidéo', 'Video length', 'مدة الفيديو'), kind: 'choice', options: [c('15s', '15 s', '15 s', '15 ث'), c('30s', '30 s', '30 s', '30 ث'), c('1m', '1 min', '1 min', '1 د'), c('3m', '3 min', '3 min', '3 د'), c('custom', 'Autre', 'Custom', 'أخرى')] },
      n('videos', 'Nombre de vidéos', 'Number of videos', 'عدد الفيديوهات'),
      n('days', 'Jours de tournage', 'Shooting days', 'أيام التصوير'),
      n('locations', 'Nombre de lieux', 'Number of locations', 'عدد الأماكن'),
      n('actors', 'Acteurs ou modèles', 'Actors or models', 'ممثلون أو عارضون'),
      { id: 'format', label: l('Format', 'Format', 'الصيغة'), kind: 'choice', options: [c('horizontal', 'Horizontal', 'Horizontal', 'أفقي'), c('vertical', 'Vertical', 'Vertical', 'عمودي'), c('both', 'Les deux', 'Both', 'الاثنان')] },
      yes('script', 'Écriture du script', 'Script writing', 'كتابة السيناريو'),
      yes('voiceover', 'Voix off', 'Voice-over', 'تعليق صوتي'),
      yes('drone', 'Drone', 'Drone filming', 'تصوير بالدرون'),
      yes('lighting', 'Éclairage', 'Lighting setup', 'إضاءة'),
    ],
  },
  {
    id: 'social',
    label: l('Contenu réseaux sociaux', 'Social media content', 'محتوى مواقع التواصل'),
    icon: 'phone-portrait-outline',
    categories: [
      { ...c('instagram', 'Instagram', 'Instagram', 'إنستغرام'), hint: l('Reels, posts, stories', 'Reels, posts, stories', 'ريلز، منشورات، ستوري') },
      { ...c('tiktok', 'TikTok', 'TikTok', 'تيك توك'), hint: l('Vidéos courtes, tendances, promos', 'Short videos, trends, promos', 'فيديوهات قصيرة، تريندات، ترويج') },
      { ...c('facebook', 'Facebook', 'Facebook', 'فيسبوك'), hint: l('Posts, stories, vidéos promo', 'Posts, stories, promo videos', 'منشورات، ستوري، فيديوهات ترويجية') },
      { ...c('youtube', 'YouTube', 'YouTube', 'يوتيوب'), hint: l('Vidéos longues, Shorts, vlogs', 'Long-form, Shorts, vlogs', 'فيديوهات طويلة، شورتس، فلوغ') },
      { ...c('personal', 'Personal branding', 'Personal branding', 'العلامة الشخصية'), hint: l('Reels perso, contenu pro', 'Personal reels, professional content', 'ريلز شخصية، محتوى مهني') },
      { ...c('business', 'Contenu business', 'Business content', 'محتوى تجاري'), hint: l('Restaurant, boutique, marque', 'Restaurant, shop, brand', 'مطعم، متجر، علامة') },
    ],
    multiCategory: true,
    fields: [
      n('reels', 'Nombre de reels', 'Number of reels', 'عدد الريلز'),
      n('posts', 'Nombre de posts', 'Number of posts', 'عدد المنشورات'),
      n('stories', 'Nombre de stories', 'Number of stories', 'عدد الستوري'),
      txt('duration', 'Durée des vidéos', 'Video length', 'مدة الفيديوهات'),
      { id: 'type', label: l('Type de projet', 'Project type', 'نوع المشروع'), kind: 'choice', options: [c('monthly', 'Forfait mensuel', 'Monthly package', 'باقة شهرية'), c('once', 'Projet ponctuel', 'One-time project', 'مشروع لمرة واحدة')] },
      n('days', 'Jours de tournage par mois', 'Shooting days per month', 'أيام التصوير في الشهر'),
      yes('strategy', 'Stratégie de contenu', 'Content strategy', 'استراتيجية المحتوى'),
      yes('script', 'Écriture des scripts', 'Script writing', 'كتابة السيناريو'),
    ],
  },
  {
    id: 'photoEdit',
    label: l('Retouche photo', 'Photo editing & retouching', 'تعديل الصور'),
    icon: 'color-wand-outline',
    categories: [
      c('beauty', 'Retouche beauté', 'Beauty retouching', 'تنقيح التجميل'),
      c('skin', 'Retouche de peau', 'Skin retouching', 'تنقيح البشرة'),
      c('product', 'Retouche produit', 'Product retouching', 'تنقيح المنتجات'),
      c('background', 'Détourage', 'Background removal', 'إزالة الخلفية'),
      c('manipulation', 'Photomontage', 'Photo manipulation', 'تركيب الصور'),
      c('color', 'Correction couleur', 'Colour correction', 'تصحيح الألوان'),
      c('fashion', 'Retouche mode', 'Fashion retouching', 'تنقيح الموضة'),
      c('restoration', 'Restauration de photos anciennes', 'Old photo restoration', 'ترميم الصور القديمة'),
    ],
    multiCategory: true,
    fields: [
      n('photos', 'Nombre de photos', 'Number of photos', 'عدد الصور'),
      { id: 'level', label: l('Niveau de retouche', 'Retouching level', 'مستوى التنقيح'), kind: 'choice', options: [c('basic', 'Basique', 'Basic', 'أساسي'), c('advanced', 'Avancé', 'Advanced', 'متقدم')] },
      { id: 'format', label: l('Format de livraison', 'Delivery format', 'صيغة التسليم'), kind: 'multi', options: [c('jpg', 'JPG', 'JPG', 'JPG'), c('png', 'PNG', 'PNG', 'PNG'), c('tiff', 'TIFF', 'TIFF', 'TIFF')] },
      txt('style', 'Style souhaité', 'Editing style', 'الأسلوب المطلوب'),
    ],
  },
  {
    id: 'videoEdit',
    label: l('Montage & post-production', 'Video editing & post-production', 'المونتاج وما بعد الإنتاج'),
    icon: 'film-outline',
    categories: [
      c('basic', 'Montage basique', 'Basic editing', 'مونتاج أساسي'),
      c('pro', 'Montage professionnel', 'Professional editing', 'مونتاج احترافي'),
      c('cinematic', 'Montage cinématique', 'Cinematic editing', 'مونتاج سينمائي'),
      c('correction', 'Correction colorimétrique', 'Colour correction', 'تصحيح الألوان'),
      c('grading', 'Étalonnage', 'Colour grading', 'تدرج الألوان'),
      c('motion', 'Motion design', 'Motion graphics', 'موشن جرافيك'),
      c('logo', 'Animation de logo', 'Logo animation', 'تحريك الشعار'),
      c('vfx', 'Effets visuels (VFX)', 'Visual effects (VFX)', 'مؤثرات بصرية'),
      c('sound', 'Sound design', 'Sound design', 'تصميم صوتي'),
      c('audio', 'Montage audio', 'Audio editing', 'تعديل الصوت'),
      c('subtitles', 'Sous-titres', 'Subtitles & captions', 'الترجمة'),
    ],
    multiCategory: true,
    fields: [
      n('videos', 'Nombre de vidéos', 'Number of videos', 'عدد الفيديوهات'),
      txt('raw', 'Durée des rushes', 'Raw footage length', 'مدة اللقطات الخام'),
      txt('final', 'Durée finale', 'Final video length', 'المدة النهائية'),
      txt('style', 'Style de montage', 'Editing style', 'أسلوب المونتاج'),
      { id: 'subtitles', label: l('Langue des sous-titres', 'Subtitle language', 'لغة الترجمة'), kind: 'multi', options: [c('ar', 'Arabe', 'Arabic', 'العربية'), c('fr', 'Français', 'French', 'الفرنسية'), c('en', 'Anglais', 'English', 'الإنجليزية')] },
      yes('grading', 'Étalonnage', 'Colour grading', 'تدرج الألوان'),
      yes('motion', 'Motion design', 'Motion graphics', 'موشن جرافيك'),
    ],
  },
  {
    id: 'design',
    label: l('Design graphique', 'Graphic design', 'التصميم الغرافيكي'),
    icon: 'brush-outline',
    categories: [
      c('logo', 'Logo', 'Logo design', 'تصميم الشعار'),
      c('identity', 'Identité de marque', 'Brand identity', 'الهوية البصرية'),
      c('social', 'Visuels réseaux sociaux', 'Social media designs', 'تصاميم مواقع التواصل'),
      c('posters', 'Affiches publicitaires', 'Advertising posters', 'ملصقات إشهارية'),
      c('flyers', 'Flyers & brochures', 'Flyers & brochures', 'مطويات وكتيبات'),
      c('cards', 'Cartes de visite', 'Business cards', 'بطاقات الزيارة'),
      c('menu', 'Menus', 'Menu design', 'تصميم القوائم'),
      c('packaging', 'Packaging', 'Packaging design', 'تصميم التغليف'),
      c('banner', 'Bannières', 'Banner design', 'تصميم اللافتات'),
    ],
    multiCategory: true,
    fields: [
      n('designs', 'Nombre de créations', 'Number of designs', 'عدد التصاميم'),
      txt('size', 'Dimensions ou formats', 'Sizes or formats', 'المقاسات أو الصيغ'),
      yes('guidelines', 'Charte graphique disponible', 'Brand guidelines available', 'دليل الهوية متوفر'),
      yes('content', 'Contenu prêt', 'Content ready', 'المحتوى جاهز'),
    ],
  },
]

/** Add-ons, each shown only for the services it fits (PDF §8 "Conditional add-ons"). */
export const addOns: readonly (Choice & { hint: L10n; for: readonly PhotoServiceId[] })[] = [
  { ...c('drone', 'Drone', 'Drone filming', 'تصوير بالدرون'), hint: l('Photo et vidéo aériennes', 'Aerial photo and video', 'تصوير جوي'), for: ['photography', 'videography', 'social'] },
  { ...c('models', 'Mannequins', 'Professional models', 'عارضون محترفون'), hint: l('Hommes / femmes', 'Male / female', 'رجال / نساء'), for: ['photography', 'videography', 'social'] },
  { ...c('makeup', 'Maquilleuse', 'Makeup artist', 'خبيرة تجميل'), hint: l('Maquillage professionnel', 'Professional makeup', 'مكياج احترافي'), for: ['photography', 'videography', 'social'] },
  { ...c('hair', 'Coiffeur·se', 'Hair stylist', 'مصفف شعر'), hint: l('Coiffure', 'Hair styling', 'تصفيف الشعر'), for: ['photography', 'videography', 'social'] },
  { ...c('studio', 'Studio pro', 'Professional studio', 'استوديو احترافي'), hint: l('Location de studio', 'Studio rental', 'كراء الاستوديو'), for: ['photography', 'videography', 'social'] },
  { ...c('photographer', 'Photographe supplémentaire', 'Extra photographer', 'مصور إضافي'), hint: l('Un photographe en plus', 'An additional photographer', 'مصور إضافي'), for: ['photography'] },
  { ...c('videographer', 'Vidéaste supplémentaire', 'Extra videographer', 'مصور فيديو إضافي'), hint: l('Un vidéaste en plus', 'An additional videographer', 'مصور فيديو إضافي'), for: ['videography'] },
  { ...c('hours', 'Heures supplémentaires', 'Extra shooting hours', 'ساعات تصوير إضافية'), hint: l('Séance prolongée', 'Extended shooting time', 'جلسة ممددة'), for: ['photography', 'videography'] },
  { ...c('location', 'Lieu supplémentaire', 'Extra location', 'مكان إضافي'), hint: l('Un lieu de tournage en plus', 'An additional shooting location', 'مكان تصوير إضافي'), for: ['photography', 'videography', 'social'] },
  { ...c('props', 'Décor & accessoires', 'Props & decorations', 'ديكور وإكسسوارات'), hint: l('Mise en scène créative', 'Creative set design', 'تصميم مشهد إبداعي'), for: ['photography', 'videography', 'social'] },
  { ...c('lighting', 'Éclairage pro', 'Professional lighting', 'إضاءة احترافية'), hint: l('Matériel et installation', 'Equipment and setup', 'المعدات والتركيب'), for: ['photography', 'videography', 'social'] },
  { ...c('voiceover', 'Voix off', 'Voice-over', 'تعليق صوتي'), hint: l('Enregistrement professionnel', 'Professional recording', 'تسجيل احترافي'), for: ['videography', 'videoEdit', 'social'] },
  { ...c('script', 'Écriture de script', 'Script writing', 'كتابة السيناريو'), hint: l('Développement créatif', 'Creative script development', 'تطوير إبداعي'), for: ['videography', 'social'] },
  { ...c('urgent', 'Livraison urgente', 'Urgent delivery', 'تسليم مستعجل'), hint: l('Priorité', 'Priority delivery', 'أولوية'), for: ['photography', 'videography', 'social', 'photoEdit', 'videoEdit', 'design'] },
  { ...c('raw', 'Fichiers bruts', 'Raw files', 'الملفات الخام'), hint: l('Photos et vidéos originales', 'Original photos and videos', 'الصور والفيديوهات الأصلية'), for: ['photography', 'videography'] },
]

export const budgets = [
  c('lt20', '< 20 000 DA', '< 20,000 DA', '< 20 000 دج'),
  c('20-50', '20 000 – 50 000 DA', '20,000 – 50,000 DA', '20 000 – 50 000 دج'),
  c('50-100', '50 000 – 100 000 DA', '50,000 – 100,000 DA', '50 000 – 100 000 دج'),
  c('gt100', '> 100 000 DA', '> 100,000 DA', '> 100 000 دج'),
] as const

export const photo = {
  title: l('Construisez votre projet', 'Build your project', 'ابنِ مشروعك'),
  intro: l(
    'Choisissez un ou plusieurs services : seules les questions utiles s’affichent.',
    'Pick one or more services: only the questions that matter appear.',
    'اختر خدمة أو أكثر: تظهر فقط الأسئلة المفيدة.',
  ),
  steps: [
    l('Choisissez vos services', 'Select your services', 'اختر خدماتك'),
    l('Choisissez une catégorie', 'Choose a category', 'اختر الفئة'),
    l('Personnalisez votre projet', 'Customize your project', 'خصّص مشروعك'),
    l('Ajoutez des services', 'Add extra services', 'أضف خدمات'),
    l('Vérifiez votre projet', 'Review your project', 'راجع مشروعك'),
    l('Vos coordonnées', 'Contact information', 'معلومات الاتصال'),
  ],
  noAddOns: l('Aucun supplément pour ces services.', 'No add-ons for these services.', 'لا إضافات لهذه الخدمات.'),
  project: {
    name: l('Nom du projet', 'Project name', 'اسم المشروع'),
    description: l('Description du projet', 'Project description', 'وصف المشروع'),
    location: l('Lieu souhaité', 'Preferred location', 'المكان المفضل'),
    budget: l('Budget estimé', 'Estimated budget', 'الميزانية التقديرية'),
    references: l('Images ou vidéos d’inspiration : envoyez-les dans la conversation WhatsApp.', 'Inspiration images or videos: send them in the WhatsApp chat.', 'صور أو فيديوهات ملهمة: أرسلها في محادثة واتساب.'),
  },
}

// ---------------------------------------------------------------------------
// State → request
// ---------------------------------------------------------------------------

export type FieldValue = string | boolean | string[]
export type ServiceAnswers = { categories: string[]; values: Record<string, FieldValue> }
export type PhotoState = { services: PhotoServiceId[]; answers: Partial<Record<PhotoServiceId, ServiceAnswers>>; addOns: string[] }

export const emptyPhoto: PhotoState = { services: [], answers: {}, addOns: [] }

/** Questions of a service that apply to its chosen categories. */
export const fieldsFor = (svc: PhotoService, cats: readonly string[]) => svc.fields.filter((f) => !f.onlyFor || f.onlyFor.some((x) => cats.includes(x)))

/** Add-ons relevant to the chosen services. */
export const addOnsFor = (ids: readonly PhotoServiceId[]) => addOns.filter((a) => a.for.some((s) => ids.includes(s)))

export function formatValue(f: FieldDef, v: FieldValue | undefined, lang: Lang, yesNo: [string, string]): string {
  if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) return ''
  if (f.kind === 'yesno') return v ? yesNo[0] : yesNo[1]
  if (Array.isArray(v)) return v.map((id) => f.options?.find((o) => o.id === id)?.label[lang] ?? id).join(', ')
  if (f.kind === 'choice') return f.options?.find((o) => o.id === v)?.label[lang] ?? String(v)
  return String(v)
}

export function photoLines(s: PhotoState, lang: Lang): QuoteLine[] {
  const lines: QuoteLine[] = s.services.map((id) => {
    const svc = photoServices.find((x) => x.id === id)!
    const cats = s.answers[id]?.categories ?? []
    const detail = svc.categories.filter((c) => cats.includes(c.id)).map((c) => c.label[lang]).join(', ')
    return { label: svc.label[lang], detail: detail || undefined, amount: null }
  })
  for (const a of addOnsFor(s.services)) if (s.addOns.includes(a.id)) lines.push({ label: a.label[lang], amount: null })
  return lines
}

export function photoAnswers(s: PhotoState, lang: Lang, yesNo: [string, string]) {
  return s.services.flatMap((id) => {
    const svc = photoServices.find((x) => x.id === id)!
    const a = s.answers[id]
    return fieldsFor(svc, a?.categories ?? []).map((f) => ({ label: `${svc.label[lang]} · ${f.label[lang]}`, value: formatValue(f, a?.values[f.id], lang, yesNo) }))
  })
}
