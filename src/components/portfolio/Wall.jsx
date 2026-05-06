import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { wall, wall2, wall3, wall4, wall5, wall6 } from '../../assets'
const images = [
  { src: wall, alt: 'Wall' },

  { src: wall2, alt: 'Wall' },
  { src: wall3, alt: 'Wall' },
  { src: wall4, alt: 'Wall' },
  { src: wall5, alt: 'Wall' },
  { src: wall6, alt: 'Wall' },
]

const Wall = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Wall
