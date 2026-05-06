import React from 'react'
import PortfolioGallery from './PortfolioGallery'

import {
  product,
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
} from '../../assets'

const images = [
  { src: product, alt: 'Pixel Creative Agency - Photographie de Produit 1' },
  { src: product1, alt: 'Pixel Creative Agency - Photographie de Produit 2' },
  { src: product2, alt: 'Pixel Creative Agency - Photographie de Produit 3' },
  { src: product3, alt: 'Pixel Creative Agency - Photographie de Produit 4' },
  { src: product4, alt: 'Pixel Creative Agency - Photographie de Produit 5' },
  { src: product5, alt: 'Pixel Creative Agency - Photographie de Produit 6' },
  { src: product6, alt: 'Pixel Creative Agency - Photographie de Produit 7' },
  { src: product7, alt: 'Pixel Creative Agency - Photographie de Produit 8' },
  { src: product8, alt: 'Pixel Creative Agency - Photographie de Produit 9' },
  { src: product9, alt: 'Pixel Creative Agency - Photographie de Produit 10' },
  { src: product10, alt: 'Pixel Creative Agency - Photographie de Produit 11' },
]

const Product = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Product
