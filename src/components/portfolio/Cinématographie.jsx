import React, { Suspense } from 'react'

const videos = [
  {
    src: 'https://www.youtube.com/embed/EcKI9b4DxEw',
    title: 'Azas Rugs Promo',
  },

  {
    src: 'https://www.youtube.com/embed/CJZFsMx9CaQ',
    title: 'Articore Presentation',
  },
  {
    src: 'https://youtube.com/embed/r442kz0PFFA',
    title:
      'Couverture de la Soutenance des Médecins | Célébrons l’Excellence Médicale',
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
    src: 'https://www.youtube.com/embed/4kCO6niEbtg',
    title: 'Articore Presentation',
  },
  {
    src: 'https://www.youtube.com/embed/xXUUA87F-Ps',
    title: 'Chemsou Freeklane Couverture Concert',
  },
  {
    src: 'https://www.youtube.com/embed/1v6JS9YHcs0',
    title: 'NewTech Ceram - Publicité | Excellence en Céramique',
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

const Cinématographie = () => {
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

export default Cinématographie
