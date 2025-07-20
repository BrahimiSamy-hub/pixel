import { Link } from 'react-router-dom'
import {
  FaCamera,
  FaCode,
  FaMusic,
  FaLightbulb,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { GiDiamondRing } from 'react-icons/gi'
import { CiPen } from 'react-icons/ci'
import Heading from './Heading'
import Section from './Section'
import Arrow from '../assets/svg/Arrow'
import { GradientLight } from './design/Benefits'
import { benefits } from '../constants'
import { useTranslation } from 'react-i18next'

const iconComponents = {
  FaCamera: <FaCamera />,
  CiPen: <CiPen />,
  GiDiamondRing: <GiDiamondRing />,
  FaCode: <FaCode />,
  FaMusic: <FaMusic />,
  FaLightbulb: <FaLightbulb />,
}

// Portfolio category mapping for each service
const portfolioCategories = {
  '/photoLab': 'PhotoShoot',
  '/creative': 'logo',
  '/wedding': 'photo',
  '/development': 'Websites',
  '/sounds': 'reels',
  '/advertisement': 'wall',
}

const Benefits = () => {
  const { t } = useTranslation()

  return (
    <Section id='services'>
      <div className='container relative z-2 mt-8'>
        <Heading
          className='md:max-w-md lg:max-w-2xl'
          title={t('our_services')}
          tag={t('expertise')}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 px-4'>
          {benefits.map((item) => (
            <div key={item.id} className='group relative'>
              <Link to={item.url} draggable='false' className='block'>
                <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-[#F17A28]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#F17A28]/20'>
                  {/* Background Image with Enhanced Overlay */}
                  <div className='absolute inset-0'>
                    {item.imageUrl && (
                      <img
                        loading='lazy'
                        src={item.imageUrl}
                        draggable='false'
                        alt={t(item.title)}
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                      />
                    )}
                    <div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/70 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 flex flex-col h-80 p-8'>
                    {/* Icon Section */}
                    <div className='flex items-center justify-between mb-6'>
                      <div className='relative'>
                        <div className='w-16 h-16 bg-gradient-to-br from-[#F17A28] to-[#e5691f] rounded-xl flex items-center justify-center text-white text-2xl shadow-lg transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110'>
                          {iconComponents[item.icon]}
                        </div>
                        <div className='absolute -inset-2 bg-[#F17A28]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                      </div>
                      <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0'>
                        <Arrow />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className='flex-1 space-y-4'>
                      <h5 className='text-xl font-bold text-white group-hover:text-[#F17A28] transition-colors duration-300 leading-tight'>
                        {t(item.title)}
                      </h5>

                      <p className='text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300'>
                        {t(item.text)}
                      </p>
                    </div>

                    {/* CTA Section */}
                    <div className='pt-6 border-t border-white/10 group-hover:border-[#F17A28]/30 transition-colors duration-300'>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-[#F17A28] transition-colors duration-300'>
                          {t('details')}
                        </span>
                        <div className='w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#F17A28] transition-all duration-300'>
                          <svg
                            className='w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className='absolute top-4 right-4 w-2 h-2 bg-[#F17A28] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200'></div>
                    <div className='absolute bottom-8 left-4 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300'></div>
                  </div>

                  {/* Enhanced Gradient Light */}
                  {item.light && (
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                      <GradientLight />
                    </div>
                  )}

                  {/* Shimmer Effect */}
                  <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent'></div>
                </div>
              </Link>

              {/* Portfolio Link Overlay */}
              {portfolioCategories[item.url] && (
                <Link
                  to={`/portfolio?category=${portfolioCategories[item.url]}`}
                  className='absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'
                >
                  <div className='bg-gradient-to-r from-[#F17A28] to-[#e5691f] hover:from-[#e5691f] hover:to-[#d15a1f] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300'>
                    <FaExternalLinkAlt className='w-3 h-3' />
                    Portfolio
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Benefits
