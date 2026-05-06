import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  menuA4,
  menuA41,
  menuA42,
  menuA43,
  menuA44,
  menuA45,
  menuA46,
} from '../../assets'

const images = [
  { src: menuA4, alt: 'Menu A4' },
  { src: menuA41, alt: 'Menu A4' },
  { src: menuA42, alt: 'Menu A4' },
  { src: menuA43, alt: 'Menu A4' },
  { src: menuA44, alt: 'Menu A4' },
  { src: menuA45, alt: 'Menu A4' },
  { src: menuA46, alt: 'Menu A4' },
]

const MenuA4 = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default MenuA4
