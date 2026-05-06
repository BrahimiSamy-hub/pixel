"use client"
import React, { useEffect, Suspense } from 'react'
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
