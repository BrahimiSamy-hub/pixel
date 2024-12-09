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
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img
        src={src}
        alt={alt}
        className=' rounded-xl w-80 object-contain object-center'
      />
    </PhotoView>
  </div>
)

const Flyer = () => {
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

export default Flyer
