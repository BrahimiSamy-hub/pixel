import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  menuA4,
  menuA41,
  menuA42,
  menuA43,
  menuA44,
  menuA45,
  menuA46,
} from '../../assets'

const images = [
  { src: menuA4, alt: 'Menu A4' },
  { src: menuA41, alt: 'Menu A4' },
  { src: menuA42, alt: 'Menu A4' },
  { src: menuA43, alt: 'Menu A4' },
  { src: menuA44, alt: 'Menu A4' },
  { src: menuA45, alt: 'Menu A4' },
  { src: menuA46, alt: 'Menu A4' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const MenuA4 = () => {
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

export default MenuA4
