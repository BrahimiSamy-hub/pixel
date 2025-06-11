import { useState, useMemo, useCallback, Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { IoSettings, IoClose } from 'react-icons/io5'
import { FaChevronDown } from 'react-icons/fa'
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react'
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid'

import Heading from '../components/Heading'
import PixelCircles from '../components/design/PixelCircles'
import Section from '../components/Section'

// Lazy load portfolio components for better performance
const PortfolioLogo = lazy(() => import('../components/portfolio/Logo'))
const PortfolioCards = lazy(() => import('../components/portfolio/Cards'))
const PortfolioTshirts = lazy(() => import('../components/portfolio/Frigo'))
const PortfolioFlyer = lazy(() => import('../components/portfolio/Flyer'))
const PortfolioBooks = lazy(() => import('../components/portfolio/Books'))
const PortfolioPosts = lazy(() => import('../components/portfolio/Posts'))
const PortfolioMenuA4 = lazy(() => import('../components/portfolio/MenuA4'))
const PortfolioMenuBook = lazy(() => import('../components/portfolio/MenuBook'))
const PortfolioMenuTV = lazy(() => import('../components/portfolio/MenuTV'))
const PortfolioReel = lazy(() => import('../components/portfolio/Reel'))
const PortfolioTrailer = lazy(() => import('../components/portfolio/Trailer'))
const PortfolioCinématographie = lazy(() =>
  import('../components/portfolio/Cinématographie')
)
const PortfolioSpot = lazy(() => import('../components/portfolio/Spot'))
const PortfolioShooting = lazy(() => import('../components/portfolio/Shooting'))
const PortfolioProduct = lazy(() => import('../components/portfolio/Product'))
const PortfolioFood = lazy(() => import('../components/portfolio/Food'))
const PortfolioWall = lazy(() => import('../components/portfolio/Wall'))
const PortfolioRollUp = lazy(() => import('../components/portfolio/RollUp'))
const PortfolioBache = lazy(() => import('../components/portfolio/Bache'))
const PortfolioCertificat = lazy(() =>
  import('../components/portfolio/Certificat')
)
const PortfolioStickers = lazy(() => import('../components/portfolio/Stickers'))
const PortfolioVitrine = lazy(() => import('../components/portfolio/Vitrine'))
const PortfolioFrigo = lazy(() => import('../components/portfolio/Frigo'))
const PorfolioPoster = lazy(() => import('../components/portfolio/Poster'))
const PortfolioTableau = lazy(() => import('../components/portfolio/Tableau'))
const PortfolioWebsite = lazy(() => import('../components/portfolio/WebSite'))
const PortfolioMobile = lazy(() => import('../components/portfolio/MobileApp'))
const PortfolioWeeding = lazy(() => import('../components/portfolio/Wedding'))

// Loading component
const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-[400px]'>
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#F17A28]'></div>
  </div>
)

// Error boundary component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className='flex flex-col items-center justify-center min-h-[400px] text-center p-8'>
    <div className='text-red-500 mb-4'>
      <svg
        className='w-16 h-16 mx-auto'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.963-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
        />
      </svg>
    </div>
    <h3 className='text-lg font-semibold text-white mb-2'>
      Something went wrong
    </h3>
    <p className='text-gray-400 mb-4'>Failed to load portfolio content</p>
    <button
      onClick={resetErrorBoundary}
      className='px-4 py-2 bg-[#F17A28] text-white rounded-lg hover:bg-[#e16a1f] transition-colors'
    >
      Try again
    </button>
  </div>
)

// Mobile Filter Dialog Component
const MobileFilterDialog = ({
  isOpen,
  onClose,
  categories,
  selectedSubcategory,
  onSubcategoryChange,
}) => {
  return (
    <Transition show={isOpen} as='div' className='relative z-50 lg:hidden'>
      <Transition.Child
        as='div'
        enter='transition-opacity ease-linear duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity ease-linear duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='fixed inset-0 z-40 flex'>
        <Transition.Child
          as='div'
          enter='transition ease-in-out duration-300 transform'
          enterFrom='translate-x-full'
          enterTo='translate-x-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='translate-x-0'
          leaveTo='translate-x-full'
          className='relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-n-8/95 backdrop-blur-xl shadow-2xl border-l border-n-6'
        >
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-n-6'>
            <h2 className='text-xl font-semibold text-white'>Categories</h2>
            <button
              onClick={onClose}
              className='p-2 rounded-lg hover:bg-n-6 transition-colors text-white'
            >
              <IoClose className='h-6 w-6' />
            </button>
          </div>

          {/* Categories */}
          <div className='flex-1 p-4 space-y-4'>
            {Object.entries(categories).map(([categoryName, subcatKeys]) => (
              <Disclosure
                key={categoryName}
                as='div'
                className='bg-n-7 rounded-xl overflow-hidden'
              >
                <DisclosureButton className='flex w-full items-center justify-between p-4 text-left hover:bg-n-6 transition-colors'>
                  <span className='font-medium text-white'>{categoryName}</span>
                  <FaChevronDown className='h-4 w-4 text-gray-400 group-data-[open]:rotate-180 transition-transform duration-200' />
                </DisclosureButton>
                <DisclosurePanel className='border-t border-n-6'>
                  {subcatKeys.map((subcatKey) => (
                    <button
                      key={subcatKey}
                      onClick={() => {
                        onSubcategoryChange(subcatKey)
                        onClose()
                      }}
                      className={`w-full text-left p-4 transition-colors ${
                        selectedSubcategory === subcatKey
                          ? 'bg-[#F17A28] text-white'
                          : 'text-gray-300 hover:bg-n-6 hover:text-white'
                      }`}
                    >
                      {subcatKey.charAt(0).toUpperCase() +
                        subcatKey
                          .slice(1)
                          .replace(/([A-Z])/g, ' $1')
                          .trim()}
                    </button>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

// Desktop Filter Component
const DesktopFilters = ({
  categories,
  selectedSubcategory,
  onSubcategoryChange,
}) => {
  return (
    <div className='hidden lg:block space-y-6'>
      <div className='sticky top-24'>
        {Object.entries(categories).map(([categoryName, subcatKeys]) => (
          <Disclosure
            key={categoryName}
            as='div'
            className='bg-n-8/50 backdrop-blur-sm border border-n-6 rounded-2xl mb-4 overflow-hidden shadow-lg'
            defaultOpen={subcatKeys.includes(selectedSubcategory)}
          >
            <DisclosureButton className='flex w-full items-center justify-between p-6 text-left hover:bg-n-7 transition-colors group'>
              <span className='text-lg font-semibold text-white'>
                {categoryName}
              </span>
              <FaChevronDown className='h-5 w-5 text-gray-400 group-data-[open]:rotate-180 transition-transform duration-300' />
            </DisclosureButton>
            <DisclosurePanel className='border-t border-n-6'>
              <div className='p-2'>
                {subcatKeys.map((subcatKey) => (
                  <button
                    key={subcatKey}
                    onClick={() => onSubcategoryChange(subcatKey)}
                    className={`w-full text-left p-4 rounded-lg mb-2 last:mb-0 transition-all duration-200 ${
                      selectedSubcategory === subcatKey
                        ? 'bg-[#F17A28] text-white shadow-lg transform scale-[1.02]'
                        : 'text-gray-300 hover:bg-n-6 hover:text-white hover:transform hover:scale-[1.01]'
                    }`}
                  >
                    {subcatKey.charAt(0).toUpperCase() +
                      subcatKey
                        .slice(1)
                        .replace(/([A-Z])/g, ' $1')
                        .trim()}
                  </button>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

// Main Portfolio Component
const Portfolio = () => {
  const { t } = useTranslation()
  const [selectedSubcategory, setSelectedSubcategory] = useState('logo')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Memoized subcategory components mapping
  const subcategoryComponents = useMemo(
    () => ({
      logo: PortfolioLogo,
      visitCards: PortfolioCards,
      't-shirt': PortfolioTshirts,
      'flyers / dépliant': PortfolioFlyer,
      books: PortfolioBooks,
      socialMediaPosts: PortfolioPosts,
      'Menu A4': PortfolioMenuA4,
      'Menu Book': PortfolioMenuBook,
      'Menu TV': PortfolioMenuTV,
      reels: PortfolioReel,
      trailers: PortfolioTrailer,
      cinematographie: PortfolioCinématographie,
      spotPublicitaire: PortfolioSpot,
      PhotoShoot: PortfolioShooting,
      'Product photography': PortfolioProduct,
      'Food photography': PortfolioFood,
      wall: PortfolioWall,
      'Roll Up': PortfolioRollUp,
      bache: PortfolioBache,
      certificat: PortfolioCertificat,
      stickers: PortfolioStickers,
      vitrine: PortfolioVitrine,
      frigo: PortfolioFrigo,
      poster: PorfolioPoster,
      tableau: PortfolioTableau,
      Websites: PortfolioWebsite,
      'Mobile Application': PortfolioMobile,
      photo: PortfolioWeeding,
    }),
    []
  )

  // Memoized categories configuration
  const subcategories = useMemo(
    () => ({
      [t('graphicDesign')]: [
        'logo',
        'visitCards',
        'flyers / dépliant',
        'stickers',
        'socialMediaPosts',
      ],
      [t('menu')]: ['Menu A4', 'Menu TV', 'Menu Book'],
      [t('video')]: [
        'reels',
        'trailers',
        'cinematographie',
        'spotPublicitaire',
      ],
      [t('photo')]: ['PhotoShoot', 'Product photography', 'Food photography'],
      [t('printing')]: ['Roll Up', 'bache', 'wall', 'poster', 'tableau'],
      [t('apps')]: ['Websites'],
      [t('weedingP')]: ['photo'],
    }),
    [t]
  )

  // Memoized handlers
  const handleSubcategoryChange = useCallback((subcategory) => {
    setSelectedSubcategory(subcategory)
  }, [])

  const handleMobileFiltersToggle = useCallback(() => {
    setMobileFiltersOpen((prev) => !prev)
  }, [])

  const handleMobileFiltersClose = useCallback(() => {
    setMobileFiltersOpen(false)
  }, [])

  // Memoized component renderer with error boundary
  const renderComponent = useCallback(() => {
    const Component = subcategoryComponents[selectedSubcategory]
    if (!Component) {
      return (
        <div className='flex items-center justify-center min-h-[400px] text-center'>
          <div className='text-gray-400 animate-slideUp'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-n-6 flex items-center justify-center'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z'
                />
              </svg>
            </div>
            <p className='text-lg mb-2'>{t('Select a subcategory')}</p>
            <p className='text-sm text-gray-500'>
              Choose a category from the sidebar to view portfolio items
            </p>
          </div>
        </div>
      )
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <div className='animate-fadeIn'>
          <Component />
        </div>
      </Suspense>
    )
  }, [selectedSubcategory, subcategoryComponents, t])

  return (
    <div className='pt-[4.75rem] -mt-[3rem] lg:pt-[8.25rem] overflow-hidden'>
      <Section
        className='pt-[12rem] sm:xl:pt-[8rem] -mt-[5.25rem] min-h-screen'
        crosses
        crossesOffset='lg:translate-y-[5.25rem]'
        customPaddings
      >
        <div className='relative'>
          {/* Mobile Filter Button */}
          <button
            onClick={handleMobileFiltersToggle}
            className='lg:hidden fixed top-1/2 right-4 z-40 transform -translate-y-1/2 bg-[#F17A28] hover:bg-[#e16a1f] rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110'
            aria-label='Open filters'
          >
            <IoSettings className='h-6 w-6 text-white' />
          </button>

          {/* Mobile Filter Dialog */}
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
              console.error('Mobile Filter Dialog Error:', error, errorInfo)
            }}
          >
            <MobileFilterDialog
              isOpen={mobileFiltersOpen}
              onClose={handleMobileFiltersClose}
              categories={subcategories}
              selectedSubcategory={selectedSubcategory}
              onSubcategoryChange={handleSubcategoryChange}
            />
          </ErrorBoundary>

          <div className='flex flex-col justify-center items-center'>
            <Heading
              className='md:max-w-md lg:max-w-2xl text-center mb-12'
              title={t('portfolioP')}
              tag={t('portfolioTag')}
            />

            <main className='max-w-7xl w-full'>
              <PixelCircles />

              <section
                aria-labelledby='portfolio-heading'
                className='pb-24 pt-6'
              >
                <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                  {/* Desktop Filters */}
                  <DesktopFilters
                    categories={subcategories}
                    selectedSubcategory={selectedSubcategory}
                    onSubcategoryChange={handleSubcategoryChange}
                  />

                  {/* Content Area */}
                  <div className='lg:col-span-3'>
                    <div className='bg-n-8/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-n-6 shadow-xl transition-all duration-300 hover:shadow-2xl animate-scaleIn'>
                      <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onError={(error, errorInfo) => {
                          console.error(
                            'Portfolio Component Error:',
                            error,
                            errorInfo
                          )
                        }}
                      >
                        {renderComponent()}
                      </ErrorBoundary>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Portfolio
