import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import { companyLogos } from '../constants'
import { useTranslation } from 'react-i18next'

const CompanyLogos = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={className} data-aos='fade-up'>
      <h5 className='tagline mb-6 text-center text-n-1/50'>
        {t('companyLogosTagline')}
      </h5>
      <Swiper
        spaceBetween={10}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
        }}
        speed={4000}
        slidesPerView={4}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {companyLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className='flex items-center justify-center h-[17.5rem]'>
              <img
                src={logo}
                width={134}
                height={28}
                alt='logo'
                className='object-contain hover:scale-125 transition-transform duration-300'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CompanyLogos
