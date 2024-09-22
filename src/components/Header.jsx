import { logowhite } from '../assets'
import { FaCartShopping } from 'react-icons/fa6'
import { HamburgerMenu } from './design/Header'
import { useLocation } from 'react-router-dom'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import Button from './Button'
import MenuSvg from '../assets/svg/MenuSvg'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { FaChevronDown } from 'react-icons/fa'

const navigation = [
  {
    id: '0',
    titleKey: 'home',
    url: '/',
  },
  {
    id: '1',
    titleKey: 'portfolioP',
    url: '/portfolio',
  },
  {
    id: '2',
    titleKey: 'shop',
    url: '/shop',
  },
]

const Header = () => {
  const { toggleCart, getTotalQuantity } = useCart()
  const { pathname } = useLocation()
  const [openNavigation, setOpenNavigation] = useState(false)
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

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
    i18next.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)
    setDropdownOpen(false)
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

  const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
    // { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w20/sa.png' },
  ]

  return (
    <div
      className={`fixed top-0 left-0 w-full z-40 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-2'>
        <Link className='block w-[12rem] xl:mr-8' to='/'>
          <img
            src={logowhite}
            alt='Pixel'
            className='w-[150px]'
            loading='lazy'
          />
        </Link>
        <nav
          className={`${
            openNavigation ? 'flex' : 'hidden'
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row lg:pr-20'>
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? 'lg:hidden' : ''
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname
                    ? 'z-2 lg:text-[#F18A27]'
                    : 'lg:text-n-1/50'
                } lg:leading-5 lg:hover:text-[#F18A27] xl:px-12`}
              >
                {t(item.titleKey)}
              </Link>
            ))}
          </div>

          <HamburgerMenu />
        </nav>
        <div className='relative' ref={dropdownRef}>
          {/* <button
            className='p-2 bg-[#0E0C15] border rounded border-[#26242C] hover:border-[#F18A27] flex items-center'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={
                languages.find(
                  (lang) =>
                    lang.code === (localStorage.getItem('i18nextLng') || 'en')
                )?.flag
              }
              alt='Current Language'
              className='inline-block mr-2'
            />
            {
              languages.find(
                (lang) =>
                  lang.code === (localStorage.getItem('i18nextLng') || 'en')
              )?.name
            }
            <FaChevronDown className='ml-2' />
          </button> */}
          {dropdownOpen && (
            <div className='absolute mt-2 border rounded'>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className='flex items-center w-full p-2 hover:bg-[#F18A28]'
                >
                  <img src={lang.flag} alt={lang.name} className='mr-2' />
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className='ml-6 mr-2 relative hidden lg:flex'
          onClick={toggleCart}
        >
          <FaCartShopping
            size={40}
            color='#F18A27'
            className='hover:scale-110 transition-transform duration-150'
          />
          <span className='absolute -top-2 -right-3 flex items-center justify-center w-6 h-6 font-bold text-[#F18A28] bg-white rounded-full'>
            {getTotalQuantity()}
          </span>
        </button>

        <FaCartShopping
          size={35}
          color='#F18A27'
          className='lg:hidden hover:cursor-pointer ml-28 hover:scale-110 transition-transform duration-150'
          onClick={toggleCart}
        />
        <Button className='ml-auto lg:hidden' onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  )
}

export default Header
