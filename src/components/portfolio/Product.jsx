import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
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

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src?.src || src}>
      <img src={src?.src || src} alt={alt} className=' rounded-xl w-80  object-contain' loading='lazy' />
    </PhotoView>
  </div>
)

const Product = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-5'>
        {images.map((image, index) => (
          <Suspense fallback={<div>Loading...</div>} key={index}>
            <ImageComponent src={image.src} alt={image.alt} />
          </Suspense>
        ))}
      </div>
    </PhotoProvider>
  )
}

export default Product
