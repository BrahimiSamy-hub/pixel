import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  shooting,
  shooting1,
  shooting2,
  shooting3,
  shooting4,
  shooting5,
  shooting6,
  shooting7,
  shooting8,
  shooting9,
  shooting10,
  shooting11,
  shooting12,
} from '../../assets'

const images = [
  { src: shooting, alt: 'Pixel Creative Agency - Portrait Studio Shooting 1' },
  { src: shooting1, alt: 'Pixel Creative Agency - Portrait Studio Shooting 2' },
  { src: shooting2, alt: 'Pixel Creative Agency - Portrait Studio Shooting 3' },
  { src: shooting3, alt: 'Pixel Creative Agency - Portrait Studio Shooting 4' },
  { src: shooting4, alt: 'Pixel Creative Agency - Portrait Studio Shooting 5' },
  { src: shooting5, alt: 'Pixel Creative Agency - Portrait Studio Shooting 6' },
  { src: shooting6, alt: 'Pixel Creative Agency - Portrait Studio Shooting 7' },
  { src: shooting7, alt: 'Pixel Creative Agency - Portrait Studio Shooting 8' },
  { src: shooting8, alt: 'Pixel Creative Agency - Portrait Studio Shooting 9' },
  { src: shooting9, alt: 'Pixel Creative Agency - Portrait Studio Shooting 10' },
  { src: shooting10, alt: 'Pixel Creative Agency - Portrait Studio Shooting 11' },
  { src: shooting11, alt: 'Pixel Creative Agency - Portrait Studio Shooting 12' },
  { src: shooting12, alt: 'Pixel Creative Agency - Portrait Studio Shooting 13' },
]

const Shooting = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Shooting
