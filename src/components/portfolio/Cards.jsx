import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  carte,
  carte1,
  carte2,
  carte3,
  carte4,
  carte5,
  carte6,
  carte7,
  carte8,
  carte9,
  carte10,
  carte11,
} from '../../assets'

const images = [
  { src: carte, alt: 'Visit Card' },
  { src: carte1, alt: 'Visit Card' },
  { src: carte2, alt: 'Visit Card' },
  { src: carte3, alt: 'Visit Card' },
  { src: carte4, alt: 'Visit Card' },
  { src: carte5, alt: 'Visit Card' },
  { src: carte6, alt: 'Visit Card' },
  { src: carte7, alt: 'Visit Card' },
  { src: carte8, alt: 'Visit Card' },
  { src: carte9, alt: 'Visit Card' },
  { src: carte10, alt: 'Visit Card' },
  { src: carte11, alt: 'Visit Card' },
]

const Cards = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Cards
