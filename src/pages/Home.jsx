import ButtonGradient from '../assets/svg/ButtonGradient'
import Benefits from '../components/Benefits'
import Collaboration from '../components/Collaboration'
import Hero from '../components/Hero'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Hero />
        <Benefits />
        <Collaboration />
        <Contact />
      </div>

      <ButtonGradient />
    </>
  )
}

export default Home
