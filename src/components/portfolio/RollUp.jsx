import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  rollUp,
  rollUp1,
  rollUp2,
  rollUp3,
  rollUp4,
  rollUp5,
  rollUp6,
  rollUp7,
  rollUp8,
  rollUp9,
  rollUp10,
} from '../../assets'
const images = [
  { src: rollUp, alt: 'Roll Up' },
  { src: rollUp1, alt: 'Roll Up' },
  { src: rollUp2, alt: 'Roll Up' },
  { src: rollUp3, alt: 'Roll Up' },
  { src: rollUp4, alt: 'Roll Up' },
  { src: rollUp5, alt: 'Roll Up' },
  { src: rollUp6, alt: 'Roll Up' },
  { src: rollUp7, alt: 'Roll Up' },
  { src: rollUp8, alt: 'Roll Up' },
  { src: rollUp9, alt: 'Roll Up' },
  { src: rollUp10, alt: 'Roll Up' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const RollUp = () => {
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

export default RollUp
