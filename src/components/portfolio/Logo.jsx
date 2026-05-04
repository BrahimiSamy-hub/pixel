import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  logo,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
} from '../../assets'

const images = [
  { src: logo, alt: 'Pixel Creative Agency Logo Design 1' },
  { src: logo1, alt: 'Pixel Creative Agency Logo Design 2' },
  { src: logo2, alt: 'Pixel Creative Agency Logo Design 3' },
  { src: logo3, alt: 'Pixel Creative Agency Logo Design 4' },
  { src: logo4, alt: 'Pixel Creative Agency Logo Design 5' },
  { src: logo5, alt: 'Pixel Creative Agency Logo Design 6' },
  { src: logo6, alt: 'Pixel Creative Agency Logo Design 7' },
  { src: logo7, alt: 'Pixel Creative Agency Logo Design 8' },
  { src: logo8, alt: 'Pixel Creative Agency Logo Design 9' },
  { src: logo9, alt: 'Pixel Creative Agency Logo Design 10' },
  { src: logo10, alt: 'Pixel Creative Agency Logo Design 11' },
  { src: logo11, alt: 'Pixel Creative Agency Logo Design 12' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src?.src || src}>
      <img src={src?.src || src} alt={alt} className=' rounded-xl w-80  object-contain' loading='lazy' />
    </PhotoView>
  </div>
)
const Logo = () => {
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

export default Logo
