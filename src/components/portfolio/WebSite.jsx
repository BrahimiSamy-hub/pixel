import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { antic, beleghni, broker, pixel, comfortSpace } from '../../assets'

const images = [
  { src: antic, alt: 'Antic Landing Page' },
  { src: beleghni, alt: 'Beleghni Dashboard' },
  { src: broker, alt: 'Broker Landing Page' },
  { src: pixel, alt: 'Pixel Landing Page' },
  { src: comfortSpace, alt: 'comforceSpace Ecommerce' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Website = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-2 px-0'>
        {images.map((image, index) => (
          <Suspense fallback={<div>Loading...</div>} key={index}>
            <ImageComponent src={image.src} alt={image.alt} />
          </Suspense>
        ))}
      </div>
    </PhotoProvider>
  )
}

export default Website
