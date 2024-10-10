import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import speedy from '../../assets/portfolio/speedy.jpg'

const Sac = () => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-3 gap-10 my-14'>
        <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
          <PhotoView src={speedy}>
            <img
              src={speedy}
              alt='Shirt 1'
              className='rounded-xl ml-5 w-80 h-full'
            />
          </PhotoView>
        </div>
      </div>
    </PhotoProvider>
  )
}

export default Sac
