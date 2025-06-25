import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  bache,
  bache1,
  bache3,
  bache4,
  bache5,
  bache6,
  bache7,
  bache8,
  bache9,
} from '../../assets'

const images = [
  { src: bache, alt: 'Bache' },
  { src: bache1, alt: 'Bache' },
  { src: bache3, alt: 'Bache' },
  { src: bache4, alt: 'Bache' },
  { src: bache5, alt: 'Bache' },
  { src: bache6, alt: 'Bache' },
  { src: bache7, alt: 'Bache' },
  { src: bache8, alt: 'Bache' },
  { src: bache9, alt: 'Bache' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Bache = () => {
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

export default Bache
