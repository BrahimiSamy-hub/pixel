"use client"
import dynamic from 'next/dynamic'
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
import { useSearchParams, useRouter } from 'next/navigation'

import Heading from '@/components/Heading'
import PixelCircles from '@/components/design/PixelCircles'
import Section from '@/components/Section'
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false })
import ButtonGradient from '@/assets/svg/ButtonGradient'
import { useAnalytics } from '@/hooks/useAnalytics'

// Lazy load portfolio components
const PortfolioLogo = lazy(() => import('@/components/portfolio/Logo'))
const PortfolioCards = lazy(() => import('@/components/portfolio/Cards'))
const PortfolioTshirts = lazy(() => import('@/components/portfolio/Frigo'))
const PortfolioFlyer = lazy(() => import('@/components/portfolio/Flyer'))
const PortfolioBooks = lazy(() => import('@/components/portfolio/Books'))
const PortfolioPosts = lazy(() => import('@/components/portfolio/Posts'))
const PortfolioMenuA4 = lazy(() => import('@/components/portfolio/MenuA4'))
const PortfolioMenuBook = lazy(() => import('@/components/portfolio/MenuBook'))
const PortfolioMenuTV = lazy(() => import('@/components/portfolio/MenuTV'))
const PortfolioReel = lazy(() => import('@/components/portfolio/Reel'))
const PortfolioTrailer = lazy(() => import('@/components/portfolio/Trailer'))
const PortfolioCinématographie = lazy(() => import('@/components/portfolio/Cinématographie'))
const PortfolioSpot = lazy(() => import('@/components/portfolio/Spot'))
const PortfolioShooting = lazy(() => import('@/components/portfolio/Shooting'))
const PortfolioProduct = lazy(() => import('@/components/portfolio/Product'))
const PortfolioFood = lazy(() => import('@/components/portfolio/Food'))
const PortfolioWall = lazy(() => import('@/components/portfolio/Wall'))
const PortfolioRollUp = lazy(() => import('@/components/portfolio/RollUp'))
const PortfolioBache = lazy(() => import('@/components/portfolio/Bache'))
const PortfolioCertificat = lazy(() => import('@/components/portfolio/Certificat'))
const PortfolioStickers = lazy(() => import('@/components/portfolio/Stickers'))
const PortfolioVitrine = lazy(() => import('@/components/portfolio/Vitrine'))
const PortfolioFrigo = lazy(() => import('@/components/portfolio/Frigo'))
const PorfolioPoster = lazy(() => import('@/components/portfolio/Poster'))
const PortfolioTableau = lazy(() => import('@/components/portfolio/Tableau'))
const PortfolioWebsite = lazy(() => import('@/components/portfolio/WebSite'))
const PortfolioMobile = lazy(() => import('@/components/portfolio/MobileApp'))
const PortfolioWeeding = lazy(() => import('@/components/portfolio/Wedding'))

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
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(241, 122, 40, ${0.1 * (1 - distance / 100)})`
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
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return <canvas id='liquid-canvas' className='fixed inset-0 pointer-events-none z-0' style={{ filter: 'blur(1px)' }} />
}

const GlassCard = ({ children, className = '', delay = 0 }) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animation: 'slideInUp 0.8s ease-out forwards',
        opacity: 0,
        transform: 'translateY(30px)',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl' />
      <div className='absolute top-4 right-4 w-2 h-2 bg-[#F17A28]/40 rounded-full animate-pulse-glow' />
      <div className='absolute bottom-6 left-6 w-1 h-1 bg-[#F17A28]/30 rounded-full animate-pulse-glow' style={{ animationDelay: '1s' }} />
      <div className='absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#F17A28]/20 rounded-full animate-pulse-glow' style={{ animationDelay: '2s' }} />
      <div className='relative z-10 p-6'>{children}</div>
    </div>
  )
}

const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-[400px]'>
    <div className='relative animate-liquid-float'>
      <div className='w-16 h-16 rounded-full border-2 border-white/20 backdrop-blur-sm bg-white/5 animate-spin'>
        <div className='absolute inset-0 rounded-full border-t-2 border-[#F17A28] animate-ping' />
      </div>
      <div className='absolute inset-2 rounded-full bg-gradient-to-r from-[#F17A28]/30 to-[#F17A28]/10 animate-pulse' />
      <div className='absolute inset-6 rounded-full bg-[#F17A28] animate-bounce' />
    </div>
  </div>
)

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <GlassCard className='min-h-[400px] text-center p-8'>
    <h3 className='text-lg font-semibold text-white mb-2'>Something went wrong</h3>
    <button onClick={resetErrorBoundary} className='px-6 py-3 bg-gradient-to-r from-[#F17A28] to-[#e16a1f] text-white rounded-lg'>Try again</button>
  </GlassCard>
)

const PortfolioClient = () => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { trackPortfolioView, trackButtonClick } = useAnalytics()

  const selectedSubcategory = searchParams.get('category') || 'logo'

  const subcategoryComponents = useMemo(() => ({
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
  }), [])

  const subcategories = useMemo(() => ({
    [t('graphicDesign')]: ['logo', 'visitCards', 'flyers / dépliant', 'stickers', 'socialMediaPosts'],
    [t('menu')]: ['Menu A4', 'Menu TV', 'Menu Book'],
    [t('video')]: ['reels', 'trailers', 'cinematographie', 'spotPublicitaire'],
    [t('photo')]: ['PhotoShoot', 'Product photography', 'Food photography'],
    [t('printing')]: ['Roll Up', 'bache', 'wall', 'poster', 'tableau'],
    [t('apps')]: ['Websites'],
    [t('weedingP')]: ['photo'],
  }), [t])

  const handleSubcategoryChange = useCallback((subcategory) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', subcategory)
    router.push(`/portfolio?${params.toString()}`)
    trackPortfolioView(subcategory)
  }, [searchParams, router, trackPortfolioView])

  const renderComponent = useCallback(() => {
    const Component = subcategoryComponents[selectedSubcategory]
    if (!Component) return <div>Select a subcategory</div>
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    )
  }, [selectedSubcategory, subcategoryComponents])

  return (
    <>
      <AnimatedBackground />
      <LiquidGlassBackground />
      <div className='pt-[4.75rem] -mt-[3rem] lg:pt-[8.25rem] overflow-hidden'>
        <Section className='pt-[12rem] xl:pt-[8rem] -mt-[5.25rem] min-h-screen' crosses crossesOffset='lg:translate-y-[5.25rem]' customPaddings>
          <div className='relative'>
            <button onClick={() => setMobileFiltersOpen(true)} className='lg:hidden fixed top-1/2 right-4 z-40 transform -translate-y-1/2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full p-4 shadow-2xl'>
              <IoSettings className='h-6 w-6 text-white' />
            </button>
            <div className='flex flex-col justify-center items-center'>
              <Heading className='md:max-w-md lg:max-w-2xl text-center mb-12' title={t('portfolioP')} tag={t('portfolioTag')} />
              <main className='max-w-7xl w-full'>
                <section className='pb-24 pt-6'>
                  <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                    <div className='hidden lg:block space-y-6'>
                      {Object.entries(subcategories).map(([categoryName, subcatKeys]) => (
                        <Disclosure key={categoryName} as='div' className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl mb-4 overflow-hidden' defaultOpen={subcatKeys.includes(selectedSubcategory)}>
                          <DisclosureButton className='flex w-full items-center justify-between p-6 text-left hover:bg-white/10 group'>
                            <span className='text-lg font-semibold text-white'>{categoryName}</span>
                            <FaChevronDown className='h-5 w-5 text-gray-400 group-data-[open]:rotate-180 transition-transform' />
                          </DisclosureButton>
                          <DisclosurePanel className='border-t border-white/10 p-2'>
                            {subcatKeys.map((subcatKey) => (
                              <button key={subcatKey} onClick={() => handleSubcategoryChange(subcatKey)} className={`w-full text-left p-4 rounded-lg mb-2 ${selectedSubcategory === subcatKey ? 'bg-gradient-to-r from-[#F17A28] to-[#e16a1f] text-white shadow-lg' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
                                {subcatKey}
                              </button>
                            ))}
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                    </div>
                    <div className='lg:col-span-3'>
                      <GlassCard className='p-6 lg:p-8' delay={300}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
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
      {/* Mobile Filter */}
      <Transition show={mobileFiltersOpen} as='div' className='relative z-50 lg:hidden'>
        <Transition.Child as='div' className='fixed inset-0 bg-black/60 backdrop-blur-md' onClick={() => setMobileFiltersOpen(false)} />
        <div className='fixed inset-0 z-40 flex'>
          <Transition.Child as='div' className='relative ml-auto h-full w-full max-w-sm flex-col overflow-y-auto backdrop-blur-2xl bg-white/10 border-l border-white/20 shadow-2xl'>
            <div className='flex items-center justify-between p-6 bg-white/5'>
              <h2 className='text-xl font-semibold text-white'>Categories</h2>
              <button onClick={() => setMobileFiltersOpen(false)}><IoClose className='h-6 w-6 text-white' /></button>
            </div>
            <div className='p-4 space-y-4'>
              {Object.entries(subcategories).map(([categoryName, subcatKeys]) => (
                <Disclosure key={categoryName} as='div' className='bg-white/5 rounded-xl border border-white/10'>
                  <DisclosureButton className='flex w-full items-center justify-between p-4 text-white font-medium'>{categoryName}</DisclosureButton>
                  <DisclosurePanel>
                    {subcatKeys.map((subcatKey) => (
                      <button key={subcatKey} onClick={() => { handleSubcategoryChange(subcatKey); setMobileFiltersOpen(false); }} className={`w-full text-left p-4 ${selectedSubcategory === subcatKey ? 'bg-[#F17A28] text-white' : 'text-gray-300'}`}>{subcatKey}</button>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>
          </Transition.Child>
        </div>
      </Transition>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(241, 122, 40, 0.3);
            opacity: 0.8;
          }
          50% {
            box-shadow: 0 0 40px rgba(241, 122, 40, 0.6);
            opacity: 1;
          }
        }

        @keyframes liquid-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(1deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        .animate-liquid-float {
          animation: liquid-float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default PortfolioClient
