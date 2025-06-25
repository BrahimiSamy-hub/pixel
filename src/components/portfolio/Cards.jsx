import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  carte,
  carte1,
  carte2,
  carte3,
  carte4,
  carte5,
  carte6,
  carte7,
  carte8,
  carte9,
  carte10,
  carte11,
} from '../../assets'

const images = [
  { src: carte, alt: 'Visit Card' },
  { src: carte1, alt: 'Visit Card' },
  { src: carte2, alt: 'Visit Card' },
  { src: carte3, alt: 'Visit Card' },
  { src: carte4, alt: 'Visit Card' },
  { src: carte5, alt: 'Visit Card' },
  { src: carte6, alt: 'Visit Card' },
  { src: carte7, alt: 'Visit Card' },
  { src: carte8, alt: 'Visit Card' },
  { src: carte9, alt: 'Visit Card' },
  { src: carte10, alt: 'Visit Card' },
  { src: carte11, alt: 'Visit Card' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Cards = () => {
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

export default Cards
