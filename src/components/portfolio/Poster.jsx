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
  { src: poster, alt: 'Poster' },
  { src: poster1, alt: 'Poster' },
  { src: poster2, alt: 'Poster' },
  { src: poster3, alt: 'Poster' },
  { src: poster4, alt: 'Poster' },
  { src: poster5, alt: 'Poster' },
  { src: poster6, alt: 'Poster' },
  { src: poster7, alt: 'Poster' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
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
