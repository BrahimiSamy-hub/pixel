import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import { useTranslation } from 'react-i18next'
import Roles from '../components/Roles'

const RulesLoup = () => {
  const { t, i18n } = useTranslation()

  // const isArabic = i18n.language === 'ar'

  return (
    <>
      <div
        className={`pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden`}
        // dir={isArabic ? 'rtl' : 'ltr'}
      >
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container mb-8'>
            <div>
              <h1 className='h1 uppercase text-center text-wrap'>
                {t('titleWerWerwolf')}
              </h1>

              <p className='uppercase h5 my-8'>
                {t('descriptionWerwolf')}
                <span className='text-[#F17A28]'>
                  {t('descriptionNumberCardsWerwolf')}
                </span>
                {t('descriptionNumberRolesWerwolf')}
              </p>
              <hr />
              <div className='mt-8'>
                <h2 className='h2 uppercase mb-8'> {t('titleRulesWerwolf')}</h2>
                <p className='h6 '>{t('descriptionRulesWerwolf')}</p>
              </div>
            </div>
            <Roles />
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  )
}

export default RulesLoup
