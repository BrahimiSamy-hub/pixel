import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { certificat, certificat1 } from '../../assets'

const images = [
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
  { src: certificat, alt: 'Certificat' },
  { src: certificat1, alt: 'Certificat' },
]
const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80  object-contain' />
    </PhotoView>
  </div>
)

const Certificat = () => {
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

export default Certificat
