import React from 'react'
import PortfolioGallery from './PortfolioGallery'

const videos = [
  {
    src: 'https://youtube.com/embed/8bGAYPNX_kw',
    title: 'Crunchy Restaurant Promo',
  },
  {
    src: 'https://youtube.com/embed/khBRheURY8Y',
    title: 'Chemsou Concert Trailer',
  },
  {
    src: 'https://youtube.com/embed/a55vdtKqNdk',
    title: 'Azas Rugs Promo',
  },
  {
    src: 'https://youtube.com/embed/H3REhBCZyMM',
    title: 'Benchenett Concert Trailer',
  },
  {
    src: 'https://youtube.com/embed/V5QPBuA1DW4',
    title: 'Articore Presentation 1',
  },
  {
    src: 'https://youtube.com/embed/q0rLWbBiE4U',
    title: 'Articore Presentation 2',
  },
  {
    src: 'https://youtube.com/embed/jCKCLg6vqLo',
    title: 'Articore Presentation 3',
  },
  {
    src: 'https://youtube.com/embed/KCgDcQr8zQ0',
    title: 'AURASIS Festival Opening',
  },
]

const Reel = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={videos} searchQuery={searchQuery} viewType={viewType} isVideo={true} />
}

export default Reel
