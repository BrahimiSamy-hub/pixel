import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import Faq from '../components/Faq'
import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa'

export const services = [
  {
    icon: <FaShippingFast size={30} />,
    label: '2 Days Shipping',
    subtext: 'Enjoy seamless shopping with our complimentary shipping service.',
  },
  {
    icon: <FaCreditCard size={30} />,
    label: 'Cash On Delivery',
    subtext:
      'Experience worry-free transactions with our secure payment options.',
  },
  {
    icon: <FaHeadset size={30} />,
    label: '24/7 Support',
    subtext: 'Our dedicated team is here to assist you every step of the way.',
  },
]

const AboutUs = () => {
  return (
    <>
      <div className={`pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden`}>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-10'>
              <div className='flex flex-col'>
                {/* Wrap both elements inside a div with inline-block */}
                <div className=' text-center justify-center items-center flex flex-col '>
                  <h2 className='text-4xl font-bold'>Our Story</h2>
                  {/* Set width to 100%, but inside the inline-block parent it will match the text width */}
                  <div className='h-1 bg-[#F17A28] mt-2 mb-4 rounded w-full max-w-56'></div>
                </div>

                <p className='body-1 max-w-5xl text-center mx-auto mb-6 text-n-2 lg:mb-8'>
                  Bienvenue chez Pixel, votre partenaire créatif en
                  photographie. Fondée en 2018 par une équipe de passionnés,
                  notre agence se consacre à capturer des moments uniques et à
                  raconter des histoires à travers l&#39;objectif. <br /> Nous
                  croyons que chaque image doit évoquer une émotion et laisser
                  une empreinte durable. Que vous soyez une entreprise cherchant
                  à promouvoir votre marque, un couple célébrant un moment
                  spécial ou un artiste souhaitant mettre en valeur son travail,
                  nous nous engageons à comprendre vos besoins et à transformer
                  votre vision en réalité. Avec une approche personnalisée, nous
                  combinons notre expertise technique à un sens aigu de
                  l&#39;esthétique pour créer des visuels qui se démarquent.{' '}
                  <br />
                  Notre mission est de fournir des images de haute qualité qui
                  captivent votre audience et renforcent votre message.
                  Rejoignez-nous dans cette aventure, et ensemble, donnons vie à
                  vos idées.
                </p>
              </div>

              <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12983.930370880267!2d6.1731097!3d35.5541321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1728480388311!5m2!1sfr!2sdz'
                title='MapsLocalisation'
                className='rounded-md h-[500px] w-full mb-10'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
            <Faq />
            <div className=' flex justify-center flex-wrap h-full gap-9 my-10'>
              {services.map((service) => (
                <ServiceCard key={service.label} {...service} />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

export default AboutUs
