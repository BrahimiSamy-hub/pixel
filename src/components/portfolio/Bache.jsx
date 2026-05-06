import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  bache,
  bache1,
  bache3,
  bache4,
  bache5,
  bache6,
  bache7,
  bache8,
  bache9,
} from '../../assets'

const images = [
  { src: bache, alt: 'Bache' },
  { src: bache1, alt: 'Bache' },
  { src: bache3, alt: 'Bache' },
  { src: bache4, alt: 'Bache' },
  { src: bache5, alt: 'Bache' },
  { src: bache6, alt: 'Bache' },
  { src: bache7, alt: 'Bache' },
  { src: bache8, alt: 'Bache' },
  { src: bache9, alt: 'Bache' },
]

const Bache = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Bache
