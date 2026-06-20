"use client"
import { MdEmail, MdCall } from 'react-icons/md'
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { FaChevronDown } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from '@/navigation'
import { useLocale } from 'next-intl'

const languages = [
  { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w20/dz.png' },
]

const HeaderUp = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (code) => {
    router.replace(pathname, { locale: code })
    setDropdownOpen(false)
  }

  const currentLang = languages.find((l) => l.code === locale) || languages[0]

  return (
    <div className='px-4 py-3 lg:px-7.5 xl:px-10 border-b border-b-[#26242C] w-full'>
      <div className='flex justify-between items-center'>

        {/* Left: contact info */}
        <div className='flex gap-5 lg:gap-8 items-center'>
          <a
            href='tel:+213770696982'
            className='flex gap-2 items-center text-n-3 hover:text-[#F17A28] transition-colors'
          >
            <MdCall size={18} color='#f17a28' />
            <span className='text-sm'>(+213) 770 69 69 82</span>
          </a>

          <a
            href='https://wa.me/213770696982'
            target='_blank'
            rel='noopener noreferrer'
            className='flex gap-2 items-center text-n-3 hover:text-[#25D366] transition-colors'
          >
            <FaWhatsapp size={18} color='#25D366' />
            <span className='text-sm max-sm:hidden'>WhatsApp</span>
          </a>

          <a
            href='mailto:contact@pixeldz.store'
            className='flex gap-2 items-center text-n-3 hover:text-[#F17A28] transition-colors max-md:hidden'
          >
            <MdEmail size={18} color='#f17a28' />
            <span className='text-sm'>contact@pixeldz.store</span>
          </a>
        </div>

        {/* Right: socials + language picker */}
        <div className='flex items-center gap-4'>
          <a href='https://www.instagram.com/_pixeldz' target='_blank' rel='noopener noreferrer'>
            <FaInstagram size={18} className='text-n-3 hover:text-[#F17A28] transition-colors' />
          </a>
          <a href='https://www.tiktok.com/@pixel.creativeagency' target='_blank' rel='noopener noreferrer'>
            <FaTiktok size={18} className='text-n-3 hover:text-[#F17A28] transition-colors' />
          </a>
          <a href='https://www.facebook.com/pixel.lab.3110?mibextid=LQQJ4d' target='_blank' rel='noopener noreferrer'>
            <FaFacebookF size={18} className='text-n-3 hover:text-[#F17A28] transition-colors' />
          </a>

          <div className='w-px h-5 bg-n-6 mx-1' />

          {/* Language picker */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center gap-1.5 hover:text-[#F17A28] transition-colors'
            >
              <img
                src={currentLang.flag}
                alt={currentLang.name}
                className='w-5 object-contain'
                suppressHydrationWarning
              />
              <span className='text-sm text-n-3 max-sm:hidden'>{currentLang.name}</span>
              <FaChevronDown
                className={`text-[10px] text-n-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-38 border border-[#26242C] rounded overflow-hidden shadow-xl z-[999] bg-n-8'>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className='flex items-center gap-2 w-full px-3 py-2.5 bg-n-7 hover:bg-[#F18A28] text-white text-sm transition-colors'
                  >
                    <img src={lang.flag} alt={lang.name} className='w-5 object-contain' />
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeaderUp
