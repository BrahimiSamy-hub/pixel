import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { menuTV, menuTV1, menuTV2, menuTV3 } from '../../assets'

const images = [
  { src: menuTV, alt: 'Menu TV' },
  { src: menuTV1, alt: 'Menu TV' },
  { src: menuTV2, alt: 'Menu TV' },
  { src: menuTV3, alt: 'Menu TV' },
]

const MenuTV = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default MenuTV
