import { useState } from 'react'
import Section from '../components/Section'
import ButtonGradient from '../assets/svg/ButtonGradient'
import PortfolioEcommerce from '../components/portfolio/E-commerce'
import PortfolioGestionaire from '../components/portfolio/Gestionaire'
import PortfolioMobileApp from '../components/portfolio/MobileApp'
import PortfolioWebsite from '../components/portfolio/WebSite'
import PortfolioReel from '../components/portfolio/Reel'
import PortfolioCinématographie from '../components/portfolio/Cinématographie'
import PortfolioSpot from '../components/portfolio/Spot'
import PortfolioEtiquette from '../components/portfolio/Etiquette'
import PortfolioEmballage from '../components/portfolio/Emballage'
import PortfolioShooting from '../components/portfolio/Shooting'
import PortfolioProduct from '../components/portfolio/Product'
import PortfolioTableaux from '../components/portfolio/Tableaux'
import PortfolioWall from '../components/portfolio/Wall'
import PortfolioCertificat from '../components/portfolio/Certificat'
import PortfolioVitrine from '../components/portfolio/Vitrine'
import PortfolioFrigo from '../components/portfolio/Frigo'
import PortfolioBooks from '../components/portfolio/Books'
import PortfolioMenu from '../components/portfolio/Menu'
import PortfolioPosts from '../components/portfolio/Posts'
import PortfolioLogo from '../components/portfolio/Logo'
import PortfolioCards from '../components/portfolio/Cards'
import PortfolioSac from '../components/portfolio/Sac'
import PortfolioTshirts from '../components/portfolio/Frigo'
import PortfolioFlyer from '../components/portfolio/Flyer'
import Filter from '../components/filter/Filter'
import { useTranslation } from 'react-i18next'

const subcategoryComponents = {
  logo: PortfolioLogo,
  visitCards: PortfolioCards,
  sac: PortfolioSac,
  habillage: PortfolioTshirts,
  tshirt: PortfolioTshirts,
  flyer: PortfolioFlyer,
  books: PortfolioBooks,
  menu: PortfolioMenu,
  socialMediaPosts: PortfolioPosts,
  voixOff: PortfolioWebsite,
  reel: PortfolioReel,
  cinematographie: PortfolioCinématographie,
  spotPublicitaire: PortfolioSpot,
  etiquette: PortfolioEtiquette,
  emballage: PortfolioEmballage,
  shooting: PortfolioShooting,
  product: PortfolioProduct,
  webApp: PortfolioWebsite,
  appMobile: PortfolioMobileApp,
  gestionaire: PortfolioGestionaire,
  tableaux: PortfolioTableaux,
  wall: PortfolioWall,
  certificatInvitation: PortfolioCertificat,
  vitrine: PortfolioVitrine,
  frigo: PortfolioFrigo,
  ecommerce: PortfolioEcommerce,
  blogs: PortfolioEcommerce,
  portfolios: PortfolioEcommerce,
}

const Portfolio = () => {
  const { t } = useTranslation()
  const [selectedSubcategory, setSelectedSubcategory] = useState('logo')

  const renderComponent = () => {
    const Component = subcategoryComponents[selectedSubcategory]
    return Component ? <Component /> : <div>{t('Select a subcategory')}</div>
  }

  return (
    <>
      <div className='pt-[3.75rem] lg:pt-[3.75rem] overflow-hidden min-h-screen'>
        <Section
          className='pt-[8rem] -mt-[5.25rem]'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='p-10 border-n-6'>
            <h1 className='text-center h1'>{t('portfolioP')}</h1>
            <div className='flex'>
              {/* <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-center'>*/}
              <Filter setSelectedSubcategory={setSelectedSubcategory} />
              <div className='flex justify-center w-full '>
                {renderComponent()}
              </div>
            </div>
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  )
}

export default Portfolio
