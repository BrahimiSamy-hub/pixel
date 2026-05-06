import React from 'react'
import PortfolioGallery from './PortfolioGallery'

const videos = [
  {
    src: 'https://www.youtube.com/embed/cgq_AYufDoE',
    title: 'Chemsou Concert Trailer',
  },
  {
    src: 'https://www.youtube.com/embed/OipP4mS7uTg',
    title: 'Benchenett Concert Trailer',
  },
  {
    src: 'https://www.youtube.com/embed/uxlNs9yoj58',
    title: 'Nada Al Rayhane - Ad Ezzi Ssaa',
  },
]

const Trailer = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={videos} searchQuery={searchQuery} viewType={viewType} isVideo={true} />
}

export default Trailer
