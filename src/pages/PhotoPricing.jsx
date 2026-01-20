import ButtonGradient from '../assets/svg/ButtonGradient'
import Section from '../components/Section'
import PricingList from '../components/PhotoDetails'
import AnimatedBackground from '../components/AnimatedBackground'
import { useAnalytics } from '../hooks/useAnalytics'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaExternalLinkAlt,
  FaCamera,
  FaVideo,
  FaUsers,
  FaStar,
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

const PhotoPricing = () => {
  const { trackPricingView } = useAnalytics()
  const { t } = useTranslation()

  useEffect(() => {
    trackPricingView('photography')
  }, [trackPricingView])

  const photoStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Photography Services',
    name: 'Photographie Professionnelle - Pixel Creative Agency',
    description:
      'Services de photographie professionnelle incluant portraits, événements, mariages et photographie commerciale en Algérie.',
    provider: {
      '@type': 'Organization',
      name: 'Pixel Creative Agency',
      url: 'https://pixeldz.store',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Algérie',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://pixeldz.store/photoLab',
    },
  }

  return (
    <>
      <SEOHead
        title='Photographie Professionnelle'
        description='Services de photographie professionnelle incluant portraits, événements, mariages et photographie commerciale en Algérie. Devis gratuit et qualité professionnelle garantie.'
        keywords='photographie professionnelle algérie, photos événements, mariage, portrait, photo commerciale, studio photo'
        url='https://pixeldz.store/photoLab'
        structuredData={photoStructuredData}
      />
      <AnimatedBackground />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Section
          className='pt-[10rem] -mt-[5.25rem]'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container min-h-screen'>
            {/* Enhanced Header */}
            <div className='text-center mb-12'>
              <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F17A28] to-[#e5691f] rounded-2xl mb-6 shadow-2xl'>
                <FaCamera className='w-10 h-10 text-white' />
              </div>
              <h1 className='h1 mb-4 uppercase'>Photo</h1>
              <p className='text-xl text-gray-300 max-w-2xl mx-auto mb-8'>
                {t('photo_video_text')}
              </p>

              {/* Portfolio Link */}
              <Link
                to='/portfolio?category=PhotoShoot'
                className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F17A28] to-[#e5691f] hover:from-[#e5691f] hover:to-[#d15a1f] text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F17A28]/25'
              >
                {t('portfolioP')}
                <FaExternalLinkAlt className='ml-2' />
              </Link>
            </div>

            {/* Service Features Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaCamera className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>Photography</h3>
                <p className='text-gray-300 text-sm'>
                  Professional photo shoots
                </p>
              </div>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaVideo className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>
                  Video Production
                </h3>
                <p className='text-gray-300 text-sm'>Cinematic video content</p>
              </div>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaUsers className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>Events</h3>
                <p className='text-gray-300 text-sm'>Event coverage</p>
              </div>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaStar className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>Quality</h3>
                <p className='text-gray-300 text-sm'>Premium results</p>
              </div>
            </div>

            {/* Pricing List */}
            <PricingList />
          </div>
        </Section>
      </div>

      <ButtonGradient />
    </>
  )
}

export default PhotoPricing
