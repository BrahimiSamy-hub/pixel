"use client"
import Image from 'next/image'
import { companyLogos } from '../constants'
import { useTranslations } from 'next-intl'

const LogoCard = ({ logo, index }) => (
  <div className='flex items-center justify-center px-3'>
    <div
      className='relative flex items-center justify-center w-[150px] h-[150px] rounded-2xl'
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <div className='relative w-[100px] h-[100px]'>
        <Image
          src={logo?.src || logo}
          fill
          sizes='100px'
          alt={logo?.name || `Partner logo ${index + 1}`}
          className='object-contain'
        />
      </div>
    </div>
  </div>
)

const CompanyLogos = ({ className }) => {
  const t = useTranslations()

  return (
    <div className={className} data-aos='fade-up'>
      <h5 suppressHydrationWarning className='tagline mb-6 text-center text-n-1/50'>
        {t('companyLogosTagline')}
      </h5>

      <div className='overflow-hidden'>
        <div className='flex marquee'>
          {[...companyLogos, ...companyLogos].map((logo, index) => (
            <LogoCard key={index} logo={logo} index={index % companyLogos.length} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 50s linear infinite;
          width: max-content;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default CompanyLogos
