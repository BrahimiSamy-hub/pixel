import Section from '@/components/Section'
import Heading from '@/components/Heading'

export const metadata = {
  title: 'Témoignages Clients | Pixel Creative Agency',
  description: 'Ce que nos clients disent de nous. Découvrez les expériences de nos partenaires en photographie, design et développement web en Algérie.',
  alternates: { canonical: '/testimonials' },
}

const testimonials = [
  {
    name: "Mohamed R.",
    role: "Propriétaire E-commerce",
    text: "Une équipe très professionnelle. Ils ont créé mon site de A à Z et le résultat est au-delà de mes attentes. Fortement recommandés !",
    rating: 5
  },
  {
    name: "Amel B.",
    role: "Mariée (Juillet 2023)",
    text: "Les photos de notre mariage sont magnifiques. L'équipe a su capturer chaque instant précieux avec une discrétion et une élégance incroyables.",
    rating: 5
  },
  {
    name: "Yassine T.",
    role: "Directeur de Communication",
    text: "Pixel Agency nous accompagne sur notre identité visuelle depuis 2 ans. Leur réactivité et leur créativité font toute la différence.",
    rating: 5
  }
]

export default function TestimonialsPage() {
  return (
    <Section className="pt-[10rem] -mt-[5.25rem]">
      <div className="container">
        <Heading 
          title="Témoignages Clients" 
          tag="Retours d'Expérience"
          text="Découvrez ce que ceux qui nous ont fait confiance pensent de notre agence."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-n-7 border border-n-6 relative overflow-hidden">
              <div className="text-color-1 text-3xl mb-4 font-pixel">&quot;</div>
              <p className="text-n-3 mb-6 relative z-1">{t.text}</p>
              <div className="pt-6 border-t border-n-6">
                <div className="font-bold text-n-1">{t.name}</div>
                <div className="text-xs text-n-4">{t.role}</div>
                <div className="flex text-[#F18A27] mt-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>

              {/* Review Schema (Individual) */}
              <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Review',
                    'reviewRating': {
                      '@type': 'Rating',
                      'ratingValue': t.rating,
                      'bestRating': '5'
                    },
                    'author': {
                      '@type': 'Person',
                      'name': t.name
                    },
                    'reviewBody': t.text
                  })
                }}
              />
            </div>
          ))}
        </div>

        {/* Aggregate Rating Schema */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              'name': 'Pixel Creative Agency',
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '5',
                'reviewCount': testimonials.length.toString(),
                'bestRating': '5'
              }
            })
          }}
        />
      </div>
    </Section>
  )
}
