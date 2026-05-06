import React from 'react'
import PortfolioGallery from './PortfolioGallery'
import {
  flyer1,
  flyer2,
  flyer3,
  flyer4,
  flyer5,
  flyer6,
  flyer7,
  flyer8,
  flyer9,
  flyer10,
  flyer11,
  flyer12,
  flyer13,
  trifold,
  trifold1,
  trifold2,
  trifold3,
} from '../../assets'

const images = [
  { src: flyer1, alt: 'Flyer Design 1' },
  { src: flyer2, alt: 'Flyer Design 2' },
  { src: flyer3, alt: 'Flyer Design 3' },
  { src: trifold1, alt: 'Trifold Design 1' },
  { src: flyer4, alt: 'Flyer Design 4' },
  { src: flyer5, alt: 'Flyer Design 5' },
  { src: flyer6, alt: 'Flyer Design 6' },
  { src: trifold2, alt: 'Trifold Design 2' },
  { src: flyer7, alt: 'Flyer Design 7' },
  { src: trifold3, alt: 'Trifold Design 3' },
  { src: flyer8, alt: 'Flyer Design 8' },
  { src: flyer9, alt: 'Flyer Design 9' },
  { src: flyer10, alt: 'Flyer Design 10' },
  { src: flyer11, alt: 'Flyer Design 11' },
  { src: trifold, alt: 'Trifold Design 4' },
  { src: flyer12, alt: 'Flyer Design 12' },
  { src: flyer13, alt: 'Flyer Design 13' },
]

const Flyer = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Flyer
