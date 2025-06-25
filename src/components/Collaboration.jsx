import { check, p } from '../assets'
import { collabApps } from '../constants'
import { collabContent } from '../constants'
import Button from './Button'
import Section from './Section'
import { LeftCurve, RightCurve } from './design/Collaboration'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Collaboration = () => {
  const { t } = useTranslation()

  return (
    <Section crosses id='portfolio'>
      <div className='container lg:flex'>
        <div className='max-w-[25rem] flex flex-col'>
          <h2 className='h2 mb-4 md:mb-8'>{t('collaboration.title')}</h2>
          <ul className='max-w-[22rem] mb-10 md:mb-14 grid grid-cols-4 gap-1'>
            {collabContent.map((item) => (
              <li className='mb-3 py-3 col-span-2 group' key={item.id}>
                <div className='flex items-center transition-all duration-300 hover:bg-n-8/30 rounded-lg p-2 -m-2'>
                  <img
                    src={check}
                    width={24}
                    height={24}
                    alt='check'
                    loading='lazy'
                    className='transition-transform duration-300 group-hover:scale-110'
                  />
                  <h6 className='body-2 ml-5 transition-colors duration-300 group-hover:text-[#F18A27]'>
                    {item.title}
                  </h6>
                </div>
              </li>
            ))}
          </ul>
          <Link to='/portfolio' draggable='false'>
            <Button className='w-44'>{t('collaboration.button')}</Button>
          </Link>
        </div>

        <div className='lg:ml-auto xl:w-[38rem] mt-20'>
          <div className='relative left-1/2 flex w-[20rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100'>
            <div className='flex w-60 aspect-square m-auto border border-n-6 rounded-full transition-all duration-300 hover:border-[#F18A27]/50'>
              <div className='w-[8rem] aspect-square m-auto p-[0.2rem] bg-[#F18A27] rounded-full transition-all duration-300 hover:scale-105'>
                <div className='flex items-center justify-center w-full h-full bg-n-8 rounded-full'>
                  <img
                    src={p}
                    className='transition-transform duration-300 hover:rotate-6'
                    width={70}
                    height={70}
                    alt='pixel'
                    loading='lazy'
                    draggable='false'
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] -rotate-${
                      index * 45
                    } transition-all duration-300 hover:scale-110`}
                  >
                    <img
                      loading='lazy'
                      className='m-auto object-contain transition-all duration-300 hover:opacity-80'
                      width={50}
                      height={50}
                      alt={app.title}
                      src={app.icon}
                      draggable='false'
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Collaboration
