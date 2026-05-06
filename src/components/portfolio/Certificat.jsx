import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import { certificat, certificat1 } from '../../assets'

const images = [
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
]

const Certificat = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Certificat
