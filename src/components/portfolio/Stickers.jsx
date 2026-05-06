import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  sticker,
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
} from '../../assets'

const images = [
  { src: sticker, alt: 'Sticker' },
  { src: sticker1, alt: 'Sticker' },
  { src: sticker2, alt: 'Sticker' },
  { src: sticker3, alt: 'Sticker' },
  { src: sticker4, alt: 'Sticker' },
  { src: sticker5, alt: 'Sticker' },
  { src: sticker6, alt: 'Sticker' },
  { src: sticker7, alt: 'Sticker' },
  { src: sticker8, alt: 'Sticker' },
]

const Stickers = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Stickers
