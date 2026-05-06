import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  packaging,
  packaging1,
  packaging2,
  packaging3,
  packaging4,
  packaging5,
} from '../../assets'

const images = [
  { src: packaging, alt: 'Packaging' },
  { src: packaging1, alt: 'Packaging' },
  { src: packaging2, alt: 'Packaging' },
  { src: packaging3, alt: 'Packaging' },
  { src: packaging4, alt: 'Packaging' },
  { src: packaging5, alt: 'Packaging' },
  { src: packaging, alt: 'Packaging' },
  { src: packaging1, alt: 'Packaging' },
  { src: packaging2, alt: 'Packaging' },
  { src: packaging3, alt: 'Packaging' },
  { src: packaging4, alt: 'Packaging' },
  { src: packaging5, alt: 'Packaging' },
]

const Emballage = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Emballage
