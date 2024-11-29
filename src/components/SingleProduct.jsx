import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { usePosters } from '../context/PostersContext'
import { useCart } from '../context/CartContext' // Import the useCart hook
import { Link } from 'react-router-dom'

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

const SingleProduct = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { singleProduct, fetchSingleProduct } = usePosters()
  const { addToCart } = useCart()

  const [selectedImage, setSelectedImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedHeroName, setSelectedHeroName] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [loading, setLoading] = useState(false) // Loading state

  useEffect(() => {
    if (id) {
      // Reset states immediately when product ID changes

      // Fetch the new product and stop loading after completion
      fetchSingleProduct(id).finally(() => setLoading(false))
      setSelectedImage('')
      setSelectedColor('')
      setSelectedHeroName('')
      setSelectedSize('')
      setIsAnimating(false)
      setIsFirstLoad(true)
      setLoading(true) // Set loading to true
    }
  }, [id])

  useEffect(() => {
    if (singleProduct && isFirstLoad) {
      const firstHero = singleProduct.heroes?.[0]
      const firstSize = singleProduct.sizes?.[0]

      if (firstHero) {
        console.log('Default Hero:', firstHero.name)
        setSelectedImage(firstHero.cardImage?.url || '')
        setSelectedColor(firstHero.cardImage?.url || '')
        setSelectedHeroName(firstHero.name || singleProduct.name)
      }
      if (firstSize) {
        console.log('Default Size:', firstSize.name)
        setSelectedSize(firstSize.name || '')
      }

      setIsFirstLoad(false)
    }
  }, [singleProduct, isFirstLoad])
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
    }

    addToCart(productDetails)
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
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden '>
      <Section
        className='pt-[8rem] -mt-[5.25rem] min-h-screen'
        crosses
        crossesOffset='lg:translate-y-[5.25rem]'
        customPaddings
      >
        <div className='container flex w-full items-center overflow-hidden mb-10'>
          <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
            {/* Image Gallery */}
            <div className='sm:col-span-4 lg:col-span-5'>
              <div className='flex flex-col relative'>
                <img
                  src={selectedImage}
                  alt='Product image'
                  className={classNames(
                    'object-contain w-full rounded-lg transition-opacity duration-300',
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  )}
                />
                {/* Thumbnail Images */}
                {/* <div className='mt-4 space-x-2 flex justify-around'>
                  <img
                    src={selectedImage}
                    alt='Main Product'
                    className='h-24 w-24 object-contain rounded-md cursor-pointer'
                    onClick={() => handleImageChange(selectedImage)}
                  
                  />
                </div> */}
              </div>
            </div>

            {/* Product Details */}
            <div className='sm:col-span-8 lg:col-span-7'>
              <h2 className='text-4xl flex justify-between'>
                <span className='font-bold'>
                  {singleProduct.name} - {selectedHeroName}
                </span>

                <small
                  className={classNames(
                    'text-xl rounded p-2 h-full flex text-center',
                    singleProduct.stock
                      ? 'text-green-500 bg-green-500/15'
                      : 'text-red-500 bg-red-500/15'
                  )}
                >
                  {singleProduct.stock ? t('available') : t('Unavailable')}
                </small>
              </h2>

              <div className='mt-2'>
                <h2 className='h2 text-[#F17A28] font-bold'>
                  {singleProduct.price ||
                    sizes.find((size) => size.name === selectedSize)?.price ||
                    t('Price unavailable')}
                  <small>
                    <sup> DA</sup>
                  </small>
                </h2>
                <span className='text-4xl mt-5'>
                  Material: {singleProduct.material}
                </span>
              </div>

              {singleProduct.name === 'Werewolfs' ? (
                // Show specific text and link for the "Werewolfs" product
                <div className='mt-5 flex items-center gap-2'>
                  <p className='text-lg font-semibold text-white'>
                    {t('wolfrules')}
                  </p>
                  <Link
                    to='/rules'
                    className='text-[#F17A28] underline block font-bold'
                  >
                    {t('click')}
                  </Link>
                </div>
              ) : (
                <>
                  {/* Conditional rendering for "Choose an image" */}
                  {heroes.length > 1 && (
                    <div className='mt-5'>
                      {/* <h4 className='h4'>Choose an image</h4> */}
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
                        <div className='grid grid-cols-4 items-center sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2'>
                          {heroes.map((hero) => (
                            <RadioGroup.Option
                              key={hero._id}
                              value={hero.cardImage?.url}
                              className={({ active, checked }) =>
                                classNames(
                                  'relative rounded-lg cursor-pointer focus:outline-none ',
                                  checked ? 'ring-2 ring-[#F17A28]' : ''
                                )
                              }
                            >
                              {({ checked }) => (
                                <>
                                  <img
                                    src={hero.mainImage?.url}
                                    alt={hero.name}
                                    className='object-contain rounded-md '
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

                  {/* Conditional rendering for "Sizes" */}
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
                                : size.available
                                ? 'bg-white'
                                : 'bg-gray-300 text-gray-500'
                            )}
                            onClick={() =>
                              size.isAvailable && setSelectedSize(size.name)
                            }
                            disabled={!size.isAvailable} // Disable button if size is not available
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Actions */}
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
  )
}

export default SingleProduct
