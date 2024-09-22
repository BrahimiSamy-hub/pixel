import React, { Fragment, useState, useEffect } from 'react'
import { DialogPanel, Dialog, Transition, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SingleProduct = ({ open, setOpen, product }) => {
  const { addToCart } = useCart()
  const [mainImage, setMainImage] = useState(product.mainImage?.url)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedHero, setSelectedHero] = useState(product.heroes[0])
  const [images, setImages] = useState([]) // State to handle multiple images

  useEffect(() => {
    if (product) {
      const initialHero = product.heroes[0]
      setMainImage(initialHero?.mainImage?.url)
      setSelectedSize(product.sizes[0])
      setSelectedHero(initialHero)
      setImages([initialHero?.mainImage?.url, product.sideImage?.url]) // Initialize images array
    }
  }, [product])

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, selectedHero })
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment} className='font'>
      <Dialog className='relative z-50 rounded' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 hidden transition-opacity md:block ' />
        </Transition.Child>
        <div className='fixed inset-0 z-50 w-screen overflow-y-auto '>
          <div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <DialogPanel className='flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl'>
                <div className='relative flex w-full items-center overflow-hidden bg-n-7 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded'>
                  <button
                    type='button'
                    className='absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                  <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
                    <div className='aspect-h-3 aspect-w-2 overflow-hidden sm:col-span-4 lg:col-span-5'>
                      <div>
                        <h2 className='h2 text-nowrap mt-2'>
                          {selectedHero.name}
                        </h2>
                      </div>
                      <div className='flex flex-col mt-20 h-full '>
                        <div>
                          <img
                            src={mainImage}
                            alt=''
                            className='object-fill w-full bg-[#c9c9c9] rounded'
                            loading='lazy'
                          />
                          <div className='flex flex-row justify-center gap-10 mt-2'>
                            {images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt=''
                                className={classNames(
                                  'object-cover w-24 border-[3px] bg-[#c9c9c9] hover:cursor-pointer',
                                  image === mainImage
                                    ? 'border-[#F17A28]'
                                    : 'border-transparent'
                                )}
                                loading='lazy'
                                onClick={() => setMainImage(image)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='sm:col-span-8 lg:col-span-7'>
                      <div className='mt-10'>
                        <div className='flex items-center justify-between'>
                          <h4 className='h4'>Choose a hero</h4>
                        </div>
                        <div className='flex flex-col'>
                          <RadioGroup
                            value={selectedHero}
                            onChange={(hero) => {
                              setSelectedHero(hero)
                              setMainImage(hero.mainImage.url)
                              setImages([
                                hero.mainImage.url,
                                product.sideImage?.url,
                              ])
                            }}
                            className='mt-4'
                          >
                            <div className='grid grid-cols-5 gap-4 lg:grid-cols-6'>
                              {product.heroes.map((hero, index) => (
                                <img
                                  key={index}
                                  src={hero.cardImage.url}
                                  alt=''
                                  loading='lazy'
                                  className={classNames(
                                    'rounded border-[3px] hover:cursor-pointer h-20 w-16 bg-[#c9c9c9]',
                                    selectedHero === hero
                                      ? 'border-[#F17A28]'
                                      : ''
                                  )}
                                  onClick={() => {
                                    setMainImage(hero.mainImage.url)
                                    setSelectedHero(hero)
                                    setImages([
                                      hero.mainImage.url,
                                      product.sideImage?.url,
                                    ])
                                  }}
                                />
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <div className='mt-10'>
                        <div className='flex items-center justify-between'>
                          <h4 className='h4'>Size</h4>
                        </div>
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className='mt-4'
                        >
                          <RadioGroup.Label className='sr-only'>
                            Choose a size
                          </RadioGroup.Label>
                          <div className='grid grid-cols-4 gap-4'>
                            {product.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.id}
                                value={size}
                                disabled={!size.isAvailable}
                                className={({ active }) =>
                                  classNames(
                                    size.isAvailable
                                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                    active ? 'ring-2 ring-[#f17a28]' : '',
                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label
                                      as='span'
                                      className='font-bold text-xl'
                                    >
                                      {size.name}
                                    </RadioGroup.Label>
                                    {size.isAvailable ? (
                                      <span
                                        className={classNames(
                                          active ? 'border' : 'border-2',
                                          checked
                                            ? 'border-[#f17a28]'
                                            : 'border-transparent',
                                          'pointer-events-none absolute -inset-px rounded-md'
                                        )}
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <span
                                        aria-hidden='true'
                                        className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                                      >
                                        <svg
                                          className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                          viewBox='0 0 100 100'
                                          preserveAspectRatio='none'
                                          stroke='currentColor'
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect='non-scaling-stroke'
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                        <h2 className='h2 text-[#F17A28] mt-4'>
                          {product.price}
                          <small>
                            <sup>DA</sup>
                          </small>
                        </h2>
                      </div>

                      <button
                        type='submit'
                        className={classNames(
                          'mt-6 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white',
                          product.stock
                            ? 'bg-[#f17A28] hover:opacity-75 cursor-pointer'
                            : 'bg-gray-500 cursor-not-allowed'
                        )}
                        disabled={!product.stock}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SingleProduct
