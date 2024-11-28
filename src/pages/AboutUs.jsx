import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import Faq from '../components/Faq'
import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa'
import { BackgroundCircles } from '../components/design/Hero'
const AboutUs = () => {
  const { t } = useTranslation()

  const services = [
    {
      icon: <FaShippingFast size={30} />,
      label: t('about_us.services.shipping.label'),
      subtext: t('about_us.services.shipping.subtext'),
    },
    {
      icon: <FaCreditCard size={30} />,
      label: t('about_us.services.cash_on_delivery.label'),
      subtext: t('about_us.services.cash_on_delivery.subtext'),
    },
    {
      icon: <FaHeadset size={30} />,
      label: t('about_us.services.support.label'),
      subtext: t('about_us.services.support.subtext'),
    },
  ]

  return (
    <div
      className={`pt-[4.75rem] -mt-[2.65rem] lg:pt-[7.9rem] overflow-hidden `}
    >
      <Section
        className='pt-[15rem] lg:pt-[8rem] -mt-[5.25rem] min-h-screen '
        crosses
        crossesOffset='lg:translate-y-[5.25rem]'
        customPaddings
      >
        <div className='container  '>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-10 '>
            <div className='flex flex-col'>
              <div className='text-center justify-center items-center flex flex-col  '>
                <h2 className='h2 font-bold'>{t('about_us.header')}</h2>
                <div className='h-1 bg-[#F17A28] mt-2 mb-4 rounded w-1/6'></div>
              </div>
              <p className='body-1 max-w-5xl text-center mx-auto mb-6 text-n-2 lg:mb-8'>
                {t('about_us.description')}
              </p>
            </div>

            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12983.930370880267!2d6.1731097!3d35.5541321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1728480388311!5m2!1sfr!2sdz'
              title='MapsLocalisation'
              className='rounded-md h-[500px] w-full mb-10'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
          {/* <div className='flex justify-center flex-wrap h-full gap-9 my-10'>
            {services.map((service) => (
              <ServiceCard key={service.label} {...service} />
            ))}
          </div> */}
          <Faq />
        </div>
      </Section>
      {/* <BackgroundCircles /> */}
    </div>
  )
}

export default AboutUs
