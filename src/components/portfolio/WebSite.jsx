import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { antic, beleghni, broker, pixel, comfortSpace } from '../../assets'

const images = [
  { src: antic, alt: 'Pixel Creative Agency - Antic Landing Page Design' },
  { src: beleghni, alt: 'Pixel Creative Agency - Beleghni Dashboard Design' },
  { src: broker, alt: 'Pixel Creative Agency - Broker Landing Page Design' },
  { src: pixel, alt: 'Pixel Creative Agency - Agency Website Design' },
  { src: comfortSpace, alt: 'Pixel Creative Agency - ComfortSpace Ecommerce Design' },
]

const Website = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Website
