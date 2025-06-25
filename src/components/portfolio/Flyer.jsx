import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  flyer1,
  flyer2,
  flyer3,
  flyer4,
  flyer5,
  flyer6,
  flyer7,
  flyer8,
  flyer9,
  flyer10,
  flyer11,
  flyer12,
  flyer13,
  trifold,
  trifold1,
  trifold2,
  trifold3,
} from '../../assets'

const images = [
  { src: flyer1, alt: 'Flyer' },
  { src: flyer2, alt: 'Flyer' },
  { src: flyer3, alt: 'Flyer' },
  { src: trifold1, alt: 'Trifold' },
  { src: flyer4, alt: 'Flyer' },
  { src: flyer5, alt: 'Flyer' },
  { src: flyer6, alt: 'Flyer' },
  { src: trifold2, alt: 'Trifold' },
  { src: flyer7, alt: 'Flyer' },
  { src: trifold3, alt: 'Trifold' },
  { src: flyer8, alt: 'Flyer' },
  { src: flyer9, alt: 'Flyer' },
  { src: flyer10, alt: 'Flyer' },
  { src: flyer11, alt: 'Flyer' },
  { src: trifold, alt: 'Trifold' },
  { src: flyer12, alt: 'Flyer' },
  { src: flyer13, alt: 'Flyer' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Flyer = () => {
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

export default Flyer
