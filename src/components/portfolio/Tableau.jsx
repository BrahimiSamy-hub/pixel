import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { tableau, tableau1, tableau2, tableau3, tableau4 } from '../../assets'
const images = [
  { src: tableau, alt: 'Tableau' },
  { src: tableau1, alt: 'Tableau' },
  { src: tableau2, alt: 'Tableau' },
  { src: tableau3, alt: 'Tableau' },
  { src: tableau4, alt: 'Tableau' },
]

const Tableau = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Tableau
