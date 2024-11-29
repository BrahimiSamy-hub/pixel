import React, { Suspense } from 'react'

const videos = [
  {
    src: 'https://www.youtube.com/embed/cgq_AYufDoE',
    title: 'Chemsou Concert Trailer',
  },
  {
    src: 'https://www.youtube.com/embed/OipP4mS7uTg',
    title: 'Benchenett Concert Trailer',
  },
  {
    src: 'https://www.youtube.com/embed/uxlNs9yoj58',
    title: 'Nada Al Rayhane - Ad Ezzi Ssaa',
  },
]

const VideoComponent = ({ src, title }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1'>
    <iframe
      src={src}
      title={title}
      className='rounded-xl w-full min-h-80 '
      frameBorder='0'
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  </div>
)

const Trailer = () => {
  return (
    <div className='grid grid-cols-3 gap-10'>
      {videos.map((video, index) => (
        <Suspense fallback={<div>Loading...</div>} key={index}>
          <VideoComponent src={video.src} />
        </Suspense>
      ))}
    </div>
  )
}

export default Trailer
