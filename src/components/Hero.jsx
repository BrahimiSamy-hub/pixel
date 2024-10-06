import { curve, heroBackground, robot, hero1 } from '../assets'
import Button from './Button'
import Section from './Section'
import { BackgroundCircles, BottomLine, Gradient } from './design/Hero'
import { heroIcons } from '../constants'
import { ScrollParallax } from 'react-just-parallax'
import { useRef } from 'react'
import Generating from './Generating'
import Notification from './Notification'
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
          <h1 className='h1 mb-6'>
            {t('heroTitle')}&nbsp;
            <br />
            <span className='mt-2 pixel-text inline-block relative'>
              Pixel
              {/* <img
                src={curve}
                className='absolute top-full left-0 w-full xl:-mt-2'
                width={624}
                height={28}
                alt='Curve'
              /> */}
            </span>
          </h1>

          <p className='body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8'>
            {t('heroDescription')}
          </p>
          <div className=' flex gap-10 justify-center'>
            <Link to='/shop'>
              <Button white>{t('shopButton')}</Button>
            </Link>
            <a href='#services'>
              <Button white>{t('servicesButton')}</Button>
            </a>
          </div>
        </div>
        <div className='relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24'>
          <div className='relative z-1 p-0.5 rounded-2xl bg-orange-500'>
            <div className='aspect-[33/40]  rounded-t-[0.9rem] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] ]:'>
              <img
                src={hero1}
                className='w-full h-full object-cover'
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
      <BottomLine />
    </Section>
  )
}

export default Hero
