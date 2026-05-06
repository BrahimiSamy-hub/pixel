import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  wedding,
  wedding1,
  wedding2,
  wedding3,
  wedding4,
  wedding5,
  wedding6,
  wedding7,
  wedding8,
  wedding9,
  wedding10,
  wedding11,
} from '../../assets'

const images = [
  { src: wedding, alt: 'Pixel Creative Agency - Photographie de Mariage 1' },
  { src: wedding1, alt: 'Pixel Creative Agency - Photographie de Mariage 2' },
  { src: wedding2, alt: 'Pixel Creative Agency - Photographie de Mariage 3' },
  { src: wedding3, alt: 'Pixel Creative Agency - Photographie de Mariage 4' },
  { src: wedding4, alt: 'Pixel Creative Agency - Photographie de Mariage 5' },
  { src: wedding5, alt: 'Pixel Creative Agency - Photographie de Mariage 6' },
  { src: wedding6, alt: 'Pixel Creative Agency - Photographie de Mariage 7' },
  { src: wedding7, alt: 'Pixel Creative Agency - Photographie de Mariage 8' },
  { src: wedding8, alt: 'Pixel Creative Agency - Photographie de Mariage 9' },
  { src: wedding9, alt: 'Pixel Creative Agency - Photographie de Mariage 10' },
  { src: wedding10, alt: 'Pixel Creative Agency - Photographie de Mariage 11' },
  { src: wedding11, alt: 'Pixel Creative Agency - Photographie de Mariage 12' },
]

const Wedding = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Wedding
