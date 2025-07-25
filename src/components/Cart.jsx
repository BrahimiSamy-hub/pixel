import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useAnalytics } from '../hooks/useAnalytics'

const Cart = () => {
  const { t } = useTranslation()
  const { isOpen, toggleCart, cartItems, removeFromCart } = useCart()
  const { trackButtonClick, trackAddToCart } = useAnalytics()

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const isCartEmpty = () => {
    return cartItems.length === 0
  }

  const handleCheckoutClick = (e) => {
    if (isCartEmpty()) {
      e.preventDefault()
    } else {
      trackButtonClick('checkout', 'cart')
    }
  }

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog className='relative z-50' onClose={toggleCart}>
          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col bg-n-7 shadow-xl'>
                      <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                        <div className='flex items-start justify-between'>
                          <Dialog.Title className='text-lg font-medium'>
                            {t('shoppingCart')}
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                              onClick={toggleCart}
                            >
                              <span className='absolute -inset-0.5' />
                              <span className='sr-only'>{t('closePanel')}</span>
                              <XMarkIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                        </div>

                        <div className='mt-8'>
                          <div className='flow-root'>
                            <ul
                              role='list'
                              className='-my-6 divide-y divide-gray-200'
                            >
                              {cartItems.map((product, index) => (
                                <li key={index} className='flex py-6'>
                                  <div className='h-1/4 w-1/4 overflow-hidden rounded-md border border-gray-200 bg-[#c9c9c9]'>
                                    <img
                                      loading='lazy'
                                      src={product.selectedHero.cardImage.url}
                                      alt='Product Image'
                                      className='h-full w-full object-contain object-center'
                                    />
                                  </div>

                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium'>
                                        <h3>{product.selectedHero.name}</h3>

                                        <p className='ml-4'>
                                          {product.price}{' '}
                                          <small>
                                            <sup>{t('currency')}</sup>
                                          </small>
                                        </p>
                                      </div>
                                    </div>
                                    <p className='text-gray-500'>
                                      {product.size}
                                    </p>
                                    <div className='flex flex-1 items-end justify-between text-sm'>
                                      <p className='text-gray-500'>
                                        {t('qty')} {product.quantity}
                                      </p>

                                      <div className='flex'>
                                        <button
                                          type='button'
                                          className='font-medium text-red-500 hover:text-red-300 border p-1 rounded-md border-red-500 hover:border-red-300'
                                          onClick={() => {
                                            removeFromCart(
                                              product.selectedHero._id,
                                              product.size
                                            )
                                            trackButtonClick(
                                              'remove_from_cart',
                                              'cart'
                                            )
                                          }}
                                        >
                                          <FaTrashAlt size={25} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                        <div className='flex justify-between text-base font-medium'>
                          <p>{t('subtotal')}</p>
                          <p>
                            {calculateSubtotal()}{' '}
                            <small>
                              <sup>{t('currency')}</sup>
                            </small>
                          </p>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-500'>
                          {t('shippingTaxes')}
                        </p>
                        <div className='mt-6'>
                          <Link
                            draggable='false'
                            to='/checkout'
                            className={`flex items-center justify-center rounded-md border border-transparent bg-color-1 px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-75 ${
                              isCartEmpty()
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                            onClick={toggleCart}
                            disabled={handleCheckoutClick}
                          >
                            {t('checkout')}
                          </Link>
                        </div>
                        <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                          <p>
                            {t('or')}{' '}
                            <Link
                              draggable='false'
                              to='/shop'
                              className='font-medium text-color-1 hover:opacity-75'
                              onClick={() => {
                                toggleCart()
                                trackButtonClick('continue_shopping', 'cart')
                              }}
                            >
                              {t('continueShopping')}
                              <span aria-hidden='true'> &rarr;</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Cart
