"use client"
import React, { useEffect, Suspense } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { CartProvider } from '@/context/CartContext'
import { CategoriesProvider } from '@/context/CategoriesContext'
import { PostersProvider } from '@/context/PostersContext'
import { ContactProvider } from '@/context/ContactContext'
import { OrderProvider } from '@/context/OrderContext'


import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'
import ScrollToTop from '@/utils/ScrollToTop'
import ButtonGradient from '@/assets/svg/ButtonGradient'
import Breadcrumbs from './Breadcrumbs'

export default function Providers({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
    }
  }, [])

  return (
    <CartProvider>
      <CategoriesProvider>
        <PostersProvider>
          <ContactProvider>
            <OrderProvider>
              <Suspense fallback={null}>
                <ScrollToTop />
              </Suspense>
              <Header />
              {children}
              <Footer />
              <Cart />
              <ButtonGradient />
            </OrderProvider>
          </ContactProvider>
        </PostersProvider>
      </CategoriesProvider>
    </CartProvider>
  )
}
