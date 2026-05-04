import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

import {
  poster,
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster6,
  poster7,
} from '../../assets'
const images = [
  { src: poster, alt: 'Pixel Creative Agency Poster Design 1' },
  { src: poster1, alt: 'Pixel Creative Agency Poster Design 2' },
  { src: poster2, alt: 'Pixel Creative Agency Poster Design 3' },
  { src: poster3, alt: 'Pixel Creative Agency Poster Design 4' },
  { src: poster4, alt: 'Pixel Creative Agency Poster Design 5' },
  { src: poster5, alt: 'Pixel Creative Agency Poster Design 6' },
  { src: poster6, alt: 'Pixel Creative Agency Poster Design 7' },
  { src: poster7, alt: 'Pixel Creative Agency Poster Design 8' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src?.src || src}>
      <img src={src?.src || src} alt={alt} className=' rounded-xl w-80  object-contain' loading='lazy' />
    </PhotoView>
  </div>
)

const Poster = () => {
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

export default Poster
