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
        spaceBetween={20}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
        }}
        speed={3000}
        slidesPerView={4}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {companyLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className='flex items-center justify-center h-[20.5rem] p-4'>
              <div className='relative group'>
                {/* Liquid glass container */}
                <div className='relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-500 scale-105 shadow-xl border-white/20'>
                  {/* Animated liquid effect overlay */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-liquid-sweep'></div>

                  {/* Shimmer effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-pulse opacity-100 transition-opacity duration-300'></div>

                  {/* Logo container with glass effect */}
                  <div className='relative z-10 p-6 flex items-center justify-center'>
                    <img
                      src={logo}
                      width={140}
                      alt='logo'
                      className='object-contain filter drop-shadow-sm transition-all duration-500 scale-110 drop-shadow-md brightness-105'
                    />
                  </div>

                  {/* Liquid border effect */}
                  <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-[#f17a28]/8 via-[#f17a28]/12 to-[#f17a28]/8 opacity-100 transition-opacity duration-500'></div>

                  {/* Floating particles effect */}
                  <div className='absolute inset-0 overflow-hidden rounded-3xl'>
                    <div
                      className='absolute top-2 left-2 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-100 transition-opacity duration-500'
                      style={{ animationDelay: '0s' }}
                    ></div>
                    <div
                      className='absolute top-4 right-3 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-100 transition-opacity duration-500'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className='absolute bottom-3 left-4 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-100 transition-opacity duration-500'
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                    <div
                      className='absolute bottom-2 right-2 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-100 transition-opacity duration-500'
                      style={{ animationDelay: '0.6s' }}
                    ></div>
                  </div>
                </div>

                {/* Glow effect behind the glass */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#f17a28]/8 via-[#f17a28]/12 to-[#f17a28]/8 rounded-3xl blur-2xl opacity-100 transition-opacity duration-500 -z-10'></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for enhanced effects */}
      <style jsx>{`
        @keyframes liquid-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(1deg);
          }
          50% {
            transform: translateY(-4px) rotate(0deg);
          }
          75% {
            transform: translateY(-2px) rotate(-1deg);
          }
        }

        @keyframes liquid-sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-liquid-sweep {
          animation: liquid-sweep 3s ease-in-out infinite;
        }

        .group:hover .liquid-float {
          animation: liquid-float 3s ease-in-out infinite;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}

export default CompanyLogos
