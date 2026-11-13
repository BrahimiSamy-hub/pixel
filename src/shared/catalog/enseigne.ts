// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/**
 * Pixel Enseigne: sign materials, colour charts and LED modules from "Pixel_Catalogue_Complet.pdf"
 * (prototypes 1–3, 8–9 Nov 2026), plus the lit/unlit sign mockups. Sale prices only: the
 * purchase prices of the internal grids are never shipped in the app.
 * Colours are sampled from photos: indicative, not a manufacturer reference.
 */
import { areaM2, l, type L10n, type Lang, type QuoteLine, type Swatch } from './core'

// ---------------------------------------------------------------------------
// Colour names (fr → en / ar), shared by every chart.
// ---------------------------------------------------------------------------

const NAMES: Record<string, [string, string]> = {
  Blanc: ['White', 'أبيض'],
  'Ivoire / crème': ['Ivory / cream', 'عاجي / كريمي'],
  'Gris clair': ['Light grey', 'رمادي فاتح'],
  'Gris moyen': ['Mid grey', 'رمادي متوسط'],
  'Gris anthracite': ['Anthracite grey', 'رمادي فحمي'],
  Noir: ['Black', 'أسود'],
  'Bleu clair': ['Light blue', 'أزرق فاتح'],
  'Bleu vif': ['Bright blue', 'أزرق زاهٍ'],
  'Bleu marine': ['Navy blue', 'أزرق كحلي'],
  'Vert anis': ['Lime green', 'أخضر ليموني'],
  'Vert vif': ['Bright green', 'أخضر زاهٍ'],
  'Vert foncé': ['Dark green', 'أخضر داكن'],
  Turquoise: ['Turquoise', 'فيروزي'],
  'Bleu-vert clair métallisé': ['Light metallic blue-green', 'أزرق مخضر معدني فاتح'],
  Jaune: ['Yellow', 'أصفر'],
  'Jaune vif': ['Bright yellow', 'أصفر زاهٍ'],
  Rouge: ['Red', 'أحمر'],
  Orange: ['Orange', 'برتقالي'],
  'Rouge vif': ['Bright red', 'أحمر زاهٍ'],
  Bordeaux: ['Burgundy', 'عنابي'],
  'Rose fuchsia': ['Fuchsia pink', 'وردي فوشيا'],
  Violet: ['Purple', 'بنفسجي'],
  'Violet foncé': ['Dark purple', 'بنفسجي داكن'],
  'Brun chocolat': ['Chocolate brown', 'بني شوكولاتة'],
  'Gris métallisé': ['Metallic grey', 'رمادي معدني'],
  'Champagne / bronze': ['Champagne / bronze', 'شمبانيا / برونزي'],
  'Bleu royal': ['Royal blue', 'أزرق ملكي'],
  'Jaune orangé': ['Orange yellow', 'أصفر برتقالي'],
  'Rouge foncé': ['Dark red', 'أحمر داكن'],
  'Brun rouge': ['Red brown', 'بني محمر'],
  'Rose clair': ['Light pink', 'وردي فاتح'],
  Argent: ['Silver', 'فضي'],
  'Blanc nacré': ['Pearl white', 'أبيض لؤلؤي'],
  Gris: ['Grey', 'رمادي'],
  'Transparent incolore': ['Clear', 'شفاف'],
  'Rose vif': ['Hot pink', 'وردي زاهٍ'],
  'Bleu indigo': ['Indigo blue', 'أزرق نيلي'],
  'Turquoise clair': ['Light turquoise', 'فيروزي فاتح'],
  'Vert pétrole': ['Petrol green', 'أخضر بترولي'],
  Vert: ['Green', 'أخضر'],
  'Jaune citron': ['Lemon yellow', 'أصفر ليموني'],
  'Jaune doré': ['Golden yellow', 'أصفر ذهبي'],
  'Orange clair': ['Light orange', 'برتقالي فاتح'],
  'Orange soutenu': ['Deep orange', 'برتقالي غامق'],
  'Rouge profond': ['Deep red', 'أحمر عميق'],
  Lilas: ['Lilac', 'ليلكي'],
  'Bleu ciel': ['Sky blue', 'أزرق سماوي'],
  'Bleu cyan': ['Cyan blue', 'أزرق سماوي زاهٍ'],
  'Bleu azur': ['Azure blue', 'أزرق لازوردي'],
  'Vert éclatant': ['Vivid green', 'أخضر ساطع'],
  'Vert émeraude': ['Emerald green', 'أخضر زمردي'],
  Marron: ['Brown', 'بني'],
  'Argent métallisé': ['Metallic silver', 'فضي معدني'],
  'Or métallisé': ['Metallic gold', 'ذهبي معدني'],
  'Bleu métallisé': ['Metallic blue', 'أزرق معدني'],
  'Violet métallisé': ['Metallic purple', 'بنفسجي معدني'],
  'Vert métallisé': ['Metallic green', 'أخضر معدني'],
  'Rouge métallisé': ['Metallic red', 'أحمر معدني'],
  'Argent miroir': ['Mirror silver', 'فضي مرآة'],
  'Or miroir': ['Mirror gold', 'ذهبي مرآة'],
  'Argent pailleté': ['Glitter silver', 'فضي لامع'],
  'Or pailleté': ['Glitter gold', 'ذهبي لامع'],
  'Noir pailleté': ['Glitter black', 'أسود لامع'],
  'Effet carbone noir': ['Black carbon effect', 'أسود بتأثير الكربون'],
  'Effet carbone argent': ['Silver carbon effect', 'فضي بتأثير الكربون'],
  'Bois brun': ['Brown wood', 'خشب بني'],
  'Marbre blanc': ['White marble', 'رخام أبيض'],
  'Camouflage vert / brun': ['Green / brown camo', 'تمويه أخضر / بني'],
  'Camouflage gris': ['Grey camo', 'تمويه رمادي'],
  'Camouflage numérique': ['Digital camo', 'تمويه رقمي'],
  'Noir à motif géométrique': ['Black geometric pattern', 'أسود بنقش هندسي'],
  'Gris à motif géométrique': ['Grey geometric pattern', 'رمادي بنقش هندسي'],
  'Blanc texturé': ['Textured white', 'أبيض محبب'],
  'Bleu à relief géométrique': ['Blue geometric relief', 'أزرق بنقش بارز'],
  'Argent à relief géométrique': ['Silver geometric relief', 'فضي بنقش بارز'],
}

const name = (fr: string): L10n => {
  const [en, ar] = NAMES[fr] ?? [fr, fr]
  return l(fr, en, ar)
}

/** [id, French name, hex, manufacturer code?] → swatch. */
const chart = (rows: [string, string, string, string?][]): Swatch[] => rows.map(([id, fr, hex, code]) => ({ id, name: name(fr), hex, code }))

// ---------------------------------------------------------------------------
// Charts
// ---------------------------------------------------------------------------

export const forexWhite = chart([['FX-BL', 'Blanc', '#FFFFFF']])
export const forexBlack = chart([['FX-NO', 'Noir', '#202020']])

export const alucobond = chart([
  ['AC-01', 'Blanc', '#F1F1EF', 'AM 0011'], ['AC-02', 'Ivoire / crème', '#A69A77', 'AM 0020'], ['AC-03', 'Gris clair', '#7B797A', 'AM 0014'],
  ['AC-04', 'Gris moyen', '#4C4A4F', 'AM 0015'], ['AC-05', 'Gris anthracite', '#1F1F23', 'AM 0030'], ['AC-06', 'Noir', '#161514', 'AM 0010'],
  ['AC-07', 'Bleu clair', '#5A6C88', 'AM 0041'], ['AC-08', 'Bleu vif', '#172856', 'AM 0012'], ['AC-09', 'Bleu marine', '#191A33', 'AM 0013'],
  ['AC-10', 'Vert anis', '#6B7319', 'AM 0021'], ['AC-11', 'Vert vif', '#2E5A2A', 'AM 0036'], ['AC-12', 'Vert foncé', '#163A2A', 'AM 0019'],
  ['AC-13', 'Turquoise', '#1F4A59', 'AM 0038'], ['AC-14', 'Bleu-vert clair métallisé', '#97AEB2', 'AM 0028'], ['AC-15', 'Jaune', '#A47500', 'AM 0018'],
  ['AC-16', 'Orange', '#934232', 'AM 0017'], ['AC-17', 'Rouge vif', '#641017', 'AM 0016'], ['AC-18', 'Bordeaux', '#321616', 'AM 0022'],
  ['AC-19', 'Rose fuchsia', '#631E37', 'AM 0023'], ['AC-20', 'Violet', '#4A2049', 'AM 0042'], ['AC-21', 'Violet foncé', '#2A1A3B', 'AM 0037'],
  ['AC-22', 'Brun chocolat', '#140C0C', 'AM 0039'], ['AC-23', 'Gris métallisé', '#4E5253', 'AM 0040'], ['AC-24', 'Champagne / bronze', '#876E58', 'AM 0029'],
  ['AC-25', 'Bleu royal', '#1C2A52', 'AS-9917'], ['AC-26', 'Jaune orangé', '#8E501A', 'AS-9925'], ['AC-27', 'Rouge foncé', '#59111A', 'AS-9956LG'],
  ['AC-28', 'Brun rouge', '#452A24', 'AS-T9911'], ['AC-29', 'Rose clair', '#B08394', 'ZM-019'], ['AC-30', 'Argent', '#BFC3BD', 'ZM-015'],
  ['AC-31', 'Blanc nacré', '#C8D3DB', 'ZM-026'],
])

/** 150 × 300 cm sheets come in three colours only. */
export const alucobondXL = chart([['AG-01', 'Noir', '#1A1A1A'], ['AG-02', 'Blanc', '#FFFFFF'], ['AG-03', 'Gris', '#888888']])

export const pmma = chart([
  ['PC-01', 'Blanc', '#FFFFFF'], ['PC-02', 'Noir', '#1C1C1C'], ['PC-03', 'Transparent incolore', '#E3ECF0'],
  ['PC-04', 'Jaune', '#E6AD25'], ['PC-05', 'Orange', '#E8622E'], ['PC-06', 'Rouge', '#C9282A'],
  ['PC-07', 'Rose vif', '#CC7E80'], ['PC-08', 'Rose fuchsia', '#721A2F'], ['PC-09', 'Violet', '#66123F'],
  ['PC-10', 'Bleu royal', '#1129BC'], ['PC-11', 'Bleu indigo', '#221E55'], ['PC-12', 'Turquoise clair', '#2CA5AF'],
  ['PC-13', 'Vert pétrole', '#376263'], ['PC-14', 'Vert', '#2E9F5F'], ['PC-15', 'Vert anis', '#61AD2A'],
])

export const vinylPlain = chart([
  ['AD-C01', 'Blanc', '#F2F2F0'], ['AD-C02', 'Ivoire / crème', '#E3D3A5'], ['AD-C03', 'Gris clair', '#6C6E6F'], ['AD-C04', 'Gris moyen', '#87847C'],
  ['AD-C05', 'Gris anthracite', '#57534B'], ['AD-C06', 'Noir', '#151515'], ['AD-C07', 'Jaune citron', '#EFDD1C'], ['AD-C08', 'Jaune vif', '#F2DE34'],
  ['AD-C09', 'Jaune doré', '#D9930A'], ['AD-C10', 'Jaune orangé', '#C47E10'], ['AD-C11', 'Orange clair', '#F06508'], ['AD-C12', 'Orange soutenu', '#EE5122'],
  ['AD-C13', 'Rouge vif', '#AF1F13'], ['AD-C14', 'Rouge profond', '#B71A25'], ['AD-C15', 'Bordeaux', '#722022'], ['AD-C16', 'Rose fuchsia', '#CB345E'],
  ['AD-C17', 'Rose vif', '#F4589E'], ['AD-C18', 'Lilas', '#7C6492'], ['AD-C19', 'Violet', '#6040AB'], ['AD-C20', 'Bleu ciel', '#5A91C5'],
  ['AD-C21', 'Bleu cyan', '#2E93DE'], ['AD-C22', 'Bleu azur', '#0B60CF'], ['AD-C23', 'Bleu royal', '#2B61CE'], ['AD-C24', 'Bleu marine', '#22297A'],
  ['AD-C25', 'Turquoise', '#3893AE'], ['AD-C26', 'Vert anis', '#97D444'], ['AD-C27', 'Vert éclatant', '#4DC10D'], ['AD-C28', 'Vert vif', '#45A84F'],
  ['AD-C29', 'Vert émeraude', '#27805F'], ['AD-C30', 'Vert foncé', '#2B4232'], ['AD-C31', 'Marron', '#3D2B22'],
])

export const vinylFinishes = chart([
  ['AD-F01', 'Argent métallisé', '#B7B7B0'], ['AD-F02', 'Or métallisé', '#B39237'], ['AD-F03', 'Bleu métallisé', '#244E98'], ['AD-F04', 'Violet métallisé', '#68479B'],
  ['AD-F05', 'Vert métallisé', '#25A833'], ['AD-F06', 'Rouge métallisé', '#B91A38'], ['AD-F07', 'Argent miroir', '#C9CED1'], ['AD-F08', 'Or miroir', '#D3AF39'],
  ['AD-F09', 'Argent pailleté', '#C7C6C3'], ['AD-F10', 'Or pailleté', '#C2A324'], ['AD-F11', 'Noir pailleté', '#232323'], ['AD-F12', 'Effet carbone noir', '#2F2F33'],
  ['AD-F13', 'Effet carbone argent', '#A7ABAD'], ['AD-F14', 'Bois brun', '#75482E'], ['AD-F15', 'Marbre blanc', '#EEEEEA'], ['AD-F16', 'Camouflage vert / brun', '#677053'],
  ['AD-F17', 'Camouflage gris', '#858684'], ['AD-F18', 'Camouflage numérique', '#757677'], ['AD-F19', 'Noir à motif géométrique', '#333437'], ['AD-F20', 'Gris à motif géométrique', '#A8A9A8'],
  ['AD-F21', 'Blanc texturé', '#ECECE8'], ['AD-F22', 'Bleu à relief géométrique', '#168ACA'], ['AD-F23', 'Argent à relief géométrique', '#BEC4C3'],
])

// ---------------------------------------------------------------------------
// Materials (sale price per m²)
// ---------------------------------------------------------------------------

export type MaterialId = 'FX-01' | 'FX-02' | 'FX-03' | 'FX-04' | 'AL-01' | 'AL-02' | 'PM-01' | 'AD-01'

export type Material = {
  id: MaterialId
  label: L10n
  spec: L10n
  /** Sale price, DA / m². */
  perM2: number
  /** Colour charts offered with this material (several for cut vinyl: plain + finishes). */
  charts: readonly { title: L10n; swatches: readonly Swatch[] }[]
}

const plain = l('Couleurs unies', 'Plain colours', 'ألوان سادة')

export const materials: readonly Material[] = [
  { id: 'FX-01', label: l('Forex blanc 5 mm', 'White Forex 5 mm', 'فوركس أبيض 5 مم'), spec: l('Feuille 122 × 244 cm', '122 × 244 cm sheet', 'لوح 122 × 244 سم'), perM2: 2500, charts: [{ title: plain, swatches: forexWhite }] },
  { id: 'FX-02', label: l('Forex blanc 8 mm', 'White Forex 8 mm', 'فوركس أبيض 8 مم'), spec: l('Feuille 122 × 244 cm', '122 × 244 cm sheet', 'لوح 122 × 244 سم'), perM2: 3500, charts: [{ title: plain, swatches: forexWhite }] },
  { id: 'FX-03', label: l('Forex blanc 10 mm', 'White Forex 10 mm', 'فوركس أبيض 10 مم'), spec: l('Feuille 122 × 244 cm', '122 × 244 cm sheet', 'لوح 122 × 244 سم'), perM2: 4000, charts: [{ title: plain, swatches: forexWhite }] },
  { id: 'FX-04', label: l('Forex noir 10 mm', 'Black Forex 10 mm', 'فوركس أسود 10 مم'), spec: l('Feuille 122 × 244 cm', '122 × 244 cm sheet', 'لوح 122 × 244 سم'), perM2: 4500, charts: [{ title: plain, swatches: forexBlack }] },
  { id: 'AL-01', label: l('Alucobond 5 mm', 'Alucobond 5 mm', 'ألوكوبوند 5 مم'), spec: l('Feuille 122 × 244 cm · 31 coloris', '122 × 244 cm sheet · 31 colours', 'لوح 122 × 244 سم · 31 لونًا'), perM2: 5000, charts: [{ title: plain, swatches: alucobond }] },
  { id: 'AL-02', label: l('Alucobond 5 mm grand format', 'Alucobond 5 mm large format', 'ألوكوبوند 5 مم حجم كبير'), spec: l('Feuille 150 × 300 cm · noir, blanc, gris', '150 × 300 cm sheet · black, white, grey', 'لوح 150 × 300 سم · أسود، أبيض، رمادي'), perM2: 5500, charts: [{ title: plain, swatches: alucobondXL }] },
  { id: 'PM-01', label: l('PMMA 2,8 mm', 'PMMA 2.8 mm', 'PMMA 2.8 مم'), spec: l('Feuille 122 × 244 cm · 15 coloris', '122 × 244 cm sheet · 15 colours', 'لوح 122 × 244 سم · 15 لونًا'), perM2: 7000, charts: [{ title: plain, swatches: pmma }] },
  {
    id: 'AD-01',
    label: l('Autocollant de découpe', 'Cut vinyl', 'ملصق مقصوص'),
    spec: l('31 teintes unies + 23 finitions', '31 plain colours + 23 finishes', '31 لونًا سادة + 23 تشطيبًا'),
    perM2: 2400,
    charts: [
      { title: plain, swatches: vinylPlain },
      { title: l('Finitions et aspects', 'Finishes and effects', 'التشطيبات والمظاهر'), swatches: vinylFinishes },
    ],
  },
]

// ---------------------------------------------------------------------------
// LED modules (7.5 × 2 cm; 1 sheet = 20 pieces; 1 bag = 10 sheets = 200 pieces)
// ---------------------------------------------------------------------------

export const LED_PER_SHEET = 20
export const LED_PER_BAG = 200

export const leds = [
  { id: 'LED-01', name: name('Blanc'), glow: '#F4F7FF', price: 50 },
  { id: 'LED-02', name: l('Rouge', 'Red', 'أحمر'), glow: '#FF2A2A', price: 60 },
  { id: 'LED-03', name: l('Rose', 'Pink', 'وردي'), glow: '#F23FD3', price: 60 },
  { id: 'LED-04', name: l('Bleu', 'Blue', 'أزرق'), glow: '#2E5BFF', price: 60 },
  { id: 'LED-05', name: name('Vert'), glow: '#2BD98A', price: 60 },
  { id: 'LED-06', name: name('Jaune'), glow: '#FFB22E', price: 60 },
] as const

export type LedId = (typeof leds)[number]['id']

// ---------------------------------------------------------------------------
// Estimate
// ---------------------------------------------------------------------------

export type SignState = {
  material: MaterialId | null
  color: string | null
  w: string
  h: string
  qty: number
  led: LedId | null
  ledPieces: number
  /** Text drawn in the live preview and sent with the request. */
  text: string
  font: PreviewFont
}

export type PreviewFont = 'modern' | 'condensed' | 'arabic'

export const emptySign: SignState = { material: null, color: null, w: '', h: '', qty: 1, led: null, ledPieces: LED_PER_SHEET, text: '', font: 'modern' }

const num = (text: string) => Number(text.replace(',', '.')) || 0

/** All swatches of a material, flattened. */
export const swatchesOf = (m: Material) => m.charts.flatMap((c) => c.swatches)

export function signLines(s: SignState, lang: Lang): QuoteLine[] {
  const lines: QuoteLine[] = []
  const material = materials.find((m) => m.id === s.material)
  if (material) {
    const w = num(s.w)
    const h = num(s.h)
    const m2 = areaM2(w, h, s.qty)
    const color = swatchesOf(material).find((c) => c.id === s.color)
    const detail = [color ? `${color.name[lang]} (${color.id})` : null, w && h ? `${w} × ${h} cm × ${s.qty} · ${m2.toFixed(2)} m²` : null].filter(Boolean).join(' · ')
    lines.push({ label: material.label[lang], detail: detail || undefined, amount: m2 ? Math.round(m2 * material.perM2) : null })
  }
  const led = leds.find((x) => x.id === s.led)
  if (led) lines.push({ label: `LED ${led.name[lang]}`, detail: `${s.ledPieces} × ${led.price} DA`, amount: s.ledPieces * led.price })
  return lines
}

// ---------------------------------------------------------------------------
// Sign gallery: each mockup shows the sign unlit (left half) and lit (right half),
// except the two single views.
// ---------------------------------------------------------------------------

export type Sign = { id: string; name: string; w: number; h: number; pair: boolean }

/** Sign mockups (names and sizes); each platform pairs them with its own image files by id. */
export const signCatalog: readonly Sign[] = [
  { id: 'lion', name: 'Lion', w: 1200, h: 600, pair: true },
  { id: 'lavilla', name: 'La Villa', w: 1200, h: 600, pair: true },
  { id: 'crunchy', name: 'Crunchy', w: 1200, h: 512, pair: true },
  { id: 'salhi', name: 'Salhi Sweet World', w: 1200, h: 480, pair: true },
  { id: 'littlebee', name: 'Little Bee', w: 1200, h: 400, pair: true },
  { id: 'fastfood', name: 'Fast Food', w: 1200, h: 800, pair: true },
  { id: 'lightbox', name: 'Speedy · Light Box', w: 1200, h: 800, pair: true },
  { id: 'cuistot', name: 'Le Cuistot', w: 1200, h: 800, pair: true },
  { id: 'boitier', name: 'Boîtier lumineux PMMA', w: 1200, h: 600, pair: true },
  { id: 'br35', name: 'BR-35', w: 1200, h: 600, pair: true },
  { id: 'evapor', name: 'E-Vapor', w: 1200, h: 512, pair: true },
  { id: 'electromenager', name: 'Électroménager', w: 1200, h: 600, pair: true },
  { id: 'fanta', name: 'Fanta', w: 1200, h: 512, pair: true },
  { id: 'fantome', name: 'Fantôme', w: 1200, h: 600, pair: true },
  { id: 'grvb', name: 'G-RVB', w: 1200, h: 600, pair: true },
  { id: 'tiktok', name: 'TikTok', w: 1200, h: 600, pair: true },
  { id: 'artcom', name: 'ART-COM', w: 1200, h: 400, pair: true },
  { id: 'lettres', name: 'Lettres découpées', w: 1200, h: 400, pair: true },
  { id: 'kinou', name: 'Kinou', w: 646, h: 700, pair: false },
  { id: 'elriadh', name: 'El Riadh Bijouterie', w: 700, h: 639, pair: false },
]

export const enseigne = {
  galleryTitle: l('Nos enseignes', 'Our signs', 'لافتاتنا'),
  galleryHint: l('Allumez-les pour voir le rendu de nuit.', 'Switch them on to see them at night.', 'شغّلها لترى مظهرها ليلًا.'),
  lightsOn: l('Allumer', 'Lights on', 'تشغيل'),
  estimatorTitle: l('Estimez votre enseigne', 'Estimate your sign', 'قدّر سعر لافتتك'),
  estimatorHint: l(
    'Choisissez la matière, la couleur et la taille : le prix au m² s’applique à la surface.',
    'Pick the material, colour and size: the price per m² applies to the area.',
    'اختر المادة واللون والمقاس: يُطبَّق السعر للمتر المربع على المساحة.',
  ),
  materialTitle: l('Matière', 'Material', 'المادة'),
  colorTitle: l('Couleur', 'Colour', 'اللون'),
  colorNote: l(
    'Teintes indicatives prélevées sur photo : une correspondance exacte nécessite un échantillon réel.',
    'Indicative shades taken from photos: an exact match needs a real sample.',
    'ألوان تقريبية مأخوذة من صور: المطابقة الدقيقة تتطلب عينة حقيقية.',
  ),
  sizeTitle: l('Dimensions', 'Size', 'المقاسات'),
  ledTitle: l('Éclairage LED', 'LED lighting', 'إضاءة LED'),
  ledHint: l(
    'Modules 7,5 × 2 cm · 1 plaque = 20 pièces · 1 sachet = 200 pièces.',
    'Modules 7.5 × 2 cm · 1 sheet = 20 pieces · 1 bag = 200 pieces.',
    'وحدات 7.5 × 2 سم · اللوحة = 20 قطعة · الكيس = 200 قطعة.',
  ),
  ledNone: l('Sans LED', 'No LED', 'دون LED'),
  ledPieces: l('Nombre de modules', 'Number of modules', 'عدد الوحدات'),
  plusSheet: l('+ 1 plaque', '+ 1 sheet', '+ لوحة'),
  plusBag: l('+ 1 sachet', '+ 1 bag', '+ كيس'),
  notes: l('Votre projet (texte, lieu, pose…)', 'Your project (text, location, fitting…)', 'مشروعك (النص، المكان، التركيب…)'),
  previewTitle: l('Aperçu de votre enseigne', 'Preview your sign', 'معاينة لافتتك'),
  previewHint: l(
    'Tapez votre nom : il s’affiche sur la matière, la couleur et les proportions choisies.',
    'Type your name: it appears on the chosen material, colour and proportions.',
    'اكتب اسمك: يظهر على المادة واللون والأبعاد المختارة.',
  ),
  textLabel: l('Texte de l’enseigne', 'Sign text', 'نص اللافتة'),
  textPlaceholder: l('Votre nom', 'Your name', 'اسمك'),
  fonts: {
    modern: l('Moderne', 'Modern', 'عصري'),
    condensed: l('Étroit', 'Condensed', 'ضيّق'),
    arabic: l('Arabe', 'Arabic', 'عربي'),
  },
  night: l('Allumer (nuit)', 'Lights on (night)', 'تشغيل (ليلًا)'),
  nightHint: l('Choisissez une couleur LED pour voir l’enseigne allumée.', 'Pick an LED colour to see the sign lit.', 'اختر لون LED لرؤية اللافتة مضاءة.'),
  previewNote: l('Aperçu indicatif : le rendu final est validé sur maquette.', 'Indicative preview: the final look is approved on a mock-up.', 'معاينة تقريبية: الشكل النهائي يُعتمد على نموذج.'),
}
