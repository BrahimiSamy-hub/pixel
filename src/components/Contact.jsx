import Section from './Section'
import Heading from './Heading'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useContact } from '../context/ContactContext'
import { useState, useEffect } from 'react'

const Contact = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  })
  const { submitContactForm, loading, error, success } = useContact()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // Watch form values for real-time validation feedback
  const watchedFields = watch()

  // Handle success/error state display
  useEffect(() => {
    if (success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
    if (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    }
  }, [success, error])

  const onSubmit = async (data) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }
      await submitContactForm(payload)
      if (!error) {
        reset()
      }
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  // Success notification component
  const SuccessNotification = () => (
    <div className='fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out'>
      <div className='flex items-center space-x-2'>
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        <span className='font-medium'>{t('contactSuccess')}</span>
      </div>
    </div>
  )

  // Error notification component
  const ErrorNotification = () => (
    <div className='fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out'>
      <div className='flex items-center space-x-2'>
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
            clipRule='evenodd'
          />
        </svg>
        <span className='font-medium'>{t('contactError')}</span>
      </div>
    </div>
  )

  return (
    <>
      <Section id='how-to-use'>
        {/* Notifications */}
        {showSuccess && <SuccessNotification />}
        {showError && <ErrorNotification />}

        <div className='container'>
          <Heading title={t('contactTitle')} text={t('contactText')} />
          <div className='relative'>
            <div className='relative z-1 grid gap-8 lg:grid-cols-2'>
              <div className='relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:border-white/20 group'>
                {/* Animated liquid effect overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out'></div>

                {/* Shimmer effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                {/* Liquid border effect */}
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-[#f17a28]/8 via-[#f17a28]/12 to-[#f17a28]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                {/* Floating particles effect */}
                <div className='absolute inset-0 overflow-hidden rounded-3xl'>
                  <div
                    className='absolute top-2 left-2 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    style={{ animationDelay: '0s' }}
                  ></div>
                  <div
                    className='absolute top-4 right-3 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className='absolute bottom-3 left-4 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                  <div
                    className='absolute bottom-2 right-2 w-1 h-1 bg-[#f17a28]/15 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    style={{ animationDelay: '0.6s' }}
                  ></div>
                </div>

                {/* Glow effect behind the glass */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#f17a28]/8 via-[#f17a28]/12 to-[#f17a28]/8 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'></div>

                <div className='relative z-10'>
                  <h4 className='h4 mt-10 text-center mb-8'>
                    {t('askQuestion')}
                  </h4>
                  <div className='flex flex-row'>
                    <form
                      className='w-full p-6 space-y-6'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {/* Full Name */}
                      <div className='space-y-2'>
                        <label
                          className='block text-sm font-medium text-n-1/80'
                          htmlFor='fullName'
                        >
                          {t('nameLabel')}
                          <span className='text-red-400 ml-1'>*</span>
                        </label>
                        <div className='relative'>
                          <input
                            type='text'
                            id='fullName'
                            {...register('fullName', {
                              required: t('nameRequired'),
                              minLength: {
                                value: 2,
                                message: t('nameMinLength'),
                              },
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F17A28]/50 transition-all duration-300 bg-n-7/50 text-n-1 placeholder-n-3 ${
                              errors.fullName
                                ? 'border-red-400 focus:border-red-400'
                                : watchedFields.fullName
                                ? 'border-green-400 focus:border-green-400'
                                : 'border-n-3 focus:border-[#F17A28]'
                            }`}
                            placeholder={t('enterName')}
                            aria-describedby={
                              errors.fullName ? 'fullName-error' : undefined
                            }
                          />
                          {watchedFields.fullName && !errors.fullName && (
                            <svg
                              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                        </div>
                        {errors.fullName && (
                          <p
                            className='text-red-400 text-sm flex items-center space-x-1'
                            id='fullName-error'
                          >
                            <svg
                              className='w-4 h-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span>{errors.fullName.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className='space-y-2'>
                        <label
                          className='block text-sm font-medium text-n-1/80'
                          htmlFor='email'
                        >
                          {t('emailLabel')}
                          <span className='text-red-400 ml-1'>*</span>
                        </label>
                        <div className='relative'>
                          <input
                            type='email'
                            id='email'
                            {...register('email', {
                              required: t('emailRequired'),
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: t('invalidEmail'),
                              },
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F17A28]/50 transition-all duration-300 bg-n-7/50 text-n-1 placeholder-n-3 ${
                              errors.email
                                ? 'border-red-400 focus:border-red-400'
                                : watchedFields.email && !errors.email
                                ? 'border-green-400 focus:border-green-400'
                                : 'border-n-3 focus:border-[#F17A28]'
                            }`}
                            placeholder={t('enterEmail')}
                            aria-describedby={
                              errors.email ? 'email-error' : undefined
                            }
                          />
                          {watchedFields.email && !errors.email && (
                            <svg
                              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                        </div>
                        {errors.email && (
                          <p
                            className='text-red-400 text-sm flex items-center space-x-1'
                            id='email-error'
                          >
                            <svg
                              className='w-4 h-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span>{errors.email.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className='space-y-2'>
                        <label
                          className='block text-sm font-medium text-n-1/80'
                          htmlFor='phone'
                        >
                          {t('mobileNumberLabel')}
                          <span className='text-red-400 ml-1'>*</span>
                        </label>
                        <div className='relative'>
                          <input
                            type='tel'
                            id='phone'
                            {...register('phone', {
                              required: t('mobileNumberRequired'),
                              pattern: {
                                value: /^(05|06|07)[0-9]{8}$/,
                                message: t('invalidMobileNumber'),
                              },
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F17A28]/50 transition-all duration-300 bg-n-7/50 text-n-1 placeholder-n-3 ${
                              errors.phone
                                ? 'border-red-400 focus:border-red-400'
                                : watchedFields.phone && !errors.phone
                                ? 'border-green-400 focus:border-green-400'
                                : 'border-n-3 focus:border-[#F17A28]'
                            }`}
                            placeholder={t('enterMobileNumber')}
                            aria-describedby={
                              errors.phone ? 'phone-error' : undefined
                            }
                          />
                          {watchedFields.phone && !errors.phone && (
                            <svg
                              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                        </div>
                        {errors.phone && (
                          <p
                            className='text-red-400 text-sm flex items-center space-x-1'
                            id='phone-error'
                          >
                            <svg
                              className='w-4 h-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span>{errors.phone.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div className='space-y-2'>
                        <label
                          className='block text-sm font-medium text-n-1/80'
                          htmlFor='message'
                        >
                          {t('messageLabel')}
                          <span className='text-red-400 ml-1'>*</span>
                        </label>
                        <div className='relative'>
                          <textarea
                            id='message'
                            {...register('message', {
                              required: t('messageRequired'),
                              minLength: {
                                value: 10,
                                message: t('messageMinLength'),
                              },
                              maxLength: {
                                value: 500,
                                message: t('messageMaxLength'),
                              },
                            })}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F17A28]/50 transition-all duration-300 bg-n-7/50 text-n-1 placeholder-n-3 resize-none ${
                              errors.message
                                ? 'border-red-400 focus:border-red-400'
                                : watchedFields.message && !errors.message
                                ? 'border-green-400 focus:border-green-400'
                                : 'border-n-3 focus:border-[#F17A28]'
                            }`}
                            placeholder={t('enterMessage')}
                            rows='4'
                            aria-describedby={
                              errors.message ? 'message-error' : 'message-help'
                            }
                          />
                          {watchedFields.message && !errors.message && (
                            <svg
                              className='absolute right-3 top-3 w-5 h-5 text-green-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                        </div>
                        <div className='flex justify-between items-center'>
                          {errors.message ? (
                            <p
                              className='text-red-400 text-sm flex items-center space-x-1'
                              id='message-error'
                            >
                              <svg
                                className='w-4 h-4'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                  clipRule='evenodd'
                                />
                              </svg>
                              <span>{errors.message.message}</span>
                            </p>
                          ) : (
                            <p className='text-n-3 text-sm' id='message-help'>
                              {t('messageHelp')}
                            </p>
                          )}
                          <span
                            className={`text-xs ${
                              watchedFields.message?.length > 450
                                ? 'text-red-400'
                                : 'text-n-3'
                            }`}
                          >
                            {watchedFields.message?.length || 0}/500
                          </span>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type='submit'
                        className={`w-full py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                          isValid && !isSubmitting
                            ? 'bg-gradient-to-r from-[#F17A28] to-[#F17A28]/80 text-white shadow-lg hover:shadow-xl'
                            : 'bg-n-6 text-n-3 cursor-not-allowed'
                        }`}
                        disabled={isSubmitting || !isValid}
                        aria-describedby='submit-status'
                      >
                        {isSubmitting ? (
                          <div className='flex items-center justify-center space-x-2'>
                            <svg
                              className='animate-spin h-5 w-5 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              ></circle>
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              ></path>
                            </svg>
                            <span>{t('sending')}</span>
                          </div>
                        ) : (
                          t('submitButton')
                        )}
                      </button>
                      <p id='submit-status' className='sr-only'>
                        {isSubmitting ? t('formSubmitting') : t('formReady')}
                      </p>
                    </form>
                  </div>
                </div>
              </div>

              {/* Enhanced Map Section */}
              <div className='bg-n-7 rounded-3xl overflow-hidden min-h-[35rem] relative group'>
                <div className='absolute inset-0 bg-gradient-to-t from-n-8/50 to-transparent z-10 pointer-events-none'></div>
                <div className='absolute top-4 left-4 z-20 bg-n-8/90 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-[#F17A28] rounded-full animate-pulse'></div>
                    <span className='text-n-1 text-sm font-medium'>
                      {t('ourLocation')}
                    </span>
                  </div>
                </div>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.9825938283684!2d6.170534775461951!3d35.554132072628484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1715290385507!5m2!1sfr!2sdz'
                  title='MapsLocalisation'
                  allowFullScreen=''
                  className='w-full h-full transition-transform duration-300 group-hover:scale-105'
                  referrerPolicy='no-referrer-when-downgrade'
                  loading='lazy'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Custom CSS for enhanced effects */}
      <style jsx>{`
        @keyframes liquid-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(1deg);
          }
          50% {
            transform: translateY(-4px) rotate(0deg);
          }
          75% {
            transform: translateY(-2px) rotate(-1deg);
          }
        }

        .group:hover .liquid-float {
          animation: liquid-float 3s ease-in-out infinite;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  )
}

export default Contact
