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
import { CategoriesProvider } from './context/CategoriesContext'
import SingleProduct from './components/SingleProduct'
import Checkout from './pages/Checkout'
import Categories from './pages/Categories'
import Header from './components/Header'
import Footer from './components/Footer'
import Rules from './pages/RulesLoup'
import AboutUs from './pages/AboutUs'

const App = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem('i18nextLng') || 'fr'
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

  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <CategoriesProvider>
          <PostersProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/shop/:categoryId' element={<Shop />} />
              <Route path='/singleProduct/:id' element={<SingleProduct />} />
              <Route path='/portfolio' element={<Portfolio />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/photoLab' element={<Photo />} />
              <Route path='/sounds' element={<Audio />} />
              <Route path='/wedding' element={<Weeding />} />
              <Route path='/development' element={<Dev />} />
              <Route path='/creative' element={<Infographie />} />
              <Route path='/advertisement' element={<Neon />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/contact' element={<ContactUsServices />} />
              <Route path='/rules' element={<Rules />} />
            </Routes>
            <Footer />
            <Cart />
          </PostersProvider>
        </CategoriesProvider>
      </CartProvider>
    </Router>
  )
}

export default App
