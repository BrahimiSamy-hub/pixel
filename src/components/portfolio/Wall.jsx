import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import speedy from '../../assets/portfolio/wall/speedy.jpg'
import Benpack from '../../assets/portfolio/wall/benpack.jpg'
import Crunchy from '../../assets/portfolio/wall/crunchy.jpg'
import Dounia from '../../assets/portfolio/wall/dounia.jpg'
import mili from '../../assets/portfolio/wall/mili.jpg'
import crunchy2 from '../../assets/portfolio/wall/crunchy2.jpg'
import elhayat from '../../assets/portfolio/wall/elhayat.jpg'
import elhayat2 from '../../assets/portfolio/wall/elhayat2.jpg'
import detailing from '../../assets/portfolio/wall/detailing.jpg'
import kids from '../../assets/portfolio/wall/kids.jpg'

const images = [
  { src: speedy, alt: 'Speedy' },
  { src: Crunchy, alt: 'Crunchy' },
  { src: Benpack, alt: 'Benpack' },
  { src: Dounia, alt: 'Dounia' },
  { src: mili, alt: 'Mili' },
  { src: crunchy2, alt: 'Crunchy 2' },
  { src: elhayat, alt: 'Elhayat' },
  { src: elhayat2, alt: 'Elhayat 2' },
  { src: detailing, alt: 'Detailing' },
  { src: kids, alt: 'Kids' },
]

const Wall = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-3 gap-5 my-14'>
        {images.map((image, index) => (
          <div
            key={index}
            className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'
          >
            <PhotoView src={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                className='border rounded-xl ml-5 w-80 h-full'
              />
            </PhotoView>
          </div>
        ))}
      </div>
    </PhotoProvider>
  )
}

export default Wall
