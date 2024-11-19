import { useLocation } from 'react-router-dom'
import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useContact } from '../context/ContactContext' // Import the custom hook
import { FaCircleCheck } from 'react-icons/fa6' // Import the success icon
import { Link } from 'react-router-dom' // Import Link for navigation

const ContactUsServices = () => {
  const location = useLocation()
  const service = location.state?.service || 'Unknown Service'

  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Access the context values and submitContactForm function
  const { loading, error, success, submitContactForm } = useContact()

  const onSubmit = (data) => {
    const formData = {
      fullName: data.name, // Rename 'name' to 'fullName'
      service, // Add the service
      email: data.email, // Keep the email as it is
      phone: data.mobileNumber, // Rename 'mobileNumber' to 'phone'
      message: data.message, // Keep the message as it is
    }

    submitContactForm(formData) // Call the context function to submit the form data
    reset() // Reset the form after submission
  }

  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen pb-20'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            <h1 className='text-center h1 mb-6'>{service}</h1>
            {success ? (
              // Success message displayed after form submission
              <div className='w-full min-h-[450px] border border-n-6 p-4 rounded-xl flex flex-col justify-center items-center gap-6'>
                <FaCircleCheck color='green' size={80} />
                <h2 className='font-bold text-3xl leading-10 text-center uppercase'>
                  {t('messageCompleted')}
                </h2>
                <p className='font-normal text-lg leading-8 text-gray-500 text-center uppercase'>
                  {t('thankYou')}
                </p>
                <button className='border border-[#F17A28] p-2 rounded bg-[#F17A28] hover:opacity-75'>
                  <Link to='/shop' draggable='false'>
                    {t('sendAnotherMessage')}
                  </Link>
                </button>
              </div>
            ) : (
              // The form is displayed if success is false or loading
              <div className='relative'>
                <div className='relative z-1 grid gap-5'>
                  <div className='relative border border-n-1/10 rounded-3xl overflow-hidden'>
                    <div className='flex flex-row'>
                      <form
                        className='w-full p-4'
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className='mb-4'>
                          <label
                            className='block mb-2 text-sm font-medium'
                            htmlFor='fullName'
                          >
                            {t('nameLabel')}
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type='text'
                            id='name'
                            {...register('name', {
                              required: t('nameRequired'),
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:border-white bg-white text-black ${
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
                            {...register('email', {
                              required: t('emailRequired'),
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: t('invalidEmail'),
                              },
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:border-white bg-white text-black ${
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
                            className={`w-full px-4 py-3 border rounded-md focus:border-white bg-white text-black ${
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
                            htmlFor='message'
                          >
                            {t('messageLabel')}
                            <span className='text-red-500'>*</span>
                          </label>
                          <textarea
                            id='message'
                            {...register('message', {
                              required: t('messageRequired'),
                              minLength: {
                                value: 10,
                                message: t('messageMinLength'),
                              },
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:border-white bg-white text-black ${
                              errors.message ? 'border-red-500' : ''
                            }`}
                            placeholder={t('enterMessage')}
                            rows='4'
                          />
                          {errors.message && (
                            <p className='text-red-500 text-sm'>
                              {errors.message.message}
                            </p>
                          )}
                        </div>

                        <button
                          type='submit'
                          className='w-full py-3 bg-[#F17A28] text-white font-semibold rounded-md hover:opacity-75'
                          disabled={loading} // Disable button when loading
                        >
                          {loading ? t('loading') : t('submitButton')}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>

      <ButtonGradient />
    </>
  )
}

export default ContactUsServices
