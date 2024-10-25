import { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { menu, menu1, menu2, menu3, menu4, menu5, menu6 } from '../../assets'
const images = [
  { src: menu, alt: 'menu' },
  { src: menu1, alt: 'menu' },
  { src: menu2, alt: 'menu' },
  { src: menu3, alt: 'menu' },
  { src: menu4, alt: 'menu' },
  { src: menu5, alt: 'menu' },
  { src: menu6, alt: 'menu' },
  { src: menu, alt: 'menu' },
  { src: menu1, alt: 'menu' },
  { src: menu2, alt: 'menu' },
  { src: menu3, alt: 'menu' },
  { src: menu4, alt: 'menu' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80 object-contain' />
    </PhotoView>
  </div>
)

const Menu = () => {
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

export default Menu
