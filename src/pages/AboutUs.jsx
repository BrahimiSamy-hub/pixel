import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import Faq from '../components/Faq'
import AnimatedBackground from '../components/AnimatedBackground'
import SEOHead from '../components/SEOHead'

const AboutUs = () => {
  const { t } = useTranslation()

  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À Propos - Pixel Creative Agency',
    description:
      "Découvrez l'histoire de Pixel Creative Agency, agence créative professionnelle en Algérie depuis 2018. Notre équipe dédiée à la création d'expériences visuelles uniques.",
    url: 'https://pixeldz.store/about-us',
    mainEntity: {
      '@type': 'Organization',
      name: 'Pixel Creative Agency',
      foundingDate: '2018',
      description:
        'Agence créative professionnelle en Algérie spécialisée en photographie, design graphique et développement web',
      url: 'https://pixeldz.store',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'DZ',
        addressRegion: 'Algérie',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Arabic'],
      },
    },
  }

  return (
    <>
      <SEOHead
        title='À Propos'
        description="Découvrez l'histoire de Pixel Creative Agency, agence créative professionnelle en Algérie depuis 2018. Notre équipe dédiée à la création d'expériences visuelles uniques et mémorables."
        keywords='pixel creative agency, histoire agence, équipe créative, algérie, photographie, design, depuis 2018'
        url='https://pixeldz.store/about-us'
        structuredData={aboutStructuredData}
      />
      <AnimatedBackground />
      <div
        className={`pt-[4.75rem] -mt-[2.65rem] lg:pt-[7.9rem] overflow-hidden relative`}
      >
        <Section
          className='pt-[12rem] lg:pt-[8rem] -mt-[5.25rem] min-h-screen relative z-10'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            {/* Hero Section */}
            <div className='text-center justify-center items-center flex flex-col mb-20'>
              <div className='relative mb-8'>
                {/* Decorative elements */}

                <h1 className='h1 font-bold bg-gradient-to-r from-[white] via-[white] to-[white] bg-clip-text text-transparent animate-fade-in-up'>
                  {t('about_us.header')}
                </h1>
                <div className='h-1.5 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] mt-4 mb-6 rounded-full w-32 mx-auto animate-fade-in-up delay-200'></div>
              </div>

              <div className='max-w-6xl mx-auto'>
                <p className='body-1 text-xl lg:text-2xl text-center text-n-2 lg:mb-12 mb-8 leading-relaxed animate-fade-in-up delay-300'>
                  {t('about_us.description')}
                </p>

                {/* Stats or highlights section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-20'>
                  <div className='group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-n-6 rounded-2xl p-6 hover:shadow-2xl hover:shadow-[#F17A28]/10 transition-all duration-500 hover:scale-105 animate-fade-in-up delay-500'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        className='w-8 h-8 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 2L3 7v11a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V7l-7-5z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold text-n-1 mb-2 text-center'>
                      {t('about_us.ourLocation')}
                    </h3>
                    <p className='text-n-3 text-center'>
                      {t('about_us.strategicallyLocated')}
                    </p>
                  </div>

                  <div className='group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-n-6 rounded-2xl p-6 hover:shadow-2xl hover:shadow-[#F17A28]/10 transition-all duration-500 hover:scale-105 animate-fade-in-up delay-700'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        className='w-8 h-8 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold text-n-1 mb-2 text-center'>
                      {t('about_us.support247')}
                    </h3>
                    <p className='text-n-3 text-center'>
                      {t('about_us.alwaysHere')}
                    </p>
                  </div>

                  <div className='group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-n-6 rounded-2xl p-6 hover:shadow-2xl hover:shadow-[#F17A28]/10 transition-all duration-500 hover:scale-105 animate-fade-in-up delay-900'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        className='w-8 h-8 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold text-n-1 mb-2 text-center'>
                      {t('about_us.qualityFirst')}
                    </h3>
                    <p className='text-n-3 text-center'>
                      {t('about_us.excellenceDetail')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Map Section */}
            <div className='mb-20'>
              <div className='text-center mb-12'>
                <h2 className='text-6xl lg:text-5xl font-bold text-n-1 mb-4'>
                  {t('about_us.visitStudio')}
                </h2>
                <div className='w-24 h-1 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] rounded-full mx-auto mb-6'></div>
                <p className='text-lg text-n-3 max-w-2xl mx-auto'>
                  {t('about_us.studioDescription')}
                </p>
              </div>

              <div className='relative group'>
                {/* Map Container with enhanced styling */}
                <div className='relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-n-6 rounded-3xl p-4 hover:shadow-2xl hover:shadow-[#F17A28]/20 transition-all duration-500'>
                  <div className='relative overflow-hidden rounded-2xl'>
                    {/* Overlay gradient */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none'></div>

                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12983.930370880267!2d6.1731097!3d35.5541321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1728480388311!5m2!1sfr!2sdz'
                      title='Pixel Creative Agency Location'
                      className='w-full h-[400px] md:h-[500px] lg:h-[600px] border-0 transition-all duration-500 group-hover:scale-[1.02] transform-gpu'
                      referrerPolicy='no-referrer-when-downgrade'
                      loading='lazy'
                    ></iframe>
                  </div>

                  {/* Location info overlay */}
                  <div className='absolute bottom-8 left-8 right-8 z-20'>
                    <div className='bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
                      <div className='flex items-center space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0'>
                          <svg
                            className='w-6 h-6 text-white'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className='text-white font-semibold text-lg'>
                            Pixel Creative Agency
                          </h3>
                          <p className='text-gray-300 text-sm'>
                            {t('about_us.creativeHeadquarters')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <Faq />
          </div>
        </Section>

        {/* Add custom animations */}
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }

          .animate-fade-in-up.delay-200 {
            animation-delay: 0.2s;
          }

          .animate-fade-in-up.delay-300 {
            animation-delay: 0.3s;
          }

          .animate-fade-in-up.delay-500 {
            animation-delay: 0.5s;
          }

          .animate-fade-in-up.delay-700 {
            animation-delay: 0.7s;
          }

          .animate-fade-in-up.delay-900 {
            animation-delay: 0.9s;
          }
        `}</style>
      </div>
    </>
  )
}

export default AboutUs
