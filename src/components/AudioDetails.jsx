import { useNavigate } from 'react-router-dom'
import { check } from '../assets'
import Button from './Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'

const AudioPricing = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleContactUs = () => {
    navigate('/contact', { state: { service: 'Audio' } })
  }

  const audioPricing = t('pricing.audio', { returnObjects: true })

  // Check if audioPricing is an array
  if (!Array.isArray(audioPricing)) {
    return <div>{t('loadingError')}</div> // Handle the case where it's not an array
  }

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.15}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 3.5 },
      }}
    >
      {audioPricing.map((item, index) => (
        <SwiperSlide key={index}>
          <div className='w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4'>
            <h4 className='h4 mb-4 text-[#F17A28]'>{item.title}</h4>

            <p className='body-2 min-h-[4rem] mb-3 text-n-1/50'>
              {item.description}
            </p>

            {/* Conditionally render "starting from" only if the price is not 'Devis' */}
            {item.price.toLowerCase() !== 'devis' && (
              <small>{t('startingFrom')}</small>
            )}

            <div className='flex items-center h-[5.5rem] mb-6'>
              <div className='text-[3.5rem] leading-none font-bold'>
                {item.price} {/* Hide DA if price is 'Devis' */}
                {item.price.toLowerCase() !== 'devis' && (
                  <sup className='h4 font-bold'> DA</sup>
                )}
              </div>
            </div>

            <Button
              className='w-full mb-6'
              white='true'
              onClick={handleContactUs}
            >
              {t('contactTitle')}
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

export default AudioPricing
