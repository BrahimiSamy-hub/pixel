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
  { src: wedding, alt: 'Wedding' },
  { src: wedding1, alt: 'Wedding' },
  { src: wedding2, alt: 'Wedding' },
  { src: wedding3, alt: 'Wedding' },
  { src: wedding6, alt: 'Wedding' },
  { src: wedding7, alt: 'Wedding' },
  { src: wedding8, alt: 'Wedding' },
  { src: wedding10, alt: 'Wedding' },
  { src: wedding11, alt: 'Wedding' },
  { src: wedding4, alt: 'Wedding' },
  { src: wedding5, alt: 'Wedding' },
  { src: wedding9, alt: 'Wedding' },
]
const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80 object-contain' />
    </PhotoView>
  </div>
)

const Wedding = () => {
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

export default Wedding
