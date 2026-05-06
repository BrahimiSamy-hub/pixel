import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  menuBook,
  menuBook1,
  menuBook2,
  menuBook3,
  menuBook4,
  menuBook5,
  menuBook6,
  menuBook7,
  menuBook8,
  menuBook9,
  menuBook10,
  menuBook11,
  menuBook12,
} from '../../assets'

const images = [
  { src: menuBook, alt: 'Menu Book' },
  { src: menuBook1, alt: 'Menu Book' },
  { src: menuBook2, alt: 'Menu Book' },
  { src: menuBook3, alt: 'Menu Book' },
  { src: menuBook4, alt: 'Menu Book' },
  { src: menuBook5, alt: 'Menu Book' },
  { src: menuBook6, alt: 'Menu Book' },
  { src: menuBook7, alt: 'Menu Book' },
  { src: menuBook8, alt: 'Menu Book' },
  { src: menuBook9, alt: 'Menu Book' },
  { src: menuBook10, alt: 'Menu Book' },
  { src: menuBook11, alt: 'Menu Book' },
  { src: menuBook12, alt: 'Menu Book' },
]

const MenuBook = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default MenuBook
