"use client"
import Image from 'next/image'
import { logoSVG } from '../assets'
import { FaCartShopping } from 'react-icons/fa6'
import { HamburgerMenu } from './design/Header'
import { usePathname, Link } from '../navigation'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Button from './Button'
import MenuSvg from '../assets/svg/MenuSvg'
import { useTranslations } from 'next-intl'
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
  const [openNavigation, setOpenNavigation] = useState(false)
  const t = useTranslations()
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimeoutRef = useRef(null)
  const { trackButtonClick, trackNavigation } = useAnalytics()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    } else {
      setMegaMenuOpen(false)
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

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
        }`}
      >
        <div className={`transition-all duration-300 ease-in-out ${scrolled ? 'max-h-0 overflow-hidden' : 'max-h-20'}`}>
          <HeaderUp />
        </div>

        <nav className='flex items-center justify-between px-4 lg:px-7.5 xl:px-10 max-lg:py-2 border-b border-n-6'>
          <Link className='block' href='/' draggable='false'>
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
            } fixed ${scrolled ? 'top-[5rem]' : 'top-[7.75rem]'} left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
              {navigation.map((item) => (
                <div
                  key={item.id}
                  className='relative flex items-center'
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
                      <FaChevronDown
                        className={`text-[10px] transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <HamburgerMenu />
          </nav>

          <div className='flex items-center gap-4'>
            {/* Cart Button */}
            <button
              className='relative flex items-center hover:scale-110 transition-transform duration-150'
              onClick={() => {
                toggleCart()
                trackButtonClick('cart_open', 'header')
              }}
            >
              <FaCartShopping size={24} color='#F18A27' className='lg:w-8 lg:h-8' />
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

        {/* MEGA MENU WRAPPER */}
        <div
          className={`fixed inset-x-0 ${scrolled ? 'top-[72px]' : 'top-[124px]'} hidden lg:block z-[100] transition-[top] duration-300 ${!megaMenuOpen ? 'pointer-events-none' : ''}`}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
        </div>
      </div>

      {/* Page-content blur — starts below the header, never touches the navbar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[49] backdrop-blur-sm transition-opacity duration-300 ${
          megaMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: scrolled ? '72px' : '124px' }}
        onClick={() => setMegaMenuOpen(false)}
      />
    </>
  )
}

export default Header
