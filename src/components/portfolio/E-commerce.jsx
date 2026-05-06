import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { antic, beleghni, broker } from '../../assets'

const images = [
  { src: antic, alt: 'Antic Landing Page' },
  { src: beleghni, alt: 'Beleghni Landing Page' },
  { src: broker, alt: 'Broker Landing Page' },
  { src: beleghni, alt: 'Beleghni Landing Page' },
]

const Ecommerce = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Ecommerce
