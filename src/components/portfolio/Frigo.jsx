import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { frigo, frigo1, frigo2, frigo3, frigo4 } from '../../assets'
const images = [
  { src: frigo, alt: 'Frigo' },
  { src: frigo1, alt: 'Frigo' },
  { src: frigo2, alt: 'Frigo' },
  { src: frigo3, alt: 'Frigo' },
  { src: frigo4, alt: 'Frigo' },
  { src: frigo, alt: 'Frigo' },
  { src: frigo1, alt: 'Frigo' },
  { src: frigo2, alt: 'Frigo' },
  { src: frigo3, alt: 'Frigo' },
  { src: frigo4, alt: 'Frigo' },
  { src: frigo, alt: 'Frigo' },
  { src: frigo1, alt: 'Frigo' },
]

const Frigo = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Frigo
