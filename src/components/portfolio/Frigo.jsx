import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { frigo, frigo1, frigo2, frigo3, frigo4 } from '../../assets'
const images = [
  { src: frigo, alt: 'frigo' },
  { src: frigo1, alt: 'frigo' },
  { src: frigo2, alt: 'frigo' },
  { src: frigo3, alt: 'frigo' },
  { src: frigo4, alt: 'frigo' },
  { src: frigo, alt: 'frigo' },
  { src: frigo1, alt: 'frigo' },
  { src: frigo2, alt: 'frigo' },
  { src: frigo3, alt: 'frigo' },
  { src: frigo4, alt: 'frigo' },
  { src: frigo, alt: 'frigo' },
  { src: frigo1, alt: 'frigo' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80 object-contain' />
    </PhotoView>
  </div>
)

const Frigo = () => {
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

export default Frigo
