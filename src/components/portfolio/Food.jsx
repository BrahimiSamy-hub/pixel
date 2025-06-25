import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  food,
  food1,
  food2,
  food3,
  food4,
  food5,
  food6,
  food7,
  food8,
  food9,
  food10,
} from '../../assets'

const images = [
  { src: food, alt: 'Food' },
  { src: food1, alt: 'Food' },
  { src: food2, alt: 'Food' },
  { src: food3, alt: 'Food' },
  { src: food4, alt: 'Food' },
  { src: food5, alt: 'Food' },
  { src: food6, alt: 'Food' },
  { src: food7, alt: 'Food' },
  { src: food8, alt: 'Food' },
  { src: food9, alt: 'Food' },
  { src: food10, alt: 'Food' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Food = () => {
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

export default Food
