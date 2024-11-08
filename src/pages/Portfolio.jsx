import { useState } from 'react'

import Heading from '../components/Heading'
import PixelCircles from '../components/design/PixelCircles'
import Section from '../components/Section'

import { useTranslation } from 'react-i18next'
import { IoSettings } from 'react-icons/io5'
import { FaChevronDown } from 'react-icons/fa'
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid'

import PortfolioEmballage from '../components/portfolio/Emballage'
import PortfolioTableaux from '../components/portfolio/RollUp'
import PortfolioBache from '../components/portfolio/Bache'
import PortfolioCertificat from '../components/portfolio/Certificat'
import PortfolioVitrine from '../components/portfolio/Vitrine'
import PortfolioFrigo from '../components/portfolio/Frigo'
import PortfolioBooks from '../components/portfolio/Books'
import PortfolioFlyer from '../components/portfolio/Flyer'
import PortfolioStickers from '../components/portfolio/Stickers'
import PortfolioPosts from '../components/portfolio/Posts'
import PortfolioLogo from '../components/portfolio/Logo'
import PortfolioCards from '../components/portfolio/Cards'
import PortfolioTshirts from '../components/portfolio/Frigo'

import PortfolioCinématographie from '../components/portfolio/Cinématographie'
import PortfolioSpot from '../components/portfolio/Spot'
import PortfolioReel from '../components/portfolio/Reel'
import PortfolioTrailer from '../components/portfolio/Trailer'

import PortfolioShooting from '../components/portfolio/Shooting'
import PortfolioFood from '../components/portfolio/Food'
import PortfolioProduct from '../components/portfolio/Product'

import PortfolioMenuBook from '../components/portfolio/MenuBook'
import PortfolioMenuTV from '../components/portfolio/MenuTV'
import PortfolioMenuA4 from '../components/portfolio/MenuA4'

import PortfolioWeeding from '../components/portfolio/Wedding'
import PortfolioWeedingVideos from '../components/portfolio/WeddingVideos'

import PortfolioEcommerce from '../components/portfolio/E-commerce'
import PortfolioMobile from '../components/portfolio/MobileApp'
import PortfolioWebsite from '../components/portfolio/WebSite'

// Subcategory component mapping
const subcategoryComponents = {
  logo: PortfolioLogo,
  visitCards: PortfolioCards,
  't-shirt': PortfolioTshirts,
  flyers: PortfolioFlyer,
  books: PortfolioBooks,
  socialMediaPosts: PortfolioPosts,

  'Menu A4': PortfolioMenuA4,
  'Menu Book': PortfolioMenuBook,
  'Menu TV': PortfolioMenuTV,

  reels: PortfolioReel,
  trailers: PortfolioTrailer,
  cinematographie: PortfolioCinématographie,
  spotPublicitaire: PortfolioSpot,

  emballage: PortfolioEmballage,
  PhotoShoot: PortfolioShooting,
  'Product photography': PortfolioProduct,
  'Food photography': PortfolioFood,

  'Roll Up': PortfolioTableaux,
  wall: PortfolioBache,
  certificat: PortfolioCertificat,
  stickers: PortfolioStickers,
  vitrine: PortfolioVitrine,
  frigo: PortfolioFrigo,

  'Landing Page': PortfolioWebsite,
  'Mobile Application': PortfolioMobile,
  'E-commerce': PortfolioEcommerce,

  photo: PortfolioWeeding,
  video: PortfolioWeedingVideos,
}

const Portfolio = () => {
  const { t } = useTranslation()

  const subcategories = {
    [t('graphicDesign')]: [
      'logo',
      'visitCards',

      't-shirt',
      'flyers',
      'emballage',
      'stickers',
      'books',
      'socialMediaPosts',
    ],
    [t('menu')]: ['Menu A4', 'Menu TV', 'Menu Book'],
    [t('video')]: ['trailers', 'reels', 'cinematographie', 'spotPublicitaire'],
    [t('photo')]: ['PhotoShoot', 'Product photography', 'Food photography'],
    // [t('packaging')]: ['emballage'],
    [t('printing')]: ['Roll Up', 'wall', 'certificat', 'vitrine', 'frigo'],
    [t('apps')]: ['Landing Page', 'E-commerce', 'Mobile Application'],
    [t('weedingP')]: ['photo', 'video'],
  }

  const [selectedSubcategory, setSelectedSubcategory] = useState('logo')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const renderComponent = () => {
    const Component = subcategoryComponents[selectedSubcategory]
    return Component ? <Component /> : <div>{t('Select a subcategory')}</div>
  }

  return (
    <>
      <div
        className={`pt-[4.75rem] -mt-[3rem] lg:pt-[8.25rem] overflow-hidden `}
      >
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className=''>
            <div className='flex flex-col justify-center items-center '>
              {/* Mobile filter dialog */}
              <Dialog
                open={mobileFiltersOpen}
                onClose={setMobileFiltersOpen}
                className='relative z-50 lg:hidden'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-out' />
                <div className='fixed inset-0 z-40 flex'>
                  <div className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-n-7 py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4 '>
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
                className='md:max-w-md lg:max-w-2xl text-center'
                title={t('portfolioP')}
                tag={t('portfolioTag')}
              />

              <main className='max-w-7xl'>
                <PixelCircles />
                <div className=''>
                  <div className=' right-0 fixed'>
                    <button
                      type='button'
                      onClick={() => setMobileFiltersOpen(true)}
                      className='lg:hidden rotate-10 '
                    >
                      <div className=''>
                        <IoSettings
                          className='h-16 w-16 rounded-l-lg p-2 bg-[#F17A28] '
                          aria-hidden='true'
                        />{' '}
                        {/* Categories */}
                      </div>
                    </button>
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
                              className='border border-n-5 rounded-xl pt-4 mb-5'
                            >
                              <h3 className='font-medium px-4'>
                                <DisclosureButton className='flex w-full justify-between text-left items-center group'>
                                  <span className='h5 mb-3'>
                                    {categoryName}
                                  </span>
                                  <span className='ml-1 flex items-center'>
                                    <FaChevronDown className='group-data-[open]:rotate-180 transition-transform duration-200' />
                                  </span>
                                </DisclosureButton>
                              </h3>
                              <DisclosurePanel className=''>
                                <div className='grid grid-cols-1'>
                                  {subcatKeys.map((subcatKey) => (
                                    <div
                                      key={subcatKey}
                                      onClick={() =>
                                        setSelectedSubcategory(subcatKey)
                                      }
                                      className={`flex cursor-pointer items-center justify-between last:rounded-b-lg p-4 text-white transition-colors duration-200 ease-in-out ${
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
