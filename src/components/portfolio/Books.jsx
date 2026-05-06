import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { book, book1, book2 } from '../../assets'

const images = [
  { src: book, alt: 'Book' },
  { src: book1, alt: 'Book' },
  { src: book2, alt: 'Book' },
]

const Books = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Books
