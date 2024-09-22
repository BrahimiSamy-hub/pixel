import { check, neonService } from '../assets'
import { pubPricing } from '../constants'
import Button from './Button'
import { Swiper, SwiperSlide } from 'swiper/react'

const formatPrice = (price) => {
  if (price.toLowerCase() === 'devis') {
    return 'Devis'
  }

  if (price.includes('/ m²')) {
    const parts = price.split('/ m²')
    return (
      <>
        {parts[0]}{' '}
        <small>
          <sup>DA / m²</sup>
        </small>
      </>
    )
  }

  return (
    <>
      {price}{' '}
      <small>
        <sup>DA</sup>
      </small>
    </>
  )
}

const NeonPricing = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 3.5 },
      }}
    >
      {pubPricing.map((item) => {
        const formattedPrice = formatPrice(item.price)

        return (
          <SwiperSlide key={item.id}>
            <div className='w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4'>
              <h4 className='h4 mb-4 text-[#F17A28]'>{item.title}</h4>

              <p className='body-2 min-h-[4rem] mb-3 text-n-1/50'>
                {item.description}
              </p>
              <small>starting from</small>
              <div className='flex items-center h-[5.5rem] mb-6'>
                <div className='text-[3.5rem] leading-none font-bold'>
                  {formattedPrice}
                </div>
              </div>

              <Button className='w-full mb-6' white='true'>
                Contact us
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

export default NeonPricing
