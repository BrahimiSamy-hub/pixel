import React, { Suspense } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import {
  post,
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
} from '../../assets'
const images = [
  { src: post, alt: 'Post' },
  { src: post1, alt: 'Post' },
  { src: post2, alt: 'Post' },
  { src: post3, alt: 'Post' },
  { src: post4, alt: 'Post' },
  { src: post5, alt: 'Post' },
  { src: post6, alt: 'Post' },
  { src: post7, alt: 'Post' },
  { src: post8, alt: 'Post' },
  { src: post, alt: 'Post' },
  { src: post1, alt: 'Post' },
  { src: post2, alt: 'Post' },
]

const ImageComponent = ({ src, alt }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1 hover:cursor-pointer'>
    <PhotoView src={src}>
      <img src={src} alt={alt} className=' rounded-xl w-80 object-contain' />
    </PhotoView>
  </div>
)

const Posts = () => {
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

export default Posts
