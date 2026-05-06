"use client"
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useTranslations, useLocale } from 'next-intl'
import Section from '@/components/Section'
import { usePosters } from '@/context/PostersContext'
import { useCart } from '@/context/CartContext'
import { Link } from '@/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import dynamic from 'next/dynamic'
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false })

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const useDebounce = (callback, delay) => {
  const debounceTimeoutRef = useRef()

  const debouncedCallback = useCallback(
    (...args) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      debounceTimeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedCallback
}

const ProductClient = ({ id }) => {
  const t = useTranslations()
  const { singleProduct, fetchSingleProduct } = usePosters()
  const { addToCart } = useCart()
  const { trackAddToCart, trackEvent } = useAnalytics()

  const [selectedImage, setSelectedImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedHeroName, setSelectedHeroName] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchSingleProduct(id).finally(() => setLoading(false))
    }
  }, [id, fetchSingleProduct])

  useEffect(() => {
    if (singleProduct && !loading) {
      const firstHero = singleProduct.heroes?.[0]
      const firstSize = singleProduct.sizes?.[0]

      if (firstHero) {
        setSelectedImage(firstHero.cardImage?.url || '')
        setSelectedColor(firstHero.cardImage?.url || '')
        setSelectedHeroName(firstHero.name || singleProduct.name)
      } else {
        setSelectedImage(singleProduct.mainImage?.url || '')
      }

      if (firstSize) {
        setSelectedSize(firstSize.name || '')
      }
    }
  }, [singleProduct, loading])

  const handleHeroChange = (hero) => {
    setSelectedColor(hero.cardImage?.url)
    setSelectedImage(hero.cardImage?.url)
    setSelectedHeroName(hero.name)
  }

  const debouncedHeroChange = useDebounce(handleHeroChange, 200)

  const handleImageChange = (url) => {
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImage(url)
      setIsAnimating(false)
    }, 300)
  }

  const handleAddToCart = (event) => {
    event.preventDefault()
    const selectedSizeDetails = singleProduct.sizes?.find(
      (size) => size.name === selectedSize
    )
    const price = selectedSizeDetails?.price || singleProduct.price

    const productDetails = {
      selectedHero: {
        _id: selectedHeroName,
        name: selectedHeroName,
        cardImage: {
          url: selectedImage,
        },
      },
      price,
      size: selectedSize,
      _id: singleProduct._id,
      name: singleProduct.name,
    }

    addToCart(productDetails)
    trackAddToCart(selectedHeroName, singleProduct.name, price)
    trackEvent(
      'ecommerce',
      'add_to_cart',
      `${singleProduct.name} - ${selectedSize}`
    )
  }

  if (loading) {
    return (
      <div className='min-h-screen text-center flex justify-center items-center'>
        Loading product details...
      </div>
    )
  }

  if (!singleProduct) {
    return (
      <div className='min-h-screen text-center flex justify-center items-center'>
        No product found.
      </div>
    )
  }

  const heroes = singleProduct.heroes || []
  const sizes = singleProduct.sizes || []

  return (
    <>
      <AnimatedBackground />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden '>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container  w-full items-center overflow-hidden mb-10'>
            <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
              <div className='sm:col-span-4 lg:col-span-5'>
                <h2 className='text-2xl justify-between mb-2 hidden max-sm:flex text-left'>
                  <span className='font-bold'>
                    {singleProduct.name} - {selectedHeroName}{' '}
                    <small className='text-[18px]'>
                      ({singleProduct.material})
                    </small>
                  </span>

                  <small
                    className={classNames(
                      'text-xl rounded p-2 h-full flex flex-row text-center',
                      singleProduct.stock
                        ? 'text-green-500 bg-green-500/15'
                        : 'text-red-500 bg-red-500/15'
                    )}
                  >
                    {singleProduct.stock ? t('available') : t('Unavailable')}
                  </small>
                </h2>
                <div className='relative'>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt='Product image'
                      className={classNames(
                        'object-contain w-full rounded-lg transition-opacity duration-300',
                        isAnimating ? 'opacity-0' : 'opacity-100'
                      )}
                    />
                  )}
                </div>
              </div>

              <div className='sm:col-span-8 lg:col-span-7 text-left'>
                <h2 className='text-2xl justify-between flex max-sm:hidden'>
                  <span className='font-bold'>
                    {singleProduct.name} - {selectedHeroName}{' '}
                    <small className='text-[18px]'>
                      ({singleProduct.material})
                    </small>
                  </span>

                  <small
                    className={classNames(
                      'text-xl rounded p-2 h-full flex flex-row text-center',
                      singleProduct.stock
                        ? 'text-green-500 bg-green-500/15'
                        : 'text-red-500 bg-red-500/15'
                    )}
                  >
                    {singleProduct.stock ? t('available') : t('Unavailable')}
                  </small>
                </h2>

                <div className=''>
                  <h2 className='h1 text-[#F17A28] font-bold'>
                    {singleProduct.price ||
                      sizes.find((size) => size.name === selectedSize)?.price ||
                      t('Price unavailable')}
                    <small>
                      <sup> DA</sup>
                    </small>
                  </h2>
                </div>

                {singleProduct.name === 'LES LOUPS GAROUS DE THIERCELIEUX' ? (
                  <div className='mt-5 flex items-center gap-2'>
                    <p className='text-lg font-semibold text-white'>
                      {t('wolfrules')}
                    </p>
                    <Link
                      href='/loup-garou-regles'
                      className='text-[#F17A28] underline block font-bold'
                    >
                      {t('click')}
                    </Link>
                  </div>
                ) : (
                  <>
                    {heroes.length > 1 && (
                      <div className='mt-5'>
                        <RadioGroup
                          value={selectedColor}
                          onChange={(value) => {
                            const hero = heroes.find(
                              (h) => h.cardImage?.url === value
                            )
                            if (hero) debouncedHeroChange(hero)
                          }}
                          className='mt-4'
                        >
                          <RadioGroup.Label className='sr-only'>
                            {t('chooseColor')}
                          </RadioGroup.Label>
                          <div className='grid grid-cols-6 items-center sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2'>
                            {heroes.map((hero) => (
                              <RadioGroup.Option
                                key={hero._id}
                                value={hero.cardImage?.url}
                                className={({ active, checked }) =>
                                  classNames(
                                    'relative rounded-lg cursor-pointer focus:outline-none ',
                                    checked ? 'ring-4 ring-[#F17A28]' : ''
                                  )
                                }
                              >
                                {({ checked }) => (
                                  <>
                                    <img
                                      src={hero.mainImage?.url}
                                      alt={hero.name}
                                      className='object-contain rounded-md'
                                      onClick={() =>
                                        handleImageChange(hero.cardImage?.url)
                                      }
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {sizes.length > 1 && (
                      <div className='mt-6'>
                        <h4 className='h4'>{t('size')}</h4>
                        <div className='flex items-center space-x-3'>
                          {sizes.map((size) => (
                            <button
                              type='button'
                              key={size._id}
                              className={classNames(
                                'rounded-lg py-2 px-4',
                                selectedSize === size.name
                                  ? 'bg-white text-black border-2 border-[#F17A28]'
                                  : size.isAvailable
                                    ? 'bg-white text-black'
                                    : 'bg-gray-300 text-gray-500'
                              )}
                              onClick={() =>
                                size.isAvailable && setSelectedSize(size.name)
                              }
                              disabled={!size.isAvailable}
                            >
                              <div> {size.name}</div>
                              <div className='text-[#f17a28]'>
                                {size.price}{' '}
                                <small className='text-sm'>
                                  <sup> DA</sup>
                                </small>{' '}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className='mt-10 '>
                  <button
                    type='button'
                    className='bg-[#f17a28] flex-1 w-full text-white py-2 px-4 rounded-lg hover:opacity-75'
                    onClick={handleAddToCart}
                  >
                    {t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

export default ProductClient
