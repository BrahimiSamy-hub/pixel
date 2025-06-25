import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  sticker,
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
} from '../../assets'

const images = [
  { src: sticker, alt: 'Sticker' },
  { src: sticker1, alt: 'Sticker' },
  { src: sticker2, alt: 'Sticker' },
  { src: sticker3, alt: 'Sticker' },
  { src: sticker4, alt: 'Sticker' },
  { src: sticker5, alt: 'Sticker' },
  { src: sticker6, alt: 'Sticker' },
  { src: sticker7, alt: 'Sticker' },
  { src: sticker8, alt: 'Sticker' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Stickers = () => {
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

export default Stickers
