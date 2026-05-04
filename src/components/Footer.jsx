"use client"
import Section from './Section'
import { socials } from '../constants'
import { useAnalytics } from '../hooks/useAnalytics'

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
          <div className='flex gap-4 mt-2 text-xs justify-center'>
            <a href='/privacy-policy' className='hover:text-[#F18A27]'>Politique de confidentialité</a>
            <a href='/terms' className='hover:text-[#F18A27]'>Conditions d&apos;utilisation</a>
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
              <img src={item.iconUrl?.src || item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
      </footer>
    </Section>
  )
}

export default Footer
