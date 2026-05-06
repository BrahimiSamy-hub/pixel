import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  rollUp,
  rollUp1,
  rollUp2,
  rollUp3,
  rollUp4,
  rollUp5,
  rollUp6,
  rollUp7,
  rollUp8,
  rollUp9,
  rollUp10,
} from '../../assets'

const images = [
  { src: rollUp, alt: 'Roll Up' },
  { src: rollUp1, alt: 'Roll Up' },
  { src: rollUp2, alt: 'Roll Up' },
  { src: rollUp3, alt: 'Roll Up' },
  { src: rollUp4, alt: 'Roll Up' },
  { src: rollUp5, alt: 'Roll Up' },
  { src: rollUp6, alt: 'Roll Up' },
  { src: rollUp7, alt: 'Roll Up' },
  { src: rollUp8, alt: 'Roll Up' },
  { src: rollUp9, alt: 'Roll Up' },
  { src: rollUp10, alt: 'Roll Up' },
]

const RollUp = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default RollUp
