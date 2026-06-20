import Link from 'next/link'

const SERVICES = [
  { label: 'Développement Web & E-commerce', href: '/developpement', icon: '🌐' },
  { label: 'Shooting Photo Professionnel', href: '/photo-lab', icon: '📷' },
  { label: 'Design Graphique & Logo', href: '/design-graphique', icon: '🎨' },
  { label: 'Panneau Publicitaire & Impression', href: '/publicite', icon: '📋' },
  { label: 'Photographie Mariage', href: '/mariage', icon: '💍' },
  { label: 'Production Audio & Jingles', href: '/sons', icon: '🎵' },
]

export default function CityLandingPage({ city, region, locale }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pixel Creative Agency',
    url: 'https://pixeldz.store',
    telephone: '+213799018288',
    email: 'contact@pixeldz.store',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Batna',
      addressRegion: 'Batna',
    },
    areaServed: [
      { '@type': 'City', name: city },
      { '@type': 'Country', name: 'Algeria' },
    ],
    description: `Agence créative professionnelle intervenant à ${city} — développement web, shooting photo, design graphique, panneaux publicitaires.`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="bg-n-8 min-h-screen pt-[5rem] lg:pt-[7rem] overflow-hidden">

        {/* Hero */}
        <section className="container mx-auto max-w-5xl px-4 lg:px-10 py-20">
          <p className="text-[#F17A28] text-xs font-bold uppercase tracking-[0.4em] mb-6">
            — Pixel Creative Agency · {region}
          </p>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
            Agence Créative<br />
            <span className="text-[#F17A28]">{city}</span>
          </h1>
          <p className="text-n-2 text-xl lg:text-2xl max-w-2xl leading-relaxed mb-12">
            Pixel Creative Agency intervient à {city} pour tous vos projets créatifs :
            site web, e-commerce, shooting photo, design graphique, panneaux publicitaires et production audio.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 bg-[#F17A28] hover:bg-[#e06920] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Devis gratuit →
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-3 border border-white/20 hover:border-[#F17A28] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Voir nos réalisations
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto max-w-5xl px-4 lg:px-10 pb-20">
          <h2 className="text-3xl font-black text-white mb-4">
            Nos services à {city}
          </h2>
          <div className="h-1 w-16 bg-[#F17A28] mb-10 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={`/${locale}${s.href}`}
                className="group flex items-start gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-[#F17A28]/40 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-white font-semibold group-hover:text-[#F17A28] transition-colors">{s.label}</p>
                  <p className="text-white/40 text-sm mt-1">à {city}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="bg-white/[0.02] border-y border-white/8">
          <div className="container mx-auto max-w-5xl px-4 lg:px-10 py-16">
            <h2 className="text-3xl font-black text-white mb-10">
              Pourquoi choisir Pixel pour votre projet à {city} ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Expérience locale', text: `Nous connaissons le marché algérien et les attentes des clients à ${city} et dans toute l'Algérie.` },
                { title: 'Équipe créative', text: "Studio photo professionnel, développeurs expérimentés et designers certifiés à votre service." },
                { title: 'Devis rapide', text: "Réponse sous 24h, devis gratuit et sur mesure adapté à votre budget." },
              ].map((item) => (
                <div key={item.title}>
                  <div className="w-8 h-1 bg-[#F17A28] rounded-full mb-4" />
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-5xl px-4 lg:px-10 py-20 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Un projet à {city} ?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Contactez-nous pour un devis gratuit. Nous intervenons à {city} et dans toute l'Algérie.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 bg-[#F17A28] hover:bg-[#e06920] text-white font-bold text-lg px-12 py-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#F17A28]/20"
          >
            Démarrer votre projet →
          </Link>
        </section>

      </main>
    </>
  )
}
