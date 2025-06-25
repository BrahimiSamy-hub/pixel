import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  menuBook,
  menuBook1,
  menuBook2,
  menuBook3,
  menuBook4,
  menuBook5,
  menuBook6,
  menuBook7,
  menuBook8,
  menuBook9,
  menuBook10,
  menuBook11,
  menuBook12,
} from '../../assets'

const images = [
  { src: menuBook, alt: 'Menu Book' },
  { src: menuBook1, alt: 'Menu Book' },
  { src: menuBook2, alt: 'Menu Book' },
  { src: menuBook3, alt: 'Menu Book' },
  { src: menuBook4, alt: 'Menu Book' },
  { src: menuBook5, alt: 'Menu Book' },
  { src: menuBook6, alt: 'Menu Book' },
  { src: menuBook7, alt: 'Menu Book' },
  { src: menuBook8, alt: 'Menu Book' },
  { src: menuBook9, alt: 'Menu Book' },
  { src: menuBook10, alt: 'Menu Book' },
  { src: menuBook11, alt: 'Menu Book' },
  { src: menuBook12, alt: 'Menu Book' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const MenuBook = () => {
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

export default MenuBook
