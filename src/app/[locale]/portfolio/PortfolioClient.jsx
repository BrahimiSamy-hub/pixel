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
import { useTranslations, useLocale } from 'next-intl'
import { 
  IoSearch, 
  IoGrid, 
  IoList, 
  IoArrowForward, 
  IoBriefcase, 
  IoStar, 
  IoTrophy,
  IoChevronBack,
  IoChevronForward
} from 'react-icons/io5'
import { useSearchParams, useParams, useRouter, usePathname } from 'next/navigation'

import Heading from '@/components/Heading'
import Section from '@/components/Section'
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false })
import ButtonGradient from '@/assets/svg/ButtonGradient'
import { useAnalytics } from '@/hooks/useAnalytics'

// Lazy load portfolio components
const PortfolioLogo = lazy(() => import('@/components/portfolio/Logo'))
const PortfolioCards = lazy(() => import('@/components/portfolio/Cards'))
const PortfolioTshirts = lazy(() => import('@/components/portfolio/Tshirt'))
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
const PortfolioPackaging = lazy(() => import('@/components/portfolio/Emballage'))

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-[#13151A] border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-[#F17A28]/30 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-[#F17A28]/10 flex items-center justify-center">
      <Icon className="text-[#F17A28] text-2xl" />
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  </div>
)

const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-[400px]'>
    <div className="w-10 h-10 border-4 border-[#F17A28]/20 border-t-[#F17A28] rounded-full animate-spin" />
  </div>
)

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className='min-h-[400px] text-center p-8 bg-[#13151A] rounded-2xl border border-white/5'>
    <h3 className='text-lg font-semibold text-white mb-2'>Something went wrong</h3>
    <button onClick={resetErrorBoundary} className='px-6 py-3 bg-[#F17A28] text-white rounded-lg hover:bg-[#d96920] transition-colors'>Try again</button>
  </div>
)

const PortfolioClient = () => {
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const { trackPortfolioView } = useAnalytics()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewType, setViewType] = useState('grid') // 'grid' or 'list'

  const selectedCategory = params?.category || searchParams.get('cat') || 'all'
  const selectedSub = searchParams.get('sub') || ''

  const categories = useMemo(() => [
    { id: 'all', labelKey: 'portfolio_filters.all', count: 120 },
    { 
      id: 'conception', 
      labelKey: 'portfolio_filters.conception', 
      count: 24,
      subs: ['logo', 'visitCards'] 
    },
    { 
      id: 'print', 
      labelKey: 'portfolio_filters.print', 
      count: 45,
      subs: ['flyers / dépliant', 'Menu A4', 'Menu Book', 'Roll Up', 'bache', 'wall', 'poster', 'tableau', 'certificat'] 
    },
    { 
      id: 'digital', 
      labelKey: 'portfolio_filters.digital', 
      count: 21,
      subs: ['Websites', 'Mobile Application'] 
    },
    { 
      id: 'video', 
      labelKey: 'portfolio_filters.video', 
      count: 15,
      subs: ['reels', 'trailers', 'cinematographie', 'spotPublicitaire'] 
    },
    { 
      id: 'social', 
      labelKey: 'portfolio_filters.social', 
      count: 32,
      subs: ['socialMediaPosts'] 
    },
    { 
      id: 'photo', 
      labelKey: 'portfolio_filters.photo', 
      count: 18,
      subs: ['PhotoShoot', 'Product photography', 'Food photography', 'photo'] 
    },
  ], [])

  const currentCategoryData = useMemo(() => 
    categories.find(c => c.id === selectedCategory) || categories[0]
  , [categories, selectedCategory])

  const subToComponent = useMemo(() => ({
    logo: PortfolioLogo,
    visitCards: PortfolioCards,
    Emballage: PortfolioPackaging,
    stickers: PortfolioStickers,
    'flyers / dépliant': PortfolioFlyer,
    'Menu A4': PortfolioMenuA4,
    'Menu Book': PortfolioMenuBook,
    'Roll Up': PortfolioRollUp,
    bache: PortfolioBache,
    wall: PortfolioWall,
    poster: PorfolioPoster,
    tableau: PortfolioTableau,
    certificat: PortfolioCertificat,
    socialMediaPosts: PortfolioPosts,
    'Menu TV': PortfolioMenuTV,
    reels: PortfolioReel,
    trailers: PortfolioTrailer,
    cinematographie: PortfolioCinématographie,
    spotPublicitaire: PortfolioSpot,
    Websites: PortfolioWebsite,
    'Mobile Application': PortfolioMobile,
    PhotoShoot: PortfolioShooting,
    'Product photography': PortfolioProduct,
    'Food photography': PortfolioFood,
    photo: PortfolioWeeding,
  }), [])

  const handleSubChange = useCallback((sub) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('sub', sub);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  }, [searchParams, pathname, router])

  const handleCategoryChange = useCallback((catId) => {
    const target = catId === 'all' ? '/portfolio' : `/portfolio/${catId}`;
    router.push(`/${locale}${target}`);
  }, [router, locale])

  const renderActiveContent = () => {
    if (selectedCategory === 'all') {
      return (
        <div className="space-y-20">
          <Suspense fallback={<LoadingSpinner />}>
            <PortfolioLogo searchQuery={searchQuery} viewType={viewType} />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PortfolioFlyer searchQuery={searchQuery} viewType={viewType} />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PortfolioPosts searchQuery={searchQuery} viewType={viewType} />
          </Suspense>
        </div>
      )
    }

    const sub = selectedSub || currentCategoryData?.subs?.[0]
    const Component = subToComponent[sub]
    
    if (!Component) return <div className="text-gray-400 text-center py-20">Contenu non disponible pour cette catégorie.</div>

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component searchQuery={searchQuery} viewType={viewType} />
      </Suspense>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <div className='pt-[4.75rem] -mt-[3rem] lg:pt-[8.25rem] overflow-hidden bg-[#0A0C10]'>
        <Section className='pt-[8rem] min-h-screen' crosses crossesOffset='lg:translate-y-[5.25rem]' customPaddings>
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
              <div className="max-w-2xl">
                <div className="text-[#F17A28] font-bold text-xs uppercase tracking-widest mb-3">[ NOTRE TRAVAIL EN ACTION ]</div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                  {selectedCategory === 'all' ? 'Portfolio' : t(currentCategoryData.labelKey)}
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Découvrez une sélection de nos réalisations les plus récentes. Chaque projet reflète notre passion pour le design, la créativité et l'excellence.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex gap-4 w-full lg:w-auto">
                <StatCard icon={IoBriefcase} value="120+" label={t('portfolio_stats.projects')} />
                <StatCard icon={IoStar} value="98%" label={t('portfolio_stats.clients')} />
                <StatCard icon={IoTrophy} value="8+" label={t('portfolio_stats.experience')} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sidebar Filters */}
              <aside className="lg:w-1/4 space-y-8">
                <div className="bg-[#13151A] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center gap-2">
                    <IoGrid className="text-[#F17A28]" />
                    <h2 className="text-lg font-bold text-white">
                      {selectedCategory === 'all' ? t('portfolio_filters.title') : 'Filtres'}
                    </h2>
                  </div>
                  <div className="p-2 space-y-1">
                    {selectedCategory !== 'all' && (
                      <button
                        onClick={() => handleCategoryChange('all')}
                        className="w-full flex items-center gap-3 p-4 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
                      >
                        <IoChevronBack className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Toutes les catégories</span>
                      </button>
                    )}
                    {selectedCategory === 'all' ? (
                      categories.filter(c => c.id !== 'all').map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                            selectedCategory === cat.id 
                              ? 'bg-[#F17A28]/10 text-[#F17A28]' 
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="font-medium">{t(cat.labelKey)}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedCategory === cat.id ? 'bg-[#F17A28] text-white' : 'bg-white/5 text-gray-500'
                          }`}>
                            {cat.count}
                          </span>
                        </button>
                      ))
                    ) : (
                      currentCategoryData.subs.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSubChange(sub)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                            selectedSub === sub || (!selectedSub && currentCategoryData.subs[0] === sub)
                              ? 'bg-[#F17A28]/10 text-[#F17A28]' 
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="font-medium capitalize">{sub}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-[#F17A28] to-[#ff9d5c] rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <IoBriefcase size={80} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 relative z-10">{t('portfolio_cta.title')}</h3>
                  <p className="text-white/80 text-sm mb-6 relative z-10">{t('portfolio_cta.subtitle')}</p>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-white text-[#F17A28] px-6 py-3 rounded-xl font-bold text-sm hover:shadow-xl transition-all relative z-10"
                  >
                    {t('portfolio_cta.button')}
                    <IoArrowForward />
                  </a>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="lg:w-3/4 space-y-8">
                {/* Search and View Toggles */}
                <div className="bg-[#13151A] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="text"
                      placeholder={t('portfolio_search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#F17A28]/50 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl">
                    <button 
                      onClick={() => setViewType('grid')}
                      className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-[#F17A28] text-white shadow-lg shadow-[#F17A28]/20' : 'text-gray-500 hover:text-white'}`}
                    >
                      <IoGrid />
                    </button>
                    <button 
                      onClick={() => setViewType('list')}
                      className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-[#F17A28] text-white shadow-lg shadow-[#F17A28]/20' : 'text-gray-500 hover:text-white'}`}
                    >
                      <IoList />
                    </button>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="min-h-[600px]">
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    {renderActiveContent()}
                  </ErrorBoundary>
                </div>
              </main>
            </div>
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  )
}

export default PortfolioClient
