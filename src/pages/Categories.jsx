import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategories } from '../context/CategoriesContext'
import AnimatedBackground from '../components/AnimatedBackground'

const Categories = () => {
  const { t, i18n } = useTranslation()
  const { categories } = useCategories()
  const currentLanguage = i18n.language

  return (
    <>
      <AnimatedBackground />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden min-h-screen'>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container relative'>
            <div className='mx-auto max-w-2xl px-4 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
              <h1 className='h1 mb-10'>{t('categories.title')}</h1>
              <h2 className='text-right'>
                {t('categories.found', { count: categories.length })}
              </h2>

              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {categories.map((category, index) => {
                  const isNeons = category.engName === 'Neons' // Check if it's the "Neons" category
                  return (
                    <div
                      key={index}
                      className={`group relative ${
                        isNeons ? 'cursor-not-allowed opacity-50' : ''
                      }`} // Disable and change appearance for Neons
                      data-aos='flip-up'
                    >
                      <div className='overflow-hidden lg:aspect-none group-hover:opacity-75 bg-[#c9c9c9] rounded'>
                        <img
                          src={category.image.url}
                          alt={
                            currentLanguage === 'fr'
                              ? category.frName
                              : category.engName
                          }
                          className='h-full w-full object-contain object-center lg:h-full lg:w-full rounded'
                        />
                      </div>
                      <div className='mt-4 flex justify-center'>
                        <div>
                          <h3 className='text-xl font-bold'>
                            <button>
                              <span
                                aria-hidden='true'
                                className='absolute inset-0'
                              />
                              {isNeons ? (
                                <span className=''>{t('COMING SOON')}</span>
                              ) : currentLanguage === 'fr' ? (
                                category.frName
                              ) : (
                                category.engName
                              )}
                            </button>
                          </h3>
                        </div>
                      </div>
                      {/* Disable the link for "Neons" category */}
                      {!isNeons && (
                        <Link
                          to={`/shop/${category._id}`}
                          state={{ selectedCategory: category }}
                          draggable='false'
                          className='absolute inset-0'
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <ButtonGradient />
    </>
  )
}

export default Categories
