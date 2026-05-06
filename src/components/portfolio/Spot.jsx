import React from 'react'
import PortfolioGallery from './PortfolioGallery'

const videos = [
  {
    src: 'https://www.youtube.com/embed/bVw_qsCNu30',
    title: 'Crunchy Restaurant Promo',
  },
  {
    src: 'https://youtube.com/embed/5WPD6b8Z_Cg',
    title: 'The Perfect Crunchy Burger',
  },
]

const Spot = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={videos} searchQuery={searchQuery} viewType={viewType} isVideo={true} />
}

export default Spot
