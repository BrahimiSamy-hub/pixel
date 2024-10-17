import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategories } from '../context/CategoriesContext'

const Categories = () => {
  const { t, i18n } = useTranslation()
  const { categories } = useCategories()

  // Determine the current language
  const currentLanguage = i18n.language // e.g., 'en' or 'fr'

  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden min-h-screen'>
        <Section
          className='pt-[8rem] -mt-[5.25rem]'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container relative'>
            <div className='mx-auto max-w-2xl px-4 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
              <h1 className='h1'>{t('categories.title')}</h1>
              <h2 className='text-right'>
                {t('categories.found', { count: categories.length })}
              </h2>

              {/* Responsive Grid */}
              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/shop/${category._id}`} // Pass category id to /shop
                    draggable='false'
                    className='group relative'
                    data-aos='flip-up'
                  >
                    <div className='overflow-hidden lg:aspect-none group-hover:opacity-75 bg-[#c9c9c9] border border-[#F17A28] rounded'>
                      {category.new && (
                        <span className='absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 animate-pulse rounded-br-full'>
                          {t('categories.newLabel')}
                        </span>
                      )}
                      <img
                        src={category.image?.url}
                        alt={
                          currentLanguage === 'fr'
                            ? category.frName
                            : category.engName
                        } // Use appropriate name
                        className='h-full w-full object-contain object-center lg:h-full lg:w-full rounded'
                        loading='lazy'
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
                            {currentLanguage === 'fr'
                              ? category.frName
                              : category.engName}{' '}
                            {/* Use appropriate name */}
                          </button>
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
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
