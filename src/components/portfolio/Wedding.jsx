import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  wedding,
  wedding1,
  wedding2,
  wedding3,
  wedding4,
  wedding5,
  wedding6,
  wedding7,
  wedding8,
  wedding9,
  wedding10,
  wedding11,
} from '../../assets'

const images = [
  { src: wedding, alt: 'Pixel Creative Agency - Photographie de Mariage 1' },
  { src: wedding1, alt: 'Pixel Creative Agency - Photographie de Mariage 2' },
  { src: wedding2, alt: 'Pixel Creative Agency - Photographie de Mariage 3' },
  { src: wedding3, alt: 'Pixel Creative Agency - Photographie de Mariage 4' },
  { src: wedding4, alt: 'Pixel Creative Agency - Photographie de Mariage 5' },
  { src: wedding5, alt: 'Pixel Creative Agency - Photographie de Mariage 6' },
  { src: wedding6, alt: 'Pixel Creative Agency - Photographie de Mariage 7' },
  { src: wedding7, alt: 'Pixel Creative Agency - Photographie de Mariage 8' },
  { src: wedding8, alt: 'Pixel Creative Agency - Photographie de Mariage 9' },
  { src: wedding9, alt: 'Pixel Creative Agency - Photographie de Mariage 10' },
  { src: wedding10, alt: 'Pixel Creative Agency - Photographie de Mariage 11' },
  { src: wedding11, alt: 'Pixel Creative Agency - Photographie de Mariage 12' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src?.src || src}>
      <img src={src?.src || src} alt={alt} className=' rounded-xl w-80  object-contain' loading='lazy' />
    </PhotoView>
  </div>
)

const Wedding = () => {
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

export default Wedding
