import { curve, pixelH, astro } from '../assets'
import Button from './Button'
import Section from './Section'
import { BackgroundCircles, BottomLine, Gradient } from './design/Hero'
import { ScrollParallax, MouseParallax } from 'react-just-parallax'
import { useRef } from 'react'
import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa'
import CompanyLogos from './CompanyLogos'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  const parallaxRef = useRef(null)

  return (
    <Section
      className='pt-[10rem] lg:pt-[8rem] -mt-[5.25rem]'
      crosses
      crossesOffset='lg:translate-y-[5.25rem]'
      customPaddings
      id='hero'
    >
      <div className='container relative mt-10' ref={parallaxRef}>
        <div className='relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem] '>
          <h1 className='h1 mb-6 items-center flex justify-center flex-col'>
            {t('heroTitle')}&nbsp;
            <br />
            <img
              src={pixelH}
              alt=''
              className='w-64 object-contain'
              draggable='false'
            />
          </h1>
          {/* <div className='absolute -left-[400px] -rotate-90 flex gap-10 items-center -mt-20'>
            <h1 className='h6 font-bold uppercase'>Follow us</h1>
            <a
              href='https://www.instagram.com/_pixeldz'
              target='_blank'
              className='hover:scale-125 transition-transform duration-300'
            >
              <FaInstagram size={25} className='hover:text-[#f17a28]' />
            </a>

            <a
              href='https://www.facebook.com/pixel.lab.3110?mibextid=LQQJ4d'
              target='_blank'
              className='hover:scale-125 transition-transform duration-300'
            >
              <FaFacebookF size={25} className='hover:text-[#f17a28]' />
            </a>
            <a
              href='https://www.tiktok.com/@pixel.creativeagency'
              target='_blank'
              className='hover:scale-125 transition-transform duration-300 hover:text-[#f17a28]'
            >
              <FaTiktok size={25} />
            </a>
          </div> */}
          <p className='h6 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8'>
            {t('heroDescription')}
          </p>
          <div className=' flex gap-10 justify-center'>
            <Link to='/shop' draggable='false'>
              <Button white>{t('shopButton')}</Button>
            </Link>
            <a href='#services'>
              <Button white>{t('servicesButton')}</Button>
            </a>
          </div>
        </div>
        <div className='relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24'>
          <div className='relative z-1 p-0.5 rounded-2xl'>
            <div className='rounded-t-[0.9rem] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] ]:'>
              <img
                src={astro}
                className='w-full h-full object-contain float-animation'
                width={1024}
                height={490}
                alt='AI'
              />
            </div>
          </div>

          <BackgroundCircles />
        </div>

        <CompanyLogos className='relative z-10 mt-20 lg:block ' />
      </div>
      {/* <BottomLine /> */}
    </Section>
  )
}

export default Hero
