import { useNavigate } from 'react-router-dom'
import { check } from '../assets'
import { logoPricing } from '../constants'
import Button from './Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'

const InfographiePricing = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleContactUs = () => {
    navigate('/contact', { state: { service: 'Infographie' } })
  }

  const pricingData = t('pricing.logo', { returnObjects: true })

  return (
    <div className='max-w-[1400px] mx-auto px-4 py-12'>
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 3 },
        }}
        className='pricing-swiper'
      >
        {pricingData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='relative h-full group'>
              {/* Card Container */}
              <div className='relative h-full bg-n-8/40 backdrop-blur-xl border border-n-6/30 rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#F17A28]/30 hover:shadow-2xl hover:shadow-[#F17A28]/5'>
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-n-8/50' />

                {/* Content Container */}
                <div className='relative z-10'>
                  {/* Header Section */}
                  <div className='p-8'>
                    <div className='flex items-center justify-between mb-4'>
                      <h4 className='h4 text-[#F17A28] font-semibold'>
                        {item.title}
                      </h4>
                      <div className='w-12 h-12 rounded-full bg-[#F17A28]/10 flex items-center justify-center'>
                        <div className='w-6 h-6 rounded-full bg-[#F17A28]/20' />
                      </div>
                    </div>
                    <p className='body-2 text-n-1/70 leading-relaxed'>
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing Section */}
                  <div className='px-8 py-6 bg-n-8/30 backdrop-blur-sm'>
                    {item.price !== 'Devis' && item.price !== 'On Quote' && (
                      <div className='text-sm text-n-1/50 mb-2 font-medium'>
                        {t('startingFrom')}
                      </div>
                    )}
                    <div className='flex items-baseline gap-2'>
                      <span className='h1 font-bold text-n-1'>
                        {item.price}
                      </span>
                      {item.price !== 'Devis' && item.price !== 'On Quote' && (
                        <span className='text-n-1/70 font-medium'>DA</span>
                      )}
                    </div>
                  </div>
                  <div className='px-8'>
                    <Button
                      className='w-full mb-6'
                      white='true'
                      onClick={handleContactUs}
                    >
                      {t('contactTitle')}
                    </Button>
                  </div>
                  {/* Features Section */}
                  <div className='p-8 pt-0'>
                    <ul className='space-y-4'>
                      {item.features.map((feature, index) => (
                        <li
                          key={index}
                          className='flex items-start gap-3 text-n-1/80 group/item'
                        >
                          <div className='mt-1 w-5 h-5 rounded-full bg-[#F17A28]/10 flex items-center justify-center transition-colors duration-200 group-hover/item:bg-[#F17A28]/20'>
                            <img
                              src={check}
                              width={12}
                              height={12}
                              alt='Check'
                              className='opacity-80'
                            />
                          </div>
                          <p className='body-2'>{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className='absolute top-0 right-0 w-40 h-40 bg-[#F17A28]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl' />
                <div className='absolute bottom-0 left-0 w-32 h-32 bg-[#F17A28]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl' />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default InfographiePricing
