"use client"
import Section from '@/components/Section'
import ButtonGradient from '@/assets/svg/ButtonGradient'
import { usePosters } from '@/context/PostersContext'
import { useCategories } from '@/context/CategoriesContext'
import { Link } from '@/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useMemo } from 'react'
import { useRouter  } from '@/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false })
import { useAnalytics } from '@/hooks/useAnalytics'

const ShopClient = ({ categoryId }) => {
  const t = useTranslations();
  const locale = useLocale()
  const router = useRouter()
  const { posters, handlePosterClick, fetchPosters } = usePosters()
  const { categories } = useCategories()
  const { trackEvent, trackButtonClick } = useAnalytics()

  // Find the selected category from the context
  const selectedCategory = categories.find((cat) => cat._id === categoryId)

  // Determine the name to use based on the current language
  const categoryName =
    selectedCategory && locale === 'fr'
      ? selectedCategory.frName
      : selectedCategory?.engName

  useEffect(() => {
    if (categoryId) {
      fetchPosters(categoryId)
      trackEvent('shop', 'category_view', categoryId)
    }
  }, [categoryId, fetchPosters, trackEvent])

  // Generate structured data for category page
  const categoryStructuredData = useMemo(() => {
    if (!selectedCategory) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: categoryName || t('shopP.title'),
      description: `Découvrez tous nos produits dans la catégorie ${categoryName}. ${posters.length} produits disponibles.`,
      url: `https://pixeldz.store/boutique/${categoryId}`,
      image: selectedCategory.image?.url
        ? `https://pixeldz.store${selectedCategory.image.url}`
        : undefined,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: posters.length,
        itemListElement: posters
          .filter((poster) => poster.name !== 'AlgeriaPoly')
          .map((poster, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: poster.name,
              url: `https://pixeldz.store/product/${poster._id}`,
              image: poster.mainImage?.url
                ? `https://pixeldz.store${poster.mainImage.url}`
                : undefined,
            },
          })),
      },
    }
  }, [selectedCategory, categoryName, categoryId, posters, t])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      <AnimatedBackground />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container relative'>
            <div className='mx-auto max-w-2xl sm:pb-24 lg:max-w-7xl'>
              <button
                onClick={() => {
                  router.back()
                  trackButtonClick('back_button', 'shop')
                }}
                className='h1 flex items-center mb-10 text-left'
              >
                <FaChevronLeft size={45} className='mr-4 sm:mr-10' />
                {categoryName ? categoryName : t('shopP.title')}
              </button>

              <h2 className='text-right'>
                {posters.length} {t('shopP.postersFound')}
              </h2>

              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {posters.map((poster, index) => {
                  const isDisabled = poster.name === 'AlgeriaPoly'
                  return isDisabled ? (
                    <div
                      key={index}
                      className='group relative cursor-not-allowed'
                      data-aos='flip-up'
                    >
                      <div className='overflow-hidden lg:aspect-none bg-[#c9c9c9] rounded'>
                        <img
                          src={poster.mainImage?.url}
                          alt=''
                          className='h-full w-full object-center lg:h-full lg:w-full rounded'
                        />
                      </div>
                      <div className='mt-4 flex justify-center'>
                        <div>
                          <h3 className='text-md font-bold'>COMING SOON</h3>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={index}
                      href={`/product/${poster._id}`}
                      draggable='false'
                      className='group relative'
                      data-aos='flip-up'
                    >
                      <div className='overflow-hidden lg:aspect-none group-hover:opacity-75 bg-[#c9c9c9] rounded'>
                        {poster.new && (
                          <span className='absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 animate-pulse rounded-br-full'>
                            {t('shopP.newLabel')}
                          </span>
                        )}
                        <img
                          src={poster.mainImage?.url}
                          alt=''
                          className='h-full w-full object-center lg:h-full lg:w-full rounded'
                        />
                      </div>
                      <div className='mt-4 flex justify-center'>
                        <div>
                          <h3 className='text-md font-bold text-center'>
                            <button
                              onClick={(e) => {
                                handlePosterClick(poster)
                                trackEvent('shop', 'product_view', poster.name)
                              }}
                            >
                              <span
                                aria-hidden='true'
                                className='absolute inset-0'
                              />
                              {poster.name}
                            </button>
                          </h3>
                        </div>
                      </div>
                    </Link>
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

export default ShopClient
