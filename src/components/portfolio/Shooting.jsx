import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import model from '../../assets/portfolio/Shooting/model.jpg'
import model1 from '../../assets/portfolio/Shooting/model1.jpg'
import model2 from '../../assets/portfolio/Shooting/model2.jpg'
import model3 from '../../assets/portfolio/Shooting/model3.jpg'
import model4 from '../../assets/portfolio/Shooting/model4.jpg'
import model5 from '../../assets/portfolio/Shooting/model5.jpg'
import model6 from '../../assets/portfolio/Shooting/model6.jpg'
import model7 from '../../assets/portfolio/Shooting/model7.jpg'
import model8 from '../../assets/portfolio/Shooting/model8.jpg'
import model9 from '../../assets/portfolio/Shooting/model9.jpg'
import model10 from '../../assets/portfolio/Shooting/model10.jpg'
import model11 from '../../assets/portfolio/Shooting/model11.jpg'
import model12 from '../../assets/portfolio/Shooting/model12.jpg'
import model13 from '../../assets/portfolio/Shooting/model13.jpg'

const images = [
  { src: model, alt: 'Model 1' },
  { src: model1, alt: 'Model 2' },
  { src: model2, alt: 'Model 3' },
  { src: model3, alt: 'Model 4' },
  { src: model4, alt: 'Model 5' },
  { src: model5, alt: 'Model 6' },
  { src: model6, alt: 'Model 7' },
  { src: model7, alt: 'Model 8' },
  { src: model8, alt: 'Model 9' },
  { src: model9, alt: 'Model 10' },
  { src: model10, alt: 'Model 11' },
  { src: model11, alt: 'Model 12' },
  { src: model12, alt: 'Model 13' },
  { src: model13, alt: 'Model 14' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img
        src={src}
        loading='lazy'
        alt={alt}
        className='border object-cover rounded-xl w-80 min-h-80 h-full'
      />
    </PhotoView>
  </div>
)

const Shooting = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-3 gap-10' data-aos='fade-up'>
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
