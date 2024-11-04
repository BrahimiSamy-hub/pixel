import React, { Suspense } from 'react'

const videos = [
  {
    src: 'https://www.youtube.com/embed/bVw_qsCNu30',
    title: 'Crunchy Restaurant Promo',
  },
  {
    src: 'https://www.youtube.com/embed/cgq_AYufDoE',
    title: 'Chemsou Concert Trailer',
  },
  {
    src: 'https://www.youtube.com/embed/EcKI9b4DxEw',
    title: 'Azas Rugs Promo',
  },
  {
    src: 'https://www.youtube.com/embed/OipP4mS7uTg',
    title: 'Benchenett Concert Trailer',
  },
  {
    src: 'https://www.youtube.com/embed/CJZFsMx9CaQ',
    title: 'Articore Presentation',
  },
  {
    src: 'https://www.youtube.com/embed/4kCO6niEbtg',
    title: 'Articore Presentation',
  },
  {
    src: 'https://www.youtube.com/embed/fetDAomZ118',
    title: 'Articore Presentation',
  },
  {
    src: 'https://www.youtube.com/embed/D5k7UWrUM4g',
    title: 'AURASIS Festival Opening',
  },
  {
    src: 'https://youtube.com/embed/5WPD6b8Z_Cg',
    title: 'The Perfect Crunchy Burger',
  },
  {
    src: 'https://www.youtube.com/embed/xXUUA87F-Ps',
    title: 'Chemsou Freeklane Couverture Concert',
  },
]

const VideoComponent = ({ src, title }) => (
  <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1'>
    <iframe
      src={src}
      title={title}
      className='rounded-xl w-full min-h-80 '
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  </div>
)

const WeddingVideos = () => {
  return (
    <div className='grid grid-cols-3 gap-5'>
      {videos.map((video, index) => (
        <Suspense fallback={<div>Loading...</div>} key={index}>
          <VideoComponent src={video.src} />
        </Suspense>
      ))}
    </div>
  )
}

export default WeddingVideos
