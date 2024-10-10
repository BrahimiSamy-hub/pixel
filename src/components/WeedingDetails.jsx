import { useNavigate } from 'react-router-dom'
import { check } from '../assets'
import Button from './Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'

const WeedingPricing = () => {
  const { t } = useTranslation() // Initialize translation
  const navigate = useNavigate()

  const handleContactUs = () => {
    navigate('/contact', { state: { service: 'Wedding' } })
  }

  const weedingPricing = t('pricing.wedding', { returnObjects: true }) // Ensure this fetches an array

  // Check if weedingPricing is an array
  if (!Array.isArray(weedingPricing)) {
    return <div>{t('loadingError')}</div> // Handle the case where it's not an array
  }

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 3.5 },
      }}
    >
      {weedingPricing.map((item, index) => {
        const price =
          item.price === 'Devis' || item.price === 'On Quote' ? (
            item.price
          ) : (
            <>
              {item.price} <sup className='h4 font-bold'>DA</sup>
            </>
          )

        return (
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
                  {price}
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
        )
      })}
    </Swiper>
  )
}

export default WeedingPricing
