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
  { src: shooting, alt: 'Pixel Creative Agency - Portrait Studio Shooting 1' },
  { src: shooting1, alt: 'Pixel Creative Agency - Portrait Studio Shooting 2' },
  { src: shooting2, alt: 'Pixel Creative Agency - Portrait Studio Shooting 3' },
  { src: shooting3, alt: 'Pixel Creative Agency - Portrait Studio Shooting 4' },
  { src: shooting4, alt: 'Pixel Creative Agency - Portrait Studio Shooting 5' },
  { src: shooting5, alt: 'Pixel Creative Agency - Portrait Studio Shooting 6' },
  { src: shooting6, alt: 'Pixel Creative Agency - Portrait Studio Shooting 7' },
  { src: shooting7, alt: 'Pixel Creative Agency - Portrait Studio Shooting 8' },
  { src: shooting8, alt: 'Pixel Creative Agency - Portrait Studio Shooting 9' },
  { src: shooting9, alt: 'Pixel Creative Agency - Portrait Studio Shooting 10' },
  { src: shooting10, alt: 'Pixel Creative Agency - Portrait Studio Shooting 11' },
  { src: shooting11, alt: 'Pixel Creative Agency - Portrait Studio Shooting 12' },
  { src: shooting12, alt: 'Pixel Creative Agency - Portrait Studio Shooting 13' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src?.src || src}>
      <img src={src?.src || src} alt={alt} className=' rounded-xl w-80  object-contain' loading='lazy' />
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
