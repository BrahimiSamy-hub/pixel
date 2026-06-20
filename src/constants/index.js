import {
  serviceDev,
  serviceInfo,
  servicePhoto,
  chromecast,
  disc02,
  davinci,
  AE,
  illustrator,
  premierPro,
  vsCode,
  lightroom,
  serviceAudio,
  figma,
  file02,
  homeSmile,
  notification2,
  notification3,
  notification4,
  photoshop,
  plusSquare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  sliders04,
  servicePub,
  serviceWeeding,
} from '../assets'

export const heroIcons = [homeSmile, file02, searchMd, plusSquare]

export const notificationImages = [notification4, notification3, notification2]

export const companyLogos = Array.from({ length: 32 }, (_, i) => `/images/clientLogos/Fichier ${i + 3}.svg`)

export const brainwaveServices = [
  'Shooting Profesionnel',
  'Shooting Artistique',
  'Shooting Produit',
]

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
]

export const roadmap = [
  {
    id: '0',
    title: 'Studio Photo & Vidéo',
    text: 'Création d\'un studio professionnel équipé pour des shootings produits, portraits et productions vidéo haut de gamme.',
    date: '2021',
    status: 'done',
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: '1',
    title: 'Boutique en ligne',
    text: 'Lancement de notre boutique e-commerce pour commander des produits personnalisés directement en ligne.',
    date: '2023',
    status: 'done',
    imageUrl: roadmap2,
  },
  {
    id: '2',
    title: 'Expansion régionale',
    text: 'Extension de nos services à travers toute l\'Algérie avec des partenariats locaux et une livraison nationale.',
    date: '2024',
    status: 'done',
    imageUrl: roadmap3,
  },
  {
    id: '3',
    title: 'Application Mobile',
    text: 'Développement d\'une application mobile pour suivre vos commandes et collaborer en temps réel avec notre équipe.',
    date: '2025',
    status: 'progress',
    imageUrl: roadmap4,
  },
]

export const collabText =
  "Des outils et des talents réunis pour donner vie à vos projets créatifs, de la conception à la livraison."

export const collabContent = [
  {
    id: '0',
    title: 'Photo',
  },
  {
    id: '1',
    title: 'Graphic Design',
  },
  {
    id: '2',
    title: 'Menu',
  },
  {
    id: '3',
    title: 'Video',
  },
  {
    id: '4',
    title: 'Printing',
  },
  {
    id: '5',
    title: 'Websites',
  },
  {
    id: '6',
    title: 'Wedding',
  },
]

export const collabApps = [
  {
    id: '4',
    title: 'Photoshop',
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: '5',
    title: 'lightroom',
    icon: lightroom,
    width: 34,
    height: 34,
  },
  {
    id: '3',
    title: 'illustrator',
    icon: illustrator,
    width: 34,
    height: 35,
  },
  {
    id: '1',
    title: 'AE',
    icon: AE,
    width: 34,
    height: 36,
  },

  {
    id: '6',
    title: 'premierPro',
    icon: premierPro,
    width: 26,
    height: 34,
  },

  {
    id: '7',
    title: 'davinci',
    icon: davinci,
    width: 38,
    height: 32,
  },

  {
    id: '0',
    title: 'Figma',
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: '2',
    title: 'vsCode',
    icon: vsCode,
    width: 36,
    height: 28,
  },
]

export const audioPricing = [
  {
    id: '0',
    title: 'Effet Sonore',
    description:
      'Spécialisé dans la création d\'effets sonores de haute qualité qui ajoutent une dimension immersive à vos productions audiovisuelles.',
    price: '4000',
    features: [
      'Effets sonores sur mesure',
      'Formats WAV / MP3 haute qualité',
      'Livraison rapide',
    ],
  },
  {
    id: '1',
    title: 'Voix off',
    description:
      'Notre équipe de voix talentueuses est prête à transmettre votre message avec clarté et impact.',
    price: '6000',
    features: [
      'Voix masculine ou féminine',
      'Enregistrement studio professionnel',
      'Retouche et mixage inclus',
    ],
  },
  {
    id: '2',
    title: 'Production Musicale Originale',
    description:
      'Bénéficiez d\'une approche créative et collaborative, visant à réaliser de la musique personnalisée, adaptée à vos besoins spécifiques.',
    price: '10000',
    features: [
      'Composition originale',
      'Arrangements complets',
      'Mixage et mastering inclus',
    ],
  },
]

export const photoPricing = [
  {
    id: '0',
    title: 'Photo',
    description:
      'Spécialisés dans la photographie, nous sommes la pour assurer vos shooting professionnel.',
    price: '4000',
    features: [
      'Portrait',
      'Shooting professionnel',
      'Shooting artistique',
      'Shooting produit / commercial',
      'Traitement et restoration de photos',
    ],
  },
  {
    id: '1',
    title: 'Vidéo',
    description:
      'Nous créons des images percutantes qui ccaptivent votre audience et renforcent votre message de marque.',
    price: '30000',
    features: [
      'Spot Publicitaire',
      'Clip cidéo / teaser',
      'Short movie',
      'Documentaire',
      'Réels',
      'Montage vidéo',
      'Interview / podcast',
    ],
  },
  {
    id: '2',
    title: 'Pack Social Media Management',
    description:
      'Nous vous aidons à établir une présence forte et engageante sur les plateformes numériques pour accroître votre visibilité et renforcer votre image de marque.',
    price: '40000',
    features: [
      'Création de contenu visuel (photos & vidéos)',
      'Gestion de page (Facebook, Instagram, TikTok)',
      'Stratégie éditoriale mensuelle',
      'Planification et publication des posts',
      'Rapport de performance mensuel',
    ],
  },
]

export const weedingPricing = [
  {
    id: '0',
    title: 'Pack Rose',

    price: '29000',
    features: [
      '2 Photographe',
      'Couverture photo et video',
      'Montage video (FHD)',
      'USB 16Gb',
    ],
  },
  {
    id: '1',
    title: 'Pack Jasmin',

    price: '39000',
    features: [
      '4 Photographe',
      'Couverture photo et video',
      'Montage video (FHD)',
      'Traitement photos',
      'Photobook',
      'USB 16Gb',
    ],
  },
  {
    id: '2',
    title: 'Pack Iris',

    price: '48000',
    features: [
      '4 Photographe',
      'Couverture photo et video',
      'Préparation (Homme et Femme)',
      'Shooting studio',
      'Montage video (4K)',
      'Traitment Photos',
      'Photobook',
      '2 Cadre (60x40cm)',
      'USB 32Gb',
    ],
  },
  {
    id: '3',
    title: 'Pack Lilas',

    price: '68000',
    features: [
      '4 Photographe',
      'Couverture photo et video',
      'Préparation (Homme et Femme)',
      'Montage video (4K)',
      'Traitment Photos',
      'Photobook',
      '2 Cadre (60x40cm)',
      'USB 32Gb / drone',
    ],
  },
  {
    id: '4',
    title: 'Pack Tulip',

    price: '99000',
    features: [
      '6 Photographe',
      'Couverture photo et video',
      'Préparation (Homme et Femme)',
      'Shooting studio',
      'Montage video (4K)',
      'Traitment Photos',
      'Photobook',
      '3 Cadre (60x40cm)',
      'USB 64Gb / drone',
    ],
  },

  {
    id: '5',
    title: 'Pack Orchidée',

    price: '130000',
    features: [
      '6 Photographe',
      'Couverture photo et video',
      'Préparation (Homme et Femme)',

      'Shooting studio',
      'Montage video (6K)',
      'Short movie (6K)',
      'Traitment Photos',
      'Photobook',
      '4 Cadre (60x40cm)',
      'USB 64Gb / drone',
    ],
  },
]

export const pubPricing = [
  {
    id: '0',
    title: 'Impression',
    description:
      'Notre équipe est la pour vous garantir des impréssions avec résultats exeptionnels.',
    price: 'Devis',
    features: [
      'Packaging',
      'Carte de visite, flyers, depliant',
      'Invitation, carte medical, calendrier',
      'Menu',
      'Photo book',
      'Stickers',
      'Banner, drapeaux',
      'Poster, tableaux, cadre',
      'Habillage vitrine',
    ],
  },
  {
    id: '1',
    title: 'Traveaux publicitaire',
    description:
      'Que vous ayez besion de panneaux, de supports événementiels, notre équipe est préte a realiser vos projets avec expertise',
    price: 'Devis',
    features: [
      'Autocollant, bache PVC, canva',
      'Alucobond, dilphane, malamine, MDF',
      'Flocage (Tshirt, Casquette, Tablier)',

      'Sac shopping (plastique, kraft)',
      'Boitier lumineaux',
      'Neon LED (intérieur/extérieur)',
    ],
  },
]

export const logoPricing = [
  {
    id: '0',
    title: 'Graphic design',
    description:
      'Notre équipe de designers talentueux est préte a donner vie a vos concepts.',
    price: '1000',
    features: [
      'Conception Logo et identité visuelle',
      'Conception Packaging',
      'Conception Social media post',
      'Conception carte de visite, flyers, depliant',
      'Conception invitation, carte medical, calendrier',
      'Conception menu',
      'Conception photo book',
      'Conception stickers',
      'Conception banner, drapeaux',
      'Conception poster, tableaux, cadre',
      'Conception vitrine',
    ],
  },
  {
    id: '1',
    title: 'Pack social media',
    description:
      'Capter lattention et engager votre audience. Nous tranformons des données compleces en visuels attrayants, facilitant la compégnsion et le partage de votre message.',
    price: '10000',
    features: ['Social media post'],
  },
]

export const devPricing = [
  {
    id: '0',
    title: 'E-commerce',
    description:
      'Que vous soyez une start-up ou une entreprise établie, nous vous offrons les outils et lexpertise nécessaires pour transformer vos visiteur en clients fidéles sur votre sites e-commerce sur mesure.',
    price: '40000',
    features: [
      'Design personalisé',
      '5 Pages',
      'Dashboard ( Ajout, Modification, Suprission de produits )',
      'Reception de commande sur telegram',
    ],
  },
  {
    id: '1',
    title: 'Landing page',
    description:
      'Vous souhaitez promouvoir un produit, générer des leads ou annoncer un événement, nos page datterissage sur mesure sont concues pour captiver votre audience et macimiser vos résultats.',
    price: 'Sur Devis',
    features: [
      'Design personalisé',
      'Nombre de Pages au choix',
      'Dashboard ( Modification des pages )',
      'Reception des messages sur telegram',
    ],
  },
  {
    id: '2',
    title: 'Mobile APP',

    price: 'Sur Devis',
    features: ['Design personalisé', 'Nombre de Pages au choix'],
  },
]

export const benefits = [
  {
    id: '1',
    title: 'infographie',
    text: 'infographie_text',
    backgroundUrl: './src/assets/benefits/card-2.svg',
    icon: 'CiPen',
    light: false,
    imageUrl: serviceInfo,
    url: '/graphic-design',
  },
  {
    id: '0',
    title: 'photo_video',
    text: 'photo_video_text',
    backgroundUrl: './src/assets/benefits/card-1.svg',
    icon: 'FaCamera',
    light: false,
    imageUrl: servicePhoto,
    url: '/photo-lab',
  },

  {
    id: '3',
    title: 'development',
    text: 'development_text',
    backgroundUrl: './src/assets/benefits/card-4.svg',
    icon: 'FaCode',
    imageUrl: serviceDev,
    light: false,
    url: '/development',
  },
  {
    id: '5',
    title: 'publicite',
    text: 'publicite_text',
    backgroundUrl: './src/assets/benefits/card-6.svg',
    icon: 'FaLightbulb',
    light: false,
    imageUrl: servicePub,
    url: '/advertisement',
  },

  {
    id: '2',
    title: 'Wedding',
    text: 'weeding_text',
    backgroundUrl: './src/assets/benefits/card-3.svg',
    icon: 'GiDiamondRing',
    imageUrl: serviceWeeding,
    light: false,
    url: '/wedding',
  },
  {
    id: '4',
    title: 'audio',
    text: 'audio_text',
    backgroundUrl: './src/assets/benefits/card-5.svg',
    icon: 'FaMusic',
    light: false,
    imageUrl: serviceAudio,
    url: '/sounds',
  },
]

export const socials = [
  {
    id: '0',
    title: 'TikTok',
    url: 'https://www.tiktok.com/@pixel.creativeagency',
  },
  {
    id: '1',
    title: 'Instagram',
    url: 'https://www.instagram.com/_pixeldz',
  },
  {
    id: '2',
    title: 'Facebook',
    url: 'https://www.facebook.com/pixel.lab.3110?mibextid=LQQJ4d',
  },
]
