// Shop.js
import Section from '../components/Section'
import { useParams, useLocation } from 'react-router-dom'
import ButtonGradient from '../assets/svg/ButtonGradient'
import { usePosters } from '../context/PostersContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

const Shop = () => {
  const { t, i18n } = useTranslation() // Include i18n here
  const { categoryId } = useParams()
  const location = useLocation()
  const { posters, handlePosterClick, fetchPosters } = usePosters()
  const navigate = useNavigate()

  // Get the selected category from the location state
  const selectedCategory = location.state?.selectedCategory

  // Determine the name to use based on the current language
  const categoryName =
    selectedCategory && i18n.language === 'fr'
      ? selectedCategory.frName
      : selectedCategory?.engName

  useEffect(() => {
    if (categoryId) {
      fetchPosters(categoryId)
    }
  }, [categoryId, fetchPosters])

  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Section
          className='pt-[8rem] -mt-[5.25rem] h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container relative'>
            <div className='mx-auto max-w-2xl sm:pb-24 lg:max-w-7xl'>
              <button
                onClick={() => navigate(-1)}
                className='h1 flex items-center mb-10'
              >
                <FaChevronLeft size={45} className='mr-4 sm:mr-10' />
                {categoryName ? categoryName : t('shopP.title')}
              </button>

              <h2 className='text-right'>
                {posters.length} {t('shopP.postersFound')}
              </h2>

              {/* Responsive Grid */}
              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {posters.map((poster, index) => (
                  <Link
                    key={index}
                    to={`/singleProduct/${poster._id}`}
                    draggable='false'
                    className='group relative'
                    data-aos='flip-up'
                  >
                    <div className='overflow-hidden lg:aspect-none group-hover:opacity-75 bg-[#c9c9c9] h-[280px] min-w-[280px] border border-[#F17A28] rounded'>
                      {poster.new && (
                        <span className='absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 animate-pulse rounded-br-full'>
                          {t('shopP.newLabel')}
                        </span>
                      )}
                      <img
                        src={poster.mainImage?.url}
                        alt=''
                        className='h-full w-full object-cover object-center lg:h-full lg:w-full rounded'
                        loading='lazy'
                      />
                    </div>
                    <div className='mt-4 flex justify-between'>
                      <div>
                        <h3 className='text-sm'>
                          <button onClick={() => handlePosterClick(poster)}>
                            <span
                              aria-hidden='true'
                              className='absolute inset-0'
                            />
                            {poster.name}
                          </button>
                        </h3>
                      </div>
                      <div className='flex flex-col'>
                        <p className='text-sm font-medium text-right'>
                          {poster.price}
                          <small>
                            <sup>DA</sup>
                          </small>
                        </p>
                        <p
                          className={`text-sm ${
                            poster.stock ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {poster.stock
                            ? t('shopP.inStock')
                            : t('shopP.outOfStock')}
                        </p>
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

export default Shop
