import ButtonGradient from '../assets/svg/ButtonGradient'
import Section from '../components/Section'
import PricingList from '../components/NeonDetails'
import AnimatedBackground from '../components/AnimatedBackground'
import { useAnalytics } from '../hooks/useAnalytics'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaExternalLinkAlt,
  FaLightbulb,
  FaPrint,
  FaEye,
  FaRocket,
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEOHead'

const NeonPricing = () => {
  const { trackPricingView } = useAnalytics()
  const { t } = useTranslation()

  useEffect(() => {
    trackPricingView('advertisement')
  }, [trackPricingView])

  const neonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Advertising and Printing Services',
    name: 'Publicité et Impression - Pixel Creative Agency',
    description:
      'Services de publicité incluant panneaux LED neon, impression, signalétique, bâches publicitaires et supports marketing visuels en Algérie.',
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
      serviceUrl: 'https://pixeldz.store/advertisement',
    },
  }

  return (
    <>
      <SEOHead
        title='Publicité et Impression'
        description='Services de publicité incluant panneaux LED neon, impression, signalétique, bâches publicitaires et supports marketing visuels en Algérie. Solutions publicitaires innovantes.'
        keywords='publicité algérie, panneau neon, impression publicitaire, signalétique, bâche publicitaire, supports marketing'
        url='https://pixeldz.store/advertisement'
        structuredData={neonStructuredData}
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
                <FaLightbulb className='w-10 h-10 text-white' />
              </div>
              <h1 className='h1 mb-4 uppercase'>Advertisement</h1>
              <p className='text-xl text-gray-300 max-w-2xl mx-auto mb-8'>
                {t('publicite_text')}
              </p>

              {/* Portfolio Link */}
              <Link
                to='/portfolio?category=wall'
                className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F17A28] to-[#e5691f] hover:from-[#e5691f] hover:to-[#d15a1f] text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F17A28]/25'
              >
                {t('portfolioP')}
                <FaExternalLinkAlt className='ml-2' />
              </Link>
            </div>

            {/* Service Features Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaPrint className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>
                  Print Services
                </h3>
                <p className='text-gray-300 text-sm'>High quality printing</p>
              </div>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaLightbulb className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>LED & Neon</h3>
                <p className='text-gray-300 text-sm'>Lighting solutions</p>
              </div>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaEye className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>Visibility</h3>
                <p className='text-gray-300 text-sm'>Maximum exposure</p>
              </div>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:border-[#F17A28]/50 transition-all duration-300'>
                <FaRocket className='w-8 h-8 text-[#F17A28] mx-auto mb-4' />
                <h3 className='text-white font-semibold mb-2'>Innovation</h3>
                <p className='text-gray-300 text-sm'>Modern solutions</p>
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

export default NeonPricing
