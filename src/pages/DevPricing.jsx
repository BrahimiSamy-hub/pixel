import ButtonGradient from '../assets/svg/ButtonGradient'
import Section from '../components/Section'
import PricingList from '../components/DevDetails'
import Footer from '../components/Footer'
import Header from '../components/Header'
const DevPricing = () => {
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Section
          className='pt-[10rem] -mt-[5.25rem]'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            <h1 className='text-center h1 mb-6'>Development</h1>
            <PricingList />
          </div>
        </Section>
      </div>

      <ButtonGradient />
    </>
  )
}

export default DevPricing
