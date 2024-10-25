import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  flyer,
  flyer1,
  flyer2,
  flyer3,
  flyer4,
  flyer5,
  flyer6,
} from '../../assets'

const images = [
  { src: flyer, alt: 'Flyer' },
  { src: flyer1, alt: 'Flyer' },
  { src: flyer2, alt: 'Flyer' },
  { src: flyer3, alt: 'Flyer' },
  { src: flyer4, alt: 'Flyer' },
  { src: flyer5, alt: 'Flyer' },
  { src: flyer6, alt: 'Flyer' },
  { src: flyer2, alt: 'Flyer' },
  { src: flyer3, alt: 'Flyer' },
  { src: flyer1, alt: 'Flyer' },
  { src: flyer4, alt: 'Flyer' },
  { src: flyer5, alt: 'Flyer' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Flyer = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-3 gap-10'>
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
