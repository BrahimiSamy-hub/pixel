"use client"
import Section from './Section'
import { Link } from '@/navigation'
import { socials } from '../constants'
import { useAnalytics } from '../hooks/useAnalytics'
import { FaCookieBite } from 'react-icons/fa'
import { FaTiktok, FaInstagram, FaFacebookF } from 'react-icons/fa6'

const socialIcon = (title) => {
  switch (title) {
    case 'TikTok': return <FaTiktok size={16} />
    case 'Instagram': return <FaInstagram size={16} />
    case 'Facebook': return <FaFacebookF size={16} />
    default: return null
  }
}

const Footer = () => {
  const { trackSocialMediaClick, trackButtonClick } = useAnalytics()

  const handleSocialClick = (platform) => {
    trackSocialMediaClick(platform)
  }

  const handleContactClick = (type) => {
    trackButtonClick(`contact_${type}`, 'footer')
  }

  return (
    <Section crosses className='!px-0 !py-10'>
      <footer className='container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col'>
        <p className='caption text-n-4 lg:block'>
          © {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className='text-n-4 text-center'>
          <p>
            <a
              href='mailto:contact@pixeldz.store'
              className=' hover:text-[#F18A27]'
              onClick={() => handleContactClick('email')}
            >
              contact@pixeldz.store
            </a>
          </p>
          <p>
            <a
              href='tel:+213799018288'
              className='hover:text-[#F18A27]'
              onClick={() => handleContactClick('phone')}
            >
              0799 01 82 88
            </a>
          </p>
          <div className='flex gap-4 mt-2 text-xs justify-center flex-wrap'>
            <Link href='/politique-de-confidentialite' className='hover:text-[#F18A27]'>Politique de confidentialité</Link>
            <Link href='/conditions-dutilisation' className='hover:text-[#F18A27]'>Conditions d&apos;utilisation</Link>
            <Link href='/loup-garou-regles' className='hover:text-[#F18A27]'>Loup-Garou Règles</Link>
            <button
              id='manage-cookies-btn'
              onClick={() => window.dispatchEvent(new CustomEvent('show-cookie-banner'))}
              className='hover:text-[#F18A27] flex items-center gap-1 transition-colors duration-200'
            >
              <FaCookieBite className='text-[10px]' />
              Gérer les cookies
            </button>
          </div>
        </div>

        <ul className='flex gap-5 flex-wrap'>
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target='_blank'
              className='flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-[#F18A27]'
              onClick={() => handleSocialClick(item.title.toLowerCase())}
            >
              {socialIcon(item.title)}
            </a>
          ))}
        </ul>
      </footer>
    </Section>
  )
}

export default Footer
