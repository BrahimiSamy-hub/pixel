import { useState } from 'react'

import Heading from '../components/Heading'
import PixelCircles from '../components/design/PixelCircles'
import Section from '../components/Section'
import Button from '../components/Button'

import { useTranslation } from 'react-i18next'

import { FaChevronDown } from 'react-icons/fa'
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

import PortfolioEcommerce from '../components/portfolio/E-commerce'
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
import PortfolioTshirts from '../components/portfolio/Frigo'
import PortfolioFlyer from '../components/portfolio/Flyer'
import PortfolioWeeding from '../components/portfolio/Wedding'
import PortfolioFood from '../components/portfolio/Food'

// Subcategory component mapping
const subcategoryComponents = {
  logo: PortfolioLogo,
  visitCards: PortfolioCards,
  habillage: PortfolioTshirts,
  tshirt: PortfolioTshirts,
  flyer: PortfolioFlyer,
  books: PortfolioBooks,
  menu: PortfolioMenu,
  socialMediaPosts: PortfolioPosts,
  reel: PortfolioWebsite,
  teaser: PortfolioWebsite,
  cinematographie: PortfolioCinématographie,
  spotPublicitaire: PortfolioSpot,
  etiquette: PortfolioEtiquette,
  emballage: PortfolioEmballage,
  PhotoShoot: PortfolioShooting,
  'Product photography': PortfolioProduct,
  'Food photography': PortfolioFood,
  webApp: PortfolioWebsite,
  'Mobile APP': PortfolioEcommerce,
  'E-commerce': PortfolioEcommerce,
  tableaux: PortfolioTableaux,
  wall: PortfolioWall,
  certificat: PortfolioCertificat,
  vitrine: PortfolioVitrine,
  frigo: PortfolioFrigo,
  weeding: PortfolioWeeding,
}

// Categories with subcategories
const Portfolio = () => {
  const { t } = useTranslation()

  const subcategories = {
    [t('visualIdentity')]: [
      'logo',
      'visitCards',
      'habillage',
      'tshirt',
      'flyer',
    ],
    [t('graphicDesign')]: ['books', 'menu', 'socialMediaPosts'],
    [t('video')]: ['teaser', 'reel', 'cinematographie', 'spotPublicitaire'],
    [t('photo')]: ['PhotoShoot', 'Product photography', 'Food photography'],
    [t('packaging')]: ['etiquette', 'emballage'],
    [t('apps')]: ['webApp', 'Mobile APP', 'E-commerce'],
    [t('printing')]: ['tableaux', 'wall', 'certificat', 'vitrine', 'frigo'],
    [t('weedingP')]: ['weeding'],
  }

  const [selectedSubcategory, setSelectedSubcategory] = useState('logo')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const renderComponent = () => {
    const Component = subcategoryComponents[selectedSubcategory]
    return Component ? <Component /> : <div>{t('Select a subcategory')}</div>
  }

  return (
    <>
      <div className={`pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden `}>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            <div className='flex flex-col justify-center items-center '>
              {/* Mobile filter dialog */}
              <Dialog
                open={mobileFiltersOpen}
                onClose={setMobileFiltersOpen}
                className='relative z-40 lg:hidden'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-out' />
                <div className='fixed inset-0 z-40 flex'>
                  <div className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-n-7 py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4 mt-20'>
                      <h2 className='text-lg font-medium text-white'>
                        Filters
                      </h2>
                      <button
                        type='button'
                        onClick={() => setMobileFiltersOpen(false)}
                        className='-mr-2 flex h-10 w-10 items-center rounded-md p-2 text-white '
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
                                <span className='h6 font-medium text-white'>
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
                                      className='ml-3 min-w-0 flex-1 text-white'
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
              <Heading
                className='md:max-w-md lg:max-w-2xl'
                title={t('portfolioP')}
                tag='Our Work in Action'
              />

              <main className='max-w-7xl'>
                <PixelCircles />
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
                  <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 '>
                    {/* Desktop Filters */}
                    <div className='hidden lg:block '>
                      <div className=''>
                        {Object.entries(subcategories).map(
                          ([categoryName, subcatKeys]) => (
                            <Disclosure
                              key={categoryName}
                              as='div'
                              className='border border-n-5 rounded-xl py-4 mb-5'
                            >
                              <h3 className='font-medium px-4'>
                                <DisclosureButton className='flex w-full justify-between text-left items-center group'>
                                  <span className='h5'>{categoryName}</span>
                                  <span className='ml-1 flex items-center'>
                                    <FaChevronDown className='group-data-[open]:rotate-180 transition-transform duration-200' />
                                  </span>
                                </DisclosureButton>
                              </h3>
                              <DisclosurePanel className='pt-4'>
                                <div className='grid grid-cols-1 gap-2'>
                                  {subcatKeys.map((subcatKey) => (
                                    <div
                                      key={subcatKey}
                                      onClick={() =>
                                        setSelectedSubcategory(subcatKey)
                                      }
                                      className={`flex cursor-pointer items-center justify-between rounded-lg p-3 text-white transition-colors duration-200 ease-in-out ${
                                        selectedSubcategory === subcatKey
                                          ? 'bg-[#F17A28] text-white'
                                          : 'hover:bg-gray-200 hover:text-black'
                                      }`}
                                    >
                                      {subcatKey.charAt(0).toUpperCase() +
                                        subcatKey
                                          .slice(1)
                                          .replace(/([A-Z])/g, ' $1')
                                          .trim()}
                                    </div>
                                  ))}
                                </div>
                              </DisclosurePanel>
                            </Disclosure>
                          )
                        )}
                      </div>
                    </div>

                    <div className='lg:col-span-3'>{renderComponent()}</div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

export default Portfolio
