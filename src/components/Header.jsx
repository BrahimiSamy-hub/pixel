"use client"
import Image from 'next/image'
import { logowhite, logoSVG } from '../assets'
import { FaCartShopping } from 'react-icons/fa6'
import { HamburgerMenu } from './design/Header'
import { usePathname, useRouter, Link } from '../navigation'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import Button from './Button'
import MenuSvg from '../assets/svg/MenuSvg'
import { useTranslations, useLocale } from 'next-intl'
import { FaChevronDown } from 'react-icons/fa'
import ButtonGradient from '../assets/svg/ButtonGradient'
import HeaderUp from './HeaderUp'
import { useAnalytics } from '../hooks/useAnalytics'
import MegaMenu from './MegaMenu'

const navigation = [
  { id: '0', titleKey: 'home', url: '/' },
  { id: '1', titleKey: 'aboutUs', url: '/a-propos' },
  { id: '2', titleKey: 'portfolioP', url: '/portfolio', hasMegaMenu: true },
  { id: '3', titleKey: 'shop', url: '/boutique' },
]

const Header = () => {
  const { toggleCart, getTotalQuantity } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const [openNavigation, setOpenNavigation] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const closeTimeoutRef = useRef(null)
  const dropdownRef = useRef(null)
  const { trackButtonClick, trackNavigation } = useAnalytics()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const changeLanguage = (lng) => {
    router.replace(pathname, { locale: lng })
    setDropdownOpen(false)
    setDropdownOpenMobile(false)
    trackButtonClick('language_change', 'header')
  }

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false)
      enablePageScroll()
    } else {
      setOpenNavigation(true)
      disablePageScroll()
    }
  }

  const handleClick = () => {
    if (!openNavigation) return
    enablePageScroll()
    setOpenNavigation(false)
  }

  const handleNavigation = (fromPage, toPage) => {
    trackNavigation(fromPage, toPage)
  }

  const handleMouseEnter = (hasMegaMenu) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (hasMegaMenu) {
      setMegaMenuOpen(true)
    }
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
    }, 200)
  }

  const handleMegaMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setMegaMenuOpen(true)
  }

  const languages = [
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w20/dz.png' },
  ]

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
        }`}
      >
        <nav className='flex items-center justify-between px-4 lg:px-7.5 xl:px-10 max-lg:py-2'>
          <Link className='block ' href='/' draggable='false'>
            <Image 
              src={logoSVG?.src || logoSVG} 
              alt='Pixel' 
              className='w-40' 
              draggable='false' 
              width={160} 
              height={40} 
              priority 
            />
          </Link>
          
          <nav
            className={`${
              openNavigation ? 'flex' : 'hidden'
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
              {navigation.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.hasMegaMenu)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    suppressHydrationWarning
                    draggable='false'
                    href={item.url}
                    onClick={() => {
                      handleClick()
                      handleNavigation(pathname, item.url)
                      setMegaMenuOpen(false)
                    }}
                    className={`block relative font-code uppercase text-n-1 transition-colors hover:text-color-1 ${
                      item.onlyMobile ? 'lg:hidden' : ''
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-[0.8rem] lg:font-semibold ${
                      item.url === pathname || (item.hasMegaMenu && megaMenuOpen)
                        ? 'z-2 lg:text-[#F18A27]'
                        : 'lg:text-n-3'
                    } lg:leading-5 lg:hover:text-[#F18A27] xl:px-12 flex items-center gap-1`}
                  >
                    {t(item.titleKey)}
                    {item.hasMegaMenu && (
                      <FaChevronDown className={`text-[10px] transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <HamburgerMenu />
          </nav>

          <div className='flex items-center gap-4'>
            {/* Language Switcher Desktop */}
            <div className='relative lg:block hidden' ref={dropdownRef}>
              <button
                className='p-2 bg-[#0E0C15] border rounded border-[#26242C] hover:border-[#F18A27] flex items-center'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  suppressHydrationWarning
                  src={languages.find((lang) => lang.code === locale)?.flag || languages[0].flag}
                  alt='Current Language'
                  className='inline-block w-5 object-contain mr-2'
                />
                <FaChevronDown className='text-xs' />
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-40 border border-[#26242C] rounded overflow-hidden shadow-xl z-50'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className='flex items-center w-full p-3 hover:bg-[#F18A28] bg-n-7 text-white text-sm transition-colors'
                    >
                      <img src={lang.flag} alt={lang.name} className='mr-3 w-5 object-contain' />
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher Mobile */}
            <div className='relative lg:hidden block'>
              <button
                className='p-2 bg-[#0E0C15] border rounded border-[#26242C] flex items-center'
                onClick={() => setDropdownOpenMobile(!dropdownOpenMobile)}
              >
                <img
                  suppressHydrationWarning
                  src={languages.find((lang) => lang.code === locale)?.flag || languages[0].flag}
                  alt='Current Language'
                  className='w-5 object-contain'
                />
              </button>
              {dropdownOpenMobile && (
                <div className='absolute right-0 mt-2 border border-[#26242C] rounded overflow-hidden z-50'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className='flex items-center w-full p-2 bg-n-7 hover:bg-[#F18A28]'
                    >
                      <img src={lang.flag} alt={lang.name} className='w-5 object-contain' />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              className='relative flex items-center hover:scale-110 transition-transform duration-150'
              onClick={() => {
                toggleCart()
                trackButtonClick('cart_open', 'header')
              }}
            >
              <FaCartShopping size={24} color='#F18A27' className="lg:w-8 lg:h-8" />
              <span className='absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 font-bold text-xs lg:text-sm text-[#F18A28] bg-white rounded-full'>
                {getTotalQuantity()}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <div className='lg:hidden ml-2'>
              <Button onClick={toggleNavigation}>
                <MenuSvg openNavigation={openNavigation} />
              </Button>
            </div>
          </div>
        </nav>
        <ButtonGradient />
        
        {/* MEGA MENU WRAPPER - Fixed to viewport for perfect centering */}
        <div 
          className={`fixed inset-x-0 top-[72px] hidden lg:block z-[100] ${!megaMenuOpen ? 'pointer-events-none' : ''}`}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Bridge to prevent hover flicker */}
          <div className="absolute -top-4 left-0 w-full h-4" />
          <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
        </div>
      </div>
    </>
  )
}

export default Header
