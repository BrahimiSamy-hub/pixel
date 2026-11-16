import type { StudioKey } from '@/lib/studios'

/**
 * Real Google reviews of Pixel Creative Agency (Google Maps, copied November 2026), quoted word for
 * word in their original language. Left out: the owner's own review, reviews without text, an
 * emoji-only one, one only visible as Google's translation, and one negative review from 2023.
 * Names are shortened to first name + initial. `studio` only when the review names the service.
 * `home` marks the three shown on the home page; the first one is the featured quote.
 */
export type Review = {
  key: string
  name: string
  year: number
  text: string
  studio?: StudioKey
  home?: boolean
}

export const reviews: Review[] = [
  {
    key: 'karim',
    name: 'Karim O.',
    year: 2024,
    home: true,
    text: "Je tiens à exprimer ma profonde gratitude envers Pixel. J'ai eu l'opportunité de collaborer avec lui récemment, et je dois dire que son travail est tout simplement exceptionnel. Son professionnalisme, son attention aux détails et son engagement sont rares de nos jours. Il mérite vraiment d'être connu pour la qualité de ses prestations. Si vous avez la chance de travailler avec lui, vous ne serez pas déçu. Je le recommande sans hésitation à 100%\n\nBravo pour ce travail remarquable, continuez ainsi !",
  },
  {
    key: 'walidY',
    name: 'Walid Y.',
    year: 2026,
    home: true,
    studio: 'design',
    text: 'Un travail très professionnel, avec une grande attention aux détails et une vraie créativité. L’équipe est sérieuse, accueillante et respecte les délais. les réalisations graphiques sont modernes et bien réalisées avec une très haute qualité.\nJe recommande vivement cette agence à toute personne qui cherche un service de photographie ou un design graphique de qualité.',
  },
  {
    key: 'yassine',
    name: 'Yassine Z.',
    year: 2026,
    home: true,
    text: 'Pixel Agency is known for its professionalism and reliability they respect deadlines, deliver high-quality work..and maintain a very professional attitude in both their work and communication a trustworthy team that shows real dedication to what they do',
  },
  {
    key: 'niss',
    name: 'Niss T.',
    year: 2026,
    text: "Très professionnel y'a rien a dire la dans , meme les tarifs,ils sont très adapté pas trop chère par rapport au service qu'ils font.je recommande vivement et un grand merci a l'équipe surtout Sami 👍👍",
  },
  {
    key: 'hmani',
    name: 'Hmani M.',
    year: 2026,
    studio: 'photo',
    text: 'The best creative agency in BATNA\nSpecialy for videography and photography and advertising or digital marketing',
  },
  {
    key: 'mohamedB',
    name: 'Mohamed B.',
    year: 2026,
    text: 'Pixel, les meilleures dans la wilaya\nExcellent travail, bonne réception, travail dans les délais\nMerci à toutes l’équipe',
  },
  {
    key: 'anfel',
    name: 'Anfel S.',
    year: 2026,
    text: 'Une agence très professionnelle et à l’écoute de ses clients. L’équipe est réactive créative.',
  },
  {
    key: 'moha',
    name: 'Moha M.',
    year: 2026,
    text: 'Établissement très sérieux et agréable j’ai été très ravi de leur service merci beaucoup à l’équipe pixel',
  },
  {
    key: 'zohir',
    name: 'Zohir G.',
    year: 2024,
    text: 'Ils sont agréables et géniaux\nJe les recommande fortement\nSérieux est à disposition',
  },
  {
    key: 'soheib',
    name: 'Soheib A.',
    year: 2026,
    text: "Une agence professionnel l'équipe aussi surtt sami . Bon courage.",
  },
  {
    key: 'walidA',
    name: 'Walid A.',
    year: 2026,
    text: 'Super studio, équipe professionnelle, merci pour votre travail.',
  },
  {
    key: 'khaled',
    name: 'Khaled M.',
    year: 2026,
    text: 'Travail sérieux et efficace. Je recommande vivement.',
  },
  {
    key: 'graziella',
    name: 'Graziella F.',
    year: 2023,
    text: 'Des gens très sérieux qualité et prix bonne continuation',
  },
  {
    key: 'khalil',
    name: 'Khalil M.',
    year: 2026,
    text: 'Very professional and high-quality work.',
  },
  {
    key: 'maissoune',
    name: 'Maissoune A.',
    year: 2026,
    text: 'The best agency ✅',
  },
]

export const homeReviews = reviews.filter((r) => r.home)

/** First letters of the first name and of the initial: "Walid Y." → "WY". */
export const reviewInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
