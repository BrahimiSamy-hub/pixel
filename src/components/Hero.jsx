import { curve, pixelH, astro } from '../assets'
import Button from './Button'
import Section from './Section'
import { BackgroundCircles, BottomLine, Gradient } from './design/Hero'
import { ScrollParallax } from 'react-just-parallax'
import { useRef } from 'react'

import CompanyLogos from './CompanyLogos'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  const parallaxRef = useRef(null)

  return (
    <Section
      className='pt-[12rem] -mt-[10.25rem]'
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
              className='w-80 object-contain'
              draggable='false'
            />
          </h1>

          <p className='body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8'>
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
            <div className='aspect-[33/40]  rounded-t-[0.9rem] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] ]:'>
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
