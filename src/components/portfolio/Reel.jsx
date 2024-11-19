import React, { Suspense } from 'react'

const videos = [
  {
    src: ' https://youtube.com/embed/8bGAYPNX_kw',

    title: 'Crunchy Restaurant Promo',
  },
  {
    src: 'https://youtube.com/embed/khBRheURY8Y',
    title: 'Chemsou Concert Trailer',
  },
  {
    src: 'https://youtube.com/embed/a55vdtKqNdk',
    title: 'Azas Rugs Promo',
  },
  {
    src: 'https://youtube.com/embed/H3REhBCZyMM',
    title: 'Benchenett Concert Trailer',
  },
  {
    src: 'https://youtube.com/embed/V5QPBuA1DW4',
    title: 'Articore Presentation',
  },
  {
    src: 'https://youtube.com/embed/q0rLWbBiE4U',
    title: 'Articore Presentation',
  },
  {
    src: 'https://youtube.com/embed/jCKCLg6vqLo',
    title: 'Articore Presentation',
  },
  {
    src: 'https://youtube.com/embed/KCgDcQr8zQ0',
    title: 'AURASIS Festival Opening',
  },
]

const VideoComponent = ({ src, title }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1'>
    <iframe
      src={src}
      title={title}
      className='rounded-xl w-full min-h-96 object-cover'
      frameBorder='0'
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  </div>
)

const Reel = () => {
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

export default Reel
