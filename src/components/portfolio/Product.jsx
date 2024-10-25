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
  { src: product, alt: 'Product' },
  { src: product1, alt: 'Product' },
  { src: product2, alt: 'Product' },
  { src: product3, alt: 'Product' },
  { src: product4, alt: 'Product' },
  { src: product5, alt: 'Product' },
  { src: product6, alt: 'Product' },
  { src: product7, alt: 'Product' },
  { src: product8, alt: 'Product' },
  { src: product9, alt: 'Product' },
  { src: product10, alt: 'Product' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img
        src={src}
        alt={alt}
        loading='lazy'
        className=' rounded-xl w-80 object-contain'
      />
    </PhotoView>
  </div>
)

const Product = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-3 gap-10'>
        {images.map((image, index) => (
          <ImageComponent src={image.src} alt={image.alt} />
        ))}
      </div>
    </PhotoProvider>
  )
}

export default Product
