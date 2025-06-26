import {
  useState,
  useMemo,
  useCallback,
  Suspense,
  lazy,
  useEffect,
} from 'react'
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
import AnimatedBackground from '../components/AnimatedBackground'
import SEOHead from '../components/SEOHead'
import ButtonGradient from '../assets/svg/ButtonGradient'

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

// Liquid Glass Background Component
const LiquidGlassBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('liquid-canvas')
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(241, 122, 40, ${this.opacity})`
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(241, 122, 40, ${
              0.1 * (1 - distance / 100)
            })`
            ctx.lineWidth = 1
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      id='liquid-canvas'
      className='fixed inset-0 pointer-events-none z-0'
      style={{ filter: 'blur(1px)' }}
    />
  )
}

// Glassmorphism Card Component
const GlassCard = ({ children, className = '', delay = 0 }) => {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
        animation: 'slideInUp 0.8s ease-out forwards',
        opacity: 0,
        transform: 'translateY(30px)',
      }}
    >
      {/* Liquid glass overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl' />

      {/* Floating liquid particles */}
      <div className='absolute top-4 right-4 w-2 h-2 bg-[#F17A28]/40 rounded-full animate-pulse-glow' />
      <div
        className='absolute bottom-6 left-6 w-1 h-1 bg-[#F17A28]/30 rounded-full animate-pulse-glow'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#F17A28]/20 rounded-full animate-pulse-glow'
        style={{ animationDelay: '2s' }}
      />

      {/* Content */}
      <div className='relative z-10 p-6'>{children}</div>
    </div>
  )
}

// Animated Loading Spinner with Glass Effect
const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-[400px]'>
    <div className='relative animate-liquid-float'>
      {/* Outer glass ring */}
      <div className='w-16 h-16 rounded-full border-2 border-white/20 backdrop-blur-sm bg-white/5 animate-spin'>
        <div className='absolute inset-0 rounded-full border-t-2 border-[#F17A28] animate-ping' />
      </div>

      {/* Inner liquid effect */}
      <div className='absolute inset-2 rounded-full bg-gradient-to-r from-[#F17A28]/30 to-[#F17A28]/10 animate-pulse' />

      {/* Center dot */}
      <div className='absolute inset-6 rounded-full bg-[#F17A28] animate-bounce' />

      {/* Floating particles around spinner */}
      <div className='absolute -top-2 -right-2 w-2 h-2 bg-[#F17A28]/60 rounded-full animate-pulse-glow' />
      <div
        className='absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-[#F17A28]/40 rounded-full animate-pulse-glow'
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className='absolute -top-1 -left-1 w-1 h-1 bg-[#F17A28]/30 rounded-full animate-pulse-glow'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#F17A28]/50 rounded-full animate-pulse-glow'
        style={{ animationDelay: '1.5s' }}
      />
    </div>
  </div>
)

// Enhanced Error Fallback with Glass Effect
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <GlassCard className='min-h-[400px] text-center p-8'>
    <div className='text-red-500 mb-4'>
      <div className='relative w-16 h-16 mx-auto'>
        <div className='absolute inset-0 rounded-full bg-red-500/20 animate-pulse' />
        <svg
          className='w-16 h-16 mx-auto relative z-10'
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
    </div>
    <h3 className='text-lg font-semibold text-white mb-2'>
      Something went wrong
    </h3>
    <p className='text-gray-400 mb-4'>Failed to load portfolio content</p>
    <button
      onClick={resetErrorBoundary}
      className='px-6 py-3 bg-gradient-to-r from-[#F17A28] to-[#e16a1f] text-white rounded-lg hover:from-[#e16a1f] hover:to-[#d15a1f] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_0_20px_rgba(241,122,40,0.5)]'
    >
      Try again
    </button>
  </GlassCard>
)

// Enhanced Mobile Filter Dialog with Glass Effect
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
        className='fixed inset-0 bg-black/60 backdrop-blur-md'
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
          className='relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto backdrop-blur-2xl bg-white/10 border-l border-white/20 shadow-2xl'
        >
          {/* Header with glass effect */}
          <div className='flex items-center justify-between p-6 border-b border-white/20 bg-white/5 backdrop-blur-sm'>
            <h2 className='text-xl font-semibold text-white'>Categories</h2>
            <button
              onClick={onClose}
              className='p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-white hover:scale-110'
            >
              <IoClose className='h-6 w-6' />
            </button>
          </div>

          {/* Categories with enhanced glass effect */}
          <div className='flex-1 p-4 space-y-4'>
            {Object.entries(categories).map(
              ([categoryName, subcatKeys], index) => (
                <Disclosure
                  key={categoryName}
                  as='div'
                  className='backdrop-blur-xl bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300'
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInRight 0.6s ease-out forwards',
                    opacity: 0,
                    transform: 'translateX(30px)',
                  }}
                >
                  <DisclosureButton className='flex w-full items-center justify-between p-4 text-left hover:bg-white/10 transition-all duration-300 group'>
                    <span className='font-medium text-white'>
                      {categoryName}
                    </span>
                    <FaChevronDown className='h-4 w-4 text-gray-400 group-data-[open]:rotate-180 transition-transform duration-300' />
                  </DisclosureButton>
                  <DisclosurePanel className='border-t border-white/10'>
                    {subcatKeys.map((subcatKey, subIndex) => (
                      <button
                        key={subcatKey}
                        onClick={() => {
                          onSubcategoryChange(subcatKey)
                          onClose()
                        }}
                        className={`w-full text-left p-4 transition-all duration-300 hover:scale-[1.02] ${
                          selectedSubcategory === subcatKey
                            ? 'bg-gradient-to-r from-[#F17A28] to-[#e16a1f] text-white shadow-lg'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        style={{
                          animationDelay: `${index * 100 + subIndex * 50}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards',
                          opacity: 0,
                          transform: 'translateY(20px)',
                        }}
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
              )
            )}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

// Enhanced Desktop Filters with Glass Effect
const DesktopFilters = ({
  categories,
  selectedSubcategory,
  onSubcategoryChange,
}) => {
  return (
    <div className='hidden lg:block space-y-6'>
      <div className='sticky top-24'>
        {Object.entries(categories).map(([categoryName, subcatKeys], index) => (
          <Disclosure
            key={categoryName}
            as='div'
            className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl mb-4 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-glass-glow'
            defaultOpen={subcatKeys.includes(selectedSubcategory)}
            style={{
              animationDelay: `${index * 150}ms`,
              animation: 'slideInLeft 0.8s ease-out forwards',
              opacity: 0,
              transform: 'translateX(-30px)',
            }}
          >
            {/* Floating particles for each category */}
            <div className='absolute top-3 right-3 w-1 h-1 bg-[#F17A28]/40 rounded-full animate-pulse-glow' />
            <div
              className='absolute bottom-3 left-3 w-0.5 h-0.5 bg-[#F17A28]/30 rounded-full animate-pulse-glow'
              style={{ animationDelay: '1s' }}
            />

            <DisclosureButton className='flex w-full items-center justify-between p-6 text-left hover:bg-white/10 transition-all duration-300 group'>
              <span className='text-lg font-semibold text-white'>
                {categoryName}
              </span>
              <FaChevronDown className='h-5 w-5 text-gray-400 group-data-[open]:rotate-180 transition-transform duration-300' />
            </DisclosureButton>
            <DisclosurePanel className='border-t border-white/10'>
              <div className='p-2'>
                {subcatKeys.map((subcatKey, subIndex) => (
                  <button
                    key={subcatKey}
                    onClick={() => onSubcategoryChange(subcatKey)}
                    className={`w-full text-left p-4 rounded-lg mb-2 last:mb-0 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                      selectedSubcategory === subcatKey
                        ? 'bg-gradient-to-r from-[#F17A28] to-[#e16a1f] text-white shadow-lg transform scale-[1.02]'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    style={{
                      animationDelay: `${index * 150 + subIndex * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      opacity: 0,
                      transform: 'translateY(20px)',
                    }}
                  >
                    {/* Liquid effect for selected items */}
                    {selectedSubcategory === subcatKey && (
                      <>
                        <div className='absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-pulse-glow' />
                        <div
                          className='absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse-glow'
                          style={{ animationDelay: '0.5s' }}
                        />
                      </>
                    )}

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

  // Enhanced component renderer with glass effect
  const renderComponent = useCallback(() => {
    const Component = subcategoryComponents[selectedSubcategory]
    if (!Component) {
      return (
        <GlassCard className='min-h-[400px] text-center' delay={200}>
          <div className='text-gray-400'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#F17A28]/20 to-[#F17A28]/10 backdrop-blur-sm flex items-center justify-center border border-[#F17A28]/30'>
              <svg
                className='w-8 h-8 text-[#F17A28]'
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
            <p className='text-lg mb-2 text-white'>
              {t('Select a subcategory')}
            </p>
            <p className='text-sm text-gray-400'>
              Choose a category from the sidebar to view portfolio items
            </p>
          </div>
        </GlassCard>
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

  const portfolioStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Portfolio Pixel Creative Agency',
    description:
      'Découvrez notre portfolio de travaux créatifs incluant photographie, design graphique, vidéographie et développement web.',
    url: 'https://pixeldz.store/portfolio',
    creator: {
      '@type': 'Organization',
      name: 'Pixel Creative Agency',
    },
    genre: [
      'Photography',
      'Graphic Design',
      'Video Production',
      'Web Development',
    ],
    keywords:
      'portfolio photographie, design graphique, vidéographie, développement web, travaux créatifs',
  }

  return (
    <>
      <SEOHead
        title='Portfolio'
        description='Découvrez notre portfolio de travaux créatifs incluant photographie professionnelle, design graphique, vidéographie et développement web. Exemples de nos réalisations en Algérie.'
        keywords='portfolio photographie algérie, design graphique, vidéographie, développement web, travaux créatifs, exemples réalisations'
        url='https://pixeldz.store/portfolio'
        structuredData={portfolioStructuredData}
      />
      <AnimatedBackground />
      <LiquidGlassBackground />

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <div className='pt-[4.75rem] -mt-[3rem] lg:pt-[8.25rem] overflow-hidden'>
        <Section
          className='pt-[12rem] sm:xl:pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='relative'>
            {/* Enhanced Mobile Filter Button with Glass Effect */}
            <button
              onClick={handleMobileFiltersToggle}
              className='lg:hidden fixed top-1/2 right-4 z-40 transform -translate-y-1/2 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(241,122,40,0.5)] animate-liquid-float'
              aria-label='Open filters'
            >
              <IoSettings className='h-6 w-6 text-white animate-spin-slow' />

              {/* Floating particles around button */}
              <div className='absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#F17A28]/60 rounded-full animate-pulse-glow' />
              <div
                className='absolute -bottom-1 -left-1 w-1 h-1 bg-[#F17A28]/40 rounded-full animate-pulse-glow'
                style={{ animationDelay: '0.7s' }}
              />
              <div
                className='absolute -top-0.5 -left-0.5 w-0.5 h-0.5 bg-[#F17A28]/30 rounded-full animate-pulse-glow'
                style={{ animationDelay: '1.4s' }}
              />
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
                {/* <PixelCircles /> */}

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

                    {/* Enhanced Content Area with Glass Effect */}
                    <div className='lg:col-span-3'>
                      <GlassCard className='p-6 lg:p-8' delay={300}>
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
                      </GlassCard>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </Section>
      </div>

      <ButtonGradient />
    </>
  )
}

export default Portfolio
