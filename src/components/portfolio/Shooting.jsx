import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  shooting,
  shooting1,
  shooting2,
  shooting3,
  shooting4,
  shooting5,
  shooting6,
  shooting7,
  shooting8,
  shooting9,
  shooting10,
  shooting11,
  shooting12,
} from '../../assets'

const images = [
  { src: shooting, alt: 'Shooting' },
  { src: shooting1, alt: 'Shooting' },
  { src: shooting2, alt: 'Shooting' },
  { src: shooting3, alt: 'Shooting' },
  { src: shooting4, alt: 'Shooting' },
  { src: shooting5, alt: 'Shooting' },
  { src: shooting6, alt: 'Shooting' },
  { src: shooting7, alt: 'Shooting' },
  { src: shooting8, alt: 'Shooting' },
  { src: shooting9, alt: 'Shooting' },
  { src: shooting10, alt: 'Shooting' },
  { src: shooting11, alt: 'Shooting' },
  { src: shooting12, alt: 'Shooting' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Shooting = () => {
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

export default Shooting
