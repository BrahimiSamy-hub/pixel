import { useState, useEffect } from 'react'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Photo from './pages/PhotoPricing'
import Audio from './pages/AudioPricing'
import Weeding from './pages/WeedingPricing'
import Dev from './pages/DevPricing'
import ContactUsServices from './pages/ContactUsServices'
import Infographie from './pages/InfographiePricing'
import Neon from './pages/NeonPricing'
import Shop from './pages/Shop'
import Portfolio from './pages/Portfolio'
import Cart from './components/Cart'
import ScrollToTop from './utils/ScrollToTop'
import { CartProvider } from './context/CartContext'
import { PostersProvider } from './context/PostersContext'
import SingleProductDetails from './components/SingleProduct'
import Checkout from './pages/Checkout'
import Header from './components/Header'
import Footer from './components/Footer'
import Rules from './pages/RulesLoup'
import Loading from './components/Loading'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState(
    localStorage.getItem('i18nextLng') || 'en'
  )
  const { t } = useTranslation()

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    })
  }, [])

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('i18nextLng')
      if (newLanguage && newLanguage !== language) {
        setLanguage(newLanguage)
        i18next.changeLanguage(newLanguage)
      }
    }

    window.addEventListener('storage', handleLanguageChange)
    return () => window.removeEventListener('storage', handleLanguageChange)
  }, [language])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  return (
    <Router>
      <ScrollToTop />
      {loading ? (
        <Loading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <CartProvider>
          <PostersProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/singleProduct' element={<SingleProductDetails />} />

              <Route path='/portfolio' element={<Portfolio />} />
              <Route path='/photo' element={<Photo />} />
              <Route path='/audio' element={<Audio />} />
              <Route path='/weeding' element={<Weeding />} />
              <Route path='/dev' element={<Dev />} />
              <Route path='/infographie' element={<Infographie />} />
              <Route path='/neon' element={<Neon />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/contact' element={<ContactUsServices />} />
              <Route path='/rules' element={<Rules />} />
            </Routes>
            <Footer />
            <Cart />
          </PostersProvider>
        </CartProvider>
      )}
    </Router>
  )
}

export default App
