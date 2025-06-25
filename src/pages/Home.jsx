import ButtonGradient from '../assets/svg/ButtonGradient'
import Benefits from '../components/Benefits'
import Collaboration from '../components/Collaboration'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
import Services from '../components/Services'
import Roadmap from '../components/Roadmap'
import AnimatedBackground from '../components/AnimatedBackground'
import SEOHead from '../components/SEOHead'

const Home = () => {
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pixel Creative Agency - Accueil',
    description:
      'Agence créative professionnelle en Algérie spécialisée en photographie, vidéographie, design graphique, développement web et production audio.',
    url: 'https://pixeldz.store',
    mainEntity: {
      '@type': 'Organization',
      name: 'Pixel Creative Agency',
      description: 'Agence créative professionnelle en Algérie',
      url: 'https://pixeldz.store',
      logo: 'https://pixeldz.store/src/assets/pixelH.png',
      sameAs: [
        'https://www.facebook.com/pixelcreativeagency',
        'https://www.instagram.com/pixelcreativeagency',
      ],
    },
  }

  return (
    <>
      <SEOHead
        title='Accueil'
        description='Agence créative professionnelle en Algérie spécialisée en photographie, vidéographie, design graphique, développement web et production audio. Services de mariage, branding et marketing digital.'
        keywords='agence créative algérie, photographie professionnelle, design graphique, développement web, vidéographie, mariage, branding, marketing digital, production audio'
        structuredData={homeStructuredData}
      />
      <AnimatedBackground />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Hero />
        <Benefits />
        <Collaboration />
        {/* <Services /> */}
        {/* <Roadmap /> */}
        <Contact />
      </div>

      <ButtonGradient />
    </>
  )
}

export default Home
