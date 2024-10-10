import { useNavigate } from 'react-router-dom'
import { check } from '../assets'
import { logoPricing } from '../constants'
import Button from './Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'

const InfographiePricing = () => {
  const { t } = useTranslation() // Initialize translation
  const navigate = useNavigate()

  const handleContactUs = () => {
    navigate('/contact', { state: { service: 'Infographie' } })
  }

  // Retrieve the translated logo pricing data
  const pricingData = t('pricing.logo', { returnObjects: true })

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 3.5 },
      }}
    >
      {pricingData.map((item, index) => (
        <SwiperSlide key={index}>
          <div className='w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4'>
            <h4 className='h4 mb-4 text-[#F17A28]'>{item.title}</h4>

            <p className='body-2 min-h-[4rem] mb-3 text-n-1/50'>
              {item.description}
            </p>

            {/* Conditionally render "starting from" only if price is not 'Devis' or 'On Quote' */}
            {item.price !== 'Devis' && item.price !== 'On Quote' && (
              <small>{t('startingFrom')}</small>
            )}

            <div className='flex items-center h-[5.5rem] mb-6'>
              <div className='text-[3.5rem] leading-none font-bold'>
                {item.price}{' '}
                {/* Only show "DA" if price is not 'Devis' or 'On Quote' */}
                {item.price !== 'Devis' && item.price !== 'On Quote' && (
                  <sup className='h4 font-bold'> DA</sup>
                )}
              </div>
            </div>

            <Button
              className='w-full mb-6'
              white='true'
              onClick={handleContactUs}
            >
              {t('contactTitle')} {/* Translated "Contact us" title */}
            </Button>

            <ul>
              {item.features.map((feature, index) => (
                <li
                  key={index}
                  className='flex items-start py-5 border-t border-n-6'
                >
                  <img src={check} width={24} height={24} alt='Check' />
                  <p className='body-2 ml-4'>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default InfographiePricing
