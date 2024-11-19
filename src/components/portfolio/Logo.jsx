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
  { src: logo, alt: 'Logo' },
  { src: logo1, alt: 'Logo' },
  { src: logo2, alt: 'Logo' },
  { src: logo3, alt: 'Logo' },
  { src: logo4, alt: 'Logo' },
  { src: logo5, alt: 'Logo' },
  { src: logo6, alt: 'Logo' },
  { src: logo7, alt: 'Logo' },
  { src: logo8, alt: 'Logo' },
  { src: logo9, alt: 'Logo' },
  { src: logo10, alt: 'Logo' },
  { src: logo11, alt: 'Logo' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
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
