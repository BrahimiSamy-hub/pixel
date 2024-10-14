import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import { usePosters } from '../context/PostersContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SingleProduct = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { singleProduct, fetchSingleProduct } = usePosters()
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id)
    }
  }, [id, fetchSingleProduct])

  useEffect(() => {
    if (singleProduct) {
      // Set the selected image if mainImage exists
      if (singleProduct.mainImage && singleProduct.mainImage.url) {
        setSelectedImage(singleProduct.mainImage.url)
      }
      // Set the selected color if heroes exist
      if (singleProduct.heroes && singleProduct.heroes.length > 0) {
        setSelectedColor(singleProduct.heroes[0]?.mainImage?.url || '')
      }
      // Set the selected size if sizes exist
      if (singleProduct.sizes && singleProduct.sizes.length > 0) {
        setSelectedSize(singleProduct.sizes[0]?.name || '') // Updated to use name
      }
    }
  }, [singleProduct])

  const handleImageChange = (url) => {
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImage(url)
      setIsAnimating(false)
    }, 300)
  }

  const handleAddToCart = (event) => {
    event.preventDefault()
    // Handle add to cart functionality here
  }

  const handleInstantBuy = (event) => {
    event.preventDefault()
    // Handle instant buy functionality here
    navigate('/checkout')
  }

  // Add a loading state
  if (!singleProduct) {
    return <div className='text-center'>Loading product details...</div> // Show loading message
  }

  // Check if the required properties are available
  const mainImageUrl = singleProduct.mainImage?.url
  const heroes = singleProduct.heroes || []
  const sizes = singleProduct.sizes || []

  return (
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden min-h-screen'>
      <Section
        className='pt-[8rem] -mt-[5.25rem]'
        crosses
        crossesOffset='lg:translate-y-[5.25rem]'
        customPaddings
      >
        <div className='container flex w-full items-center overflow-hidden mb-10'>
          <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
            {/* Image Gallery */}
            <div className='sm:col-span-4 lg:col-span-5'>
              <div className='flex flex-col relative'>
                <div className='absolute top-0 right-0 bg-red-500 flex items-center rounded-tr-md p-2 rounded-bl-md'>
                  <span className='animate-pulse duration-300 transition-transform'>
                    NEW
                  </span>
                </div>
                <img
                  src={selectedImage || mainImageUrl || ''}
                  alt='Product image'
                  className={classNames(
                    'object-contain w-full rounded-lg  transition-opacity duration-300',
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  )}
                  loading='lazy'
                />
                {/* Thumbnail Images */}
                <div className='mt-4 space-x-2 flex justify-around'>
                  {mainImageUrl && (
                    <img
                      src={singleProduct.sideImage?.url}
                      alt='Main Product'
                      className='h-24 w-24 object-contain rounded-md cursor-pointer'
                      onClick={() => handleImageChange(mainImageUrl)}
                      loading='lazy'
                    />
                  )}
                  {heroes.map(
                    (hero) =>
                      hero.mainImage?.url && (
                        <img
                          key={hero._id}
                          src={hero.mainImage.url}
                          alt={hero.name}
                          className='h-24 w-24 object-contain rounded-md cursor-pointer'
                          onClick={() => handleImageChange(hero.mainImage.url)}
                          loading='lazy'
                        />
                      )
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className='sm:col-span-8 lg:col-span-7'>
              <h2 className='text-4xl flex justify-between'>
                <span className='font-bold'>{singleProduct.name}</span>
                <small
                  className={classNames(
                    'text-xl rounded p-2 h-full flex text-center',
                    singleProduct.stock
                      ? 'text-green-500 bg-green-500/15'
                      : 'text-red-500 bg-red-500/15'
                  )}
                >
                  {singleProduct.stock ? t('Available') : t('Unavailable')}
                </small>
              </h2>

              <div className='mt-2'>
                <h2 className='h2 text-[#F17A28] font-bold'>
                  {singleProduct.price}
                  <small>
                    <sup> DA</sup>
                  </small>
                </h2>
              </div>

              {/* Options */}
              <div aria-labelledby='options-heading' className='mt-10'>
                <h3 id='options-heading' className='sr-only'>
                  {t('productOptions')}
                </h3>

                <form>
                  {/* Colors */}
                  {heroes.length > 0 && (
                    <div>
                      <h4 className='h4'>Choose a hero</h4>
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className='mt-4'
                      >
                        <RadioGroup.Label className='sr-only'>
                          {t('chooseColor')}
                        </RadioGroup.Label>
                        <span className='flex items-center space-x-3'>
                          {heroes.map((hero) => (
                            <RadioGroup.Option
                              key={hero._id}
                              value={hero.mainImage?.url}
                            >
                              <img
                                src={hero.cardImage?.url}
                                alt={hero.name}
                                className='h-24 rounded-lg object-contain cursor-pointer'
                              />
                            </RadioGroup.Option>
                          ))}
                        </span>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Sizes */}
                  {sizes.length > 0 && (
                    <div className='mt-6'>
                      <h4 className='h4'>{t('size')}</h4>
                      <div className='flex items-center space-x-3'>
                        {sizes.map((size) => (
                          <button
                            type='button'
                            key={size._id} // Updated to use _id
                            className={classNames(
                              'rounded-lg py-2 px-4',
                              selectedSize === size.name // Updated to compare with size.name
                                ? 'bg-orange-600 text-white'
                                : 'bg-white'
                            )}
                            onClick={() => setSelectedSize(size.name)} // Set selected size to size.name
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className='mt-10 flex gap-x-4'>
                    <button
                      type='button'
                      className='bg-red-500 text-white py-2 px-4 rounded-lg'
                      onClick={handleInstantBuy}
                    >
                      {t('buyNow')}
                    </button>
                    <button
                      type='button'
                      className='bg-blue-500 text-white py-2 px-4 rounded-lg'
                      onClick={handleAddToCart}
                    >
                      {t('addToCart')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default SingleProduct
