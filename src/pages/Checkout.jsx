import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Section from '../components/Section'
import { FaCircleCheck, FaSpinner } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import wilayasData from '../constants/wilaya.json'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'
import { FaTrashAlt } from 'react-icons/fa'
import { useOrder } from '../context/OrderContext'
import AnimatedBackground from '../components/AnimatedBackground'

const Checkout = () => {
  const { t } = useTranslation()
  const { cartItems, removeFromCart, clearCart } = useCart()
  const { createOrder, isOrderLoading } = useOrder()
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const selectedMethod = watch('method')
  const selectedWilaya = watch('wilaya')

  // Find the selected wilaya and its corresponding delivery prices
  const selectedWilayaData = wilayasData.wilayas.find(
    (wilaya) => wilaya.name === selectedWilaya
  )

  const calculateTotal = (products) => {
    const subtotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    const delivery = selectedWilayaData
      ? selectedWilayaData.deliveryMethods[selectedMethod]
      : 0
    const total = subtotal + delivery
    return { subtotal, delivery, total }
  }

  const { subtotal, delivery, total } = calculateTotal(cartItems)

  const onSubmit = async (data) => {
    // Format the data to match the required structure
    const orderData = {
      shippingType: data.method.toLowerCase(), // "Desk" -> "desk", "Home" -> "home"
      shippingPrice: delivery, // Dynamic shipping price
      fullName: data.name, // Map `name` to `fullName`
      wilaya: data.wilaya,
      phone: data.mobileNumber,
      total,
      orderItems: cartItems.map((product) => ({
        name: product.selectedHero.name, // Use the product title as the name
        size: product.size,
        quantity: product.quantity,
        price: product.price,
        total: product.price * product.quantity,
      })),
    }

    try {
      // Call createOrder from OrderContext
      await createOrder(orderData)
      setIsOrderSuccessful(true)
      clearCart() // Clear the cart after successful order creation
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  return (
    <>
      <AnimatedBackground />
      <Section
        className='pt-[10rem] min-h-screen pb-20'
        crosses
        crossesOffset='lg:translate-y-[5.25rem]'
        customPaddings
      >
        <div className='container'>
          <h1 className='h1 text-center mb-10'>{t('submitOrder')}</h1>
          <div className='flex flex-col gap-10 sm:flex-row '>
            {isOrderSuccessful ? (
              <div className='w-full min-h-[450px] border p-4 rounded-xl flex flex-col justify-center items-center gap-6'>
                <FaCircleCheck color='green' size={80} />
                <h2 className='font-bold text-3xl leading-10 text-center uppercase'>
                  {t('orderCompleted')}
                </h2>
                <p className='font-normal text-lg leading-8 text-gray-500 text-center uppercase'>
                  {t('thankYou')}
                </p>
                <button className='border border-[#F17A28] p-2 rounded bg-[#F17A28] hover:opacity-75'>
                  <Link to='/shop' draggable='false'>
                    {t('goBackToShop')}
                  </Link>
                </button>
              </div>
            ) : (
              <form
                className='w-full border p-4 rounded-xl'
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className='text-3xl font-extrabold mb-4 text-center'>
                  {t('checkout')}
                </h2>

                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-medium'
                    htmlFor='name'
                  >
                    {t('nameLabel')}
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='name'
                    {...register('name', { required: t('nameRequired') })}
                    className={`w-full px-4 py-3 border rounded-md bg-white text-black focus:border-white ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder={t('enterName')}
                  />
                  {errors.name && (
                    <p className='text-red-500 text-sm'>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-medium'
                    htmlFor='email'
                  >
                    {t('emailLabel')}
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    {...register('email', { required: t('emailRequired') })}
                    className={`w-full px-4 py-3 border rounded-md bg-white text-black focus:border-white ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder={t('enterEmail')}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-medium'
                    htmlFor='mobileNumber'
                  >
                    {t('mobileNumberLabel')}
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='tel'
                    id='mobileNumber'
                    {...register('mobileNumber', {
                      required: t('mobileNumberRequired'),
                      pattern: {
                        value: /^(05|06|07)[0-9]{8}$/,
                        message: t('invalidMobileNumber'),
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-md bg-white text-black focus:border-white ${
                      errors.mobileNumber ? 'border-red-500' : ''
                    }`}
                    placeholder={t('enterMobileNumber')}
                  />
                  {errors.mobileNumber && (
                    <p className='text-red-500 text-sm'>
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>

                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-medium'
                    htmlFor='wilaya'
                  >
                    {t('wilayaLabel')}
                    <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='wilaya'
                    {...register('wilaya', { required: t('wilayaRequired') })}
                    defaultValue=''
                    className={`pl-3 py-3 w-64 border rounded-md bg-white text-gray-500 focus:border-white ${
                      errors.wilaya ? 'border-red-500' : ''
                    }`}
                  >
                    <option value='' disabled>
                      {t('selectWilaya')}
                    </option>
                    {wilayasData.wilayas.map((wilaya) => (
                      <option key={wilaya.id} value={wilaya.name}>
                        {wilaya.name}
                      </option>
                    ))}
                  </select>
                  {errors.wilaya && (
                    <p className='text-red-500 text-sm'>
                      {errors.wilaya.message}
                    </p>
                  )}
                </div>

                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-medium'
                    htmlFor='method'
                  >
                    {t('shippingMethodLabel')}
                    <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='method'
                    {...register('method', {
                      required: t('shippingMethodRequired'),
                    })}
                    defaultValue='desk'
                    className={`pl-3 py-3 w-64 border rounded-md bg-white text-gray-500 focus:border-white ${
                      errors.method ? 'border-red-500' : ''
                    }`}
                  >
                    <option value='' disabled>
                      {t('selectShippingMethod')}
                    </option>
                    <option value='desk'>{t('desk')}</option>
                    <option value='home'>{t('homeCheckout')}</option>
                  </select>
                  {errors.method && (
                    <p className='text-red-500 text-sm'>
                      {errors.method.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  className='w-full py-3 bg-[#F17A28] text-white font-semibold rounded-md hover:opacity-75'
                  disabled={isOrderLoading || cartItems.length === 0}
                >
                  {isOrderLoading ? (
                    <>
                      <FaSpinner className='animate-spin' />
                      {t('loading')}
                    </>
                  ) : (
                    t('submitOrder')
                  )}
                </button>
              </form>
            )}
            <div className='w-full h-[600px] border p-4 rounded-xl relative'>
              {' '}
              <h2 className='text-3xl font-extrabold mb-4 text-center'>
                {t('cart')}
              </h2>
              <div className='mt-8'>
                <div className='flow-root'>
                  <ul
                    role='list'
                    className='-my-6 divide-y divide-gray-200 max-h-[400px] overflow-y-auto'
                  >
                    {cartItems.map((product, index) => (
                      <li key={index} className='flex py-6'>
                        <div className='h-1/4 w-1/4 rounded-md overflow-hidden border border-gray-200'>
                          <img
                            src={product.selectedHero.cardImage.url}
                            alt='Hero img'
                            className='h-full w-full object-contain object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-xl font-bold '>
                              <h3>{product.selectedHero.name}</h3>

                              <p className='ml-4'>
                                {product.price}
                                <small>
                                  <sup>{t('currency')}</sup>
                                </small>
                              </p>
                            </div>
                            <h3>{product.size}</h3>
                            <p className='mt-1 text-sm text-gray-500'>
                              {product.color}
                            </p>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-md font-bold'>
                            <p className='text-gray-500'>
                              {t('qty')} x{product.quantity}
                            </p>

                            <div className='flex'>
                              <button
                                type='button'
                                className='font-medium text-red-500 hover:text-red-300 border p-1 rounded-md border-red-500 hover:border-red-300'
                                onClick={() =>
                                  removeFromCart(
                                    product.selectedHero._id,
                                    product.size
                                  )
                                }
                              >
                                <FaTrashAlt size={25} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className='border-t border-gray-200 px-4 py-6 sm:px-6 mt-10 self-end'>
                    <div className='flex justify-between text-2xl font-bold '>
                      <p>{t('subtotal')}</p>
                      <p>
                        {subtotal}
                        <small className='ml-1'>
                          <sup>{t('currency')}</sup>
                        </small>
                      </p>
                    </div>
                    <div className='flex justify-between text-2xl font-bold '>
                      <p>{t('delivery')}</p>
                      <p>
                        {delivery}
                        <small className='ml-1'>
                          <sup>{t('currency')}</sup>
                        </small>
                      </p>
                    </div>
                    <hr />
                    <div className='flex justify-between text-2xl font-bold '>
                      <p>{t('total')}</p>
                      <p>
                        {total}
                        <small className='ml-1'>
                          <sup>{t('currency')}</sup>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Checkout
