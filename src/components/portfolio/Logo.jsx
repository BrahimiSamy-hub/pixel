import React from 'react'
import PortfolioGallery from './PortfolioGallery'
import {
  logo,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
} from '../../assets'

const images = [
  { src: logo, alt: 'Pixel Creative Agency Logo Design 1' },
  { src: logo1, alt: 'Pixel Creative Agency Logo Design 2' },
  { src: logo2, alt: 'Pixel Creative Agency Logo Design 3' },
  { src: logo3, alt: 'Pixel Creative Agency Logo Design 4' },
  { src: logo4, alt: 'Pixel Creative Agency Logo Design 5' },
  { src: logo5, alt: 'Pixel Creative Agency Logo Design 6' },
  { src: logo6, alt: 'Pixel Creative Agency Logo Design 7' },
  { src: logo7, alt: 'Pixel Creative Agency Logo Design 8' },
  { src: logo8, alt: 'Pixel Creative Agency Logo Design 9' },
  { src: logo9, alt: 'Pixel Creative Agency Logo Design 10' },
  { src: logo10, alt: 'Pixel Creative Agency Logo Design 11' },
  { src: logo11, alt: 'Pixel Creative Agency Logo Design 12' },
]

const Logo = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Logo
