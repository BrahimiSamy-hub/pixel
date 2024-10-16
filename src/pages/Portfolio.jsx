import { useState } from 'react'
import { pixelHero2 } from '../assets'
import Button from '../components/Button'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import PortfolioEcommerce from '../components/portfolio/E-commerce'
import PortfolioGestionaire from '../components/portfolio/Gestionaire'
import PortfolioMobileApp from '../components/portfolio/MobileApp'
import PortfolioWebsite from '../components/portfolio/WebSite'
import PortfolioCinématographie from '../components/portfolio/Cinématographie'
import PortfolioSpot from '../components/portfolio/Spot'
import PortfolioEtiquette from '../components/portfolio/Etiquette'
import PortfolioEmballage from '../components/portfolio/Emballage'
import PortfolioShooting from '../components/portfolio/Shooting'
import PortfolioProduct from '../components/portfolio/Product'
import PortfolioTableaux from '../components/portfolio/Tableaux'
import PortfolioWall from '../components/portfolio/Wall'
import PortfolioCertificat from '../components/portfolio/Certificat'
import PortfolioVitrine from '../components/portfolio/Vitrine'
import PortfolioFrigo from '../components/portfolio/Frigo'
import PortfolioBooks from '../components/portfolio/Books'
import PortfolioMenu from '../components/portfolio/Menu'
import PortfolioPosts from '../components/portfolio/Posts'
import PortfolioLogo from '../components/portfolio/Logo'
import PortfolioCards from '../components/portfolio/Cards'
import PortfolioSac from '../components/portfolio/Sac'
import PortfolioTshirts from '../components/portfolio/Frigo'
import PortfolioFlyer from '../components/portfolio/Flyer'
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import {
  XMarkIcon,
  FunnelIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/20/solid'

// Subcategory component mapping
const subcategoryComponents = {
  logo: PortfolioLogo,
  visitCards: PortfolioCards,
  sac: PortfolioSac,
  habillage: PortfolioTshirts,
  tshirt: PortfolioTshirts,
  flyer: PortfolioFlyer,
  books: PortfolioBooks,
  menu: PortfolioMenu,
  socialMediaPosts: PortfolioPosts,
  voixOff: PortfolioWebsite,
  reel: PortfolioWebsite,
  cinematographie: PortfolioCinématographie,
  spotPublicitaire: PortfolioSpot,
  etiquette: PortfolioEtiquette,
  emballage: PortfolioEmballage,
  shooting: PortfolioShooting,
  product: PortfolioProduct,
  webApp: PortfolioWebsite,
  appMobile: PortfolioEcommerce,
  gestionaire: PortfolioGestionaire,
  tableaux: PortfolioTableaux,
  wall: PortfolioWall,
  certificatInvitation: PortfolioCertificat,
  vitrine: PortfolioVitrine,
  frigo: PortfolioFrigo,
  ecommerce: PortfolioEcommerce,
  blogs: PortfolioEcommerce,
  portfolios: PortfolioEcommerce,
}

// Categories with subcategories

const Portfolio = () => {
  const { t } = useTranslation()

  const subcategories = {
    [t('visualIdentity')]: [
      'logo',
      'visitCards',
      'sac',
      'habillage',
      'tshirt',
      'flyer',
    ],
    [t('graphicDesign')]: ['books', 'menu', 'socialMediaPosts'],
    [t('video')]: ['voixOff', 'reel', 'cinematographie', 'spotPublicitaire'],
    [t('photo')]: ['shooting', 'product'],
    [t('packaging')]: ['etiquette', 'emballage'],
    [t('apps')]: ['webApp', 'Mobile APP', 'E-commerce'],
    [t('printing')]: [
      'tableaux',
      'wall',
      'certificatInvitation',
      'vitrine',
      'frigo',
    ],
    [t('weedingP')]: ['ecommerce', 'blogs', 'portfolios'],
  }
  const [selectedSubcategory, setSelectedSubcategory] = useState('logo')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const renderComponent = () => {
    const Component = subcategoryComponents[selectedSubcategory]
    return Component ? <Component /> : <div>{t('Select a subcategory')}</div>
  }

  return (
    <>
      <div className={`pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden`}>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            <div className='flex flex-col justify-center items-center'>
              {/* <img
                src={pixelHero2}
                alt=''
                className=' w-48 h-48 left-0 top-20 z-20 absolute rounded -rotate-45'
              />
              <img
                src={pixelHero2}
                alt=''
                className=' w-48 h-48 right-0 top-20 z-20 absolute rounded rotate-45'
              /> */}
              {/* Mobile filter dialog */}
              <Dialog
                open={mobileFiltersOpen}
                onClose={setMobileFiltersOpen}
                className='relative z-40 lg:hidden'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-out' />
                <div className='fixed inset-0 z-40 flex'>
                  <div className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4'>
                      <h2 className='text-lg font-medium text-black'>
                        Filters
                      </h2>
                      <button
                        type='button'
                        onClick={() => setMobileFiltersOpen(false)}
                        className='-mr-2 flex h-10 w-10 items-center rounded-md p-2 text-black'
                      >
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className='mt-4 border-t'>
                      {Object.entries(subcategories).map(
                        ([categoryName, subcatKeys]) => (
                          <Disclosure
                            key={categoryName}
                            as='div'
                            className='border-t border-gray-200 px-4 py-6'
                          >
                            <h3 className='-mx-2 -my-3 flow-root'>
                              <DisclosureButton className='group flex w-full items-center justify-between px-2 py-3 text-white hover:text-gray-500'>
                                <span className='font-medium text-gray-900'>
                                  {categoryName}
                                </span>
                                <span className='ml-6 flex items-center'>
                                  <PlusIcon
                                    className='h-5 w-5 group-data-[open]:hidden'
                                    aria-hidden='true'
                                  />
                                  <MinusIcon
                                    className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                                    aria-hidden='true'
                                  />
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className='pt-6'>
                              <div className='space-y-6'>
                                {subcatKeys.map((subcatKey, subcatIdx) => (
                                  <div
                                    key={subcatKey}
                                    className='flex items-center'
                                  >
                                    <input
                                      type='radio'
                                      id={`filter-mobile-${categoryName}-${subcatIdx}`}
                                      name='subcategory'
                                      value={subcatKey}
                                      checked={
                                        selectedSubcategory === subcatKey
                                      }
                                      onChange={() =>
                                        setSelectedSubcategory(subcatKey)
                                      }
                                      className='h-4 w-4 rounded border-gray-300 text-color-1 focus:ring-color-1'
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${categoryName}-${subcatIdx}`}
                                      className='ml-3 min-w-0 flex-1 text-gray-500'
                                    >
                                      {subcatKey.charAt(0).toUpperCase() +
                                        subcatKey
                                          .slice(1)
                                          .replace(/([A-Z])/g, ' $1')
                                          .trim()}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </Disclosure>
                        )
                      )}
                    </form>
                  </div>
                </div>
              </Dialog>
              <h1 className='h1 font-bold text-center text-white'>
                {t('portfolioP')}
              </h1>
              <main className='max-w-7xl'>
                <div className='items-baseline '>
                  <div className='flex items-center justify-center'>
                    <Button
                      type='button'
                      onClick={() => setMobileFiltersOpen(true)}
                      className='my-5 lg:hidden'
                    >
                      <div className='flex gap-2 justify-center items-center '>
                        <FunnelIcon className='h-5 w-5' aria-hidden='true' />{' '}
                        Categories
                      </div>
                    </Button>
                  </div>
                </div>

                <section
                  aria-labelledby='portfolio-heading'
                  className='pb-24 pt-6'
                >
                  <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                    {/* Desktop Filters */}
                    <form className='hidden lg:block'>
                      {Object.entries(subcategories).map(
                        ([categoryName, subcatKeys]) => (
                          <Disclosure
                            key={categoryName}
                            as='div'
                            className='border-b border-gray-200 py-6'
                          >
                            <h3 className='-my-3 flow-root'>
                              <DisclosureButton className='group flex w-full items-center justify-between  py-3 text-sm text-white hover:text-gray-500'>
                                <span className='font-medium '>
                                  {categoryName}
                                </span>
                                <span className='ml-6 flex items-center'>
                                  <PlusIcon
                                    className='h-5 w-5 group-data-[open]:hidden'
                                    aria-hidden='true'
                                  />
                                  <MinusIcon
                                    className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                                    aria-hidden='true'
                                  />
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className='pt-6'>
                              <div className='space-y-4'>
                                {subcatKeys.map((subcatKey, subcatIdx) => (
                                  <div
                                    key={subcatKey}
                                    className='flex items-center'
                                  >
                                    <input
                                      type='radio'
                                      id={`filter-${categoryName}-${subcatIdx}`}
                                      name='subcategory'
                                      value={subcatKey}
                                      checked={
                                        selectedSubcategory === subcatKey
                                      }
                                      onChange={() =>
                                        setSelectedSubcategory(subcatKey)
                                      }
                                      className='h-4 w-4 rounded border-gray-300 text-color-1 focus:ring-color-1'
                                    />
                                    <label
                                      htmlFor={`filter-${categoryName}-${subcatIdx}`}
                                      className='ml-3 text-sm text-white'
                                    >
                                      {subcatKey.charAt(0).toUpperCase() +
                                        subcatKey
                                          .slice(1)
                                          .replace(/([A-Z])/g, ' $1')
                                          .trim()}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </Disclosure>
                        )
                      )}
                    </form>

                    {/* Portfolio content */}
                    <div className='lg:col-span-3 w-full'>
                      {renderComponent()}
                    </div>
                  </div>
                </section>
              </main>
            </div>
            <ButtonGradient />
          </div>
        </Section>
      </div>
    </>
  )
}

export default Portfolio
