import React from 'react'
import PortfolioGallery from './PortfolioGallery'

const videos = [
  {
    src: 'https://www.youtube.com/embed/EcKI9b4DxEw',
    title: 'Azas Rugs Promo',
  },

  {
    src: 'https://www.youtube.com/embed/CJZFsMx9CaQ',
    title: 'Articore Presentation',
  },
  {
    src: 'https://youtube.com/embed/r442kz0PFFA',
    title:
      'Couverture de la Soutenance des Médecins | Célébrons l’Excellence Médicale',
  },
  {
    src: 'https://www.youtube.com/embed/fetDAomZ118',
    title: 'Articore Presentation',
  },
  {
    src: 'https://www.youtube.com/embed/D5k7UWrUM4g',
    title: 'AURASIS Festival Opening',
  },
  {
    src: 'https://www.youtube.com/embed/4kCO6niEbtg',
    title: 'Articore Presentation',
  },
  {
    src: 'https://www.youtube.com/embed/xXUUA87F-Ps',
    title: 'Chemsou Freeklane Couverture Concert',
  },
  {
    src: 'https://www.youtube.com/embed/1v6JS9YHcs0',
    title: 'NewTech Ceram - Publicité | Excellence en Céramique',
  },
]

const Cinématographie = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={videos} searchQuery={searchQuery} viewType={viewType} isVideo={true} />
}

export default Cinématographie
