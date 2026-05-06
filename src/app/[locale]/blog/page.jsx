import Section from '@/components/Section'
import Heading from '@/components/Heading'

import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('blog.title'),
    description: t('blog.description'),
    alternates: { canonical: '/blog' },
  }
}

const blogPosts = [
  {
    title: "Comment choisir un photographe de mariage en Algérie",
    excerpt: "Découvrez nos conseils pour trouver le photographe idéal pour votre journée spéciale...",
    date: "2026-04-01",
    author: "Équipe Pixel"
  },
  {
    title: "Les meilleures pratiques pour un site e-commerce algérien",
    excerpt: "Optimisez vos ventes en ligne avec nos recommandations techniques et design...",
    date: "2026-03-25",
    author: "Département Web"
  },
  {
    title: "Pourquoi investir dans la photographie professionnelle pour votre entreprise",
    excerpt: "L'impact des visuels de haute qualité sur votre image de marque et vos conversions...",
    date: "2026-03-20",
    author: "Directeur Artistique"
  }
]

export default function BlogPage() {
  const t = useTranslations('blogUI');

  return (
    <Section className="pt-[10rem] -mt-[5.25rem]">
      <div className="container">
        <Heading 
          title={t('headerTitle')} 
          tag={t('tag')}
          text={t('description')}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {blogPosts.map((post, i) => (
            <div key={i} className="p-6 rounded-2xl bg-n-7 border border-n-6 hover:border-color-1 transition-colors">
              <div className="text-xs text-n-4 mb-2 flex justify-between">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h3 className="h5 mb-4">{post.title}</h3>
              <p className="text-n-3 text-sm mb-6">{post.excerpt}</p>
              <button className="text-color-1 font-bold uppercase tracking-wider text-xs hover:underline">
                {t('readMore')}
              </button>

              {/* Article Schema */}
              <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    'headline': post.title,
                    'description': post.excerpt,
                    'datePublished': post.date,
                    'author': {
                      '@type': 'Organization',
                      'name': 'Pixel Creative Agency'
                    },
                    'publisher': {
                      '@type': 'Organization',
                      'name': 'Pixel Creative Agency',
                      'logo': {
                        '@type': 'ImageObject',
                        'url': 'https://pixeldz.store/favicon-32x32.png'
                      }
                    }
                  })
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
