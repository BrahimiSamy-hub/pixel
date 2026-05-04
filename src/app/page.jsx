import Benefits from '../components/Benefits'
import Collaboration from '../components/Collaboration'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
export const metadata = {
  title: 'Agence Créative en Algérie — Photo, Design, Web | Pixel',
  description: 'Pixel Creative Agency — agence créative professionnelle en Algérie depuis 2018. Photographie, design graphique, développement web, production audio. Devis gratuit.',
  keywords: 'agence créative algérie, photographie professionnelle, design graphique, développement web, vidéographie, mariage, branding, marketing digital, production audio',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Hero />
        <Benefits />
        <Collaboration />
        <Contact />
      </div>
    </>
  )
}
