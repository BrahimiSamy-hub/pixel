"use client"
import Section from '@/components/Section'
import ButtonGradient from '@/assets/svg/ButtonGradient'
import dynamic from 'next/dynamic'
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false })
import Contact from '@/components/Contact'
import { useTranslation } from 'react-i18next'

const ContactClient = () => {
  const { t } = useTranslation()

  return (
    <>
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

export default ContactClient
