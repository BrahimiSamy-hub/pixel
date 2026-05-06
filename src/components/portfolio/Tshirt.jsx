import React from 'react'
import PortfolioGallery from './PortfolioGallery'

const images = [{ src: '', alt: '' }]

const Tshirt = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Tshirt
