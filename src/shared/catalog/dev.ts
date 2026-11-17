// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/** Pixel Development: web, mobile, POS and software offers with their price list (Nov 2026). */
import { formatDA, l, type L10n, type Lang, type Price, type QuoteLine } from './core'

export type DevGroup = 'web' | 'mobile' | 'pos' | 'software' | 'services'

export type DevUnit = 'month' | 'year' | 'hour'

export type DevProject = {
  id: string
  group: DevGroup
  label: L10n
  desc: L10n
  /** Price in DA, or `null` when on quote. */
  price: Price
  /** "À partir de": the price is a starting point. */
  from?: boolean
  /** Recurring or per-hour price. */
  unit?: DevUnit
  /** One-time fee added on top of `price` (POS installation). */
  setup?: number
}

export const devGroups: readonly { id: DevGroup; label: L10n; intro: L10n }[] = [
  {
    id: 'web',
    label: l('Sites web', 'Websites', 'المواقع الإلكترونية'),
    intro: l(
      'Création de site internet en Algérie : site vitrine pour présenter votre entreprise, landing page pour vos campagnes publicitaires, ou boutique en ligne avec paiement à la livraison.',
      'Website design in Algeria: a showcase site to present your business, a landing page for your ad campaigns, or an online store with cash on delivery.',
      'إنشاء مواقع إلكترونية في الجزائر: موقع تعريفي لتقديم مؤسستك، صفحة هبوط لحملاتك الإعلانية، أو متجر إلكتروني مع الدفع عند الاستلام.',
    ),
  },
  {
    id: 'mobile',
    label: l('Applications mobiles', 'Mobile apps', 'تطبيقات الجوال'),
    intro: l(
      'Développement d’applications Android et iOS pour vos clients ou vos équipes, de la maquette jusqu’à la publication sur Google Play et l’App Store.',
      'Android and iOS app development for your customers or your teams, from the mock-up to publication on Google Play and the App Store.',
      'تطوير تطبيقات Android وiOS لزبائنك أو لفرقك، من النموذج الأولي إلى النشر على Google Play وApp Store.',
    ),
  },
  {
    id: 'pos',
    label: l('Caisse (POS)', 'Point of sale (POS)', 'نقاط البيع (POS)'),
    intro: l(
      'Logiciel de caisse pour restaurants, fast-foods, cafés, boutiques et supérettes : installé chez vous et prêt à encaisser.',
      'Point of sale software for restaurants, fast-food outlets, cafés, shops and convenience stores: installed on site and ready to take payments.',
      'برنامج نقاط البيع للمطاعم والوجبات السريعة والمقاهي والمحلات والمتاجر الصغيرة: يُركَّب عندك وجاهز للبيع.',
    ),
  },
  {
    id: 'software',
    label: l('Logiciels & IA', 'Software & AI', 'البرمجيات والذكاء الاصطناعي'),
    intro: l(
      'Logiciels de gestion ERP et CRM, solutions d’intelligence artificielle et intégrations API pour automatiser votre activité.',
      'ERP and CRM management software, artificial intelligence solutions and API integrations to automate your business.',
      'برامج تسيير ERP وCRM، حلول الذكاء الاصطناعي وربط API لأتمتة نشاطك.',
    ),
  },
  {
    id: 'services',
    label: l('Services & conseil', 'Services & consulting', 'الخدمات والاستشارة'),
    intro: l(
      'Référencement SEO, conseil, étude de projet, hébergement et noms de domaine pour une présence en ligne solide et durable.',
      'SEO, consulting, project studies, hosting and domain names for a solid, lasting online presence.',
      'تحسين محركات البحث، الاستشارة، دراسة المشاريع، الاستضافة وأسماء النطاقات لحضور رقمي قوي ودائم.',
    ),
  },
]

/** What each offer includes, shown as a checklist on its card. */
export const devFeatures: Readonly<Record<string, readonly L10n[]>> = {
  vitrine: [
    l('5 à 10 pages : accueil, services, à propos, contact…', '5 to 10 pages: home, services, about, contact…', '5 إلى 10 صفحات: الرئيسية، الخدمات، من نحن، اتصل بنا…'),
    l('Design responsive, rapide et optimisé pour Google', 'Responsive, fast design optimised for Google', 'تصميم متجاوب وسريع ومحسّن لـ Google'),
    l('Formulaire de contact, WhatsApp et Google Maps', 'Contact form, WhatsApp and Google Maps', 'نموذج اتصال، واتساب وخرائط Google'),
    l('Domaine + hébergement 1 an, maintenance 3 mois', 'Domain + hosting for 1 year, 3 months maintenance', 'نطاق + استضافة لمدة سنة، صيانة 3 أشهر'),
  ],
  landing: [
    l('Une page pensée pour la conversion', 'One page built for conversion', 'صفحة واحدة مصممة للتحويل'),
    l('Formulaire de commande ou de contact', 'Order or contact form', 'نموذج طلب أو اتصال'),
    l('Suivi Meta Pixel et Google Analytics', 'Meta Pixel and Google Analytics tracking', 'تتبع Meta Pixel وGoogle Analytics'),
    l('Idéale pour vos campagnes Facebook, Instagram et TikTok', 'Ideal for your Facebook, Instagram and TikTok campaigns', 'مثالية لحملاتك على فيسبوك وإنستغرام وتيك توك'),
  ],
  ecommerce: [
    l('Catalogue produits, variantes et stocks', 'Product catalogue, variants and stock', 'كتالوج المنتجات، الخيارات والمخزون'),
    l('Commandes avec paiement à la livraison', 'Orders with cash on delivery', 'طلبات مع الدفع عند الاستلام'),
    l('Sociétés de livraison intégrées, envoi vers toutes les wilayas', 'Delivery companies built in, shipping to every wilaya', 'شركات التوصيل مدمجة، الإرسال إلى جميع الولايات'),
    l('Hébergement et mises à jour inclus dans l’abonnement', 'Hosting and updates included in the subscription', 'الاستضافة والتحديثات مشمولة في الاشتراك'),
  ],
  'ecommerce-custom': [
    l('Design et parcours d’achat uniques', 'Unique design and checkout journey', 'تصميم ومسار شراء فريدان'),
    l('Fonctionnalités sur mesure : B2B, multi-vendeurs, abonnements…', 'Custom features: B2B, multi-vendor, subscriptions…', 'ميزات حسب الطلب: B2B، متعدد البائعين، اشتراكات…'),
    l('Paiement en ligne et sociétés de livraison', 'Online payment and delivery companies', 'الدفع الإلكتروني وشركات التوصيل'),
    l('Le code et les données vous appartiennent', 'You own the code and the data', 'الكود والبيانات ملكك'),
  ],
  mobile: [
    l('Android et iOS', 'Android and iOS', 'Android وiOS'),
    l('Maquettes UI/UX validées avant développement', 'UI/UX mock-ups approved before development', 'نماذج UI/UX تتم الموافقة عليها قبل التطوير'),
    l('Notifications push', 'Push notifications', 'إشعارات فورية'),
    l('Connexion à votre site ou à votre API', 'Connected to your website or API', 'ربط بموقعك أو بواجهة API'),
  ],
  store: [
    l('Création ou configuration des comptes développeur', 'Developer account setup', 'إنشاء أو إعداد حسابات المطور'),
    l('Fiche store : textes, captures et icône', 'Store listing: texts, screenshots and icon', 'صفحة المتجر: النصوص والصور والأيقونة'),
    l('Conformité aux règles Google et Apple', 'Compliance with Google and Apple rules', 'الامتثال لقواعد Google وApple'),
    l('Suivi jusqu’à la mise en ligne', 'Follow-up until the app is live', 'المتابعة حتى النشر'),
  ],
  pos: [
    l('Encaissement et tickets rapides', 'Fast checkout and receipts', 'بيع وتذاكر سريعة'),
    l('Gestion des produits et des stocks', 'Product and stock management', 'تسيير المنتجات والمخزون'),
    l('Rapports des ventes', 'Sales reports', 'تقارير المبيعات'),
    l('Installation sur place et prise en main incluses', 'On-site installation and onboarding included', 'التركيب في المكان والتدريب على الاستعمال مشمولان'),
  ],
  'pos-custom': [
    l('Adaptée à vos flux : tables, livraisons, multi-caisses', 'Built around your workflow: tables, delivery, multiple tills', 'مكيّف حسب عملك: الطاولات، التوصيل، عدة صناديق'),
    l('Multi-magasins et rôles des employés', 'Multiple stores and staff roles', 'عدة محلات وصلاحيات الموظفين'),
    l('Connexion à votre boutique en ligne ou ERP', 'Connected to your online store or ERP', 'ربط بمتجرك الإلكتروني أو ERP'),
    l('Imprimante ticket, tiroir-caisse, lecteur code-barres', 'Receipt printer, cash drawer, barcode scanner', 'طابعة التذاكر، درج النقود، قارئ الباركود'),
  ],
  erp: [
    l('Ventes, achats, stocks et facturation', 'Sales, purchasing, stock and invoicing', 'المبيعات والمشتريات والمخزون والفوترة'),
    l('Fichier clients et suivi commercial', 'Customer database and sales follow-up', 'قاعدة الزبائن والمتابعة التجارية'),
    l('Accès par rôle pour vos équipes', 'Role-based access for your teams', 'صلاحيات حسب الدور لفرقك'),
    l('Tableaux de bord et rapports', 'Dashboards and reports', 'لوحات متابعة وتقارير'),
  ],
  ai: [
    l('Chatbot pour site, WhatsApp ou Messenger', 'Chatbot for your website, WhatsApp or Messenger', 'روبوت محادثة لموقعك أو واتساب أو ماسنجر'),
    l('Automatisation des tâches répétitives', 'Automation of repetitive tasks', 'أتمتة المهام المتكررة'),
    l('Assistant entraîné sur vos documents', 'Assistant trained on your documents', 'مساعد مدرّب على وثائقك'),
    l('Intégration à vos outils existants', 'Integrated with your existing tools', 'دمج مع أدواتك الحالية'),
  ],
  api: [
    l('API REST documentée', 'Documented REST API', 'واجهة REST API موثقة'),
    l('Paiement en ligne CIB et Edahabia', 'CIB and Edahabia online payment', 'الدفع الإلكتروني CIB والذهبية'),
    l('Sociétés de livraison et envoi de SMS', 'Delivery companies and SMS sending', 'شركات التوصيل وإرسال الرسائل القصيرة'),
    l('Synchronisation entre vos outils', 'Sync between your tools', 'مزامنة بين أدواتك'),
  ],
  seo: [
    l('Audit technique et recherche de mots-clés', 'Technical audit and keyword research', 'تدقيق تقني وبحث الكلمات المفتاحية'),
    l('Optimisation des pages et des contenus', 'Page and content optimisation', 'تحسين الصفحات والمحتوى'),
    l('Fiche Google Business Profile (référencement local)', 'Google Business Profile (local SEO)', 'ملف Google Business Profile (السيو المحلي)'),
    l('Visibilité dans ChatGPT, Gemini et Perplexity', 'Visibility in ChatGPT, Gemini and Perplexity', 'الظهور في ChatGPT وGemini وPerplexity'),
  ],
  consulting: [
    l('Choix des technologies et de l’hébergement', 'Choice of technologies and hosting', 'اختيار التقنيات والاستضافة'),
    l('Revue de projet ou de code', 'Project or code review', 'مراجعة المشروع أو الكود'),
    l('Stratégie digitale et e-commerce', 'Digital and e-commerce strategy', 'استراتيجية رقمية وتجارة إلكترونية'),
    l('Facturé à l’heure, sans engagement', 'Billed by the hour, no commitment', 'بالساعة، دون التزام'),
  ],
  study: [
    l('Analyse de votre besoin', 'Analysis of your needs', 'تحليل احتياجاتك'),
    l('Cahier des charges détaillé', 'Detailed specifications', 'دفتر شروط مفصل'),
    l('Architecture et choix techniques', 'Architecture and technical choices', 'الهيكلة والخيارات التقنية'),
    l('Planning et budget', 'Timeline and budget', 'الجدول الزمني والميزانية'),
  ],
  hosting: [
    l('Hébergement web et serveurs VPS', 'Web hosting and VPS servers', 'استضافة مواقع وخوادم VPS'),
    l('Certificat SSL (HTTPS)', 'SSL certificate (HTTPS)', 'شهادة SSL (HTTPS)'),
    l('Sauvegardes régulières', 'Regular backups', 'نسخ احتياطية منتظمة'),
    l('Surveillance et support', 'Monitoring and support', 'مراقبة ودعم'),
  ],
  domain: [
    l('Domaine .com à votre nom', '.com domain in your name', 'نطاق ‎.com باسمك'),
    l('Configuration DNS incluse', 'DNS setup included', 'إعداد DNS مشمول'),
    l('Renouvellement : 3 000 DA / an', 'Renewal: 3 000 DA / year', 'التجديد: 3 000 دج / سنة'),
  ],
  emails: [
    l('5 boîtes : 5 000 DA / an', '5 mailboxes: 5 000 DA / year', '5 علب: 5 000 دج / سنة'),
    l('30 boîtes : 10 000 DA / an', '30 mailboxes: 10 000 DA / year', '30 علبة: 10 000 دج / سنة'),
    l('100 boîtes : 30 000 DA / an', '100 mailboxes: 30 000 DA / year', '100 علبة: 30 000 دج / سنة'),
    l('Domaine inclus la 1re année (première commande)', 'Domain included the first year (first order)', 'النطاق مشمول في السنة الأولى (أول طلب)'),
  ],
}

export const devProjects: readonly DevProject[] = [
  // Web
  {
    id: 'vitrine',
    group: 'web',
    label: l('Site vitrine (5 à 10 pages)', 'Showcase website (5 to 10 pages)', 'موقع تعريفي (5 إلى 10 صفحات)'),
    desc: l(
      'Domaine et hébergement inclus 1 an, 3 mois de maintenance. Ensuite : hébergement 5 000 DA / an, domaine 3 000 DA / an.',
      'Domain and hosting included for 1 year, 3 months of maintenance. Then: hosting 5 000 DA / year, domain 3 000 DA / year.',
      'النطاق والاستضافة مشمولان لمدة سنة، و3 أشهر صيانة. بعدها: الاستضافة 5 000 دج / سنة، النطاق 3 000 دج / سنة.',
    ),
    price: 39000,
    from: true,
  },
  {
    id: 'landing',
    group: 'web',
    label: l('Landing page', 'Landing page', 'صفحة هبوط'),
    desc: l('Une page pensée pour convertir vos visiteurs en clients.', 'One page built to turn visitors into customers.', 'صفحة واحدة مصممة لتحويل الزوار إلى زبائن.'),
    price: 5000,
    from: true,
  },
  {
    id: 'ecommerce',
    group: 'web',
    label: l('Boutique e-commerce en abonnement mensuel', 'E-commerce store, monthly subscription', 'متجر إلكتروني باشتراك شهري'),
    desc: l(
      'Votre boutique en ligne clé en main, sans frais de développement : un simple abonnement mensuel. Domaine non inclus : nous vous guidons pour l’obtenir.',
      'Your ready-to-sell online store with no development fee: just a monthly subscription. Domain not included: we guide you to get one.',
      'متجرك الإلكتروني جاهز للبيع دون تكاليف تطوير: مجرد اشتراك شهري. النطاق غير مشمول: نرافقك للحصول عليه.',
    ),
    price: 2000,
    unit: 'month',
  },
  {
    id: 'ecommerce-custom',
    group: 'web',
    label: l('Site e-commerce sur mesure', 'Custom e-commerce website', 'متجر إلكتروني حسب الطلب'),
    desc: l('Une boutique développée spécialement pour vous, avec vos propres fonctionnalités.', 'A store built just for you, with your own features.', 'متجر مطوّر خصيصاً لك بميزاتك الخاصة.'),
    price: null,
  },
  // Mobile
  {
    id: 'mobile',
    group: 'mobile',
    label: l('Développement d’application mobile', 'Mobile app development', 'تطوير تطبيق جوال'),
    desc: l('Application iOS et Android sur mesure.', 'Custom iOS and Android app.', 'تطبيق iOS وAndroid حسب الطلب.'),
    price: null,
  },
  {
    id: 'store',
    group: 'mobile',
    label: l('Publication Play Store / App Store', 'Play Store / App Store publishing', 'النشر على Play Store / App Store'),
    desc: l('Comptes, fiches, captures et mise en ligne de votre application.', 'Accounts, listings, screenshots and release of your app.', 'الحسابات، صفحات المتجر، الصور ونشر تطبيقك.'),
    price: null,
  },
  // POS
  {
    id: 'pos',
    group: 'pos',
    label: l('Caisse POS restauration ou commerce', 'POS for restaurants or shops', 'نظام نقاط بيع للمطاعم أو المحلات'),
    desc: l('Logiciel de caisse prêt à l’emploi, installation incluse.', 'Ready-to-use point of sale software, installation included.', 'برنامج نقاط بيع جاهز للاستعمال، التركيب مشمول.'),
    price: 30000,
  },
  {
    id: 'pos-custom',
    group: 'pos',
    label: l('Caisse POS sur mesure', 'Custom POS', 'نظام نقاط بيع حسب الطلب'),
    desc: l('Une caisse adaptée à votre activité et à vos flux.', 'A POS built around your business and workflows.', 'نظام بيع مكيّف حسب نشاطك وطريقة عملك.'),
    price: null,
  },
  // Software & AI
  {
    id: 'erp',
    group: 'software',
    label: l('ERP / CRM', 'ERP / CRM', 'ERP / CRM'),
    desc: l('Gestion commerciale, stocks, clients et équipes.', 'Sales, stock, customer and team management.', 'تسيير المبيعات والمخزون والزبائن والفرق.'),
    price: null,
  },
  {
    id: 'ai',
    group: 'software',
    label: l('Solutions IA', 'AI solutions', 'حلول الذكاء الاصطناعي'),
    desc: l('Chatbots, automatisations et assistants intelligents.', 'Chatbots, automations and smart assistants.', 'روبوتات محادثة، أتمتة ومساعدات ذكية.'),
    price: null,
  },
  {
    id: 'api',
    group: 'software',
    label: l('API & intégrations', 'API & integrations', 'واجهات API والتكامل'),
    desc: l('Connecter vos outils, paiements, livraison et services tiers.', 'Connect your tools, payments, delivery and third-party services.', 'ربط أدواتك والدفع والتوصيل والخدمات الخارجية.'),
    price: null,
  },
  // Services
  {
    id: 'seo',
    group: 'services',
    label: l('SEO, GEO & AEO', 'SEO, GEO & AEO', 'SEO وGEO وAEO'),
    desc: l('Visibilité sur Google et dans les réponses des IA (ChatGPT, Gemini…).', 'Visibility on Google and in AI answers (ChatGPT, Gemini…).', 'الظهور على Google وفي إجابات الذكاء الاصطناعي (ChatGPT، Gemini…).'),
    price: null,
  },
  {
    id: 'consulting',
    group: 'services',
    label: l('Consulting', 'Consulting', 'استشارة'),
    desc: l('Conseil technique et stratégie digitale avec notre équipe.', 'Technical advice and digital strategy with our team.', 'استشارة تقنية واستراتيجية رقمية مع فريقنا.'),
    price: 4000,
    unit: 'hour',
  },
  {
    id: 'study',
    group: 'services',
    label: l('Étude de projet', 'Project study', 'دراسة المشروع'),
    desc: l('Cahier des charges, architecture et chiffrage de votre projet.', 'Specifications, architecture and costing of your project.', 'دفتر الشروط، الهيكلة وتقدير تكلفة مشروعك.'),
    price: null,
  },
  {
    id: 'hosting',
    group: 'services',
    label: l('Hébergement', 'Hosting', 'الاستضافة'),
    desc: l('Serveurs et hébergement adaptés à votre trafic.', 'Servers and hosting sized for your traffic.', 'خوادم واستضافة حسب حجم زياراتك.'),
    price: null,
  },
  {
    id: 'domain',
    group: 'services',
    label: l('Nom de domaine .com', '.com domain name', 'اسم نطاق ‎.com'),
    desc: l('Réservation et renouvellement de votre domaine.', 'Registration and renewal of your domain.', 'حجز وتجديد نطاقك.'),
    price: 3000,
    unit: 'year',
  },
  {
    id: 'emails',
    group: 'services',
    label: l('Adresses e-mail professionnelles', 'Professional email addresses', 'عناوين بريد إلكتروني احترافية'),
    desc: l(
      'Des adresses à votre nom (contact@votre-entreprise.com). Packs de 5, 30 ou 100 boîtes, domaine inclus la 1re année pour une première commande.',
      'Addresses in your name (contact@your-company.com). Packs of 5, 30 or 100 mailboxes, domain included the first year on a first order.',
      'عناوين باسمك (contact@your-company.com). باقات 5 أو 30 أو 100 علبة، النطاق مشمول في السنة الأولى لأول طلب.',
    ),
    price: 5000,
    from: true,
    unit: 'year',
  },
]

/** Professional email packs, per year. The domain is included the first year on a first order. */
export const devEmailPacks = [
  { boxes: 5, price: 5000 },
  { boxes: 30, price: 10000 },
  { boxes: 100, price: 30000 },
] as const

export type DevEmailBoxes = (typeof devEmailPacks)[number]['boxes']

/** Options shown under an offer once it is picked. */
export const devAddons = {
  dashboard: { label: l('+ Tableau de bord d’administration', '+ Admin dashboard', '+ لوحة تحكم إدارية'), price: 16000 },
  /** With the app the subscription is 3 000 DA / month in total (instead of 2 000). */
  ecomApp: { label: l('+ Application mobile de gestion', '+ Mobile management app', '+ تطبيق جوال للتسيير'), monthlyTotal: 3000 },
} as const

export const devUnits: Record<DevUnit, L10n> = {
  month: l('mois', 'month', 'شهر'),
  year: l('an', 'year', 'سنة'),
  hour: l('h', 'hr', 'سا'),
}

export const dev = {
  title: l('Votre projet', 'Your project', 'مشروعك'),
  current: l('Site actuel, si disponible', 'Current website, if any', 'الموقع الحالي إن وجد'),
  goal: l('Que souhaitez-vous permettre à vos clients ou à votre équipe de faire ?', 'What should your customers or team be able to do?', 'ماذا تريد أن يتمكن زبائنك أو فريقك من فعله؟'),
  hours: l('Nombre d’heures', 'Number of hours', 'عدد الساعات'),
  years: l('Nombre d’années', 'Number of years', 'عدد السنوات'),
  includedTitle: l('Inclus avec le site vitrine', 'Included with a showcase website', 'مشمول مع الموقع التعريفي'),
  included: [
    l('Nom de domaine (1 an)', 'Domain name (1 year)', 'اسم النطاق (سنة)'),
    l('Hébergement (1 an)', 'Hosting (1 year)', 'الاستضافة (سنة)'),
    l('Maintenance (3 mois)', 'Maintenance (3 months)', 'الصيانة (3 أشهر)'),
  ],
  includedNote: l(
    'Renouvellement ensuite : hébergement 5 000 DA / an, domaine 3 000 DA / an.',
    'Renewal afterwards: hosting 5 000 DA / year, domain 3 000 DA / year.',
    'التجديد بعد ذلك: الاستضافة 5 000 دج / سنة، النطاق 3 000 دج / سنة.',
  ),
  emailPack: l('Pack', 'Pack', 'الباقة'),
  emailBoxes: l('{n} boîtes', '{n} mailboxes', '{n} علبة'),
  emailDomain: l('Domaine inclus la 1re année', 'Domain included the first year', 'النطاق مشمول في السنة الأولى'),
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
  paymentNote: l('Projets sur devis : pourcentages du montant total accepté.', 'Quoted projects: percentages of the accepted total.', 'المشاريع حسب الطلب: نسب من المبلغ الإجمالي المقبول.'),
}

export type DevState = {
  projects: string[]
  /** Professional email pack (number of mailboxes). */
  emailBoxes?: DevEmailBoxes
  /** Admin dashboard on the showcase website. */
  dashboard?: boolean
  /** Mobile management app on the e-commerce subscription. */
  ecomApp?: boolean
  /** Consulting hours. */
  hours?: number
  /** .com domain years. */
  domainYears?: number
}

/** "À partir de 39 000 DA", "2 000 DA / mois", "30 000 DA", "Sur devis". */
export function devPriceText(p: DevProject, lang: Lang) {
  if (p.price === null) return { fr: 'Sur devis', en: 'On quote', ar: 'حسب الطلب' }[lang]
  const da = (n: number) => (lang === 'ar' ? `${formatDA(n)} دج` : `${formatDA(n)} DA`)
  let out = da(p.price)
  if (p.unit) out += ` / ${devUnits[p.unit][lang]}`
  if (p.setup) out += ` + ${da(p.setup)}`
  if (p.from) out = { fr: `À partir de ${out}`, en: `From ${out}`, ar: `ابتداءً من ${out}` }[lang]
  return out
}

export function devLines(s: DevState, lang: Lang): QuoteLine[] {
  const lines: QuoteLine[] = []
  const per = (u: DevUnit) => `/ ${devUnits[u][lang]}`
  for (const p of devProjects) {
    if (!s.projects.includes(p.id)) continue
    if (p.id === 'consulting' && p.price) {
      const h = Math.max(1, s.hours ?? 1)
      lines.push({ label: p.label[lang], detail: `${h} × ${formatDA(p.price)} ${per('hour')}`, amount: p.price * h })
    } else if (p.id === 'domain' && p.price) {
      const y = Math.max(1, s.domainYears ?? 1)
      lines.push({ label: p.label[lang], detail: `${y} × ${formatDA(p.price)} ${per('year')}`, amount: p.price * y })
    } else if (p.id === 'emails') {
      const pack = devEmailPacks.find((x) => x.boxes === s.emailBoxes) ?? devEmailPacks[0]
      lines.push({ label: p.label[lang], detail: `${dev.emailBoxes[lang].replace('{n}', String(pack.boxes))} ${per('year')} · ${dev.emailDomain[lang]}`, amount: pack.price })
    } else if (p.id === 'ecommerce' && p.price) {
      // Monthly subscription: the estimate counts the first month.
      const detail = s.ecomApp ? `${devAddons.ecomApp.label[lang].replace('+ ', '')} · ${per('month')}` : per('month')
      lines.push({ label: p.label[lang], detail, amount: s.ecomApp ? devAddons.ecomApp.monthlyTotal : p.price })
    } else {
      lines.push({ label: p.label[lang], amount: p.price })
      if (p.setup) lines.push({ label: { fr: 'Installation', en: 'Installation', ar: 'التركيب' }[lang], detail: p.label[lang], amount: p.setup })
      if (p.id === 'vitrine' && s.dashboard) lines.push({ label: devAddons.dashboard.label[lang].replace('+ ', ''), amount: devAddons.dashboard.price })
    }
  }
  return lines
}
