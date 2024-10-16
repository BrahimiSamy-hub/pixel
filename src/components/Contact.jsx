import Section from './Section'
import Heading from './Heading'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    reset()
  }

  return (
    <Section id='how-to-use'>
      <div className='container' data-aos='fade-up'>
        <Heading title={t('contactTitle')} text={t('contactText')} />
        <div className='relative'>
          <div className='relative z-1 grid gap-5 lg:grid-cols-2'>
            <div className='relative  border border-n-1/10 rounded-3xl overflow-hidden'>
              <h4 className='h4 mt-10 text-center'>{t('askQuestion')}</h4>
              <div className='flex flex-row'>
                <form className='w-full p-4 ' onSubmit={handleSubmit(onSubmit)}>
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
                  >
                    {t('submitButton')}
                  </button>
                </form>
              </div>
            </div>

            <div className=' bg-n-7 rounded-3xl overflow-hidden min-h-[35rem]'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.9825938283684!2d6.170534775461951!3d35.554132072628484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1715290385507!5m2!1sfr!2sdz'
                title='MapsLocalisation'
                allowFullScreen=''
                loading='lazy'
                className='w-full h-full'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
