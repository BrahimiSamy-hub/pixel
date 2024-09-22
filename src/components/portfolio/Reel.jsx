// import React, { useRef, useState } from 'react'
// import ReactPlayer from 'react-player'

// import vid from '../../assets/portfolio/video/a.mp4'
// import vid1 from '../../assets/portfolio/video/b.mp4'
// import vid2 from '../../assets/portfolio/video/c.mp4'
// import vid3 from '../../assets/portfolio/video/d.mp4'
// import vid4 from '../../assets/portfolio/video/n.mp4'
// import vid5 from '../../assets/portfolio/video/f.mp4'
// import vid6 from '../../assets/portfolio/video/g.mp4'
// import vid7 from '../../assets/portfolio/video/k.mp4'
// import vid8 from '../../assets/portfolio/video/l.mp4'
// import vid9 from '../../assets/portfolio/video/m.mp4'

// const Reel = () => {
//   const [playing, setPlaying] = useState(null)
//   const videoRefs = useRef([])

//   const handlePlay = (index) => {
//     videoRefs.current.forEach((player, i) => {
//       if (i !== index && player) {
//         player.seekTo(0) // Reset other videos to the start
//         player.getInternalPlayer().pause()
//       }
//     })
//     setPlaying(index)
//     if (videoRefs.current[index].getInternalPlayer().requestFullscreen) {
//       videoRefs.current[index].getInternalPlayer().requestFullscreen()
//     } else if (
//       videoRefs.current[index].getInternalPlayer().webkitRequestFullscreen
//     ) {
//       /* Safari */
//       videoRefs.current[index].getInternalPlayer().webkitRequestFullscreen()
//     } else if (
//       videoRefs.current[index].getInternalPlayer().msRequestFullscreen
//     ) {
//       /* IE11 */
//       videoRefs.current[index].getInternalPlayer().msRequestFullscreen()
//     }
//   }

//   return (
//     <div className='grid grid-cols-4 gap-10 my-14'>
//       {[vid, vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8, vid9].map(
//         (videoSrc, index) => (
//           <div
//             key={index}
//             className='flex justify-center col-span-4 md:col-span-2 lg:col-span-1 hover:cursor-pointer'
//           >
//             <video
//               ref={(el) => (videoRefs.current[index] = el)}
//               src={videoSrc}
//               controls
//               className='object-contain border rounded-md min-w-56 min-h-56'
//               onPlay={() => handlePlay(index)}
//             />
//           </div>
//         )
//       )}
//     </div>
//   )
// }

// export default Reel

// import VideoJS from './VideoJS'

const Reel = () => {
  // const playerRef = React.useRef(null)

  // const videoJsOptions = {
  //   autoplay: false,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [
  //     {
  //       src: video1,
  //       type: 'video/mp4',
  //     },
  //   ],
  // }

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player

  //   // You can handle player events here, for example:
  //   player.on('waiting', () => {
  //     videojs.log('player is waiting')
  //   })

  //   player.on('dispose', () => {
  //     videojs.log('player will dispose')
  //   })
  // }

  return null
  // <>
  //   <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  // </>
}

export default Reel
