import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  food,
  food1,
  food2,
  food3,
  food4,
  food5,
  food6,
  food7,
  food8,
  food9,
  food10,
} from '../../assets'

const images = [
  { src: food, alt: 'Food' },
  { src: food1, alt: 'Food' },
  { src: food2, alt: 'Food' },
  { src: food3, alt: 'Food' },
  { src: food4, alt: 'Food' },
  { src: food5, alt: 'Food' },
  { src: food6, alt: 'Food' },
  { src: food7, alt: 'Food' },
  { src: food8, alt: 'Food' },
  { src: food9, alt: 'Food' },
  { src: food10, alt: 'Food' },
]

const Food = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Food
