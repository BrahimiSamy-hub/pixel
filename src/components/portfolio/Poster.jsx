import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  poster,
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster6,
  poster7,
} from '../../assets'
const images = [
  { src: poster, alt: 'Pixel Creative Agency Poster Design 1' },
  { src: poster1, alt: 'Pixel Creative Agency Poster Design 2' },
  { src: poster2, alt: 'Pixel Creative Agency Poster Design 3' },
  { src: poster3, alt: 'Pixel Creative Agency Poster Design 4' },
  { src: poster4, alt: 'Pixel Creative Agency Poster Design 5' },
  { src: poster5, alt: 'Pixel Creative Agency Poster Design 6' },
  { src: poster6, alt: 'Pixel Creative Agency Poster Design 7' },
  { src: poster7, alt: 'Pixel Creative Agency Poster Design 8' },
]

const Poster = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Poster
