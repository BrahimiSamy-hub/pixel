import { useLocation } from 'react-router-dom'
import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useContact } from '../context/ContactContext' // Import the custom hook
import { FaCircleCheck } from 'react-icons/fa6' // Import the success icon
import { Link } from 'react-router-dom' // Import Link for navigation
import AnimatedBackground from '../components/AnimatedBackground'
import Contact from '../components/Contact'
import SEOHead from '../components/SEOHead'

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

  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact - Pixel Creative Agency',
    description:
      'Contactez Pixel Creative Agency pour vos projets de photographie, design graphique, développement web et production audio en Algérie.',
    url: 'https://pixeldz.store/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Pixel Creative Agency',
      url: 'https://pixeldz.store',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Arabic'],
        areaServed: {
          '@type': 'Country',
          name: 'Algérie',
        },
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'DZ',
        addressRegion: 'Algérie',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 35.5541321,
        longitude: 6.1731097,
      },
    },
  }

  return (
    <>
      <SEOHead
        title='Contact'
        description='Contactez Pixel Creative Agency pour vos projets de photographie, design graphique, développement web et production audio en Algérie. Devis gratuit et consultation personnalisée.'
        keywords='contact pixel creative agency, devis photographie, design graphique algérie, développement web, production audio, consultation gratuite'
        url='https://pixeldz.store/contact'
        structuredData={contactStructuredData}
      />
      <AnimatedBackground />
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Section
          className='pt-[10rem] -mt-[5.25rem]'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container min-h-screen'>
            <h1 className='text-center h1 mb-6 uppercase'>Contact</h1>
            <Contact />
          </div>
        </Section>
      </div>

      <ButtonGradient />
    </>
  )
}

export default ContactUsServices
